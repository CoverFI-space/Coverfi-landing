import { useEffect } from "react";
import { faqPageShell } from "./faq-page-shell";
import "./coverfi-overrides.css";

const brand = "CoverFi";
const logoSrc = "/assets/logo.png";
const primaryCta = "Open CoverFi";
const appUrl = "https://app.coverfi.space/";
const githubUrl = "https://github.com/coverfi-space";
const xUrl = "https://x.com/coverfidotspace";
const supportEmail = "support@coverfi.space";

const navItems = [
  { label: "Whitepaper", href: "/whitepaper" },
  { label: "Contact us", href: "/contact" },
  { label: "Become a partner", href: "/partner" },
  { label: "Docs", href: "https://docs.coverfi.space" },
];
const footerLinks = [
  { label: "Home", href: "/" },
  { label: "FAQs", href: "/faqs" },
  ...navItems,
  { label: "Status", href: "/status" },
];

const faqGroups = [
  {
    category: "General",
    slug: "general",
    color: "cyan",
    icon: "01",
    items: [
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
    ],
  },
  {
    category: "Trust & Safety",
    slug: "trust-safety",
    color: "green",
    icon: "02",
    items: [
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
        "Are payouts guaranteed?",
        "No. CoverFi protection is not insurance. Eligibility depends on contract rules, reserve state, oracle data, user signatures, and Stellar network execution.",
      ],
    ],
  },
  {
    category: "Protection",
    slug: "protection",
    color: "pink",
    icon: "03",
    items: [
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
    ],
  },
  {
    category: "Payments",
    slug: "payments",
    color: "periwinkle",
    icon: "04",
    items: [
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
    ],
  },
  {
    category: "AI",
    slug: "ai",
    color: "yellow",
    icon: "05",
    items: [
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
    ],
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

function setText(selector, text) {
  const element = document.querySelector(selector);
  if (element) element.textContent = text;
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
      if (ctaItem) {
        list.insertBefore(clone, ctaItem);
      } else {
        list.appendChild(clone);
      }
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

function createSocialIcon(icon) {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("fill", "currentColor");
  svg.setAttribute("aria-hidden", "true");
  svg.classList.add("coverfi-social-svg");

  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  const pathData =
    icon === "github"
      ? "M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2.17c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.17 1.18A11 11 0 0 1 12 6.02c.98 0 1.95.13 2.87.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.58.23 2.75.11 3.04.74.81 1.19 1.83 1.19 3.09 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.68.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z"
      : icon === "email"
        ? "M3.25 5h17.5c.69 0 1.25.56 1.25 1.25v11.5c0 .69-.56 1.25-1.25 1.25H3.25C2.56 19 2 18.44 2 17.75V6.25C2 5.56 2.56 5 3.25 5Zm1.88 2 6.87 5.1L18.87 7H5.13Zm14.87 1.8-7.25 5.38a1.25 1.25 0 0 1-1.5 0L4 8.8V17h16V8.8Z"
        : "M18.9 2h3.35l-7.32 8.36L23.55 22h-6.75l-5.29-6.92L5.46 22H2.1l7.83-8.95L1.67 2h6.92l4.78 6.32L18.9 2Zm-1.18 17.95h1.86L7.58 3.94H5.59l12.13 16.01Z";
  path.setAttribute("d", pathData);
  svg.appendChild(path);
  return svg;
}

function ensureFooterEmailSocialButtons() {
  document.querySelectorAll(".footer__socials, .footer__mob-socials").forEach((container) => {
    if (container.querySelector("[data-coverfi-email-social]")) return;

    const template = container.querySelector(".button-social");
    if (!template) return;

    const emailLink = template.cloneNode(true);
    emailLink.setAttribute("data-coverfi-email-social", "");
    emailLink.classList.add("coverfi-email-social");
    container.appendChild(emailLink);
  });
}

function updateNavAndLogos() {
  ensureNavListItems();

  document
    .querySelectorAll(".header__title-logo, .menu__header-title-logo")
    .forEach((image) => {
      image.alt = brand;
      image.src = logoSrc;
      image.removeAttribute("srcset");
      image.removeAttribute("sizes");
      image.classList.add("coverfi-logo-img");

      if (image.classList.contains("header__title-logo")) {
        image.classList.add("coverfi-nav-logo-img", "pop-up__button-svg");
        image.closest(".header__title-link")?.classList.add("coverfi-nav-logo-button", "pop-up__button");
        attachNavLogoPopUp(image);
      }
    });

  document.querySelectorAll("[data-transition-logo]").forEach((container) => {
    container.replaceChildren(createLogoImage("coverfi-transition-logo"));
  });

  document.querySelectorAll(".pop-up__button-inner:not(.coverfi-nav-logo-inner)").forEach((container) => {
    container.replaceChildren(createLogoImage("coverfi-popup-logo"));
  });

  document.querySelectorAll(".header__nav-list-item .button, .menu__nav-list-item .button").forEach((link, index) => {
    const navItem = navItems[index % navItems.length];
    setButtonText(link, navItem.label);
    link.setAttribute("href", navItem.href);
    link.classList.toggle("w--current", navItem.href === "/faqs");
    setExternalTarget(link, navItem.href);
  });

  document.querySelectorAll(".header__nav-list-item .button-alt, .menu__login .button-alt").forEach((link) => {
    setButtonText(link, primaryCta);
    link.setAttribute("href", "https://app.coverfi.space/");
    setExternalTarget(link, "https://app.coverfi.space/");
  });

  ensureFooterEmailSocialButtons();

  const headerSocialLinks = [
    { icon: "x", href: "https://x.com/coverfidotspace", aria: "Follow CoverFi on X" },
    { icon: "github", href: "https://github.com/coverfi-space", aria: "CoverFi on GitHub" },
  ];

  const footerSocialLinks = [
    ...headerSocialLinks,
    { icon: "email", href: `mailto:${supportEmail}`, aria: "Email CoverFi" },
  ];

  [
    [".header__sub .button-social, .menu__sub .button-social", headerSocialLinks],
    [".footer__socials .button-social, .footer__mob-socials .button-social", footerSocialLinks],
  ].forEach(([selector, links]) => {
    document.querySelectorAll(selector).forEach((link, index) => {
      const social = links[index % links.length];
      link.setAttribute("href", social.href);
      link.setAttribute("aria-label", social.aria);
      link.setAttribute("target", "_blank");
      link.setAttribute("rel", "noreferrer");
      link.classList.add("coverfi-social-icon");

      const icon = link.querySelector(".button-social__icon-outer") || link;
      icon.replaceChildren(createSocialIcon(social.icon));
    });
  });
}

function replaceFaqSidebar() {
  const filter = document.querySelector(".filter.is--faq");
  if (!filter) return;

  filter.querySelectorAll(":scope > .filter__inner:not(.coverfi-faq-sidebar)").forEach((sidebar) => {
    sidebar.classList.add("coverfi-source-faq-sidebar");
    sidebar.setAttribute("aria-hidden", "true");
  });

  let filterInner = filter.querySelector(":scope > .coverfi-faq-sidebar");
  if (!filterInner) {
    filterInner = document.createElement("div");
    filterInner.className = "filter__inner coverfi-faq-sidebar";
    filterInner.dataset.coverfiFaqSidebar = "true";
    filter.appendChild(filterInner);
  }

  const listWrap = document.createElement("div");
  listWrap.className = "filter__list-wrap w-dyn-list";

  const list = document.createElement("div");
  list.className = "filter__list w-dyn-items";
  list.setAttribute("role", "list");

  faqGroups.forEach((group) => {
    const item = document.createElement("div");
    item.className = "filter__item w-dyn-item";
    item.setAttribute("role", "listitem");

    const button = document.createElement("button");
    button.type = "button";
    button.className = "tag";
    button.dataset.faqSidebarLink = group.slug;
    button.dataset.faqColor = group.color;
    button.setAttribute("aria-label", group.category);

    const icon = document.createElement("span");
    icon.className = "tag__icon";
    icon.setAttribute("aria-hidden", "true");
    icon.textContent = group.icon;

    const text = document.createElement("span");
    text.className = "tag__text";
    text.textContent = group.category;

    button.append(icon, text);
    item.appendChild(button);
    list.appendChild(item);
  });

  listWrap.appendChild(list);
  filterInner.replaceChildren(listWrap);

  document.querySelectorAll(".tag").forEach((button, index) => {
    const group = faqGroups[index];
    const item = button.closest(".filter__item") || button;

    if (!group) {
      item.style.display = "none";
      item.setAttribute("aria-hidden", "true");
      return;
    }

    item.style.removeProperty("display");
    item.removeAttribute("aria-hidden");

    const icon = button.querySelector(".tag__icon");
    const text = button.querySelector(".tag__text");

    button.dataset.faqSidebarLink = group.slug;
    button.dataset.faqColor = group.color;
    button.setAttribute("aria-label", group.category);
    if (icon) icon.textContent = group.icon;
    if (text) text.textContent = group.category;
  });

  document.querySelectorAll(".faq__category__tag").forEach((button, index) => {
    const group = faqGroups[index];
    const item = button.closest(".w-dyn-item") || button;

    if (!group) {
      item.style.display = "none";
      item.setAttribute("aria-hidden", "true");
      return;
    }

    item.style.removeProperty("display");
    item.removeAttribute("aria-hidden");
    button.dataset.faqSidebarLink = group.slug;
    button.dataset.faqColor = group.color;
    button.setAttribute("aria-label", group.category);

    const emoji = button.querySelector(".faq__nav__emoji");
    const title = button.querySelector(".faq__nav__title");

    if (emoji) emoji.textContent = group.icon;
    if (title) {
      title.setAttribute("aria-label", group.category);
      title.replaceChildren(document.createTextNode(group.category));
    }
  });
}

function scheduleFaqRefresh() {
  [250, 900, 1800, 3200].forEach((delay) => {
    window.setTimeout(() => {
      replaceFaqSidebar();
      replaceFaqSections();
      updateNavAndLogos();
      setupFaqInteractions();
    }, delay);
  });
}

function setupFaqInteractions() {
  document.querySelectorAll(".accordion__details").forEach((details) => {
    details.removeAttribute("open");
    details.removeAttribute("data-accordion");
    const summary = details.querySelector("[data-accordion-summary]");
    const content = details.querySelector("[data-accordion-content]");
    summary?.removeAttribute("data-accordion-summary");
    content?.removeAttribute("data-accordion-content");
    content?.removeAttribute("style");
  });

  document.querySelectorAll("[data-faq-sidebar-link]").forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("data-faq-sidebar-link");
      const target = targetId ? document.getElementById(targetId) : null;
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", `#${targetId}`);
    });
  });
}

