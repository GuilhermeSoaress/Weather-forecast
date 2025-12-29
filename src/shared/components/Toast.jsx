import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, CheckCircle, Info, X } from 'lucide-react';

import { useToastStore } from '@/shared/store/toastStore';

const icons = {
  error: AlertCircle,
  success: CheckCircle,
  info: Info,
};

const colors = {
  error: 'bg-red-500',
  success: 'bg-green-500',
  info: 'bg-blue-500',
};

export const Toast = () => {
  const toasts = useToastStore((state) => state.toasts);
  const removeToast = useToastStore((state) => state.removeToast);

  return (
    <div className="pointer-events-none fixed inset-0 z-50 flex flex-col items-end justify-start gap-2 p-4">
      <AnimatePresence>
        {toasts.map((toast) => {
          const Icon = icons[toast.type];
          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 100, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 100, scale: 0.8 }}
              className="pointer-events-auto flex items-center gap-3 rounded-xl bg-white/95 px-4 py-3 shadow-xl backdrop-blur-sm"
            >
              <div className={`rounded-lg ${colors[toast.type]} p-1.5`}>
                <Icon className="h-4 w-4 text-white" />
              </div>
              <p className="text-sm font-medium text-gray-800">
                {toast.message}
              </p>
              <button
                onClick={() => removeToast(toast.id)}
                className="ml-2 rounded-lg p-1 transition hover:bg-gray-200"
              >
                <X className="h-4 w-4 text-gray-600" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};
