import React from 'react';

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
  return (
    <div
      className={`max-w-5xl mx-2 my-1 p-3 rounded-lg text-white ${
        isUserMessage
          ? 'bg-blue-950 ml-auto'
          : 'bg-gray-800 mr-auto'
      }`}
    >
      <p>{message}</p>
    </div>
  );
};

export default Message;