function replaceFaqSections() {
  const sections = Array.from(document.querySelectorAll(".faq__content.is--faq"));
  const firstSection = sections[0];
  const sectionParent = firstSection?.parentElement;
  const sectionTemplate = firstSection?.cloneNode(true);
  const itemTemplate = firstSection?.querySelector(".accordion__item")?.cloneNode(true);

  if (!sectionParent || !sectionTemplate || !itemTemplate) return;

  sections.forEach((section) => section.remove());

  faqGroups.forEach((group) => {
    const section = sectionTemplate.cloneNode(true);
    section.id = group.slug;
    section.dataset.faqSection = group.slug;
    section.dataset.faqColor = group.color;

    const title = section.querySelector(".faq__title");
    if (title) title.textContent = group.category;

    const list = section.querySelector(".accordion__list");
    if (!list) return;

    const items = group.items.map(([question, answer]) => {
      const item = itemTemplate.cloneNode(true);
      const details = item.querySelector(".accordion__details");
      const titleElement = item.querySelector(".accordion__title");
      const richText = item.querySelector(".rich-text");

      if (details) {
        details.open = false;
        details.removeAttribute("open");
        details.removeAttribute("data-accordion");
        details.removeAttribute("data-wf-collection-id");
        details.removeAttribute("data-wf-item-slug");
      }
      if (titleElement) titleElement.textContent = question;
      if (richText) {
        const paragraph = document.createElement("p");
        paragraph.textContent = answer;
        richText.replaceChildren(paragraph);
      }

      item.querySelector("[data-accordion-summary]")?.removeAttribute("data-accordion-summary");
      item.querySelector("[data-accordion-content]")?.removeAttribute("data-accordion-content");

      return item;
    });

    list.replaceChildren(...items);
    sectionParent.appendChild(section);
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
  if (form) form.setAttribute("action", appUrl);

  document.querySelectorAll(".footer__cta .button").forEach((link, index) => {
    const href = index % 2 === 0 ? appUrl : githubUrl;
    link.setAttribute("href", href);
    link.setAttribute("aria-label", index % 2 === 0 ? primaryCta : "Star on GitHub");
    link.classList.add("coverfi-text-button");
    setExternalTarget(link, href);
    link.replaceChildren();
    const span = document.createElement("span");
    span.textContent = index % 2 === 0 ? primaryCta : "Star on GitHub";
    link.appendChild(span);
  });

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

function applyFaqContent() {
  document.title = "CoverFi FAQs | Asset Protection, Payments, Receipts, And AI";
  document.body.classList.add("coverfi-theme", "coverfi-faq-page");

  setText(".hero-xs__title", "CoverFi FAQs");
  setText(
    ".hero-xs__paragraph",
    "Clear answers about CoverFi protection, wallet safety, receipts, username payments, and AI support.",
  );

  updateNavAndLogos();
  replaceFaqSidebar();
  replaceFaqSections();
  updateFooter();
  setupFaqInteractions();
  scheduleFaqRefresh();

  document.querySelectorAll(".badge, [data-box-sequence]").forEach((element) => {
    const section = element.closest("section");
    (section || element).remove();
  });

  document
    .querySelectorAll(".hero-xs__easter-egg, .box__logo-easter-egg, .faq__logo-easter-egg")
    .forEach((element) => {
      element.classList.add("coverfi-hidden-branding");
      element.setAttribute("aria-hidden", "true");
    });

  document.querySelectorAll("a[href*='coverfi.space/books']").forEach((link) => {
    link.setAttribute("href", "https://app.coverfi.space/");
  });
}

function renderMissingFaqPage() {
  document.title = "CoverFi FAQs";
  document.body.classList.add("coverfi-theme");

  const main = document.createElement("main");
  main.className = "coverfi-fallback";

  const title = document.createElement("h1");
  title.textContent = "CoverFi FAQs";

  const message = document.createElement("p");
  message.textContent = "The FAQ page shell could not be loaded.";

  main.append(title, message);
  document.body.replaceChildren(main);
}

function FaqPage() {
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
        applyFaqContent();

        await executeScriptsInOrder(scripts);
        if (!cancelled) applyFaqContent();
      } catch (error) {
        console.error(error);
        if (!cancelled) renderMissingFaqPage();
      }
    }

    renderPageShell();

    return () => {
      cancelled = true;
    };
  }, []);

  return null;
}

export default FaqPage;
