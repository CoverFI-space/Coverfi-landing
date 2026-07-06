import { ArrowRight, ArrowUpRight } from "lucide-react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import type { FormEvent, MouseEvent } from "react";

const heroVideo =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4";
type TransitionOrigin = "top" | "bottom";
type NavItem = { label: string; href: string; target?: string; key: string };

const navItems: NavItem[] = [
  { label: "Home", href: "/", key: "home" },
  { label: "Pricing", href: "#pricing", key: "pricing" },
  { label: "FAQs", href: "#faqs", target: "faqs", key: "faqs" },
  { label: "Contact us", href: "#contact", key: "contact" },
];

gsap.registerPlugin(ScrollTrigger);

function getDefaultAppUrl() {
  if (typeof window === "undefined") return "http://localhost:5173";

  const { protocol, hostname } = window.location;

  if (hostname === "localhost" || hostname === "127.0.0.1") {
    return "http://localhost:5173";
  }

  return `${protocol}//app.${hostname.replace(/^www\./, "")}`;
}

const logicAppBaseUrl = (
  import.meta.env.VITE_COVERFI_APP_URL || getDefaultAppUrl()
).replace(/\/$/, "");

function triggerSectionTransition(origin: TransitionOrigin = "bottom") {
  window.dispatchEvent(
    new CustomEvent("section-transition", { detail: { origin } }),
  );
}

