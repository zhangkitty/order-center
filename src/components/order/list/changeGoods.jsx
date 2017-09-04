import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Input, Button, Spin, Select, message } from 'antd';
import { change, goodSize, commit3 } from './action';

import styles from './style.css';

const Option = Select.Option;

const ChnageGoods = (props) => {
  const { exchange, dispatch, fetchgoodSize } = props;
  const { orderId, goods_sn, site_from, goods_attr_new } = exchange;
  return (
    <Modal
      visible={exchange.visible}
      onCancel={() => dispatch(change('exchange.visible', false))}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (goods_sn.trim().length === 0) {
            return message.warning('缺少SKU');
          }
          return dispatch(goodSize(
            orderId,
            goods_sn,
            site_from,
            goods_attr_new,
          ));
        }}
      >
        <Input
          value={goods_sn}
          onChange={e => dispatch(commit3('goods_sn', e.target.value))}
        />
        <Button htmlType="submit">查询尺码</Button>
      </form>
      <Spin spinning={exchange.load}>
        <Select
          className={styles.colSpace}
          value={goods_attr_new}
          onChange={val => dispatch(commit3('goods_attr_new', val))}
        >
          <Option key={null} > {__('order.name.choose')}</Option>
          {
            fetchgoodSize.map(item => (
              <Option key={item} > {item}</Option>
            ))
          }
        </Select>

      </Spin>
      <Button>提交</Button>
    </Modal>
  );
}

ChnageGoods.propTypes = {
  dispatch: PropTypes.func,
  exchange: PropTypes.shape(),
  fetchgoodSize: PropTypes.arrayOf(PropTypes.shape()),     // goods size
};
export default ChnageGoods;
