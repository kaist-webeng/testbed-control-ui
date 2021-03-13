import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { bind, checkBound } from '../api/bindApi';

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

  const [decreased, setDecreased] = useState(false);
  const [lastValue, setLastValue] = useState(-1);
  useEffect(() => {
    if (decreased && (needRefresh - lastValue > 0)) {
      setDecreased(false);
    }
    setLastValue(needRefresh);
  }, [needRefresh]);

  useEffect(() => {
    const fetchValues = async () => {
      try {
        setValues(null);
        setIsLoading(true);
        setError(null);
  
        if (!checkBound(url))
          await bind(url);
  
        const response = await axios({
          method: 'get',
          url: forms[0].href,
          headers: { 'USER-ID': '7747' },
        });

        setValues(response.data);
      } catch (e) {
        setError(e);
      }
      setIsLoading(false);
    }
    if (!decreased){
      fetchValues().then();
      setDecreased(() => {
        setNeedRefresh();
        return true;
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [decreased]);

  // Render the loaded data.
  if (isLoading)
    return (
      <div className="item center">
        Loading current property values...
      </div>
    );

  if (error)
    return (
      <div 
        className="item center" 
        style={{color: "red", justifyContent: "center"}}
      >
        Failed to retrieve properties from the resource.
      </div>
    );

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
          <div style={{color: "red"}}>
            Sorry, this property is not yet supported. (Non-object type)
          </div>
      }</ul>
    </div>
  )
}

export default React.memo(Property);