import React from 'react';

import Control from './control/Control';

function ControlArray({ descriptions }) {
  return (
    <>
      {descriptions.map(description => (
        <section>
          <Control
            desc={description.raw_description}
            key={description.id}
          />
        </section>
      ))}
    </>
  )
}

export default React.memo(ControlArray);