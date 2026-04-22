/**
 * db.js — Databázová vrstva (localStorage)
 * CRUD operace nad produkty.
 */

const DB_KEY = 'shopdb_products';

/** @returns {Array} všechny produkty */
export function getProducts() {
  return JSON.parse(localStorage.getItem(DB_KEY) || '[]');
}

/** @param {Array} products */
export function saveProducts(products) {
  localStorage.setItem(DB_KEY, JSON.stringify(products));
}

/** CREATE — přidá nový produkt */
export function createProduct(product) {
  const products = getProducts();
  products.push(product);
  saveProducts(products);
}

/** UPDATE — aktualizuje produkt podle id */
export function updateProduct(updated) {
  saveProducts(getProducts().map(p => p.id === updated.id ? updated : p));
}

/** DELETE — smaže produkt podle id */
export function deleteProduct(id) {
  saveProducts(getProducts().filter(p => p.id !== id));
}

/** Najde produkt podle id */
export function findProduct(id) {
  return getProducts().find(p => p.id === id);
}

/** Vygeneruje unikátní ID */
export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

/** Vygeneruje SKU */
export function generateSku(name, category) {
  const prefix = (category || 'XX').slice(0, 2).toUpperCase();
  const nameCode = (name || 'XX').replace(/\s+/g, '').slice(0, 3).toUpperCase();
  const num = Math.floor(Math.random() * 9000) + 1000;
  return `${prefix}-${nameCode}-${num}`;
}

/** Seed ukázková data */
export function seedIfEmpty() {
  if (getProducts().length > 0) return;

  const now = Date.now();
  const products = [
    { id: generateId(), name: 'Mechanická klávesnice MX-7', category: 'Elektronika', price: 2490, stock: 14, sku: 'EL-MEC-4821', desc: 'Cherry MX Blue switche, RGB podsvícení, hliníkový rám.', created: now - 6000 },
    { id: generateId(), name: 'Herní myš Viper V2', category: 'Elektronika', price: 1290, stock: 22, sku: 'EL-VIP-3307', desc: 'Optický senzor 25 600 DPI, 6 programovatelných tlačítek.', created: now - 5000 },
    { id: generateId(), name: 'Kancelářská židle ErgoX', category: 'Nábytek', price: 8990, stock: 3, sku: 'NA-ERG-9102', desc: 'Nastavitelná bederní opěrka, síťovaná záda, nosnost 130 kg.', created: now - 4000 },
    { id: generateId(), name: 'Monitor 27" 4K IPS', category: 'Elektronika', price: 11490, stock: 7, sku: 'EL-MON-0055', desc: '3840×2160, 144 Hz, HDR400, USB-C 90W PD.', created: now - 3000 },
    { id: generateId(), name: 'USB-C Hub 10-v-1', category: 'Příslušenství', price: 890, stock: 0, sku: 'PR-USB-6644', desc: 'HDMI 4K, 3× USB-A, SD, microSD, Ethernet, PD 100W.', created: now - 2000 },
    { id: generateId(), name: 'Webkamera StreamHD Pro', category: 'Elektronika', price: 3290, stock: 1, sku: 'EL-WEB-2281', desc: '1080p 60fps, autofokus, vestavěný mikrofon s potlačením šumu.', created: now - 1000 },
  ];

  saveProducts(products);
}
