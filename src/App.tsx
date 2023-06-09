import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import AuthPage from './conatiners/AuthPage';
import MainPage from './conatiners/MainPage';
import { UserProvider } from './contexts/UserContext';
import ChatArea from './components/ChatArea';
import Landing from './components/Landing';
import { Toaster } from 'react-hot-toast';

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='/' element={<AuthPage />} />
        <Route path='/app' element={<MainPage />}>
          <Route path='/app' element={<Landing />} />
          <Route path='chats/:chatId' element={<ChatArea />} />
        </Route>
      </>
    )
  );

  return (
    <UserProvider>
      <RouterProvider router={router} />
      <Toaster containerClassName="toast-container"/>
    </UserProvider>
  );
}

export default App;
