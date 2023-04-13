import { useState } from 'react';
import { SignInForm } from '../components/SignInForm';
import { SignUpForm } from '../components/SignUpForm';
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
  const [createAccount, setCreateAccount] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate('/app');
  };

  return (
    <div className='flex justify-center items-center h-screen flex-col bg-gray-950'>
      <img src="public/chatGPT_logo.svg" alt="chatGPT logo" className='h-20 w-20'/>
      <h1 className='text-2xl text-white'>CustomGPT</h1>
      {createAccount ? (
        <SignUpForm setCreateAccount={setCreateAccount} onSuccess={handleSuccess}/>
      ) : (
        <SignInForm setCreateAccount={setCreateAccount} onSuccess={handleSuccess}/>
      )}
    </div>
  );
};

export default AuthPage;
