import { sessionStorage, storage } from '../storage';
import { IUser } from '../types';

export interface IAuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
}

const AUTH_USER_KEY = 'auth_user';
const AUTH_TOKENS_KEY = 'auth_tokens';

export const authStorage = {
  async getUser(): Promise<IUser | null> {
    return await storage.get<IUser>(AUTH_USER_KEY, sessionStorage);
  },

  async setUser(user: IUser): Promise<void> {
    await storage.set(AUTH_USER_KEY, user, sessionStorage);
  },

  async getTokens(): Promise<IAuthTokens | null> {
    return await storage.get<IAuthTokens>(AUTH_TOKENS_KEY, sessionStorage);
  },

  async setTokens(tokens: IAuthTokens): Promise<void> {
    await storage.set(AUTH_TOKENS_KEY, tokens, sessionStorage);
  },

  async clearAuth(): Promise<void> {
    await storage.remove(AUTH_USER_KEY, sessionStorage);
    await storage.remove(AUTH_TOKENS_KEY, sessionStorage);
  },

  async isAuthenticated(): Promise<boolean> {
    const tokens = await this.getTokens();
    if (!tokens) return false;
    return Date.now() < tokens.expiresAt;
  },
};

export default authStorage;
