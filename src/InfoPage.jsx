import { useEffect } from "react";
import { faqPageShell } from "./faq-page-shell";
import "./coverfi-overrides.css";

const brand = "CoverFi";
const logoSrc = "/assets/logo.png";
const appUrl = "https://app.coverfi.space/";
const githubUrl = "https://github.com/coverfi-space";
const xUrl = "https://x.com/coverfidotspace";
const supportEmail = "support@coverfi.space";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Whitepaper", href: "/whitepaper" },
  { label: "FAQs", href: "/faqs" },
  { label: "Status", href: "/status" },
  { label: "Contact us", href: "/contact" },
  { label: "Docs", href: "https://docs.coverfi.space" },
];
const footerLinks = [
  ...navItems,
  { label: "GitHub", href: githubUrl },
  { label: "X", href: xUrl },
  { label: "Email", href: `mailto:${supportEmail}` },
];

const whitepaperSections = [
  {
    id: "abstract",
    label: "01",
    title: "Abstract",
    body: [
      "CoverFi is a Stellar and Soroban based protection and payments product for users who want wallet-signed asset protection, username payments, structured receipts, and transparent reserve accounting.",
      "The system is not insurance and does not guarantee payouts. It defines a contract-governed mechanism where users may open short-term protection positions, pay a premium, and receive a calculated payout only when expiry settlement, oracle data, reserve capacity, and contract rules allow it.",
      "The V2 design combines a user-facing web app, Soroban contracts for position and reserve logic, position-specific payout reservation, a custom oracle adapter with fallback publisher support, encrypted browser-local history, and a human-readable username payment layer that settles through standard Stellar transactions.",
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
      "CoverFi consists of four cooperating product layers. The protection layer creates user positions and coordinates premium collection, principal custody, reserve locking, expiry settlement, payout claims, and principal withdrawal. The payment layer resolves usernames to Stellar addresses and sends normal Stellar payments. The receipt layer anchors hashes and keeps private receipt presentation data local to the browser. The AI layer assists with explanation and drafting without taking custody or execution authority.",
      "The product is designed to feel simple while making its internal accounting visible enough for users, investors, grant reviewers, and auditors to inspect.",
    ],
    bullets: [
      "Frontend: landing site, dashboard app, research site, and monitor app.",
      "Backend: rate-limited price, AI, legal, health, status, and compatibility endpoints without an authoritative product database.",
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
      "After expiry, anyone may submit settlement. The engine uses the latest valid oracle observation at or before expiry to calculate whether the position has no payout or a claimable payout. The owner then claims any reserved CFTUSD payout and independently withdraws the protected XLM principal according to contract state.",
    ],
    formula: "payout = min(notional_loss_at_expiry, maximum_payout_locked_at_purchase)",
  },
  {
    id: "reserve-model",
    label: "06",
    title: "Reserve Vault And Restricted Payout Model",
    body: [
      "The reserve vault is the economic core of CoverFi. It tracks provider assets, shares, locked liabilities, reserved claims, unearned premiums, safety funds, automation funds, protocol revenue, underwriting results, per-position locks, and withdrawal requests.",
      "V2 avoids normal claim epochs for sold positions. The maximum payout is locked when a position opens, and a valid expiry settlement reserves the complete calculated payout for that specific position. Reserve-provider withdrawals use shares, NAV, a cooldown queue, and liquidity checks so active collateral and restricted balances cannot be withdrawn.",
    ],
    bullets: [
      "Provider shares track proportional exposure to matured premiums and realized losses.",
      "Locked liabilities back active position maximum payouts.",
      "Reserved claims represent settled payouts awaiting owner claim.",
      "Safety and automation balances remain restricted from provider or treasury withdrawals.",
    ],
    formula:
      "provider_nav = total_assets - locked_liabilities - reserved_claims - unearned_premiums - safety_balance - automation_balance\navailable_liquidity = total_assets - locked_liabilities - reserved_claims - unearned_premiums - safety_balance - automation_balance",
  },
  {
    id: "premium-model",
    label: "07",
    title: "Premium Schedule And Fee Model",
    body: [
      "The V2 engine prices positions from duration, oracle-captured notional, volatility, projected utilization, projected concentration, a safety margin, and a small automation fee. The app displays the quote components before wallet signing.",
      "Risk premium routing is configurable within bounded limits. The current V2 testnet model uses a transparent split between underwriting, protocol, safety, automation, and optional partner rewards while preventing partner rewards from touching underwriting or safety funds.",
    ],
    bullets: [
      "Premiums are non-refundable after a signed position is accepted.",
      "Unearned underwriting premium matures after settlement.",
      "Protocol commission is separated from underwriting, safety, and automation balances.",
      "Partner rewards are restricted to the protocol portion.",
    ],
  },
  {
    id: "oracle",
    label: "08",
    title: "Oracle Adapter And Price Staleness",
    body: [
      "CoverFi currently uses a custom Soroban oracle adapter for testnet development. The adapter stores bounded historical observations with scaled prices and timestamps, reads from an external source where configured, and supports a 2-of-3 fallback publisher path.",
      "The protection engine reads a fresh observation when a position opens and an observation at or before expiry when settling. Missing, stale, future, zero, negative, duplicate, or excessive-deviation observations are rejected by the adapter or the engine.",
    ],
    bullets: [
      "Price scale: 100000000 represents 1.00.",
      "Historical observations support expiry settlement.",
      "Fallback publisher quorum prevents one publisher from completing quorum twice.",
      "Production still requires independent oracle operations, monitoring, and incident runbooks before mainnet.",
    ],
  },
  {
    id: "username-payments",
    label: "09",
    title: "Username Payments And Receipts",
    body: [
      "CoverFi username payments do not create a new settlement rail. They use Stellar itself. The username registry maps a human-readable CoverFi username to a Stellar public address. After resolution, the app builds a standard Stellar payment transaction, Freighter displays it to the user, and the user signs from their own wallet.",
      "After the payment is confirmed, CoverFi can anchor receipt hashes and encrypted references on-chain. Private receipt display data and payment history remain wallet-unlocked encrypted browser-local records by default.",
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
      "CoverFi's trust model is explicit: protection is contract-defined, reserve-constrained, oracle-dependent, and not guaranteed. The V2 contracts include admin authorization, single-initialization protection, pause controls for new sales, oracle freshness and deviation checks, position-specific locks, owner checks, reserve withdrawal controls, and receipt access controls.",
      "The current implementation has passing contract and backend tests, but public V2 deployment, external audit, multisig, timelock, production oracle operations, and legal review remain required before mainnet use.",
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
      "CoverFi does not need a backend product database for profiles, legal acceptance, payment history, receipt displays, or AI history. The authenticated app stores private convenience records in wallet-unlocked AES-GCM encrypted IndexedDB, while protocol state remains on Stellar/Soroban.",
      "Public analytics should be rebuildable from contract events and privacy-safe by design: no raw wallet addresses in analytics tables, HMAC pseudonyms where needed, aggregate reporting, retention limits, and small-cohort suppression.",
    ],
  },
  {
    id: "governance",
    label: "13",
    title: "Governance, Admin, Pause, And Upgrade Policy",
    body: [
      "The current testnet development flow uses admin accounts to initialize contracts, publish oracle observations, set parameters, configure roles, and manage emergency controls. This is practical for testnet but not sufficient for production trust.",
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
      "The near-term roadmap is focused on completing a verified public V2 testnet rollout and then preparing for production gates. The most important technical work is deployment, analytics/indexing, partner sandbox completion, and end-to-end lifecycle validation. The most important trust work is formal smart-contract review, multisig, timelock, oracle operations, and legal review.",
    ],
    bullets: [
      "Deploy fresh V2 contracts on Stellar Testnet and publish verified manifests.",
      "Complete partner sandbox APIs, SDK, attribution, webhooks, and aggregate metrics.",
      "Run full end-to-end expiry settlement, payout claim, principal withdrawal, and reserve withdrawal tests.",
      "Keep private receipt, payment, profile, and AI records encrypted locally.",
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

const whitepaperContracts = [
  [
    "Protection Engine",
    "CAIDNTTUYR4Y6QIGVNTID73HIJHY4Y6PAALTV7GOYRMRSXKRXFVXDRU4"
  ],
  [
    "Protected Balance Vault",
    "CCJOHOU4J3AKRBPB74XLCEUYGGFEULBKOKVIOPUQMZJZLQAN3JB4TXLD"
  ],
  [
    "Reserve Vault",
    "CBJX4RVARTPYYUCK7D7UTNMLMBXFSD525PY7QJA222UG43AJH2YFDAZM"
  ],
  [
    "Oracle Adapter",
    "CA2IUKPR4OTI74CSBB5ETUL3WZGX3MAOUBRTZ4X3IGEFMALGHQ2ILU4Z"
  ],
  [
    "Username Registry",
    "CA5OPVJCELJ3SFE6CRBUFKL7J7PKVZWRWWYQZRBVLEATVUIOZAA24PBH"
  ],
  [
    "Receipt Registry",
    "CCVVQPCU4IB6MRNCUCJDSEBMFR3CUQ7RX7BVADWIQBS4WZOSECM32Q6K"
  ]
];

const whitepaperReferences = [
  [
    "Bitcoin: A Peer-to-Peer Electronic Cash System",
    "https://bitcoin.org/bitcoin.pdf"
  ],
  [
    "Ethereum Whitepaper",
    "https://ethereum.org/en/whitepaper/"
  ],
  [
    "Stellar Consensus Protocol",
    "https://stellar.org/papers/stellar-consensus-protocol"
  ],
  [
    "CoverFi Reserve Vault Solvency Research",
    "https://research.coverfi.space/research/reserve-vault-solvency-research-paper"
  ]
];

const whitepaperExtraSections = [
  {
    "id": "contracts",
    "label": "17",
    "title": "Legacy Testnet Contract References"
  },
  {
    "id": "references",
    "label": "18",
    "title": "References"
  }
];

const whitepaperComponentGroups = {
  "abstract": [
    "Wallet signed actions",
    "Reserve-constrained payouts",
    "Non-insurance disclosure"
  ],
  "motivation": [
    "Readable user terms",
    "Visible premium",
    "Receipt continuity"
  ],
  "prior-work": [
    "Bitcoin settlement pattern",
    "Ethereum application model",
    "Stellar payment assumptions"
  ],
  "overview": [
    "Frontend",
    "Backend",
    "Contracts",
    "Wallet"
  ],
  "protection-flow": [
    "Protection Engine",
    "Protected Balance Vault",
    "Reserve Vault",
    "Oracle Adapter"
  ],
  "reserve-model": [
    "Reserve Vault",
    "Locked liabilities",
    "Provider NAV"
  ],
  "premium-model": [
    "Premium schedule",
    "Reserve deposits",
    "Future revenue split"
  ],
  "oracle": [
    "Oracle Adapter",
    "Admin publisher",
    "Freshness guard"
  ],
  "username-payments": [
    "Username Registry",
    "Stellar payment",
    "Receipt Registry"
  ],
  "ai-layer": [
    "AI draft layer",
    "User review",
    "Wallet execution"
  ],
  "security": [
    "Admin policy",
    "Pause controls",
    "Audit checklist"
  ],
  "privacy": [
    "Private receipt data",
    "Public proof metadata",
    "Retention policy"
  ],
  "governance": [
    "Multisig admin",
    "Upgrade notice",
    "Emergency runbook"
  ],
  "limitations": [
    "Oracle risk",
    "Reserve shortfall",
    "Smart contract risk"
  ],
  "roadmap": [
    "V2 deployment",
    "Partner sandbox",
    "Multi-source oracle"
  ],
  "conclusion": [
    "User control",
    "Transparent reserves",
    "Public accounting"
  ],
  "contracts": [
    "Legacy testnet references",
    "V2 manifest pending",
    "Mainnet not deployed"
  ],
  "references": [
    "Bitcoin",
    "Ethereum",
    "Stellar",
    "CoverFi research"
  ]
};

const statusChecks = [
  {
    key: "statuspage",
    label: "Statuspage",
    description: "Public incident and component model for Dashboard, Protect, and Pay Username.",
    state: "Operational",
    detail: "Public publishing path ready for incident updates and component summaries.",
    href: "/status",
    components: ["Dashboard", "Protect", "Pay Username"],
  },
  {
    key: "backend",
    label: "Backend API",
    description: "Health, legal status, price routes, AI support, and compatibility endpoints.",
    state: "Operational",
    detail: "Core routes are represented in the readiness monitor and can be wired to live checks.",
    href: "https://docs.coverfi.space",
    components: ["Health", "Legal", "AI support"],
  },
  {
    key: "prices",
    label: "Price Feed",
    description: "Live provider route used by asset screens and protection quote surfaces.",
    state: "Operational",
    detail: "Designed for fresh XLM pricing and display-only market context before wallet signing.",
    href: "https://app.coverfi.space/",
    components: ["XLM price", "Quote display", "Provider status"],
  },
  {
    key: "oracle",
    label: "Oracle Freshness",
    description: "Oracle value, timestamp, max age, fallback publisher, and freshness checks.",
    state: "Operational",
    detail: "The whitepaper flow keeps stale, duplicate, future, and excessive-deviation observations out.",
    href: "/whitepaper#oracle",
    components: ["Adapter", "Freshness", "Fallback"],
  },
  {
    key: "reserve",
    label: "Reserve State",
    description: "Pool assets, locked liabilities, reserved claims, utilization, and available capacity.",
    state: "Operational",
    detail: "Reserve accounting stays separated between provider NAV, active locks, and restricted balances.",
    href: "/whitepaper#reserve-model",
    components: ["NAV", "Locks", "Claims"],
  },
  {
    key: "contracts",
    label: "Contract Registry",
    description: "Machine-readable Stellar and Soroban contract references published with the site.",
    state: "Publishing path ready",
    detail: "Legacy testnet contract references are visible while fresh V2 manifests are prepared.",
    href: "/whitepaper#contracts",
    components: ["Engine", "Vaults", "Registry"],
  },
  {
    key: "partners",
    label: "Partner Sandbox",
    description: "Partner APIs, SDKs, attribution, aggregate dashboard, and webhook readiness.",
    state: "Publishing path ready",
    detail: "Partner rewards are restricted to the protocol portion and never touch safety or underwriting funds.",
    href: "/#partner-portal",
    components: ["API", "SDKs", "Dashboard"],
  },
];

function copyAttributes(target, source) {
  for (const attribute of Array.from(target.attributes)) {
    target.removeAttribute(attribute.name);
  }

  for (const attribute of Array.from(source.attributes)) {
    target.setAttribute(attribute.name, attribute.value);
  }
}

function executeScript(sourceScript) {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");

    for (const attribute of Array.from(sourceScript.attributes)) {
      script.setAttribute(attribute.name, attribute.value);
    }

    if (sourceScript.src) {
      script.onload = () => resolve();
      script.onerror = () => reject(new Error(`Failed to load ${sourceScript.src}`));
      document.body.appendChild(script);
      return;
    }

    script.textContent = sourceScript.textContent;
    document.body.appendChild(script);
    resolve();
  });
}

async function executeScriptsInOrder(scripts) {
  for (const script of scripts) {
    await executeScript(script);
  }
}

function setButtonText(link, text) {
  const label = link.querySelector("[data-button-text], [data-button-alt-text], .button-alt__text, .button__text");
  if (label) {
    label.textContent = text;
    return;
  }

  link.textContent = text;
}

function setExternalTarget(link, href) {
  if (href.startsWith("http")) {
    link.setAttribute("target", "_blank");
    link.setAttribute("rel", "noreferrer");
    return;
  }

  link.removeAttribute("target");
  link.removeAttribute("rel");
}

function ensureNavListItems() {
  document.querySelectorAll(".header__nav-list, .menu__nav-list").forEach((list) => {
    const itemSelector = list.classList.contains("menu__nav-list")
      ? ".menu__nav-list-item"
      : ".header__nav-list-item";
    const items = Array.from(list.querySelectorAll(`:scope > ${itemSelector}`)).filter((item) =>
      item.querySelector(":scope > .button"),
    );
    const ctaItem = Array.from(list.querySelectorAll(`:scope > ${itemSelector}`)).find((item) =>
      item.querySelector(":scope > .button-alt"),
    );

    if (!items.length) return;

    while (items.length < navItems.length) {
      const clone = items[items.length % items.length].cloneNode(true);
      if (ctaItem) list.insertBefore(clone, ctaItem);
      else list.appendChild(clone);
      items.push(clone);
    }

    items.forEach((item, index) => {
      if (index >= navItems.length) item.remove();
    });
  });
}

function createLogoImage(className) {
  const image = document.createElement("img");
  image.src = logoSrc;
  image.alt = brand;
  image.className = className;
  image.loading = "eager";
  return image;
}

function createSocialIcon(icon) {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("fill", "currentColor");
  svg.setAttribute("aria-hidden", "true");
  svg.classList.add("coverfi-social-svg");

  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute(
    "d",
    icon === "github"
      ? "M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2.17c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.17 1.18A11 11 0 0 1 12 6.02c.98 0 1.95.13 2.87.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.58.23 2.75.11 3.04.74.81 1.19 1.83 1.19 3.09 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.68.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z"
      : "M18.9 2h3.35l-7.32 8.36L23.55 22h-6.75l-5.29-6.92L5.46 22H2.1l7.83-8.95L1.67 2h6.92l4.78 6.32L18.9 2Zm-1.18 17.95h1.86L7.58 3.94H5.59l12.13 16.01Z",
  );
  svg.appendChild(path);
  return svg;
}

function fillFooterLinks() {
  document.querySelectorAll(".footer__links, .footer__mob-links").forEach((container) => {
    const links = footerLinks.map((item) => {
      const link = document.createElement("a");
      link.href = item.href;
      link.className = "footer__link coverfi-footer-link w-inline-block";
      setExternalTarget(link, item.href);

      const span = document.createElement("span");
      span.className = "footer__bottom-text u-paragraph-extra-small";
      span.textContent = item.label;
      link.appendChild(span);
      return link;
    });

    container.classList.add("coverfi-footer-link-grid");
    container.replaceChildren(...links);
  });
}

function updateNavAndFooter(activeHref) {
  ensureNavListItems();

  document.querySelectorAll(".header__title-logo, .menu__header-title-logo").forEach((image) => {
    image.alt = brand;
    image.src = logoSrc;
    image.removeAttribute("srcset");
    image.removeAttribute("sizes");
    image.classList.add("coverfi-logo-img");
  });

  document.querySelectorAll("[data-transition-logo]").forEach((container) => {
    container.replaceChildren(createLogoImage("coverfi-transition-logo"));
  });

  document.querySelectorAll(".pop-up__button-inner").forEach((container) => {
    container.replaceChildren(createLogoImage("coverfi-popup-logo"));
  });

  document.querySelectorAll(".header__nav-list-item .button, .menu__nav-list-item .button").forEach((link, index) => {
    const navItem = navItems[index % navItems.length];
    setButtonText(link, navItem.label);
    link.setAttribute("href", navItem.href);
    link.classList.toggle("w--current", navItem.href === activeHref);
    setExternalTarget(link, navItem.href);
  });

  document.querySelectorAll(".header__nav-list-item .button-alt, .menu__login .button-alt").forEach((link) => {
    setButtonText(link, "Open CoverFi");
    link.setAttribute("href", appUrl);
    setExternalTarget(link, appUrl);
  });

  const socialLinks = [
    { icon: "x", href: xUrl, aria: "Follow CoverFi on X" },
    { icon: "github", href: githubUrl, aria: "CoverFi on GitHub" },
  ];

  document
    .querySelectorAll(
      ".header__sub .button-social, .menu__sub .button-social, .footer__socials .button-social, .footer__mob-socials .button-social",
    )
    .forEach((link, index) => {
      const social = socialLinks[index % socialLinks.length];
      link.setAttribute("href", social.href);
      link.setAttribute("aria-label", social.aria);
      link.setAttribute("target", "_blank");
      link.setAttribute("rel", "noreferrer");
      link.classList.add("coverfi-social-icon");
      const icon = link.querySelector(".button-social__icon-outer") || link;
      icon.replaceChildren(createSocialIcon(social.icon));
    });

  document.querySelectorAll(".footer__logo, .footer__logo-img").forEach((logo) => {
    logo.classList.add("coverfi-hidden-footer-logo");
    logo.setAttribute("aria-hidden", "true");
  });

  const footerVisual = document.querySelector(".footer__visual-img");
  if (footerVisual) {
    const emptyVisual = document.createElement("div");
    emptyVisual.className = "coverfi-footer-empty-visual";
    emptyVisual.setAttribute("aria-hidden", "true");
    footerVisual.replaceWith(emptyVisual);
  }

  document.querySelectorAll(".footer__top-form").forEach((form) => {
    form.id = "footer-contact";
  });

  document.querySelectorAll(".footer__form-title").forEach((title) => {
    title.textContent = "Talk to CoverFi";
  });

  document.querySelectorAll(".footer__cta .button").forEach((link, index) => {
    const href = index % 2 === 0 ? appUrl : githubUrl;
    link.setAttribute("href", href);
    setExternalTarget(link, href);
    link.classList.add("coverfi-text-button");
    link.replaceChildren();
    const span = document.createElement("span");
    span.textContent = index % 2 === 0 ? "Open CoverFi" : "Star on GitHub";
    link.appendChild(span);
  });

  document.querySelectorAll(".footer__bottom-credit").forEach((credit) => {
    credit.remove();
  });

  fillFooterLinks();
}

function cleanOldShellBits() {
  document
    .querySelectorAll(".badge, [data-box-sequence], .hero-xs__easter-egg, .box__logo-easter-egg, .faq__logo-easter-egg")
    .forEach((element) => {
      element.classList.add("coverfi-hidden-branding");
      element.setAttribute("aria-hidden", "true");
    });

  document.querySelectorAll("a[href*='coverfi.space/books']").forEach((link) => {
    link.setAttribute("href", appUrl);
  });
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function socialIconMarkup(icon) {
  const path =
    icon === "github"
      ? "M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2.17c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.17 1.18A11 11 0 0 1 12 6.02c.98 0 1.95.13 2.87.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.58.23 2.75.11 3.04.74.81 1.19 1.83 1.19 3.09 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.68.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z"
      : "M18.9 2h3.35l-7.32 8.36L23.55 22h-6.75l-5.29-6.92L5.46 22H2.1l7.83-8.95L1.67 2h6.92l4.78 6.32L18.9 2Zm-1.18 17.95h1.86L7.58 3.94H5.59l12.13 16.01Z";

  return `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" class="coverfi-contact-social-svg"><path d="${path}"></path></svg>`;
}

function diagramKindFor(id) {
  if (id === "protection-flow") return "protection";
  if (id === "reserve-model" || id === "premium-model") return "reserve";
  if (id === "oracle") return "oracle";
  if (id === "username-payments" || id === "privacy" || id === "contracts") return "registry";
  if (id === "security" || id === "governance" || id === "limitations") return "trust";
  return "architecture";
}

function illustrationDescriptionFor(id) {
  const descriptions = {
    abstract:
      "CoverFi combines wallet-signed actions, reserve limits, and clear disclosures so users can understand the product before signing.",
    motivation:
      "This section explains the user problem: protection terms, readable payments, and receipts should be understandable without hiding the contract rules.",
    "prior-work":
      "CoverFi borrows the whitepaper habit of explaining settlement, architecture, assumptions, and risks before asking users to trust a system.",
    overview:
      "The system is split into a user app, backend support routes, Soroban contracts, and wallet authorization.",
    "protection-flow":
      "A user chooses amount and duration, the contract locks capacity, expiry settlement calculates the result, and the owner claims only what rules allow.",
    "reserve-model":
      "Reserve accounting separates active liabilities, reserved claims, unearned premium, safety funds, and provider NAV.",
    "premium-model":
      "The quote is built from duration, notional amount, utilization, volatility assumptions, safety margin, and small operational fees.",
    oracle:
      "Oracle data is accepted only when freshness, timestamp, publisher, and deviation checks pass.",
    "username-payments":
      "Usernames resolve to Stellar addresses, but the final payment remains a normal wallet-signed Stellar transaction.",
    "ai-layer":
      "AI can explain and draft, but it cannot sign, execute, invent balances, or override contract and wallet checks.",
    security:
      "The trust model depends on owner checks, pause controls, admin limits, oracle guards, audits, and public operating rules.",
    privacy:
      "Private display data stays local and encrypted while public protocol state remains inspectable on Stellar/Soroban.",
    governance:
      "Production governance needs separated roles, multisig, notices, emergency runbooks, and observable parameter changes.",
    limitations:
      "The product cannot remove oracle, reserve, contract, wallet, legal, or operational risk, so the limits must stay visible.",
    roadmap:
      "The roadmap moves from V2 testnet validation toward partner tooling, monitoring, audits, multisig, and production review.",
    conclusion:
      "The project ties together user control, transparent reserve limits, readable payment identity, and honest risk disclosure.",
    contracts:
      "The contract references show the legacy testnet surface while fresh V2 manifests are prepared.",
    references:
      "The references connect CoverFi's design language to settlement, smart contract, consensus, and reserve research.",
  };

  return descriptions[id] || descriptions.overview;
}

function illustrationNodesFor(id) {
  const groups = whitepaperComponentGroups[id] || whitepaperComponentGroups.abstract;
  const kind = diagramKindFor(id);
  const connectors = {
    architecture: ["Wallet", "Web app", "Contracts", "Stellar"],
    protection: ["Protect form", "Engine", "Vault lock", "Claim check"],
    reserve: ["Reserve", "Locked", "Reserved", "Owner claim"],
    oracle: ["Publisher", "Adapter", "Freshness", "Engine read"],
    registry: ["Username", "Payment", "Receipt", "Local record"],
    trust: ["Admin", "Pause", "Audit", "Disclosure"],
  }[kind];

  return [...groups, ...connectors].slice(0, 5);
}

function whitepaperArticleMarkup(section) {
  return `
    <article id="${section.id}" data-whitepaper-section class="coverfi-paper-card">
      <span>${escapeHtml(section.label)}</span>
      <h2>${escapeHtml(section.title)}</h2>
      <div class="coverfi-paper-body">
        ${section.body.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}
      </div>
      ${
        section.formula
          ? `<pre class="coverfi-paper-formula">${escapeHtml(section.formula)}</pre>`
          : ""
      }
      ${
        section.bullets
          ? `<ul class="coverfi-paper-bullets">${section.bullets
              .map((item) => `<li>${escapeHtml(item)}</li>`)
              .join("")}</ul>`
          : ""
      }
    </article>
  `;
}

function contractsArticleMarkup() {
  return `
    <article id="contracts" data-whitepaper-section class="coverfi-paper-card">
      <span>17</span>
      <h2>Legacy Testnet Contract References</h2>
      <div class="coverfi-paper-body">
        <p>These references are kept from the current CoverFi whitepaper source so reviewers can understand the legacy testnet surface while V2 public manifests are prepared.</p>
      </div>
      <div class="coverfi-contract-grid">
        ${whitepaperContracts
          .map(
            ([label, value]) => `
              <div>
                <strong>${escapeHtml(label)}</strong>
                <code>${escapeHtml(value)}</code>
              </div>
            `,
          )
          .join("")}
      </div>
    </article>
  `;
}

function referencesArticleMarkup() {
  return `
    <article id="references" data-whitepaper-section class="coverfi-paper-card">
      <span>18</span>
      <h2>References</h2>
      <div class="coverfi-paper-body">
        <p>The CoverFi paper follows protocol-writing patterns from settlement, smart-contract, consensus, and reserve-solvency research.</p>
      </div>
      <div class="coverfi-reference-list">
        ${whitepaperReferences
          .map(
            ([label, href]) => `
              <a href="${escapeHtml(href)}" target="_blank" rel="noreferrer">
                ${escapeHtml(label)}
              </a>
            `,
          )
          .join("")}
      </div>
    </article>
  `;
}

function illustrationMarkup(section) {
  const nodes = illustrationNodesFor(section.id);
  return `
    <div data-whitepaper-illustration="${section.id}" class="coverfi-paper-illustration">
      <span>${escapeHtml(section.label)}</span>
      <h3>${escapeHtml(section.title)}</h3>
      <p>${escapeHtml(illustrationDescriptionFor(section.id))}</p>
      <div class="coverfi-paper-flow" aria-label="${escapeHtml(section.title)} explanation">
        ${nodes
          .map(
            (node, index) => `
              <div class="coverfi-paper-flow-node is-${index + 1}">
                <small>${String(index + 1).padStart(2, "0")}</small>
                ${escapeHtml(node)}
              </div>
            `,
          )
          .join("")}
      </div>
    </div>
  `;
}

function setupWhitepaperInteractions() {
  const sections = Array.from(document.querySelectorAll("[data-whitepaper-section]"));
  const navLinks = Array.from(document.querySelectorAll("[data-whitepaper-nav]"));
  const illustrations = Array.from(document.querySelectorAll("[data-whitepaper-illustration]"));
  const navPanels = Array.from(document.querySelectorAll(".coverfi-paper-nav"));

  function activate(id) {
    navLinks.forEach((link) => {
      link.classList.toggle("is-active", link.dataset.whitepaperNav === id);
    });
    illustrations.forEach((panel) => {
      panel.classList.toggle("is-active", panel.dataset.whitepaperIllustration === id);
    });
    sections.forEach((section) => {
      section.classList.toggle("is-active", section.id === id);
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const target = document.getElementById(link.dataset.whitepaperNav);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", `#${target.id}`);
      activate(target.id);
    });
  });

  navPanels.forEach((panel) => {
    panel.addEventListener(
      "wheel",
      (event) => {
        const delta = event.deltaY;
        if (!delta) return;

        panel.scrollTop += delta;
        event.preventDefault();
      },
      { passive: false },
    );
  });

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible?.target?.id) activate(visible.target.id);
    },
    { rootMargin: "-20% 0px -55% 0px", threshold: [0.1, 0.25, 0.45, 0.7] },
  );

  sections.forEach((section) => observer.observe(section));
  activate(sections[0]?.id || "abstract");
}

