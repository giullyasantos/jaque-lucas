import React, { useEffect, useState } from 'react';
import '../App.css';

import logo from '../media/content/design-assets/J&L-flower-circle.png';
import p1 from '../media/content/photos/polaroids-loading-screen/1.jpg';
import p2 from '../media/content/photos/polaroids-loading-screen/2.jpg';
import p4 from '../media/content/photos/polaroids-loading-screen/4.jpg';
import ring from '../media/ringpic.webp';

const POLAROIDS = [
  { src: p1,   rotate: '-8deg'  },
  { src: p2,   rotate:  '6deg'  },
  { src: p4,   rotate: '-4deg'  },
  { src: ring, rotate:  '9deg'  },
];

//  ── Timeline (all ms) ──────────────────────────────────────
const MIN_LOGO_MS    = 1600;
const LOGO_OUT_DUR   = 800;
const VERSE_IN_DUR   = 2600;
const VERSE_HOLD     = 6000;
const VERSE_OUT_DUR  = 900;
const FIRST_POL      = LOGO_OUT_DUR + VERSE_IN_DUR + VERSE_HOLD + VERSE_OUT_DUR + 500;
// p1 and p2 get 1600ms each, p4 and ring get 1000ms
const POL_GAPS       = [1600, 1600, 1000];
const POL_TIMES      = POLAROIDS.reduce((acc, _, i) => {
  if (i === 0) return [FIRST_POL];
  return [...acc, acc[i - 1] + POL_GAPS[i - 1]];
}, []);
const LAST_POL       = POL_TIMES[POLAROIDS.length - 1];

const POLS_OUT_START = LAST_POL + 1400;
const POLS_OUT_DUR   = 1200;
const BLESSING_START = POLS_OUT_START + POLS_OUT_DUR + 600;
const BLESSING_HOLD  = 3200;
const BLESSING_OUT_DUR = 900;
const READY_START    = BLESSING_START + BLESSING_HOLD + BLESSING_OUT_DUR;
const READY_HOLD     = 2200;
const READY_OUT_DUR  = 700;
const SCREEN_EXIT    = READY_START + READY_HOLD + READY_OUT_DUR;
const EXIT_DUR       = 1400;
// ─────────────────────────────────────────────────────────────

const VERSE_TEXT = 'Deus uniu nossos caminhos e nós dois sabemos que uniremos nossas vidas para sempre.';

