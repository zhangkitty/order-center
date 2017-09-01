import React from 'react';
import PropTypes from 'prop-types';
import { Table, Checkbox, Button } from 'antd';
import assign from 'object-assign';
import { commit } from './action';

import Styles from './style.css';

const SingleRow = ({ data, index }) => {
  return (
    <div className={Styles.orderList}>
      <div className={Styles.orderTitle}>
        <div className={Styles.orderTitleL} >
          <Checkbox >{ data.billno }</Checkbox> <span>Qty~~: { data.goods_quantity }</span>
          <span>{data.email}({data.buy_cnt})</span>
          <span>{ data.member_level }</span> <span>{data.pay_time}</span>
          <span> {data.site_from}</span> <span>{data.country_name}</span>
        </div>
        <div className={Styles.orderTitleR}>
          {
            data.order_type === 1 ? <Button className={Styles.ButtonBg}>{__('common.order_type')}</Button> : null
          }
          <span> {data.payment_method}</span>
          <span>{data.usd_price} </span>
          <span> {data.currency_price}</span>
        </div>
      </div>
      <div className={Styles.orderTable}>
        <Table
          rowKey="order_goods_id"
          rowSelection={{
            type: 'checkbox',
            onChange: t => console.log(t),
          }}
          pagination={false}
          showHeader={false}
          dataSource={data.order_goods}
          columns={
          [{
            title: '订单商品编号',
            dataIndex: 'order_goods_sort',
          }, {
            title: '商品图片',
            dataIndex: 'order_goods_img',
            render: data =>  <img src={data} />,
          }]
          }
        />
      </div>
      <div className={Styles.orderOperate}>
        进行中
      </div>
    </div>
  );
};

SingleRow.proptypes = {
  data: PropTypes.arrayOf(PropTypes.shape()),
  index: PropTypes.number,
};
export default SingleRow;
