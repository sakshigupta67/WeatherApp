import React from 'react';

const VisibilityCard = ({ weather }) => {
  const visibility = (weather.visibility / 1000).toFixed(1);
  let label = '';
  if (visibility <= 2) label = 'Poor';
  else if (visibility <= 5) label = 'Good';
  else label = 'Excellent';

  return (
    <div className='bg-white/10 border border-white/20 rounded-2xl shadow-lg p-6 flex flex-col min-h-[180px] w-full'>
      <span className='text-lg text-black font-normal text-left mb-2'>Visibility</span>
      <span className='text-4xl  font-bold text-gray-700 mb-1'>{visibility} <span className='text-lg font-semibold'>km</span></span>
      <span className='text-sm font-semibold text-emerald-900  mb-2'>{label}</span>
      <div className='w-full mt-2'>
        <div className='h-2 rounded bg-green-400 mb-1' style={{ width: '90%' }}></div>
        <div className='h-2 rounded bg-green-300 mb-1' style={{ width: '70%' }}></div>
        <div className='h-2 rounded bg-green-200' style={{ width: '50%' }}></div>
      </div>
    </div>
  );
};

export default VisibilityCard; 