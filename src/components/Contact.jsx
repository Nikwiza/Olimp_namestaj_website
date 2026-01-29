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
      value: (
        <div className="space-y-2">
          <div className="flex flex-col">
            <span className="text-sm text-[var(--color-text-secondary)]/70">Radionica:</span>
            <a href="tel:+381214567890" className="text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors text-lg font-medium">
              +381 21 456 789
            </a>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-[var(--color-text-secondary)]/70">Željko Stojanović:</span>
            <a href="tel:+381631234567" className="text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors text-lg font-medium">
              +381 63 123 456
            </a>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-[var(--color-text-secondary)]/70">Dejan Kerleta:</span>
            <a href="tel:+381647890123" className="text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors text-lg font-medium">
              +381 64 789 012
            </a>
          </div>
        </div>
      ),
      link: null
    },
    {
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      ),
      label: 'Email',
      value: 'olimp.namestaj@gmail.com',
      link: 'mailto:olimp.namestaj@gmail.com'
    },
    {
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      ),
      label: 'Adresa',
      value: 'Titleska 4, Novi Sad, Serbia',
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
      className="py-[var(--spacing-section-mobile)] lg:py-[var(--spacing-section)] bg-gradient-to-b from-[var(--color-surface)] to-[var(--color-background)] relative overflow-hidden"
    >
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute top-1/2 right-1/3 w-96 h-96 bg-[var(--color-accent)] rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header - Enhanced */}
        <div
          className={`text-center mb-28 lg:mb-36 max-w-4xl mx-auto transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="inline-block text-[var(--color-accent)] text-sm font-bold tracking-widest uppercase mb-6">
            Kontakt
          </span>
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-[var(--color-text-primary)] mb-10 tracking-tight font-serif">
            Razgovarajmo
          </h2>
          <p className="text-xl lg:text-2xl text-[var(--color-text-secondary)] max-w-3xl mx-auto leading-relaxed font-light">
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
            <div className="bg-white p-8 lg:p-10 shadow-xl border-2 border-[var(--color-text-secondary)]/10 rounded-none">
              <h3 className="text-3xl lg:text-4xl font-bold text-[var(--color-text-primary)] mb-10 font-serif">
                Pošaljite upit
              </h3>

              {submitMessage && (
                <div className="mb-10 p-6 bg-green-50 border-2 border-green-300 text-green-800 rounded-none font-semibold flex items-center gap-4 shadow-md animate-fade-in text-lg">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  {submitMessage}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-[var(--color-text-primary)] font-semibold mb-3 text-base">
                      Ime i prezime <span className="text-[var(--color-accent)]">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-[var(--color-background)] border-2 border-[var(--color-text-secondary)]/15 focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20 transition-all outline-none text-lg rounded-none"
                      placeholder="Vaše ime"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-[var(--color-text-primary)] font-semibold mb-3 text-base">
                      Email <span className="text-[var(--color-accent)]">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-[var(--color-background)] border-2 border-[var(--color-text-secondary)]/15 focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20 transition-all outline-none text-lg rounded-none"
                      placeholder="vas@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-[var(--color-text-primary)] font-semibold mb-3 text-base">
                      Telefon
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[var(--color-background)] border-2 border-[var(--color-text-secondary)]/15 focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20 transition-all outline-none text-lg rounded-none"
                      placeholder="+381 63 123 456"
                    />
                  </div>
                  <div>
                    <label htmlFor="projectType" className="block text-[var(--color-text-primary)] font-semibold mb-3 text-base">
                      Tip projekta
                    </label>
                    <select
                      id="projectType"
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[var(--color-background)] border-2 border-[var(--color-text-secondary)]/15 focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20 transition-all outline-none text-lg rounded-none"
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
                  <label htmlFor="message" className="block text-[var(--color-text-primary)] font-semibold mb-3 text-base">
                    Poruka <span className="text-[var(--color-accent)]">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    className="w-full px-4 py-3 bg-[var(--color-background)] border-2 border-[var(--color-text-secondary)]/15 focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20 transition-all outline-none resize-none text-lg rounded-none"
                    placeholder="Opišite vaš projekat..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary group relative w-full px-8 py-4 bg-[var(--color-accent)] text-white font-bold text-xl hover:bg-[var(--color-accent-hover)] transition-all duration-400 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed shadow-xl hover:shadow-2xl overflow-hidden rounded-none hover:-translate-y-1"
                >
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin w-6 h-6" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Slanje...
                      </>
                    ) : (
                      <>
                        Pošalji upit
                        <svg className="w-6 h-6 transition-transform group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </>
                    )}
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-[var(--color-accent-hover)] to-[var(--color-accent)] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
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
            <div className="bg-white p-8 lg:p-10 shadow-xl border-2 border-[var(--color-text-secondary)]/10 h-full flex flex-col rounded-none">
              <h3 className="text-3xl lg:text-4xl font-bold text-[var(--color-text-primary)] mb-10 font-serif">
                Informacije
              </h3>

              <div className="space-y-10 mb-14 flex-1">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start gap-5 group">
                    <div className="flex-shrink-0 w-14 h-14 rounded-full bg-[var(--color-accent)]/10 flex items-center justify-center text-[var(--color-accent)] group-hover:bg-[var(--color-accent)] group-hover:text-white transition-all duration-400">
                      {info.icon}
                    </div>
                    <div>
                      <p className="font-bold text-[var(--color-text-primary)] mb-2 text-lg">
                        {info.label}
                      </p>
                      {info.link ? (
                        <a
                          href={info.link}
                          className="text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors text-lg font-medium"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <div className="text-[var(--color-text-secondary)] text-lg">{info.value}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Real Google Maps Embed */}
              <div className="h-72 border-2 border-[var(--color-text-secondary)]/10 shadow-inner rounded-none overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2809.986!2d19.8335496!3d45.2671352!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475b10a0c1a7e5e5%3A0x1c5e17a5f4f5c5e5!2sTitleska%204%2C%20Novi%20Sad!5e0!3m2!1sen!2srs!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Olimp Lokacija - Titleska 4, Novi Sad, Serbia"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
