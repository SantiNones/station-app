import React, { useEffect, useState } from 'react';
import CafeGrid from '../components/CafeGrid';
import { track } from '../lib/tracking';
import './HomePage.css';

const HomePage = () => {
  const [showCafes, setShowCafes] = useState(false);

  useEffect(() => {
    track('view_home');
  }, []);

  return (
    <main className="container">
      {!showCafes ? (
        <section className="home-hero">
          <h2 className="home-title">Book your station</h2>
          <p className="home-subtitle">
            Choose a café in Barcelona, pick a slot, and reserve your seat.
          </p>
          <button
            className="btn btn-primary home-cta"
            onClick={() => {
              setShowCafes(true);
            }}
            type="button"
          >
            Book your station
          </button>
        </section>
      ) : (
        <CafeGrid />
      )}
    </main>
  );
};

export default HomePage;
