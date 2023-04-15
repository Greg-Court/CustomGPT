import { useEffect, useState } from 'react';
import { Button, TextareaAutosize } from '@mui/material';
import { AiOutlineSend } from 'react-icons/ai';
import { getChat, getMessages, sendMessage } from '../api/firebaseApi';
import { useUser } from '../contexts/UserContext';
import { Chat, Message } from '../types/types';
import { generateAiResponse } from '../api/openaiApi';
import { toast } from 'react-hot-toast';
import { ClassNames } from '@emotion/react';

interface ChatInputProps {
  chat: Chat;
  setMessages: (messages: (prevMessages: Message[]) => Message[]) => void;
  messages: Message[];
}

const ChatInput: React.FC<ChatInputProps> = ({
  chat,
  setMessages,
  messages,
}) => {
  const { user } = useUser();
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;
  
    if (user) {
      const newMessage = await sendMessage(
        user.uid,
        chat.id,
        'user',
        inputValue
      );
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInputValue('');
  
      const allMessages = await getMessages(user.uid, chat.id);
  
      const messageArray = allMessages.docs.map((message) => {
        return { content: message.data().content, role: message.data().role };
      });
  
      const loadingToastId = toast.loading('Thinking...', {
        className: 'bg-gray-800 text-white',
      });
  
      const aiResponse = await generateAiResponse(
        chat.data().model,
        messageArray
      );
      const aiMessage = aiResponse.data.choices[0].message.content;
  
      const aiMessageDoc = await sendMessage(
        user.uid,
        chat.id,
        'assistant',
        aiMessage
      );
  
      // Update messages state with the new AI message
      setMessages((prevMessages) => [...prevMessages, aiMessageDoc]);
  
      // Dismiss the loading toast and show a success toast
      toast.dismiss(loadingToastId);
      toast.success('AI response generated!', {
        className: 'bg-gray-800 text-white',
      });
    }
  };

  return (
    <form className='flex w-full shadow-2xl' onSubmit={handleSubmit}>
      <TextareaAutosize
        value={inputValue}
        onChange={handleInputChange}
        className='border-none min-h-[3rem] max-h-[20rem] flex-grow bg-gray-900 focus:ring-0 text-white resize-none custom-scrollbar'
        style={{ overflow: 'auto' }}
        onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e)}
      />
      <Button
        type='submit'
        variant='contained'
        className='bg-gray-800 hover:bg-gray-500 rounded-none'
      >
        <AiOutlineSend className='h-6 w-6 -rotate-12' />
      </Button>
    </form>
  );
};

export default ChatInput;
