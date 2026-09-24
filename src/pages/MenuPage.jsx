import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { categories, products } from "../data/products";
import ProductCard from "../components/ProductCard";
import { Sparkles, Flame, Layers, CircleDot, Coffee, Search, ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";

const CATEGORY_ICONS = {
  all: Sparkles,
  yaourts: Sparkles,
  pastels: Flame,
  crepes: Layers,
  flan: CircleDot,
  boissons: Coffee,
};

export default function MenuPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get("cat") || "all";
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState("");
  const { count, setIsOpen } = useCart();

  useEffect(() => {
    const cat = searchParams.get("cat");
    if (cat) setSelectedCategory(cat);
  }, [searchParams]);

  const handleSelectCategory = (catId) => {
    setSelectedCategory(catId);
    if (catId === "all") {
      searchParams.delete("cat");
    } else {
      searchParams.set("cat", catId);
    }
    setSearchParams(searchParams);
  };

  // Filtrage combiné : catégorie + recherche
  const filteredProducts = products.filter((p) => {
    const matchesCategory =
      selectedCategory === "all" || p.category === selectedCategory;
    const matchesSearch =
      searchQuery === "" ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.tags && p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-28 pb-24 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* En-tête du Menu */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#366848]/10 text-[#254631] text-xs font-bold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5 text-[#366848]" />
          La Carte Gourmande
        </div>
        <h1 className="font-serif text-4xl sm:text-6xl font-bold text-[#1F241E] leading-tight">
          Nos Spécialités Faites Maison
        </h1>
        <p className="mt-4 font-sans text-sm sm:text-base text-[#6B7268] leading-relaxed">
          Chaque création est préparée artisanalement avec amour, des fruits frais du Bénin, et sucrée au pur jus de canne pour nos sirops de yaourts.
        </p>

        {/* Barre de recherche */}
        <div className="mt-8 max-w-md mx-auto relative">
          <Search className="w-4 h-4 text-[#6B7268] absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher (ex: bissap, banane, coco, bœuf)..."
            className="w-full pl-11 pr-4 py-3 rounded-full bg-white border border-[#F0D28E]/60 text-sm text-[#1F241E] placeholder-[#6B7268]/60 focus:outline-none focus:border-[#366848] focus:ring-2 focus:ring-[#366848]/10 shadow-sm"
          />
        </div>
      </div>

      {/* Filtres par catégories */}
      <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap mb-12">
        <button
          onClick={() => handleSelectCategory("all")}
          className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 shadow-sm ${
            selectedCategory === "all"
              ? "bg-[#254631] text-white shadow-[#254631]/20 scale-105"
              : "bg-white text-[#254631] border border-[#F0D28E]/50 hover:bg-[#FFF8E3]"
          }`}
        >
          <Sparkles className="w-4 h-4" />
          Toutes les douceurs
        </button>

        {categories.map((cat) => {
          const CatIcon = CATEGORY_ICONS[cat.id] || Sparkles;
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => handleSelectCategory(cat.id)}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 shadow-sm ${
                isActive
                  ? "bg-[#254631] text-white shadow-[#254631]/20 scale-105"
                  : "bg-white text-[#254631] border border-[#F0D28E]/50 hover:bg-[#FFF8E3]"
              }`}
            >
              <CatIcon className={`w-4 h-4 ${isActive ? "text-[#F0D28E]" : "text-[#366848]"}`} />
              {cat.name}
            </button>
          );
        })}
      </div>

      {/* Grille des Produits */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-[#F0D28E]/40 p-8 max-w-md mx-auto">
          <p className="font-serif text-xl font-bold text-[#254631]">Aucun produit trouvé</p>
          <p className="text-xs sm:text-sm text-[#6B7268] mt-2">
            Essayez de modifier votre recherche ou sélectionnez une autre catégorie.
          </p>
          <button
            onClick={() => {
              setSelectedCategory("all");
              setSearchQuery("");
            }}
            className="mt-5 px-5 py-2 rounded-full bg-[#254631] text-white text-xs font-semibold"
          >
            Réinitialiser les filtres
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* Flottant Panier mobile si articles */}
      {count > 0 && (
        <div className="fixed bottom-6 right-6 z-30">
          <button
            onClick={() => setIsOpen(true)}
            className="inline-flex items-center gap-2.5 px-5 py-3.5 rounded-full bg-[#254631] text-white font-semibold text-sm shadow-2xl hover:bg-[#366848] transition-all hover:scale-105 border border-[#F0D28E]/40"
          >
            <ShoppingBag className="w-4 h-4 text-[#F0D28E]" />
            <span>Voir mon Panier ({count})</span>
          </button>
        </div>
      )}
    </div>
  );
}
