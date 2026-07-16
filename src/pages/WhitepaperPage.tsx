import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Database,
  FileText,
  KeyRound,
  LockKeyhole,
  ReceiptText,
  ShieldCheck,
  Wallet,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { docsUrl, getLogicAppHref } from "../lib/links";
import { SiteNav } from "./LandingPage";

type WhitepaperSection = {
  id: string;
  label: string;
  title: string;
  body: string[];
  bullets?: string[];
  formula?: string;
};

const contractIds = [
  ["Protection Engine", "CAIDNTTUYR4Y6QIGVNTID73HIJHY4Y6PAALTV7GOYRMRSXKRXFVXDRU4"],
  ["Protected Balance Vault", "CCJOHOU4J3AKRBPB74XLCEUYGGFEULBKOKVIOPUQMZJZLQAN3JB4TXLD"],
  ["Reserve Vault", "CBJX4RVARTPYYUCK7D7UTNMLMBXFSD525PY7QJA222UG43AJH2YFDAZM"],
  ["Oracle Adapter", "CA2IUKPR4OTI74CSBB5ETUL3WZGX3MAOUBRTZ4X3IGEFMALGHQ2ILU4Z"],
  ["Username Registry", "CA5OPVJCELJ3SFE6CRBUFKL7J7PKVZWRWWYQZRBVLEATVUIOZAA24PBH"],
  ["Receipt Registry", "CCVVQPCU4IB6MRNCUCJDSEBMFR3CUQ7RX7BVADWIQBS4WZOSECM32Q6K"],
];

