"use client";

import React from "react";
import Link from "next/link";
import { BRAND_COLORS, SYMBOL_PATHS } from "../brand/NevroraLogo";

export function ConstellationFallback() {
  return (
    <div
      className="relative flex items-center justify-center w-full min-w-0 max-w-full h-[400px] md:h-[500px] select-none overflow-hidden"
      aria-label="Interactive 2D Venture Constellation Fallback"
    >
      <svg
        className="constellation-fallback w-full h-full max-w-lg mx-auto"
        viewBox="0 0 500 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.25" />
            <stop offset="60%" stopColor="#7C3AED" stopOpacity="0.10" />
            <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
          </radialGradient>
          <linearGradient
            id="nevroraCoreGrad"
            x1="18%"
            y1="82%"
            x2="82%"
            y2="18%"
          >
            <stop offset="0%" stopColor={BRAND_COLORS.magenta} />
            <stop offset="32%" stopColor={BRAND_COLORS.violet} />
            <stop offset="68%" stopColor={BRAND_COLORS.blue} />
            <stop offset="100%" stopColor={BRAND_COLORS.cyan} />
          </linearGradient>
          <filter id="glowEffect" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer Orbital Ring 3 */}
        <circle
          cx="250"
          cy="250"
          r="190"
          stroke="#3B82F6"
          strokeWidth="1"
          strokeOpacity="0.2"
          strokeDasharray="4 6"
          className="animate-[spin_60s_linear_infinite]"
        />

        {/* Middle Orbital Ring 2 */}
        <circle
          cx="250"
          cy="250"
          r="135"
          stroke="#7C3AED"
          strokeWidth="1.25"
          strokeOpacity="0.25"
          strokeDasharray="2 4"
        />

        {/* Inner Orbital Ring 1 */}
        <circle
          cx="250"
          cy="250"
          r="80"
          stroke="#2563EB"
          strokeWidth="1.5"
          strokeOpacity="0.3"
        />

        {/* Central Core Glow & Nevrora Emblem */}
        <circle cx="250" cy="250" r="56" fill="url(#coreGlow)" />
        <circle
          cx="250"
          cy="250"
          r="34"
          fill="#FFFFFF"
          stroke="url(#nevroraCoreGrad)"
          strokeWidth="1.5"
          strokeOpacity="0.85"
        />
        <g
          transform="translate(226, 226) scale(0.48) translate(0, 5)"
          stroke="url(#nevroraCoreGrad)"
          strokeWidth="6.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#glowEffect)"
        >
          {SYMBOL_PATHS.map((d) => (
            <path key={d} d={d} />
          ))}
        </g>

        {/* Venture Node 1: Neermiti Collections (on Middle Ring) */}
        <Link href="/products/neermiti-collections">
          <g className="cursor-pointer group">
            <circle
              cx="345"
              cy="155"
              r="9"
              fill="#2563EB"
              filter="url(#glowEffect)"
            />
            <circle cx="345" cy="155" r="4" fill="#FFFFFF" />
            <line
              x1="345"
              y1="155"
              x2="385"
              y2="135"
              stroke="#2563EB"
              strokeWidth="1.5"
              strokeOpacity="0.7"
            />
            <rect
              x="385"
              y="120"
              width="105"
              height="38"
              rx="8"
              fill="#FFFFFF"
              stroke="#E2E8F0"
              strokeWidth="1"
            />
            <text
              x="392"
              y="134"
              fill="#2563EB"
              fontSize="10"
              fontFamily="var(--font-mono)"
              fontWeight="bold"
            >
              01 &bull; NEERMITI
            </text>
            <text
              x="392"
              y="148"
              fill="#475569"
              fontSize="9"
              fontFamily="var(--font-body)"
            >
              Artisanal Handloom
            </text>
          </g>
        </Link>

        {/* Venture Node 2: Sadhana Daily (on Outer Ring) */}
        <Link href="/products/sadhana-daily">
          <g className="cursor-pointer group">
            <circle
              cx="115"
              cy="365"
              r="9"
              fill="#7C3AED"
              filter="url(#glowEffect)"
            />
            <circle cx="115" cy="365" r="4" fill="#FFFFFF" />
            <line
              x1="115"
              y1="365"
              x2="80"
              y2="395"
              stroke="#7C3AED"
              strokeWidth="1.5"
              strokeOpacity="0.7"
            />
            <rect
              x="10"
              y="385"
              width="105"
              height="38"
              rx="8"
              fill="#FFFFFF"
              stroke="#E2E8F0"
              strokeWidth="1"
            />
            <text
              x="18"
              y="399"
              fill="#7C3AED"
              fontSize="10"
              fontFamily="var(--font-mono)"
              fontWeight="bold"
            >
              02 &bull; SADHANA
            </text>
            <text
              x="18"
              y="413"
              fill="#475569"
              fontSize="9"
              fontFamily="var(--font-body)"
            >
              Vedic Wisdom & Rituals
            </text>
          </g>
        </Link>
      </svg>

      {/* Floating Badges */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center justify-center gap-2 max-w-[calc(100%-2rem)] text-[10px] sm:text-xs text-slate-600 bg-white/80 px-3 py-1.5 rounded-full border border-slate-200/80 backdrop-blur-sm truncate shadow-sm">
        <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse shrink-0" />
        <span className="truncate">
          Venture Constellation Active &bull; 2 In-Orbit Incubation Nodes
        </span>
      </div>
    </div>
  );
}
