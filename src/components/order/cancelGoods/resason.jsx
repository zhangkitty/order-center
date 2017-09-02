import React from 'react';
import PropTypes from 'prop-types';
import { Radio, Tag, Checkbox } from 'antd';
import { change } from './action';
import style from './style.css';

const RG = Radio.Group;
const overTime = {
  margin: '10px',
  display: 'flex',
  flexDirection: 'column',
};
const star = (<span style={{ color: 'red' }}>*</span>);
const Reason = ({ reasons, dataSource: { orderGoods }, dispatch, reasonId }) => (
  <div className={style.reason}>
    <span className={style.descWidth}>{__('order.goodsRefund.cancel_goods_reason')}{star}</span>
    <div>
      <RG
        style={{ display: 'flex' }}
        onChange={e => dispatch(change('reasonId', e.target.value))}
      >
        {
          reasons.map(v => (
            <div key={v.name} className={style.reasonitem}>
              <Tag color="#919191" style={{ textAlign: 'center', marginBottom: '10px' }}>{v.name}</Tag>
              {
                v.children.map(d => (
                  reasonId === 20 && d.id === 20 ?
                    <div key={d.id}>
                      <Radio
                        value={d.id} key={d.id}
                      >
                        {d.name}
                      </Radio>
                      <div style={overTime}>
                        {
                          orderGoods.map(({ id, goodsSn }) => (
                            <Checkbox
                              checked={!id} key={id}
                              onChange={e => console.log(e.target.checked)}
                            >
                              {goodsSn}
                            </Checkbox>
                          ))
                        }
                      </div>
                    </div>
                    :
                    <Radio
                      value={d.id} key={d.id}
                    >
                      {d.name}
                    </Radio>
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
  dataSource: PropTypes.shape(),
  dispatch: PropTypes.func,
  reasonId: PropTypes.number,
};
export default Reason;

