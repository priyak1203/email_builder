import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [isEditing, setIsEditing] = useState(false);

  const setEditing = () => {
    setIsEditing(true);
  };

  return (
    <AppContext.Provider value={{ isEditing, setEditing }}>
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useAppContext };
