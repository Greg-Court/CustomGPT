import React from 'react';
import { useUser } from '../contexts/UserContext';

interface MessageProps {
  message: string;
  sender: string;
  isUserMessage: boolean;
}

const Message: React.FC<MessageProps> = ({
  message,
  sender,
  isUserMessage,
}) => {
  const {user} = useUser();

  return (
    <div
      className={`flex items-center p-3 text-white gap-5 ${
        isUserMessage ? 'bg-blue-950' : 'bg-gray-800'
      }`}
    >
      <img src={user?.photoURL} alt="userprofilepic" className='rounded-full h-12 w-12' />
      <p className='flex items-center'>{message}</p>
    </div>
  );
};

export default Message;
