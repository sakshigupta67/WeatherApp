import React from 'react';
import { convertTemperature } from './Helper';

const WeatherCard = ({ weather, unit, calcDewPoint }) => {
  return (
    <div
      className='bg-white/30 backdrop-blur-md rounded-2xl p-6 max-w-2xl mx-auto my-8 text-gray-900 shadow-lg'
      style={{ boxShadow: '0 4px 32px 0 rgba(0,0,0,0.10)', border: '1px solid rgba(255,255,255,0.2)' }}
    >
      <div className='flex justify-between items-center mb-2'>
        <div className='font-semibold text-lg'>Current weather</div>
        <div className='text-sm text-gray-700'>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
      </div>
      <div className='flex flex-row items-center gap-4 mb-2'>
        <div className='text-6xl text-gray-600 font-bold'>
          {convertTemperature(weather.main.temp, unit)}
          <span className='text-3xl align-top ml-1'>°{unit}</span>
        </div>
        <div className='flex flex-col justify-center'>
          <div className='capitalize text-2xl font-semibold'>{weather.weather[0].description}</div>
          <div className='text-gray-700 text-base'>
            Feels like <span className='font-semibold text-blue-950'>{convertTemperature(weather.main.feels_like, unit)}°</span>
          </div>
        </div>
      </div>
      <div className='text-gray-800 mb-4'>
        Expect partly sunny skies. The high will reach {Math.round(weather.main.temp_max)}° on this humid day.
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-6 gap-2 text-center text-sm'>
        <div>
          <div className='font-semibold'>Air quality</div>
          <div className='text-blue-950'>57</div>
        </div>
        <div>
          <div className='font-semibold'>Wind</div>
          <div className='text-blue-950'>{weather.wind.speed} km/h</div>
        </div>
        <div>
          <div className='font-semibold'>Humidity</div>
          <div className='text-blue-950'>{weather.main.humidity}%</div>
        </div>
        <div>
          <div className='font-semibold'>Visibility</div>
          <div className='text-blue-950'>{(weather.visibility / 1000).toFixed(1)} km</div>
        </div>
        <div>
          <div className='font-semibold'>Pressure</div>
          <div className='text-blue-950'>{weather.main.pressure} mb</div>
        </div>
        <div>
          <div className='font-semibold'>Dew point</div>
          <div className='text-blue-950'>{calcDewPoint(weather.main.temp, weather.main.humidity)}°</div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard; 