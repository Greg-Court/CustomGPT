import { useEffect, useState } from 'react';
import { useUser } from '../contexts/UserContext';
import NewChat from './NewChat';
import SideBarOptions from './SideBarOptions';
import { getChatList } from '../api/firebaseApi';
import { QueryDocumentSnapshot } from 'firebase/firestore';
import ChatRow from './ChatRow';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { getModelOptions } from '../api/openaiApi';
import ModelSelect from './ModelSelect';

const SideBar = () => {
  const { user } = useUser();
  const [chatList, setChatList] = useState<QueryDocumentSnapshot[]>([]);
  const { chatId } = useParams<{ chatId: string }>();
  const navigate = useNavigate();
  const [modelOptions, setModelOptions] = useState<
    { value: string; label: string }[]
  >([]);

  useEffect(() => {
    const fetchModelOptions = async () => {
      const options = await getModelOptions();
      setModelOptions(options);
    };
    fetchModelOptions();
  }, []);

  const fetchChatList = async () => {
    const chatData = await getChatList(user?.uid!);
    setChatList(chatData.docs);
    if (chatData.docs.length === 0) {
      navigate('/app');
    }
  };

  useEffect(() => {
    fetchChatList();
  }, [user]);

  return (
    <div className='shadow-lg bg-gray-800 md:min-w-[15rem] lg:min-w-[17.5rem] xl:min-w-[20rem] p-2 flex flex-col h-screen min-w-[13rem] justify-between'>
      <div>
        <ModelSelect modelOptions={modelOptions}/>
        <NewChat setChatList={setChatList} />
        <div className='overflow-y-auto hide-scrollbar'>
          {chatList.map((chat, index) => (
            <ChatRow
              key={index}
              chat={chat}
              fetchChatList={fetchChatList}
              active={chat.id === chatId}
            />
          ))}
        </div>
      </div>
      <SideBarOptions />
    </div>
  );
};

export default SideBar;
