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
    <footer className="bg-[var(--color-text-primary)] text-white py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Logo & Tagline */}
          <div>
            <img
              src={logoLettersWhite}
              alt="Olimp"
              className="w-32 mb-4"
            />
            <p className="text-white/80 leading-relaxed">
              Stolarska majstorija sa tradicijom od 1996. godine.
              Kvalitet koji traje generacijama.
            </p>
            <div className="mt-4">
              <p className="text-[var(--color-accent)] font-semibold text-lg">
                Od 1996.
              </p>
              <p className="text-white/80">
                28+ godina iskustva
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Brze veze</h3>
            <nav className="space-y-3">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="block text-white/80 hover:text-[var(--color-accent)] transition-colors text-left"
                >
                  {link.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Kontakt</h3>
            <div className="space-y-3 text-white/80">
              <div>
                <p className="text-xs text-white/60 mb-1">Telefon</p>
                <a href="tel:+381111234567" className="hover:text-[var(--color-accent)] transition-colors">
                  +381 11 123 4567
                </a>
              </div>
              <div>
                <p className="text-xs text-white/60 mb-1">Email</p>
                <a href="mailto:info@olimp.rs" className="hover:text-[var(--color-accent)] transition-colors">
                  info@olimp.rs
                </a>
              </div>
              <div>
                <p className="text-xs text-white/60 mb-1">Adresa</p>
                <p>Beograd, Srbija</p>
              </div>
              <div>
                <p className="text-xs text-white/60 mb-1">Radno vreme</p>
                <p>Pon-Pet: 08:00-17:00</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/60 text-sm">
              &copy; {currentYear} Olimp. Sva prava zadržana.
            </p>
            <p className="text-white/60 text-sm">
              Izrađeno s ljubavlju za srpsku tradiciju stolarije
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
