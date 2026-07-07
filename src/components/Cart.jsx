import { Minus, Plus, Trash2, ShoppingBag, UserPlus, X } from "lucide-react";
import { TAX_RATE } from "../data/constants";
import { formatMoney } from "../utils/currency";

export default function Cart({
  cartItems,
  onIncrement,
  onDecrement,
  onRemove,
  onCheckout,
  selectedCustomer,
  onOpenCustomerPicker,
  onClearCustomer,
  className = "",
}) {
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;
  const isEmpty = cartItems.length === 0;

  return (
    <div className={`flex h-full flex-col ${className}`}>
      <div className="flex items-center gap-2 px-5 pt-5 pb-3">
        <ShoppingBag className="h-5 w-5 text-cocoa-soft" strokeWidth={2.2} />
        <h2 className="font-display text-lg font-semibold text-cocoa">Your Order</h2>
      </div>

      <div className="px-5 pb-3">
        {selectedCustomer ? (
          <div className="flex items-center gap-2 rounded-2xl bg-blush/40 px-3 py-2">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blush-dark/70 text-xs font-bold text-cocoa">
              {selectedCustomer.name.trim().charAt(0).toUpperCase() || "?"}
            </div>
            <p className="min-w-0 flex-1 truncate text-sm font-medium text-cocoa">{selectedCustomer.name}</p>
            <button
              onClick={onClearCustomer}
              aria-label="Remove customer from order"
              className="flex h-6 w-6 items-center justify-center rounded-full text-cocoa-soft transition hover:text-maroon"
            >
              <X className="h-3.5 w-3.5" strokeWidth={2.5} />
            </button>
          </div>
        ) : (
          <button
            onClick={onOpenCustomerPicker}
            className="flex w-full items-center justify-center gap-1.5 rounded-2xl border border-dashed border-blush-dark/50 py-2 text-xs font-medium text-cocoa-soft transition hover:border-maroon/50 hover:text-maroon"
          >
            <UserPlus className="h-3.5 w-3.5" strokeWidth={2.2} />
            Attach Customer (optional)
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto px-4">
        {isEmpty ? (
          <div className="flex h-full flex-col items-center justify-center gap-2 py-12 text-center text-cocoa-soft">
            <span className="text-4xl">🧺</span>
            <p className="text-sm">Your cart is empty.</p>
            <p className="text-xs">Tap a menu item to add it!</p>
          </div>
        ) : (
          <ul className="flex flex-col gap-2 pb-2">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="flex items-center gap-3 rounded-2xl bg-cream-dark/70 p-3"
              >
                <span className="text-2xl leading-none">{item.emoji}</span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-cocoa">{item.name}</p>
                  <p className="text-xs text-cocoa-soft">{formatMoney(item.price)} each</p>
                </div>
                <div className="flex items-center gap-1.5 rounded-full bg-white px-1.5 py-1 shadow-sm">
                  <button
                    onClick={() => onDecrement(item.id)}
                    aria-label={`Remove one ${item.name}`}
                    className="flex h-6 w-6 items-center justify-center rounded-full text-cocoa-soft transition hover:bg-blush hover:text-cocoa"
                  >
                    <Minus className="h-3.5 w-3.5" strokeWidth={2.5} />
                  </button>
                  <span className="w-4 text-center text-sm font-semibold text-cocoa">{item.qty}</span>
                  <button
                    onClick={() => onIncrement(item.id)}
                    aria-label={`Add one more ${item.name}`}
                    className="flex h-6 w-6 items-center justify-center rounded-full text-cocoa-soft transition hover:bg-maroon/15 hover:text-maroon-dark"
                  >
                    <Plus className="h-3.5 w-3.5" strokeWidth={2.5} />
                  </button>
                </div>
                <button
                  onClick={() => onRemove(item.id)}
                  aria-label={`Delete ${item.name} from cart`}
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-cocoa-soft/70 transition hover:bg-blush-dark/40 hover:text-cocoa"
                >
                  <Trash2 className="h-3.5 w-3.5" strokeWidth={2.2} />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="border-t border-dashed border-blush-dark/60 px-5 py-4">
        <div className="flex justify-between text-sm text-cocoa-soft">
          <span>Subtotal</span>
          <span>{formatMoney(subtotal)}</span>
        </div>
        <div className="mt-1 flex justify-between text-sm text-cocoa-soft">
          <span>Tax ({TAX_RATE * 100}%)</span>
          <span>{formatMoney(tax)}</span>
        </div>
        <div className="mt-2 flex justify-between text-base font-semibold text-cocoa">
          <span>Total</span>
          <span>{formatMoney(total)}</span>
        </div>

        <button
          onClick={onCheckout}
          disabled={isEmpty}
          className="mt-4 w-full rounded-2xl bg-maroon py-3.5 text-base font-semibold text-cream shadow-[0_6px_16px_-4px_rgba(122,22,32,0.55)] transition hover:brightness-110 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
        >
          {isEmpty ? "Add items to charge" : `Charge ${formatMoney(total)} ✨`}
        </button>
      </div>
    </div>
  );
}
