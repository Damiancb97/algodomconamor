import Image from "next/image";
import Link from "next/link";
import { sanityClient } from "@/lib/sanity.client";

export const revalidate = 60;
import { urlFor } from "@/lib/sanity.image";

type Product = {
  _id: string;
  title: string;
  slug: { current: string };
  category: string;
  gender: string;
  price?: number;
  status: "available" | "made_to_order" | "sold_out";
  images: { asset: any; alt: string }[];
};

const query = `*[_type == "product"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  category,
  gender,
  price,
  status,
  images[0]{asset, alt}
}`;

function statusLabel(status: Product["status"]) {
  if (status === "available") return "Disponible";
  if (status === "made_to_order") return "Bajo pedido";
  return "Agotado";
}

export default async function Home() {
  const products = await sanityClient.fetch<Product[]>(query);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[var(--color-blue)]/35 via-[var(--color-pink)]/25 to-[var(--color-cream)] py-20 px-6">
        {/* Destellos decorativos */}
        <div className="pointer-events-none absolute -top-16 -right-16 h-64 w-64 rounded-full bg-[var(--color-pink)]/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-10 -left-10 h-48 w-48 rounded-full bg-[var(--color-blue)]/25 blur-2xl" />

        <div className="relative mx-auto max-w-2xl text-center">
          <span className="mb-4 inline-block rounded-full border border-[var(--color-brown)]/20 bg-white/50 px-4 py-1 text-xs font-medium uppercase tracking-widest text-[var(--color-brown)]/60 backdrop-blur-sm">
            Hecho a mano con cariño
          </span>
          <h1 className="mt-2 text-4xl font-semibold leading-tight text-[var(--color-brown)] sm:text-5xl">
            Prendas tejidas<br className="hidden sm:block" /> para bebés con amor
          </h1>
          <p className="mx-auto mt-4 max-w-md text-[var(--color-brown)]/65 leading-relaxed">
            Cada pieza es única, elaborada artesanalmente con materiales suaves y de calidad para tu pequeño.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/productos"
              className="rounded-xl bg-[var(--color-brown)] px-6 py-3 text-sm font-medium text-[var(--color-cream)] transition hover:opacity-85"
            >
              Ver productos
            </Link>
            <a
              href="https://wa.me/34616640570"
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border border-[var(--color-brown)]/25 bg-white/55 px-6 py-3 text-sm font-medium text-[var(--color-brown)] backdrop-blur-sm transition hover:bg-white/80"
            >
              Consultar por WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Grid de productos */}
      <section className="mx-auto max-w-6xl px-6 py-14">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-[var(--color-brown)]">Últimas creaciones</h2>
            <p className="mt-1 text-sm text-[var(--color-brown)]/50">
              Prendas únicas tejidas a mano
            </p>
          </div>
          <Link
            href="/productos"
            className="shrink-0 text-sm text-[var(--color-brown)]/55 underline underline-offset-2 transition hover:text-[var(--color-brown)]"
          >
            Ver todas →
          </Link>
        </div>

        {products.length === 0 ? (
          <p className="py-16 text-center text-[var(--color-brown)]/40">
            Próximamente nuevas creaciones.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {products.map((p) => {
              const img = p.images;
              const imgUrl = img
                ? urlFor(img).width(800).height(800).fit("crop").url()
                : null;

              return (
                <Link
                  key={p._id}
                  href={`/producto/${p.slug.current}`}
                  className="group rounded-2xl border border-[var(--color-pink)]/40 bg-white p-3 transition hover:border-[var(--color-pink)] hover:shadow-md"
                >
                  <div className="relative aspect-square overflow-hidden rounded-xl bg-[var(--color-cream-dark)]">
                    {imgUrl && (
                      <Image
                        src={imgUrl}
                        alt={(img as any).alt ?? p.title}
                        fill
                        className="object-cover transition duration-500 group-hover:scale-[1.04]"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                    )}
                  </div>

                  <div className="mt-3">
                    <div className="text-xs capitalize text-[var(--color-brown)]/40">{p.category}</div>
                    <div className="font-medium leading-snug text-[var(--color-brown)]">{p.title}</div>
                    <div className="mt-1 flex items-center justify-between text-sm">
                      <span className="text-[var(--color-brown)]/50">{statusLabel(p.status)}</span>
                      {typeof p.price === "number" ? (
                        <span className="font-medium text-[var(--color-brown)]">{p.price} €</span>
                      ) : (
                        <span className="text-[var(--color-brown)]/35">Consultar</span>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>

      {/* Franja CTA */}
      <section className="bg-[var(--color-blue-pale)] border-y border-[var(--color-blue)]/30 py-14 px-6">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-2xl font-semibold text-[var(--color-brown)]">
            ¿Buscas algo especial?
          </h2>
          <p className="mt-3 text-sm text-[var(--color-brown)]/60 leading-relaxed">
            Hacemos encargos personalizados. Cuéntanos qué necesitas y lo tejemos con todo el cariño.
          </p>
          <a
            href="https://wa.me/34616640570"
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[var(--color-blue)] px-6 py-3 text-sm font-medium text-white transition hover:opacity-85"
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
            </svg>
            Escríbenos por WhatsApp
          </a>
        </div>
      </section>
    </>
  );
}
