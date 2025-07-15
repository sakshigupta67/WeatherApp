import React from 'react';
import SunriseImg from '../assets/Sunrise.png';
import SunsetImg from '../assets/Sunset.png';

const SunriseSunsetCard = ({ weather }) => {
  return (
    <div className='max-w-2xl mx-auto grid grid-cols-2 gap-4 mt-6 w-full'>
      <div className='bg-white/10 border border-white/20 rounded-2xl shadow-lg p-6 flex flex-col min-h-[120px] w-full items-center justify-center'>
        <img src={SunriseImg} alt='Sunrise' className='w-14 h-14 mb-2' />
        <span className='text-orange-700 text-xl mb-1 text-center'>Sunrise</span>
        <span className='text-xl text-gray-700 font-semibold mt-1 text-center'>
          {new Date(weather.sys.sunrise * 1000).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
      <div className='bg-white/10 border border-white/20 rounded-2xl shadow-lg p-6 flex flex-col min-h-[120px] w-full items-center justify-center'>
        <img src={SunsetImg} alt='Sunset' className='w-14 h-14 mb-2' />
        <span className='text-emerald-900 text-xl mb-1 text-center'>Sunset</span>
        <span className='text-xl text-gray-700 font-semibold mt-1 text-center'>
          {new Date(weather.sys.sunset * 1000).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </div>
  );
};

export default SunriseSunsetCard; 