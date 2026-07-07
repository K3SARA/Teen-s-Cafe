import { CupSoda, Package, Users } from "lucide-react";

const NAV_ITEMS = [
  { id: "pos", label: "Billing", icon: CupSoda },
  { id: "inventory", label: "Stock", icon: Package },
  { id: "customers", label: "Customers", icon: Users },
];

export default function BottomNav({ activeTab, onChangeTab }) {
  return (
    <nav className="flex shrink-0 items-center justify-around border-t border-blush-dark/30 bg-white/90 px-2 py-2 backdrop-blur lg:hidden">
      {NAV_ITEMS.map(({ id, label, icon: Icon }) => {
        const active = activeTab === id;
        return (
          <button
            key={id}
            onClick={() => onChangeTab(id)}
            className={`flex flex-1 flex-col items-center gap-0.5 rounded-2xl py-1.5 text-xs font-medium transition ${
              active ? "text-maroon" : "text-cocoa-soft/70"
            }`}
          >
            <span
              className={`flex h-9 w-14 items-center justify-center rounded-full transition ${
                active ? "bg-maroon text-cream" : ""
              }`}
            >
              <Icon className="h-5 w-5" strokeWidth={2.2} />
            </span>
            {label}
          </button>
        );
      })}
    </nav>
  );
}
