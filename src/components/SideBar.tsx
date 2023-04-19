import { useEffect, useState } from 'react';
import { useUser } from '../contexts/UserContext';
import NewChat from './NewChat';
import SideBarOptions from './SideBarOptions';
import { createChat, getChat, getChatList, getPrompt, setChatSystemPrompt } from '../api/firebaseApi';
import { QueryDocumentSnapshot } from 'firebase/firestore';
import ChatRow from './ChatRow';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { getModelOptions } from '../api/openaiApi';
import ModelSelect from './ModelSelect';
import SystemPromptSelect from './SystemPromptSelect';
import { getPrompts } from '../api/firebaseApi';

const SideBar = () => {
  const { user } = useUser();
  const [chatList, setChatList] = useState<QueryDocumentSnapshot[]>([]);
  const { chatId } = useParams<{ chatId: string }>();
  const navigate = useNavigate();
  const [modelOptions, setModelOptions] = useState<
    { value: string; label: string }[]
  >([]);
  const [promptOptions, setPromptOptions] = useState<
    { value: string; label: string }[]
  >([]);
  const [selectedModel, setSelectedModel] = useState<string>('');
  const [selectedPrompt, setSelectedPrompt] = useState<string>('');

  const handleCreateNewChat = async () => {
    if (!selectedModel || !selectedPrompt) {
      alert('Please select both a model and a prompt.');
      return;
    }
    const chatId = await createChat(user?.uid!, selectedModel, selectedPrompt);
    const newChat = await getChat(user?.uid!, chatId);
    const promptContent = (await getPrompt(user?.uid!, selectedPrompt)).get('content');
    setChatSystemPrompt(user?.uid!, chatId, promptContent);
    setChatList((prevChats) => [...prevChats, newChat]);
    navigate(`/app/chats/${chatId}`);
  };

  const fetchPromptOptions = async () => {
    const promptsSnapshot = await getPrompts(user?.uid!);
    const promptsData = promptsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    const options = promptsData.map((prompt) => ({
      value: prompt.id,
      label: prompt.name,
    }));
    setPromptOptions(options);
  };

  useEffect(() => {
    if (user) {
      fetchPromptOptions();
    }
  }, [user]);

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
        <ModelSelect
          modelOptions={modelOptions}
          setSelectedModel={setSelectedModel}
        />
        <SystemPromptSelect
          promptOptions={promptOptions}
          setSelectedPrompt={setSelectedPrompt}
          userUid={user?.uid!}
        />
        <NewChat
          setChatList={setChatList}
          handleCreateNewChat={handleCreateNewChat}
        />
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
