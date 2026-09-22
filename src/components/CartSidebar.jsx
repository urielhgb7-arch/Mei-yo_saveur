import { useEffect, useRef } from "react";
import { useCart } from "../context/CartContext";
import gsap from "gsap";

export default function CartSidebar() {
  const { items, removeItem, updateQuantity, total, isOpen, setIsOpen } = useCart();
  const backdropRef = useRef(null);
  const panelRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      gsap.to(backdropRef.current, { opacity: 1, duration: 0.3, ease: "power2.out" });
      gsap.fromTo(
        panelRef.current,
        { x: "100%" },
        { x: "0%", duration: 0.4, ease: "power3.out" }
      );
    } else {
      gsap.to(backdropRef.current, { opacity: 0, duration: 0.25 });
      gsap.to(panelRef.current, { x: "100%", duration: 0.3 });
    }
  }, [isOpen]);

  const handleCheckout = () => {
    if (items.length === 0) return;

    // Build WhatsApp message
    const lines = items.map(
      (i) =>
        `• ${i.name} x${i.quantity} — ${new Intl.NumberFormat("fr-FR").format(
          i.price * i.quantity
        )} FCFA`
    );
    const totalLine = `\n*Total : ${new Intl.NumberFormat("fr-FR").format(total)} FCFA*`;
    const msg = `Bonjour Mei'yo 👋\nJe souhaite commander :\n\n${lines.join("\n")}${totalLine}`;
    const url = `https://wa.me/237XXXXXXXXX?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        ref={backdropRef}
        className="fixed inset-0 bg-black/40 z-50 opacity-0"
        onClick={() => setIsOpen(false)}
      />

      {/* Panel */}
      <aside
        ref={panelRef}
        className="fixed top-0 right-0 h-full w-full sm:w-96 z-50 shadow-2xl flex flex-col translate-x-full"
        style={{ background: "var(--mei-cream)" }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between p-5 border-b"
          style={{ borderColor: "rgba(27,58,46,0.1)" }}
        >
          <h2
            className="text-xl font-bold serif"
            style={{ color: "var(--mei-green)" }}
          >
            Votre Panier
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="w-8 h-8 flex items-center justify-center rounded-full transition-colors hover:bg-black/5"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--mei-green)" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-5">
          {items.length === 0 ? (
            <p className="text-center text-sm" style={{ color: "var(--mei-muted)" }}>
              Votre panier est vide.
            </p>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-3 rounded-xl"
                  style={{ background: "white", border: "1px solid rgba(27,58,46,0.08)" }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3
                      className="text-sm font-semibold mb-1"
                      style={{ color: "var(--mei-green)" }}
                    >
                      {item.name}
                    </h3>
                    <p className="text-xs mb-2" style={{ color: "var(--mei-muted)" }}>
                      {new Intl.NumberFormat("fr-FR").format(item.price)} FCFA
                    </p>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-6 h-6 flex items-center justify-center rounded-full text-sm font-bold transition-colors"
                        style={{
                          background: "var(--mei-sand)",
                          color: "var(--mei-green)",
                        }}
                      >
                        −
                      </button>
                      <span className="text-sm font-semibold w-6 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-6 h-6 flex items-center justify-center rounded-full text-sm font-bold transition-colors"
                        style={{
                          background: "var(--mei-sand)",
                          color: "var(--mei-green)",
                        }}
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="ml-auto text-xs opacity-60 hover:opacity-100 transition-opacity"
                        style={{ color: "var(--mei-muted)" }}
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div
            className="p-5 border-t"
            style={{ borderColor: "rgba(27,58,46,0.1)" }}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-semibold" style={{ color: "var(--mei-muted)" }}>
                Total
              </span>
              <span
                className="text-2xl font-bold serif"
                style={{ color: "var(--mei-green)" }}
              >
                {new Intl.NumberFormat("fr-FR").format(total)} FCFA
              </span>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full py-3 rounded-full text-base font-semibold transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
              style={{
                background: "var(--mei-green)",
                color: "var(--mei-cream)",
              }}
            >
              Commander sur WhatsApp
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
