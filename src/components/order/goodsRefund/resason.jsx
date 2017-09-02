import React from 'react';
import PropTypes from 'prop-types';
import { Radio, Tag } from 'antd';
import style from './style.css';

const RG = Radio.Group;
const star = (<span style={{ color: 'red' }}>*</span>);
const Reason = ({ reasons }) => (
  <div className={style.reason}>
    <span className={style.descWidth}>{__('order.goodsRefund.cancel_goods_reason')}{star}</span>
    <div>
      <RG style={{ display: 'flex' }}>
        {
          reasons.map(v => (
            <div key={v.name} className={style.reasonitem}>
              <Tag color="#919191" style={{ textAlign: 'center', marginBottom: '10px' }}>{v.name}</Tag>
              {
                v.children.map(d => (
                  <Radio value={d.id} key={d.id}>{d.name}</Radio>
                ))
              }
            </div>
          ))
        }
      </RG>
    </div>
  </div>
);

Reason.propTypes = {
  reasons: PropTypes.arrayOf(PropTypes.shape()),
};
export default Reason;

