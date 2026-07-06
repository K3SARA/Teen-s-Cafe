import { useState } from "react";
import { Trash2, X } from "lucide-react";

export default function ProductFormModal({ item, categories, onSave, onDelete, onClose }) {
  const isEditing = Boolean(item);
  const [name, setName] = useState(item?.name ?? "");
  const [category, setCategory] = useState(item?.category ?? categories[0]);
  const [price, setPrice] = useState(item?.price?.toString() ?? "");
  const [emoji, setEmoji] = useState(item?.emoji ?? "🍽️");

  const isValid = name.trim().length > 0 && Number(price) > 0 && emoji.trim().length > 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) return;
    onSave({ name: name.trim(), category, price: Number(price), emoji: emoji.trim() });
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
            {isEditing ? "Edit Item" : "Add New Item"}
          </h2>

          <div className="flex gap-3">
            <div className="w-20 shrink-0">
              <label className="mb-1 block text-xs font-medium text-cocoa-soft">Emoji</label>
              <input
                value={emoji}
                onChange={(e) => setEmoji(e.target.value)}
                maxLength={4}
                className="w-full rounded-2xl border border-blush-dark/40 bg-white px-3 py-2 text-center text-xl focus:border-maroon focus:outline-none"
              />
            </div>
            <div className="flex-1">
              <label className="mb-1 block text-xs font-medium text-cocoa-soft">Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Vanilla Latte"
                className="w-full rounded-2xl border border-blush-dark/40 bg-white px-3 py-2 text-sm text-cocoa focus:border-maroon focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-cocoa-soft">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-2xl border border-blush-dark/40 bg-white px-3 py-2 text-sm text-cocoa focus:border-maroon focus:outline-none"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-cocoa-soft">Price (Rs.)</label>
            <input
              type="number"
              min="0"
              step="1"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="550"
              className="w-full rounded-2xl border border-blush-dark/40 bg-white px-3 py-2 text-sm text-cocoa focus:border-maroon focus:outline-none"
            />
          </div>
        </div>

        <div className="flex gap-2 border-t border-blush-dark/30 bg-white/60 p-4">
          {isEditing && (
            <button
              type="button"
              onClick={() => onDelete(item.id)}
              aria-label="Delete item"
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
            Save Item
          </button>
        </div>
      </form>
    </div>
  );
}
