import React, { useEffect, useState } from "react";
import { useDispatch, useSelector }    from "react-redux";

// ── Product slice ──────────────────────────────────────────────────────────────
import {
  fetchProducts,
  setPage,
  setSort,
  setPriceRange,
  selectProducts,
  selectProductsLoading,
  selectProductsError,
  selectProductsTotal,
  selectProductsPages,
  selectCurrentPage,
  selectCurrentSort,
  selectPriceRange,
} from "../Features/productSlice";

// ── Category slice ─────────────────────────────────────────────────────────────
import {
  selectSelectedSub,
  selectSelectedCategory,
} from "../Features/Categoryslice";

// ── Components ─────────────────────────────────────────────────────────────────
import Pagination   from "../Components/ProdectsPageComponents/Pagination";
import ProductGrid  from "../Components/ProdectsPageComponents/ProductGrid";
import Sidebar      from "../Components/ProdectsPageComponents/Sidebar";
import TopBar       from "../Components/ProdectsPageComponents/TopBar";
import { ReviewModal } from "../Components/ProdectsPageComponents/ReviewModal";

export default function ProductPage() {
  const dispatch         = useDispatch();

  // ── Redux state ─────────────────────────────────────────────────────────────
  const products         = useSelector(selectProducts);
  const loading          = useSelector(selectProductsLoading);
  const error            = useSelector(selectProductsError);
  const total            = useSelector(selectProductsTotal);
  const pages            = useSelector(selectProductsPages);
  const page             = useSelector(selectCurrentPage);
  const sort             = useSelector(selectCurrentSort);
  const priceRange       = useSelector(selectPriceRange);

  // Category selection drives the product filter
  const selectedSub      = useSelector(selectSelectedSub);
  const selectedCategory = useSelector(selectSelectedCategory);

  // ── Local UI state (review modal only) ──────────────────────────────────────
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isReviewOpen,    setIsReviewOpen]    = useState(false);

  // ── Fetch products whenever any filter/page changes ─────────────────────────
  useEffect(() => {
    // Build query params for the API
    const params = {
      page,
      limit:    6,
      sort,
      maxPrice: priceRange,
    };

    // Filter by subcategory if one is selected, otherwise by main category
    if (selectedSub?._id) {
      params.category = selectedSub._id;
    } else if (selectedCategory?._id) {
      params.category = selectedCategory._id;
    }

    dispatch(fetchProducts(params));
  }, [dispatch, page, sort, priceRange, selectedSub, selectedCategory]);

  // ── Handlers ─────────────────────────────────────────────────────────────────
  const handleOpenReview = (product) => {
    setSelectedProduct(product);
    setIsReviewOpen(true);
  };

  return (
    <div className="min-h-screen bg-bg-light">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">

          {/* Sidebar — controls category selection + priceRange */}
          <Sidebar
            priceRange={priceRange}
            setPriceRange={(val) => dispatch(setPriceRange(val))}
          />

          <main className="flex-1 w-full">
            {/* TopBar — controls subcategory dropdown + sort */}
            <TopBar
              count={total}
              sort={sort}
              setSort={(val) => {
                dispatch(setSort(val));
                dispatch(setPage(1));
              }}
            />

            {/* Product grid with loading + error states */}
            <ProductGrid
              products={products}
              loading={loading}
              error={error}
              onOpenReview={handleOpenReview}
            />

            <ReviewModal
              isOpen={isReviewOpen}
              onClose={() => setIsReviewOpen(false)}
              product={selectedProduct}
            />

            {/* Pagination — only show when there's more than one page */}
            {pages > 1 && (
              <Pagination
                current={page}
                total={pages}
                onChange={(p) => dispatch(setPage(p))}
              />
            )}
          </main>
        </div>
      </div>
    </div>
  );
}