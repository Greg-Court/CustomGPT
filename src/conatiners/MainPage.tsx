import SideBar from '../components/SideBar';
import { Outlet } from 'react-router-dom';

const MainPage = () => {
  return (
    <div className='flex bg-gray-950'>
      <SideBar />
      <Outlet />
    </div>
  );
};

export default MainPage;
