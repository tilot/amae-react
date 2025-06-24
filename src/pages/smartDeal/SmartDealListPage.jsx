import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { smartDealService } from '../../services/api';
import './SmartDealListPage.css';
import bonplan_img from '../../assets/images/bon_plan.webp';
import Footer_Fin from '../../components/Footer/Footer_Fin';

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
              <img src={bonplan_img} alt={deal.title} />
              {deal.discount && (
                <div className="discount-badge amae-badge">
                  -{deal.discount}%
                </div>
              )}
            </div>
            <div className="deal-info">
              <h2>{deal.title}</h2>
              <p className="smartdeal-name">{deal.name}</p>
              <p className="description">{deal.description}</p>
              
             
              
            </div>
          </div>
        ))}
      </div>
      <Footer_Fin/>
    </div>
  );
};

export default SmartDealListPage; 