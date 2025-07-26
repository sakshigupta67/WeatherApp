import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import WeatherBackground from '../components/WeatherBackground';

const API_KEY = '9edf32dd68e2fcbf12b2516b43b0fcef';

const HomePage = () => {
  const [city, setCity] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState('');
  const [notFound, setNotFound] = useState(false);
  const navigate = useNavigate();

  const fetchSuggestions = async (query) => {
    if (query.length < 3) {
      setSuggestions([]);
      setNotFound(false);
      return;
    }
    try {
      const res = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${API_KEY}`
      );
      const data = await res.json();
      const prioritizedSuggestions = data
        .map((item) => ({
          ...item,
          displayName: `${item.name}${item.state ? `, ${item.state}` : ''}, ${item.country}`,
        }))
        .sort((a, b) => {
          const isVaranasiA = a.name.toLowerCase() === 'varanasi' || (a.state && a.state.toLowerCase().includes('uttar pradesh'));
          const isVaranasiB = b.name.toLowerCase() === 'varanasi' || (b.state && b.state.toLowerCase().includes('uttar pradesh'));
          if (isVaranasiA && !isVaranasiB) return -1;
          if (!isVaranasiA && isVaranasiB) return 1;
          return 0;
        })
        .slice(0, 3);
      setSuggestions(prioritizedSuggestions);
      setNotFound(data.length === 0);
    } catch {
      setSuggestions([]);
      setNotFound(true);
    }
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (city.trim()) {
        fetchSuggestions(city.trim());
      } else {
        setSuggestions([]);
        setNotFound(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [city]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!city.trim()) {
      setError('Please enter a valid city name.');
      setNotFound(false);
      setSuggestions([]);
      return;
    }
    setError('');
    setNotFound(false);
    if (suggestions.length > 0) {
      navigate(`/weather?city=${encodeURIComponent(city.trim())}`);
    } else {
      await fetchSuggestions(city.trim());
      if (suggestions.length > 0) {
        navigate(`/weather?city=${encodeURIComponent(city.trim())}`);
      }
    }
  };

  const handleSuggestionClick = (suggestion) => {
    const cityName = suggestion.displayName;
    setCity(cityName);
    setSuggestions([]);
    navigate(`/weather?city=${encodeURIComponent(cityName)}`);
  };

  return (
    <div className='min-h-screen scrollbar-hide'>
      <WeatherBackground />
      <div className='min-h-screen flex items-center justify-center px-2'>
        <div className='bg-white/20 backdrop-blur-lg rounded-3xl shadow-2xl p-8 w-full max-w-xl text-white border-white/30 relative z-10 flex flex-col items-center'>
          <h1 className='text-5xl font-extrabold text-center mb-2 drop-shadow-lg' style={{ letterSpacing: '2px' }}>
            <span className='text-cyan-200'>Sky</span><span className='text-emerald-100'>Mist</span>
          </h1>
          <h2 className='text-2xl font-semibold text-center mb-4 text-white/90 drop-shadow'>Your Weather, Beautifully Simple</h2>
          <p className='text-lg text-center mb-8 text-white/80'>Check your local weather now.</p>
          <form onSubmit={handleSearch} className='w-full flex flex-col items-center gap-2 relative'>
            <input
              type='text'
              className='w-full rounded-lg px-5 py-3 text-lg text-gray-900 bg-white/80 focus:outline-none focus:ring-2 focus:ring-cyan-300 placeholder-gray-500 shadow'
              placeholder='Enter city or country (min 3 letters)'
              value={city}
              onChange={e => { setCity(e.target.value); setError(''); setNotFound(false); }}
              minLength={3}
              required
              autoFocus
            />
            {suggestions.length > 0 && (
              <ul className='w-full bg-white/90 rounded-lg shadow-lg absolute top-14 z-20'>
                {suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    className='px-5 py-2 text-gray-900 hover:bg-cyan-100 cursor-pointer'
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion.displayName}
                  </li>
                ))}
              </ul>
            )}
            <button
              type='submit'
              className='w-full bg-gradient-to-r from-cyan-500 to-emerald-500 text-white text-lg font-bold py-3 rounded-lg shadow-lg hover:from-cyan-600 hover:to-emerald-600 transition-colors duration-200 mt-2'
            >
              Get Weather
            </button>
          </form>
          {error && <p className='text-red-300 text-center mt-4'>{error}</p>}
          {notFound && (
            <div className='mt-6 text-center'>
              <p className='italic text-white text-lg mb-2 drop-shadow'>
                City not found. Help us improve.{' '}
                <a href='https://forms.gle/your-feedback-form' target='_blank' rel='noopener noreferrer' className='underline text-cyan-100 hover:text-cyan-300'>Click here</a>.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;