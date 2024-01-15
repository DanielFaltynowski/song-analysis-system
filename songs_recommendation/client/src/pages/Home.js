import React from 'react';
import { Link } from 'react-router-dom';
import Top9 from './Top9.js';

const Home = () => {
  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-emerald-900">
        <div className="bg-emerald-600 p-8 rounded-lg  text-center m-10">
          <h1 className="text-3xl text-white">Welcome to the RhythmaLlama</h1>
          <p className="text-xl text-emerald-900">A place where you can find the best music for you!</p>
          <div className="mt-8 grid col1">
            <Link to="/songs">
              <button className="bg-green text-white text-2xl px-4 py-2 rounded-md m-3">
                Songs
              </button>
            </Link>
            <Link to="/artists">
              <button className="bg-green text-white text-2xl px-4 py-2 rounded-md m-3">
                Artists
              </button>
            </Link>
          </div>
        </div>
        <Top9 />
      </div>
    </div>
  );
}

export default Home;
