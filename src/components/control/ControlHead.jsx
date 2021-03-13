import React from 'react';
import { useToasts } from 'react-toast-notifications';

import styles from './ControlHead.module.css';

function ControlHead({
  id,
  desc,
  url,
  loadError,
  setPanelVisible,
}) {
  const { addToast } = useToasts();

  const onClick = () => {
    setPanelVisible((prevDisplay) => !prevDisplay);
  };

  const onErrorClick = () => {
    addToast(
      `You can't use the controller "${id}" because it doesn't respond.`,
      { 
        appearance: 'error', 
        autoDismiss: true,
      }
    )
  }

  return (
    <div className="headline">
      <span>
        {loadError && 
          <i className={`${styles.WarningIcon} ri-error-warning-fill`} /> 
        }
        <h2 
          onClick={loadError ? onErrorClick : onClick}
          className={`\
            ${loadError ? styles.ErrorTitle : styles.NormalTitle}\
            ${styles.Title}\
          `}
        >
          {id}
        </h2>
      </span>
      <div className={styles.DescriptionWrapper}>
        <p className={styles.ResourceDescription}>{desc}</p>
        <a href={url} target="_blank" rel="noopener noreferrer">{url}</a>
      </div>
    </div>
  )
}

export default React.memo(ControlHead);