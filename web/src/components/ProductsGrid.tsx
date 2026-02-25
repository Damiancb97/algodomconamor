"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/lib/sanity.image";

export type Product = {
  _id: string;
  title: string;
  slug: { current: string };
  category: string;
  gender: string;
  ageRanges?: string[];
  price?: number;
  status: "available" | "made_to_order" | "sold_out";
  images: { asset: any; alt: string }[];
};

const GENDERS = [
  { value: "", label: "Todos" },
  { value: "nina", label: "Niña" },
  { value: "nino", label: "Niño" },
  { value: "unisex", label: "Unisex" },
];

const CATEGORIES = [
  { value: "", label: "Todas" },
  { value: "jersey", label: "Jersey" },
  { value: "pelele", label: "Pelele" },
  { value: "chaqueta", label: "Chaqueta" },
  { value: "gorro", label: "Gorro" },
  { value: "patucos", label: "Patucos" },
  { value: "manta", label: "Manta" },
  { value: "conjunto", label: "Conjunto" },
  { value: "otro", label: "Otro" },
];

const AGE_RANGES = [
  { value: "", label: "Todas" },
  { value: "0-1m", label: "0–1 m" },
  { value: "1-3m", label: "1–3 m" },
  { value: "3-6m", label: "3–6 m" },
  { value: "6-9m", label: "6–9 m" },
  { value: "9-12m", label: "9–12 m" },
  { value: "12-18m", label: "12–18 m" },
  { value: "18-24m", label: "18–24 m" },
  { value: "2-3y", label: "2–3 años" },
];

function statusLabel(status: Product["status"]) {
  if (status === "available") return "Disponible";
  if (status === "made_to_order") return "Bajo pedido";
  return "Agotado";
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-xl px-3 py-1.5 text-sm transition ${
        active
          ? "bg-[var(--color-brown)] text-[var(--color-cream)]"
          : "border border-[var(--color-pink)] bg-white text-[var(--color-brown)]/75 hover:border-[var(--color-brown)] hover:bg-white"
      }`}
    >
      {label}
    </button>
  );
}

function FilterRow({
  title,
  options,
  value,
  onChange,
}: {
  title: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="w-20 shrink-0 text-sm font-medium text-[var(--color-brown)]">
        {title}
      </span>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <FilterChip
            key={opt.value}
            label={opt.label}
            active={value === opt.value}
            onClick={() => onChange(opt.value)}
          />
        ))}
      </div>
    </div>
  );
}

export default function ProductsGrid({ products }: { products: Product[] }) {
  const [gender, setGender] = useState("");
  const [category, setCategory] = useState("");
  const [age, setAge] = useState("");

  const filtered = products.filter((p) => {
    if (gender && p.gender !== gender) return false;
    if (category && p.category !== category) return false;
    if (age && !p.ageRanges?.includes(age)) return false;
    return true;
  });

  const hasFilters = gender !== "" || category !== "" || age !== "";

  function clearFilters() {
    setGender("");
    setCategory("");
    setAge("");
  }

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[var(--color-blue)]/35 via-[var(--color-pink)]/25 to-[var(--color-cream)] py-16 px-6">
        <div className="pointer-events-none absolute -top-16 -right-16 h-64 w-64 rounded-full bg-[var(--color-pink)]/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-10 -left-10 h-48 w-48 rounded-full bg-[var(--color-blue)]/25 blur-2xl" />
        <div className="relative mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-semibold leading-tight text-[var(--color-brown)] sm:text-5xl">
            Nuestros productos
          </h1>
          <p className="mx-auto mt-4 max-w-md text-[var(--color-brown)]/65 leading-relaxed">
            Prendas tejidas a mano para bebés y recién nacidos.
          </p>
        </div>
      </section>

    <main className="mx-auto max-w-6xl p-6">

      {/* Filtros */}
      <section className="mb-8 rounded-2xl border border-[var(--color-pink)]/40 bg-[var(--color-pink-pale)] p-5 space-y-3">
        <FilterRow
          title="Género"
          options={GENDERS}
          value={gender}
          onChange={setGender}
        />
        <FilterRow
          title="Categoría"
          options={CATEGORIES}
          value={category}
          onChange={setCategory}
        />
        <FilterRow
          title="Edad"
          options={AGE_RANGES}
          value={age}
          onChange={setAge}
        />

        {hasFilters && (
          <div className="pt-1">
            <button
              onClick={clearFilters}
              className="text-xs text-[var(--color-brown)]/50 underline hover:text-[var(--color-brown)]"
            >
              Limpiar filtros
            </button>
          </div>
        )}
      </section>

      {/* Resultados */}
      <div className="mb-4 text-sm text-[var(--color-brown)]/50">
        {filtered.length === 0
          ? "No hay productos con los filtros seleccionados."
          : `${filtered.length} ${filtered.length === 1 ? "producto" : "productos"}`}
      </div>

      {filtered.length > 0 && (
        <section className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {filtered.map((p) => {
            const img = p.images?.[0];
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
                      alt={img.alt}
                      fill
                      className="object-cover"
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
        </section>
      )}
    </main>
    </>
  );
}
