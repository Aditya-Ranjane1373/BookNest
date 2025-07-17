import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  const handleExplore = () => {
    navigate('/rooms');
  };

  return (
    <div className="home-container">
      
      <div className="overlay">
        <h1 className="home-title">Welcome to RoyalDwell Hotel</h1>
        <p className="home-subtitle">
          Discover elegance and comfort at our luxury hotel. Easy booking. Seamless stay.
        </p>
        <button className="home-btn" onClick={handleExplore}>
          Explore Rooms
        </button>
      </div>
    </div>
  );
};

export default Home;
