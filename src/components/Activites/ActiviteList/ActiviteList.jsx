import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { activityService } from '../../../services/api';
import './ActiviteList.css';

const ActiviteList = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all'); // 'all', 'inside', 'outside'

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const data = await activityService.getAllActivities();
        setActivities(data);
        setLoading(false);
      } catch {
        setError('Erreur lors du chargement des activités');
        setLoading(false);
      }
    };
    fetchActivities();
  }, []);

  const filteredActivities = activities.filter((activity) => {
    if (filter === 'inside') return activity.Id_Inside_Outside === 1;
    if (filter === 'outside') return activity.Id_Inside_Outside === 2;
    return true;
  });

  if (loading) {
    return <div className="loading">Chargement des activités...</div>;
  }
  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="activite-list amae-bg">
      <h2 className="amae-title">Activités</h2>
      <div className="amae-tabs">
        <button className={filter === 'all' ? 'amae-tab active' : 'amae-tab'} onClick={() => setFilter('all')}>Toutes</button>
        <button className={filter === 'inside' ? 'amae-tab active' : 'amae-tab'} onClick={() => setFilter('inside')}>Intérieur</button>
        <button className={filter === 'outside' ? 'amae-tab active' : 'amae-tab'} onClick={() => setFilter('outside')}>Extérieur</button>
      </div>
      <div className="activities-grid">
        {filteredActivities.map((activity) => (
          <div className="activity-card amae-card" key={activity.id}>
            <div className="activity-image">
              <img src={activity.image_url || '/default-activity.jpg'} alt={activity.title} />
            </div>
            <div className="activity-info">
              <h3>{activity.title}</h3>
              <p className="activity-description">{activity.description}</p>
              <div className="activity-meta">
                <span className="activity-date">
                  <i className="fas fa-calendar"></i> {activity.date ? new Date(activity.date).toLocaleDateString() : ''}
                </span>
                <span className="activity-location">
                  <i className="fas fa-map-marker-alt"></i> {activity.location}
                </span>
              </div>
              <div className="activity-details">
                <span className="activity-duration">
                  <i className="fas fa-clock"></i> {activity.duration} min
                </span>
                <span className="activity-capacity">
                  <i className="fas fa-users"></i> {activity.capacity} places
                </span>
              </div>
              <Link to={`/activite/${activity.id}`} className="amae-btn">
                Voir l'activité
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActiviteList; 