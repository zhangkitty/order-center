import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button, Input, Popover, message } from 'antd';
import style from '../style.css';
import { commit, updateEmail } from '../action';

const lan = {
  email: '退货邮箱',
  upEmail: '更新退货邮箱',
  edit: '编辑',
  save: '保存',
  emailValid: '邮箱地址错误',
};
const info = {
  sadrr: {
    left: [
      { name: 'Name', key: 'name' },
      { name: 'Address Line 1', key: 'address_1' },
      { name: 'Address Line 2', key: 'address_2' },
      { name: 'City', key: 'city' },
      { name: 'Country', key: 'country' },
      { name: 'Telephone', key: 'telephone' },
      { name: '退货邮箱', key: 'email' },
    ],
    right: [
      { name: 'Company Name', key: 'company_name' },
      { name: 'State/Province', key: 'state' },
      { name: 'Post/Zip Code', key: 'post' },
      { name: 'Fax', key: 'fax' },
    ],
  },
  badrr: {
    left: [
      { name: 'Name', key: 'name' },
      { name: 'Address Line 1', key: 'address_1' },
      { name: 'Address Line 2', key: 'address_2' },
      { name: 'City', key: 'city' },
      { name: 'Country', key: 'country' },
      { name: 'Telephone', key: 'telephone' },
    ],
    right: [
      { name: 'Company Name', key: 'company_name' },
      { name: 'State/Province', key: 'state' },
      { name: 'Post/Zip Code', key: 'post' },
      { name: 'Fax', key: 'fax' },
    ],
  },
};
const cardStyle = { width: '700px', margin: '0 20px 20px 40px' };
const emailStyle = {
  width: '200px',
  float: 'left',
  marginRight: '5px',
};
// TODO: lan
const Address = (
  {
    dataSource: { base: { order_info: { shipping_address, billing_address } } },
    emailShow,
    dispatch,
    returnEmail,
    orderId,
  },
) => (
  <div style={{ display: 'flex' }}>
    <Card title="Shipping Address" style={cardStyle}>
      <div style={{ width: '50%', float: 'left' }}>
        <Button style={{ position: 'absolute', right: '10px' }}>{lan.edit}</Button>
        {
          info.sadrr.left.map(v => (
            <div key={v.key}>
              <span className={style.spanWidth}>{ v.name }:</span>
              <span style={{ marginRight: '5px' }}>{shipping_address[v.key]}</span>
              {
                v.key === 'email' ?
                  <Popover
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
                          style={emailStyle}
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
                    <Button>{lan.email}</Button>
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
            <div key={v.key}>
              <span className={style.spanWidth}>{ v.name }:</span>
              <span>{shipping_address[v.key]}</span>
            </div>
          ))
        }
      </div>
    </Card>
    <Card title="Billing Address" style={cardStyle}>
      <div style={{ width: '50%', float: 'left' }}>
        {
          info.badrr.left.map(v => (
            <div key={v.key}>
              <span className={style.spanWidth}>{ v.name }:</span>
              <span>{billing_address[v.key]}</span>
            </div>
          ))
        }
      </div>
      <div>
        {
          info.badrr.right.map(v => (
            <div key={v.key}>
              <span className={style.spanWidth}>{ v.name }:</span>
              <span>{billing_address[v.key]}</span>
            </div>
          ))
        }
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
};
export default Address;
