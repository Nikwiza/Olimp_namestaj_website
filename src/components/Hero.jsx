import heroImage from '../assets/images/Gallery/Kitchens/image.png';

function Hero() {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-20 lg:pt-0">
      {/* Split Layout - Desktop */}
      <div className="hidden lg:grid lg:grid-cols-2 w-full h-screen">
        {/* Left: Content */}
        <div className="flex items-center justify-center px-12 xl:px-20 bg-[var(--color-background)]">
          <div className="max-w-xl animate-fade-in-up">
            <p className="text-[var(--color-accent)] text-sm lg:text-base font-medium tracking-wider uppercase mb-4">
              Od 1996.
            </p>
            <h1 className="text-5xl xl:text-6xl 2xl:text-7xl font-bold text-[var(--color-text-primary)] mb-6 leading-tight">
              Stolarska majstorija koja stvara vaš dom
            </h1>
            <p className="text-lg xl:text-xl text-[var(--color-text-secondary)] mb-10 leading-relaxed">
              28 godina iskustva u izradi namještaja po mjeri. Svaki komad priča o kvaliteti, tradiciji i pažnji prema detaljima.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => scrollToSection('gallery')}
                className="px-8 py-4 bg-[var(--color-accent)] text-white font-semibold rounded-sm hover:bg-[var(--color-accent-hover)] transition-all transform hover:scale-105 shadow-lg"
              >
                Pogledaj radove
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="px-8 py-4 border-2 border-[var(--color-accent)] text-[var(--color-accent)] font-semibold rounded-sm hover:bg-[var(--color-accent)] hover:text-white transition-all"
              >
                Kontaktiraj nas
              </button>
            </div>
          </div>
        </div>

        {/* Right: Image */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[var(--color-background)] opacity-20 z-10"></div>
          <img
            src={heroImage}
            alt="Olimp stolarska radnja - custom kuhinja"
            className="w-full h-full object-cover"
          />
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
          <div className="absolute inset-0 bg-gradient-to-b from-stone-900/60 via-stone-900/50 to-stone-900/70"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex items-center justify-center min-h-screen px-6 py-24">
          <div className="max-w-2xl text-center animate-fade-in-up">
            <p className="text-[var(--color-accent)] text-sm font-medium tracking-wider uppercase mb-4">
              Od 1996.
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
              Stolarska majstorija koja stvara vaš dom
            </h1>
            <p className="text-lg text-white/90 mb-10 leading-relaxed">
              28 godina iskustva u izradi namještaja po mjeri. Svaki komad priča o kvaliteti, tradiciji i pažnji prema detaljima.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => scrollToSection('gallery')}
                className="px-8 py-4 bg-[var(--color-accent)] text-white font-semibold rounded-sm hover:bg-[var(--color-accent-hover)] transition-all transform hover:scale-105 shadow-lg"
              >
                Pogledaj radove
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="px-8 py-4 border-2 border-white text-white font-semibold rounded-sm hover:bg-white hover:text-[var(--color-accent)] transition-all"
              >
                Kontaktiraj nas
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
