import React from "react";
import { Link } from "react-router-dom";
import { Leaf, Lightbulb, Smile, Heart, Target, Compass, Sparkles, ArrowRight } from "lucide-react";

export default function StoryPage() {
  return (
    <div className="pt-28 pb-24 px-4 sm:px-6 max-w-5xl mx-auto">
      {/* 1. En-tête */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#366848]/10 text-[#254631] text-xs font-bold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5 text-[#366848]" />
          L'Aventure Mei'yo
        </div>
        <h1 className="font-serif text-4xl sm:text-6xl font-bold text-[#1F241E] leading-tight">
          De la Passion du Goût à l'Artisanat Vrai
        </h1>
        <p className="mt-4 font-sans text-base sm:text-lg text-[#6B7268] leading-relaxed">
          Découvrez la genèse d'une maison béninoise qui allie authenticité du terroir et gourmandise sans compromis.
        </p>
      </div>

      {/* 2. Bloc Histoire Principale */}
      <div className="rounded-3xl bg-white border border-[#F0D28E]/50 p-8 sm:p-12 shadow-sm mb-14 relative overflow-hidden">
        <div className="max-w-3xl mx-auto space-y-6 text-[#4A5568] leading-relaxed font-sans text-base sm:text-lg">
          <p className="font-serif text-2xl sm:text-3xl text-[#254631] font-bold leading-snug">
            « Mei'yo est née d'une étincelle : le bonheur partagé d'une gourmandise faite maison. »
          </p>

          <p>
            Depuis mes années de lycée, j'ai toujours eu à cœur de préparer et commercialiser de petites gourmandises pour le plus grand plaisir de mes camarades. Ce qui n'était au départ qu'une douce passion est devenu une véritable vocation : offrir des saveurs qui réchauffent le cœur.
          </p>

          <p>
            En <strong>décembre 2025</strong>, nous avons franchi le pas décisif en donnant une identité officielle et affirmée à nos créations. Ainsi est née <strong>Mei'yo</strong>, avec pour fil conducteur une promesse simple et sans concession : <em>le goût du vrai</em>.
          </p>

          <p>
            Aujourd'hui, nous vous proposons une variété de douceurs pensées avec un soin méticuleux et préparées avec amour : nos <strong>yaourts signatures</strong> (dont le fameux bissap-pastèque au jus de canne), nos <strong>pastels à la pâte de banane</strong>, nos <strong>crêpes moelleuses</strong> et nos <strong>flans fondants</strong>.
          </p>
        </div>
      </div>

      {/* 3. Mission & Vision */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div className="rounded-3xl bg-[#FFF8E3] border border-[#F0D28E] p-8 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-white border border-[#F0D28E] flex items-center justify-center mb-5 text-[#366848]">
            <Compass className="w-6 h-6 text-[#366848]" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-[#254631] mb-3">
            Notre Mission
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#4A5568] leading-relaxed">
            Régaler au quotidien notre clientèle avec des douceurs saines, onctueuses et 100% faites maison. Nous valorisons les matières premières locales — le lait frais, le baobab sauvage, l'hibiscus et la canne à sucre — dans des formats pratiques et résolument gourmands.
          </p>
        </div>

        <div className="rounded-3xl bg-[#254631] text-white p-8 shadow-md">
          <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mb-5 text-[#F0D28E]">
            <Target className="w-6 h-6 text-[#F0D28E]" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-[#FFFBF3] mb-3">
            Notre Vision
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#A7C0A1] leading-relaxed">
            Devenir d'ici 3 ans, avec audace, rigueur et excellence, la marque artisanale de référence des desserts lactés et pâtisseries fraîches au Bénin. Une maison qui fait rimer « plaisir » avec « local et naturel ».
          </p>
        </div>
      </div>

      {/* 4. Les 4 Piliers de Valeurs */}
      <div className="text-center mb-10">
        <h2 className="font-serif text-3xl font-bold text-[#254631] mb-2">
          Nos 4 Valeurs Cardinaux
        </h2>
        <p className="font-sans text-sm text-[#6B7268]">
          Ce qui guide chaque pot de yaourt et chaque fournée de pastels.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        <div className="p-6 rounded-2xl bg-white border border-[#F0D28E]/40 text-center">
          <Leaf className="w-8 h-8 text-[#366848] mx-auto mb-3" />
          <h3 className="font-serif font-bold text-lg text-[#254631] mb-1">Authenticité</h3>
          <p className="text-xs text-[#6B7268]">Des ingrédients vrais, sans conservateurs ni artifices.</p>
        </div>
        <div className="p-6 rounded-2xl bg-white border border-[#F0D28E]/40 text-center">
          <Lightbulb className="w-8 h-8 text-[#366848] mx-auto mb-3" />
          <h3 className="font-serif font-bold text-lg text-[#254631] mb-1">Originalité</h3>
          <p className="text-xs text-[#6B7268]">La pâte de pastel à la banane et les sirops de fruits uniques.</p>
        </div>
        <div className="p-6 rounded-2xl bg-white border border-[#F0D28E]/40 text-center">
          <Smile className="w-8 h-8 text-[#366848] mx-auto mb-3" />
          <h3 className="font-serif font-bold text-lg text-[#254631] mb-1">Joie</h3>
          <p className="text-xs text-[#6B7268]">Le plaisir franc et communicatif de se régaler.</p>
        </div>
        <div className="p-6 rounded-2xl bg-white border border-[#F0D28E]/40 text-center">
          <Heart className="w-8 h-8 text-[#366848] mx-auto mb-3" />
          <h3 className="font-serif font-bold text-lg text-[#254631] mb-1">Générosité</h3>
          <p className="text-xs text-[#6B7268]">Des portions copieuses, préparées comme pour nos proches.</p>
        </div>
      </div>

      {/* 5. CTA vers le Menu */}
      <div className="text-center pt-8 border-t border-[#F0D28E]/40">
        <Link
          to="/menu"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#254631] text-white font-sans text-sm font-semibold hover:bg-[#366848] transition-all shadow-lg hover:scale-105"
        >
          Découvrir nos créations au menu
          <ArrowRight className="w-4 h-4 text-[#F0D28E]" />
        </Link>
      </div>
    </div>
  );
}
