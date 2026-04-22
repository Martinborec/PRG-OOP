# 🛒 ShopDB — CRUD Správa produktů

Webová aplikace pro správu produktů v obchodě.  
Školní zadání: **CRUD na libovolném objektu** (objekt = Produkt).

---

## 🛠 Stack

| Vrstva | Technologie |
|---|---|
| Frontend | Vanilla HTML5 + CSS3 + JavaScript (ES Modules) |
| Databáze | `localStorage` (JSON, bez backendu) |
| Fonty | IBM Plex Mono + Syne (Google Fonts) |
| Styl | Dark mode, terminálová / technická estetika |

---

## 📁 Struktura projektu

```
shopdb/
├── index.html              # Hlavní HTML stránka
├── README.md
├── .gitignore
└── src/
    ├── css/
    │   └── style.css       # Dark theme, CSS variables, tabulka
    └── js/
        ├── main.js         # Vstupní bod, init, event listenery
        ├── db.js           # localStorage CRUD abstrakce
        ├── form.js         # CREATE / UPDATE / DELETE logika
        ├── table.js        # Render tabulky, filtrování, řazení
        └── ui.js           # Toast, modal, helpers, statistiky
```

---

## ✅ CRUD operace

### CREATE
- Formulář v levém panelu
- Povinné pole: Název
- SKU se generuje automaticky (nebo lze zadat ručně)
- Toast potvrzení po přidání

### READ
- Tabulkový přehled všech produktů
- Klikatelné hlavičky = řazení ASC/DESC podle libovolného sloupce
- Live search (název, SKU, popis)
- Filtr podle kategorie
- Statistiky v headeru (počet, sklad, hodnota)

### UPDATE
- Tlačítko „Upravit" naplní formulář a přepne do edit módu
- Editovaný řádek je vizuálně zvýrazněn
- Sidebar získá glow animaci

### DELETE
- Tlačítko „Smazat" otevře potvrzovací modal
- Modal zobrazí název a SKU mazaného produktu
- Po potvrzení trvale odstraní záznam

---

## 📦 Datový model — Produkt

```js
{
  id:       String,   // unikátní ID
  name:     String,   // název (povinné)
  category: String,   // kategorie
  price:    Number,   // cena v Kč
  stock:    Number,   // počet kusů na skladě
  sku:      String,   // SKU kód
  desc:     String,   // popis
  created:  Number,   // timestamp (ms)
}
```

---

## 🎨 Design

- **Téma:** Dark mode, industriální terminál
- **Barvy:** `#090b0f` (pozadí), `#00ffc8` (cyan akcent), `#ffb300` (amber/cena)
- **Typografie:** IBM Plex Mono (monospace data) + Syne (headery)
- **Sklad:** barevné indikátory — zelená (ok) / oranžová (málo ≤3) / červená (vyprodáno)
- **Efekty:** scanline texture, glow na focusu, row highlight při editaci

---

## 🚀 Spuštění

```bash
# Přímé otevření (Chrome/Edge):
open index.html

# Doporučeno — lokální server (kvůli ES Modules):
npx serve .
# nebo:
python3 -m http.server 8080
```

> ES Modules (`import/export`) nefungují přes `file://` protokol.  
> Použij lokální HTTP server.

---

## 🌐 Nasazení na GitHub Pages

```bash
git init
git add .
git commit -m "feat: ShopDB CRUD app"
git remote add origin https://github.com/TVOJE_JMENO/shopdb.git
git push -u origin main
```

Pak: **Settings → Pages → Branch: main → Save**

---

*Autor: [Vaše jméno] | Školní projekt 2024*
