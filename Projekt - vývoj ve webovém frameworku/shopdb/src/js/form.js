/**
 * form.js — CRUD logika
 * CREATE, UPDATE, DELETE produktů.
 */

import {
  getProducts, createProduct, updateProduct,
  deleteProduct as dbDelete, findProduct,
  generateId, generateSku,
} from './db.js';
import { showToast, openDeleteModal, closeModal } from './ui.js';
import { renderTable } from './table.js';

let pendingDeleteId = null;

// ── Helpers ────────────────────────────────────────────────────────────────

function readForm(existingId) {
  const name     = document.getElementById('f-name').value.trim();
  const category = document.getElementById('f-category').value;
  const existing = existingId ? findProduct(existingId) : null;

  return {
    id:       existingId || generateId(),
    name,
    category,
    price:    parseFloat(document.getElementById('f-price').value)  || 0,
    stock:    parseInt(document.getElementById('f-stock').value, 10) || 0,
    sku:      document.getElementById('f-sku').value.trim() || generateSku(name, category),
    desc:     document.getElementById('f-desc').value.trim(),
    created:  existing ? existing.created : Date.now(),
  };
}

function validate(p) {
  if (!p.name)  return 'Vyplňte název produktu';
  if (p.price < 0) return 'Cena nemůže být záporná';
  if (p.stock < 0) return 'Sklad nemůže být záporný';
  return null;
}

// ── Public CRUD ────────────────────────────────────────────────────────────

/** CREATE nebo UPDATE */
export function saveProduct() {
  const editId = document.getElementById('edit-id').value;
  const product = readForm(editId || null);
  const err = validate(product);
  if (err) { showToast(`⚠ ${err}`, 'error'); return; }

  if (editId) {
    updateProduct(product);
    showToast(`✓ Produkt "${product.name}" aktualizován`);
  } else {
    createProduct(product);
    showToast(`✓ Produkt "${product.name}" přidán`);
  }

  resetForm();
  renderTable();
}

/** Zahájí editaci — naplní formulář */
export function editProduct(id) {
  const p = findProduct(id);
  if (!p) return;

  document.getElementById('edit-id').value    = p.id;
  document.getElementById('f-name').value     = p.name;
  document.getElementById('f-category').value = p.category || '';
  document.getElementById('f-price').value    = p.price;
  document.getElementById('f-stock').value    = p.stock;
  document.getElementById('f-sku').value      = p.sku || '';
  document.getElementById('f-desc').value     = p.desc || '';

  // Přepne UI do edit módu
  document.getElementById('form-mode-label').textContent = 'EDIT ZÁZNAMU';
  document.getElementById('btn-save-label').textContent  = 'Uložit změny';
  document.getElementById('btn-cancel').style.display    = '';
  document.querySelector('.sidebar').classList.add('editing');

  // Zvýraznění editovaného řádku
  document.querySelectorAll('tbody tr').forEach(tr =>
    tr.classList.toggle('editing-row', tr.dataset.id === id)
  );

  document.getElementById('f-name').focus();
  document.querySelector('.sidebar').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/** Spustí mazání — otevře modal */
export function deleteProduct(id) {
  const p = findProduct(id);
  if (!p) return;
  pendingDeleteId = id;
  openDeleteModal(p);
}

/** Potvrzení mazání z modalu */
export function confirmDelete() {
  if (!pendingDeleteId) return;
  const p = findProduct(pendingDeleteId);
  dbDelete(pendingDeleteId);
  pendingDeleteId = null;
  closeModal();
  renderTable();
  showToast(`Produkt "${p?.name}" byl smazán`);
}

/** Zruší editaci */
export function cancelEdit() { resetForm(); }

/** Reset formuláře do CREATE stavu */
export function resetForm() {
  ['edit-id','f-name','f-price','f-stock','f-sku','f-desc'].forEach(id => {
    document.getElementById(id).value = '';
  });
  document.getElementById('f-category').value = '';
  document.getElementById('form-mode-label').textContent = 'NOVÝ PRODUKT';
  document.getElementById('btn-save-label').textContent  = 'Přidat produkt';
  document.getElementById('btn-cancel').style.display    = 'none';
  document.querySelector('.sidebar').classList.remove('editing');
  document.querySelectorAll('tbody tr').forEach(tr => tr.classList.remove('editing-row'));
}