const sections: WhitepaperSection[] = [
  {
    id: "abstract",
    label: "01",
    title: "Abstract",
    body: [
      "CoverFi is a Stellar and Soroban based protection and payments product for users who want wallet-signed asset protection, username payments, structured receipts, and transparent reserve accounting.",
      "The system is not insurance and does not guarantee payouts. It defines a contract-governed mechanism where users may open short-term protection positions, pay a premium, and receive claim allocations only when contract conditions, oracle freshness, reserve capacity, and payout policy allow it.",
      "The design combines a user-facing web app, Soroban contracts for position and reserve logic, a restricted reserve-vault payout model, a custom oracle adapter, Firebase-backed history, and a human-readable username payment layer that settles through standard Stellar transactions.",
    ],
  },
  {
    id: "motivation",
    label: "02",
    title: "Motivation And Problem Statement",
    body: [
      "Crypto users can self-custody assets, but they still lack simple tools for short-duration downside protection, readable payment identity, and durable receipt records. Most protection products expose complex DeFi primitives, and most payment products still force users to trust long wallet addresses and scattered transaction history.",
      "CoverFi begins with a practical user problem: a user wants to protect an asset for a visible duration, understand the premium before signing, know where the premium goes, and keep a receipt after wallet action. The protocol therefore treats trust as an accounting and disclosure problem, not only a design problem.",
    ],
    bullets: [
      "Protection terms must be explicit before wallet signing.",
      "Reserve capacity must be checked before accepting exposure.",
      "Payouts must be constrained by reserve math instead of vague promises.",
      "Payment identity should be readable while settlement remains wallet-signed.",
      "AI may help draft actions, but it must not sign, execute, or bypass review.",
    ],
  },
  {
    id: "prior-work",
    label: "03",
    title: "Whitepaper Structure And Prior Art",
    body: [
      "The structure of this paper follows common protocol whitepaper patterns: an abstract, the problem being solved, prior concepts, system architecture, economic design, security model, limitations, applications, and references.",
      "Bitcoin's paper framed a new settlement primitive around a precise threat model and transaction flow. Ethereum's paper expanded the format by explaining applications and platform architecture. Stellar's consensus writing emphasizes practical settlement, sustainability, and trust boundaries. CoverFi follows that style by describing what the system does, what it does not do, and where the main risks remain.",
    ],
    bullets: [
      "Bitcoin pattern: define the settlement problem, transaction model, attack surface, and incentives.",
      "Ethereum pattern: define platform architecture, applications, state transitions, and concerns.",
      "Stellar pattern: define network assumptions, consensus behavior, sustainability, and payment suitability.",
      "CoverFi adaptation: define reserve-backed protection, wallet-signed payments, oracle constraints, and non-guaranteed payouts.",
    ],
  },
  {
    id: "overview",
    label: "04",
    title: "System Overview",
    body: [
      "CoverFi consists of four cooperating product layers. The protection layer creates user positions and coordinates premium collection, principal custody, reserve locking, oracle trigger checks, and claim recording. The payment layer resolves usernames to Stellar addresses and sends normal Stellar payments. The receipt layer records structured payment metadata. The AI layer assists with explanation and drafting without taking custody or execution authority.",
      "The product is designed to feel simple while making its internal accounting visible enough for users, investors, grant reviewers, and auditors to inspect.",
    ],
    bullets: [
      "Frontend: landing site, dashboard app, research site, and monitor app.",
      "Backend: account metadata, Firebase payment history, rate-limited API routes, and AI support endpoints.",
      "Contracts: protection engine, protected balance vault, reserve vault, oracle adapter, username registry, and receipt registry.",
      "Wallet: Freighter signs user transactions and remains the source of user authorization.",
    ],
  },
  {
    id: "protection-flow",
    label: "05",
    title: "Protection Position Flow",
    body: [
      "A protection position starts when a user selects an asset, amount, and duration. The contract captures the fresh oracle entry price when the wallet signs the transaction. The protected principal is moved into the protected balance vault, the premium is collected into reserve accounting, and the reserve vault locks maximum payout capacity for the position.",
      "The user may later trigger a claim check if the oracle price falls below the entry price before expiry and the oracle reading is fresh. If the position expires without eligibility, locked capacity is released and the user may withdraw principal according to contract state.",
    ],
    formula:
      "payout = min(protected_amount * (entry_price - current_price) / entry_price, protected_amount * max_payout_bps / 10_000)",
  },
  {
    id: "reserve-model",
    label: "06",
    title: "Reserve Vault And Restricted Payout Model",
    body: [
      "The reserve vault is the economic core of CoverFi. It tracks total reserves, locked exposure for active positions, reserved claim allocations, per-position locks, claim records, and epoch allocation totals. A claim is not treated as an immediate unrestricted withdrawal. Instead, it is approved into an epoch and paid according to available reserve surplus.",
      "This model addresses sequential withdrawal risk. Without restrictions, early valid claimants could drain reserve liquidity before later valid claimants receive a fair allocation. CoverFi therefore reserves a floor and applies a surplus drain limit per epoch.",
    ],
    bullets: [
      "Default reserve floor: 20 percent of total reserve.",
      "Default epoch drain: 50 percent of surplus above the floor.",
      "Claims are recorded by epoch and can receive later allocation when new liquidity enters the pool.",
      "The latest hardened deployment includes old-epoch allocation support for partially funded epochs.",
    ],
    formula:
      "free_liquidity = total_reserve - locked_reserve - reserved_reserve\nfloor = total_reserve * floor_bps / 10_000\nsurplus = max(free_liquidity - floor, 0)\nepoch_budget = min(unpaid_epoch_total, surplus * drain_bps / 10_000)",
  },
  {
    id: "premium-model",
    label: "07",
    title: "Premium Schedule And Fee Model",
    body: [
      "The product UI presents duration-based premiums: 0.30 percent for 1 day, 1.00 percent for 7 days, 1.50 percent for 14 days, and 2.50 percent for 30 days. The deployed protection engine currently enforces a fixed 30 bps testnet fee setting, so full duration-based on-chain enforcement remains an explicit future contract upgrade.",
      "The conservative early design forwards user-paid premiums into the reserve vault rather than extracting company revenue immediately. This strengthens claim capacity and aligns with the trust model expected of an early protection protocol.",
    ],
    bullets: [
      "Premiums are non-refundable after a signed position is accepted.",
      "Premiums increase reserve capital in the current model.",
      "Future revenue should use a transparent audited split or restricted surplus withdrawal model.",
      "Unrestricted admin withdrawal from claim reserves should not be used.",
    ],
  },
  {
    id: "oracle",
    label: "08",
    title: "Oracle Adapter And Price Staleness",
    body: [
      "CoverFi currently uses a custom Soroban oracle adapter on testnet. The adapter stores a scaled asset price and the timestamp of the latest update. Only the configured admin or oracle account can publish prices.",
      "The protection engine reads the adapter when evaluating claim triggers. If the price is missing, stale, or older than the configured maximum oracle age, trigger evaluation fails. This avoids paying claims against abandoned or outdated price data.",
    ],
    bullets: [
      "Price scale: 100000000 represents 1.00.",
      "Current XLM testnet oracle price seed: 100000000.",
      "Current max oracle age: 3600 seconds.",
      "Production should use multi-source feeds, deviation checks, monitoring, and emergency pause policy.",
    ],
  },
  {
    id: "username-payments",
    label: "09",
    title: "Username Payments And Receipts",
    body: [
      "CoverFi username payments do not create a new settlement rail. They use Stellar itself. The username registry maps a human-readable CoverFi username to a Stellar public address. After resolution, the app builds a standard Stellar payment transaction, Freighter displays it to the user, and the user signs from their own wallet.",
      "After the payment is confirmed, CoverFi records receipt-style metadata. Firebase stores structured app history, while on-chain receipt registries can anchor proof metadata, access permissions, disputes, and batch roots.",
    ],
    bullets: [
      "Usernames are lowercase, 3 to 24 characters, and may contain numbers or underscores.",
      "Settlement uses normal Stellar wallet-signed payment operations.",
      "Payments are irreversible after confirmation.",
      "Users must verify resolved wallet address, asset, amount, network, and wallet prompt before signing.",
    ],
  },
  {
    id: "ai-layer",
    label: "10",
    title: "AI Support Layer",
    body: [
      "CoverFi AI is positioned as a support and drafting layer, not as the protocol's core moat. It can explain product flows, help draft protection or payment intents, and prepare reviewable summaries. It cannot sign, move funds, bypass contract checks, guarantee claim outcomes, or act as an autonomous financial agent.",
      "The app should keep AI output visibly review-only. Deterministic product flows and wallet signatures remain the source of execution.",
    ],
    bullets: [
      "AI can draft a payment or protection intent.",
      "AI can explain premiums, reserves, receipts, and risk language.",
      "AI cannot execute wallet actions.",
      "AI should never invent wallet addresses, contract addresses, balances, or transaction hashes.",
    ],
  },
  {
    id: "security",
    label: "11",
    title: "Security And Trust Model",
    body: [
      "CoverFi's trust model is explicit: protection is contract-defined, reserve-constrained, oracle-dependent, and not guaranteed. The current contracts include admin authorization, pause controls, oracle freshness checks, reserve floors, epoch drain limits, owner checks, and receipt access controls.",
      "The latest hardened testnet deployment added admin-authenticated initializers, stricter username rules, receipt metadata validation, old-epoch allocation, and typed admin errors in registry flows. These improvements reduce common deployment, input, and accounting risks.",
    ],
    bullets: [
      "No user-facing transaction should move funds without wallet signature.",
      "Admin keys should move to multisig before production.",
      "Formal third-party smart-contract audit is still required before mainnet scale.",
      "Backend wallet authentication should use signed challenges for production.",
    ],
  },
  {
    id: "privacy",
    label: "12",
    title: "Data, Privacy, And Receipts",
    body: [
      "CoverFi stores app metadata, usernames, payment history, receipt metadata, and optional AI interaction context. The system should minimize sensitive data, avoid unnecessary public disclosure, and separate on-chain proof metadata from private receipt content.",
      "Receipt history is designed for user clarity and support, not public surveillance. A production version should provide export, deletion, retention, and access-control policies aligned with the Terms and Privacy Policy.",
    ],
  },
  {
    id: "governance",
    label: "13",
    title: "Governance, Admin, Pause, And Upgrade Policy",
    body: [
      "The current testnet deployment uses an admin account to initialize contracts, publish oracle prices, set parameters, close and allocate epochs, and manage emergency controls. This is practical for testnet but not sufficient for production trust.",
      "Mainnet readiness requires multisig administration, documented role separation, public upgrade notices, deployment diff review, emergency pause runbooks, and clear limits on reserve withdrawal authority.",
    ],
    bullets: [
      "Deployment key, oracle key, operations key, and emergency key should be separated.",
      "Pause controls should stop new risk creation while preserving user withdrawal paths where possible.",
      "Upgrades should be announced and documented before public use.",
      "Parameter changes should be observable through contract events and docs updates.",
    ],
  },
  {
    id: "limitations",
    label: "14",
    title: "Limitations And Risk Factors",
    body: [
      "CoverFi cannot remove all risk. Reserve-backed protection can become underfunded during correlated losses. Oracle data can be stale or wrong. Smart contracts can contain bugs. Wallet users can sign the wrong transaction. Backend services can be misconfigured. Legal treatment may differ by jurisdiction.",
      "For those reasons, CoverFi must not be marketed as insurance, a guaranteed payout product, or a risk-free protection system. It is a transparent contract-defined mechanism that needs audits, simulations, legal review, and production monitoring before wider scale.",
    ],
  },
  {
    id: "roadmap",
    label: "15",
    title: "Roadmap",
    body: [
      "The near-term roadmap is focused on turning the testnet system into a production-ready protocol. The most important technical upgrade is duration-based premium enforcement on-chain, matching the UI schedule. The most important trust upgrade is signed wallet sessions and formal smart-contract review.",
    ],
    bullets: [
      "Add on-chain duration-based premium schedule.",
      "Complete claim, epoch, and withdrawal UI states.",
      "Add signed backend wallet challenge authentication.",
      "Replace placeholder receipt hashes with canonical receipt hashing.",
      "Adopt multi-source oracle policy and monitoring.",
      "Move admin operations to multisig with public runbooks.",
      "Complete legal, privacy, and audit review before mainnet scale.",
    ],
  },
  {
    id: "conclusion",
    label: "16",
    title: "Conclusion",
    body: [
      "CoverFi is designed as a practical protection and payments layer for Stellar users. Its value is not a single feature. It is the combination of wallet-signed user control, reserve-constrained protection, readable payment identity, receipt history, and transparent risk disclosure.",
      "The system is intentionally honest about its limits. It does not promise guaranteed payouts, it does not custody secret keys, and it does not ask AI to perform financial execution. It gives users a clearer way to create protection positions and payment records while keeping the core actions verifiable through wallets, contracts, and public accounting.",
    ],
  },
];

