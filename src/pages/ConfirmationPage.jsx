import React, { useEffect, useState } from "react";
import { useSearchParams, useParams, Link } from "react-router-dom";
import { getCartStatus, generateWhatsAppOrderUrl } from "../services/maketou";
import { useCart } from "../context/CartContext";
import LogoLoader from "../components/LogoLoader";
import { CheckCircle2, AlertTriangle, ArrowRight, MessageSquare, RefreshCw } from "lucide-react";

export default function ConfirmationPage() {
  const [searchParams] = useSearchParams();
  const { cartId: paramCartId } = useParams();
  const cartId = paramCartId || searchParams.get("cartId");

  const { items, total, clearCart } = useCart();

  const [status, setStatus] = useState("checking"); // checking | waiting_payment | completed | payment_failed | abandoned
  const [cartDetails, setCartDetails] = useState(null);

  useEffect(() => {
    if (!cartId) {
      // Pas d'identifiant de panier : mode confirmation standard
      setStatus("completed");
      return;
    }

    let isMounted = true;
    let pollInterval = null;

    const checkStatus = async () => {
      try {
        const data = await getCartStatus(cartId);
        if (!isMounted) return;

        setCartDetails(data);
        const currentStatus = data.status || "waiting_payment";
        setStatus(currentStatus);

        if (currentStatus === "completed") {
          clearCart();
          if (pollInterval) clearInterval(pollInterval);
        }
      } catch (err) {
        console.warn("Erreur vérification statut panier:", err);
        // Si l'API Maketou échoue temporairement, on ne bloque pas le client
        if (isMounted) {
          setStatus("completed"); // mode optimiste pour rassurer le client
        }
      }
    };

    checkStatus();

    // Si en attente de paiement, on vérifie toutes les 4 secondes
    pollInterval = setInterval(() => {
      if (status === "waiting_payment" || status === "checking") {
        checkStatus();
      }
    }, 4000);

    return () => {
      isMounted = false;
      if (pollInterval) clearInterval(pollInterval);
    };
  }, [cartId, clearCart, status]);

  // Génération du lien WhatsApp de confirmation
  const whatsAppUrl = generateWhatsAppOrderUrl({
    items: cartDetails?.items || items,
    total: cartDetails?.total || total,
    cartId: cartId || `MEIYO-${Date.now()}`,
  });

  // 1. Écran de chargement ou waiting_payment avec LogoLoader (reformation du logo secondaire)
  if (status === "checking" || status === "waiting_payment") {
    return (
      <div className="min-h-screen pt-32 pb-24 flex flex-col items-center justify-center px-4">
        <LogoLoader
          message={
            status === "waiting_payment"
              ? "En attente de la validation du paiement..."
              : "Vérification de votre commande..."
          }
          submessage="Validation instantanée avec votre opérateur Mobile Money"
          size="lg"
        />

        {status === "waiting_payment" && (
          <div className="mt-8 text-center max-w-sm mx-auto">
            <p className="text-xs text-[#6B7268] mb-4">
              Veuillez valider l'invite de paiement sur votre téléphone. Cette page s'actualise automatiquement dès validation.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#F0D28E] text-[#254631] text-xs font-semibold hover:bg-[#FFF8E3] shadow-sm"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Actualiser maintenant
            </button>
          </div>
        )}
      </div>
    );
  }

  // 2. Écran d'échec ou abandon
  if (status === "payment_failed" || status === "abandoned") {
    return (
      <div className="pt-36 pb-24 px-4 max-w-md mx-auto text-center">
        <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-5 text-red-600">
          <AlertTriangle className="w-8 h-8" />
        </div>
        <h1 className="font-serif text-3xl font-bold text-[#1F241E] mb-2">
          Le paiement n'a pas abouti
        </h1>
        <p className="text-sm text-[#6B7268] mb-8 leading-relaxed">
          La transaction a été annulée ou a expiré sur votre téléphone. Ne vous inquiétez pas, vos douceurs sont toujours réservées.
        </p>

        <div className="flex flex-col gap-3">
          <Link
            to="/commander"
            className="w-full py-3.5 rounded-full bg-[#254631] text-white font-semibold text-sm hover:bg-[#366848] transition-all shadow-md"
          >
            Réessayer le paiement
          </Link>
          <a
            href={whatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3.5 rounded-full bg-[#FFF8E3] text-[#254631] font-semibold text-sm border border-[#F0D28E] hover:bg-[#F0D28E]/40 transition-all flex items-center justify-center gap-2"
          >
            <MessageSquare className="w-4 h-4 text-[#254631]" />
            Finaliser avec un conseiller WhatsApp
          </a>
        </div>
      </div>
    );
  }

  // 3. Écran de Succès (completed)
  return (
    <div className="pt-32 pb-24 px-4 sm:px-6 max-w-2xl mx-auto text-center">
      {/* Badge de succès */}
      <div className="w-20 h-20 rounded-full bg-[#366848]/10 border-2 border-[#366848] flex items-center justify-center mx-auto mb-6 text-[#366848] shadow-lg animate-bounce">
        <CheckCircle2 className="w-10 h-10" />
      </div>

      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F0D28E]/40 text-[#254631] text-xs font-bold uppercase tracking-wider mb-3">
        Commande Confirmée
      </div>

      <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#254631] mb-3">
        Merci pour votre commande !
      </h1>

      <p className="font-sans text-sm sm:text-base text-[#6B7268] leading-relaxed max-w-lg mx-auto mb-8">
        Votre paiement a été validé avec succès. Notre atelier commence la préparation de vos douceurs artisanales.
      </p>

      {/* Carte récapitulative */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#F0D28E]/60 shadow-sm text-left mb-8">
        <div className="flex items-center justify-between pb-4 border-b border-[#F0D28E]/30 mb-4">
          <span className="text-xs uppercase tracking-wider font-semibold text-[#6B7268]">
            Référence commande
          </span>
          <span className="font-mono text-sm font-bold text-[#254631]">
            #{cartId ? cartId.slice(-8).toUpperCase() : `MEIYO-${Date.now().toString().slice(-6)}`}
          </span>
        </div>

        <p className="text-xs sm:text-sm text-[#4A5568] leading-relaxed mb-6">
          Pour faciliter le suivi de votre livraison en temps réel à Cotonou, nous vous invitons à envoyer votre récapitulatif directement à notre équipe sur WhatsApp :
        </p>

        {/* Bouton WhatsApp de Confirmation */}
        <a
          href={whatsAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-4 rounded-full bg-[#254631] text-white hover:bg-[#366848] font-bold text-sm transition-all shadow-xl hover:scale-[1.02] flex items-center justify-center gap-2.5"
        >
          <MessageSquare className="w-5 h-5 text-[#F0D28E]" />
          <span>Envoyer mon récapitulatif sur WhatsApp</span>
        </a>
      </div>

      <Link
        to="/menu"
        className="inline-flex items-center gap-2 text-sm font-semibold text-[#366848] hover:underline"
      >
        <span>Retourner au menu</span>
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}
