import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Leaf, Lightbulb, Smile, Heart, Sparkles } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const pillars = [
  {
    icon: Leaf,
    title: "Authenticité",
    text: "Des recettes transmises avec passion, du vrai lait local et aucun conservateur ni sucre raffiné.",
  },
  {
    icon: Lightbulb,
    title: "Originalité",
    text: "Pâte à pastel à base de banane mûre et yaourts aux sirops de fruits infusés au pur jus de canne.",
  },
  {
    icon: Smile,
    title: "Joie",
    text: "Le plaisir simple et réconfortant d'une douceur partagée en famille ou entre amis à Cotonou.",
  },
  {
    icon: Heart,
    title: "Générosité",
    text: "Des portions riches et savoureuses pensées avec soin et amour pour le délice de vos papilles.",
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
          start: "top 85%",
          toggleActions: "play none none none",
        },
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
      });

      gsap.from(textRef.current, {
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.15,
      });

      gsap.from(cardsRef.current?.children || [], {
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="story"
      ref={sectionRef}
      className="py-24 md:py-32 px-4 sm:px-6 bg-[#FFFBF3] relative"
    >
      <div className="max-w-6xl mx-auto">
        {/* En-tête */}
        <div className="text-center mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#366848]/10 text-[#254631] text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#366848]" />
            Notre Philosophie
          </div>
          <h2
            ref={headingRef}
            className="text-3xl sm:text-5xl md:text-6xl font-bold font-serif text-[#254631] mb-6"
          >
            L'Artisanal au Cœur de Cotonou
          </h2>
          <p
            ref={textRef}
            className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed text-[#6B7268] font-sans"
          >
            Mei'yo est née d'une idée simple : réinventer les petites gourmandises du quotidien en douceurs saines, onctueuses et 100% faites maison. De nos yaourts signatures aux pastels à la pâte de banane, nous valorisons avec fierté les trésors du terroir béninois.
          </p>
        </div>

        {/* 4 Valeurs Fondatrices du Brand Board */}
        <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className="rounded-3xl p-6 sm:p-7 text-center bg-white border border-[#F0D28E]/40 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col items-center"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#FFF8E3] border border-[#F0D28E] flex items-center justify-center mb-5 text-[#366848] shadow-inner">
                  <Icon className="w-6 h-6 text-[#366848]" />
                </div>
                <h3 className="text-xl font-bold font-serif text-[#254631] mb-2.5">
                  {p.title}
                </h3>
                <p className="text-xs sm:text-sm leading-relaxed text-[#6B7268] font-sans">
                  {p.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
