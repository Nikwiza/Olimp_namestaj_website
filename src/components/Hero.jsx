import { useEffect, useState } from 'react';
// Import multiple hero images for carousel
import heroImage1 from '../assets/images/Gallery/Kitchens/image.png';
import heroImage2 from '../assets/images/Gallery/Kitchens/image copy.png';
import heroImage3 from '../assets/images/Gallery/LivingRooms/image.png';
import heroImage4 from '../assets/images/Gallery/Bedrooms/image.png';

function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const heroImages = [heroImage1, heroImage2, heroImage3, heroImage4];

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

  // Auto-advance carousel - MEDIUM-PRIORITY FIX: Slower timing for better appreciation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 7500); // Change image every 7.5 seconds (increased from 5)

    return () => clearInterval(interval);
  }, [heroImages.length]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + heroImages.length) % heroImages.length);
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Desktop Layout - Split Screen with Parallax - FIX: Better centering at all breakpoints */}
      <div className="hidden lg:grid lg:grid-cols-2 w-full min-h-screen">
        {/* Left: Content - Properly centered in column */}
        <div className="flex items-center justify-center px-6 lg:px-8 xl:px-12 bg-gradient-to-br from-[var(--color-background)] to-[var(--color-surface)] relative z-10">
          <div className="max-w-xl w-full pt-16">
            {/* Heritage Badge - EVEN MORE PROMINENT */}
            <div
              className={`inline-flex items-center gap-3 mb-5 transition-all duration-1000 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="relative flex items-center gap-4 px-8 py-4 bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200/40 rounded-full shadow-lg hover:shadow-2xl transition-shadow">
                <div className="w-4 h-4 rounded-full bg-amber-600 animate-pulse"></div>
                <span className="text-amber-900 text-s font-bold tracking-wider uppercase">
                  Od 1996. godine
                </span>
              </div>
            </div>

            {/* Main Headline */}
            <h1
              className={`text-5xl xl:text-6xl 2xl:text-7xl font-bold text-[var(--color-text-primary)] mb-10 leading-[1.05] tracking-tight transition-all duration-1000 delay-150 ${
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
              className={`text-xl xl:text-2xl text-[var(--color-text-secondary)] mb-16 leading-relaxed max-w-lg font-light transition-all duration-1000 delay-300 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
            >
              Više od 28 godina stvaramo namještaj koji postaje dio porodičnih priča.
            </p>

            {/* CTAs - IMPROVED BUTTONS */}
            <div
              className={`flex flex-wrap gap-6 transition-all duration-1000 delay-450 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
            >
              <button
                onClick={() => scrollToSection('gallery')}
                className="btn-primary group relative px-8 py-4 bg-[var(--color-accent)] text-white font-bold text-lg rounded-sm overflow-hidden transition-all duration-400 hover:shadow-2xl hover:-translate-y-1 active:scale-[0.98]"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-[var(--color-accent-hover)] to-[var(--color-accent)] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
                <span className="relative flex items-center gap-3 z-10">
                  Pogledaj radove
                  <svg className="w-5 h-5 transition-transform group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="btn-secondary px-8 py-4 border-2 border-[var(--color-text-primary)] text-[var(--color-text-primary)] font-bold text-lg rounded-sm hover:border-[var(--color-accent)] hover:text-white hover:bg-[var(--color-accent)] transition-all duration-400 active:scale-[0.98]"
              >
                Kontaktiraj nas
              </button>
            </div>

            {/* Stats removed from hero - will only be in TrustBar */}
          </div>
        </div>

        {/* Right: Image Carousel with Parallax */}
        <div className="relative overflow-hidden">
          {/* Image carousel */}
          {heroImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-1000 ${
                index === currentImageIndex
                  ? 'opacity-100 scale-100'
                  : 'opacity-0 scale-105'
              }`}
              style={{
                transform: index === currentImageIndex ? `translateY(${scrollY * 0.3}px)` : 'translateY(0)',
                zIndex: index === currentImageIndex ? 1 : 0,
              }}
            >
              <img
                src={image}
                alt={`Olimp stolarska radnja - projekat ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}

          {/* Elegant gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-background)]/20 via-transparent to-transparent z-10"></div>

          {/* Carousel navigation dots */}
          <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex gap-3 z-20">
            {heroImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`transition-all duration-300 ${
                  index === currentImageIndex
                    ? 'w-12 h-3 bg-white'
                    : 'w-3 h-3 bg-white/50 hover:bg-white/80'
                }`}
                aria-label={`Prikaži sliku ${index + 1}`}
              />
            ))}
          </div>

          {/* Carousel navigation arrows */}
          <button
            onClick={prevImage}
            className="absolute left-8 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/20 backdrop-blur-sm hover:bg-white/40 transition-all rounded-full flex items-center justify-center z-20 group hover:scale-110 hover:shadow-xl"
            aria-label="Prethodna slika"
          >
            <svg className="w-7 h-7 text-white transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextImage}
            className="absolute right-8 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/20 backdrop-blur-sm hover:bg-white/40 transition-all rounded-full flex items-center justify-center z-20 group hover:scale-110 hover:shadow-xl"
            aria-label="Sledeća slika"
          >
            <svg className="w-7 h-7 text-white transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Scroll Indicator - Clean and Simple */}
          <div
            className={`hidden sm:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-white/90 transition-opacity duration-1000 delay-1000 z-20 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <span className="text-xs uppercase tracking-widest font-semibold">Skroluj</span>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>

      {/* Mobile Layout - Enhanced with Carousel */}
      <div className="lg:hidden w-full min-h-screen relative">
        {/* Background Image Carousel with Parallax */}
        <div className="absolute inset-0">
          {heroImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                transform: index === currentImageIndex ? `translateY(${scrollY * 0.5}px)` : 'translateY(0)',
              }}
            >
              <img
                src={image}
                alt={`Olimp stolarska radnja - projekat ${index + 1}`}
                className="w-full h-full object-cover scale-110"
              />
            </div>
          ))}
          <div className="absolute inset-0 bg-gradient-to-b from-stone-950/75 via-stone-900/65 to-stone-950/85 z-10"></div>
        </div>

        {/* Content - Enhanced Mobile with MORE SPACE */}
        <div className="relative z-20 flex items-center justify-center min-h-screen px-6 py-40">
          <div className="max-w-xl text-center">
            {/* Heritage Badge - LARGER */}
            <div
              className={`inline-flex items-center gap-3 px-5 py-3 mb-14 bg-white/10 backdrop-blur-md border border-white/20 rounded-full transition-all duration-1000 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="w-3 h-3 rounded-full bg-amber-400 animate-pulse"></div>
              <span className="text-amber-100 text-base font-bold tracking-wider uppercase">
                Od 1996. godine
              </span>
            </div>

            {/* Headline */}
            <h1
              className={`text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-12 leading-[1.08] tracking-tight transition-all duration-1000 delay-150 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
            >
              Stolarska tradicija
              <br />
              <span className="text-amber-300">koja gradi domove</span>
            </h1>

            {/* Subheadline */}
            <p
              className={`text-lg sm:text-xl text-white/90 mb-16 leading-relaxed font-light transition-all duration-1000 delay-300 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
            >
              Više od 28 godina stvaramo namještaj koji postaje dio porodičnih priča.
            </p>

            {/* CTAs - IMPROVED BUTTONS */}
            <div
              className={`flex flex-col sm:flex-row gap-5 justify-center mb-16 transition-all duration-1000 delay-450 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
            >
              <button
                onClick={() => scrollToSection('gallery')}
                className="btn-primary px-8 py-4 bg-[var(--color-accent)] text-white font-bold text-lg rounded-sm hover:bg-[var(--color-accent-hover)] transition-all active:scale-[0.98] shadow-xl hover:shadow-2xl hover:-translate-y-1"
              >
                Pogledaj radove
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="btn-secondary px-8 py-4 border-2 border-white/60 text-white font-bold text-lg rounded-sm hover:bg-white/20 hover:border-white backdrop-blur-sm transition-all active:scale-[0.98] shadow-lg hover:shadow-xl hover:-translate-y-1"
              >
                Kontaktiraj nas
              </button>
            </div>

            {/* Scroll Indicator - RESPONSIVE: hidden on very small screens */}
            <div
              className={`hidden xs:flex flex-col items-center gap-2 text-white/70 transition-all duration-1000 delay-600 ${
                isLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <span className="text-xs uppercase tracking-widest font-medium">Skroluj</span>
              <svg className="w-6 h-6 animate-subtle-float" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>

          {/* Mobile carousel dots */}
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-3 z-30">
            {heroImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`transition-all duration-300 ${
                  index === currentImageIndex
                    ? 'w-10 h-2 bg-white'
                    : 'w-2 h-2 bg-white/50'
                }`}
                aria-label={`Prikaži sliku ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
