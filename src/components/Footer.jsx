export default function Footer() {
  return (
    <footer
      className="py-16 px-6"
      style={{ background: "var(--mei-green)" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <h3
              className="text-3xl font-bold serif mb-3"
              style={{ color: "var(--mei-cream)" }}
            >
              Mei'yo
            </h3>
            <p
              className="text-sm uppercase tracking-[0.2em] mb-4"
              style={{ color: "var(--mei-yellow)" }}
            >
              Le Goût du Vrai
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "rgba(250,246,237,0.7)" }}>
              Des saveurs authentiques, préparées avec amour et des ingrédients
              locaux. Mei'yo, c'est le goût de la maison, partout où vous allez.
            </p>
          </div>

          {/* Hours */}
          <div>
            <h4
              className="text-lg font-bold serif mb-4"
              style={{ color: "var(--mei-cream)" }}
            >
              Horaires
            </h4>
            <ul className="space-y-2 text-sm" style={{ color: "rgba(250,246,237,0.7)" }}>
              <li>Lundi — Vendredi : 7h00 — 19h00</li>
              <li>Samedi : 8h00 — 16h00</li>
              <li>Dimanche : Fermé</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="text-lg font-bold serif mb-4"
              style={{ color: "var(--mei-cream)" }}
            >
              Contact
            </h4>
            <ul className="space-y-2 text-sm" style={{ color: "rgba(250,246,237,0.7)" }}>
              <li>📞 +227 XX XX XX XX</li>
              <li>📍 Cotonou, Bénin</li>
              <li>
                <a
                  href="https://wa.me/237XXXXXXXXX"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-white transition-colors"
                >
                  Commander sur WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div
          className="mt-12 pt-8 border-t text-center text-xs"
          style={{ borderColor: "rgba(250,246,237,0.15)", color: "rgba(250,246,237,0.4)" }}
        >
          © 2026 Mei'yo — Tous droits réservés. Fait avec ❤️ à Cotonou.
        </div>
      </div>
    </footer>
  );
}
