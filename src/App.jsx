import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { useAppContext } from './context/AppContext.jsx';
import LoginPage from './pages/LoginPage.jsx';
import TargetBillPage from './pages/TargetBillPage.jsx';
import ApplianceSelectionPage from './pages/ApplianceSelectionPage.jsx';
import AnalyticsPage from './pages/AnalyticsPage.jsx';
import RecommendationsPage from './pages/RecommendationsPage.jsx';
import UserProfile from './components/UserProfile.jsx';
import SurveyDataPage from "./pages/SurveyDataPage.jsx";
<h1 style={{ color: "red" }}>TEST OK WORKING</h1>
function App() {
  const { t, language, setLanguage, user } = useAppContext();
  const location = useLocation();
  const isAuthenticated = !!user;

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="brand">
          <span className="brand-mark">⚡</span>
          <div>
            <h1>{t('appName')}</h1>
            <p>{t('brandTagline')}</p>
          </div>
        </div>
        <div className="top-tools">
          <nav className="top-nav">
            {!isAuthenticated && location.pathname !== '/' && <a href="/">{t('navLogin')}</a>}
            <a href="/target-bill">{t('navBudget')}</a>
            <a href="/appliances">{t('navAppliances')}</a>
            <a href="/analytics">{t('navAnalytics')}</a>
            <a href="/recommendations">{t('navChatbot')}</a>
          </nav>
          <div className="language-selector">
            <label htmlFor="language-select">{t('languageLabel')}</label>
            <select
              id="language-select"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="en">{t('languageEnglish')}</option>
              <option value="te">{t('languageTelugu')}</option>
              <option value="hi">{t('languageHindi')}</option>
            </select>
          </div>
          <UserProfile />
        </div>
      </header>
      <main className="page-content">
        <Routes>
          <Route path="/" element={isAuthenticated ? <Navigate to="/target-bill" replace /> : <LoginPage />} />
          <Route path="/target-bill" element={isAuthenticated ? <TargetBillPage /> : <Navigate to="/" replace />} />
          <Route path="/appliances" element={isAuthenticated ? <ApplianceSelectionPage /> : <Navigate to="/" replace />} />
          <Route path="/analytics" element={isAuthenticated ? <AnalyticsPage /> : <Navigate to="/" replace />} />
          <Route path="/recommendations" element={isAuthenticated ? <RecommendationsPage /> : <Navigate to="/" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
          <Route path="/survey-data" element={<SurveyDataPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
