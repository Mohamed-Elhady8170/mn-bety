import React, { useState, useEffect, useRef } from "react";
import { UploadCloud, Save, X, Image as ImageIcon }  from "lucide-react";
import { useNavigate }   from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

// ── Seller product slice ───────────────────────────────────────────────────────
import {
  createProduct,
  resetSaveState,
  selectSaving,
  selectSaveError,
  selectSaveSuccess,
} from "../Features/Sellerproductslice";

// ── Category slice — for the dropdown ────────────────────────────────────────
import {
  fetchRootCategories,
  fetchSubcategories,
  selectRootCategories,
  selectSubcategories,
} from "../../Users/Features/Categoryslice";

export default function AddProduct() {
  const { t } = useTranslation();
  const dispatch  = useDispatch();
  const navigate  = useNavigate();
  const fileRef   = useRef(null);

  const saving      = useSelector(selectSaving);
  const saveError   = useSelector(selectSaveError);
  const saveSuccess = useSelector(selectSaveSuccess);

  const rootCategories = useSelector(selectRootCategories);
  const subcategories  = useSelector(selectSubcategories);

  const [formData, setFormData] = useState({
    name:          "",
    description:   "",
    price:         "",
    discountPrice: "",
    stock:         "",
    parentCategory:"",
    category:      "",   // leaf category id — sent to API
  });

  const [images,    setImages]    = useState([]);   // File[]
  const [previews,  setPreviews]  = useState([]);   // dataURL[]

  // ── Load root categories for dropdown ────────────────────────────────────
  useEffect(() => {
    dispatch(fetchRootCategories());
  }, [dispatch]);

  // ── Load subcategories when parent changes ────────────────────────────────
  useEffect(() => {
    if (formData.parentCategory) {
      dispatch(fetchSubcategories(formData.parentCategory));
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData((prev) => ({ ...prev, category: "" }));
    }
  }, [formData.parentCategory, dispatch]);

  // ── Navigate away after success ───────────────────────────────────────────
  useEffect(() => {
    if (saveSuccess) {
      const t = setTimeout(() => {
        dispatch(resetSaveState());
        navigate("/seller/products");
      }, 800);
      return () => clearTimeout(t);
    }
  }, [saveSuccess, dispatch, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ── Image selection — max 5 ───────────────────────────────────────────────
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 5);
    setImages(files);
    setPreviews(files.map((f) => URL.createObjectURL(f)));
  };

  const removeImage = (i) => {
    setImages((prev) => prev.filter((_, idx) => idx !== i));
    setPreviews((prev) => prev.filter((_, idx) => idx !== i));
  };

  // ── Submit ────────────────────────────────────────────────────────────────
  const handleSubmit = (e) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append("name",        formData.name);
    fd.append("description", formData.description);
    fd.append("price",       formData.price);
    if (formData.discountPrice) fd.append("discountPrice", formData.discountPrice);
    fd.append("stock",       formData.stock);
    fd.append("category",    formData.category || formData.parentCategory);
    images.forEach((file) => fd.append("productImages", file)); 

    dispatch(createProduct(fd));
  };

  return (
    <div className="p-4 md:p-8 bg-bg-body min-h-screen font-cairo text-right" dir="rtl">
      <div className="mb-8">
        <h1 className="text-2xl font-black text-text-main">{t("seller.add_product.title")}</h1>
        <p className="text-text-soft text-sm mt-1">{t("seller.add_product.subtitle")}</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-8">

        {/* ── Text Fields ── */}
        <div className="flex-1 space-y-6 bg-bg-main p-6 rounded-2xl border border-border-warm shadow-sm">

          <div className="space-y-2">
            <label className="text-sm font-bold text-text-main">{t("seller.add_product.product_name")}</label>
            <input name="name" value={formData.name} onChange={handleChange} type="text"
              className="w-full bg-bg-body border border-border-warm rounded-xl py-3 px-4 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-text-main"
              placeholder={t("seller.add_product.product_name_placeholder")} required />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-bold text-text-main">{t("seller.add_product.price")}</label>
              <input name="price" value={formData.price} onChange={handleChange} type="number" min="0"
                className="w-full bg-bg-body border border-border-warm rounded-xl py-3 px-4 focus:outline-none focus:border-primary text-text-main"
                placeholder={t("seller.add_product.price_placeholder")} required />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-text-main">{t("seller.add_product.discount_price_optional")}</label>
              <input name="discountPrice" value={formData.discountPrice} onChange={handleChange} type="number" min="0"
                className="w-full bg-bg-body border border-border-warm rounded-xl py-3 px-4 focus:outline-none focus:border-primary text-text-main"
                placeholder={t("seller.add_product.price_placeholder")} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-text-main">{t("seller.add_product.stock")}</label>
              <input name="stock" value={formData.stock} onChange={handleChange} type="number" min="0"
                className="w-full bg-bg-body border border-border-warm rounded-xl py-3 px-4 focus:outline-none focus:border-primary text-text-main"
                placeholder={t("seller.add_product.stock_placeholder")} required />
            </div>
          </div>

          {/* Category — 2 level dropdown */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-bold text-text-main">{t("seller.add_product.category")}</label>
              <select name="parentCategory" value={formData.parentCategory} onChange={handleChange}
                className="w-full bg-bg-body border border-border-warm rounded-xl py-3 px-4 focus:outline-none focus:border-primary text-text-main appearance-none cursor-pointer"
                required>
                <option value="">{t("seller.add_product.category_placeholder")}</option>
                {rootCategories.map((cat) => (
                  <option key={cat._id} value={cat._id}>{cat.name}</option>
                ))}
              </select>
            </div>

            {subcategories.length > 0 && (
              <div className="space-y-2">
                <label className="text-sm font-bold text-text-main">{t("seller.add_product.subcategory")}</label>
                <select name="category" value={formData.category} onChange={handleChange}
                  className="w-full bg-bg-body border border-border-warm rounded-xl py-3 px-4 focus:outline-none focus:border-primary text-text-main appearance-none cursor-pointer"
                  required>
                  <option value="">{t("seller.add_product.subcategory_placeholder")}</option>
                  {subcategories.map((sub) => (
                    <option key={sub._id} value={sub._id}>{sub.name}</option>
                  ))}
                </select>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-text-main">{t("seller.add_product.description")}</label>
            <textarea name="description" value={formData.description} onChange={handleChange}
              rows="4"
              className="w-full bg-bg-body border border-border-warm rounded-xl py-3 px-4 focus:outline-none focus:border-primary resize-none text-text-main"
              placeholder={t("seller.add_product.description_placeholder")} required />
          </div>
        </div>

        {/* ── Image Upload & Actions ── */}
        <div className="w-full lg:w-1/3 space-y-6">
          <div className="bg-bg-main p-6 rounded-2xl border border-border-warm shadow-sm">
            <h3 className="font-bold text-text-main mb-4">{t("seller.add_product.product_images_limit")}</h3>

            {/* Previews */}
            {previews.length > 0 && (
              <div className="grid grid-cols-3 gap-2 mb-4">
                {previews.map((src, i) => (
                  <div key={i} className="relative group">
                    <img src={src} alt={`preview ${i}`} className="w-full h-20 object-cover rounded-xl border border-border-warm" />
                    <button type="button" onClick={() => removeImage(i)}
                      className="absolute top-1 left-1 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div
              onClick={() => fileRef.current?.click()}
              className="border-2 border-dashed border-border-warm rounded-xl bg-bg-body h-40 flex flex-col items-center justify-center text-center p-4 hover:bg-bg-subtle/80 hover:border-primary transition-all duration-300 cursor-pointer group"
            >
              <UploadCloud className="text-primary group-hover:scale-110 transition-transform duration-300" size={32} />
              <p className="font-bold text-text-main mt-2 text-sm">{t("seller.add_product.upload_text")}</p>
              <p className="text-xs text-text-soft mt-1">{t("seller.add_product.upload_hint")}</p>
            </div>
            <input ref={fileRef} type="file" accept="image/*" multiple className="hidden"
              onChange={handleImageChange} />
          </div>

          {saveError && (
            <p className="text-xs text-red-500 bg-red-50 border border-red-200 rounded-xl p-3 text-center">
              {saveError}
            </p>
          )}
          {saveSuccess && (
            <p className="text-xs text-green-600 bg-green-50 border border-green-200 rounded-xl p-3 text-center font-bold">
              {t("seller.add_product.save_success")}
            </p>
          )}

          <div className="flex gap-4">
            <button type="button" onClick={() => navigate("/seller/manageProducts")}
              className="flex-1 bg-transparent border border-border-warm text-text-main py-3.5 rounded-xl font-bold hover:bg-bg-subtle transition-colors flex justify-center items-center gap-2">
              <X size={20} /> {t("seller.add_product.cancel_btn")}
            </button>
            <button type="submit" disabled={saving}
              className="flex-1 bg-primary text-white py-3.5 rounded-xl font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 flex justify-center items-center gap-2 disabled:opacity-50 active:scale-95">
              {saving ? (
                <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> {t("seller.add_product.saving")}</>
              ) : (
                <><Save size={20} /> {t("seller.add_product.save_btn")}</>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}