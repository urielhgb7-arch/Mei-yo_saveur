import React, { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import gsap from "gsap";
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag } from "lucide-react";

export default function CartSidebar() {
  const { items, removeItem, updateQuantity, total, isOpen, setIsOpen } = useCart();
  const backdropRef = useRef(null);
  const panelRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!backdropRef.current || !panelRef.current) return;
    if (isOpen) {
      gsap.to(backdropRef.current, { opacity: 1, duration: 0.3, ease: "power2.out" });
      gsap.fromTo(
        panelRef.current,
        { x: "100%" },
        { x: "0%", duration: 0.4, ease: "power3.out" }
      );
    } else {
      gsap.to(backdropRef.current, { opacity: 0, duration: 0.25 });
      gsap.to(panelRef.current, { x: "100%", duration: 0.3 });
    }
  }, [isOpen]);

  const handleGoToCheckout = () => {
    setIsOpen(false);
    navigate("/commander");
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        ref={backdropRef}
        className="fixed inset-0 bg-[#1F241E]/50 backdrop-blur-sm z-50 opacity-0"
        onClick={() => setIsOpen(false)}
      />

      {/* Panel latérale */}
      <aside
        ref={panelRef}
        className="fixed top-0 right-0 h-full w-full sm:w-[420px] z-50 shadow-2xl flex flex-col translate-x-full bg-[#FFFBF3] border-l border-[#F0D28E]/40"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#F0D28E]/30 bg-white">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-[#366848]" />
            <h2 className="text-xl font-bold font-serif text-[#254631]">
              Votre Panier
            </h2>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-[#FFF8E3] text-[#254631] hover:bg-[#F0D28E]/40 transition-colors"
            aria-label="Fermer le panier"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Liste des douceurs */}
        <div className="flex-1 overflow-y-auto p-5">
          {items.length === 0 ? (
            <div className="text-center py-16 flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-[#FFF8E3] border border-[#F0D28E] flex items-center justify-center mb-4">
                <ShoppingBag className="w-7 h-7 text-[#6B7268]" />
              </div>
              <p className="font-serif text-lg font-bold text-[#254631]">Votre panier est vide</p>
              <p className="font-sans text-xs sm:text-sm text-[#6B7268] mt-1 max-w-xs">
                Découvrez nos yaourts aux sirops de canne, pastels à la banane et crêpes fraîches.
              </p>
              <Link
                to="/menu"
                onClick={() => setIsOpen(false)}
                className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#254631] text-white font-sans text-xs font-semibold hover:bg-[#366848] transition-all"
              >
                Parcourir le menu
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3.5 p-3 rounded-2xl bg-white border border-[#F0D28E]/30 shadow-sm"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-xl object-cover flex-shrink-0 bg-[#FFF8E3]"
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <h3 className="font-serif font-bold text-sm text-[#1F241E] truncate">
                        {item.name}
                      </h3>
                      <p className="font-sans text-xs text-[#366848] font-semibold mt-0.5">
                        {new Intl.NumberFormat("fr-FR").format(item.price)} FCFA
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="inline-flex items-center gap-2 bg-[#FFF8E3] rounded-lg p-0.5 border border-[#F0D28E]/50">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-6 h-6 flex items-center justify-center rounded-md hover:bg-white text-[#254631] transition-colors"
                          aria-label="Diminuer la quantité"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-xs font-bold w-4 text-center text-[#254631]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center rounded-md hover:bg-white text-[#254631] transition-colors"
                          aria-label="Augmenter la quantité"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-[#6B7268] hover:text-red-600 transition-colors p-1"
                        aria-label="Supprimer cet article"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer avec Récapitulatif et CTA de commande */}
        {items.length > 0 && (
          <div className="p-5 border-t border-[#F0D28E]/40 bg-white">
            <div className="flex items-center justify-between mb-4">
              <span className="font-sans text-sm font-semibold text-[#6B7268]">
                Sous-total ({items.reduce((s, i) => s + i.quantity, 0)} articles)
              </span>
              <span className="font-serif text-2xl font-bold text-[#254631]">
                {new Intl.NumberFormat("fr-FR").format(total)} FCFA
              </span>
            </div>

            <button
              onClick={handleGoToCheckout}
              className="w-full py-3.5 rounded-full font-sans text-sm font-bold bg-[#254631] text-white hover:bg-[#366848] transition-all flex items-center justify-center gap-2 shadow-lg hover:scale-[1.02]"
            >
              <span>Passer au Paiement</span>
              <ArrowRight className="w-4 h-4 text-[#F0D28E]" />
            </button>

            <p className="text-[11px] text-center text-[#6B7268] mt-2.5">
              Paiement sécurisé via Maketou (Mobile Money & Cartes)
            </p>
          </div>
        )}
      </aside>
    </>
  );
}
