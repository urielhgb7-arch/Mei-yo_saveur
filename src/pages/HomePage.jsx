import React from "react";
import HeroExpansion from "../components/HeroExpansion";
import CategoryShowcase from "../components/CategoryShowcase";
import Story from "../components/Story";
import Testimonials from "../components/Testimonials";
import { Link } from "react-router-dom";
import { ArrowRight, ShoppingBag, Sparkles } from "lucide-react";

export default function HomePage() {
  return (
    <div className="w-full overflow-hidden">
      {/* 1. Hero Expansion Glassmorphique */}
      <HeroExpansion />

      {/* 2. Vitrine des Catégories avec StackedCardShuffle */}
      <CategoryShowcase />

      {/* 3. Notre Philosophie & Valeurs du Brand Board */}
      <Story />

      {/* 4. Témoignages */}
      <Testimonials />

      {/* 5. Bannière d'appel à la gourmandise */}
      <section className="py-20 px-4 sm:px-6 bg-[#254631] text-white relative overflow-hidden text-center">
        <div className="absolute inset-0 bg-[radial-gradient(#F0D28E_1px,transparent_1px)] [background-size:24px_24px] opacity-10" />

        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#366848] text-[#F0D28E] text-xs font-semibold uppercase tracking-wider mb-4 border border-[#F0D28E]/30">
            <Sparkles className="w-3.5 h-3.5 text-[#F0D28E]" />
            Envie de déguster ?
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold leading-tight mb-4 text-[#FFFBF3]">
            Commandez vos douceurs en quelques clics
          </h2>

          <p className="font-sans text-sm sm:text-base text-[#A7C0A1] max-w-xl mx-auto mb-8 leading-relaxed">
            Livraison rapide à Cotonou ou retrait atelier. Paiement simple et 100% sécurisé via Mobile Money (MTN, Moov) ou carte bancaire.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/menu"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#F0D28E] text-[#254631] font-semibold text-sm hover:bg-[#F6E2B8] transition-all shadow-lg hover:scale-105"
            >
              Consulter le Menu
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/commander"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white/10 text-white font-semibold text-sm hover:bg-white/20 border border-white/20 transition-all backdrop-blur-sm"
            >
              <ShoppingBag className="w-4 h-4" />
              Panier & Commande
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
