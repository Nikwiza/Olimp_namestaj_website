function Testimonials() {
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
      quote: 'Profesionalnost i posvećenost tima su nas oduševili. Od prvog sastanka do finalne montaže, sve je teklo glatko. Preporuka svima koji traže kvalitet i pouzdanost.',
      name: 'Petar Nikolić',
      project: 'Kompletno opremanje stana',
      location: 'Novi Sad'
    },
    {
      id: 3,
      quote: 'Radili smo sa više stolarskih radnji, ali Olimp je poseban. Njihovo iskustvo se vidi u svakom savjetu i rešenju. Četvrti smo put da naručujemo nameštaj kod njih.',
      name: 'Jelena Đorđević',
      project: 'Spavaća soba i garderober',
      location: 'Kragujevac'
    }
  ];

  return (
    <section id="testimonials" className="py-[var(--spacing-section-mobile)] lg:py-[var(--spacing-section)] bg-[var(--color-background)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-[var(--color-text-primary)] mb-6">
            Utisci klijenata
          </h2>
          <div className="w-24 h-1 bg-[var(--color-accent)] mx-auto mb-8"></div>
          <p className="text-lg lg:text-xl text-[var(--color-text-secondary)] max-w-3xl mx-auto">
            Naši klijenti postaju naši prijatelji. Evo šta kažu o saradnji sa nama.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <article
              key={testimonial.id}
              className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <blockquote>
                {/* Quote Icon */}
                <div className="text-5xl text-[var(--color-accent)] mb-4 leading-none" aria-hidden="true">&ldquo;</div>

                {/* Quote Text */}
                <p className="text-[var(--color-text-secondary)] text-base lg:text-lg leading-relaxed mb-6 italic">
                  {testimonial.quote}
                </p>

                {/* Author Info */}
                <footer className="border-t border-[var(--color-text-secondary)]/20 pt-4">
                  <cite className="not-italic">
                    <p className="font-semibold text-[var(--color-text-primary)] text-lg mb-1">
                      {testimonial.name}
                    </p>
                    <p className="text-[var(--color-text-secondary)] text-sm">
                      {testimonial.project}
                    </p>
                    <p className="text-[var(--color-accent)] text-sm mt-1">
                      {testimonial.location}
                    </p>
                  </cite>
                </footer>
              </blockquote>
            </article>
          ))}
        </div>

        {/* Trust Signal */}
        <div className="mt-16 text-center">
          <p className="text-xl lg:text-2xl text-[var(--color-text-primary)] font-semibold mb-2">
            Porodice koje se vraćaju generacijama
          </p>
          <p className="text-lg text-[var(--color-text-secondary)]">
            Najveće priznanje je kada nam se klijenti ponovo javljaju
          </p>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
