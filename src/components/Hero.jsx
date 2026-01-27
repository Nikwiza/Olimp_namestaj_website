import { useEffect, useState } from 'react';
import heroImage from '../assets/images/Gallery/Kitchens/image.png';

function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    // Trigger entrance animations
    setIsLoaded(true);

    // Parallax scroll effect
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Desktop Layout - Split Screen with Parallax */}
      <div className="hidden lg:grid lg:grid-cols-2 w-full min-h-screen">
        {/* Left: Content */}
        <div className="flex items-center justify-center px-12 xl:px-20 2xl:px-32 bg-gradient-to-br from-[var(--color-background)] to-[var(--color-surface)] relative z-10">
          <div className="max-w-xl">
            {/* Heritage Badge - MORE PROMINENT */}
            <div
              className={`inline-flex items-center gap-3 mb-16 transition-all duration-1000 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="relative flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200/40 rounded-full shadow-md hover:shadow-xl transition-shadow">
                <div className="w-3 h-3 rounded-full bg-amber-600 animate-pulse"></div>
                <span className="text-amber-900 text-lg font-bold tracking-wider uppercase">
                  Od 1996. godine
                </span>
              </div>
            </div>

            {/* Main Headline - DRAMATICALLY LARGER */}
            <h1
              className={`text-6xl xl:text-8xl 2xl:text-9xl font-bold text-[var(--color-text-primary)] mb-10 leading-[1.05] tracking-tight transition-all duration-1000 delay-150 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
            >
              Stolarska tradicija
              <br />
              <span className="text-[var(--color-accent)] relative inline-block">
                koja gradi domove
                <svg className="absolute -bottom-3 left-0 w-full h-4 text-[var(--color-accent)] opacity-20" preserveAspectRatio="none" viewBox="0 0 100 10">
                  <path d="M0 8 Q 50 0, 100 8" stroke="currentColor" fill="none" strokeWidth="2"/>
                </svg>
              </span>
            </h1>

            {/* Subheadline */}
            <p
              className={`text-2xl xl:text-3xl text-[var(--color-text-secondary)] mb-16 leading-relaxed max-w-lg font-light transition-all duration-1000 delay-300 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
            >
              Više od 28 godina stvaramo namještaj koji postaje dio porodičnih priča.
            </p>

            {/* CTAs - Enhanced Buttons */}
            <div
              className={`flex flex-wrap gap-6 mb-24 transition-all duration-1000 delay-450 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
            >
              <button
                onClick={() => scrollToSection('gallery')}
                className="group relative px-12 py-5 bg-[var(--color-accent)] text-white font-semibold text-lg rounded-sm overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 active:scale-[0.98]"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-[var(--color-accent-hover)] to-[var(--color-accent)] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
                <span className="relative flex items-center gap-3">
                  Pogledaj radove
                  <svg className="w-5 h-5 transition-transform group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="px-12 py-5 border-2 border-[var(--color-text-primary)] text-[var(--color-text-primary)] font-semibold text-lg rounded-sm hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] hover:bg-[var(--color-accent)]/5 transition-all duration-400 active:scale-[0.98]"
              >
                Kontaktiraj nas
              </button>
            </div>

            {/* Mini Stats - More Visual */}
            <div
              className={`flex gap-20 pt-12 border-t-2 border-[var(--color-text-secondary)]/15 transition-all duration-1000 delay-600 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
            >
              <div className="group">
                <div className="text-5xl font-bold text-[var(--color-accent)] mb-2 transition-transform group-hover:scale-110">28+</div>
                <div className="text-sm text-[var(--color-text-secondary)] tracking-wide uppercase font-medium">godina iskustva</div>
              </div>
              <div className="group">
                <div className="text-5xl font-bold text-[var(--color-accent)] mb-2 transition-transform group-hover:scale-110">500+</div>
                <div className="text-sm text-[var(--color-text-secondary)] tracking-wide uppercase font-medium">zadovoljnih klijenata</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Image with Parallax */}
        <div className="relative overflow-hidden">
          <div
            className={`absolute inset-0 transition-all duration-1200 ${
              isLoaded ? 'scale-100 opacity-100' : 'scale-110 opacity-0'
            }`}
            style={{
              transform: `translateY(${scrollY * 0.3}px)`,
            }}
          >
            <img
              src={heroImage}
              alt="Olimp stolarska radnja - custom kuhinja"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Elegant gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-background)]/20 via-transparent to-transparent"></div>

          {/* Scroll Indicator - Animated */}
          <div
            className={`absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-white/90 transition-opacity duration-1000 delay-1000 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <span className="text-xs uppercase tracking-widest font-semibold">Skroluj</span>
            <div className="w-px h-16 bg-gradient-to-b from-white/80 to-transparent animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Mobile Layout - Enhanced */}
      <div className="lg:hidden w-full min-h-screen relative">
        {/* Background Image with Parallax */}
        <div className="absolute inset-0">
          <div
            style={{
              transform: `translateY(${scrollY * 0.5}px)`,
            }}
            className="w-full h-full"
          >
            <img
              src={heroImage}
              alt="Olimp stolarska radnja"
              className="w-full h-full object-cover scale-110"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-stone-950/75 via-stone-900/65 to-stone-950/85"></div>
        </div>

        {/* Content - Enhanced Mobile with MORE SPACE */}
        <div className="relative z-10 flex items-center justify-center min-h-screen px-8 py-40">
          <div className="max-w-xl text-center">
            {/* Heritage Badge - LARGER */}
            <div
              className={`inline-flex items-center gap-3 px-6 py-4 mb-14 bg-white/10 backdrop-blur-md border border-white/20 rounded-full transition-all duration-1000 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="w-3 h-3 rounded-full bg-amber-400 animate-pulse"></div>
              <span className="text-amber-100 text-base font-bold tracking-wider uppercase">
                Od 1996. godine
              </span>
            </div>

            {/* Headline - LARGER */}
            <h1
              className={`text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-12 leading-[1.08] tracking-tight transition-all duration-1000 delay-150 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
            >
              Stolarska tradicija
              <br />
              <span className="text-amber-300">koja gradi domove</span>
            </h1>

            {/* Subheadline - LARGER */}
            <p
              className={`text-xl sm:text-2xl text-white/90 mb-16 leading-relaxed font-light transition-all duration-1000 delay-300 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
            >
              Više od 28 godina stvaramo namještaj koji postaje dio porodičnih priča.
            </p>

            {/* CTAs */}
            <div
              className={`flex flex-col sm:flex-row gap-5 justify-center mb-16 transition-all duration-1000 delay-450 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
            >
              <button
                onClick={() => scrollToSection('gallery')}
                className="px-12 py-5 bg-[var(--color-accent)] text-white font-semibold text-lg rounded-sm hover:bg-[var(--color-accent-hover)] transition-all active:scale-[0.98] shadow-xl hover:shadow-2xl"
              >
                Pogledaj radove
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="px-12 py-5 border-2 border-white/50 text-white font-semibold text-lg rounded-sm hover:bg-white/15 backdrop-blur-sm transition-all active:scale-[0.98]"
              >
                Kontaktiraj nas
              </button>
            </div>

            {/* Scroll Indicator */}
            <div
              className={`flex flex-col items-center gap-2 text-white/70 transition-all duration-1000 delay-600 ${
                isLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <span className="text-xs uppercase tracking-widest font-medium">Skroluj</span>
              <svg className="w-6 h-6 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
