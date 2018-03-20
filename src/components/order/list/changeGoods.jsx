import React from 'react';
import PropTypes from 'prop-types';
import assign from 'object-assign';
import { Modal, Input, Button, Select, message, Radio, Tag, Row, Col, Form } from 'antd';
import { change, goodSize, commit3, changeGoods } from './action';

import styles from './style.css';

const Option = Select.Option;

const formItemLayout = {
  labelCol: {
    md: 11,
  },
  wrapperCol: {
    md: 13,
  },
};

const lan = {
  cancel: __('order.list.ExchangeShowModal.cancel'),
  提交: __('order.list.ExchangeShowModal.提交'),
  exchangeReason: __('order.list.ExchangeShowModal.exchangeReason'),
  paymentOrder: __('order.list.ExchangeShowModal.paymentOrder'),
  paymentAccount: __('order.list.ExchangeShowModal.paymentAccount'),
  paymentBill: __('order.list.ExchangeShowModal.paymentBill'),
  paymentAmount: __('order.list.ExchangeShowModal.paymentAmount'),
  noReason: __('order.list.ExchangeShowModal.noReason'),
};

function cancelClick(dispatch, changeFunc) {
  dispatch(changeFunc('submitDis'), false);
  dispatch(commit3('visible', false));
}

const ChnageGoods = (props) => {
  const { exchange,
    dispatch,
    fetchgoodSize,
    changeDisabled,
    reason,
    selectReason,
    payment_txn_id,
    payment_account,
    currency_code,
    payment_amount,
  } = props;
  const { orderId, goods_sn, site_from, goods_size, visible } = exchange;
  return (
    <Modal
      visible={exchange.visible}
      width={800}
      footer={null}
      onCancel={() => dispatch(commit3('visible', false))}
    >
      <div style={{ padding: '10px' }}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!goods_sn || goods_sn.trim().length === 0) {
              return message.warning(__('common.submitTitle'));
            }
            return dispatch(goodSize(exchange));
          }}
        >
          <span className={styles.changeSpan}>{__('common.submitName4')}</span>
          <Input
            className={styles.changeMargin}
            value={goods_sn}
            onChange={e => dispatch(commit3('goods_sn', e.target.value))}
          />
          <Button htmlType="submit">{__('common.checkSize')}</Button>
        </form>
        {/*<Spin spinning={exchange.load}>*/}
          <span className={styles.changeSpan}>{__('common.submitName5')}</span>
          <Select
            disabled={fetchgoodSize.length < 1}
           // allowClear
            className={styles.colSpace}
            value={goods_size}
            onChange={val => dispatch(commit3('goods_size', val))}
          >
            {
              fetchgoodSize.map(item => (
                <Option key={item} > {item}</Option>
              ))
            }
          </Select>
          <div>
            <span className={styles.labelspan}>{lan.exchangeReason}</span>
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
                  <Input value={payment_txn_id} onChange={e => dispatch(change('payment_txn_id', e.target.value))} />
                </Form.Item>
              </Col>
              <Col span={8} offset={2}>
                <Form.Item {...formItemLayout} label={lan.paymentAccount}>
                  <Input value={payment_account} onChange={e => dispatch(change('payment_account', e.target.value))} />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item {...formItemLayout} label={lan.paymentBill}>
                  <Input value={currency_code} onChange={e => dispatch(change('currency_code', e.target.value))} />
                </Form.Item>
              </Col>
              <Col span={8} offset={2}>
                <Form.Item {...formItemLayout} label={lan.paymentAmount}>
                  <Input value={payment_amount} onChange={e => dispatch(change('payment_amount', e.target.value))} />
                </Form.Item>
              </Col>
            </Form>
          </Row>
        <div style={{ display: 'flex' }}>
          <div style={{ marginLeft: 'auto' }}>
            <Button style={{ marginRight: '20px' }} onClick={() => cancelClick(dispatch, change)}>{lan.cancel}</Button>
            <Button
              style={{ marginRight: '20px' }}
              disabled={changeDisabled}
              loading={exchange.load}
              type="primary"
              onClick={() => {
                if (fetchgoodSize.length > 0 && !goods_size) {
                  return message.warning(__('common.choose1')); // size 有值，必填
                }
                if (!selectReason) {
                  return message.info(lan.noReason);
                }
                return dispatch(changeGoods(assign({}, exchange, {
                  reason: selectReason,
                  payment_txn_id,
                  payment_account,
                  currency_code,
                  payment_amount,
                })));
              }}
            >{lan.提交}</Button>
          </div>
        </div>
          {/*<Button*/}
            {/*className={styles.changeButton}*/}
            {/*disabled={changeDisabled}*/}
            {/*type="primary"*/}
            {/*onClick={() => {*/}
              {/*if (fetchgoodSize.length > 0 && !goods_size) {*/}
                {/*return message.warning(__('common.choose1')); // size 有值，必填*/}
              {/*}*/}
              {/*return dispatch(changeGoods(exchange));*/}
            {/*}}*/}
          {/*>{__('common.submit')}</Button>*/}
      </div>
    </Modal>
  );
};

ChnageGoods.propTypes = {
  dispatch: PropTypes.func,
  exchange: PropTypes.shape(),
  fetchgoodSize: PropTypes.arrayOf(PropTypes.string),     // goods size
  changeDisabled: PropTypes.bool,
  reason: PropTypes.array,
  selectReason: PropTypes.string,
  payment_txn_id: PropTypes.string,
  payment_account: PropTypes.string,
  currency_code: PropTypes.string,
  payment_amount: PropTypes.string,
};
export default ChnageGoods;
