import { Search } from 'lucide-react';
import { useState } from 'react';

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
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <div className="relative">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Busque por uma cidade..."
          className="w-full rounded-2xl bg-white/20 px-6 py-4 pr-14 text-lg text-white placeholder-white/60 shadow-lg backdrop-blur-md transition focus:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-xl bg-white/30 p-2.5 transition hover:bg-white/40 hover:scale-110"
        >
          <Search className="h-5 w-5 text-white" />
        </button>
      </div>
    </form>
  );
};
