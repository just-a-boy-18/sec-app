import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function RapidResponse() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;

    if (!section || !content) return;

    const headline = content.querySelector('.headline');
    const subline = content.querySelector('.subline');
    const cta = content.querySelector('.cta');

    const ctx = gsap.context(() => {
      gsap.from(headline, {
        opacity: 0,
        y: 40,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 60%',
          toggleActions: 'play none none reverse',
        },
      });

      gsap.from([subline, cta], {
        opacity: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 50%',
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
      className="relative w-full py-20 sm:py-32 lg:py-48 z-50"
    >
      {/* Simple Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-800 to-navy-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,240,255,0.1)_0%,_transparent_60%)]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[300px] sm:w-[500px] h-[150px] sm:h-[300px] bg-cyan/8 blur-[80px] sm:blur-[120px] rounded-full" />
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-20 px-4 sm:px-6"
      >
        {/* Micro label */}
        <div className="mb-6 sm:mb-8 text-center">
          <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.14em] text-cyan/70">
            Capability
          </span>
        </div>

        {/* Main content */}
        <div className="text-center max-w-4xl mx-auto px-2 sm:px-0">
          <h2 className="headline font-heading font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-foreground leading-[0.95] tracking-tight mb-4 sm:mb-6">
            Rapid Response.<br className="hidden sm:block" />
            <span className="text-cyan">Real Results.</span>
          </h2>
          <p className="subline text-sm sm:text-base lg:text-lg text-muted-foreground max-w-xl sm:max-w-2xl mx-auto mb-6 sm:mb-8 leading-relaxed">
            When seconds matter, our dispatch network and field teams move as one—containing risk and protecting people.
          </p>
          <div className="cta">
            <Button
              onClick={scrollToContact}
              size="lg"
              className="bg-cyan text-navy-900 hover:bg-cyan/90 font-medium px-6 sm:px-8 h-11 sm:h-12"
            >
              Speak with a Specialist
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
