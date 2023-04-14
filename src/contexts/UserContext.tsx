import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../config/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';

// Define the type for the user context value
type UserContextValue = {
  user: User | null;
};

// Create a context for user data with a default value of { user: null }
const UserContext = createContext<UserContextValue>({
  user: null,
});

// Custom hook for consuming the user context, allowing access to the 'user' value in other components
export const useUser = () => useContext(UserContext);

// Define the type for UserProvider component's  s props
type UserProviderProps = {
  children: React.ReactNode;
};

// UserProvider component wraps its children with the UserContext, enabling them to access the 'user' value
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  // Initialize a state variable 'user' with a default value of null and a corresponding 'setUser' function
  const [user, setUser] = useState<User | null>(null);

  // Run the side effect once on component mount to set up the authentication state listener
  useEffect(() => {
    // Set up a listener for changes in the authentication state using 'onAuthStateChanged' from Firebase
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // Update the 'user' state with the new user data when the authentication state changes
      setUser(user);
    });

    // Clean up the listener when the component is unmounted to prevent memory leaks
    return () => {
      unsubscribe();
    };
  }, []);

  // Wrap the children with UserContext.Provider and pass the 'user' state as the context value
  // This allows the children components to access the 'user' value through the 'useUser' hook
  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};
