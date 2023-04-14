import { ChatBubbleLeftIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

const ChatRow = ({chat}) => {
  const navigate = useNavigate();

  const selectChat = () => {
    console.log(JSON.stringify(chat))
    navigate(`/app/chats/${chat.id}`);
  }

  return (
    <div className='chatRow justify-start my-2 pl-1' chat={chat} onClick={selectChat}>
      <ChatBubbleLeftIcon className='h-5 w-5' />
      <p>Chat</p>
    </div>
  );
}

export default ChatRow