import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Collection', path: '/shop' }, // shop
    { label: 'Signatures', path: '/fragrance' }, // fragrance
    { label: 'Scent Finder', path: '/scent-finder' },
    { label: 'Mixology', path: '/mixology' },
    { label: 'House', path: '/about' }, // about
    { label: 'Connect', path: '/contact' }, // contact
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/20 backdrop-blur-2xl border-b border-white/30 shadow-[0_20px_40px_rgba(15,23,42,0.12)]'
          : 'bg-white/10 backdrop-blur-2xl border-b border-white/20'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="cursor-pointer flex items-center">
            <motion.img
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              src="/logo.avif"
              alt="CEEJE"
              className="h-8 w-auto sm:h-9 drop-shadow-sm"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item, index) => (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
              >
                <Link
                  to={item.path}
                  className={`relative text-sm font-light tracking-[0.18em] uppercase transition-colors duration-300 group ${
                    location.pathname === item.path
                      ? 'text-neutral-950'
                      : 'text-neutral-700 hover:text-neutral-950'
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute bottom-0 left-0 h-[1px] bg-neutral-900 transition-all duration-300 ${
                      location.pathname === item.path
                        ? 'w-full'
                        : 'w-0 group-hover:w-full'
                    }`}
                  />
                </Link>
              </motion.div>
            ))}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2.5 border border-neutral-900/20 bg-neutral-900 text-white text-sm font-light tracking-wider rounded-full shadow-sm hover:bg-neutral-950 hover:border-neutral-900 transition-all duration-300"
            >
              Try now
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden text-neutral-900"
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M3 12h18M3 6h18M3 18h18" />
              )}
            </svg>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={{
            height: isMenuOpen ? 'auto' : 0,
            opacity: isMenuOpen ? 1 : 0,
          }}
          className="md:hidden overflow-hidden mt-4"
        >
          <div className="flex flex-col gap-4 pb-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="text-neutral-800 hover:text-neutral-950 text-sm font-light tracking-[0.18em] uppercase transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <button className="px-6 py-2.5 border border-neutral-900/20 bg-neutral-900 text-white text-sm font-light tracking-wider rounded-full w-fit shadow-sm">
              Try now
            </button>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Navbar;