function whitepaperMarkup() {
  const navigationSections = [
    ...whitepaperSections.map(({ id, label, title }) => ({ id, label, title })),
    ...whitepaperExtraSections,
  ];
  const illustrationSections = navigationSections.map((section) => ({
    ...section,
    id: section.id,
  }));

  return `
    <section class="coverfi-info-hero is-whitepaper">
      <div class="coverfi-info-hero__copy">
        <p class="coverfi-info-kicker">Protocol paper</p>
        <h1>CoverFi Whitepaper</h1>
        <p>Wallet-signed asset protection, username payments, structured receipts, transparent reserve accounting, and review-only AI support for Stellar users.</p>
      </div>
    </section>
    <section class="coverfi-paper-layout">
      <aside class="coverfi-paper-nav">
        ${navigationSections
          .map(
            (section) =>
              `<a data-whitepaper-nav="${section.id}" href="#${section.id}">${escapeHtml(section.label)} ${escapeHtml(section.title)}</a>`,
          )
          .join("")}
      </aside>
      <div class="coverfi-paper-sections">
        ${whitepaperSections.map(whitepaperArticleMarkup).join("")}
        ${contractsArticleMarkup()}
        ${referencesArticleMarkup()}
      </div>
      <aside class="coverfi-paper-sticky-visual" aria-label="Active whitepaper flow">
        ${illustrationSections.map(illustrationMarkup).join("")}
        <p>Scroll the paper to change the active topic, flow, and navigation state.</p>
      </aside>
    </section>
  `;
}

