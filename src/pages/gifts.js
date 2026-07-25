import React, { useState, useEffect } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import Loading from '../components/loader';

import giftsDesktop from '../media/giftsDesktop.webp';
import giftsMobile from '../media/giftsMobile.webp';

const preloadImages = (images) => {
  const promises = images.map(
    (src) =>
      new Promise((resolve) => {
        const img = new Image();
        img.onload = resolve;
        img.onerror = resolve;
        img.src = src;
      })
  );
  return Promise.all(promises);
};

const Gifts = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    preloadImages([giftsDesktop, giftsMobile]).then(() => setIsLoading(false));
  }, []);

  if (isLoading) return <Loading />;

  return (
    <div className="gifts fade-in">
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
