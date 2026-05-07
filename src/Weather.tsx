import React, { useEffect, useState } from "react";
import { fetchWeatherData } from "./apis/WeatherApi";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./Weather.css";
import { DivOverlay } from "leaflet";

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
          const currentLocation = `${latitude},${longitude}`;
          setDefaultLocation(currentLocation);
        },
        (error) => {
          console.error("Error getting location:", error);
          setDefaultLocation("Lahore"); 
        }
      );
    } else {
      console.error("Geolocation not supported.");
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
    } catch (err) {
      setError("Failed to fetch weather data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchDefaultData = async () => {
      const data = await fetchWeatherData(defaultLocation);
      setWeatherData(data);
      setLoading(false);
    };

    getUserLocation();
    fetchDefaultData();
  }, [defaultLocation]);

  const getCurrentDate = () => {
    const options: Intl.DateTimeFormatOptions = {
      month: "long",
      day: "numeric",
    };
    return new Date().toLocaleDateString("en-US", options);
  };

  if (loading) {
    return <p className="loading">Loading...</p>;
  }

  return (
    <div>
      {/* Header */}
      <header className="navibar py-3 shadow-sm">
        <div className="container d-flex justify-content-between align-items-center">
          <h1 className="logo">PawGo <img src="Images/Pawicon.png" className="logoimg"/></h1>
          <nav>
            <ul className="nav">
              <li className="nav-item">
                <Link to="/" className="nav-link ">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/weather" className="nav-link ">
                  Weather
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/map" className="nav-link ">
                  Map
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <div className="weather-page">
        <div className="weather-container">
          {/* Search Bar on Top */}
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

          {/* Error message */}
          {error && <p className="error">{error}</p>}

          {/* Weather Data */}
          {weatherData && (
            <div className="weather-card">
              <div className="row">
                <div className="col text-start loc-time-row">
                  <h2 className="location-name">{weatherData.location.name}</h2>
                </div>
                <div className="col text-end loc-time-row">
                  <h2 className="date">{getCurrentDate()}</h2>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <div className="row weatherpaw-row">
                    <div className="pawgo-weather-heading">
                      <h1>Weather</h1>
                    </div>
                    <div className="weather-paw">
                      <img
                        src="/Images/Pawicon.png"
                        alt="Paw Icon"
                        className="img-fluid rounded-3"
                      />
                    </div>
                  </div>
                  <div className="row pawgo-heading">
                    <h2>PawGo</h2>
                  </div>
                </div>

                <div className="col current-weather">
                  <div className="row">
                    <div className="col weathericon-col">
                      <img
                        src={`https:${weatherData.current.condition.icon}`}
                        alt={weatherData.current.condition.text}
                        className="weather-icon"
                      />
                    </div>
                    <div className="col tem-name-col">
                      <div className="row">
                        <h3>{weatherData.current.condition.text}</h3>
                      </div>
                      <div className="row">
                        <p className="temperature">
                          {weatherData.current.temp_c}°
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Current Weather */}
              <div className="current-weather">
                <p className="details">
                  Wind: {weatherData.current.wind_kph} km/h | Pressure:{" "}
                  {weatherData.current.pressure_mb} mb
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Forecast */}
        <div className="weather-container">
          <div className="forecast-container weather-card">
            <div className="forecast">
              {weatherData.forecast.forecastday.map(
                (day: any, index: number) => (
                  <div key={index} className="forecast-day">
                    <p>
                      {new Date(day.date).toLocaleDateString("en-US", {
                        weekday: "short",
                      })}
                    </p>
                    <img src={day.day.condition.icon} alt="weather-icon" />
                    <p>{day.day.avgtemp_c}°C</p>
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="footer">
          <p>&copy; 2024 PawGo. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default Weather;
