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

function useDebounce(value, delay = 400) {
  const [debounced, setDebounced] = React.useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

function SellerSkeleton() {
  return (
    <div className="bg-bg-main p-6 border border-border-main rounded-4xl animate-pulse flex gap-6 shadow-sm">
      <div className="w-32 h-32 md:w-40 md:h-40 rounded-3xl bg-bg-subtle shrink-0" />
      <div className="flex-1 space-y-4 py-2 text-right">
        <div className="h-6 bg-bg-subtle rounded-xl w-1/3" />
        <div className="h-4 bg-bg-subtle rounded-xl w-1/4" />
        <div className="h-4 bg-bg-subtle rounded-xl w-2/3" />
      </div>
    </div>
  );
}

export default function SellersPage() {
  const dispatch = useDispatch();
  const sellers = useSelector(selectSellers);
  const loading = useSelector(selectSellersLoading);
  const error = useSelector(selectSellersError);
  const total = useSelector(selectSellersTotal);
  const pages = useSelector(selectSellersPages);
  const page = useSelector(selectCurrentSellerPage);
  const searchTerm = useSelector(selectSearchTerm);
  const debouncedSearch = useDebounce(searchTerm, 400);

  useEffect(() => {
    dispatch(fetchPublicSellers({
      page,
      limit: 10,
      search: debouncedSearch || undefined,
    }));
  }, [dispatch, page, debouncedSearch]);

  const handleSearch = useCallback((e) => dispatch(setSearchTerm(e.target.value)), [dispatch]);

  return (
    <div className="min-h-screen bg-bg-main text-text-main py-16 px-4 md:px-20 font-body" dir="rtl">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="mb-14 text-right">
          <div className="flex items-center gap-2 text-primary mb-3">
            <Sparkles size={20} className="fill-current" />
            <span className="text-sm font-black uppercase tracking-[0.2em]">دليل المبدعين</span>
          </div>
          <h1 className="text-5xl font-black mb-3 tracking-tight">اكتشف لمسة الحرفيين</h1>
          {!loading && total > 0 && <p className="text-text-subtle font-medium text-lg">{total} حرفي جاهز لإبهارك</p>}
        </div>

        {/* Search Bar */}
        <div className="relative mb-14 group">
          <Search className="absolute right-6 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-primary transition-colors" size={24} />
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="ابحث عن حرفي، متجر، أو تخصص معين..."
            className="w-full py-6 pr-16 pl-8 text-xl rounded-3xl border-2 border-border-main bg-bg-subtle text-text-main focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all duration-300 outline-none shadow-sm"
          />
        </div>

        {/* List Content */}
        {loading ? (
          <div className="grid gap-8">
            {[...Array(4)].map((_, i) => <SellerSkeleton key={i} />)}
          </div>
        ) : error ? (
          <div className="text-center py-20 bg-red-50 rounded-3xl border border-red-100"><p className="text-red-600 font-bold">{error}</p></div>
        ) : sellers.length === 0 ? (
          <div className="text-center py-32 border-4 border-dashed border-border-main rounded-[3rem]">
            <ShoppingBag size={64} className="mx-auto text-text-muted opacity-20 mb-6" />
            <p className="text-text-muted text-2xl font-black">لم نجد أي حرفي بهذا الاسم..</p>
          </div>
        ) : (
          <div className="grid gap-8">
            {sellers.map((seller) => {
              const name = seller?.userId?.fullName ?? "حرفي";
              const logoUrl = seller?.logo?.url || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=f3ece8&color=956b50`;
              const location = [seller?.location?.city, seller?.location?.country].filter(Boolean).join("، ");

              return (
                <Link
                  key={seller?._id}
                  to={`/user/seller-products/${seller?._id}`}
                  className="bg-bg-main p-6 border-2 border-border-main rounded-[2.5rem] shadow-sm hover:shadow-2xl transition-all duration-500 group hover:-translate-y-1 flex flex-col md:flex-row items-center gap-8"
                >
                  <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-3xl overflow-hidden border-4 border-border-main shrink-0">
                    <img src={logoUrl} alt={name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  </div>

                  <div className="flex-1 text-center md:text-right">
                    <div className="flex items-center justify-center md:justify-start gap-3 mb-3">
                      <h3 className="font-black text-2xl group-hover:text-primary transition-colors">{name}</h3>
                      {seller?.isApproved && <BadgeCheck size={24} className="text-primary fill-current" />}
                    </div>
                    
                    <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-6">
                      {location && <span className="flex items-center gap-1.5 text-text-subtle font-bold bg-bg-subtle px-3 py-1.5 rounded-xl text-sm"><MapPin size={16} /> {location}</span>}
                      <span className="flex items-center gap-1.5 text-yellow-600 font-bold bg-yellow-50 px-3 py-1.5 rounded-xl text-sm"><Star size={16} fill="currentColor" /> {seller?.rating?.toFixed(1) ?? "0.0"}</span>
                    </div>
                    
                    {seller?.description && <p className="text-text-subtle line-clamp-2 font-medium mb-4">{seller.description}</p>}
                  </div>

                  <div className="shrink-0 flex flex-col items-center gap-2">
                    <div className="px-6 py-3 rounded-2xl border-2 border-primary text-primary group-hover:bg-primary group-hover:text-white transition-all font-black flex items-center gap-2">
                      <span>عرض المتجر</span>
                      <ChevronLeft size={20} />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* Pagination */}
        {pages > 1 && !loading && (
          <div className="flex justify-center gap-3 mt-16" dir="ltr">
            {[...Array(pages)].map((_, i) => (
              <button
                key={i}
                onClick={() => dispatch(fetchPublicSellers({ page: i + 1, search: debouncedSearch || undefined }))}
                className={`w-12 h-12 rounded-2xl text-lg font-black transition-all shadow-sm ${page === i + 1 ? "bg-primary text-white scale-110 shadow-primary/30" : "bg-bg-subtle border border-border-main text-text-main hover:bg-primary/10"}`}
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