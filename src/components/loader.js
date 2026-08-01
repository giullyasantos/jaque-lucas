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
const VERSE_HOLD     = 900;
const VERSE_OUT_DUR  = 900;
const FIRST_POL      = LOGO_OUT_DUR + VERSE_IN_DUR + VERSE_HOLD + VERSE_OUT_DUR + 500;
// p1 and p2 get 1600ms each, p4 and ring get 1000ms
const POL_GAPS       = [1600, 1600, 1000];        // gap after card 0, 1, 2
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
const SCREEN_EXIT    = BLESSING_START + BLESSING_HOLD + BLESSING_OUT_DUR + 500;
const EXIT_DUR       = 1400;
// ─────────────────────────────────────────────────────────────

const VERSE_TEXT = 'Deus uniu nossos caminhos e nós dois sabemos que uniremos nossa vida para sempre.';

const Loading = ({ onDone, assetsReady = false, progress = 0, variant = 'route' }) => {
  const [phase, setPhase]          = useState('logo');
  const [visibleCount, setVisible] = useState(0);
  const [minLogoDone, setMinLogoDone] = useState(false);
  const isIntro = variant === 'intro';

  useEffect(() => {
    const timer = setTimeout(() => setMinLogoDone(true), MIN_LOGO_MS);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isIntro || !assetsReady || !minLogoDone) return undefined;

    const t = [];
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
    t.push(setTimeout(() => setPhase('exit'),     SCREEN_EXIT));
    return () => t.forEach(clearTimeout);
  }, [assetsReady, isIntro, minLogoDone]);

  const logoVisible     = phase === 'logo' || phase === 'logo-out' || !isIntro;
  const logoFadingOut   = phase === 'logo-out';
  const verseVisible    = phase === 'verse' || phase === 'verse-out';
  const verseFadingOut  = phase === 'verse-out';
  const polsFading      = phase === 'pols-out';
  const showPols        = phase === 'polaroids' || phase === 'pols-out';
  const blessingVisible = phase === 'blessing' || phase === 'blessing-out';
  const blessingFading  = phase === 'blessing-out';
  const safeProgress    = Math.max(0.06, Math.min(progress, 1));

  return (
    <div
      className={`ld-screen${phase === 'exit' ? ' ld-screen--exit' : ''}`}
      style={phase === 'exit' ? { animationDuration: `${EXIT_DUR}ms` } : undefined}
      onAnimationEnd={() => { if (phase === 'exit' && onDone) onDone(); }}
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
            {VERSE_TEXT.split('').map((char, index) => (
              <span
                key={`${char}-${index}`}
                className="ld-verse-letter"
                style={{ '--i': index }}
              >
                {char === ' ' ? '\u00a0' : char}
              </span>
            ))}
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
          <p className="ld-blessing-title">Com a bênção de Deus e de seus pais</p>
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
    </div>
  );
};

export default Loading;
