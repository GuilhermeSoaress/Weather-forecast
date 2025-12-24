import { useEffect } from 'react';
import { useLocationStore } from '../../modules/location/store/store';
import { useUIStore } from '../store/ui';

export const useGeolocation = () => {
  const setCoords = useLocationStore((state) => state.setCoords);
  const setError = useUIStore((state) => state.setError);
  const setLoading = useUIStore((state) => state.setLoading);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
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
