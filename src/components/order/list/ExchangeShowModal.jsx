import React from 'react';
import { Modal, Select, Input, Button, message, Tag, Radio, Row, Col, Form } from 'antd';
import PropTypes from 'prop-types';
import styles from './style.css';

import { change, goodSize, changeSize, changeMySku, changeSubmitValue, batchExchangeOrderGoods, deleteSubmitValue } from './action';

const lan = {
  被换商品: __('order.list.ExchangeShowModal.被换商品'),
  换货商品: __('order.list.ExchangeShowModal.换货商品'),
  自定义SKU: __('order.list.ExchangeShowModal.自定义SKU'),
  尺码: __('order.list.ExchangeShowModal.尺码'),
  确定: __('order.list.ExchangeShowModal.确定'),
  没选尺码: __('order.list.ExchangeShowModal.没选尺码'),
  提交: __('order.list.ExchangeShowModal.提交'),
  没有换货信息: __('order.list.ExchangeShowModal.没有换货信息'),
  信息不全: __('order.list.ExchangeShowModal.信息不全'),
  删除: __('order.list.ExchangeShowModal.删除'),
  exchangeReason: __('order.list.ExchangeShowModal.exchangeReason'),
  paymentOrder: __('order.list.ExchangeShowModal.paymentOrder'),
  paymentAccount: __('order.list.ExchangeShowModal.paymentAccount'),
  paymentBill: __('order.list.ExchangeShowModal.paymentBill'),
  paymentAmount: __('order.list.ExchangeShowModal.paymentAmount'),
  noReason: __('order.list.ExchangeShowModal.noReason'),
  cancel: __('order.list.ExchangeShowModal.cancel'),
};
const formItemLayout = {
  labelCol: {
    md: 11,
  },
  wrapperCol: {
    md: 13,
  },
};
// 取消时间
function cancelClick(dispatch, changeFunc) {
  dispatch(changeFunc('submitDis'), false);
  dispatch(changeFunc('ExchangeShow', false));
}
const Option = Select.Option;
const exchangeshowModal = (props) => {
  const {
    dispatch,
    ExchangeShow,
    BulkReturnInfo,
    confirmLoading,
    reason,
    selectReason,
    payment_txn_id,
    payment_account,
    currency_code,
    payment_amount,
    submitDis,
  } = props;
  return (
    <Modal
      confirmLoading={confirmLoading}
      visible={ExchangeShow}
      footer={null}
      onCancel={() => cancelClick(dispatch, change)}
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
                {v.submitValue.map((value, idx) =>
                  (<div style={{ display: 'flex', flexDirection: 'row' }}>
                    <div style={{ marginRight: 20 }}>{value.mysku}</div>
                    <div>{value.selectedValue}</div>
                    <Button
                      size="small"
                      onClick={() => dispatch(deleteSubmitValue(v.order_goods_id, idx))}
                    >{lan.删除}</Button>
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
                    onPressEnter={(e) => {
                      dispatch(changeSize(v.order_goods_id, ''));
                      dispatch(goodSize(
                        {
                          goods_sn: e.target.value,
                          site_from: v.site_from,
                          order_goods_id: v.order_goods_id,
                        },
                      ));
                    }}
                  />
                </div>
                <div style={{ flexBasis: 50, marginLeft: 20 }}>{lan.尺码}</div>
                <Select
                  style={{ flexBasis: 150, marginRight: 20 }}
                  disabled={v.selectedDisabled}
                  value={v.selectedValue}
                  onChange={(value) => {
                    dispatch(changeSize(v.order_goods_id, value));
                  }}
                >
                  {
                    v.size.map(value => <Option value={value}>{value}</Option>)
                  }
                </Select>
                <Button
                  onClick={() => {
                    if (v.selectedDisabled === false) {
                      if (v.size.length > 0 && v.selectedValue === null) {
                        return message.info(lan.没选尺码);
                      }
                      return dispatch(changeSubmitValue(v.order_goods_id));
                    }
                    return message.info(lan.信息不全);
                  }}
                >{lan.确定}</Button>
              </div>
            </div>
          </div>
        ))}
        <div>
          <span className={styles.labelspan}>{lan.exchangeReason}:</span>
          <div className={styles.row}>
            {
              reason.map((re) => {
                return (
                  <Radio.Group
                    value={selectReason}
                    className={styles.group}
                    onChange={e => dispatch(change('selectReason', e.target.value))}
                  >
                    <Tag color="#919191" className={styles.rowTag}>{re.name}</Tag>
                    {
                      re.children.map(value =>
                        <Radio value={value.id} key={value.name}>{value.name}</Radio>,
                      )
                    }
                  </Radio.Group>
                );
              })
            }
          </div>
        </div>
        <Row>
          <Form style={{ marginTop: '20px' }}>
            <Col span={8}>
              <Form.Item {...formItemLayout} label={lan.paymentOrder}>
                <Input onChange={e => dispatch(change('payment_txn_id', e.target.value))} />
              </Form.Item>
            </Col>
            <Col span={8} offset={2}>
              <Form.Item {...formItemLayout} label={lan.paymentAccount}>
                <Input onChange={e => dispatch(change('payment_account', e.target.value))} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item {...formItemLayout} label={lan.paymentBill}>
                <Input onChange={e => dispatch(change('currency_code', e.target.value))} />
              </Form.Item>
            </Col>
            <Col span={8} offset={2}>
              <Form.Item {...formItemLayout} label={lan.paymentAmount}>
                <Input onChange={e => dispatch(change('payment_amount', e.target.value))} />
              </Form.Item>
            </Col>
          </Form>
        </Row>
        <div style={{ display: 'flex' }}>
          <div style={{ marginLeft: 'auto' }}>
            <Button style={{ marginRight: '20px' }} onClick={() => cancelClick(dispatch, change)}>{lan.cancel}</Button>
            <Button
              style={{ marginRight: '20px' }}
              disabled={submitDis}
              type="primary"
              onClick={() => {
                const temp = BulkReturnInfo.reduce((sum, value) => sum + value.submitValue.length, 0);
                if (temp === 0) {
                  return message.info(lan.没有换货信息);
                }
                if (!selectReason) {
                  return message.info(lan.noReason);
                }
                dispatch(change('confirmLoading', true));
                dispatch(batchExchangeOrderGoods({
                  goods_list: BulkReturnInfo,
                  reason: selectReason,
                  payment_txn_id,
                  payment_account,
                  currency_code,
                  payment_amount,
                }));
                return true;
              }}
            >{lan.提交}</Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

exchangeshowModal.propTypes = {
  dispatch: PropTypes.func,
  ExchangeShow: PropTypes.Boolean,
  BulkReturnInfo: PropTypes.arrayOf(PropTypes.shape()),
  confirmLoading: PropTypes.Boolean,
  reason: PropTypes.arrayOf(PropTypes.shape()),
  selectReason: PropTypes.string,
  payment_txn_id: PropTypes.string,
  payment_account: PropTypes.string,
  currency_code: PropTypes.string,
  payment_amount: PropTypes.string,
};
export default exchangeshowModal;
