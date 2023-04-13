import { useState, useEffect } from 'react';
import { SignInForm } from '../components/SignInForm';
import { SignUpForm } from '../components/SignUpForm';
import { useNavigate } from 'react-router-dom';
import { GPTVariations } from '../lib/GPTVariations';

const AuthPage = () => {
  const [createAccount, setCreateAccount] = useState<boolean>(false);
  const [gptNameIndex, setGptNameIndex] = useState<number>(0);
  const [gptName, setGptName] = useState<string>(GPTVariations[gptNameIndex]);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setGptNameIndex((prevIndex) => {
        let newIndex;
        do {
          newIndex = Math.floor(Math.random() * GPTVariations.length);
        } while (newIndex === prevIndex);
        return newIndex;
      });

      setGptName((prevState) => {
        return GPTVariations[gptNameIndex];
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [gptNameIndex]);

  const handleSuccess = () => {
    navigate('/app');
  };

  return (
    <div className='flex justify-center items-center h-screen flex-col bg-gray-950'>
      <img src="public/chatGPT_logo.svg" alt="chatGPT logo" className='h-20 w-20'/>
      <h1 className='text-2xl text-white transition-opacity duration-700 ease-in-out opacity-100 mb-5 mt-3'>
        {gptName}
      </h1>
      {createAccount ? (
        <SignUpForm setCreateAccount={setCreateAccount} onSuccess={handleSuccess}/>
      ) : (
        <SignInForm setCreateAccount={setCreateAccount} onSuccess={handleSuccess}/>
      )}
    </div>
  );
};

export default AuthPage;