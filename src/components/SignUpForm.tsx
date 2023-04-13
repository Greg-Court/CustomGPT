import { Button } from '@mui/material';
import { auth, googleProvider } from '../config/firebase';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useState } from 'react';

interface SignUpFormProps {
  setCreateAccount: (value: boolean) => void;
  onSuccess: () => void;
}

export const SignUpForm = ({
  setCreateAccount,
  onSuccess,
}: SignUpFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const createAccount = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      onSuccess();
    } catch (err) {
      console.error(err);
    }
  };

  const signInWithGoogle = async () => {
    try {
      const response = await signInWithPopup(auth, googleProvider);
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className='flex flex-col gap-2 mt-2 min-w-[20rem]'>
      <input
        placeholder='First Name...'
        type='text'
        className='rounded-md'
        onChange={(e) => setFirstName(e.target.value)}
      />
      <input
        placeholder='Last Name...'
        type='text'
        className='rounded-md'
        onChange={(e) => setLastName(e.target.value)}
      />
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
      <input
        placeholder='Confirm Password...'
        type='password'
        className='rounded-md'
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <Button
        variant='contained'
        className='authButton'
        onClick={createAccount}
      >
        Create Account
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
          setCreateAccount(false);
        }}
      >
        Back To Login
      </Button>
    </div>
  );
};
