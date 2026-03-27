/**
 * @file useEmailVerification.js
 * @desc  Custom hook — checks if the current user has verified their email.
 *        Pure logic only — NO JSX inside.
 *        Toast UI is handled by toast.js utility.
 *
 * @usage
 *   const { checkVerified, isVerified } = useEmailVerification();
 *
 *   const handleAction = async () => {
 *     const ok = await checkVerified();
 *     if (!ok) return; // toast already shown
 *     // ... proceed
 *   };
 */

import { useSelector, useDispatch } from 'react-redux';
import { resendVerificationThunk } from '../Auth/Features/authThunks';
import { showVerificationToast } from '../lib/toast';

const useEmailVerification = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  /**
   * @desc  Call before any action that requires email verification.
   * @returns {Promise<boolean>} true if verified, false otherwise (toast shown)
   */
  const checkVerified = async () => {
    if (user?.emailVerified) return true;

    // Not verified → show rich toast with resend button
    showVerificationToast({
      onResend: async () => {
        const result = await dispatch(resendVerificationThunk());
        if (resendVerificationThunk.fulfilled.match(result)) {
          return { success: true, message: result.payload || 'تم إرسال رابط التحقق بنجاح!' };
        }
        // Backend messages:
        // "Please wait before requesting another verification email." → cooldown
        // other errors
        return {
          success: false,
          message: result.payload || 'حدث خطأ أثناء الإرسال. حاول مجدداً.',
        };
      },
    });

    return false;
  };

  return {
    checkVerified,
    isVerified: !!user?.emailVerified,
  };
};

export default useEmailVerification;