import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { createCheckoutSession, generateWhatsAppOrderUrl } from "../services/maketou";
import LogoLoader from "../components/LogoLoader";
import { LiquidButton } from "../components/ui/liquid-glass-button";
import { ShoppingBag, ShieldCheck, ArrowRight, ArrowLeft, AlertCircle, CreditCard, MessageSquare } from "lucide-react";

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    notes: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError(null);
  };

  const handleCheckout = async (e) => {
    e.preventDefault();

    if (items.length === 0) {
      setError("Votre panier est vide. Veuillez ajouter des douceurs.");
      return;
    }

    if (!formData.email || !formData.firstName || !formData.phone) {
      setError("Veuillez renseigner votre prénom, email et numéro de téléphone.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // 1. Initialisation de la session Maketou via le proxy Express
      const data = await createCheckoutSession({
        customer: formData,
        items,
        total,
        redirectUrl: `${window.location.origin}/confirmation`,
      });

      if (data && data.redirectUrl) {
        // Redirection vers l'interface de paiement sécurisée Maketou
        window.location.href = data.redirectUrl;
      } else {
        // Fallback si l'API retourne un cartId sans URL externe immédiate
        navigate(`/confirmation?cartId=${data.cartId || `MEIYO-${Date.now()}`}`);
      }
    } catch (err) {
      console.warn("Erreur lors de l'initiation Maketou:", err);
      setError(
        err.message ||
          "Le service de paiement en ligne Maketou est momentanément indisponible. Vous pouvez finaliser directement votre commande sur WhatsApp ci-dessous."
      );
      setLoading(false);
    }
  };

  // Option de repli direct WhatsApp si besoin
  const handleWhatsAppDirect = () => {
    const url = generateWhatsAppOrderUrl({
      items,
      total,
      customer: formData,
      cartId: `DIRECT-${Date.now()}`,
    });
    window.open(url, "_blank");
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center px-4">
        <LogoLoader
          message="Connexion sécurisée avec Maketou..."
          submessage="Vous allez être redirigé vers l'espace de paiement Mobile Money"
          size="lg"
        />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="pt-36 pb-24 px-4 text-center max-w-md mx-auto">
        <div className="w-16 h-16 rounded-full bg-[#FFF8E3] border border-[#F0D28E] flex items-center justify-center mx-auto mb-4 text-[#366848]">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h1 className="font-serif text-3xl font-bold text-[#254631] mb-2">
          Votre Panier est vide
        </h1>
        <p className="text-sm text-[#6B7268] mb-6">
          Ajoutez nos yaourts artisanaux, pastels croustillants ou crêpes gourmandes pour passer commande.
        </p>
        <Link
          to="/menu"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#254631] text-white font-semibold text-sm hover:bg-[#366848] transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          Découvrir le Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen pt-32 sm:pt-36 pb-24 px-4 sm:px-6">
      {/* Arrière-plan décoratif pour sublimer le glassmorphisme */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center opacity-20 pointer-events-none mix-blend-multiply"
        style={{ backgroundImage: "url('/images/hero_banner.jpg')" }}
      />
      <div className="fixed inset-0 z-0 bg-[#FFFBF3]/80 backdrop-blur-2xl pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* En-tête */}
      <div className="mb-10 text-center sm:text-left">
        <Link
          to="/menu"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#366848] hover:underline mb-2"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Continuer mes achats
        </Link>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#1F241E]">
          Finaliser ma Commande
        </h1>
        <p className="font-sans text-xs sm:text-sm text-[#6B7268] mt-1">
          Paiement sécurisé via Maketou (MTN Bénin, Moov Bénin, Visa, Mastercard)
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Formulaire Client (7 colonnes) — Glassmorphisme élégant */}
        <div className="lg:col-span-7 rounded-3xl p-6 sm:p-8 border border-white/50 shadow-[0_8px_32px_rgba(37,70,49,0.1)] bg-white/40 backdrop-blur-2xl ring-1 ring-white/60 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent pointer-events-none rounded-3xl" />
          <h2 className="relative z-10 font-serif text-xl sm:text-2xl font-bold text-[#254631] mb-6 flex items-center gap-2">
            <span>Coordonnées de Livraison</span>
          </h2>

          {error && (
            <div className="mb-6 p-4 rounded-2xl bg-red-50/90 border border-red-200 text-red-700 text-xs sm:text-sm flex flex-col gap-3 backdrop-blur-sm">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-red-500" />
                <span>{error}</span>
              </div>
              <button
                type="button"
                onClick={handleWhatsAppDirect}
                className="self-start inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#254631] text-white text-xs font-semibold hover:bg-[#366848] transition-all"
              >
                <MessageSquare className="w-4 h-4 text-[#F0D28E]" />
                Commander directement via WhatsApp
              </button>
            </div>
          )}

          <form onSubmit={handleCheckout} className="space-y-4 relative z-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#254631] uppercase tracking-wider mb-1.5">
                  Prénom *
                </label>
                <input
                  type="text"
                  name="firstName"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Ex : Koffi"
                  className="w-full px-4 py-3 rounded-xl bg-white/60 backdrop-blur-sm border border-[#F0D28E]/60 text-sm focus:outline-none focus:border-[#366848] focus:ring-2 focus:ring-[#366848]/20 transition-all text-[#1F241E] placeholder:text-[#6B7268]/60"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#254631] uppercase tracking-wider mb-1.5">
                  Nom
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Ex : Dossou"
                  className="w-full px-4 py-3 rounded-xl bg-white/60 backdrop-blur-sm border border-[#F0D28E]/60 text-sm focus:outline-none focus:border-[#366848] focus:ring-2 focus:ring-[#366848]/20 transition-all text-[#1F241E] placeholder:text-[#6B7268]/60"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#254631] uppercase tracking-wider mb-1.5">
                  Email (Requis par Maketou) *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="nom@exemple.bj"
                  className="w-full px-4 py-3 rounded-xl bg-white/60 backdrop-blur-sm border border-[#F0D28E]/60 text-sm focus:outline-none focus:border-[#366848] focus:ring-2 focus:ring-[#366848]/20 transition-all text-[#1F241E] placeholder:text-[#6B7268]/60"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#254631] uppercase tracking-wider mb-1.5">
                  Téléphone Mobile Money *
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+229 01 XX XX XX"
                  className="w-full px-4 py-3 rounded-xl bg-white/60 backdrop-blur-sm border border-[#F0D28E]/60 text-sm focus:outline-none focus:border-[#366848] focus:ring-2 focus:ring-[#366848]/20 transition-all text-[#1F241E] placeholder:text-[#6B7268]/60"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#254631] uppercase tracking-wider mb-1.5">
                Adresse de livraison (Quartier, repère à Cotonou)
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Ex : Haie Vive, en face de la pharmacie..."
                className="w-full px-4 py-3 rounded-xl bg-white/60 backdrop-blur-sm border border-[#F0D28E]/60 text-sm focus:outline-none focus:border-[#366848] focus:ring-2 focus:ring-[#366848]/20 transition-all text-[#1F241E] placeholder:text-[#6B7268]/60"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#254631] uppercase tracking-wider mb-1.5">
                Instructions spéciales (facultatif)
              </label>
              <textarea
                name="notes"
                rows="2"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Ex : Yaourt très frais, livraison souhaitée avant 13h..."
                className="w-full px-4 py-2.5 rounded-xl bg-white/60 backdrop-blur-sm border border-[#F0D28E]/60 text-sm focus:outline-none focus:border-[#366848] focus:ring-2 focus:ring-[#366848]/20 transition-all text-[#1F241E] placeholder:text-[#6B7268]/60"
              />
            </div>

            {/* Bouton de paiement Liquid Glass */}
            <div className="pt-4">
              <LiquidButton
                type="submit"
                disabled={loading}
              >
                <CreditCard className="w-5 h-5 text-[#F0D28E] transition-transform group-hover:scale-110" />
                <span>Payer {new Intl.NumberFormat("fr-FR").format(total)} FCFA via Maketou</span>
                <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
              </LiquidButton>
            </div>

            {/* Garanties */}
            <div className="pt-3 flex items-center justify-center gap-2 text-xs text-[#6B7268] relative z-10">
              <ShieldCheck className="w-4 h-4 text-[#366848]" />
              <span>Transaction 100% sécurisée via Maketou Payments</span>
            </div>
          </form>
        </div>

        {/* Récapitulatif Panier (5 colonnes) — Glassmorphisme doré */}
        <div className="lg:col-span-5 rounded-3xl p-6 sm:p-8 border border-[#F0D28E]/80 shadow-xl bg-[#FFF8E3]/75 backdrop-blur-xl ring-1 ring-white/50">
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#254631] mb-5">
            Détail de la Commande
          </h2>

          <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
            {items.map((item) => (
              <div
                key={item.id}
                className="p-3 rounded-2xl bg-white/70 border border-[#F0D28E]/50 shadow-xs flex items-center gap-3 backdrop-blur-sm"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-14 h-14 rounded-xl object-cover bg-white border border-[#F0D28E]/40"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-serif font-bold text-sm text-[#1F241E] truncate">
                    {item.name}
                  </h4>
                  <p className="text-xs text-[#6B7268]">
                    {new Intl.NumberFormat("fr-FR").format(item.price)} FCFA × {item.quantity}
                  </p>
                </div>
                <span className="font-serif font-bold text-sm text-[#254631] whitespace-nowrap">
                  {new Intl.NumberFormat("fr-FR").format(item.price * item.quantity)} F
                </span>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-[#F0D28E] space-y-2">
            <div className="flex justify-between text-xs text-[#6B7268]">
              <span>Sous-total</span>
              <span>{new Intl.NumberFormat("fr-FR").format(total)} FCFA</span>
            </div>
            <div className="flex justify-between text-xs text-[#6B7268]">
              <span>Frais de livraison</span>
              <span className="text-[#366848] font-semibold">Calculés à la livraison</span>
            </div>
            <div className="flex justify-between text-base font-bold font-serif text-[#254631] pt-3 border-t border-[#F0D28E]">
              <span>Total à régler</span>
              <span className="text-lg text-[#254631]">
                {new Intl.NumberFormat("fr-FR").format(total)} FCFA
              </span>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
