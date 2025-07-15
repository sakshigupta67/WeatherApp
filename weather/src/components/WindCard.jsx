import React from 'react';
import { getWindDirection, getWindForce } from './Helper';

const WindCard = ({ weather }) => {
  return (
    <div className='bg-white/20 border border-white/30 rounded-2xl shadow-lg p-6 flex flex-col min-h-[180px] w-full'>
      <div className='flex flex-row items-start'>
        <div className='flex flex-col items-start mr-8'>
          <span className='font-medium text-lg text-gray-900 mb-2'>Wind</span>
          <svg width='90' height='90' viewBox='0 0 90 90' className='mt-6'>
            <circle cx='45' cy='45' r='38' fill='none' stroke='#d1d5db' strokeWidth='4' />
            <g transform={`rotate(${(weather.wind.deg || 0) - 90} 45 45)`}>
              <path d='M45,45 L45,15 A30,30 0 0,1 75,45 Z' fill='#2563eb' fillOpacity='0.85' />
            </g>
            <text x='45' y='18' textAnchor='middle' fontSize='12' fill='#222' fontWeight='bold'>N</text>
            <text x='45' y='86' textAnchor='middle' fontSize='12' fill='#222' fontWeight='bold'>S</text>
            <text x='10' y='50' textAnchor='middle' fontSize='12' fill='#222' fontWeight='bold'>W</text>
            <text x='80' y='50' textAnchor='middle' fontSize='12' fill='#222' fontWeight='bold'>E</text>
          </svg>
          <span className='font-semibold text-emerald-900 mt-3 pl-3'>{getWindForce(weather.wind.speed).desc}</span>
        </div>
        <div className='flex-1 flex flex-col justify-center pl-4'>
          <span className='text-base text-gray-700 mb-2 mt-2'>
            From {getWindDirection(weather.wind.deg)} ({weather.wind.deg} 6)
          </span>
          <div className='flex items-end mb-2 mt-2'>
            <span className='text-4xl font-bold text-gray-700 mr-2'>{weather.wind.speed}</span>
            <span className='text-base text-gray-900 mb-2'>km/h</span>
          </div>
          <span className='text-base text-gray-700 mb-2'>Wind Speed</span>
          <div className='flex items-end mb-2'>
            <span className='text-4xl font-bold text-gray-700 mr-2'>{weather.wind.gust || weather.wind.speed + 18}</span>
            <span className='text-base text-gray-700 mb-2'>km/h</span>
          </div>
          <span className='text-base text-gray-700'>Wind Gust</span>
        </div>
      </div>
      {/* Description removed */}
    </div>
  );
};

export default WindCard; 