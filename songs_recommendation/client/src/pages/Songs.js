// Songs.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Song from './Song';

const Songs = () => {
  const [songs, setSongs] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/songs');
        console.log(response.data)
        setSongs(response.data.songs);
      } catch (error) {
        console.error('Error fetching songs:', error);
      }
    };

    fetchData();
  }, []);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredSongs = songs.filter((song) =>
    song.title.toLowerCase().includes(filter.toLowerCase())
  );

  

  return (
    <div className=' min-h-screen bg-emerald-900'>
      <h2 className="text-2xl font-bold mb-4 text-blue p-4 ">Song List</h2>

      {/* Filter input */}
      <input
        type="text"
        placeholder="Filter by title"
        value={filter}
        onChange={handleFilterChange}
        className="mb-4 p-2 border rounded-md ml-4"
      />

      {/* Display filtered songs */}
      {filteredSongs.map((song) => ( //instead of randomSongs, use filteredSongs when you have the actual data
        <Link key={song.id} to={`/songs/${song.id}`} className="text-decoration-none">
          <Song id={song.id} title={song.title} artist={song.artist} />
        </Link>
      ))}
      {/* Display filtered songs
      {songs.map((song) => ( //instead of randomSongs, use filteredSongs when you have the actual data
        <Link key={song.id} to={`/songs/${song.id}`} className="text-decoration-none">
          <Song id={song.id} title={song.title} artist={song.artist} />
        </Link>
      ))} */}
    </div>
  );
};

export default Songs;
