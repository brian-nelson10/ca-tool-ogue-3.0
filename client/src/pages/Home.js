import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_TOOLS } from '../utils/queries';
import ToolList from '../components/ToolList';

const Home = () => {
    // use useQuery hook to make query request
    const { loading, data } = useQuery(QUERY_TOOLS);
    const tools = data?.tools || [];
      console.log(tools);  

  return (
    <main>
    <div className="flex-row justify-space-between">
      <div className="col-12 mb-3">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <ToolList tools={tools} title="ca-TOOL-ogue of TOOLS!" />
        )}
      </div>
    </div>
  </main>
  );
};

export default Home;