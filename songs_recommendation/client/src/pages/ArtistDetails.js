import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ArtistDetails = ({ artistId }) => {
  const [artist, setArtist] = useState({});
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const artistResponse = await axios.get(`https://endpoint${artistId}`);
        setArtist(artistResponse.data);

        const songsResponse = await axios.get(`https://endpoint=${artistId}`);
        setSongs(songsResponse.data);
      } catch (error) {
        console.error('Error fetching artist details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [artistId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{artist.name}</h2>
      <p>{artist.bio}</p>

      <h3 className="text-xl font-bold mt-4">Songs by {artist.name}</h3>
      {songs.map((song) => (
        <div key={song.id} className="border p-4 mb-4">
          <h4 className="text-lg font-bold">{song.title}</h4>
          <p className="text-gray-600">{song.album}</p>
        </div>
      ))}
    </div>
  );
};

export default ArtistDetails;
