import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const MAKETOU_API_URL = process.env.MAKETOU_API_URL || "https://api.maketou.net";
const MAKETOU_API_KEY =
  process.env.MAKETOU_API_KEY ||
  "msk_ad1b23569f4887fa5007ee058fa447ceaaf6a8a142beec693e75e9cae2179c0b";

// En-têtes pour sécuriser l'API
const getHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${MAKETOU_API_KEY}`,
});

/**
 * POST /api/checkout
 * Crée un panier de commande sur Maketou et retourne l'URL de redirection sécurisée.
 */
app.post("/api/checkout", async (req, res) => {
  try {
    const {
      productDocumentId,
      email,
      firstName,
      lastName,
      phone,
      redirectUrl,
      customerPrice,
      meta,
    } = req.body;

    if (!email) {
      return res.status(400).json({ error: "L'adresse email est requise." });
    }

    console.log(`[Maketou] Initialisation checkout pour ${email} (${customerPrice || "prix fixe"} FCFA)`);

    // Appel direct à l'API Maketou v1
    const maketouResponse = await fetch(
      `${MAKETOU_API_URL}/api/v1/stores/cart/checkout`,
      {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({
          productDocumentId: productDocumentId || "default",
          email,
          firstName: firstName || "",
          lastName: lastName || "",
          phone: phone || "",
          redirectUrl: redirectUrl || "http://localhost:5173/confirmation",
          customerPrice: customerPrice ? Number(customerPrice) : undefined,
          meta: meta || {},
        }),
      }
    );

    const data = await maketouResponse.json();

    if (!maketouResponse.ok) {
      console.warn("[Maketou Warning] Réponse non-OK:", maketouResponse.status, data);
      return res.status(maketouResponse.status).json(data);
    }

    console.log("[Maketou Succès] Panier créé:", data);
    return res.json(data);
  } catch (error) {
    console.error("[Maketou Error] Erreur lors du checkout:", error);
    return res.status(500).json({
      error: "Erreur de communication avec la plateforme de paiement Maketou.",
      details: error.message,
    });
  }
});

/**
 * GET /api/cart/:cartId
 * Récupère le statut en temps réel d'un panier Maketou
 * Statuts possibles : waiting_payment | completed | payment_failed | abandoned
 */
app.get("/api/cart/:cartId", async (req, res) => {
  try {
    const { cartId } = req.params;

    const maketouResponse = await fetch(
      `${MAKETOU_API_URL}/api/v1/stores/cart/${cartId}`,
      {
        method: "GET",
        headers: getHeaders(),
      }
    );

    const data = await maketouResponse.json();

    if (!maketouResponse.ok) {
      console.warn("[Maketou Status Warning]:", maketouResponse.status, data);
      return res.status(maketouResponse.status).json(data);
    }

    return res.json(data);
  } catch (error) {
    console.error("[Maketou Status Error]:", error);
    return res.status(500).json({
      error: "Impossible de récupérer le statut de paiement.",
      details: error.message,
    });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`[Mei'yo Proxy] Serveur relais Maketou actif sur le port ${PORT}`);
});
