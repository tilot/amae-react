import React, { useEffect } from 'react';
import Calendar from '../components/Calendar';
import { useNavigate } from 'react-router-dom';

const CalendarPage = () => {
  const navigate = useNavigate();
  // Récupère l'utilisateur connecté depuis le localStorage
  let user = null;
  try {
    user = JSON.parse(localStorage.getItem('user'));
  } catch (e) {}
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
    </>
  );
};

export default CalendarPage; 