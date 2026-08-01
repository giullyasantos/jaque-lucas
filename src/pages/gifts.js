import React, { useState, useEffect, useRef } from 'react';
import '../App.css';

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

const giftRegistryUrl = 'https://www.finalfeliz.de/jaqueline-lucaslopes';

const useGiftBackgroundReady = () => {
  const [backgroundReady, setBackgroundReady] = useState(false);
  const [backgroundSrc, setBackgroundSrc] = useState(getGiftBackground);
  const loadedSrcRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      const nextSrc = getGiftBackground();
      setBackgroundSrc((currentSrc) => (
        currentSrc === nextSrc ? currentSrc : nextSrc
      ));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    let cancelled = false;

    if (loadedSrcRef.current === backgroundSrc) {
      setBackgroundReady(true);
      return () => {
        cancelled = true;
      };
    }

    setBackgroundReady(false);
    preloadImage(backgroundSrc)
      .then(waitForPaint)
      .then(() => {
        if (!cancelled) {
          loadedSrcRef.current = backgroundSrc;
          setBackgroundReady(true);
        }
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
        <p className="gifts-eyebrow">Com carinho</p>
        <h1>Presentes</h1>
        <div className="gifts-rule" />
        <p className="gifts-copy">
          Sua presença é o nosso maior presente. Se desejar nos abençoar de outra forma, preparamos uma contribuição para o início da nossa vida juntos.
        </p>
        <div className="registry">
          <a className="button" href={giftRegistryUrl} target="_blank" rel="noopener noreferrer">
            <span>Contribua</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Gifts;
