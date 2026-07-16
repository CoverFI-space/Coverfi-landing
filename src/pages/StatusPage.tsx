import {
  Activity,
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  Database,
  ExternalLink,
  RadioTower,
  Server,
  ShieldAlert,
  WalletCards,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { SiteNav } from "./LandingPage";
import {
  docsUrl,
  githubUrl,
  statusUrl,
  supportEmail,
  xUrl,
} from "../lib/links";

type CheckState = "checking" | "operational" | "degraded" | "not_configured";

type StatusCheck = {
  key: string;
  label: string;
  description: string;
  url: string;
  state: CheckState;
  latencyMs?: number;
  checkedAt?: string;
  detail?: string;
};

const apiBaseUrl = String(import.meta.env.VITE_API_BASE_URL || "").replace(/\/$/, "");
const monitorUrl = String(import.meta.env.VITE_COVERFI_MONITOR_URL || "").trim();

function configuredUrl(envName: string, fallbackPath = "") {
  const configured = String(import.meta.env[envName] || "").trim();
  if (configured) {
    if (configured.startsWith("/") && apiBaseUrl) return `${apiBaseUrl}${configured}`;
    return configured;
  }
  if (apiBaseUrl && fallbackPath) return `${apiBaseUrl}${fallbackPath}`;
  return "";
}

const checkDefinitions = [
  {
    key: "backend",
    label: "Backend API",
    description: "Express API health, Firebase readiness, AI configuration, and legal version.",
    url: configuredUrl("VITE_STATUS_BACKEND_HEALTH_URL", "/api/health"),
  },
  {
    key: "legal",
    label: "Legal Status",
    description: "Current terms version and non-insurance disclaimer served by the backend.",
    url: configuredUrl("VITE_STATUS_LEGAL_URL", "/api/legal/status"),
  },
  {
    key: "prices",
    label: "Price Feed",
    description: "Live price-provider route used by product price screens.",
    url: configuredUrl("VITE_STATUS_PRICE_URL", "/api/prices/xlm"),
  },
  {
    key: "oracle",
    label: "Oracle Freshness",
    description: "Production monitor endpoint for oracle value, timestamp, max age, and freshness.",
    url: configuredUrl("VITE_STATUS_ORACLE_URL", "/api/status/oracle"),
  },
  {
    key: "reserve",
    label: "Reserve State",
    description: "Production monitor endpoint for reserve, locked capacity, claimables, and available capacity.",
    url: configuredUrl("VITE_STATUS_RESERVE_URL", "/api/status/reserve"),
  },
  {
    key: "contracts",
    label: "Contract Registry",
    description: "Machine-readable testnet/mainnet contract registry published with the site.",
    url: "/contracts.json",
  },
];

function summarizePayload(payload: unknown) {
  if (!payload || typeof payload !== "object") return "Endpoint responded.";
  const data = payload as Record<string, unknown>;
  const contractMap = data.contracts && typeof data.contracts === "object"
    ? data.contracts as Record<string, unknown>
    : null;
  const parts = [
    typeof data.ok === "boolean" ? `ok=${data.ok}` : "",
    typeof data.termsVersion === "string" ? `terms=${data.termsVersion}` : "",
    typeof data.receiptStorage === "string" ? `records=${data.receiptStorage}` : "",
    typeof data.provider === "string" ? `provider=${data.provider}` : "",
    typeof data.network === "string" ? `network=${data.network}` : "",
    typeof data.status === "string" ? `status=${data.status}` : "",
    typeof data.symbol === "string" && typeof data.price === "number"
      ? `${data.symbol}=$${data.price.toFixed(4)}`
      : "",
    typeof data.price === "bigint" || typeof data.price === "number" || typeof data.price === "string"
      ? `oracle_price=${String(data.price)}`
      : "",
    typeof data.ageSeconds === "number" ? `age=${data.ageSeconds}s` : "",
    typeof data.maxAgeSeconds === "number" ? `max_age=${data.maxAgeSeconds}s` : "",
    data.totalReserve !== undefined ? `total=${String(data.totalReserve)}` : "",
    data.availableReserve !== undefined ? `available=${String(data.availableReserve)}` : "",
    data.lockedReserve !== undefined ? `locked=${String(data.lockedReserve)}` : "",
    data.reservedReserve !== undefined ? `reserved=${String(data.reservedReserve)}` : "",
    data.currentEpoch !== undefined ? `epoch=${String(data.currentEpoch)}` : "",
    contractMap ? `contracts=${Object.values(contractMap).filter(Boolean).length}` : "",
    typeof data.updatedAt === "string" ? `updated=${data.updatedAt}` : "",
    typeof data.checkedAt === "string" ? `checked=${data.checkedAt}` : "",
  ].filter(Boolean);
  return parts.length ? parts.join(" | ") : "Endpoint responded with JSON.";
}

async function runCheck(definition: (typeof checkDefinitions)[number]) {
  if (!definition.url) {
    return {
      ...definition,
      state: "not_configured" as CheckState,
      detail: "Endpoint is not configured yet.",
    };
  }

  const startedAt = performance.now();
  try {
    const response = await fetch(definition.url, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    const latencyMs = Math.round(performance.now() - startedAt);
    const contentType = response.headers.get("content-type") || "";
    const payload = contentType.includes("application/json")
      ? await response.json()
      : null;

    return {
      ...definition,
      state: response.ok ? ("operational" as CheckState) : ("degraded" as CheckState),
      latencyMs,
      checkedAt: new Date().toISOString(),
      detail: response.ok
        ? summarizePayload(payload)
        : `HTTP ${response.status}${payload?.message ? `: ${payload.message}` : ""}`,
    };
  } catch (error) {
    return {
      ...definition,
      state: "degraded" as CheckState,
      checkedAt: new Date().toISOString(),
      detail: error instanceof Error ? error.message : "Check failed.",
    };
  }
}

function stateLabel(state: CheckState) {
  if (state === "operational") return "Operational";
  if (state === "degraded") return "Degraded";
  if (state === "checking") return "Checking";
  return "Needs endpoint";
}

function stateClass(state: CheckState) {
  if (state === "operational") return "border-emerald-300/25 bg-emerald-300/12 text-emerald-100";
  if (state === "degraded") return "border-amber-200/25 bg-amber-200/12 text-amber-100";
  if (state === "checking") return "border-[#E1E0CC]/15 bg-[#E1E0CC]/10 text-[#E1E0CC]";
  return "border-[#E1E0CC]/12 bg-[#E1E0CC]/6 text-[#E1E0CC]/62";
}

function StatusBars({ state }: { state: CheckState }) {
  const count = 72;
  return (
    <div className="mt-5 grid grid-cols-[repeat(36,minmax(0,1fr))] gap-[3px] md:grid-cols-[repeat(72,minmax(0,1fr))]">
      {Array.from({ length: count }).map((_, index) => (
        <span
          key={index}
          className={`h-6 rounded-[1px] ${
            state === "operational"
              ? "bg-emerald-300/80"
              : state === "degraded"
                ? "bg-amber-200/80"
                : "bg-[#E1E0CC]/14"
          }`}
        />
      ))}
    </div>
  );
}

function iconClass(state: CheckState) {
  if (state === "operational") return "bg-emerald-300 text-black";
  if (state === "degraded") return "bg-amber-200 text-black";
  return "bg-[#E1E0CC]/10 text-[#E1E0CC]";
}

function CheckIcon({ state }: { state: CheckState }) {
  if (state === "operational") return <CheckCircle2 className="h-4 w-4" />;
  if (state === "degraded") return <ShieldAlert className="h-4 w-4" />;
  if (state === "checking") return <Clock3 className="h-4 w-4" />;
  return <RadioTower className="h-4 w-4" />;
}

export default function StatusPage() {
  const [checks, setChecks] = useState<StatusCheck[]>(
    checkDefinitions.map((definition) => ({
      ...definition,
      state: definition.url ? "checking" : "not_configured",
      detail: definition.url ? "Waiting for live check." : "Endpoint is not configured yet.",
    })),
  );

  async function refresh() {
    setChecks((current) =>
      current.map((item) => ({
        ...item,
        state: item.url ? "checking" : "not_configured",
      })),
    );
    const next = await Promise.all(checkDefinitions.map(runCheck));
    setChecks(next);
  }

  useEffect(() => {
    void refresh();
  }, []);

  const overall = useMemo(() => {
    if (checks.some((check) => check.state === "degraded")) return "degraded";
    if (checks.some((check) => check.state === "checking")) return "checking";
    if (checks.some((check) => check.state === "not_configured")) return "not_configured";
    return "operational";
  }, [checks]);

  const summary =
    overall === "operational"
      ? "All configured systems operational"
      : overall === "degraded"
        ? "One or more live checks need attention"
        : overall === "checking"
          ? "Checking live systems"
          : "Status endpoints need production wiring";

  return (
    <main className="relative min-h-screen overflow-hidden bg-black px-4 pb-7 text-[#E1E0CC] md:px-8 md:pb-10">
      <div className="noise-overlay pointer-events-none fixed inset-0 opacity-[0.18] mix-blend-overlay" />
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(225,224,204,0.08)_0%,_rgba(0,0,0,0)_58%)]" />

      <header className="sticky top-0 z-30 -mx-4 bg-black/78 px-4 py-2 backdrop-blur-xl md:-mx-8 md:px-8">
        <SiteNav active="status" />
      </header>

      <section className="relative z-10 mx-auto min-h-[calc(100vh-6rem)] max-w-6xl px-1 pb-8 pt-8 md:px-0 md:pt-12">
        <header className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-[#E1E0CC]/40">
              Public status
            </p>
            <h1 className="mt-4 max-w-3xl font-serif text-5xl italic leading-none text-[#E1E0CC] md:text-7xl">
              CoverFi Status.
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-[#E1E0CC]/58 md:text-base">
              Live checks for the backend, oracle freshness, reserve state,
              price routes, legal status, and the published contract registry.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 md:justify-end">
            <button
              type="button"
              onClick={() => void refresh()}
              className="inline-flex items-center gap-2 rounded-full bg-[#E1E0CC] px-5 py-3 text-[11px] font-black uppercase tracking-[0.14em] text-black transition-transform hover:scale-[1.03]">
              Refresh
              <Activity className="h-4 w-4" />
            </button>
            {monitorUrl && (
              <a
                href={monitorUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[#E1E0CC]/20 px-5 py-3 text-[11px] font-black uppercase tracking-[0.14em] text-[#E1E0CC] transition-colors hover:border-[#E1E0CC]/45 hover:bg-[#E1E0CC]/10">
                Monitor
                <ExternalLink className="h-4 w-4" />
              </a>
            )}
          </div>
        </header>

        <div className={`mt-8 flex items-center gap-3 rounded-3xl border px-5 py-4 text-sm font-black ${stateClass(overall)}`}>
          <CheckIcon state={overall} />
          {summary}
        </div>

        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          {checks.map((check) => (
            <article
              key={check.key}
              className="liquid-glass rounded-3xl p-5 md:p-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <span className={`grid h-10 w-10 place-items-center rounded-2xl ${iconClass(check.state)}`}>
                      {check.key === "backend" ? (
                        <Server className="h-4 w-4" />
                      ) : check.key === "reserve" ? (
                        <WalletCards className="h-4 w-4" />
                      ) : check.key === "contracts" ? (
                        <Database className="h-4 w-4" />
                      ) : (
                        <RadioTower className="h-4 w-4" />
                      )}
                    </span>
                    <h2 className="text-base text-[#E1E0CC] md:text-lg">
                      {check.label}
                    </h2>
                  </div>
                  <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#E1E0CC]/50">
                    {check.description}
                  </p>
                </div>
                <span className={`inline-flex w-fit items-center gap-2 rounded-full border px-3 py-2 text-xs font-black ${stateClass(check.state)}`}>
                  <CheckIcon state={check.state} />
                  {stateLabel(check.state)}
                </span>
              </div>
              <StatusBars state={check.state} />
              <div className="mt-4 flex flex-col gap-2 text-xs text-[#E1E0CC]/42 md:flex-row md:items-center md:justify-between">
                <p className="break-words">{check.detail}</p>
                <p className="shrink-0">
                  {check.latencyMs ? `${check.latencyMs} ms` : ""}
                  {check.checkedAt ? ` ${new Date(check.checkedAt).toLocaleString()}` : ""}
                </p>
              </div>
              {check.url && (
                <a
                  href={check.url}
                  target={check.url.startsWith("http") ? "_blank" : undefined}
                  rel={check.url.startsWith("http") ? "noreferrer" : undefined}
                  className="mt-4 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.14em] text-[#E1E0CC] transition-colors hover:text-white">
                  Open endpoint
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              )}
            </article>
          ))}
        </div>

        <footer className="mt-10 grid gap-4 border-t border-[#E1E0CC]/10 pt-6 text-sm text-[#E1E0CC]/48 md:grid-cols-4">
          <a className="coverfi-nav-link w-fit text-[#E1E0CC]" href="/">
            Home
          </a>
          <a className="coverfi-nav-link w-fit text-[#E1E0CC]" href={docsUrl}>
            Docs
          </a>
          <a className="coverfi-nav-link w-fit text-[#E1E0CC]" href={githubUrl} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a className="coverfi-nav-link w-fit text-[#E1E0CC]" href={xUrl} target="_blank" rel="noreferrer">
            X
          </a>
          <a className="coverfi-nav-link w-fit text-[#E1E0CC]" href={`mailto:${supportEmail}`}>
            {supportEmail}
          </a>
          <span>Status URL: {statusUrl}</span>
        </footer>
      </section>
    </main>
  );
}
