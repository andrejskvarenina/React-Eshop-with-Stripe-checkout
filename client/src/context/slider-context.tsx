import React, { createContext, useState } from 'react';

type ContextType = {
  showCart: boolean;
  handleCartToggle: () => void;
};

export const SliderContext = createContext<ContextType>({
  showCart: false,
  handleCartToggle: () => {},
});

export const SliderContextProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [showCart, setShowCart] = useState(false);

  const handleCartToggle = () => {
    setShowCart(!showCart);
  }

  const contextValue = { showCart, handleCartToggle };

  return (
    <SliderContext.Provider value={contextValue}>
      {children}
    </SliderContext.Provider>
  )
}
