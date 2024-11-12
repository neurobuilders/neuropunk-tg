import { TelegramCloudStorage } from "@/helpers/telegram";
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

type AppContextType = {
  setEnergyProductionEnabled: (newVal: boolean) => void;
  isEnergyProductionEnabled: () => boolean;

  energyAmount: number;
  setEnergyAmount: Dispatch<SetStateAction<number>>;

  unclaimedEnergyAmount: number;
  setUnclaimedEnergyAmount: Dispatch<SetStateAction<number>>;

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
  const [userData, setUserData] = useState<User | undefined>();
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

  // const initDatabase = async (userId?: number) => {
  //   try {
  //     // const db = new PouchDB(databaseName, {
  //     //   revs_limit: 1,
  //     //   adapter: "telegram",
  //     // });
  //     const db = new TelegramCloudStorage();
  //     database.current = db;
  //     console.log("cloudStorage.isSupported;", isCloudStorageSupported());
  //     console.log("db", db);
  //     const userDbKey = `user_${userId}`;
  //     try {
  //       const foundRecord = await db.get(userDbKey);
  //       console.log("foundRecord", foundRecord);
  //       if (foundRecord) {
  //         const removeResult = await db.remove(userDbKey);
  //         console.log("removeResult", removeResult);
  //       }
  //     } catch (err) {
  //       console.error(err);
  //     }

  //     const savedData = await db.put(userDbKey, {
  //       energyAmount: 0,
  //       respectAmount: 0,
  //     });
  //     console.log("savedData", savedData);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  useEffect(() => {
    const syncTelegramDb = async () => {
      if (!userData) {
        return;
      }
      const userId = userData?.id;
      if (!userId) {
        return;
      }
      const userDbKey = `user_${userId}`;
      const dbUserData = await TelegramCloudStorage.get(userDbKey);
      console.log("dbUserData", dbUserData);
      const { energyAmount } = dbUserData;
      setEnergyAmount(energyAmount);
    };
    syncTelegramDb();
  }, [userData]);

  useEffect(() => {
    const syncTelegramDb = async () => {
      if (!userData) {
        return;
      }
      const userId = userData?.id;
      if (!userId) {
        return;
      }
      const userDbKey = `user_${userId}`;
      const answer = await TelegramCloudStorage.put(userDbKey, {
        energyAmount,
      });
      console.log("answer", answer);
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
        userData,
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
