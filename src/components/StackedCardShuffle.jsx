import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Check, Sparkles } from "lucide-react";

const THEME_COLORS = {
  dark: {
    bgFrom: "#254631",
    bgTo: "#1F241E",
    border: "#366848",
    title: "#FFFBF3",
    description: "#E2E8F0",
  },
  light: {
    bgFrom: "#FFFDF9",
    bgTo: "#F7EED8",
    border: "#D4B96A",
    title: "#254631",
    description: "#3D4A41",
  },
};

export function StackedCardShuffle({
  cardList,
  scale = 1,
  onAddToCart,
}) {
  const [cards, setCards] = useState(cardList);
  const [isDarkMode] = useState(false);

  useEffect(() => {
    setCards(cardList);
  }, [cardList]);

  const handleSwipe = (direction) => {
    setCards((prev) => {
      if (!prev || prev.length <= 1) return prev;
      if (direction === "left") {
        // Move top card to back
        const [first, ...rest] = prev;
        return [...rest, first];
      } else {
        // Move back card to top
        const last = prev[prev.length - 1];
        const rest = prev.slice(0, prev.length - 1);
        return [last, ...rest];
      }
    });
  };

  if (!cards || cards.length === 0) return null;

  return (
    <div
      className="relative flex h-[500px] sm:h-[540px] md:h-[580px] w-full origin-center items-center justify-center overflow-hidden py-4"
      style={{ scale }}
    >
      <AnimatePresence>
        {cards.map((card, i) => (
          <Card
            key={card.id}
            card={card}
            index={i}
            total={cards.length}
            isDarkMode={isDarkMode}
            onSwipe={handleSwipe}
            onAddToCart={onAddToCart}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

export function Card({
  card,
  index,
  total,
  isDarkMode,
  onSwipe,
  onAddToCart,
}) {
  const [added, setAdded] = useState(false);
  const isTop = index === 0;
  
  const theme = isDarkMode ? THEME_COLORS.dark : THEME_COLORS.light;
  const bgFromColor = card.bgFromColor ?? (isDarkMode ? theme.bgFrom : card.lightBgFromColor ?? theme.bgFrom);
  const bgToColor = card.bgToColor ?? (isDarkMode ? theme.bgTo : card.lightBgToColor ?? theme.bgTo);
  const borderColor = card.borderColor ?? (isDarkMode ? theme.border : card.lightBorderColor ?? theme.border);
  const titleTextColor = card.titleTextColor ?? (isDarkMode ? theme.title : card.lightTitleTextColor ?? theme.title);
  const descriptionTextColor = card.descriptionTextColor ?? (isDarkMode ? theme.description : card.lightDescriptionTextColor ?? theme.description);

  const handleAdd = (e) => {
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(card);
      setAdded(true);
      setTimeout(() => setAdded(false), 1200);
    }
  };

  // Stack styling constraints
  const rotation = isTop ? 0 : (index % 2 === 0 ? 3 : -3) * index;
  const yOffset = isTop ? 0 : index * 12;
  const scale = isTop ? 1 : 1 - index * 0.05;

  return (
    <motion.div
      layout
      drag={isTop ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.6}
      onDragEnd={(e, { offset, velocity }) => {
        const swipeConfidenceThreshold = 10000;
        const swipePower = Math.abs(offset.x) * Math.abs(velocity.x);

        if (offset.x < -80 || (offset.x < 0 && swipePower > swipeConfidenceThreshold)) {
          onSwipe("left");
        } else if (offset.x > 80 || (offset.x > 0 && swipePower > swipeConfidenceThreshold)) {
          onSwipe("right");
        }
      }}
      animate={{
        rotateZ: rotation,
        y: yOffset,
        scale: scale,
        zIndex: total - index,
        opacity: isTop ? 1 : Math.max(0.4, 1 - index * 0.25),
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 25,
        mass: 1
      }}
      whileTap={isTop ? { cursor: "grabbing" } : {}}
      className={`absolute grid aspect-[4/5.8] max-w-[320px] sm:max-w-[340px] grid-rows-[auto_1fr_auto] rounded-[2.5rem] p-4 sm:p-5 shadow-2xl shadow-[#254631]/20 select-none ${isTop ? "cursor-grab backdrop-blur-xl" : "pointer-events-none"}`}
      style={{
        width: "min(21rem, calc(100% - 2rem))",
        backgroundImage: isTop ? `radial-gradient(circle at -10% 0%, ${bgFromColor}E6 0%, ${bgToColor}F2 85%)` : `radial-gradient(circle at -10% 0%, ${bgFromColor} 0%, ${bgToColor} 85%)`,
        borderColor: isTop ? borderColor : `${borderColor}40`,
        borderWidth: "1.5px"
      }}
    >
      {/* En-tête : Titre & Badge */}
      <motion.div 
        animate={{ opacity: isTop ? 1 : 0 }} 
        transition={{ duration: 0.2 }}
        className="flex items-start justify-between gap-2 pb-2"
      >
        <div className="min-w-0 flex-1">
          {card.badge && (
            <span className="inline-flex items-center gap-1 rounded-full bg-[#366848] px-2 py-0.5 font-sans text-[10px] font-bold text-white mb-1 shadow-sm">
              <Sparkles className="w-2.5 h-2.5 text-[#F0D28E]" />
              {card.badge}
            </span>
          )}
          <h2
            className="font-serif text-lg sm:text-xl font-bold leading-tight line-clamp-2"
            style={{ color: titleTextColor }}
          >
            {card.title}
          </h2>
        </div>
        {card.price && (
          <span className="font-serif font-bold text-sm sm:text-base text-[#254631] bg-[#F0D28E]/90 px-2.5 py-1 rounded-full whitespace-nowrap shadow-xs border border-[#D4B96A]/40 backdrop-blur-md">
            {new Intl.NumberFormat("fr-FR").format(card.price)} F
          </span>
        )}
      </motion.div>

      {/* Image de la gourmandise */}
      <div className="min-h-0 w-full overflow-hidden rounded-3xl relative shadow-inner bg-black/5 border border-white/20">
        {card.img && (
          <img
            className="w-full h-full object-cover pointer-events-none"
            src={card.img}
            alt={card.title}
          />
        )}
      </div>

      {/* Description et bouton d'action */}
      <motion.div 
        animate={{ opacity: isTop ? 1 : 0, y: isTop ? 0 : 10 }}
        transition={{ duration: 0.2 }}
        className="pt-3"
      >
        <p
          className="font-sans text-xs sm:text-sm line-clamp-2 leading-relaxed"
          style={{ color: descriptionTextColor }}
        >
          {card.desc}
        </p>

        {onAddToCart && (
          <div className="mt-3 flex items-center justify-between gap-2">
            <span className="font-sans text-[11px] text-[#6B7268] italic truncate">
              {card.sub || "Fait maison à Cotonou"}
            </span>
            <button
              onClick={handleAdd}
              disabled={!isTop}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shadow-[0_4px_14px_0_rgba(0,0,0,0.1)] hover:scale-105 active:scale-95 ${
                added
                  ? "bg-[#366848] text-white"
                  : "bg-[#F0D28E] text-[#254631] hover:bg-[#254631] hover:text-white border border-white/40"
              }`}
            >
              {added ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  Ajouté
                </>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5" />
                  Ajouter
                </>
              )}
            </button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

export default StackedCardShuffle;
