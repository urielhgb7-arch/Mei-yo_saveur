# Mei'yo — Client Web Application

Application web e-commerce et vitrine officielle de la maison gourmande **Mei'yo** (« *Le goût du vrai* »).

---

## 📖 Documentation & Spécifications

Le cahier des charges complet et détaillé (fonctionnel, technique, design system, dashboard administrateur et paiements FedaPay/KKiaPay) est disponible dans le document dédié :
👉 **[CAHIER_DES_CHARGES.md](./CAHIER_DES_CHARGES.md)**

---

## 🛠️ Stack Technique

* **Frontend** : [React 19](https://react.dev/) + [Vite](https://vite.dev/)
* **Styles & Design** : [Tailwind CSS v4](https://tailwindcss.com/) (Glassmorphisme, nuances Vert Émeraude `#254631` & Doré/Sable `#F0D28E` / `#FFFBF3`)
* **Icônes** : [Lucide React](https://lucide.dev/) (aucun émoji dans l'interface utilisateur)
* **Animations** : [GSAP](https://gsap.com/) (ScrollTrigger) & [Framer Motion](https://www.framer.com/motion/)
* **Routage** : [React Router DOM v7](https://reactrouter.com/)
* **Serveur / Proxy API** : Node.js avec Express (`server/api.js`)

---

## 🚀 Démarrage Rapide

### Prérequis
* Node.js (v18+)
* npm

### Installation des dépendances
```bash
npm install
```

### Lancement du serveur de développement (Frontend)
```bash
npm run dev
```
Par défaut, l'application est accessible sur `http://localhost:5173` (ou sur un port personnalisé : `npm run dev -- --port 4005`).

### Lancement du serveur backend proxy
```bash
npm run server
```

### Build de production & Lint
```bash
npm run build
npm run lint
```

---

## 📂 Structure du Projet

```text
├── public/                 # Assets statiques, logos SVG et visuels produits
├── server/
│   └── api.js              # Proxy Express pour les APIs tierces et paiements
├── src/
│   ├── assets/             # Images et icônes d'interface
│   ├── components/         # Composants réutilisables (Navbar, Footer, Cart, Cards, etc.)
│   ├── context/            # Contextes React (CartContext...)
│   ├── data/               # Catalogue des produits et catégories (products.js)
│   ├── layouts/            # Layout principal (MainLayout.jsx)
│   ├── lib/                # Utilitaires globaux (utils.js...)
│   ├── pages/              # Pages de l'application (HomePage, MenuPage, StoryPage, CheckoutPage...)
│   ├── services/           # Services d'appels API (paiements, WhatsApp...)
│   ├── App.jsx             # Configuration des routes
│   └── main.jsx            # Point d'entrée React
├── CAHIER_DES_CHARGES.md   # Spécifications détaillées du projet
├── package.json
└── vite.config.js
```
