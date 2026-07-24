import { useEffect } from "react";
import { pageShell } from "./page-shell";
import "./coverfi-overrides.css";

const landingCopy = {
  brand: "CoverFi",
  title: "CoverFi",
  hero:
    "CoverFi helps you protect your assets, watch live prices, and get rewards through wallet-signed cover plans.",
  badge: "Open source on GitHub",
  primaryCta: "Open CoverFi",
  secondaryCta: "Star on GitHub",
  aboutTitle: "Protect your assets when the market moves against you.",
  aboutBody:
    "Simple asset cover that keeps every important action signed from your own Stellar wallet.",
  philosophyTitle: "Cover x Rewards",
  chooseAsset:
    "Pick the asset you want to protect, enter the amount, and let the contract capture the fresh oracle entry price.",
  stayControl:
    "Freighter signs the transaction, secure vaults hold the funds, and your dashboard keeps cover status, rewards, and market data in one place.",
  featureTagline: "Asset cover made simple.",
  boxTitle: "Protect the move.",
  boxLines: [
    "CoverFi charges a small fee",
    "based on the amount you protect.",
    "Every quote is shown",
    "before you continue.",
  ],
  boxBody:
    "CoverFi charges a small fee based on the amount you protect, with every quote shown before you continue.",
};

const navItems = [
  { label: "Whitepaper", href: "/whitepaper" },
  { label: "Contact us", href: "/contact" },
  { label: "Become a partner", href: "/partner" },
  { label: "Docs", href: "https://docs.coverfi.space" },
];
const headerNavItems = navItems.filter((item) =>
  ["Whitepaper", "Contact us", "Become a partner", "Docs"].includes(item.label),
);
const logoSrc = "/assets/logo.png";
const appUrl = "https://app.coverfi.space/";
const githubUrl = "https://github.com/coverfi-space";
const xUrl = "https://x.com/coverfidotspace";
const docsUrl = "https://docs.coverfi.space/";
const supportEmail = "support@coverfi.space";
const footerLinks = [
  ...navItems,
  { label: "GitHub", href: githubUrl },
  { label: "X", href: xUrl },
  { label: "Email", href: `mailto:${supportEmail}` },
];
const boxFrameSequence = {
  basePath: "/assets/new-frames-2/ezgif-frame-",
  staticFrame: "/assets/new-frames-2/ezgif-frame-001.jpg",
  frames: 50,
  digits: 3,
  indexStart: 1,
  filetype: "jpg",
  finalTextProgress: 0.8,
};
const deviceVisualSrc = "/assets/device.png";
const imageKitAssetImages = {
  assetProtect: "https://ik.imagekit.io/i0xornmct/asset-protect.png?tr=w-1200&updatedAt=1784590950008",
  marketPrice: "https://ik.imagekit.io/i0xornmct/market-price.png?tr=w-1200&updatedAt=1784590952620",
  walletSigned: "https://ik.imagekit.io/i0xornmct/wallet-signed.png?tr=w-1200&updatedAt=1784590951290",
  receipt: "https://ik.imagekit.io/i0xornmct/reciept.png?tr=w-1200&updatedAt=1784590950242",
  username: "https://ik.imagekit.io/i0xornmct/username.png?tr=w-1200&updatedAt=1784590953316",
  aiDraftSupport: "https://ik.imagekit.io/i0xornmct/ai-draf-support.png?tr=w-1200&updatedAt=1784590950098",
};

const plans = [
  ["Asset Cover", "Choose an asset, amount, and duration."],
  ["Live Prices", "Browse real coin prices and graphs."],
  ["Private Receipts", "Keep reward request details for records."],
  ["Wallet Signed", "Review every action in your own wallet."],
  ["Choose Your Asset", "Capture a fresh oracle entry price."],
  ["Stay In Control", "Track cover, reserves, and rewards."],
  ["Username Payments", "Send payments in readable product flows."],
  ["Clear Fees", "See the quote before you continue."],
];

const features = [
  [
    "Protect Assets Before Trouble",
    "Create a simple cover plan before prices move too far. You choose the asset, amount, and duration in plain terms.",
  ],
  [
    "Live Prices",
    "Browse real coin prices, logos, and graphs with Stellar pinned first so normal users can understand the market quickly.",
  ],
  [
    "Private Receipts For Rewards",
    "When a reward request is created, users can keep a private receipt with the key details for their own records.",
  ],
];

const productCards = [
  [
    "Asset Protection Plans",
    "Choose the asset, amount, and duration you want to protect, then review the quote before your wallet signs.",
  ],
  [
    "Live Market Prices",
    "Watch Stellar-first market data, price movement, logos, and charts before opening or reviewing a cover position.",
  ],
  [
    "Wallet-Signed Control",
    "Freighter approval keeps the important actions in your hands, from opening cover to payments and reward requests.",
  ],
  [
    "Private Receipts",
    "Keep structured payment and reward details for your own history without turning private notes into public text.",
  ],
  [
    "Username Payments",
    "Send XLM through readable username flows while still checking the wallet prompt before anything moves.",
  ],
  [
    "AI Draft Support",
    "Prepare reviewable payment or protection drafts with AI guidance, then verify the final app form yourself.",
  ],
];

const productCardImages = [
  imageKitAssetImages.assetProtect,
  imageKitAssetImages.marketPrice,
  imageKitAssetImages.walletSigned,
  imageKitAssetImages.receipt,
  imageKitAssetImages.username,
  imageKitAssetImages.aiDraftSupport,
];
const productCardLinks = [
  { href: "/whitepaper", label: "Read Whitepaper" },
  { href: appUrl, label: "Open CoverFi" },
  { href: docsUrl, label: "Read Docs" },
  { href: docsUrl, label: "Read Docs" },
  { href: appUrl, label: "Open CoverFi" },
  { href: docsUrl, label: "Read Docs" },
];

