// AppContext.tsx
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useRef,
} from "react";

// const neuroEnergyPerSecond = 0.0013;
const neuroEnergyPerSecond = 10.0013;
const startingAmount = 0;
const neuroEnergyProductionStepMs = 1000;

type AppContextType = {
  setEnergyProductionEnabled: (newVal: boolean) => void;
  isEnergyProductionEnabled: () => boolean;
  energyAmount: number;
  setEnergyAmount: (amount: number) => void;

  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

type AppProviderProps = {
  children: ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const _isEnergyProductionEnabled = useRef<boolean>(false);
  const [energyAmount, setEnergyAmount] = useState<number>(startingAmount);

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  const setEnergyProductionEnabled = (val: boolean) => {
    _isEnergyProductionEnabled.current = val;
  };

  const isEnergyProductionEnabled = () => {
    return _isEnergyProductionEnabled.current;
  };

  useEffect(() => {
    setEnergyAmount((prevCount) => prevCount + neuroEnergyPerSecond);

    const interval = setInterval(() => {
      console.log(
        "useEffect interval",
        _isEnergyProductionEnabled.current,
        "energyAmount",
        energyAmount
      );
      if (!_isEnergyProductionEnabled.current) {
        return;
      }
      setEnergyAmount((prevCount) => prevCount + neuroEnergyPerSecond); // Increment the float count
    }, neuroEnergyProductionStepMs); // Update every second (1000 ms)

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <AppContext.Provider
      value={{
        isDrawerOpen,
        openDrawer,
        closeDrawer,
        energyAmount,
        setEnergyAmount,
        isEnergyProductionEnabled,
        setEnergyProductionEnabled,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
