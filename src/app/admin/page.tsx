import type { Metadata } from "next";
import AdminPanel from "@components/admin/admin-panel";

export const metadata: Metadata = { title: "Site settings", robots: { index: false, follow: false } };

/** Private settings page for Tamecka: PayPal email, inbox email, eBook link. */
export default function Admin() {
  return (
    <section className="min-h-[85vh] bg-[radial-gradient(100%_80%_at_50%_20%,#f0dde9_0%,#fbf8f4_65%)] px-5 pb-24 pt-36">
      <AdminPanel />
    </section>
  );
}
