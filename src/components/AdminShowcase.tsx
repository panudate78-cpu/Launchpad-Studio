import { useState } from "react";
import { ArrowRight, Check, LayoutDashboard, Lock, ChevronLeft, ChevronRight } from "lucide-react";
import { ADMIN_SCREENS, AdminScreenView, type AdminScreen } from "./AdminScreens";

export default function AdminShowcase() {
  const [active, setActive] = useState<AdminScreen>(ADMIN_SCREENS[1]);
  const idx = ADMIN_SCREENS.findIndex(s => s.id === active.id);
  const go = (d: number) => setActive(ADMIN_SCREENS[(idx + d + ADMIN_SCREENS.length) % ADMIN_SCREENS.length]);
  const groups = ["Access", "Operations", "Business"] as const;

  return (
    <section id="admin" className="scroll-mt-24 bg-white py-20 lg:py-24" aria-labelledby="admin-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-end gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="inline-flex items-center gap-2 rounded-full bg-[#FFF3EC] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-[#C7511F] ring-1 ring-[#FFD9C7]"><span className="h-1.5 w-1.5 rounded-full bg-[#FF6B35]" />Thai Courtyard · Real Admin System</p>
            <h2 id="admin-heading" className="mt-4 text-3xl font-bold tracking-tight text-[#0B1E3B] sm:text-4xl">The admin dashboard behind the website</h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">These are the real screens from the custom admin system I built for Thai Courtyard. The owner runs orders, menus, opening times and bookings from here — without needing technical help.</p>
          </div>
          <ul className="grid gap-2.5 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
            {["Manage website content", "Update menus & prices instantly", "Control opening hours & closures", "Manage featured dishes", "Maintain the site without technical help"].map(t => (
              <li key={t} className="flex items-center gap-2.5 text-[15px] font-medium text-slate-700"><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-50 ring-1 ring-emerald-200"><Check className="h-3.5 w-3.5 text-emerald-700" /></span>{t}</li>
            ))}
          </ul>
        </div>

        {/* screen picker */}
        <div className="mt-10 -mx-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none]">
          <div className="flex min-w-max gap-2" role="tablist" aria-label="Admin screens">
            {groups.map(g => (
              <div key={g} className="flex items-center gap-1.5 rounded-full bg-slate-100 p-1">
                <span className="px-2.5 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">{g}</span>
                {ADMIN_SCREENS.filter(s => s.group === g).map(s => (
                  <button key={s.id} role="tab" aria-selected={active.id === s.id} aria-controls="admin-panel" onClick={() => setActive(s)} className={`rounded-full px-3.5 py-1.5 text-[13px] font-semibold transition ${active.id === s.id ? "bg-[#0B1E3B] text-white shadow" : "text-slate-700 hover:bg-white"}`}>{s.label}</button>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4 lg:pt-4">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#E85A28]">{String(idx + 1).padStart(2, "0")} / {String(ADMIN_SCREENS.length).padStart(2, "0")} · {active.group}</p>
            <h3 className="mt-2 text-2xl font-bold tracking-tight text-[#0B1E3B]">{active.title}</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-slate-600">{active.desc}</p>
            <div className="mt-6 flex items-center gap-2">
              <button onClick={() => go(-1)} aria-label="Previous screen" className="flex h-11 w-11 items-center justify-center rounded-full ring-1 ring-slate-300 hover:bg-slate-50"><ChevronLeft className="h-5 w-5" /></button>
              <button onClick={() => go(1)} aria-label="Next screen" className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0B1E3B] text-white hover:bg-[#122A52]"><ChevronRight className="h-5 w-5" /></button>
            </div>
            <div className="mt-8 rounded-2xl bg-[#F8FAFC] p-5 ring-1 ring-slate-200">
              <p className="text-sm font-bold text-[#0B1E3B]">Want this for your business?</p>
              <p className="mt-1 text-sm leading-relaxed text-slate-600">Online ordering, bookings and a dashboard you can actually use — tailored to how your restaurant or shop works.</p>
              <a href="#quote" className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#FF6B35] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#E85A28]">Ask about an admin area <ArrowRight className="h-4 w-4" /></a>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div id="admin-panel" role="tabpanel" aria-label={active.label} className="overflow-hidden rounded-2xl border border-slate-200 shadow-[0_30px_70px_-30px_rgba(11,30,59,0.45)]">
              <div className="flex items-center gap-2 border-b border-slate-200 bg-slate-50 px-4 py-2.5">
                <span className="flex gap-1.5" aria-hidden="true"><i className="block h-2.5 w-2.5 rounded-full bg-[#FF5F57]" /><i className="block h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" /><i className="block h-2.5 w-2.5 rounded-full bg-[#28C840]" /></span>
                <span className="ml-2 flex flex-1 items-center gap-1.5 truncate rounded-md bg-white px-3 py-1 text-[11px] font-medium text-slate-500 ring-1 ring-slate-200"><Lock className="h-3 w-3 shrink-0 text-emerald-600" />thaicourtyardmolesey.co.uk/admin{active.id === "sign-in" ? "/login" : `/${active.id}`}</span>
                <span className="hidden shrink-0 items-center gap-1 rounded-full bg-[#0B1E3B] px-2 py-0.5 text-[10px] font-semibold text-white sm:inline-flex"><LayoutDashboard className="h-3 w-3" />Admin</span>
              </div>
              <div className="max-h-[620px] overflow-y-auto">
                <AdminScreenView key={active.id} screen={active} />
              </div>
            </div>
            <p className="mt-3 text-center text-xs text-slate-400">Screens shown with the system's built-in sample data (labelled "Sample") — no real customer information is displayed.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
