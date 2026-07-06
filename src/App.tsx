import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import type { MouseEvent } from 'react';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';

const heroVideo = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4';
type TransitionOrigin = 'top' | 'bottom';

function triggerSectionTransition(origin: TransitionOrigin = 'bottom') {
  window.dispatchEvent(new CustomEvent('section-transition', { detail: { origin } }));
}

function goToSection(event: MouseEvent<HTMLElement>, targetId: string) {
  event.preventDefault();
  const target = document.getElementById(targetId);
  if (!target) return;

  const targetTop = target.getBoundingClientRect().top + window.scrollY;
  triggerSectionTransition(targetTop >= window.scrollY ? 'bottom' : 'top');

  window.setTimeout(() => {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 240);
}

function WordsPullUp({ text, showAsterisk = false }: { text: string; showAsterisk?: boolean }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const words = text.split(' ');

  return (
    <span ref={ref} className="inline-flex flex-wrap">
      {words.map((word, index) => {
        const isLast = index === words.length - 1;
        return (
          <span key={`${word}-${index}`} className="inline-block overflow-visible">
            <motion.span
              className="relative inline-block"
              initial={{ y: 20, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              {word}
              {showAsterisk && isLast && <span className="absolute -right-[0.3em] top-[0.65em] text-[0.31em]">*</span>}
            </motion.span>
            {index < words.length - 1 && <span>&nbsp;</span>}
          </span>
        );
      })}
    </span>
  );
}

function SectionTransitionOverlay() {
  const [transitionKey, setTransitionKey] = useState(0);
  const [origin, setOrigin] = useState<'top' | 'bottom'>('bottom');

  useEffect(() => {
    const onManualTransition = (event: Event) => {
      const detail = (event as CustomEvent<{ origin?: TransitionOrigin }>).detail;
      setOrigin(detail?.origin ?? 'bottom');
      setTransitionKey((key) => key + 1);
    };

    window.addEventListener('section-transition', onManualTransition);
    return () => window.removeEventListener('section-transition', onManualTransition);
  }, []);

  return (
    <div className="transition-blocks" aria-hidden="true">
      <motion.div
        key={`back-${transitionKey}`}
        className="transition-blocks__back-el"
        initial={{ scaleY: 0, opacity: 0 }}
        animate={transitionKey ? { scaleY: [0, 1, 1, 0], opacity: [0, 1, 1, 0] } : {}}
        transition={{ duration: 1.05, times: [0, 0.28, 0.62, 1], ease: [0.19, 1, 0.22, 1] }}
        style={{ transformOrigin: origin }}
      />
      <div className="transition-blocks__lines">
        {Array.from({ length: 8 }).map((_, index) => (
          <motion.div
            key={`v-${transitionKey}-${index}`}
            className="transition-blocks__line"
            initial={{ scaleY: 0, opacity: 0 }}
            animate={transitionKey ? { scaleY: [0, 1, 1, 0], opacity: [0, 1, 1, 0] } : {}}
            transition={{
              duration: 0.95,
              delay: index * 0.035,
              times: [0, 0.32, 0.62, 1],
              ease: [0.19, 1, 0.22, 1],
            }}
            style={{ transformOrigin: origin }}
          />
        ))}
      </div>
      <div className="transition-blocks__lines-h">
        {Array.from({ length: 6 }).map((_, index) => (
          <motion.div
            key={`h-${transitionKey}-${index}`}
            className="transition-blocks__line-h"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={transitionKey ? { scaleX: [0, 1, 1, 0], opacity: [0, 1, 1, 0] } : {}}
            transition={{
              duration: 0.85,
              delay: 0.08 + index * 0.025,
              times: [0, 0.35, 0.65, 1],
              ease: [0.19, 1, 0.22, 1],
            }}
            style={{ transformOrigin: 'left' }}
          />
        ))}
      </div>
    </div>
  );
}

function Hero() {
  const navItems = [
    { label: 'Our story', target: 'about' },
    { label: 'Collective', target: 'featured' },
    { label: 'Workshops', target: 'philosophy' },
    { label: 'Programs', target: 'services' },
    { label: 'Inquiries', target: 'footer' },
  ];

  return (
    <section className="h-screen bg-black p-4 md:p-6">
      <div className="relative h-full overflow-hidden rounded-2xl md:rounded-[2rem]">
        <video className="absolute inset-0 h-full w-full object-cover" src={heroVideo} autoPlay loop muted playsInline preload="auto" />
        <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.7] mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />

        <nav className="absolute left-1/2 top-0 z-20 -translate-x-1/2 bg-black px-4 py-2 md:rounded-b-3xl md:px-8">
          <div className="flex items-center gap-3 sm:gap-6 md:gap-12 lg:gap-14">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={`#${item.target}`}
                className="prisma-nav-link whitespace-nowrap text-[10px] transition-colors sm:text-xs md:text-sm"
                style={{ color: 'rgba(225, 224, 204, 0.8)' }}
                onClick={(event) => goToSection(event, item.target)}
                onMouseEnter={(event) => {
                  event.currentTarget.style.color = '#E1E0CC';
                }}
                onMouseLeave={(event) => {
                  event.currentTarget.style.color = 'rgba(225, 224, 204, 0.8)';
                }}
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 z-10 p-4 sm:p-6 md:p-8">
          <div className="grid items-end gap-6 md:grid-cols-12">
            <h1 className="md:col-span-8 text-[26vw] font-medium leading-[0.85] tracking-[-0.07em] text-[#E1E0CC] sm:text-[24vw] md:text-[22vw] lg:text-[20vw] xl:text-[19vw] 2xl:text-[20vw]">
              <WordsPullUp text="Prisma" showAsterisk />
            </h1>
            <div className="pb-2 md:col-span-4 md:pb-7">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-md text-xs leading-[1.2] text-primary/70 sm:text-sm md:text-base"
              >
                Prisma is a worldwide network of visual artists, filmmakers and storytellers bound not by place, status or labels but by passion and hunger to unlock potential through our unique perspectives.
              </motion.p>
              <motion.button
                type="button"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="group mt-5 flex items-center gap-2 rounded-full bg-primary py-1.5 pl-5 pr-1.5 text-sm font-medium text-black transition-all hover:gap-3 sm:text-base"
                onClick={(event) => goToSection(event, 'about')}
              >
                Join the lab
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black transition-transform group-hover:scale-110 sm:h-10 sm:w-10">
                  <ArrowRight className="h-4 w-4 text-primary" />
                </span>
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  return (
    <section ref={ref} className="relative overflow-hidden bg-black px-6 pb-10 pt-32 md:pb-14 md:pt-44">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.03)_0%,_transparent_70%)]" />
      <div className="relative mx-auto max-w-6xl">
        <motion.p initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="mb-8 text-sm uppercase tracking-widest text-white/40">
          About Us
        </motion.p>
        <motion.h2 initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.1 }} className="font-serif text-4xl leading-[1.1] tracking-tight text-white md:text-6xl lg:text-7xl">
          Pioneering <em className="italic text-white/60">ideas</em> for <br className="hidden md:block" />
          minds that <em className="italic text-white/60">create, build, and inspire.</em>
        </motion.h2>
      </div>
    </section>
  );
}

