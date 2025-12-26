import { useCallback } from 'react';

import { useLocationStore } from '../store/locationStore';

export const useLocationSearch = () => {
  const setCityName = useLocationStore((state) => state.setCityName);

  const searchCity = useCallback(
    (cityName) => {
      const trimmedCity = cityName.trim();
      if (!trimmedCity) {
        throw new Error('Nome da cidade inválido');
      }

      setCityName(trimmedCity);
      return trimmedCity;
    },
    [setCityName]
  );

  return { searchCity };
};
