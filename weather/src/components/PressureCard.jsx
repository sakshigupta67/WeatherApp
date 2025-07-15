import React from 'react';

const PressureCard = ({ weather }) => {
  const pressure = weather.main.pressure;
  // Example logic for trend
  const trend = 'Falling slowly';

  return (
    <div className='bg-white/10 border border-white/20 rounded-2xl shadow-lg p-6 flex flex-col min-h-[180px] w-full'>
      <span className='text-lg text-black font-normal text-left mb-2'>Pressure</span>
      <span className='text-4xl font-bold text-gray-700 mb-1'>{pressure} <span className='text-lg font-semibold'>mb</span></span>
      <span className='text-md font-semibold text-emerald-900 mb-2'>{trend}</span>
      <div className='w-full mt-2 flex items-center'>
        <div className='h-2 rounded bg-blue-300 flex-1 relative'>
          <div className='absolute left-1/2 top-[-6px] w-4 h-4 rounded-full bg-blue-200 border-2 border-blue-500' style={{ transform: 'translateX(-50%)' }}></div>
        </div>
      </div>
    </div>
  );
};

export default PressureCard; 