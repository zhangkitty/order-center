import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Input, Button, Spin, Select, message } from 'antd';
import { change, goodSize, commit3 } from './action';


const ChnageGoods = (props) => {
  const { exchange, dispatch } = props;
  const { orderId, goods_sn, site_from } = exchange;
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
        <Select />
      </Spin>
      <Button>提交</Button>
    </Modal>
  );
}

ChnageGoods.propTypes = {
  dispatch: PropTypes.func,
  exchange: PropTypes.shape(),
};
export default ChnageGoods;
