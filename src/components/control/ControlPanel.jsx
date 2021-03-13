import React, { useState, useEffect } from 'react';

import Property from '../Property';
import Action from '../Action';
import styles from './ControlPanel.module.css';
import { unbind } from '../../api/bindApi';

function ControlPanel({
  id,
  url,
  props,
  actions,
  isPanelVisible,
}) {
  
  const [needRefresh, setNeedRefresh] = useState(Object.keys(props).length);
  useEffect(() => {
    console.log(`panel value ${needRefresh}`);
    if (needRefresh < 0)
      unbind(url).then();
  }, [needRefresh]);

  return (
    <div 
      id={id} 
      style={{display: isPanelVisible ? "block" : "none"}}
    >
      <h3>Properties</h3>
      <div className={styles.Container}>
        {Object.keys(props).map(key => (
          <Property 
            prop={props[key]} 
            url={url}
            key={key}
            needRefresh={needRefresh}
            setNeedRefresh={() =>
              setNeedRefresh(prev => prev - 1)
            }
          />
        ))}
      </div>
      <h3>Actions</h3>
      <div className={styles.Container}>
        {Object.keys(actions).map(key => (
          <Action
            action={actions[key]}
            url={url}
            key={key}
            needRefresh={needRefresh}
            setNeedRefresh={() => 
              setNeedRefresh(Object.keys(props).length)
            }
          />
        ))}
      </div>
    </div>
  )
}

export default React.memo(ControlPanel);