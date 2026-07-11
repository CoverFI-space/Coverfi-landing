import { ArrowLeft, Home } from "lucide-react";

export default function NotFoundPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-5 py-12 text-[#E1E0CC]">
      <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.18] mix-blend-overlay" />
      <a
        href="/"
        className="coverfi-nav-link absolute left-6 top-6 inline-flex items-center gap-2 text-sm text-[#E1E0CC]/70 hover:text-[#E1E0CC]">
        <ArrowLeft className="h-4 w-4" />
        Back home
      </a>
      <section className="liquid-glass w-full max-w-xl rounded-3xl p-8 text-center md:p-10">
        <p className="mb-4 text-xs uppercase tracking-[0.35em] text-[#E1E0CC]/45">
          404
        </p>
        <h1 className="font-serif text-5xl italic leading-none text-[#E1E0CC] md:text-7xl">
          Page not found.
        </h1>
        <p className="mt-5 text-sm leading-relaxed text-[#E1E0CC]/60">
          The page you tried to reach is unavailable or has moved.
        </p>
        <a
          href="/"
          className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-[#E1E0CC] px-6 py-4 text-sm uppercase tracking-widest text-black transition-transform hover:scale-[1.02]">
          <Home className="h-4 w-4" />
          Go to home
        </a>
      </section>
    </main>
  );
}
