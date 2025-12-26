import { useEffect } from 'react';

import { useGeolocation } from '@/shared/hooks/useGeolocation';
import { useWeather } from '../hooks/useWeather';
import { useUIStore } from '@/shared/store/ui';
import { CitySuggestions } from '@/modules/location/components/CitySuggestions';
import { SearchBar } from '@/modules/location/components/SearchBar';
import { useLocationStore } from '@/modules/location/store/locationStore';
import { CurrentWeather } from '../components/CurrentWeather';
import { useWeatherStore } from '../store/weatherStore';

export const WeatherDashboard = () => {
  useGeolocation();
  const { fetchByCity, fetchByCoords } = useWeather();

  const coords = useLocationStore((state) => state.coords);
  const cityName = useLocationStore((state) => state.cityName);
  const currentWeather = useWeatherStore((state) => state.currentWeather);
  const isLoading = useUIStore((state) => state.isLoading);
  const error = useUIStore((state) => state.error);

  useEffect(() => {
    if (coords) {
      fetchByCoords(coords.lat, coords.lon);
    }
  }, [coords, fetchByCoords]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600">
        <div className="text-center">
          <div className="mb-4 inline-block h-12 w-12 animate-spin rounded-full border-4 border-white/30 border-t-white"></div>
          <p className="text-xl font-medium text-white">Carregando...</p>
        </div>
      </div>
    );
  }

  if (error && !coords) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 px-4 py-12">
        <div className="mb-12 text-center">
          <h1 className="mb-3 text-5xl font-bold text-white drop-shadow-lg">
            SkyCast
          </h1>
          <p className="text-lg text-white/80">
            Previsão do tempo em tempo real
          </p>
        </div>
        <SearchBar onSearch={fetchByCity} />
        <CitySuggestions onCitySelect={fetchByCity} />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 px-4 py-8">
      <div className="mb-6 text-center">
        <h1 className="mb-2 text-5xl font-bold text-white drop-shadow-lg">
          SkyCast
        </h1>
        {cityName && (
          <p className="text-xl font-medium text-white/90">{cityName}</p>
        )}
      </div>

      <div className="mb-6 w-full max-w-md">
        <SearchBar onSearch={fetchByCity} />
      </div>

      {currentWeather && <CurrentWeather data={currentWeather} />}
    </div>
  );
};
