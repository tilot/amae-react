import React from 'react';
import './Footer_Gros.css';
import logoAmae from '../../assets/images/logo-amae.png';

export default function Footer_Gros() {
  return (
    <footer className="footer-container">
      <div className="footer-curve">
        <img src={logoAmae} alt="Logo Amae" className="footer-logo" />
      </div>
      <div className="footer-content">
        <div className="footer-links">
          <a href="#contact">Contact</a>
          <a href="#cgu">Conditions générales d'utilisation</a>
          <a href="#cgv">Conditions générales de ventes</a>
        </div>
        <div className="footer-socials">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="24" height="24" rx="8" fill="#fff"/>
              <path d="M16.98 8.27a.7.7 0 1 1-1.4 0 .7.7 0 0 1 1.4 0ZM12 9.5A2.5 2.5 0 1 0 12 14.5 2.5 2.5 0 0 0 12 9.5ZM12 13.2A1.2 1.2 0 1 1 12 10.8a1.2 1.2 0 0 1 0 2.4ZM17.5 8.5c-.02-.54-.09-.91-.2-1.23a2.75 2.75 0 0 0-1.57-1.57c-.32-.11-.69-.18-1.23-.2-.54-.02-.71-.02-2.1-.02s-1.56 0-2.1.02c-.54.02-.91.09-1.23.2a2.75 2.75 0 0 0-1.57 1.57c-.11.32-.18.69-.2 1.23-.02.54-.02.71-.02 2.1s0 1.56.02 2.1c.02.54.09.91.2 1.23a2.75 2.75 0 0 0 1.57 1.57c.32.11.69.18 1.23.2.54.02.71.02 2.1.02s1.56 0 2.1-.02c.54-.02.91-.09 1.23-.2a2.75 2.75 0 0 0 1.57-1.57c.11-.32.18-.69.2-1.23.02-.54.02-.71.02-2.1s0-1.56-.02-2.1Zm-1.32 5.13a1.57 1.57 0 0 1-.89.89c-.62.25-2.09.19-2.29.19s-1.67.06-2.29-.19a1.57 1.57 0 0 1-.89-.89c-.25-.62-.19-2.09-.19-2.29s-.06-1.67.19-2.29a1.57 1.57 0 0 1 .89-.89c.62-.25 2.09-.19 2.29-.19s1.67-.06 2.29.19a1.57 1.57 0 0 1 .89.89c.25.62.19 2.09.19 2.29s.06 1.67-.19 2.29Z" fill="#B7A3CC"/>
            </svg>
          </a>
          <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="24" height="24" rx="8" fill="#fff"/>
              <path d="M16.5 8.5V13.5C16.5 15.43 14.93 17 13 17C11.07 17 9.5 15.43 9.5 13.5C9.5 11.57 11.07 10 13 10C13.28 10 13.55 10.03 13.8 10.09V8.5C13.8 8.22 14.02 8 14.3 8H16.5C16.78 8 17 8.22 17 8.5C17 8.78 16.78 9 16.5 9H14.8V13.5C14.8 14.33 14.13 15 13.3 15C12.47 15 11.8 14.33 11.8 13.5C11.8 12.67 12.47 12 13.3 12C13.58 12 13.85 12.03 14.1 12.09V10.5C14.1 10.22 14.32 10 14.6 10H16.5C16.78 10 17 10.22 17 10.5C17 10.78 16.78 11 16.5 11H14.6V13.5C14.6 14.05 14.05 14.6 13.5 14.6C12.95 14.6 12.4 14.05 12.4 13.5C12.4 12.95 12.95 12.4 13.5 12.4C13.78 12.4 14.05 12.43 14.3 12.49V8.5C14.3 8.22 14.52 8 14.8 8H16.5C16.78 8 17 8.22 17 8.5Z" fill="#B7A3CC"/>
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
} 