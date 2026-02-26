import { sanityClient } from "@/lib/sanity.client";
import ProductsGrid, { type Product } from "@/components/ProductsGrid";

export const revalidate = 60;

export const metadata = {
  title: "Productos",
};

const query = `*[_type == "product"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  category,
  gender,
  ageRanges,
  price,
  status,
  "images": images[0..0]{asset, alt}
}`;

export default async function ProductosPage() {
  const products = await sanityClient.fetch<Product[]>(query);
  return <ProductsGrid products={products} />;
}
