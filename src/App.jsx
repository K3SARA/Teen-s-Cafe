import { useState } from "react";
import { initialInventory, menuItems as initialMenuItems } from "./data/menuData";
import { TAX_RATE } from "./data/constants";
import Sidebar from "./components/Sidebar";
import BottomNav from "./components/BottomNav";
import MobileHeader from "./components/MobileHeader";
import Footer from "./components/Footer";
import POS from "./components/POS";
import Inventory from "./components/Inventory";
import Cart from "./components/Cart";
import CartSheet from "./components/CartSheet";
import MobileCartBar from "./components/MobileCartBar";
import ReceiptModal from "./components/ReceiptModal";

const FIRST_ORDER_NUMBER = 1001;

function App() {
  const [activeTab, setActiveTab] = useState("pos");
  const [cart, setCart] = useState([]);
  const [menuItems, setMenuItems] = useState(initialMenuItems);
  const [inventory, setInventory] = useState(initialInventory);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [nextOrderNumber, setNextOrderNumber] = useState(FIRST_ORDER_NUMBER);
  const [lastReceipt, setLastReceipt] = useState(null);

  const addToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find((line) => line.id === item.id);
      if (existing) {
        return prev.map((line) => (line.id === item.id ? { ...line, qty: line.qty + 1 } : line));
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const incrementCartItem = (id) => {
    setCart((prev) => prev.map((line) => (line.id === id ? { ...line, qty: line.qty + 1 } : line)));
  };

  const decrementCartItem = (id) => {
    setCart((prev) =>
      prev
        .map((line) => (line.id === id ? { ...line, qty: line.qty - 1 } : line))
        .filter((line) => line.qty > 0),
    );
  };

  const removeCartItem = (id) => {
    setCart((prev) => prev.filter((line) => line.id !== id));
  };

  const handleCheckout = () => {
    const subtotal = cart.reduce((sum, line) => sum + line.price * line.qty, 0);
    const tax = subtotal * TAX_RATE;

    setLastReceipt({
      orderNumber: nextOrderNumber,
      items: cart,
      subtotal,
      tax,
      total: subtotal + tax,
      timestamp: new Date(),
    });
    setNextOrderNumber((n) => n + 1);
    setCart([]);
    setIsCartOpen(false);
  };

  const adjustInventory = (id, delta) => {
    setInventory((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, stock: Math.max(0, Math.round((item.stock + delta) * 10) / 10) } : item,
      ),
    );
  };

  const addProduct = (product) => {
    setMenuItems((prev) => [...prev, { ...product, id: crypto.randomUUID() }]);
  };

  const updateProduct = (id, updates) => {
    setMenuItems((prev) => prev.map((item) => (item.id === id ? { ...item, ...updates } : item)));
  };

  const deleteProduct = (id) => {
    setMenuItems((prev) => prev.filter((item) => item.id !== id));
  };

  const itemCount = cart.reduce((sum, line) => sum + line.qty, 0);
  const cartTotal = cart.reduce((sum, line) => sum + line.price * line.qty, 0) * (1 + TAX_RATE);

  const cartProps = {
    cartItems: cart,
    onIncrement: incrementCartItem,
    onDecrement: decrementCartItem,
    onRemove: removeCartItem,
    onCheckout: handleCheckout,
  };

  return (
    <div className="flex h-dvh bg-cream text-cocoa">
      <Sidebar activeTab={activeTab} onChangeTab={setActiveTab} />

      <div className="flex min-w-0 flex-1 flex-col">
        <MobileHeader />

        <div className="relative flex flex-1 overflow-hidden">
          <main className="flex flex-1 overflow-hidden">
            {activeTab === "pos" ? (
              <POS
                cartItems={cart}
                onAddItem={addToCart}
                menuItems={menuItems}
                onAddProduct={addProduct}
                onUpdateProduct={updateProduct}
                onDeleteProduct={deleteProduct}
              />
            ) : (
              <Inventory inventory={inventory} onAdjust={adjustInventory} />
            )}
          </main>

          {activeTab === "pos" && (
            <aside className="hidden w-80 shrink-0 border-l border-blush-dark/30 bg-white/60 lg:flex">
              <Cart {...cartProps} className="w-full" />
            </aside>
          )}

          {activeTab === "pos" && (
            <MobileCartBar itemCount={itemCount} total={cartTotal} onOpen={() => setIsCartOpen(true)} />
          )}
        </div>

        <Footer />
        <BottomNav activeTab={activeTab} onChangeTab={setActiveTab} />
      </div>

      <CartSheet open={isCartOpen} onClose={() => setIsCartOpen(false)} {...cartProps} />
      <ReceiptModal receipt={lastReceipt} onClose={() => setLastReceipt(null)} />
    </div>
  );
}

export default App;
