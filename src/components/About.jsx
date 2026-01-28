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
      description: 'Funkcionalne i elegantne kuhinje prilagođene vašem prostoru i stilu života.',
      icon: (
        <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M3 9h18M9 3v18" />
        </svg>
      )
    },
    {
      title: 'Plakari',
      description: 'Organizaciona rešenja koja maksimalno koriste prostor i olakšavaju svakodnevni život.',
      icon: (
        <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="4" y="2" width="16" height="20" rx="2" />
          <path d="M12 2v20M10 11h1M13 11h1" />
        </svg>
      )
    },
    {
      title: 'Dnevne sobe',
      description: 'Nameštaj koji spaja udobnost i estetiku za srce vašeg doma.',
      icon: (
        <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M20 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v3" />
          <path d="M2 11v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
        </svg>
      )
    },
    {
      title: 'Spavaće sobe',
      description: 'Kreveti, ormari i komode koji stvaraju prostor za harmoničan odmor.',
      icon: (
        <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M3 20v-8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8" />
          <path d="M3 12V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6" />
        </svg>
      )
    },
    {
      title: 'Stolarija',
      description: 'Vrata i okviri koji dopunjuju karakter doma pažljivo odabranim detaljima.',
      icon: (
        <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="6" y="2" width="12" height="20" rx="1" />
          <circle cx="15" cy="12" r="1" fill="currentColor" />
        </svg>
      )
    },
    {
      title: 'Vrata',
      description: 'Ulazna i unutrašnja vrata izrađena od kvalitetnih materijala.',
      icon: (
        <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
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
      className="py-[var(--spacing-section-mobile)] lg:py-[var(--spacing-section)] bg-gradient-to-b from-[var(--color-surface)] to-[var(--color-background)] relative overflow-hidden"
    >
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-[var(--color-accent)] rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Company Story - Enhanced */}
        <div
          className={`max-w-4xl mx-auto text-center mb-28 lg:mb-36 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="inline-block text-[var(--color-accent)] text-sm font-bold tracking-widest uppercase mb-6">
            O nama
          </span>
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-[var(--color-text-primary)] mb-12 tracking-tight font-serif">
            Priča od <span className="text-[var(--color-accent)] relative inline-block">1996.
              <svg className="absolute -bottom-3 left-0 w-full h-3 text-[var(--color-accent)] opacity-20" preserveAspectRatio="none" viewBox="0 0 100 10">
                <path d="M0 8 Q 50 0, 100 8" stroke="currentColor" fill="none" strokeWidth="2"/>
              </svg>
            </span>
          </h2>
          <div className="space-y-12 text-2xl lg:text-3xl text-[var(--color-text-secondary)] leading-relaxed font-light">
            <p>
              <strong className="text-[var(--color-text-primary)] font-semibold">Srpska stolarska majstorija</strong> osnovana u vremenu kada je kvalitet značio sve.
              Ono što je počelo kao mala porodična radionica 1996. godine, izraslo je u pouzdano ime
              —ne kroz agresivnu ekspanziju, već kroz nepokolebljivu posvećenost kvalitetu.
            </p>
            <p>
              Naš biznis raste preporukama. <strong className="text-[var(--color-text-primary)] font-semibold">Zadovoljni kupci postaju naši ambasadori</strong>,
              a njihove porodice se vraćaju generacijama. Svaki komad nameštaja nosi pečat srpske tradicije i moderne preciznosti.
            </p>
          </div>
        </div>

        {/* Services Header */}
        <div
          className={`text-center mb-28 lg:mb-36 max-w-4xl mx-auto transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h3 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-[var(--color-text-primary)] tracking-tight mb-6 font-serif">
            Šta radimo
          </h3>
          <p className="text-xl lg:text-2xl text-[var(--color-text-secondary)] font-light">
            Prilagođena rešenja za svaki prostor u vašem domu
          </p>
        </div>

        {/* Services Grid - Enhanced Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {services.map((service, index) => (
            <div
              key={index}
              className={`group relative p-8 lg:p-10 bg-white border-2 border-[var(--color-text-secondary)]/10 hover:border-[var(--color-accent)]/40 transition-all duration-700 card-hover ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${400 + index * 100}ms` }}
            >
              {/* Decorative corner */}
              <div className="absolute top-0 right-0 w-0 h-0 border-t-[30px] border-r-[30px] border-t-[var(--color-surface)] border-r-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Icon with glow effect */}
              <div className="relative mb-8">
                <div className="absolute inset-0 bg-[var(--color-accent)]/10 rounded-full blur-xl transform group-hover:scale-150 transition-transform duration-700"></div>
                <div className="relative text-[var(--color-accent)] transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-2">
                  {service.icon}
                </div>
              </div>

              {/* Content */}
              <h4 className="text-2xl font-bold text-[var(--color-text-primary)] mb-4 font-serif group-hover:text-[var(--color-accent)] transition-colors duration-500">
                {service.title}
              </h4>
              <p className="text-[var(--color-text-secondary)] leading-relaxed text-lg font-light">
                {service.description}
              </p>

              {/* Hover indicator */}
              <div className="absolute bottom-0 left-0 w-0 h-1 bg-[var(--color-accent)] group-hover:w-full transition-all duration-700"></div>
            </div>
          ))}
        </div>

        {/* Closing statement */}
        <div
          className={`mt-24 lg:mt-32 text-center max-w-3xl mx-auto transition-all duration-1000 delay-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[var(--color-accent)]/10 mb-6">
            <svg className="w-8 h-8 text-[var(--color-accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="text-2xl lg:text-3xl text-[var(--color-text-primary)] font-semibold mb-4 font-serif">
            Kvalitet koji traje generacijama
          </p>
          <p className="text-lg lg:text-xl text-[var(--color-text-secondary)] font-light">
            Svaki komad nameštaja koji napravimo nosi pečat naših 28+ godina iskustva
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;
