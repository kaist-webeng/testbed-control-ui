import React, { useState, useEffect } from 'react';
import axios from 'axios';

import ControlArray from './ControlArray';

function App() {
  const [descriptions, setDescriptions] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDescriptions = async () => {
      try {
        setDescriptions(null);
        setIsLoading(true);
        setError(null);

        // Retrieve descriptions from the registry server.
        const response = await axios.get(
          'http://server.seiker.kr:8000/api/services/'
        );
        setDescriptions(response.data);
      } catch (e) {
        setError(e);
      }
      setIsLoading(false);
    };

    fetchDescriptions();
  }, []);

  if (isLoading)
    return <div>Loading descriptions...</div>;
  
  if (error)
    return <div style={{color: "red"}}>Failed to retrieve descriptions.</div>;

  if (!descriptions)
    return <div>There is nothing to show...</div>;

  // Render the loaded data.
  return (
    <>
      <ControlArray descriptions={descriptions} />
    </>
  );
}

export default App;