import React, { useId } from "react";

export type IconTheme = "gradient" | "mono-white" | "mono-dark";
export type SquircleVariant = "dark" | "light" | "gradient" | "mono";
export type LogoVariant = "horizontal" | "stacked" | "icon";
export type LogoTheme = "dark" | "light" | "mono-dark" | "mono-light";
export type LogoSize = "sm" | "md" | "lg" | "xl";

export const BRAND_COLORS = {
  midnight: "#0B1020",
  blue: "#3B82F6",
  violet: "#7C3AED",
  magenta: "#D946EF",
  cyan: "#06D6D6",
  white: "#FFFFFF",
} as const;

export const SYMBOL_PATHS = [
  "M 18 42 L 36 24 L 64 52 L 82 34",
  "M 18 56 L 36 38 L 64 66 L 82 48",
  "M 18 70 L 36 52",
  "M 25 77 L 36 66",
  "M 64 38 L 82 20",
  "M 64 24 L 75 13",
] as const;

export interface NevroraIconProps {
  theme?: IconTheme;
  withSquircle?: boolean;
  squircleVariant?: SquircleVariant;
  size?: number;
  className?: string;
}

export function NevroraIcon({
  theme = "gradient",
  withSquircle = false,
  squircleVariant = "dark",
  size = 40,
  className = "",
}: NevroraIconProps) {
  const uid = useId().replace(/:/g, "");
  const gradId = `nevrora-grad-${uid}`;
  const appGradId = `nevrora-app-grad-${uid}`;

  const strokeColor =
    theme === "mono-white"
      ? BRAND_COLORS.white
      : theme === "mono-dark"
        ? BRAND_COLORS.midnight
        : `url(#${gradId})`;

  const symbolStroke =
    withSquircle &&
    (squircleVariant === "gradient" || squircleVariant === "mono")
      ? BRAND_COLORS.white
      : strokeColor;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradId} x1="18%" y1="82%" x2="82%" y2="18%">
          <stop offset="0%" stopColor={BRAND_COLORS.magenta} />
          <stop offset="32%" stopColor={BRAND_COLORS.violet} />
          <stop offset="68%" stopColor={BRAND_COLORS.blue} />
          <stop offset="100%" stopColor={BRAND_COLORS.cyan} />
        </linearGradient>
        <linearGradient id={appGradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={BRAND_COLORS.blue} />
          <stop offset="50%" stopColor={BRAND_COLORS.violet} />
          <stop offset="100%" stopColor={BRAND_COLORS.magenta} />
        </linearGradient>
      </defs>

      {withSquircle && squircleVariant === "dark" && (
        <rect
          x="2"
          y="2"
          width="96"
          height="96"
          rx="22"
          fill={BRAND_COLORS.midnight}
          stroke={`url(#${gradId})`}
          strokeWidth="2.5"
        />
      )}
      {withSquircle && squircleVariant === "light" && (
        <rect
          x="2"
          y="2"
          width="96"
          height="96"
          rx="22"
          fill={BRAND_COLORS.white}
          stroke="#E2E8F0"
          strokeWidth="2.5"
        />
      )}
      {withSquircle && squircleVariant === "gradient" && (
        <rect
          x="2"
          y="2"
          width="96"
          height="96"
          rx="22"
          fill={`url(#${appGradId})`}
        />
      )}
      {withSquircle && squircleVariant === "mono" && (
        <rect
          x="2"
          y="2"
          width="96"
          height="96"
          rx="22"
          fill={BRAND_COLORS.midnight}
          stroke="rgba(255,255,255,0.28)"
          strokeWidth="2.5"
        />
      )}

      <g
        transform={
          withSquircle
            ? "translate(14, 14) scale(0.72) translate(0, 5)"
            : "translate(0, 5)"
        }
        stroke={symbolStroke}
        strokeWidth="6.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {SYMBOL_PATHS.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>
    </svg>
  );
}

export interface NevroraLogoProps {
  variant?: LogoVariant;
  theme?: LogoTheme;
  size?: LogoSize;
  showDivider?: boolean;
  subtitle?: string;
  className?: string;
}

