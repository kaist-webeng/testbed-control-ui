import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { bind, unbind } from '../api/Ownership';

function PropertyElement({ element, value }) {
  return (
    <li>
      <b>{element}</b>
      <div>{value ?? 'This property is missing.'}</div>
    </li>
  )
}

function Property({ prop, url, needRefresh, setNeedRefresh }) {
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
        const boundStatus = await bind(stateUrl).then(r => r.data);
  
        if (boundStatus) {
          setValues(await axios({
            method: 'get',
            url: forms[0].href,
            headers: { 'USER-ID': '7747' }
          }).then(r => r.data));
  
          await unbind(stateUrl);
        }
        else {
          throw new Error('Unexpected failure occurred while retrieving properties.');
        }
      } catch (e) {
        setError(e);
      }
      setIsLoading(false);
    }
    fetchValues().then();
    setNeedRefresh(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [needRefresh]);

  // Render the loaded data.
  if (isLoading)
    return <div className="item loading">Loading current property values...</div>;

  if (error) {
    console.error(error);
    return <div className="item loading" style={{color: "red", justifyContent: "center"}}>Failed to retrieve properties from the resource.</div>;
  }

  if (!values)
    return (
      <div className="item" style={{color: "red"}}>Required property 'properties' is missing in the description.</div>
    )

  return (
    <div className="item">
      <h4>{title}</h4>
      <div>{description}</div>
      <ul>{
        !type.localeCompare('object') ? 
          values && Object.keys(properties).map(key => (
            <PropertyElement 
              element={key} 
              value={values[key]}
              isLoading={!values}
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