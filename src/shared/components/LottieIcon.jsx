import { useMemo } from 'react';

import cloudsNightAnimation from '@/assets/lottie/clouds-night.json';
import cloudsAnimation from '@/assets/lottie/clouds.json';
import mistAnimation from '@/assets/lottie/mist.json';
import moonAnimation from '@/assets/lottie/moon.json';
import rainAnimation from '@/assets/lottie/rain.json';
import snowAnimation from '@/assets/lottie/snow.json';
import sunAnimation from '@/assets/lottie/sun.json';
import thunderstormAnimation from '@/assets/lottie/thunderstorm.json';
import Lottie from 'lottie-react';

const animationMap = {
  '@/assets/lottie/sun.json': sunAnimation,
  '@/assets/lottie/moon.json': moonAnimation,
  '@/assets/lottie/clouds.json': cloudsAnimation,
  '@/assets/lottie/clouds-night.json': cloudsNightAnimation,
  '@/assets/lottie/rain.json': rainAnimation,
  '@/assets/lottie/thunderstorm.json': thunderstormAnimation,
  '@/assets/lottie/snow.json': snowAnimation,
  '@/assets/lottie/mist.json': mistAnimation,
};

export const LottieIcon = ({ animationPath, size = 120, className = '' }) => {
  const animationData = animationMap[animationPath];

  const style = useMemo(
    () => ({
      width: size,
      height: size,
    }),
    [size]
  );

  if (!animationData) return null;

  return (
    <div className={className}>
      <Lottie
        animationData={animationData}
        loop={true}
        autoplay={true}
        style={style}
      />
    </div>
  );
};
