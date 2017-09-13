import React from 'react';
import PropTypes from 'prop-types';
import assign from 'object-assign';
import { Radio, Input, Checkbox, Select } from 'antd';
import { subchange, activation, pathchange, changeChannelValue } from './action';
import style from './style.css';

const Rg = Radio.Group;
const Option = Select.Option;

const space = {
  display: 'flex',
  marginTop: '15px',
};
const inline = {
  width: '90px',
  display: 'inline-block',
};
const spanWidth = {
  margin: '0 15px',
};
const tipStyle = {
  background: '#ffe9a7',
  margin: '0 10px',
  padding: '0 10px',
  borderRadius: '4px',
  width: '100px',
};
const types = {
  1: __('order.goodsRefund.giftcard'),
  2: __('order.goodsRefund.wallet'),
  3: __('order.goodsRefund.users'),
  4: __('order.diffRefund.overflow'),
};

const lan = {
  please_select_a_refund_account: '请选择退款账户',
  Please_enter_a_user_refund_account: '请输入用户退款账户',
};

const star = (<span style={{ color: 'red' }}>*</span>);


const RefundChannelGroup = ({ channels, type, dispatch }) => {
  console.log(channels, 'channels');
  let Chan;
  if (channels.length === 1) {
    Chan = Checkbox;
  } else {
    Chan = Radio;
  }
  const activeOne = channels[channels.length - 1].checked;

  return (<div>
    {
      channels.map(({ refundPathId, checked, refundPathName: name, refundValue, priceWithExchangeRate }) => (
        <div key={refundPathId} style={{ marginBottom: 20 }}>
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
      ))
    }
    {
      type !== 0 && channels[channels.length - 1].refundAccountTypeList.length > 0 ? <div style={{ marginLeft: 100, marginBottom: 20 }}>
        <Select
          defaultValue={lan.please_select_a_refund_account}
          style={{ width: 100 }}
          disabled={!activeOne}
          value={channels[channels.length - 1].refund_method}
          onChange={e => dispatch(changeChannelValue(channels[channels.length - 1].refundPathId, 'refund_method', e))}
        >
          {
          channels[channels.length - 1].refundAccountTypeList.map(v => <Option key={v.id} value={v.name}>{v.name}</Option>)
        }
        </Select>
        <Input
          placeholder={lan.Please_enter_a_user_refund_account}
          style={{ width: 120 }}
          disabled={!activeOne}
          value={channels[channels.length - 1].account}
          onChange={e => dispatch(changeChannelValue(channels[channels.length - 1].refundPathId, 'account', e.target.value))} />
      </div> : null
    }
  </div>
  );
};

const Price = ({ refundPaths, dispatch }) => {
  const result = [];
  refundPaths.forEach((item) => {
    result[item.channelType] = result[item.channelType] || [];
    result[item.channelType].push(item);
  });
  console.log(result, 'result');
  return (<div>
    {
      result.map((item, idx) => <RefundChannelGroup channels={item} type={idx} key={idx} dispatch={dispatch} />)
    }
  </div>);
};


export default Price;