function FeaturedVideoSection() {
  return (
    <section className="overflow-hidden bg-black px-6 pb-20 pt-6 md:pb-32 md:pt-10">
      <motion.div initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.9 }} className="relative mx-auto aspect-video max-w-6xl overflow-hidden rounded-3xl">
        <video className="h-full w-full object-cover" src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260402_054547_9875cfc5-155a-4229-8ec8-b7ba7125cbf8.mp4" muted autoPlay loop playsInline preload="auto" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 flex flex-col items-start justify-between gap-5 p-6 md:flex-row md:items-end md:p-10">
          <div className="liquid-glass max-w-md rounded-2xl p-6 md:p-8">
            <p className="mb-3 text-xs uppercase tracking-widest text-white/50">Our Approach</p>
            <p className="text-sm leading-relaxed text-white md:text-base">We believe in the power of curiosity-driven exploration. Every project starts with a question, and every answer opens a new door to innovation.</p>
          </div>
          <motion.button type="button" onClick={(event) => goToSection(event, 'philosophy')} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="liquid-glass rounded-full px-8 py-3 text-sm font-medium text-white">
            Explore more
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
}

function PhilosophySection() {
  return (
    <section className="overflow-hidden bg-black px-6 py-28 md:py-40">
      <div className="mx-auto max-w-6xl">
        <motion.h2 initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.8 }} className="mb-16 font-serif text-5xl tracking-tight text-white md:mb-24 md:text-7xl lg:text-8xl">
          Innovation <em className="italic text-white/40">x</em> Vision
        </motion.h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.8 }} className="aspect-[4/3] overflow-hidden rounded-3xl">
            <video className="h-full w-full object-cover" src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260307_083826_e938b29f-a43a-41ec-a153-3d4730578ab8.mp4" muted autoPlay loop playsInline preload="auto" />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.8 }} className="flex flex-col justify-center">
            <TextBlock label="Choose your space">Every meaningful breakthrough begins at the intersection of disciplined strategy and remarkable creative vision. We operate at that crossroads, turning bold thinking into tangible outcomes that move people and reshape industries.</TextBlock>
            <div className="my-10 h-px w-full bg-white/10" />
            <TextBlock label="Shape the future">We believe that the best work emerges when curiosity meets conviction. Our process is designed to uncover hidden opportunities and translate them into experiences that resonate long after the first impression.</TextBlock>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function TextBlock({ label, children }: { label: string; children: string }) {
  return (
    <div>
      <p className="mb-4 text-xs uppercase tracking-widest text-white/40">{label}</p>
      <p className="text-base leading-relaxed text-white/70 md:text-lg">{children}</p>
    </div>
  );
}

