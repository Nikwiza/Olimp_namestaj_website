import { useEffect, useRef, useState } from 'react';

function About() {
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

  const services = [
    {
      title: 'Kuhinje',
      description: 'Funkcionalne i elegantne kuhinje prilagođene vašem prostoru.',
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M3 9h18M9 3v18" />
        </svg>
      )
    },
    {
      title: 'Plakari',
      description: 'Organizaciona rešenja koja maksimalno koriste prostor.',
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="4" y="2" width="16" height="20" rx="2" />
          <path d="M12 2v20M10 11h1M13 11h1" />
        </svg>
      )
    },
    {
      title: 'Dnevne sobe',
      description: 'Nameštaj koji spaja udobnost i estetiku.',
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M20 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v3" />
          <path d="M2 11v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
        </svg>
      )
    },
    {
      title: 'Spavaće sobe',
      description: 'Kreveti, ormari i komode za harmoničan odmor.',
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M3 20v-8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8" />
          <path d="M3 12V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6" />
        </svg>
      )
    },
    {
      title: 'Stolarija',
      description: 'Vrata i okviri koji dopunjuju karakter doma.',
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="6" y="2" width="12" height="20" rx="1" />
          <circle cx="15" cy="12" r="1" fill="currentColor" />
        </svg>
      )
    },
    {
      title: 'Vrata',
      description: 'Ulazna i unutrašnja vrata od kvalitetnih materijala.',
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
          <circle cx="14" cy="12" r="1" fill="currentColor" />
        </svg>
      )
    },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-[var(--spacing-section-mobile)] lg:py-[var(--spacing-section)] bg-[var(--color-surface)]"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Company Story */}
        <div
          className={`max-w-3xl mx-auto text-center mb-20 lg:mb-28 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="inline-block text-[var(--color-accent)] text-sm font-semibold tracking-widest uppercase mb-4">
            O nama
          </span>
          <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-[var(--color-text-primary)] mb-8 tracking-tight">
            Priča od 1996.
          </h2>
          <p className="text-lg lg:text-xl text-[var(--color-text-secondary)] leading-relaxed mb-6">
            Olimp je osnovan u vremenu kada je kvalitet majstorije značio sve.
            Ono što je počelo kao mala porodična radionica, izraslo je u pouzdano ime
            u srpskoj stolariji—ne kroz agresivnu ekspanziju, već kroz nepokolebljivu
            posvećenost kvalitetu.
          </p>
          <p className="text-lg lg:text-xl text-[var(--color-text-secondary)] leading-relaxed">
            Naš biznis raste preporukama. Zadovoljni kupci postaju naši ambasadori,
            a njihove porodice se vraćaju generacijama.
          </p>
        </div>

        {/* Services Header */}
        <div
          className={`text-center mb-12 lg:mb-16 transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h3 className="text-2xl lg:text-3xl font-bold text-[var(--color-text-primary)] tracking-tight">
            Šta radimo
          </h3>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className={`group p-8 lg:p-10 bg-[var(--color-background)] border border-[var(--color-text-secondary)]/10 hover:border-[var(--color-accent)]/30 transition-all duration-500 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${300 + index * 100}ms` }}
            >
              <div className="text-[var(--color-accent)] mb-6 transition-transform duration-300 group-hover:scale-110">
                {service.icon}
              </div>
              <h4 className="text-xl font-semibold text-[var(--color-text-primary)] mb-3">
                {service.title}
              </h4>
              <p className="text-[var(--color-text-secondary)] leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default About;
