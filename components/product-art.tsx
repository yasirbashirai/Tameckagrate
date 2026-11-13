import Image from "next/image";
import type { Product } from "@/lib/site";

/**
 * Product visuals. Books use real cover images; merch uses on-brand SVG
 * mockups until real product photography exists (swap `image` in site.ts).
 */
export default function ProductArt({ product, className = "" }: { product: Product; className?: string }) {
  // Lifestyle product photos (shop-*.webp) fill the whole card
  if (product.image?.includes("/shop-")) {
    return (
      <div className={`relative overflow-hidden rounded-[inherit] ${className}`}>
        <Image src={product.image} alt={product.name} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
      </div>
    );
  }

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
              FROM SURVIVOR
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
        {product.art === "journal" && (
          <g>
            {/* Page edges, cover, gold elastic band */}
            <rect x="78" y="34" width="156" height="240" rx="8" fill="#F3ECE3" stroke="#DFD5CB" strokeWidth="2" />
            <rect x="66" y="28" width="160" height="244" rx="10" fill="#7E4A76" />
            <rect x="66" y="28" width="18" height="244" rx="8" fill="#5B3455" />
            <rect x="209" y="28" width="6" height="244" fill="#B58F45" />
            <image href="/images/fsts-mark.webp" x="97" y="70" width="90" height="63" style={{ filter: "brightness(0) invert(1)" }} />
            <text x="142" y="172" textAnchor="middle" fontFamily="var(--font-archivo)" fontWeight="700" fontSize="10" letterSpacing="1.5" fill="#F5E9F0">
              FROM SURVIVOR
            </text>
            <text x="142" y="200" textAnchor="middle" fontFamily="var(--font-script-face)" fontSize="30" fill="#D9BD85">
              to Soft
            </text>
            <text x="142" y="238" textAnchor="middle" fontFamily="var(--font-archivo)" fontWeight="600" fontSize="9" letterSpacing="3" fill="#F5E9F0" opacity="0.7">
              JOURNAL
            </text>
          </g>
        )}
      </svg>
    </div>
  );
}
