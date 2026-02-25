import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Quiénes somos",
  description: "Conoce la historia de Algodóm con Amor, prendas tejidas a mano para bebés.",
};

const values = [
  {
    title: "Hecho a mano",
    text: "Cada prenda se teje punto a punto, con mimo y dedicación. No hay dos piezas iguales.",
    bg: "bg-[var(--color-pink)]",
    textColor: "text-[var(--color-brown)]",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
  },
  {
    title: "Materiales suaves",
    text: "Usamos lanas y algodones seleccionados, seguros y delicados para la piel de los más pequeños.",
    bg: "bg-[var(--color-blue)]",
    textColor: "text-white",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09z" />
      </svg>
    ),
  },
  {
    title: "Encargos personales",
    text: "¿Quieres algo único? Diseñamos prendas personalizadas para cada bebé y cada familia.",
    bg: "bg-[var(--color-cream-dark)]",
    textColor: "text-[var(--color-brown)]",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
      </svg>
    ),
  },
];

export default function QuienesSomosPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[var(--color-blue)]/35 via-[var(--color-pink)]/25 to-[var(--color-cream)] px-6 py-20">
        <div className="pointer-events-none absolute -top-16 -right-16 h-64 w-64 rounded-full bg-[var(--color-pink)]/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-10 -left-10 h-48 w-48 rounded-full bg-[var(--color-blue)]/25 blur-2xl" />
        <div className="relative mx-auto max-w-2xl text-center">
          <span className="mb-4 inline-block rounded-full border border-[var(--color-brown)]/15 bg-white/50 px-4 py-1 text-xs font-medium uppercase tracking-widest text-[var(--color-brown)]/55 backdrop-blur-sm">
            Nuestra historia
          </span>
          <h1 className="mt-2 text-4xl font-semibold text-[var(--color-brown)] sm:text-5xl">
            Quiénes somos
          </h1>
          <p className="mx-auto mt-5 max-w-lg text-[var(--color-brown)]/65 leading-relaxed">
            Algodóm con Amor nace con la idea de crear prendas únicas, tejidas a mano, con mimo y materiales de calidad para bebés y recién nacidos.
          </p>
        </div>
      </section>

      {/* Historia */}
      <section className="mx-auto max-w-3xl px-6 py-16">
        <div className="rounded-2xl border border-[var(--color-pink)]/40 bg-white p-8 md:p-10">
          <h2 className="text-xl font-semibold text-[var(--color-brown)]">Nuestro origen</h2>
          <div className="mt-4 space-y-4 text-sm leading-relaxed text-[var(--color-brown)]/70">
            <p>
              Todo empezó con las agujas de tejer y el deseo de crear algo especial para los más pequeños de la familia. Lo que comenzó como un hobby pronto se convirtió en una pasión: dar vida a prendas únicas, cálidas y con personalidad.
            </p>
            <p>
              Cada jersey, pelele o gorro que sale de nuestras manos lleva consigo horas de dedicación y mucho cariño. Nos aseguramos de que cada punto sea perfecto y de que el resultado final sea una prenda digna del bebé que la va a llevar.
            </p>
            <p>
              Trabajamos con materiales cuidadosamente seleccionados — suaves, seguros y agradables al tacto — porque sabemos lo delicada que es la piel de un bebé.
            </p>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="bg-[var(--color-pink-pale)] border-y border-[var(--color-pink)]/30 px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-8 text-center text-2xl font-semibold text-[var(--color-brown)]">
            Lo que nos define
          </h2>
          <div className="grid gap-5 md:grid-cols-3">
            {values.map((v) => (
              <div
                key={v.title}
                className="rounded-2xl border border-[var(--color-pink)]/30 bg-white p-6"
              >
                <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl ${v.bg} ${v.textColor}`}>
                  {v.icon}
                </div>
                <h3 className="font-semibold text-[var(--color-brown)]">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-brown)]/60">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-16 text-center">
        <h2 className="text-2xl font-semibold text-[var(--color-brown)]">
          ¿Quieres conocer nuestras creaciones?
        </h2>
        <p className="mt-3 text-sm text-[var(--color-brown)]/55">
          Explora el catálogo o contáctanos para un encargo personalizado.
        </p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/productos"
            className="rounded-xl bg-[var(--color-brown)] px-6 py-3 text-sm font-medium text-[var(--color-cream)] transition hover:opacity-85"
          >
            Ver productos
          </Link>
          <Link
            href="/contacto"
            className="rounded-xl border border-[var(--color-brown)]/25 bg-white px-6 py-3 text-sm font-medium text-[var(--color-brown)] transition hover:border-[var(--color-brown)]/50"
          >
            Contactar
          </Link>
        </div>
      </section>
    </>
  );
}
