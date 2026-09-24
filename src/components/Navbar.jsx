import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { ShoppingBag, Menu, X, ArrowUpRight } from "lucide-react";

const links = [
  { label: "Accueil", href: "/" },
  { label: "Notre Menu", href: "/menu" },
  { label: "Notre Histoire", href: "/histoire" },
];

export default function Navbar({ isHidden = false }) {
  const { count, setIsOpen } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileCollapsed, setMobileCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 30);

      // Sur mobile (< 768px) : collapser en bouton flottant au scroll descendant
      if (window.innerWidth < 768) {
        if (y > 180 && y > lastScrollY.current + 10) {
          setMobileCollapsed(true);
          setMobileMenuOpen(false);
        } else if (y < lastScrollY.current - 35 || y < 100) {
          // Remonter de 35px ou retour en haut -> réafficher la navbar
          setMobileCollapsed(false);
        }
      } else {
        setMobileCollapsed(false);
      }
      lastScrollY.current = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Fermer le menu mobile et réinitialiser au changement de route
  useEffect(() => {
    setMobileMenuOpen(false);
    setMobileCollapsed(false);
  }, [location.pathname]);

  return (
    <>
      {/* === NAVBAR PRINCIPALE (Desktop + Mobile étendu) === */}
      <nav
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${
          isHidden
            ? "-translate-y-full opacity-0 pointer-events-none"
            : mobileCollapsed
            ? "-translate-y-full opacity-0 pointer-events-none md:translate-y-0 md:opacity-100 md:pointer-events-auto"
            : "translate-y-0 opacity-100 pointer-events-auto"
        } ${
          scrolled
            ? "bg-[#FFFBF3]/90 backdrop-blur-md shadow-sm border-b border-[#F0D28E]/30 py-3"
            : "bg-transparent py-4 sm:py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Logo Mei'yo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <img
              src="/Mei'yo_logo_secondaire.svg"
              alt="Mei'yo"
              className="w-9 h-9 object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <div className="flex flex-col">
              <span className="text-2xl font-bold font-serif text-[#254631] leading-none tracking-tight">
                Mei'yo
              </span>
              <span className="text-[9px] tracking-[0.2em] uppercase text-[#6B7268] font-sans font-semibold mt-0.5">
                Le Goût du Vrai
              </span>
            </div>
          </Link>

          {/* Liens Desktop (Pilule centrale) */}
          <div className="hidden md:flex items-center gap-1 rounded-full bg-white/60 p-1.5 border border-[#F0D28E]/40 backdrop-blur-sm shadow-sm">
            {links.map((l) => {
              const isActive = location.pathname === l.href;
              return (
                <Link
                  key={l.href}
                  to={l.href}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? "bg-[#254631] text-[#FFFBF3] shadow-sm"
                      : "text-[#254631] hover:text-[#366848] hover:bg-white"
                  }`}
                >
                  {l.label}
                </Link>
              );
            })}
          </div>

          {/* Actions à droite : Panier & Commander */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsOpen(true)}
              className="relative flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-semibold bg-white border border-[#F0D28E]/60 text-[#254631] hover:border-[#366848] transition-all shadow-sm"
              aria-label="Ouvrir le panier"
            >
              <ShoppingBag className="w-4 h-4 text-[#366848]" />
              <span className="hidden sm:inline">Panier</span>
              {count > 0 && (
                <span className="w-5 h-5 flex items-center justify-center text-[10px] font-bold rounded-full bg-[#F0D28E] text-[#254631]">
                  {count}
                </span>
              )}
            </button>

            <Link
              to="/commander"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold bg-[#254631] text-white hover:bg-[#366848] transition-all shadow-sm hover:scale-105"
            >
              <span>Commander</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>

            {/* Bouton Toggle Mobile standard */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex md:hidden p-2 rounded-full bg-white border border-[#F0D28E]/60 text-[#254631]"
              aria-label="Menu de navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Menu mobile accordéon (quand navbar pleine) */}
        {mobileMenuOpen && !mobileCollapsed && (
          <div className="md:hidden mx-4 mt-2 p-4 rounded-2xl bg-[#FFFBF3]/95 border border-[#F0D28E]/60 shadow-xl backdrop-blur-xl flex flex-col gap-2">
            {links.map((l) => (
              <Link
                key={l.href}
                to={l.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-xl font-medium text-sm text-[#254631] hover:bg-[#FFF8E3]"
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/commander"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 text-center py-2.5 rounded-xl bg-[#254631] text-white font-semibold text-sm"
            >
              Passer la commande
            </Link>
          </div>
        )}
      </nav>

      {/* === BOUTON FLOTTANT MOBILE (quand collapsé au scroll) === */}
      <div
        className={`md:hidden fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-out ${
          mobileCollapsed && !isHidden
            ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
            : "opacity-0 scale-75 -translate-y-4 pointer-events-none"
        }`}
      >
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Ouvrir le menu Mei'yo"
          className="w-12 h-12 rounded-full bg-[#FFFBF3]/85 backdrop-blur-xl border border-[#F0D28E]/70 shadow-xl flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
        >
          <img
            src="/Mei'yo_logo_secondaire.svg"
            alt="Logo Mei'yo"
            className="w-7 h-7 object-contain"
          />
        </button>
      </div>

      {/* Bouton Panier flottant mobile pour accès rapide quand navbar collapsée */}
      <div
        className={`md:hidden fixed top-4 right-4 z-50 transition-all duration-500 ease-out ${
          mobileCollapsed && !isHidden
            ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
            : "opacity-0 scale-75 -translate-y-4 pointer-events-none"
        }`}
      >
        <button
          onClick={() => setIsOpen(true)}
          aria-label="Voir le panier"
          className="relative w-12 h-12 rounded-full bg-[#FFFBF3]/85 backdrop-blur-xl border border-[#F0D28E]/70 shadow-xl flex items-center justify-center hover:scale-105 active:scale-95 transition-transform text-[#254631]"
        >
          <ShoppingBag className="w-5 h-5 text-[#366848]" />
          {count > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center text-[10px] font-bold rounded-full bg-[#F0D28E] text-[#254631] border border-[#254631]/20">
              {count}
            </span>
          )}
        </button>
      </div>

      {/* Menu dropdown glassmorphique arrondi depuis le bouton flottant */}
      <div
        className={`md:hidden fixed top-20 left-4 right-4 z-50 transition-all duration-400 ease-out ${
          mobileCollapsed && mobileMenuOpen && !isHidden
            ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
            : "opacity-0 scale-95 -translate-y-3 pointer-events-none"
        }`}
      >
        <div className="p-4 rounded-[2rem] bg-[#FFFBF3]/90 backdrop-blur-2xl border border-white/30 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] flex flex-col gap-1.5">
          <div className="flex items-center justify-between px-3 py-2 border-b border-[#F0D28E]/30 mb-1">
            <span className="font-serif font-bold text-base text-[#254631]">Mei'yo Menu</span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-1 rounded-full text-[#6B7268] hover:text-[#254631]"
              aria-label="Fermer le menu"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {links.map((l) => {
            const isActive = location.pathname === l.href;
            return (
              <Link
                key={l.href}
                to={l.href}
                onClick={() => {
                  setMobileMenuOpen(false);
                  setMobileCollapsed(false);
                }}
                className={`px-4 py-2.5 rounded-2xl font-medium text-sm transition-colors ${
                  isActive
                    ? "bg-[#254631] text-[#FFFBF3]"
                    : "text-[#254631] hover:bg-[#FFF8E3]"
                }`}
              >
                {l.label}
              </Link>
            );
          })}

          <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-[#F0D28E]/30">
            <button
              onClick={() => {
                setIsOpen(true);
                setMobileMenuOpen(false);
              }}
              className="py-2.5 rounded-2xl bg-white border border-[#F0D28E]/60 text-[#254631] font-semibold text-xs flex items-center justify-center gap-1.5 shadow-sm"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              Panier ({count})
            </button>
            <Link
              to="/commander"
              onClick={() => {
                setMobileMenuOpen(false);
                setMobileCollapsed(false);
              }}
              className="py-2.5 rounded-2xl bg-[#254631] text-white font-semibold text-xs text-center flex items-center justify-center gap-1 shadow-sm"
            >
              Commander
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
