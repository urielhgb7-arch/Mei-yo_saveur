import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";

const links = [
  { label: "Accueil", href: "#hero" },
  { label: "Notre Histoire", href: "#story" },
  { label: "Produits", href: "#products" },
  { label: "Commander", href: "#products" },
];

export default function Navbar() {
  const { count, setIsOpen } = useCart();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled ? "glass shadow-md py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-2">
          <span
            className="text-2xl font-bold serif"
            style={{ color: "var(--mei-green)" }}
          >
            Mei'yo
          </span>
          <span
            className="text-[10px] tracking-widest uppercase opacity-60 hidden sm:inline-block mt-1"
            style={{ color: "var(--mei-green)" }}
          >
            Le Goût du Vrai
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium tracking-wide hover:opacity-60 transition-opacity"
              style={{ color: "var(--mei-green)" }}
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* Cart button */}
        <button
          onClick={() => setIsOpen(true)}
          className="relative flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 hover:shadow-lg"
          style={{
            background: "var(--mei-green)",
            color: "var(--mei-cream)",
          }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
          </svg>
          <span className="hidden sm:inline">Panier</span>
          {count > 0 && (
            <span
              className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center text-[11px] font-bold rounded-full"
              style={{ background: "var(--mei-yellow)", color: "var(--mei-ink)" }}
            >
              {count}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
}
