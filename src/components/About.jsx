function About() {
  // SVG icon components for professional look
  const icons = {
    kitchen: (
      <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M9 3v18" />
      </svg>
    ),
    closet: (
      <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="4" y="2" width="16" height="20" rx="2" />
        <path d="M12 2v20M10 11h1M13 11h1" />
      </svg>
    ),
    living: (
      <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v3" />
        <path d="M2 11v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
        <path d="M6 11V9M18 11V9" />
      </svg>
    ),
    bedroom: (
      <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 20v-8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8" />
        <path d="M3 12V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6" />
        <path d="M3 12h18" />
      </svg>
    ),
    door: (
      <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="6" y="2" width="12" height="20" rx="1" />
        <circle cx="15" cy="12" r="1" fill="currentColor" />
      </svg>
    ),
    entry: (
      <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
        <circle cx="14" cy="12" r="1" fill="currentColor" />
        <path d="M9 12h3" />
      </svg>
    ),
  };

  const services = [
    {
      title: 'Kuhinje',
      description: 'Funkcionalne i elegantne kuhinje prilagođene vašem prostoru i stilu života.',
      icon: icons.kitchen
    },
    {
      title: 'Plakari',
      description: 'Organizaciona rešenja koja maksimalno iskorišćavaju svaki centimetar prostora.',
      icon: icons.closet
    },
    {
      title: 'Dnevne sobe',
      description: 'Nameštaj za dnevne boravke koji spaja udobnost, funkcionalnost i estetiku.',
      icon: icons.living
    },
    {
      title: 'Spavaće sobe',
      description: 'Kreveti, ormari i komode koji stvaraju harmoničan prostor za odmor.',
      icon: icons.bedroom
    },
    {
      title: 'Unutrašnja stolarija',
      description: 'Vrata, okviri i lamperija koji dopunjuju karakter vašeg doma.',
      icon: icons.door
    },
    {
      title: 'Vrata',
      description: 'Ulazna i unutrašnja vrata izrađena od kvalitetnih materijala.',
      icon: icons.entry
    }
  ];

  return (
    <section id="about" className="py-[var(--spacing-section-mobile)] lg:py-[var(--spacing-section)] bg-[var(--color-background)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Company Story */}
        <div className="max-w-4xl mx-auto text-center mb-20">
          <h2 className="text-4xl lg:text-5xl font-bold text-[var(--color-text-primary)] mb-6">
            O nama
          </h2>
          <div className="w-24 h-1 bg-[var(--color-accent)] mx-auto mb-8"></div>
          <p className="text-lg lg:text-xl text-[var(--color-text-secondary)] leading-relaxed mb-6">
            Olimp je osnovan 1996. godine u Srbiji, u vremenu kada je kvalitet majstorije značio sve.
            Ono što je počelo kao mala porodična radionica, izraslo je u pouzdano ime u srpskoj stolariji—ne kroz agresivnu ekspanziju,
            već kroz nepokolebljivu posvećenost kvalitetu.
          </p>
          <p className="text-lg lg:text-xl text-[var(--color-text-secondary)] leading-relaxed">
            Kroz 28 godina rada, svaki komad nameštaja nosi decenijska iskustva, tradiciju i poverenje naših klijenata.
            Naš biznis raste preporukama—zadovoljni kupci postaju naši ambasadori.
          </p>
        </div>

        {/* Services Grid */}
        <div className="mb-12">
          <h3 className="text-3xl lg:text-4xl font-bold text-[var(--color-text-primary)] text-center mb-12">
            Naše usluge
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-[var(--color-accent)] mb-4">{service.icon}</div>
                <h4 className="text-2xl font-semibold text-[var(--color-text-primary)] mb-3">
                  {service.title}
                </h4>
                <p className="text-[var(--color-text-secondary)] leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
