import React, { useState, useEffect, useRef } from "react";
import { UploadCloud, Save, X, ArrowRight, ImageOff } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector }  from "react-redux";

// ── Seller product slice ───────────────────────────────────────────────────────
import {
  fetchProductForEdit,
  updateProduct,
  resetSaveState,
  clearEditProduct,
  selectEditProduct,
  selectEditProductLoading,
  selectEditProductError,
  selectSaving,
  selectSaveError,
  selectSaveSuccess,
} from "../Features/Sellerproductslice";

// ── Category slice ────────────────────────────────────────────────────────────
import {
  fetchRootCategories,
  fetchSubcategories,
  selectRootCategories,
  selectSubcategories,
} from "../../Users/Features/Categoryslice";

export default function EditProduct() {
  const { id }    = useParams();
  const dispatch  = useDispatch();
  const navigate  = useNavigate();
  const fileRef   = useRef(null);

  const editProduct        = useSelector(selectEditProduct);
  const editProductLoading = useSelector(selectEditProductLoading);
  const editProductError   = useSelector(selectEditProductError);
  const saving             = useSelector(selectSaving);
  const saveError          = useSelector(selectSaveError);
  const saveSuccess        = useSelector(selectSaveSuccess);
  const rootCategories     = useSelector(selectRootCategories);
  const subcategories      = useSelector(selectSubcategories);

  const [formData, setFormData] = useState({
    name:           "",
    description:    "",
    price:          "",
    discountPrice:  "",
    stock:          "",
    parentCategory: "",
    category:       "",
  });
  const [newImages,  setNewImages]  = useState([]);   // new File[] to upload
  const [newPreviews,setNewPreviews]= useState([]);   // dataURL[] for new
  const [keepOldImages, setKeepOldImages] = useState(true); // whether to replace or keep

  // ── Fetch product & categories on mount ──────────────────────────────────
  useEffect(() => {
    dispatch(fetchRootCategories());
    if (id) dispatch(fetchProductForEdit(id));
    return () => {
      dispatch(clearEditProduct());
      dispatch(resetSaveState());
    };
  }, [dispatch, id]);

  // ── Pre-fill form when product loads ─────────────────────────────────────
  useEffect(() => {
    if (editProduct) {
      const parentId = editProduct.category?.parent ?? "";
      const leafId   = editProduct.category?._id    ?? "";

      setFormData({
        name:           editProduct.name          ?? "",
        description:    editProduct.description   ?? "",
        price:          editProduct.price         ?? "",
        discountPrice:  editProduct.discountPrice ?? "",
        stock:          editProduct.stock         ?? "",
        parentCategory: parentId,
        category:       leafId,
      });

      // Load subcategories for the pre-selected parent
      if (parentId) dispatch(fetchSubcategories(parentId));
    }
  }, [editProduct, dispatch]);

  // ── Reload subcategories when user changes parent ─────────────────────────
  useEffect(() => {
    if (formData.parentCategory && editProduct) {
      // only re-fetch if user actively changed parent (not on initial load)
      if (formData.parentCategory !== (editProduct.category?.parent ?? "")) {
        dispatch(fetchSubcategories(formData.parentCategory));
        setFormData((prev) => ({ ...prev, category: "" }));
      }
    }
  }, [formData.parentCategory]); 

  // ── Navigate after success ────────────────────────────────────────────────
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

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 5);
    setNewImages(files);
    setNewPreviews(files.map((f) => URL.createObjectURL(f)));
    setKeepOldImages(false); // user chose new images → replace old
  };

  const removeNewImage = (i) => {
    setNewImages((prev) => prev.filter((_, idx) => idx !== i));
    setNewPreviews((prev) => prev.filter((_, idx) => idx !== i));
    if (newImages.length <= 1) setKeepOldImages(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("name",          formData.name);
    fd.append("description",   formData.description);
    fd.append("price",         formData.price);
    if (formData.discountPrice) fd.append("discountPrice", formData.discountPrice);
    fd.append("stock",         formData.stock);
    fd.append("category",      formData.category || formData.parentCategory);

    // Only append images if user selected new ones
    if (!keepOldImages) {
      newImages.forEach((file) => fd.append("productImages", file));
    }

    dispatch(updateProduct({ id, formData: fd }));
  };

  // ── Loading state ─────────────────────────────────────────────────────────
  if (editProductLoading) {
    return (
      <div className="p-8 min-h-screen bg-bg-body flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (editProductError) {
    return (
      <div className="p-8 min-h-screen bg-bg-body flex flex-col items-center justify-center gap-4" dir="rtl">
        <p className="text-red-500">{editProductError}</p>
        <button onClick={() => navigate(-1)} className="text-primary font-bold">العودة</button>
      </div>
    );
  }

  const existingImages = editProduct?.images ?? [];

  return (
    <div className="p-4 md:p-8 bg-bg-body min-h-screen font-cairo text-right" dir="rtl">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-text-main">تعديل المنتج</h1>
          <p className="text-text-soft text-sm mt-1 capitalize">{editProduct?.name}</p>
        </div>
        <button onClick={() => navigate(-1)}
          className="text-text-soft hover:text-primary flex items-center gap-1 text-sm font-bold">
          <ArrowRight size={18} /> العودة للمنتجات
        </button>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-8">

        {/* ── Text Fields ── */}
        <div className="flex-1 space-y-6 bg-bg-main p-6 rounded-2xl border border-border-warm shadow-sm">

          <div className="space-y-2">
            <label className="text-sm font-bold text-text-main">اسم المنتج</label>
            <input name="name" value={formData.name} onChange={handleChange} type="text"
              className="w-full bg-bg-body border border-border-warm rounded-xl py-3 px-4 focus:outline-none focus:border-primary text-text-main" required />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-bold text-text-main">السعر (ج.م)</label>
              <input name="price" value={formData.price} onChange={handleChange} type="number" min="0"
                className="w-full bg-bg-body border border-border-warm rounded-xl py-3 px-4 focus:outline-none focus:border-primary text-text-main" required />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-text-main">سعر الخصم</label>
              <input name="discountPrice" value={formData.discountPrice} onChange={handleChange} type="number" min="0"
                className="w-full bg-bg-body border border-border-warm rounded-xl py-3 px-4 focus:outline-none focus:border-primary text-text-main" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-text-main">المخزون</label>
              <input name="stock" value={formData.stock} onChange={handleChange} type="number" min="0"
                className="w-full bg-bg-body border border-border-warm rounded-xl py-3 px-4 focus:outline-none focus:border-primary text-text-main" required />
            </div>
          </div>

          {/* Category dropdowns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-bold text-text-main">التصنيف الرئيسي</label>
              <select name="parentCategory" value={formData.parentCategory} onChange={handleChange}
                className="w-full bg-bg-body border border-border-warm rounded-xl py-3 px-4 focus:outline-none focus:border-primary text-text-main appearance-none cursor-pointer">
                <option value="">اختر التصنيف...</option>
                {rootCategories.map((cat) => (
                  <option key={cat._id} value={cat._id}>{cat.name}</option>
                ))}
              </select>
            </div>
            {subcategories.length > 0 && (
              <div className="space-y-2">
                <label className="text-sm font-bold text-text-main">التصنيف الفرعي</label>
                <select name="category" value={formData.category} onChange={handleChange}
                  className="w-full bg-bg-body border border-border-warm rounded-xl py-3 px-4 focus:outline-none focus:border-primary text-text-main appearance-none cursor-pointer">
                  <option value="">اختر التصنيف الفرعي...</option>
                  {subcategories.map((sub) => (
                    <option key={sub._id} value={sub._id}>{sub.name}</option>
                  ))}
                </select>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-text-main">وصف المنتج</label>
            <textarea name="description" value={formData.description} onChange={handleChange}
              rows="4"
              className="w-full bg-bg-body border border-border-warm rounded-xl py-3 px-4 focus:outline-none focus:border-primary resize-none text-text-main" required />
          </div>
        </div>

        {/* ── Image & Actions ── */}
        <div className="w-full lg:w-1/3 space-y-6">
          <div className="bg-bg-main p-6 rounded-2xl border border-border-warm shadow-sm">
            <h3 className="font-bold text-text-main mb-4">صور المنتج</h3>

            {/* Existing images */}
            {keepOldImages && existingImages.length > 0 && (
              <div className="mb-4">
                <p className="text-xs text-text-soft mb-2">الصور الحالية</p>
                <div className="grid grid-cols-3 gap-2">
                  {existingImages.map((img, i) => (
                    <img key={i} src={img.url} alt={`img ${i}`}
                      className="w-full h-20 object-cover rounded-xl border border-border-warm" />
                  ))}
                </div>
              </div>
            )}

            {/* New image previews */}
            {newPreviews.length > 0 && (
              <div className="mb-4">
                <p className="text-xs text-green-600 mb-2">صور جديدة (ستحل محل القديمة)</p>
                <div className="grid grid-cols-3 gap-2">
                  {newPreviews.map((src, i) => (
                    <div key={i} className="relative group">
                      <img src={src} alt={`new ${i}`} className="w-full h-20 object-cover rounded-xl border border-green-300" />
                      <button type="button" onClick={() => removeNewImage(i)}
                        className="absolute top-1 left-1 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div onClick={() => fileRef.current?.click()}
              className="border-2 border-dashed border-border-warm rounded-xl bg-bg-body h-32 flex flex-col items-center justify-center cursor-pointer hover:border-primary hover:bg-bg-subtle/80 transition-all group">
              <UploadCloud className="text-primary group-hover:scale-110 transition-transform" size={28} />
              <p className="text-sm font-bold text-text-main mt-2">تغيير الصور</p>
              <p className="text-xs text-text-soft">PNG, JPG, WEBP حتى 5MB</p>
            </div>
            <input ref={fileRef} type="file" accept="image/*" multiple className="hidden" onChange={handleImageChange} />
          </div>

          {saveError && (
            <p className="text-xs text-red-500 bg-red-50 border border-red-200 rounded-xl p-3 text-center">{saveError}</p>
          )}
          {saveSuccess && (
            <p className="text-xs text-green-600 bg-green-50 border border-green-200 rounded-xl p-3 text-center font-bold">✅ تم تحديث المنتج!</p>
          )}

          <div className="flex gap-4">
            <button type="button" onClick={() => navigate(-1)}
              className="flex-1 bg-transparent border border-border-warm text-text-main py-3.5 rounded-xl font-bold hover:bg-bg-subtle transition-colors flex justify-center items-center gap-2">
              <X size={20} /> إلغاء
            </button>
            <button type="submit" disabled={saving}
              className="flex-1 bg-primary text-white py-3.5 rounded-xl font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 flex justify-center items-center gap-2 disabled:opacity-50 active:scale-95">
              {saving ? (
                <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> جاري التحديث...</>
              ) : (
                <><Save size={20} /> تحديث المنتج</>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}