import React from 'react';

const HumidityCard = ({ weather, calcDewPoint }) => {
  return (
    <div className='bg-white/20 border border-white/30 rounded-2xl shadow-lg p-6 flex flex-col min-h-[180px] w-full'>
      <span className='font-medium text-lg text-gray-900 mb-2 text-left block'>Humidity</span>
      <div className='flex flex-row items-center'>
        <div className='flex flex-col justify-center mr-8'>
          <div className='flex items-end h-28'>
            {[...Array(7)].map((_, i) => (
              <div key={i} className='w-3 mx-1 h-24 bg-gray-200 rounded-full relative overflow-hidden flex items-end'>
                <div
                  className='bg-blue-400 w-full absolute bottom-0 rounded-b-full'
                  style={{ height: `${weather.main.humidity}%`, maxHeight: '100%' }}
                ></div>
              </div>
            ))}
          </div>
          <span className='font-semibold text-emerald-900 mt-2'>Very humid </span>
        </div>
        <div className='flex-1 flex flex-col justify-center pl-4'>
          <div className='flex items-baseline mt-2 mb-2'>
            <span className='text-4xl font-bold mr-2 text-gray-700 pr-2'>{weather.main.humidity}%</span>
          </div>
          <span className='text-base text-gray-700 mb-2 mr-5'>Relative Humidity</span>
          <div className='flex items-baseline mb-2'>
            <span className='text-3xl font-bold mr-2 text-gray-700 pr-2'>{calcDewPoint(weather.main.temp, weather.main.humidity)}</span>
          </div>
          <span className='text-base text-gray-700 mr-3'>Dew point</span>
        </div>
      </div>
      {/* Description removed */}
    </div>
  );
};

export default HumidityCard; 