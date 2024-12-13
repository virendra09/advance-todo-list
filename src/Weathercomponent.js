// WeatherComponent.js
import React, { useState, useEffect } from 'react';

const WeatherComponent = ({ apiKey, city }) => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );
        if (response.ok) {
          const data = await response.json();
          setWeatherData(data);
        } else {
          console.error('Failed to fetch weather data');
        }
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeatherData();
  }, [apiKey, city]);

  if (!weatherData) return null;

  const { main, weather } = weatherData;

  return (
    <div style={styles.weatherContainer}>
      <h2>Weather in {city}</h2>
      <div>
        <strong>Temperature:</strong> {main.temp}°C
      </div>
      <div>
        <strong>Description:</strong> {weather[0].description}
      </div>
    </div>
  );
};

const styles = {
  weatherContainer: {
    marginTop: '20px',
    backgroundColor: '#e9ecef',
    padding: '10px',
    borderRadius: '5px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
};

export default WeatherComponent;
