/**
 *  Create by liufeng on 2017/6/28
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import assign from 'object-assign';
import { connect } from 'react-redux';
import { Radio, Button, message, Input} from 'antd';
import { initPriceInfo,initReasonList } from './action';


import styles from './style.css';


class diffRefund extends Component {
  constructor(props) {
    super(props);
    props.dispatch(initPriceInfo());
    props.dispatch(initReasonList());
  }

  render() {
    const { dispatch, dataSource, fetchType } = this.props;
    return (
      <div className={styles.content}>
        <span>{__('order.diffRefund.order_amount')}:</span>
        <span>{__('order.diffRefund.refund_amount')}:</span>


        <form action="">
          <span>{__('order.diffRefund.refund_amount')}:</span>
          <div>
            <Radio>{__('order.diffRefund.gift_card')}</Radio>
            <label htmlFor="$1">$</label>
            <Input id="$1" className={styles.btn} />
            <label htmlFor="EUR1">EUR</label>
            <Input id="EUR1" className={styles.btn} />
          </div>
          <div>
            <Radio>{__('order.diffRefund.wallet')}</Radio>
            <label htmlFor="$2">$</label>
            <Input id="$2" className={styles.btn} />
            <label htmlFor="EUR2">EUR</label>
            <Input id="EUR2" className={styles.btn} />
          </div>
          <div>
            <Radio>{__('order.diffRefund.client')}</Radio>
            <label htmlFor="$3">$</label>
            <Input id="$3" className={styles.btn} />
            <label htmlFor="EUR3">EUR</label>
            <Input id="EUR3" className={styles.btn} />
          </div>
          <div>
            <Radio>{__('order.diffRefund.overflow')}</Radio>
            <label htmlFor="$4">$</label>
            <Input id="$4" className={styles.btn} />
            <label htmlFor="EUR4">EUR</label>
            <Input id="EUR4" className={styles.btn} />
            <Input className={styles.btn1} placeholder={__('order.diffRefund.placeholder')}/>
          </div>
          <div>
            <Radio>{__('order.diffRefund.refundreason')}</Radio>
          </div>

          <div>
            <span>{__('order.diffRefund.remark')}</span>
            <Input type="textarea" />
          </div>
          <div>
            <Button type="default">{__('order.diffRefund.cancel')}</Button>
            <Button type="primary">{__('order.diffRefund.commit')}</Button>
          </div>

        </form>


      </div>
    );
  }
}
diffRefund.propTypes = {
  dispatch: PropTypes.func,

};

const mapStateToProps = state => state['order/diffRefund'];
export default connect(mapStateToProps)(diffRefund);
