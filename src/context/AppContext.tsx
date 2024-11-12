import { userManager } from "@/helpers/database";
import { User as DatabaseUser } from "@/helpers/database/models";
import { User } from "@telegram-apps/sdk";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useRef,
  Dispatch,
  SetStateAction,
} from "react";

// const neuroEnergyPerSecond = 0.0013;
const neuroEnergyPerSecond = 0.0013;
const startingAmount = 0;
const neuroEnergyProductionStepMs = 1000;

interface UserData {
  energyAmount: number;
}

type AppContextType = {
  setEnergyProductionEnabled: (newVal: boolean) => void;
  isEnergyProductionEnabled: () => boolean;

  energyAmount: number;
  setEnergyAmount: Dispatch<SetStateAction<number>>;

  unclaimedEnergyAmount: number;
  setUnclaimedEnergyAmount: Dispatch<SetStateAction<number>>;

  initUserData?: User;
  setInitUserData: Dispatch<SetStateAction<User | undefined>>;

  userData?: User;
  setUserData: Dispatch<SetStateAction<User | undefined>>;

  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  // initDatabase: (userId?: number) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

type AppProviderProps = {
  children: ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [initUserData, setInitUserData] = useState<User | undefined>();
  const [userData, setUserData] = useState<any | undefined>();
  const _isEnergyProductionEnabled = useRef<boolean>(false);
  const [energyAmount, setEnergyAmount] = useState<number>(startingAmount);
  const [unclaimedEnergyAmount, setUnclaimedEnergyAmount] = useState<number>(0);

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  const setEnergyProductionEnabled = (val: boolean) => {
    _isEnergyProductionEnabled.current = val;
  };

  const isEnergyProductionEnabled = () => {
    return _isEnergyProductionEnabled.current;
  };

  useEffect(() => {
    const updateContext = async () => {
      if (!initUserData) {
        return;
      }
      const userId = initUserData?.id;
      if (!userId) {
        return;
      }

      const uManager = userManager();

      let dbUserData = await uManager.getUserData();
      if (!dbUserData) {
        dbUserData = new DatabaseUser({
          id: userId,
          energyAmount: 0,
        });
        await uManager.saveUserData(dbUserData);
        console.debug("creating new user");
      }
      if (dbUserData) {
        setUserData(dbUserData);

        const { energyAmount } = dbUserData as any;
        if (energyAmount) {
          setEnergyAmount(energyAmount);
        }
      }
    };
    updateContext();
  }, [initUserData]);

  useEffect(() => {
    const uManager = userManager();
    const syncTelegramDb = async () => {
      if (!initUserData) {
        return;
      }
      const userId = initUserData?.id;
      if (!userId) {
        return;
      }
      const user = new DatabaseUser({
        id: userId,
        energyAmount,
      });
      const updateAnswer = await uManager.saveUserData(user);
      console.log("updateAnswer", updateAnswer);
    };
    syncTelegramDb();
  }, [energyAmount]);

  useEffect(() => {
    // setTimeout(() => {
    //   console.log("initDataState", initDataState?.user);
    // }, 2000);
    // const userDbKey = `user_${userId}`;
    // console.log("TelegramCloudStorage", TelegramCloudStorage.get(userDbKey))
    // setUnclaimedEnergyAmount((prevCount) => prevCount + neuroEnergyPerSecond);

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
      setUnclaimedEnergyAmount((prevCount) => prevCount + neuroEnergyPerSecond); // Increment the float count
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
        unclaimedEnergyAmount,
        setUnclaimedEnergyAmount,
        // initDatabase,
        initUserData,
        setInitUserData,
        //
        setUserData,
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
