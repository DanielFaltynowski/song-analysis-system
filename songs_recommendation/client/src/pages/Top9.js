import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Song from './Song';

const Top9 = () => {
  const [topSongs, setTopSongs] = useState([]);

  useEffect(() => {
    const fetchTopSongs = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/songs');

        if (Array.isArray(response.data.songs)) {
          const sortedSongs = response.data.songs.sort((a, b) => b.views - a.views);
          const top9Songs = sortedSongs.slice(0, 9);

          setTopSongs(top9Songs);
        } else {
          console.error('Invalid response data:', response.data);
        }
      } catch (error) {
        console.error('Error fetching top songs:', error);
      }
    };

    fetchTopSongs();
  }, []);

  return (
    <div>
      <h2 className="text-2xl text-white"> DISCOVER NEW SONGS</h2>
      <div className="grid grid-cols-3 gap-y-4">
        {topSongs.map((song) => (
          <Link key={song.id} to={`/songs/${song.id}`} >
            <div className=' flex items-center justify-center h-40 w-40 bg-emerald-500 m-2 text-center rounded-lg text-white font-bold'> 
              <div className='bg-pink-600 rounded-lg p-2' > {song.title}</div> </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Top9;
