import { CitySuggestions, SearchBar } from '@/features/location';
import {
  CurrentWeather,
  DailyForecast,
  HourlyForecast,
  PrecipitationForecast,
} from '@/features/weather';
import { motion } from 'framer-motion';
import { Navigation } from 'lucide-react';

import { useWeatherDashboard } from '../hooks/useWeatherDashboard';

export const WeatherDashboard = () => {
  const {
    cityName,
    currentWeather,
    forecast,
    isLoading,
    coords,
    hasError,
    handleCitySearch,
    handleBackToLocation,
  } = useWeatherDashboard();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 inline-block h-12 w-12 animate-spin rounded-full border-4 border-white/30 border-t-white"></div>
          <p className="text-xl font-medium text-white">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!currentWeather && !isLoading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
        <div className="mb-12 text-center">
          <h1 className="mb-3 text-5xl font-bold text-white drop-shadow-lg">
            SkyCast
          </h1>
          <p className="text-lg text-white/80">
            Previsão do tempo em tempo real
          </p>
        </div>
        <div className="w-full max-w-md">
          <SearchBar onSearch={handleCitySearch} />
        </div>
        <CitySuggestions onCitySelect={handleCitySearch} />
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-6">
      <div className="mx-auto max-w-2xl">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex-1 text-center">
            <h1 className="text-3xl font-bold text-white drop-shadow-lg">
              SkyCast
            </h1>
            {cityName && (
              <p className="mt-1 text-lg font-medium text-white/90">{cityName}</p>
            )}
          </div>
          
          {coords && cityName && (
            <motion.button
              onClick={handleBackToLocation}
              className="rounded-xl bg-white/20 p-2.5 backdrop-blur-md transition hover:bg-white/30"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              title="Voltar à minha localização"
            >
              <Navigation className="h-5 w-5 text-white" />
            </motion.button>
          )}
        </div>

        <div className="mb-6">
          <SearchBar onSearch={handleCitySearch} />
        </div>

        <div className="space-y-4">
          {currentWeather && <CurrentWeather data={currentWeather} />}
          {forecast && <HourlyForecast data={forecast} />}
          {forecast && <DailyForecast data={forecast} />}
          {forecast && <PrecipitationForecast data={forecast} />}
        </div>
      </div>
    </div>
  );
};
