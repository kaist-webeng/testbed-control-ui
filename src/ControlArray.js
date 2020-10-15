import React from 'react';

import Property from './Property';
import Action from './Action';

const Control = React.memo(function Control({ desc }) {
  const descObject = JSON.parse(desc);
  const { title, url, description, properties, actions } = descObject;

  if (title && url && description && properties && actions)
    return (
      <>
        <h2>{title}</h2>
        <h4>{description}</h4>
        <a href={url}>{url}</a>
        {Object.keys(properties).map(key => (
          // TODO: 추후 Action 호출기능이 생기면 property를 리렌더링하는 것이 필요.
          <Property 
            prop={properties[key]} 
            url={url}
            key={key} />
        ))}
        {Object.keys(actions).map(key => (
          <Action action={actions[key]} key={key} />
        ))}
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