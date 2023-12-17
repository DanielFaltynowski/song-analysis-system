import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Top9 = () => {
  const [topSongs, setTopSongs] = useState([]);

  useEffect(() => {
    const fetchTopSongs = async () => {
      try {
        const response = await axios.get('https://127.0.0.1/songs');
        const sortedSongs = response.data.sort((a, b) => b.views - a.views);
        const top9Songs = sortedSongs.slice(0, 9);

        setTopSongs(top9Songs);
      } catch (error) {
        console.error('Error fetching top songs:', error);
      }
    };

    fetchTopSongs();
  }, []);

  return (
    <div>
      <h2 className="text-2xl" >Top 9 Songs</h2>
      <ul>
        {topSongs.map((song) => (
          <li key={song.id} className="">
            {`${song.title} - Views: ${song.views}`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Top9;
