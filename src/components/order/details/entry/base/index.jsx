import React from 'react';
import { Collapse } from 'antd';
import Base from './base';
import Address from './address';
import Package from './packge';
import styles from '../style.css';


const Panel = Collapse.Panel;
const lan = {
  基本信息: '基本信息',
};


export default props => (
  <div className={styles.contentPadding}>
    <Collapse style={{ marginBottom: 20 }}>
      <Panel header={lan.基本信息} key="1">
        <Base {...props} />
        <Address {...props} />
      </Panel>

    </Collapse>

    <Package {...props} />
  </div>
);
