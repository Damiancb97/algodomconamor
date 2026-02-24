import Image from "next/image";
import Link from "next/link";
import { sanityClient } from "@/lib/sanity.client";
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
  images[]{asset, alt}
}`;

function statusLabel(status: Product["status"]) {
  if (status === "available") return "Disponible";
  if (status === "made_to_order") return "Bajo pedido";
  return "Agotado";
}

export default async function Home() {
  const products = await sanityClient.fetch<Product[]>(query);

  return (
    <main className="mx-auto max-w-6xl p-6">
      <header className="mb-8 flex items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold">Algodóm con Amor</h1>
          <p className="text-slate-600">Prendas tejidas a mano para bebés.</p>
        </div>

        <div className="flex gap-3 text-sm">
          <a className="underline" href="#" target="_blank" rel="noreferrer">Instagram</a>
          <a className="underline" href="#" target="_blank" rel="noreferrer">WhatsApp</a>
        </div>
      </header>

      <section className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {products.map((p) => {
          const first = p.images?.[0];
          const imgUrl = first
            ? urlFor(first).width(800).height(800).fit("crop").url()
            : null;

          return (
            <Link
              key={p._id}
              href={`/producto/${p.slug.current}`}
              className="rounded-2xl border bg-white p-3 transition hover:shadow-sm"
            >
              <div className="relative aspect-square overflow-hidden rounded-xl bg-slate-100">
                {imgUrl && (
                  <Image
                    src={imgUrl}
                    alt={first.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                )}
              </div>

              <div className="mt-3">
                <div className="text-xs text-slate-500">{p.category}</div>
                <div className="font-medium">{p.title}</div>

                <div className="mt-1 flex items-center justify-between text-sm">
                  <span className="text-slate-600">{statusLabel(p.status)}</span>
                  {typeof p.price === "number" ? (
                    <span>{p.price} €</span>
                  ) : (
                    <span className="text-slate-500">Consultar</span>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </section>
    </main>
  );
}