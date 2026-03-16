import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Building2, Home, PartyPopper, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

const industries = [
  {
    icon: Building2,
    title: 'Corporate & Commercial',
    description: 'Access control, after-hours protection, visitor management.',
  },
  {
    icon: Home,
    title: 'Residential & Gated Communities',
    description: 'Gate protocols, patrols, concierge security.',
  },
  {
    icon: PartyPopper,
    title: 'Events & Hospitality',
    description: 'Crowd safety, VIP protection, emergency planning.',
  },
];

export function Industries() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const cards = cardsRef.current;

    if (!section || !headline || !cards) return;

    const cardElements = cards.querySelectorAll('.industry-card');

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

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="industries"
      className="relative w-full py-20 sm:py-32 lg:py-48 z-70 bg-navy-900"
    >
      <div className="w-full px-4 sm:px-6 lg:px-[6vw]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          {/* Left: Headline */}
          <div ref={headlineRef}>
            <span className="font-mono text-xs uppercase tracking-[0.14em] text-cyan/70 mb-4 block">
              Industries
            </span>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl lg:text-5xl text-foreground leading-tight mb-4 sm:mb-6">
              Security tailored to your world.
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6 sm:mb-8 max-w-md">
              We adapt our protocols to the risks, regulations, and rhythms of your industry.
            </p>
            <Button
              onClick={scrollToContact}
              variant="outline"
              className="border-cyan/50 text-cyan hover:bg-cyan/10 w-full sm:w-auto"
            >
              See industry solutions
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>

          {/* Right: Cards */}
          <div ref={cardsRef} className="space-y-3 sm:space-y-4">
            {industries.map((industry, index) => (
              <div
                key={industry.title}
                className="industry-card group relative p-4 sm:p-6 bg-card/50 border border-white/10 rounded-lg hover:border-cyan/30 hover:bg-card/80 transition-all duration-300 hover:-translate-y-1"
                style={{ marginLeft: window.innerWidth >= 640 ? `${index * 12}px` : '0' }}
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-md bg-cyan/10 border border-cyan/20">
                    <industry.icon className="w-5 h-5 sm:w-6 sm:h-6 text-cyan" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-heading font-semibold text-foreground mb-1 text-sm sm:text-base">
                      {industry.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {industry.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
