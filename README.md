# 🌿 Eco Cosmetics

A responsive landing page for an eco-friendly cosmetics and candles brand, featuring a full product catalog with a multi-step checkout flow — built with **HTML5**, **SCSS**, and **vanilla JavaScript**.

🔗 **[View live demo](https://yuliia-nudyk.github.io/eco-cosmetics/)**

<img src="src/images/screen-mobile.png" alt="Eco Cosmetics home page mobile" width="350">

<img src="src/images/screen-desktop.png" alt="Eco Cosmetics home page desktop" width="700">

<img src="src/images/gif.gif" alt="Eco Cosmetics shop checkout flow" width="350">

## 📝 Description

Eco Cosmetics is a landing page for a brand selling natural, eco-conscious cosmetics and hand-poured candles. The page presents the brand's sustainability-driven story, a filterable product catalog across four categories, and a full checkout flow — from product details to shipping, payment, and order confirmation — all without a page reload. It also includes a contact form and an "About the creators" section, and is fully responsive across mobile, tablet, desktop, and large-screen breakpoints.

### Features

- Product catalog with category filtering (face, body, hair, candles)
- Product details panel with weight, ingredients, and application instructions
- Full checkout flow: product details → shipping → payment → confirmation
- Selected product is preserved in the URL, so a shared link opens directly to the right product
- Custom payment method validation with an accessible error message
- Contact form with client-side validation and reset on submit
- Mobile navigation menu that closes automatically on desktop
- Fully responsive layout across mobile, tablet, desktop, and large-screen breakpoints
- Accessible markup with descriptive `alt` text, `aria-label`s for icon-only links, and secure external links

## 🛠 Technologies

- HTML5 (semantic markup, BEM naming)
- SCSS (Sass) — partials architecture with variables, mixins, and placeholders
- JavaScript (Vanilla JS, ES6+)
- Vite — fast build tool and dev server

## 💡 Technical highlights

- **Hash-based navigation for the entire checkout flow** — each step (`#goods-card`, `#shipping`, `#payment`, `#confirmation`) is a `position: fixed` panel toggled via the `:target` pseudo-class, animated with staggered `transform`/`opacity` transitions so the previous step stays visible while the next one slides in.
- **Hybrid data architecture** — each product card in the DOM holds only what's visibly shown (image, title, price), while extended details (weight, ingredients, application) live in a single JS object keyed by product id, avoiding hidden duplicate markup while keeping HTML as the source of truth for visible content.
- **Selected product synced to the URL** via `history.replaceState`, so a product can be shared or restored on reload without triggering a page navigation.
- **A generative SCSS grid system** using nested `@for` loops to produce responsive column-span utility classes (`.grid__item--tablet-1-3`, `.grid__item--desktop-2-6`, etc.) across tablet and desktop breakpoints.
- **Custom form validation** for the payment method selection, replacing native browser validation (`novalidate`) with a JS-driven, accessible error message (`role="alert"`, `aria-live="polite"`).

## 🚀 Running locally

1. Clone the repository:

```bash
   git clone https://github.com/yuliia-nudyk/eco-cosmetics.git
```

2. Navigate to the project folder:

```bash
   cd eco-cosmetics
```

3. Install dependencies:

```bash
   npm install
```

4. Run the project locally:

```bash
   npm start
```

This will launch the project via Vite, which automatically compiles SCSS to CSS and serves the app with hot reload.

## 📂 Project structure

```
├── src/
│   ├── fonts/
│   ├── images/
│   ├── scripts/
│   │   └── main.js
│   └── styles/
│       ├── utils/
│       │   ├── _reset.scss
│       │   ├── _variables.scss
│       │   ├── _mixins.scss
│       │   └── _extends.scss
│       ├── _utils.scss
│       ├── _typography.scss
│       ├── blocks/
│       │   └── ...
│       ├── _blocks.scss
│       ├── sections/
│       │   └── ...
│       ├── _sections.scss
│       └── main.scss
├── index.html
└── README.md
```
