import React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";

const liquidbuttonVariants = cva(
  "inline-flex items-center transition-colors justify-center cursor-pointer gap-2 whitespace-nowrap rounded-2xl text-sm font-medium transition-[color,box-shadow,transform] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-5 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
  {
    variants: {
      variant: {
        default: "bg-[#254631]/80 hover:bg-[#366848]/90 text-white hover:scale-[1.02] active:scale-[0.98] duration-300 transition backdrop-blur-md",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        lg: "h-10 px-6 has-[>svg]:px-4",
        xl: "h-14 px-8 has-[>svg]:px-6",
        xxl: "w-full py-4 px-10 has-[>svg]:px-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "xxl",
    },
  }
);

function LiquidButton({
  className,
  variant,
  size,
  asChild = false,
  children,
  ...props
}) {
  const Comp = asChild ? Slot : "button";

  return (
    <>
      <Comp
        data-slot="button"
        className={cn(
          "relative isolate group",
          liquidbuttonVariants({ variant, size, className })
        )}
        {...props}
      >
        <div className="absolute top-0 left-0 z-0 h-full w-full rounded-2xl 
            shadow-[0_0_6px_rgba(0,0,0,0.1),0_4px_12px_rgba(0,0,0,0.15),inset_3px_3px_1px_-2px_rgba(255,255,255,0.4),inset_-3px_-3px_2px_-2px_rgba(0,0,0,0.85),inset_1px_1px_1px_0px_rgba(255,255,255,0.3),inset_-1px_-1px_1px_0px_rgba(0,0,0,0.5)] 
        transition-all pointer-events-none" />
        
        {/* Filtre de distorsion glassmorphic liquide */}
        <div
          className="absolute top-0 left-0 -z-10 h-full w-full overflow-hidden rounded-2xl pointer-events-none opacity-40 mix-blend-overlay"
          style={{ backdropFilter: 'url("#container-glass")' }}
        />

        <div className="pointer-events-none z-10 flex items-center justify-center gap-2 w-full">
          {children}
        </div>
        <GlassFilter />
      </Comp>
    </>
  );
}

function GlassFilter() {
  return (
    <svg className="hidden">
      <defs>
        <filter
          id="container-glass"
          x="0%"
          y="0%"
          width="100%"
          height="100%"
          colorInterpolationFilters="sRGB"
        >
          {/* Generate turbulent noise for distortion */}
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.05 0.05"
            numOctaves="1"
            seed="1"
            result="turbulence"
          />

          {/* Blur the turbulence pattern slightly */}
          <feGaussianBlur in="turbulence" stdDeviation="2" result="blurredNoise" />

          {/* Displace the source graphic with the noise */}
          <feDisplacementMap
            in="SourceGraphic"
            in2="blurredNoise"
            scale="40"
            xChannelSelector="R"
            yChannelSelector="B"
            result="displaced"
          />

          {/* Apply overall blur on the final result */}
          <feGaussianBlur in="displaced" stdDeviation="4" result="finalBlur" />

          {/* Output the result */}
          <feComposite in="finalBlur" in2="finalBlur" operator="over" />
        </filter>
      </defs>
    </svg>
  );
}

export { LiquidButton, liquidbuttonVariants };
