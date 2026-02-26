import Link from "next/link";
import { sanityClient } from "@/lib/sanity.client";
import { notFound } from "next/navigation";
import ProductGallery from "@/components/ProductGallery";

export const revalidate = 60;

type Product = {
  title: string;
  description?: string;
  category: string;
  gender: string;
  ageRanges?: string[];
  materials?: string[];
  price?: number;
  status: "available" | "made_to_order" | "sold_out";
  images: { asset: any; alt: string }[];
};

const query = `*[_type == "product" && slug.current == $slug][0]{
  title,
  description,
  category,
  gender,
  ageRanges,
  materials,
  price,
  status,
  images[]{asset, alt}
}`;

const ageLabel: Record<string, string> = {
  "0-1m": "0–1 mes",
  "1-3m": "1–3 meses",
  "3-6m": "3–6 meses",
  "6-9m": "6–9 meses",
  "9-12m": "9–12 meses",
  "12-18m": "12–18 meses",
  "18-24m": "18–24 meses",
  "2-3y": "2–3 años",
};

const categoryLabel: Record<string, string> = {
  jersey: "Jersey",
  pelele: "Pelele",
  chaqueta: "Chaqueta",
  gorro: "Gorro",
  patucos: "Patucos",
  manta: "Manta",
  conjunto: "Conjunto",
  otro: "Otro",
};

function genderLabel(v: string) {
  if (v === "nina") return "Niña";
  if (v === "nino") return "Niño";
  return "Unisex";
}

function StatusBadge({ status }: { status: Product["status"] }) {
  const styles = {
    available: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    made_to_order: "bg-amber-50 text-amber-700 border border-amber-200",
    sold_out: "bg-slate-100 text-slate-500 border border-slate-200",
  };
  const labels = {
    available: "Disponible",
    made_to_order: "Bajo pedido",
    sold_out: "Agotado",
  };
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${styles[status]}`}>
      {labels[status]}
    </span>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-[var(--color-pink)]/60 bg-white px-3 py-1 text-xs text-[var(--color-brown)]/80">
      {children}
    </span>
  );
}

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const product = await sanityClient.fetch<Pick<Product, "title"> | null>(
    `*[_type == "product" && slug.current == $slug][0]{ title }`,
    { slug }
  );
  return { title: product?.title ?? "Producto" };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await sanityClient.fetch<Product | null>(query, { slug });

  if (!product) return notFound();

  return (
    <main className="mx-auto max-w-5xl px-6 py-8">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-sm text-[var(--color-brown)]/50">
        <Link href="/" className="hover:text-[var(--color-brown)] transition">Inicio</Link>
        <span>·</span>
        <Link href="/productos" className="hover:text-[var(--color-brown)] transition">Productos</Link>
        <span>·</span>
        <span className="text-[var(--color-brown)]/80">{product.title}</span>
      </nav>

      <div className="grid gap-10 md:grid-cols-2">
        {/* Galería */}
        <ProductGallery images={product.images ?? []} />

        {/* Info */}
        <div className="flex flex-col gap-5">
          {/* Título y estado */}
          <div>
            <div className="mb-2">
              <StatusBadge status={product.status} />
            </div>
            <h1 className="text-3xl font-semibold leading-tight text-[var(--color-brown)]">
              {product.title}
            </h1>
            <p className="mt-1 text-sm text-[var(--color-brown)]/50">
              {categoryLabel[product.category] ?? product.category} · {genderLabel(product.gender)}
            </p>
          </div>

          {/* Precio */}
          <div className="rounded-2xl bg-white border border-[var(--color-pink)]/40 px-5 py-4">
            {typeof product.price === "number" ? (
              <div className="text-2xl font-semibold text-[var(--color-brown)]">
                {product.price} €
              </div>
            ) : (
              <div className="text-[var(--color-brown)]/60 text-sm">
                Precio bajo consulta —{" "}
                <a href="https://wa.me/34616640570" className="underline hover:text-[var(--color-brown)] transition">
                  pregúntanos
                </a>
              </div>
            )}
          </div>

          {/* Descripción */}
          {product.description && (
            <p className="leading-relaxed text-[var(--color-brown)]/80 text-sm">
              {product.description}
            </p>
          )}

          {/* Detalles */}
          <div className="rounded-2xl border border-[var(--color-pink)]/40 bg-white divide-y divide-[var(--color-pink)]/30">
            {/* Género */}
            <div className="flex items-center justify-between px-5 py-3 text-sm">
              <span className="text-[var(--color-brown)]/50">Género</span>
              <span className="font-medium text-[var(--color-brown)]">{genderLabel(product.gender)}</span>
            </div>

            {/* Categoría */}
            <div className="flex items-center justify-between px-5 py-3 text-sm">
              <span className="text-[var(--color-brown)]/50">Categoría</span>
              <span className="font-medium text-[var(--color-brown)]">
                {categoryLabel[product.category] ?? product.category}
              </span>
            </div>

            {/* Edades */}
            {product.ageRanges?.length ? (
              <div className="flex items-start justify-between gap-4 px-5 py-3 text-sm">
                <span className="shrink-0 text-[var(--color-brown)]/50">Edades</span>
                <div className="flex flex-wrap justify-end gap-1.5">
                  {product.ageRanges.map((a) => (
                    <Pill key={a}>{ageLabel[a] ?? a}</Pill>
                  ))}
                </div>
              </div>
            ) : null}

            {/* Materiales */}
            {product.materials?.length ? (
              <div className="flex items-start justify-between gap-4 px-5 py-3 text-sm">
                <span className="shrink-0 text-[var(--color-brown)]/50">Materiales</span>
                <div className="flex flex-wrap justify-end gap-1.5">
                  {product.materials.map((m) => (
                    <Pill key={m}>{m}</Pill>
                  ))}
                </div>
              </div>
            ) : null}
          </div>

          {/* CTAs */}
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href="https://instagram.com/algodomconamor"
              target="_blank"
              rel="noreferrer"
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[var(--color-pink)] px-5 py-3 text-sm font-medium text-[var(--color-brown)] transition hover:opacity-85"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.975.975 1.246 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.975.975-2.242 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.975-.975-1.246-2.242-1.308-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.975-.975 2.242-1.246 3.608-1.308C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.014 7.052.072 5.197.157 3.355.673 2.014 2.014.673 3.355.157 5.197.072 7.052.014 8.332 0 8.741 0 12c0 3.259.014 3.668.072 4.948.085 1.855.601 3.697 1.942 5.038 1.341 1.341 3.183 1.857 5.038 1.942C8.332 23.986 8.741 24 12 24s3.668-.014 4.948-.072c1.855-.085 3.697-.601 5.038-1.942 1.341-1.341 1.857-3.183 1.942-5.038.058-1.28.072-1.689.072-4.948 0-3.259-.014-3.668-.072-4.948-.085-1.855-.601-3.697-1.942-5.038C20.645.673 18.803.157 16.948.072 15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
              </svg>
              Ver en Instagram
            </a>
            <a
              href="https://wa.me/34616640570"
              target="_blank"
              rel="noreferrer"
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[var(--color-blue)] px-5 py-3 text-sm font-medium text-white transition hover:opacity-85"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
              </svg>
              Consultar por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
