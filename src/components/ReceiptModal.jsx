import { Printer, X } from "lucide-react";
import Receipt from "./Receipt";

export default function ReceiptModal({ receipt, onClose }) {
  if (!receipt) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="no-print absolute inset-0 bg-cocoa/40 backdrop-blur-[2px]" onClick={onClose} />
      <div className="relative z-10 flex max-h-[90vh] w-full max-w-sm flex-col overflow-hidden rounded-3xl bg-cream shadow-[0_20px_50px_-12px_rgba(89,16,25,0.45)]">
        <button
          onClick={onClose}
          aria-label="Close receipt"
          className="no-print absolute right-3 top-3 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-cocoa-soft shadow-sm"
        >
          <X className="h-4 w-4" strokeWidth={2.5} />
        </button>

        <div className="overflow-y-auto pt-4">
          <Receipt receipt={receipt} />
        </div>

        <div className="no-print flex gap-2 border-t border-blush-dark/30 bg-white/60 p-4">
          <button
            onClick={onClose}
            className="flex-1 rounded-2xl bg-white py-3 text-sm font-semibold text-cocoa-soft shadow-sm transition hover:brightness-95"
          >
            Done
          </button>
          <button
            onClick={() => window.print()}
            className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-maroon py-3 text-sm font-semibold text-cream shadow-[0_6px_16px_-4px_rgba(122,22,32,0.55)] transition hover:brightness-110"
          >
            <Printer className="h-4 w-4" strokeWidth={2.2} />
            Print Receipt
          </button>
        </div>
      </div>
    </div>
  );
}
