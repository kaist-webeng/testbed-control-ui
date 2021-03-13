import React, { useState } from 'react';
import useSWR from 'swr';

import ControlHead from './ControlHead';
import ControlPanel from './ControlPanel';
import { getFetcher } from '../../utils/fetcher';

function Control({ desc }) {
  const {
    id,
    title,
    url,
    description,
    properties,
    actions,
  } = JSON.parse(desc);
  
  const [isPanelVisible, setPanelVisible] = useState(false);
  const { data, error } = useSWR(url, url => getFetcher(url, 1500));

  if (title && url && description && properties && actions)
    return (
      <>
        <ControlHead
          id={id}
          desc={description}
          url={url}
          loadError={error}
          setPanelVisible={setPanelVisible}
        />
        {data && !error &&
          <ControlPanel
            id={id}
            url={url}
            props={properties}
            actions={actions}
            isPanelVisible={isPanelVisible}
          />
        }
      </>
    )
  
  return (
    <h2 style={{color: "red"}}>
      Failed to parse the description.
    </h2>
  )
};

export default React.memo(Control);