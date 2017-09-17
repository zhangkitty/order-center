import React from 'react';
import PropTypes from 'prop-types';
import assign from 'object-assign';
import { Radio, Input, Checkbox, Select } from 'antd';
import { subchange, activation, pathchange, changeChannelValue } from './action';
import style from './style.css';

const Option = Select.Option;

const lan = {
  please_select_a_refund_account: '请选择退款账户',
  Please_enter_a_user_refund_account: '请输入用户退款账户',
  Please_enter_a_cod_refund_account: 'COD订单请选择退款账户',
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

  return (<div>
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
          <div style={{ marginBottom: 20 }}>
            <Chan
              checked={checked}
              onChange={(e) => {
                dispatch(changeChannelValue(refundPathId, 'checked', e.target.checked));
              }}
            />
            {name}
            $
            <div style={{ display: 'inline-block', width: 120 }}>
              <Input
                disabled={!checked}
                value={refundValue}
                onChange={e => dispatch(changeChannelValue(refundPathId, 'refundValue', e.target.value))}
              />
            </div>
            {priceWithExchangeRate.symbol}
            <div style={{ display: 'inline-block', width: 120 }}>
              <Input
                disabled={!checked}
                value={refundValue && refundValue * priceWithExchangeRate.rate}
                onChange={e => dispatch(changeChannelValue(refundPathId, 'refundValue', e.target.value / priceWithExchangeRate.rate))}
              />
            </div>
          </div>
          {
            !!refundAccountTypeList.length &&
            <div style={{ marginLeft: 100, marginBottom: 20 }}>
              <Select
                defaultValue={lan.please_select_a_refund_account}
                style={{ width: 100 }}
                disabled={!activeOne}
                value={`${refund_method || ''}`}
                onChange={e => dispatch(changeChannelValue(refundPathId, 'refund_method', Number(e)))}
              >
                {
                  refundAccountTypeList.map(v => (
                    <Option key={v.id}>{v.name}</Option>
                  ))
                }
              </Select>
              <Input
                placeholder={lan.Please_enter_a_user_refund_account}
                style={{ width: 120 }}
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
  return (<div>
    {
      result.map((item, idx) => (
        <RefundChannelGroup channels={item} type={idx} key={idx} dispatch={dispatch} />
      ))
    }
  </div>);
};

Price.propTypes = {
  refundPaths: PropTypes.arrayOf(PropTypes.shape()),
  dispatch: PropTypes.func,
};

export default Price;
