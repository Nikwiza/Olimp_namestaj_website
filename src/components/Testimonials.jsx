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
      location: 'Beograd'
    },
    {
      id: 2,
      quote: 'Profesionalnost i posvećenost tima su nas oduševili. Od prvog sastanka do finalne montaže, sve je teklo glatko. Preporuka svima koji traže kvalitet.',
      name: 'Petar Nikolić',
      project: 'Kompletno opremanje stana',
      location: 'Novi Sad'
    },
    {
      id: 3,
      quote: 'Radili smo sa više stolarskih radnji, ali Olimp je poseban. Njihovo iskustvo se vidi u svakom savjetu. Četvrti smo put da naručujemo nameštaj kod njih.',
      name: 'Jelena Đorđević',
      project: 'Spavaća soba i garderober',
      location: 'Kragujevac'
    }
  ];

  return (
    <section
      id="testimonials"
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
            Utisci
          </span>
          <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-[var(--color-text-primary)] mb-6 tracking-tight">
            Šta kažu klijenti
          </h2>
          <p className="text-lg lg:text-xl text-[var(--color-text-secondary)] max-w-2xl mx-auto leading-relaxed">
            Naši klijenti postaju naši prijatelji
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
          {testimonials.map((testimonial, index) => (
            <article
              key={testimonial.id}
              className={`relative p-8 lg:p-10 bg-[var(--color-surface)] transition-all duration-700 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${200 + index * 150}ms` }}
            >
              {/* Quote Icon */}
              <div className="text-6xl text-[var(--color-accent)]/20 font-serif leading-none mb-6">
                &ldquo;
              </div>

              {/* Quote Text */}
              <blockquote className="mb-8">
                <p className="text-[var(--color-text-secondary)] text-base lg:text-lg leading-relaxed">
                  {testimonial.quote}
                </p>
              </blockquote>

              {/* Author Info */}
              <footer className="pt-6 border-t border-[var(--color-text-secondary)]/10">
                <p className="font-semibold text-[var(--color-text-primary)] text-lg mb-1">
                  {testimonial.name}
                </p>
                <p className="text-[var(--color-text-secondary)] text-sm">
                  {testimonial.project}
                </p>
                <p className="text-[var(--color-accent)] text-sm mt-1 font-medium">
                  {testimonial.location}
                </p>
              </footer>
            </article>
          ))}
        </div>

        {/* Trust Signal */}
        <div
          className={`mt-20 text-center transition-all duration-1000 delay-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-xl lg:text-2xl text-[var(--color-text-primary)] font-semibold mb-3">
            Porodice koje se vraćaju generacijama
          </p>
          <p className="text-base lg:text-lg text-[var(--color-text-secondary)]">
            Najveće priznanje je kada nam se klijenti ponovo javljaju
          </p>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
