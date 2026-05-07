import React, { useEffect, useState } from "react";
import { fetchWeatherData } from "./apis/WeatherApi";
import { Link } from "react-router-dom";
import "./Weather.css";

const Weather: React.FC = () => {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [location, setLocation] = useState<string>("");
  const [defaultLocation, setDefaultLocation] = useState<string>("Lahore");
  const [error, setError] = useState<string>("");

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setDefaultLocation(`${latitude},${longitude}`);
        },
        () => {
          setDefaultLocation("Lahore");
        }
      );
    } else {
      setDefaultLocation("Lahore");
    }
  };

  const handleSearch = async () => {
    if (!location) {
      setError("Please enter a location.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const data = await fetchWeatherData(location);
      setWeatherData(data);
    } catch {
      setError("Failed to fetch weather data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadDefault = async () => {
      const data = await fetchWeatherData(defaultLocation);
      setWeatherData(data);
      setLoading(false);
    };

    getUserLocation();
    loadDefault();
  }, [defaultLocation]);

  const getCurrentDate = () => {
    return new Date().toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
    });
  };

  if (loading || !weatherData) {
    return <p className="loading">Loading...</p>;
  }

  return (
    <div>
      {/* Header */}
      <header className="navibar py-3 shadow-sm">
        <div className="container d-flex justify-content-between align-items-center">
          <h1 className="logo">
            PawGo <img src="Images/Pawicon.png" className="logoimg" />
          </h1>

          <nav>
            <ul className="nav">
              <li><Link to="/" className="nav-link">Home</Link></li>
              <li><Link to="/weather" className="nav-link">Weather</Link></li>
              <li><Link to="/map" className="nav-link">Map</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <div className="weather-page">
        <div className="weather-container">

          {/* Search */}
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="search-input"
            />
            <button onClick={handleSearch} className="search-button">
              Search
            </button>
          </div>

          {error && <p className="error">{error}</p>}

          {/* Weather Card */}
          <div className="weather-card">
            <div className="row">
              <div className="col text-start">
                <h2>{weatherData.location.name}</h2>
              </div>
              <div className="col text-end">
                <h2>{getCurrentDate()}</h2>
              </div>
            </div>

            <h1>Weather</h1>

            <div className="current-weather">
              <img
                src={`https:${weatherData.current.condition.icon}`}
                alt="weather"
              />
              <h3>{weatherData.current.condition.text}</h3>
              <p>{weatherData.current.temp_c}°C</p>
            </div>

            <p>
              Wind: {weatherData.current.wind_kph} km/h | Pressure:{" "}
              {weatherData.current.pressure_mb} mb
            </p>
          </div>
        </div>

        {/* Forecast (SAFE) */}
        <div className="weather-container">
          <div className="forecast-container weather-card">

            {weatherData?.forecast?.forecastday?.length > 0 && (
              <div className="forecast">
                {weatherData.forecast.forecastday.map(
                  (day: any, index: number) => (
                    <div key={index} className="forecast-day">
                      <p>
                        {new Date(day.date).toLocaleDateString("en-US", {
                          weekday: "short",
                        })}
                      </p>
                      <img src={`https:${day.day.condition.icon}`} alt="icon" />
                      <p>{day.day.avgtemp_c}°C</p>
                    </div>
                  )
                )}
              </div>
            )}

          </div>
        </div>

        {/* Footer */}
        <footer className="footer">
          <p>© 2024 PawGo</p>
        </footer>
      </div>
    </div>
  );
};

export default Weather;