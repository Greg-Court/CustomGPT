import { useUser } from '../contexts/UserContext';
import NewChat from './NewChat';
import SideBarOptions from './SideBarOptions';

const SideBar = () => {
  const user = useUser();
  console.log(user)

  return (
    <div className='bg-gray-800 overflow-y-auto md:min-w-[15rem] lg:min-w-[17.5rem] xl:min-w-[20rem] p-2 flex flex-col h-screen min-w-[13rem]'>
      <div className='flex-1'>
        <div>
          <NewChat />
          {/* Map through the ChatRows */}
        </div>
      </div>
      <SideBarOptions />
    </div>
  );
};

export default SideBar;