const SIZE_MAP: Record<
  LogoSize,
  {
    icon: number;
    stackedIcon: number;
    title: string;
    subtitle: string;
    dividerHeight: string;
    gap: string;
  }
> = {
  sm: {
    icon: 30,
    stackedIcon: 44,
    title: "text-base",
    subtitle: "text-[9px] tracking-[0.34em]",
    dividerHeight: "h-7",
    gap: "gap-2.5",
  },
  md: {
    icon: 38,
    stackedIcon: 60,
    title: "text-lg sm:text-xl",
    subtitle: "text-[10px] tracking-[0.38em]",
    dividerHeight: "h-9",
    gap: "gap-3.5",
  },
  lg: {
    icon: 50,
    stackedIcon: 78,
    title: "text-2xl",
    subtitle: "text-xs tracking-[0.42em]",
    dividerHeight: "h-12",
    gap: "gap-4",
  },
  xl: {
    icon: 64,
    stackedIcon: 96,
    title: "text-3xl sm:text-4xl",
    subtitle: "text-sm tracking-[0.45em]",
    dividerHeight: "h-14",
    gap: "gap-5",
  },
};

export function NevroraLogo({
  variant = "horizontal",
  theme = "dark",
  size = "md",
  showDivider = true,
  subtitle = "VENTURES",
  className = "",
}: NevroraLogoProps) {
  const s = SIZE_MAP[size];
  const isLightBg = theme === "light" || theme === "mono-light";
  const isMono = theme === "mono-dark" || theme === "mono-light";

  const iconTheme: IconTheme = isMono
    ? isLightBg
      ? "mono-dark"
      : "mono-white"
    : "gradient";

  const primaryTextClass = isLightBg ? "text-[#0B1020]" : "text-white";
  const subtitleTextClass = isMono
    ? isLightBg
      ? "text-[#0B1020]/80"
      : "text-white/80"
    : isLightBg
      ? "text-[#3B82F6]"
      : "text-[#06D6D6]";
  const dividerClass = isLightBg ? "bg-[#0B1020]/20" : "bg-white/20";

  if (variant === "icon") {
    return (
      <span className={`inline-flex items-center justify-center ${className}`}>
        <NevroraIcon theme={iconTheme} size={s.icon} />
      </span>
    );
  }

  if (variant === "stacked") {
    return (
      <div
        className={`inline-flex flex-col items-center text-center select-none ${className}`}
      >
        <NevroraIcon
          theme={iconTheme}
          size={s.stackedIcon}
          className="mb-3 transition-transform duration-300 group-hover:scale-105"
        />
        <span
          className={`font-['Space_Grotesk',sans-serif] font-bold uppercase leading-none tracking-[0.08em] ${s.title} ${primaryTextClass}`}
        >
          NEVRORA
        </span>
        <span
          className={`mt-1.5 font-['Space_Grotesk',sans-serif] font-semibold uppercase leading-none ${s.subtitle} ${subtitleTextClass}`}
        >
          {subtitle}
        </span>
      </div>
    );
  }

  return (
    <div
      className={`inline-flex items-center select-none ${s.gap} ${className}`}
    >
      <NevroraIcon
        theme={iconTheme}
        size={s.icon}
        className="shrink-0 transition-transform duration-300 group-hover:scale-105"
      />
      {showDivider && (
        <span
          className={`w-px ${s.dividerHeight} ${dividerClass} shrink-0`}
          aria-hidden="true"
        />
      )}
      <div className="flex flex-col justify-center">
        <span
          className={`font-['Space_Grotesk',sans-serif] font-bold uppercase leading-none tracking-[0.08em] ${s.title} ${primaryTextClass}`}
        >
          NEVRORA
        </span>
        <span
          className={`mt-1 font-['Space_Grotesk',sans-serif] font-semibold uppercase leading-none ${s.subtitle} ${subtitleTextClass}`}
        >
          {subtitle}
        </span>
      </div>
    </div>
  );
}
