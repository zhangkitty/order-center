import React from 'react';
import PropTypes from 'prop-types';
import { Table, Checkbox, Button, Input, Icon, Popover } from 'antd';
import { Link, hashHistory } from 'react-router';
import assign from 'object-assign';
import { change, commit, operationGoods, remarkShow, openModal } from './action';

import Styles from './style.css';

const replaceGoods = (source, d) => {
  const obj = {
    0: '--',
    1: '(被换)',
    2: `(${d}换来的货)`,
  };
  return obj[source];
};

const columns = [{
  title: '操作人',
  dataIndex: 'user_name',
  width: '80px',
}, {
  title: '时间',
  dataIndex: 'add_time',
  width: '150px',
}, {
  title: '备注',
  dataIndex: 'remark',
}];

const SingleRow = ({
  data, index, dispatch, fetchOperation, fetchRemark, fetchRemarkSave, clickVisible,
}) => (
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
          render: d => (d || '--'),
        }, {
          title: '商品图片',
          dataIndex: 'order_goods_img',
          render: d => (<img src={d} width="50px" height="50px" alt="goods images" />),
        }, {
          title: '商品属性',
          dataIndex: 'goods_sn',
          render: (d, res) => (
            <div>
              <a href={res.order_detail_url} target="_blank"> {d}</a>
              <span style={{ color: '#108ee9' }}>
                {
                 replaceGoods(res.is_replace, res.replace_goods_sort)
                }
              </span>
              <p> {res.goods_attr ? res.goods_attr : <span>--</span>}</p>
            </div>
          ),
        }, {
          title: '价格',
          dataIndex: 'price',
          render: (d, res) => (<div> ${d} <p style={{ color: '#f00' }}>(${res.coupon_price})</p></div>),
        }, {
          title: '退款单状态', // TODO 具体值没定，需判断
          dataIndex: 'refund_bill_status',
          render: (d, res) => (<div> {d} 根据退款单的状态 <br /> 判断显示（未做）</div>),
        }, {
          title: '操作', // TODO 操作查询，换货
          render: record => (<div className={Styles.buttonBorder}>
            <span onClick={() => dispatch(operationGoods(data.order_goods_id))} role="button" tabIndex={0}>{__('common.operation')}</span>

            <span>{__('common.change_goods')}</span>
          </div>),
        }]
        }
      />
    </div>
    <div className={Styles.orderOperateBg}>

      <div className={Styles.orderOperate}>
        <p> {data.order_status_title} { data.order_status === 3 ? <Icon type="message" /> : <Icon type="message" style={{ color: 'rgb(255,35,0)' }} /> } </p>
        <Button>{__('common.order_operation')}</Button>
        <Button>{__('common.order_operation1')}</Button>
        { data.payment_method === 'cod' && data.order_status === 5  // COD订单 + 订单状态=全部发货(5),退款/取消
          ?
            <Button>{__('common.order_operation2')}</Button>
            : null
        }
        { data.order_status > 7  //  订单状态>7, 退款/取消
          ?
            <Button>{__('common.order_operation2')}</Button>
            : null
        }

        <Button>{__('common.order_operation3')}</Button>

        <Popover
          placement="bottomRight"
          trigger="click"
          arrowPointAtCenter
          visible={clickVisible}
          onVisibleChange={visible => dispatch(change('clickVisible', !visible))}
          content={
            <div className={Styles.tableFloat}>
              <Table
                dataSource={fetchRemark}
                columns={columns} size="small"
                pagination={false}
                style={{ width: window.innerWidth * 0.4, maxHeight: '400px', overflow: 'auto' }}
              />
              <Button  // TODO 隐藏有问题
                style={{ margin: '10px' }}
                type="primary"
                onClick={() => dispatch(change('clickVisible', false))}
              >
                {__('common.order_operation8')}
              </Button>
              <Button
                style={{ margin: '10px' }}
                type="primary"
                onClick={() => dispatch(openModal())}
              >
                {__('common.order_operation6')}
              </Button>
            </div>
          }
        >
          <Button onClick={() => dispatch(remarkShow(data.order_id))}>{__('common.order_operation4')}</Button>
          {/*
           5693173
          */}
        </Popover>

        {/*  物流备注 */}
        {/*

         <Popover
         placement="bottomRight"
         trigger="click"
         arrowPointAtCenter
         visible={clickVisible}
         onVisibleChange={visible => dispatch(change('clickVisible', !visible))}
         content={
         <div className={Styles.tableFloat}>
         <Input.TextArea
         style={{ margin: '10px auto' }}
         rows={3}
         value={remark}
         onChange={e => dispatch(change('remark', e.target.value))}
         />
         <Button  // TODO 隐藏有问题
         style={{ margin: '10px' }}
         type="primary"
         onClick={() => dispatch(change('clickVisible', false))}
         >
         {__('common.order_operation8')}
         </Button>
         <Button
         style={{ margin: '10px' }}
         type="primary"
         onClick={() => {
         if (remark.trim().length === 0) {
         return message.warning(__('common.order_operation9'));
         }
         return dispatch(remarkSave( 5693173, remark));
         }}
         >
         {__('common.order_operation7')}
         </Button>
         </div>
         }
         >
         <Button onClick={() => dispatch(remarkShow(data.order_id))}>{__('common.order_operation5')}</Button>
         </Popover>

        */}
        <Button onClick={() => dispatch(remarkShow(data.order_id))}>{__('common.order_operation5')}</Button>

      </div>
    </div>
  </div>
);

SingleRow.propTypes = {
  data: PropTypes.shape(),
  index: PropTypes.number,
  dispatch: PropTypes.func,
  fetchOperation: PropTypes.arrayOf(PropTypes.shape()),
  fetchRemark: PropTypes.arrayOf(PropTypes.shape()),
  fetchRemarkSave: PropTypes.arrayOf(PropTypes.shape()),
  clickVisible: PropTypes.bool,
};
export default SingleRow;
