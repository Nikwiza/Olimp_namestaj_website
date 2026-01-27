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
    { id: 'sve', label: 'Sve' },
    { id: 'kuhinje', label: 'Kuhinje' },
    { id: 'dnevne', label: 'Dnevne sobe' },
    { id: 'spavace', label: 'Spavaće sobe' },
    { id: 'ostalo', label: 'Ostalo' },
  ];

  const filteredProjects = activeFilter === 'sve'
    ? projects
    : projects.filter(project => project.category === activeFilter);

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="py-[var(--spacing-section-mobile)] lg:py-[var(--spacing-section)] bg-[var(--color-background)]"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`text-center mb-16 lg:mb-20 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="inline-block text-[var(--color-accent)] text-sm font-semibold tracking-widest uppercase mb-4">
            Portfolio
          </span>
          <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-[var(--color-text-primary)] mb-6 tracking-tight">
            Naši radovi
          </h2>
          <p className="text-lg lg:text-xl text-[var(--color-text-secondary)] max-w-2xl mx-auto leading-relaxed">
            Pogledajte projekte koji govore više od riječi
          </p>
        </div>

        {/* Filter Buttons */}
        <div
          className={`flex flex-wrap justify-center gap-3 mb-12 lg:mb-16 transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {filters.map(filter => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-6 py-3 text-sm font-medium tracking-wide transition-all duration-300 ${
                activeFilter === filter.id
                  ? 'bg-[var(--color-accent)] text-white'
                  : 'bg-transparent text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] border border-[var(--color-text-secondary)]/20 hover:border-[var(--color-accent)]/40'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredProjects.map((project, index) => (
            <GalleryItem
              key={project.id}
              project={project}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>

        {/* No Results Message */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl text-[var(--color-text-secondary)]">
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
  const isActive = isHovered || isFocused;

  return (
    <article
      tabIndex={0}
      role="button"
      aria-label={`${project.title} - ${filters.find(f => f.id === project.category)?.label || 'Projekt'}`}
      className={`group relative overflow-hidden bg-[var(--color-surface)] transition-all duration-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:ring-offset-2 ${
        isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-12'
      }`}
      style={{ transitionDelay: `${Math.min(index * 100, 500)}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    >
      {/* Image Container */}
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className={`w-full h-full object-cover transition-transform duration-700 ${
            isActive ? 'scale-110' : 'scale-100'
          }`}
        />
      </div>

      {/* Overlay */}
      <div
        className={`absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-opacity duration-500 ${
          isActive ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Content */}
      <div
        className={`absolute bottom-0 left-0 right-0 p-6 transition-all duration-500 ${
          isActive ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        }`}
      >
        <h3 className="text-xl font-semibold text-white mb-1">
          {project.title}
        </h3>
        <p className="text-white/70 text-sm">
          {filters.find(f => f.id === project.category)?.label || 'Projekt'}
        </p>
      </div>

      {/* View indicator */}
      <div
        className={`absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center transition-all duration-500 ${
          isActive ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
        }`}
      >
        <svg className="w-5 h-5 text-[var(--color-text-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
        </svg>
      </div>
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
