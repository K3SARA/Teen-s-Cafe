import InventoryItem from "./InventoryItem";

export default function Inventory({ inventory, onAdjust }) {
  const lowStockCount = inventory.filter((item) => item.stock <= item.lowStockThreshold).length;

  return (
    <div className="flex-1 overflow-y-auto px-4 pb-24 pt-5 sm:px-6 lg:px-8 lg:pb-8">
      <h1 className="font-display text-2xl font-bold text-cocoa sm:text-3xl">Pantry &amp; Stock 🍓</h1>
      <p className="mt-1 text-sm text-cocoa-soft">
        {lowStockCount > 0
          ? `${lowStockCount} ${lowStockCount === 1 ? "ingredient is" : "ingredients are"} running low — time to restock!`
          : "Everything is stocked up nicely. ✨"}
      </p>

      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {inventory.map((item) => (
          <InventoryItem key={item.id} item={item} onAdjust={onAdjust} />
        ))}
      </div>
    </div>
  );
}
