import { ChatBubbleLeftIcon } from '@heroicons/react/24/solid';

const selectChat = () => {

}

const ChatRow = () => {
  return (
    <div className='border-gray-700 border chatRow' onClick={selectChat}>
      <ChatBubbleLeftIcon className='h-4 w-4' />
      <p>Chat</p>
    </div>
  );
}

export default ChatRow