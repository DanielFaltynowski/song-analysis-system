import React from 'react';
import { Link } from 'react-router-dom';

const Artist = ({ id, name }) => {
  return (
    <Link to={`/artists/${id}`} id={id} className="text-decoration-none">
      <div className="border p-4 mb-4 bg-emerald=600">
        <h3 className="text-lg font-bold text-emerald">{name}</h3>
      </div>
    </Link>
  );
};

export default Artist;
