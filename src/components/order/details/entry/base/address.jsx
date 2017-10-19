import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button, Input, Popover, message } from 'antd';
import { hashHistory } from 'react-router';
import style from '../style.css';
import { commit, updateEmail } from '../action';

const lan = {
  email: __('order.entry.back_email'),
  upEmail: __('order.entry.update_back_email'),
  update: __('order.entry.update'),
  edit: __('order.entry.edit'),
  save: __('order.entry.save'),
  emailValid: __('order.entry.email_fail'),
};
const info = {
  sadrr: {
    left: [
      { name: __('order.entry.address_name'), key: 'name' },
      { name: __('order.entry.address1'), key: 'address_1' },
      { name: __('order.entry.address2'), key: 'address_2' },
      { name: __('order.entry.address_city'), key: 'city' },
      { name: __('order.entry.address_country'), key: 'country' },
      { name: __('order.entry.address_telephone'), key: 'telephone' },
      { name: lan.email, key: 'email' },
    ],
    right: [
      { name: __('order.entry.address_company'), key: 'company_name' },
      { name: __('order.entry.address_state'), key: 'state' },
      { name: __('order.entry.address_post'), key: 'post' },
      { name: __('order.entry.address_fax'), key: 'fax' },
    ],
  },
  badrr: {
    left: [
      { name: __('order.entry.address_name'), key: 'name' },
      { name: __('order.entry.address1'), key: 'address_1' },
      { name: __('order.entry.address2'), key: 'address_2' },
      { name: __('order.entry.address_city'), key: 'city' },
      { name: __('order.entry.address_country'), key: 'country' },
      { name: __('order.entry.address_telephone'), key: 'telephone' },
    ],
    right: [
      { name: __('order.entry.address_company'), key: 'company_name' },
      { name: __('order.entry.address_state'), key: 'state' },
      { name: __('order.entry.address_post'), key: 'post' },
      { name: __('order.entry.address_fax'), key: 'fax' },
    ],
  },
};

const Address = (
  {
    dataSource: { base: { order_info: { shipping_address, billing_address } } },
    emailShow,
    dispatch,
    returnEmail,
    orderId,
    billno,
  },
) => (
  <div className={style.cardBg}>
    <Card
      title={__('order.entry.shipping_address')}
      className={style.cardStyle}
      bodyStyle={{ padding: '24px 10px' }}
    >
      <div className={style.baseContent}>
        <div style={{ width: '50%' }}>
          <Button
            style={{ position: 'absolute', right: '10px', top: '55px' }}
            onClick={() => hashHistory.push(`/order/details/edit-address/${orderId}/${billno}`)}
          >{lan.edit}</Button>
          {
            info.sadrr.left.map(v => (
              <div key={v.key} className={style.addressList}>
                <span className={style.spanWidth}>{ v.name }:</span>
                <span style={{ marginRight: '5px' }}>{shipping_address[v.key]}</span>
                {
                  v.key === 'email' ?
                    <Popover
                      placement="topLeft"
                      content={
                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                            if (returnEmail.match(reg)) {
                              return dispatch(updateEmail(orderId, returnEmail));
                            }
                            return message.warning(lan.emailValid);
                          }}
                        >
                          <Input
                            className={style.emailStyle}
                            onChange={e => dispatch(commit('returnEmail', e.target.value))}
                          />
                          <Button htmlType="submit" type="primary">{lan.save}</Button>
                        </form>
                      }
                      title={lan.upEmail}
                      trigger="click"
                      visible={emailShow}
                      onVisibleChange={d => dispatch(commit('emailShow', d))}
                    >
                      {/*
                      <Button className={style.emailUpdate}>{lan.update}</Button>
                      */}
                      <a className={style.emailUpdate}>{lan.update}</a>
                    </Popover>
                    : null
                }
              </div>
            ))
          }
        </div>
        <div>
          {
            info.sadrr.right.map(v => (
              <div key={v.key} className={style.addressList}>
                <span className={style.spanWidth}>{ v.name }:</span>
                <span>{shipping_address[v.key]}</span>
              </div>
            ))
          }
        </div>
      </div>
    </Card>
    <Card
      title={__('order.entry.billing_address')}
      className={style.cardStyle}
      bodyStyle={{ padding: '24px 10px' }}
    >
      <div className={style.baseContent}>
        <div style={{ width: '50%' }}>
          {
            info.badrr.left.map(v => (
              <div key={v.key} className={style.addressList}>
                <span className={style.spanWidth}>{ v.name }:</span>
                <span>{billing_address[v.key]}</span>
              </div>
            ))
          }
        </div>
        <div>
          {
            info.badrr.right.map(v => (
              <div key={v.key} className={style.addressList}>
                <span className={style.spanWidth}>{ v.name }:</span>
                <span>{billing_address[v.key]}</span>
              </div>
            ))
          }
        </div>
      </div>
    </Card>

  </div>
);
Address.propTypes = {
  dataSource: PropTypes.shape(),
  emailShow: PropTypes.bool,
  dispatch: PropTypes.func,
  returnEmail: PropTypes.string,
  orderId: PropTypes.string,
  billno: PropTypes.string,
};
export default Address;
