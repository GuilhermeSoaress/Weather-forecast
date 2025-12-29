import { WeatherDashboard } from '@/features/weather/pages/WeatherDashboard';
import { AnimatePresence, motion } from 'framer-motion';

import { Toast } from '@/shared/components/Toast';
import { WeatherParticles } from '@/shared/components/WeatherParticles';
import { useThemeContext } from '@/shared/hooks/useThemeContext';

function App() {
  const theme = useThemeContext();

  return (
    <>
      <Toast />
      <AnimatePresence mode="wait">
        <motion.div
          key={theme.key}
          className={`min-h-screen ${theme.gradient}`}
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <WeatherParticles condition={theme.condition} />
          <WeatherDashboard />
        </motion.div>
      </AnimatePresence>
    </>
  );
}

export default App;
