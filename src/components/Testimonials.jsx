import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Quote, Star } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    text: "Le yaourt bissap-pastèque est une révélation absolue ! L'onctuosité du lait avec la touche acidulée du bissap et le goût doux de la canne, c'est du génie.",
    author: "Amina K.",
    role: "Cotonou (Haie Vive)",
    product: "Yaourt Signature Bissap-Pastèque",
  },
  {
    text: "La pâte des pastels à la banane change tout : c'est croustillant, légèrement doux et la farce au bœuf épicé et fromage est ultra généreuse.",
    author: "Marc-Aurèle T.",
    role: "Client fidèle",
    product: "Pastels Bœuf & Fromage",
  },
  {
    text: "Le flan coco au caramel ambré me rappelle exactement les goûters de mon enfance. Une texture veloutée incomparable, 100% fait maison.",
    author: "Sophie D.",
    role: "Cadjehoun",
    product: "Flan Coco & Caramel",
  },
];

export default function Testimonials() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".testimonial-card",
        { y: 35, opacity: 0 },
        {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
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
      className="py-24 md:py-32 px-4 sm:px-6 bg-[#FFF8E3]/50 relative"
    >
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-xs uppercase tracking-[0.25em] font-semibold text-[#366848] mb-3">
          Témoignages Gourmands
        </p>
        <h2 className="text-3xl sm:text-5xl font-bold font-serif text-[#254631] mb-14">
          Leurs Papilles en Parlent
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="testimonial-card rounded-3xl p-7 text-left bg-white border border-[#F0D28E]/40 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-9 h-9 rounded-full bg-[#FFF8E3] border border-[#F0D28E] flex items-center justify-center text-[#366848]">
                    <Quote className="w-4 h-4 fill-[#F0D28E] text-[#366848]" />
                  </div>
                  <div className="flex gap-0.5 text-[#F0D28E]">
                    {[...Array(5)].map((_, idx) => (
                      <Star key={idx} className="w-3.5 h-3.5 fill-[#F0D28E]" />
                    ))}
                  </div>
                </div>

                <p className="text-xs sm:text-sm leading-relaxed text-[#4A5568] mb-6 italic">
                  "{t.text}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#F0D28E]/30">
                <p className="text-sm font-bold font-serif text-[#254631]">
                  {t.author}
                </p>
                <div className="flex items-center justify-between mt-0.5">
                  <span className="text-xs text-[#6B7268]">{t.role}</span>
                  <span className="text-[10px] text-[#366848] font-semibold bg-[#FFF8E3] px-2 py-0.5 rounded-full">
                    {t.product}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
