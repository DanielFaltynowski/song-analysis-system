// SongDetails.js
import React from 'react';
import { useParams } from 'react-router-dom';
import Song from './Song';

const SongDetails = () => {
  const { id } = useParams();

  const songs = [
    { id: 1, title: 'Song 1', artist: 'Artist 1' },
    { id: 2, title: 'Song 2', artist: 'Artist 2' },
    { id: 3, title: 'Song 3', artist: 'Artist 1' }, 
  ];

  const selectedSong = songs.find((song) => song.id.toString() === id);

  if (!selectedSong) {
    return <div>Song not found</div>;
  }

  // Find similar songs based on the same artist (adjust criteria as needed)
  const similarSongs = songs.filter((song) => song.artist === selectedSong.artist && song.id !== selectedSong.id);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{selectedSong.title}</h2>
      <p className="text-gray-600">{selectedSong.artist}</p>

      <h3 className="text-xl font-bold mt-4">Similar Songs</h3>
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
