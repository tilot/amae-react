import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { activityService } from '../../../services/api';
import './ActiviteList.css';

const ActiviteList = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const data = await activityService.getAllActivities();
        setActivities(data);
        setLoading(false);
      } catch (err) {
        setError('Erreur lors du chargement des activités');
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  if (loading) {
    return <div className="loading">Chargement des activités...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="activite-list">
      <h2>Nos Activités</h2>
      <div className="activities-grid">
        {activities.map((activity) => (
          <Link to={`/activite/${activity.id}`} key={activity.id} className="activity-card">
            <div className="activity-image">
              <img src={activity.image_url || '/default-activity.jpg'} alt={activity.title} />
            </div>
            <div className="activity-info">
              <h3>{activity.title}</h3>
              <p className="activity-description">{activity.description}</p>
              <div className="activity-meta">
                <span className="activity-date">
                  <i className="fas fa-calendar"></i> {new Date(activity.date).toLocaleDateString()}
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
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ActiviteList; 