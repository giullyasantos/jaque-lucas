import React, { useState, useEffect, useRef } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

// -- Pages --
import Home from './pages/home';
import Gifts from './pages/gifts';
import OurStory from './pages/ourstory';
import RSVP from './pages/rsvp';

// -- Components --
import NavBar from './components/navbar';
import Footer from './components/footer';
import { LanguageProvider } from './components/languageContext';
import Loading from './components/loader';

// -- Media --
import coupleDesktop from './media/HomeDesktop.png';
import coupleMobile from './media/HomeDesktop.png';
import giftsDesktop from './media/giftsDesktop.webp';
import giftsMobile from './media/giftsMobile.webp';

const designAssetContext = require.context('./media/content/design-assets', false, /\.(png|jpe?g|webp)$/);
const photoContext = require.context('./media/content/photos', true, /\.(png|jpe?g|webp)$/);

const siteImages = [
  coupleDesktop,
  coupleMobile,
  giftsDesktop,
  giftsMobile,
  ...designAssetContext.keys().map(designAssetContext),
  ...photoContext.keys().map(photoContext),
];

// Helper function for preloading images
const preloadImages = (images) => {
  const promises = Array.from(new Set(images)).map(
    (src) =>
      new Promise((resolve) => {
        const img = new Image();
        img.decoding = 'async';
        img.loading = 'eager';
        img.onload = () => {
          if (!img.decode) {
            resolve();
            return;
          }

          img.decode().catch(() => undefined).finally(resolve);
        };
        img.onerror = resolve;
        img.src = src;
      })
  );
  return Promise.all(promises);
};

// -- ScrollToTop Component --
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page on route change
  }, [pathname]);

  return null;
}

// -- BackgroundManager Component --
function BackgroundManager() {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);

  const getBackgroundForRoute = (path, mobile) => {
    if (path === '/rsvp') return mobile ? coupleMobile : coupleDesktop;
    if (path === '/gifts') return mobile ? giftsMobile : giftsDesktop;
    return mobile ? coupleMobile : coupleDesktop;
  };

  const getRouteClass = (path) => (
    path === '/' ? 'home' : path.slice(1) || 'home'
  );

  const [activeBg, setActiveBg] = useState(() => ({
    src: getBackgroundForRoute(location.pathname, window.innerWidth <= 768),
    routeClass: getRouteClass(location.pathname),
  }));
  const [previousBg, setPreviousBg] = useState(null);
  const transitionTimer = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      const nextIsMobile = window.innerWidth <= 768;
      setIsMobile((current) => (current === nextIsMobile ? current : nextIsMobile));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const nextBg = {
      src: getBackgroundForRoute(location.pathname, isMobile),
      routeClass: getRouteClass(location.pathname),
    };

    if (activeBg.src === nextBg.src && activeBg.routeClass === nextBg.routeClass) {
      return;
    }

    let cancelled = false;

    preloadImages([nextBg.src]).then(() => {
      if (cancelled) return;

      setPreviousBg(activeBg);
      setActiveBg(nextBg);
      window.clearTimeout(transitionTimer.current);
      transitionTimer.current = window.setTimeout(() => {
        setPreviousBg(null);
      }, 700);
    });

    return () => {
      cancelled = true;
    };
  }, [activeBg, isMobile, location.pathname]);

  useEffect(() => () => window.clearTimeout(transitionTimer.current), []);

  return (
    <div className="background-stack" aria-hidden="true">
      <div
        className={`background-container background-container--${activeBg.routeClass} background-container--current`}
        style={{ backgroundImage: activeBg.src ? `url(${activeBg.src})` : 'none' }}
      />
      {previousBg && (
        <div
          className={`background-container background-container--${previousBg.routeClass} background-container--previous`}
          style={{ backgroundImage: previousBg.src ? `url(${previousBg.src})` : 'none' }}
        />
      )}
    </div>
  );
}

// -- Main Component --
function Main({ introReady = true }) {
  const location = useLocation();

  return (
    <>
      <BackgroundManager />
      <div className={`app-shell${introReady ? ' app-shell--ready' : ' app-shell--waiting'}`}>
        <NavBar />
        <TransitionGroup>
          <CSSTransition key={location.pathname} timeout={500} classNames="fade" unmountOnExit>
            <Routes>
              <Route path="/" element={<Home introReady={introReady} />} />
              <Route path="/gifts" element={<Gifts />} />
              <Route path="/ourstory" element={<OurStory />} />
              <Route path="/rsvp" element={<RSVP />} />
            </Routes>
          </CSSTransition>
        </TransitionGroup>
        <Footer />
      </div>
    </>
  );
}

function AppContent() {
  const location = useLocation();
  const isGiftsPage = location.pathname === '/gifts';
  const [loaderAnimationDone, setLoaderAnimationDone] = useState(() => isGiftsPage);
  const [assetsReady, setAssetsReady] = useState(() => isGiftsPage);
  const showLoader = !isGiftsPage && (!loaderAnimationDone || !assetsReady);

  useEffect(() => {
    if (isGiftsPage) {
      setAssetsReady(true);
      return;
    }

    let cancelled = false;
    setAssetsReady(false);
    preloadImages(siteImages).then(() => {
      if (!cancelled) setAssetsReady(true);
    });

    return () => {
      cancelled = true;
    };
  }, [isGiftsPage]);

  useEffect(() => {
    if (loaderAnimationDone || isGiftsPage) return undefined;

    const fallback = setTimeout(() => setLoaderAnimationDone(true), 14500);
    return () => clearTimeout(fallback);
  }, [isGiftsPage, loaderAnimationDone]);

  return (
    <>
      <ScrollToTop />
      {/* Main is always mounted so the background is already painted when loader dissolves */}
      <LanguageProvider>
        <Main introReady={!showLoader || isGiftsPage} />
      </LanguageProvider>
      {!isGiftsPage && showLoader && <Loading onDone={() => setLoaderAnimationDone(true)} />}
    </>
  );
}

// -- App Component --
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
