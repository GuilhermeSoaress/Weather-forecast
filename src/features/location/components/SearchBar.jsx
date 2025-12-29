import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

export const SearchBar = ({ onSearch }) => {
  const [input, setInput] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input.trim());
      setInput('');
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="w-full"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="relative">
        <motion.input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Busque por uma cidade..."
          className="w-full rounded-2xl bg-white/20 px-5 py-2 pr-14 text-lg text-white placeholder-white/60 shadow-lg backdrop-blur-md transition focus:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
          animate={{
            scale: isFocused ? 1.02 : 1,
            boxShadow: isFocused
              ? '0 0 20px rgba(255, 255, 255, 0.3)'
              : '0 10px 15px -3px rgb(0 0 0 / 0.1)',
          }}
          transition={{ duration: 0.2 }}
        />
        <motion.button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-xl bg-white/30 p-2 transition hover:bg-white/40"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Search className="h-4 w-4 text-white" />
        </motion.button>
      </div>
    </motion.form>
  );
};