function statusMarkup() {
  return `
    <section class="coverfi-info-hero is-status">
      <div class="coverfi-info-hero__copy">
        <p class="coverfi-info-kicker">Public status</p>
        <h1>CoverFi Status</h1>
        <p>Live-readiness view for backend routes, oracle freshness, reserve state, contracts, partner tools, docs, and support channels.</p>
        <div class="coverfi-status-actions">
          <a href="${appUrl}" target="_blank" rel="noreferrer">Open CoverFi</a>
          <a href="${githubUrl}" target="_blank" rel="noreferrer">View GitHub</a>
        </div>
      </div>
    </section>
    <section class="coverfi-status-summary">
      <div>
        <span class="coverfi-status-dot"></span>
        <strong>All configured systems operational</strong>
      </div>
      <p>Current readiness view for product channels, reserve visibility, oracle freshness, contract references, and partner support paths.</p>
    </section>
    <section class="coverfi-status-grid">
      ${statusChecks
        .map(
          (check, index) => `
            <article class="coverfi-status-card">
              <div class="coverfi-status-card__head">
                <div>
                  <span class="coverfi-status-service-icon">${String(index + 1).padStart(2, "0")}</span>
                  <strong>${escapeHtml(check.label)}</strong>
                </div>
                <span class="coverfi-status-pill">${escapeHtml(check.state)}</span>
              </div>
              <p>${escapeHtml(check.description)}</p>
              <div class="coverfi-status-bars" aria-hidden="true">
                ${Array.from({ length: 36 })
                  .map((_, barIndex) => `<span style="animation-delay:${(barIndex % 12) * 0.045}s"></span>`)
                  .join("")}
              </div>
              <div class="coverfi-status-components">
                ${check.components.map((component) => `<span>${escapeHtml(component)}</span>`).join("")}
              </div>
              <div class="coverfi-status-meta">
                <small>${escapeHtml(check.detail)}</small>
                <a href="${escapeHtml(check.href)}" ${check.href.startsWith("http") ? 'target="_blank" rel="noreferrer"' : ""}>Open endpoint</a>
              </div>
            </article>
          `,
        )
        .join("")}
    </section>
  `;
}

