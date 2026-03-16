import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navigation } from '@/components/Navigation';
import { GridOverlay } from '@/components/GridOverlay';
import { Hero } from '@/sections/Hero';
import { WhoWeAre } from '@/sections/WhoWeAre';
import { Services } from '@/sections/Services';
import { WhyAAA } from '@/sections/WhyAAA';
import { RapidResponse } from '@/sections/RapidResponse';
import { Stats } from '@/sections/Stats';
import { Industries } from '@/sections/Industries';
import { TrustedBy } from '@/sections/TrustedBy';
import { Contact } from '@/sections/Contact';
import { Footer } from '@/sections/Footer';

gsap.registerPlugin(ScrollTrigger);

function App() {
  // Cleanup all ScrollTriggers on unmount
  useEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-navy-900">
      {/* Grid overlay - persistent */}
      <GridOverlay />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Main content */}
      <main className="relative">
        <Hero />
        <WhoWeAre />
        <Services />
        <WhyAAA />
        <RapidResponse />
        <Stats />
        <Industries />
        <TrustedBy />
        <Contact />
        <Footer />
      </main>
    </div>
  );
}

export default App;
