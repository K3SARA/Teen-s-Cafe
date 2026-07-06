import { useState } from "react";
import { Plus } from "lucide-react";
import { categories } from "../data/menuData";
import MenuItemCard from "./MenuItemCard";
import ProductFormModal from "./ProductFormModal";

export default function POS({ cartItems, onAddItem, menuItems, onAddProduct, onUpdateProduct, onDeleteProduct }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [formTarget, setFormTarget] = useState(null); // null = closed, "new" = create, item = edit

  const filteredItems =
    activeCategory === "All" ? menuItems : menuItems.filter((item) => item.category === activeCategory);

  const qtyFor = (id) => cartItems.find((item) => item.id === id)?.qty ?? 0;

  const handleSave = (product) => {
    if (formTarget === "new") {
      onAddProduct(product);
    } else {
      onUpdateProduct(formTarget.id, product);
    }
    setFormTarget(null);
  };

  const handleDelete = (id) => {
    onDeleteProduct(id);
    setFormTarget(null);
  };

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="px-4 pt-5 sm:px-6 lg:px-8">
        <h1 className="font-display text-2xl font-bold text-cocoa sm:text-3xl">Hi there! ☀️ What are we making?</h1>
        <p className="mt-1 text-sm text-cocoa-soft">Tap an item to add it to the order.</p>

        <div className="mt-4 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none]">
          {["All", ...categories].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition ${
                activeCategory === cat
                  ? "bg-cocoa text-cream shadow-sm"
                  : "bg-white/70 text-cocoa-soft hover:bg-blush/60"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-28 pt-3 sm:px-6 lg:px-8 lg:pb-8">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 xl:grid-cols-4">
          {filteredItems.map((item) => (
            <MenuItemCard
              key={item.id}
              item={item}
              qtyInCart={qtyFor(item.id)}
              onAdd={onAddItem}
              onEdit={setFormTarget}
            />
          ))}

          <button
            onClick={() => setFormTarget("new")}
            className="flex flex-col items-center justify-center gap-2 rounded-3xl border-2 border-dashed border-blush-dark/50 p-4 text-center text-cocoa-soft transition hover:border-maroon/50 hover:text-maroon"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blush/30">
              <Plus className="h-6 w-6" strokeWidth={2.2} />
            </div>
            <p className="text-sm font-medium leading-tight">Add Item</p>
          </button>
        </div>
      </div>

      {formTarget && (
        <ProductFormModal
          key={formTarget === "new" ? "new" : formTarget.id}
          item={formTarget === "new" ? null : formTarget}
          categories={categories}
          onSave={handleSave}
          onDelete={handleDelete}
          onClose={() => setFormTarget(null)}
        />
      )}
    </div>
  );
}
