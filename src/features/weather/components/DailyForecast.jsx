import { Calendar, TrendingDown, TrendingUp } from 'lucide-react';

export const DailyForecast = ({ data }) => {
  if (!data || !data.list) return null;

  const dailyData = data.list
    .filter((item, index) => index % 8 === 0)
    .slice(0, 5);

  const getDayName = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('pt-BR', { weekday: 'short' });
  };

  return (
    <div className="w-full rounded-3xl bg-white/10 p-6 backdrop-blur-md">
      <div className="mb-4 flex items-center gap-2">
        <Calendar className="h-5 w-5 text-white" />
        <h3 className="text-lg font-semibold text-white">Próximos 5 dias</h3>
      </div>
      <div className="space-y-3">
        {dailyData.map((item, index) => {
          const day = getDayName(item.dt);
          const maxTemp = Math.round(item.main.temp_max);
          const minTemp = Math.round(item.main.temp_min);
          const icon = item.weather[0].icon;

          return (
            <div
              key={index}
              className="flex items-center justify-between rounded-xl bg-white/10 p-4"
            >
              <p className="w-16 text-sm font-medium capitalize text-white">
                {day}
              </p>
              <img
                src={`https://openweathermap.org/img/wn/${icon}.png`}
                alt="weather"
                className="h-10 w-10"
              />
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <TrendingUp className="h-4 w-4 text-orange-300" />
                  <span className="font-semibold text-white">{maxTemp}°</span>
                </div>
                <div className="flex items-center gap-1">
                  <TrendingDown className="h-4 w-4 text-blue-300" />
                  <span className="font-semibold text-white/70">
                    {minTemp}°
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
