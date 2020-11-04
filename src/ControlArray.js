import React, { useState } from 'react';

import Property from './Property';
import Action from './Action';

const Control = React.memo(function Control({ desc }) {
  const descObject = JSON.parse(desc);
  const { id, title, url, description, properties, actions } = descObject;
  const [needRefresh, setNeedRefresh] = useState(false);
  const [display, setDisplay] = useState(false);

  const onClick = event => {
    setDisplay((prevDisplay) => !prevDisplay);
  };

  if (title && url && description && properties && actions)
    return (
      <>
        <div className="headline">
          <h2 onClick={onClick}>{id}</h2>
          <div className="desc-url-wrapper">
            <p className="resource-desc">{description}</p>
            <a href={url} target="_blank" rel="noopener noreferrer">{url}</a>
          </div>
        </div>
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
      </>
    )

  return (
    <>
      <h2 style={{color: "red"}}>Failed to parse the description.</h2>
    </>
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