import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import WeatherBackground from '../components/WeatherBackground';
import WeatherCard from '../components/WeatherCard';
import VisibilityCard from '../components/VisibilityCard';
import PressureCard from '../components/PressureCard';
import WindCard from '../components/WindCard';
import HumidityCard from '../components/HumidityCard';
import SunriseSunsetCard from '../components/SunriseSunsetCard';
import ReportUpdate from '../components/ReportUpdate';

const API_KEY = '9edf32dd68e2fcbf12b2516b43b0fcef';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const WeatherReportPage = () => {
  const [weather, setWeather] = useState(null);
  const [unit, setUnit] = useState('C');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const query = useQuery();
  const city = query.get('city') || '';

  useEffect(() => {
    if (!city) {
      navigate('/');
      return;
    }
    fetchWeatherData(city);
    // eslint-disable-next-line
  }, [city]);

  const fetchWeatherData = async (cityName) => {
    setError('');
    setWeather(null);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      );
      if (!response.ok) throw new Error((await response.json()).message || 'City not Found');
      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const getWeatherCondition = () => weather && ({
    main: weather.weather[0].main,
    isDay: Date.now() / 1000 > weather.sys.sunrise && Date.now() / 1000 < weather.sys.sunset,
  });

  const calcDewPoint = (temp, humidity) => {
    const a = 17.27, b = 237.7;
    const alpha = ((a * temp) / (b + temp)) + Math.log(humidity / 100);
    return ((b * alpha) / (a - alpha)).toFixed(0);
  };

  return (
    <div className='min-h-screen scrollbar-hide overflow-x-hidden overflow-hidden'>
      <WeatherBackground condition={getWeatherCondition()} />
      {/* Home Icon Button */}
      <button
        className="fixed sm:top-6 sm:left-6 top-16 left-6 z-20 text-emerald-900 hover:text-emerald-700 transition-colors duration-200"
        onClick={() => navigate('/')}
        aria-label="Go to Home"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l9-9 9 9M4.5 10.5V21a.75.75 0 00.75.75h4.5a.75.75 0 00.75-.75v-4.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21a.75.75 0 00.75.75h4.5a.75.75 0 00.75-.75V10.5" />
        </svg>
      </button>
      <div 
        className={`fixed inset-x-0 mx-auto mb-10 bg-white/20 backdrop-blur-lg rounded-2xl shadow-2xl p-6 text-white border-white/30 z-10 overflow-y-auto ${
          !weather ? 'w-full max-w-md h-auto top-1/2 -translate-y-1/2' : 'w-full max-w-2xl h-[calc(100vh-2.5rem-2.5rem)] top-10'
        }`}
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: 'rgba(255, 255, 255, 0.3) transparent',
          paddingTop: '24px',
          paddingBottom: '24px'
        }}
      >
          <h1 className='text-4xl font-extrabold text-center mb-6 drop-shadow-lg'>
            <span className='text-cyan-200'>Weather</span> <span className='text-emerald-100'>Report</span>
          </h1>
          {!weather && !error && (
            <div className='flex flex-col items-center justify-center py-16'>
              <span className='text-3xl font-bold text-white drop-shadow-lg mb-2'>Loading...</span>
            </div>
          )}
          {weather && (
            <div className='mt-6 text-center transition-opacity duration-500'>
              {/* Location name left, buttons right */}
              <div className='flex items-center justify-between mb-4'>
                <span className='text-2xl font-semibold text-emerald-950 drop-shadow-md'>{weather.name}</span>
                <div className='flex items-center gap-2'>
                  <button
                    className='h-12 px-6 bg-white/20 rounded-lg text-gray-500 font-semibold hover:bg-white/30 transition-colors duration-200 flex items-center'
                    style={{ minWidth: '180px' }}
                    onClick={() => navigate('/')}
                  >
                    Search New City
                  </button>
                  <button
                    className='h-12 w-12 bg-white/20 rounded-lg text-emerald-950 font-semibold hover:bg-white/30 transition-colors duration-200 flex items-center justify-center text-xl'
                    onClick={() => setUnit(unit === 'C' ? 'F' : 'C')}
                  >
                    °{unit}
                  </button>
                </div>
              </div>
              <div className='px-3'>
                <WeatherCard weather={weather} unit={unit} calcDewPoint={calcDewPoint} />
              </div>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 w-full max-w-5xl mx-auto px-2 pb-6'>
                <VisibilityCard weather={weather} />
                <PressureCard weather={weather} />
                <WindCard weather={weather} />
                <HumidityCard weather={weather} calcDewPoint={calcDewPoint} />
                <SunriseSunsetCard weather={weather} />
                <ReportUpdate />
              </div>
            </div>
          )}
          {error && <p className='text-red-400 text-center mt-4'>{error}</p>}
      </div>
    </div>
  );
};

export default WeatherReportPage;