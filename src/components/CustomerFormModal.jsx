import { useState } from "react";
import { Trash2, X } from "lucide-react";

export default function CustomerFormModal({ customer, onSave, onDelete, onClose }) {
  const isEditing = Boolean(customer);
  const [name, setName] = useState(customer?.name ?? "");
  const [phone, setPhone] = useState(customer?.phone ?? "");
  const [email, setEmail] = useState(customer?.email ?? "");
  const [notes, setNotes] = useState(customer?.notes ?? "");

  const isValid = name.trim().length > 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) return;
    onSave({ name: name.trim(), phone: phone.trim(), email: email.trim(), notes: notes.trim() });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-cocoa/40 backdrop-blur-[2px]" onClick={onClose} />
      <form
        onSubmit={handleSubmit}
        className="relative z-10 flex w-full max-w-sm flex-col overflow-hidden rounded-3xl bg-cream shadow-[0_20px_50px_-12px_rgba(89,16,25,0.45)]"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-cocoa-soft shadow-sm"
        >
          <X className="h-4 w-4" strokeWidth={2.5} />
        </button>

        <div className="flex flex-col gap-4 p-5 pt-6">
          <h2 className="font-display text-lg font-bold text-cocoa">
            {isEditing ? "Edit Customer" : "Add New Customer"}
          </h2>

          <div>
            <label className="mb-1 block text-xs font-medium text-cocoa-soft">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Amaya Perera"
              autoFocus
              className="w-full rounded-2xl border border-blush-dark/40 bg-white px-3 py-2 text-sm text-cocoa focus:border-maroon focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-cocoa-soft">Phone</label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="07XXXXXXXX"
              className="w-full rounded-2xl border border-blush-dark/40 bg-white px-3 py-2 text-sm text-cocoa focus:border-maroon focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-cocoa-soft">Email (optional)</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="amaya@example.com"
              className="w-full rounded-2xl border border-blush-dark/40 bg-white px-3 py-2 text-sm text-cocoa focus:border-maroon focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-cocoa-soft">Notes (optional)</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Loves oat milk, allergic to nuts..."
              rows={2}
              className="w-full resize-none rounded-2xl border border-blush-dark/40 bg-white px-3 py-2 text-sm text-cocoa focus:border-maroon focus:outline-none"
            />
          </div>
        </div>

        <div className="flex gap-2 border-t border-blush-dark/30 bg-white/60 p-4">
          {isEditing && (
            <button
              type="button"
              onClick={() => onDelete(customer.id)}
              aria-label="Delete customer"
              className="flex items-center justify-center gap-1.5 rounded-2xl bg-blush px-4 py-3 text-sm font-semibold text-cocoa transition hover:bg-blush-dark/70"
            >
              <Trash2 className="h-4 w-4" strokeWidth={2.2} />
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-2xl bg-white py-3 text-sm font-semibold text-cocoa-soft shadow-sm transition hover:brightness-95"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!isValid}
            className="flex-1 rounded-2xl bg-maroon py-3 text-sm font-semibold text-cream shadow-[0_6px_16px_-4px_rgba(122,22,32,0.55)] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Save Customer
          </button>
        </div>
      </form>
    </div>
  );
}
