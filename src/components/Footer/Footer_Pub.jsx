import React from 'react';
import './Footer_Pub.css';
import bannierePub from '../../assets/images/banniere_pub.png';

export default function Footer_Pub() {
  const handleClick = () => {
    window.open('https://google.com', '_blank', 'noopener,noreferrer');
  };

  return (
    <footer 
      className="footer-pub-container" 
      onClick={handleClick}
      style={{
        backgroundImage: `url(${bannierePub})`
      }}
    >
      <div className="footer-pub-content">
        
      </div>
    </footer>
  );
} 