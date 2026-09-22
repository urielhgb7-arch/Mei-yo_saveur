import { useCart } from "../context/CartContext";
import { useState } from "react";

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const formattedPrice = new Intl.NumberFormat("fr-FR").format(product.price) + " FCFA";

  return (
    <div
      className="group rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
      style={{ background: "white", border: "1px solid rgba(27,58,46,0.06)" }}
    >
      {/* Image */}
      <div className="relative overflow-hidden h-52">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        {product.tags?.includes("best-seller") && (
          <span
            className="absolute top-3 left-3 px-3 py-1 text-[11px] font-bold uppercase tracking-wider rounded-full"
            style={{
              background: "var(--mei-yellow)",
              color: "var(--mei-ink)",
            }}
          >
            ⭐ Best Seller
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-5">
        <p
          className="text-[10px] uppercase tracking-[0.2em] font-semibold mb-1"
          style={{ color: "var(--mei-green-soft)" }}
        >
          {product.category}
        </p>
        <h3
          className="text-lg font-bold serif mb-2"
          style={{ color: "var(--mei-green)" }}
        >
          {product.name}
        </h3>
        <p
          className="text-sm leading-relaxed mb-4 line-clamp-2"
          style={{ color: "var(--mei-muted)" }}
        >
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <span
            className="text-lg font-bold"
            style={{ color: "var(--mei-brown)" }}
          >
            {formattedPrice}
          </span>

          <button
            onClick={handleAdd}
            className="px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 hover:shadow-md"
            style={{
              background: added ? "var(--mei-yellow)" : "var(--mei-green)",
              color: added ? "var(--mei-ink)" : "var(--mei-cream)",
            }}
          >
            {added ? "✓ Ajouté" : "+ Ajouter"}
          </button>
        </div>
      </div>
    </div>
  );
}
