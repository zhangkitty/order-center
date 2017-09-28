import React from 'react';
import PropTypes from 'prop-types';
import assign from 'object-assign';
import { Radio, Input, Checkbox, Select } from 'antd';
import { changeChannelValue, change } from './action';
import style from './style.css';

const Option = Select.Option;


const inline = {
  width: '100px',
  display: 'inline-block',
  padding: '0',
};
const tipStyle = {
  background: '#ffe9a7',
  margin: '0 10px',
  padding: '0 10px',
  borderRadius: '4px',
};
const star = (<span style={{ color: 'red' }}>*</span>);

const RefundChannelGroup = ({ channels, dispatch, maxTips }) => {
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
                      refundAmount,
                      priceWithExchangeRate,
                      refundAccountTypeList,
                      account,
      }) => (
        <div key={refundPathId}>
          <div className={style.spaceCon}>
            <div className={style.moneyName}>
              <Chan
                checked={checked}
                disabled={refundPathId === 4 && maxTips.disabled < Number(maxTips[3])}
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
                required
                disabled={!checked}
                value={refundAmount}
                onChange={(e) => {
                  const value = e.target.value;
                  dispatch(change('maxTips', assign({}, maxTips, { disabled: Number(value) })));
                  dispatch(changeChannelValue(refundPathId, 'refundAmount', Number(value).toFixed(2)));
                }}
              />
              <span className={style.spanMargin}>{priceWithExchangeRate.symbol}</span>
              <Input
                style={{ width: '150px' }}
                type="number"
                disabled={!checked}
                value={refundAmount && refundAmount * priceWithExchangeRate.rate}
                onChange={e => dispatch(changeChannelValue(refundPathId, 'refundAmount', Number(e.target.value / priceWithExchangeRate.rate).toFixed(2)))}
              />
              {
                <span style={tipStyle}>{__('order.goodsRefund.no_over_price')}${maxTips[refundPathId] || ''}</span>
              }
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
                onChange={e => dispatch(changeChannelValue(refundPathId, 'refund_method', e))}
              >
                {
                  refundAccountTypeList.map(v => (
                    <Option key={v.name}>{v.name}</Option>
                  ))
                }
              </Select>
              <Input
                placeholder={__('order.goodsRefund.Please_enter_a_user_refund_account')}
                required
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
  dispatch: PropTypes.func,
  maxTips: PropTypes.shape(),
};
const Price = ({ refundPaths, dispatch, maxTips }) => {
  const result = [];
  refundPaths.forEach((item) => {
    result[item.channelType] = result[item.channelType] || [];
    result[item.channelType].push(item);
  });
  return (<div className={style.spaceBg}>
    <span className={style.descWidth}>{__('order.goodsRefund.need_cancel_price')}{star}</span>
    <div>
      {
      result.map((item, idx) => ({ arr: item, key: idx })).map(item => (
        <RefundChannelGroup
          channels={item.arr} type={item.key} key={item.key} dispatch={dispatch} maxTips={maxTips}
        />
      ))
    }
    </div>
  </div>);
};

Price.propTypes = {
  refundPaths: PropTypes.arrayOf(PropTypes.shape()),
  dispatch: PropTypes.func,
  maxTips: PropTypes.shape(),
};

export default Price;
