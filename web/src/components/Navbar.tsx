import Image from "next/image";
import Link from "next/link";

const navItems = [
  { href: "/", label: "Inicio" },
  { href: "/productos", label: "Productos" },
  { href: "/quienes-somos", label: "Quiénes somos" },
  { href: "/contacto", label: "Contacto" },
];

const INSTAGRAM_URL = "https://instagram.com/algodomconamor";
const WHATSAPP_URL = "https://wa.me/34616640570";

export default function Navbar() {
  return (
    <header className="border-b border-[var(--color-pink)]/50 bg-[var(--color-cream)]">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 p-4">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="Algodóm con Amor"
            width={44}
            height={44}
            className="rounded-lg"
            priority
          />
          <span className="font-semibold tracking-tight text-[var(--color-brown)]">
            Algodóm con Amor
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-[var(--color-brown)]/80 hover:text-[var(--color-blue)] transition"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            className="rounded-xl bg-[var(--color-pink)] px-3 py-2 text-sm text-[var(--color-brown)] hover:opacity-90 transition"
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
          >
            Instagram
          </a>
          <a
            className="rounded-xl bg-[var(--color-blue)] px-3 py-2 text-sm text-white hover:opacity-90 transition"
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
          >
            WhatsApp
          </a>
        </div>
      </div>

      {/* Menú móvil */}
      <div className="mx-auto max-w-6xl px-4 pb-4 md:hidden">
        <nav className="flex flex-wrap gap-3">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-xl border border-[var(--color-pink)]/40 bg-white/60 px-3 py-2 text-sm text-[var(--color-brown)]/80 hover:text-[var(--color-blue)] transition"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}