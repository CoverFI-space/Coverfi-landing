import { ArrowLeft, LogOut } from 'lucide-react';
import { getStoredSession, clearStoredSession } from '../lib/usernameStore';

function shortAddress(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-6)}`;
}

export default function DashboardPage() {
  const session = getStoredSession();

  function handleLogout() {
    clearStoredSession();
    window.location.hash = 'login';
  }

  if (!session) {
    window.location.hash = 'login';
    return null;
  }

  return (
    <main className="min-h-screen bg-black p-6 text-[#E1E0CC]">
      <div className="noise-overlay pointer-events-none fixed inset-0 opacity-[0.18] mix-blend-overlay" />
      <div className="relative mx-auto flex min-h-[calc(100vh-3rem)] max-w-6xl flex-col">
        <nav className="flex items-center justify-between">
          <a href="#hero" className="prisma-nav-link inline-flex items-center gap-2 text-sm text-[#E1E0CC]/70 transition-colors hover:text-[#E1E0CC]">
            <ArrowLeft className="h-4 w-4" />
            Landing
          </a>
          <button onClick={handleLogout} className="inline-flex items-center gap-2 rounded-full border border-[#E1E0CC]/25 px-5 py-3 text-xs uppercase tracking-widest text-[#E1E0CC]/75 transition-colors hover:bg-[#E1E0CC] hover:text-black">
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </nav>

        <section className="flex flex-1 items-center">
          <div>
            <p className="mb-5 text-xs uppercase tracking-[0.35em] text-[#E1E0CC]/45">Dashboard</p>
            <h1 className="font-serif text-6xl italic leading-none md:text-9xl">Welcome, {session.username}.</h1>
            <p className="mt-6 max-w-xl text-sm leading-relaxed text-[#E1E0CC]/60 md:text-lg">
              Freighter connected as {shortAddress(session.walletAddress)}. The main dashboard canvas is ready for the next UI pass.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
