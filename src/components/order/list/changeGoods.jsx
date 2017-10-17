import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Input, Button, Spin, Select, message } from 'antd';
import { change, goodSize, commit3, changeGoods } from './action';

import styles from './style.css';

const Option = Select.Option;

const ChnageGoods = (props) => {
  const { exchange, dispatch, fetchgoodSize, changeDisabled } = props;
  const { orderId, goods_sn, site_from, goods_size, visible } = exchange;
  return (
    <Modal
      visible={exchange.visible}
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
        <Spin spinning={exchange.load}>
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
        </Spin>

        <Button
          className={styles.changeButton}
          disabled={changeDisabled}
          type="primary"
          onClick={() => {
            if (fetchgoodSize.length > 0 && !goods_size) {
              return message.warning(__('common.choose1')); // size 有值，必填
            }
            return dispatch(changeGoods(exchange));
          }}
        >{__('common.submit')}</Button>
      </div>
    </Modal>
  );
};

ChnageGoods.propTypes = {
  dispatch: PropTypes.func,
  exchange: PropTypes.shape(),
  fetchgoodSize: PropTypes.arrayOf(PropTypes.string),     // goods size
  changeDisabled: PropTypes.bool,
};
export default ChnageGoods;
