function TrustBar() {
  const stats = [
    {
      number: '28+',
      label: 'godina iskustva',
      description: 'Od 1996. gradimo poverenje kroz kvalitet'
    },
    {
      number: '500+',
      label: 'zadovoljnih klijenata',
      description: 'Preporuke koje govore o našem radu'
    },
    {
      number: '100%',
      label: 'po meri',
      description: 'Svaki komad prilagođen vašim potrebama'
    }
  ];

  return (
    <section className="bg-[var(--color-surface)] py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-5xl lg:text-6xl font-bold text-[var(--color-accent)] mb-2">
                {stat.number}
              </div>
              <div className="text-xl lg:text-2xl font-semibold text-[var(--color-text-primary)] mb-2">
                {stat.label}
              </div>
              <p className="text-base text-[var(--color-text-secondary)]">
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
