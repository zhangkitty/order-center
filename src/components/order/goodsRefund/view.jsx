/**
 *  Create by liufeng on 2017/6/28
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Spin, Input, Button } from 'antd';
import { change, getData } from './action';
import SumOfMoney from './sumOfMoney';
import RefundGoods from './refundGoods';
import Resason from './resason';
import style from './style.css';

const TextArea = Input.TextArea;

class GoodsRefund extends Component {
  constructor(props) {
    super(props);
    const { dispatch, params: { orderId, goodsId }, ready, orderId: pid, goodsId: pgid } = props;
    if (!ready || orderId !== pid || goodsId !== pgid) {
      dispatch(change('orderId', orderId));
      dispatch(change('goodsId', goodsId));
      dispatch(getData(orderId, goodsId));
    }
  }
  render() {
    const { ready } = this.props;
    return (
      ready ?
        <form className={style.content}>
          <SumOfMoney {...this.props} />
          <RefundGoods {...this.props} />
          <Resason {...this.props} />
          <div className={style.mark}>
            <span className={style.descWidth}>{__('order.goodsRefund.mark')}：</span>
            <TextArea placeholder="备注信息" autosize={{ minRows: 2, maxRows: 6 }} style={{ width: '65%' }} />
          </div>
          <Button type="primary" htmlType="submit" style={{ margin: '15px 0 80px 15px' }}>提交</Button>
        </form>
        :
        <Spin spinning />
    );
  }
}
GoodsRefund.propTypes = {
  dispatch: PropTypes.func,
  load: PropTypes.bool,
  ready: PropTypes.bool,
  orderId: PropTypes.string,
  goodsId: PropTypes.string,
  params: PropTypes.shape(),
};

const mapStateToProps = state => state['order/goodsRefund'];
export default connect(mapStateToProps)(GoodsRefund);
