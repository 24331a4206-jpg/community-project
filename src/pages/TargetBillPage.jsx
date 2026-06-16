import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext.jsx';

export default function TargetBillPage() {
  const { t, targetBill, updateTargetBill } = useAppContext();
  const navigate = useNavigate();

  return (
    <section className="panel glass-card">
      <div className="panel-intro">
        <span className="eyebrow">{t('targetBillHeading')}</span>
        <h2>{t('targetBillHeading')}</h2>
        <p>{t('targetBillHint')}</p>
      </div>
      <div className="budget-form">
        <label>
          <span>{t('targetBillPlaceholder')}</span>
          <input
            type="number"
            min="50"
            value={targetBill}
            onChange={(e) => updateTargetBill(e.target.value)}
            placeholder={t('targetBillPlaceholder')}
          />
        </label>
        <div className="button-row">
          <button type="button" className="secondary-button" onClick={() => navigate('/')}>
            {t('previousButton')}
          </button>
          <button type="button" className="primary-button" onClick={() => navigate('/appliances')}>
            {t('nextButton')}
          </button>
        </div>
      </div>
    </section>
  );
}
