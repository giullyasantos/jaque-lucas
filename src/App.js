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
import flowerTopLg      from './media/content/design-assets/flower-top-lg.png';
import flowerTopMd      from './media/content/design-assets/flower-top-md.png';
import flowerTopSm      from './media/content/design-assets/flower-top-sm.png';
import flowerTopLgFlip  from './media/content/design-assets/flower-top-lg-flip.png';
import flowerTopMdFlip  from './media/content/design-assets/flower-top-md-flip.png';
import flowerTopSmFlip  from './media/content/design-assets/flower-top-sm-flip.png';
import flowerBotLg      from './media/content/design-assets/flower-bottom-lg.png';
import flowerBotMd      from './media/content/design-assets/flower-bottom-md.png';
import flowerBotSm      from './media/content/design-assets/flower-bottom-sm.png';
import flowerBotLgFlip  from './media/content/design-assets/flower-bottom-lg-flip.png';
import flowerBotMdFlip  from './media/content/design-assets/flower-bottom-md-flip.png';
import flowerBotSmFlip  from './media/content/design-assets/flower-bottom-sm-flip.png';
import coupleDesktop from './media/HomeDesktop.png';
import coupleMobile from './media/HomeDesktop.png';
import giftsDesktop from './media/giftsDesktop.webp';
import giftsMobile from './media/giftsMobile.webp';

// Helper function for preloading images
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
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const getBackgroundForRoute = (path, mobile) => {
    if (path === '/rsvp') return mobile ? coupleMobile : coupleDesktop;
    if (path === '/gifts') return giftsMobile;
    return mobile ? coupleMobile : coupleDesktop;
  };

  const [currentBg, setCurrentBg] = useState(
    () => getBackgroundForRoute(location.pathname, window.innerWidth <= 768)
  );
  const [fadeClass, setFadeClass] = useState('fade-in');
  const isFirst = useRef(true);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Skip the fade cycle on first mount — background is already correct
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    setFadeClass('fade-out');
    const timer = setTimeout(() => {
      setCurrentBg(getBackgroundForRoute(location.pathname, isMobile));
      setFadeClass('fade-in');
    }, 300);
    return () => clearTimeout(timer);
  }, [location.pathname, isMobile]);

  return (
    <div
      className={`background-container ${fadeClass}`}
      style={{ backgroundImage: currentBg ? `url(${currentBg})` : 'none' }}
    />
  );
}

// -- Flower borders — fixed, always on top, never on loading screen --
function FlowerBorders() {
  return (
    <>
      <div className="flower-border flower-border--top" style={{
        backgroundImage: [
          `url(${flowerTopLg})`,
          `url(${flowerTopMdFlip})`,
          `url(${flowerTopLgFlip})`,
          `url(${flowerTopMd})`,
        ].join(', '),
      }} />
      <div className="flower-border flower-border--bottom" style={{
        backgroundImage: [
          `url(${flowerBotLg})`,
          `url(${flowerBotMdFlip})`,
          `url(${flowerBotLgFlip})`,
          `url(${flowerBotMd})`,
        ].join(', '),
      }} />
    </>
  );
}

// -- Main Component --
function Main() {
  const location = useLocation();

  return (
    <>
      <BackgroundManager />
      <FlowerBorders />
      <NavBar />
      <TransitionGroup>
        <CSSTransition key={location.pathname} timeout={500} classNames="fade" unmountOnExit>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gifts" element={<Gifts />} />
            <Route path="/ourstory" element={<OurStory />} />
            <Route path="/rsvp" element={<RSVP />} />
          </Routes>
        </CSSTransition>
      </TransitionGroup>
      <Footer />
    </>
  );
}

// -- App Component --
function App() {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    // Warm up images in the background — loader sequence gives ample time
    preloadImages([coupleDesktop, coupleMobile, giftsDesktop, giftsMobile]);
  }, []);

  return (
    <Router>
      <ScrollToTop />
      {/* Main is always mounted so the background is already painted when loader dissolves */}
      <LanguageProvider>
        <Main />
      </LanguageProvider>
      {showLoader && <Loading onDone={() => setShowLoader(false)} />}
    </Router>
  );
}

export default App;
