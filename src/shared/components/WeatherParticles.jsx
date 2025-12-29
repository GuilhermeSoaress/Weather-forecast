import { useCallback, useMemo } from 'react';

import Particles from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';

import { PARTICLE_CONFIGS } from '@/shared/constants/weatherThemes';

export const WeatherParticles = ({ condition }) => {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const config = useMemo(() => {
    if (
      condition === 'rain' ||
      condition === 'drizzle' ||
      condition === 'thunderstorm'
    ) {
      return PARTICLE_CONFIGS.rain;
    }

    if (condition === 'snow') {
      return PARTICLE_CONFIGS.snow;
    }

    return null;
  }, [condition]);

  if (!config) return null;

  return (
    <Particles
      id="weather-particles"
      init={particlesInit}
      options={config}
      className="fixed inset-0 pointer-events-none z-10"
    />
  );
};