const references = [
  ["Bitcoin: A Peer-to-Peer Electronic Cash System", "https://bitcoin.org/bitcoin.pdf"],
  ["Ethereum Whitepaper", "https://ethereum.org/en/whitepaper/"],
  ["Stellar Consensus Protocol", "https://stellar.org/papers/stellar-consensus-protocol"],
  ["CoverFi Reserve Vault Solvency Research", "https://research.coverfi.space/research/reserve-vault-solvency-research-paper"],
];

const extraSections = [
  { id: "contracts", label: "17", title: "Current Testnet Contracts" },
  { id: "references", label: "18", title: "References" },
];

const componentGroups = {
  abstract: ["Wallet signed actions", "Reserve-constrained payouts", "Non-insurance disclosure"],
  motivation: ["Readable user terms", "Visible premium", "Receipt continuity"],
  "prior-work": ["Bitcoin settlement pattern", "Ethereum application model", "Stellar payment assumptions"],
  overview: ["Frontend", "Backend", "Contracts", "Wallet"],
  "protection-flow": ["Protection Engine", "Protected Balance Vault", "Reserve Vault", "Oracle Adapter"],
  "reserve-model": ["Reserve Vault", "Locked exposure", "Epoch allocation"],
  "premium-model": ["Premium schedule", "Reserve deposits", "Future revenue split"],
  oracle: ["Oracle Adapter", "Admin publisher", "Freshness guard"],
  "username-payments": ["Username Registry", "Stellar payment", "Receipt Registry"],
  "ai-layer": ["AI draft layer", "User review", "Wallet execution"],
  security: ["Admin policy", "Pause controls", "Audit checklist"],
  privacy: ["Private receipt data", "Public proof metadata", "Retention policy"],
  governance: ["Multisig admin", "Upgrade notice", "Emergency runbook"],
  limitations: ["Oracle risk", "Reserve shortfall", "Smart contract risk"],
  roadmap: ["Premium enforcement", "Signed sessions", "Multi-source oracle"],
  conclusion: ["User control", "Transparent reserves", "Public accounting"],
  contracts: ["6 deployed testnet contracts", "Machine-readable registry", "Mainnet not deployed"],
  references: ["Bitcoin", "Ethereum", "Stellar", "CoverFi research"],
} satisfies Record<string, string[]>;

