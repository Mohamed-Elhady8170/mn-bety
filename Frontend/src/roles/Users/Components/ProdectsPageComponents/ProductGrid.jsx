import React from "react";
import ProductCard from "./ProductCard";
import { useTranslation } from "react-i18next";

// ── Loading skeleton for a single card ────────────────────────────────────────
function ProductCardSkeleton() {
  return (
    <div className="bg-bg-main rounded-2xl overflow-hidden shadow-sm animate-pulse">
      <div className="h-50 bg-bg-subtle" />
      <div className="p-4 space-y-3">
        <div className="h-3 bg-bg-subtle rounded w-1/3" />
        <div className="h-4 bg-bg-subtle rounded w-3/4" />
        <div className="h-3 bg-bg-subtle rounded w-1/2" />
        <div className="h-3 bg-bg-subtle rounded w-1/4" />
        <div className="flex justify-between pt-2 border-t border-border-main">
          <div className="h-8 w-8 rounded-full bg-bg-subtle" />
          <div className="h-5 w-20 bg-bg-subtle rounded" />
        </div>
      </div>
    </div>
  );
}

export default function ProductGrid({ products, loading, error, onToggleFavorite, onOpenReview }) {
  const { t } = useTranslation();

  // ── Loading state ─────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
        {[...Array(6)].map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  // ── Error state ───────────────────────────────────────────────────────────
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center gap-3">
        <p className="text-sm text-red-500 font-medium">{error}</p>
      </div>
    );
  }

  // ── Empty state ───────────────────────────────────────────────────────────
  if (!products || products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center gap-3">
        <p className="text-sm text-text-subtle">
          {t("products_page.no_products") || "لا توجد منتجات في هذا التصنيف"}
        </p>
      </div>
    );
  }

  // ── Product grid ──────────────────────────────────────────────────────────
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
      {products.map((p) => (
        <ProductCard
          key={p._id}
          product={p}
          onToggleFavorite={onToggleFavorite}
          onOpenReview={onOpenReview}
        />
      ))}
    </div>
  );
}