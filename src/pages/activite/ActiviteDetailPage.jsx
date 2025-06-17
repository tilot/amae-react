import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ActiviteInfo from '../../components/Activites/ActiviteDetail/ActiviteInfo';
import Footer_Fin from '../../components/Footer/Footer_Fin';
import Footer_Pub from '../../components/Footer/Footer_Pub';
import { activityService } from '../../services/api';
import './ActiviteDetailPage.css';

const ActiviteDetailPage = () => {
    const { id } = useParams();
    const [activite, setActivite] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchActivite = async () => {
            try {
                const data = await activityService.getActivityById(id);
                setActivite(data);
                setLoading(false);
            } catch {
                setError("Erreur lors du chargement de l'activité");
                setLoading(false);
            }
        };
        fetchActivite();
    }, [id]);

    if (loading) return <div className="loading">Chargement de l'activité...</div>;
    if (error) return <div className="error">{error}</div>;
    if (!activite) return null;

    return (
        <>
        <div className="activite-detail">
            <ActiviteInfo activite={activite} />
            <Footer_Fin />
            <Footer_Pub />
        </div>
        
        </>
    );
};

export default ActiviteDetailPage; 