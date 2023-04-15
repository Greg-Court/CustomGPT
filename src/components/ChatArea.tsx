import ChatInput from './ChatInput';
import { useUser } from '../contexts/UserContext';
import { useParams } from 'react-router-dom';
import { QueryDocumentSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import Message from './Message';
import { getChat, getMessages } from '../api/firebaseApi';
import { useRef } from 'react';
import { generateAiResponse } from '../api/openaiApi';
import { Chat } from '../types/types';

const ChatArea = () => {
  const { user } = useUser();
  const { chatId } = useParams();
  const [messages, setMessages] = useState<QueryDocumentSnapshot[]>([]);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const [chat, setChat] = useState<Chat>();

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const fetchMessages = async () => {
    if (chatId && user) {
      const messagesData = await getMessages(user.uid, chatId);
      const filteredMessages = messagesData.docs.filter((message) => {
        const role = message.get('role');
        return role === 'user' || role === 'assistant';
      });
      setMessages(filteredMessages);
    }
  };

  useEffect(() => {
    if (chatId && user) {
      const setChatEnv = async () => {
        const currentChat = (await getChat(user?.uid!, chatId));
        setChat(currentChat);
        fetchMessages();
      };
      setChatEnv();
    }
  }, [chatId, user]);

  return (
    <div className='h-screen flex flex-col flex-grow'>
      <div className='h-full flex-1 overflow-y-auto hide-scrollbar'>
        {messages.map((message, index) => (
          <Message
            key={index}
            content={message.get('content')}
            sender={message.get('sender')}
            isUserMessage={message.get('role') === 'user'}
          />
        ))}
        <div ref={bottomRef}></div>
      </div>
      <ChatInput
        chat={chat}
        setMessages={setMessages}
        messages={messages}
        generateAiResponse={generateAiResponse}
      />
    </div>
  );
};

export default ChatArea;
