// pages/index.js
import { useEffect, useState } from 'react'
import axios from 'axios'
import Gallery from '../components/Gallery'

const Home = () => {
  const [memes, setMemes] = useState([])
  const [loading, setLoading] = useState(false)
  const [noMoreContent, setNoMoreContent] = useState(false)
  const [selectedMeme, setSelectedMeme] = useState(null)
  const [maxScroll, setMaxScrollPls] = useState(999)


  let after = null;
  let scrollamt = 0
  let moreFetched = false


  const fetchMoreMemes = async () => {
    setLoading(true)
    try {
      const response = await axios.get(
        `https://www.reddit.com/r/memes.json?after=${after || ''}`
      )
      console.log('API Response:', response.data)

      const newMemeData = response.data.data.children.map(child => ({
        id: child.data.id,
        title: child.data.title,
        thumbnail: child.data.thumbnail,
        url: child.data.url,
        upvotes: child.data.ups,
        downvotes: child.data.downs,
        comments: child.data.num_comments,
        post_hint: child.data.post_hint
      }))

      after = response.data.data.after; 

      if (newMemeData.length === 0) {
        setNoMoreContent(true)
      } else {
        setMemes(prevMemes => [...prevMemes, ...newMemeData])
      }
      moreFetched = false
      setLoading(false)
    } catch (error) {
      console.error('Error fetching memes:', error)
      moreFetched = false
      setLoading(false)
    }
  }

  const openMemeDialog = meme => {
    setSelectedMeme(meme)
  }

  const closeMemeDialog = () => {
    setSelectedMeme(null)
  }

  const handleScroll = async () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement
    if (!loading) {
      scrollamt = Math.max(
        scrollamt,
        scrollTop + clientHeight - scrollHeight + 100
      )
    }
    if (scrollamt > 0 && !noMoreContent && !moreFetched) {
      scrollamt = -1 * clientHeight
      moreFetched = true
      console.log(scrollamt)
      await fetchMoreMemes()
    }
  }

  useEffect(async () => {
    let isMounted = true 

    const fetchMemes = async () => {
      try {
        setLoading(true)

        const response = await axios.get(
          `https://www.reddit.com/r/memes.json?after=${after || ''}`
        )
        console.log('API Response:', response.data)

        if (isMounted) {
          const newMemeData = response.data.data.children.map(child => ({
            id: child.data.id,
            title: child.data.title,
            thumbnail: child.data.thumbnail,
            url: child.data.url,
            upvotes: child.data.ups,
            downvotes: child.data.downs,
            comments: child.data.num_comments,
            post_hint: child.data.post_hint
          }))

          after = response.data.data.after;

          if (newMemeData.length === 0) {
            setNoMoreContent(true)
          } else {
            setMemes(prevMemes => [...prevMemes, ...newMemeData])
          }

          setLoading(false)
        }
      } catch (error) {
        console.error('Error fetching memes:', error)
        if (isMounted) {
          setLoading(false)
        }
      }
    }
    setMaxScrollPls(window.innerHeight, () => {
      console.log(maxScroll)
    })
    window.addEventListener('scroll', handleScroll)
    

    if (!noMoreContent && memes.length === 0) {
      fetchMemes()
    }

    
    return () => {
    }
  }, [])

  return (
    <div className='container'>
      {/* App Bar */}
      <div className='app-bar'>
        <h1>Meme Gallery</h1>
      </div>
      {/* Meme Gallery */}
      <div className='content'>
        <Gallery memes={memes} onMemeClick={openMemeDialog} />
      </div>

      {/* No More Content Message */}
      {noMoreContent && <p>No more content</p>}

      {/* Meme Dialog */}
      {selectedMeme && (
        <div className='meme-dialog'>
          <div className='dialog-content'>
            <img src={selectedMeme.url} alt={selectedMeme.title} />
            <div className='details'>
              <h2>{selectedMeme.title}</h2>
              <p>{`Upvotes ${selectedMeme.upvotes} | Comments ${selectedMeme.comments}`}</p>
            </div>
            <button onClick={closeMemeDialog}>Close</button>
          </div>
        </div>
      )}

      {/* Styles */}
      <style jsx global>{`
        body {
          margin: 0;
        }

        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          min-height: 100vh;
          margin: 50px;
        }

        .app-bar {
          position: fixed;
          top: 0;
          left: 0;
          background-color: #2196f3; /* Blue color, adjust as needed */
          color: white;
          text-align: center;
          padding: 10px;
          width: 100%;
        }

        h1 {
          margin: 0;
        }

        .content {
          width: 100%;
          max-width: 1000px; /* Adjust as needed */
          margin: 80px 20px 20px;
          border: 1px solid #ddd;
          margin: 20px;
        }

        .load-more {
          text-align: center;
          margin: 20px 0;
        }

        button {
          background-color: #4caf50; /* Green color, adjust as needed */
          color: white;
          padding: 10px 20px;
          font-size: 16px;
          cursor: pointer;
        }

        button:disabled {
          background-color: #a5a5a5; /* Grey color for disabled state */
          cursor: not-allowed;
        }

        .meme-dialog {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .dialog-content {
          background-color: white;
          padding: 20px;
          text-align: center;
          border-radius: 8px;
          overflow-y: auto; /* Make the content vertically scrollable if it overflows */
          max-height: 80vh; /* Set a maximum height for the dialog content */
        }

        .details {
          margin-top: 10px;
        }
      `}</style>
    </div>
  )
}

export default Home