type DiagramKind = "architecture" | "protection" | "reserve" | "oracle" | "registry" | "trust";

function diagramKindFor(id: string): DiagramKind {
  if (id === "protection-flow") return "protection";
  if (id === "reserve-model" || id === "premium-model") return "reserve";
  if (id === "oracle") return "oracle";
  if (id === "username-payments" || id === "privacy" || id === "contracts") return "registry";
  if (id === "security" || id === "governance" || id === "limitations") return "trust";
  return "architecture";
}

function Node({
  label,
  detail,
  icon: Icon,
  tone = "dark",
}: {
  label: string;
  detail?: string;
  icon?: typeof ShieldCheck;
  tone?: "dark" | "light" | "accent";
}) {
  const toneClass =
    tone === "accent"
      ? "border-[#111] bg-[#111] text-[#f8f5ed]"
      : tone === "light"
        ? "border-[#111]/12 bg-[#f8f5ed] text-[#111]"
        : "border-[#111]/14 bg-white text-[#111]";

  return (
    <div className={`rounded-xl border px-3 py-3 shadow-[0_8px_20px_rgba(0,0,0,0.04)] ${toneClass}`}>
      <div className="flex items-center gap-2">
        {Icon && <Icon className="h-4 w-4 shrink-0" />}
        <span className="text-xs font-black uppercase tracking-[0.14em]">
          {label}
        </span>
      </div>
      {detail && <p className="mt-2 text-xs leading-5 opacity-62">{detail}</p>}
    </div>
  );
}

