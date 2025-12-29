import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import { GlassCard } from '@/shared/components/GlassCard';

export const HourlyForecast = ({ data }) => {
  if (!data || !data.list) return null;

  const hourlyData = data.list.slice(0, 12);

  return (
    <GlassCard className="w-full p-6">
      <motion.div
        className="mb-4 flex items-center gap-2"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Clock className="h-5 w-5 text-white" />
        <h3 className="text-lg font-semibold text-white">Próximas horas</h3>
      </motion.div>
      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
        {hourlyData.map((item, index) => {
          const hour = new Date(item.dt * 1000).getHours();
          const temp = Math.round(item.main.temp);
          const icon = item.weather[0].icon;

          return (
            <motion.div
              key={index}
              className="flex min-w-[70px] flex-col items-center rounded-xl bg-white/10 p-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
            >
              <p className="text-sm font-medium text-white/80">{hour}h</p>
              <img
                src={`https://openweathermap.org/img/wn/${icon}.png`}
                alt="weather"
                className="h-10 w-10"
              />
              <p className="text-lg font-bold text-white">{temp}°</p>
            </motion.div>
          );
        })}
      </div>
    </GlassCard>
  );
};
