import useLenis from './hooks/useLenis';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import AboutSplit from './components/AboutSplit';
import Services from './components/Services';
import Results from './components/Results';
import Process from './components/Process';
import Testimonials from './components/Testimonials';
import CTA from './components/CTA';
import Footer from './components/Footer';

export default function App() {
  useLenis();

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <AboutSplit />
        <Services />
        <Results />
        <Process />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
