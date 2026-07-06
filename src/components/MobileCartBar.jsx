import { ShoppingBag } from "lucide-react";
import { formatMoney } from "../utils/currency";

export default function MobileCartBar({ itemCount, total, onOpen }) {
  if (itemCount === 0) return null;

  return (
    <button
      onClick={onOpen}
      className="absolute inset-x-3 bottom-3 z-30 flex items-center justify-between rounded-2xl bg-maroon-dark px-4 py-3 text-cream shadow-[0_10px_24px_-8px_rgba(89,16,25,0.55)] lg:hidden"
    >
      <span className="flex items-center gap-2 text-sm font-semibold">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blush text-xs font-bold text-cocoa">
          {itemCount}
        </span>
        <ShoppingBag className="h-4 w-4" strokeWidth={2.2} />
        View order
      </span>
      <span className="text-sm font-bold">{formatMoney(total)}</span>
    </button>
  );
}
