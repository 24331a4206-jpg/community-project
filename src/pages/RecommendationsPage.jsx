import { useState, useRef, useEffect } from 'react';
import { useAppContext } from '../context/AppContext.jsx';

export default function RecommendationsPage() {
  const { t, totalBill, targetBill, getRecommendations, chatLog, isChatLoading, sendChat, resetAppliances } = useAppContext();
  const [message, setMessage] = useState('');
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatLog, isChatLoading]);

  const handleSend = () => {
    if (!message.trim() || isChatLoading) return;
    sendChat(message);
    setMessage('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <section className="panel glass-card recommendations-page">
      <div className="panel-intro">
        <span className="eyebrow">{t('recommendationsHeading')}</span>
        <h2>{t('chatbotHeading')}</h2>
        <p>{t('dynamicTip')}</p>
      </div>
      <div className="split-grid">
        <div className="recommendation-card">
          <h3>{t('comparedToTarget')}</h3>
          <p>{t('currentPlanText').replace('{total}', totalBill).replace('{target}', targetBill)}</p>
          <div className="tip-list">
            {getRecommendations().map((tip, index) => (
              <div key={index} className="tip-item">
                <span>{index + 1}</span>
                <p>{tip}</p>
              </div>
            ))}
          </div>
          <button type="button" className="secondary-button" onClick={resetAppliances}>
            {t('resetDefaults')}
          </button>
        </div>
        <div className="chat-panel">
          <div className="chat-history">
            {chatLog.map((entry, idx) => (
              <div key={idx} className={`chat-bubble ${entry.role}`}>
                <p>{entry.text}</p>
              </div>
            ))}
            {isChatLoading && (
              <div className="chat-bubble bot loading">
                <div className="dots-animation">
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="chat-form"
          >
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={isChatLoading ? (t('loading') || 'Thinking...') : t('talkPrompt')}
              disabled={isChatLoading}
            />
            <button type="submit" className="primary-button" disabled={isChatLoading}>
              {isChatLoading ? '...' : t('sendButton')}
            </button>
          </form>
          <div style={{ marginTop: "15px", textAlign: "center" }}>
            <button
              type="button"
              className="secondary-button"
              onClick={() => window.location.href = "/survey-data"}
            >
              📊 View Survey Data
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