const introCards = [
  {
    eyebrow: "Asset cover",
    title: "Asset Protection Plans",
    body: landingCopy.aboutBody,
    image: imageKitAssetImages.assetProtect,
  },
  {
    eyebrow: "Live prices",
    title: "Live Market Prices",
    body: "Watch market movement, price context, and the quote inputs before opening a cover position.",
    image: imageKitAssetImages.marketPrice,
  },
  {
    eyebrow: "Wallet signed",
    title: "Wallet-Signed Control",
    body: landingCopy.stayControl,
    image: imageKitAssetImages.walletSigned,
  },
  {
    eyebrow: "Username payments",
    title: "Username Payments",
    body: "Send XLM through readable username flows while still checking the wallet prompt before anything moves.",
    image: imageKitAssetImages.username,
  },
  {
    eyebrow: "Private receipts",
    title: "Private Receipts",
    body: "Keep structured payment and reward details for your own history without turning private notes into public text.",
    image: imageKitAssetImages.receipt,
  },
  {
    eyebrow: "AI draft support",
    title: "AI Draft Support",
    body: "Prepare reviewable payment or protection drafts with AI guidance, then verify the final form yourself.",
    image: imageKitAssetImages.aiDraftSupport,
  },
];

const rewardDefaultItems = [
  "Reserve",
  "Oracle",
  "Username",
  "Receipts",
  "Drafts",
  "Partners",
  "Claims",
  "Wallet",
];

const rewardHoverItems = [
  "Capacity",
  "Freshness",
  "Payments",
  "Proof",
  "Review",
  "Revenue",
  "Payouts",
  "Signing",
];
const rewardHoverImageSet = [
  { src: imageKitAssetImages.assetProtect, alt: "Asset protection dashboard" },
  { src: imageKitAssetImages.marketPrice, alt: "Live market prices dashboard" },
  { src: imageKitAssetImages.username, alt: "Username payment flow" },
  { src: imageKitAssetImages.receipt, alt: "Private receipt screen" },
  { src: imageKitAssetImages.aiDraftSupport, alt: "AI draft support flow" },
  { src: imageKitAssetImages.walletSigned, alt: "Wallet signed approval flow" },
];

const testimonials = [
  {
    name: "Tael Labs",
    role: "Design feedback",
    logo: "/assets/logo-tael.png",
    badge: ["UI", "OK"],
    quote:
      "The UI feels polished and the idea is genuinely useful. CoverFi comes across like a real product, not a thin AI wrapper.",
  },
  {
    name: "Orbit Desk",
    role: "Stellar builder",
    logo: "/assets/logo.png",
    badge: ["UX", "01"],
    quote:
      "The wallet-signed flow is clear. You see the amount, fee, entry price, and reserve state before approving anything.",
  },
  {
    name: "Nova Pay",
    role: "Payments team",
    logo: "/assets/XLM.webp",
    badge: ["PAY", "02"],
    quote:
      "Username payments make the product feel approachable while still keeping final approval inside the user's wallet.",
  },
  {
    name: "ClearVault",
    role: "Risk reviewer",
    logo: "/assets/usdc.webp",
    badge: ["SAFE", "03"],
    quote:
      "The private receipt flow is a strong touch. It gives users a readable record without making every note public.",
  },
  {
    name: "Signal Studio",
    role: "Product operator",
    logo: "/assets/market-price.png",
    badge: ["LIVE", "04"],
    quote:
      "Live prices beside the cover workflow make the decision feel grounded. The quote is easier to trust when the context is right there.",
  },
  {
    name: "Partner Grid",
    role: "Integration lead",
    logo: "/assets/wallet-signed.png",
    badge: ["API", "05"],
    quote:
      "The partner direction is promising: dashboard, API hooks, SDK support, and signed user actions all fit together cleanly.",
  },
];

const flowSteps = [
  [
    "Plan Your Cover",
    "Choose the asset, amount, and duration you want to protect before market movement becomes a problem.",
  ],
  ["Review And Sign", "See the fee, entry price, duration, and reserve state, then approve the action from your own wallet."],
  ["Claim Compensation", "If contract conditions are met, request rewards as compensation with clear status and private receipts."],
  ["Pay By Username", "Send readable username-based payments while keeping wallet approval at the center of every transfer."],
];

