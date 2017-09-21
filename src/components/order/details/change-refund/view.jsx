/**
 *  Create by liufeng on 2017/6/28
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import assign from 'object-assign';
import { connect } from 'react-redux';
import { Spin, Input, Button, message } from 'antd';
import { subchange, getData, submitForward, reset } from './action';
import SumOfMoney from './sumOfMoney';
import Price from './price';
import Resason from './resason';
import style from './style.css';

const TextArea = Input.TextArea;

class changeRefund extends Component {
  componentWillMount() {
    const {
      dispatch, params: { orderId },
      ready, submitValue: { orderId: pid },
    } = this.props;
    if (!ready || Number(orderId) !== pid) {
      dispatch(getData(orderId));
    }
  }
  render() {
    const { ready, submitLoad, submitValue, dispatch } = this.props;
    return (
      ready ?
        <form
          className={style.content}
          onSubmit={(e) => {
            e.preventDefault();
            const { shipping, rlFee, refundPaths, reason } = submitValue;
            if (
              shipping === null ||
              rlFee === null ||
              reason.reasonId === null ||
              refundPaths.filter(v => v.check).length < 1
            ) {
              return message.warning(__('order.goodsRefund.missing_something'));
            }
            const res = assign({}, submitValue, { refundPaths });
            return dispatch(submitForward(res));
          }}
        >
          {/*
           <SumOfMoney {...this.props} />
           */}
           <Price {...this.props} />
          {/*
          <Resason {...this.props} />

          */}

          <div className={style.mark}>
            <span className={style.descWidth}>{__('order.goodsRefund.mark')}：</span>
            <TextArea
              placeholder={__('common.content_name1')}
              autosize={{ minRows: 2, maxRows: 6 }}
              style={{ width: '65%' }}
              value={submitValue.remark}
              onChange={e => dispatch(subchange('remark', e.target.value))}
            />
          </div>
          <Button style={{ margin: '15px 80px 80px 0', left: '20%' }} onClick={() => dispatch(reset())}>{__('common.cancel')}</Button>
          <Button
            style={{ margin: '15px 80px 80px 0', left: '20%' }}
            type="primary" htmlType="submit"
            loading={submitLoad}
          >{__('common.submit')}</Button>
        </form>
        :
        <Spin spinning />
    );
  }
}
changeRefund.propTypes = {
  dispatch: PropTypes.func,
  ready: PropTypes.bool,
  submitLoad: PropTypes.bool,
  params: PropTypes.shape(),
  submitValue: PropTypes.shape(),
};

const mapStateToProps = state => state['order/details/change-refund'];
export default connect(mapStateToProps)(changeRefund);
