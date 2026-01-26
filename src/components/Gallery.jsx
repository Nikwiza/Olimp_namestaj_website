import { useState } from 'react';

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

  const projects = [
    { id: 1, category: 'kuhinje', image: kitchen1, title: 'Moderna kuhinja' },
    { id: 2, category: 'kuhinje', image: kitchen2, title: 'Klasična kuhinja' },
    { id: 3, category: 'kuhinje', image: kitchen3, title: 'Rustična kuhinja' },
    { id: 4, category: 'kuhinje', image: kitchen4, title: 'Minimalistička kuhinja' },
    { id: 5, category: 'dnevne', image: living1, title: 'Dnevni boravak' },
    { id: 6, category: 'dnevne', image: living2, title: 'TV zid' },
    { id: 7, category: 'dnevne', image: living3, title: 'Biblioteka' },
    { id: 8, category: 'dnevne', image: living4, title: 'Kombinirani prostor' },
    { id: 9, category: 'spavace', image: bedroom1, title: 'Spavaća soba' },
    { id: 10, category: 'spavace', image: bedroom2, title: 'Garderober' },
    { id: 11, category: 'spavace', image: bedroom3, title: 'Dečija soba' },
    { id: 12, category: 'spavace', image: bedroom4, title: 'Master bedroom' },
    { id: 13, category: 'ostalo', image: other1, title: 'Ostali projekti' },
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
    <section id="gallery" className="py-[var(--spacing-section-mobile)] lg:py-[var(--spacing-section)] bg-[var(--color-surface)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-[var(--color-text-primary)] mb-6">
            Naši radovi
          </h2>
          <div className="w-24 h-1 bg-[var(--color-accent)] mx-auto mb-8"></div>
          <p className="text-lg lg:text-xl text-[var(--color-text-secondary)] max-w-3xl mx-auto">
            Pogledajte neke od naših projekata i uvjerite se u kvalitet naše izrade
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {filters.map(filter => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-6 py-3 rounded-sm font-semibold transition-all transform hover:scale-105 ${
                activeFilter === filter.id
                  ? 'bg-[var(--color-accent)] text-white shadow-lg'
                  : 'bg-white text-[var(--color-text-primary)] hover:bg-[var(--color-accent)] hover:text-white'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className="image-hover-zoom bg-white rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 animate-scale-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-[var(--color-text-primary)]">
                  {project.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* No Results Message */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-[var(--color-text-secondary)]">
              Nema dostupnih projekata u ovoj kategoriji.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default Gallery;
