import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { smartDealService } from '../../services/api';
import './SmartDealListPage.css';

const SmartDealListPage = () => {
  const [smartDeals, setSmartDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSmartDeals = async () => {
      try {
        const data = await smartDealService.getAllSmartDeals();
        setSmartDeals(data);
        setLoading(false);
      } catch {
        setError('Erreur lors du chargement des bons plans');
        setLoading(false);
      }
    };
    fetchSmartDeals();
  }, []);

  if (loading) return <div className="loading">Chargement...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="smart-deal-list-container amae-bg">
      <h1 className="amae-title">Bons Plans</h1>
      <div className="smart-deal-grid">
        {smartDeals.map((deal) => (
          <div key={deal.id} className="smart-deal-card amae-card">
            <div className="deal-image">
              <img src={deal.image} alt={deal.title} />
              {deal.discount && (
                <div className="discount-badge amae-badge">
                  -{deal.discount}%
                </div>
              )}
            </div>
            <div className="deal-info">
              <h2>{deal.title}</h2>
              <p className="description">{deal.description}</p>
              <div className="price-info">
                <span className="original-price">{deal.originalPrice}€</span>
                <span className="current-price">{deal.currentPrice}€</span>
              </div>
              <div className="deal-meta">
                <span className="validity">Valable jusqu'au {new Date(deal.validUntil).toLocaleDateString()}</span>
              </div>
              <Link to={`/smart-deal/${deal.id}`} className="amae-btn">
                Voir le bon plan
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SmartDealListPage; 