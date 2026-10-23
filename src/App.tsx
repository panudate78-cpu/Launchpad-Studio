import { useState } from "react";
import {
  ArrowRight, ArrowUpRight, BadgeCheck, Building2, CalendarCheck, Check, ChevronDown,
  Clock, Coffee, Globe, HandHeart, LayoutDashboard, Mail, MapPin, Menu, MonitorSmartphone,
  RefreshCw, Rocket, Scissors, Search, Server, ShieldCheck, ShoppingBag,
  Star, Store, UtensilsCrossed, Wrench, X, Zap, MessageSquare, FileText, MousePointerClick,
  HeartHandshake, PoundSterling, Timer, Lock, Camera
} from "lucide-react";
import AdminShowcase from "./components/AdminShowcase";
import PricingGuide from "./components/PricingGuide";
import { liveScreenshot, SCREENSHOT_FALLBACK } from "./utils/liveScreenshot";

// Real, live screenshots of the actual client websites (rendered on demand by URL —
// see src/utils/liveScreenshot.ts for details and how to swap in self-hosted images).
const TC_URL = "https://www.thaicourtyardmolesey.co.uk";
const CH_URL = "https://www.chantarathaimassage.com";
const tcDesktop = liveScreenshot(TC_URL, 1200, 750);
const tcMenu = liveScreenshot(`${TC_URL}/menu`, 1200, 750);
const tcMobile = liveScreenshot(TC_URL, 390, 844, 390);
const chDesktop = liveScreenshot(CH_URL, 1200, 750);
const chMobile = liveScreenshot(CH_URL, 390, 844, 390);

/* ---------------------------------- data ---------------------------------- */

const NAV = [
  { label: "Services", href: "#services" },
  { label: "Our Work", href: "#work" },
  { label: "Admin System", href: "#admin" },
  { label: "Pricing", href: "#pricing" },
  { label: "Process", href: "#process" },
  { label: "About", href: "#about" },
  { label: "FAQs", href: "#faq" },
];

const WHO_WE_HELP = [
  { icon: UtensilsCrossed, label: "Restaurants" },
  { icon: Coffee, label: "Cafés & Takeaways" },
  { icon: HandHeart, label: "Thai Massage" },
  { icon: Scissors, label: "Beauty Salons" },
  { icon: Wrench, label: "Tradespeople" },
  { icon: Store, label: "Retail Stores" },
  { icon: ShoppingBag, label: "Online Boutiques" },
  { icon: Building2, label: "Local Services" },
];

const SERVICES = [
  {
    icon: Building2, title: "Business Websites", tag: "Most popular",
    desc: "A clear, professional website that explains what you do, builds trust, and makes it easy for customers to contact you.",
    points: ["Mobile-friendly design", "Contact & enquiry forms", "Google Maps & opening hours"],
    for: "Trades, services & local firms",
  },
  {
    icon: UtensilsCrossed, title: "Restaurant Websites", tag: "Specialist",
    desc: "Menus, opening hours, location and booking enquiries — presented beautifully and easy to update when prices or dishes change.",
    points: ["Easy-to-update menus", "Opening hours & location", "Table enquiry / contact"],
    for: "Restaurants, cafés & takeaways",
  },
  {
    icon: ShoppingBag, title: "E-commerce Websites", tag: "",
    desc: "Sell products online with a simple shop your customers can trust — and you can manage without technical headaches.",
    points: ["Product & category pages", "Secure checkout setup", "Order email notifications"],
    for: "Boutiques & retail stores",
  },
  {
    icon: ShieldCheck, title: "Website Maintenance", tag: "",
    desc: "We keep your site updated, backed up and secure, and make small content changes for you if you'd rather not do them yourself.",
    points: ["Updates & backups", "Security checks", "Small content changes"],
    for: "Busy business owners",
  },
  {
    icon: Server, title: "Hosting & Domains", tag: "",
    desc: "Fast, reliable UK-friendly hosting and domain setup handled for you — no confusing control panels or renewal surprises.",
    points: ["Domain registration & renewal", "Fast, secure hosting", "Business email guidance"],
    for: "New & existing websites",
  },
  {
    icon: Search, title: "Search Engine Optimisation", tag: "",
    desc: "Practical SEO so local customers can find you on Google — the right pages, words and local listings, done properly from day one.",
    points: ["Local SEO for Surrey & London", "Google Business Profile help", "Page titles & structure"],
    for: "Businesses wanting enquiries",
  },
  {
    icon: RefreshCw, title: "Website Refreshes", tag: "",
    desc: "Already have a website that looks dated or is hard to use on phones? We'll modernise it while keeping what already works.",
    points: ["Modern, mobile-first redesign", "Faster loading pages", "Improved enquiries & calls"],
    for: "Outdated or slow websites",
  },
];

