import React from 'react';
import FriendsManager from '../components/FriendsManager';

const FriendsPage = () => {
  let user = null;
  try {
    user = JSON.parse(localStorage.getItem('user'));
  } catch (e) {}
  const userId = user?.Id_User;

  if (!userId) return <div>Veuillez vous connecter pour gérer vos amis.</div>;

  return (
    <div style={{padding:'2rem'}}>
      <h2>Gestion de mes amis / proches / parents</h2>
      <FriendsManager userId={userId} />
    </div>
  );
};

export default FriendsPage; 