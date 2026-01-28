import { useEffect, useRef, useState } from 'react';

function Testimonials() {
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

  const testimonials = [
    {
      id: 1,
      quote: 'Olimp nam je napravio kuhinju iz snova. Kvalitet izrade je nevjerovatan, a pažnja prema detaljima se vidi u svakom elementu. Prošlo je pet godina i sve izgleda kao prvi dan.',
      name: 'Marko i Ana Jovanović',
      project: 'Kuhinja po mjeri',
      location: 'Beograd',
      rating: 5
    },
    {
      id: 2,
      quote: 'Profesionalnost i posvećenost tima su nas oduševili. Od prvog sastanka do finalne montaže, sve je teklo glatko. Preporuka svima koji traže kvalitet.',
      name: 'Petar Nikolić',
      project: 'Kompletno opremanje stana',
      location: 'Novi Sad',
      rating: 5
    },
    {
      id: 3,
      quote: 'Radili smo sa više stolarskih radnji, ali Olimp je poseban. Njihovo iskustvo se vidi u svakom savjetu. Četvrti smo put da naručujemo nameštaj kod njih.',
      name: 'Jelena Đorđević',
      project: 'Spavaća soba i garderober',
      location: 'Kragujevac',
      rating: 5
    }
  ];

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="py-[var(--spacing-section-mobile)] lg:py-[var(--spacing-section)] bg-[var(--color-background)] relative overflow-hidden"
    >
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-[var(--color-accent)] rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`text-center mb-20 lg:mb-28 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="inline-block text-[var(--color-accent)] text-sm font-bold tracking-widest uppercase mb-6">
            Utisci
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-[var(--color-text-primary)] mb-10 tracking-tight font-serif">
            Šta kažu klijenti
          </h2>
          <p className="text-2xl lg:text-3xl text-[var(--color-text-secondary)] max-w-3xl mx-auto leading-relaxed font-light">
            Naši klijenti postaju naši prijatelji
          </p>
        </div>

        {/* Testimonials Grid - Enhanced Cards - MEDIUM-PRIORITY FIX: More mobile spacing */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-10">
          {testimonials.map((testimonial, index) => (
            <article
              key={testimonial.id}
              className={`group relative pt-10 px-12 pb-12 lg:pt-12 lg:px-14 lg:pb-14 bg-white border-2 border-[var(--color-text-secondary)]/10 hover:border-[var(--color-accent)]/40 shadow-xl hover:shadow-2xl transition-all duration-700 card-hover rounded-sm ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-16'
              }`}
              style={{ transitionDelay: `${200 + index * 150}ms` }}
            >
              {/* Decorative top accent - THICKER */}
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[var(--color-accent)] via-[var(--color-accent-light)] to-transparent"></div>

              {/* Quote Icon with background */}
              <div className="relative mb-8 mt-4">
                <div className="absolute -top-2 -left-2 text-8xl text-[var(--color-accent)]/5 font-serif leading-none select-none">
                  &ldquo;
                </div>
                {/* Star Rating */}
                <div className="relative flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-amber-500 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>

              {/* Quote Text - LARGER */}
              <blockquote className="relative mb-12">
                <p className="text-[var(--color-text-secondary)] text-xl lg:text-2xl leading-relaxed font-light">
                  {testimonial.quote}
                </p>
              </blockquote>

              {/* Author Info - Enhanced */}
              <footer className="relative pt-8 border-t-2 border-[var(--color-text-secondary)]/10">
                <div className="flex items-start gap-4">
                  {/* Avatar placeholder with initials */}
                  <div className="flex-shrink-0 w-14 h-14 rounded-full bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-light)] flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </div>

                  <div className="flex-1">
                    <p className="font-bold text-[var(--color-text-primary)] text-xl mb-1 font-serif">
                      {testimonial.name}
                    </p>
                    <p className="text-[var(--color-text-secondary)] text-sm mb-1">
                      {testimonial.project}
                    </p>
                    <div className="flex items-center gap-2 text-[var(--color-accent)] text-sm font-medium">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {testimonial.location}
                    </div>
                  </div>
                </div>
              </footer>

              {/* Hover corner decoration */}
              <div className="absolute bottom-0 right-0 w-0 h-0 border-b-[40px] border-r-[40px] border-b-[var(--color-surface)] border-r-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </article>
          ))}
        </div>

        {/* Trust Signal - Enhanced */}
        <div
          className={`mt-24 lg:mt-32 text-center transition-all duration-1000 delay-800 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="max-w-3xl mx-auto p-12 lg:p-16 bg-gradient-to-br from-[var(--color-surface)] to-[var(--color-background)] border-2 border-[var(--color-text-secondary)]/10 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent"></div>

            <div className="relative">
              {/* Icon */}
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[var(--color-accent)]/10 mb-8">
                <svg className="w-10 h-10 text-[var(--color-accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>

              <p className="text-3xl lg:text-4xl text-[var(--color-text-primary)] font-bold mb-4 font-serif">
                Porodice koje se vraćaju generacijama
              </p>
              <p className="text-lg lg:text-xl text-[var(--color-text-secondary)] font-light leading-relaxed">
                Najveće priznanje je kada nam se klijenti ponovo javljaju.
                Više od 70% naših projekata dolazi od preporuka i ponavljajućih klijenata.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
