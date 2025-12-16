import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import './App.css';

gsap.registerPlugin(ScrollTrigger);
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import FragrancePage from './pages/FragrancePage';
import ScentFinderPage from './pages/ScentFinderPage';
import MixologyPage from './pages/MixologyPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    // Make Lenis available globally for GSAP ScrollTrigger
    window.lenis = lenis;

    // Integrate Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Use requestAnimationFrame for smooth scrolling
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Update ScrollTrigger when Lenis scrolls
    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        if (arguments.length) {
          lenis.scrollTo(value, { immediate: true });
        }
        return lenis.scroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
    });

    return () => {
      lenis.destroy();
      delete window.lenis;
      ScrollTrigger.scrollerProxy(document.body);
    };
  }, []);

  return (
    <div className="App bg-white text-neutral-900">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<HomePage />} />
        <Route path="/fragrance" element={<HomePage />} />
        <Route path="/scent-finder" element={<HomePage />} />
        <Route path="/mixology" element={<HomePage />} />
        <Route path="/about" element={<HomePage />} />
        <Route path="/contact" element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default App;