const PROJECTS = [
  {
    id: "thai-courtyard",
    category: "Restaurant",
    name: "Thai Courtyard",
    type: "Authentic Thai Restaurant Website",
    location: "East Molesey, Surrey",
    url: "https://www.thaicourtyardmolesey.co.uk",
    urlLabel: "thaicourtyardmolesey.co.uk",
    img: tcDesktop,
    img2: tcMenu,
    mobile: tcMobile,
    real: true,
    alt: "Screenshot of the Thai Courtyard East Molesey website homepage, designed and built by Launchpad Studio",
    overview: "A modern restaurant website built to showcase menus, opening hours and customer information across all devices — with online collection ordering, table booking requests and a Deliveroo link built in.",
    services: ["Restaurant Website Design", "Online Collection Ordering", "Table Booking Requests", "Custom Admin Dashboard", "SEO Setup", "Hosting & Support"],
    features: ["Mobile-friendly design", "Fast-loading pages", "Search engine optimised", "Integrated contact & location info", "Custom administration area", "Easy content management"],
    outcome: "A professional online presence with the ability for the client to manage day-to-day website updates independently — menus, prices, opening hours, closures and featured dishes.",
    accent: "bg-emerald-700",
    featured: true,
  },
  {
    id: "chantara",
    category: "Wellness",
    name: "Chantara Thai Massage",
    type: "Thai Massage Business Website",
    location: "United Kingdom",
    url: "https://www.chantarathaimassage.com",
    urlLabel: "chantarathaimassage.com",
    img: chDesktop,
    img2: "",
    mobile: chMobile,
    real: true,
    alt: "Screenshot of the Chantara Thai Massage website homepage, designed and built by Launchpad Studio",
    overview: "A calm, welcoming website for a Thai massage business, designed to explain treatments clearly, build confidence before booking, and make getting in touch simple on mobile.",
    services: ["Business Website Design", "Treatment & Price Pages", "Mobile-First Build", "Local SEO Basics", "Contact & Location Setup"],
    features: ["Clear treatment information", "Calm, trustworthy design", "Easy contact on mobile", "Fast, lightweight pages"],
    outcome: "A polished first impression that matches the in-person experience — helping new customers understand treatments and get in touch with confidence.",
    accent: "bg-teal-700",
    featured: false,
  },
  {
    id: "little-moonbeam",
    category: "Retail",
    name: "Little Moonbeam's Creations",
    type: "Handmade Jewellery & Gemstone Website",
    location: "Independent jewellery maker",
    url: "",
    urlLabel: "Link available on request",
    img: "https://images.pexels.com/photos/10429340/pexels-photo-10429340.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    img2: "",
    mobile: "",
    real: false,
    alt: "Handmade gemstone bead bracelet representing the Little Moonbeam's Creations jewellery website",
    overview: "A bespoke e-commerce website created for a jewellery designer specialising in handmade pieces crafted with semi-precious gemstones. Each collection is presented to show the stones and the artisan detail up close — with clear, easy browsing on a phone — giving an independent maker a professional home online to grow the brand from.",
    services: ["Bespoke E-commerce Website", "Collection & Product Pages", "Mobile-First Shopping", "Artisan Brand Design"],
    features: ["Handmade collections showcased", "Semi-precious gemstones in detail", "Easy browsing on mobile", "Clear pricing & secure enquiry", "Simple to update with new pieces"],
    outcome: "A site that reflects the craftsmanship behind every handmade piece — helping a small independent jewellery business look established, reach customers beyond the local market, and grow on its own terms.",
    accent: "bg-amber-700",
    featured: false,
  },
];

const FAQS = [
  { q: "How much does a website cost?", a: "It depends on what you need — a simple brochure site costs less than an online shop or a restaurant site with menu management. After a short chat, you'll get a clear, fixed quote in writing before any work starts. No obligation, and no pressure to go ahead." },
  { q: "How long does a website take to build?", a: "Most small business websites take 2–4 weeks once we have your content (text, photos, logo if you have one). If you need something sooner, tell us — we'll be honest about what's possible rather than promising and missing a date." },
  { q: "Can I update the website myself?", a: "Yes — that's the point. Where it makes sense, your site includes a simple admin area (like Thai Courtyard's menu and opening-hours manager) so you can make everyday updates yourself. We'll show you how, in plain English." },
  { q: "I already have a website. Can you improve it?", a: "Absolutely. A website refresh keeps your existing content and domain, but gives you a modern, mobile-friendly design, faster pages and clearer calls to action. We'll review your current site free of charge and tell you honestly what needs changing — and what doesn't." },
  { q: "Do you help with hosting, domains and email?", a: "Yes. We can register or transfer your domain, set up fast secure hosting, and help you get a professional email address (like hello@yourbusiness.co.uk). Everything is set up in your name so you always own it." },
  { q: "Will my website show up on Google?", a: "Every site we build includes the SEO fundamentals: correct page titles and descriptions, local keywords for your area, fast loading, mobile-friendliness and help with your Google Business Profile. That's what local customers actually search for." },
  { q: "What do you need from me to get started?", a: "Just a conversation to start. It helps if you have a logo, photos and an idea of your services, but if you don't, we can guide you. Many clients start with very little — we'll help you shape the content as we go." },
  { q: "Which areas do you cover?", a: "We're based in New Malden and work with businesses across Surrey and South West London — including Kingston, Wimbledon, Richmond, Epsom and Sutton. Most work is done remotely, so we can help wherever you are in the UK." },
];

/* --------------------------------- helpers --------------------------------- */

function RealFrame({ img, alt, href, eager }: { img: string; alt: string; href?: string; eager?: boolean }) {
  const image = (
    <img
      src={img}
      alt={alt}
      width={1200}
      height={750}
      className="block aspect-[16/10] w-full rounded-2xl border border-slate-200 object-cover object-top shadow-[0_20px_60px_-20px_rgba(11,30,59,0.3)]"
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      onError={(e) => { (e.currentTarget as HTMLImageElement).src = SCREENSHOT_FALLBACK; }}
    />
  );

  return href ? <a href={href} target="_blank" rel="noopener noreferrer" className="block transition hover:-translate-y-0.5">{image}</a> : image;
}

function PhoneFrame({ img, alt, className = "" }: { img: string; alt: string; className?: string }) {
  return (
    <div className={`overflow-hidden rounded-[26px] border-[6px] border-[#0B1E3B] bg-[#0B1E3B] shadow-2xl ${className}`}>
      <img
        src={img}
        alt={alt}
        width={360}
        height={780}
        className="block aspect-[390/844] w-full rounded-[20px] object-cover object-top"
        loading="lazy"
        decoding="async"
        onError={(e) => { (e.currentTarget as HTMLImageElement).src = SCREENSHOT_FALLBACK; }}
      />
    </div>
  );
}

function ProjectPlaceholder({ img, alt, name, type, badge }: { img: string; alt: string; name: string; type: string; badge?: string }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_20px_60px_-20px_rgba(11,30,59,0.25)]">
      <img
        src={img}
        alt={alt}
        className="aspect-[16/10] w-full object-cover"
        loading="lazy"
        decoding="async"
        onError={(e) => { (e.currentTarget as HTMLImageElement).src = SCREENSHOT_FALLBACK; }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#071426]/75 via-[#071426]/10 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
        {badge && <span className="inline-flex rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-semibold text-amber-700 ring-1 ring-amber-200">{badge}</span>}
        <p className="mt-2 font-[Fraunces,Georgia,serif] text-2xl font-semibold text-white sm:text-3xl">{name}</p>
        <p className="mt-1 text-sm text-white/85">{type}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-900">View Menu / Services</span>
          <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white ring-1 ring-white/40 backdrop-blur">Call to Book</span>
        </div>
      </div>
    </div>
  );
}

