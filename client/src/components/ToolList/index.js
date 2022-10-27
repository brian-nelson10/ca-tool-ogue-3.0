import React from 'react';
import { Link } from 'react-router-dom';

//might have to change link to tool.username to tool.checkedinby
//check .length after developed
const ToolList = ({ tools, title }) => {
    //   if (!tools.length) {
//     return <h3>No Tools Yet</h3>;
//   }
  if (!tools) {
    return <h3>No Tools Yet</h3>;
  }

  return (
    <div>
      <h3>{title}</h3>
      {tools &&
        tools.map(tool => (
          <div key={tool._id} className="card mb-3">
            <p className="card-header">
                <Link
                 to={`/profile/${tool.username}`}
                 style={{ fontWeight: 700 }}
                 className="text-light">
              {tool.username}
              </Link>{' '}
               {tool.checkedInBy} has tool.
            </p>
            <div className="card-body">
                <Link to={`/tool/${tool._id}`}>
              <p>{tool.toolName}</p>
              <p className="mb-0">
                Notes: {tool.noteCount} || Click to{' '}
                {tool.noteCount ? 'see' : 'start'} tool notes!
              </p>
              </Link>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ToolList;