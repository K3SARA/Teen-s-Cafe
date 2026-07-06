import { Minus, Plus } from "lucide-react";

export default function InventoryItem({ item, onAdjust }) {
  const isLow = item.stock <= item.lowStockThreshold;
  const ratio = Math.min(item.stock / (item.lowStockThreshold * 2 || 1), 1);

  return (
    <div
      className={`flex items-center gap-3 rounded-3xl border p-4 shadow-[0_4px_14px_-8px_rgba(107,87,80,0.2)] transition ${
        isLow ? "border-blush-dark/70 bg-blush/40" : "border-white/60 bg-white/70"
      }`}
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-cream-dark text-2xl">
        {item.emoji}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="truncate text-sm font-semibold text-cocoa">{item.name}</p>
          {isLow && (
            <span className="shrink-0 rounded-full bg-blush-dark/80 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-cocoa">
              Low
            </span>
          )}
        </div>
        <p className="mt-0.5 text-xs text-cocoa-soft">
          {item.stock} {item.unit} left · restock under {item.lowStockThreshold} {item.unit}
        </p>
        <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-cream-dark">
          <div
            className={`h-full rounded-full transition-all ${isLow ? "bg-blush-dark" : "bg-maroon"}`}
            style={{ width: `${ratio * 100}%` }}
          />
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-1.5 rounded-full bg-cream-dark/70 px-1.5 py-1">
        <button
          onClick={() => onAdjust(item.id, -1)}
          aria-label={`Decrease ${item.name} stock`}
          className="flex h-7 w-7 items-center justify-center rounded-full text-cocoa-soft transition hover:bg-blush-dark/50 hover:text-cocoa active:scale-90"
        >
          <Minus className="h-4 w-4" strokeWidth={2.5} />
        </button>
        <span className="w-6 text-center text-sm font-bold text-cocoa">{item.stock}</span>
        <button
          onClick={() => onAdjust(item.id, 1)}
          aria-label={`Increase ${item.name} stock`}
          className="flex h-7 w-7 items-center justify-center rounded-full text-cocoa-soft transition hover:bg-maroon/20 hover:text-maroon-dark active:scale-90"
        >
          <Plus className="h-4 w-4" strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}
