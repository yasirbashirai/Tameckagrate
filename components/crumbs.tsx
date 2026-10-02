import Link from "next/link";

/** Visible breadcrumb (matches the BreadcrumbList schema). */
export default function Crumbs({ name, light = false }: { name: string; light?: boolean }) {
  return (
    <nav aria-label="Breadcrumb" className={`text-sm font-semibold ${light ? "text-white/60" : "text-slate"}`}>
      <Link href="/" className={light ? "hover:text-white" : "hover:text-plum"}>
        Home
      </Link>
      <span className="mx-2">/</span>
      <span className={light ? "text-white" : "text-plum-ink"} aria-current="page">
        {name}
      </span>
    </nav>
  );
}
