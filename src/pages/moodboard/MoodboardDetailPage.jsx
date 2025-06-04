// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { moodboardService } from '../../services/api';
// import './MoodboardDetailPage.css';

// const MoodboardDetailPage = () => {
//   const { id } = useParams();
//   const [moodboard, setMoodboard] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchMoodboard = async () => {
//       try {
//         const data = await moodboardService.getMoodboardById(id);
//         setMoodboard(data);
//         setLoading(false);
//       } catch (err) {
//         setError('Erreur lors du chargement du moodboard');
//         setLoading(false);
//       }
//     };

//     fetchMoodboard();
//   }, [id]);

//   if (loading) return <div className="loading">Chargement...</div>;
//   if (error) return <div className="error">{error}</div>;
//   if (!moodboard) return <div className="error">Moodboard non trouvé</div>;

//   return (
//     <div className="moodboard-detail-container">
//       <div className="moodboard-header">
//         <h1>{moodboard.title}</h1>
//         <p className="description">{moodboard.description}</p>
//       </div>
      
//       <div className="moodboard-content">
//         <div className="moodboard-images">
//           {moodboard.images.map((image, index) => (
//             <div key={index} className="moodboard-image-item">
//               <img src={image.url} alt={`Image ${index + 1}`} />
//               {image.description && <p className="image-description">{image.description}</p>}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MoodboardDetailPage; 