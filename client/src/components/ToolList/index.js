import React from 'react';

const ToolList = ({ tools, title }) => {
  if (!tools.length) {
    return <h3>No Tools Yet</h3>;
  }

  return (
    <div>
      <h3>{title}</h3>
      {tools &&
        tools.map(tool => (
          <div key={tool._id} className="card mb-3">
            <p className="card-header">
              {tool.username}
               {tool.checkedInBy} has tool.
            </p>
            <div className="card-body">
              <p>{tool.toolName}</p>
              <p className="mb-0">
                Notes: {tool.noteCount} || Click to{' '}
                {tool.noteCount ? 'see' : 'start'} tool notes!
              </p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ToolList;