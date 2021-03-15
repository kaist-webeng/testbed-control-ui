import React from 'react';

function ActionInputElement( { name, element, inputs, setInputs } ) {
  const { type } = element;

  const onChange = event => {
    setInputs({
      ...inputs,
      [event.target.name]: event.target.value
    });
  };

  // Support for other input types can be made 
  // by adding the cases for them.
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
            onChange={onChange}
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
            onChange={onChange}
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
}

export default React.memo(ActionInputElement);
