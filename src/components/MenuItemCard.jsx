import { Pencil } from "lucide-react";
import { formatMoney } from "../utils/currency";

const CATEGORY_TINT = {
  Coffee: "bg-peach/60",
  Boba: "bg-gold/60",
  Pastries: "bg-blush/50",
  Drinks: "bg-maroon/10",
};

export default function MenuItemCard({ item, qtyInCart, onAdd, onEdit }) {
  return (
    <button
      onClick={() => onAdd(item)}
      className="group relative flex flex-col items-center gap-2 rounded-3xl border border-white/60 bg-white/70 p-4 text-center shadow-[0_4px_14px_-6px_rgba(107,87,80,0.18)] transition hover:-translate-y-0.5 hover:shadow-[0_10px_20px_-8px_rgba(107,87,80,0.25)] active:scale-[0.97]"
    >
      <span
        role="button"
        tabIndex={0}
        onClick={(e) => {
          e.stopPropagation();
          onEdit(item);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.stopPropagation();
            e.preventDefault();
            onEdit(item);
          }
        }}
        aria-label={`Edit ${item.name}`}
        className="absolute -left-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-white text-cocoa-soft shadow-sm transition hover:text-maroon"
      >
        <Pencil className="h-3 w-3" strokeWidth={2.2} />
      </span>

      {qtyInCart > 0 && (
        <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-blush-dark text-xs font-bold text-cocoa shadow-sm">
          {qtyInCart}
        </span>
      )}
      <div
        className={`flex h-16 w-16 items-center justify-center rounded-2xl text-3xl ${CATEGORY_TINT[item.category] ?? "bg-cream-dark"}`}
      >
        <span>{item.emoji}</span>
      </div>
      <p className="text-sm font-medium leading-tight text-cocoa">{item.name}</p>
      <p className="text-xs font-semibold text-cocoa-soft">{formatMoney(item.price)}</p>
    </button>
  );
}
