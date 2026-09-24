import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CartSidebar from "../components/CartSidebar";
import LogoLoader from "../components/LogoLoader";
import { AnimatePresence, motion } from "framer-motion";

export default function MainLayout() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const [pastHero, setPastHero] = useState(!isHome);
  
  // Transition d'écran : activée par défaut pour l'entrée sur le site et les changements de page
  const [isTransitioning, setIsTransitioning] = useState(true);

  useEffect(() => {
    setIsTransitioning(true);
    window.scrollTo(0, 0);

    // Durée de l'overlay de chargement (le temps que le logo GSAP se reforme)
    const t = setTimeout(() => {
      setIsTransitioning(false);
    }, 2400);

    return () => clearTimeout(t);
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
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="fixed inset-0 z-[200] bg-[#FFFBF3]/95 backdrop-blur-xl flex items-center justify-center"
          >
            <LogoLoader message="" submessage="" size="lg" />
          </motion.div>
        )}
      </AnimatePresence>

      <Navbar isHidden={!pastHero && isHome} />
      <CartSidebar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
