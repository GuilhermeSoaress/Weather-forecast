import { Cloud, Droplets, Eye, Wind } from 'lucide-react';

export const CurrentWeather = ({ data }) => {
  if (!data) return null;

  const temp = Math.round(data.main.temp);
  const feelsLike = Math.round(data.main.feels_like);
  const description = data.weather[0].description;
  const icon = data.weather[0].icon;

  return (
    <div className="w-full rounded-3xl bg-white/10 p-6 backdrop-blur-md">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <div className="text-6xl font-bold text-white">{temp}°</div>
          <p className="mt-1 text-sm text-white/80">
            Sensação térmica {feelsLike}°
          </p>
        </div>

        <div className="flex flex-col items-center">
          <img
            src={`https://openweathermap.org/img/wn/${icon}@4x.png`}
            alt={description}
            className="h-24 w-24 drop-shadow-lg"
          />
          <p className="text-sm capitalize text-white/90">{description}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <WeatherDetail
          icon={<Droplets className="h-5 w-5" />}
          label="Umidade"
          value={`${data.main.humidity}%`}
        />
        <WeatherDetail
          icon={<Wind className="h-5 w-5" />}
          label="Vento"
          value={`${Math.round(data.wind.speed * 3.6)} km/h`}
        />
        <WeatherDetail
          icon={<Cloud className="h-5 w-5" />}
          label="Pressão"
          value={`${data.main.pressure} hPa`}
        />
        <WeatherDetail
          icon={<Eye className="h-5 w-5" />}
          label="Visibilidade"
          value={`${(data.visibility / 1000).toFixed(1)} km`}
        />
      </div>
    </div>
  );
};

const WeatherDetail = ({ icon, label, value }) => {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-white/10 p-3">
      <div className="text-white/80">{icon}</div>
      <div>
        <p className="text-xs text-white/60">{label}</p>
        <p className="text-sm font-semibold text-white">{value}</p>
      </div>
    </div>
  );
};
