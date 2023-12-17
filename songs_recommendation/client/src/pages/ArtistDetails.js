import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ArtistDetails = () => {
  const { id } = useParams();

  const [artist, setArtist] = useState({});
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  // console.log(artistId)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const artistResponse = await axios.get(`http://127.0.0.1:5000/songs/artist/${id}`);
        console.log(artistResponse.data)
        console.log(id)
        setArtist(artistResponse.data.id);
        setSongs(artistResponse.data.songs);

        // const songsResponse = await axios.get(`http://127.0.0.1:5000/songs/artist/${artistId}`);
        // setSongs(songsResponse.data.songs);
      } catch (error) {
        console.error('Error fetching artist details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* <h2 className="text-2xl font-bold mb-4">{artistId}</h2> */}
      <h2 className="text-2xl font-bold mb-4">{artist.name}</h2>
      {/* <p>{artist.bio}</p> */}

      {/* <h3 className="text-xl font-bold mt-4">Songs by {artistId}</h3> */}
      <h3 className="text-xl font-bold mt-4">Songs by {artist.name}</h3>
      {songs.map((song) => (
        <div key={song.id} className="border p-4 mb-4">
          <h4 className="text-lg font-bold">{song.title}</h4>
          {/* <p className="text-gray-600">{song.album}</p> */}
        </div>
      ))}
    </div>
  );
};

export default ArtistDetails;
