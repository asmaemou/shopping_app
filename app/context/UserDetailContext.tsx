import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define an interface for the user details
interface UserDetails {
  cardNumber: string;
  address: string;
  apt: string;
  country: string;
  city: string;
}

// Define an interface for the context value
interface UserDetailsContextValue {
  userDetails: UserDetails;
  updateUserDetails: (details: UserDetails) => void;
  clearUserDetails: () => void;
}

// Create the context with a default value
const UserDetailsContext = createContext<UserDetailsContextValue | null>(null);

// Define props for UserDetailsProvider component
interface UserDetailsProviderProps {
  children: ReactNode;
}

export const UserDetailsProvider: React.FC<UserDetailsProviderProps> = ({ children }) => {
  const [userDetails, setUserDetails] = useState<UserDetails>({
    cardNumber: '',
    address: '',
    apt: '',
    country: '',
    city: '',
  });

  const updateUserDetails = (details: UserDetails) => {
    setUserDetails(details);
  };

  const clearUserDetails = () => {
    setUserDetails({
      cardNumber: '',
      address: '',
      apt: '',
      country: '',
      city: '',
    });
  };

  return (
    <UserDetailsContext.Provider value={{ userDetails, updateUserDetails, clearUserDetails }}>
      {children}
    </UserDetailsContext.Provider>
  );
};

export const useUserDetails = (): UserDetailsContextValue => {
  const context = useContext(UserDetailsContext);
  if (!context) {
    throw new Error('useUserDetails must be used within a UserDetailsProvider');
  }
  return context;
};
