// Song.js
import React from 'react';
import axios from 'axios';

const Song = ({ id, title, artist }) => {
  const addToFavorites = async () => {
    try {
      // Replace 'https://your-api-endpoint/add-to-favorites' with your actual API endpoint
      await axios.post('https://your-api-endpoint/add-to-favorites', { songId: id });
      alert('Added to favorites!');
    } catch (error) {
      console.error('Error adding to favorites:', error);
      alert('Failed to add to favorites. Please try again.');
    }
  };

  return (
    <div className="border p-4 mb-4 bg-emerald-600 max-w-xs text-center rounded-xl display flex justify-center items-center h-full">
      <div className="display flex-wrap p-5">
        <h3 className="text-lg font-bold text-gray-500">{title}</h3>
        <p className="text-gray-600">{artist}</p>

        {/* Button to add to favorites */}
        <button onClick={addToFavorites} className="bg-pink-600 text-white px-4 py-2 mt-2 rounded-lg">
          Add to Favorites
        </button>
      </div>
      <div className="bg-emerald-200 h-28 w-28 bg-emerald-200 rounded-lg p-5">

      </div>
    </div>
  );
};

export default Song;
