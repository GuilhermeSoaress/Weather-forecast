import { Clock } from 'lucide-react';

export const HourlyForecast = ({ data }) => {
  if (!data || !data.list) return null;

  const hourlyData = data.list.slice(0, 12);

  return (
    <div className="w-full rounded-3xl bg-white/10 p-6 backdrop-blur-md">
      <div className="mb-4 flex items-center gap-2">
        <Clock className="h-5 w-5 text-white" />
        <h3 className="text-lg font-semibold text-white">Próximas horas</h3>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
        {hourlyData.map((item, index) => {
          const hour = new Date(item.dt * 1000).getHours();
          const temp = Math.round(item.main.temp);
          const icon = item.weather[0].icon;

          return (
            <div
              key={index}
              className="flex min-w-[70px] flex-col items-center rounded-xl bg-white/10 p-2"
            >
              <p className="text-sm font-medium text-white/80">{hour}h</p>
              <img
                src={`https://openweathermap.org/img/wn/${icon}.png`}
                alt="weather"
                className="h-10 w-10"
              />
              <p className="text-lg font-bold text-white">{temp}°</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
