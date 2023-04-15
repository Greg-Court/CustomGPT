import { ChatBubbleLeftIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { deleteChat, getPrompt } from '../api/firebaseApi';
import { useUser } from '../contexts/UserContext';
import { Chat } from '../types/types';
import { useEffect, useState } from 'react';

interface ChatProps {
  chat: Chat;
  fetchChatList: () => Promise<void>;
  active: boolean;
}

const ChatRow: React.FC<ChatProps> = ({ chat, fetchChatList, active }) => {
  const navigate = useNavigate();
  const {user} = useUser();
  const [promptName, setPromptName] = useState('');
  
  useEffect(() => {
    const fetchPromptName = async () => {
      const promptSnapshot = await getPrompt(user?.uid, chat.data().prompt);
      setPromptName(promptSnapshot.data().name);
    };
    fetchPromptName();
  }, [user, chat]);

  const selectChat = () => {
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
      <div className='flex gap-2 items-center'>
        <ChatBubbleLeftIcon className='h-5 w-5' />
        <p>{chat.data().model} - {promptName}</p>
      </div>
      <TrashIcon className='h-5 w-5 opacity-25 hover:opacity-100' onClick={(event) => handleDelete(event)}/>
    </div>
  );
};

export default ChatRow;
