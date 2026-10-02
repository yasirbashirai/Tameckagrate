import Link from "next/link";
import type { ReactNode } from "react";

/** Small uppercase gold label that sits above section headlines. */
export function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <p
      className={`font-display text-xs font-bold uppercase tracking-[0.22em] sm:text-sm ${
        light ? "text-gold" : "text-plum"
      }`}
    >
      {children}
    </p>
  );
}

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "solid" | "outline" | "light";
  external?: boolean;
};

/** Pill button rendered as a link. */
export function Button({ href, children, variant = "solid", external = false }: ButtonProps) {
  const styles = {
    solid: "bg-plum text-white hover:bg-plum-deep",
    outline: "border-2 border-plum text-plum hover:bg-plum hover:text-white",
    light: "bg-white text-plum-ink hover:bg-blush",
  }[variant];
  const className = `inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 font-semibold transition-colors ${styles}`;

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

/**
 * Wing-curve divider: the curve of the butterfly wing from her logo,
 * used between sections (proposal page 8, "Your Butterfly, Used Properly").
 */
export function WingDivider({ className = "text-gold" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 240 40"
      className={`mx-auto h-7 w-44 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path d="M4 34 C 50 34, 80 6, 116 18" />
      <path d="M236 34 C 190 34, 160 6, 124 18" />
      <circle cx="120" cy="20" r="3" fill="currentColor" stroke="none" />
    </svg>
  );
}
