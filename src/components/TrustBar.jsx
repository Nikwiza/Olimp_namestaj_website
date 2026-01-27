import { useEffect, useRef, useState } from 'react';

function TrustBar() {
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
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const stats = [
    {
      number: '28+',
      label: 'godina iskustva',
      description: 'Od 1996. gradimo poverenje'
    },
    {
      number: '500+',
      label: 'projekata',
      description: 'Zadovoljnih porodica širom Srbije'
    },
    {
      number: '100%',
      label: 'po meri',
      description: 'Svaki komad prilagođen vama'
    }
  ];

  return (
    <section
      ref={sectionRef}
      className="bg-[var(--color-surface)] py-16 lg:py-24 border-y border-[var(--color-text-secondary)]/10"
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`text-center transition-all duration-700 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="text-5xl lg:text-6xl font-bold text-[var(--color-accent)] mb-3 tracking-tight">
                {stat.number}
              </div>
              <div className="text-lg lg:text-xl font-semibold text-[var(--color-text-primary)] mb-2">
                {stat.label}
              </div>
              <p className="text-sm lg:text-base text-[var(--color-text-secondary)]">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TrustBar;
