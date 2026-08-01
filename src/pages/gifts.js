import React, { useState, useEffect } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';

import giftsDesktop from '../media/giftsDesktop.webp';
import giftsMobile from '../media/giftsMobile.webp';

const getGiftBackground = () => (
  window.innerWidth <= 768 ? giftsMobile : giftsDesktop
);

const preloadImage = (src) => new Promise((resolve) => {
  const img = new Image();
  img.onload = resolve;
  img.onerror = resolve;
  img.src = src;
});

const waitForPaint = () => new Promise((resolve) => {
  requestAnimationFrame(() => requestAnimationFrame(resolve));
});

const useGiftBackgroundReady = () => {
  const [backgroundReady, setBackgroundReady] = useState(false);
  const [backgroundSrc, setBackgroundSrc] = useState(getGiftBackground);

  useEffect(() => {
    const handleResize = () => {
      setBackgroundSrc(getGiftBackground());
      setBackgroundReady(false);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    let cancelled = false;

    setBackgroundReady(false);
    preloadImage(backgroundSrc)
      .then(waitForPaint)
      .then(() => {
        if (!cancelled) setBackgroundReady(true);
      });

    return () => {
      cancelled = true;
    };
  }, [backgroundSrc]);

  return backgroundReady;
};

const Gifts = () => {
  const backgroundReady = useGiftBackgroundReady();

  return (
    <div className={`gifts ${backgroundReady ? 'gifts--ready' : 'gifts--loading'}`}>
      <div className="gifts-loading-veil" aria-hidden="true" />
      <div className="description">
        <h1 style={{ fontSize: '4.5em' }}>PRESENTES</h1>
        <div className="gifts-rule" />
        <p>
          Sua presença no nosso casamento é o maior presente que poderíamos pedir. Se desejar nos honrar com um presente, registramos itens que nos ajudarão a começar nossa nova vida juntos.
        </p>
        <div className="registry">
          <Link className="button" to="https://www.zola.com/registry/damarisandsidiclei">
            <span>Contribua</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Gifts;
