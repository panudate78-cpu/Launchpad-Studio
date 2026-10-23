import {
  ShoppingBag, CalendarDays, Mail, Clock, PoundSterling, Search, Volume2, RefreshCw, Inbox,
  ChevronDown, ArrowUp, ArrowDown, Eye, SlidersHorizontal, Pencil, Plus, Star, ArrowRight,
} from "lucide-react";
import type { ReactNode } from "react";

/* Faithful recreations of the real Thai Courtyard admin system screens.
   If real screenshot files exist in src/assets/admin/<id>.(png|jpg|webp),
   they are used automatically instead of the recreation. */

const realShots = import.meta.glob("../assets/admin/*.{png,jpg,jpeg,webp}", { eager: true, import: "default" }) as Record<string, string>;
export function realShot(id: string): string | undefined {
  const key = Object.keys(realShots).find(k => k.split("/").pop()!.replace(/\.(png|jpe?g|webp)$/, "") === id);
  return key ? realShots[key] : undefined;
}

const serif = { fontFamily: '"Cormorant Garamond", Georgia, serif' };
const GOLD = "#C9A24A";

function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#8A6A2A]">{children}</p>;
}
function Title({ children }: { children: ReactNode }) {
  return <h4 className="text-[30px] font-semibold leading-tight text-[#1B1917] sm:text-[34px]" style={serif}>{children}</h4>;
}
function Sample() {
  return <span className="rounded-full bg-[#FBEFC8] px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-[#7A5410]">Sample</span>;
}
function Placeholder({ text }: { text: string }) {
  return (
    <div className="mt-4 rounded-2xl border border-[#F1DD97] bg-[#FFFBEA] px-4 py-3">
      <p className="text-[12.5px] font-semibold text-[#1B1917]">Placeholder data is in use</p>
      <p className="text-[12px] text-[#3a3631]">{text}</p>
    </div>
  );
}
function GoldStat({ label, value, sub, extra }: { label: string; value: string; sub: string; extra?: ReactNode }) {
  return (
    <div className="rounded-2xl border border-[#E7E1D8] bg-white p-4 shadow-[inset_4px_0_0_0_#C9A24A]">
      <div className="flex items-start justify-between gap-2"><p className="text-[10px] font-medium uppercase tracking-wide text-[#6b655c]">{label}</p><Sample /></div>
      <p className="mt-2 text-[26px] font-semibold tracking-tight text-[#1B1917]">{value}</p>
      <p className="text-[11.5px] text-[#7b756c]">{sub}</p>
      {extra}
    </div>
  );
}
function Bar({ n, label, right, pct }: { n: number; label: string; right: string; pct: number }) {
  return (
    <div className="py-1.5">
      <div className="flex items-center justify-between gap-3 text-[12.5px]">
        <span className="text-[#1B1917]"><span className="mr-1.5 text-[10px] text-[#9a948a]">{n}</span>{label}</span>
        <span className="shrink-0 text-[#7b756c]">{right}</span>
      </div>
      <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-[#E6DCCB]"><div className="h-full rounded-full" style={{ width: `${pct}%`, background: GOLD }} /></div>
    </div>
  );
}
function Toggle({ on = true }: { on?: boolean }) {
  return <span className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full ${on ? "bg-[#14915A]" : "bg-slate-300"}`}><span className={`absolute h-5 w-5 rounded-full bg-white shadow ${on ? "left-[22px]" : "left-0.5"}`} /></span>;
}
function IconBtn({ children, faded }: { children: ReactNode; faded?: boolean }) {
  return <span className={`inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[#E7E1D8] bg-white ${faded ? "text-[#cfc9c0]" : "text-[#1B1917]"}`}>{children}</span>;
}

/* ------------------------------ individual screens ------------------------------ */

function SignIn() {
  return (
    <div className="relative flex min-h-[460px] items-center justify-center bg-[#1D1B19] p-6" style={{ backgroundImage: "repeating-linear-gradient(45deg, rgba(201,162,74,.06) 0 2px, transparent 2px 28px), repeating-linear-gradient(-45deg, rgba(201,162,74,.06) 0 2px, transparent 2px 28px)" }}>
      <div className="w-full max-w-[380px] rounded-[26px] bg-white px-8 py-9 text-center shadow-2xl">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-[#1B1917]">
          <div className="flex h-14 w-14 flex-col items-center justify-center rounded-full border border-[#C9A24A]">
            <span className="text-[9px] leading-none text-[#C9A24A]">≀≀≀</span>
            <svg viewBox="0 0 24 14" className="mt-0.5 h-4 w-6" fill="none" stroke="#C9A24A" strokeWidth="1.4"><path d="M3 11a9 9 0 0118 0M1 12.5h22M12 2v1.5" /></svg>
            <span className="mt-0.5 text-[5.5px] font-bold tracking-wider text-white">ST. KITCHEN</span>
          </div>
        </div>
        <p className="mt-5 text-[32px] font-semibold text-[#1B1917]" style={serif}>Staff sign in</p>
        <p className="text-[14px] text-[#7b756c]">Orders, menu, bookings &amp; settings</p>
        <p className="mt-6 text-left text-[12px] font-bold uppercase tracking-wide text-[#4a453f]">Password</p>
        <div className="mt-1.5 h-11 rounded-xl border-2 border-[#E6D3A0] bg-white text-left"><span className="ml-3 mt-2.5 inline-block h-5 w-px animate-pulse bg-[#1B1917]" /></div>
        <div className="mt-4 rounded-xl bg-[#1B1917] py-3 text-[15px] font-semibold text-white">Sign in</div>
        <p className="mt-6 text-[13px] text-[#8a847b]">← Back to website</p>
      </div>
    </div>
  );
}

function Dashboard() {
  const stats = [
    { l: "New orders", v: "0", s: "All caught up", i: ShoppingBag },
    { l: "Pending bookings", v: "0", s: "Nothing waiting", i: CalendarDays },
    { l: "Unread messages", v: "0", s: "All read", i: Mail },
    { l: "Collections today", v: "0", s: "Pickups scheduled today", i: Clock },
    { l: "Today's value", v: "£0.00", s: "Excludes cancelled", i: PoundSterling },
  ];
  return (
    <div className="p-5 sm:p-7">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div><Eyebrow>Operations today</Eyebrow><Title>Dashboard</Title><p className="text-[13px] text-[#7b756c]">Friday 23 October 2026</p></div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#D5F5E3] px-3.5 py-1.5 text-[12.5px] font-medium text-[#0E6B3E]"><span className="h-1.5 w-1.5 rounded-full bg-[#0E6B3E]" />Online ordering is live</span>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-5">
        {stats.map(({ l, v, s, i: I }) => (
          <div key={l} className="rounded-2xl border border-[#E7E1D8] bg-white p-4 shadow-sm">
            <div className="flex items-start justify-between"><p className="text-[10px] font-medium uppercase tracking-wide text-[#6b655c]">{l}</p><I className="h-4 w-4 text-[#7A5A2A]" /></div>
            <p className="mt-2 text-[26px] font-semibold text-[#1B1917]">{v}</p><p className="text-[11.5px] text-[#7b756c]">{s}</p>
          </div>
        ))}
      </div>
      <p className="mt-6 text-[18px] font-medium text-[#1B1917]">Live orders</p>
      <div className="mt-2.5 flex flex-wrap items-center gap-2">
        <div className="flex flex-wrap rounded-xl border border-[#E7E1D8] bg-white p-1 text-[12.5px]">
          {["Active", "New", "Preparing", "Ready", "Collected", "Cancelled", "All"].map((t, i) => <span key={t} className={`rounded-lg px-2.5 py-1 ${i === 0 ? "bg-[#1B1917] text-white" : "text-[#3a3631]"}`}>{t}</span>)}
        </div>
        <span className="hidden flex-1 items-center gap-2 rounded-xl border border-[#E7E1D8] bg-white px-3 py-2 text-[12px] text-[#9a948a] lg:flex"><Search className="h-3.5 w-3.5" />Search name, phone or order no.</span>
        <span className="inline-flex items-center gap-1.5 rounded-xl bg-[#1B1917] px-3 py-2 text-[11.5px] font-semibold uppercase text-white"><Volume2 className="h-3.5 w-3.5" />Order alerts active</span>
        <span className="inline-flex items-center gap-1.5 rounded-xl border border-[#E7E1D8] bg-white px-3 py-2 text-[12px] text-[#1B1917]"><RefreshCw className="h-3.5 w-3.5" />Updated 11:40</span>
      </div>
      <div className="mt-3 flex flex-col items-center rounded-2xl border border-[#E7E1D8] bg-white py-9 text-center">
        <Inbox className="h-8 w-8 text-[#7b756c]" strokeWidth={1.5} />
        <p className="mt-2 text-[14px] text-[#5b564f]">No orders here yet.</p><p className="text-[12.5px] text-[#7b756c]">New collection orders will appear automatically.</p>
      </div>
      <div className="mt-3 flex items-center justify-between rounded-2xl border border-[#E7E1D8] bg-white p-5">
        <div><p className="text-[17px] font-medium text-[#1B1917]">Upcoming bookings</p><p className="mt-1 text-[12.5px] text-[#7b756c]">No upcoming bookings.</p></div>
        <span className="flex items-center gap-1 text-[12.5px] font-medium text-[#6B4E1F]">Manage bookings <ArrowRight className="h-3.5 w-3.5" /></span>
      </div>
    </div>
  );
}

function MenuPrices() {
  const dishes = [
    { n: "Soup of the Day", v: true, d: "Chef's daily soup served with warm bread. Ask your server for today's choice.", p: "6.50" },
    { n: "Crispy Halloumi", v: true, home: true, pick: true, d: "Golden fried halloumi with chilli jam and dressed leaves.", opt: "Dish options: Choice of Sauce", p: "7.50" },
    { n: "Chicken Wings", d: "Glazed chicken wings with sesame and spring onion.", p: "8.00" },
    { n: "Garlic Bread", v: true, d: "Wood-fired garlic butter flatbread.", p: "4.50" },
    { n: "Prawn Cocktail", d: "Classic prawn cocktail with Marie Rose sauce and baby gem lettuce.", p: "8.50" },
  ];
  return (
    <div className="p-5 sm:p-7">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div><p className="text-[28px] font-semibold tracking-tight text-[#1B1917]">Menu &amp; prices</p><p className="text-[12.5px] text-[#6b655c]">6 categories · 27 dishes. Changes go live on the website and ordering page immediately.</p></div>
        <div className="flex gap-2"><span className="hidden items-center gap-2 rounded-xl border border-[#E7E1D8] bg-white px-3 py-2 text-[12px] text-[#9a948a] sm:flex"><Search className="h-3.5 w-3.5" />Find a dish</span><span className="inline-flex items-center gap-1 rounded-xl bg-[#1B1917] px-3 py-2 text-[12.5px] font-semibold text-white"><Plus className="h-3.5 w-3.5" />Add category</span></div>
      </div>
      <p className="mt-4 rounded-2xl border border-[#E7E1D8] bg-white px-4 py-2.5 text-[11.5px] text-[#5b564f]">Tip: type a new price and press Enter to save it. Use the switch to mark a dish sold out for the day, and the star to feature it on the homepage.</p>
      <div className="mt-4 overflow-hidden rounded-2xl border border-[#E7E1D8] bg-white">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#EEE9E1] bg-[#FBFAF8] px-4 py-3">
          <p className="flex items-center gap-2 text-[17px] font-medium text-[#1B1917]"><ChevronDown className="h-4 w-4" />Starters <span className="text-[11px] font-normal text-[#8a847b]">5 dishes</span></p>
          <div className="hidden items-center gap-1.5 text-[12px] md:flex">
            <IconBtn faded><ArrowUp className="h-3.5 w-3.5" /></IconBtn><IconBtn><ArrowDown className="h-3.5 w-3.5" /></IconBtn>
            <span className="inline-flex items-center gap-1 rounded-lg border border-[#E7E1D8] px-2.5 py-1.5"><Eye className="h-3.5 w-3.5" />Visible</span>
            <span className="inline-flex items-center gap-1 rounded-lg border border-[#E7E1D8] px-2.5 py-1.5"><SlidersHorizontal className="h-3.5 w-3.5" />Options</span>
            <span className="inline-flex items-center gap-1 rounded-lg bg-[#1B1917] px-2.5 py-1.5 font-semibold text-white"><Plus className="h-3.5 w-3.5" />Add dish</span>
          </div>
        </div>
        {dishes.map((d, i) => (
          <div key={d.n} className={`flex flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center sm:justify-between ${i < dishes.length - 1 ? "border-b border-[#EEE9E1]" : ""}`}>
            <div className="min-w-0">
              <p className="flex flex-wrap items-center gap-1.5 text-[14.5px] text-[#1B1917]">{d.n}
                {d.home && <span className="inline-flex items-center gap-1 rounded-full bg-[#FBEFC8] px-2 py-0.5 text-[10px] text-[#6B4510]"><Star className="h-2.5 w-2.5 fill-current" />Homepage</span>}
                {d.v && <span className="rounded border border-[#E7E1D8] px-1 text-[9.5px] text-[#6b655c]">V</span>}
                {d.pick && <span className="rounded bg-[#F1EEE9] px-1.5 text-[9.5px] text-[#4a453f]">Chef's pick</span>}
              </p>
              <p className="truncate text-[12px] text-[#6b655c]">{d.d}</p>
              {d.opt && <p className="text-[10.5px] text-[#8a847b]">{d.opt}</p>}
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <span className="w-20 rounded-lg border border-[#E7E1D8] px-2.5 py-1.5 text-[13px] text-[#1B1917]">£ {d.p}</span>
              <Toggle /><span className="text-[11px] text-[#6b655c]">In stock</span>
              <IconBtn><Star className={`h-3.5 w-3.5 ${d.home ? "fill-[#F5A623] text-[#F5A623]" : ""}`} /></IconBtn>
              <span className="hidden items-center gap-1 rounded-lg border border-[#E7E1D8] px-2.5 py-1.5 text-[12px] sm:inline-flex"><Pencil className="h-3 w-3" />Edit</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Settings() {
  const Select = ({ label, v }: { label: string; v: string }) => (
    <div className="flex-1"><p className="text-[10px] font-semibold uppercase tracking-wide text-[#5b564f]">{label}</p><div className="mt-1 flex items-center justify-between rounded-lg border border-[#D9D3CA] bg-white px-3 py-2 text-[13px] text-[#1B1917]">{v}<ChevronDown className="h-3.5 w-3.5" /></div></div>
  );
  return (
    <div className="p-5 sm:p-7">
      <p className="text-[28px] font-semibold tracking-tight text-[#1B1917]">Settings</p>
      <p className="text-[12.5px] text-[#6b655c]">Online ordering, collection times, notifications and the website banner.</p>
      <div className="mt-4 space-y-3">
        <div className="grid gap-4 rounded-2xl border border-[#E7E1D8] bg-white p-5 md:grid-cols-[200px_1fr]">
          <div><p className="text-[14px] font-medium text-[#1B1917]">Online ordering</p><p className="text-[12px] text-[#6b655c]">Pause collection ordering when the kitchen is too busy or closed unexpectedly.</p></div>
          <div><p className="flex items-center gap-2 text-[13px] font-medium text-[#0E7A45]"><Toggle />Accepting online orders</p><p className="mt-3 text-[10px] font-semibold uppercase tracking-wide text-[#5b564f]">Message shown while paused</p><div className="mt-1 rounded-lg border border-[#D9D3CA] px-3 py-2 text-[12px] text-[#9a948a]">We're very busy right now — please call 020 8941 3595 to order.</div></div>
        </div>
        <div className="grid gap-4 rounded-2xl border border-[#E7E1D8] bg-white p-5 md:grid-cols-[200px_1fr]">
          <div><p className="text-[14px] font-medium text-[#1B1917]">Collection times</p><p className="text-[12px] text-[#6b655c]">Opening hours are Tuesday–Saturday 12:00–21:00. Collection slots are offered within these hours.</p></div>
          <div className="flex flex-col gap-3 sm:flex-row"><Select label="Minimum prep time" v="20 minutes" /><Select label="Slot interval" v="Every 15 minutes" /><Select label="Order ahead" v="Up to 7 days" /></div>
        </div>
        <div className="grid gap-4 rounded-2xl border border-[#E7E1D8] bg-white p-5 md:grid-cols-[200px_1fr]">
          <div><p className="text-[14px] font-medium text-[#1B1917]">Holiday closures</p><p className="text-[12px] text-[#6b655c]">Dates when the restaurant is closed. No collection slots or online bookings are offered.</p></div>
          <div><div className="flex gap-2"><span className="rounded-lg border border-[#D9D3CA] px-3 py-2 text-[12.5px] text-[#1B1917]">dd/mm/yyyy</span><span className="inline-flex items-center gap-1 rounded-lg border border-[#EEE9E1] px-3 py-2 text-[12.5px] text-[#9a948a]"><Plus className="h-3.5 w-3.5" />Add date</span></div><p className="mt-3 text-[12px] text-[#6b655c]">No closures scheduled.</p></div>
        </div>
      </div>
    </div>
  );
}

function Sales() {
  return (
    <div className="p-5 sm:p-7">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="max-w-xl"><Eyebrow>Business</Eyebrow><Title>Sales</Title><p className="text-[12.5px] text-[#6b655c]">Collection revenue for the month you choose. Cancelled orders are kept out of revenue and shown as the refund figure.</p></div>
        <div className="flex gap-2 text-[13px]">{[["Month", "October"], ["Year", "2026"]].map(([l, v]) => <div key={l}><p className="text-[10px] uppercase tracking-wide text-[#6b655c]">{l}</p><div className="mt-1 flex w-28 items-center justify-between rounded-lg border border-[#E7E1D8] bg-white px-3 py-2">{v}<ChevronDown className="h-3.5 w-3.5" /></div></div>)}</div>
      </div>
      <Placeholder text="No collection orders are stored yet, so this month uses a deterministic sample that follows Tuesday–Saturday opening hours." />
      <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <GoldStat label="Total revenue" value="£8715.35" sub="Month to date, excluding cancelled" extra={<p className="mt-1 text-[11px] text-[#6b655c]"><span className="text-[#B42318]">Down 3.8%</span> vs 1–23 Sep</p>} />
        <GoldStat label="Total orders" value="303" sub="Non-cancelled collection orders" />
        <GoldStat label="Average order value" value="£28.76" sub="303 orders" />
        <GoldStat label="Customers" value="224" sub="Estimated unique guests" />
      </div>
      <div className="mt-3 rounded-2xl border border-[#E7E1D8] bg-white p-5">
        <p className="text-[17px] font-medium text-[#1B1917]">Previous month comparison</p><p className="text-[12px] text-[#6b655c]">Like-for-like days, plus the full previous month for context.</p>
        <div className="mt-4 grid grid-cols-3 gap-3">
          {[["October 2026 to date", "£8715.35", ""], ["1–23 September 2026", "£9057.39", ""], ["Growth", "-3.8%", "text-[#B42318]"]].map(([l, v, c]) => <div key={l}><p className="text-[10px] uppercase tracking-wide text-[#6b655c]">{l}</p><p className={`mt-1 text-[22px] font-semibold text-[#1B1917] sm:text-[26px] ${c}`}>{v}</p></div>)}
        </div>
      </div>
    </div>
  );
}

function Food() {
  const best: [string, string, number][] = [["House Burger", "186 sold · £2883.00", 100], ["Grilled Chicken", "164 sold · £2706.00", 88], ["Crispy Halloumi", "142 sold · £1065.00", 76], ["Fish & Chips", "128 sold · £2048.00", 69], ["Garden Risotto", "121 sold · £1754.50", 65], ["Mixed Grill", "96 sold · £2304.00", 52]];
  const worst: [string, string, number][] = [["Still Water 500ml", "8 sold · £16.00", 36], ["Garlic Bread", "9 sold · £40.50", 41], ["Seasonal Greens", "11 sold · £49.50", 50], ["House Salad", "14 sold · £63.00", 64], ["Onion Rings", "22 sold · £99.00", 100]];
  return (
    <div className="p-5 sm:p-7">
      <Eyebrow>Business</Eyebrow><Title>Food performance</Title>
      <p className="text-[12.5px] text-[#6b655c]">Illustrative month on the demo menu. Lunch is a collection before 16:00. Dinner is 16:00 onwards.</p>
      <Placeholder text="No order lines yet. Rankings use an illustrative mix of the current menu and are labelled sample." />
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <div className="rounded-2xl border border-[#E7E1D8] bg-white p-5"><p className="text-[17px] font-medium text-[#1B1917]">Best selling dishes</p><p className="mb-2 text-[12px] text-[#6b655c]">Ranked by quantity.</p>{best.map(([l, r, p], i) => <Bar key={l} n={i + 1} label={l} right={r} pct={p} />)}</div>
        <div className="rounded-2xl border border-[#E7E1D8] bg-white p-5"><p className="text-[17px] font-medium text-[#1B1917]">Worst selling dishes</p><p className="mb-2 text-[12px] text-[#6b655c]">Lowest quantity, with unsold items filling the list.</p>{worst.map(([l, r, p], i) => <Bar key={l} n={i + 1} label={l} right={r} pct={p} />)}</div>
      </div>
    </div>
  );
}

function Bookings() {
  return (
    <div className="p-5 sm:p-7">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div><Eyebrow>Business</Eyebrow><Title>Booking analytics</Title><p className="text-[12.5px] text-[#6b655c]">Demand from website table requests. Confirming and declining guests happens on the bookings desk.</p></div>
        <span className="rounded-xl border border-[#E7E1D8] bg-white px-3.5 py-2 text-[12.5px] text-[#1B1917]">Open bookings desk</span>
      </div>
      <Placeholder text="No table requests are stored yet. Times, days and party size are a sample of a typical East Molesey week, with Sunday and Monday closed." />
      <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <GoldStat label="Total bookings" value="4917" sub="Sample requests over 18 months" />
        <GoldStat label="Upcoming bookings" value="145" sub="Next three weeks · sample" />
        <GoldStat label="This month" value="265" sub="October 2026" />
        <GoldStat label="Average party size" value="2.8" sub="Sample" />
      </div>
      <div className="mt-3 rounded-2xl border border-[#E7E1D8] bg-white p-5">
        <p className="text-[17px] font-medium text-[#1B1917]">Average party size</p><p className="text-[12px] text-[#6b655c]">Sample average. Live party size is used as soon as bookings exist.</p>
        <p className="mt-3 text-[44px] font-semibold leading-none text-[#1B1917]" style={serif}>2.8</p><p className="text-[12px] text-[#6b655c]">guests</p>
      </div>
    </div>
  );
}

function Customers() {
  return (
    <div className="p-5 sm:p-7">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div><Eyebrow>Business</Eyebrow><Title>Customer analytics</Title><p className="text-[12.5px] text-[#6b655c]">Who is new, who comes back, and who spends the most.</p></div>
        <span className="rounded-xl border border-[#E7E1D8] bg-white px-3.5 py-2 text-[12.5px] text-[#1B1917]">Open customer list</span>
      </div>
      <Placeholder text="Sample guest book. Names, phones and emails are fictional." />
      <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <GoldStat label="Total customers" value="420" sub="Sample directory" />
        <GoldStat label="New this month" value="22" sub="First known order this month" />
        <GoldStat label="Returning customers" value="220" sub="2 or more orders" />
        <GoldStat label="Retention" value="52%" sub="Returning ÷ total" />
      </div>
      <div className="mt-3 rounded-2xl border border-[#E7E1D8] bg-white p-5">
        <p className="text-[17px] font-medium text-[#1B1917]">Customer retention</p><p className="mb-2 text-[12px] text-[#6b655c]">Tiers: VIP at 25 orders, Gold at 10, Regular at 3.</p>
        <Bar n={1} label="VIP · 25+ orders" right="Same tier as the customer list" pct={3} />
        <Bar n={2} label="Gold · 10–24" right="Same tier as the customer list" pct={6} />
        <Bar n={3} label="Regular · 3–9" right="Same tier as the customer list" pct={19} />
        <Bar n={4} label="Newer · under 3" right="Includes first orders" pct={100} />
      </div>
    </div>
  );
}

export const ADMIN_SCREENS = [
  { id: "sign-in", label: "Secure sign in", group: "Access", title: "Private, password-protected staff login", desc: "Only the restaurant's team can get in. One clean sign-in screen for orders, menu, bookings and settings.", Comp: SignIn },
  { id: "dashboard", label: "Dashboard", group: "Operations", title: "Today's operations at a glance", desc: "New collection orders, pending table bookings, unread messages, today's collections and takings — with live order alerts so nothing gets missed during service.", Comp: Dashboard },
  { id: "menu", label: "Menu & prices", group: "Operations", title: "Change menus and prices instantly", desc: "Type a new price and press Enter. Mark a dish sold out for the day, or star it to feature on the homepage. Changes go live on the website and ordering page immediately.", Comp: MenuPrices },
  { id: "settings", label: "Settings", group: "Operations", title: "Control ordering, collection times & closures", desc: "Pause online ordering when the kitchen is slammed, set prep times and collection slots, and add holiday closures — no developer needed.", Comp: Settings },
  { id: "sales", label: "Sales", group: "Business", title: "Clear monthly sales reporting", desc: "Revenue, orders, average order value and month-on-month comparisons — so the owner can see how the business is actually doing.", Comp: Sales },
  { id: "food", label: "Food performance", group: "Business", title: "Know which dishes sell — and which don't", desc: "Best and worst sellers ranked by quantity and value, helping the owner make smarter menu decisions.", Comp: Food },
  { id: "bookings", label: "Booking analytics", group: "Business", title: "Understand table booking demand", desc: "Booking volumes, upcoming covers and average party size from website table requests.", Comp: Bookings },
  { id: "customers", label: "Customer analytics", group: "Business", title: "See who comes back", desc: "New vs returning customers, retention and loyalty tiers — the foundation for rewarding regulars.", Comp: Customers },
] as const;

export type AdminScreen = (typeof ADMIN_SCREENS)[number];

export function AdminScreenView({ screen }: { screen: AdminScreen }) {
  const shot = realShot(screen.id);
  if (shot) return <img src={shot} alt={`Thai Courtyard admin — ${screen.label} screen`} className="block w-full" loading="lazy" />;
  const C = screen.Comp;
  return <div className="bg-[#F4EFE8]" style={{ fontFamily: '"Manrope", Inter, system-ui, sans-serif' }}><C /></div>;
}
