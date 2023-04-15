import React from 'react';
import { useUser } from '../contexts/UserContext';
import gptPic from '/public/chatGPT_logo.svg';

interface MessageProps {
  content: string;
  isUserMessage: boolean;
}

const Message: React.FC<MessageProps> = ({ content, isUserMessage }) => {
  const { user } = useUser();

  return (
    <div
      className={`flex items-end p-3 mb-1 ${
        isUserMessage ? 'flex-row-reverse' : 'flex-row'
      } gap-3`}
    >
      {isUserMessage ? (
        <img
          src={user?.photoURL}
          alt='userprofilepic'
          className='rounded-full h-12 w-12'
        />
      ) : (
        <img src={gptPic} alt='chatGPT' className='rounded-full h-12 w-12' />
      )}
      <div
        className={`px-4 py-2 rounded-xl max-w-6xl ${
          isUserMessage
            ? 'bg-blue-950 text-white rounded-br-none ml-16'
            : 'bg-gray-800 text-white rounded-bl-none mr-16'
        }`}
      >
        <p>{content}</p>
      </div>
    </div>
  );
};

export default Message;
