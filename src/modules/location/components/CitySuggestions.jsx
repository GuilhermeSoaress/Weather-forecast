import { Cloud, MapPin } from 'lucide-react';

const FAMOUS_CITIES = [
  { name: 'São Paulo', country: 'BR', icon: '🇧🇷' },
  { name: 'London', country: 'GB', icon: '🇬🇧' },
  { name: 'New York', country: 'US', icon: '🇺🇸' },
  { name: 'Tokyo', country: 'JP', icon: '🇯🇵' },
];

export const CitySuggestions = ({ onCitySelect }) => {
  return (
    <div className="mt-10 w-full max-w-md">
      <div className="mb-6 flex items-center justify-center gap-2">
        <Cloud className="h-5 w-5 text-white/80" />
        <p className="text-sm font-medium text-white/90">
          Ou escolha uma cidade popular
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {FAMOUS_CITIES.map((city) => (
          <button
            key={city.name}
            onClick={() => onCitySelect(city.name)}
            className="group relative overflow-hidden rounded-2xl bg-white/10 px-5 py-6 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white/20 hover:shadow-xl"
          >
            <div className="flex flex-col items-center gap-2">
              <span className="text-3xl">{city.icon}</span>
              <div className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-white/70" />
                <span className="text-sm font-semibold text-white">
                  {city.name}
                </span>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/5 opacity-0 transition-opacity group-hover:opacity-100" />
          </button>
        ))}
      </div>
    </div>
  );
};
