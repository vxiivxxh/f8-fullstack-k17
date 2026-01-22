import { create } from "zustand";
import { loginApi, getProfileApi } from "../api/auth.api";
import { setToken, removeToken, getToken } from "../utils/storage";

export const useAuth = create((set) => ({
  token: getToken(),
  isAuthenticated: !!getToken(),
  isLoading: false,
  error: null,

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const data = await loginApi({ email, password });
      setToken(data.access_token);

      const userData = await getProfileApi(data.access_token);
      set({
        isAuthenticated: true,
        user: userData,
        token: data.access_token,
      });
      return true;
    } catch (error) {
      set({ error: error.message });
      return false;
    } finally {
      set({ isLoading: false });
    }
  },

  restoreAuth: async () => {
    set({ isLoading: true });
    try {
      const token = getToken();
      if (!token) {
        set({
          isLoading: false,
          isAuthenticated: false,
          user: null,
          token: null,
        });
        return;
      }
      
      const user = await getProfileApi(token);
      set({ user, isAuthenticated: true, token, error: null });
    } catch (error) {
      removeToken();
      set({
        user: null,
        isAuthenticated: false,
        token: null,
        error: error.message,
      });
    } finally {
      set({ isLoading: false });
    }
  },

  logout: () => {
    removeToken();
    set({ user: null, isAuthenticated: false, token: null });
  },
  setUser: (user) => {
    set({ user, isAuthenticated: true });
  },
  setLoading: (isLoading) => set({ isLoading }),
}));
