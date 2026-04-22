/**
 * table.js — Tabulka produktů
 * Filtrování, řazení a renderování řádků.
 */

import { getProducts } from './db.js';
import { esc, updateStats, stockBadge } from './ui.js';

// Aktuální stav řazení
let sortCol = 'created';
let sortDir = 'desc';

/**
 * Přepne řazení po kliknutí na hlavičku sloupce.
 * @param {string} col
 */
export function toggleSort(col) {
  if (sortCol === col) {
    sortDir = sortDir === 'asc' ? 'desc' : 'asc';
  } else {
    sortCol = col;
    sortDir = col === 'created' ? 'desc' : 'asc';
  }
  renderTable();
}

/** Seřadí pole produktů */
function sortProducts(arr) {
  return [...arr].sort((a, b) => {
    let va = a[sortCol] ?? '';
    let vb = b[sortCol] ?? '';
    if (typeof va === 'string') va = va.toLowerCase();
    if (typeof vb === 'string') vb = vb.toLowerCase();
    if (va < vb) return sortDir === 'asc' ? -1 :  1;
    if (va > vb) return sortDir === 'asc' ?  1 : -1;
    return 0;
  });
}

/** Sestaví HTML jeden řádek tabulky */
function renderRow(product, index) {
  return `
    <tr data-id="${product.id}">
      <td class="col-id"><span class="row-num">${index + 1}</span></td>
      <td class="col-name">${esc(product.name)}</td>
      <td class="col-cat"><span class="cat-pill">${esc(product.category || '—')}</span></td>
      <td class="col-price">${Number(product.price).toLocaleString('cs-CZ')} Kč</td>
      <td class="col-stock">${stockBadge(product.stock)}</td>
      <td class="col-sku">${esc(product.sku || '—')}</td>
      <td class="col-desc" title="${esc(product.desc)}">${esc(product.desc || '—')}</td>
      <td class="col-actions">
        <button class="btn btn-edit"   onclick="window.editProduct('${product.id}')">Upravit</button>
        <button class="btn btn-delete" onclick="window.deleteProduct('${product.id}')">Smazat</button>
      </td>
    </tr>`;
}

/** Aktualizuje šipky řazení v hlavičkách */
function updateSortHeaders() {
  document.querySelectorAll('th[data-col]').forEach(th => {
    const col = th.dataset.col;
    th.classList.toggle('sorted', col === sortCol);
    const arrow = th.querySelector('.sort-arrow');
    if (arrow) arrow.textContent = col === sortCol
      ? (sortDir === 'asc' ? '↑' : '↓')
      : '↕';
  });
}

/**
 * Hlavní render funkce — filtruje, řadí, vykresluje.
 * Volá se po každé CRUD operaci i změně filtrů.
 */
export function renderTable() {
  const query    = (document.getElementById('search')?.value || '').toLowerCase();
  const catFilter = document.getElementById('filter-cat')?.value || '';
  const allProducts = getProducts();

  const filtered = allProducts.filter(p => {
    const matchQ = !query ||
      p.name.toLowerCase().includes(query) ||
      (p.sku  || '').toLowerCase().includes(query) ||
      (p.desc || '').toLowerCase().includes(query);
    const matchC = !catFilter || p.category === catFilter;
    return matchQ && matchC;
  });

  const sorted = sortProducts(filtered);

  const tbody = document.getElementById('tbody');
  if (sorted.length === 0) {
    tbody.innerHTML = `<tr class="empty-row"><td colspan="8">— Žádné produkty nenalezeny —</td></tr>`;
  } else {
    tbody.innerHTML = sorted.map((p, i) => renderRow(p, i)).join('');
  }

  // Record count chip
  const rc = document.getElementById('record-count');
  if (rc) rc.innerHTML = `Zobrazeno: <span>${sorted.length}</span> / ${allProducts.length}`;

  updateSortHeaders();
  updateStats(allProducts);
}