function MiniArrow({ vertical = false }: { vertical?: boolean }) {
  return vertical ? (
    <ArrowDown className="mx-auto h-4 w-4 text-[#111]/35" />
  ) : (
    <ArrowRight className="mx-auto h-4 w-4 text-[#111]/35" />
  );
}

function ArchitectureDiagram() {
  return (
    <div className="grid gap-3">
      <Node label="User wallet" detail="Freighter signs every state-changing action." icon={Wallet} />
      <MiniArrow vertical />
      <div className="grid grid-cols-2 gap-3">
        <Node label="Web app" detail="Protect, pay, claim, portfolio, AI." icon={ShieldCheck} />
        <Node label="Backend" detail="Prices, support, logs, rate limits." icon={Database} />
      </div>
      <MiniArrow vertical />
      <div className="grid grid-cols-2 gap-3">
        <Node label="Contracts" detail="Engine, vaults, oracle, registries." icon={LockKeyhole} tone="accent" />
        <Node label="Stellar" detail="Soroban state and payment settlement." icon={KeyRound} tone="light" />
      </div>
    </div>
  );
}

function ProtectionDiagram() {
  return (
    <div className="grid gap-3">
      <Node label="Protect form" detail="Asset, amount, duration." icon={ShieldCheck} />
      <MiniArrow vertical />
      <Node label="Protection Engine" detail="Captures entry price and creates position." icon={LockKeyhole} tone="accent" />
      <MiniArrow vertical />
      <div className="grid grid-cols-2 gap-3">
        <Node label="Principal" detail="Protected Balance Vault." icon={Wallet} />
        <Node label="Capacity" detail="Reserve Vault lock." icon={Database} />
      </div>
      <MiniArrow vertical />
      <Node label="Claim check" detail="Fresh oracle price decides eligibility." icon={ReceiptText} />
    </div>
  );
}

function ReserveDiagram() {
  return (
    <div className="grid gap-3">
      <Node label="Total reserve" detail="Deposits plus collected premiums." icon={Database} />
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
        <Node label="Locked" detail="Max exposure for active positions." />
        <MiniArrow />
        <Node label="Reserved" detail="Approved claim allocations." />
      </div>
      <MiniArrow vertical />
      <Node label="Floor + epoch drain" detail="Limits claim liquidity outflow during stress." icon={LockKeyhole} tone="accent" />
      <MiniArrow vertical />
      <Node label="Claim allocation" detail="Paid only within contract and reserve constraints." icon={ReceiptText} />
    </div>
  );
}

