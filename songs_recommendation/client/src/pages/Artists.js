import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Artist from './Artist';

const fisherYatesShuffle = (array) => {
  let currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle
  while (currentIndex !== 0) {

    // Pick a remaining element
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // Swap it with the current element
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

const Artists = () => {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/songs/artist');
        setArtists(fisherYatesShuffle(response.data.artists)); 
      } catch (error) {
        console.error('Error fetching artists:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='min-h-screen bg-emerald-900'>
      <h2 className="text-2xl font-bold mb-4 text-white p-4">Artists</h2>
      <ul>
        {artists.map((artist) => (
          <Artist key={artist.id} id={artist.id} name={artist.name} />
          // <Artist key={artist.id} id={artist.id} name={artist.name} />
        ))}
      </ul>
    </div>
  );
};

export default Artists;
