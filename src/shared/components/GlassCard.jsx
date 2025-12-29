import { motion } from 'framer-motion';
import { cn } from '@/shared/utils/cn';

export const GlassCard = ({
  children,
  className,
  hover = true,
  animate = true,
  ...props
}) => {
  const baseClasses = cn(
    'rounded-3xl bg-white/10 backdrop-blur-md border border-white/20',
    'shadow-xl shadow-black/10',
    className
  );

  const hoverAnimation = hover
    ? {
        whileHover: {
          y: -4,
          boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.15)',
        },
      }
    : {};

  const initialAnimation = animate
    ? {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.4, ease: 'easeOut' },
      }
    : {};

  return (
    <motion.div
      className={baseClasses}
      {...initialAnimation}
      {...hoverAnimation}
      {...props}
    >
      {children}
    </motion.div>
  );
};