function contactMarkup() {
  return `
    <section class="coverfi-info-hero is-contact">
      <div class="coverfi-info-hero__copy">
        <h1>Talk to CoverFi</h1>
        <p>Questions about asset cover, rewards, receipts, partnerships, wallet support, or product setup are welcome.</p>
        <div class="coverfi-contact-links">
          <a href="mailto:${supportEmail}">${supportEmail}</a>
          <a class="coverfi-contact-social" href="${githubUrl}" target="_blank" rel="noreferrer" aria-label="CoverFi on GitHub">${socialIconMarkup("github")}</a>
          <a class="coverfi-contact-social" href="${xUrl}" target="_blank" rel="noreferrer" aria-label="CoverFi on X">${socialIconMarkup("x")}</a>
        </div>
      </div>
      <form class="coverfi-contact-form">
        <label>Name<input name="name" required placeholder="Your name" /></label>
        <label>Email<input name="email" type="email" required placeholder="you@example.com" /></label>
        <label class="coverfi-select-label">Topic<span class="coverfi-select-wrap"><select name="topic"><option>Asset cover</option><option>Pricing</option><option>Reward receipt</option><option>Wallet support</option><option>Partnership</option></select></span></label>
        <label>Message<textarea name="message" rows="6" required placeholder="Tell us what you need help with."></textarea></label>
        <button type="submit">Send enquiry</button>
        <p class="coverfi-contact-result" aria-live="polite"></p>
      </form>
    </section>
  `;
}

