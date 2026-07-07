import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import * as store from "./store.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
app.use(express.json());

app.get("/api/menu", (req, res) => {
  res.json(store.getMenuItems());
});

app.post("/api/menu", (req, res) => {
  const { name, category, price, emoji } = req.body;
  if (!name || !category || !(Number(price) > 0) || !emoji) {
    return res.status(400).json({ error: "Invalid product" });
  }
  res.status(201).json(store.addMenuItem({ name, category, price: Number(price), emoji }));
});

app.put("/api/menu/:id", (req, res) => {
  const updated = store.updateMenuItem(req.params.id, req.body);
  if (!updated) return res.status(404).json({ error: "Item not found" });
  res.json(updated);
});

app.delete("/api/menu/:id", (req, res) => {
  const existed = store.deleteMenuItem(req.params.id);
  if (!existed) return res.status(404).json({ error: "Item not found" });
  res.status(204).end();
});

app.get("/api/inventory", (req, res) => {
  res.json(store.getInventory());
});

app.patch("/api/inventory/:id", (req, res) => {
  const delta = Number(req.body.delta);
  if (!Number.isFinite(delta)) {
    return res.status(400).json({ error: "Invalid delta" });
  }
  const updated = store.adjustInventoryItem(req.params.id, delta);
  if (!updated) return res.status(404).json({ error: "Item not found" });
  res.json(updated);
});

app.get("/api/customers", (req, res) => {
  res.json(store.getCustomers());
});

app.post("/api/customers", (req, res) => {
  const { name, phone, email, notes } = req.body;
  if (!name || !name.trim()) {
    return res.status(400).json({ error: "Name is required" });
  }
  res.status(201).json(
    store.addCustomer({ name: name.trim(), phone: phone?.trim() ?? "", email: email?.trim() ?? "", notes: notes?.trim() ?? "" }),
  );
});

app.put("/api/customers/:id", (req, res) => {
  const updated = store.updateCustomer(req.params.id, req.body);
  if (!updated) return res.status(404).json({ error: "Customer not found" });
  res.json(updated);
});

app.delete("/api/customers/:id", (req, res) => {
  const existed = store.deleteCustomer(req.params.id);
  if (!existed) return res.status(404).json({ error: "Customer not found" });
  res.status(204).end();
});

app.get("/api/orders", (req, res) => {
  res.json(store.getOrders());
});

app.post("/api/orders", (req, res) => {
  const { items, subtotal, tax, total, customerId } = req.body;
  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: "Cart is empty" });
  }
  res.status(201).json(store.createOrder({ items, subtotal, tax, total, customerId: customerId || null }));
});

// Serve the built frontend (production)
const distPath = path.join(__dirname, "..", "dist");
app.use(express.static(distPath));
app.use((req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Teen's Cafe server running on port ${port}`);
});
