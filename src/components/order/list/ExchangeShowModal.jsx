import React from 'react';
import { Modal, Select, Input, Button } from 'antd';
import PropTypes from 'prop-types';

import { change, goodSize, changeSize, changeMySku, changeSubmitValue } from './action';

const lan = {
  被换商品: '被换商品',
  换货商品: '换货商品',
  自定义SKU: '自定义SKU',
  尺码: '尺码',
  确定: '确定',
};
const Option = Select.Option;
const exchangeshowModal = (props) => {
  const { dispatch, ExchangeShow, BulkReturnInfo } = props;
  return (
    <Modal
      visible={ExchangeShow}
      onCancel={() => dispatch(change('ExchangeShow', false))}
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
                  style={{ flexBasis: 100, marginRight: 20 }}
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
                  onClick={() => dispatch(changeSubmitValue(v.order_goods_id))}
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

};
export default exchangeshowModal;