function ServicesSection() {
  const cards = [
    {
      video: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4',
      tag: 'Strategy',
      title: 'Research & Insight',
      description: 'We dig deep into data, culture, and human behavior to surface the insights that drive meaningful, lasting change.',
    },
    {
      video: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260324_151826_c7218672-6e92-402c-9e45-f1e0f454bdc4.mp4',
      tag: 'Craft',
      title: 'Design & Execution',
      description: 'From concept to launch, we obsess over every detail to deliver experiences that feel effortless and look extraordinary.',
    },
  ];

  return (
    <section className="relative overflow-hidden bg-black px-6 pt-28 pb-0 md:pt-40 md:pb-0">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.02)_0%,_transparent_60%)]" />
      <div className="relative mx-auto max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.7 }} className="mb-12 flex items-end justify-between">
          <h2 className="font-serif text-3xl tracking-tight text-white md:text-5xl">What we do</h2>
          <p className="hidden text-sm text-white/40 md:block">Our services</p>
        </motion.div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {cards.map((card, index) => (
            <motion.article key={card.title} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.8, delay: index * 0.15 }} className="liquid-glass group rounded-3xl">
              <div className="relative aspect-video overflow-hidden">
                <video className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" src={card.video} muted autoPlay loop playsInline preload="auto" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
              <div className="p-6 md:p-8">
                <div className="mb-5 flex items-center justify-between">
                  <p className="text-xs uppercase tracking-widest text-white/40">{card.tag}</p>
                  <span className="liquid-glass rounded-full p-2 text-white">
                    <ArrowUpRight className="h-5 w-5" />
                  </span>
                </div>
                <h3 className="mb-3 text-xl tracking-tight text-white md:text-2xl">{card.title}</h3>
                <p className="text-sm leading-relaxed text-white/50">{card.description}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FooterSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const x = useTransform(scrollYProgress, [0, 1], ['0vw', '-100vw']);
  type FooterLink = { label: string; target?: string; href?: string };
  const footerColumns: { title: string; links: FooterLink[] }[] = [
    {
      title: 'Explore',
      links: [
        { label: 'Home', target: 'hero' },
        { label: 'About', target: 'about' },
        { label: 'Work', target: 'featured' },
        { label: 'What we do', target: 'services' },
      ],
    },
    {
      title: 'Platform',
      links: [
        { label: 'Dev API', href: '#dev-api' },
        { label: 'Docs', href: '#docs' },
        { label: 'Status', href: '#status' },
        { label: 'Login', href: '#login' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'Contact', href: 'mailto:hello@prisma.studio' },
        { label: 'Careers', href: '#careers' },
        { label: 'Privacy', href: '#privacy' },
        { label: 'Terms', href: '#terms' },
      ],
    },
  ];

  return (
    <section ref={ref} className="relative h-[200vh] bg-black">
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div style={{ x }} className="relative flex h-full w-[200vw]">
          <section className="relative flex h-screen w-screen shrink-0 items-center justify-center overflow-hidden bg-black px-6 text-[#E1E0CC]">
            <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.16] mix-blend-overlay" />
            <div className="grid w-full max-w-6xl items-center gap-8 md:grid-cols-[0.9fr_1.1fr]">
              <div className="liquid-glass mx-auto aspect-square w-64 overflow-hidden rounded-3xl p-4 md:w-96">
                <img
                  src="https://seasoned.koto.studio/wp-content/themes/seasoned/assets/book2/book2-cover.avif"
                  alt="Abstract next chapter cover"
                  className="h-full w-full rounded-2xl object-cover"
                />
              </div>
              <div className="text-center md:text-left">
                <p className="mb-4 text-xs uppercase tracking-[0.35em] text-[#E1E0CC]/45">Dev API</p>
                <h3 className="font-serif text-5xl italic leading-none md:text-8xl">Build the next story.</h3>
                <p className="mt-6 max-w-xl text-sm leading-relaxed text-[#E1E0CC]/60 md:text-lg">
                  Connect the creative system to your product, automate publishing, or hand the studio a cleaner brief.
                </p>
                <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row md:items-start">
                  <a href="#login" onClick={() => triggerSectionTransition('bottom')} className="inline-flex rounded-full bg-[#E1E0CC] px-7 py-4 text-sm uppercase tracking-widest text-black transition-transform hover:scale-105">
                    Login
                  </a>
                  <a href="#dev-api" onClick={() => triggerSectionTransition('bottom')} className="inline-flex rounded-full border border-[#E1E0CC]/35 px-7 py-4 text-sm uppercase tracking-widest text-[#E1E0CC] transition-colors hover:bg-[#E1E0CC] hover:text-black">
                    View API
                  </a>
                </div>
              </div>
            </div>
          </section>

          <section className="relative flex h-screen w-screen shrink-0 items-center overflow-hidden border-l border-[#E1E0CC]/10 bg-black px-6 text-[#E1E0CC]">
            <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.16] mix-blend-overlay" />
            <div className="relative mx-auto grid w-full max-w-6xl gap-10 md:grid-cols-[1fr_1.25fr]">
              <div className="flex flex-col justify-between gap-10">
                <div>
                  <p className="mb-4 text-xs uppercase tracking-[0.35em] text-[#E1E0CC]/45">Prisma</p>
                  <h3 className="font-serif text-6xl italic leading-none md:text-9xl">Let us begin.</h3>
                </div>
                <a href="#login" onClick={() => triggerSectionTransition('bottom')} className="inline-flex w-fit rounded-full bg-[#E1E0CC] px-7 py-4 text-sm uppercase tracking-widest text-black transition-transform hover:scale-105">
                  Login
                </a>
              </div>
              <div className="grid gap-8 sm:grid-cols-3">
                {footerColumns.map((column) => (
                  <div key={column.title}>
                    <p className="mb-5 text-xs uppercase tracking-[0.3em] text-[#E1E0CC]/40">{column.title}</p>
                    <div className="flex flex-col items-start gap-4">
                      {column.links.map((link) => (
                        <a
                          key={link.label}
                          href={link.target ? `#${link.target}` : link.href}
                          onClick={(event) => {
                            if (link.target) {
                              goToSection(event, link.target);
                              return;
                            }

                            triggerSectionTransition('bottom');
                          }}
                          className="prisma-nav-link text-base text-[#E1E0CC]/70 transition-colors hover:text-[#E1E0CC]"
                        >
                          {link.label}
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </motion.div>
      </div>
    </section>
  );
}

export default function App() {
  const [route, setRoute] = useState(() => window.location.hash.replace('#', ''));

  useEffect(() => {
    const onHashChange = () => setRoute(window.location.hash.replace('#', ''));

    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  if (route === 'login') {
    return <LoginPage />;
  }

  if (route === 'dashboard') {
    return <DashboardPage />;
  }

  return (
    <main className="bg-black">
      <SectionTransitionOverlay />
      <div id="hero" data-scroll-section>
        <Hero />
      </div>
      <div id="about" data-scroll-section>
        <AboutSection />
      </div>
      <div id="featured" data-scroll-section>
        <FeaturedVideoSection />
      </div>
      <div id="philosophy" data-scroll-section>
        <PhilosophySection />
      </div>
      <div id="services" data-scroll-section>
        <ServicesSection />
      </div>
      <div id="footer" data-scroll-section>
        <FooterSection />
      </div>
    </main>
  );
}
