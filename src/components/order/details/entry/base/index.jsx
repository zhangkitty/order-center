import React from 'react';
import Base from './base';
import Address from './address';
import Package from './packge';

export default props => (
  <div>
    <Base {...props} />
    <Address {...props} />
    <Package {...props} />
  </div>
);
