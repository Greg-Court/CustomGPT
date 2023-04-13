import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import AuthPage from './conatiners/AuthPage';
import MainPage from './conatiners/MainPage';
import { UserProvider } from './contexts/UserContext';
import Landing from './components/Landing';

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='/' element={<AuthPage />} />
        <Route path='/app' element={<MainPage />}>
        </Route>
      </>
    )
  );

  return (
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  );
}

export default App;