function SectionHeading({ eyebrow, title, copy, align = "center" }: { eyebrow: string; title: string; copy?: string; align?: "center" | "left" }) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p className={`inline-flex items-center gap-2 rounded-full bg-[#FFF3EC] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-[#C7511F] ring-1 ring-[#FFD9C7] ${align === "center" ? "" : ""}`}><span className="h-1.5 w-1.5 rounded-full bg-[#FF6B35]" />{eyebrow}</p>
      <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#0B1E3B] sm:text-4xl" style={{ textWrap: "balance" } as React.CSSProperties}>{title}</h2>
      {copy && <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">{copy}</p>}
    </div>
  );
}

/* ----------------------------------- app ----------------------------------- */

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState("All");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [quoteContext, setQuoteContext] = useState("");
  const [form, setForm] = useState({ name: "", business: "", email: "", phone: "", type: "Business Website", message: "", website: "" });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  const filtered = filter === "All" ? PROJECTS : PROJECTS.filter(p => p.category === filter);

  // Selecting a package in the pricing guide pre-fills the quote form below.
  const handleGuideQuote = (packageName: string) => {
    setQuoteContext(packageName);
    setForm(f => ({ ...f, type: packageName }));
    setSubmitted(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    setFormError("");
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setFormError("Please add your name, email and a few details about your project.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setFormError("That email address doesn't look quite right — please check it and try again.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        credentials: "omit",
        body: JSON.stringify(form),
      });
      const result: unknown = await response.json().catch(() => null);
      const responseOk =
        typeof result === "object" && result !== null && "ok" in result && result.ok === true;
      const errorMessage =
        typeof result === "object" && result !== null && "error" in result && typeof result.error === "string"
          ? result.error
          : "We couldn't send your enquiry just now. Please try again in a moment.";

      if (!response.ok || !responseOk) {
        setFormError(errorMessage);
        return;
      }
      setSubmitted(true);
    } catch {
      setFormError("We couldn't connect to the enquiry service. Please try again in a moment.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-[#0B1E3B] focus:px-4 focus:py-2 focus:text-white">Skip to content</a>

      {/* announcement */}
      <div className="bg-[#0B1E3B] text-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-5 gap-y-1 px-4 py-2 text-center text-[12.5px] sm:px-6">
          <span className="inline-flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-[#FF8A5C]" /> Based in New Malden — serving Surrey &amp; South West London</span>
          <span className="hidden h-3 w-px bg-white/25 sm:block" aria-hidden="true" />
          <a href="#quote" className="inline-flex items-center gap-1 font-semibold text-white underline decoration-[#FF6B35] decoration-2 underline-offset-4 hover:text-[#FFD9C7]">Get a free, no-obligation quote <ArrowRight className="h-3.5 w-3.5" /></a>
        </div>
      </div>

      {/* header */}
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <a href="#top" className="flex items-center gap-3" aria-label="Launchpad Studio — home">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0B1E3B] shadow-sm"><Rocket className="h-5 w-5 text-[#FF6B35]" /></span>
            <span className="leading-none">
              <span className="block text-[17px] font-extrabold tracking-tight text-[#0B1E3B]">Launchpad <span className="text-[#E85A28]">Studio</span></span>
              <span className="mt-0.5 block text-[10.5px] font-medium tracking-wide text-slate-500">launchpadstudio.uk</span>
            </span>
          </a>
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
            {NAV.map(n => <a key={n.href} href={n.href} className="rounded-lg px-2.5 py-2 text-[13.5px] font-semibold text-slate-700 hover:bg-slate-50 hover:text-[#0B1E3B] xl:px-3.5 xl:text-sm">{n.label}</a>)}
          </nav>
          <div className="flex items-center gap-2">
            <a href="#quote" className="hidden items-center gap-2 rounded-full bg-[#0B1E3B] px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#122A52] sm:inline-flex">Get a Free Quote <ArrowRight className="h-4 w-4" /></a>
            <button onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Toggle menu" className="inline-flex h-10 w-10 items-center justify-center rounded-lg ring-1 ring-slate-200 lg:hidden">{menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>
          </div>
        </div>
        {menuOpen && (
          <nav className="border-t border-slate-100 bg-white px-4 py-3 lg:hidden" aria-label="Mobile navigation">
            {NAV.map(n => <a key={n.href} href={n.href} onClick={() => setMenuOpen(false)} className="block rounded-lg px-3 py-2.5 text-[15px] font-semibold text-slate-800 hover:bg-slate-50">{n.label}</a>)}
            <a href="#quote" onClick={() => setMenuOpen(false)} className="mt-2 flex items-center justify-center gap-2 rounded-full bg-[#0B1E3B] px-5 py-3 text-sm font-semibold text-white">Get a Free Quote <ArrowRight className="h-4 w-4" /></a>
          </nav>
        )}
      </header>

      <main id="main">
        {/* ------------------------------- HERO ------------------------------- */}
        <section id="top" className="relative overflow-hidden">
          <div className="line-grid absolute inset-0" aria-hidden="true" />
          <div className="absolute -top-24 right-[-120px] h-80 w-80 rounded-full bg-[#FFF0E6] blur-3xl" aria-hidden="true" />
          <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-12 sm:px-6 sm:pt-16 lg:px-8 lg:pb-24 lg:pt-20">
            <div className="grid items-center gap-12 lg:grid-cols-12">
              <div className="lg:col-span-6">
                <p className="inline-flex flex-wrap items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm ring-1 ring-slate-200">
                  <span className="flex h-2 w-2"><span className="absolute h-2 w-2 animate-ping rounded-full bg-emerald-400 opacity-60" /><span className="h-2 w-2 rounded-full bg-emerald-500" /></span>
                  Website design · Surrey &amp; South West London
                </p>
                <h1 className="mt-6 text-[42px] font-extrabold leading-[1.02] tracking-tight text-[#0B1E3B] sm:text-6xl lg:text-[64px]">
                  Launchpad Studio
                  <span className="mt-3 block text-[26px] font-bold leading-tight text-slate-700 sm:text-3xl lg:text-[34px]">Professional websites for <span className="relative whitespace-nowrap text-[#E85A28]">local businesses.<svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 200 9" fill="none" preserveAspectRatio="none" aria-hidden="true"><path d="M2 7C60 2 140 2 198 6" stroke="#FF6B35" strokeWidth="3" strokeLinecap="round" opacity="0.45" /></svg></span></span>
                </h1>
                <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600">
                  We help restaurants, salons, retail stores and service businesses build a strong online presence with modern websites designed to attract customers and grow businesses.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a href="#work" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0B1E3B] px-7 py-3.5 text-[15px] font-semibold text-white shadow-lg shadow-[#0B1E3B]/20 hover:bg-[#122A52]">View Our Work <ArrowRight className="h-4 w-4" /></a>
                  <a href="#quote" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#FF6B35] px-7 py-3.5 text-[15px] font-semibold text-white shadow-lg shadow-orange-500/25 hover:bg-[#E85A28]">Get a Free Quote</a>
                </div>
                <ul className="mt-8 grid max-w-lg grid-cols-1 gap-2.5 text-sm text-slate-700 sm:grid-cols-2">
                  {["One-to-one, personal service", "Websites you can update yourself", "No large agency pricing", "Mobile-first & fast-loading"].map(t => (
                    <li key={t} className="flex items-start gap-2"><span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-50 ring-1 ring-emerald-200"><Check className="h-3 w-3 text-emerald-700" /></span>{t}</li>
                  ))}
                </ul>
                <p className="mt-6 flex items-center gap-2 text-sm text-slate-500"><MapPin className="h-4 w-4 text-[#E85A28]" /> New Malden · Kingston · Wimbledon · Richmond · Epsom · Sutton &amp; across Surrey</p>
              </div>

              <div className="relative lg:col-span-6">
                <div className="dot-grid absolute -right-6 -top-6 h-40 w-40 opacity-60" aria-hidden="true" />
                <RealFrame img={tcDesktop} alt="Thai Courtyard East Molesey restaurant website homepage, built by Launchpad Studio" href="https://www.thaicourtyardmolesey.co.uk" eager />
                {/* real mobile screenshot */}
                <div className="animate-floaty absolute -bottom-10 -left-2 hidden w-[132px] sm:block lg:-left-10">
                  <PhoneFrame img={chMobile} alt="Chantara Thai Massage website on a mobile phone" />
                  <p className="mt-2 text-center text-[10px] font-semibold text-slate-500">Chantara · mobile</p>
                </div>
                <div className="absolute -right-2 top-6 hidden rounded-2xl bg-white p-3.5 shadow-xl ring-1 ring-slate-200/80 sm:block lg:-right-4">
                  <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide text-slate-400"><LayoutDashboard className="h-3.5 w-3.5 text-[#E85A28]" /> Client admin included</p>
                  <p className="mt-1 text-[13px] font-semibold text-[#0B1E3B]">Update menus &amp; hours yourself</p>
                </div>
                <p className="mt-4 text-right text-xs text-slate-400 sm:mt-10">Real client work shown — visit the live sites in <a href="#work" className="font-semibold text-[#0B1E3B] underline underline-offset-2">Our Work</a> below.</p>
              </div>
            </div>
          </div>

          {/* who we help strip */}
          <div className="relative border-y border-slate-200 bg-[#F8FAFC]">
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
              <p className="text-center text-xs font-bold uppercase tracking-[0.16em] text-slate-400">Websites for businesses like yours</p>
              <div className="mt-4 flex flex-wrap justify-center gap-2.5">
                {WHO_WE_HELP.map(({ icon: Icon, label }) => (
                  <span key={label} className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#0B1E3B] shadow-sm ring-1 ring-slate-200"><Icon className="h-4 w-4 text-[#E85A28]" />{label}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ----------------------------- SERVICES ----------------------------- */}
        <section id="services" className="scroll-mt-24 bg-white py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading eyebrow="Services" title="Everything a local business needs to get online — done properly" copy="No jargon, no packages you don't need. Tell us about your business and we'll recommend only what will actually help." />
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {SERVICES.map(({ icon: Icon, title, desc, points, tag, for: ideal }) => (
                <article key={title} className="group relative flex flex-col rounded-3xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-[#0B1E3B]/30 hover:shadow-[0_20px_45px_-20px_rgba(11,30,59,0.3)] sm:p-7">
                  {tag && <span className="absolute right-5 top-5 rounded-full bg-[#FFF3EC] px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-wide text-[#C7511F] ring-1 ring-[#FFD9C7]">{tag}</span>}
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0B1E3B]"><Icon className="h-6 w-6 text-[#FF8A5C]" /></span>
                  <h3 className="mt-5 text-lg font-bold text-[#0B1E3B]">{title}</h3>
                  <p className="mt-2 flex-1 text-[15px] leading-relaxed text-slate-600">{desc}</p>
                  <ul className="mt-4 space-y-1.5 border-t border-slate-100 pt-4">
                    {points.map(p => <li key={p} className="flex items-start gap-2 text-sm text-slate-700"><Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />{p}</li>)}
                  </ul>
                  <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-slate-400">Ideal for: {ideal}</p>
                </article>
              ))}
              {/* CTA card as 8th tile */}
              <article className="flex flex-col justify-between rounded-3xl bg-[#0B1E3B] p-6 text-white sm:p-7">
                <div>
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/20"><MessageSquare className="h-6 w-6 text-[#FF8A5C]" /></span>
                  <h3 className="mt-5 text-lg font-bold">Not sure what you need?</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-white/80">That's completely normal. Tell us about your business and we'll give you honest advice — even if that advice is "you don't need that yet."</p>
                </div>
                <a href="#quote" className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-[#FF6B35] px-5 py-3 text-sm font-semibold text-white hover:bg-[#E85A28]">Ask for free advice <ArrowRight className="h-4 w-4" /></a>
              </article>
            </div>

            {/* included in every site */}
            <div className="mt-10 rounded-3xl bg-[#F8FAFC] p-6 ring-1 ring-slate-200 sm:p-8">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-md">
                  <h3 className="text-lg font-bold text-[#0B1E3B]">Included with every website</h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">The essentials done as standard — not sold back to you as expensive extras.</p>
                </div>
                <ul className="grid flex-1 gap-x-8 gap-y-2.5 sm:grid-cols-2 lg:grid-cols-3">
                  {["Mobile-friendly, responsive design", "Fast-loading pages", "SEO titles & descriptions", "Contact form & click-to-call", "Google Maps & opening hours", "Secure HTTPS setup", "Help setting up Google Business Profile", "Training to update your site", "30 days of launch support"].map(t => (
                    <li key={t} className="flex items-start gap-2 text-sm font-medium text-slate-700"><BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />{t}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------- WORK ------------------------------- */}
        <section id="work" className="scroll-mt-24 border-y border-slate-200 bg-[#FFFBF5] py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading eyebrow="Our Work" title="Real websites, for real local businesses" copy="No mock portfolios or invented case studies. These are live projects you can visit right now — built for businesses that needed to look professional and win customers online." />
            <div className="mt-8 flex flex-wrap justify-center gap-2" role="tablist" aria-label="Filter projects">
              {["All", "Restaurant", "Wellness", "Retail"].map(c => (
                <button key={c} role="tab" aria-selected={filter === c} onClick={() => setFilter(c)} className={`rounded-full px-5 py-2 text-sm font-semibold transition ${filter === c ? "bg-[#0B1E3B] text-white shadow" : "bg-white text-slate-700 ring-1 ring-slate-300 hover:ring-[#0B1E3B]"}`}>{c === "All" ? "All projects" : c}</button>
              ))}
            </div>

            <div className="mt-10 space-y-8">
              {filtered.map((p, idx) => (
                <article key={p.id} className={`overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm ${p.featured ? "ring-1 ring-[#0B1E3B]/10" : ""}`}>
                  <div className={`grid lg:grid-cols-2 ${idx % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""}`}>
                    <div className="p-4 sm:p-6">
                      {p.real ? (
                        <>
                          <div className="relative pb-6 pr-10 sm:pr-16">
                            <RealFrame img={p.img} alt={p.alt} href={p.url} />
                            {p.mobile && <PhoneFrame img={p.mobile} alt={`${p.name} website on a mobile phone`} className="absolute bottom-0 right-0 w-[92px] sm:w-[120px]" />}
                          </div>
                          {p.img2 && (
                            <figure className="mt-4">
                              <RealFrame img={p.img2} alt={`${p.name} online menu page`} href={`${p.url}/menu`} />
                              <figcaption className="mt-2 text-xs text-slate-500">Menu page — prices and dishes are managed by the owner from the admin dashboard.</figcaption>
                            </figure>
                          )}
                          <p className="mt-3 flex items-center gap-1.5 text-[11px] text-slate-400"><Camera className="h-3.5 w-3.5" />Real screenshots captured from the live website.</p>
                        </>
                      ) : (
                        <>
                          <ProjectPlaceholder img={p.img} alt={p.alt} name={p.name} type={p.type} badge="Placeholder — replace" />
                          <p className="mt-3 text-[11px] leading-relaxed text-slate-400">Placeholder image — swap in a real screenshot of the Little Moonbeam's Creations site when it's ready to share publicly.</p>
                        </>
                      )}
                    </div>
                    <div className="flex flex-col p-6 sm:p-8 lg:p-10">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white ${p.accent}`}>{p.category}</span>
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500"><MapPin className="h-3.5 w-3.5" />{p.location}</span>
                        {p.featured && <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-[11px] font-bold text-amber-800 ring-1 ring-amber-200"><Star className="h-3 w-3" /> Featured project</span>}
                      </div>
                      <h3 className="mt-4 text-2xl font-bold tracking-tight text-[#0B1E3B] sm:text-3xl">{p.name}</h3>
                      <p className="text-[15px] font-semibold text-[#E85A28]">{p.type}</p>
                      <p className="mt-3 text-[15px] leading-relaxed text-slate-600">{p.overview}</p>

                      <div className="mt-5">
                        <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-400">Services delivered</p>
                        <div className="mt-2 flex flex-wrap gap-1.5">{p.services.map(s => <span key={s} className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">{s}</span>)}</div>
                      </div>

                      <div className="mt-5 grid gap-2 sm:grid-cols-2">
                        {p.features.map(f => <p key={f} className="flex items-start gap-2 text-sm text-slate-700"><Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />{f}</p>)}
                      </div>

                      <div className="mt-6 rounded-2xl bg-[#F0F7F2] p-4 ring-1 ring-emerald-100">
                        <p className="text-xs font-bold uppercase tracking-[0.12em] text-emerald-800">Outcome</p>
                        <p className="mt-1.5 text-sm leading-relaxed text-slate-700">{p.outcome}</p>
                      </div>

                      <div className="mt-6 flex flex-wrap gap-3">
                        {p.url ? (
                          <a href={p.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#0B1E3B] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#122A52]">Visit live website <ArrowUpRight className="h-4 w-4" /></a>
                        ) : (
                          <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-5 py-2.5 text-sm font-semibold text-slate-600 ring-1 ring-slate-200"><Globe className="h-4 w-4" /> {p.urlLabel}</span>
                        )}
                        <a href="#quote" className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#0B1E3B] ring-1 ring-slate-300 hover:ring-[#0B1E3B]">I want something like this</a>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <AdminShowcase />

        {/* ------------------------------ PROCESS ------------------------------ */}
        <section id="process" className="scroll-mt-24 border-y border-slate-200 bg-[#0B1E3B] py-20 text-white lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-[#FFB08A] ring-1 ring-white/15"><span className="h-1.5 w-1.5 rounded-full bg-[#FF6B35]" /> How It Works</p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">From first chat to launch — simple and clear</h2>
              <p className="mt-4 text-white/75">You'll always know what happens next, what it costs, and when. No surprises, no technical jargon.</p>
            </div>
            <ol className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {[
                { n: "01", icon: MessageSquare, title: "Tell us about your business", desc: "A short, friendly chat (phone, video or in person locally) about what you do, who your customers are, and what your website needs to do." },
                { n: "02", icon: FileText, title: "Clear plan & fixed quote", desc: "You get a written plan and a fixed price before anything starts. If something isn't right for you, we'll say so — honestly." },
                { n: "03", icon: MonitorSmartphone, title: "Design & build", desc: "We design and build your site, share progress for your feedback, and refine it with you. You'll see it on phone and desktop as it comes together." },
                { n: "04", icon: Rocket, title: "Launch & ongoing support", desc: "We launch, check everything, show you how to update your site, and stay available for maintenance, hosting and future improvements." },
              ].map(({ n, icon: Icon, title, desc }) => (
                <li key={n} className="relative rounded-3xl bg-white/[0.06] p-6 ring-1 ring-white/12 backdrop-blur">
                  <span className="text-sm font-extrabold text-[#FF8A5C]">{n}</span>
                  <span className="mt-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#FF6B35]"><Icon className="h-5 w-5 text-white" /></span>
                  <h3 className="mt-4 font-bold">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">{desc}</p>
                </li>
              ))}
            </ol>
            <div className="mt-10 flex flex-col items-center justify-between gap-4 rounded-3xl bg-white p-6 text-[#0B1E3B] sm:p-7 lg:flex-row">
              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FFF3EC] ring-1 ring-[#FFD9C7]"><Timer className="h-5 w-5 text-[#E85A28]" /></span>
                <div><p className="font-bold">Typical timescale: 2–4 weeks</p><p className="text-sm text-slate-600">From agreed content to launch day for most small business websites.</p></div>
              </div>
              <a href="#quote" className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#0B1E3B] px-6 py-3 text-sm font-semibold text-white hover:bg-[#122A52]">Start with a free chat <ArrowRight className="h-4 w-4" /></a>
            </div>
          </div>
        </section>

        {/* --------------------------- PRICING GUIDE --------------------------- */}
        <PricingGuide onRequestQuote={handleGuideQuote} />

        {/* ------------------------------- ABOUT ------------------------------- */}
        <section id="about" className="scroll-mt-24 border-y border-slate-200 bg-[#F8FAFC] py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <div className="relative">
                  <div className="relative rounded-[28px] bg-gradient-to-br from-[#0B1E3B] to-[#1B3A6B] p-5 pb-12 shadow-lg sm:p-7 sm:pb-14">
                    <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.16em] text-white/60">Built by Launchpad Studio</p>
                    <div className="flex items-end gap-3">
                      <img src={tcMobile} alt="Thai Courtyard website on mobile" className="w-[30%] rounded-2xl border-4 border-white/90 object-cover object-top shadow-xl aspect-[390/844]" loading="lazy" />
                      <img src={chDesktop} alt="Chantara Thai Massage website on desktop" className="w-[70%] rounded-xl border-4 border-white/90 object-cover object-top shadow-xl aspect-[16/10]" loading="lazy" />
                    </div>
                  </div>
                  <div className="absolute -bottom-5 left-5 right-5 flex items-center gap-4 rounded-2xl bg-white p-4 shadow-xl ring-1 ring-slate-200 sm:left-6 sm:right-auto">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#0B1E3B] text-sm font-extrabold text-white">LS</span>
                    <div>
                      <p className="text-sm font-bold text-[#0B1E3B]">Launchpad Studio</p>
                      <p className="flex items-center gap-1 text-xs text-slate-500"><MapPin className="h-3 w-3" /> New Malden, Surrey · UK based</p>
                    </div>
                  </div>
                </div>
                <div className="mt-12 grid grid-cols-2 gap-3">
                  {[["UK based", "New Malden, Surrey"], ["One-to-one", "You deal with me directly"], ["Self-taught", "Built on real projects"], ["No agency markup", "Sensible, honest pricing"]].map(([a, b]) => (
                    <div key={a} className="rounded-2xl bg-white p-4 ring-1 ring-slate-200"><p className="text-sm font-bold text-[#0B1E3B]">{a}</p><p className="mt-0.5 text-xs text-slate-500">{b}</p></div>
                  ))}
                </div>
              </div>
              <div className="lg:col-span-7">
                <SectionHeading align="left" eyebrow="About Launchpad Studio" title="A real person, helping real local businesses get online" />
                <div className="prose-like mt-6 space-y-4 text-[16px] leading-relaxed text-slate-600">
                  <p>I'm a <strong className="text-[#0B1E3B]">self-taught web developer</strong> based in New Malden. I didn't learn this from a classroom exercise — I learned it by building real websites for real local businesses, like Thai Courtyard in Molesey and Chantara Thai Massage, and seeing first-hand what actually matters to owners: the phone ringing, bookings coming in, and a website they can update without dreading it.</p>
                  <p>Launchpad Studio exists for a simple reason: <strong className="text-[#0B1E3B]">too many good local businesses are invisible online</strong>, or stuck with a slow, outdated website they're almost embarrassed to share. You shouldn't need a large agency budget — or a computer science degree — to fix that.</p>
                  <p>When you work with Launchpad Studio, you work with me directly. One-to-one, in plain English. I'll tell you honestly what you need, what you don't, and what things cost before we start. The focus is always practical: a fast, professional website that helps customers find you, trust you, and get in touch.</p>
                </div>
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {[
                    { icon: HeartHandshake, t: "Personal, one-to-one service", d: "No account managers or hand-offs. The person you speak to is the person who builds your site." },
                    { icon: MousePointerClick, t: "Practical focus on results", d: "Clear calls, enquiries and bookings — not design awards or features nobody uses." },
                    { icon: PoundSterling, t: "No large agency pricing", d: "Professional quality without paying for a big office and layers of staff you'll never meet." },
                    { icon: Zap, t: "Built for real businesses", d: "Menus you can change, hours you control, pages Google can find. Technology that serves the business." },
                  ].map(({ icon: Icon, t, d }) => (
                    <div key={t} className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
                      <Icon className="h-5 w-5 text-[#E85A28]" />
                      <h3 className="mt-3 text-[15px] font-bold text-[#0B1E3B]">{t}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-slate-600">{d}</p>
                    </div>
                  ))}
                </div>
                <blockquote className="mt-8 rounded-2xl border-l-4 border-[#FF6B35] bg-white p-5 ring-1 ring-slate-200">
                  <p className="text-[15px] italic leading-relaxed text-slate-700">"If your website isn't helping customers find you and get in touch, it's just an expense. My job is to make it one of the most useful tools in your business."</p>
                  <footer className="mt-2 text-xs font-semibold uppercase tracking-wide text-slate-400">— Launchpad Studio, New Malden</footer>
                </blockquote>
              </div>
            </div>
          </div>
        </section>

        {/* -------------------------------- FAQ -------------------------------- */}
        <section id="faq" className="scroll-mt-24 bg-white py-20 lg:py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <SectionHeading eyebrow="Common Questions" title="Honest answers, before you commit to anything" copy="Can't find your question? Ask it in the quote form below — you'll get a straight answer, not a sales pitch." />
            <div className="mt-10 divide-y divide-slate-200 rounded-3xl border border-slate-200 bg-white">
              {FAQS.map((f, i) => (
                <div key={f.q}>
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} aria-expanded={openFaq === i} className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left">
                    <span className="text-[15px] font-bold text-[#0B1E3B] sm:text-base">{f.q}</span>
                    <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition ${openFaq === i ? "bg-[#0B1E3B] text-white" : "bg-slate-100 text-slate-600"}`}><ChevronDown className={`h-4 w-4 transition-transform ${openFaq === i ? "rotate-180" : ""}`} /></span>
                  </button>
                  {openFaq === i && <div className="px-6 pb-6 text-[15px] leading-relaxed text-slate-600">{f.a}</div>}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ------------------------------ CONTACT ------------------------------ */}
        <section id="quote" className="scroll-mt-24 border-t border-slate-200 bg-[#0B1E3B] py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-12">
              <div className="text-white lg:col-span-5">
                <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-[#FFB08A] ring-1 ring-white/15"><span className="h-1.5 w-1.5 rounded-full bg-[#FF6B35]" /> Free Quote</p>
                <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-[42px] lg:leading-[1.1]">Let's launch your business online.</h2>
                <p className="mt-4 max-w-md text-[16px] leading-relaxed text-white/75">Tell us a little about your business and what you need. You'll get a personal reply with honest advice and a clear, fixed quote — free, and with no obligation.</p>

                <div className="mt-8 space-y-4">
                  <div className="flex items-center gap-3 rounded-2xl bg-white/[0.06] p-4 ring-1 ring-white/12">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FF6B35]"><Mail className="h-5 w-5 text-white" /></span>
                    <span><span className="block text-xs uppercase tracking-wide text-white/50">Enquiries sent to</span><span className="font-semibold">hello@launchpadstudio.uk</span></span>
                  </div>
                  <div className="flex items-center gap-3 rounded-2xl bg-white/[0.06] p-4 ring-1 ring-white/12">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10"><MapPin className="h-5 w-5 text-[#FF8A5C]" /></span>
                    <span><span className="block text-xs uppercase tracking-wide text-white/50">Based in</span><span className="font-semibold">New Malden — serving Surrey &amp; South West London</span></span>
                  </div>
                  <div className="flex items-center gap-3 rounded-2xl bg-white/[0.06] p-4 ring-1 ring-white/12">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10"><Clock className="h-5 w-5 text-[#FF8A5C]" /></span>
                    <span><span className="block text-xs uppercase tracking-wide text-white/50">What happens next?</span><span className="font-semibold">Personal reply within 1 working day</span></span>
                  </div>
                </div>

                <ol className="mt-8 space-y-3 border-t border-white/10 pt-6 text-sm text-white/75">
                  {[["1", "We read your message and check any existing website you mention."], ["2", "You get honest advice and a clear, fixed quote in writing."], ["3", "Happy to go ahead? We agree a start date. Not right now? No hard feelings."]].map(([n, t]) => (
                    <li key={n} className="flex gap-3"><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#FF6B35] text-xs font-bold text-white">{n}</span>{t}</li>
                  ))}
                </ol>
              </div>

              <div className="lg:col-span-7">
                <div className="rounded-[28px] bg-white p-6 shadow-2xl sm:p-8">
                  {submitted ? (
                    <div className="py-10 text-center" role="status" aria-live="polite">
                      <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 ring-1 ring-emerald-200"><Check className="h-8 w-8 text-emerald-600" /></span>
                      <h3 className="mt-5 text-2xl font-bold text-[#0B1E3B]">Thank you, {form.name.split(" ")[0]} — your enquiry is on its way.</h3>
                      <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-slate-600">Your request about a <strong>{form.type}</strong> has been emailed to Launchpad Studio. We'll get back to you within one working day.</p>
                      <button type="button" onClick={() => { setSubmitted(false); setForm({ name: "", business: "", email: "", phone: "", type: "Business Website", message: "", website: "" }); setQuoteContext(""); setFormError(""); }} className="mt-6 text-sm font-semibold text-slate-500 underline underline-offset-4 hover:text-[#0B1E3B]">Send another enquiry</button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} noValidate aria-busy={isSubmitting}>
                      <div aria-hidden="true" className="absolute left-[-10000px] top-auto h-px w-px overflow-hidden">
                        <label htmlFor="website">Leave this field blank</label>
                        <input id="website" name="website" value={form.website} onChange={e => setForm({ ...form, website: e.target.value })} autoComplete="off" tabIndex={-1} />
                      </div>
                      <h3 className="text-xl font-bold text-[#0B1E3B]">Request your free quote</h3>
                      <p className="mt-1 text-sm text-slate-500">Takes about 60 seconds. Fields marked * are required.</p>

                      <fieldset className="mt-6">
                        <legend className="text-sm font-bold text-[#0B1E3B]">Website Required *</legend>
                        <div className="mt-2.5 flex flex-wrap gap-2">
                          {["Starter Website", "Business Website", "E-commerce Website", "Website Refresh", "Maintenance / Hosting", "Not Sure Yet"].map(t => (
                            <button key={t} type="button" onClick={() => setForm({ ...form, type: t })} aria-pressed={form.type === t} className={`rounded-full px-4 py-2 text-[13px] font-semibold transition ${form.type === t ? "bg-[#0B1E3B] text-white shadow" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}>{t}</button>
                          ))}
                        </div>
                        {quoteContext && (
                          <p className="mt-3 flex items-center gap-1.5 rounded-xl bg-[#FFF3EC] px-3 py-2 text-[12px] font-medium text-[#C7511F] ring-1 ring-[#FFD9C7]">
                            <Check className="h-3.5 w-3.5 shrink-0" /> Pre-filled from your pricing guide choice: {quoteContext}
                          </p>
                        )}
                      </fieldset>

                      <div className="mt-6 grid gap-4 sm:grid-cols-2">
                        <div>
                          <label htmlFor="name" className="text-sm font-bold text-[#0B1E3B]">Your Name *</label>
                          <input id="name" autoComplete="name" maxLength={120} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="e.g. Emma Thompson" className="mt-1.5 w-full rounded-xl border border-slate-300 px-4 py-3 text-[15px] placeholder:text-slate-400 focus:border-[#0B1E3B]" required />
                        </div>
                        <div>
                          <label htmlFor="business" className="text-sm font-bold text-[#0B1E3B]">Business Name</label>
                          <input id="business" autoComplete="organization" maxLength={160} value={form.business} onChange={e => setForm({ ...form, business: e.target.value })} placeholder="e.g. Emma's Café, Kingston" className="mt-1.5 w-full rounded-xl border border-slate-300 px-4 py-3 text-[15px] placeholder:text-slate-400 focus:border-[#0B1E3B]" />
                        </div>
                        <div>
                          <label htmlFor="email" className="text-sm font-bold text-[#0B1E3B]">Email Address *</label>
                          <input id="email" type="email" autoComplete="email" maxLength={254} value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="you@yourbusiness.co.uk" className="mt-1.5 w-full rounded-xl border border-slate-300 px-4 py-3 text-[15px] placeholder:text-slate-400 focus:border-[#0B1E3B]" required />
                        </div>
                        <div>
                          <label htmlFor="phone" className="text-sm font-bold text-[#0B1E3B]">Phone <span className="font-medium text-slate-400">(optional)</span></label>
                          <input id="phone" type="tel" autoComplete="tel" maxLength={50} value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="07xxx xxx xxx" className="mt-1.5 w-full rounded-xl border border-slate-300 px-4 py-3 text-[15px] placeholder:text-slate-400 focus:border-[#0B1E3B]" />
                        </div>
                      </div>
                      <div className="mt-4">
                        <label htmlFor="message" className="text-sm font-bold text-[#0B1E3B]">Tell us about your project *</label>
                        <textarea id="message" rows={5} maxLength={5000} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="What does your business do? Do you have a website already? Is there a site you like the look of? Anything else we should know…" className="mt-1.5 w-full resize-none rounded-xl border border-slate-300 px-4 py-3 text-[15px] leading-relaxed placeholder:text-slate-400 focus:border-[#0B1E3B]" required />
                      </div>

                      {formError && <p role="alert" className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700 ring-1 ring-red-200">{formError}</p>}

                      <button type="submit" disabled={isSubmitting} className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#FF6B35] px-7 py-4 text-[15px] font-bold text-white shadow-lg shadow-orange-500/25 hover:bg-[#E85A28] disabled:cursor-wait disabled:opacity-70">
                        {isSubmitting ? <><RefreshCw className="h-4 w-4 animate-spin" /> Sending your enquiry…</> : <>Submit enquiry <ArrowRight className="h-4 w-4" /></>}
                      </button>
                      <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-xs text-slate-500"><Lock className="h-3.5 w-3.5" /> Your details are sent securely to our inbox and used only to respond to your enquiry.</p>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------- FOOTER ------------------------------- */}
        <footer className="bg-[#071426] text-white">
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
            <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
              <div>
                <a href="#top" className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/15"><Rocket className="h-5 w-5 text-[#FF8A5C]" /></span>
                  <span className="leading-none"><span className="block text-[17px] font-extrabold tracking-tight">Launchpad <span className="text-[#FF8A5C]">Studio</span></span><span className="mt-0.5 block text-[10.5px] text-white/50">launchpadstudio.uk</span></span>
                </a>
                <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/65">Professional websites for local businesses. Designed, built and supported by a real person in New Malden, Surrey.</p>
                <p className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white"><Mail className="h-4 w-4 text-[#FF8A5C]" /> hello@launchpadstudio.uk</p>
              </div>
              <nav aria-label="Services">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/40">Services</p>
                <ul className="mt-4 space-y-2.5 text-sm text-white/75">
                  {SERVICES.map(s => <li key={s.title}><a href="#services" className="hover:text-white">{s.title}</a></li>)}
                </ul>
              </nav>
              <nav aria-label="Quick links">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/40">Explore</p>
                <ul className="mt-4 space-y-2.5 text-sm text-white/75">
                  <li><a href="#work" className="hover:text-white">Our Work</a></li>
                  <li><a href="#process" className="hover:text-white">How It Works</a></li>
                  <li><a href="#about" className="hover:text-white">About</a></li>
                  <li><a href="#faq" className="hover:text-white">FAQs</a></li>
                  <li><a href="#quote" className="hover:text-white">Get a Free Quote</a></li>
                </ul>
                <p className="mt-6 text-xs font-bold uppercase tracking-[0.14em] text-white/40">Live client sites</p>
                <ul className="mt-3 space-y-2 text-sm">
                  <li><a href="https://www.thaicourtyardmolesey.co.uk" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-white/75 hover:text-white">Thai Courtyard <ArrowUpRight className="h-3.5 w-3.5" /></a></li>
                  <li><a href="https://www.chantarathaimassage.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-white/75 hover:text-white">Chantara Thai Massage <ArrowUpRight className="h-3.5 w-3.5" /></a></li>
                </ul>
              </nav>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/40">Areas Served</p>
                <p className="mt-4 text-sm leading-relaxed text-white/75">Website design in New Malden, Kingston upon Thames, Wimbledon, Richmond, Epsom, Sutton, Molesey and across Surrey &amp; South West London — working remotely across the UK.</p>
                <p className="mt-4 flex items-start gap-2 text-sm text-white/75"><CalendarCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#FF8A5C]" /> Currently taking on new projects — get in touch for current availability.</p>
              </div>
            </div>
            <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/45 sm:flex-row">
              <p>© {new Date().getFullYear()} Launchpad Studio · launchpadstudio.uk · New Malden, Surrey</p>
              <p>Web design · Small business websites · Restaurant websites</p>
            </div>
          </div>
        </footer>

        {/* mobile sticky CTA */}
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 p-3 backdrop-blur sm:hidden">
          <a href="#quote" className="flex items-center justify-center gap-2 rounded-full bg-[#FF6B35] py-3 text-sm font-bold text-white shadow-lg">Get a Free Quote <ArrowRight className="h-4 w-4" /></a>
        </div>
        <div className="h-16 sm:hidden" aria-hidden="true" />
      </main>
    </div>
  );
}
