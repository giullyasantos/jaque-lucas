import React, { useEffect, useState } from 'react';
import '../App.css';

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
const BAR_DURATION   = 3200;
const VERSE_HOLD     = 500;
const VERSE_OUT_START = BAR_DURATION + VERSE_HOLD;   // 3700
const VERSE_OUT_DUR   = 900;
const VERSE_GONE      = VERSE_OUT_START + VERSE_OUT_DUR; // 4600

const FIRST_POL      = VERSE_GONE + 500;           // 5100
// p1 and p2 get 1600ms each, p4 and ring get 1000ms
const POL_GAPS       = [1600, 1600, 1000];        // gap after card 0, 1, 2
const POL_TIMES      = POLAROIDS.reduce((acc, _, i) => {
  if (i === 0) return [FIRST_POL];
  return [...acc, acc[i - 1] + POL_GAPS[i - 1]];
}, []);
const LAST_POL       = POL_TIMES[POLAROIDS.length - 1];

const POLS_OUT_START = LAST_POL + 1400;
const POLS_OUT_DUR   = 1200;
const BG_HOLD        = 800;
const SCREEN_EXIT    = POLS_OUT_START + POLS_OUT_DUR + BG_HOLD;
const EXIT_DUR       = 1400;
// ─────────────────────────────────────────────────────────────

const Loading = ({ onDone }) => {
  const [phase, setPhase]          = useState('verse');
  const [visibleCount, setVisible] = useState(0);

  useEffect(() => {
    const t = [];
    t.push(setTimeout(() => setPhase('verse-out'),  VERSE_OUT_START));
    t.push(setTimeout(() => setPhase('polaroids'), VERSE_GONE));
    POL_TIMES.forEach((time, i) =>
      t.push(setTimeout(() => setVisible(i + 1), time))
    );
    t.push(setTimeout(() => setPhase('pols-out'), POLS_OUT_START));
    t.push(setTimeout(() => setPhase('exit'),     SCREEN_EXIT));
    return () => t.forEach(clearTimeout);
  }, []);

  const verseVisible   = phase === 'verse' || phase === 'verse-out';
  const verseFadingOut = phase === 'verse-out';
  const polsFading    = phase === 'pols-out';
  const showPols      = phase === 'polaroids' || phase === 'pols-out';

  return (
    <div
      className={`ld-screen${phase === 'exit' ? ' ld-screen--exit' : ''}`}
      style={phase === 'exit' ? { animationDuration: `${EXIT_DUR}ms` } : undefined}
      onAnimationEnd={() => { if (phase === 'exit' && onDone) onDone(); }}
    >
      {verseVisible && (
        <div
          className={`ld-verse-wrap${verseFadingOut ? ' ld-verse-wrap--out' : ''}`}
          style={verseFadingOut ? { animationDuration: `${VERSE_OUT_DUR}ms` } : undefined}
        >
          <p className="ld-verse">
            Deus uniu nossos caminhos e nós dois sabemos que uniremos nossa vida para sempre.
          </p>
          <div className="ld-bar-track">
            <div className="ld-bar-fill" style={{ animationDuration: `${BAR_DURATION}ms` }} />
          </div>
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
    </div>
  );
};

export default Loading;
