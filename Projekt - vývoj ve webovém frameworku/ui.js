/**
 * ui.js — UI pomocné funkce
 * Toast, modal, escape, statistiky.
 */

let toastTimer = null;

/**
 * Toast notifikace
 * @param {string} msg
 * @param {'ok'|'error'} type
 */
export function showToast(msg, type = 'ok') {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.className = type === 'error' ? 'error show' : 'show';
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 2600);
}

/** Otevře confirm-delete modal */
export function openDeleteModal(product) {
  document.getElementById('modal-product-name').textContent = product.name;
  document.getElementById('modal-product-sku').textContent  = product.sku || '—';
  document.getElementById('modal-overlay').classList.add('open');
}

/** Zavře modal */
export function closeModal() {
  document.getElementById('modal-overlay').classList.remove('open');
}

/** Escape HTML (XSS ochrana) */
export function esc(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/** Aktualizuje statistiky v headeru */
export function updateStats(products) {
  const totalVal = products.reduce((s, p) => s + p.price * p.stock, 0);
  const totalStock = products.reduce((s, p) => s + p.stock, 0);

  document.getElementById('stat-count').textContent = products.length;
  document.getElementById('stat-stock').textContent = totalStock.toLocaleString('cs-CZ');
  document.getElementById('stat-value').textContent =
    totalVal.toLocaleString('cs-CZ', { style: 'currency', currency: 'CZK', maximumFractionDigits: 0 });
}

/** Vrátí HTML stock badge */
export function stockBadge(stock) {
  if (stock === 0) return `<span class="stock-badge stock-out"><span class="stock-dot"></span>Vyprodáno</span>`;
  if (stock  <= 3) return `<span class="stock-badge stock-low"><span class="stock-dot"></span>${stock} ks</span>`;
  return `<span class="stock-badge stock-ok"><span class="stock-dot"></span>${stock} ks</span>`;
}
