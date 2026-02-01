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
        <svg className="w-10 h-10" viewBox="0 0 24 24" fill="currentColor">
          <path d="M9.00065 3C5.68694 3 3.00065 5.68629 3.00065 9V9.35115C1.47959 10.0975 0.633328 11.916 1.2667 13.6578L1.5792 14.5172C1.85802 15.2839 2.00065 16.0935 2.00065 16.9094V19.5C2.00065 20.3284 2.67222 21 3.50065 21H20.5006C21.3291 21 22.0006 20.3284 22.0006 19.5V16.9094C22.0006 16.0935 22.1433 15.2839 22.4221 14.5172L22.7346 13.6578C23.368 11.916 22.5217 10.0975 21.0006 9.35115V9C21.0006 5.68629 18.3144 3 15.0006 3H9.00065ZM19.0006 9.03175C17.3064 9.2618 16.0006 10.7141 16.0006 12.4715L16.0006 14H8.00065V12.4715C8.00065 10.7141 6.69488 9.2618 5.00065 9.03175V9C5.00065 6.79086 6.79151 5 9.00065 5H15.0006C17.2098 5 19.0006 6.79086 19.0006 9V9.03175ZM16.0006 16L16.0006 17H18.0006V12.4715C18.0006 11.6588 18.6595 11 19.4721 11C20.4933 11 21.204 12.0147 20.855 12.9743L20.5425 13.8337C20.184 14.8195 20.0006 15.8604 20.0006 16.9094V19H4.00065V16.9094C4.00065 15.8604 3.81727 14.8195 3.45879 13.8337L3.14629 12.9743C2.79732 12.0147 3.50802 11 4.52917 11C5.34185 11 6.00065 11.6588 6.00065 12.4715V17H8.00065V16H16.0006Z"></path>
        </svg>
      )
    },
    {
      title: 'Spavaće sobe',
      description: 'Kreveti, ormari i komode koji stvaraju prostor za harmoničan odmor.',
      icon: (
        <svg className="w-10 h-10" viewBox="0 0 512 512" fill="none" stroke="currentColor" strokeWidth="32" strokeLinecap="round" strokeLinejoin="round">
          <path d="M384 240H96V136a40.12 40.12 0 0 1 40-40h240a40.12 40.12 0 0 1 40 40v104z" />
          <path d="M48 416V304a64.19 64.19 0 0 1 64-64h288a64.19 64.19 0 0 1 64 64v112" />
          <path d="M48 416v-8a24.07 24.07 0 0 1 24-24h368a24.07 24.07 0 0 1 24 24v8" />
          <path d="M112 240v-16a32.09 32.09 0 0 1 32-32h80a32.09 32.09 0 0 1 32 32v16" />
          <path d="M256 240v-16a32.09 32.09 0 0 1 32-32h80a32.09 32.09 0 0 1 32 32v16" />
        </svg>
      )
    },
    {
      title: 'Kupatilski nameštaj',
      description: 'Elegantni kupatilski ormarići i lavaboi prilagođeni prostoru i funkcionalnosti.',
      icon: (
        <svg className="w-10 h-10" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8 14c0-.55.45-1 1-1s1 .45 1 1-.45 1-1 1-1-.45-1-1zm4 1c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1zm3 0c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1zm-3-7.5c-1.76 0-3.22 1.31-3.46 3h6.93a3.52 3.52 0 0 0-3.47-3M12 6c2.76 0 5 2.24 5 5v1H7v-1c0-2.76 2.24-5 5-5zM9 18c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1zm3 0c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1zm3 0c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1zm5-14H4v16h16V4m0-2c1.1 0 2 .9 2 2v16c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h16z" />
        </svg>
      )
    },
    {
      title: 'Komode',
      description: 'Prostrane i funkcionalne komode sa elegantnim fiokama za organizaciju.',
      icon: (
        <svg className="w-10 h-10" viewBox="0 0 256 256" fill="currentColor">
          <path d="M142,192a6,6,0,0,1-6,6H120a6,6,0,0,1,0-12h16A6,6,0,0,1,142,192ZM120,70h16a6,6,0,0,0,0-12H120a6,6,0,0,0,0,12Zm16,52H120a6,6,0,0,0,0,12h16a6,6,0,0,0,0-12Zm78-82V216a14,14,0,0,1-14,14H56a14,14,0,0,1-14-14V40A14,14,0,0,1,56,26H200A14,14,0,0,1,214,40ZM54,154H202V102H54ZM54,40V90H202V40a2,2,0,0,0-2-2H56A2,2,0,0,0,54,40ZM202,216V166H54v50a2,2,0,0,0,2,2H200A2,2,0,0,0,202,216Z" />
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
            Šta radimo?
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
