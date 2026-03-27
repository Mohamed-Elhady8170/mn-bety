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
    <div className="bg-bg-main p-4 border border-border-main rounded-2xl animate-pulse flex gap-4 shadow-sm">
      <div className="w-24 h-24 md:w-32 md:h-32 rounded-xl bg-bg-subtle shrink-0" />
      <div className="flex-1 space-y-3 py-1 text-right">
        <div className="h-5 bg-bg-subtle rounded-lg w-1/3" />
        <div className="h-3 bg-bg-subtle rounded-lg w-1/4" />
        <div className="h-3 bg-bg-subtle rounded-lg w-2/3" />
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
    <div className="min-h-screen bg-bg-main text-text-main py-10 px-4 md:px-12 font-body" dir="rtl">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="mb-10 text-right">
          <div className="flex items-center gap-2 text-primary mb-2">
            <Sparkles size={16} className="fill-current" />
            <span className="text-[17px] font-black uppercase tracking-widest">دليل المبدعين</span>
          </div>
          <h1 className="text-3xl font-black mb-2 tracking-tight">اكتشف لمسة الحرفيين</h1>
          {!loading && total > 0 && <p className="text-text-subtle font-medium text-sm">{total} حرفي جاهز لإبهارك</p>}
        </div>

        {/* Search Bar */}
        <div className="relative mb-10 group">
          <Search className="absolute right-5 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-primary transition-colors" size={20} />
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="ابحث عن حرفي، متجر، أو تخصص معين..."
            className="w-full py-4 pr-14 pl-6 text-base rounded-2xl border border-border-main bg-bg-subtle text-text-main focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all outline-none shadow-sm"
          />
        </div>

        {/* List Content */}
        {loading ? (
          <div className="grid gap-6">
            {[...Array(4)].map((_, i) => <SellerSkeleton key={i} />)}
          </div>
        ) : error ? (
          <div className="text-center py-16 bg-red-50 rounded-2xl border border-red-100"><p className="text-red-600 text-sm font-bold">{error}</p></div>
        ) : sellers.length === 0 ? (
          <div className="text-center py-20 border-2 border-dashed border-border-main rounded-3xl">
            <ShoppingBag size={48} className="mx-auto text-text-muted opacity-20 mb-4" />
            <p className="text-text-muted text-lg font-bold">لم نجد أي حرفي بهذا الاسم..</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {sellers.map((seller) => {
              const name = seller?.userId?.fullName ?? "حرفي";
              const logoUrl = seller?.logo?.url || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=f3ece8&color=956b50`;
              const location = [seller?.location?.city, seller?.location?.country].filter(Boolean).join("، ");

              return (
                <Link
                  key={seller?._id}
                  to={`/customer/seller-products/${seller?._id}`}
                  className="bg-bg-main p-5 border border-border-main rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 group hover:-translate-y-0.5 flex flex-col md:flex-row items-center gap-6"
                >
                  <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-xl overflow-hidden border border-border-main shrink-0">
                    <img src={logoUrl} alt={name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>

                  <div className="flex-1 text-center md:text-right">
                    <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                      <h3 className="font-black text-xl group-hover:text-primary transition-colors">{name}</h3>
                      {seller?.isApproved && <BadgeCheck size={18} className="text-primary fill-current" />}
                    </div>
                    
                    <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-4">
                      {location && <span className="flex items-center gap-1.5 text-text-subtle font-bold bg-bg-subtle px-2.5 py-1 rounded-lg text-xs"><MapPin size={14} /> {location}</span>}
                      <span className="flex items-center gap-1.5 text-yellow-600 font-bold bg-yellow-50 px-2.5 py-1 rounded-lg text-xs"><Star size={14} fill="currentColor" /> {seller?.rating?.toFixed(1) ?? "0.0"}</span>
                    </div>
                    
                    {seller?.description && <p className="text-text-subtle text-xs line-clamp-2 font-medium mb-2">{seller.description}</p>}
                  </div>

                  <div className="shrink-0">
                    <div className="px-5 py-2.5 rounded-xl border border-primary text-primary group-hover:bg-primary group-hover:text-white transition-all text-xs font-black flex items-center gap-2">
                      <span>عرض المتجر</span>
                      <ChevronLeft size={16} />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* Pagination */}
        {pages > 1 && !loading && (
          <div className="flex justify-center gap-2 mt-12" dir="ltr">
            {[...Array(pages)].map((_, i) => (
              <button
                key={i}
                onClick={() => dispatch(fetchPublicSellers({ page: i + 1, search: debouncedSearch || undefined }))}
                className={`w-10 h-10 rounded-xl text-sm font-black transition-all ${page === i + 1 ? "bg-primary text-white shadow-md shadow-primary/20" : "bg-bg-subtle border border-border-main text-text-main hover:bg-primary/5"}`}
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