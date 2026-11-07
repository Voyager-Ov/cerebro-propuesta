"use client";

import React from "react";

export interface SegmentedOption<T extends string> {
  id: T;
  label: string;
  badge?: string;
  icon?: React.ReactNode;
}

export interface BenchoSegmentedControlProps<T extends string> {
  options: SegmentedOption<T>[];
  value: T;
  onChange: (value: T) => void;
  size?: "sm" | "md";
  variant?: "white-pill" | "subtle-carbon";
  ariaLabel: string;
  className?: string;
}

export function BenchoSegmentedControl<T extends string>({
  options,
  value,
  onChange,
  size = "md",
  variant = "white-pill",
  ariaLabel,
  className = "",
}: BenchoSegmentedControlProps<T>) {
  const activeIndex = Math.max(
    0,
    options.findIndex((o) => o.id === value)
  );
  const count = Math.max(1, options.length);

  const isSmall = size === "sm";

  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel}
      style={
        {
          "--seg-count": count,
          "--seg-idx": activeIndex,
        } as React.CSSProperties
      }
      className={`relative grid items-center p-1 rounded-xl bg-[#09090b] border border-[#27272a] select-none isolation-auto ${
        isSmall ? "h-8" : "h-10"
      } ${className}`}
    >
      {/* Pulgar Deslizante con Curva de Resorte (Pilar / Bencho Spring) */}
      <div
        aria-hidden="true"
        style={{
          width: `calc((100% - 8px) / ${count})`,
          transform: `translateX(calc(${activeIndex} * 100%))`,
          transition: "transform 0.5s cubic-bezier(0.34, 1.4, 0.64, 1)",
        }}
        className={`pointer-events-none absolute top-1 bottom-1 left-1 rounded-lg ${
          variant === "white-pill"
            ? "bg-white ios-bevel-white"
            : "bg-[#1c1c21] border border-zinc-700/80 shadow-sm"
        }`}
      />

      {/* Botones de Opción */}
      <div
        style={{
          gridTemplateColumns: `repeat(${count}, minmax(0, 1fr))`,
        }}
        className="relative z-10 grid w-full h-full"
      >
        {options.map((opt) => {
          const isActive = opt.id === value;
          return (
            <button
              key={opt.id}
              type="button"
              role="radio"
              aria-checked={isActive}
              onClick={() => onChange(opt.id)}
              className={`inline-flex items-center justify-center gap-1.5 px-2.5 rounded-lg transition-colors duration-200 cursor-pointer whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${
                isSmall ? "text-[11px]" : "text-xs"
              } ${
                isActive
                  ? variant === "white-pill"
                    ? "text-black font-semibold"
                    : "text-white font-semibold"
                  : "text-zinc-400 hover:text-zinc-200 font-medium"
              }`}
            >
              {opt.icon && <span className="shrink-0">{opt.icon}</span>}
              <span>{opt.label}</span>
              {opt.badge && (
                <span
                  className={`font-mono text-[10px] px-1 py-0.2 rounded ${
                    isActive
                      ? variant === "white-pill"
                        ? "bg-black/10 text-black"
                        : "bg-zinc-800 text-zinc-200"
                      : "text-zinc-500"
                  }`}
                >
                  {opt.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
