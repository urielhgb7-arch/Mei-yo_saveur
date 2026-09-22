import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    text: "Les pastels de Mei'yo me rappellent ceux de ma grand-mère. C'est exactement ça — le goût du vrai.",
    author: "Amina K.",
    role: "Cliente fidèle",
  },
  {
    text: "Le flan à la vanille est une pure merveille. On ne peut plus s'en passer dans notre foyer.",
    author: "Ibrahim D.",
    role: "Client depuis 2024",
  },
  {
    text: "Le baobab au lait, c'est de l'Afrique dans un verre. Chaque gorgée est un voyage.",
    author: "Fatima S.",
    role: "Cliente régulière",
  },
];

export default function Testimonials() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".testimonial-card",
        { y: 40, opacity: 0 },
        {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.15,
          ease: "power3.out",
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 px-6"
      style={{ background: "var(--mei-cream)" }}
    >
      <div className="max-w-6xl mx-auto text-center">
        <p
          className="text-sm uppercase tracking-[0.3em] font-semibold mb-3"
          style={{ color: "var(--mei-green-soft)" }}
        >
          Témoignages
        </p>
        <h2
          className="text-4xl md:text-5xl font-bold serif mb-14"
          style={{ color: "var(--mei-green)" }}
        >
          Ce qu'ils disent de nous
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="testimonial-card glass rounded-2xl p-8 text-left shadow-sm hover:shadow-xl transition-all duration-500"
              style={{ border: "1px solid rgba(27,58,46,0.08)" }}
            >
              <div
                className="text-3xl mb-4 serif"
                style={{ color: "var(--mei-yellow)" }}
              >
                "
              </div>
              <p
                className="text-sm leading-relaxed mb-6"
                style={{ color: "var(--mei-muted)" }}
              >
                {t.text}
              </p>
              <div>
                <p
                  className="text-sm font-bold"
                  style={{ color: "var(--mei-green)" }}
                >
                  {t.author}
                </p>
                <p className="text-xs" style={{ color: "var(--mei-muted)" }}>
                  {t.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
