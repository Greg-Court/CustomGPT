import { useEffect, useState } from 'react';
import { useUser } from '../contexts/UserContext';
import NewChat from './NewChat';
import SideBarOptions from './SideBarOptions';
import { getChatList } from '../api/firebaseApi';
import { QueryDocumentSnapshot } from 'firebase/firestore';
import ChatRow from './ChatRow';

const SideBar = () => {
  const { user } = useUser();
  const [chatList, setChatList] = useState<QueryDocumentSnapshot[]>([]);

  const fetchChatList = async () => {
    const chatData = await getChatList(user?.uid!);
    setChatList(chatData.docs);
  };

  useEffect(() => {
    fetchChatList();
  }, [user]);

  return (
    <div className='bg-gray-800 md:min-w-[15rem] lg:min-w-[17.5rem] xl:min-w-[20rem] p-2 flex flex-col h-screen min-w-[13rem] justify-between'>
      <div>
        <NewChat setChatList={setChatList} />
        <div className='overflow-y-auto hide-scrollbar'>
          {chatList.map((chat, index) => (
            <ChatRow key={index} chat={chat} fetchChatList={fetchChatList} />
          ))}
        </div>
      </div>
      <SideBarOptions />
    </div>
  );
};

export default SideBar;
