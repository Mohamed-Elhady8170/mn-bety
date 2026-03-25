import React, { useState, useEffect } from "react";
import { useDispatch, useSelector }   from "react-redux";
import { useTranslation }             from "react-i18next";
import { FiX, FiStar }               from "react-icons/fi";
import {
  createReview,
  resetSubmitState,
  selectSubmitting,
  selectSubmitError,
  selectSubmitSuccess,
} from "../../Features/reviewSlice";

export function ReviewModal({ isOpen, onClose, product }) {
  const { t }    = useTranslation();
  const dispatch = useDispatch();

  const submitting    = useSelector(selectSubmitting);
  const submitError   = useSelector(selectSubmitError);
  const submitSuccess = useSelector(selectSubmitSuccess);

  const [rating,  setRating]  = useState(0);
  const [hover,   setHover]   = useState(0);
  const [comment, setComment] = useState("");

  // ── Auto-close after success ──────────────────────────────────────────────
  useEffect(() => {
    if (submitSuccess) {
      const timer = setTimeout(() => {
        dispatch(resetSubmitState());
        setRating(0);
        setComment("");
        onClose();
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [submitSuccess, dispatch, onClose]);

  // ── Reset when modal closes ───────────────────────────────────────────────
  useEffect(() => {
    if (!isOpen) {
      dispatch(resetSubmitState());
      setRating(0);
      setComment("");
    }
  }, [isOpen, dispatch]);

  if (!isOpen || !product) return null;

  const handleSubmit = () => {
    if (rating === 0) return;
    dispatch(createReview({
      productId: product._id,
      rating,
      comment: comment.trim() || undefined,
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">

        {/* Header */}
        <div className="relative p-6 border-b border-gray-100 flex flex-col items-center">
          <button onClick={onClose} className="absolute top-4 right-4 p-1.5 hover:bg-gray-100 rounded-full transition-colors">
            <FiX className="w-5 h-5 text-gray-400" />
          </button>

          {product.images?.[0]?.url ? (
            <img src={product.images[0].url} alt={product.name}
              className="w-16 h-16 rounded-2xl object-cover mb-3 shadow-md" />
          ) : (
            <div className="w-16 h-16 rounded-2xl bg-primary/10 mb-3 flex items-center justify-center text-primary font-bold text-xl">
              {product.name?.[0]?.toUpperCase()}
            </div>
          )}

          <h2 className="text-base font-bold text-gray-800 capitalize">
            {t("review_modal.title_prefix")} {product.name}
          </h2>
          <p className="text-xs text-gray-500 mt-1">{t("review_modal.help_text")}</p>
        </div>

        {/* Body */}
        <div className="p-6 text-center">
          {/* Stars */}
          <div className="flex justify-center gap-1.5 mb-2">
            {[...Array(5)].map((_, index) => {
              const val = index + 1;
              return (
                <button key={index} onClick={() => setRating(val)}
                  onMouseEnter={() => setHover(val)} onMouseLeave={() => setHover(0)}
                  className="transition-transform active:scale-90">
                  <FiStar className={`w-9 h-9 transition-colors ${val <= (hover || rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-200"}`} />
                </button>
              );
            })}
          </div>

          {rating === 0 && (
            <p className="text-xs text-red-400 mb-3">
              {t("review_modal.select_star") || "اختر عدد النجوم أولاً"}
            </p>
          )}

          <textarea
            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl text-sm focus:ring-1 focus:ring-primary focus:border-primary focus:outline-none transition-all h-24 resize-none mt-2"
            placeholder={t("review_modal.placeholder")}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            maxLength={1000}
          />

          {submitError && (
            <p className="text-xs text-red-500 mt-2 text-right">{submitError}</p>
          )}
          {submitSuccess && (
            <p className="text-xs text-green-500 mt-2 font-medium">
              ✅ {t("review_modal.success") || "تم إرسال تقييمك بنجاح!"}
            </p>
          )}

          <button onClick={handleSubmit} disabled={submitting || rating === 0}
            className="w-full mt-4 bg-primary text-white font-bold py-3 rounded-2xl shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
            {submitting ? (
              <>
                <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                {t("review_modal.submitting") || "جاري الإرسال..."}
              </>
            ) : t("review_modal.submit_btn")}
          </button>
        </div>
      </div>
    </div>
  );
}