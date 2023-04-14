import React from 'react';

interface MessageProps {
  message: string;
  sender: string;
  isUserMessage: boolean;
}

const Message: React.FC<MessageProps> = ({ message, sender, isUserMessage }) => {
  return (
    <div
      className={`max-w-5xl mx-2 my-1 p-3 rounded-lg ${
        isUserMessage ? 'bg-blue-950 text-white ml-auto' : 'bg-gray-300 text-gray-800 mr-auto'
      }`}
    >
      {!isUserMessage && <p className='text-xs text-gray-900 mb-1'>{sender}</p>}
      <p>{message}</p>
    </div>
  );
};

export default Message;