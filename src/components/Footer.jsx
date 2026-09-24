import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Phone, Clock, Heart, Sparkles, ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#1F241E] text-white py-16 px-4 sm:px-6 border-t border-[#366848]/30">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 lg:gap-12">
          {/* 1. Identité de marque */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-3">
              <img
                src="/Mei'yo_logo_secondaire.svg"
                alt="Mei'yo"
                className="w-10 h-10 object-contain"
              />
              <span className="text-3xl font-bold font-serif text-[#FFFBF3]">
                Mei'yo
              </span>
            </div>
            <p className="text-xs uppercase tracking-[0.2em] font-semibold text-[#F0D28E] mb-3">
              Le Goût du Vrai
            </p>
            <p className="text-xs sm:text-sm leading-relaxed text-[#A7C0A1]">
              La référence artisanale de yaourts aux sirops de canne, pastels à la banane et douceurs faites maison à Cotonou, Bénin.
            </p>
          </div>

          {/* 2. Navigation rapide */}
          <div>
            <h4 className="text-base font-bold font-serif text-[#FFFBF3] mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#F0D28E]" />
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-white/80">
              <li>
                <Link to="/" className="hover:text-[#F0D28E] transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/menu" className="hover:text-[#F0D28E] transition-colors">
                  Notre Menu & Spécialités
                </Link>
              </li>
              <li>
                <Link to="/histoire" className="hover:text-[#F0D28E] transition-colors">
                  Notre Histoire & Savoir-faire
                </Link>
              </li>
              <li>
                <Link to="/commander" className="hover:text-[#F0D28E] transition-colors">
                  Commander en ligne
                </Link>
              </li>
            </ul>
          </div>

          {/* 3. Horaires de commande */}
          <div>
            <h4 className="text-base font-bold font-serif text-[#FFFBF3] mb-4 flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#F0D28E]" />
              Disponibilité
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-white/80">
              <li className="flex justify-between">
                <span className="text-white/60">Lundi — Vendredi</span>
                <span className="font-medium text-[#F0D28E]">07h30 — 19h00</span>
              </li>
              <li className="flex justify-between">
                <span className="text-white/60">Samedi</span>
                <span className="font-medium text-[#F0D28E]">08h00 — 18h00</span>
              </li>
              <li className="flex justify-between">
                <span className="text-white/60">Dimanche</span>
                <span className="text-white/50">Sur commande spéciale</span>
              </li>
            </ul>
          </div>

          {/* 4. Atelier & Contact Bénin */}
          <div>
            <h4 className="text-base font-bold font-serif text-[#FFFBF3] mb-4 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#F0D28E]" />
              Atelier & Contact
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm text-white/80">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#F0D28E] flex-shrink-0 mt-0.5" />
                <span>Cotonou, République du Bénin</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#F0D28E] flex-shrink-0" />
                <span>+229 01 XX XX XX</span>
              </li>
              <li className="pt-2">
                <Link
                  to="/commander"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#366848] text-white text-xs font-semibold hover:bg-[#254631] border border-[#F0D28E]/30 transition-all shadow-sm"
                >
                  <span>Paiement Sécurisé Maketou</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bas de page */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <p>© {new Date().getFullYear()} Mei'yo. Tous droits réservés. Cotonou, Bénin.</p>
          <p className="flex items-center gap-1.5">
            Créé avec <Heart className="w-3.5 h-3.5 text-[#F0D28E] fill-[#F0D28E]" /> pour le plaisir du vrai goût.
          </p>
        </div>
      </div>
    </footer>
  );
}
