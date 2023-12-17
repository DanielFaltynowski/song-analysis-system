// Songs.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Song from './Song';

const Songs = () => {
  const [songs, setSongs] = useState([]);
  const [filter, setFilter] = useState('');

  const randomSongs = [
    { id: 1, title: 'Song 1', artist: 'Artist 1' },
    { id: 2, title: 'Song 2', artist: 'Artist 2' },
    { id: 3, title: 'Song 3', artist: 'Artist 1' }, 
  ]

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://endpoint');
        setSongs(response.data);
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
    <div>
      <h2 className="text-2xl font-bold mb-4">Song List</h2>

      {/* Filter input */}
      <input
        type="text"
        placeholder="Filter by title"
        value={filter}
        onChange={handleFilterChange}
        className="mb-4 p-2 border rounded-md"
      />

      {/* Display filtered songs */}
      {randomSongs.map((song) => ( //instead of randomSongs, use filteredSongs when you have the actual data
        <Link key={song.id} to={`/songs/${song.id}`} className="text-decoration-none">
          <Song id={song.id} title={song.title} artist={song.artist} />
        </Link>
      ))}
    </div>
  );
};

export default Songs;
