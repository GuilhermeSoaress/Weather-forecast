import { create } from 'zustand';

export const useLocationStore = create((set) => ({
  coords: null,
  cityName: '',
  isLoading: false,
  error: null,

  setCoords: (coords) => set({ coords }),
  setCityName: (cityName) => set({ cityName }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),

  reset: () =>
    set({
      coords: null,
      cityName: '',
      isLoading: false,
      error: null,
    }),
}));
