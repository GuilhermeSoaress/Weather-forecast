import { create } from 'zustand';

export const useWeatherStore = create((set) => ({
  currentWeather: null,
  forecast: null,
  isLoading: false,
  error: null,
  currentTheme: null,

  setCurrentWeather: (currentWeather) => set({ currentWeather }),
  setForecast: (forecast) => set({ forecast }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  setCurrentTheme: (currentTheme) => set({ currentTheme }),

  reset: () =>
    set({
      currentWeather: null,
      forecast: null,
      isLoading: false,
      error: null,
      currentTheme: null,
    }),
}));
