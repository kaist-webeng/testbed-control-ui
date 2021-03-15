import React, { useState } from 'react';
import { useToasts } from 'react-toast-notifications';

import ActionInputElement from './ActionInputElement';
import { submitAction } from '../../utils/actionFunctions';

function Action({ action, url, setNeedRefresh }) {
  const { title, description, input, forms } = action;
  const [inputs, setInputs] = useState({});
  const { addToast } = useToasts();

  const onSubmit = event => {
    event.preventDefault();
    
    submitAction(url, inputs, forms[0].href).then(r => {
      setNeedRefresh();
      const returnString = JSON.stringify(r && (r.data ?? 'nothing'));
      addToast(
        `The action has been successfully dispatched with\
        the following data: ${returnString}`, 
        { 
          appearance: 'success', 
          autoDismiss: false, 
        }
      );
    }, error => {
      addToast(
        JSON.stringify(error.message), 
        {
          appearance: 'error',
          autoDismiss: false,
        }
      );
    });
  }

  return (
    <div className="item">
      <h4>{title}</h4>
      <div>{description}</div>
      <form className="center" onSubmit={onSubmit}>
        {input && Object.keys(input.properties).map(key => (
          <ActionInputElement
            key={key}
            name={key}
            element={input.properties[key]}
            inputs={inputs}
            setInputs={setInputs}
          />
        ))}
        <input type="submit" value="Submit" />
      </form>
    </div>
  )
}

export default React.memo(Action);
  