import React from 'react';
import { Modal, Select, Input, Button, message } from 'antd';
import PropTypes from 'prop-types';

import { change, goodSize, changeSize, changeMySku, changeSubmitValue, batchExchangeOrderGoods } from './action';

const lan = {
  被换商品: '被换商品',
  换货商品: '换货商品',
  自定义SKU: '自定义SKU',
  尺码: '尺码',
  确定: '确定',
  没选尺码: '没选尺码',
  提交: '提交',
  没有换货信息: '没有换货信息',
};
const Option = Select.Option;
const exchangeshowModal = (props) => {
  const { dispatch, ExchangeShow, BulkReturnInfo, confirmLoading } = props;
  return (
    <Modal
      confirmLoading={confirmLoading}
      visible={ExchangeShow}
      onCancel={() => dispatch(change('ExchangeShow', false))}
      okText={lan.提交}
      onOk={() => {
        const temp = BulkReturnInfo.reduce((sum, value) => sum + value.submitValue.length, 0);
        if (temp === 0) {
          return message.info(lan.没有换货信息);
        }
        dispatch(change('confirmLoading', true));
        dispatch(batchExchangeOrderGoods(BulkReturnInfo));
      }}
      width={800}
    >
      <div style={{ marginTop: 20 }}>
        <div style={{ display: 'flex', flexDirection: 'row', marginBottom: 20 }}>
          <div style={{ flexBasis: 300 }}>{lan.被换商品}</div>
          <div>{lan.换货商品}</div>
        </div>
        {BulkReturnInfo.map(v => (
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div style={{ display: 'flex', flexDirection: 'row', flexBasis: 300 }}>
              <div style={{ flexBasis: 50 }}>{v.order_goods_sort}</div>
              <div style={{ flexBasis: 150 }}>{v.goods_sn}</div>
              <div style={{ flexBasis: 100 }}>{v.goods_attr}</div>
            </div>
            <div style={{ flexGrow: '1' }}>
              <div>
                {v.submitValue.map(value =>
                  (<div style={{ display: 'flex', flexDirection: 'row' }}>
                    <div style={{ marginRight: 20 }}>{value.mysku}</div>
                    <div>{value.selectedValue}</div>
                  </div>),
                )}
              </div>
              <div style={{ display: 'flex', flexDirection: 'row', flexGrow: '1' }}>
                <div style={{ flexBasis: 110 }}>{lan.自定义SKU}</div>
                <div style={{ flexBasis: 200 }}>
                  <Input
                    type="text"
                    value={v.mysku}
                    onChange={e => dispatch(changeMySku(v.order_goods_id, e.target.value))}
                    onPressEnter={e => dispatch(goodSize(
                      {
                        goods_sn: e.target.value,
                        site_from: v.site_from,
                        order_goods_id: v.order_goods_id,
                      },
                    ))}
                  />
                </div>
                <div style={{ flexBasis: 50, marginLeft: 20 }}>{lan.尺码}</div>
                <Select
                  style={{ flexBasis: 150, marginRight: 20 }}
                  disabled={v.selectedDisabled}
                  value={v.selectedValue}
                  onChange={(value) => {
                    console.log(value);
                    dispatch(changeSize(v.order_goods_id, value));
                  }}
                >
                  {
                    v.size.map(value => <Option value={value}>{value}</Option>)
                  }
                </Select>
                <Button
                  onClick={() => {
                    if (v.selectedValue) {
                      return dispatch(changeSubmitValue(v.order_goods_id));
                    }
                    return message.info(lan.没选尺码);
                  }}
                >{lan.确定}</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Modal>
  );
};

exchangeshowModal.propTypes = {
  dispatch: PropTypes.func,
  ExchangeShow: PropTypes.Boolean,
  BulkReturnInfo: PropTypes.arrayOf(PropTypes.shape()),
  confirmLoading: PropTypes.Boolean,

};
export default exchangeshowModal;
