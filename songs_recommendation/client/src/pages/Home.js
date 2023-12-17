import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from './NavBar.js';

const Home = () => {
  return (
    <div>
    <div className="min-h-screen flex items-center justify-center bg-emerald-900">
      <div className="bg-emerald-600 p-8 text-center rounded-lg">
        <h1 className="text-3xl text-white">Welcome to the RhythmaLlama</h1>
        <p className="text-xl text-white">A place where you can find the best music for you!</p>
        <div className="mt-8">
          <Link to="/songs">
            <button className="bg-green text-white px-4 py-2 rounded-md">
              Songs
            </button>
          </Link>
          <Link to="/artists">
            <button className="bg-green text-white px-4 py-2 rounded-md">
              Artists
            </button>
          </Link>
          <Link to="/songs/#id">
            <button className="bg-pink-600 text-white px-4 py-2 rounded-md">
              I'm feeling lucky
            </button>
          </Link>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Home;
