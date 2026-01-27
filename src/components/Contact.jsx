import { useState, useEffect, useRef } from 'react';

function Contact() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setSubmitMessage('Hvala vam! Javićemo vam se uskoro.');
      setIsSubmitting(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        projectType: '',
        message: ''
      });
      setTimeout(() => setSubmitMessage(''), 5000);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      ),
      label: 'Telefon',
      value: '+381 11 123 4567',
      link: 'tel:+381111234567'
    },
    {
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      ),
      label: 'Email',
      value: 'info@olimp.rs',
      link: 'mailto:info@olimp.rs'
    },
    {
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      ),
      label: 'Adresa',
      value: 'Beograd, Srbija',
      link: null
    },
    {
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
      label: 'Radno vreme',
      value: 'Pon-Pet: 08:00-17:00',
      link: null
    }
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-[var(--spacing-section-mobile)] lg:py-[var(--spacing-section)] bg-[var(--color-surface)]"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`text-center mb-16 lg:mb-20 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="inline-block text-[var(--color-accent)] text-sm font-semibold tracking-widest uppercase mb-4">
            Kontakt
          </span>
          <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-[var(--color-text-primary)] mb-6 tracking-tight">
            Razgovarajmo
          </h2>
          <p className="text-lg lg:text-xl text-[var(--color-text-secondary)] max-w-2xl mx-auto leading-relaxed">
            Rado ćemo odgovoriti na sva vaša pitanja
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Contact Form - Takes 3 columns */}
          <div
            className={`lg:col-span-3 transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="bg-[var(--color-background)] p-8 lg:p-12">
              <h3 className="text-2xl font-semibold text-[var(--color-text-primary)] mb-8">
                Pošaljite upit
              </h3>

              {submitMessage && (
                <div className="mb-8 p-4 bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/30 text-[var(--color-accent)] rounded font-medium">
                  {submitMessage}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-[var(--color-text-primary)] font-medium mb-2 text-sm">
                      Ime i prezime
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white border border-[var(--color-text-secondary)]/20 focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] transition-colors outline-none"
                      placeholder="Vaše ime"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-[var(--color-text-primary)] font-medium mb-2 text-sm">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white border border-[var(--color-text-secondary)]/20 focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] transition-colors outline-none"
                      placeholder="vas@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-[var(--color-text-primary)] font-medium mb-2 text-sm">
                      Telefon
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white border border-[var(--color-text-secondary)]/20 focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] transition-colors outline-none"
                      placeholder="+381 11 123 4567"
                    />
                  </div>
                  <div>
                    <label htmlFor="projectType" className="block text-[var(--color-text-primary)] font-medium mb-2 text-sm">
                      Tip projekta
                    </label>
                    <select
                      id="projectType"
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white border border-[var(--color-text-secondary)]/20 focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] transition-colors outline-none"
                    >
                      <option value="">Izaberite...</option>
                      <option value="kuhinja">Kuhinja</option>
                      <option value="plakar">Plakar</option>
                      <option value="dnevna">Dnevna soba</option>
                      <option value="spavaca">Spavaća soba</option>
                      <option value="stolarija">Unutrašnja stolarija</option>
                      <option value="vrata">Vrata</option>
                      <option value="ostalo">Ostalo</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-[var(--color-text-primary)] font-medium mb-2 text-sm">
                    Poruka
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    className="w-full px-4 py-3 bg-white border border-[var(--color-text-secondary)]/20 focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] transition-colors outline-none resize-none"
                    placeholder="Opišite vaš projekat..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-8 py-4 bg-[var(--color-accent)] text-white font-semibold hover:bg-[var(--color-accent-hover)] transition-all duration-300 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Slanje...' : 'Pošalji upit'}
                </button>
              </form>
            </div>
          </div>

          {/* Contact Information - Takes 2 columns */}
          <div
            className={`lg:col-span-2 transition-all duration-1000 delay-400 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <h3 className="text-2xl font-semibold text-[var(--color-text-primary)] mb-8">
              Informacije
            </h3>

            <div className="space-y-8 mb-12">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex-shrink-0 text-[var(--color-accent)]">
                    {info.icon}
                  </div>
                  <div>
                    <p className="font-medium text-[var(--color-text-primary)] mb-1">
                      {info.label}
                    </p>
                    {info.link ? (
                      <a
                        href={info.link}
                        className="text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-[var(--color-text-secondary)]">{info.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Map Placeholder */}
            <div className="bg-[var(--color-background)] h-64 flex items-center justify-center border border-[var(--color-text-secondary)]/10">
              <div className="text-center">
                <svg className="w-12 h-12 mx-auto mb-3 text-[var(--color-accent)]/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <p className="text-[var(--color-text-secondary)] font-medium">
                  Beograd, Srbija
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
