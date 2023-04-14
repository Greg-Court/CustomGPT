import { useState } from 'react';
import { Button, TextareaAutosize } from '@mui/material';
import { AiOutlineSend } from 'react-icons/ai';
import { sendMessage } from '../api/firebaseApi';
import { useUser } from '../contexts/UserContext';

interface ChatInputProps {
  chatId: string;
  // setMessages: 
}

const ChatInput: React.FC<ChatInputProps> = ({ chatId, setMessages }) => {
  const { user } = useUser();
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;

    if (user) {
      const newMessage = await sendMessage(user.uid, chatId, inputValue);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInputValue('');
    }
  };

  return (
    <form className='flex w-full' onSubmit={handleSubmit}>
      <TextareaAutosize
        value={inputValue}
        onChange={handleInputChange}
        className='min-h-[3rem] max-h-[20rem] flex-grow bg-gray-900 border-none focus:ring-0 text-white resize-none custom-scrollbar'
        style={{ overflow: 'auto' }}
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