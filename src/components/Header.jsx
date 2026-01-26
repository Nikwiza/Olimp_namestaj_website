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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'frosted-glass shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 lg:h-24">
          {/* Logo with Badge */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => scrollToSection('hero')}
              className="logo-container flex flex-col items-center gap-0 focus:outline-none group"
              aria-label="Olimp logo - povratak na početnu"
            >
              <img
                src={logoTop}
                alt=""
                className="logo-part logo-decorative w-16 lg:w-20"
              />
              <img
                src={logoLetters}
                alt="Olimp"
                className="logo-part logo-letters w-16 lg:w-20"
              />
              <img
                src={logoBottom}
                alt=""
                className="logo-part logo-decorative w-16 lg:w-20"
              />
            </button>
            <div className="hidden lg:block text-[var(--color-text-secondary)] text-xs font-medium border-l border-[var(--color-text-secondary)]/30 pl-3">
              <div className="text-[var(--color-accent)] font-semibold">Od 1996.</div>
              <div className="whitespace-nowrap">28+ godina</div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-12" aria-label="Glavna navigacija">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="nav-link text-[var(--color-text-primary)] hover:text-[var(--color-accent)] font-medium text-base lg:text-lg"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden flex flex-col gap-1.5 w-8 h-8 justify-center items-center focus:outline-none"
            aria-label="Meni"
            aria-expanded={isMobileMenuOpen}
          >
            <span
              className={`w-6 h-0.5 bg-[var(--color-text-primary)] transition-transform duration-300 ${
                isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            ></span>
            <span
              className={`w-6 h-0.5 bg-[var(--color-text-primary)] transition-opacity duration-300 ${
                isMobileMenuOpen ? 'opacity-0' : ''
              }`}
            ></span>
            <span
              className={`w-6 h-0.5 bg-[var(--color-text-primary)] transition-transform duration-300 ${
                isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            ></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
        aria-hidden={!isMobileMenuOpen}
      >
        <nav className="frosted-glass border-t border-[var(--color-text-secondary)]/20 px-6 py-6 flex flex-col gap-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              tabIndex={isMobileMenuOpen ? 0 : -1}
              className="text-[var(--color-text-primary)] hover:text-[var(--color-accent)] font-medium text-lg text-left transition-colors"
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
