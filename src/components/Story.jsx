import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const pillars = [
  {
    icon: "🌿",
    title: "Authenticité",
    text: "Chaque recette est un héritage, transmis de génération en génération. Pas de raccourcis, pas d'artifice.",
  },
  {
    icon: "🤲",
    title: "Artisanat",
    text: "Fait main avec des ingrédients locaux et frais. Le savoir-faire au cœur de chaque bouchée.",
  },
  {
    icon: "💛",
    title: "Générosité",
    text: "Des portions franches, des prix justes. On cuisine pour nourrir, pas pour impressionner.",
  },
];

export default function Story() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const textRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(textRef.current, {
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        delay: 0.2,
      });

      gsap.from(cardsRef.current?.children || [], {
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="story"
      ref={sectionRef}
      className="py-32 px-6"
      style={{ background: "var(--mei-cream)" }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-20">
          <p
            className="text-sm uppercase tracking-[0.3em] font-semibold mb-4"
            style={{ color: "var(--mei-green-soft)" }}
          >
            Notre Histoire
          </p>
          <h2
            ref={headingRef}
            className="text-4xl md:text-6xl font-bold serif mb-8"
            style={{ color: "var(--mei-green)" }}
          >
            La maison des gourmands
          </h2>
          <p
            ref={textRef}
            className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
            style={{ color: "var(--mei-muted)" }}
          >
            Mei'yo est née d'un simple rêve : celui de redonner aux familles les
            saveurs authentiques de leur enfance. Nos produits artisanaux — pastels,
            crêpes, flans et yaourts — sont préparés avec des ingrédients locaux,
            du cœur de notre cuisine à votre table. Depuis notre création, nous
            croyons que le vrai goût se trouve dans la simplicité, la fraîcheur
            et l'amour du métier.
          </p>
        </div>

        {/* Pillars */}
        <div ref={cardsRef} className="grid md:grid-cols-3 gap-8">
          {pillars.map((p) => (
            <div
              key={p.title}
              className="glass rounded-2xl p-8 text-center shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
              style={{ border: "1px solid rgba(27,58,46,0.08)" }}
            >
              <div className="text-4xl mb-5">{p.icon}</div>
              <h3
                className="text-xl font-bold serif mb-3"
                style={{ color: "var(--mei-green)" }}
              >
                {p.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--mei-muted)" }}>
                {p.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
