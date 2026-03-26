import React, { useEffect, useState } from "react";
import { Plus, Edit, Trash2, Search, Package, ToggleLeft, ToggleRight } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector }  from "react-redux";
import {
  fetchMyProducts,
  deleteProduct,
  toggleProductStatus,
  selectMyProducts,
  selectListLoading,
  selectListError,
  selectDeleting,
  selectToggling,
} from "../Features/Sellerproductslice";

// ── Get sellerId from your auth slice ─────────────────────────────────────────
// Replace with: useSelector(state => state.auth.sellerId)
// Your auth slice should store the seller's profile _id after login
const useSellerId = () => useSelector((state) => state.auth.sellerId ?? null);

export default function ManageProducts() {
  const dispatch   = useDispatch();
  const navigate   = useNavigate();
  const sellerId   = useSellerId();

  const products   = useSelector(selectMyProducts);
  const loading    = useSelector(selectListLoading);
  const error      = useSelector(selectListError);
  const deleting   = useSelector(selectDeleting);
  const toggling   = useSelector(selectToggling);

  const [search,     setSearch]     = useState("");
  const [deleteId,   setDeleteId]   = useState(null); // track which row is deleting

  // ── Fetch on mount ────────────────────────────────────────────────────────
  useEffect(() => {
    if (sellerId) dispatch(fetchMyProducts(sellerId));
  }, [dispatch, sellerId]);

  // ── Filtered list ─────────────────────────────────────────────────────────
  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  // ── Delete with confirm ───────────────────────────────────────────────────
  const handleDelete = (id) => {
    if (!window.confirm("هل أنت متأكد من حذف هذا المنتج؟")) return;
    setDeleteId(id);
    dispatch(deleteProduct(id)).finally(() => setDeleteId(null));
  };

  return (
    <div className="p-4 md:p-8 bg-bg-body min-h-screen font-cairo text-right" dir="rtl">

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-black text-text-main flex items-center gap-2">
            <Package className="text-primary" /> إدارة المنتجات
          </h1>
          <p className="text-text-soft text-sm mt-1">
            تحكم في منتجاتك، أضف جديداً أو عدل المخزون
          </p>
        </div>
        <NavLink
          to="/seller/addProduct"
          className="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-xl font-bold transition-all duration-200 flex items-center gap-2 shadow-lg shadow-primary/20 active:scale-95"
        >
          <Plus size={20} /> إضافة منتج جديد
        </NavLink>
      </div>

      <div className="bg-bg-main rounded-2xl border border-border-warm shadow-sm overflow-hidden">

        {/* Search */}
        <div className="p-4 border-b border-border-warm flex gap-4">
          <div className="relative flex-1 max-w-md group">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-text-soft group-focus-within:text-primary transition-colors duration-200" size={20} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="ابحث عن منتج..."
              className="w-full bg-bg-body border border-border-warm rounded-xl py-2.5 pr-10 pl-4 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-200 text-text-main placeholder-text-soft/50"
            />
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="p-12 text-center">
            <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-3" />
            <p className="text-text-soft text-sm">جاري التحميل...</p>
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <div className="p-8 text-center">
            <p className="text-red-500 text-sm">{error}</p>
          </div>
        )}

        {/* Empty */}
        {!loading && !error && filtered.length === 0 && (
          <div className="p-16 text-center">
            <Package size={48} className="mx-auto text-text-soft opacity-30 mb-3" />
            <p className="text-text-soft font-bold">
              {search ? "لا توجد نتائج للبحث" : "لم تضف أي منتجات بعد"}
            </p>
          </div>
        )}

        {/* Table */}
        {!loading && !error && filtered.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-right">
              <thead className="bg-bg-subtle text-text-soft text-sm border-b border-border-warm">
                <tr>
                  <th className="px-6 py-4 font-bold">المنتج</th>
                  <th className="px-6 py-4 font-bold">التصنيف</th>
                  <th className="px-6 py-4 font-bold">السعر</th>
                  <th className="px-6 py-4 font-bold">المخزون</th>
                  <th className="px-6 py-4 font-bold">الحالة</th>
                  <th className="px-6 py-4 font-bold">الموافقة</th>
                  <th className="px-6 py-4 font-bold text-center">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-warm">
                {filtered.map((product) => (
                  <tr key={product._id} className="hover:bg-bg-subtle/50 transition-colors duration-200">

                    {/* Product */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {product.images?.[0]?.url ? (
                          <img
                            src={product.images[0].url}
                            alt={product.name}
                            className="w-12 h-12 rounded-lg object-cover border border-border-warm"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-lg bg-bg-subtle flex items-center justify-center">
                            <Package size={20} className="text-text-soft" />
                          </div>
                        )}
                        <span className="font-bold text-text-main capitalize">{product.name}</span>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="px-6 py-4 text-text-soft capitalize">
                      {product.category?.name ?? "—"}
                    </td>

                    {/* Price */}
                    <td className="px-6 py-4 font-bold text-text-main">
                      {product.price.toLocaleString()} ج.م
                      {product.discountPrice > 0 && (
                        <span className="block text-xs text-green-600 font-normal">
                          خصم: {product.discountPrice.toLocaleString()} ج.م
                        </span>
                      )}
                    </td>

                    {/* Stock */}
                    <td className="px-6 py-4 text-text-soft">{product.stock} قطعة</td>

                    {/* Active status */}
                    <td className="px-6 py-4">
                      <button
                        onClick={() => dispatch(toggleProductStatus(product._id))}
                        disabled={toggling}
                        className="flex items-center gap-1.5 transition-colors disabled:opacity-50"
                        title="تبديل الحالة"
                      >
                        {product.isActive ? (
                          <>
                            <ToggleRight size={22} className="text-green-500" />
                            <span className="text-xs font-bold text-green-600 bg-icon-bg-green px-2 py-0.5 rounded-full">نشط</span>
                          </>
                        ) : (
                          <>
                            <ToggleLeft size={22} className="text-text-soft" />
                            <span className="text-xs font-bold text-red-text bg-red-soft px-2 py-0.5 rounded-full">
                              {product.stock === 0 ? "نفذت الكمية" : "غير نشط"}
                            </span>
                          </>
                        )}
                      </button>
                    </td>

                    {/* Approval */}
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        product.isApproved
                          ? "bg-icon-bg-green text-icon-green"
                          : "bg-amber-100 text-amber-700"
                      }`}>
                        {product.isApproved ? "معتمد" : "قيد المراجعة"}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => navigate(`/seller/editProduct/${product._id}`)}
                          className="p-2 text-icon-blue hover:bg-icon-bg-blue rounded-lg transition-colors duration-200"
                          title="تعديل"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(product._id)}
                          disabled={deleting && deleteId === product._id}
                          className="p-2 text-red-text hover:bg-red-soft rounded-lg transition-colors duration-200 disabled:opacity-50"
                          title="حذف"
                        >
                          {deleting && deleteId === product._id ? (
                            <div className="w-4 h-4 border-2 border-red-300 border-t-red-500 rounded-full animate-spin" />
                          ) : (
                            <Trash2 size={18} />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}