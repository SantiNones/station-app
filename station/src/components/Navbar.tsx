import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          <h1 className="navbar-logo">
            <img
              className="navbar-logo-image"
              src="/logo.png"
              alt="ZipStation"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = 'none';
                const mark = e.currentTarget.parentElement?.querySelector(
                  '.navbar-mark'
                ) as HTMLSpanElement | null;
                if (mark) mark.style.display = 'inline-block';
              }}
            />
            <span className="navbar-mark" aria-hidden="true" />
            <span>ZipStation</span>
          </h1>
          <div className="navbar-right">
            <Link to="/owner" className="navbar-link">For cafés</Link>
            <p className="navbar-tagline">Book your station</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
