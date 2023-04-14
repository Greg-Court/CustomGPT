import { Button } from '@mui/material';
import { auth, googleProvider } from '../config/firebase';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useState } from 'react';

interface SignInFormProps {
  setCreateAccount: (value: boolean) => void;
  onSuccess: () => void;
}

export const SignInForm = ({
  setCreateAccount,
  onSuccess,
}: SignInFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signIn = async () => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      onSuccess();
    } catch (err) {
      console.error(err);
    }
  };

  const signInWithGoogle = async () => {
    try {
      const response = await signInWithPopup(auth, googleProvider);
      onSuccess();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className='flex flex-col gap-2 mt-2 min-w-[20rem]'>
      <input
        placeholder='Email...'
        type='text'
        className='rounded-md'
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder='Password...'
        type='password'
        className='rounded-md'
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button variant='contained' className='authButton' onClick={signIn}>
        Sign In
      </Button>
      <Button
        variant='contained'
        className='authButton'
        onClick={signInWithGoogle}
      >
        <img
          src='https://www.vectorlogo.zone/logos/google/google-icon.svg'
          alt=''
          className='h-6 w-6'
        />
        Sign in with Google
      </Button>
      <Button
        variant='contained'
        className='authButton'
        onClick={() => {
          setCreateAccount(true);
        }}
      >
        Create Account
      </Button>
    </div>
  );
};
