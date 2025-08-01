// context/CountContext.tsx

import { createContext, useContext, useState, ReactNode } from "react";

// Define the context value type
interface CountContextProps {
  count: number;
  increment: () => void;
  decrement: () => void;
}

// Create the context
export const CountContext = createContext<CountContextProps | undefined>(undefined);

// Provider component
export const CountProvider = ({ children }: { children: ReactNode }) => {
  const [count, setCount] = useState<number>(0);

  // Explicit functions (required by ALX validator)
  const increment = (): void => setCount((count) => count + 1);
  const decrement = (): void => setCount((count) => (count > 0 ? count - 1 : 0));

  // Explicit value object
  const value: CountContextProps = {
    count,
    increment,
    decrement,
  };

  return (
    <CountContext.Provider value={value}>
      {children}
    </CountContext.Provider>
  );
};

// Custom hook to use the context
export const useCount = (): CountContextProps => {
  const context = useContext(CountContext);
  if (!context) {
    throw new Error("useCount must be within a Count Provider");
  }
  return context;
};
