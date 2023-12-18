// SongDetails.js
import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Song from './Song';
import axios from 'axios';

const SongDetails = () => {
  const { id } = useParams();

  // const songs = [
  //   { id: 1, title: 'Song 1', artist: 'Artist 1' },
  //   { id: 2, title: 'Song 2', artist: 'Artist 2' },
  //   { id: 3, title: 'Song 3', artist: 'Artist 1' }, 
  // ];

  const [artist, setArtist] = useState({});
  const [songs, setSongs] = useState([]);
  const [similarSongs, setSimilarSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  // console.log(artistId)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const artistResponse = await axios.get(`http://127.0.0.1:5000/songs/song/${id}`);
        const getSimilarSongs = await axios.get(`http://127.0.0.1:5000/songs/song/similar/${id}`);
        setArtist(artistResponse.data.id);
        setSongs(artistResponse.data.songs);
        setSimilarSongs(getSimilarSongs.data.songs);

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

  // const selectedSong = songs.find((song) => song.id === id);
  const selectedSong = songs.find((song) => song.id.toString() === id);

  if (!selectedSong) {
    return <div>Song not found</div>;
  }

  // Find similar songs based on the same artist (adjust criteria as needed)
  // const similarSongs = songs.filter((song) => song.artist === selectedSong.artist && song.id !== selectedSong.id);

  return (
    <div className='min-h-screen bg-emerald-900'>
      <h2 className="text-2xl font-bold mb-4 text-white">{selectedSong.title}</h2>
      <p className="text-white">{selectedSong.artist}</p>

      <h3 className="text-xl font-bold mt-4 text-white">Similar Songs</h3>
      {similarSongs.length > 0 ? (
        <div>
          {similarSongs.map((similarSong) => (
            <Song key={similarSong.id} id={similarSong.id} title={similarSong.title} artist={similarSong.artist} />
          ))}
        </div>
      ) : (
        <p>No similar songs found.</p>
      )}
    </div>
  );
};

export default SongDetails;
