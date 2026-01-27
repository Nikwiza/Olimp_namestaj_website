import Header from './components/Header';
import Hero from './components/Hero';
import TrustBar from './components/TrustBar';
import About from './components/About';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <TrustBar />
        <Gallery />
        <About />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
