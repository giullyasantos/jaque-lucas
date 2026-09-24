import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import '../App.css';

const NavBar = ({ introReady = true }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const labels = {
    home: 'INÍCIO',
    ourstory: 'NOSSA HISTÓRIA',
    gifts: 'PRESENTES',
    location: 'LOCALIZAÇÃO',
    rsvp: 'PRESENÇA',
  };

  const isRsvp = location.pathname === '/rsvp';
  const isCompact = isRsvp || location.pathname === '/ourstory' || location.pathname === '/gifts';

  const toggleMenu = () => setIsOpen((open) => !open);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className={`navbar ${isOpen ? 'open' : ''} ${isRsvp ? 'navbar--rsvp' : ''} ${isCompact ? 'navbar--compact' : ''}${introReady ? ' guidance-ready' : ''}`}>
      <div className="topbar">
        <div className="menu-trigger-wrap">
          <button
            onClick={toggleMenu}
            className="menu-button"
            aria-expanded={isOpen}
            aria-controls="main-navigation"
            aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
          >
            <svg
              id="menu"
              className={isOpen ? 'is-open' : ''}
              viewBox="0 0 40 40"
              aria-hidden="true"
            >
              <path className="menu-line menu-line--top" d="M9 16H31" />
              <path className="menu-line menu-line--bottom" d="M9 24H31" />
            </svg>
          </button>
        </div>
      </div>
      <ul id="main-navigation" className={`menu ${isOpen ? 'open' : ''}`}>
        <li style={{ '--menu-stagger': '0' }}><Link to="/" onClick={closeMenu}>{labels.home}</Link></li>
        <li style={{ '--menu-stagger': '1' }}><Link to="/ourstory" onClick={closeMenu}>{labels.ourstory}</Link></li>
        <li style={{ '--menu-stagger': '2' }}><Link to="/gifts" onClick={closeMenu}>{labels.gifts}</Link></li>
        <li style={{ '--menu-stagger': '3' }}><Link to="/rsvp" onClick={closeMenu}>{labels.rsvp}</Link></li>
        <li style={{ '--menu-stagger': '4' }}>
          <Link
            to="https://maps.app.goo.gl/55dh8DAiu1dQKvf4A"
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMenu}
          >
            {labels.location}
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
