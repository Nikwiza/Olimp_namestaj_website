import logoLettersWhite from '../assets/images/letters-logo-w.svg';

function Footer() {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { label: 'Početna', id: 'hero' },
    { label: 'O nama', id: 'about' },
    { label: 'Galerija', id: 'gallery' },
    { label: 'Utisci', id: 'testimonials' },
    { label: 'Kontakt', id: 'contact' },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-[var(--color-wood-dark)] to-[var(--color-text-primary)] text-white py-20 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[var(--color-accent)] rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[var(--color-accent)] rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-16">
          {/* Logo & Tagline */}
          <div>
            <img
              src={logoLettersWhite}
              alt="Olimp"
              className="w-36 mb-6 hover:scale-105 transition-transform duration-300"
            />
            <p className="text-white/80 leading-relaxed text-lg mb-6 font-light">
              Stolarska majstorija sa tradicijom od 1996. godine.
              Kvalitet koji traje generacijama.
            </p>
            <div className="space-y-2">
              <p className="text-[var(--color-accent-light)] font-bold text-xl">
                Od 1996.
              </p>
              <p className="text-white/80 text-lg">
                28+ godina iskustva
              </p>
            </div>
          </div>

          {/* Quick Links - NITPICK FIX: Professional tone */}
          <div>
            <h3 className="text-2xl font-bold mb-6 font-serif">Navigacija</h3>
            <nav className="space-y-4">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="group flex items-center gap-2 text-white/80 hover:text-[var(--color-accent-light)] transition-all duration-300 text-left text-lg"
                >
                  <span className="w-0 h-px bg-[var(--color-accent-light)] group-hover:w-6 transition-all duration-300"></span>
                  {link.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-2xl font-bold mb-6 font-serif">Kontakt</h3>
            <div className="space-y-5 text-white/80">
              <div className="group">
                <p className="text-xs text-white/60 mb-2 uppercase tracking-wider">Telefon</p>
                <a href="tel:+381111234567" className="hover:text-[var(--color-accent-light)] transition-colors text-lg font-medium flex items-center gap-2">
                  <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  +381 11 123 4567
                </a>
              </div>
              <div className="group">
                <p className="text-xs text-white/60 mb-2 uppercase tracking-wider">Email</p>
                <a href="mailto:info@olimp.rs" className="hover:text-[var(--color-accent-light)] transition-colors text-lg font-medium flex items-center gap-2">
                  <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  info@olimp.rs
                </a>
              </div>
              <div>
                <p className="text-xs text-white/60 mb-2 uppercase tracking-wider">Adresa</p>
                <p className="text-lg flex items-center gap-2">
                  <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Beograd, Srbija
                </p>
              </div>
              <div>
                <p className="text-xs text-white/60 mb-2 uppercase tracking-wider">Radno vreme</p>
                <p className="text-lg flex items-center gap-2">
                  <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Pon-Pet: 08:00-17:00
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t-2 border-white/10 pt-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-white/60 text-base">
              &copy; {currentYear} Olimp. Sva prava zadržana.
            </p>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-[var(--color-accent-light)]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
              <p className="text-white/60 text-base">
                Izrađeno s ljubavlju za srpsku tradiciju stolarije
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
