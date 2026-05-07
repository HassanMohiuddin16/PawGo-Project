import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import { BrowserRouter as Router, Link } from "react-router-dom";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./Map.css";
import { MdLocationPin } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import { getUserLocation, fetchNearbyParks } from "./apis/MapApi";

const MapComponent: React.FC = () => {
  const [userLocation, setUserLocation] = useState<GeolocationPosition | null>(null);
  const [parks, setParks] = useState<any[]>([]);
  const [query, setQuery] = useState<string>("");
  const [filteredParks, setFilteredParks] = useState<any[]>([]);
  const [selectedPark, setSelectedPark] = useState<any | null>(null);

  // Fetch user location and parks
  useEffect(() => {
    getUserLocation()
      .then((position) => {
        setUserLocation(position);
        fetchNearbyParks(position.coords.latitude, position.coords.longitude)
          .then((parksData) => {
            setParks(parksData);
          })
          .catch((error) => console.error("Error fetching parks:", error));
      })
      .catch((error) => console.error("Error fetching user location", error));
  }, []);

  // Handle search input
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  // Filter parks based on search query
  useEffect(() => {
    if (query) {
      setFilteredParks(
        parks.filter((park) =>
          park.name.toLowerCase().includes(query.toLowerCase())
        )
      );
    } else {
      setFilteredParks(parks);
    }
  }, [query, parks]);

  // Handle park selection
  const handleParkSelect = (park: any) => {
    setSelectedPark(park);
    console.log("Selected Park:", park);
  };

  return (
    <div>
      <header className="navibar py-3 shadow-sm">
        <div className="container d-flex justify-content-between align-items-center">
          <h1 className="logo">
            PawGo <img src="Images/Pawicon.png" className="logoimg" alt="logoimg" />
          </h1>
          <nav>
            <ul className="nav">
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/weather" className="nav-link">
                  Weather
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/map" className="nav-link">
                  Map
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <div className="wel-container container map-page-container">
        <div className="wel-row abdoutus-row row text-white rounded-4">
          <h2>Nearest Parks in 700m</h2>
        </div>

        <div className="map-pag-row wel-row row text-white rounded-4">
          <div className="col">
            <div className="search-bar-m">
              <div className="search-div">
                <div className="locationicon">
                  <MdLocationPin />
                </div>
                <input
                  type="text"
                  placeholder="Search for parks..."
                  value={query}
                  onChange={handleSearchChange}
                />
              </div>

              <div className="suggestions">
                {filteredParks.map((park, index) => (
                  <div
                    key={index}
                    onClick={() => handleParkSelect(park)}
                    className="suggestion-item"
                  >
                    <CiLocationOn className="icon" /> {park.name}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="col map-col">
            {/* Leaflet Map */}
            {userLocation && (
              <MapContainer
                center={[
                  userLocation.coords.latitude,
                  userLocation.coords.longitude,
                ]}
                zoom={16}
                style={{ width: "100%", height: "500px" }}
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                {/* User Location Marker */}
                <Marker
                  position={[
                    userLocation.coords.latitude,
                    userLocation.coords.longitude,
                  ]}
                  icon={L.icon({
                    iconUrl:
                      "https://p7.hiclipart.com/preview/230/805/284/computer-icons-clip-art-location-icon.jpg",
                    iconSize: [32, 32],
                  })}
                >
                  <Popup>Your Location</Popup>
                </Marker>

                <Circle
                  center={[
                    userLocation.coords.latitude,
                    userLocation.coords.longitude,
                  ]}
                  radius={50}
                  pathOptions={{
                    color: "blue",
                    fillColor: "blue",
                    fillOpacity: 0.2,
                    weight: 1,
                  }}
                />

                {/* Highlight Selected Park */}
                {selectedPark && (
                  <Marker
                    position={[selectedPark.location.lat, selectedPark.location.lng]}
                    icon={L.icon({
                      iconUrl:
                        "https://p7.hiclipart.com/preview/457/630/559/location-computer-icons-symbol-clip-art-location.jpg",
                      iconSize: [32, 32],
                      iconAnchor: [16, 32],
                      popupAnchor: [0, -32],
                    })}
                  >
                    <Popup>{selectedPark.name}</Popup>
                  </Marker>
                )}
              </MapContainer>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapComponent;
