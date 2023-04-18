import { createContext } from 'react';
import { useState } from 'react'

type ContextType = {
  open: boolean;
  setOpen: (open: boolean) => void;
  handleClick: () => void;
};

export const SnackbarContext = createContext<ContextType>({
  open: false,
  setOpen: () => {},
  handleClick: () => {},
});


export const SnackbarContextProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const contextValue = { open, setOpen, handleClick };

  return (
    <SnackbarContext.Provider value={contextValue}>
      {children}
    </SnackbarContext.Provider>
  )
}
