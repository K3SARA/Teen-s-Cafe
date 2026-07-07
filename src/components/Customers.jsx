import { useState } from "react";
import { Plus, Search, Users } from "lucide-react";
import CustomerCard from "./CustomerCard";
import CustomerFormModal from "./CustomerFormModal";

export default function Customers({ customers, onAddCustomer, onUpdateCustomer, onDeleteCustomer }) {
  const [search, setSearch] = useState("");
  const [formTarget, setFormTarget] = useState(null); // null = closed, "new" = create, customer = edit

  const filtered = customers.filter((c) => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return c.name.toLowerCase().includes(q) || c.phone.toLowerCase().includes(q);
  });

  const handleSave = (customer) => {
    if (formTarget === "new") {
      onAddCustomer(customer);
    } else {
      onUpdateCustomer(formTarget.id, customer);
    }
    setFormTarget(null);
  };

  const handleDelete = (id) => {
    onDeleteCustomer(id);
    setFormTarget(null);
  };

  return (
    <div className="flex-1 overflow-y-auto px-4 pb-24 pt-5 sm:px-6 lg:px-8 lg:pb-8">
      <h1 className="font-display text-2xl font-bold text-cocoa sm:text-3xl">Regulars 💌</h1>
      <p className="mt-1 text-sm text-cocoa-soft">
        Keep track of your favorite customers — totally optional, walk-ins are always welcome.
      </p>

      <div className="mt-4 flex gap-2">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-cocoa-soft/60" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or phone..."
            className="w-full rounded-2xl border border-blush-dark/40 bg-white py-2.5 pl-10 pr-4 text-sm text-cocoa focus:border-maroon focus:outline-none"
          />
        </div>
        <button
          onClick={() => setFormTarget("new")}
          className="flex shrink-0 items-center gap-1.5 rounded-2xl bg-maroon px-4 py-2.5 text-sm font-semibold text-cream shadow-[0_6px_16px_-4px_rgba(122,22,32,0.55)] transition hover:brightness-110"
        >
          <Plus className="h-4 w-4" strokeWidth={2.2} />
          Add
        </button>
      </div>

      {customers.length === 0 ? (
        <div className="mt-16 flex flex-col items-center gap-2 text-center text-cocoa-soft">
          <Users className="h-10 w-10 text-cocoa-soft/50" strokeWidth={1.5} />
          <p className="text-sm">No customers saved yet.</p>
          <p className="text-xs">Add your regulars to track their visits and favorites!</p>
        </div>
      ) : filtered.length === 0 ? (
        <p className="mt-10 text-center text-sm text-cocoa-soft">No customers match "{search}".</p>
      ) : (
        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((customer) => (
            <CustomerCard key={customer.id} customer={customer} onEdit={setFormTarget} />
          ))}
        </div>
      )}

      {formTarget && (
        <CustomerFormModal
          key={formTarget === "new" ? "new" : formTarget.id}
          customer={formTarget === "new" ? null : formTarget}
          onSave={handleSave}
          onDelete={handleDelete}
          onClose={() => setFormTarget(null)}
        />
      )}
    </div>
  );
}
