import React from 'react';
import PropTypes from 'prop-types';
import assign from 'object-assign';
import { Radio, Input, Checkbox, Select } from 'antd';
import { subchange } from './action';
import style from './style.css';

const Rg = Radio.Group;
const Option = Select.Option;
const space = {
  display: 'flex',
  marginTop: '15px',
  marginBottom: '20px'
};
const inline = {
  width: '70px',
  display: 'inline-block',
  padding: 0,
};
const spanWidth = {
  margin: '0 15px',
};
const tipStyle = {
  background: '#ffe9a7',
  margin: '0 10px',
  padding: '0 10px',
  borderRadius: '4px',
};
const types = {
  1: __('order.goodsRefund.giftcard'),
  2: __('order.goodsRefund.wallet'),
  3: __('order.goodsRefund.users'),
};

const star = (<span style={{ color: 'red' }}>*</span>);

const Price = ({ dataSource, submitValue, dispatch }) => {
  return (
    <div style={space}>
      <span className={style.descWidth}>{__('order.goodsRefund.need_cancel_price')}{star}</span>
      <div>
        {
          submitValue.refundPaths.map((v, i) => (
          <div>
            <div className={style.flex_center}>
              <div style={{ width: 150 }}>
                {
                  v.recordId > 1 ?
                    <Radio value={v.recordId} />
                    :
                    <Checkbox
                      onChange={e => dispatch(subchange('refundPaths', [
                        ...submitValue.refundPaths.slice(0, i),
                        assign({}, submitValue.refundPaths[i], { check: e.target.checked }),
                        ...submitValue.refundPaths.slice(i + 1),
                      ]))}
                    />
                }

                <span style={inline}>{types[v.recordId]}</span>


                <span style={spanWidth}>$</span>
              </div>
              <div>
                <Input
                  style={{ width: '150px' }}
                  value={v.refundAmount}
                  onChange={e => dispatch(subchange('refundPaths', [
                    ...submitValue.refundPaths.slice(0, i),
                    assign({}, submitValue.refundPaths[i], {
                      refundAmount: e.target.value,
                      refundAmount2: Number(Number(e.target.value) * v.rate).toFixed(2),
                    }),
                    ...submitValue.refundPaths.slice(i + 1),
                  ]))}
                />
                <span style={spanWidth}>{v.currency}</span>
                <Input
                  style={{ width: '150px' }}
                  value={v.refundAmount2}
                  onChange={e => dispatch(subchange('refundPaths', [
                    ...submitValue.refundPaths.slice(0, i),
                    assign({}, submitValue.refundPaths[i], {
                      refundAmount: Number(Number(e.target.value) * v.rate2).toFixed(2),
                      refundAmount2: e.target.value,
                    }),
                    ...submitValue.refundPaths.slice(i + 1),
                  ]))}
                />
                <span style={tipStyle}>{__('order.goodsRefund.no_over_price')}${v.max}</span>
              </div>
            </div>
            {
              !!v.refundAccountTypeList.length &&
              <div style={{ margin: '10px 150px' }}>
                <Select
                  allowClear
                  placeholder={__('order.goodsRefund.please_select_a_refund_account')}
                  style={{ width: 150 }}
                  // value={`${v.refund_method || ''}`}
                  onChange={va => dispatch(subchange('refundPaths', [
                    ...submitValue.refundPaths.slice(0, i),
                    assign({}, submitValue.refundPaths[i], { refund_method: va }),
                    ...submitValue.refundPaths.slice(i + 1),
                  ]))
                  }
                >
                  {
                    v.refundAccountTypeList.map(d => (
                      <Option key={d.name}>{d.name}</Option>
                    ))
                  }
                </Select>
                <Input
                  placeholder={__('order.goodsRefund.Please_enter_a_user_refund_account')}
                  style={{ width: 150, marginLeft: '5px' }}
                  value={v.account}
                  onChange={e => dispatch(subchange('refundPaths', [
                    ...submitValue.refundPaths.slice(0, i),
                    assign({}, submitValue.refundPaths[i], { account: e.target.value }),
                    ...submitValue.refundPaths.slice(i + 1),
                  ]))}
                />
              </div>
            }
          </div>
          ))
        }
      </div>
    </div>
  );
};

Price.propTypes = {
  dataSource: PropTypes.shape(),
  submitValue: PropTypes.shape(),
  dispatch: PropTypes.func,
};
export default Price;
