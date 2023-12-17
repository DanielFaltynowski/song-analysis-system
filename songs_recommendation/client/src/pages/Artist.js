import React from 'react';
import { Link } from 'react-router-dom';

const Artist = ({ id, name }) => {
  return (
    <Link to={`/artists/${id}`} className="text-decoration-none">
      <div className="border p-4 mb-4">
        <h3 className="text-lg font-bold">{name}</h3>
      </div>
    </Link>
  );
};

export default Artist;
