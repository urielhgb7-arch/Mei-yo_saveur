import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowRight, ShoppingBag, Menu, X, Sparkles } from "lucide-react";
import { useCart } from "../context/CartContext";

/**
 * HeroExpansion — Composant Hero plein écran glassmorphique Mei'yo
 * Architecture d'empilement isolée : image locale hero_banner.jpg,
 * dégradé protecteur pour contraste textuel maximal et pilule de navigation flottante.
 */

const BG_IMAGE = "/images/hero_banner.jpg";

const NAV_LINKS = [
  { label: "Accueil", href: "/" },
  { label: "Notre Menu", href: "/menu" },
  { label: "Notre Histoire", href: "/histoire" },
];

const BRAND_PILLARS = [
  "Yaourts Signatures aux Sirops",
  "Pâte Pastel à la Banane",
  "100% Fait Maison",
  "Pur Jus de Canne à Sucre",
  "Livraison Rapide Cotonou",
];

export function HeroExpansion() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { count, setIsOpen } = useCart();

  return (
    <section className="relative isolate min-h-screen w-full overflow-hidden flex flex-col justify-between">
      {/* 1. Calque Image de fond locale */}
      <div
        role="img"
        aria-label="Créations gourmandes artisanales Mei'yo"
        className="absolute inset-0 h-full w-full bg-cover bg-center transition-transform duration-1000 scale-105"
        style={{ backgroundImage: `url(${BG_IMAGE})` }}
      />

      {/* 2. Dégradé sombre et chaud spécifique à la charte Mei'yo */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1F241E]/85 via-[#254631]/55 to-[#1F241E]/90" />
      <div className="pointer-events-none absolute inset-0 ring-1 ring-white/10" />

      {/* 3. Navigation Pilule Flottante Glassmorphique */}
      <header className="relative z-30 pt-4 md:pt-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between">
            {/* Logo Mei'yo */}
            <Link to="/" className="inline-flex items-center gap-3 group">
              <img
                src="/Mei'yo_logo_secondaire.svg"
                alt="Mei'yo"
                className="w-10 h-10 object-contain drop-shadow-md transition-transform duration-300 group-hover:scale-105"
              />
              <span className="font-serif text-2xl font-bold text-white tracking-tight">
                Mei'yo
              </span>
            </Link>

            {/* Desktop Nav Pilule unique */}
            <nav className="hidden items-center gap-2 md:flex">
              <div className="flex items-center gap-1 rounded-full bg-white/10 px-2 py-1.5 ring-1 ring-white/20 backdrop-blur-md shadow-lg">
                {NAV_LINKS.map((item) => (
                  <Link
                    key={item.label}
                    to={item.href}
                    className="px-4 py-2 font-sans text-sm font-medium text-white/90 hover:text-white transition-colors rounded-full hover:bg-white/10"
                  >
                    {item.label}
                  </Link>
                ))}

                {/* Panier bouton */}
                <button
                  type="button"
                  onClick={() => setIsOpen(true)}
                  className="px-3.5 py-2 font-sans text-sm font-medium text-white/90 hover:text-white transition-colors rounded-full hover:bg-white/10 inline-flex items-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4 text-[#F0D28E]" />
                  <span>Panier</span>
                  {count > 0 && (
                    <span className="w-5 h-5 flex items-center justify-center text-[10px] font-bold rounded-full bg-[#F0D28E] text-[#254631]">
                      {count}
                    </span>
                  )}
                </button>

                <Link
                  to="/commander"
                  className="ml-2 inline-flex items-center gap-2 rounded-full bg-[#F0D28E] px-4 py-2 font-sans text-sm font-semibold text-[#254631] hover:bg-[#F6E2B8] transition-all shadow-md hover:scale-[1.02]"
                >
                  Commander
                  <ArrowUpRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
            </nav>

            {/* Bouton Mobile Menu */}
            <div className="flex items-center gap-2 md:hidden">
              <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="inline-flex items-center gap-1.5 rounded-full bg-[#F0D28E] px-3 py-1.5 text-xs font-semibold text-[#254631] shadow-sm"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Panier</span>
                {count > 0 && (
                  <span className="w-4 h-4 flex items-center justify-center text-[9px] font-bold rounded-full bg-[#254631] text-[#F0D28E]">
                    {count}
                  </span>
                )}
              </button>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Ouvrir le menu"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/20 backdrop-blur-md text-white"
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Menu Déroulant Mobile */}
        {mobileMenuOpen && (
          <div className="md:hidden mx-4 mt-3 p-4 rounded-2xl bg-[#1F241E]/95 ring-1 ring-white/20 backdrop-blur-xl shadow-2xl flex flex-col gap-2 z-50">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 text-white font-medium hover:bg-white/10 rounded-xl"
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/commander"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-[#F0D28E] py-3 text-[#254631] font-semibold"
            >
              <ShoppingBag className="w-4 h-4" />
              Finaliser ma commande
            </Link>
          </div>
        )}
      </header>

      {/* 4. Contenu Principal Centré */}
      <div className="relative z-10 flex-1 flex items-center justify-center py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 text-center">
          {/* Badge Signature */}
          <div className="mb-6 inline-flex items-center gap-2.5 rounded-full bg-white/10 px-3.5 py-1.5 ring-1 ring-white/20 backdrop-blur-md">
            <span className="inline-flex items-center gap-1 rounded-full bg-[#F0D28E] px-2.5 py-0.5 font-sans text-xs font-bold text-[#254631]">
              <Sparkles className="w-3 h-3" />
              Signature
            </span>
            <span className="font-sans text-xs sm:text-sm font-medium text-white/95">
              Yaourt artisanal au Bissap & Pastèque fraîche
            </span>
          </div>

          {/* Titre Principal avec Fraunces */}
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.08] tracking-tight text-white drop-shadow-sm">
            Le Goût du Vrai,
            <br />
            <span className="italic font-normal text-[#F0D28E]">
              Fait Maison avec Amour.
            </span>
          </h1>

          {/* Sous-titre */}
          <p className="mx-auto mt-6 max-w-2xl font-sans text-base sm:text-lg md:text-xl text-white/90 leading-relaxed font-normal">
            Des yaourts onctueux aux sirops de canne à sucre pure, des pastels croustillants à la banane et des douceurs authentiques préparées chaque jour à Cotonou.
          </p>

          {/* Boutons d'Action */}
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Link
              to="/menu"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#F0D28E] px-7 py-4 font-sans text-base font-semibold text-[#254631] shadow-xl hover:bg-[#F6E2B8] hover:scale-105 transition-all"
            >
              Découvrir la Carte
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link
              to="/histoire"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-white/10 px-6 py-4 font-sans text-base font-medium text-white ring-1 ring-white/25 hover:bg-white/20 transition-all backdrop-blur-md"
            >
              Notre Savoir-Faire
            </Link>
          </div>
        </div>
      </div>

      {/* 5. Bandeau Inférieur des Engagements Mei'yo */}
      <div className="relative z-10 pb-8 md:pb-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="pt-6 border-t border-white/15">
            <p className="text-center font-sans text-xs uppercase tracking-widest text-[#F0D28E] font-medium mb-4">
              L'engagement qualité Mei'yo
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 text-center">
              {BRAND_PILLARS.map((name) => (
                <div
                  key={name}
                  className="flex items-center justify-center px-3 py-2 rounded-xl bg-white/5 ring-1 ring-white/10 backdrop-blur-sm"
                >
                  <span className="font-sans text-xs sm:text-sm font-medium text-white/90">
                    {name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroExpansion;
