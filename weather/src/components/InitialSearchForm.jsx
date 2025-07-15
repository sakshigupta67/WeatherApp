import React from 'react';

const InitialSearchForm = ({ city, setCity, suggestion, handleSearch, fetchWeatherData, API_KEY }) => {
  return (
    <form onSubmit={handleSearch} className='flex flex-col relative'>
      <input
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder='Enter City or Country (min 3 letters)'
        className='mb-4 p-3 rounded border border-white bg-transparent text-white placeholder-white focus:outline-none focus:border-blue-300 transition duration-300'
      />
      {suggestion.length > 0 && (
        <div className='w-full bg-transparent shadow-md rounded z-10 mb-4' style={{ position: 'relative', maxHeight: 'none', overflowY: 'visible' }}>
          {suggestion.slice(0, 3).map((s) => (
            <button
              type='button'
              key={`${s.lat}-${s.lon}`}
              onClick={() =>
                fetchWeatherData(
                  `https://api.openweathermap.org/data/2.5/weather?lat=${s.lat}&lon=${s.lon}&appid=${API_KEY}&units=metric`,
                  `${s.name}, ${s.country}${s.state ? `, ${s.state}` : ''}`
                )
              }
              className='block hover:bg-blue-700 bg-transparent px-4 py-2 text-sm text-left w-full transition-colors'
            >
              {s.name}, {s.country}{s.state && `, ${s.state}`}
            </button>
          ))}
        </div>
      )}
      <button type='submit' className='bg-purple-700 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition-colors'>
        Get Weather
      </button>
    </form>
  );
};

export default InitialSearchForm; 