import { useMemo } from 'react';

import { useWeatherStore } from '@/features/weather/store/weatherStore';

import {
  LOTTIE_ANIMATIONS,
  THEME_GRADIENTS,
  TIME_PERIODS,
} from '@/shared/constants/weatherThemes';

const normalizeCondition = (condition) => {
  const normalized = condition?.toLowerCase();

  if (normalized?.includes('thunder')) return 'thunderstorm';
  if (normalized?.includes('drizzle')) return 'drizzle';
  if (normalized?.includes('rain')) return 'rain';
  if (normalized?.includes('snow')) return 'snow';
  if (normalized?.includes('mist') || normalized?.includes('fog'))
    return 'mist';
  if (normalized?.includes('cloud')) return 'clouds';
  if (normalized?.includes('clear')) return 'clear';

  return 'default';
};

const getTimePeriod = (currentTime, sunrise, sunset, timezone) => {
  const localTime = currentTime + timezone;
  const localSunrise = sunrise + timezone;
  const localSunset = sunset + timezone;

  if (localTime >= localSunrise && localTime < localSunset) {
    return TIME_PERIODS.DAY;
  }

  return TIME_PERIODS.NIGHT;
};

export const useThemeContext = () => {
  const currentWeather = useWeatherStore((state) => state.currentWeather);

  const theme = useMemo(() => {
    if (!currentWeather) {
      return {
        key: 'default-day',
        gradient: THEME_GRADIENTS['default-day'],
        animation: LOTTIE_ANIMATIONS['default-day'],
        period: TIME_PERIODS.DAY,
        condition: 'default',
      };
    }

    const condition = normalizeCondition(currentWeather.weather?.[0]?.main);
    const timePeriod = getTimePeriod(
      currentWeather.dt,
      currentWeather.sys?.sunrise,
      currentWeather.sys?.sunset,
      currentWeather.timezone
    );

    const themeKey = `${condition}-${timePeriod}`;

    return {
      key: themeKey,
      gradient:
        THEME_GRADIENTS[themeKey] || THEME_GRADIENTS[`default-${timePeriod}`],
      animation:
        LOTTIE_ANIMATIONS[themeKey] ||
        LOTTIE_ANIMATIONS[`default-${timePeriod}`],
      period: timePeriod,
      condition,
    };
  }, [currentWeather]);

  return theme;
};
