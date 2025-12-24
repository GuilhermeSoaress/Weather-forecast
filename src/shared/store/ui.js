import { create } from 'zustand';

export const useUIStore = create((set) => ({
  isLoading: false,
  error: null,

  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  clearError: () => set({ error: null }),
}));
