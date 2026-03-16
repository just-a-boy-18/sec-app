import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GraduationCap, FileText, HeadphonesIcon, Settings } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: GraduationCap,
    title: 'Trained & Certified',
    description: 'Rigorous hiring, ongoing drills, compliance-first culture.',
  },
  {
    icon: FileText,
    title: 'Real-Time Reporting',
    description: 'Incident logs, patrol proofs, and shift summaries—delivered instantly.',
  },
  {
    icon: HeadphonesIcon,
    title: '24/7 Command',
    description: 'A single point of contact, anytime you need it.',
  },
  {
    icon: Settings,
    title: 'Custom Protocols',
    description: 'Security plans tailored to your site, schedule, and risk profile.',
  },
];

export function WhyAAA() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const leftCol = leftColRef.current;
    const rightCol = rightColRef.current;

    if (!section || !headline || !leftCol || !rightCol) return;

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

      const leftItems = leftCol.querySelectorAll('.feature-item');
      gsap.from(leftItems, {
        opacity: 0,
        x: -20,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: leftCol,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });

      const rightItems = rightCol.querySelectorAll('.feature-item');
      gsap.from(rightItems, {
        opacity: 0,
        x: 20,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: rightCol,
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
      className="relative w-full py-20 sm:py-32 lg:py-48 z-40 bg-navy-900"
    >
      <div className="w-full px-4 sm:px-6 lg:px-[6vw]">
        {/* Headline */}
        <div ref={headlineRef} className="text-center mb-16 lg:mb-24">
          <h2 className="font-heading font-bold text-2xl sm:text-3xl lg:text-5xl text-foreground leading-tight">
            Why clients trust A&A
          </h2>
        </div>

        {/* Two-column features */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 max-w-5xl mx-auto">
          {/* Left column */}
          <div ref={leftColRef} className="space-y-3 sm:space-y-4">
            {features.slice(0, 2).map((feature) => (
              <div
                key={feature.title}
                className="feature-item flex items-start gap-3 sm:gap-4 p-4 sm:p-5 bg-card/30 border border-white/10 rounded-lg hover:border-cyan/30 hover:bg-card/50 transition-all duration-300"
              >
                <div className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-md bg-cyan/10 border border-cyan/20">
                  <feature.icon className="w-4 h-4 sm:w-5 sm:h-5 text-cyan" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-heading font-semibold text-foreground mb-1 text-sm sm:text-base">
                    {feature.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right column */}
          <div ref={rightColRef} className="space-y-3 sm:space-y-4">
            {features.slice(2, 4).map((feature) => (
              <div
                key={feature.title}
                className="feature-item flex items-start gap-3 sm:gap-4 p-4 sm:p-5 bg-card/30 border border-white/10 rounded-lg hover:border-cyan/30 hover:bg-card/50 transition-all duration-300"
              >
                <div className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-md bg-cyan/10 border border-cyan/20">
                  <feature.icon className="w-4 h-4 sm:w-5 sm:h-5 text-cyan" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-heading font-semibold text-foreground mb-1 text-sm sm:text-base">
                    {feature.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
