import { useMemo, useState } from "react";
import {
  ArrowRight, CalendarCheck, Check, FileText, LayoutDashboard, Lock, PoundSterling,
  RotateCcw, Search, ShieldCheck, ShoppingBag, Sparkles,
} from "lucide-react";

/* --------------------------------------------------------------------------
   Honest pricing guide — package selection + optional extras.
   A consultation-style tool: choose where you'd like to start, add what you
   need, and get a sensible ballpark before you enquire. No page counters.
-------------------------------------------------------------------------- */

type PackageId = "starter" | "business" | "ecommerce";
type ExtraId = "admin" | "shop" | "booking" | "copy" | "seo";

type Package = {
  id: PackageId;
  name: string;
  badge?: string;
  strapline: string;
  low: number;
  high: number;
  bestFor: string;
  includes: string[];
};

type Extra = {
  id: ExtraId;
  label: string;
  desc: string;
  low: number;
  high: number;
  icon: typeof Search;
  includedIn: PackageId[];
};

const PACKAGES: Package[] = [
  {
    id: "starter",
    name: "Starter Website",
    strapline: "Suitable for trades and small businesses",
    low: 495,
    high: 795,
    bestFor: "Sole traders, tradespeople and new businesses",
    includes: [
      "A focused, mobile-friendly site",
      "Contact form, click-to-call & map",
      "Search-ready page titles & copy",
      "Google Business Profile basics",
      "Launch support for 30 days",
    ],
  },
  {
    id: "business",
    name: "Business Website",
    badge: "Most popular",
    strapline: "For established local businesses that need to win enquiries",
    low: 795,
    high: 1295,
    bestFor: "Salons, cafés, services and growing local firms",
    includes: [
      "Everything in Starter",
      "Client Admin Dashboard (CMS) included",
      "Service, pricing & gallery pages",
      "Local SEO for your area",
      "Two rounds of refinements",
    ],
  },
  {
    id: "ecommerce",
    name: "E-commerce Website",
    badge: "Online selling",
    strapline: "Sell products online with a shop you can manage yourself",
    low: 1295,
    high: 1995,
    bestFor: "Boutiques, makers and retail stores",
    includes: [
      "Everything in Business",
      "Client Admin Dashboard & shop CMS",
      "Secure checkout & payment setup",
      "Product, category & order pages",
      "Order notifications & handover training",
    ],
  },
];

const EXTRAS: Extra[] = [
  {
    id: "admin",
    label: "Client Admin Dashboard",
    desc: "Content management system (CMS) to update menus, prices, hours and text yourself — no developer needed.",
    low: 250,
    high: 450,
    icon: LayoutDashboard,
    includedIn: ["business", "ecommerce"],
  },
  {
    id: "booking",
    label: "Booking system",
    desc: "Take table, appointment or class bookings online.",
    low: 150,
    high: 350,
    icon: CalendarCheck,
    includedIn: [],
  },
  {
    id: "copy",
    label: "Help writing content",
    desc: "We shape the words with you, page by page.",
    low: 150,
    high: 300,
    icon: FileText,
    includedIn: [],
  },
  {
    id: "seo",
    label: "Extra local SEO",
    desc: "Deeper Google setup and listings beyond the essentials.",
    low: 150,
    high: 300,
    icon: Search,
    includedIn: [],
  },
  {
    id: "shop",
    label: "Online shop",
    desc: "Sell products with secure checkout and order notifications.",
    low: 600,
    high: 1200,
    icon: ShoppingBag,
    includedIn: ["ecommerce"],
  },
];

const gbp = (n: number) => `£${n.toLocaleString("en-GB")}`;
const range = (low: number, high: number) => `${gbp(low)} – ${gbp(high)}`;

