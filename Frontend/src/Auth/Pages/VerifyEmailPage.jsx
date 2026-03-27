import React, { useEffect, useState, useCallback } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CheckCircle, XCircle, Loader, Mail, ArrowRight, RefreshCw } from 'lucide-react';
import { verifyEmailThunk, resendVerificationThunk } from '../Features/authThunks';
import { showSuccess, showError } from '../../lib/toast';

/**
 * @file VerifyEmailPage.jsx
 * @desc  Handles the email verification link.
 *        URL: /verify-email?token=xxxx
 *
 * Flow:
 *  1. Read token from URL
 *  2. POST /auth/verify-email with { token } in body
 *  3. Success → countdown → redirect to /customer or /auth/login
 *  4. Error → show resend option (no redirect to login)
 *
 * Resend:
 *  - If user is logged in  → uses privateAxios (resendVerificationThunk)
 *  - If not logged in → shows message to login first
 *  - Cooldown handled by backend message: "Please wait before requesting another verification email."
 */
const VerifyEmailPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, accessToken } = useSelector((state) => state.auth);
  const isLoggedIn = !!(user && accessToken);

  const [status, setStatus] = useState('loading'); // 'loading' | 'success' | 'error'
  const [message, setMessage] = useState('');
  const [countdown, setCountdown] = useState(5);

  // Resend state
  const [resendStatus, setResendStatus] = useState('idle'); // 'idle' | 'sending' | 'sent' | 'error' | 'cooldown'
  const [resendMessage, setResendMessage] = useState('');
  const [cooldownSeconds, setCooldownSeconds] = useState(0);

  // ─── Verify on mount ───────────────────────────────────────────────────────
  useEffect(() => {
    const token = searchParams.get('token');

    if (!token) {
      setStatus('error');
      setMessage('رابط التحقق غير صالح. لم يتم العثور على رمز التحقق في الرابط.');
      return;
    }

    let isMounted = true;

    const verify = async () => {
      const result = await dispatch(verifyEmailThunk(token));

      if (!isMounted) return;

      if (verifyEmailThunk.fulfilled.match(result)) {
        setStatus('success');
        setMessage('تم التحقق من بريدك الإلكتروني بنجاح!');

        // Countdown then redirect
        let count = 5;
        const interval = setInterval(() => {
          count -= 1;
          setCountdown(count);
          if (count === 0) {
            clearInterval(interval);
            navigate(isLoggedIn ? '/customer' : '/auth/login', { replace: true });
          }
        }, 1000);

        return () => clearInterval(interval);
      } else {
        setStatus('error');
        setMessage(result.payload || 'رابط التحقق غير صالح أو منتهي الصلاحية.');
      }
    };

    verify();

    return () => { isMounted = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ─── Cooldown timer ────────────────────────────────────────────────────────
  useEffect(() => {
    if (cooldownSeconds <= 0) return;
    const timer = setInterval(() => {
      setCooldownSeconds((s) => {
        if (s <= 1) {
          clearInterval(timer);
          setResendStatus('idle');
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldownSeconds]);

  // ─── Resend handler ────────────────────────────────────────────────────────
  const handleResend = useCallback(async () => {
    // User not logged in → can't resend (private route)
    if (!isLoggedIn) {
      setResendStatus('error');
      setResendMessage('يجب تسجيل الدخول أولاً لإعادة إرسال رابط التحقق.');
      return;
    }

    setResendStatus('sending');
    setResendMessage('');

    const result = await dispatch(resendVerificationThunk());

    if (resendVerificationThunk.fulfilled.match(result)) {
      setResendStatus('sent');
      setResendMessage('تم إرسال رابط تحقق جديد! راجع صندوق الوارد.');
      showSuccess('تم إرسال رابط التحقق إلى بريدك الإلكتروني');
    } else {
      const errorMsg = result.payload || '';

      // Backend cooldown message
      const isCooldown =
        errorMsg.includes('Please wait') ||
        errorMsg.includes('wait before') ||
        errorMsg.includes('recently sent');

      if (isCooldown) {
        // Start 60-second cooldown
        setResendStatus('cooldown');
        setCooldownSeconds(60);
        setResendMessage('يرجى الانتظار دقيقة قبل طلب رابط تحقق جديد.');
      } else {
        setResendStatus('error');
        setResendMessage(errorMsg || 'حدث خطأ أثناء الإرسال. حاول مجدداً.');
        showError(errorMsg || 'حدث خطأ أثناء الإرسال');
      }
    }
  }, [dispatch, isLoggedIn]);

  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-bg-light font-cairo">
      <div className="w-full max-w-md bg-bg-main rounded-2xl shadow-xl border border-border-warm p-8 text-center">

        {/* ─── Loading ──────────────────────────────────────────────────── */}
        {status === 'loading' && (
          <div className="flex flex-col items-center gap-5">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
              <Loader className="w-10 h-10 text-primary animate-spin" />
            </div>
            <div>
              <h2 className="text-xl font-black text-text-main mb-1">جاري التحقق...</h2>
              <p className="text-text-subtle text-sm">لحظة من فضلك، نتحقق من رابطك</p>
            </div>
          </div>
        )}

        {/* ─── Success ──────────────────────────────────────────────────── */}
        {status === 'success' && (
          <div className="flex flex-col items-center gap-5 animate-fadeIn">
            <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-500/10 flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-green-500" />
            </div>
            <div>
              <h2 className="text-xl font-black text-text-main mb-1">🎉 تم التحقق بنجاح!</h2>
              <p className="text-text-subtle text-sm">{message}</p>
            </div>

            <div className="w-full p-4 rounded-xl bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 text-green-700 dark:text-green-400 text-sm">
              سيتم تحويلك تلقائياً خلال{' '}
              <span className="font-black text-lg">{countdown}</span>{' '}
              ثوانٍ...
            </div>

            <button
              onClick={() =>
                navigate(isLoggedIn ? '/customer' : '/auth/login', { replace: true })
              }
              className="flex items-center gap-2 text-primary font-bold hover:underline text-sm"
            >
              <span>انتقل الآن</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* ─── Error ────────────────────────────────────────────────────── */}
        {status === 'error' && (
          <div className="flex flex-col items-center gap-5 animate-fadeIn">
            <div className="w-20 h-20 rounded-full bg-red-soft flex items-center justify-center">
              <XCircle className="w-10 h-10 text-red-text" />
            </div>
            <div>
              <h2 className="text-xl font-black text-text-main mb-1">فشل التحقق</h2>
              <p className="text-text-subtle text-sm">{message}</p>
            </div>

            {/* ─── Resend Section ──────────────────────────────────────── */}
            <div className="w-full border-t border-border-warm pt-5 space-y-3">
              <p className="text-text-subtle text-sm font-medium">
                هل تريد إعادة إرسال رابط التحقق؟
              </p>

              {/* idle */}
              {resendStatus === 'idle' && (
                <button
                  onClick={handleResend}
                  className="flex items-center justify-center gap-2 w-full h-11 bg-primary hover:bg-[#d43d0a] text-white rounded-xl font-bold text-sm transition-all active:scale-[0.98]"
                >
                  <Mail className="w-4 h-4" />
                  <span>إعادة إرسال رابط التحقق</span>
                </button>
              )}

              {/* sending */}
              {resendStatus === 'sending' && (
                <button
                  disabled
                  className="flex items-center justify-center gap-2 w-full h-11 bg-primary/60 text-white rounded-xl font-bold text-sm cursor-not-allowed"
                >
                  <Loader className="w-4 h-4 animate-spin" />
                  <span>جاري الإرسال...</span>
                </button>
              )}

              {/* sent */}
              {resendStatus === 'sent' && (
                <div className="p-3 rounded-xl bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 text-green-700 dark:text-green-400 text-sm text-right">
                  ✅ {resendMessage}
                </div>
              )}

              {/* cooldown */}
              {resendStatus === 'cooldown' && (
                <div className="space-y-2">
                  <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 text-amber-700 dark:text-amber-400 text-sm text-right">
                    ⏱️ {resendMessage}
                  </div>
                  <button
                    disabled
                    className="flex items-center justify-center gap-2 w-full h-11 bg-bg-subtle text-text-subtle rounded-xl font-bold text-sm cursor-not-allowed border border-border-warm"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>إعادة المحاولة بعد {cooldownSeconds} ثانية</span>
                  </button>
                </div>
              )}

              {/* error */}
              {resendStatus === 'error' && (
                <div className="space-y-2">
                  <div className="p-3 rounded-xl bg-red-soft border border-red-200 text-red-text text-sm text-right">
                    ❌ {resendMessage}
                  </div>
                  {!isLoggedIn ? (
                    <button
                      onClick={() => navigate('/auth/login')}
                      className="flex items-center justify-center gap-2 w-full h-11 bg-primary hover:bg-[#d43d0a] text-white rounded-xl font-bold text-sm transition-all"
                    >
                      <span>تسجيل الدخول</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => setResendStatus('idle')}
                      className="text-primary text-sm font-bold hover:underline"
                    >
                      حاول مجدداً
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Back to login */}
            <button
              onClick={() => navigate('/auth/login')}
              className="flex items-center gap-1 text-sm text-text-subtle hover:text-primary transition-colors"
            >
              <ArrowRight className="w-4 h-4" />
              <span>العودة لتسجيل الدخول</span>
            </button>
          </div>
        )}
      </div>
    </main>
  );
};

export default VerifyEmailPage;