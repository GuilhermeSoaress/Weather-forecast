import { motion } from 'framer-motion';
import { CloudRain, Droplets } from 'lucide-react';

import { GlassCard } from '@/shared/components/GlassCard';

export const PrecipitationForecast = ({ data }) => {
  if (!data || !data.list) return null;

  const dailyData = data.list
    .filter((item, index) => index % 8 === 0)
    .slice(0, 5);

  const getDayName = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('pt-BR', { weekday: 'short' });
  };

  return (
    <GlassCard className="w-full p-6">
      <motion.div
        className="mb-4 flex items-center gap-2"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <CloudRain className="h-5 w-5 text-white" />
        <h3 className="text-lg font-semibold text-white">
          Precipitação - 5 dias
        </h3>
      </motion.div>
      <div className="space-y-3">
        {dailyData.map((item, index) => {
          const day = getDayName(item.dt);
          const humidity = item.main.humidity;
          const rainChance = item.pop ? Math.round(item.pop * 100) : 0;
          const hasRain = item.weather[0].main.includes('Rain');

          return (
            <motion.div
              key={index}
              className="flex items-center justify-between rounded-xl bg-white/10 p-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={{
                scale: 1.02,
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
              }}
            >
              <p className="w-16 text-sm font-medium capitalize text-white">
                {day}
              </p>
              <div className="flex items-center gap-2">
                {hasRain ? (
                  <CloudRain className="h-5 w-5 text-blue-300" />
                ) : (
                  <Droplets className="h-5 w-5 text-white/50" />
                )}
                <span className="text-sm text-white/80">
                  {rainChance > 0 ? `${rainChance}%` : 'Sem chuva'}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Droplets className="h-4 w-4 text-blue-300" />
                <span className="text-sm font-medium text-white">
                  {humidity}%
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </GlassCard>
  );
};
