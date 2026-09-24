import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CartSidebar from "../components/CartSidebar";

export default function MainLayout() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const [pastHero, setPastHero] = useState(!isHome);

  // Scroll en haut à chaque changement de page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Sur la page d'accueil, afficher la Navbar globale uniquement après le Hero (~85vh)
  useEffect(() => {
    if (!isHome) {
      setPastHero(true);
      return;
    }

    const onScroll = () => {
      setPastHero(window.scrollY > window.innerHeight * 0.85);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFBF3] text-[#1F241E] selection:bg-[#F0D28E] selection:text-[#254631]">
      <Navbar isHidden={!pastHero && isHome} />
      <CartSidebar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
