import React, { useState } from 'react';
import axios from 'axios';

import { bind, unbind } from './Ownership';

const InputElement = React.memo(function InputElement( { key, name, element, inputs, setInputs } ) {
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
            value={inputs[key]}
            min={element.minimum}
            max={element.maximum}
            style={{width: "80%"}}
            onChange={handleChange}
          />
          {element.maximum}
        </>
      );
    default:
      return (
      <div style={{color: "red"}}>Sorry, this input type of "{type}" is not supported. Please add the support for this input type.</div>
      );
  }
});

function Action({ action, url, setNeedRefresh }) {
  const { title, description, input, forms } = action;
  const [inputs, setInputs] = useState({});

  const onSubmit = event => {
    event.preventDefault();

    const submitAction = async () => {
      const boundStatus = await bind({url: url});

      if (!boundStatus) {
        let form = new FormData();

        for (let key in inputs) {
          form.append(key, inputs[key]);
        }

        await axios({
          method: 'post',
          url: forms[0].href,
          headers: { 'USER-ID': '7747' },
          data: form
        });

        await unbind({url: url});
      }
    }
    
    submitAction().then(() => {
      setNeedRefresh(true);
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
  