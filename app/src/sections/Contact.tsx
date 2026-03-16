import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Mail, Phone, Radio, Send, Check, Loader2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// ============================================
// CONFIGURE YOUR EMAIL HERE
// Replace with your email address where you want to receive form submissions
// This uses Formspree - sign up free at https://formspree.io
// After signup, replace the form endpoint URL below
// ============================================
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xeelbave';
// Example: const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xnqkvnyp';

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    message: '',
  });

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const form = formRef.current;

    if (!section || !content || !form) return;

    const ctx = gsap.context(() => {
      // Simple fade-in animations
      gsap.from(content, {
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

      gsap.from(form, {
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
    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    try {
      // Check if Formspree endpoint is configured
      if (FORMSPREE_ENDPOINT.includes('YOUR_FORM_ID')) {
        // Demo mode - simulate successful submission
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsSubmitted(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          organization: '',
          message: '',
        });
        
        // Reset after 5 seconds
        setTimeout(() => {
          setIsSubmitted(false);
        }, 5000);
      } else {
        // Real Formspree submission
        const response = await fetch(FORMSPREE_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            organization: formData.organization,
            message: formData.message,
            _subject: `New Protection Request from ${formData.name}`,
          }),
        });

        if (response.ok) {
          setIsSubmitted(true);
          setFormData({
            name: '',
            email: '',
            phone: '',
            organization: '',
            message: '',
          });
          
          setTimeout(() => {
            setIsSubmitted(false);
          }, 5000);
        } else {
          setSubmitError('Something went wrong. Please try again or contact us directly.');
        }
      }
    // } catch (error) {
      setSubmitError('Network error. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative w-full py-20 sm:py-32 lg:py-48 z-90"
    >
      {/* Simple Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(0,240,255,0.08)_0%,_transparent_50%)]" />
        <div className="absolute top-1/2 right-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-cyan/5 blur-[100px] sm:blur-[150px] rounded-full -translate-y-1/2" />
      </div>

      {/* Content */}
      <div className="relative z-20 w-full px-4 sm:px-6 lg:px-[6vw]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start max-w-6xl mx-auto">
          {/* Left: Contact info */}
          <div ref={contentRef}>
            <span className="font-mono text-xs uppercase tracking-[0.14em] text-cyan/70 mb-4 block">
              Contact
            </span>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl lg:text-5xl text-foreground leading-tight mb-4 sm:mb-6">
              Request protection.
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6 sm:mb-8">
              Tell us what you're protecting. We'll respond within one business day.
            </p>
            
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-md bg-cyan/10 border border-cyan/20 flex-shrink-0">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-cyan" />
                </div>
                <span className="text-sm sm:text-base text-foreground">hello@aaresponse.com</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-md bg-cyan/10 border border-cyan/20 flex-shrink-0">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-cyan" />
                </div>
                <span className="text-sm sm:text-base text-foreground">+1 (555) 014-2200</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-md bg-cyan/10 border border-cyan/20 flex-shrink-0">
                  <Radio className="w-4 h-4 sm:w-5 sm:h-5 text-cyan" />
                </div>
                <span className="text-sm sm:text-base text-foreground">24/7 Dispatch: +1 (555) 014-2299</span>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="p-4 sm:p-6 lg:p-8 bg-card/80 backdrop-blur-sm border border-white/10 rounded-lg"
          >
            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center py-8 sm:py-12 text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center rounded-full bg-cyan/20 mb-4">
                  <Check className="w-6 h-6 sm:w-8 sm:h-8 text-cyan" />
                </div>
                <h3 className="font-heading font-semibold text-foreground text-lg sm:text-xl mb-2">
                  Thank you.
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground">
                  Our response team will contact you shortly.
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
                  <div className="form-field">
                    <Label htmlFor="name" className="text-xs sm:text-sm text-muted-foreground mb-2 block">
                      Full Name *
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Smith"
                      required
                      disabled={isSubmitting}
                      className="bg-navy-900/50 border-white/10 focus:border-cyan/50 text-foreground placeholder:text-muted-foreground/50 text-sm h-10"
                    />
                  </div>
                  <div className="form-field">
                    <Label htmlFor="email" className="text-xs sm:text-sm text-muted-foreground mb-2 block">
                      Email *
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@company.com"
                      required
                      disabled={isSubmitting}
                      className="bg-navy-900/50 border-white/10 focus:border-cyan/50 text-foreground placeholder:text-muted-foreground/50 text-sm h-10"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
                  <div className="form-field">
                    <Label htmlFor="phone" className="text-xs sm:text-sm text-muted-foreground mb-2 block">
                      Phone
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 000-0000"
                      disabled={isSubmitting}
                      className="bg-navy-900/50 border-white/10 focus:border-cyan/50 text-foreground placeholder:text-muted-foreground/50 text-sm h-10"
                    />
                  </div>
                  <div className="form-field">
                    <Label htmlFor="organization" className="text-xs sm:text-sm text-muted-foreground mb-2 block">
                      Organization
                    </Label>
                    <Input
                      id="organization"
                      name="organization"
                      value={formData.organization}
                      onChange={handleChange}
                      placeholder="Company name"
                      disabled={isSubmitting}
                      className="bg-navy-900/50 border-white/10 focus:border-cyan/50 text-foreground placeholder:text-muted-foreground/50 text-sm h-10"
                    />
                  </div>
                </div>
                
                <div className="form-field mb-4 sm:mb-6">
                  <Label htmlFor="message" className="text-xs sm:text-sm text-muted-foreground mb-2 block">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your security needs..."
                    rows={3}
                    disabled={isSubmitting}
                    className="bg-navy-900/50 border-white/10 focus:border-cyan/50 text-foreground placeholder:text-muted-foreground/50 text-sm resize-none"
                  />
                </div>
                
                {submitError && (
                  <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded text-sm text-red-400">
                    {submitError}
                  </div>
                )}
                
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-cyan text-navy-900 hover:bg-cyan/90 font-medium h-11"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Request a Consultation
                      <Send className="ml-2 w-4 h-4" />
                    </>
                  )}
                </Button>
                
                <p className="text-xs text-muted-foreground text-center mt-4">
                  Prefer email? We keep your information confidential.
                </p>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
