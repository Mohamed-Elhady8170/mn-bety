import React, { useEffect, useState } from "react";
import { Plus, Edit, Trash2, Search, Package, ToggleLeft, ToggleRight } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector }  from "react-redux";
import { useTranslation } from "react-i18next";
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

export default function ManageProducts() {
  const { t } = useTranslation();
  const dispatch   = useDispatch();
  const navigate   = useNavigate();

  const products   = useSelector(selectMyProducts);
  const loading    = useSelector(selectListLoading);
  const error      = useSelector(selectListError);
  const deleting   = useSelector(selectDeleting);
  const toggling   = useSelector(selectToggling);

  const [search,     setSearch]     = useState("");
  const [deleteId,   setDeleteId]   = useState(null); // track which row is deleting

  // ── Fetch on mount ────────────────────────────────────────────────────────
 useEffect(() => {
  dispatch(fetchMyProducts());
}, [dispatch]);

  // ── Filtered list ─────────────────────────────────────────────────────────
  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  // ── Delete with confirm ───────────────────────────────────────────────────
  const handleDelete = (id) => {
    if (!window.confirm(t("seller.products_management.delete_confirm"))) return;
    setDeleteId(id);
    dispatch(deleteProduct(id)).finally(() => setDeleteId(null));
  };

  return (
    <div className="p-4 md:p-8 bg-bg-body min-h-screen font-cairo text-right" dir="rtl">

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-black text-text-main flex items-center gap-2">
            <Package className="text-primary" /> {t("seller.products_management.title")}
          </h1>
          <p className="text-text-soft text-sm mt-1">
            {t("seller.products_management.subtitle")}
          </p>
        </div>
        <NavLink
          to="/seller/addProduct"
          className="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-xl font-bold transition-all duration-200 flex items-center gap-2 shadow-lg shadow-primary/20 active:scale-95"
        >
          <Plus size={20} /> {t("seller.products_management.add_product_btn")}
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
              placeholder={t("seller.products_management.search_placeholder")}
              className="w-full bg-bg-body border border-border-warm rounded-xl py-2.5 pr-10 pl-4 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-200 text-text-main placeholder-text-soft/50"
            />
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="p-12 text-center">
            <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-3" />
            <p className="text-text-soft text-sm">{t("seller.products_management.loading")}</p>
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
              {search
                ? t("seller.products_management.empty_search")
                : t("seller.products_management.empty")}
            </p>
          </div>
        )}

        {/* Table */}
        {!loading && !error && filtered.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-right">
              <thead className="bg-bg-subtle text-text-soft text-sm border-b border-border-warm">
                <tr>
                  <th className="px-6 py-4 font-bold">{t("seller.products_management.product")}</th>
                  <th className="px-6 py-4 font-bold">{t("seller.products_management.category")}</th>
                  <th className="px-6 py-4 font-bold">{t("seller.products_management.price")}</th>
                  <th className="px-6 py-4 font-bold">{t("seller.products_management.stock")}</th>
                  <th className="px-6 py-4 font-bold">{t("seller.products_management.status")}</th>
                  <th className="px-6 py-4 font-bold">{t("seller.products_management.approval")}</th>
                  <th className="px-6 py-4 font-bold text-center">{t("seller.products_management.actions")}</th>
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
                      {product.price.toLocaleString()} {t("common.egp")}
                      {product.discountPrice > 0 && (
                        <span className="block text-xs text-green-600 font-normal">
                          {t("seller.products_management.discount")}: {product.discountPrice.toLocaleString()} {t("common.egp")}
                        </span>
                      )}
                    </td>

                    {/* Stock */}
                    <td className="px-6 py-4 text-text-soft">{product.stock} {t("seller.products_management.item_unit")}</td>

                    {/* Active status */}
                    <td className="px-6 py-4">
                      <button
                        onClick={() => dispatch(toggleProductStatus(product._id))}
                        disabled={toggling}
                        className="flex items-center gap-1.5 transition-colors disabled:opacity-50"
                        title={t("seller.products_management.toggle_status")}
                      >
                        {product.isActive ? (
                          <>
                            <ToggleRight size={22} className="text-green-500" />
                            <span className="text-xs font-bold text-green-600 bg-icon-bg-green px-2 py-0.5 rounded-full">{t("seller.products_management.status_active")}</span>
                          </>
                        ) : (
                          <>
                            <ToggleLeft size={22} className="text-text-soft" />
                            <span className="text-xs font-bold text-red-text bg-red-soft px-2 py-0.5 rounded-full">
                              {product.stock === 0
                                ? t("seller.products_management.status_out_of_stock")
                                : t("seller.products_management.status_inactive")}
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
                        {product.isApproved
                          ? t("seller.products_management.approved")
                          : t("seller.products_management.pending_review")}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => navigate(`/seller/editProduct/${product._id}`)}
                          className="p-2 text-icon-blue hover:bg-icon-bg-blue rounded-lg transition-colors duration-200"
                          title={t("seller.products_management.edit_btn")}
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(product._id)}
                          disabled={deleting && deleteId === product._id}
                          className="p-2 text-red-text hover:bg-red-soft rounded-lg transition-colors duration-200 disabled:opacity-50"
                          title={t("seller.products_management.delete_btn")}
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