import { ChatBubbleLeftIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { deleteChat } from '../api/firebaseApi';
import { useUser } from '../contexts/UserContext';
import { Chat } from '../types/types';

interface ChatProps {
  chat: Chat;
  fetchChatList: () => Promise<void>;
  active: boolean;
}

const ChatRow: React.FC<ChatProps> = ({ chat, fetchChatList, active }) => {
  const navigate = useNavigate();
  const {user} = useUser();

  const selectChat = () => {
    console.log(JSON.stringify(chat));
    navigate(`/app/chats/${chat.id}`);
  };

  const handleDelete = async (event) => {
    event.stopPropagation();
    await deleteChat(user?.uid!, chat.id);
    fetchChatList();
  };

  return (
    <div
      className={`chatRow justify-between my-2 px-2 ${active && '!bg-gray-700'}`}
      chat={chat}
      onClick={selectChat}
    >
      <div className='flex gap-2'>
        <ChatBubbleLeftIcon className='h-5 w-5' />
        <p>Chat</p>
      </div>
      <TrashIcon className='h-5 w-5 opacity-25 hover:opacity-100' onClick={(event) => handleDelete(event)}/>
    </div>
  );
};

export default ChatRow;
