import { useEffect, useRef, useState } from 'react';

function TrustBar() {
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState({ years: 0, projects: 0, custom: 0 });
  const sectionRef = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          setIsVisible(true);
          hasAnimated.current = true;

          // Animated counter effect - NITPICK FIX: cubic-bezier easing
          const duration = 2000; // 2 seconds
          const steps = 60;
          const stepDuration = duration / steps;

          // Cubic-bezier easing function (ease-out)
          const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

          let currentStep = 0;
          const interval = setInterval(() => {
            currentStep++;
            const progress = easeOutCubic(currentStep / steps);

            setCounts({
              years: Math.floor(28 * progress),
              projects: Math.floor(500 * progress),
              custom: Math.floor(100 * progress),
            });

            if (currentStep >= steps) {
              clearInterval(interval);
              setCounts({ years: 28, projects: 500, custom: 100 });
            }
          }, stepDuration);

          return () => clearInterval(interval);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const stats = [
    {
      number: `${counts.years}+`,
      label: 'godina iskustva',
      description: 'Od 1996. gradimo poverenje',
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10"/>
          <polyline points="12 6 12 12 16 14"/>
        </svg>
      )
    },
    {
      number: `${counts.projects}+`,
      label: 'projekata',
      description: 'Zadovoljnih porodica širom Srbije',
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
      )
    },
    {
      number: `${counts.custom}%`,
      label: 'po meri',
      description: 'Svaki komad prilagođen vama',
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
          <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
          <line x1="12" y1="22.08" x2="12" y2="12"/>
        </svg>
      )
    }
  ];

  return (
    <section
      ref={sectionRef}
      className="relative bg-gradient-to-br from-[var(--color-surface)] to-[var(--color-background)] py-20 lg:py-32 overflow-hidden"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[var(--color-accent)] rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[var(--color-accent)] rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`group text-center transition-all duration-700 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              {/* Icon */}
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-[var(--color-accent)]/10 rounded-full blur-xl transform group-hover:scale-125 transition-transform duration-500"></div>
                  <div className="relative text-[var(--color-accent)] transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                    {stat.icon}
                  </div>
                </div>
              </div>

              {/* Number with animated underline */}
              <div className="relative inline-block mb-4">
                <div className="text-6xl lg:text-7xl font-bold text-[var(--color-accent)] tracking-tight">
                  {stat.number}
                </div>
                <div className={`h-1 bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent transition-all duration-1000 ${isVisible ? 'w-full opacity-100' : 'w-0 opacity-0'}`} style={{ transitionDelay: `${index * 200 + 400}ms` }}></div>
              </div>

              {/* Label */}
              <div className="text-xl lg:text-2xl font-semibold text-[var(--color-text-primary)] mb-3 uppercase tracking-wide">
                {stat.label}
              </div>

              {/* Description */}
              <p className="text-base lg:text-lg text-[var(--color-text-secondary)] leading-relaxed max-w-xs mx-auto">
                {stat.description}
              </p>
            </div>
          ))}
        </div>

        {/* Decorative separator */}
        <div
          className={`mt-20 flex justify-center transition-all duration-1000 delay-700 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-[var(--color-accent)]"></div>
            <div className="w-2 h-2 rounded-full bg-[var(--color-accent)]"></div>
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-[var(--color-accent)]"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TrustBar;
