import { create } from 'zustand';

export const useWeatherStore = create((set) => ({
  currentWeather: null,
  forecast: null,

  setCurrent: (currentWeather) => set({ currentWeather }),
  setForecast: (forecast) => set({ forecast }),

  reset: () => set({ currentWeather: null, forecast: null }),
}));
