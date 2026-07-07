import { CupSoda, Package, Users } from "lucide-react";
import Logo from "./Logo";

const NAV_ITEMS = [
  { id: "pos", label: "Billing", icon: CupSoda },
  { id: "inventory", label: "Stock", icon: Package },
  { id: "customers", label: "Customers", icon: Users },
];

export default function Sidebar({ activeTab, onChangeTab }) {
  return (
    <aside className="hidden w-60 shrink-0 flex-col border-r border-blush-dark/30 bg-white/60 px-4 py-6 lg:flex">
      <div className="flex items-center gap-2 px-2">
        <Logo size={40} />
        <div>
          <p className="font-display text-lg font-bold leading-tight text-cocoa">Teen&apos;s Cafe</p>
          <p className="text-xs text-cocoa-soft">billing &amp; stock</p>
        </div>
      </div>

      <nav className="mt-8 flex flex-col gap-1.5">
        {NAV_ITEMS.map(({ id, label, icon: Icon }) => {
          const active = activeTab === id;
          return (
            <button
              key={id}
              onClick={() => onChangeTab(id)}
              className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                active
                  ? "bg-maroon text-cream shadow-sm"
                  : "text-cocoa-soft hover:bg-blush/50 hover:text-cocoa"
              }`}
            >
              <Icon className="h-5 w-5" strokeWidth={2.2} />
              {label}
            </button>
          );
        })}
      </nav>

      <div className="mt-auto rounded-2xl bg-gold/40 p-4 text-xs text-cocoa-soft">
        <p className="font-semibold text-cocoa">Tip of the day 💡</p>
        <p className="mt-1">Restock ingredients that dip into the pink zone before your next shift!</p>
      </div>
    </aside>
  );
}
