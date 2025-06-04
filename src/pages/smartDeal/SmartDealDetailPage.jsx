import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { smartDealService } from '../../services/api';
import './SmartDealDetailPage.css';

const SmartDealDetailPage = () => {
  const { id } = useParams();
  const [deal, setDeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDeal = async () => {
      try {
        const data = await smartDealService.getSmartDealById(id);
        setDeal(data);
        setLoading(false);
      } catch (err) {
        setError('Erreur lors du chargement du smart deal');
        setLoading(false);
      }
    };

    fetchDeal();
  }, [id]);

  if (loading) return <div className="loading">Chargement...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!deal) return <div className="error">Smart deal non trouvé</div>;

  return (
    <div className="smart-deal-detail-container">
      <div className="deal-header">
        <div className="deal-image-container">
          <img src={deal.image} alt={deal.title} />
          {deal.discount && (
            <div className="discount-badge">
              -{deal.discount}%
            </div>
          )}
        </div>
        <div className="deal-info">
          <h1>{deal.title}</h1>
          <p className="description">{deal.description}</p>
          <div className="price-section">
            <div className="price-info">
              <span className="original-price">{deal.originalPrice}€</span>
              <span className="current-price">{deal.currentPrice}€</span>
            </div>
            <div className="savings">
              Économisez {deal.originalPrice - deal.currentPrice}€
            </div>
          </div>
          <div className="deal-meta">
            <div className="validity">
              <strong>Valable jusqu'au :</strong> {new Date(deal.validUntil).toLocaleDateString()}
            </div>
            <div className="stock">
              <strong>Stock disponible :</strong> {deal.stockQuantity}
            </div>
          </div>
          <button className="buy-button">Acheter maintenant</button>
        </div>
      </div>

      <div className="deal-details">
        <h2>Détails de l'offre</h2>
        <div className="details-content">
          {deal.details && deal.details.map((detail, index) => (
            <div key={index} className="detail-item">
              <h3>{detail.title}</h3>
              <p>{detail.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SmartDealDetailPage; 