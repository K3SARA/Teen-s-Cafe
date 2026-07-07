import { Pencil } from "lucide-react";
import { formatMoney } from "../utils/currency";

export default function CustomerCard({ customer, onEdit }) {
  const initial = customer.name.trim().charAt(0).toUpperCase() || "?";

  return (
    <div className="relative flex items-center gap-3 rounded-3xl border border-white/60 bg-white/70 p-4 shadow-[0_4px_14px_-8px_rgba(107,87,80,0.2)]">
      <button
        onClick={() => onEdit(customer)}
        aria-label={`Edit ${customer.name}`}
        className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-white text-cocoa-soft shadow-sm transition hover:text-maroon"
      >
        <Pencil className="h-3.5 w-3.5" strokeWidth={2.2} />
      </button>

      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blush text-lg font-bold text-cocoa">
        {initial}
      </div>

      <div className="min-w-0 flex-1 pr-8">
        <p className="truncate text-sm font-semibold text-cocoa">{customer.name}</p>
        {customer.phone && <p className="text-xs text-cocoa-soft">{customer.phone}</p>}
        <p className="mt-1 text-xs text-cocoa-soft">
          {customer.visitCount} {customer.visitCount === 1 ? "visit" : "visits"} · {formatMoney(customer.totalSpent)}{" "}
          spent
        </p>
      </div>
    </div>
  );
}
