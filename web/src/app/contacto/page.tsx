import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Escríbenos por WhatsApp o email. Te respondemos lo antes posible.",
};

const WHATSAPP_NUMBER = "+34 616 64 05 70";
const WHATSAPP_URL = "https://wa.me/34616640570";
const EMAIL = "lorenads@hotmail.com";
const INSTAGRAM_URL = "https://instagram.com/algodomconamor";

const contacts = [
  {
    id: "whatsapp",
    label: "WhatsApp",
    description: "La forma más rápida. Te respondemos en minutos.",
    value: WHATSAPP_NUMBER,
    href: WHATSAPP_URL,
    external: true,
    accent: "var(--color-blue)",
    textAccent: "text-white",
    bgAccent: "bg-[var(--color-blue)]",
    icon: (
      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
      </svg>
    ),
  },
  {
    id: "email",
    label: "Email",
    description: "Para consultas detalladas o encargos personalizados.",
    value: EMAIL,
    href: `mailto:${EMAIL}`,
    external: false,
    accent: "var(--color-pink)",
    textAccent: "text-[var(--color-brown)]",
    bgAccent: "bg-[var(--color-pink)]",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
      </svg>
    ),
  },
  {
    id: "instagram",
    label: "Instagram",
    description: "Síguenos para ver las últimas creaciones y novedades.",
    value: "@algodoмconamor",
    href: INSTAGRAM_URL,
    external: true,
    accent: "var(--color-pink)",
    textAccent: "text-[var(--color-brown)]",
    bgAccent: "bg-[var(--color-pink)]",
    icon: (
      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.975.975 1.246 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.975.975-2.242 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.975-.975-1.246-2.242-1.308-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.975-.975 2.242-1.246 3.608-1.308C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.014 7.052.072 5.197.157 3.355.673 2.014 2.014.673 3.355.157 5.197.072 7.052.014 8.332 0 8.741 0 12c0 3.259.014 3.668.072 4.948.085 1.855.601 3.697 1.942 5.038 1.341 1.341 3.183 1.857 5.038 1.942C8.332 23.986 8.741 24 12 24s3.668-.014 4.948-.072c1.855-.085 3.697-.601 5.038-1.942 1.341-1.341 1.857-3.183 1.942-5.038.058-1.28.072-1.689.072-4.948 0-3.259-.014-3.668-.072-4.948-.085-1.855-.601-3.697-1.942-5.038C20.645.673 18.803.157 16.948.072 15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
      </svg>
    ),
  },
];

export default function ContactoPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[var(--color-blue)]/35 via-[var(--color-pink)]/25 to-[var(--color-cream)] py-16 px-6">
        <div className="pointer-events-none absolute -top-16 -right-16 h-64 w-64 rounded-full bg-[var(--color-pink)]/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-10 -left-10 h-48 w-48 rounded-full bg-[var(--color-blue)]/25 blur-2xl" />
        <div className="relative mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-semibold leading-tight text-[var(--color-brown)] sm:text-5xl">
            Contacta con nosotros
          </h1>
          <p className="mx-auto mt-4 max-w-md text-[var(--color-brown)]/65 leading-relaxed">
            ¿Tienes alguna pregunta o quieres hacer un encargo personalizado?<br />
            Escríbenos y te respondemos lo antes posible.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-2xl px-6 py-12">

      {/* Tarjetas de contacto */}
      <div className="flex flex-col gap-4">
        {contacts.map((c) => (
          <a
            key={c.id}
            href={c.href}
            target={c.external ? "_blank" : undefined}
            rel={c.external ? "noreferrer" : undefined}
            className="group flex items-center gap-5 rounded-2xl border border-[var(--color-pink)]/40 bg-white px-6 py-5 transition hover:shadow-md hover:border-[var(--color-pink)]"
          >
            {/* Icono */}
            <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${c.bgAccent} ${c.textAccent}`}>
              {c.icon}
            </div>

            {/* Texto */}
            <div className="flex-1 min-w-0">
              <div className="text-xs font-medium uppercase tracking-wide text-[var(--color-brown)]/40">
                {c.label}
              </div>
              <div className="mt-0.5 truncate font-medium text-[var(--color-brown)]">
                {c.value}
              </div>
              <div className="mt-0.5 text-xs text-[var(--color-brown)]/50">
                {c.description}
              </div>
            </div>

            {/* Flecha */}
            <svg
              className="h-4 w-4 shrink-0 text-[var(--color-brown)]/30 transition group-hover:translate-x-0.5 group-hover:text-[var(--color-brown)]/60"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </a>
        ))}
      </div>

      {/* Nota final */}
      <p className="mt-10 text-center text-xs text-[var(--color-brown)]/40">
        Respondemos normalmente en menos de 24 horas en días laborables.
      </p>
    </main>
    </>
  );
}
