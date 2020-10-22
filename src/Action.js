import React from 'react';
import axios from 'axios';

import { bind, unbind } from './Ownership';

function Action({ action, url }) {
  const { title, description, input, forms } = action;

  const onSubmit = event => {
    event.preventDefault();

    const submitAction = async () => {
      const boundStatus = await bind({url: url});
      console.log(boundStatus);

      if (!boundStatus) {
        const response = await axios({
          method: 'post',
          url: forms[0].href,
          headers: { 'USER-ID': '7747' }
        });

        await unbind({url: url});
      }
    }
    submitAction();
  }

  return (
    <div className="item">
      <h4>{title}</h4>
      <div>{description}</div>
      <form onSubmit={onSubmit}>
        {input && <div style={{color: "red"}}>Sorry, currently input forms are not supported.</div>}
        <input type="submit" value="Submit" />
      </form>
    </div>
  )
}

export default React.memo(Action);
  