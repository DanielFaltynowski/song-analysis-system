import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import Song from './Song';

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
        const artistResponse2 = await axios.get(`http://127.0.0.1:5000/songs/artist/${id}`);

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
    return <div  className='min-h-screen'>Loading...</div>;
  }

  return (
    <div className='bg-emerald-900 min-h-screen p-4'>
      {/* <h2 className="text-2xl font-bold mb-4">{artistId}</h2> */}
      <h2 className="text-2xl font-bold mb-4">{artist.name}</h2>
      {/* <p>{artist.bio}</p> */}

      {/* <h3 className="text-xl font-bold mt-4">Songs by {artistId}</h3> */}
      <h3 className="text-xl font-bold mt-4 text-white">Songs by {artist.name}</h3>
      {songs.map((song) => (
        <Link key={song.id} to={`/songs/${song.id}`} className="text-decoration-none">
          <Song id={song.id} title={song.title} artist={song.artist} />
        </Link>
        // <div key={song.id} className="border p-4 mb-4">
        //   <h4 className="text-lg font-bold">{song.title}</h4>
        //   {/* <p className="text-gray-600">{song.album}</p> */}
        // </div>
      ))}
    </div>
  );
};

export default ArtistDetails;
