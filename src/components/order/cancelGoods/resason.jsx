import React from 'react';
import PropTypes from 'prop-types';
import assign from 'object-assign';
import { Radio, Tag, Checkbox } from 'antd';
import { subchange } from './action';
import style from './style.css';

const RG = Radio.Group;

const CG = Checkbox.Group;
const star = (<span style={{ color: 'red' }}>*</span>);
const Reason = ({ reasons, dataSource: { orderGoods }, dispatch, submitValue }) => (
  <div className={style.reason}>
    <span className={style.descWidth}>{__('order.goodsRefund.cancel_goods_reason')}{star}</span>
    <div>
      <RG
        style={{ display: 'flex' }}
        value={submitValue.reason.reasonId}
        onChange={
          e => dispatch(subchange('reason',
            assign({},
              submitValue.reason,
              {
                reasonId: e.target.value,
                goodsIds: submitValue.reason.reasonId !== 20 ? [] : submitValue.reason.goodsIds,
              })))
        }
      >
        {
          reasons.map(v => (
            <div key={v.name} className={style.reasonitem}>
              <Tag color="#919191" style={{ textAlign: 'center', marginBottom: '10px' }}>{v.name}</Tag>
              {
                v.children.map(d => (
                  Number(submitValue.reason.reasonId) === 20 && Number(d.id) === 20 ?
                    <div key={d.id}>
                      <Radio
                        value={d.id} key={d.id}
                      >
                        {d.name}
                      </Radio>
                      <CG
                        options={orderGoods
                          .map(({ id, goodsSort }) => ({ label: goodsSort, value: id }))}
                        value={submitValue.reason.goodsIds}
                        onChange={
                          goodsIds => dispatch(subchange('reason', { reasonId: d.id, goodsIds }))
                        }
                      />
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
  submitValue: PropTypes.shape(),
  dispatch: PropTypes.func,
};
export default Reason;

