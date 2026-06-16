import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail
} from 'firebase/auth';
import { useAppContext } from '../context/AppContext.jsx';
import { auth, googleProvider } from '../firebaseConfig.js';

export default function LoginPage() {
  const { t, language, setLanguage, updateUser } = useAppContext();
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [errors, setErrors] = useState({ email: '', password: '', fullName: '', auth: '', google: '' });
  const [isLoading, setIsLoading] = useState(false);
  const isAuthConfigured = !!auth && !!googleProvider;

  const validateFields = (email, password, fullName) => {
    const nextErrors = { email: '', password: '', fullName: '', auth: '', google: '' };
    let isValid = true;

    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      nextErrors.email = t('invalidEmail') || 'Please enter a valid email address.';
      isValid = false;
    }

    if (isSignUp) {
      if (!fullName || !fullName.trim()) {
        nextErrors.fullName = t('invalidFullName') || 'Please enter your full name.';
        isValid = false;
      }
      if (password.length < 6) {
        nextErrors.password = t('weakPassword') || 'Password must be at least 6 characters.';
        isValid = false;
      }
    } else {
      if (!password.trim()) {
        nextErrors.password = t('emptyPassword') || 'Password cannot be empty.';
        isValid = false;
      }
    }

    setErrors(nextErrors);
    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isLoading) return;

    const form = event.currentTarget;
    const email = form.email.value;
    const password = form.password.value;
    const fullName = isSignUp ? form.fullName.value : '';

    if (!validateFields(email, password, fullName)) {
      return;
    }

    if (!isAuthConfigured) {
      setErrors((prev) => ({
        ...prev,
        auth: t('authNotConfigured') || 'Authentication service not configured.'
      }));
      return;
    }

    try {
      setIsLoading(true);
      setErrors({ email: '', password: '', fullName: '', auth: '', google: '' });

      if (isSignUp) {
        // Sign Up with Email/Password
        const result = await createUserWithEmailAndPassword(auth, email, password);
        const user = result.user;

        // Save Name to Profile
        await updateProfile(user, { displayName: fullName });

        updateUser({
          uid: user.uid,
          displayName: fullName,
          email: user.email || '',
          photoURL: user.photoURL || ''
        });
      } else {
        // Login with Email/Password
        const result = await signInWithEmailAndPassword(auth, email, password);
        const user = result.user;

        updateUser({
          uid: user.uid,
          displayName: user.displayName || '',
          email: user.email || '',
          photoURL: user.photoURL || ''
        });
      }

      navigate('/target-bill');
    } catch (error) {
      console.error('Email/Password Auth Error:', error);
      let authErrorMessage = error.message;

      if (error.code === 'auth/email-already-in-use') {
        authErrorMessage = language === 'te'
          ? 'ఈ ఇమెయిల్ ఇప్పటికే వాడుకలో ఉంది.'
          : language === 'hi'
            ? 'यह ईमेल पहले से ही उपयोग में है।'
            : 'This email is already in use.';
      } else if (error.code === 'auth/invalid-credential' || error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
        authErrorMessage = language === 'te'
          ? 'చెల్లని ఇమెయిల్ లేదా పాస్‌వర్డ్.'
          : language === 'hi'
            ? 'अमान्य ईमेल या पासवर्ड।'
            : 'Invalid email or password.';
      } else if (error.code === 'auth/weak-password') {
        authErrorMessage = language === 'te'
          ? 'పాస్‌వర్డ్ బలంగా ఉండాలి.'
          : language === 'hi'
            ? 'पासवर्ड मजबूत होना चाहिए।'
            : 'Password should be stronger.';
      }

      setErrors((prev) => ({
        ...prev,
        auth: authErrorMessage
      }));
    } finally {
      setIsLoading(false);
    }
  };
  const handleForgotPassword = async () => {
    const emailInput = document.querySelector('input[name="email"]');
    const email = emailInput?.value?.trim();

    if (!email) {
      alert('Please enter your email first');
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      alert('Password reset link sent to your email');
    } catch (error) {
      console.error('Reset Password Error:', error);

      if (error.code === 'auth/user-not-found') {
        alert('No account found with this email');
      } else {
        alert('Failed to send password reset email');
      }
    }
  };
  const handleGoogleSignIn = async () => {
    if (!isAuthConfigured) {
      setErrors((prev) => ({
        ...prev,
        google: t('authNotConfigured')
      }));
      return;
    }

    try {
      setIsLoading(true);
      setErrors((prev) => ({ ...prev, google: '', auth: '' }));
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      updateUser({
        uid: user.uid,
        displayName: user.displayName || '',
        email: user.email || '',
        photoURL: user.photoURL || ''
      });

      navigate('/target-bill');
    } catch (error) {
      setErrors((prev) => ({ ...prev, google: t('googleSignInFailed') }));
      console.error('Google sign-in error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="panel login-panel glass-card">
      <div className="panel-intro">
        <span className="eyebrow">{t('welcome')}</span>
        <h2>{isSignUp ? t('signUpHeading') : t('loginHeading')}</h2>
        <p>{isSignUp ? t('signUpHeading') : t('signIn')}</p>
      </div>
      <form className="form-grid" onSubmit={handleSubmit}>
        {isSignUp && (
          <label>
            <span>{t('fullNameLabel')}</span>
            <input
              name="fullName"
              type="text"
              required
              placeholder={t('fullNamePlaceholder')}
            />
            {errors.fullName && <p className="field-error">{errors.fullName}</p>}
          </label>
        )}
        <label>
          <span>{t('emailLabel')}</span>
          <input
            name="email"
            type="email"
            required
            placeholder={t('emailPlaceholder')}
          />
          {errors.email && <p className="field-error">{errors.email}</p>}
        </label>
        <label>
          <span>{t('passwordLabel')}</span>
          <input
            name="password"
            type="password"
            required
            placeholder={t('passwordPlaceholder')}
          />
          {errors.password && <p className="field-error">{errors.password}</p>}
        </label>
        {errors.auth && <p className="field-error auth-error">{errors.auth}</p>}
        <div className="form-row split">
          <button type="submit" className="primary-button" disabled={isLoading}>
            {isLoading ? t('loading') : (isSignUp ? t('signUpButton') : t('loginButton'))}
          </button>
          {!isSignUp && (
            <button
              type="button"
              className="link-button"
              onClick={handleForgotPassword}
            >
              {t('forgotPassword')}
            </button>
          )}
        </div>
        <button
          type="button"
          className="secondary-button google-button"
          onClick={handleGoogleSignIn}
          disabled={!isAuthConfigured || isLoading}
        >
          {isLoading ? t('loading') : t('continueGoogle')}
        </button>
        {errors.google && <p className="field-error">{errors.google}</p>}
      </form>
      <footer className="panel-footer">
        <div className="toggle-mode-container">
          <button
            type="button"
            className="link-button toggle-mode-btn"
            onClick={() => {
              setIsSignUp(!isSignUp);
              setErrors({ email: '', password: '', fullName: '', auth: '', google: '' });
            }}
          >
            {isSignUp ? t('toggleLogin') : t('toggleSignUp')}
          </button>
        </div>
        <div className="language-display">
          <span>{t('languageLabel')}:</span>
          <strong>
            {language === 'en' ? t('languageEnglish') : language === 'te' ? t('languageTelugu') : t('languageHindi')}
          </strong>
        </div>
      </footer>
    </section>
  );
}
