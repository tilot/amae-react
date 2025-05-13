import React, { useState, useEffect } from 'react';
import { activityService } from '../services/api';
import { Link } from 'react-router-dom';
import './ActiviteListCategorie.css';

const ActiviteExterieurPage = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const data = await activityService.getOutsideActivities();
        setActivities(data);
        setLoading(false);
      } catch {
        setError('Erreur lors du chargement des activités d\'extérieur');
        setLoading(false);
      }
    };
    fetchActivities();
  }, []);

  return (
    <div className="activite-categorie-container">
      <div className="activite-categorie-header">
        <span className="menu-icon"><i className="fas fa-bars"></i></span>
        <h2>Activités Extérieur</h2>
        <span className="activite-categorie-count">{activities.length} items</span>
      </div>
      {loading && <div className="loading">Chargement...</div>}
      {error && <div className="error">{error}</div>}
      <div className="activite-categorie-list">
        {activities.map(activity => (
          <div className="activite-categorie-item" key={activity.id}>
            <img src={activity.image_url || '/default-activity.jpg'} alt={activity.title} className="activite-categorie-img" />
            <div className="activite-categorie-info">
              <h3>{activity.title}</h3>
              <div className="activite-categorie-meta">
                <span><i className="fas fa-calendar"></i> {new Date(activity.date).toLocaleDateString()}</span>
                <span><i className="fas fa-map-marker-alt"></i> {activity.location}</span>
              </div>
              <Link to={`/activite/${activity.id}`} className="activite-categorie-link">Voir l'activité</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActiviteExterieurPage; 