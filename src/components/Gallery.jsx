import { useState, useEffect, useRef } from 'react';
import { useSwipeable } from 'react-swipeable';

// Import kitchen images
import kitchen1 from '../assets/images/Gallery/Kitchens/image.png';
import kitchen2 from '../assets/images/Gallery/Kitchens/image copy.png';
import kitchen3 from '../assets/images/Gallery/Kitchens/image copy 2.png';
import kitchen4 from '../assets/images/Gallery/Kitchens/image copy 3.png';

// Import living room images
import living1 from '../assets/images/Gallery/LivingRooms/image.png';
import living2 from '../assets/images/Gallery/LivingRooms/image copy.png';
import living3 from '../assets/images/Gallery/LivingRooms/image copy 2.png';
import living4 from '../assets/images/Gallery/LivingRooms/Kitchen-white-modern.jpeg';

// Import bedroom images
import bedroom1 from '../assets/images/Gallery/Bedrooms/image.png';
import bedroom2 from '../assets/images/Gallery/Bedrooms/image copy.png';
import bedroom3 from '../assets/images/Gallery/Bedrooms/image copy 2.png';
import bedroom4 from '../assets/images/Gallery/Bedrooms/image copy 3.png';

// Import other images
import other1 from '../assets/images/Gallery/Other/image.png';

