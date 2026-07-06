import { X } from "lucide-react";
import Cart from "./Cart";

export default function CartSheet({ open, onClose, ...cartProps }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-end lg:hidden">
      <div className="absolute inset-0 bg-cocoa/30 backdrop-blur-[2px]" onClick={onClose} />
      <div className="relative z-10 flex max-h-[85vh] w-full flex-col rounded-t-3xl bg-cream shadow-[0_-10px_30px_-10px_rgba(107,87,80,0.4)]">
        <div className="flex items-center justify-center pt-2.5">
          <span className="h-1.5 w-12 rounded-full bg-blush-dark/50" />
        </div>
        <button
          onClick={onClose}
          aria-label="Close cart"
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-cocoa-soft shadow-sm"
        >
          <X className="h-4 w-4" strokeWidth={2.5} />
        </button>
        <Cart {...cartProps} className="min-h-0" />
      </div>
    </div>
  );
}
