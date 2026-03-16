import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield, Linkedin, Twitter, Facebook, Instagram } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const footerLinks = {
  services: [
    { label: 'Static Guarding', href: '#services' },
    { label: 'Mobile Patrols', href: '#services' },
    { label: 'Event Security', href: '#services' },
  ],
  industries: [
    { label: 'Corporate', href: '#industries' },
    { label: 'Residential', href: '#industries' },
    { label: 'Events', href: '#industries' },
  ],
  company: [
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
    { label: 'Privacy', href: '#' },
    { label: 'Terms', href: '#' },
  ],
};

const socialLinks = [
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Instagram, href: '#', label: 'Instagram' },
];

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const ctx = gsap.context(() => {
      gsap.from(footer, {
        opacity: 0,
        y: 20,
        duration: 0.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: footer,
          start: 'top 95%',
          toggleActions: 'play none none reverse',
        },
      });
    }, footer);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (href: string) => {
    if (href === '#') return;
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer
      ref={footerRef}
      className="relative w-full py-10 sm:py-12 lg:py-16 z-100 bg-navy-900 border-t border-white/5"
    >
      <div className="w-full px-4 sm:px-6 lg:px-[6vw]">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-6 lg:gap-8 mb-10 sm:mb-12">
          {/* Logo and tagline */}
          <div className="col-span-2 sm:col-span-1">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-2 mb-3 sm:mb-4"
            >
              <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-cyan" />
              <span className="font-heading font-semibold text-foreground text-sm sm:text-base">
                A&A Response
              </span>
            </a>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Professional Protection. Reliable Response.
            </p>
          </div>

          {/* Services links */}
          <div>
            <h4 className="font-heading font-semibold text-foreground text-xs sm:text-sm mb-3 sm:mb-4">
              Services
            </h4>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-xs sm:text-sm text-muted-foreground hover:text-cyan transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Industries links */}
          <div>
            <h4 className="font-heading font-semibold text-foreground text-xs sm:text-sm mb-3 sm:mb-4">
              Industries
            </h4>
            <ul className="space-y-2">
              {footerLinks.industries.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-xs sm:text-sm text-muted-foreground hover:text-cyan transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company links */}
          <div>
            <h4 className="font-heading font-semibold text-foreground text-xs sm:text-sm mb-3 sm:mb-4">
              Company
            </h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-xs sm:text-sm text-muted-foreground hover:text-cyan transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 sm:pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground text-center sm:text-left">
            © 2026 A&A Response Services. All rights reserved.
          </p>
          
          {/* Social links */}
          <div className="flex items-center gap-2 sm:gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-md bg-white/5 border border-white/10 text-muted-foreground hover:text-cyan hover:border-cyan/30 transition-colors"
              >
                <social.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