function goToSection(event: MouseEvent<HTMLElement>, targetId: string) {
  const target = document.getElementById(targetId);
  if (!target) return;

  event.preventDefault();
  const targetTop = target.getBoundingClientRect().top + window.scrollY;
  triggerSectionTransition(targetTop >= window.scrollY ? "bottom" : "top");

  window.setTimeout(() => {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 240);
}

function getLogicAppHref(route = "login") {
  return `${logicAppBaseUrl}/${route.replace(/^\/+/, "")}`;
}

function goToLogicApp(event: MouseEvent<HTMLElement>, route: string) {
  event.preventDefault();
  triggerSectionTransition("bottom");

  window.setTimeout(() => {
    window.location.href = getLogicAppHref(route);
  }, 240);
}

function LogicAppRedirect({ route }: { route: string }) {
  useEffect(() => {
    window.location.href = getLogicAppHref(route);
  }, [route]);

  return null;
}

function SiteNav({
  active = "home",
  className = "",
}: {
  active?: string;
  className?: string;
}) {
  const navRef = useRef<HTMLElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const animateNav = (scrolled: boolean) => {
      setIsScrolled(scrolled);
      gsap.to(nav, {
        borderRadius: scrolled ? 999 : "0 0 24px 24px",
        boxShadow: scrolled
          ? "0 18px 60px rgba(0,0,0,0.22)"
          : "0 0 0 rgba(0,0,0,0)",
        paddingTop: scrolled ? 10 : 8,
        paddingBottom: scrolled ? 10 : 8,
        duration: 0.48,
        ease: "power3.out",
      });
    };

    const trigger = ScrollTrigger.create({
      start: 80,
      onEnter: () => animateNav(true),
      onLeaveBack: () => animateNav(false),
    });

    return () => trigger.kill();
  }, []);

  return (
    <nav
      ref={navRef}
      className={`z-50 bg-black px-3 py-2 md:rounded-b-3xl md:px-5 w-fit max-w-[860px] mx-auto ${className}`}>
      <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-2 md:gap-3 lg:gap-4">
        <a href="/" className="inline-flex items-center">
          <img src="/logo.png" alt="CoverFi" className="h-10 w-auto" />
        </a>
        <div className="flex flex-wrap items-center gap-6 sm:gap-7 md:gap-8 lg:gap-9">
          {navItems.map((item) => {
            const isActive = active === item.key;
            const defaultColor = "rgba(225, 224, 204, 0.8)";
            const activeColor = "#E1E0CC";

            return (
              <a
                key={item.label}
                href={item.href}
                className={`coverfi-nav-link whitespace-nowrap text-[10px] transition-colors sm:text-xs md:text-sm ${isActive ? "coverfi-nav-link--active" : ""}`}
                style={{ color: isActive ? activeColor : defaultColor }}
                onClick={(event) => {
                  if (item.target) {
                    goToSection(event, item.target);
                    return;
                  }

                  if (item.href.startsWith("#")) {
                    triggerSectionTransition("bottom");
                  }
                }}>
                {" "}
                {item.label}
              </a>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

function WordsPullUp({
  text,
  showAsterisk = false,
}: {
  text: string;
  showAsterisk?: boolean;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const words = text.split(" ");

  return (
    <span ref={ref} className="inline-flex flex-wrap">
      {words.map((word, index) => {
        const isLast = index === words.length - 1;
        return (
          <span
            key={`${word}-${index}`}
            className="inline-block overflow-visible">
            <motion.span
              className="relative inline-block"
              initial={{ y: 20, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{
                duration: 0.8,
                delay: index * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}>
              {word}
              {showAsterisk && isLast && (
                <span className="absolute -right-[0.3em] top-[0.65em] text-[0.31em]">
                  *
                </span>
              )}
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
  const [origin, setOrigin] = useState<"top" | "bottom">("bottom");

  useEffect(() => {
    const onManualTransition = (event: Event) => {
      const detail = (event as CustomEvent<{ origin?: TransitionOrigin }>)
        .detail;
      setOrigin(detail?.origin ?? "bottom");
      setTransitionKey((key) => key + 1);
    };

    window.addEventListener("section-transition", onManualTransition);
    return () =>
      window.removeEventListener("section-transition", onManualTransition);
  }, []);

  return (
    <div className="transition-blocks" aria-hidden="true">
      <motion.div
        key={`back-${transitionKey}`}
        className="transition-blocks__back-el"
        initial={{ scaleY: 0, opacity: 0 }}
        animate={
          transitionKey ? { scaleY: [0, 1, 1, 0], opacity: [0, 1, 1, 0] } : {}
        }
        transition={{
          duration: 1.05,
          times: [0, 0.28, 0.62, 1],
          ease: [0.19, 1, 0.22, 1],
        }}
        style={{ transformOrigin: origin }}
      />
      <div className="transition-blocks__lines">
        {Array.from({ length: 8 }).map((_, index) => (
          <motion.div
            key={`v-${transitionKey}-${index}`}
            className="transition-blocks__line"
            initial={{ scaleY: 0, opacity: 0 }}
            animate={
              transitionKey
                ? { scaleY: [0, 1, 1, 0], opacity: [0, 1, 1, 0] }
                : {}
            }
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
            animate={
              transitionKey
                ? { scaleX: [0, 1, 1, 0], opacity: [0, 1, 1, 0] }
                : {}
            }
            transition={{
              duration: 0.85,
              delay: 0.08 + index * 0.025,
              times: [0, 0.35, 0.65, 1],
              ease: [0.19, 1, 0.22, 1],
            }}
            style={{ transformOrigin: "left" }}
          />
        ))}
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="h-screen bg-black p-4 md:p-6">
      <div className="relative h-full overflow-hidden rounded-2xl md:rounded-[2rem]">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={heroVideo}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        />
        <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.7] mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />

        <SiteNav
          active="home"
          className="fixed left-1/2 top-0 z-50 -translate-x-1/2"
        />

        <div className="absolute bottom-0 left-0 right-0 z-10 p-4 sm:p-6 md:p-8">
          <div className="grid items-end gap-6 md:grid-cols-12">
            <h1 className="md:col-span-8 text-[21vw] font-medium leading-[0.85] tracking-[-0.07em] text-[#E1E0CC] sm:text-[20vw] md:text-[17vw] lg:text-[15vw] xl:text-[14vw] 2xl:text-[15vw]">
              <WordsPullUp text="CoverFi" />
            </h1>
            <div className="pb-2 md:col-span-4 md:pb-7">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.5,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="max-w-md text-xs leading-[1.2] text-primary/70 sm:text-sm md:text-base">
                CoverFi helps you protect your assets, watch live prices, and
                get rewards through wallet-signed cover plans.
              </motion.p>
              <motion.button
                type="button"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.7,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group mt-5 flex items-center gap-2 rounded-full bg-primary py-1.5 pl-5 pr-1.5 text-sm font-medium text-black transition-all hover:gap-3 sm:text-base"
                onClick={(event) => goToLogicApp(event, "login")}>
                Open CoverFi
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
  const inView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-black px-6 pb-10 pt-32 md:pb-14 md:pt-44">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.03)_0%,_transparent_70%)]" />
      <div className="relative mx-auto max-w-6xl">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-8 text-sm uppercase tracking-widest text-white/40">
          About CoverFi
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-serif text-4xl leading-[1.1] tracking-tight text-white md:text-6xl lg:text-7xl">
          Protect your <em className="italic text-white/60">assets</em> when{" "}
          <br className="hidden md:block" />
          the market{" "}
          <em className="italic text-white/60">moves against you.</em>
        </motion.h2>
      </div>
    </section>
  );
}

function FeaturedVideoSection() {
  return (
    <section className="overflow-hidden bg-black px-6 pb-20 pt-6 md:pb-32 md:pt-10">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.9 }}
        className="relative mx-auto aspect-video max-w-6xl overflow-hidden rounded-3xl">
        <video
          className="h-full w-full object-cover"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260402_054547_9875cfc5-155a-4229-8ec8-b7ba7125cbf8.mp4"
          muted
          autoPlay
          loop
          playsInline
          preload="auto"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 flex flex-col items-start justify-between gap-5 p-6 md:flex-row md:items-end md:p-10">
          <div className="liquid-glass max-w-md rounded-2xl p-6 md:p-8">
            <p className="mb-3 text-xs uppercase tracking-widest text-white/50">
              Simple asset cover
            </p>
            <p className="text-sm leading-relaxed text-white md:text-base">
              Choose an asset, set your safety price, and keep every important
              action signed from your own Stellar wallet.
            </p>
          </div>
          <motion.button
            type="button"
            onClick={(event) => goToSection(event, "philosophy")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="liquid-glass rounded-full px-8 py-3 text-sm font-medium text-white">
            See the flow
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
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16 font-serif text-5xl tracking-tight text-white md:mb-24 md:text-7xl lg:text-8xl">
          Cover <em className="italic text-white/40">x</em> Rewards
        </motion.h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="aspect-[4/3] overflow-hidden rounded-3xl">
            <video
              className="h-full w-full object-cover"
              src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260307_083826_e938b29f-a43a-41ec-a153-3d4730578ab8.mp4"
              muted
              autoPlay
              loop
              playsInline
              preload="auto"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center">
            <TextBlock label="Choose your asset">
              Pick the asset you want to protect, enter the amount, and choose
              the price where you want your cover to activate.
            </TextBlock>
            <div className="my-10 h-px w-full bg-white/10" />
            <TextBlock label="Stay in control">
              Freighter signs the transaction, secure vaults hold the funds, and
              your dashboard keeps cover status, rewards, and market data in one
              place.
            </TextBlock>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function TextBlock({ label, children }: { label: string; children: string }) {
  return (
    <div>
      <p className="mb-4 text-xs uppercase tracking-widest text-white/40">
        {label}
      </p>
      <p className="text-base leading-relaxed text-white/70 md:text-lg">
        {children}
      </p>
    </div>
  );
}

function WhatWeDoSection() {
  return (
    <section
      id="what-we-do"
      className="relative w-full bg-black px-4 py-12 sm:px-6 sm:py-20 md:px-10">
      <div className="mx-auto w-full max-w-[1400px]">
        <p className="mb-4 text-center text-xs uppercase tracking-[0.35em] text-white/35">
          What we do
        </p>
        <h2
          className="mb-12 text-center text-3xl font-light text-white sm:mb-24 sm:text-4xl md:text-5xl"
          style={{ letterSpacing: "-0.04em" }}>
          Asset cover made simple.
        </h2>

        <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-3">
          <a
            href={getLogicAppHref("app/protect")}
            onClick={(event) => goToLogicApp(event, "app/protect")}
            className="group relative block h-[380px] overflow-hidden rounded-2xl bg-neutral-950 p-6 transition-transform hover:-translate-y-1 sm:h-[460px] sm:p-8">
            <div className="absolute top-1/2 -left-[420px] h-[460px] w-[460px] -translate-y-1/2 rounded-full bg-[#1e3a8a] opacity-40 blur-3xl" />
            <div className="relative z-10 flex h-full flex-col">
              <h3 className="text-xl font-light leading-tight text-white sm:text-2xl">
                Protect Assets
                <br />
                Before Trouble
              </h3>
              <p className="mt-12 max-w-[280px] text-[13px] font-light leading-relaxed text-white/70 sm:mt-20 sm:text-[14px]">
                Create a simple cover plan before prices move too far. You
                choose the asset, amount, and safety price in plain terms.
              </p>
              <span className="mt-auto inline-flex w-fit items-center gap-2 text-xs uppercase tracking-[0.28em] text-white/45 transition-colors group-hover:text-white">
                Open asset cover
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </div>
          </a>

          <a
            href={getLogicAppHref("app/portfolio")}
            onClick={(event) => goToLogicApp(event, "app/portfolio")}
            className="group relative flex h-[380px] flex-col overflow-hidden rounded-2xl bg-neutral-950 transition-transform hover:-translate-y-1 sm:h-[460px]">
            <div
              className="relative w-full overflow-hidden"
              style={{ height: "75%" }}>
              <video
                className="block h-full w-full object-cover"
                src="/featured-card-video.mp4"
                autoPlay
                loop
                muted
                playsInline
              />
              <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-neutral-950" />
            </div>
            <div className="flex flex-1 items-center justify-between gap-4 p-6 sm:p-8">
              <h3 className="text-left text-xl font-light leading-tight text-white sm:text-2xl">
                Live Prices
                <br />
                Clear Choices
              </h3>
              <span className="liquid-glass rounded-full p-2 text-white">
                <ArrowUpRight className="h-5 w-5" />
              </span>
            </div>
          </a>

          <article className="relative h-[380px] overflow-hidden rounded-2xl bg-neutral-950 p-6 sm:h-[460px] sm:p-8">
            <div className="absolute -right-28 -top-28 h-56 w-56 rounded-full bg-[#1e3a8a] opacity-40 blur-3xl" />
            <div className="relative z-10 flex h-full flex-col">
              <h3 className="text-xl font-light leading-tight text-white sm:text-2xl">
                Private Receipts
                <br />
                For Rewards
              </h3>
              <p className="mt-auto max-w-[320px] text-[13px] font-light leading-relaxed text-white/70 sm:text-[14px]">
                When a reward request is created, users can keep a private
                receipt with the key details for their own records.
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  const cards = [
    {
      video:
        "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4",
      tag: "Cover",
      title: "Asset Cover",
      description:
        "Create wallet-signed cover plans that track amount, fee, safety price, expiry, and reward status.",
      href: getLogicAppHref("app/protect"),
      route: "app/protect",
    },
    {
      video:
        "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260324_151826_c7218672-6e92-402c-9e45-f1e0f454bdc4.mp4",
      tag: "Markets",
      title: "Live Prices",
      description:
        "Browse real coin prices, logos, and graphs with Stellar pinned first so normal users can understand the market quickly.",
      href: getLogicAppHref("app/portfolio"),
      route: "app/portfolio",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-black px-6 pt-28 pb-0 md:pt-40 md:pb-0">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.02)_0%,_transparent_60%)]" />
      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mb-12 flex items-end justify-between">
          <h2 className="font-serif text-3xl tracking-tight text-white md:text-5xl">
            Built for everyday users
          </h2>
          <p className="hidden text-sm text-white/40 md:block">Simple tools</p>
        </motion.div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {cards.map((card, index) => (
            <motion.a
              href={card.href}
              onClick={(event) => goToLogicApp(event, card.route)}
              key={card.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              className="liquid-glass group block rounded-3xl">
              <div className="relative aspect-video overflow-hidden">
                <video
                  className="h-full w-full object-cover"
                  src={card.video}
                  muted
                  autoPlay
                  loop
                  playsInline
                  preload="auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
              <div className="p-6 md:p-8">
                <div className="mb-5 flex items-center justify-between">
                  <p className="text-xs uppercase tracking-widest text-white/40">
                    {card.tag}
                  </p>
                  <span className="liquid-glass rounded-full p-2 text-white">
                    <ArrowUpRight className="h-5 w-5" />
                  </span>
                </div>
                <h3 className="mb-3 text-xl tracking-tight text-white md:text-2xl">
                  {card.title}
                </h3>
                <p className="text-sm leading-relaxed text-white/50">
                  {card.description}
                </p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqSection() {
  const faqs = [
    {
      question: "What does CoverFi do?",
      answer:
        "CoverFi lets you create a simple asset cover plan, watch live prices, and request rewards if your cover is activated.",
    },
    {
      question: "Do I need to give CoverFi my wallet keys?",
      answer:
        "No. You connect with Freighter and approve important actions yourself. CoverFi does not ask for your secret key.",
    },
    {
      question: "How much does it cost?",
      answer:
        "Fees usually range from 0.1% to 2% depending on the amount and cover setup. You can view the fee before using the app.",
    },
    {
      question: "Where is the money kept?",
      answer:
        "Covered funds are handled through a shared protection pool designed to support valid reward requests. The page keeps the details simple so users can understand the product quickly.",
    },
    {
      question: "What is a private receipt?",
      answer:
        "It is a clean record for each reward request you create, including the main details you may want to keep for yourself.",
    },
  ];

  return (
    <section id="faqs" className="bg-black px-6 py-28 md:py-40">
      <div className="mx-auto max-w-5xl">
        <p className="mb-5 text-xs uppercase tracking-[0.35em] text-white/40">
          FAQs
        </p>
        <h2 className="font-serif text-5xl italic leading-none text-white md:text-7xl">
          Questions before you start.
        </h2>
        <div className="mt-12 grid gap-4">
          {faqs.map((item) => (
            <article
              key={item.question}
              className="liquid-glass rounded-3xl p-6 md:p-8">
              <h3 className="text-xl text-white md:text-2xl">
                {item.question}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-white/55 md:text-base">
                {item.answer}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FooterSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["0vw", "-100vw"]);
  type FooterLink = {
    label: string;
    target?: string;
    href?: string;
    external?: boolean;
  };
  const footerColumns: { title: string; links: FooterLink[] }[] = [
    {
      title: "Explore",
      links: [
        { label: "Home", href: "/" },
        { label: "Pricing", href: "#pricing" },
        { label: "FAQs", target: "faqs" },
        { label: "Contact us", href: "#contact" },
      ],
    },
    {
      title: "Product",
      links: [
        { label: "What we do", target: "what-we-do" },
        { label: "Live prices", target: "featured" },
        { label: "Asset cover", target: "about" },
        { label: "Login", href: getLogicAppHref("login") },
      ],
    },
    {
      title: "Social",
      links: [
        { label: "GitHub", href: "https://github.com/", external: true },
        { label: "X", href: "https://x.com/", external: true },
        {
          label: "LinkedIn",
          href: "https://www.linkedin.com/",
          external: true,
        },
        {
          label: "Instagram",
          href: "https://www.instagram.com/",
          external: true,
        },
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
                <p className="mb-4 text-xs uppercase tracking-[0.35em] text-[#E1E0CC]/45">
                  Pricing
                </p>
                <h3 className="font-serif text-5xl italic leading-none md:text-8xl">
                  Simple fees, clear cover.
                </h3>
                <p className="mt-6 max-w-xl text-sm leading-relaxed text-[#E1E0CC]/60 md:text-lg">
                  CoverFi charges a small fee based on the amount you protect,
                  with every quote shown before you continue.
                </p>
                <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row md:items-start">
                  <a
                    href="#contact"
                    onClick={() => triggerSectionTransition("bottom")}
                    className="inline-flex rounded-full bg-[#E1E0CC] px-7 py-4 text-sm uppercase tracking-widest text-black transition-transform hover:scale-105">
                    Send enquiry
                  </a>
                  <a
                    href="#pricing"
                    onClick={() => triggerSectionTransition("bottom")}
                    className="inline-flex rounded-full border border-[#E1E0CC]/35 px-7 py-4 text-sm uppercase tracking-widest text-[#E1E0CC] transition-colors hover:bg-[#E1E0CC] hover:text-black">
                    View pricing
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
                  <p className="mb-4 text-xs uppercase tracking-[0.35em] text-[#E1E0CC]/45">
                    CoverFi
                  </p>
                  <h3 className="font-serif text-6xl italic leading-none md:text-9xl">
                    Protect the move.
                  </h3>
                </div>
                <a
                  href="#contact"
                  onClick={() => triggerSectionTransition("bottom")}
                  className="inline-flex w-fit rounded-full bg-[#E1E0CC] px-7 py-4 text-sm uppercase tracking-widest text-black transition-transform hover:scale-105">
                  Send enquiry
                </a>
              </div>
              <div className="grid gap-8 sm:grid-cols-3">
                {footerColumns.map((column) => (
                  <div key={column.title}>
                    <p className="mb-5 text-xs uppercase tracking-[0.3em] text-[#E1E0CC]/40">
                      {column.title}
                    </p>
                    <div className="flex flex-col items-start gap-4">
                      {column.links.map((link) => (
                        <a
                          key={link.label}
                          href={link.target ? `#${link.target}` : link.href}
                          target={link.external ? "_blank" : undefined}
                          rel={link.external ? "noreferrer" : undefined}
                          onClick={(event) => {
                            if (link.external) return;

                            if (link.target) {
                              goToSection(event, link.target);
                              return;
                            }

                            if (link.href?.startsWith("#")) {
                              triggerSectionTransition("bottom");
                            }
                          }}
                          className="coverfi-nav-link text-base text-[#E1E0CC]/70 transition-colors hover:text-[#E1E0CC]">
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

function PricingPage() {
  const tiers = [
    {
      label: "Small cover",
      fee: "0.1% - 0.5%",
      detail: "For lighter asset cover and short-term protection.",
    },
    {
      label: "Standard cover",
      fee: "0.5% - 1.2%",
      detail: "For most users who want a balanced fee and cover amount.",
    },
    {
      label: "Larger cover",
      fee: "1.2% - 2%",
      detail: "For larger amounts that need more pool support.",
    },
  ];

  return (
    <main className="min-h-screen bg-black text-[#E1E0CC]">
      <div className="noise-overlay pointer-events-none fixed inset-0 opacity-[0.16] mix-blend-overlay" />
      <SiteNav active="pricing" className="sticky top-0" />
      <section className="relative mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 py-28">
        <p className="mb-5 text-xs uppercase tracking-[0.35em] text-[#E1E0CC]/40">
          Pricing
        </p>
        <h1 className="font-serif text-6xl italic leading-none md:text-9xl">
          Fees that stay clear.
        </h1>
        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-[#E1E0CC]/60 md:text-lg">
          CoverFi charges between 0.1% and 2% depending on how much you protect
          and the cover setup. You see the fee before you continue.
        </p>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {tiers.map((tier) => (
            <article
              key={tier.label}
              className="liquid-glass rounded-3xl p-6 md:p-8">
              <p className="text-xs uppercase tracking-[0.3em] text-[#E1E0CC]/35">
                {tier.label}
              </p>
              <h2 className="mt-5 text-4xl text-[#E1E0CC]">{tier.fee}</h2>
              <p className="mt-5 text-sm leading-relaxed text-[#E1E0CC]/55">
                {tier.detail}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-6 rounded-3xl bg-[#E1E0CC]/5 p-6 md:p-8">
          <h2 className="text-2xl text-[#E1E0CC]">How funds are supported</h2>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[#E1E0CC]/55 md:text-base">
            Protected funds are supported by a shared cover pool. The pool is
            designed to help valid reward requests while keeping the user
            experience simple and transparent.
          </p>
        </div>
      </section>
    </main>
  );
}

function ContactPage() {
  const [topic, setTopic] = useState("Asset cover");
  const [customTopic, setCustomTopic] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const socialLinks = [
    { label: "GitHub", href: "https://github.com/", mark: "GH" },
    { label: "X", href: "https://x.com/", mark: "X" },
    { label: "LinkedIn", href: "https://www.linkedin.com/", mark: "in" },
    { label: "Instagram", href: "https://www.instagram.com/", mark: "IG" },
  ];

  function submitContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <main className="min-h-screen bg-black text-[#E1E0CC]">
      <div className="noise-overlay pointer-events-none fixed inset-0 opacity-[0.16] mix-blend-overlay" />
      <SiteNav active="contact" className="sticky top-0" />
      <section className="relative mx-auto grid min-h-screen max-w-6xl gap-10 px-6 py-28 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="mb-5 text-xs uppercase tracking-[0.35em] text-[#E1E0CC]/40">
            Contact us
          </p>
          <h1 className="font-serif text-6xl italic leading-none md:text-9xl">
            Talk to CoverFi.
          </h1>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-[#E1E0CC]/60 md:text-lg">
            Questions about asset cover, rewards, receipts, partnerships, or
            onboarding are welcome.
          </p>
          <div className="mt-8 grid gap-3 text-sm text-[#E1E0CC]/65">
            <a
              className="coverfi-nav-link w-fit"
              href="mailto:garvit.university@gmail.com">
              garvit.university@gmail.com
            </a>
            <a
              className="coverfi-nav-link w-fit"
              href="mailto:jainpallavi.delhi@gmail.com">
              jainpallavi.delhi@gmail.com
            </a>
          </div>
          <div className="mt-7 flex flex-wrap gap-3">
            {socialLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[#E1E0CC]/15 px-4 py-2 text-sm text-[#E1E0CC]/70 transition-colors hover:border-[#E1E0CC]/40 hover:bg-[#E1E0CC]/10 hover:text-[#E1E0CC]">
                <span className="grid h-5 w-5 place-items-center rounded-full bg-[#E1E0CC]/10 text-[10px] font-semibold uppercase text-[#E1E0CC]">
                  {item.mark}
                </span>
                {item.label}
              </a>
            ))}
          </div>
        </div>

        <form
          onSubmit={submitContact}
          className="liquid-glass rounded-3xl p-6 md:p-8">
          <label className="block">
            <span className="text-xs uppercase tracking-[0.3em] text-[#E1E0CC]/40">
              Name
            </span>
            <input
              name="name"
              required
              placeholder="Your name"
              className="mt-3 w-full rounded-2xl border border-[#E1E0CC]/15 bg-black/35 px-5 py-4 text-sm text-[#E1E0CC] outline-none placeholder:text-[#E1E0CC]/30 focus:border-[#E1E0CC]/45"
            />
          </label>

          <label className="mt-5 block">
            <span className="text-xs uppercase tracking-[0.3em] text-[#E1E0CC]/40">
              Enquiry topic
            </span>
            <select
              value={topic}
              onChange={(event) => setTopic(event.target.value)}
              className="mt-3 w-full appearance-none rounded-2xl border border-[#E1E0CC]/15 bg-black/35 px-5 py-4 pr-12 text-sm text-[#E1E0CC] outline-none transition-colors focus:border-[#E1E0CC]/45 focus:bg-black/45">
              <option>Asset cover</option>
              <option>Pricing</option>
              <option>Reward receipt</option>
              <option>Wallet support</option>
              <option>Partnership</option>
              <option>Custom</option>
            </select>
          </label>

          {topic === "Custom" && (
            <label className="mt-5 block">
              <span className="text-xs uppercase tracking-[0.3em] text-[#E1E0CC]/40">
                Custom topic
              </span>
              <input
                value={customTopic}
                onChange={(event) => setCustomTopic(event.target.value)}
                placeholder="Write your topic"
                className="mt-3 w-full rounded-2xl border border-[#E1E0CC]/15 bg-black/35 px-5 py-4 text-sm text-[#E1E0CC] outline-none placeholder:text-[#E1E0CC]/30 focus:border-[#E1E0CC]/45"
              />
            </label>
          )}

          <label className="mt-5 block">
            <span className="text-xs uppercase tracking-[0.3em] text-[#E1E0CC]/40">
              Message
            </span>
            <textarea
              name="message"
              required
              rows={6}
              placeholder="Tell us what you need help with."
              className="mt-3 w-full resize-none rounded-2xl border border-[#E1E0CC]/15 bg-black/35 px-5 py-4 text-sm text-[#E1E0CC] outline-none placeholder:text-[#E1E0CC]/30 focus:border-[#E1E0CC]/45"
            />
          </label>

          <button
            type="submit"
            className="mt-6 inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#E1E0CC] px-7 py-4 text-sm uppercase tracking-widest text-black transition-transform hover:scale-[1.02]">
            Send enquiry
            <ArrowRight className="h-4 w-4" />
          </button>

          {submitted && (
            <p className="mt-5 text-sm text-[#E1E0CC]/60">
              Thanks. Your enquiry is ready; please send it to one of the emails
              above while we connect the form backend.
            </p>
          )}
        </form>
      </section>
    </main>
  );
}

export default function App() {
  const [route, setRoute] = useState(() =>
    window.location.hash.replace("#", ""),
  );
  const routeName = route.split("?")[0];

  useEffect(() => {
    const onHashChange = () => setRoute(window.location.hash.replace("#", ""));

    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  useEffect(() => {
    const landingSections = [
      "about",
      "featured",
      "philosophy",
      "what-we-do",
      "services",
      "faqs",
      "footer",
    ];
    if (!landingSections.includes(routeName)) return;

    window.setTimeout(() => {
      document
        .getElementById(routeName)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  }, [routeName]);

  useEffect(() => {
    const redirectRoutes = [
      "login",
      "dashboard",
      "pricing",
      "contact",
      "asset-cover",
      "live-prices",
    ];
    if (redirectRoutes.includes(routeName)) return;

    const sections = gsap.utils.toArray<HTMLElement>(
      "[data-scroll-section]:not(:first-child)",
    );
    const animations = sections.map((section) =>
      gsap.fromTo(
        section,
        { autoAlpha: 0.72, y: 44 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 82%",
            once: true,
          },
        },
      ),
    );

    return () => {
      animations.forEach((animation) => {
        animation.scrollTrigger?.kill();
        animation.kill();
      });
    };
  }, [routeName]);

  if (routeName === "login") {
    return <LogicAppRedirect route="login" />;
  }

  if (routeName === "dashboard") {
    return <LogicAppRedirect route="app/dashboard" />;
  }

  if (routeName === "pricing") {
    return <PricingPage />;
  }

  if (routeName === "contact") {
    return <ContactPage />;
  }

  if (routeName === "asset-cover") {
    return <LogicAppRedirect route="app/protect" />;
  }

  if (routeName === "live-prices") {
    return <LogicAppRedirect route="app/portfolio" />;
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
      <div id="what-we-do" data-scroll-section>
        <WhatWeDoSection />
      </div>
      <div id="services" data-scroll-section>
        <ServicesSection />
      </div>
      <div data-scroll-section>
        <FaqSection />
      </div>
      <div id="footer" data-scroll-section>
        <FooterSection />
      </div>
    </main>
  );
}
