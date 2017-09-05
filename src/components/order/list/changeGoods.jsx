import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Input, Button, Spin, Select, message } from 'antd';
import { change, goodSize, commit3, changeGoods } from './action';

import styles from './style.css';

const Option = Select.Option;

const ChnageGoods = (props) => {
  const { exchange, dispatch, fetchgoodSize } = props;
  const { orderId, goods_sn, site_from, goods_size, visible } = exchange;
  return (
    <Modal
      visible={exchange.visible}
      footer={null}
      onCancel={() => dispatch(commit3('visible', false))}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (goods_sn.trim().length === 0) {
            return message.warning(__('common.submitTitle'));
          }
          return dispatch(goodSize(exchange));
        }}
      >
        <Input
          style={{ width: '200px' }}
          value={goods_sn}
          onChange={e => dispatch(commit3('goods_sn', e.target.value))}
        />
        <Button htmlType="submit">{__('common.checkSize')}</Button>
      </form>
      <Spin spinning={exchange.load}>
        <Select
          className={styles.colSpace}
          value={goods_size}
          onChange={val => dispatch(commit3('goods_size', val))}
        >
          <Option key={null} > {__('order.name.choose')}</Option>
          {
            fetchgoodSize.map(item => (
              <Option key={item} > {item}</Option>
            ))
          }
        </Select>

      </Spin>
      <Button onClick={() => dispatch(changeGoods(exchange))}>{__('common.submit')}</Button>
    </Modal>
  );
}

ChnageGoods.propTypes = {
  dispatch: PropTypes.func,
  exchange: PropTypes.shape(),
  fetchgoodSize: PropTypes.arrayOf(PropTypes.string),     // goods size
};
export default ChnageGoods;
