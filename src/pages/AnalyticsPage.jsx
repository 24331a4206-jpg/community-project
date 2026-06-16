import { useNavigate } from 'react-router-dom';
import { LineChart, Line, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Cell, Legend } from 'recharts';
import { useAppContext } from '../context/AppContext.jsx';

export default function AnalyticsPage() {
  const { t, totalEnergyByAppliance, totalBill, budgetRatio, targetBill, chartData, baselineComparison } = useAppContext();
  const navigate = useNavigate();

  const averageBaseline =
    baselineComparison.reduce((sum, item) => sum + item.value, 0) /
    baselineComparison.length;

  const difference = Math.abs(totalBill - averageBaseline).toFixed(0);

  const comparisonStatus =
    totalBill < averageBaseline * 0.9
      ? 'lower'
      : totalBill > averageBaseline * 1.1
        ? 'higher'
        : 'average';

  return (
    <section className="panel glass-card analytics-page">
      <div className="panel-intro">
        <span className="eyebrow">{t('chartLabel')}</span>
        <h2>{t('currentBill')}</h2>
        <p>{t('comparedToTarget')}</p>
      </div>
      <div className="overview-grid">
        <div className="stat-card">
          <span>{t('totalBillLabel')}</span>
          <h3>₹{totalBill}</h3>
          <small>{t('targetValue')}: ₹{targetBill}</small>
        </div>
        <div className="stat-card progress-card">
          <span>{t('baselineComparison')}</span>
          <div className="progress-pill">
            <span className="progress-label">{budgetRatio}%</span>
            <div className="progress-track">
              <div className="progress-fill" style={{ width: `${budgetRatio}%` }} />
            </div>
          </div>
          <p className={budgetRatio > 100 ? 'warning' : 'success'}>
            {budgetRatio > 100 ? t('overBudget') : t('underBudget')}
          </p>
        </div>
      </div>

      <div className="chart-section">
        <div className="chart-card">
          <h3>{t('chartLabel')}</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={chartData} margin={{ top: 20, right: 24, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#7c3aed">
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index % 2 ? '#8b5cf6' : '#c084fc'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="chart-card">
          <h3>Electricity Usage Comparison Across 15 Surveyed Households (Srikakulam/Korni Study)</h3>
          <span className="chart-subtitle">
            Dataset: 15 Households Survey (Korni & Srikakulam)
          </span>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={baselineComparison} margin={{ top: 20, right: 24, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#14b8a6" strokeWidth={3} dot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className={`insight-card ${comparisonStatus}`}>
        {comparisonStatus === 'lower' && (
          <>
            <h2>😊 Great Job!</h2>
            <p>Your bill is lower than the average household.</p>
            <strong>₹{difference} Saved</strong>
          </>
        )}

        {comparisonStatus === 'higher' && (
          <>
            <h2>😢 High Consumption</h2>
            <p>Your bill is higher than the average household.</p>
            <strong>₹{difference} Extra Spent</strong>
          </>
        )}

        {comparisonStatus === 'average' && (
          <>
            <h2>🤔 Almost Average</h2>
            <p>Your bill is close to the average household.</p>
          </>
        )}
      </div>
      <div className="button-row">
        <button type="button" className="secondary-button" onClick={() => navigate('/appliances')}>
          {t('previousButton')}
        </button>
        <button type="button" className="primary-button" onClick={() => navigate('/recommendations')}>
          {t('nextButton')}
        </button>
      </div>
    </section>
  );
}
