import React from 'react';
import PropTypes from 'prop-types';
import assign from 'object-assign';
import { Radio, Input, Checkbox, Select } from 'antd';
import { subchange, activation, pathchange, changeChannelValue } from './action';
import style from './style.css';

const Option = Select.Option;


const inline = {
  width: '100px',
  display: 'inline-block',
  padding: '0',
};
const star = (<span style={{ color: 'red' }}>*</span>);


const RefundChannelGroup = ({ channels, type, dispatch }) => {
  let Chan;
  if (channels.length === 1) {
    Chan = Checkbox;
  } else {
    Chan = Radio;
  }
  const activeOne = channels[channels.length - 1].checked;

  return (<div className={style.space}>
    {
      channels.map(({
                      refundPathId,
                      checked,
                      refundPathName: name,
                      refundValue,
                      priceWithExchangeRate,
                      refundAccountTypeList,
                      refund_method,
                      account,
      }) => (
        <div key={refundPathId}>
          <div className={style.spaceCon}>
            <div className={style.moneyName}>
              <Chan
                checked={checked}
                onChange={(e) => {
                  dispatch(changeChannelValue(refundPathId, 'checked', e.target.checked));
                }}
              />
              <span style={inline}>{name}</span>
              $
            </div>
            <div>
              <Input
                style={{ width: '150px' }}
                type="number"
                disabled={!checked}
                value={refundValue}
                onChange={e => dispatch(changeChannelValue(refundPathId, 'refundValue', e.target.value))}
              />
              <span className={style.spanMargin}>{priceWithExchangeRate.symbol}</span>
              <Input
                style={{ width: '150px' }}
                type="number"
                disabled={!checked}
                value={refundValue && refundValue * priceWithExchangeRate.rate}
                onChange={e => dispatch(changeChannelValue(refundPathId, 'refundValue', e.target.value / priceWithExchangeRate.rate))}
              />
            </div>
          </div>
          {
            !!refundAccountTypeList.length &&
            <div style={{ marginLeft: 170, marginBottom: 5 }}>
              <Select
                allowClear
                placeholder={__('order.goodsRefund.please_select_a_refund_account')}
                style={{ width: 150 }}
                disabled={!activeOne}
              //  value={`${refund_method || ''}`}
                onChange={e => dispatch(changeChannelValue(refundPathId, 'refund_method', Number(e)))}
              >
                {
                  refundAccountTypeList.map(v => (
                    <Option key={v.name}>{v.name}</Option>
                  ))
                }
              </Select>
              <Input
                placeholder={__('order.goodsRefund.Please_enter_a_user_refund_account')}
                style={{ width: 150, marginLeft: '10px' }}
                disabled={!activeOne}
                value={account}
                onChange={e => dispatch(changeChannelValue(refundPathId, 'account', e.target.value))}
              />
            </div>
          }
        </div>
      ))
    }
  </div>
  );
};
RefundChannelGroup.propTypes = {
  channels: PropTypes.arrayOf(PropTypes.shape()),
  type: PropTypes.number,
  dispatch: PropTypes.func,
};
const Price = ({ refundPaths, dispatch }) => {
  const result = [];
  refundPaths.forEach((item) => {
    result[item.channelType] = result[item.channelType] || [];
    result[item.channelType].push(item);
  });
  return (<div className={style.spaceBg}>
    <span className={style.descWidth}>{__('order.goodsRefund.need_cancel_price')}{star}</span>
    <div>
    {
      result.map((item, idx) => (
        <RefundChannelGroup channels={item} type={idx} key={idx} dispatch={dispatch} />
      ))
    }
    </div>
  </div>);
};

Price.propTypes = {
  refundPaths: PropTypes.arrayOf(PropTypes.shape()),
  dispatch: PropTypes.func,
};

export default Price;
