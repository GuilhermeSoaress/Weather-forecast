import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Loader2 } from 'lucide-react';
import { searchCities } from '../services/geocodingService';

export const SearchBar = ({ onSearch }) => {
  const [input, setInput] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchTimeoutRef = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsFocused(false);
        setSuggestions([]);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (input.length >= 2) {
      setIsSearching(true);
      searchTimeoutRef.current = setTimeout(async () => {
        const results = await searchCities(input);
        setSuggestions(results);
        setIsSearching(false);
        setSelectedIndex(-1);
      }, 300);
    } else {
      setSuggestions([]);
      setIsSearching(false);
    }

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [input]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (suggestions.length > 0) {
      const cityToSelect = selectedIndex >= 0 ? suggestions[selectedIndex] : suggestions[0];
      handleCitySelect(cityToSelect);
    } else if (input.trim()) {
      onSearch(input.trim());
      setInput('');
      setSuggestions([]);
    }
  };

  const handleCitySelect = (city) => {
    onSearch(city.name);
    setInput('');
    setSuggestions([]);
    setIsFocused(false);
  };

  const handleKeyDown = (e) => {
    if (suggestions.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => 
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === 'Escape') {
      setSuggestions([]);
      setIsFocused(false);
    }
  };

  const showSuggestions = isFocused && suggestions.length > 0;

  return (
    <div ref={wrapperRef} className="relative w-full">
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
            onKeyDown={handleKeyDown}
            placeholder="Busque por uma cidade..."
            className="w-full rounded-2xl bg-white/20 px-5 py-3 pr-14 text-lg text-white placeholder-white/60 shadow-lg backdrop-blur-md transition focus:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
            animate={{
              scale: isFocused ? 1.02 : 1,
              boxShadow: isFocused
                ? '0 0 20px rgba(255, 255, 255, 0.3)'
                : '0 10px 15px -3px rgb(0 0 0 / 0.1)',
            }}
            transition={{ duration: 0.2 }}
            autoComplete="off"
          />
          <motion.button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-xl bg-white/30 p-2 transition hover:bg-white/40"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {isSearching ? (
              <Loader2 className="h-5 w-5 animate-spin text-white" />
            ) : (
              <Search className="h-5 w-5 text-white" />
            )}
          </motion.button>
        </div>
      </motion.form>

      <AnimatePresence>
        {showSuggestions && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-20 mt-2 w-full overflow-hidden rounded-2xl bg-white/95 shadow-2xl backdrop-blur-md"
          >
            {suggestions.map((city, index) => (
              <motion.button
                key={`${city.name}-${city.country}-${city.lat}`}
                onClick={() => handleCitySelect(city)}
                className={`flex w-full items-center gap-3 px-4 py-3 text-left transition ${
                  selectedIndex === index
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-800 hover:bg-blue-50'
                }`}
                whileHover={{ x: 4 }}
              >
                <MapPin className={`h-4 w-4 ${
                  selectedIndex === index ? 'text-white' : 'text-blue-500'
                }`} />
                <div className="flex-1">
                  <p className="text-sm font-medium">{city.name}</p>
                  {city.state && (
                    <p className={`text-xs ${
                      selectedIndex === index ? 'text-white/80' : 'text-gray-500'
                    }`}>
                      {city.state}, {city.country}
                    </p>
                  )}
                  {!city.state && (
                    <p className={`text-xs ${
                      selectedIndex === index ? 'text-white/80' : 'text-gray-500'
                    }`}>
                      {city.country}
                    </p>
                  )}
                </div>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
