import localforage from 'localforage';

// Configure localforage instances for different data types
export const userStorage = localforage.createInstance({
  name: 'becc',
  storeName: 'user_data',
  description: 'User data and preferences',
});

export const cacheStorage = localforage.createInstance({
  name: 'becc',
  storeName: 'cache',
  description: 'Application cache',
});

export const sessionStorage = localforage.createInstance({
  name: 'becc',
  storeName: 'session',
  description: 'Session data',
  driver: localforage.LOCALSTORAGE,
});

// Generic storage utilities
export const storage = {
  async get<T>(key: string, store = userStorage): Promise<T | null> {
    return await store.getItem<T>(key);
  },

  async set<T>(key: string, value: T, store = userStorage): Promise<T> {
    return await store.setItem<T>(key, value);
  },

  async remove(key: string, store = userStorage): Promise<void> {
    await store.removeItem(key);
  },

  async clear(store = userStorage): Promise<void> {
    await store.clear();
  },

  async keys(store = userStorage): Promise<string[]> {
    return await store.keys();
  },
};

// Cache with expiration
interface ICacheItem<T> {
  data: T;
  timestamp: number;
  expiresIn?: number;
}

export const cache = {
  async get<T>(key: string, maxAge?: number): Promise<T | null> {
    const item = await cacheStorage.getItem<ICacheItem<T>>(key);
    if (!item) return null;

    const age = Date.now() - item.timestamp;
    const expiresIn = maxAge ?? item.expiresIn;

    if (expiresIn && age > expiresIn) {
      await cacheStorage.removeItem(key);
      return null;
    }

    return item.data;
  },

  async set<T>(key: string, data: T, expiresIn?: number): Promise<void> {
    const item: ICacheItem<T> = {
      data,
      timestamp: Date.now(),
      expiresIn,
    };
    await cacheStorage.setItem(key, item);
  },

  async remove(key: string): Promise<void> {
    await cacheStorage.removeItem(key);
  },

  async clear(): Promise<void> {
    await cacheStorage.clear();
  },
};

export default storage;
