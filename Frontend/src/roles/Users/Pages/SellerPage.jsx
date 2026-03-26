import React, { useEffect, useCallback } from "react";
import { Star, MapPin, BadgeCheck, ChevronLeft, Sparkles, Search, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPublicSellers,
  setSearchTerm,
  selectSellers,
  selectSellersLoading,
  selectSellersError,
  selectSellersTotal,
  selectSellersPages,
  selectCurrentSellerPage,
  selectSearchTerm,
} from "../Features/Sellerslice";

// ── Debounce hook ──────────────────────────────────────────────────────────────
function useDebounce(value, delay = 400) {
  const [debounced, setDebounced] = React.useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

// ── Skeleton card ──────────────────────────────────────────────────────────────
function SellerSkeleton() {
  return (
    <div className="bg-bg-main p-6 border border-border-main rounded-2xl animate-pulse flex gap-6">
      <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl bg-bg-subtle shrink-0" />
      <div className="flex-1 space-y-3 py-2">
        <div className="h-5 bg-bg-subtle rounded w-1/3" />
        <div className="h-3 bg-bg-subtle rounded w-1/4" />
        <div className="h-3 bg-bg-subtle rounded w-2/5 mt-4" />
      </div>
    </div>
  );
}

export default function SellersPage() {
  const dispatch   = useDispatch();
  const sellers    = useSelector(selectSellers);
  const loading    = useSelector(selectSellersLoading);
  const error      = useSelector(selectSellersError);
  const total      = useSelector(selectSellersTotal);
  const pages      = useSelector(selectSellersPages);
  const page       = useSelector(selectCurrentSellerPage);
  const searchTerm = useSelector(selectSearchTerm);

  const debouncedSearch = useDebounce(searchTerm, 400);

  // ── Fetch whenever search or page changes ──────────────────────────────────
  useEffect(() => {
    dispatch(fetchPublicSellers({
      page,
      limit: 10,
      search: debouncedSearch || undefined,
    }));
  }, [dispatch, page, debouncedSearch]);

  const handleSearch = useCallback(
    (e) => dispatch(setSearchTerm(e.target.value)),
    [dispatch]
  );

  return (
    <div
      className="min-h-screen bg-bg-main text-text-main py-12 px-4 md:px-20 font-body transition-colors duration-300"
      dir="rtl"
    >
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 text-primary mb-2">
            <Sparkles size={18} />
            <span className="text-sm font-bold uppercase tracking-widest">قائمة المبدعين</span>
          </div>
          <h1 className="text-4xl font-black mb-1">اكتشف الحرفيين</h1>
          {!loading && total > 0 && (
            <p className="text-text-subtle text-sm">{total} حرفي مسجل</p>
          )}
        </div>

        {/* Search */}
        <div className="relative mb-10 group">
          <Search
            className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-primary transition-colors"
            size={22}
          />
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="ابحث عن بائع أو تخصص..."
            className="w-full py-5 pr-14 text-lg rounded-xl border border-border-main bg-bg-subtle text-text-main placeholder:text-text-subtle focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 outline-none"
          />
        </div>

        {/* Error */}
        {error && !loading && (
          <div className="text-center py-16">
            <p className="text-red-500 text-sm">{error}</p>
          </div>
        )}

        {/* Loading skeletons */}
        {loading && (
          <div className="grid gap-6">
            {[...Array(4)].map((_, i) => <SellerSkeleton key={i} />)}
          </div>
        )}

        {/* Empty */}
        {!loading && !error && sellers.length === 0 && (
          <div className="text-center py-24 border-2 border-dashed border-border-main rounded-3xl">
            <ShoppingBag size={48} className="mx-auto text-text-muted opacity-30 mb-4" />
            <p className="text-text-muted text-xl font-bold">لا يوجد حرفيون مطابقون للبحث.</p>
          </div>
        )}

        {/* Sellers list */}
        {!loading && !error && sellers.length > 0 && (
          <div className="grid gap-6">
            {sellers.map((seller) => {
              const name     = seller.userId?.fullName ?? "بائع";
              const logoUrl  = seller.logo?.url
                || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=f3ece8&color=956b50`;
              const city     = seller.location?.city    ?? "";
              const country  = seller.location?.country ?? "";
              const location = [city, country].filter(Boolean).join("، ");

              return (
                <Link
                  key={seller._id}
                  to={`/user/seller-products/${seller._id}`}
                  className="bg-bg-main p-6 border border-border-main rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group hover:-translate-y-1 flex flex-col md:flex-row items-center justify-between"
                >
                  {/* Avatar + info */}
                  <div className="flex items-center gap-6 w-full md:w-auto">
                    <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden border-2 border-border-main group-hover:border-primary/50 transition-colors shrink-0">
                      <img
                        src={logoUrl}
                        alt={name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=f3ece8&color=956b50`;
                        }}
                      />
                    </div>

                    <div className="text-right">
                      <div className="flex items-center gap-2 mb-1.5">
                        <h3 className="font-bold text-xl text-text-main group-hover:text-primary transition-colors">
                          {name}
                        </h3>
                        {seller.isApproved && (
                          <BadgeCheck size={20} className="text-primary fill-current" />
                        )}
                      </div>

                      <div className="flex flex-wrap gap-y-2 gap-x-4 text-sm">
                        {location && (
                          <span className="flex items-center gap-1 text-text-subtle">
                            <MapPin size={14} className="text-primary" /> {location}
                          </span>
                        )}
                        {seller.description && (
                          <span className="px-3 py-1 rounded-lg text-xs font-bold bg-primary/10 text-primary flex items-center gap-1">
                            <ShoppingBag size={12} />
                            {seller.description.slice(0, 40)}
                            {seller.description.length > 40 ? "..." : ""}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Rating + CTA */}
                  <div className="flex items-center gap-8 mt-6 md:mt-0 w-full md:w-auto justify-between border-t md:border-t-0 border-border-main pt-4 md:pt-0">
                    <div className="flex flex-col items-center md:items-end">
                      <div className="flex items-center gap-1.5 text-yellow-500 font-black text-lg">
                        <span>{seller.rating?.toFixed(1) ?? "0.0"}</span>
                        <Star size={18} fill="currentColor" />
                      </div>
                      <span className="text-xs text-text-muted">تقييم البائع</span>
                    </div>

                    <button className="px-5 py-2 rounded-xl border-2 border-primary text-primary hover:bg-primary hover:text-white transition-colors text-sm font-bold flex items-center gap-2">
                      <span>معرفة المزيد</span>
                      <ChevronLeft size={18} />
                    </button>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* Pagination */}
        {pages > 1 && !loading && (
          <div className="flex justify-center gap-2 mt-10" dir="ltr">
            {[...Array(pages)].map((_, i) => (
              <button
                key={i}
                onClick={() => dispatch(fetchPublicSellers({ page: i + 1, search: debouncedSearch || undefined }))}
                className={`w-9 h-9 rounded-xl text-sm font-semibold transition-all ${
                  page === i + 1
                    ? "bg-primary text-white shadow-md"
                    : "border border-border-main text-text-main hover:bg-primary/10"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}