function pageMarkup(kind) {
  if (kind === "whitepaper") return whitepaperMarkup();
  if (kind === "status") return statusMarkup();
  return contactMarkup();
}

function applyInfoContent(kind) {
  const activeHref = kind === "whitepaper" ? "/whitepaper" : kind === "status" ? "/status" : "/contact";
  const title = kind === "whitepaper" ? "CoverFi Whitepaper" : kind === "status" ? "CoverFi Status" : "Contact CoverFi";

  document.title = `${title} | CoverFi`;
  document.body.classList.add("coverfi-theme", "coverfi-info-page", `coverfi-info-${kind}`);

  const main = document.querySelector(".main");
  if (main) {
    main.innerHTML = pageMarkup(kind);
  }

  updateNavAndFooter(activeHref);
  cleanOldShellBits();

  if (kind === "whitepaper") {
    setupWhitepaperInteractions();
  }

  document.querySelector(".coverfi-contact-form")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const result = document.querySelector(".coverfi-contact-result");
    if (result) {
      result.textContent = `Thanks. Your enquiry is ready. You can also email ${supportEmail}.`;
    }
  });
}

function renderMissingInfoPage(kind) {
  document.title = "CoverFi";
  document.body.classList.add("coverfi-theme");

  const main = document.createElement("main");
  main.className = "coverfi-fallback";
  main.innerHTML = `<h1>CoverFi</h1><p>The ${kind} page shell could not be loaded.</p>`;
  document.body.replaceChildren(main);
}

