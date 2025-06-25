import React from 'react';
import './BlogCard.css';

const BlogCard = ({ image, title, excerpt, date, author }) => {
  return (
    <div className="blog-card">
      <div className="blog-card-image">
        <img src={image} alt={title} />
      </div>
      <div className="blog-card-content">
        <h3 className="blog-card-title">{title}</h3>
        <p className="blog-card-excerpt">{excerpt}</p>
        <div className="blog-card-meta">
          <span>{author}</span> · <span>{date}</span>
        </div>
      </div>
    </div>
  );
};

export default BlogCard; 