const faqItems = [
  [
    "What does CoverFi do?",
    "CoverFi helps Stellar users create asset protection positions, monitor market prices, send username payments, store payment receipts, and use AI for product guidance.",
  ],
  [
    "Who is CoverFi for?",
    "CoverFi is for Stellar users who want a simpler way to review asset protection, payments, receipts, and wallet activity without giving up self-custody.",
  ],
  [
    "Is CoverFi a wallet?",
    "No. CoverFi is not a wallet and does not custody your secret keys. It connects to wallet software such as Freighter so you can review and sign actions yourself.",
  ],
  [
    "Which network does CoverFi use?",
    "CoverFi is built for Stellar and Soroban. The current product flows are designed around Stellar wallet signatures, Stellar assets, and Soroban smart contracts.",
  ],
  [
    "Do I need crypto experience to use it?",
    "You should understand basic wallet safety and transaction review. CoverFi simplifies the workflow, but you are still responsible for checking every amount, address, fee, and wallet prompt before signing.",
  ],
  [
    "Do I need to give CoverFi my wallet keys?",
    "No. CoverFi uses wallet approval flows. You connect with Freighter and sign important actions from your own wallet.",
  ],
  [
    "Can CoverFi move funds without my approval?",
    "No. User-facing transactions require wallet approval. Always read the wallet prompt before signing because blockchain transactions can be irreversible.",
  ],
  [
    "What should I verify before signing?",
    "Check the asset, amount, recipient, duration, entry price, premium, network, and contract or wallet address shown in the wallet prompt.",
  ],
  [
    "What happens if I use the wrong network?",
    "Transactions may fail or may not appear where you expect. Make sure your wallet is on the same Stellar network shown in the app before signing.",
  ],
  [
    "Has CoverFi been audited?",
    "CoverFi should be treated as beta software until formal contract and backend audits are complete. Do not use funds you cannot afford to risk.",
  ],
  [
    "How much does protection cost?",
    "The current product schedule is 0.30% for 1 day, 1.00% for 7 days, 1.50% for 14 days, and 2.50% for 30 days. The app shows the fee before you continue.",
  ],
  [
    "Where do protection premiums go?",
    "In the current contract model, premiums are collected by the reserve vault, where they strengthen claim capacity.",
  ],
  [
    "What is a protection position?",
    "A protection position is a wallet-signed record with an asset, protected amount, duration, oracle-captured entry price, premium, and expiry. It is evaluated by contract rules and oracle data.",
  ],
  [
    "What is the entry price?",
    "The entry price is the fresh oracle price captured when the position is created. At expiry settlement, the contract compares a valid expiry-time observation with that entry price and can calculate a capped eligible payout.",
  ],
  [
    "What happens when a position expires?",
    "Anyone may submit expiry settlement. If the expiry observation produces no payout, unused locked payout capacity is released and the owner may withdraw principal. If it produces a payout, the owner may claim the reserved payout and withdraw principal through separate contract actions.",
  ],
  [
    "How are claim payouts funded?",
    "Eligible payouts are supported by the reserve vault. The reserve tracks provider assets, locked liabilities, reserved claims, unearned premiums, safety funds, automation funds, provider NAV, and available liquidity.",
  ],
  [
    "Why is payout capacity locked per position?",
    "V2 locks the maximum payout when a position opens. That makes settlement deterministic: a valid settled payout is reserved for that position instead of competing with other claims for a later allocation.",
  ],
  [
    "Can I withdraw immediately after a claim is approved?",
    "After settlement, the owner can submit the relevant withdrawal actions when contract state allows it. Payout claims and protected-principal withdrawals are separate wallet-signed transactions.",
  ],
  [
    "Is CoverFi insurance?",
    "No. CoverFi protection is not insurance and payouts are not guaranteed. Eligibility depends on contract rules, reserve state, oracle data, user signatures, and network execution.",
  ],
  [
    "What is a private receipt?",
    "A private receipt is structured payment metadata saved for history and recordkeeping after a wallet-signed payment.",
  ],
  [
    "Where is payment history stored?",
    "Payment history and receipt display data are stored in wallet-unlocked encrypted browser storage by default. On-chain receipt records anchor hashes and encrypted references, not private receipt text.",
  ],
  [
    "Can I pay someone by username?",
    "Yes. CoverFi resolves registered usernames to wallet addresses so users can send XLM without manually pasting long public keys.",
  ],
  [
    "Can I reverse a payment?",
    "No. Stellar payments are generally irreversible after confirmation. Always verify the username, wallet address, amount, and asset before signing.",
  ],
  [
    "What if I send funds to the wrong username?",
    "CoverFi cannot automatically recover funds sent to the wrong recipient. Contact the recipient if possible and keep the receipt for your records.",
  ],
  [
    "Which asset can I send by username?",
    "The current username payment flow is focused on XLM. Additional Stellar assets require proper asset configuration and wallet support.",
  ],
  [
    "Can other users see my receipts?",
    "Private receipt display data stays local to your browser unless you export or share it. On-chain receipt anchors, hashes, access grants, and dispute metadata are public contract records.",
  ],
  [
    "Can CoverFi AI create actions for me?",
    "CoverFi AI can prepare reviewable payment and protection drafts. It cannot sign transactions, move funds, or bypass wallet approval.",
  ],
  [
    "Can CoverFi AI guarantee a claim outcome?",
    "No. AI can explain workflows and prepare drafts, but claim outcomes depend on contracts, reserve state, oracle data, and wallet-signed actions.",
  ],
  [
    "Should I trust AI answers as financial advice?",
    "No. CoverFi AI is a support layer, not financial, legal, tax, or investment advice. Verify information independently before acting.",
  ],
  [
    "What can AI help me draft?",
    "It can help prepare payment or protection drafts such as a recipient, amount, asset, or duration. You still review the live entry price, final app form, and wallet prompt before signing.",
  ],
  [
    "Can AI access my wallet secret key?",
    "No. Never share wallet secret keys with any AI or website. CoverFi does not need your secret key to operate.",
  ],
];

const textReplacements = new Map([
  ["Whitepaper", navItems[1].label],
  ["Gifting", navItems[2].label],
  ["FAQ", navItems[2].label],
  ["Log-in / Sign-up", landingCopy.primaryCta],
  ["Log-in / Sign-up now", landingCopy.primaryCta],
  ["Sign-up now!", landingCopy.primaryCta],
  ["Want to join the Club?", "Ready to protect assets?"],
  ["A gift so good you're going to want to borrow it", landingCopy.title],
  ["A gift so good you’re going to want to borrow it", landingCopy.title],
  ["Unbox stories worth talking about", landingCopy.title],
  [
    "Join the book club thatâ€™s anything but traditional. Choose up to 3 new reads every month, delivered to your door. Then dive into the stories, and the conversations.",
    landingCopy.hero,
  ],
  ["Shipping to the USA & Canada", landingCopy.badge],
  ["1st book only $4 w/ code SUMMER (USA-only)!", "Wallet-signed asset cover on Stellar."],
  ["Shop gifts!", landingCopy.primaryCta],
  ["Add to box!", "Get Started"],
  ["Mentioned by", landingCopy.badge],
  ["Our July books", "Asset cover made simple."],
  ["We drop new books on the 1st of every month. Call us creatures of habit.", landingCopy.aboutBody],
  ["Discover hidden gems and buzzy new releases", "Protect assets, watch prices, and keep reward receipts."],
  ["How it works", "How CoverFi works"],
  ["Consider us your professional book curator", "Simple asset cover"],
  ["Become a member", landingCopy.primaryCta],
  ["Explore our books", flowSteps[0][0]],
  [
    "The first of every month we reveal 6-7 new books. Follow us on socials to keep an eye on any hints we may post.",
    flowSteps[0][1],
  ],
  ["Build your box", flowSteps[1][0]],
  ["Check your doorstop", flowSteps[2][0]],
  ["Share your reads", flowSteps[3][0]],
  ["Each box includes a bookmark per book and postcard with a challenge to win a free credit!", landingCopy.boxBody],
  ["Choose from", landingCopy.philosophyTitle],
  ["We've got a book for every kind of reader", landingCopy.stayControl],
  ["Common questions", "CoverFi FAQs"],
  [
    "Gift a subscription and they can pick their own books. No spying on shelves needed. Order today and instantly receive an e-gift card to print out or forward. If youâ€™re lucky, they might let you borrow a copy.",
    "Protect your assets before trouble, then track live prices, rewards, and private receipts from one wallet-signed experience.",
  ],
  ["Membersâ€™ Choice Winners", "Testimonials"],
  ["CoverFi Exclusive", "Private Receipts For Rewards"],
  ["Our subscriptions", "Simple fees, clear cover."],
  ["USA", "Protect"],
  ["Canada", "Track"],
  ["A gift outside of the box", landingCopy.featureTagline],
  ["Made for readers by readers", landingCopy.boxTitle],
  ["Gifting FAQ", "CoverFi FAQs"],
  ["Show all FAQ", "Show all FAQs"],
  ["Join our mailing list", "Talk to CoverFi"],
  ["Subscribe", "Send enquiry"],
  ["Thank you, you joined us!", "Thank you, we received it."],
  ["Terms of Service", "Terms"],
  ["Privacy Policy", "Privacy"],
  ["©2026 CoverFi. All rights reserved.", "(c) 2026 CoverFi. All rights reserved."],
  ["Â©2026 CoverFi. All rights reserved.", "(c) 2026 CoverFi. All rights reserved."],
]);

