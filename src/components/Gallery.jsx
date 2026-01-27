import { useState, useEffect, useRef } from 'react';

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
      setTimeout(() => {
        setActiveFilter(filterId);
        setIsChanging(false);
      }, 300);
    }
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

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`text-center mb-20 lg:mb-28 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="inline-block text-[var(--color-accent)] text-sm font-bold tracking-widest uppercase mb-6">
            Portfolio
          </span>
          <h2 className="text-6xl lg:text-7xl xl:text-8xl font-bold text-[var(--color-text-primary)] mb-10 tracking-tight">
            Naši radovi
          </h2>
          <p className="text-2xl lg:text-3xl text-[var(--color-text-secondary)] max-w-3xl mx-auto leading-relaxed font-light">
            Pogledajte projekte koji govore više od riječi
          </p>
        </div>

        {/* Enhanced Filter Buttons */}
        <div
          className={`flex flex-wrap justify-center gap-4 mb-16 lg:mb-20 transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {filters.map(filter => (
            <button
              key={filter.id}
              onClick={() => handleFilterChange(filter.id)}
              className={`group relative px-10 py-5 text-lg font-bold tracking-wide transition-all duration-400 overflow-hidden rounded-sm ${
                activeFilter === filter.id
                  ? 'bg-[var(--color-accent)] text-white shadow-2xl scale-105 -translate-y-1'
                  : 'bg-white text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] border-2 border-[var(--color-text-secondary)]/20 hover:border-[var(--color-accent)]/60 shadow-md hover:shadow-xl hover:-translate-y-0.5'
              }`}
            >
              <span className="relative z-10 flex items-center gap-3">
                {filter.label}
                <span className={`text-sm px-3 py-1 rounded-full font-semibold ${
                  activeFilter === filter.id
                    ? 'bg-white/25'
                    : 'bg-[var(--color-accent)]/10 text-[var(--color-accent)]'
                }`}>
                  {filter.count}
                </span>
              </span>
              {activeFilter !== filter.id && (
                <span className="absolute inset-0 bg-gradient-to-r from-[var(--color-accent)]/10 to-[var(--color-accent)]/5 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left"></span>
              )}
              {activeFilter === filter.id && (
                <span className="absolute bottom-0 left-0 right-0 h-1 bg-white/30"></span>
              )}
            </button>
          ))}
        </div>

        {/* Gallery Grid with Smooth Transitions and MORE SPACE */}
        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-14 transition-opacity duration-300 ${
            isChanging ? 'opacity-0' : 'opacity-100'
          }`}
        >
          {filteredProjects.map((project, index) => (
            <GalleryItem
              key={project.id}
              project={project}
              index={index}
              isVisible={isVisible && !isChanging}
            />
          ))}
        </div>

        {/* No Results Message */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-24">
            <div className="text-6xl mb-6 text-[var(--color-accent)]/20">🔍</div>
            <p className="text-2xl text-[var(--color-text-secondary)] font-light">
              Nema dostupnih projekata u ovoj kategoriji.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

function GalleryItem({ project, index, isVisible }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const isActive = isHovered || isFocused;

  return (
    <article
      tabIndex={0}
      role="button"
      aria-label={`${project.title} - projekt`}
      className={`group relative overflow-hidden bg-white shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-700 cursor-pointer focus:outline-none focus:ring-4 focus:ring-[var(--color-accent)]/40 rounded-sm ${
        isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-16'
      }`}
      style={{ transitionDelay: `${Math.min(index * 100, 600)}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    >
      {/* Image Container - LARGER ASPECT RATIO */}
      <div className="aspect-[5/4] overflow-hidden relative bg-[var(--color-surface)]">
        {/* Loading skeleton */}
        {!imageLoaded && (
          <div className="absolute inset-0 skeleton"></div>
        )}
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-cover transition-all duration-700 ${
            isActive ? 'scale-115 brightness-110' : 'scale-100'
          } ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
        />

        {/* Gradient overlay */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-[var(--color-text-primary)] via-[var(--color-text-primary)]/40 to-transparent transition-opacity duration-500 ${
            isActive ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </div>

      {/* Content - Slides up on hover */}
      <div
        className={`absolute bottom-0 left-0 right-0 p-8 transition-all duration-500 ${
          isActive ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
        }`}
      >
        <h3 className="text-2xl font-semibold text-white mb-2 font-serif">
          {project.title}
        </h3>
        <div className="flex items-center gap-2 text-white/80 text-sm">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
          <span className="uppercase tracking-wider">
            {filters.find(f => f.id === project.category)?.label || 'Projekt'}
          </span>
        </div>
      </div>

      {/* View indicator icon */}
      <div
        className={`absolute top-6 right-6 w-14 h-14 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center shadow-lg transition-all duration-500 ${
          isActive ? 'scale-100 opacity-100 rotate-0' : 'scale-75 opacity-0 rotate-45'
        }`}
      >
        <svg className="w-6 h-6 text-[var(--color-accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
        </svg>
      </div>

      {/* Decorative corner accent */}
      <div
        className={`absolute top-0 right-0 w-0 h-0 border-t-[40px] border-r-[40px] border-t-[var(--color-accent)] border-r-transparent transition-all duration-500 ${
          isActive ? 'opacity-100' : 'opacity-0'
        }`}
      ></div>
    </article>
  );
}

// Filter data for the GalleryItem component
const filters = [
  { id: 'sve', label: 'Sve' },
  { id: 'kuhinje', label: 'Kuhinje' },
  { id: 'dnevne', label: 'Dnevne sobe' },
  { id: 'spavace', label: 'Spavaće sobe' },
  { id: 'ostalo', label: 'Ostalo' },
];

export default Gallery;
