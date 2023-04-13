import { TrashIcon, UserIcon, CogIcon, QuestionMarkCircleIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import SideBarOption from './SideBarOption';

const SideBarOptions = () => {
  const clearConversations = () => {
    console.log('Clear conversations');
  };

  const myPlan = () => {
    console.log('My Plan');
  };

  const settings = () => {
    console.log('Settings');
  };

  const getHelp = () => {
    console.log('Get help');
  };

  const logOut = () => {
    console.log('Log out');
  };

  return (
    <div className="text-white flex flex-col items-center">
      <div className='w-full border-gray-700 border mb-1'></div>
      <SideBarOption IconComponent={TrashIcon} label="Clear conversations" onClick={clearConversations} />
      <SideBarOption IconComponent={UserIcon} label="My Plan" onClick={myPlan} />
      <SideBarOption IconComponent={CogIcon} label="Settings" onClick={settings} />
      <SideBarOption IconComponent={QuestionMarkCircleIcon} label="Get help" onClick={getHelp} />
      <SideBarOption IconComponent={ArrowRightOnRectangleIcon} label="Log out" onClick={logOut} />
    </div>
  );
};

export default SideBarOptions;