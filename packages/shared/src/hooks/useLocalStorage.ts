import { useState, useEffect } from 'react';

import { storage, userStorage } from '../storage';

export const useLocalStorage = <T>(
  key: string,
  initialValue: T,
  store = userStorage,
): [T, (value: T) => Promise<void>, () => Promise<void>] => {
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  // Load initial value
  useEffect(() => {
    const loadValue = async () => {
      try {
        const item = await storage.get<T>(key, store);
        if (item !== null) {
          setStoredValue(item);
        }
      } catch (error) {
        console.error(`Error loading ${key} from storage:`, error);
      }
    };
    void loadValue();
  }, [key, store]);

  const setValue = async (value: T) => {
    try {
      setStoredValue(value);
      await storage.set(key, value, store);
    } catch (error) {
      console.error(`Error saving ${key} to storage:`, error);
    }
  };

  const removeValue = async () => {
    try {
      setStoredValue(initialValue);
      await storage.remove(key, store);
    } catch (error) {
      console.error(`Error removing ${key} from storage:`, error);
    }
  };

  return [storedValue, setValue, removeValue];
};

export default useLocalStorage;
