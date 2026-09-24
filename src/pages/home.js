import React, { useEffect, useState } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import { useReveal } from '../hooks/useReveal';
import coupleDesktop from '../media/HomeDesktop.png';
import coupleMobile from '../media/HomeDesktop.png';

const preloadImages = (images) => {
  const promises = images.map(
    (src) => new Promise((resolve) => {
      const img = new Image();
      img.onload = resolve;
      img.onerror = resolve;
      img.src = src;
    })
  );
  return Promise.all(promises);
};

const useGuidanceActivation = (targetRef, ready, threshold = 0.25) => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const target = targetRef.current;
    if (!ready || !target) return undefined;

    if (!('IntersectionObserver' in window)) {
      setActive(true);
      return undefined;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setActive(true);
        observer.disconnect();
      }
    }, { threshold });

    observer.observe(target);
    return () => observer.disconnect();
  }, [ready, targetRef, threshold]);

  return active;
};

const Divider = ({ className = '', isVisible = true }) => (
  <div className={`home-divider-ornament reveal-divider${isVisible ? ' is-visible' : ''}${className ? ` ${className}` : ''}`}>
    <span />
    <svg viewBox="0 0 10 10">
      <polygon points="5,1 9,5 5,9 1,5" fill="none" stroke="currentColor" strokeWidth="1" />
    </svg>
    <span />
  </div>
);

const DateBlock = () => (
  <div className="home-hero-inner">
    <h1 className="home-couple">Jaqueline & Lucas</h1>
    <p className="home-invite">convidam para o seu casamento</p>

    <div className="home-date-block">
      <div className="home-date-arc-wrap">
        <svg className="home-date-arc-svg" viewBox="0 0 220 70" fill="none">
          <path id="dateCurve" d="M 20,68 Q 110,10 200,68" fill="none" />
          <text fontFamily="inherit" fontSize="13" fontWeight="500" letterSpacing="5" textAnchor="middle">
            <textPath href="#dateCurve" startOffset="50%">· DOMINGO ·</textPath>
          </text>
        </svg>
      </div>
      <div className="home-date-middle">
        <div className="home-date-side">
          <span className="home-date-hline" />
          <span className="home-date-month">Dezembro</span>
          <span className="home-date-hline" />
        </div>
        <span className="home-date-day">6</span>
        <div className="home-date-side">
          <span className="home-date-hline" />
          <span className="home-date-time">às 11h00</span>
          <span className="home-date-hline" />
        </div>
      </div>
      <div className="home-date-year">2026</div>
    </div>
  </div>
);

const ActionsBlock = ({ dresscodeRef, dresscodeVisible = true, iconsRef, iconsVisible = true, iconsGuidanceActive = false, venueRef, venueVisible = true, venueGuidanceActive = false }) => (
  <>
    <Divider />

    <p ref={dresscodeRef} className={`home-dresscode reveal-up${dresscodeVisible ? ' is-visible' : ''}`}>
      Traje: esporte fino
    </p>

    <div ref={iconsRef} className={`home-icons${iconsVisible ? ' icons-visible' : ''}${iconsGuidanceActive ? ' guidance-active' : ''}`}>
      <a aria-label="Abrir localização no mapa" href="https://maps.app.goo.gl/55dh8DAiu1dQKvf4A" target="_blank" rel="noopener noreferrer" className="home-icon-btn reveal-up" style={{ '--stagger': '0' }}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
          <circle cx="12" cy="9" r="2.5" />
        </svg>
        <span>Local</span>
      </a>
      <Link aria-label="Ver lista de presentes" to="/gifts" className="home-icon-btn reveal-up" style={{ '--stagger': '1' }}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="3" y="8" width="18" height="4" rx="1" />
          <path d="M5 12v8h14v-8" />
          <path d="M12 8v12" />
          <path d="M8.5 8c0-1.5 0.8-3.5 3.5-3.5s3.5 2 3.5 3.5" />
        </svg>
        <span>Presentes</span>
      </Link>
      <Link aria-label="Confirmar presença" to="/rsvp" className="home-icon-btn reveal-up" style={{ '--stagger': '2' }}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10" />
          <path d="M7 12.5l3.5 3.5 6.5-7" />
        </svg>
        <span>Confirmar Presença</span>
      </Link>
      <Link aria-label="Conhecer nossa história" to="/ourstory" className="home-icon-btn reveal-up" style={{ '--stagger': '3' }}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
          <path d="M9 7h6M9 11h4" />
        </svg>
        <span>Nossa História</span>
      </Link>
    </div>

    <a ref={venueRef} aria-label="Abrir Recanto Miami no mapa" href="https://maps.app.goo.gl/55dh8DAiu1dQKvf4A" target="_blank" rel="noopener noreferrer"
      className={`home-venue-card reveal-up${venueVisible ? ' is-visible' : ''}${venueGuidanceActive ? ' guidance-active' : ''}`}>
      <div className="home-venue-bg">
        <svg className="home-venue-roads" viewBox="0 0 500 260" fill="none">
          <path d="M0 160 Q120 140 200 155 Q300 170 500 145" stroke="rgba(184,14,84,0.12)" strokeWidth="18" strokeLinecap="round" />
          <path d="M0 160 Q120 140 200 155 Q300 170 500 145" stroke="rgba(251,248,245,0.5)" strokeWidth="2" strokeDasharray="12 8" strokeLinecap="round" />
          <path d="M80 0 Q110 80 130 155" stroke="rgba(184,14,84,0.1)" strokeWidth="14" strokeLinecap="round" />
          <path d="M80 0 Q110 80 130 155" stroke="rgba(251,248,245,0.4)" strokeWidth="1.5" strokeDasharray="10 7" strokeLinecap="round" />
          <path d="M320 260 Q340 200 360 155" stroke="rgba(184,14,84,0.1)" strokeWidth="12" strokeLinecap="round" />
          <path d="M320 260 Q340 200 360 155" stroke="rgba(251,248,245,0.4)" strokeWidth="1.5" strokeDasharray="10 7" strokeLinecap="round" />
          <path d="M200 0 Q210 60 220 155" stroke="rgba(184,14,84,0.07)" strokeWidth="10" strokeLinecap="round" />
          <rect x="30" y="90" width="48" height="30" rx="4" fill="rgba(184,14,84,0.07)" />
          <rect x="30" y="90" width="48" height="30" rx="4" stroke="rgba(184,14,84,0.15)" strokeWidth="0.5" fill="none" />
          <rect x="390" y="70" width="60" height="36" rx="4" fill="rgba(184,14,84,0.07)" />
          <rect x="390" y="70" width="60" height="36" rx="4" stroke="rgba(184,14,84,0.15)" strokeWidth="0.5" fill="none" />
          <rect x="160" y="30" width="40" height="25" rx="3" fill="rgba(184,14,84,0.06)" />
          <rect x="260" y="185" width="50" height="30" rx="3" fill="rgba(184,14,84,0.07)" />
          <rect x="420" y="170" width="44" height="28" rx="3" fill="rgba(184,14,84,0.06)" />
        </svg>
        <div className="home-venue-pin">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
            <circle cx="12" cy="9" r="2.5" fill="white" />
          </svg>
        </div>
      </div>
      <div className="home-venue-info">
        <div className="home-venue-name">Recanto Miami</div>
        <div className="home-venue-address">Av. Acapulco, 186 · Água Azul · Guarulhos - SP</div>
        <div className="home-venue-cta">Ver no mapa →</div>
      </div>
    </a>
  </>
);

