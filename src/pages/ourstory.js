import React, { useState, useEffect } from 'react';
import '../App.css';
import Loading from '../components/loader';

import photo1 from '../media/IMG_8636.webp';
import photo2 from '../media/IMG_8639.webp';
import photo3 from '../media/IMG_8642.webp';
import photo4 from '../media/IMG_8643.webp';
import photo5 from '../media/IMG_8646.webp';
import photo6 from '../media/IMG_8647.webp';

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

const OurStory = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    preloadImages([photo1, photo2, photo3, photo4, photo5, photo6]).then(() => setIsLoading(false));
  }, []);

  if (isLoading) return <Loading />;

  return (
    <div className="our-story-container">
      <section className="story-section">
        <p className="story-eyebrow">Como tudo começou</p>
        <h1 className="story-title">Nossa História</h1>
        <div className="story-rule" />
        <p className="story-text">
          A nossa história teve um início um pouco atípico já que morávamos em cidades diferentes quando nos conhecemos e nossas famílias se aproximaram antes de pensarmos na possibilidade de um relacionamento, mas não demorou muito para o desejo surgir no nosso coração.
        </p>
        <div className="photo-gallery">
          <img src={photo1} alt="Our Story 1" className="story-photo" />
          <img src={photo2} alt="Our Story 2" className="story-photo" />
          <img src={photo3} alt="Our Story 3" className="story-photo" />
        </div>
      </section>

      <section className="story-section">
        <p className="story-eyebrow">O que está por vir</p>
        <h1 className="story-title">O Futuro</h1>
        <div className="story-rule" />
        <p className="story-text">
          Daí em diante nos tornamos melhores amigos, confidentes, noivos e em breve marido e mulher.
        </p>
        <div className="photo-gallery2">
          <img src={photo5} alt="Our Story 4" className="story-photo" />
          <img src={photo6} alt="Our Story 5" className="story-photo" />
        </div>
      </section>

      <section className="scripture-section">
        <span className="scripture-ornament">✦ ✦ ✦</span>
        <p className="scripture-text">
          "Para que todos vejam e saibam, considerem e entendam que a mão do Senhor fez isso."
        </p>
        <p className="scripture-reference">— Isaías 41:20</p>
      </section>
    </div>
  );
};

export default OurStory;
