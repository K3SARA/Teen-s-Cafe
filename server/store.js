import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { menuItems as seedMenuItems, initialInventory as seedInventory } from "../src/data/menuData.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = process.env.DATA_DIR || path.join(__dirname, "..", "data");
const DB_FILE = path.join(DATA_DIR, "db.json");
const FIRST_ORDER_NUMBER = 1001;

function seedDb() {
  return {
    menuItems: seedMenuItems,
    inventory: seedInventory,
    orders: [],
    nextOrderNumber: FIRST_ORDER_NUMBER,
  };
}

function load() {
  if (!fs.existsSync(DB_FILE)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
    const initial = seedDb();
    fs.writeFileSync(DB_FILE, JSON.stringify(initial, null, 2));
    return initial;
  }
  return JSON.parse(fs.readFileSync(DB_FILE, "utf-8"));
}

const db = load();

function persist() {
  fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2));
}

export function getMenuItems() {
  return db.menuItems;
}

export function addMenuItem(product) {
  const item = { id: crypto.randomUUID(), ...product };
  db.menuItems.push(item);
  persist();
  return item;
}

export function updateMenuItem(id, updates) {
  const item = db.menuItems.find((i) => i.id === id);
  if (!item) return null;
  Object.assign(item, updates);
  persist();
  return item;
}

export function deleteMenuItem(id) {
  const existed = db.menuItems.some((i) => i.id === id);
  db.menuItems = db.menuItems.filter((i) => i.id !== id);
  if (existed) persist();
  return existed;
}

export function getInventory() {
  return db.inventory;
}

export function adjustInventoryItem(id, delta) {
  const item = db.inventory.find((i) => i.id === id);
  if (!item) return null;
  item.stock = Math.max(0, Math.round((item.stock + delta) * 10) / 10);
  persist();
  return item;
}

export function getOrders() {
  return db.orders;
}

export function createOrder({ items, subtotal, tax, total }) {
  const order = {
    orderNumber: db.nextOrderNumber,
    items,
    subtotal,
    tax,
    total,
    timestamp: new Date().toISOString(),
  };
  db.orders.push(order);
  db.nextOrderNumber += 1;
  persist();
  return order;
}
