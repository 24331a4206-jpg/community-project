import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { useAppContext } from '../context/AppContext.jsx';
import { auth } from '../firebaseConfig.js';

export default function UserProfile() {
  const { user, updateUser, t } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!user) return null;

  const handleLogout = async () => {
    try {
      if (auth) {
        await signOut(auth);
      }
    } catch (error) {
      console.error('Firebase signout error:', error);
    } finally {
      updateUser(null);
      navigate('/');
    }
  };

  const displayName = user.displayName || user.email?.split('@')[0] || 'User';
  const email = user.email || '';
  const photoURL = user.photoURL || '';

  return (
    <div className="user-profile" ref={dropdownRef}>
      <button
        type="button"
        className="profile-trigger"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        title={t('profileTooltip') || 'View profile'}
      >
        <span className="profile-name">{displayName}</span>
        {photoURL ? (
          <img src={photoURL} alt={displayName} className="profile-avatar" />
        ) : (
          <div className="profile-avatar-fallback">
            {displayName.charAt(0).toUpperCase()}
          </div>
        )}
      </button>

      {isOpen && (
        <div className="profile-dropdown glass-card">
          <div className="dropdown-info">
            <div className="dropdown-avatar-container">
              {photoURL ? (
                <img src={photoURL} alt={displayName} className="dropdown-avatar" />
              ) : (
                <div className="dropdown-avatar-fallback">
                  {displayName.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <div className="dropdown-text">
              <span className="dropdown-name">{displayName}</span>
              <span className="dropdown-email" title={email}>{email}</span>
            </div>
          </div>
          <div className="dropdown-divider"></div>
          <button type="button" className="logout-button" onClick={handleLogout}>
            <span className="logout-icon">🚪</span> {t('logoutButton') || 'Logout'}
          </button>
        </div>
      )}
    </div>
  );
}
