import { useCallback } from 'react';

import { useLocationStore } from '../store/locationStore';

export const useLocationSearch = () => {
  const setCityName = useLocationStore((state) => state.setCityName);
  const setCoords = useLocationStore((state) => state.setCoords);

  const searchCity = useCallback(
    (cityName) => {
      const trimmedCity = cityName.trim();
      if (!trimmedCity) {
        throw new Error('Nome da cidade inválido');
      }

      setCoords(null);
      setCityName(trimmedCity);
      return trimmedCity;
    },
    [setCityName, setCoords]
  );

  return { searchCity };
};