const HomeClassic = ({ introReady = true }) => {
  const [heroSectionRef, heroSectionVisible] = useReveal(0.18);
  const [detailsSectionRef,  detailsSectionVisible]  = useReveal(0.18);
  const [dresscodeRef,dresscodeVisible]= useReveal(0.3);
  const [iconsRef,    iconsVisible]    = useReveal(0.2);
  const [venueRef,    venueVisible]    = useReveal(0.15);
  const [hasScrolled, setHasScrolled] = useState(false);
  const iconsGuidanceActive = useGuidanceActivation(iconsRef, introReady, 0.35);
  const venueGuidanceActive = useGuidanceActivation(venueRef, introReady, 0.3);

  useEffect(() => {
    const handleFirstScroll = () => {
      if (window.scrollY > 20) setHasScrolled(true);
    };

    window.addEventListener('scroll', handleFirstScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleFirstScroll);
  }, []);

  const scrollToDetails = () => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    detailsSectionRef.current?.scrollIntoView({
      behavior: reduceMotion ? 'auto' : 'smooth',
      block: 'start',
    });
  };

  return (
    <section className={`home-container fade-in${introReady ? ' guidance-ready' : ''}`}>
      <div className="home-content">
        <section
          ref={heroSectionRef}
          className={`home-section home-section--hero home-section--reveal reveal-up${heroSectionVisible ? ' is-visible' : ''}`}
        >
          <DateBlock />
        </section>

        <section
          ref={detailsSectionRef}
          className={`home-section home-section--details home-section--reveal reveal-up${detailsSectionVisible ? ' is-visible' : ''}`}
        >
          <ActionsBlock
            dresscodeRef={dresscodeRef}
            dresscodeVisible={dresscodeVisible}
            iconsRef={iconsRef}
            iconsVisible={iconsVisible}
            iconsGuidanceActive={iconsGuidanceActive}
            venueRef={venueRef}
            venueVisible={venueVisible}
            venueGuidanceActive={venueGuidanceActive}
          />
        </section>
      </div>
      <button className={`home-scroll-guidance${hasScrolled ? ' is-hidden' : ''}`} type="button" onClick={scrollToDetails} aria-label="Rolar para mais informações">
        <span className="home-scroll-guidance__label">Deslize</span>
        <span className="home-scroll-guidance__track" aria-hidden="true">
          <span className="home-scroll-guidance__glint" />
        </span>
        <svg viewBox="0 0 24 34" fill="none" aria-hidden="true">
          <path d="M4 10L12 18L20 10" />
          <path d="M4 19L12 27L20 19" />
        </svg>
      </button>
    </section>
  );
};

const Home = ({ introReady = true }) => {
  useEffect(() => {
    preloadImages([coupleDesktop, coupleMobile]);
  }, []);

  return <HomeClassic introReady={introReady} />;
};

export default Home;
