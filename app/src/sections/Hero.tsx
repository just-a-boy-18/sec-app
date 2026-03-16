import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;

    if (!section || !content) return;

    const ctx = gsap.context(() => {
      // Simple fade-out on scroll
      gsap.to(content, {
        opacity: 0,
        y: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.5,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToServices = () => {
    const element = document.querySelector('#services');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen flex items-center justify-center z-10"
    >
      {/* Simple Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,240,255,0.08)_0%,_transparent_60%)]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] sm:w-[600px] lg:w-[800px] h-[200px] sm:h-[300px] lg:h-[400px] bg-cyan/5 blur-[80px] sm:blur-[120px] lg:blur-[150px] rounded-full" />
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-20 w-full px-4 sm:px-6 py-24 sm:py-32"
      >
        {/* Micro label */}
        <div className="absolute top-20 sm:top-24 left-4 sm:left-[8vw]">
          <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.14em] text-cyan/70">
            A&A Response Services
          </span>
        </div>

        {/* Main content */}
        <div className="text-center max-w-4xl mx-auto pt-12 sm:pt-16">
          <h1 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-foreground leading-[0.95] tracking-tight mb-4 sm:mb-6">
            Securing What Matters Most.
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-xl sm:max-w-2xl mx-auto mb-6 sm:mb-8 leading-relaxed px-2 sm:px-0">
            Professional protection for homes, businesses, and events—backed by trained teams and real-time response.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0">
            <Button
              onClick={scrollToContact}
              size="lg"
              className="bg-cyan text-navy-900 hover:bg-cyan/90 font-medium px-6 sm:px-8 h-11 sm:h-12"
            >
              Request Protection
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button
              onClick={scrollToServices}
              size="lg"
              variant="outline"
              className="border-white/20 text-foreground hover:bg-white/5 hover:border-cyan/50 h-11 sm:h-12"
            >
              Explore Services
            </Button>
          </div>
        </div>

        {/* Bottom micro text */}
        <div className="absolute bottom-16 sm:bottom-24 left-0 right-0 px-4 sm:px-[8vw] flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0">
          <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.14em] text-muted-foreground">
            Licensed • Insured • 24/7
          </span>
          <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.14em] text-muted-foreground">
            Est. 2009
          </span>
        </div>
      </div>
    </section>
  );
}
