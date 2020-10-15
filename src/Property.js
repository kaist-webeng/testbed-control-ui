import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { bind, unbind } from './Ownership';

function PropertyElement({ element, value }) {
  return (
    <li>
      <b>{element}</b>
      <div>{value ?? 'This property is missing.'}</div>
    </li>
  )
}

function Property({ prop, url }) {
  const { title, type, description, properties, forms } = prop;

  // Retrieve property values from the resource.
  const [values, setValues] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [stateUrl, setStateUrl] = useState(url);

  useEffect(() => {
    const fetchValues = async () => {
      try {
        setValues(null);
        setIsLoading(true);
        setError(null);

        // Bind the resource before retrieving properties.
        setStateUrl(url);
        const boundStatus = await bind({url: stateUrl});

        if (!boundStatus) {
          const response = await axios({
            method: 'get',
            url: forms[0].href,
            headers: { 'USER-ID': '7747' }
          });
          setValues(response.data);

          await unbind({url: stateUrl});
        }
        else
          throw new Error('Failed to un/bind the resource.');
      } catch (e) {
        setError(e);
      }
      setIsLoading(false);
    };

    fetchValues();
  }, [forms, url]);

  // Render the loaded data.
  if (isLoading)
    return <div>Loading properties...</div>;

  if (error) {
    console.error(error);
    return <div style={{color: "red"}}>Failed to retrieve properties from the resource.</div>;
  }

  if (!properties)
    return (
      <div style={{color: "red"}}>Required property 'properties' is missing in the description.</div>
    )

  return (
    <div style={{border: "1px solid black",
                 margin: "10px 5px 10px 5px"}}>
      <h5>{title}</h5>
      <div>{description}</div>
      <ul>{
        !type.localeCompare('object') ? 
          values && Object.keys(properties).map(key => (
            <PropertyElement 
              element={key} 
              value={values[key]}
              isLoading={isLoading}
              error={error}
              key={key} 
            />
          )) :
          <div style={{color: "red"}}>Sorry, this property is not yet supported. (Non-object type)</div>
      }</ul>
    </div>
  )
}

export default React.memo(Property);