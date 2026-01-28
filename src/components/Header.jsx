import { useState, useEffect } from 'react';
import logoTop from '../assets/images/logo-top-det.svg';
import logoLetters from '../assets/images/letters-logo.svg';
import logoBottom from '../assets/images/logo-bot-detail.svg';

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Focus trap for mobile menu accessibility
  useEffect(() => {
    if (isMobileMenuOpen) {
      // Prevent scrolling when mobile menu is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const navItems = [
    { label: 'Početna', id: 'hero' },
    { label: 'O nama', id: 'about' },
    { label: 'Galerija', id: 'gallery' },
    { label: 'Utisci', id: 'testimonials' },
    { label: 'Kontakt', id: 'contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        isScrolled ? 'frosted-glass shadow-2xl' : 'lg:bg-transparent bg-[var(--color-background)]/90 backdrop-blur-md'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 lg:h-24">
          {/* Logo with Badge - IMPROVED */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => scrollToSection('hero')}
              className="logo-container flex flex-col items-center gap-0 focus:outline-none group transition-all duration-300 hover:scale-105"
              aria-label="Olimp logo - povratak na početnu"
            >
              <img
                src={logoTop}
                alt=""
                className="logo-part logo-decorative w-14 lg:w-20 transition-all duration-500"
              />
              <img
                src={logoLetters}
                alt="Olimp"
                className="logo-part logo-letters w-14 lg:w-20 transition-all duration-500"
              />
              <img
                src={logoBottom}
                alt=""
                className="logo-part logo-decorative w-14 lg:w-20 transition-all duration-500"
              />
            </button>
            <div className="hidden sm:flex flex-col text-[var(--color-text-secondary)] text-xs font-medium border-l-2 border-[var(--color-accent)]/40 pl-4">
              <div className="text-[var(--color-accent)] font-bold text-sm lg:text-base tracking-wider">Est. 1996</div>
              <div className="whitespace-nowrap font-semibold text-xs lg:text-sm">28+ godina</div>
            </div>
          </div>

          {/* Desktop Navigation - hidden on mobile, flex on md+ */}
          <nav
            className="hidden md:flex items-center gap-8 lg:gap-12"
            aria-label="Glavna navigacija"
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="nav-link px-6 py-3 text-[var(--color-text-primary)] hover:text-[var(--color-accent)] hover:bg-[var(--color-accent)]/5 font-semibold text-base lg:text-lg tracking-wide transition-all duration-300 rounded-sm hover:scale-105"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button - Animated Hamburger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden relative w-12 h-12 flex flex-col justify-center items-center"
            aria-label={isMobileMenuOpen ? "Zatvori meni" : "Otvori meni"}
            aria-expanded={isMobileMenuOpen}
          >
            <span
              className={`block h-0.5 w-6 bg-[var(--color-text-primary)] transition-all duration-300 ${
                isMobileMenuOpen ? 'rotate-45 translate-y-[4px]' : ''
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-[var(--color-text-primary)] transition-all duration-300 my-1.5 ${
                isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-[var(--color-text-primary)] transition-all duration-300 ${
                isMobileMenuOpen ? '-rotate-45 -translate-y-[4px]' : ''
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className="md:hidden transition-all duration-300 overflow-hidden"
        style={{
          maxHeight: isMobileMenuOpen ? '400px' : '0',
          opacity: isMobileMenuOpen ? 1 : 0
        }}
        aria-hidden={!isMobileMenuOpen}
      >
        <nav
          className="frosted-glass border-t border-[var(--color-text-secondary)]/20"
          style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}
        >
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              tabIndex={isMobileMenuOpen ? 0 : -1}
              className="px-6 py-3 hover:text-[var(--color-accent)] hover:bg-[var(--color-accent)]/5 transition-all duration-300 rounded-sm text-left font-medium text-lg"
              style={{
                color: '#1A1A1A',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                width: '100%'
              }}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}

export default Header;
