import styles from './AuthLayout.module.css';
import React from 'react';
function AuthLayout( {children}) {

  return (
    <div className={styles.container}>
      <div className={styles.header}>
      </div>
      <div className={styles.body}>
        <div className={styles.content}>
          {children}
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;