function OracleDiagram() {
  return (
    <div className="grid gap-3">
      <Node label="Publisher" detail="Configured oracle/admin account." icon={KeyRound} />
      <MiniArrow vertical />
      <Node label="Oracle Adapter" detail="Stores scaled price and last update." icon={Database} tone="accent" />
      <MiniArrow vertical />
      <div className="grid grid-cols-2 gap-3">
        <Node label="Fresh" detail="Within max age." />
        <Node label="Stale" detail="Claim check fails." />
      </div>
      <MiniArrow vertical />
      <Node label="Engine reads price" detail="Entry versus current price." icon={ShieldCheck} />
    </div>
  );
}

function RegistryDiagram() {
  return (
    <div className="grid gap-3">
      <div className="grid grid-cols-2 gap-3">
        <Node label="Username" detail="Readable handle." icon={Wallet} />
        <Node label="Receipt" detail="Structured metadata." icon={ReceiptText} />
      </div>
      <MiniArrow vertical />
      <Node label="Registry contracts" detail="Username registry and receipt registry anchor state." icon={Database} tone="accent" />
      <MiniArrow vertical />
      <Node label="Stellar payment" detail="Final settlement is wallet-signed and irreversible." icon={KeyRound} />
    </div>
  );
}

function TrustDiagram() {
  return (
    <div className="grid gap-3">
      <Node label="Admin controls" detail="Testnet admin today; multisig required before production." icon={KeyRound} />
      <MiniArrow vertical />
      <div className="grid grid-cols-2 gap-3">
        <Node label="Pause" detail="Emergency risk control." icon={LockKeyhole} />
        <Node label="Audit" detail="Third-party review before mainnet scale." icon={FileText} />
      </div>
      <MiniArrow vertical />
      <Node label="User disclosure" detail="Not insurance. Payouts are not guaranteed." icon={ShieldCheck} tone="accent" />
    </div>
  );
}

function ActiveDiagram({ activeId }: { activeId: string }) {
  const kind = diagramKindFor(activeId);

  if (kind === "protection") return <ProtectionDiagram />;
  if (kind === "reserve") return <ReserveDiagram />;
  if (kind === "oracle") return <OracleDiagram />;
  if (kind === "registry") return <RegistryDiagram />;
  if (kind === "trust") return <TrustDiagram />;
  return <ArchitectureDiagram />;
}

