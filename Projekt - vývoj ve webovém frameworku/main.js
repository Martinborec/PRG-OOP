/**
 * main.js — Vstupní bod aplikace ShopDB
 */

import { seedIfEmpty }    from './db.js';
import { closeModal }     from './ui.js';
import { renderTable, toggleSort } from './table.js';
import { saveProduct, editProduct, deleteProduct, confirmDelete, cancelEdit } from './form.js';

// Expose to global scope (inline HTML onclick handlers)
window.saveProduct    = saveProduct;
window.editProduct    = editProduct;
window.deleteProduct  = deleteProduct;
window.confirmDelete  = confirmDelete;
window.cancelEdit     = cancelEdit;
window.closeModal     = closeModal;
window.renderTable    = renderTable;
window.toggleSort     = toggleSort;

// Close modal on overlay click or Escape
document.getElementById('modal-overlay').addEventListener('click', e => {
  if (e.target === document.getElementById('modal-overlay')) closeModal();
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});

// Init
seedIfEmpty();
renderTable();
