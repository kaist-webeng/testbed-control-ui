import React from 'react';
import useSWR from 'swr';
import { ToastProvider } from 'react-toast-notifications';

import ControlArray from './components/ControlArray';
import { getFetcher } from './utils/fetcher';
import styles from './App.module.css';

function App() {
  const { data, error } = useSWR(
    'http://server.seiker.kr:8000/api/services', getFetcher
  );

  if (error)
    return (
      <div className={styles.Loading} style={{color: "red"}}>
        Failed to retrieve descriptions.
      </div>
    );

  if (!data)
    return (
      <div className={styles.Loading}>
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
