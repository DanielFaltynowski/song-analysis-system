// SongDetails.js
import React from 'react';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Song from './Song';
import axios from 'axios';

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

const SongDetails = () => {
  const { id } = useParams();

  const [artist, setArtist] = useState({});
  const [songs, setSongs] = useState([]);
  const [similarSongs, setSimilarSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const artistResponse = await axios.get(`http://127.0.0.1:5000/songs/song/${id}`);
        const getSimilarSongs = await axios.get(`http://127.0.0.1:5000/songs/song/similar/${id}`);
        setArtist(artistResponse.data.id);
        setSongs(fisherYatesShuffle(artistResponse.data.songs));
        setSimilarSongs(fisherYatesShuffle(getSimilarSongs.data.songs));
        // setSimilarSongs(getSimilarSongs.data.songs);
      } catch (error) {
        console.error('Error fetching artist details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // const selectedSong = songs.find((song) => song.id === id);
  const selectedSong = songs.find((song) => song.id.toString() === id);

  if (!selectedSong) {
    return <div>LOADING . . .</div>;
  }

  // Find similar songs based on the same artist (adjust criteria as needed)
  // const similarSongs = songs.filter((song) => song.artist === selectedSong.artist && song.id !== selectedSong.id);

  return (
    <div className='min-h-screen bg-emerald-900'>
      <div className='display flex justify-center p-10'>
        <div className='h-60 w-60 bg-emerald-200 rounded-lg b-black p-5'>
          
        </div>
        <div className='display flex-wrap p-5'>
          <h2 className="text-2xl font-bold mb-4 text-white">{selectedSong.title}</h2>
          <Link key={selectedSong.artist} to={`/artists/${selectedSong.artist_id}`}>
            <p className="text-white">{selectedSong.artist}</p>
          </Link>
          <button className="bg-pink-600 text-white rounded-lg p-4 mt-4">Add to favorites</button>
        </div>
      </div>


      <h3 className="text-xl font-bold mt-4 text-white">Similar Songs</h3>
      {similarSongs.length > 0 ? (
        <div className='grid grid-cols-4 gap-y-4'>
              {/* Display filtered songs */}
          {similarSongs.map((song) => ( //instead of randomSongs, use filteredSongs when you have the actual data
            <Link key={song.id} to={`/songs/${song.id}`} className="text-decoration-none">
              <Song id={song.id} title={song.title} artist={song.artist} />
            </Link>
          ))}
        </div>
      ) : (
        <p>No similar songs found.</p>
      )}
    </div>
  );
};

export default SongDetails;
