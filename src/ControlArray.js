import React, { useState } from 'react';

import Property from './Property';
import Action from './Action';

const Control = React.memo(function Control({ desc }) {
  const descObject = JSON.parse(desc);
  const { title, url, description, properties, actions } = descObject;

  const [needRefresh, setNeedRefresh] = useState(false);

  if (title && url && description && properties && actions)
    return (
      <>
        <h2>{title}</h2>
        <h3>{description}</h3>
        <a href={url}>{url}</a>
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