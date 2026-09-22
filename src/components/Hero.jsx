import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Hero() {
  const heroRef = useRef(null);
  const headingRef = useRef(null);
  const subRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.from(headingRef.current, {
      y: 80,
      opacity: 0,
      duration: 1.2,
      delay: 0.3,
    })
      .from(
        subRef.current,
        {
          y: 40,
          opacity: 0,
          duration: 0.9,
        },
        "-=0.6"
      )
      .from(
        ctaRef.current,
        {
          y: 30,
          opacity: 0,
          duration: 0.8,
        },
        "-=0.4"
      );
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "var(--mei-sand)" }}
    >
      {/* Decorative gradient orbs */}
      <div
        className="absolute top-10 right-10 w-96 h-96 rounded-full opacity-20 blur-3xl"
        style={{ background: "var(--mei-green)" }}
      />
      <div
        className="absolute bottom-20 left-10 w-80 h-80 rounded-full opacity-15 blur-3xl"
        style={{ background: "var(--mei-yellow)" }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Main heading */}
        <h1
          ref={headingRef}
          className="text-6xl md:text-8xl font-bold serif mb-6 leading-tight"
          style={{ color: "var(--mei-green)" }}
        >
          Le Goût du Vrai
        </h1>

        {/* Subheading */}
        <p
          ref={subRef}
          className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto leading-relaxed"
          style={{ color: "var(--mei-brown)" }}
        >
          Des pastels croustillants, des crêpes moelleuses, et des saveurs authentiques
          préparées avec amour. Découvrez l'essence de la cuisine artisanale.
        </p>

        {/* CTA */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#story"
            className="px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:shadow-xl hover:scale-105"
            style={{
              background: "var(--mei-green)",
              color: "var(--mei-cream)",
            }}
          >
            Notre Histoire
          </a>
          <a
            href="#products"
            className="px-8 py-4 rounded-full text-lg font-semibold border-2 transition-all duration-300 hover:shadow-lg hover:scale-105"
            style={{
              borderColor: "var(--mei-green)",
              color: "var(--mei-green)",
              background: "transparent",
            }}
          >
            Voir les Produits
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--mei-green)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </section>
  );
}