function copyAttributes(target, source) {
  for (const attribute of Array.from(target.attributes)) {
    target.removeAttribute(attribute.name);
  }

  for (const attribute of Array.from(source.attributes)) {
    target.setAttribute(attribute.name, attribute.value);
  }
}

function isSameOriginAsset(script) {
  if (!script.src) return false;

  const url = new URL(script.src, window.location.href);
  return url.origin === window.location.origin && url.pathname.startsWith("/assets/");
}

function executeScript(sourceScript) {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");

    for (const attribute of Array.from(sourceScript.attributes)) {
      script.setAttribute(attribute.name, attribute.value);
    }

    if (isSameOriginAsset(sourceScript)) {
      script.removeAttribute("integrity");
      script.removeAttribute("crossorigin");
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

function replaceVisibleText() {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const textNodes = [];

  while (walker.nextNode()) {
    textNodes.push(walker.currentNode);
  }

  for (const node of textNodes) {
    const normalized = node.nodeValue.replace(/\s+/g, " ").trim();
    const replacement = textReplacements.get(normalized);

    if (replacement) {
      node.nodeValue = node.nodeValue.replace(node.nodeValue.trim(), replacement);
    }
  }
}

function setText(selector, text) {
  const element = document.querySelector(selector);
  if (element) element.textContent = text;
}

function setAllText(selector, values) {
  document.querySelectorAll(selector).forEach((element, index) => {
    if (values[index]) element.textContent = values[index];
  });
}

function setCycledText(selector, values) {
  document.querySelectorAll(selector).forEach((element, index) => {
    element.textContent = values[index % values.length];
  });
}

function setCycledImages(selector, sources, labels) {
  document.querySelectorAll(selector).forEach((image, index) => {
    const source = sources[index % sources.length];
    const label = labels[index % labels.length];
    image.removeAttribute("srcset");
    image.removeAttribute("sizes");
    image.src = source;
    image.alt = label;
    image.loading = "lazy";
    image.decoding = "async";
    image.classList.add("coverfi-feature-card-img");
  });
}

function setButtonText(link, text) {
  const label = link.querySelector("[data-button-text], [data-button-alt-text], .button-alt__text, .button__text");
  if (label) {
    label.textContent = text;
    return;
  }

  link.textContent = text;
}

function setLineBreakText(selector, lines) {
  const element = document.querySelector(selector);
  if (!element) return;

  element.replaceChildren();
  lines.forEach((line, index) => {
    if (index) element.appendChild(document.createElement("br"));
    element.appendChild(document.createTextNode(line));
  });
}

function ensureNavListItems() {
  document.querySelectorAll(".header__nav-list, .menu__nav-list").forEach((list) => {
    const links = list.classList.contains("menu__nav-list") ? navItems : headerNavItems;
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

    while (items.length < links.length) {
      const clone = items[items.length % items.length].cloneNode(true);
      if (ctaItem) {
        list.insertBefore(clone, ctaItem);
      } else {
        list.appendChild(clone);
      }
      items.push(clone);
    }

    items.forEach((item, index) => {
      if (index >= links.length) item.remove();
    });
  });
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

function addHeroDetails() {
  const heroContent = document.querySelector(".hero-xs__content, .hero__content");
  if (!heroContent) return;

  document.querySelectorAll(".coverfi-hero-copy, .coverfi-hero-badge, .coverfi-powered-by").forEach((element) => {
    element.remove();
  });

  const heroHeader = heroContent.querySelector(".hero__header") || heroContent;
  const poweredBy = document.createElement("div");
  poweredBy.className = "coverfi-powered-by";
  poweredBy.innerHTML = `
    <span>Powered by</span>
    <img src="/assets/XLM.webp" alt="Stellar" loading="eager" decoding="async" />
  `;
  heroHeader.prepend(poweredBy);

  const note = heroContent.querySelector(".hero__text-wrap");
  note?.classList.add("coverfi-hero-note-hidden");

  const action = heroContent.querySelector(".hero-xs__action, .button-alt");
  if (action) {
    action.setAttribute("href", "https://app.coverfi.space/");
    action.setAttribute("target", "_blank");
    action.setAttribute("rel", "noreferrer");
    setButtonText(action, landingCopy.primaryCta);
  }
}

function addIntroCards() {
  const subscription = document.querySelector(".subscription__inner");
  if (!subscription || subscription.querySelector(".coverfi-intro-grid")) return;

  const grid = document.createElement("div");
  grid.className = "coverfi-intro-grid";
  grid.innerHTML = introCards
    .map(
      (card) => `
        <article class="coverfi-intro-card">
          <figure class="coverfi-intro-card__media">
            <img src="${card.image}" alt="${card.title}" loading="lazy" decoding="async" />
          </figure>
          <span>${card.eyebrow}</span>
          <h3>${card.title}</h3>
          <p>${card.body}</p>
        </article>
      `,
    )
    .join("");

  const content = subscription.querySelector(".subscription__content");
  subscription.insertBefore(grid, content);
}

function updatePlanCards() {
  setText(".subscription__title", "Simple fees, clear cover.");
  setAllText(".subscription__box-title", plans.map(([title]) => title));
  setAllText(".subscription__box-price", plans.map(([, body]) => body));

  document.querySelectorAll(".subscription__box .button-alt").forEach((link, index) => {
    setButtonText(link, index % 2 === 0 ? landingCopy.primaryCta : "View pricing");
    link.setAttribute("href", "https://app.coverfi.space/");
    link.setAttribute("target", "_blank");
  });

  setAllText(".tabs__button-text", ["Protect", "Track"]);
}

function updateProductCardLinks() {
  document
    .querySelectorAll(".books-slider__list:not(.is--books-list) > .books-slider__list-item")
    .forEach((item, index) => {
      const card = productCards[index % productCards.length];
      const destination = productCardLinks[index % productCardLinks.length];
      const overlayLink = item.querySelector(".books-slider__item-link");
      const ctaLink = item.querySelector(".books-slider__item-cta:not(.is--exclusive-slider) .button-alt");

      [overlayLink, ctaLink].forEach((link) => {
        if (!link) return;

        link.setAttribute("href", destination.href);
        link.setAttribute("aria-label", `${destination.label}: ${card[0]}`);
        setExternalTarget(link, destination.href);
      });

      if (ctaLink) setButtonText(ctaLink, destination.label);
    });
}

function updateRewardHoverImages() {
  document.querySelectorAll(".genre__holder").forEach((holder, holderIndex) => {
    holder.querySelectorAll(".genre__img").forEach((image, imageIndex) => {
      const asset = rewardHoverImageSet[(imageIndex + holderIndex * 2) % rewardHoverImageSet.length];

      image.src = asset.src;
      image.alt = asset.alt;
      image.loading = "lazy";
      image.decoding = "async";
      image.removeAttribute("srcset");
      image.removeAttribute("sizes");
      image.classList.add("coverfi-reward-hover-img");
    });
  });
}

function updateExclusiveReceiptCard() {
  const exclusive = document.querySelector(".exclusive-slider");
  if (!exclusive) return;

  setText(".exclusive-slider .books-slider__item-title", "Wallet-Signed Control");

  const paragraph = exclusive.querySelector(".books-slider__item-paragraph p");
  if (paragraph) {
    paragraph.textContent =
      "Review the amount, fee, asset, and destination inside your wallet before any CoverFi action is approved.";
  }

  const image = exclusive.querySelector(".books-slider__item-img");
  if (image) {
    image.src = imageKitAssetImages.walletSigned;
    image.alt = "Wallet signed approval preview";
    image.loading = "lazy";
    image.decoding = "async";
    image.removeAttribute("srcset");
    image.removeAttribute("sizes");
    image.classList.add("coverfi-exclusive-wallet-img");
  }

  const tags = exclusive.querySelectorAll(".tag-small__text");
  ["Wallet", "Signed"].forEach((text, index) => {
    if (tags[index]) tags[index].textContent = text;
  });

  setText(".exclusive-slider .books-slider__review-title", "Approval");
  setText(".exclusive-slider .books-slider__review-number", "Signed");
  setText(".exclusive-slider__authors-title", "Wallet Details");
  setText(".exclusive-slider__authors-paragraph", "Asset, amount, fee, duration, destination, network, and wallet prompt");
}

function updateHomePageContent() {
  setText(".hero__title", landingCopy.title);
  setText(".hero__paragraph", landingCopy.hero);
  setText(".hero__text", landingCopy.badge);
  setText(".books__title", "Asset cover made simple.");
  setText(".books__paragraph", landingCopy.aboutBody);
  setText(".book__text", "Protect assets, watch prices, and keep reward receipts.");
  setText(".flow__title", "How CoverFi works");
  setAllText(".flow__text", ["Simple asset cover", "Wallet-signed control"]);
  setAllText(".flow__card-content-title", flowSteps.map(([title]) => title));
  setAllText(".flow__card-content-paragraph", flowSteps.map(([, body]) => body));
  setText(".box__text", landingCopy.boxBody);
  setText(".genre__title", landingCopy.philosophyTitle);
  setText(".genre__text", landingCopy.stayControl);
  setCycledText(".genre__link-default", rewardDefaultItems);
  setCycledText(".genre__link-hover", rewardHoverItems);
  updateRewardHoverImages();
  setAllText(".benefits__label-text", [
    "Asset cover",
    "Live prices",
    "Clear fees",
    "Wallet signed",
    "Private receipts",
  ]);
  setText(
    ".gift__content-paragraph",
    "Protect your assets before trouble, then track live prices, rewards, and private receipts from one wallet-signed experience.",
  );
  setText(".choice__title", "Words of praise for CoverFi");
  setText(
    ".choice__paragraph",
    "Builders and early users on the parts that feel useful, clear, and worth shipping.",
  );
  setText(".exclusive__title", "Private Receipts For Rewards");
  setText(".exclusive__paragraph", "Keep the key details for reward requests in your own records.");

  document.querySelectorAll(".books-slider__item-cta.is--exclusive-slider .button-alt").forEach((link) => {
    setButtonText(link, "Get Started");
    link.setAttribute("href", "https://app.coverfi.space/");
    link.setAttribute("target", "_blank");
  });

  setCycledText(".books-slider__item-title", productCards.map(([title]) => title));
  setCycledText(".books-slider__item-paragraph p", productCards.map(([, body]) => body));
  setCycledImages(".books-slider__item-img", productCardImages, productCards.map(([title]) => title));
  updateProductCardLinks();
  setCycledText(".tag-small__text", ["Cover", "Prices", "Rewards", "Stellar", "Wallet Signed", "Receipts"]);
  setCycledText(".books-slider__review-title", ["Cover Signal", "Market View", "Reward Status"]);
  setCycledText(".books-slider__review-number", ["Live", "Clear", "Signed"]);
  setText(".exclusive-slider__authors-title", "Receipt Details");
  setText(".exclusive-slider__authors-paragraph", "Asset, amount, entry price, fee, expiry, reserve state, reward status");
  setCycledText(".exclusive-slider__handwritten-text", [
    "A readable record for the moments that matter.",
    "Every important action stays wallet approved.",
  ]);
  updateExclusiveReceiptCard();
}

function updateTestimonials() {
  const content = document.querySelector(".choice__content");
  if (!content) return;

  content
    .querySelectorAll(".choice-slider, .books-slider__controls.is--choice-slider")
    .forEach((element) => element.classList.add("coverfi-hidden-testimonial-source"));

  content.querySelector("[data-coverfi-testimonials]")?.remove();

  const marquee = document.createElement("div");
  marquee.className = "coverfi-testimonials-marquee";
  marquee.dataset.coverfiTestimonials = "";

  const rows = [
    { direction: "right", items: testimonials },
    { direction: "left", items: [...testimonials.slice(3), ...testimonials.slice(0, 3)] },
  ];

  rows.forEach((row) => {
    const rowElement = document.createElement("div");
    rowElement.className = `coverfi-testimonials-row is-${row.direction}`;

    const track = document.createElement("div");
    track.className = "coverfi-testimonials-track";

    [...row.items, ...row.items].forEach((testimonial) => {
      const card = document.createElement("article");
      card.className = "coverfi-praise-card";

      const mark = document.createElement("span");
      mark.className = "coverfi-praise-card__mark";
      mark.textContent = "“";

      const quote = document.createElement("p");
      quote.className = "coverfi-praise-card__quote";
      quote.textContent = testimonial.quote;

      const footer = document.createElement("div");
      footer.className = "coverfi-praise-card__footer";

      const logo = document.createElement("img");
      logo.className = "coverfi-praise-card__logo";
      logo.src = testimonial.logo;
      logo.alt = `${testimonial.name} logo`;
      logo.loading = "lazy";
      logo.decoding = "async";

      const person = document.createElement("div");
      person.className = "coverfi-praise-card__person";

      const name = document.createElement("strong");
      name.textContent = testimonial.name;

      const role = document.createElement("span");
      role.textContent = testimonial.role;

      person.append(name, role);
      footer.append(logo, person);
      card.append(mark, quote, footer);
      track.appendChild(card);
    });

    rowElement.appendChild(track);
    marquee.appendChild(rowElement);
  });

  content.prepend(marquee);
}

function updateFeatureRows() {
  setText(".tagline-curve__title", landingCopy.featureTagline);
  const pathText = document.querySelector("textPath");
  if (pathText) pathText.textContent = landingCopy.featureTagline;

  setAllText(".features__title", features.map(([title]) => title));
  setAllText(".features__paragraph", features.map(([, body]) => body));

  document.querySelectorAll(".features__visual-img").forEach((image, index) => {
    image.alt = features[index]?.[0] || "CoverFi";
  });
}

function replaceBenefitsBackground() {
  const benefitsBg = document.querySelector(".benefits__bg");
  const heroBg = document.querySelector(".hero__bg");
  if (!benefitsBg || !heroBg || benefitsBg.dataset.coverfiHeroBg === "true") return;

  const heroSvgs = Array.from(heroBg.querySelectorAll("svg"));
  if (!heroSvgs.length) return;

  const clonedSvgs = heroSvgs.map((svg) => {
    const clone = svg.cloneNode(true);
    clone.classList.remove("hero__bg-svg");
    clone.classList.add("benefits__bg-svg", "coverfi-benefits-hero-bg-svg");
    clone.removeAttribute("data-background-animation-small");
    return clone;
  });

  benefitsBg.replaceChildren(...clonedSvgs);
  benefitsBg.classList.add("coverfi-benefits-hero-bg");
  benefitsBg.dataset.coverfiHeroBg = "true";
}

function addBenefitsHeading() {
  const benefitsInner = document.querySelector(".benefits__inner");
  if (!benefitsInner || benefitsInner.querySelector(".coverfi-benefits-heading")) return;

  const heading = document.createElement("h2");
  heading.className = "coverfi-benefits-heading";
  heading.textContent = "Why CoverFi";
  benefitsInner.prepend(heading);
}

function configureBoxSequenceFrames() {
  document.querySelectorAll("[data-box-sequence-canvas]").forEach((canvas) => {
    canvas.dataset.desktopSrc = boxFrameSequence.basePath;
    canvas.dataset.mobileSrc = boxFrameSequence.basePath;
    canvas.dataset.staticSrc = boxFrameSequence.staticFrame;
    canvas.dataset.frames = String(boxFrameSequence.frames);
    canvas.dataset.digits = String(boxFrameSequence.digits);
    canvas.dataset.indexStart = String(boxFrameSequence.indexStart);
    canvas.dataset.filetype = boxFrameSequence.filetype;
    canvas.dataset.finalTextProgress = String(boxFrameSequence.finalTextProgress);
  });
}

function updateBoxCta() {
  setLineBreakText(".box__content-text", landingCopy.boxLines);

  document.querySelectorAll(".box__text-wrap").forEach((wrap) => {
    wrap.classList.add("coverfi-hidden-box-intro-text");
    wrap.setAttribute("aria-hidden", "true");
  });

  document.querySelectorAll(".box__header-img").forEach((image) => {
    image.classList.add("coverfi-paused-box-logo");
    image.setAttribute("aria-hidden", "true");
  });

  /*
  Box header logo paused for now.
  const titleImage = document.querySelector(".box__header-img");
  if (titleImage) {
    titleImage.alt = landingCopy.boxTitle;
    titleImage.classList.add("coverfi-box-visual");
  }
  */

  document.querySelectorAll(".box__button-wrap").forEach((wrap) => {
    wrap.classList.add("coverfi-hidden-box-action");
    wrap.setAttribute("aria-hidden", "true");
  });

  document.querySelectorAll(".footer__cta .button").forEach((link, index) => {
    link.setAttribute("href", index % 2 === 0 ? appUrl : githubUrl);
    link.setAttribute("target", "_blank");
    link.setAttribute("aria-label", index % 2 === 0 ? landingCopy.primaryCta : landingCopy.secondaryCta);
    link.classList.add("coverfi-text-button");
    link.replaceChildren();
    const span = document.createElement("span");
    span.textContent = index % 2 === 0 ? landingCopy.primaryCta : landingCopy.secondaryCta;
    link.appendChild(span);
  });
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

function updateFaq() {
  const faq = document.querySelector(".faq");
  if (faq) faq.id = "faqs";

  setText(".faq__title", "CoverFi FAQs");
  setAllText(".accordion__title", faqItems.map(([question]) => question));
  setAllText(".accordion__content p", faqItems.map(([, answer]) => answer));
}

function updateFooter() {
  const contact = document.querySelector(".footer__top-form");
  if (contact) contact.id = "contact";

  setText(".footer__form-title", "Talk to CoverFi");
  setText(".success-message .u-heading-xs", "Thank you, we received it.");

  const input = document.querySelector(".form__input");
  if (input) input.setAttribute("placeholder", "Email Address");

  const submit = document.querySelector(".form__submit");
  if (submit) submit.setAttribute("value", "Send enquiry");

  const form = document.querySelector(".form__group");
  if (form) form.setAttribute("action", "https://app.coverfi.space/");

  const footerVisual = document.querySelector(".footer__visual-img");
  if (footerVisual) {
    const emptyVisual = document.createElement("div");
    emptyVisual.className = "coverfi-footer-empty-visual";
    emptyVisual.setAttribute("aria-hidden", "true");
    footerVisual.replaceWith(emptyVisual);
  }

  document.querySelectorAll(".footer__logo, .footer__logo-img").forEach((logo) => {
    logo.classList.add("coverfi-hidden-footer-logo");
    logo.setAttribute("aria-hidden", "true");
  });

  document.querySelectorAll(".footer__bottom-credit").forEach((credit) => {
    credit.remove();
  });

  fillFooterLinks();
}

function removeHeroDevicePreview() {
  document.querySelector(".coverfi-device-stage")?.remove();
  document.querySelectorAll(".hero__visual").forEach((visual) => {
    visual.remove();
  });
}

function removeTaglineCurveSection() {
  document.querySelectorAll("[data-tagline-curve], .tagline-curve").forEach((element) => {
    element.remove();
  });
}

function replacePackageVisuals() {
  document.querySelectorAll(".gift__visual-img, img[src*='package-visual'], img[srcset*='package-visual']").forEach((image) => {
    if (image.classList.contains("hero__visual-img") || image.classList.contains("footer__visual-img")) return;

    image.src = imageKitAssetImages.assetProtect;
    image.alt = "Asset protection preview";
    image.loading = "lazy";
    image.decoding = "async";
    image.removeAttribute("srcset");
    image.removeAttribute("sizes");
    image.classList.add("coverfi-package-replacement-img");

    const visual = image.closest(".gift__visual");
    if (visual) visual.classList.add("coverfi-asset-preview-card");
  });
}

function removeHeroOverlaySequence() {
  document.querySelectorAll("[data-hero-sequence]").forEach((sequence) => {
    sequence.remove();
  });
}

function removeBoxSequenceSection() {
  document.querySelectorAll("[data-box-sequence]").forEach((sequence) => {
    const section = sequence.closest("section.box");
    (section || sequence).remove();
  });
}

function removePostHeroBranding() {
  document
    .querySelectorAll(
      [
        ".badge",
        ".gift__content-bottom",
        ".gift__content-box-wrap",
        ".gift__content-handwritten-wrap",
        ".gift__content-box",
        ".box__logo-easter-egg",
        ".genre__easter-egg",
        ".choice__easter-egg",
        ".faq__logo-easter-egg",
        ".hero-xs__easter-egg",
        "img[alt='logo-pw']",
        "img[alt='logo-msnbc']",
        "img[alt='logo-book-riot']",
        "img[alt='logo-travel-leisure']",
      ].join(", "),
    )
    .forEach((element) => {
      element.classList.add("coverfi-hidden-branding");
      element.setAttribute("aria-hidden", "true");
    });
}

function updateLogosAndLinks() {
  ensureNavListItems();

  document
    .querySelectorAll(
      [
        ".header__title-logo",
        ".menu__header-title-logo",
        // Post-hero logo placements paused for now.
        // ".footer__logo-img",
        // ".flow__cta-logo",
        // ".benefits__logo",
        // ".benefits__logo-text",
      ].join(", "),
    )
    .forEach((image) => {
    image.alt = landingCopy.brand;
    image.src = logoSrc;
    image.removeAttribute("srcset");
    image.removeAttribute("sizes");
    image.classList.remove("coverfi-hidden-logo");
    image.classList.add("coverfi-logo-img");

    if (image.classList.contains("header__title-logo")) {
      image.classList.add("coverfi-nav-logo-img", "pop-up__button-svg");
      image.closest(".header__title-link")?.classList.add("coverfi-nav-logo-button", "pop-up__button");
      attachNavLogoPopUp(image);
    }

    if (image.nextElementSibling?.classList.contains("coverfi-wordmark")) {
      image.nextElementSibling.remove();
    }
  });

  document.querySelectorAll("[data-transition-logo]").forEach((container) => {
    container.replaceChildren(createLogoImage("coverfi-transition-logo"));
  });

  document.querySelectorAll(".pop-up__button-inner:not(.coverfi-nav-logo-inner)").forEach((container) => {
    container.replaceChildren(createLogoImage("coverfi-popup-logo"));
  });

  document.querySelectorAll(".flow__cta-logo, .badge").forEach((element) => {
    element.classList.add("coverfi-hidden-branding");
    element.setAttribute("aria-hidden", "true");
  });

  removePostHeroBranding();

  [
    [".header__nav-list-item .button", headerNavItems],
    [".menu__nav-list-item .button", navItems],
  ].forEach(([selector, links]) => {
    document.querySelectorAll(selector).forEach((link, index) => {
      const item = links[index % links.length];
      setButtonText(link, item.label);
      link.setAttribute("href", item.href);
      setExternalTarget(link, item.href);
    });
  });

  document.querySelectorAll("a[href*='coverfi.space/books']").forEach((link) => {
    link.setAttribute("href", "https://app.coverfi.space/");
  });

  document.querySelectorAll("a[href='/gifting']").forEach((link) => link.setAttribute("href", "/faqs"));
  document.querySelectorAll("a[href='/faq']").forEach((link) => link.setAttribute("href", "/faqs"));

  const socialLinks = [
    { icon: "x", href: "https://x.com/coverfidotspace", aria: "Follow CoverFi on X" },
    { icon: "github", href: "https://github.com/coverfi-space", aria: "CoverFi on GitHub" },
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

function createLogoImage(className) {
  const image = document.createElement("img");
  image.src = logoSrc;
  image.alt = landingCopy.brand;
  image.className = className;
  image.loading = "eager";
  return image;
}

function attachNavLogoPopUp(image) {
  const link = image.closest(".header__title-link");
  const wrapper = link?.closest(".header__title");
  if (!link || !wrapper) return;

  wrapper.classList.add("pop-up", "coverfi-nav-logo-pop-up");
  wrapper.setAttribute("data-pop-up", "");
  wrapper.setAttribute("data-wf--logo-pop-up--variant", "right-bottom");

  link.classList.add("coverfi-nav-logo-button", "pop-up__button");
  link.setAttribute("data-pop-up-button", "");
  link.setAttribute("aria-label", "Show CoverFi app link");

  let inner = link.querySelector(":scope > .coverfi-nav-logo-inner");
  if (!inner) {
    inner = document.createElement("span");
    inner.className = "pop-up__button-inner coverfi-nav-logo-inner";
    link.replaceChildren(inner);
  }

  if (image.parentElement !== inner) inner.replaceChildren(image);

  let overlay = wrapper.querySelector(":scope > .coverfi-nav-logo-overlay");
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.className = "pop-up__overlay coverfi-nav-logo-overlay";
    overlay.innerHTML = `
      <div class="pop-up__overlay-inner coverfi-nav-logo-overlay-inner">
        <div class="pop-up__overlay-bg-wrap">
          <div class="pop-up__overlay-ears">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 44 45" width="100%" class="pop-up__overlay-left-ear"><path fill="currentColor" d="M1.335.198c.671-.316 1.5-.254 2.186.187C27.678 16.847 39.839 36.953 44 45h-6.048c-2.382-1.604-6.964-3.674-15.652-4.814C2.999 37.666-.665 14.174.09 2.04.152 1.28.589.515 1.335.198Z"></path></svg>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 29 80" width="100%" class="pop-up__overlay-right-ear"><path fill="currentColor" d="M19.388.879c.667-.771 1.647-1.018 2.559-.807.912.21 1.682.956 1.926 1.861C34.595 38.09 25.79 69.237 21.823 80h-4.188c-.17-4.22-2.739-13.318-10.975-22.064-8.493-9.099-8.88-21.913-1.063-37.23C11.221 9.603 19.091 1.266 19.388.879Z"></path></svg>
          </div>
          <div class="pop-up__overlay-bg"></div>
        </div>
        <div class="pop-up__overlay-content">
          <h3 class="pop-up__overlay-title u-heading-xs">Ready to protect assets?</h3>
          <div class="pop-up__overlay-content-action">
            <a data-button-alt="" data-wf--button-alt--variant="small" href="${appUrl}" target="_blank" rel="noreferrer" class="button-alt w-inline-block coverfi-nav-logo-overlay-cta">
              <span class="button-alt__text-wrap"><span class="button-alt__bg"></span><span class="button-alt__text-outer"><span data-button-alt-text="" class="button-alt__text">Open CoverFi</span></span></span>
              <span class="button-alt__icon-wrap"><span class="button-alt__bg"></span><span class="button-alt__icon-outer"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 14 13" fill="none" aria-hidden="true" class="button-alt__icon"><path d="M13.58 5.66v.845l-5.994 5.66-1.71-2.063a61.427 61.427 0 0 1 4.265-2.988l-.02-.078c-1.828.196-4.107.294-6.387.294H0V4.835h3.734c2.28 0 4.56.098 6.387.294l.02-.059a67.638 67.638 0 0 1-4.265-3.006L7.586 0l5.994 5.66Z" fill="currentColor"></path></svg></span></span>
            </a>
          </div>
        </div>
      </div>
      <div class="pop-up__overlay-target-zone"></div>
    `;
    wrapper.appendChild(overlay);
  }

  const cta = overlay.querySelector(".coverfi-nav-logo-overlay-cta");
  cta.setAttribute("href", appUrl);
}

function tuneTaglineCurveTiming() {
  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;
  const elements = Array.from(document.querySelectorAll("[data-tagline-curve]"));

  if (!gsap || !ScrollTrigger || !elements.length) return;

  ScrollTrigger.getAll()
    .filter((trigger) => elements.includes(trigger.trigger))
    .forEach((trigger) => trigger.kill());

  elements.forEach((element) => {
    const textPath = element.querySelector("[data-tagline-curve-svg] textPath");
    const path = element.querySelector("[data-tagline-curve-svg] path");
    if (!textPath || !path) return;

    const canvas = tuneTaglineCurveTiming.canvas || (tuneTaglineCurveTiming.canvas = document.createElement("canvas"));
    const context = canvas.getContext("2d");
    const computedStyle = window.getComputedStyle(textPath);
    context.font = computedStyle.font || `${computedStyle.fontSize} ${computedStyle.fontFamily}`;

    const textPathLength = context.measureText(textPath.textContent.trim()).width * 1.25;
    const pathLength = path.getTotalLength();
    const finalOffset = -(textPathLength * 100) / pathLength;

    gsap.fromTo(
      textPath,
      { attr: { startOffset: "0%" } },
      {
        attr: { startOffset: `${finalOffset}0%` },
        ease: "none",
        scrollTrigger: {
          trigger: element,
          start: "top 78%",
          end: "bottom 28%",
          scrub: 0.35,
        },
      },
    );
  });

  ScrollTrigger.refresh();
}

function applyCoverFiContent() {
  document.title = "CoverFi | Stellar Asset Protection And Username Payments";
  document.body.classList.add("coverfi-theme");

  replaceVisibleText();
  setText(".hero-xs__title", landingCopy.title);
  updateHomePageContent();
  updateTestimonials();
  addHeroDetails();
  addIntroCards();
  updatePlanCards();
  updateFeatureRows();
  replaceBenefitsBackground();
  addBenefitsHeading();
  removeBoxSequenceSection();
  configureBoxSequenceFrames();
  updateBoxCta();
  updateFaq();
  updateFooter();
  removeHeroDevicePreview();
  removeTaglineCurveSection();
  replacePackageVisuals();
  removeHeroOverlaySequence();
  removePostHeroBranding();
  updateLogosAndLinks();
}

function renderMissingOriginalPage() {
  document.title = "CoverFi";
  document.body.classList.add("coverfi-theme");

  const main = document.createElement("main");
  main.className = "coverfi-fallback";

  const title = document.createElement("h1");
  title.textContent = "CoverFi";

  const message = document.createElement("p");
  message.textContent = "The page shell could not be loaded.";

  main.append(title, message);
  document.body.replaceChildren(main);
}

function LandingPage() {
  useEffect(() => {
    let cancelled = false;

    async function renderPageShell() {
      try {
        if (cancelled) return;

        const parsedPage = new DOMParser().parseFromString(pageShell, "text/html");
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
        applyCoverFiContent();

        await executeScriptsInOrder(scripts);
        if (!cancelled) {
          removeTaglineCurveSection();
        }
      } catch (error) {
        console.error(error);
        if (!cancelled) renderMissingOriginalPage();
      }
    }

    renderPageShell();

    return () => {
      cancelled = true;
    };
  }, []);

  return null;
}

export default LandingPage;