function InfoPage({ kind }) {
  useEffect(() => {
    let cancelled = false;

    async function renderPageShell() {
      try {
        if (cancelled) return;

        const parsedPage = new DOMParser().parseFromString(faqPageShell, "text/html");
        const scripts = Array.from(parsedPage.body.querySelectorAll("script"));
        const pageNodes = Array.from(parsedPage.body.childNodes).filter(
          (node) => node.nodeName.toLowerCase() !== "script",
        );

        copyAttributes(document.documentElement, parsedPage.documentElement);
        document.documentElement.classList.add("w-mod-js");
        if ("ontouchstart" in window || (window.DocumentTouch && document instanceof DocumentTouch)) {
          document.documentElement.classList.add("w-mod-touch");
        }

        copyAttributes(document.body, parsedPage.body);
        document.body.replaceChildren(...pageNodes.map((node) => document.importNode(node, true)));
        applyInfoContent(kind);

        await executeScriptsInOrder(scripts);
        if (!cancelled) applyInfoContent(kind);
      } catch (error) {
        console.error(error);
        if (!cancelled) renderMissingInfoPage(kind);
      }
    }

    renderPageShell();

    return () => {
      cancelled = true;
    };
  }, [kind]);

  return null;
}

export function WhitepaperPage() {
  return <InfoPage kind="whitepaper" />;
}

export function StatusPage() {
  return <InfoPage kind="status" />;
}

export function ContactPage() {
  return <InfoPage kind="contact" />;
}

export default InfoPage;
