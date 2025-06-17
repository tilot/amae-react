import React, { useEffect } from 'react';
import Calendar from '../components/Calendar';
import { useNavigate } from 'react-router-dom';
import Footer_Fin from '../components/Footer/Footer_Fin';
import Footer_Pub from '../components/Footer/Footer_Pub';

const CalendarPage = () => {
  const navigate = useNavigate();
  // Récupère l'utilisateur connecté depuis le localStorage
  let user = null;
  try {
    user = JSON.parse(localStorage.getItem('user'));
  } catch {
    // Gestion silencieuse de l'erreur
  }
  const userId = user?.Id_User;

  useEffect(() => {
    if (!userId) {
      navigate('/login');
    }
  }, [userId, navigate]);

  if (!userId) return null;

  return (
    <>
      <Calendar userId={userId} />
      <Footer_Fin/>
      <Footer_Pub/>
    </>
  );
};

export default CalendarPage; 