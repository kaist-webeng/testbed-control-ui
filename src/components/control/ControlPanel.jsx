import React, { useEffect, useReducer } from 'react';
import axios from 'axios';
import { useToasts } from 'react-toast-notifications';

import Property from '../Property';
import Action from '../Action';
import styles from './ControlPanel.module.css';
import { bind, checkBound, unbind } from '../../api/bindApi';

function reducer(state, action) {
  switch (action.type) {
    case 'SET_NEED_REFRESH':
      return {
        ...state,
        needRefresh: true,
      };
    case 'UNSET_NEED_REFRESH':
      return {
        ...state,
        needRefresh: false,
      };
    case 'SET_DATA':
      return {
        ...state,
        [action.key]: {
          ...state[action.key],
          data: action.data
        }
      };
    default:
      return state;
  }
}

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
    const fetchValues = async (key, endpoint) => {
      if (!checkBound(url))
        await bind(url);
      
      const response = await axios({
        method: 'get',
        url: endpoint,
        headers: { 'USER-ID': '7747' },
      });

      return response.data;
    };

    const fetchAll = async () => {
      const fetchResult = await Promise.all(
        Object.keys(propData).map(key => {
          // if key is needRefresh then just throw an empty Promise
          if (key === 'needRefresh')
            return new Promise((resolve) => {
              resolve();
            });
          
          const endpoint = propData[key].forms[0].href;
          return fetchValues(key, endpoint).then(data => dispatch({
            type: 'SET_DATA',
            key,
            data,
          }), error => addToast(
            JSON.stringify(error.message), 
            { appearance: 'error', autoDismiss: true }
          ));
        })
      );
      return fetchResult;
    };

    if (propData.needRefresh) {
      fetchAll().then(() => unbind(url));
      dispatch({
        type: 'UNSET_NEED_REFRESH'
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [propData.needRefresh]);

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