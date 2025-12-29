export const WEATHER_CONDITIONS = {
  CLEAR: 'Clear',
  CLOUDS: 'Clouds',
  RAIN: 'Rain',
  DRIZZLE: 'Drizzle',
  THUNDERSTORM: 'Thunderstorm',
  SNOW: 'Snow',
  MIST: 'Mist',
  SMOKE: 'Smoke',
  HAZE: 'Haze',
  DUST: 'Dust',
  FOG: 'Fog',
  SAND: 'Sand',
  ASH: 'Ash',
  SQUALL: 'Squall',
  TORNADO: 'Tornado',
};

export const TIME_PERIODS = {
  DAY: 'day',
  NIGHT: 'night',
};

export const THEME_GRADIENTS = {
  'clear-day': 'bg-gradient-to-b from-blue-400 via-blue-500 to-blue-600',
  'clear-night': 'bg-gradient-to-b from-indigo-950 via-slate-900 to-black',

  'clouds-day': 'bg-gradient-to-b from-slate-400 via-slate-500 to-slate-600',
  'clouds-night': 'bg-gradient-to-b from-slate-800 via-slate-900 to-black',

  'rain-day': 'bg-gradient-to-b from-slate-600 via-slate-700 to-slate-800',
  'rain-night': 'bg-gradient-to-b from-slate-900 via-gray-950 to-black',

  'drizzle-day': 'bg-gradient-to-b from-slate-500 via-slate-600 to-slate-700',
  'drizzle-night': 'bg-gradient-to-b from-slate-800 via-slate-900 to-black',

  'thunderstorm-day': 'bg-gradient-to-b from-gray-700 via-gray-800 to-gray-900',
  'thunderstorm-night': 'bg-gradient-to-b from-gray-950 via-black to-black',

  'snow-day': 'bg-gradient-to-b from-slate-300 via-slate-400 to-slate-500',
  'snow-night': 'bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900',

  'mist-day': 'bg-gradient-to-b from-gray-400 via-gray-500 to-gray-600',
  'mist-night': 'bg-gradient-to-b from-gray-800 via-gray-900 to-black',

  'default-day': 'bg-gradient-to-b from-sky-400 via-sky-500 to-sky-600',
  'default-night': 'bg-gradient-to-b from-slate-800 via-slate-900 to-black',
};

export const LOTTIE_ANIMATIONS = {
  'clear-day': '@/assets/lottie/sun.json',
  'clear-night': '@/assets/lottie/moon.json',

  'clouds-day': '@/assets/lottie/clouds.json',
  'clouds-night': '@/assets/lottie/clouds-night.json',

  'rain-day': '@/assets/lottie/rain.json',
  'rain-night': '@/assets/lottie/rain.json',

  'drizzle-day': '@/assets/lottie/rain.json',
  'drizzle-night': '@/assets/lottie/rain.json',

  'thunderstorm-day': '@/assets/lottie/thunderstorm.json',
  'thunderstorm-night': '@/assets/lottie/thunderstorm.json',

  'snow-day': '@/assets/lottie/snow.json',
  'snow-night': '@/assets/lottie/snow.json',

  'mist-day': '@/assets/lottie/mist.json',
  'mist-night': '@/assets/lottie/mist.json',

  'default-day': '@/assets/lottie/clouds.json',
  'default-night': '@/assets/lottie/moon.json',
};

export const PARTICLE_CONFIGS = {
  rain: {
    particles: {
      number: {
        value: 200,
        density: {
          enable: true,
          value_area: 800,
        },
      },
      color: {
        value: '#ffffff',
      },
      shape: {
        type: 'line',
      },
      opacity: {
        value: 0.5,
        random: true,
      },
      size: {
        value: 80,
        random: true,
      },
      move: {
        enable: true,
        speed: 20,
        direction: 'bottom',
        random: false,
        straight: true,
        out_mode: 'out',
      },
    },
  },
  snow: {
    particles: {
      number: {
        value: 150,
        density: {
          enable: true,
          value_area: 800,
        },
      },
      color: {
        value: '#ffffff',
      },
      shape: {
        type: 'circle',
      },
      opacity: {
        value: 0.8,
        random: true,
      },
      size: {
        value: 4,
        random: true,
      },
      move: {
        enable: true,
        speed: 2,
        direction: 'bottom',
        random: true,
        straight: false,
        out_mode: 'out',
      },
    },
  },
};
