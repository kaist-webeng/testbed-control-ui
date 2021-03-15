import React from 'react';

function Property({ prop, needRefresh }) {
  const { title, description, properties, data } = prop;

  if (needRefresh)
    return (
      <div className="item center">
        Loading current property values...
      </div>
    );

  return (
    <div className="item">
      <h4>{title}</h4>
      <div>{description}</div>
      <ul>{
        data && Object.keys(properties).map(key => (
          <li key={key}>
            <b>{key}</b>
            <div>{data[key] ?? 'This property is missing.'}</div>
          </li>
        ))
      }</ul>
    </div>
  )
}

export default React.memo(Property);