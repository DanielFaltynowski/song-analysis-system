import React from 'react';
import axios from 'axios';
import heartImage from './heart.png';
import unlikeImage from './unlike.png';

const Song = ({ id, title, artist }) => {

  const likeSong = async (e) => {
    e.stopPropagation();  // Stop the click event propagation
    try {
      const response = await axios.post(`http://127.0.0.1:5000/songs/song/like/${id}`, { songId: id });
      
      console.log('Response from the server:', response.data);
      
      if (response.status === 200) {
        alert('Liked!');
      } else {
        console.error('Error adding to favorites. Unexpected status code:', response.status);
        alert('Failed to add to favorites. Please try again.');
      }
    } catch (error) {
      console.error('Error adding to favorites:', error);
  
      if (error.response) {
        console.error('Server responded with:', error.response.data);
        console.error('Status code:', error.response.status);
        console.error('Headers:', error.response.headers);
      } else if (error.request) {
        console.error('No response received from the server');
      } else {
        console.error('Error setting up the request:', error.message);
      }
  
      alert('Failed to add to favorites. Please try again.');
    }
  };
  
  

  const unlikeSong = async () => {
    console.log('unlike song');
  }

  return (
    <div className="border p-4 mb-4 bg-emerald-600 max-w-xs text-center rounded-xl display flex justify-center items-center h-full">
      <div className='w-20 pr-4'>
        <div className="bg-emerald-200 h-20 w-20 bg-emerald-200 rounded-lg p-5">
        </div>
      </div>
      <div className='max-w-xs pl-2'>
        <div >
          <h3 className="text-lg font-bold text-gray-500">{title}</h3>
          <p className="text-gray-600">{artist}</p>

        </div>
        <button onClick={likeSong}>
          <img src={heartImage} alt="Heart" className="w-16" />
        </button>
        <button onClick={unlikeSong}>
          <img src={unlikeImage} alt="unlike" className="w-12" />
        </button>
      </div>
    </div>
  );
  }

export default Song;
