import Link from "next/link";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/productos", label: "Productos" },
  { href: "/quienes-somos", label: "Quiénes somos" },
  { href: "/contacto", label: "Contacto" },
];

const INSTAGRAM_URL = "https://instagram.com/"; 
const WHATSAPP_URL = "https://wa.me/34123456789";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-[var(--color-pink)]/40 bg-[var(--color-cream)] text-[var(--color-brown)]">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-3">
          
          {/* Marca */}
          <div>
            <div className="text-lg font-semibold tracking-wide">
              Algodóm con Amor
            </div>
            <p className="mt-3 text-sm text-[var(--color-brown)]/70 leading-relaxed">
              Prendas tejidas a mano con delicadeza y cariño para bebés y recién nacidos.
            </p>
          </div>

          {/* Enlaces */}
          <div>
            <div className="font-medium mb-3">Enlaces</div>
            <ul className="space-y-2 text-sm">
              {links.map((l) => (
                <li key={l.href}>
                  <Link
                    className="text-[var(--color-brown)]/80 hover:text-[var(--color-blue)] transition"
                    href={l.href}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <div className="font-medium mb-3">Contacto</div>
            <div className="flex flex-col gap-3 text-sm">
              <a
                className="hover:text-[var(--color-pink)] transition"
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noreferrer"
              >
                Instagram
              </a>
              <a
                className="hover:text-[var(--color-blue)] transition"
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-[var(--color-pink)]/30 pt-6 text-xs text-[var(--color-brown)]/50 text-center">
          © {new Date().getFullYear()} Algodóm con Amor · Hecho a mano con cariño
        </div>
      </div>
    </footer>
  );
}