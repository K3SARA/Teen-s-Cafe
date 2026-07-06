import Logo from "./Logo";
import { businessInfo } from "../data/businessInfo";
import { TAX_RATE } from "../data/constants";
import { formatMoney } from "../utils/currency";

export default function Receipt({ receipt }) {
  const { orderNumber, items, subtotal, tax, total, timestamp } = receipt;

  return (
    <div id="receipt-print-area" className="mx-auto w-full max-w-[300px] bg-white px-5 py-6 text-cocoa">
      <div className="flex flex-col items-center gap-1 text-center">
        <Logo size={64} />
        <p className="font-display text-lg font-bold text-cocoa">{businessInfo.name}</p>
        <p className="text-[11px] text-cocoa-soft">{businessInfo.address}</p>
        <p className="text-[11px] text-cocoa-soft">
          {businessInfo.phones.join(" · ")}
        </p>
      </div>

      <div className="my-3 border-t border-dashed border-cocoa-soft/50" />

      <div className="flex justify-between text-[11px] text-cocoa-soft">
        <span>Order #{orderNumber}</span>
        <span>
          {timestamp.toLocaleDateString()} {timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </span>
      </div>

      <div className="my-3 border-t border-dashed border-cocoa-soft/50" />

      <ul className="flex flex-col gap-1.5 text-xs">
        {items.map((item) => (
          <li key={item.id} className="flex justify-between gap-2">
            <span className="min-w-0 flex-1 truncate">
              {item.name} <span className="text-cocoa-soft">x{item.qty}</span>
            </span>
            <span className="shrink-0 font-medium">{formatMoney(item.price * item.qty)}</span>
          </li>
        ))}
      </ul>

      <div className="my-3 border-t border-dashed border-cocoa-soft/50" />

      <div className="flex flex-col gap-1 text-xs">
        <div className="flex justify-between text-cocoa-soft">
          <span>Subtotal</span>
          <span>{formatMoney(subtotal)}</span>
        </div>
        <div className="flex justify-between text-cocoa-soft">
          <span>Tax ({TAX_RATE * 100}%)</span>
          <span>{formatMoney(tax)}</span>
        </div>
        <div className="flex justify-between text-sm font-bold text-cocoa">
          <span>Total</span>
          <span>{formatMoney(total)}</span>
        </div>
      </div>

      <div className="my-3 border-t border-dashed border-cocoa-soft/50" />

      <p className="text-center text-[11px] text-cocoa-soft">Thank you for visiting! ✨</p>
      <p className="mt-1 text-center text-[10px] text-cocoa-soft/70">from j&amp;co. software solutions</p>
    </div>
  );
}
