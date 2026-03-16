import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Building, Landmark, Hotel, ShoppingBag, Factory, Plane, Briefcase, Hospital } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const clients = [
  { name: 'Metro Financial', icon: Building },
  { name: 'City University', icon: Landmark },
  { name: 'Grand Hotel', icon: Hotel },
  { name: 'RetailMax', icon: ShoppingBag },
  { name: 'Industrial Corp', icon: Factory },
  { name: 'AirLink', icon: Plane },
  { name: 'Corp Towers', icon: Briefcase },
  { name: 'MedCare', icon: Hospital },
];

export function TrustedBy() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const grid = gridRef.current;

    if (!section || !headline || !grid) return;

    const logoCells = grid.querySelectorAll('.logo-cell');

    const ctx = gsap.context(() => {
      gsap.from(headline, {
        opacity: 0,
        y: -20,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      });

      gsap.from(logoCells, {
        opacity: 0,
        y: 20,
        duration: 0.4,
        stagger: 0.05,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: grid,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-20 sm:py-32 lg:py-48 z-80 bg-navy-900"
    >
      <div className="w-full px-4 sm:px-6 lg:px-[6vw]">
        {/* Headline */}
        <div ref={headlineRef} className="text-center mb-16 lg:mb-24">
          <h2 className="font-heading font-bold text-2xl sm:text-3xl lg:text-5xl text-foreground leading-tight mb-4 sm:mb-6">
            Trusted by organizations that never sleep.
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
            Trusted by organizations that never sleep. Our security services protect businesses, communities, and facilities that require round-the-clock safety. With trained guards, constant vigilance, and rapid response, we ensure people, property, and assets remain secure 24/7—providing peace of mind at every hour. 🛡️🔒
          </p>
        </div>
        

        {/* Logo grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 max-w-5xl mx-auto"
        >
          {clients.map((client) => (
            <div
              key={client.name}
              className="logo-cell flex flex-col items-center justify-center p-4 sm:p-6 bg-card/20 border border-white/5 rounded-lg hover:border-cyan/20 hover:bg-card/40 transition-all duration-300"
            >
              <client.icon className="w-6 h-6 sm:w-8 sm:h-8 text-muted-foreground mb-2 sm:mb-3" />
              <span className="text-xs text-muted-foreground text-center">
                {client.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
