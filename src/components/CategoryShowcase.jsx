import React, { useState } from "react";
import { Link } from "react-router-dom";
import { categories, products } from "../data/products";
import { StackedCardShuffle } from "./StackedCardShuffle";
import { Sparkles, Flame, Layers, CircleDot, Coffee, ArrowRight } from "lucide-react";
import { useCart } from "../context/CartContext";

const CATEGORY_ICONS = {
  yaourts: Sparkles,
  pastels: Flame,
  crepes: Layers,
  flan: CircleDot,
  boissons: Coffee,
};

export default function CategoryShowcase() {
  const [activeCategory, setActiveCategory] = useState("yaourts");
  const { addToCart } = useCart();

  // Filtrer les produits de la catégorie active
  const categoryProducts = products.filter((p) => p.category === activeCategory);

  // Convertir pour StackedCardShuffle
  const shuffleCards = categoryProducts.map((p, idx) => ({
    id: p.id || idx,
    title: p.name,
    desc: p.description,
    img: p.image,
    price: p.price,
    badge: p.isSignature ? "Signature" : p.isPopular ? "Populaire" : null,
    sub: p.subtitle,
    rawProduct: p,
  }));

  const activeCategoryMeta = categories.find((c) => c.id === activeCategory);
  const IconComponent = CATEGORY_ICONS[activeCategory] || Sparkles;

  return (
    <section className="py-20 md:py-28 bg-[#FFF8E3]/60 relative overflow-hidden">
      {/* Motifs décoratifs de fond */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-[#A7C0A1]/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-[#F0D28E]/25 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* En-tête de section */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#366848]/10 text-[#254631] font-sans text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#366848]" />
            Le Fait Maison d'Exception
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#1F241E] leading-tight">
            Explorez Nos Créations
          </h2>
          <p className="mt-3 font-sans text-sm sm:text-base text-[#6B7268]">
            Du célèbre yaourt bissap-pastèque sucré à la canne aux pastels croustillants à la banane, chaque recette a son histoire.
          </p>
        </div>

        {/* Barre de sélection de catégorie (Pill tabs modernes) */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap mb-10">
          {categories.map((cat) => {
            const CatIcon = CATEGORY_ICONS[cat.id] || Sparkles;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 shadow-sm ${
                  isActive
                    ? "bg-[#254631] text-white shadow-[#254631]/20 scale-105"
                    : "bg-white/80 text-[#254631] hover:bg-white hover:text-[#366848] border border-[#F0D28E]/50"
                }`}
              >
                <CatIcon className={`w-4 h-4 ${isActive ? "text-[#F0D28E]" : "text-[#366848]"}`} />
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Grille principale : Présentation de catégorie + StackedCardShuffle */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-6xl mx-auto">
          {/* Colonne gauche : Contexte & Histoire de la catégorie */}
          <div className="lg:col-span-5 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#366848]/10 text-[#254631] text-xs font-bold uppercase tracking-wider mb-3">
              <IconComponent className="w-3.5 h-3.5 text-[#366848]" />
              Catégorie en vedette
            </div>

            <h3 className="font-serif text-2xl sm:text-4xl font-bold text-[#1F241E] leading-snug">
              {activeCategoryMeta?.name}
            </h3>

            <p className="mt-4 font-sans text-sm sm:text-base text-[#4A5568] leading-relaxed">
              {activeCategoryMeta?.description}
            </p>

            {activeCategory === "yaourts" && (
              <div className="mt-5 p-4 rounded-2xl bg-white/70 border border-[#F0D28E]/70 shadow-sm flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-[#366848] flex-shrink-0 mt-0.5" />
                <p className="font-sans text-xs sm:text-sm text-[#254631] font-medium leading-relaxed">
                  <strong>Secret de fabrication :</strong> Nous n'utilisons aucun sucre blanc raffiné dans nos sirops, uniquement du pur jus de canne à sucre pressé localement.
                </p>
              </div>
            )}

            {activeCategory === "pastels" && (
              <div className="mt-5 p-4 rounded-2xl bg-white/70 border border-[#F0D28E]/70 shadow-sm flex items-start gap-3">
                <Flame className="w-5 h-5 text-[#366848] flex-shrink-0 mt-0.5" />
                <p className="font-sans text-xs sm:text-sm text-[#254631] font-medium leading-relaxed">
                  <strong>La touche signature :</strong> Notre pâte incorpore de la banane mûre pour un croustillant unique et un accord sucré-salé irrésistible.
                </p>
              </div>
            )}

            <div className="mt-8 flex items-center justify-center lg:justify-start gap-4">
              <Link
                to={`/menu?cat=${activeCategory}`}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#254631] text-white font-sans text-sm font-semibold hover:bg-[#366848] transition-all shadow-md"
              >
                Voir toute la sélection
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Colonne droite : StackedCardShuffle interactif */}
          <div className="lg:col-span-7 flex justify-center">
            <StackedCardShuffle
              cardList={shuffleCards}
              shuffleInterval={3400}
              speed={0.8}
              onAddToCart={(card) => {
                if (card.rawProduct) {
                  addToCart(card.rawProduct);
                }
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
