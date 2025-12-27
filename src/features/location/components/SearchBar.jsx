import { useState } from 'react';

import { Search } from 'lucide-react';

export const SearchBar = ({ onSearch }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input.trim());
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Busque por uma cidade..."
          className="w-full rounded-2xl bg-white/20 px-5 py-2 pr-14 text-lg text-white placeholder-white/60 shadow-lg backdrop-blur-md transition focus:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-xl bg-white/30 p-2 transition hover:bg-white/40 hover:scale-110"
        >
          <Search className="h-4 w-4 text-white" />
        </button>
      </div>
    </form>
  );
};
