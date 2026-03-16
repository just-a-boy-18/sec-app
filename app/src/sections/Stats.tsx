import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { StatCard } from '@/components/StatCard';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: '500+', label: 'Guards & Officers' },
  { value: '12,000+', label: 'Patrols Completed / Month' },
  { value: '3 min', label: 'Average Dispatch Response' },
  { value: '99.2%', label: 'Client Retention' },
];

export function Stats() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const cards = cardsRef.current;

    if (!section || !headline || !cards) return;

    const cardElements = cards.querySelectorAll('.stat-card');

    const ctx = gsap.context(() => {
      gsap.from(headline, {
        opacity: 0,
        x: -30,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      });

      gsap.from(cardElements, {
        opacity: 0,
        y: 30,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: cards,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-20 sm:py-32 lg:py-48 z-60 bg-navy-900"
    >
      <div className="w-full px-4 sm:px-6 lg:px-[6vw]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          {/* Left: Headline */}
          <div ref={headlineRef}>
            <span className="font-mono text-xs uppercase tracking-[0.14em] text-cyan/70 mb-4 block">
              Metrics
            </span>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl lg:text-5xl text-foreground leading-tight mb-4 sm:mb-6">
              Protection by the Numbers
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-md">
              Metrics that reflect consistency, accountability, and scale.
            </p>
          </div>

          {/* Right: Stats grid */}
          <div ref={cardsRef} className="grid grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
            {stats.map((stat) => (
              <StatCard
                key={stat.label}
                value={stat.value}
                label={stat.label}
                className="stat-card"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
