import React from 'react';
import { Radio, Input, Checkbox } from 'antd';
import style from './style.css';
import assign from 'object-assign';
import { change } from './action';
import { changeChannelValue } from './action';


const chanelTypeTable = {
  1: 0,
  2: 1,
  3: 1,
  4: 2,
};

const tipStyle = {
  background: '#ffe9a7',
  margin: '0 10px',
  padding: '0 10px',
  borderRadius: '4px',
};

const star = (<span style={{ color: 'red' }}>*</span>);

const RG = Radio.Group;

const price = ({ dataSource, maxTips, dispatch, radioValue, refundPaths }) => {
  const { isUsd } = dataSource;
  const inputDisable = !!isUsd;
  return (<div className={style.space}>
    <span className={style.descWidth}>{__('order.goodsRefund.need_cancel_price')}{star}</span>
    <div>
      <RG
        value={radioValue}
        onChange={(e) => {
          const value = e.target.value;
          const arr = refundPaths.filter(v => v.refundPathId === radioValue);
          const refundAmount = arr[0].refundAmount;
          const refundCurrency = arr[0].refundCurrency;
          dispatch(changeChannelValue(radioValue, 'refundAmount', 0));
          dispatch(changeChannelValue(radioValue, 'refundCurrency', 0));
          dispatch(changeChannelValue(value, 'refundAmount', refundAmount));
          dispatch(changeChannelValue(value, 'refundCurrency', refundCurrency));
          dispatch(change('radioValue', value));
        }}
      >
        {
          refundPaths.map((v, i) => (
            !!v.isShow &&
            <div style={{ marginBottom: 10 }}>
              {
                v.channelType === 0 ? <Checkbox style={{ width: 80 }} checked>{v.refundPathName}</Checkbox>
                    : <Radio style={{ width: 80 }} value={v.refundPathId}>{v.refundPathName}</Radio>
              }
              <div style={{ marginLeft: 10, width: 20, display: 'inline-block' }}>{v.priceUsd.symbol}</div>
              <Input
                style={{ width: '150px', marginLeft: 10 }}
                type="number"
                required
                disabled={!inputDisable}
                value={v.refundAmount >= 0 ? +Number(v.refundAmount).toFixed(2) : 0}
                onChange={(e) => {
                  const { rate } = v.priceWithExchange;
                  dispatch(changeChannelValue(v.refundPathId, 'refundAmount', Number(e.target.value).toFixed(2)));
                  dispatch(changeChannelValue(v.refundPathId, 'refundCurrency', Number(e.target.value * rate).toFixed(2)));
                }}
              />
              <div style={{ marginLeft: 10, width: 20, display: 'inline-block' }}>{v.priceWithExchangeRate.symbol}</div>
              <Input
                style={{ width: 150, marginLeft: 10 }}
                type="number"
                required
                disabled={inputDisable}
                value={v.refundCurrency >= 0 ? +Number(v.refundCurrency).toFixed(2) : 0}
                onChange={(e) => {
                  const { rate } = v.priceWithExchangeRate;
                  dispatch(changeChannelValue(v.refundPathId, 'refundCurrency', Number(e.target.value).toFixed(2)));
                  dispatch(changeChannelValue(v.refundPathId, 'refundAmount', Number(e.target.value / rate).toFixed(2)));
                }}
              />
              {
                <span style={tipStyle}>{__('order.goodsRefund.no_over_price')}{isUsd === 1 ?
                  maxTips[v.refundPathId].priceUsd.amountWithSymbol
                  : maxTips[v.refundPathId].priceWithExchangeRate.amountWithSymbol
                }
                </span>
              }
            </div>
          ))
        }
      </RG>
    </div>

  </div>);
};
export default price;
