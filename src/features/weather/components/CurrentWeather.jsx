import { useEffect, useState } from 'react';

import { motion, useSpring, useTransform } from 'framer-motion';
import { Cloud, Droplets, Eye, Wind } from 'lucide-react';

import { GlassCard } from '@/shared/components/GlassCard';
import { LottieIcon } from '@/shared/components/LottieIcon';
import { useThemeContext } from '@/shared/hooks/useThemeContext';

export const CurrentWeather = ({ data }) => {
  const theme = useThemeContext();
  const [displayTemp, setDisplayTemp] = useState(0);

  const temp = data ? Math.round(data.main.temp) : 0;
  const feelsLike = data ? Math.round(data.main.feels_like) : 0;
  const description = data?.weather[0]?.description || '';

  const springTemp = useSpring(0, { stiffness: 100, damping: 30 });
  const displayValue = useTransform(springTemp, (latest) => Math.round(latest));

  useEffect(() => {
    if (temp) {
      springTemp.set(temp);
    }
  }, [temp, springTemp]);

  useEffect(() => {
    const unsubscribe = displayValue.on('change', (latest) => {
      setDisplayTemp(latest);
    });
    return unsubscribe;
  }, [displayValue]);

  if (!data) return null;

  return (
    <GlassCard className="w-full p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <motion.div
            className="text-6xl font-bold text-white"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          >
            {displayTemp}°
          </motion.div>
          <motion.p
            className="mt-1 text-sm text-white/80"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Sensação térmica {feelsLike}°
          </motion.p>
        </div>

        <motion.div
          className="flex flex-col items-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <LottieIcon animationPath={theme.animation} size={96} />
          <p className="mt-2 text-sm capitalize text-white/90">{description}</p>
        </motion.div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <WeatherDetail
          icon={<Droplets className="h-5 w-5" />}
          label="Umidade"
          value={`${data.main.humidity}%`}
          delay={0.3}
        />
        <WeatherDetail
          icon={<Wind className="h-5 w-5" />}
          label="Vento"
          value={`${Math.round(data.wind.speed * 3.6)} km/h`}
          delay={0.4}
        />
        <WeatherDetail
          icon={<Cloud className="h-5 w-5" />}
          label="Pressão"
          value={`${data.main.pressure} hPa`}
          delay={0.5}
        />
        <WeatherDetail
          icon={<Eye className="h-5 w-5" />}
          label="Visibilidade"
          value={`${(data.visibility / 1000).toFixed(1)} km`}
          delay={0.6}
        />
      </div>
    </GlassCard>
  );
};

const WeatherDetail = ({ icon, label, value, delay = 0 }) => {
  return (
    <motion.div
      className="flex items-center gap-3 rounded-xl bg-white/10 p-3"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.4 }}
      whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
    >
      <div className="text-white/80">{icon}</div>
      <div>
        <p className="text-xs text-white/60">{label}</p>
        <p className="text-sm font-semibold text-white">{value}</p>
      </div>
    </motion.div>
  );
};
