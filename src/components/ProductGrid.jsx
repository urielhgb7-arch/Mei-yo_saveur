import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { products, categories } from "../data/products";
import ProductCard from "./ProductCard";

gsap.registerPlugin(ScrollTrigger);

export default function ProductGrid() {
  const [activeCat, setActiveCat] = useState("all");
  const sectionRef = useRef(null);
  const cardsRef = useRef(null);

  const filtered =
    activeCat === "all"
      ? products
      : products.filter((p) => p.category === activeCat);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current?.querySelectorAll(".section-title, .section-sub"), {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // re-animate cards on filter change
  useEffect(() => {
    gsap.fromTo(
      cardsRef.current?.children || [],
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: "power3.out" }
    );
  }, [activeCat]);

  return (
    <section
      id="products"
      ref={sectionRef}
      className="py-24 px-6"
      style={{ background: "var(--mei-sand)" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <p
            className="section-sub text-sm uppercase tracking-[0.3em] font-semibold mb-3"
            style={{ color: "var(--mei-green-soft)" }}
          >
            Nos Produits
          </p>
          <h2
            className="section-title text-4xl md:text-5xl font-bold serif mb-4"
            style={{ color: "var(--mei-green)" }}
          >
            Tout fait maison, tout pour vous
          </h2>
          <p
            className="section-sub text-base max-w-2xl mx-auto"
            style={{ color: "var(--mei-muted)" }}
          >
            Chaque produit est préparé à la main, avec les meilleurs ingrédients
            locaux. Choisissez, ajoutez au panier — livraison le jour même.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveCat(c.id)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeCat === c.id ? "shadow-md scale-105" : "hover:shadow-sm"
              }`}
              style={{
                background:
                  activeCat === c.id ? "var(--mei-green)" : "white",
                color:
                  activeCat === c.id
                    ? "var(--mei-cream)"
                    : "var(--mei-green)",
                border: `1px solid ${
                  activeCat === c.id ? "transparent" : "rgba(27,58,46,0.12)"
                }`,
              }}
            >
              {c.name}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div
          ref={cardsRef}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
