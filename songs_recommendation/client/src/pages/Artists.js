import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Artist from './Artist';

const Artists = () => {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);

  const randomArtists = [
    {
      id: 1,
      name: 'Artist 1',
    },
    {
      id: 2,
      name: 'Artist 2',
    },
    {
      id: 3,
      name: 'Artist 3',
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/songs/artist');
        setArtists(response.data.artists); 
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
    <div>
      <h2 className="text-2xl font-bold mb-4">Artists</h2>
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
