import { PlusIcon } from '@heroicons/react/24/solid';
import { useUser } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import { createNewChat } from '../api/firebaseApi';

const NewChat = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  const handleCreateNewChat = async () => {
    const chatId = await createNewChat(user?.uid!);
    navigate(`/app/chats/${chatId}`);
  };

  return (
    <div className='border-gray-700 border chatRow' onClick={handleCreateNewChat}>
      <PlusIcon className='h-4 w-4' />
      <p>New Chat</p>
    </div>
  );
};

export default NewChat;
