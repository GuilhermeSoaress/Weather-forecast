import { useEffect } from 'react';

import { useLocationStore } from '../store/locationStore';

export const useGeolocation = () => {
  const setCoords = useLocationStore((state) => state.setCoords);
  const setError = useLocationStore((state) => state.setError);
  const setLoading = useLocationStore((state) => state.setLoading);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocalização não é suportada pelo seu navegador');
      return;
    }

    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
        setLoading(false);
      },
      (error) => {
        setError(error.message);
        setLoading(false);
      }
    );
  }, [setCoords, setError, setLoading]);
};
