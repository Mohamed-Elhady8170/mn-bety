/**
 * @file toast.js
 * @desc  Unified notification utility.
 *        Import this everywhere — never call react-hot-toast directly.
 *
 * @usage
 *   import { showSuccess, showError, showWarning, showInfo } from '@/lib/toast';
 *   showSuccess('تم الحفظ بنجاح');
 *   showError('حدث خطأ ما');
 *   showWarning('تحقق من بريدك الإلكتروني');
 *   showInfo('...', { duration: 8000 });
 *   showVerificationToast({ onResend: async () => { ... } });
 */

import toast from 'react-hot-toast';
import { createElement } from 'react';

// ─── Base styles ──────────────────────────────────────────────────────────────

const BASE_STYLE = {
  fontFamily: 'Cairo, sans-serif',
  borderRadius: '14px',
  padding: '14px 18px',
  fontSize: '14px',
  maxWidth: '380px',
  direction: 'rtl',
  textAlign: 'right',
};

const SUCCESS_STYLE = {
  ...BASE_STYLE,
  background: 'var(--color-bg-main, #fff)',
  border: '1.5px solid #22c55e40',
  color: 'var(--color-text-main, #1a1a1a)',
  boxShadow: '0 4px 24px 0 #22c55e18',
};

const ERROR_STYLE = {
  ...BASE_STYLE,
  background: 'var(--color-bg-main, #fff)',
  border: '1.5px solid #ef444440',
  color: 'var(--color-text-main, #1a1a1a)',
  boxShadow: '0 4px 24px 0 #ef444418',
};

const WARNING_STYLE = {
  ...BASE_STYLE,
  background: 'var(--color-bg-main, #fff)',
  border: '1.5px solid #ec5e0c40',
  color: 'var(--color-text-main, #1a1a1a)',
  boxShadow: '0 4px 24px 0 #ec5e0c18',
};

const INFO_STYLE = {
  ...BASE_STYLE,
  background: 'var(--color-bg-main, #fff)',
  border: '1.5px solid #3b82f640',
  color: 'var(--color-text-main, #1a1a1a)',
  boxShadow: '0 4px 24px 0 #3b82f618',
};

// ─── Simple toasts ────────────────────────────────────────────────────────────

export const showSuccess = (message, opts = {}) =>
  toast.success(message, {
    style: SUCCESS_STYLE,
    iconTheme: { primary: '#22c55e', secondary: '#fff' },
    duration: 4000,
    ...opts,
  });

export const showError = (message, opts = {}) =>
  toast.error(message, {
    style: ERROR_STYLE,
    iconTheme: { primary: '#ef4444', secondary: '#fff' },
    duration: 5000,
    ...opts,
  });

export const showWarning = (message, opts = {}) =>
  toast(message, {
    style: WARNING_STYLE,
    icon: '⚠️',
    duration: 5000,
    ...opts,
  });

export const showInfo = (message, opts = {}) =>
  toast(message, {
    style: INFO_STYLE,
    icon: 'ℹ️',
    duration: 4000,
    ...opts,
  });

// ─── Email verification toast (rich) ─────────────────────────────────────────

/**
 * @desc  Shows a rich toast prompting the user to verify their email.
 *        Has a resend button with cooldown feedback.
 *
 * @param {Object}   options
 * @param {Function} options.onResend - async function to call on resend click
 *                   Should return { success: boolean, message?: string }
 */
export const showVerificationToast = ({ onResend } = {}) => {
  toast(
    (t) =>
      createElement(
        'div',
        {
          style: {
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            direction: 'rtl',
            textAlign: 'right',
            fontFamily: 'Cairo, sans-serif',
          },
        },
        // Header row
        createElement(
          'div',
          { style: { display: 'flex', alignItems: 'center', gap: '10px' } },
          createElement(
            'div',
            {
              style: {
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: '#ec5e0c18',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '18px',
                flexShrink: 0,
              },
            },
            '📧'
          ),
          createElement(
            'p',
            {
              style: {
                fontWeight: '700',
                fontSize: '15px',
                margin: 0,
                color: 'var(--color-text-main, #1a1a1a)',
              },
            },
            'تحقق من بريدك الإلكتروني'
          )
        ),
        // Body
        createElement(
          'p',
          {
            style: {
              fontSize: '13px',
              color: 'var(--color-text-subtle, #6b6b6b)',
              margin: 0,
              lineHeight: '1.6',
            },
          },
          'يجب التحقق من بريدك الإلكتروني أولاً للقيام بهذا الإجراء. راجع صندوق الوارد أو رسائل الـ Spam.'
        ),
        // Actions row
        createElement(
          'div',
          {
            style: {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: '4px',
            },
          },
          // Resend button
          onResend
            ? createElement(
                'button',
                {
                  onClick: async () => {
                    toast.dismiss(t.id);
                    const result = await onResend();
                    if (result?.success) {
                      showSuccess(result.message || 'تم إرسال رابط التحقق بنجاح!');
                    } else {
                      showError(result?.message || 'حدث خطأ أثناء الإرسال');
                    }
                  },
                  style: {
                    background: 'none',
                    border: 'none',
                    color: '#ec5e0c',
                    fontWeight: '700',
                    fontSize: '13px',
                    cursor: 'pointer',
                    padding: '4px 0',
                    fontFamily: 'Cairo, sans-serif',
                    textDecoration: 'underline',
                    textUnderlineOffset: '3px',
                  },
                },
                'إعادة إرسال رابط التحقق'
              )
            : null,
          // Dismiss button
          createElement(
            'button',
            {
              onClick: () => toast.dismiss(t.id),
              style: {
                background: 'none',
                border: 'none',
                color: 'var(--color-text-subtle, #6b6b6b)',
                fontSize: '12px',
                cursor: 'pointer',
                padding: '4px 8px',
                fontFamily: 'Cairo, sans-serif',
              },
            },
            'إغلاق'
          )
        )
      ),
    {
      duration: 10000,
      style: {
        ...WARNING_STYLE,
        padding: '16px',
      },
      icon: null,
    }
  );
};