export default function PricingGuide({
  onRequestQuote,
}: {
  onRequestQuote: (packageName: string) => void;
}) {
  const [packageId, setPackageId] = useState<PackageId>("business");
  const [selected, setSelected] = useState<ExtraId[]>([]);

  const chosenPackage = PACKAGES.find(p => p.id === packageId) ?? PACKAGES[1];

  const includedExtras = useMemo(
    () => EXTRAS.filter(e => e.includedIn.includes(packageId)),
    [packageId],
  );

  const availableExtras = useMemo(
    () => EXTRAS.filter(e => !e.includedIn.includes(packageId)),
    [packageId],
  );

  const paidExtras = useMemo(
    () => availableExtras.filter(e => selected.includes(e.id)),
    [availableExtras, selected],
  );

  const totals = useMemo(() => {
    let low = chosenPackage.low;
    let high = chosenPackage.high;
    paidExtras.forEach(e => { low += e.low; high += e.high; });
    return { low, high };
  }, [chosenPackage, paidExtras]);

  const choosePackage = (id: PackageId) => {
    setPackageId(id);
    // Clear extras the new package already includes, so the total stays honest.
    const nowIncluded = EXTRAS.filter(e => e.includedIn.includes(id)).map(e => e.id);
    setSelected(prev => prev.filter(x => !nowIncluded.includes(x)));
  };

  const toggleExtra = (id: ExtraId) =>
    setSelected(prev => (prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]));

  const reset = () => {
    setPackageId("business");
    setSelected([]);
  };

  return (
    <section id="pricing" className="relative scroll-mt-24 overflow-hidden border-b border-slate-200 bg-white py-20 lg:py-24" aria-labelledby="guide-heading">
      {/* soft ambient background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="dot-grid absolute inset-x-0 top-0 h-64 opacity-40 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
        <div className="absolute -left-32 top-24 h-80 w-80 rounded-full bg-[#FF6B35]/10 blur-3xl" />
        <div className="absolute -right-24 top-1/3 h-96 w-96 rounded-full bg-[#0B1E3B]/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* heading */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full bg-[#FFF3EC] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-[#C7511F] ring-1 ring-[#FFD9C7]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FF6B35]" /> Honest Pricing Guide
          </p>
          <h2 id="guide-heading" className="mt-4 text-3xl font-bold tracking-tight text-[#0B1E3B] sm:text-4xl" style={{ textWrap: "balance" } as React.CSSProperties}>
            Clear packages. Honest prices. No surprises.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
            Start with the package that sounds most like you, add anything you need, and you&apos;ll see a
            sensible ballpark straight away. Your real price is fixed in writing before any work begins.
          </p>
        </div>

        {/* ---------------------------------- packages --------------------------------- */}
        <div className="mt-14">
          <div className="flex items-center gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#0B1E3B] text-[12px] font-bold text-white">1</span>
            <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-[#0B1E3B]">Choose your starting point</h3>
            <span className="h-px flex-1 bg-gradient-to-r from-slate-200 to-transparent" aria-hidden="true" />
          </div>

          <div role="radiogroup" aria-label="Website package" className="mt-5 grid gap-5 lg:grid-cols-3">
            {PACKAGES.map(pkg => {
              const isSelected = pkg.id === packageId;
              return (
                <div
                  key={pkg.id}
                  role="radio"
                  aria-checked={isSelected}
                  tabIndex={0}
                  onClick={() => choosePackage(pkg.id)}
                  onKeyDown={e => {
                    if (e.key === " " || e.key === "Enter") { e.preventDefault(); choosePackage(pkg.id); }
                  }}
                  className={`group relative flex cursor-pointer flex-col rounded-[26px] border bg-white p-6 text-left transition duration-300 focus-visible:ring-2 focus-visible:ring-[#FF6B35] focus-visible:ring-offset-2 sm:p-7 ${
                    isSelected
                      ? "border-[#0B1E3B] shadow-[0_28px_60px_-30px_rgba(11,30,59,0.55)] ring-1 ring-[#0B1E3B]"
                      : "border-slate-200 shadow-[0_10px_30px_-25px_rgba(11,30,59,0.45)] hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_24px_50px_-30px_rgba(11,30,59,0.45)]"
                  }`}
                >
                  {isSelected && (
                    <span aria-hidden="true" className="pointer-events-none absolute inset-x-6 top-0 h-[3px] rounded-b-full bg-gradient-to-r from-[#FF6B35] via-[#FF8A5C] to-[#FFD9C7]" />
                  )}

                  <div className="flex min-h-[24px] items-start justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-2">
                      {pkg.badge && (
                        <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-[0.1em] ${
                          pkg.id === "business"
                            ? "bg-[#0B1E3B] text-white"
                            : "bg-[#FFF3EC] text-[#C7511F] ring-1 ring-[#FFD9C7]"
                        }`}>
                          {pkg.id === "business" && <Sparkles className="h-3 w-3" />}
                          {pkg.badge}
                        </span>
                      )}
                    </div>
                    <span className={`flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full border transition ${
                      isSelected ? "border-[#0B1E3B] bg-[#0B1E3B]" : "border-slate-300 bg-white group-hover:border-slate-400"
                    }`}>
                      {isSelected ? <Check className="h-3.5 w-3.5 text-white" /> : <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />}
                    </span>
                  </div>

                  <h4 className="mt-4 text-xl font-bold tracking-tight text-[#0B1E3B]">{pkg.name}</h4>
                  <p className="mt-1.5 text-[13.5px] leading-relaxed text-slate-500">{pkg.strapline}</p>

                  <div className="mt-5 flex items-end gap-1.5">
                    <span className="pb-1 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-400">From</span>
                    <span className="text-[34px] font-extrabold leading-none tracking-tight text-[#0B1E3B] tabular-nums">{gbp(pkg.low)}</span>
                  </div>
                  <p className="mt-2 text-[12px] text-slate-500">One-off build · hosted &amp; maintained separately</p>

                  <ul className="mt-5 space-y-2.5 border-t border-slate-100 pt-5 text-[13.5px] text-slate-600">
                    {pkg.includes.map(item => (
                      <li key={item} className="flex gap-2.5">
                        <span className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${isSelected ? "bg-[#FFF3EC] text-[#E85A28]" : "bg-slate-100 text-slate-500"}`}>
                          <Check className="h-2.5 w-2.5" strokeWidth={3} />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>

                  <p className={`mt-6 rounded-xl px-3 py-2 text-[12px] font-medium transition ${
                    isSelected ? "bg-[#F4F7FB] text-[#0B1E3B]" : "bg-slate-50 text-slate-500"
                  }`}>
                    Best for: {pkg.bestFor}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* ------------------------------ extras + summary ------------------------------ */}
        <div className="mt-14">
          <div className="flex items-center gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#0B1E3B] text-[12px] font-bold text-white">2</span>
            <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-[#0B1E3B]">Optional extras for {chosenPackage.name}</h3>
            <span className="h-px flex-1 bg-gradient-to-r from-slate-200 to-transparent" aria-hidden="true" />
          </div>

          <div className="mt-5 grid gap-6 lg:grid-cols-12 lg:items-start">
            {/* extras */}
            <div className="lg:col-span-7">
              {includedExtras.length > 0 ? (
                <p className="mb-3 flex items-start gap-2 rounded-xl border border-emerald-200/80 bg-emerald-50/60 px-3.5 py-2.5 text-[12.5px] leading-relaxed text-emerald-950">
                  <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600" strokeWidth={2.5} />
                  <span>
                    <strong>{includedExtras.map(e => e.label).join(" & ")}</strong> {includedExtras.length > 1 ? "are" : "is"} included by default in <strong>{chosenPackage.name}</strong> — only optional add-ons are shown below.
                  </span>
                </p>
              ) : (
                <p className="mb-3 text-[12.5px] leading-relaxed text-slate-500">
                  <strong className="font-semibold text-[#0B1E3B]">{chosenPackage.name}</strong> does not include a CMS by default — add the <strong className="font-semibold text-[#0B1E3B]">Client Admin Dashboard</strong> below if you&apos;d like to edit content yourself.
                </p>
              )}

              <div className="grid gap-3 sm:grid-cols-2">
                {availableExtras.map(extra => {
                  const isOn = selected.includes(extra.id);
                  const Icon = extra.icon;
                  return (
                    <button
                      key={extra.id}
                      type="button"
                      onClick={() => toggleExtra(extra.id)}
                      aria-pressed={isOn}
                      className={`group relative flex h-full items-start gap-3.5 rounded-2xl border p-4 text-left transition duration-200 ${
                        isOn
                          ? "border-[#FF6B35] bg-[#FFF7F2] shadow-[0_14px_30px_-22px_rgba(232,90,40,0.8)]"
                          : "border-slate-200 bg-white hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-[0_14px_30px_-24px_rgba(11,30,59,0.5)]"
                      }`}
                    >
                      <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition ${
                        isOn
                          ? "bg-[#FF6B35] text-white"
                          : "bg-slate-100 text-slate-500 group-hover:bg-[#0B1E3B] group-hover:text-white"
                      }`}>
                        <Icon className="h-[18px] w-[18px]" />
                      </span>

                      <span className="min-w-0 flex-1">
                        <span className="flex items-center justify-between gap-2">
                          <span className="text-[14px] font-bold text-[#0B1E3B]">{extra.label}</span>
                          {/* switch */}
                          <span aria-hidden="true" className={`relative ml-1 flex h-[20px] w-[34px] shrink-0 items-center rounded-full p-[2px] transition ${isOn ? "bg-[#FF6B35]" : "bg-slate-200"}`}>
                            <span className={`h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-200 ${isOn ? "translate-x-[14px]" : "translate-x-0"}`} />
                          </span>
                        </span>
                        <span className="mt-1 block text-[12.5px] leading-relaxed text-slate-500">{extra.desc}</span>
                        <span className={`mt-1.5 block text-[11.5px] font-semibold ${isOn ? "text-[#C7511F]" : "text-slate-400"}`}>
                          + {range(extra.low, extra.high)}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-[12px] text-slate-500">
                <span className="inline-flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5 text-emerald-600" /> SEO essentials are in every package</span>
                <span className="inline-flex items-center gap-1.5"><Lock className="h-3.5 w-3.5 text-[#0B1E3B]" /> Your site and domain stay yours</span>
              </div>
            </div>

            {/* summary */}
            <div className="lg:col-span-5 lg:sticky lg:top-24">
              <div className="relative overflow-hidden rounded-[26px] bg-[#0B1E3B] p-6 text-white shadow-[0_30px_70px_-35px_rgba(11,30,59,0.85)] sm:p-7">
                <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-[#FF6B35]/25 blur-3xl" />
                <div aria-hidden="true" className="pointer-events-none absolute -bottom-24 -left-10 h-48 w-48 rounded-full bg-[#1B3A6B] blur-3xl" />

                <div className="relative">
                  <div className="flex items-center justify-between gap-3">
                    <p className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-[#FFB08A]">
                      <PoundSterling className="h-3.5 w-3.5" /> Your guide estimate
                    </p>
                    <button
                      type="button"
                      onClick={reset}
                      className="inline-flex items-center gap-1 rounded-full px-2 py-1 text-[11px] font-semibold text-white/55 transition hover:bg-white/10 hover:text-white"
                    >
                      <RotateCcw className="h-3 w-3" /> Reset
                    </button>
                  </div>

                  <p className="mt-4 text-[15px] font-semibold text-white/85">{chosenPackage.name}</p>
                  <p className="mt-0.5 text-[12px] text-white/50">{chosenPackage.strapline}</p>

                  <div className="mt-5 space-y-2.5 border-t border-white/10 pt-5 text-[13px]">
                    <div className="flex items-baseline justify-between gap-4">
                      <span className="text-white/70">Package build</span>
                      <span className="font-semibold tabular-nums text-white">{range(chosenPackage.low, chosenPackage.high)}</span>
                    </div>
                    {includedExtras.length > 0 && (
                      <div className="flex items-baseline justify-between gap-4">
                        <span className="text-white/70">Included by default</span>
                        <span className="text-right font-semibold text-emerald-300">{includedExtras.map(e => e.label).join(" · ")}</span>
                      </div>
                    )}
                    {paidExtras.map(extra => (
                      <div key={extra.id} className="flex items-baseline justify-between gap-4">
                        <span className="flex items-center gap-1.5 text-white/70">
                          <span className="h-1 w-1 rounded-full bg-[#FF6B35]" /> {extra.label}
                        </span>
                        <span className="font-semibold tabular-nums text-white">+ {range(extra.low, extra.high)}</span>
                      </div>
                    ))}
                    {paidExtras.length === 0 && (
                      <p className="text-[12px] leading-relaxed text-white/40">No optional extras selected — toggle any add-on to update your estimate.</p>
                    )}
                  </div>

                  <div className="mt-6 border-t border-white/10 pt-5" aria-live="polite">
                    <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-white/45">Likely investment</p>
                    <p key={`${totals.low}-${totals.high}`} className="animate-estimate-pop mt-1.5 text-[38px] font-extrabold leading-none tracking-tight tabular-nums sm:text-[42px]">
                      {range(totals.low, totals.high)}
                    </p>
                    <p className="mt-2 text-[12px] leading-relaxed text-white/50">
                      One-off build. A guide, not a quote — your exact fixed price is confirmed in writing first.
                    </p>
                  </div>

                  <a
                    href="#quote"
                    onClick={() => onRequestQuote(chosenPackage.name)}
                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#FF6B35] px-6 py-3.5 text-[14px] font-bold text-white shadow-lg shadow-orange-900/30 transition hover:bg-[#E85A28]"
                  >
                    Turn this into my quote <ArrowRight className="h-4 w-4" />
                  </a>
                  <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-[11px] text-white/45">
                    <Lock className="h-3 w-3" /> Free, no obligation — we&apos;ll confirm the details with you.
                  </p>
                </div>
              </div>

              <div className="mt-4 grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-[12.5px] leading-relaxed text-slate-600 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                <p className="flex gap-2"><ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" /><span><strong className="text-[#0B1E3B]">Fixed quote first.</strong> Agreed in writing before work starts.</span></p>
                <p className="flex gap-2"><PoundSterling className="mt-0.5 h-4 w-4 shrink-0 text-[#E85A28]" /><span><strong className="text-[#0B1E3B]">No agency markup.</strong> You deal directly with the builder.</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
