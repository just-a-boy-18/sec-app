import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield, Eye, Zap, Award } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const values = [
  {
    icon: Shield,
    title: 'Integrity',
    description: 'Transparent operations. Honest communication.',
  },
  {
    icon: Eye,
    title: 'Vigilance',
    description: 'Continuous monitoring. Early detection.',
  },
  {
    icon: Zap,
    title: 'Rapid Response',
    description: 'Fast dispatch. Decisive action.',
  },
  {
    icon: Award,
    title: 'Professionalism',
    description: 'Uniform standards. Respectful conduct.',
  },
];

export function WhoWeAre() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const body = bodyRef.current;
    const cards = cardsRef.current;

    if (!section || !headline || !body || !cards) return;

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

      gsap.from(body, {
        opacity: 0,
        x: 30,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 65%',
          toggleActions: 'play none none reverse',
        },
      });

      const cardElements = cards.querySelectorAll('.value-card');
      gsap.from(cardElements, {
        opacity: 0,
        y: 30,
        duration: 0.5,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: cards,
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
      id="about"
      className="relative w-full py-20 sm:py-32 lg:py-48 z-20 bg-navy-900"
    >
      <div className="w-full px-4 sm:px-6 lg:px-[6vw]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 mb-16 lg:mb-32">
          {/* Left: Headline */}
          <div ref={headlineRef}>
            <span className="font-mono text-xs uppercase tracking-[0.14em] text-cyan/70 mb-4 block">
              About Us
            </span>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl lg:text-5xl text-foreground leading-tight">
              Who We Are
            </h2>
          </div>

          {/* Right: Body copy */}
          <div ref={bodyRef} className="lg:pt-8">
            <p className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed">
              A&A Response Services delivers disciplined, technology-enabled security across residential, corporate, and event environments. We combine trained personnel with clear protocols—so protection feels seamless, not intrusive.
            </p>
          </div>
        </div>

        {/* Values cards */}
        <div ref={cardsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {values.map((value) => (
            <div
              key={value.title}
              className="value-card group relative p-4 sm:p-6 bg-card/30 border border-white/10 rounded-lg hover:border-cyan/30 hover:bg-card/50 transition-all duration-300"
            >
              <div className="flex flex-col h-full">
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-md bg-cyan/10 border border-cyan/20 mb-3 sm:mb-4">
                  <value.icon className="w-5 h-5 sm:w-6 sm:h-6 text-cyan" />
                </div>
                <h3 className="font-heading font-semibold text-foreground mb-1 sm:mb-2 text-sm sm:text-base">
                  {value.title}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
