const BASE = "/api";

async function request(path, options) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Request failed (${res.status})`);
  }
  if (res.status === 204) return null;
  return res.json();
}

export const api = {
  getMenu: () => request("/menu"),
  createMenuItem: (product) => request("/menu", { method: "POST", body: JSON.stringify(product) }),
  updateMenuItem: (id, updates) => request(`/menu/${id}`, { method: "PUT", body: JSON.stringify(updates) }),
  deleteMenuItem: (id) => request(`/menu/${id}`, { method: "DELETE" }),

  getInventory: () => request("/inventory"),
  adjustInventory: (id, delta) =>
    request(`/inventory/${id}`, { method: "PATCH", body: JSON.stringify({ delta }) }),

  getCustomers: () => request("/customers"),
  createCustomer: (customer) => request("/customers", { method: "POST", body: JSON.stringify(customer) }),
  updateCustomer: (id, updates) => request(`/customers/${id}`, { method: "PUT", body: JSON.stringify(updates) }),
  deleteCustomer: (id) => request(`/customers/${id}`, { method: "DELETE" }),

  createOrder: (order) => request("/orders", { method: "POST", body: JSON.stringify(order) }),
};
