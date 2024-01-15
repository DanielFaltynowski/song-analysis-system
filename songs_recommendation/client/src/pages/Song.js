import React from 'react';
import axios from 'axios';
import heartImage from './heart.png';
import unlikeImage from './unlike.png';

const Song = ({ id, title, artist }) => {

  const likeSong = async () => {
    console.log('like song');
  }

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