function Gallery() {
  const [activeFilter, setActiveFilter] = useState('sve');
  const [isVisible, setIsVisible] = useState(false);
  const [isChanging, setIsChanging] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImageIndex, setLightboxImageIndex] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const projects = [
    { id: 1, category: 'kuhinje', image: kitchen1, title: 'Moderna kuhinja', size: 'large' },
    { id: 2, category: 'kuhinje', image: kitchen2, title: 'Klasična kuhinja', size: 'normal' },
    { id: 3, category: 'kuhinje', image: kitchen3, title: 'Rustična kuhinja', size: 'normal' },
    { id: 4, category: 'kuhinje', image: kitchen4, title: 'Minimalistička kuhinja', size: 'normal' },
    { id: 5, category: 'dnevne', image: living1, title: 'Dnevni boravak', size: 'large' },
    { id: 6, category: 'dnevne', image: living2, title: 'TV zid', size: 'normal' },
    { id: 7, category: 'dnevne', image: living3, title: 'Biblioteka', size: 'normal' },
    { id: 8, category: 'dnevne', image: living4, title: 'Kombinirani prostor', size: 'normal' },
    { id: 9, category: 'spavace', image: bedroom1, title: 'Spavaća soba', size: 'large' },
    { id: 10, category: 'spavace', image: bedroom2, title: 'Garderober', size: 'normal' },
    { id: 11, category: 'spavace', image: bedroom3, title: 'Dečija soba', size: 'normal' },
    { id: 12, category: 'spavace', image: bedroom4, title: 'Master bedroom', size: 'normal' },
    { id: 13, category: 'ostalo', image: other1, title: 'Ostali projekti', size: 'normal' },
  ];

  const filters = [
    { id: 'sve', label: 'Sve', count: projects.length },
    { id: 'kuhinje', label: 'Kuhinje', count: projects.filter(p => p.category === 'kuhinje').length },
    { id: 'dnevne', label: 'Dnevne sobe', count: projects.filter(p => p.category === 'dnevne').length },
    { id: 'spavace', label: 'Spavaće sobe', count: projects.filter(p => p.category === 'spavace').length },
    { id: 'ostalo', label: 'Ostalo', count: projects.filter(p => p.category === 'ostalo').length },
  ];

  const filteredProjects = activeFilter === 'sve'
    ? projects
    : projects.filter(project => project.category === activeFilter);

  const handleFilterChange = (filterId) => {
    if (filterId !== activeFilter) {
      setIsChanging(true);
      setCurrentCardIndex(0); // Reset to first card
      setTimeout(() => {
        setActiveFilter(filterId);
        setIsChanging(false);
      }, 300);
    }
  };

  const nextCard = () => {
    if (currentCardIndex < filteredProjects.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    }
  };

  const prevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
    }
  };

  // Lightbox handlers
  const openLightbox = (index) => {
    setLightboxImageIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden'; // Prevent background scroll
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = ''; // Restore scroll
  };

  const nextLightboxImage = () => {
    setLightboxImageIndex((prev) => (prev + 1) % filteredProjects.length);
  };

  const prevLightboxImage = () => {
    setLightboxImageIndex((prev) => (prev - 1 + filteredProjects.length) % filteredProjects.length);
  };

  // Close lightbox on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && lightboxOpen) {
        closeLightbox();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [lightboxOpen]);

  // Swipe handlers for main gallery
  const handlers = useSwipeable({
    onSwipedLeft: () => nextCard(),
    onSwipedRight: () => prevCard(),
    trackMouse: true, // Enable mouse drag on desktop
    preventScrollOnSwipe: true,
    delta: 10,
  });

  // Swipe handlers for lightbox
  const lightboxHandlers = useSwipeable({
    onSwipedLeft: () => nextLightboxImage(),
    onSwipedRight: () => prevLightboxImage(),
    trackMouse: true, // Enable mouse drag on desktop
    preventScrollOnSwipe: true,
    delta: 10,
  });

  // Generate random tilt angles for stacked effect
  const getTiltAngle = (index) => {
    const angles = [2, -3, 1.5, -2.5, 3, -1, 2.5, -3.5, 1, -2];
    return angles[index % angles.length];
  };

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="py-[var(--spacing-section-mobile)] lg:py-[var(--spacing-section)] bg-[var(--color-background)] relative overflow-hidden"
    >
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[var(--color-accent)] rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`text-center mb-24 lg:mb-32 max-w-4xl mx-auto transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="inline-block text-[var(--color-accent)] text-sm font-bold tracking-widest uppercase mb-6">
            Portfolio
          </span>
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-[var(--color-text-primary)] mb-10 tracking-tight font-serif">
            Naši radovi
          </h2>
          <p className="text-xl lg:text-2xl text-[var(--color-text-secondary)] max-w-3xl mx-auto leading-relaxed font-light">
            Pogledajte projekte koji govore više od riječi
          </p>
        </div>

        {/* Enhanced Filter Buttons - Minimal by default, expand on hover/active */}
        <div
          className={`flex flex-wrap justify-center gap-4 mb-16 lg:mb-20 transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {filters.map(filter => (
            <button
              key={filter.id}
              onClick={() => handleFilterChange(filter.id)}
              className={`group relative h-11 px-3 text-base font-bold tracking-wide transition-all duration-300 overflow-hidden rounded-sm flex items-center ${
                activeFilter === filter.id
                  ? 'bg-[var(--color-accent)] text-white shadow-2xl px-6'
                  : 'bg-white text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] border-2 border-[var(--color-text-secondary)]/20 hover:border-[var(--color-accent)]/60 shadow-md hover:shadow-xl hover:px-6'
              }`}
            >
              <span className="relative z-10 flex items-center gap-3">
                {filter.label}
                <span className={`text-sm px-2 py-1 rounded-full font-semibold transition-all duration-300 ${
                  activeFilter === filter.id
                    ? 'bg-white/25 opacity-100 w-auto'
                    : 'bg-[var(--color-accent)]/10 text-[var(--color-accent)] opacity-0 w-0 px-0 group-hover:opacity-100 group-hover:w-auto group-hover:px-2'
                }`}>
                  {filter.count}
                </span>
              </span>
              {activeFilter !== filter.id && (
                <span className="absolute inset-0 bg-gradient-to-r from-[var(--color-accent)]/10 to-[var(--color-accent)]/5 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              )}
            </button>
          ))}
        </div>

        {/* Swipe Indicator - Only for "Sve" mode */}
        {activeFilter === 'sve' && (
          <div
            className={`flex justify-center items-center gap-3 lg:mb-12 text-[var(--color-text-secondary)] transition-all duration-1000 delay-400 ${
              isVisible && filteredProjects.length > 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <div className="flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full shadow-sm">
              <svg className="w-5 h-5 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
              </svg>
              <span className="text-sm font-medium animate-pulse">Prevuci za više</span>
              <svg className="w-5 h-5 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </div>
        )}

        {/* Conditional rendering: Swipe mode for "Sve", Grid mode for specific categories */}
        {activeFilter === 'sve' ? (
          /* Stacked Photo Gallery with Swipe - Only for "Sve" */
          <div
            {...handlers}
            className={`relative max-w-4xl mx-auto transition-opacity duration-300 ${
              isChanging ? 'opacity-0' : 'opacity-100'
            }`}
            style={{ minHeight: '600px' }}
          >
            {filteredProjects.length > 0 ? (
              <div className="relative w-full h-[500px] md:h-[680px] lg:h-[700px] flex items-center justify-center">
              {/* Stack of photos */}
              {filteredProjects.map((project, index) => {
                const isActive = index === currentCardIndex;
                const isPast = index < currentCardIndex;
                const isFuture = index > currentCardIndex;
                const stackIndex = filteredProjects.length - 1 - index;

                // Only show current card and 3 cards behind it
                const shouldShow = index >= currentCardIndex && index < currentCardIndex + 4;

                if (!shouldShow) return null;

                return (
                  <div
                    key={project.id}
                    className={`absolute w-full max-w-3xl transition-all duration-700 ease-out ${
                      isActive ? 'cursor-pointer' : 'pointer-events-none'
                    } ${isDragging ? 'cursor-grabbing' : ''}`}
                    style={{
                      transform: isActive
                        ? 'translateY(0) rotate(0deg) scale(1)'
                        : isPast
                        ? `translateY(-100%) rotate(${getTiltAngle(index)}deg) scale(0.9)`
                        : `translateY(${(index - currentCardIndex) * 12}px) rotate(${getTiltAngle(index)}deg) scale(${1 - (index - currentCardIndex) * 0.03})`,
                      opacity: isActive ? 1 : isPast ? 0 : 0.6,
                      zIndex: filteredProjects.length - index,
                      boxShadow: isActive
                        ? '0 25px 50px rgba(0, 0, 0, 0.25)'
                        : `0 ${10 + (index - currentCardIndex) * 5}px ${20 + (index - currentCardIndex) * 10}px rgba(0, 0, 0, 0.15)`,
                    }}
                    onClick={() => isActive && openLightbox(index)}
                  >
                    <div className="bg-white p-4 lg:p-6 rounded-sm shadow-xl border-4 border-white group hover:border-[var(--color-accent)]/30 transition-all">
                      <div className="aspect-[4/3] overflow-hidden rounded-sm bg-[var(--color-surface)] mb-4 relative">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          draggable="false"
                        />
                        {/* Click indicator overlay */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 rounded-full p-4">
                            <svg className="w-8 h-8 text-[var(--color-accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-2 text-[var(--color-text-secondary)] text-base">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                          </svg>
                          <span className="uppercase tracking-wider font-bold">
                            {filters.find(f => f.id === project.category)?.label || 'Projekt'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-24">
              <div className="text-6xl mb-6 text-[var(--color-accent)]/20">🔍</div>
              <p className="text-2xl text-[var(--color-text-secondary)] font-light">
                Nema dostupnih projekata u ovoj kategoriji.
              </p>
            </div>
          )}
          </div>
        ) : (
          /* Grid Layout for Specific Categories */
          <div
            className={`transition-opacity duration-300 ${
              isChanging ? 'opacity-0' : 'opacity-100'
            }`}
          >
            {filteredProjects.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project, index) => (
                  <div
                    key={project.id}
                    className="group cursor-pointer bg-white p-4 rounded-sm shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                    onClick={() => openLightbox(index)}
                  >
                    <div className="aspect-[4/3] overflow-hidden rounded-sm bg-[var(--color-surface)] mb-4 relative">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 rounded-full p-3">
                          <svg className="w-6 h-6 text-[var(--color-accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-24">
                <div className="text-6xl mb-6 text-[var(--color-accent)]/20">🔍</div>
                <p className="text-2xl text-[var(--color-text-secondary)] font-light">
                  Nema dostupnih projekata u ovoj kategoriji.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Navigation Controls & Counter - Only for "Sve" mode */}
        {activeFilter === 'sve' && filteredProjects.length > 1 && (
          <div className="flex items-center justify-center gap-8 lg:mt-16 md:mt-12">
            <button
              onClick={prevCard}
              disabled={currentCardIndex === 0}
              className="w-14 h-14 rounded-full bg-white border-2 border-[var(--color-text-secondary)]/20 hover:border-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center justify-center group shadow-lg hover:scale-110 hover:shadow-xl"
              aria-label="Prethodni projekat"
            >
              <svg className="w-6 h-6 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div className="flex items-center gap-3 px-6 py-3 bg-white rounded-full shadow-lg border-2 border-[var(--color-text-secondary)]/10" aria-live="polite" aria-atomic="true">
              <span className="text-2xl font-bold text-[var(--color-accent)]">{currentCardIndex + 1}</span>
              <span className="text-[var(--color-text-secondary)]">/</span>
              <span className="text-lg text-[var(--color-text-secondary)]">{filteredProjects.length}</span>
            </div>

            <button
              onClick={nextCard}
              disabled={currentCardIndex === filteredProjects.length - 1}
              className="w-14 h-14 rounded-full bg-white border-2 border-[var(--color-text-secondary)]/20 hover:border-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center justify-center group shadow-lg hover:scale-110 hover:shadow-xl"
              aria-label="Sledeći projekat"
            >
              <svg className="w-6 h-6 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Fullscreen Lightbox Modal */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center animate-fade-in"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center transition-all z-50 group hover:scale-110 hover:shadow-xl"
            aria-label="Zatvori lightbox"
          >
            <svg className="w-8 h-8 text-white group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Image counter */}
          <div className="absolute top-6 left-1/2 -translate-x-1/2 px-6 py-3 bg-white/10 backdrop-blur-md rounded-full z-50">
            <span className="text-white font-bold text-lg">
              {lightboxImageIndex + 1} / {filteredProjects.length}
            </span>
          </div>

          {/* Previous button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevLightboxImage();
            }}
            className="absolute left-6 top-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center transition-all z-50 group hover:scale-110 hover:shadow-2xl"
            aria-label="Prethodna slika"
          >
            <svg className="w-8 h-8 text-white group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Next button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              nextLightboxImage();
            }}
            className="absolute right-6 top-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center transition-all z-50 group hover:scale-110 hover:shadow-2xl"
            aria-label="Sledeća slika"
          >
            <svg className="w-8 h-8 text-white group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Image container */}
          <div
            {...lightboxHandlers}
            className="max-w-7xl max-h-[90vh] mx-auto px-4 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={filteredProjects[lightboxImageIndex].image}
              alt={filteredProjects[lightboxImageIndex].title}
              className="max-w-full max-h-[90vh] w-auto h-auto object-contain rounded-sm shadow-2xl animate-scale-in"
            />
            {/* Category label overlay - only show in "Sve" mode */}
            {activeFilter === 'sve' && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8 rounded-b-sm">
                <p className="text-white text-2xl font-bold uppercase tracking-wide">
                  {filters.find(f => f.id === filteredProjects[lightboxImageIndex].category)?.label || 'Projekt'}
                </p>
              </div>
            )}
          </div>

          {/* Instruction text */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 text-sm">
            Pritisnite ESC ili kliknite izvan slike za zatvaranje
          </div>
        </div>
      )}
    </section>
  );
}

export default Gallery;
