import { create } from 'zustand';

export const useWeatherStore = create((set) => ({
  current: null,
  forecast: null,

  setCurrent: (current) => set({ current }),
  setForecast: (forecast) => set({ forecast }),

  reset: () => set({ current: null, forecast: null }),
}));
