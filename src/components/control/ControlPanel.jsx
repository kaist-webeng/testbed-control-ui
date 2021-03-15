import React, { useEffect, useReducer } from 'react';
import { useToasts } from 'react-toast-notifications';

import Property from '../Property';
import Action from '../action/Action';
import styles from './ControlPanel.module.css';
import { unbind } from '../../api/bindApi';
import { reducer, fetchAll } from '../../utils/panelFunctions';

function ControlPanel({
  id,
  url,
  props,
  actions,
  isPanelVisible,
}) {
  const { addToast } = useToasts();
  const [propData, dispatch] = useReducer(reducer, {
    ...props,
    needRefresh: true,
  });
  useEffect(() => {
    if (propData.needRefresh) {
      fetchAll(url, propData, dispatch, addToast).then(() => unbind(url));
      dispatch({
        type: 'UNSET_NEED_REFRESH'
      });
    }
  }, [propData, url, dispatch, addToast]);

  return (
    <div 
      id={id} 
      style={{display: isPanelVisible ? "block" : "none"}}
    >
      <h3>Properties</h3>
      <div className={styles.Container}>
        {Object.keys(props).map(key => (
          <Property 
            prop={propData[key]}
            needRefresh={propData.needRefresh}
            key={key}
          />
        ))}
      </div>
      <h3>Actions</h3>
      <div className={styles.Container}>
        {Object.keys(actions).map(key => (
          <Action
            action={actions[key]}
            url={url}
            setNeedRefresh={() => dispatch({
              type: 'SET_NEED_REFRESH'
            })}
            key={key}
          />
        ))}
      </div>
    </div>
  )
}

export default React.memo(ControlPanel);