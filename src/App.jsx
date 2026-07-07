import { useEffect, useState } from "react";
import { api } from "./api/client";
import { TAX_RATE } from "./data/constants";
import Sidebar from "./components/Sidebar";
import BottomNav from "./components/BottomNav";
import MobileHeader from "./components/MobileHeader";
import Footer from "./components/Footer";
import POS from "./components/POS";
import Inventory from "./components/Inventory";
import Customers from "./components/Customers";
import Cart from "./components/Cart";
import CartSheet from "./components/CartSheet";
import MobileCartBar from "./components/MobileCartBar";
import ReceiptModal from "./components/ReceiptModal";
import CustomerPickerModal from "./components/CustomerPickerModal";

function App() {
  const [activeTab, setActiveTab] = useState("pos");
  const [cart, setCart] = useState([]);
  const [menuItems, setMenuItems] = useState(null);
  const [inventory, setInventory] = useState(null);
  const [customers, setCustomers] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCustomerPickerOpen, setIsCustomerPickerOpen] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [lastReceipt, setLastReceipt] = useState(null);
  const [loadError, setLoadError] = useState(null);

  useEffect(() => {
    Promise.all([api.getMenu(), api.getInventory(), api.getCustomers()])
      .then(([menu, stock, customerList]) => {
        setMenuItems(menu);
        setInventory(stock);
        setCustomers(customerList);
      })
      .catch((err) => setLoadError(err.message));
  }, []);

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

  const handleCheckout = async () => {
    const subtotal = cart.reduce((sum, line) => sum + line.price * line.qty, 0);
    const tax = subtotal * TAX_RATE;

    try {
      const order = await api.createOrder({
        items: cart,
        subtotal,
        tax,
        total: subtotal + tax,
        customerId: selectedCustomerId,
      });
      setLastReceipt({ ...order, timestamp: new Date(order.timestamp) });
      setCart([]);
      setIsCartOpen(false);
      setSelectedCustomerId(null);
      if (selectedCustomerId) {
        api.getCustomers().then(setCustomers).catch(() => {});
      }
    } catch (err) {
      alert(`Couldn't complete checkout: ${err.message}`);
    }
  };

  const adjustInventory = async (id, delta) => {
    try {
      const updated = await api.adjustInventory(id, delta);
      setInventory((prev) => prev.map((item) => (item.id === id ? updated : item)));
    } catch (err) {
      alert(`Couldn't update stock: ${err.message}`);
    }
  };

  const addProduct = async (product) => {
    try {
      const created = await api.createMenuItem(product);
      setMenuItems((prev) => [...prev, created]);
    } catch (err) {
      alert(`Couldn't add item: ${err.message}`);
    }
  };

  const updateProduct = async (id, updates) => {
    try {
      const updated = await api.updateMenuItem(id, updates);
      setMenuItems((prev) => prev.map((item) => (item.id === id ? updated : item)));
    } catch (err) {
      alert(`Couldn't update item: ${err.message}`);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await api.deleteMenuItem(id);
      setMenuItems((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      alert(`Couldn't delete item: ${err.message}`);
    }
  };

  const addCustomer = async (customer) => {
    try {
      const created = await api.createCustomer(customer);
      setCustomers((prev) => [...prev, created]);
      return created;
    } catch (err) {
      alert(`Couldn't add customer: ${err.message}`);
      return null;
    }
  };

  const updateCustomer = async (id, updates) => {
    try {
      const updated = await api.updateCustomer(id, updates);
      setCustomers((prev) => prev.map((c) => (c.id === id ? updated : c)));
    } catch (err) {
      alert(`Couldn't update customer: ${err.message}`);
    }
  };

  const deleteCustomer = async (id) => {
    try {
      await api.deleteCustomer(id);
      setCustomers((prev) => prev.filter((c) => c.id !== id));
      if (selectedCustomerId === id) setSelectedCustomerId(null);
    } catch (err) {
      alert(`Couldn't delete customer: ${err.message}`);
    }
  };

  const itemCount = cart.reduce((sum, line) => sum + line.qty, 0);
  const cartTotal = cart.reduce((sum, line) => sum + line.price * line.qty, 0) * (1 + TAX_RATE);
  const selectedCustomer = customers?.find((c) => c.id === selectedCustomerId) ?? null;

  const cartProps = {
    cartItems: cart,
    onIncrement: incrementCartItem,
    onDecrement: decrementCartItem,
    onRemove: removeCartItem,
    onCheckout: handleCheckout,
    selectedCustomer,
    onOpenCustomerPicker: () => setIsCustomerPickerOpen(true),
    onClearCustomer: () => setSelectedCustomerId(null),
  };

  if (loadError) {
    return (
      <div className="flex h-dvh items-center justify-center bg-cream p-6 text-center text-cocoa">
        <p>Couldn&apos;t reach the server: {loadError}</p>
      </div>
    );
  }

  if (!menuItems || !inventory || !customers) {
    return (
      <div className="flex h-dvh items-center justify-center bg-cream text-cocoa-soft">
        <p>Loading your cafe... 🧋</p>
      </div>
    );
  }

  return (
    <div className="flex h-dvh bg-cream text-cocoa">
      <Sidebar activeTab={activeTab} onChangeTab={setActiveTab} />

      <div className="flex min-w-0 flex-1 flex-col">
        <MobileHeader />

        <div className="relative flex flex-1 overflow-hidden">
          <main className="flex flex-1 overflow-hidden">
            {activeTab === "pos" && (
              <POS
                cartItems={cart}
                onAddItem={addToCart}
                menuItems={menuItems}
                onAddProduct={addProduct}
                onUpdateProduct={updateProduct}
                onDeleteProduct={deleteProduct}
              />
            )}
            {activeTab === "inventory" && <Inventory inventory={inventory} onAdjust={adjustInventory} />}
            {activeTab === "customers" && (
              <Customers
                customers={customers}
                onAddCustomer={addCustomer}
                onUpdateCustomer={updateCustomer}
                onDeleteCustomer={deleteCustomer}
              />
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

      {isCustomerPickerOpen && (
        <CustomerPickerModal
          customers={customers}
          onCreateCustomer={addCustomer}
          onSelect={(customer) => {
            setSelectedCustomerId(customer?.id ?? null);
            setIsCustomerPickerOpen(false);
          }}
          onClose={() => setIsCustomerPickerOpen(false)}
        />
      )}
    </div>
  );
}

export default App;
