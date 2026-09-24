import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { Sparkles, Plus, Check } from "lucide-react";

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  const formattedPrice = new Intl.NumberFormat("fr-FR").format(product.price) + " FCFA";

  return (
    <div className="group rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1.5 bg-white border border-[#254631]/10 flex flex-col justify-between">
      <div>
        {/* Image du produit */}
        <div className="relative overflow-hidden h-52 sm:h-56 bg-[#FFFBF3]">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />

          {/* Badges d'exception */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.isSignature && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider rounded-full bg-[#366848] text-[#FFFBF3] shadow-md">
                <Sparkles className="w-3 h-3 text-[#F0D28E]" />
                Signature
              </span>
            )}
            {product.isPopular && !product.isSignature && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider rounded-full bg-[#F0D28E] text-[#254631] shadow-md">
                Incontournable
              </span>
            )}
          </div>
        </div>

        {/* Informations produit */}
        <div className="p-5">
          <p className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#366848] mb-1">
            {product.subtitle || product.category}
          </p>

          <h3 className="text-xl font-bold font-serif text-[#1F241E] mb-2 leading-snug group-hover:text-[#366848] transition-colors">
            {product.name}
          </h3>

          <p className="text-sm leading-relaxed text-[#6B7268] mb-4 line-clamp-3">
            {product.description}
          </p>

          {/* Ingrédients clés */}
          {product.ingredients && product.ingredients.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {product.ingredients.slice(0, 3).map((ing, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded-md bg-[#FFF8E3] text-[#254631] text-[10px] font-medium border border-[#F0D28E]/40"
                >
                  {ing}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Pied de carte : Prix et CTA */}
      <div className="px-5 pb-5 pt-2 border-t border-[#F0D28E]/30 flex items-center justify-between">
        <div>
          <span className="text-xs text-[#6B7268] block">Prix unitaire</span>
          <span className="text-lg font-bold font-serif text-[#254631]">
            {formattedPrice}
          </span>
        </div>

        <button
          onClick={handleAdd}
          className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 shadow-sm ${
            added
              ? "bg-[#366848] text-white"
              : "bg-[#254631] text-white hover:bg-[#366848] hover:scale-105"
          }`}
        >
          {added ? (
            <>
              <Check className="w-4 h-4 text-[#F0D28E]" />
              Ajouté
            </>
          ) : (
            <>
              <Plus className="w-4 h-4" />
              Ajouter
            </>
          )}
        </button>
      </div>
    </div>
  );
}
