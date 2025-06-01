import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { moodboardService } from '../services/api';
import './MoodboardListPage.css';

const MoodboardListPage = () => {
  const [moodboards, setMoodboards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMoodboards = async () => {
      try {
        const data = await moodboardService.getAllMoodboards();
        setMoodboards(data);
        setLoading(false);
      } catch (err) {
        setError('Erreur lors du chargement des moodboards');
        setLoading(false);
      }
    };

    fetchMoodboards();
  }, []);

  if (loading) return <div className="loading">Chargement...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="moodboard-list-container">
      <h1>Moodboards</h1>
      <div className="moodboard-grid">
        {moodboards.map((moodboard) => (
          <Link to={`/moodboard/${moodboard.id}`} key={moodboard.id} className="moodboard-card">
            <div className="moodboard-image">
              <img src={moodboard.coverImage} alt={moodboard.title} />
            </div>
            <div className="moodboard-info">
              <h2>{moodboard.title}</h2>
              <p>{moodboard.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MoodboardListPage; 