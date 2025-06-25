import React from 'react';
import BlogCard from '../components/Blog/BlogCard';
import FooterGros from '../components/Footer/Footer_Gros';
import logoPapillon from '../assets/images/logo/noir.png';
import { Link } from 'react-router-dom';
import './BlogPage.css';
import logo from '../assets/images/logo-amae.png'

const articles = [
  {
    image: logo,
    title: "Nom de l'article",
    excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisi eu consectetur.",
    date: "10/06/2024",
    author: "Amaé Team"
  },
  {
    image: logo,
    title: "Nom de l'article",
    excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisi eu consectetur.",
    date: "09/06/2024",
    author: "Amaé Team"
  },
  {
    image: logo,
    title: "Nom de l'article",
    excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisi eu consectetur.",
    date: "08/06/2024",
    author: "Amaé Team"
  },
  {
    image: logo,
    title: "Nom de l'article",
    excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisi eu consectetur.",
    date: "07/06/2024",
    author: "Amaé Team"
  },
];

const BlogPage = () => {
  return (
    <div className="blog-page-container">
      {/* Header */}
      <header className="blog-header">
        <img src={logoPapillon} alt="Logo papillon Amaé" className="blog-logo" />
        <div className="blog-header-actions">
          <Link to="/login" className="blog-login">Se connecter</Link>
          <Link to="/register" className="blog-register">Créer un compte</Link>
        </div>
      </header>

      {/* Liste des articles */}
      <main className="blog-list">
        {articles.map((art, idx) => (
          <BlogCard key={idx} {...art} />
        ))}
      </main>

      {/* Footer */}
      <FooterGros />
    </div>
  );
};

export default BlogPage; 