const Loading = ({ onDone, assetsReady = false, progress = 0, variant = 'route' }) => {
  const [phase, setPhase]          = useState('logo');
  const [visibleCount, setVisible] = useState(0);
  const [minLogoDone, setMinLogoDone] = useState(false);
  const [presentationProgress, setPresentationProgress] = useState(0);
  const isIntro = variant === 'intro';

  // Lock body scroll while the loading screen is visible
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setMinLogoDone(true), MIN_LOGO_MS);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isIntro || !assetsReady || !minLogoDone) return undefined;

    const t = [];
    let progressFrame;
    const presentationStartedAt = performance.now();

    const updatePresentationProgress = (now) => {
      const nextProgress = Math.min((now - presentationStartedAt) / SCREEN_EXIT, 1);
      setPresentationProgress(nextProgress);
      if (nextProgress < 1) progressFrame = requestAnimationFrame(updatePresentationProgress);
    };

    progressFrame = requestAnimationFrame(updatePresentationProgress);
    t.push(setTimeout(() => setPhase('logo-out'), 0));
    t.push(setTimeout(() => setPhase('verse'), LOGO_OUT_DUR));
    t.push(setTimeout(() => setPhase('verse-out'), LOGO_OUT_DUR + VERSE_IN_DUR + VERSE_HOLD));
    t.push(setTimeout(() => setPhase('polaroids'), LOGO_OUT_DUR + VERSE_IN_DUR + VERSE_HOLD + VERSE_OUT_DUR));
    POL_TIMES.forEach((time, i) =>
      t.push(setTimeout(() => setVisible(i + 1), time))
    );
    t.push(setTimeout(() => setPhase('pols-out'), POLS_OUT_START));
    t.push(setTimeout(() => setPhase('blessing'), BLESSING_START));
    t.push(setTimeout(() => setPhase('blessing-out'), BLESSING_START + BLESSING_HOLD));
    t.push(setTimeout(() => setPhase('ready'), READY_START));
    t.push(setTimeout(() => setPhase('ready-out'), READY_START + READY_HOLD));
    t.push(setTimeout(() => setPhase('exit'),     SCREEN_EXIT));
    return () => {
      t.forEach(clearTimeout);
      cancelAnimationFrame(progressFrame);
    };
  }, [assetsReady, isIntro, minLogoDone]);

  const logoVisible     = phase === 'logo' || phase === 'logo-out' || !isIntro;
  const logoFadingOut   = phase === 'logo-out';
  const verseVisible    = phase === 'verse' || phase === 'verse-out';
  const verseFadingOut  = phase === 'verse-out';
  const polsFading      = phase === 'pols-out';
  const showPols        = phase === 'polaroids' || phase === 'pols-out';
  const blessingVisible = phase === 'blessing' || phase === 'blessing-out';
  const blessingFading  = phase === 'blessing-out';
  const readyVisible    = phase === 'ready' || phase === 'ready-out';
  const readyFadingOut  = phase === 'ready-out';
  const safeProgress    = Math.max(0.06, Math.min(progress, 1));
  const progressPercent = phase === 'ready' || phase === 'ready-out' || phase === 'exit'
    ? 100
    : Math.round(presentationProgress * 100);
  const presentationLabel = phase === 'verse' || phase === 'verse-out'
    ? 'Nossa história'
    : phase === 'polaroids' || phase === 'pols-out'
      ? 'Nossas memórias'
      : phase === 'blessing' || phase === 'blessing-out'
        ? 'Com nossas famílias'
        : phase === 'ready' || phase === 'ready-out' || phase === 'exit'
          ? 'Você está convidado'
          : 'Abrindo o convite';

  return (
    <div
      className={`ld-screen notranslate${phase === 'exit' ? ' ld-screen--exit' : ''}`}
      lang="pt-BR"
      translate="no"
      style={phase === 'exit' ? { animationDuration: `${EXIT_DUR}ms` } : undefined}
      onAnimationEnd={(event) => {
        if (event.target === event.currentTarget && phase === 'exit' && onDone) onDone();
      }}
    >
      {logoVisible && (
        <div
          className={`ld-logo-wrap${logoFadingOut ? ' ld-logo-wrap--out' : ''}`}
          style={logoFadingOut ? { animationDuration: `${LOGO_OUT_DUR}ms` } : undefined}
        >
          <img src={logo} alt="J & L" className="ld-logo-img" />
          <div className="ld-load-track" aria-hidden="true">
            <div
              className={`ld-load-fill${!isIntro ? ' ld-load-fill--indeterminate' : ''}`}
              style={isIntro ? { width: `${safeProgress * 100}%` } : undefined}
            />
          </div>
          <p className="ld-load-caption">
            {isIntro && assetsReady ? 'Preparando a entrada' : 'Carregando o convite'}
          </p>
        </div>
      )}

      {verseVisible && (
        <div
          className={`ld-verse-wrap${verseFadingOut ? ' ld-verse-wrap--out' : ''}`}
          style={verseFadingOut ? { animationDuration: `${VERSE_OUT_DUR}ms` } : undefined}
        >
          <p className="ld-verse">
            {VERSE_TEXT.split(' ').reduce((acc, word, wi) => {
              const prevChars = acc.charCount;
              const wordSpan = (
                <span key={wi} style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
                  {word.split('').map((char, ci) => (
                    <span
                      key={ci}
                      className="ld-verse-letter"
                      style={{ '--i': prevChars + ci }}
                    >
                      {char}
                    </span>
                  ))}
                </span>
              );
              const space = wi < VERSE_TEXT.split(' ').length - 1
                ? <span key={`sp-${wi}`} className="ld-verse-letter" style={{ '--i': prevChars + word.length }}>{' '}</span>
                : null;
              return {
                charCount: prevChars + word.length + (space ? 1 : 0),
                nodes: [...acc.nodes, wordSpan, space],
              };
            }, { charCount: 0, nodes: [] }).nodes}
          </p>
        </div>
      )}

      {showPols && (
        <div
          className={`ld-stack${polsFading ? ' ld-stack--out' : ''}`}
          style={polsFading ? { animationDuration: `${POLS_OUT_DUR}ms` } : undefined}
        >
          {POLAROIDS.map((p, i) => (
            <div
              key={i}
              className={`ld-pol${i < visibleCount ? ' ld-pol--on' : ''}`}
              style={{ '--rotate': p.rotate, zIndex: i + 1 }}
            >
              <img src={p.src} alt="" />
            </div>
          ))}
        </div>
      )}

      {blessingVisible && (
        <div
          className={`ld-blessing-wrap${blessingFading ? ' ld-blessing-wrap--out' : ''}`}
          style={blessingFading ? { animationDuration: `${BLESSING_OUT_DUR}ms` } : undefined}
        >
          <p className="ld-blessing-title">
            Com a bênção de Deus
            <br />
            e de seus pais
          </p>
          <div className="ld-blessing-card">
            <div className="ld-blessing-col">
              <span>Joacir Pereira</span>
              <span>Iraildes Pereira</span>
            </div>
            <div className="ld-blessing-divider" />
            <div className="ld-blessing-col ld-blessing-col--left">
              <span>Eduardo Lopes de Oliveira</span>
              <span>Jeane da Silva</span>
            </div>
          </div>
        </div>
      )}

      {readyVisible && (
        <div
          className={`ld-ready-wrap${readyFadingOut ? ' ld-ready-wrap--out' : ''}`}
          style={readyFadingOut ? { animationDuration: `${READY_OUT_DUR}ms` } : undefined}
          role="status"
          aria-live="polite"
        >
          <span className="ld-ready-ornament" aria-hidden="true">✦</span>
          <p className="ld-ready-title">Você está convidado</p>
          <p className="ld-ready-copy">para celebrar esse momento conosco.</p>
        </div>
      )}

      {isIntro && phase !== 'logo' && phase !== 'exit' && (
        <div className={`ld-pres-progress${readyVisible ? ' ld-pres-progress--complete' : ''}${readyFadingOut ? ' ld-pres-progress--out' : ''}`}>
          <div className="ld-pres-meta">
            <span key={presentationLabel} className="ld-pres-label">{presentationLabel}</span>
            <span className="ld-pres-value" aria-hidden="true">{progressPercent}%</span>
          </div>
          <div
            className="ld-pres-bar"
            role="progressbar"
            aria-label="Progresso da apresentação"
            aria-valuemin="0"
            aria-valuemax="100"
            aria-valuenow={progressPercent}
          >
            <div
              className="ld-pres-fill"
              style={{ transform: `scaleX(${progressPercent / 100})` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Loading;
