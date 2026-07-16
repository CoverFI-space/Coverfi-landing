import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const siteUrl = "https://coverfi.space";
const defaultImage = `${siteUrl}/insurance-pic-last.png`;

type SeoConfig = {
  title: string;
  description: string;
  path: string;
  image?: string;
  robots?: string;
  jsonLd?: Record<string, unknown>;
};

const routeSeo: Record<string, SeoConfig> = {
  "/": {
    title: "CoverFi | Stellar Asset Protection And Username Payments",
    description:
      "CoverFi is a Stellar and Soroban product for wallet-signed asset protection, username payments, structured receipts, and transparent reserve accounting.",
    path: "/",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "CoverFi",
      applicationCategory: "FinanceApplication",
      operatingSystem: "Web",
      url: siteUrl,
      description:
        "Wallet-signed asset protection, username payments, structured receipts, and transparent reserve accounting on Stellar.",
    },
  },
  "/pricing": {
    title: "CoverFi Pricing | Duration-Based Protection Fees",
    description:
      "See CoverFi's duration-based protection schedule for Stellar asset protection positions before wallet signing.",
    path: "/pricing",
  },
  "/asset-cover": {
    title: "CoverFi Asset Cover | Wallet-Signed Stellar Protection",
    description:
      "Create contract-defined protection positions with transparent fees, oracle checks, reserve constraints, and wallet approval.",
    path: "/asset-cover",
  },
  "/live-prices": {
    title: "CoverFi Live Prices | Stellar Market Monitoring",
    description:
      "Track live market prices used by CoverFi's protection and portfolio workflows.",
    path: "/live-prices",
  },
  "/contact": {
    title: "Contact CoverFi",
    description:
      "Contact CoverFi for protocol questions, partnerships, support, or security review discussions.",
    path: "/contact",
  },
  "/faqs": {
    title: "CoverFi FAQs | Protection, Payments, Receipts, And AI",
    description:
      "Clear answers about CoverFi asset protection, username payments, receipts, wallet safety, AI support, and Stellar network use.",
    path: "/faqs",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What does CoverFi do?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "CoverFi helps Stellar users create asset protection positions, monitor market prices, send username payments, store payment receipts, and use AI for product guidance.",
          },
        },
        {
          "@type": "Question",
          name: "Is CoverFi a wallet?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. CoverFi is not a wallet and does not custody secret keys. Users review and sign actions from their own wallet.",
          },
        },
        {
          "@type": "Question",
          name: "Is CoverFi insurance?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. CoverFi protection is not insurance and payouts are not guaranteed. Eligibility depends on contract rules, reserve state, oracle data, user signatures, and network execution.",
          },
        },
      ],
    },
  },
  "/status": {
    title: "CoverFi Status | Backend, Oracle, Reserve, And Contracts",
    description:
      "Live CoverFi operational status for backend health, legal status, price feed, oracle freshness, reserve state, monitor links, and contract registry.",
    path: "/status",
  },
  "/whitepaper": {
    title: "CoverFi Whitepaper | Reserve-Constrained Protection On Stellar",
    description:
      "Read the CoverFi whitepaper covering protection positions, reserve vault economics, oracle constraints, username payments, receipts, and protocol risks.",
    path: "/whitepaper",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "TechArticle",
      headline: "CoverFi: Reserve-Constrained Protection And Username Payments On Stellar",
      url: `${siteUrl}/whitepaper`,
      description:
        "A technical and economic overview of CoverFi's protection engine, reserve vault model, oracle assumptions, and payment receipt infrastructure.",
      publisher: {
        "@type": "Organization",
        name: "CoverFi",
        url: siteUrl,
      },
    },
  },
};

function upsertMeta(selector: string, create: () => HTMLMetaElement, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = create();
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

function setNamedMeta(name: string, content: string) {
  upsertMeta(
    `meta[name="${name}"]`,
    () => {
      const meta = document.createElement("meta");
      meta.setAttribute("name", name);
      return meta;
    },
    content,
  );
}

function setPropertyMeta(property: string, content: string) {
  upsertMeta(
    `meta[property="${property}"]`,
    () => {
      const meta = document.createElement("meta");
      meta.setAttribute("property", property);
      return meta;
    },
    content,
  );
}

function setCanonical(url: string) {
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }
  link.setAttribute("href", url);
}

function setJsonLd(config: SeoConfig, url: string) {
  const id = "coverfi-route-jsonld";
  document.getElementById(id)?.remove();
  if (!config.jsonLd) return;

  const script = document.createElement("script");
  script.id = id;
  script.type = "application/ld+json";
  script.textContent = JSON.stringify({
    ...config.jsonLd,
    url,
  });
  document.head.appendChild(script);
}

export function SeoRouteMetadata() {
  const location = useLocation();

  useEffect(() => {
    const config = routeSeo[location.pathname] || {
      title: "Page Not Found | CoverFi",
      description: "The CoverFi page you tried to reach is unavailable or has moved.",
      path: location.pathname,
      robots: "noindex, follow",
    };
    const url = `${siteUrl}${config.path}`;
    const image = config.image || defaultImage;

    document.title = config.title;
    setNamedMeta("description", config.description);
    setNamedMeta("robots", config.robots || "index, follow, max-image-preview:large");
    setPropertyMeta("og:title", config.title);
    setPropertyMeta("og:description", config.description);
    setPropertyMeta("og:url", url);
    setPropertyMeta("og:image", image);
    setNamedMeta("twitter:title", config.title);
    setNamedMeta("twitter:description", config.description);
    setNamedMeta("twitter:image", image);
    setCanonical(url);
    setJsonLd(config, url);
  }, [location.pathname]);

  return null;
}
