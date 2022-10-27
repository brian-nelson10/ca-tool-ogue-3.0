import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_TOOL } from '../utils/queries';
import NoteList from '../components/NoteList';

const SingleTool = props => {
    const { id: toolId } = useParams();
    
    const { loading, data } = useQuery(QUERY_TOOL, {
        variables: { id: toolId }
    });

    const tool = data?.tool || {};

    if (loading) {
        return <div>Loading...</div>;
    }

  return (
    <div>
      <div className="card mb-3">
        <p className="card-header">
          <span style={{ fontWeight: 700 }} className="text-light">
           {tool.toolName}
          </span>{' '}
           made on {tool.createdAt} by {tool.username}
        </p>
        <div className="card-body">
          <p>Checked In By: {tool.checkedInBy}</p>
        </div>
      </div>
      {tool.noteCount > 0 && <NoteList notes={tool.notes} />}
    </div>
  );
};

export default SingleTool;
