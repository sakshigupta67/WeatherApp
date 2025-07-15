
// THIS FUNCTION CONVERTS WIND DIRECTION GIVEN IN DEGRESS



export const getWindDirection = (deg) => {
  if (deg > 337.5 || deg <= 22.5) return 'N';
  if (deg > 22.5 && deg <= 67.5) return 'NE';
  if (deg > 67.5 && deg <= 112.5) return 'E';
  if (deg > 112.5 && deg <= 157.5) return 'SE';
  if (deg > 157.5 && deg <= 202.5) return 'S';
  if (deg > 202.5 && deg <= 247.5) return 'SW';
  if (deg > 247.5 && deg <= 292.5) return 'W';
  if (deg > 292.5 && deg <= 337.5) return 'NW';
};

// Get humidity level as a label
export const getHumidityValue = (humidity) => {
  if (humidity < 30) return 'Low';
  if (humidity < 60) return 'Moderate';
  return 'High';
};

// this function Converts meter to kilometers
export const getVisibilityValue = (visibility) => {
  const km = visibility / 1000;
  return `${km.toFixed(1)} km`;
};

// this function Converts temperature between Celsius and Fahrenheit upto 1 deimal place
export const convertTemperature = (temp, unit) => {
  if (unit === 'F') {
    return (temp * 9 / 5 + 32).toFixed(1);
  }
  return temp.toFixed(1);
};

// Get wind force description based on speed
export const getWindForce = (speed) => {
  if (speed < 1) return { force: 0, desc: 'Calm' };
  if (speed < 6) return { force: 1, desc: 'Light Air' };
  if (speed < 12) return { force: 2, desc: 'Light Breeze' };
  if (speed < 20) return { force: 3, desc: 'Gentle Breeze' };
  if (speed < 29) return { force: 4, desc: 'Moderate Breeze' };
  return { force: 5, desc: 'Fresh Breeze' };
};
