import { useState } from 'react';

// Professional SVG icons for contact info - defined outside component to prevent recreation
const contactIcons = {
  phone: (
    <svg className="w-8 h-8 text-[var(--color-accent)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  ),
  email: (
    <svg className="w-8 h-8 text-[var(--color-accent)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  ),
  location: (
    <svg className="w-8 h-8 text-[var(--color-accent)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  clock: (
    <svg className="w-8 h-8 text-[var(--color-accent)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
};

// Contact information data - static, defined outside component
const contactInfo = [
  {
    icon: contactIcons.phone,
    label: 'Telefon',
    value: '+381 11 123 4567',
    link: 'tel:+381111234567'
  },
  {
    icon: contactIcons.email,
    label: 'Email',
    value: 'info@olimp.rs',
    link: 'mailto:info@olimp.rs'
  },
  {
    icon: contactIcons.location,
    label: 'Adresa',
    value: 'Beograd, Srbija',
    link: null
  },
  {
    icon: contactIcons.clock,
    label: 'Radno vreme',
    value: 'Pon-Pet: 08:00-17:00',
    link: null
  }
];

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

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

    // Simulate form submission
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

      // Clear success message after 5 seconds
      setTimeout(() => setSubmitMessage(''), 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-[var(--spacing-section-mobile)] lg:py-[var(--spacing-section)] bg-[var(--color-surface)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-[var(--color-text-primary)] mb-6">
            Kontaktirajte nas
          </h2>
          <div className="w-24 h-1 bg-[var(--color-accent)] mx-auto mb-8"></div>
          <p className="text-lg lg:text-xl text-[var(--color-text-secondary)] max-w-3xl mx-auto">
            Razgovarajmo o vašem projektu. Rado ćemo odgovoriti na sva vaša pitanja.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white p-8 lg:p-10 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-[var(--color-text-primary)] mb-6">
              Pošaljite upit
            </h3>

            {submitMessage && (
              <div className="mb-6 p-4 bg-[var(--color-accent)]/10 border border-[var(--color-accent)] text-[var(--color-accent)] rounded">
                {submitMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-[var(--color-text-primary)] font-medium mb-2">
                  Ime i prezime *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20 transition-colors"
                  placeholder="Vaše ime"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-[var(--color-text-primary)] font-medium mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20 transition-colors"
                  placeholder="vas@email.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-[var(--color-text-primary)] font-medium mb-2">
                  Telefon *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20 transition-colors"
                  placeholder="+381 11 123 4567"
                />
              </div>

              <div>
                <label htmlFor="projectType" className="block text-[var(--color-text-primary)] font-medium mb-2">
                  Tip projekta
                </label>
                <select
                  id="projectType"
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20 transition-colors"
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

              <div>
                <label htmlFor="message" className="block text-[var(--color-text-primary)] font-medium mb-2">
                  Poruka *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20 transition-colors resize-none"
                  placeholder="Opišite vaš projekat..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-4 bg-[var(--color-accent)] text-white font-semibold rounded-sm hover:bg-[var(--color-accent-hover)] transition-all transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isSubmitting ? 'Slanje...' : 'Pošalji upit'}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-2xl font-semibold text-[var(--color-text-primary)] mb-6">
              Informacije
            </h3>

            <div className="space-y-6 mb-8">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-start gap-4 animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="flex-shrink-0">{info.icon}</div>
                  <div>
                    <p className="font-semibold text-[var(--color-text-primary)] mb-1">
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
            <div className="bg-[var(--color-surface)] rounded-lg h-64 lg:h-80 flex items-center justify-center shadow-md border-2 border-[var(--color-text-secondary)]/20">
              <div className="text-center">
                <svg className="w-16 h-16 mx-auto mb-4 text-[var(--color-accent)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <p className="text-[var(--color-text-secondary)] text-lg font-semibold">
                  Mapa lokacije
                </p>
                <p className="text-[var(--color-text-secondary)] text-sm mt-2">
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
