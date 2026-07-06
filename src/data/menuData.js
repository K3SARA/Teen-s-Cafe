// Placeholder menu data for the POS grid, grouped by category.
export const categories = ["Coffee", "Boba", "Pastries", "Drinks"];

export const menuItems = [
  // Coffee
  { id: "c1", name: "Vanilla Latte", price: 550, emoji: "☕", category: "Coffee" },
  { id: "c2", name: "Caramel Macchiato", price: 600, emoji: "☕", category: "Coffee" },
  { id: "c3", name: "Iced Americano", price: 450, emoji: "🧊", category: "Coffee" },
  { id: "c4", name: "Mocha Swirl", price: 650, emoji: "🍫", category: "Coffee" },
  { id: "c5", name: "Cinnamon Cappuccino", price: 580, emoji: "☕", category: "Coffee" },
  { id: "c6", name: "Espresso Shot", price: 300, emoji: "⚡", category: "Coffee" },

  // Boba
  { id: "b1", name: "Classic Milk Tea", price: 650, emoji: "🧋", category: "Boba" },
  { id: "b2", name: "Taro Boba", price: 700, emoji: "🧋", category: "Boba" },
  { id: "b3", name: "Brown Sugar Boba", price: 750, emoji: "🧋", category: "Boba" },
  { id: "b4", name: "Strawberry Milk Tea", price: 700, emoji: "🍓", category: "Boba" },
  { id: "b5", name: "Matcha Latte", price: 700, emoji: "🍵", category: "Boba" },
  { id: "b6", name: "Mango Green Tea", price: 680, emoji: "🥭", category: "Boba" },

  // Pastries
  { id: "p1", name: "Butter Croissant", price: 400, emoji: "🥐", category: "Pastries" },
  { id: "p2", name: "Blueberry Muffin", price: 420, emoji: "🧁", category: "Pastries" },
  { id: "p3", name: "Choco Chip Cookie", price: 300, emoji: "🍪", category: "Pastries" },
  { id: "p4", name: "Strawberry Cake Slice", price: 580, emoji: "🍰", category: "Pastries" },
  { id: "p5", name: "Cinnamon Roll", price: 470, emoji: "🌀", category: "Pastries" },
  { id: "p6", name: "Donut", price: 320, emoji: "🍩", category: "Pastries" },

  // Drinks
  { id: "d1", name: "Fresh Lemonade", price: 400, emoji: "🍋", category: "Drinks" },
  { id: "d2", name: "Sparkling Peach Soda", price: 450, emoji: "🍑", category: "Drinks" },
  { id: "d3", name: "Iced Chocolate", price: 500, emoji: "🍫", category: "Drinks" },
  { id: "d4", name: "Berry Smoothie", price: 580, emoji: "🫐", category: "Drinks" },
];

// Placeholder inventory data with pastel low-stock thresholds.
export const initialInventory = [
  { id: "i1", name: "Coffee Beans", emoji: "☕", unit: "kg", stock: 8, lowStockThreshold: 3 },
  { id: "i2", name: "Whole Milk", emoji: "🥛", unit: "L", stock: 5, lowStockThreshold: 4 },
  { id: "i3", name: "Boba Pearls", emoji: "⚫", unit: "kg", stock: 2, lowStockThreshold: 3 },
  { id: "i4", name: "Matcha Powder", emoji: "🍵", unit: "kg", stock: 1.5, lowStockThreshold: 1 },
  { id: "i5", name: "Brown Sugar Syrup", emoji: "🍯", unit: "bottles", stock: 6, lowStockThreshold: 2 },
  { id: "i6", name: "Croissant Dough", emoji: "🥐", unit: "pcs", stock: 12, lowStockThreshold: 6 },
  { id: "i7", name: "Blueberries", emoji: "🫐", unit: "kg", stock: 0.8, lowStockThreshold: 1 },
  { id: "i8", name: "Chocolate Chips", emoji: "🍫", unit: "kg", stock: 3, lowStockThreshold: 1.5 },
  { id: "i9", name: "Strawberries", emoji: "🍓", unit: "kg", stock: 1, lowStockThreshold: 2 },
  { id: "i10", name: "Cups (Cold)", emoji: "🥤", unit: "pcs", stock: 40, lowStockThreshold: 25 },
  { id: "i11", name: "Cups (Hot)", emoji: "☕", unit: "pcs", stock: 15, lowStockThreshold: 20 },
  { id: "i12", name: "Lemons", emoji: "🍋", unit: "pcs", stock: 18, lowStockThreshold: 10 },
];
