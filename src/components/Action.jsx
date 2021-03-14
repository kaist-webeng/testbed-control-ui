import React, { useState } from 'react';
import axios from 'axios';
import { useToasts } from 'react-toast-notifications';

import { checkBound, bind } from '../api/bindApi';

const InputElement = React.memo(function InputElement( { name, element, inputs, setInputs } ) {
  const { type } = element;

  const handleChange = event => {
    setInputs({
      ...inputs,
      [event.target.name]: event.target.value
    });
  };

  // Currently, integer inputs are only supported.
  // Support for other input types can be made by adding the cases for them.
  switch(type) {
    case "integer":
      return (
        <>
          {element.minimum}
          <input
            type="range"
            id={name}
            name={name}
            value={inputs[name]}
            min={element.minimum}
            max={element.maximum}
            style={{width: "70%"}}
            onChange={handleChange}
          />
          {element.maximum}
        </>
      );
    case "string":
      return (
        <ul style={{textAlign: "left"}}>
          <li>
          <strong>{name} : </strong>
          <input 
            type="text"
            id={name}
            name={name}
            onChange={handleChange}
          />
          </li>
        </ul>
      );
    default:
      return (
      <div style={{color: "red"}}>
        Sorry, this input type of "{type}" is not supported. 
        Please add the support for this input type.
      </div>
      );
  }
});

function Action({ action, url, setNeedRefresh }) {
  const { title, description, input, forms } = action;
  const [inputs, setInputs] = useState({});
  const { addToast } = useToasts();

  const onSubmit = event => {
    event.preventDefault();

    const submitAction = async () => {
      if (!checkBound(url))
        await bind(url);

      let form = new FormData();

      for (let key in inputs) {
        form.append(key, inputs[key]);
      }

      const response = await axios({
        method: 'post',
        url: forms[0].href,
        headers: { 'USER-ID': '7747' },
        data: form
      });

      return response;
    }
    
    submitAction().then(r => {
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
        JSON.stringify(error), 
        { appearance: 'error', autoDismiss: false }
      );
    });
  }

  return (
    <div className="item">
      <h4>{title}</h4>
      <div>{description}</div>
      <form className="center" onSubmit={onSubmit}>
        {input && Object.keys(input.properties).map(key => (
          <InputElement
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
  