// ─── Register success toast ───────────────────────────────────────────────────

/**
 * @desc  Shows toast after successful registration asking user to verify email.
 * @param {string} email - The email address to display
 */
export const showRegisterSuccessToast = (email) => {
  toast(
    (t) =>
      createElement(
        'div',
        {
          style: {
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            direction: 'rtl',
            textAlign: 'right',
            fontFamily: 'Cairo, sans-serif',
          },
        },
        createElement(
          'div',
          { style: { display: 'flex', alignItems: 'center', gap: '10px' } },
          createElement(
            'div',
            {
              style: {
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: '#22c55e18',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '18px',
                flexShrink: 0,
              },
            },
            '✉️'
          ),
          createElement(
            'p',
            {
              style: {
                fontWeight: '700',
                fontSize: '15px',
                margin: 0,
                color: 'var(--color-text-main, #1a1a1a)',
              },
            },
            'تحقق من بريدك الإلكتروني'
          )
        ),
        createElement(
          'p',
          {
            style: {
              fontSize: '13px',
              color: 'var(--color-text-subtle, #6b6b6b)',
              margin: 0,
              lineHeight: '1.6',
            },
          },
          `أرسلنا رابط التحقق إلى `
        ),
        createElement(
          'p',
          {
            style: {
              fontSize: '13px',
              fontWeight: '700',
              margin: 0,
              color: 'var(--color-text-main, #1a1a1a)',
              direction: 'ltr',
              textAlign: 'left',
            },
          },
          email
        ),
        createElement(
          'p',
          {
            style: {
              fontSize: '12px',
              color: 'var(--color-text-subtle, #6b6b6b)',
              margin: 0,
            },
          },
          'افتح بريدك وانقر على الرابط للتفعيل.'
        ),
        createElement(
          'button',
          {
            onClick: () => toast.dismiss(t.id),
            style: {
              background: 'none',
              border: 'none',
              color: 'var(--color-text-subtle, #6b6b6b)',
              fontSize: '12px',
              cursor: 'pointer',
              padding: '4px 0',
              fontFamily: 'Cairo, sans-serif',
              alignSelf: 'flex-end',
            },
          },
          'حسناً، فهمت ✓'
        )
      ),
    {
      duration: 12000,
      style: {
        ...SUCCESS_STYLE,
        padding: '16px',
      },
      icon: null,
    }
  );
};

// ─── Forgot password success toast ───────────────────────────────────────────

/**
 * @desc  Shows toast after forgot password — tells user to check email
 * @param {string} email
 */
export const showForgotPasswordToast = (email) => {
  toast(
    (t) =>
      createElement(
        'div',
        {
          style: {
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            direction: 'rtl',
            textAlign: 'right',
            fontFamily: 'Cairo, sans-serif',
          },
        },
        createElement(
          'div',
          { style: { display: 'flex', alignItems: 'center', gap: '10px' } },
          createElement(
            'div',
            {
              style: {
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: '#3b82f618',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '18px',
                flexShrink: 0,
              },
            },
            '🔐'
          ),
          createElement(
            'p',
            {
              style: {
                fontWeight: '700',
                fontSize: '15px',
                margin: 0,
                color: 'var(--color-text-main, #1a1a1a)',
              },
            },
            'تم إرسال رابط إعادة التعيين'
          )
        ),
        createElement(
          'p',
          {
            style: {
              fontSize: '13px',
              color: 'var(--color-text-subtle, #6b6b6b)',
              margin: 0,
              lineHeight: '1.6',
            },
          },
          'تم إرسال رابط إعادة تعيين كلمة المرور إلى'
        ),
        createElement(
          'p',
          {
            style: {
              fontSize: '13px',
              fontWeight: '700',
              margin: 0,
              color: 'var(--color-text-main, #1a1a1a)',
              direction: 'ltr',
              textAlign: 'left',
            },
          },
          email
        ),
        createElement(
          'p',
          {
            style: {
              fontSize: '12px',
              color: 'var(--color-text-subtle, #6b6b6b)',
              margin: 0,
            },
          },
          'الرابط صالح لمدة 15 دقيقة فقط. راجع رسائل الـ Spam إذا لم تجده.'
        ),
        createElement(
          'button',
          {
            onClick: () => toast.dismiss(t.id),
            style: {
              background: 'none',
              border: 'none',
              color: 'var(--color-text-subtle, #6b6b6b)',
              fontSize: '12px',
              cursor: 'pointer',
              padding: '4px 0',
              fontFamily: 'Cairo, sans-serif',
              alignSelf: 'flex-end',
            },
          },
          'حسناً ✓'
        )
      ),
    {
      duration: 12000,
      style: {
        ...INFO_STYLE,
        padding: '16px',
      },
      icon: null,
    }
  );
};