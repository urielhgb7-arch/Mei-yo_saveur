import React, { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * LogoLoader — Animation de reformation du logo secondaire Mei'yo
 * Utilisé pour :
 * - Les écrans de chargement globaux
 * - Le statut waiting_payment lors du paiement Maketou
 * - Les transitions fluides entre pages
 */
export default function LogoLoader({
  message = "Préparation de vos douceurs...",
  submessage = "Le goût du vrai prend du temps",
  size = "md", // sm, md, lg
}) {
  const containerRef = useRef(null);
  const glowRef = useRef(null);

  const sizeClasses = {
    sm: "w-20 h-20",
    md: "w-36 h-36",
    lg: "w-52 h-52",
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline infinie de décomposition et reformation douce
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.6 });

      // État initial éclaté
      gsap.set(".logo-part-outer", { scale: 0.6, opacity: 0, rotate: -30, transformOrigin: "center center" });
      gsap.set(".logo-part-m", { y: -25, opacity: 0, scale: 0.7, transformOrigin: "center center" });
      gsap.set(".logo-part-leaf", { scale: 0, opacity: 0, x: (i) => (i % 2 === 0 ? -20 : 20), y: (i) => (i % 2 === 0 ? -15 : 15), transformOrigin: "center center" });
      gsap.set(glowRef.current, { scale: 0.8, opacity: 0.2 });

      // Phase 1 : Assemblage / Reformation
      tl.to(glowRef.current, {
        scale: 1.2,
        opacity: 0.7,
        duration: 1.2,
        ease: "power2.out",
      })
      .to(".logo-part-outer", {
        scale: 1,
        opacity: 1,
        rotate: 0,
        duration: 1,
        ease: "elastic.out(1, 0.6)",
        stagger: 0.08,
      }, "-=0.9")
      .to(".logo-part-m", {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.9,
        ease: "back.out(1.8)",
      }, "-=0.7")
      .to(".logo-part-leaf", {
        scale: 1,
        opacity: 1,
        x: 0,
        y: 0,
        duration: 0.8,
        ease: "back.out(2)",
        stagger: 0.06,
      }, "-=0.6")
      // Phase 2 : Respiration / Éclat doré
      .to(containerRef.current, {
        scale: 1.04,
        duration: 0.8,
        ease: "sine.inOut",
        yoyo: true,
        repeat: 1,
      })
      // Phase 3 : Dissolution douce pour relancer la boucle
      .to([".logo-part-leaf", ".logo-part-m", ".logo-part-outer"], {
        opacity: 0.3,
        scale: 0.92,
        duration: 0.7,
        ease: "power2.inOut",
        stagger: 0.04,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-10 px-4 text-center">
      <div className="relative flex items-center justify-center">
        {/* Halo lumineux d'ambiance */}
        <div
          ref={glowRef}
          className="absolute -inset-4 rounded-full bg-gradient-to-tr from-[#366848]/20 via-[#F0D28E]/30 to-[#366848]/10 blur-xl pointer-events-none"
        />

        {/* SVG Logo Secondaire Mei'yo vectoriel décomposé */}
        <div ref={containerRef} className={`relative z-10 ${sizeClasses[size] || sizeClasses.md}`}>
          <svg
            viewBox="0 0 720 511"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full drop-shadow-md"
          >
            {/* 1. Cercle & Éléments Extérieurs */}
            <g className="logo-part-outer">
              <path
                d="M361.772 126.775C369.369 125.339 376.685 130.35 378.088 137.95C379.491 145.549 374.449 152.842 366.841 154.214C359.279 155.578 352.037 150.573 350.64 143.018C349.244 135.464 354.22 128.202 361.772 126.775Z"
                fill="#366848"
              />
              <path
                d="M386.177 341.707C386.311 359.661 384.993 369.059 367.056 375.908C365.766 378.783 358.689 389.977 358.33 391.098C359.29 391.077 359.951 390.479 360.886 389.927L361.466 390.448C353.45 395.976 354.952 400.235 351.561 403.223C350.292 403.416 350.863 403.539 349.788 402.868C349.712 402.565 349.636 402.26 349.559 401.957C351.094 398.668 353.355 395.937 354.821 392.504C354.586 390.855 354.178 389.063 353.841 387.418C342.215 379.068 344.269 365.288 348.347 353.268C359.859 363.538 361.494 373.863 355.345 387.513C355.693 388.831 355.982 390.191 356.277 391.523C357.138 389.527 364.975 377.469 366.493 375.778C360.309 358.445 373.177 350.306 386.177 341.707Z"
                fill="#366848"
              />
              <path
                d="M520.91 228.637C522.116 228.693 545.713 249.444 543.98 252.362C542.366 252.575 542.398 252.279 540.664 251.573C540.074 260.006 540.612 269.466 540.19 278.119C511.671 281.919 534.829 263.529 521.181 260.907C518.903 261.158 518.031 262.128 516.424 263.633C515.271 269.059 516.414 272.301 517.504 277.782C514.403 278.322 505.656 279.077 502.984 277.696C501.919 274.949 502.39 255.591 502.446 251.158C501.054 252.011 500.558 252.391 498.923 252.775L498.28 252.191C498.881 247.782 513.014 237.015 516.139 233.013C516.892 232.051 519.845 229.331 520.91 228.637Z"
                fill="#366848"
              />
            </g>

            {/* 2. Feuilles et courbures organiques */}
            <g className="logo-part-leaf">
              <path
                d="M452.732 209.885C453.477 207.72 453.449 205.465 453.902 203.242C456.254 191.723 469.487 188.101 479.359 186.27C475.33 194.913 473.4 203.885 463.089 208.051C459.338 209.567 455.133 208.628 453.248 210.54L452.732 209.885Z"
                fill="#A7C0A1"
              />
              <path
                d="M439.995 220.282C431.877 214.599 435.783 200.67 440.374 194.134C441.243 192.898 441.889 191.473 443.468 191.114C444.684 192.035 446.562 199.87 446.829 201.713C448.14 210.749 445.584 213.572 440.807 220.176L439.995 220.282Z"
                fill="#366848"
              />
              <path
                d="M206.023 239.358C210.024 233.479 213.975 231.524 220.965 232.687C222.981 233.52 223.503 233.695 225.086 235.281C231.504 240.353 230.806 248.268 227.494 254.858C223.691 262.414 212.046 271.025 206.107 278.159C200.488 271.099 192.435 265.256 186.46 257.66C173.614 241.326 193.65 221.763 206.023 239.358Z"
                fill="#A7C0A1"
              />
              <path
                d="M444.459 221.809C454.507 216.562 457.826 212.126 470.236 216.426C472.637 217.259 475.355 218.043 477.904 219.059C471.09 223.482 464.003 227.434 455.295 225.905C452.735 225.454 447.827 222.421 445.729 222.496L444.459 221.809Z"
                fill="#F0D28E"
              />
            </g>

            {/* 3. La lettre M emblématique centrale */}
            <g className="logo-part-m">
              <path
                d="M272.422 220.111C275.044 219.947 280.738 219.434 282.811 220.71C286.436 222.942 288.666 231.619 289.977 235.346C292.628 242.788 295.195 250.259 297.678 257.759C299.134 252.999 310.203 223.428 312.287 221.251C314.301 219.149 320.037 219.884 322.725 219.935C321.575 221.33 320.958 222.298 319.988 223.83C319.917 225.459 319.794 230.511 319.986 232.016C320.855 238.797 319 265.953 322.324 270.291C322.934 270.523 323.339 270.703 323.921 270.976L323.931 271.587C322.882 272.363 321.415 272.614 320.133 272.736C318.137 272.927 315.572 272.913 314.017 271.465C311.149 268.793 312.017 241.433 311.98 236.258C311.83 234.247 312.013 231.479 312.089 229.408C311.694 230.844 311.198 232.106 310.66 233.494C306.526 244.172 302.835 255.023 298.67 265.685C297.78 267.964 296.814 269.304 294.107 268.832C291.252 266.915 282.506 236.906 279.361 230.582C279.879 242.118 278.295 257.07 279.732 268.559C279.927 270.118 282.893 271.481 284.411 272.304C281.969 272.622 274.073 273.06 271.994 272.122C276.546 265.071 275.445 261.935 275.58 253.867L275.934 223.434C273.998 222.313 273.025 222.093 272.422 220.111Z"
                fill="#254631"
              />
              <path
                d="M341.074 234.167L341.404 234.12C347.173 233.35 353.598 235.585 354.262 242.214C354.611 245.483 353.598 248.751 351.457 251.247C347.855 255.511 342.193 257.315 336.795 257.766C337.753 263.204 337.922 263.776 341.454 267.928C350.044 270.595 353.036 266.027 356.783 259.201C359.74 262.638 353.703 270.264 350.282 271.557C331.665 278.592 324.12 259.529 330.268 244.616C332.57 239.034 335.617 236.405 341.074 234.167Z"
                fill="#366848"
              />
            </g>
          </svg>
        </div>
      </div>

      {/* Messages typographiés avec Fraunces & Plus Jakarta Sans */}
      {message && (
        <p className="mt-5 font-serif text-lg md:text-xl text-[#254631] font-semibold tracking-wide">
          {message}
        </p>
      )}
      {submessage && (
        <p className="mt-1 font-sans text-xs md:text-sm text-[#6B7268] tracking-wider uppercase font-medium">
          {submessage}
        </p>
      )}
    </div>
  );
}
