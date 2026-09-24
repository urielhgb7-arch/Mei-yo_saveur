// Catalogue officiel Mei'yo — Produits artisanaux & gourmands
// Aucune émoticône : les icônes sont rendues via Lucide React dans les composants UI

export const categories = [
  { id: "yaourts", name: "Les Yaourts", iconName: "Sparkles", description: "Notre produit phare : onctueux, aux sirops de canne à sucre naturelle" },
  { id: "pastels", name: "Les Pastels", iconName: "Flame", description: "Pâte signature à la banane, dorée et croustillante" },
  { id: "crepes", name: "Les Crêpes", iconName: "Layers", description: "Fines, moelleuses, sucrées ou salées" },
  { id: "flan", name: "Les Flans", iconName: "CircleDot", description: "Caramel ambré, vanille et lait de coco" },
  { id: "boissons", name: "Boissons & Encas", iconName: "Coffee", description: "Baobab au lait traditionnel et encas salés" },
];

export const products = [
  // ── 1. YAOURTS (PRODUIT PHARE) ──────────────────────────────────
  {
    id: "yaourt-bissap-pasteque",
    name: "Rubis Tropical (Bissap & Pastèque)",
    subtitle: "Spécialité Signature Incontournable",
    category: "yaourts",
    price: 1200,
    isSignature: true,
    isPopular: true,
    description:
      "Notre création emblématique : yaourt artisanal entier et ultra-onctueux, rehaussé d'une réduction de fleurs d'hibiscus rouge et de pastèque fraîche. Sucré exclusivement au pur jus de canne à sucre.",
    ingredients: ["Lait entier local", "Ferments vivants", "Fleurs d'hibiscus (Bissap)", "Jus de pastèque fraîche", "Sirop de canne à sucre"],
    image: "/images/yaourt_bissap_pasteque.jpg",
    tags: ["Signature", "Bissap-Pastèque", "Canne à sucre", "Fait maison"],
  },
  {
    id: "yaourt-menthe-pomme",
    name: "Brise d'Éden (Menthe & Pomme)",
    subtitle: "Recette fraîcheur aux sirops naturels",
    category: "yaourts",
    price: 1200,
    isSignature: false,
    isPopular: true,
    description:
      "La fraîcheur végétale de la menthe fraîche mariée au croquant acidulé de la pomme verte. Un équilibre parfait sans aucun sucre raffiné, adouci à la canne à sucre.",
    ingredients: ["Lait entier", "Infusion de menthe fraîche", "Sirop de pomme verte", "Pur jus de canne à sucre"],
    image: "/images/yaourt_menthe_pomme.jpg",
    tags: ["Menthe-Pomme", "Canne à sucre", "Fraîcheur"],
  },
  {
    id: "yaourt-gingembre-ananas",
    name: "Soleil Épicé (Gingembre & Ananas)",
    subtitle: "Recette stimulante & fruitée",
    category: "yaourts",
    price: 1200,
    isSignature: false,
    isPopular: false,
    description:
      "L'ananas mûri sous le soleil du Bénin associé à la vivacité délicate du gingembre frais. Une texture soyeuse et une finale tonique au sirop de canne.",
    ingredients: ["Lait entier", "Purée d'ananas du Bénin", "Gingembre frais infusé", "Sirop de canne à sucre"],
    image: "/images/yaourt_gingembre_ananas.jpg",
    tags: ["Gingembre-Ananas", "Canne à sucre", "Énergisant"],
  },
  {
    id: "yaourt-grec-nature",
    name: "Yaourt Velouté Nature (Personnalisable)",
    subtitle: "La pureté du lait frais",
    category: "yaourts",
    price: 1000,
    isSignature: false,
    isPopular: false,
    description:
      "Style grec épais et soyeux, non sucré. Vous pouvez l'agrémenter de flocons d'avoine croustillants, de graines locales ou d'un filet de miel pur des savanes.",
    ingredients: ["Lait entier sélectionné", "Ferments lactiques traditionnels", "Option miel / avoine"],
    image: "/images/hero_banner.jpg",
    tags: ["Grec Nature", "Personnalisable", "Sain"],
  },

  // ── 2. PASTELS (PÂTE SIGNATURE À BASE DE BANANE) ───────────────
  {
    id: "pastel-viande-fromage",
    name: "Pastels Bœuf Fondant & Fromage",
    subtitle: "Pâte exclusive à base de banane",
    category: "pastels",
    price: 800,
    isSignature: true,
    isPopular: true,
    description:
      "Petits chaussons dorés croustillants dont la pâte est confectionnée avec une touche de banane mûre locale. Généreusement farcis de bœuf haché assaisonné et fromage fondant.",
    ingredients: ["Pâte maison à la banane", "Bœuf haché assaisonné", "Fromage fondu", "Épices douces"],
    image: "/images/pastels_viande.jpg",
    tags: ["Pâte banane", "Bœuf & Fromage", "Croustillant"],
  },
  {
    id: "pastel-poulet-fromage",
    name: "Pastels Poulet Braisé & Fromage",
    subtitle: "Doré au croustillant parfait",
    category: "pastels",
    price: 800,
    isSignature: false,
    isPopular: true,
    description:
      "Effiloché de poulet fermier aux herbes fraîches et cœur de fromage fondant, enveloppé dans notre pâte signature croustillante.",
    ingredients: ["Pâte artisanale banane", "Poulet fermier effiloché", "Fromage", "Oignons doux"],
    image: "/images/pastels_viande.jpg",
    tags: ["Pâte banane", "Poulet", "Gourmand"],
  },
  {
    id: "pastel-poisson",
    name: "Pastels Poisson Frais Côtier",
    subtitle: "La saveur authentique de l'océan",
    category: "pastels",
    price: 800,
    isSignature: false,
    isPopular: false,
    description:
      "Filets de poisson frais du jour subtilement relevés aux aromates locaux dans une coque dorée et légère.",
    ingredients: ["Pâte artisanale banane", "Poisson frais émietté", "Aromates & poivrons"],
    image: "/images/pastels_viande.jpg",
    tags: ["Pâte banane", "Poisson", "Authentique"],
  },

  // ── 3. CRÊPES ──────────────────────────────────────────────────
  {
    id: "crepe-chocolat-banane",
    name: "Crêpe Choco-Noisette & Banane",
    subtitle: "Douceur gourmande",
    category: "crepes",
    price: 1500,
    isSignature: false,
    isPopular: true,
    description:
      "Crêpe fine et souple, arrosée d'un coulis chocolat-noisette généreux, rondelles de bananes fraîches et éclats de noisettes torréfiées.",
    ingredients: ["Pâte à crêpe au beurre doux", "Pâte à tartiner chocolat-noisette", "Bananes fraîches", "Noisettes"],
    image: "/images/crepes_gourmandes.jpg",
    tags: ["Chocolat", "Banane", "Gourmandise"],
  },
  {
    id: "crepe-fruits-frais",
    name: "Crêpe Délice aux Fruits Frais",
    subtitle: "Légèreté et fraîcheur",
    category: "crepes",
    price: 1500,
    isSignature: false,
    isPopular: false,
    description:
      "Assortiment de fruits de saison tranchés minute, saupoudrés d'un voile de sucre glace et zeste de citron vert.",
    ingredients: ["Pâte à crêpe légère", "Fruits de saison", "Zeste de citron vert"],
    image: "/images/crepes_gourmandes.jpg",
    tags: ["Fruits", "Léger", "Frais"],
  },
  {
    id: "crepe-salee-poulet-fromage",
    name: "Crêpe Salée Poulet & Emmental",
    subtitle: "Repas complet et réconfortant",
    category: "crepes",
    price: 2000,
    isSignature: false,
    isPopular: true,
    description:
      "Crêpe salée garnie d'émincé de poulet cuisiné aux échalotes, crème légère et emmental fondu filant.",
    ingredients: ["Pâte à crêpe salée", "Émincé de poulet", "Échalotes", "Emmental fondu"],
    image: "/images/crepes_gourmandes.jpg",
    tags: ["Salée", "Poulet", "Fromage fondu"],
  },
  {
    id: "crepe-salee-saucisse-fromage",
    name: "Crêpe Salée Saucisse & Double Fromage",
    subtitle: "Riche et fondante",
    category: "crepes",
    price: 1800,
    isSignature: false,
    isPopular: false,
    description:
      "Morceaux de saucisse dorée, fromage râpé et touche de moutarde douce pour un encas chaud très rassasiant.",
    ingredients: ["Pâte à crêpe salée", "Saucisses fumées", "Double fromage"],
    image: "/images/crepes_gourmandes.jpg",
    tags: ["Salée", "Saucisse", "Fromage"],
  },

  // ── 4. FLANS ───────────────────────────────────────────────────
  {
    id: "flan-caramel-coco",
    name: "Flan Coco & Caramel Ambré",
    subtitle: "L'onctuosité tropicale",
    category: "flan",
    price: 1200,
    isSignature: true,
    isPopular: true,
    description:
      "Flan onctueux préparé au lait de coco frais et lait entier, nappé d'un caramel blond coulant et d'une pointe de zeste de citron vert.",
    ingredients: ["Lait de coco frais", "Lait entier", "Œufs fermiers", "Caramel blond", "Citron vert"],
    image: "/images/flan_caramel_coco.jpg",
    tags: ["Lait de coco", "Caramel", "Signature"],
  },
  {
    id: "flan-vanille-bourbon",
    name: "Flan Pâtissier Vanille Bourbon",
    subtitle: "Recette traditionnelle",
    category: "flan",
    price: 1000,
    isSignature: false,
    isPopular: false,
    description:
      "La recette classique du flan pâtissier généreusement infusé aux gousses de vanille naturelle. Texture ferme et fondante à la fois.",
    ingredients: ["Gousses de vanille", "Lait entier", "Crème fraîche", "Œufs"],
    image: "/images/flan_caramel_coco.jpg",
    tags: ["Vanille", "Tradition", "Fondant"],
  },

  // ── 5. BOISSONS & ENCAS ────────────────────────────────────────
  {
    id: "baobab-au-lait",
    name: "Baobab au Lait Frais (Pain de Singe)",
    subtitle: "Élixir ancestral d'Afrique de l'Ouest",
    category: "boissons",
    price: 1200,
    isSignature: true,
    isPopular: true,
    description:
      "Pulpe de fruit du baobab 100% naturelle mixée avec du lait entier onctueux et une touche de muscade. Très riche en vitamine C et en antioxydants.",
    ingredients: ["Pulpe de fruit de baobab sauvage", "Lait entier", "Touche de canne à sucre", "Muscade"],
    image: "/images/baobab_au_lait.jpg",
    tags: ["Baobab", "Super-aliment", "Traditionnel", "Best-seller"],
  },
  {
    id: "pain-au-poulet-dore",
    name: "Pain au Poulet Doré (Le Gourmet)",
    subtitle: "L'encas chaud croustillant",
    category: "boissons",
    price: 1500,
    isSignature: false,
    isPopular: true,
    description:
      "Pain artisanal brioché et croustillant garni de poulet mariné aux épices locales, oignons caramélisés et sauce maison secrète.",
    ingredients: ["Pain brioché artisanal", "Poulet mariné", "Oignons caramélisés", "Sauce secrète"],
    image: "/images/hero_banner.jpg",
    tags: ["Encas salé", "Poulet mariné", "Chaud"],
  },
];
