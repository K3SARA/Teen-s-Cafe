import { useState } from "react";
import { Search, User, X } from "lucide-react";
import CustomerFormModal from "./CustomerFormModal";

export default function CustomerPickerModal({ customers, onSelect, onClose, onCreateCustomer }) {
  const [search, setSearch] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);

  const filtered = customers.filter((c) => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return c.name.toLowerCase().includes(q) || c.phone.toLowerCase().includes(q);
  });

  const handleCreate = async (customerData) => {
    const created = await onCreateCustomer(customerData);
    if (created) onSelect(created);
  };

  if (showCreateForm) {
    return (
      <CustomerFormModal
        customer={null}
        onSave={handleCreate}
        onDelete={() => {}}
        onClose={() => setShowCreateForm(false)}
      />
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-cocoa/40 backdrop-blur-[2px]" onClick={onClose} />
      <div className="relative z-10 flex max-h-[80vh] w-full max-w-sm flex-col overflow-hidden rounded-3xl bg-cream shadow-[0_20px_50px_-12px_rgba(89,16,25,0.45)]">
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-cocoa-soft shadow-sm"
        >
          <X className="h-4 w-4" strokeWidth={2.5} />
        </button>

        <div className="p-5 pb-3">
          <h2 className="font-display text-lg font-bold text-cocoa">Attach a Customer</h2>
          <p className="mt-1 text-xs text-cocoa-soft">Optional — leave blank for a walk-in sale.</p>
          <div className="relative mt-3">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-cocoa-soft/60" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or phone..."
              autoFocus
              className="w-full rounded-2xl border border-blush-dark/40 bg-white py-2.5 pl-10 pr-4 text-sm text-cocoa focus:border-maroon focus:outline-none"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-5 pb-3">
          <button
            onClick={() => onSelect(null)}
            className="mb-2 flex w-full items-center gap-3 rounded-2xl border border-dashed border-blush-dark/50 p-3 text-left text-sm text-cocoa-soft transition hover:border-maroon/50 hover:text-maroon"
          >
            <User className="h-5 w-5" strokeWidth={2} />
            Continue as walk-in (no customer)
          </button>

          {filtered.length === 0 ? (
            <p className="py-4 text-center text-sm text-cocoa-soft">No customers found.</p>
          ) : (
            <ul className="flex flex-col gap-2">
              {filtered.map((c) => (
                <li key={c.id}>
                  <button
                    onClick={() => onSelect(c)}
                    className="flex w-full items-center gap-3 rounded-2xl bg-white/80 p-3 text-left transition hover:bg-blush/40"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blush text-sm font-bold text-cocoa">
                      {c.name.trim().charAt(0).toUpperCase() || "?"}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-cocoa">{c.name}</p>
                      {c.phone && <p className="text-xs text-cocoa-soft">{c.phone}</p>}
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="border-t border-blush-dark/30 bg-white/60 p-4">
          <button
            onClick={() => setShowCreateForm(true)}
            className="w-full rounded-2xl bg-maroon py-3 text-sm font-semibold text-cream shadow-[0_6px_16px_-4px_rgba(122,22,32,0.55)] transition hover:brightness-110"
          >
            + Add New Customer
          </button>
        </div>
      </div>
    </div>
  );
}
