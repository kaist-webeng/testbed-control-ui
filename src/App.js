import React from 'react';
import axios from 'axios';
import useSWR from 'swr';
import { ToastProvider } from 'react-toast-notifications';

import ControlArray from './components/ControlArray';

function App() {
  const fetcher = url => axios.get(url).then(r => r.data);
  const { data, error } = useSWR(
    'http://server.seiker.kr:8000/api/services', fetcher
  );

  if (error)
    return (
      <div 
        className="loading vertical-center" 
        style={{color: "red"}}
      >
        Failed to retrieve descriptions.
      </div>
    );

  if (!data)
    return (
      <div 
        className="loading vertical-center"
      >
        Loading descriptions...
      </div>
    );

  return (
    <ToastProvider>
      <ControlArray descriptions={data} />
    </ToastProvider>
  );
}

export default App;
