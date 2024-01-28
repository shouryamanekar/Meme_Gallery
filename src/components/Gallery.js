// components/Gallery.js
import React from 'react';


const Gallery = ({ memes, onMemeClick }) => {
  return (
    <div className="gallery">
    {memes.map((meme, index) => (
      <div key={index} className="meme-card" onClick={() => onMemeClick(meme)}>
        {meme.post_hint === 'image' ? (
          <img src={meme.thumbnail} alt={meme.title} />
        ) : meme.post_hint === 'hosted:video' ? (
          <video loop>
            <source src={meme.url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : meme.post_hint === 'link'  && meme.url.includes('.gifv') ?(
            <video  loop>
              <source src={meme.url.replace('.gifv', '.mp4')} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
        ) : meme.post_hint === 'link' ? (
            <div>
                <img src={meme.thumbnail} alt={meme.title} />
                <a href={meme.url} target="_blank" rel="noopener noreferrer">
              Open Link
            </a>
            </div>
          ): (
            <p>Format Not Supported</p>
        ) }
        <div className="meme-details">
          <h3>{meme.title}</h3>
          <p>{`Upvotes ${meme.upvotes}   |   Comments ${meme.comments}`}</p>
        </div>
      </div>
    ))}


      {/* Styles */}
      <style jsx>{`
        .gallery {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-around;
        }

        .meme-card {
            height:auto;
          width: 270px; /* Adjust as needed */
          margin: 10px;
          cursor: pointer;
          border: 1px solid #ddd; /* Border for better visualization */
          border-radius: 8px;
          
          text-align: center;
          overflow: hidden;
        }

        img {
          width: 250px;
          height: 150px;
          border: 1px solid #ddd;
          margin: 10px;
          object-fit: fit;
          display : block;
        }

        video {
            width: 250px;
          height: 150px;
          border: 1px solid #ddd;
          margin: 10px;
          padding: 2px;
          object-fit: fit;
          display : block;
          
          }

        .meme-details {
          margin: 10px;
          
        }
      `}</style>
    </div>
  );
};

export default Gallery;
