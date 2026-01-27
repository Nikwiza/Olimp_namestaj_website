import { useEffect, useState } from 'react';
import heroImage from '../assets/images/Gallery/Kitchens/image.png';

function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center">
      {/* Desktop Layout - Split Screen */}
      <div className="hidden lg:grid lg:grid-cols-2 w-full min-h-screen">
        {/* Left: Content */}
        <div className="flex items-center justify-center px-12 xl:px-20 2xl:px-28 bg-[var(--color-background)]">
          <div className="max-w-xl">
            {/* Heritage Badge */}
            <div
              className={`inline-flex items-center gap-3 mb-10 transition-all duration-700 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <div className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-700/10 to-amber-600/5 border border-amber-700/20 rounded-sm">
                <div className="w-2 h-2 rounded-full bg-amber-700"></div>
                <span className="text-amber-800 text-sm font-semibold tracking-wider uppercase">
                  Od 1996. godine
                </span>
              </div>
            </div>

            {/* Main Headline */}
            <h1
              className={`text-4xl xl:text-5xl 2xl:text-6xl font-bold text-[var(--color-text-primary)] mb-10 leading-[1.1] tracking-tight transition-all duration-700 delay-100 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              Stolarska tradicija
              <br />
              <span className="text-[var(--color-accent)]">koja gradi domove</span>
            </h1>

            {/* Subheadline - more breathing room */}
            <p
              className={`text-lg xl:text-xl text-[var(--color-text-secondary)] mb-14 leading-[1.8] max-w-lg transition-all duration-700 delay-200 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              Više od 28 godina stvaramo namještaj koji postaje dio porodičnih priča.
            </p>

            {/* CTAs */}
            <div
              className={`flex flex-wrap gap-5 mb-20 transition-all duration-700 delay-300 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              <button
                onClick={() => scrollToSection('gallery')}
                className="group px-10 py-4 bg-[var(--color-accent)] text-white font-semibold rounded-sm hover:bg-[var(--color-accent-hover)] transition-all duration-300 hover:shadow-2xl hover:-translate-y-0.5 active:scale-[0.98]"
              >
                <span className="flex items-center gap-3">
                  Pogledaj radove
                  <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="px-10 py-4 border-2 border-[var(--color-text-primary)]/30 text-[var(--color-text-primary)] font-semibold rounded-sm hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] hover:bg-[var(--color-accent)]/5 transition-all duration-300 active:scale-[0.98]"
              >
                Kontaktiraj nas
              </button>
            </div>

            {/* Mini Stats */}
            <div
              className={`flex gap-16 pt-10 border-t border-[var(--color-text-secondary)]/10 transition-all duration-700 delay-500 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              <div>
                <div className="text-4xl font-bold text-[var(--color-accent)]">28+</div>
                <div className="text-sm text-[var(--color-text-secondary)] mt-2 tracking-wide">godina iskustva</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-[var(--color-accent)]">500+</div>
                <div className="text-sm text-[var(--color-text-secondary)] mt-2 tracking-wide">zadovoljnih klijenata</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Image with Overlay */}
        <div className="relative overflow-hidden">
          <div
            className={`absolute inset-0 transition-transform duration-1000 ${
              isLoaded ? 'scale-100' : 'scale-110'
            }`}
          >
            <img
              src={heroImage}
              alt="Olimp stolarska radnja - custom kuhinja"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-background)]/10 to-transparent"></div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/80">
            <span className="text-xs uppercase tracking-widest">Skroluj</span>
            <div className="w-px h-12 bg-white/40 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden w-full min-h-screen relative">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Olimp stolarska radnja"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-900/70 via-stone-900/60 to-stone-900/80"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex items-center justify-center min-h-screen px-6 py-28">
          <div className="max-w-lg text-center">
            {/* Heritage Badge */}
            <div
              className={`inline-flex items-center gap-2 px-4 py-2 mb-8 bg-white/10 backdrop-blur-sm border border-white/20 rounded-sm transition-all duration-700 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <div className="w-2 h-2 rounded-full bg-amber-500"></div>
              <span className="text-amber-200 text-sm font-semibold tracking-wider uppercase">
                Od 1996. godine
              </span>
            </div>

            {/* Headline */}
            <h1
              className={`text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-[1.15] tracking-tight transition-all duration-700 delay-100 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              Stolarska tradicija
              <br />
              <span className="text-amber-400">koja gradi domove</span>
            </h1>

            {/* Subheadline */}
            <p
              className={`text-base sm:text-lg text-white/85 mb-12 leading-[1.8] transition-all duration-700 delay-200 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              Više od 28 godina stvaramo namještaj koji postaje dio porodičnih priča.
            </p>

            {/* CTAs */}
            <div
              className={`flex flex-col sm:flex-row gap-5 justify-center transition-all duration-700 delay-300 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              <button
                onClick={() => scrollToSection('gallery')}
                className="px-10 py-4 bg-[var(--color-accent)] text-white font-semibold rounded-sm hover:bg-[var(--color-accent-hover)] transition-all active:scale-[0.98] shadow-lg hover:shadow-2xl"
              >
                Pogledaj radove
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="px-10 py-4 border-2 border-white/40 text-white font-semibold rounded-sm hover:bg-white/10 transition-all active:scale-[0.98]"
              >
                Kontaktiraj nas
              </button>
            </div>

            {/* Scroll Indicator */}
            <div
              className={`mt-16 flex flex-col items-center gap-2 text-white/60 transition-all duration-700 delay-500 ${
                isLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <span className="text-xs uppercase tracking-widest">Skroluj</span>
              <svg className="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
