import Image from "next/image";
import type { Product } from "@/lib/site";

/**
 * Product visuals. Books use real cover images; merch uses on-brand SVG
 * mockups until real product photography exists (swap `image` in site.ts).
 */
export default function ProductArt({ product, className = "" }: { product: Product; className?: string }) {
  if (product.image) {
    const isCover = product.image.includes("book-cover");
    return (
      <div className={`relative flex items-center justify-center ${className}`}>
        <Image
          src={product.image}
          alt={product.name}
          width={600}
          height={800}
          className={`h-[82%] w-auto object-contain ${
            isCover ? "rounded-r-md shadow-[12px_18px_30px_-10px_rgba(26,32,41,0.55)]" : "drop-shadow-xl"
          }`}
        />
      </div>
    );
  }

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg viewBox="0 0 300 300" className="h-[82%] w-auto drop-shadow-xl" role="img" aria-label={product.name}>
        {product.art === "tee" && (
          <g>
            <path
              d="M95 40 L60 58 L20 100 L48 132 L70 114 L70 270 L230 270 L230 114 L252 132 L280 100 L240 58 L205 40 C195 62 175 72 150 72 C125 72 105 62 95 40 Z"
              fill="#FBF8F4"
              stroke="#DFD5CB"
              strokeWidth="2"
            />
            <path d="M95 40 C105 62 125 72 150 72 C175 72 195 62 205 40" fill="none" stroke="#DFD5CB" strokeWidth="3" />
            <text x="150" y="150" textAnchor="middle" fontFamily="var(--font-archivo)" fontWeight="800" fontSize="22" fill="#5B3455">
              SOFT IS
            </text>
            <text x="150" y="178" textAnchor="middle" fontFamily="var(--font-script-face)" fontSize="38" fill="#9B5B8E">
              Strength
            </text>
          </g>
        )}
        {product.art === "tote" && (
          <g>
            <path d="M105 95 C105 40 195 40 195 95" fill="none" stroke="#B58F45" strokeWidth="9" strokeLinecap="round" />
            <path d="M60 92 L240 92 L228 275 L72 275 Z" fill="#F3ECE3" stroke="#DFD5CB" strokeWidth="2" />
            <image href="/images/fsts-mark.webp" x="92" y="125" width="116" height="81" />
            <text x="150" y="238" textAnchor="middle" fontFamily="var(--font-archivo)" fontWeight="700" fontSize="13" letterSpacing="2" fill="#5B6878">
              FROM SURVIVAL
            </text>
            <text x="150" y="258" textAnchor="middle" fontFamily="var(--font-script-face)" fontSize="24" fill="#9B5B8E">
              to Soft
            </text>
          </g>
        )}
        {product.art === "mug" && (
          <g>
            <path d="M215 120 C265 120 265 205 215 205" fill="none" stroke="#7E4A76" strokeWidth="16" />
            <rect x="65" y="85" width="155" height="185" rx="18" fill="#7E4A76" />
            <ellipse cx="142" cy="88" rx="77" ry="12" fill="#5B3455" />
            <text x="142" y="170" textAnchor="middle" fontFamily="var(--font-script-face)" fontSize="34" fill="#F5E9F0">
              Aspire to
            </text>
            <text x="142" y="208" textAnchor="middle" fontFamily="var(--font-script-face)" fontSize="34" fill="#D9BD85">
              Inspire
            </text>
          </g>
        )}
      </svg>
    </div>
  );
}
