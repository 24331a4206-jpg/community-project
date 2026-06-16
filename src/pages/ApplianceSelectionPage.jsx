import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext.jsx';

export default function ApplianceSelectionPage() {
  const { t, appliances, updateWattage, updateRoomHours, addRoom } = useAppContext();
  const navigate = useNavigate();

  return (
    <section className="panel glass-card appliances-page">
      <div className="panel-intro">
        <span className="eyebrow">{t('appliancesHeading')}</span>
        <h2>{t('appliancesHeading')}</h2>
        <p>{t('appliancePageDescription')}</p>
      </div>
      <div className="appliance-grid">
        {appliances.map((appliance) => (
          <article key={appliance.id} className="appliance-card">
            <div className="appliance-card-header">
              <span className="appliance-icon">{appliance.icon}</span>
              <div>
                <h3>{appliance.name}</h3>
                <p>{appliance.defaultWattage} {t('wattageDefault')}</p>
              </div>
            </div>
            <label>
              {t('wattageLabel')}
              <input
                type="number"
                value={appliance.wattage}
                min="10"
                onChange={(e) => updateWattage(appliance.id, e.target.value)}
              />
            </label>
            <div className="room-list">
              {appliance.rooms.map((room) => (
                <div key={room.id} className="room-row">
                  <span>{room.label}</span>
                  <input
                    type="number"
                    value={room.hours}
                    min="0"
                    onChange={(e) => updateRoomHours(appliance.id, room.id, e.target.value)}
                  />
                </div>
              ))}
            </div>
            <button type="button" className="link-button" onClick={() => addRoom(appliance.id)}>
              {t('addRoom')}
            </button>
          </article>
        ))}
      </div>
      <div className="button-row">
        <button type="button" className="secondary-button" onClick={() => navigate('/target-bill')}>
          {t('previousButton')}
        </button>
        <button type="button" className="primary-button" onClick={() => navigate('/analytics')}>
          {t('nextButton')}
        </button>
      </div>
    </section>
  );
}
