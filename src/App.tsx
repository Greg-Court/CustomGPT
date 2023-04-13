import { Button } from '@mui/material';
import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { SignInPage } from './conatiners/SignInPage';

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<SignInPage />}>
        <Route path='/listings' element={<Listings />} />
      </Route>
    )
  );

  return (
    <div className='bg-green-500'>
      <h1>Hello World</h1>
      <Button variant='contained' className='bg-red-500'>Testing MUI & Tailwind Injection</Button>
    </div>
  );
}

export default App;
