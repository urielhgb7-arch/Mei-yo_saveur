/**
 * Service Client Maketou & Utilitaires de Commande Mei'yo
 */

// Numéro WhatsApp officiel Mei'yo pour le récapitulatif de commande
export const MEIYO_WHATSAPP_NUMBER = "22901000000"; // Format international Bénin (229)

/**
 * Initialise le paiement via le proxy Express
 */
export async function createCheckoutSession({
  customer,
  items,
  total,
  redirectUrl,
}) {
  const payload = {
    // Si l'utilisateur possède un productDocumentId spécifique sur son dashboard Maketou
    productDocumentId: customer.productDocumentId || "meiyo-commande-artisanale",
    email: customer.email,
    firstName: customer.firstName || "",
    lastName: customer.lastName || "",
    phone: customer.phone || "",
    redirectUrl: redirectUrl || `${window.location.origin}/confirmation`,
    customerPrice: total, // Prix dynamique de la commande complète en FCFA
    meta: {
      orderId: `MEIYO-${Date.now()}`,
      items: items.map((i) => ({
        id: i.id,
        name: i.name,
        price: i.price,
        quantity: i.quantity,
      })),
      deliveryAddress: customer.address || "Cotonou",
      deliveryNotes: customer.notes || "",
    },
  };

  const response = await fetch("/api/checkout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.error ||
        data.message ||
        `Erreur Maketou (${response.status}) lors de l'initialisation du paiement.`
    );
  }

  return data;
}

/**
 * Récupère le statut d'un panier Maketou
 */
export async function getCartStatus(cartId) {
  const response = await fetch(`/api/cart/${cartId}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Impossible de vérifier le statut de paiement.");
  }

  return data;
}

/**
 * Génère le lien WhatsApp sécurisé avec le récapitulatif formatté
 */
export function generateWhatsAppOrderUrl({
  items = [],
  total = 0,
  customer = {},
  cartId = "",
}) {
  const lines = items.map(
    (i) =>
      `• *${i.name}* (x${i.quantity}) : ${new Intl.NumberFormat("fr-FR").format(
        i.price * i.quantity
      )} FCFA`
  );

  const messageParts = [
    `*COMMANDE MEI'YO — LE GOÛT DU VRAI*`,
    `----------------------------------------`,
    `*Numéro de Commande :* #${cartId || Date.now()}`,
    `*Statut :* Paiement validé via Maketou`,
    ``,
    `*Client :* ${customer.firstName || ""} ${customer.lastName || ""}`.trim(),
    customer.phone ? `*Téléphone :* ${customer.phone}` : "",
    customer.address ? `*Adresse de livraison :* ${customer.address}` : "",
    ``,
    `*Détail de la commande :*`,
    ...lines,
    `----------------------------------------`,
    `*TOTAL PAYÉ :* ${new Intl.NumberFormat("fr-FR").format(total)} FCFA`,
    ``,
    `_Merci pour votre confiance ! Nous préparons vos douceurs avec amour._`,
  ].filter(Boolean);

  const fullMessage = messageParts.join("\n");
  return `https://wa.me/${MEIYO_WHATSAPP_NUMBER}?text=${encodeURIComponent(
    fullMessage
  )}`;
}
