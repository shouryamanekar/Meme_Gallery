// pages/index.js
import { useEffect, useState } from 'react';
import axios from 'axios';
import Gallery from '../components/Gallery';
import './index.css'



const Home = () => {
    const [memes, setMemes] = useState([]);
    const [after, setAfter] = useState(null);
    const [loading, setLoading] = useState(false);
    const [noMoreContent, setNoMoreContent] = useState(false);
    const [selectedMeme, setSelectedMeme] = useState(null);
  
    const fetchMoreMemes = async () => {
      try {
        setLoading(true);
  
        const response = await axios.get(`https://www.reddit.com/r/memes.json?after=${after || ''}`);
        console.log('API Response:', response.data);
  
        const newMemeData = response.data.data.children.map((child) => ({
          id: child.data.id,
          title: child.data.title,
          thumbnail: child.data.thumbnail,
          url: child.data.url,
          upvotes: child.data.ups,
          downvotes: child.data.downs,
          comments: child.data.num_comments,
          post_hint: child.data.post_hint,
        }));
  
        setAfter(response.data.data.after);
  
        if (newMemeData.length === 0) {
          setNoMoreContent(true);
        } else {
          setMemes((prevMemes) => [...prevMemes, ...newMemeData]);
        }
  
        setLoading(false);
      } catch (error) {
        console.error('Error fetching memes:', error);
        setLoading(false);
      }
    };
  
    const openMemeDialog = (meme) => {
      setSelectedMeme(meme);
    };
  
    const closeMemeDialog = () => {
      setSelectedMeme(null);
    };
  
    useEffect(() => {
      let isMounted = true; // Flag to check if the component is mounted
  
      const fetchMemes = async () => {
        try {
          setLoading(true);
  
          const response = await axios.get(`https://www.reddit.com/r/memes.json?after=${after || ''}`);
          console.log('API Response:', response.data);
  
          if (isMounted) {
            const newMemeData = response.data.data.children.map((child) => ({
              id: child.data.id,
              title: child.data.title,
              thumbnail: child.data.thumbnail,
              url: child.data.url,
              upvotes: child.data.ups,
              downvotes: child.data.downs,
              comments: child.data.num_comments,
              post_hint: child.data.post_hint,
            }));
  
            setAfter(response.data.data.after);
  
            if (newMemeData.length === 0) {
              setNoMoreContent(true);
            } else {
              setMemes((prevMemes) => [...prevMemes, ...newMemeData]);
            }
  
            setLoading(false);
          }
        } catch (error) {
          console.error('Error fetching memes:', error);
          if (isMounted) {
            setLoading(false);
          }
        }
      };
  
      if (!noMoreContent && memes.length === 0) {
        fetchMemes();
      }
  
      // Cleanup function to set isMounted to false when the component is unmounted
      return () => {
        isMounted = false;
      };
    }, [after, noMoreContent, memes]);
  
    return (
        
      <div className="container">
        {/* App Bar */}
        <div className="app-bar">
          <h1>Meme Gallery</h1>
        </div>
  
        {/* Meme Gallery */}
        <div className="content">
          <Gallery memes={memes} onMemeClick={openMemeDialog} />
        </div>
  
        {/* Load More Button */}
        {!noMoreContent && (
          <div className="load-more">
            <button onClick={fetchMoreMemes} disabled={loading}>
              {loading ? 'Loading...' : 'Load More'}
            </button>
          </div>
        )}
  
        {/* No More Content Message */}
        {noMoreContent && <p>No more content</p>}
  
        {/* Meme Dialog */}
        {selectedMeme && (
          <div className="meme-dialog">
            <div className="dialog-content">
              <img src={selectedMeme.url} alt={selectedMeme.title} />
              <div className="details">
                <h2>{selectedMeme.title}</h2>
                <p>{`Upvotes ${selectedMeme.upvotes} | Comments ${selectedMeme.comments}`}</p>
              </div>
              <button onClick={closeMemeDialog}>Close</button>
            </div>
          </div>
        )}
      </div>
    );
  };
  
  export default Home;