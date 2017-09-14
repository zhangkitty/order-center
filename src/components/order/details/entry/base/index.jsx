import React from 'react';
import Base from './base';
import Address from './address';
import Package from './packge';

import styles from '../style.css';

export default props => (
  <div className={styles.contentPadding}>
    <Base {...props} />
    <Address {...props} />
    <Package {...props} />
  </div>
);
