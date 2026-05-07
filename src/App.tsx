import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./App.css";
import MapComponent from "./Map";
import Weather from "./Weather";


const Home = () => {
  const openSignUp = () => {
    alert("Sign Up functionality coming soon!");
  };

  const openLogIn = () => {
    alert("Log In functionality coming soon!");
  };

  return (
    <div>
      <header className="navibar py-3 shadow-sm">
        <div className="container d-flex justify-content-between align-items-center">
          <h1 className="logo">
            PawGo <img src="Images/Pawicon.png" className="logoimg" alt="logoimg"/>
          </h1>
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

      <main className="wel-container container align-items-center justify-content-center">
        <div className="wel-row row text-white p-5 rounded-4">
          <div className="col-md-6 text-center d-flex flex-column justify-content-center">
            <h2 className="fw-bold">PawGo</h2>
            <div className="dogcatimg">
              <img
                src="/Images/dog-and-cat.png"
                alt="Dog and Cat"
                className="img-fluid rounded-3"
              />
            </div>
          </div>

          <div className="wel-col-2 col-md-6">
            <div className="row">
              <div>
                <h1>Welcome</h1>
              </div>
            </div>
            <div className="col">
              <div className="row">
                <div className="col wel-img2">
                  <img src="/Images/welpaws.png" alt="Welcome Paws" />
                </div>
                <div className="col">
                  <div className="row">
                    <button className="btn wel-btn" onClick={openSignUp}>
                      Sign Up
                    </button>
                    <button className="btn wel-btn" onClick={openLogIn}>
                      Log In
                    </button>
                  </div>
                </div>
                <div className="col wel-img1">
                  <img
                    src="/Images/welpaes2.png"
                    alt="Welcome Image"
                    className="img-fluid rounded-3"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="wel-row abdoutus-row row text-white p-5 rounded-4">
          <h2>
            About <span>PawGo</span>
          </h2>
          <img src="/Images/Pawiconwhite.png" className="abouticon" alt="" />
        </div>

        <div className="wel-row abdout-row row text-white p-5 rounded-4">
          <div className="col-md-8 text-center  justify-content-center">
            <p>
              Welcome to PawGo! The name "PawGo" combines two simple ideas:
              "Paw" for your pet's cute little paws and "Go" for heading out on
              adventures. Together, PawGo means taking your pets for a walk or
              exploring the outdoors with them. <br />
              PawGo is designed to make your life as a pet owner easier and more
              enjoyable. It currently provides two key features. First, it shows
              the weather conditions in your area so you can plan the perfect
              time to take your pet for a walk. Second, it helps you find the
              nearest parks, making it simple to choose a pet-friendly spot to
              visit based on the weather. <br />
              With PawGo, you can ensure your pet stays happy, healthy, and
              active, while you enjoy quality time together. Whether you're
              planning a quick walk or a fun outing to the park, PawGo is here
              to help you make the best decisions for your furry friend.
            </p>
          </div>

          <div className="wel-col-2 col-md-3 btn-img-col">
            <div className="row">
              <Link to="/weather" className="btn wel-btn">
                See Weather
              </Link>
            </div>
            <div className="row">
              <Link to="/map" className="btn wel-btn">
                Nearest Parks
              </Link>
            </div>
            <div className="row">
              <div className="dogcatimg">
                <img
                  src="/Images/dog-and-cat.png"
                  alt="Dog and Cat"
                  className="img-fluid rounded-3"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="footer">
        <p>&copy; 2024 PawGo. All rights reserved.</p>
      </footer>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/weather" element={<Weather />} />
        <Route path="/map" element={<MapComponent />} />
      </Routes>
    </Router>
  );
};

export default App;
