import { create } from 'zustand';

export const useLocationStore = create((set) => ({
  coords: null,
  cityName: '',

  setCoords: (coords) => set({ coords }),
  setCityName: (cityName) => set({ cityName }),

  reset: () => set({ coords: null, cityName: '' }),
}));
