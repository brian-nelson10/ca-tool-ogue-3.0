import React from 'react';
import { Link } from 'react-router-dom';


//checkedInBy
const CheckedToolList = ({ checkedInByCount, username, checkedInBy }) => {
  if (!checkedInBy || !checkedInBy.length) {
    return <p className="bg-dark text-light p-3">{username}, check in some TOOLS!</p>;
  }

  return (
    <div>
      <h5>
        {username}'s {checkedInByCount} {checkedInByCount === 1 ? 'tool' : 'tools'}
      </h5>
      {checkedInBy.map(checkedInBy => (
        <button className="btn w-100 display-block mb-2" key={checkedInBy._id}>
          <Link to={`/profile/${checkedInBy.username}`}>{checkedInBy.username}</Link>
        </button>
      ))}
    </div>
  );
};

export default CheckedToolList;