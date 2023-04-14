import { Select } from '@mui/material';
import ChatInput from './ChatInput';
import { useUser } from '../contexts/UserContext';
import { useParams } from 'react-router-dom';
import { QueryDocumentSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import Message from './Message';
import { getMessages } from '../api/firebaseApi';

const ChatPage = () => {
  const {user} = useUser();
  const {chatId} = useParams();
  const [messages, setMessages] = useState<QueryDocumentSnapshot[]>([]);

  const fetchMessages = async () => {
    if (chatId && user) {
      const messagesData = await getMessages(user.uid, chatId);
      setMessages(messagesData.docs);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [chatId, user]);
 
  return (
    <div className='h-screen flex flex-col flex-grow'>
      <div className='h-full flex-1 overflow-y-auto hide-scrollbar p-4'>
        {messages.map((message, index) => (
          <Message
            key={index}
            message={message.get('message')}
            sender={message.get('sender')}
            isUserMessage={message.get('uid') === user.uid}
          />
        ))}
      </div>
      <ChatInput chatId={chatId} setMessages={setMessages} />
    </div>
  );
};

export default ChatPage;
