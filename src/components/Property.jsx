import React from 'react';

function PropertyElement({ element, value }) {
  return (
    <li>
      <b>{element}</b>
      <div>{value ?? 'This property is missing.'}</div>
    </li>
  )
}

function Property({ prop, needRefresh }) {
  const { title, description, properties, data } = prop;

  // Render the loaded data.
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
          <PropertyElement 
            element={key} 
            value={data[key]}
            key={key} 
          />
        ))
      }</ul>
    </div>
  )
}

export default React.memo(Property);