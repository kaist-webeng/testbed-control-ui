import React, { useState } from 'react';
import useSWR from 'swr';

import Property from './Property';
import Action from './Action';
import styles from "./ControlArray.module.css";
import { getFetcher } from '../utils/fetcher';
import { useToasts } from 'react-toast-notifications';

const Control = React.memo(function Control({ desc }) {
  const {
    id,
    title,
    url,
    description,
    properties,
    actions,
  } = JSON.parse(desc);

  const [needRefresh, setNeedRefresh] = useState(false);
  const [display, setDisplay] = useState(false);
  const { data, error } = useSWR(url, url => getFetcher(url, 1000));
  const { addToast } = useToasts();

  const onClick = event => {
    setDisplay((prevDisplay) => !prevDisplay);
  };

  const onErrorClick = () => {
    addToast(
      `You can't use the controller "${id}" because it doesn't respond.`,
      { appearance: 'error', autoDismiss: false }
    )
  }

  if (title && url && description && properties && actions)
    return (
      <>
        {/* Headline component */}
        <div className="headline">
          <span>
            { error && 
              <i className={`${styles.WarningIcon} ri-error-warning-fill`} /> 
            }
            <h2 
              onClick={error ? onErrorClick : onClick} 
              style={{display: "inline", color: error ? "red" : "black"}}
            >
              {id}
            </h2>
          </span>
          <div className="desc-url-wrapper">
            <p className="resource-desc">{description}</p>
            <a href={url} target="_blank" rel="noopener noreferrer">{url}</a>
          </div>
        </div>
        {/* Control panel component */}
        { data && !error &&
          <div className="control-panel" id={id} style={{display: display ? "block" : "none"}}>
          <h3>Properties</h3>
          <div className="container">
            {Object.keys(properties).map(key => (
              <Property 
                prop={properties[key]} 
                url={url}
                key={key}
                needRefresh={needRefresh}
                setNeedRefresh={setNeedRefresh}
              />
            ))}
          </div>
          <h3>Actions</h3>
          <div className="container">
            {Object.keys(actions).map(key => (
              <Action
                action={actions[key]}
                url={url}
                key={key}
                needRefresh={needRefresh}
                setNeedRefresh={setNeedRefresh}
              />
            ))}
          </div>
        </div>
        }
      </>
    )

  return (
    <h2 
      style={{color: "red"}}
    >
      Failed to parse the description.
    </h2>
  )
});

function ControlArray({ descriptions }) {
  return (
    <>
      {descriptions.map(description => (
        <section>
          <Control desc={description.raw_description} key={description.id} />
        </section>
      ))}
    </>
  )
}

export default React.memo(ControlArray);