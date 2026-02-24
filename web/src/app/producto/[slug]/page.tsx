import Image from "next/image";
import Link from "next/link";
import { sanityClient } from "@/lib/sanity.client";
import { urlFor } from "@/lib/sanity.image";
import { notFound } from "next/navigation";

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

function genderLabel(v: string) {
  if (v === "nina") return "Niña";
  if (v === "nino") return "Niño";
  return "Unisex";
}
function statusLabel(v: Product["status"]) {
  if (v === "available") return "Disponible";
  if (v === "made_to_order") return "Bajo pedido";
  return "Agotado";
}

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;

  const product = await sanityClient.fetch<Product | null>(query, { slug });

  if (!product) return notFound();

  const first = product.images?.[0];
  const heroUrl = first ? urlFor(first).width(1400).height(1400).fit("max").url() : null;


  return (
    <main className="mx-auto max-w-5xl p-6">
      <div className="mb-6">
        <Link href="/" className="underline text-sm text-slate-600">← Volver</Link>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <div className="relative aspect-square overflow-hidden rounded-2xl bg-slate-100">
            {heroUrl && (
              <Image
                src={heroUrl}
                alt={first.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            )}
          </div>

          {product.images?.length > 1 && (
            <div className="mt-4 grid grid-cols-4 gap-3">
              {product.images.slice(1).map((img, idx) => {
                const u = urlFor(img).width(400).height(400).fit("crop").url();
                return (
                  <div key={idx} className="relative aspect-square overflow-hidden rounded-xl bg-slate-100">
                    <Image src={u} alt={img.alt} fill className="object-cover" />
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div>
          <h1 className="text-3xl font-semibold">{product.title}</h1>
          <p className="mt-2 text-slate-600">
            {product.category} · {genderLabel(product.gender)} · {statusLabel(product.status)}
          </p>

          <div className="mt-4">
            {typeof product.price === "number" ? (
              <div className="text-xl">{product.price} €</div>
            ) : (
              <div className="text-slate-600">Precio: consultar</div>
            )}
          </div>

          {product.description && (
            <p className="mt-6 leading-relaxed">{product.description}</p>
          )}

          <div className="mt-6 space-y-3 text-sm">
            {product.ageRanges?.length ? (
              <div>
                <div className="font-medium">Edades</div>
                <div className="text-slate-600">
                  {product.ageRanges.map((a) => ageLabel[a] ?? a).join(", ")}
                </div>
              </div>
            ) : null}

            {product.materials?.length ? (
              <div>
                <div className="font-medium">Materiales</div>
                <div className="text-slate-600">{product.materials.join(", ")}</div>
              </div>
            ) : null}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {/* Cambia estos links por los tuyos */}
            <a
              className="rounded-xl border px-4 py-2 hover:shadow-sm transition"
              href="https://instagram.com/"
              target="_blank"
              rel="noreferrer"
            >
              Ver Instagram
            </a>
            <a
              className="rounded-xl border px-4 py-2 hover:shadow-sm transition"
              href="https://wa.me/34123456789"
              target="_blank"
              rel="noreferrer"
            >
              Consultar por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}