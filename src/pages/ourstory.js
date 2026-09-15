import React from 'react';
import '../App.css';

import photo1 from '../media/content/photos/casa-noite-close-sorrindo-selfie.jpg';
import photo2 from '../media/content/photos/condominio-area-externa-selfie-sorrindo.jpg';
import photo3 from '../media/content/photos/restaurante-booth-rindo-juntos-candid.jpg';
import photo4 from '../media/content/photos/pedras-noite-pedido-anel-selfie.jpg';
import photo5 from '../media/content/photos/restaurante-booth-rindo-anel-candid.jpg';

const HeartAnimation = () => (
  <div className="story-heart-wrap" aria-hidden="true">
    <svg viewBox="0 0 100 90" className="story-heart-svg">
      <path
        pathLength="1"
        className="story-heart-path"
        d="M50 85 C10 65 0 45 0 28 C0 12 12 0 28 0 C37 0 47 5 50 14 C53 5 63 0 72 0 C88 0 100 12 100 28 C100 45 90 65 50 85Z"
      />
    </svg>
  </div>
);

const OurStory = () => {
  return (
    <div className="our-story-container">
      <section className="story-section">
        <p className="story-eyebrow">Como tudo começou</p>
        <h1 className="story-title">Nossa História</h1>
        <div className="story-rule" />
        <p className="story-text">
          Nossa história começou de um jeito simples, quase por acaso, em 2022, quando nos conhecemos pelas redes sociais, entre Facebook e Instagram.
        </p>
        <p className="story-text">
          No começo, eram apenas conversas despretensiosas sobre séries, filmes, coisas que gostávamos e aquelas pequenas descobertas que, sem perceber, foram criando uma conexão cada vez maior entre nós. Até que decidimos transformar as conversas virtuais em um encontro de verdade.
        </p>
        <div className="photo-gallery">
          <img src={photo1} alt="Nossa História 1" className="story-photo" />
          <img src={photo2} alt="Nossa História 2" className="story-photo" />
          <img src={photo3} alt="Nossa História 3" className="story-photo" />
        </div>
      </section>

      <section className="story-section">
        <p className="story-eyebrow">O primeiro encontro</p>
        <h1 className="story-title">Quando tudo mudou</h1>
        <div className="story-rule" />
        <p className="story-text">
          E foi naquele primeiro encontro que algo mudou. O que começou como uma conversa pela internet se tornou a história mais bonita das nossas vidas. Depois daquele dia, não nos separamos mais. Vieram os momentos juntos, as risadas, os planos, os sonhos e a certeza de que havíamos encontrado um no outro um lugar para chamar de lar.
        </p>
        <p className="story-text">
          Em 2024, demos mais um passo nessa história e ficamos noivos, prometendo continuar escolhendo um ao outro todos os dias.
        </p>
        <div className="photo-gallery2">
          <img src={photo4} alt="Nossa História 4" className="story-photo" />
          <img src={photo5} alt="Nossa História 5" className="story-photo" />
        </div>
      </section>

      <section className="story-section">
        <p className="story-eyebrow">2026</p>
        <h1 className="story-title">Para sempre</h1>
        <div className="story-rule" />
        <p className="story-text">
          Agora, estamos prestes a viver um dos capítulos mais importantes da nossa história: o nosso casamento.
        </p>
        <p className="story-text">
          De uma simples conversa sobre filmes e séries nasceu um amor que atravessou a tela, ganhou a vida real e se transformou em um para sempre.
        </p>
        <p className="story-text story-text--closing">
          E talvez essa seja a parte mais bonita da nossa história: nós não estávamos procurando um ao outro, mas a vida, de alguma forma, fez questão de nos encontrar.
        </p>
        <HeartAnimation />
      </section>
    </div>
  );
};

export default OurStory;