function SectionBlock({ section }: { section: WhitepaperSection }) {
  return (
    <section
      id={section.id}
      data-whitepaper-section
      className="scroll-mt-28 border-t border-[#111]/12 py-10 md:py-14">
      <div className="grid gap-6 md:grid-cols-[86px_1fr]">
        <div className="font-mono text-xs text-[#111]/38">{section.label}</div>
        <div>
          <h2 className="max-w-3xl text-3xl font-semibold leading-tight tracking-normal text-[#111] md:text-5xl">
            {section.title}
          </h2>
          <div className="mt-6 grid gap-5 text-base leading-8 text-[#111]/70 md:text-[17px]">
            {section.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          {section.formula && (
            <pre className="mt-7 overflow-x-auto rounded-xl border border-[#111]/12 bg-[#111] p-5 font-mono text-xs leading-6 text-[#E1E0CC]">
              {section.formula}
            </pre>
          )}
          {section.bullets && (
            <ul className="mt-7 grid gap-3 text-sm text-[#111]/70 md:grid-cols-2">
              {section.bullets.map((item) => (
                <li key={item} className="border-l border-[#111]/18 pl-4 leading-6">
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}

export default function WhitepaperPage() {
  const navigationSections = useMemo(
    () => [
      ...sections.map(({ id, label, title }) => ({ id, label, title })),
      ...extraSections,
    ],
    [],
  );
  const [activeId, setActiveId] = useState(sections[0].id);
  const activeSection =
    navigationSections.find((section) => section.id === activeId) ??
    navigationSections[0];
  const activeComponents =
    componentGroups[activeId as keyof typeof componentGroups] ??
    componentGroups.abstract;

  useEffect(() => {
    const elements = navigationSections
      .map((section) => document.getElementById(section.id))
      .filter((element): element is HTMLElement => Boolean(element));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) {
          setActiveId(visible.target.id);
        }
      },
      {
        rootMargin: "-18% 0px -58% 0px",
        threshold: [0.1, 0.25, 0.45, 0.7],
      },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [navigationSections]);

  useEffect(() => {
    const targetId = window.location.hash.replace("#", "");
    if (!targetId) return;

    window.setTimeout(() => {
      const target = document.getElementById(targetId);
      if (!target) return;

      const targetTop = target.getBoundingClientRect().top + window.scrollY - 96;
      window.scrollTo({ top: Math.max(targetTop, 0), behavior: "auto" });
      setActiveId(targetId);
    }, 360);
  }, []);

  return (
    <main className="min-h-screen bg-[#0c0c0a] text-[#111]">
      <SiteNav active="whitepaper" className="fixed left-1/2 top-2 z-50 -translate-x-1/2 md:top-0" />

      <section className="relative min-h-[72vh] overflow-hidden bg-black px-5 pb-12 pt-32 text-[#E1E0CC] md:px-8 md:pb-16 md:pt-40">
        <img
          src="/insurance-pic-last.png"
          alt="CoverFi protocol visual"
          className="absolute inset-0 h-full w-full object-cover opacity-42"
        />
        <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.35] mix-blend-overlay" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.48),rgba(0,0,0,0.78)_62%,#0c0c0a_100%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_360px] lg:items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#E1E0CC]/20 bg-black/28 px-3 py-1 text-xs text-[#E1E0CC]/78 backdrop-blur">
              <FileText className="h-3.5 w-3.5" />
              Protocol whitepaper
            </div>
            <h1 className="mt-7 max-w-5xl font-serif text-6xl italic leading-[0.9] text-[#E1E0CC] md:text-8xl">
              CoverFi: Reserve-Constrained Protection And Username Payments On Stellar
            </h1>
            <p className="mt-7 max-w-3xl text-base leading-7 text-[#E1E0CC]/72 md:text-lg">
              A technical and economic overview of CoverFi's protection engine,
              reserve vault, oracle adapter, payment identity layer, receipt
              infrastructure, trust model, and production readiness path.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 text-xs text-[#E1E0CC]/62">
              <span className="rounded-full border border-[#E1E0CC]/14 px-3 py-1.5">Version 0.1</span>
              <span className="rounded-full border border-[#E1E0CC]/14 px-3 py-1.5">Testnet deployment</span>
              <span className="rounded-full border border-[#E1E0CC]/14 px-3 py-1.5">Last updated July 2026</span>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={getLogicAppHref("app/dashboard")}
                className="inline-flex items-center gap-2 rounded-full bg-[#E1E0CC] px-5 py-3 text-sm font-medium text-black transition-opacity hover:opacity-85">
                Open app <ArrowUpRight className="h-4 w-4" />
              </a>
              <a
                href={docsUrl}
                className="inline-flex items-center gap-2 rounded-full border border-[#E1E0CC]/18 px-5 py-3 text-sm font-medium text-[#E1E0CC] transition-colors hover:bg-[#E1E0CC]/10">
                Read docs <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="rounded-3xl border border-[#E1E0CC]/16 bg-black/45 p-5 backdrop-blur-md">
            <p className="text-xs uppercase tracking-[0.3em] text-[#E1E0CC]/45">
              Architecture snapshot
            </p>
            <div className="mt-5 grid gap-3">
              <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
                <div className="rounded-2xl border border-[#E1E0CC]/14 bg-[#E1E0CC]/8 p-4">
                  <Wallet className="mb-3 h-5 w-5" />
                  <p className="text-sm font-semibold">User wallet</p>
                </div>
                <ArrowRight className="h-4 w-4 text-[#E1E0CC]/45" />
                <div className="rounded-2xl border border-[#E1E0CC]/14 bg-[#E1E0CC]/8 p-4">
                  <ShieldCheck className="mb-3 h-5 w-5" />
                  <p className="text-sm font-semibold">Protection Engine</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {["Vaults", "Oracle", "Registries"].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-[#E1E0CC]/12 bg-black/34 p-4 text-sm text-[#E1E0CC]/78">
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <p className="mt-5 text-xs leading-5 text-[#E1E0CC]/58">
              Wallet signatures authorize actions. Contracts enforce protection
              state. Reserves and oracle freshness constrain claims.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1540px] gap-8 bg-[#f5f2ea] px-5 py-8 md:px-8 lg:grid-cols-[minmax(0,1fr)_360px]">
        <article className="min-w-0 bg-[#fdfbf5] px-5 py-6 shadow-[0_18px_70px_rgba(0,0,0,0.08)] md:px-10 md:py-10 lg:px-14">
          {sections.map((section) => (
            <SectionBlock key={section.id} section={section} />
          ))}

          <section
            id="contracts"
            data-whitepaper-section
            className="scroll-mt-28 border-t border-[#111]/12 py-10 md:py-14">
          <div className="grid gap-6 md:grid-cols-[86px_1fr]">
            <div className="font-mono text-xs text-[#111]/38">17</div>
            <div>
              <h2 className="text-3xl font-semibold leading-tight tracking-normal text-[#111] md:text-5xl">
                Current Testnet Contracts
              </h2>
              <div className="mt-7 overflow-hidden rounded-xl border border-[#111]/12">
                {contractIds.map(([name, value]) => (
                  <div
                    key={name}
                    className="grid gap-2 border-b border-[#111]/10 px-4 py-3 text-sm last:border-b-0 md:grid-cols-[220px_1fr]">
                    <span className="text-[#111]/58">{name}</span>
                    <code className="break-all font-mono text-xs text-[#111]/78">{value}</code>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

          <section
            id="references"
            data-whitepaper-section
            className="scroll-mt-28 border-t border-[#111]/12 py-10 md:py-14">
          <div className="grid gap-6 md:grid-cols-[86px_1fr]">
            <div className="font-mono text-xs text-[#111]/38">18</div>
            <div>
              <h2 className="text-3xl font-semibold leading-tight tracking-normal text-[#111] md:text-5xl">
                References
              </h2>
              <div className="mt-6 grid gap-3">
                {references.map(([label, href]) => (
                  <a
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between gap-4 rounded-xl border border-[#111]/12 px-4 py-4 text-sm text-[#111]/68 transition-colors hover:bg-[#111]/5 hover:text-[#111]">
                    <span>{label}</span>
                    <ArrowUpRight className="h-4 w-4 shrink-0" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>
        </article>

        <aside className="hidden lg:block">
          <div className="sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto border-l border-[#111]/18 pl-6">
            <p className="text-xs uppercase tracking-[0.28em] text-[#111]/38">
              Active component
            </p>
            <h2 className="mt-3 text-2xl font-semibold leading-tight text-[#111]">
              {activeSection.label}. {activeSection.title}
            </h2>

            <div className="mt-5 rounded-2xl border border-[#111]/12 bg-white p-4">
              <ActiveDiagram activeId={activeId} />
            </div>

            <div className="mt-5">
              <p className="text-xs uppercase tracking-[0.24em] text-[#111]/36">
                Components in view
              </p>
              <div className="mt-3 grid gap-2">
                {activeComponents.map((item) => (
                  <div
                    key={item}
                    className="rounded-xl border border-[#111]/10 bg-white px-3 py-2 text-sm text-[#111]/68">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <nav className="mt-6 grid gap-1 border-t border-[#111]/12 pt-5">
              {navigationSections.map((section) => {
                const isActive = section.id === activeId;

                return (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className={`rounded-lg px-3 py-2 text-sm leading-5 transition-colors ${
                      isActive
                        ? "bg-[#111] text-[#f8f5ed]"
                        : "text-[#111]/55 hover:bg-[#111]/5 hover:text-[#111]"
                    }`}>
                    {section.label}. {section.title}
                  </a>
                );
              })}
            </nav>
          </div>
        </aside>
      </section>
    </main>
  );
}
