import React from 'react';

import ClearDay from '../assets/ClearDay.gif';
import ClearNight from '../assets/ClearNight.gif';
import Clouds from '../assets/Clouds.gif';
import Fog from '../assets/Fog.gif';
import Haze from '../assets/Haze.gif';
import Rain from '../assets/Rain.gif';
import Snow from '../assets/Snow.gif';
import Clear from '../assets/clear.gif';
import video1 from '../assets/video1.mp4';
import Thunderstorm from '../assets/Thunderstorm.gif';

const WeatherBackground = ({ condition }) => {
  const gifs = {
    Thunderstorm,
    Rain,
    Snow,
    Clear: { day: ClearDay, night: ClearNight, default: Clear },
    Clouds,
    Haze,
    Fog,
    default: video1,
  };

  // Normalize and map weather types
  const weatherTypeMap = {
    Thunderstorm: 'Thunderstorm',
    Drizzle: 'Rain',
    Rain: 'Rain',
    Snow: 'Snow',
    Clear: 'Clear',
    Clouds: 'Clouds',
    Mist: 'Haze',
    Smoke: 'Haze',
    Haze: 'Haze',
    Fog: 'Fog',
    Sand: 'Haze',
    Dust: 'Haze',
    Ash: 'Haze',
    Squall: 'Thunderstorm',
    Tornado: 'Thunderstorm',
  };

  const getBackground = () => {
    if (!condition || !condition.main) return gifs.default;

    const normalizedType = weatherTypeMap[condition.main] || 'default';
    const asset = gifs[normalizedType];

    // Handle day/night if Clear
    if (typeof asset === 'object') {
      return condition.isDay ? asset.day || asset.default : asset.night || asset.default;
    }

    return asset || gifs.default;
  };

  const background = getBackground();

  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      {background === video1 ? (
        <video
          autoPlay
          loop
          muted
          className="w-full h-full object-cover opacity-100 pointer-events-none animate-fade-in"
        >
          <source src={video1} type="video/mp4" />
        </video>
      ) : (
        <img
          src={background}
          alt="weather-bg"
          className="w-full h-full object-cover opacity-100 pointer-events-none animate-fade-in"
        />
      )}
      <div className="absolute inset-0 bg-black/30" />
    </div>
  );
};

export default WeatherBackground;
