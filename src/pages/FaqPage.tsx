import { useState } from "react";
import { getLogicAppHref } from "../lib/links";

export default function FaqPage() {
  const categories = [
    "General",
    "Trust & Safety",
    "Protection",
    "Payments",
    "AI",
  ];
  const faqs = [
    {
      category: "General",
      question: "What does CoverFi do?",
      answer:
        "CoverFi helps Stellar users create asset protection positions, monitor market prices, send username payments, store payment receipts, and use AI for product guidance.",
    },
    {
      category: "General",
      question: "Who is CoverFi for?",
      answer:
        "CoverFi is for Stellar users who want a simpler way to review asset protection, payments, receipts, and wallet activity without giving up self-custody.",
    },
    {
      category: "General",
      question: "Is CoverFi a wallet?",
      answer:
        "No. CoverFi is not a wallet and does not custody your secret keys. It connects to wallet software such as Freighter so you can review and sign actions yourself.",
    },
    {
      category: "General",
      question: "Which network does CoverFi use?",
      answer:
        "CoverFi is built for Stellar and Soroban. The current product flows are designed around Stellar wallet signatures, Stellar assets, and Soroban smart contracts.",
    },
    {
      category: "General",
      question: "Do I need crypto experience to use it?",
      answer:
        "You should understand basic wallet safety and transaction review. CoverFi simplifies the workflow, but you are still responsible for checking every amount, address, fee, and wallet prompt before signing.",
    },
    {
      category: "Trust & Safety",
      question: "Do I need to give CoverFi my wallet keys?",
      answer:
        "No. CoverFi uses wallet approval flows. You connect with Freighter and sign important actions from your own wallet.",
    },
    {
      category: "Trust & Safety",
      question: "Can CoverFi move funds without my approval?",
      answer:
        "No. User-facing transactions require wallet approval. Always read the wallet prompt before signing because blockchain transactions can be irreversible.",
    },
    {
      category: "Trust & Safety",
      question: "What should I verify before signing?",
      answer:
        "Check the asset, amount, recipient, duration, entry price, premium, network, and contract or wallet address shown in the wallet prompt.",
    },
    {
      category: "Trust & Safety",
      question: "What happens if I use the wrong network?",
      answer:
        "Transactions may fail or may not appear where you expect. Make sure your wallet is on the same Stellar network shown in the app before signing.",
    },
    {
      category: "Trust & Safety",
      question: "Has CoverFi been audited?",
      answer:
        "CoverFi should be treated as beta software until formal contract and backend audits are complete. Do not use funds you cannot afford to risk.",
    },
    {
      category: "Protection",
      question: "How much does protection cost?",
      answer:
        "The current product schedule is 0.30% for 1 day, 1.00% for 7 days, 1.50% for 14 days, and 2.50% for 30 days. The app shows the fee before you continue.",
    },
    {
      category: "Protection",
      question: "Where do protection premiums go?",
      answer:
        "In the current contract model, premiums are collected by the reserve vault, where they strengthen claim capacity.",
    },
    {
      category: "Protection",
      question: "What is a protection position?",
      answer:
        "A protection position is a wallet-signed record with an asset, protected amount, duration, oracle-captured entry price, premium, and expiry. It is evaluated by contract rules and oracle data.",
    },
    {
      category: "Protection",
      question: "What is the entry price?",
      answer:
        "The entry price is the fresh oracle price captured when the position is created. If the verified price later falls below that entry price before expiry, the contract can calculate a capped eligible payout.",
    },
    {
      category: "Protection",
      question: "What happens when a position expires?",
      answer:
        "If the position expires without a valid trigger, unused locked payout capacity can be released according to contract rules. Premiums are not refunded after a signed position is accepted.",
    },
    {
      category: "Protection",
      question: "How are claim payouts funded?",
      answer:
        "Eligible claims are supported by the reserve vault. The reserve tracks total liquidity, locked payout capacity, reserved claimables, and available capacity.",
    },
    {
      category: "Protection",
      question: "Why are payouts restricted by epochs?",
      answer:
        "Epoch allocation helps avoid first-come-first-served reserve drain. Claims are approved first, then claimable value is allocated using reserve floor and surplus-drain rules.",
    },
    {
      category: "Protection",
      question: "Can I withdraw immediately after a claim is approved?",
      answer:
        "Not always. A claim may need epoch allocation before value becomes withdrawable. The app should show claim state clearly as the product matures.",
    },
    {
      category: "Trust & Safety",
      question: "Are payouts guaranteed?",
      answer:
        "No. CoverFi protection is not insurance. Eligibility depends on contract rules, reserve state, oracle data, user signatures, and Stellar network execution.",
    },
    {
      category: "Payments",
      question: "What is a private receipt?",
      answer:
        "A private receipt is structured payment metadata saved for history and recordkeeping after a wallet-signed payment.",
    },
    {
      category: "Payments",
      question: "Where is payment history stored?",
      answer:
        "Payment history and receipt metadata are stored as structured Firebase records for the connected account. The app uses those records to render receipt-style history.",
    },
    {
      category: "Payments",
      question: "Can I pay someone by username?",
      answer:
        "Yes. CoverFi resolves registered usernames to wallet addresses so users can send XLM without manually pasting long public keys.",
    },
    {
      category: "Payments",
      question: "Can I reverse a payment?",
      answer:
        "No. Stellar payments are generally irreversible after confirmation. Always verify the username, wallet address, amount, and asset before signing.",
    },
    {
      category: "Payments",
      question: "What if I send funds to the wrong username?",
      answer:
        "CoverFi cannot automatically recover funds sent to the wrong recipient. Contact the recipient if possible and keep the receipt for your records.",
    },
    {
      category: "Payments",
      question: "Which asset can I send by username?",
      answer:
        "The current username payment flow is focused on XLM. Additional Stellar assets require proper asset configuration and wallet support.",
    },
    {
      category: "Payments",
      question: "Can other users see my receipts?",
      answer:
        "Receipts are account-scoped in the app. Production privacy controls should include stronger access rules, export, deletion, and retention policies.",
    },
    {
      category: "AI",
      question: "Can CoverFi AI create actions for me?",
      answer:
        "CoverFi AI can prepare reviewable payment and protection drafts. It cannot sign transactions, move funds, or bypass wallet approval.",
    },
    {
      category: "AI",
      question: "Can CoverFi AI guarantee a claim outcome?",
      answer:
        "No. AI can explain workflows and prepare drafts, but claim outcomes depend on contracts, reserve state, oracle data, and wallet-signed actions.",
    },
    {
      category: "AI",
      question: "Should I trust AI answers as financial advice?",
      answer:
        "No. CoverFi AI is a support layer, not financial, legal, tax, or investment advice. Verify information independently before acting.",
    },
    {
      category: "AI",
      question: "What can AI help me draft?",
      answer:
        "It can help prepare payment or protection drafts such as a recipient, amount, asset, or duration. You still review the live entry price, final app form, and wallet prompt before signing.",
    },
    {
      category: "AI",
      question: "Can AI access my wallet secret key?",
      answer:
        "No. Never share wallet secret keys with any AI or website. CoverFi does not need your secret key to operate.",
    },
  ];
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [openQuestion, setOpenQuestion] = useState(faqs[2].question);
  const filteredFaqs = faqs.filter((faq) => faq.category === activeCategory);

  return (
    <main className="min-h-screen bg-[#5fd6bf] px-4 py-8 text-[#06111e] md:px-10 md:py-16">
      <section className="mx-auto min-h-[calc(100vh-4rem)] max-w-6xl bg-[#fbfbf7] px-5 py-7 shadow-[0_26px_90px_rgba(0,0,0,0.16)] md:px-12 md:py-10">
        <header className="flex items-center justify-between gap-6">
          <a href="/" className="inline-flex items-center">
            <img src="/logo.png" alt="CoverFi" className="h-10 w-auto" />
          </a>
          <nav className="hidden items-center gap-9 text-[11px] font-bold uppercase tracking-[0.02em] text-[#06111e] md:flex">
            <a className="nav-underline" href="/">
              Home
            </a>
            <a className="nav-underline" href="/faqs">
              FAQ
            </a>
            <a
              className="rounded-full border border-[#06111e] px-7 py-3"
              href={getLogicAppHref("login")}>
              Login
            </a>
          </nav>
        </header>

        <div className="mx-auto mt-14 max-w-3xl text-center md:mt-20">
          <h1 className="text-4xl font-black leading-tight tracking-normal md:text-6xl">
            Questions? Look here.
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-[#06111e]/45 md:text-base">
            Clear answers about CoverFi protection, receipts, payments, and AI.
          </p>
        </div>

        <div className="mt-16 grid gap-10 md:grid-cols-[180px_1fr] md:gap-16">
          <aside>
            <p className="mb-6 text-lg font-black">Table of Contents</p>
            <div className="grid gap-4 text-xs font-bold">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => {
                    setActiveCategory(category);
                    const firstQuestion = faqs.find(
                      (faq) => faq.category === category,
                    )?.question;
                    if (firstQuestion) setOpenQuestion(firstQuestion);
                  }}
                  className={`w-fit text-left transition-colors ${
                    activeCategory === category
                      ? "text-[#1267d6]"
                      : "text-[#06111e]"
                  }`}>
                  {category}
                </button>
              ))}
            </div>
          </aside>

          <div className="grid">
            {filteredFaqs.map((item) => {
              const isOpen = openQuestion === item.question;
              return (
                <div
                  key={item.question}
                  className="border-b border-[#06111e]/12 py-5">
                  <button
                    type="button"
                    onClick={() =>
                      setOpenQuestion((current) =>
                        current === item.question ? "" : item.question,
                      )
                    }
                    className="flex w-full items-start gap-5 text-left">
                    <span className="mt-0.5 w-5 shrink-0 text-lg font-black text-[#1267d6]">
                      {isOpen ? "-" : "+"}
                    </span>
                    <span className="text-lg font-black leading-snug md:text-xl">
                      {item.question}
                    </span>
                  </button>
                  {isOpen && (
                    <p className="ml-10 mt-5 max-w-2xl text-sm leading-relaxed text-[#06111e]/65">
                      {item.answer}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
