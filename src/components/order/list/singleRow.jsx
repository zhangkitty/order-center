import React from 'react';
import PropTypes from 'prop-types';
import { Table, Checkbox, Button, Input, Icon, Popover, message } from 'antd';
import assign from 'object-assign';
import {
  change, commit, remarkShow, openModal,
  logisticsRemark, logisticsRemarkSave, operationGoods,
  openModalCgs,
} from './action';

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
  data, index, dispatch, fetchRemark,
  record, fetchOperation, operationVisible,
  logisticsVisible, remark, fetchLogisticsRemark, dataSource,
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
          render: (d, res) => (<div> {d} 根据退款单的状态(没有) <br />判断显示（未做）</div>),
        }, {
          title: '操作', // TODO 换货-少站点
          render: (rec) => {
            return (
              <div className={Styles.buttonBorder} key={rec.order_goods_id}>
                {/* 操作查询 */}
                <Popover
                  placement="bottomRight"
                  trigger="click"
                  arrowPointAtCenter
                  content={
                    <div className={Styles.tableFloat}>
                      <Table
                        rowKey={fetchOperation.id}
                        dataSource={fetchOperation}
                        columns={columns} size="small"
                        pagination={false}
                        style={{ width: '350px', maxHeight: '300px', overflow: 'auto' }}
                      />
                    </div>
                  }
                >
                  <Button onClick={() => dispatch(operationGoods(rec.order_goods_id))} >
                    {__('common.operation')}
                  </Button>
                </Popover>

                {/* 换货 data.site_from */}
                <Button onClick={() => dispatch(openModalCgs(rec.order_goods_id, data.order_id, 'shein'))}>{__('common.change_goods')}</Button>
              </div>
            );
          },
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

        {/*  备注 */}
        <Popover
          placement="bottomRight"
          trigger="click"
          arrowPointAtCenter
          content={
            <div className={Styles.tableFloat}>
              <Table
                dataSource={fetchRemark}
                columns={columns} size="small"
                pagination={false}
                style={{ width: window.innerWidth * 0.4, maxHeight: '400px', overflow: 'auto' }}
              />
              <Button
                style={{ margin: '10px' }}
                type="primary"
                onClick={() => dispatch(openModal(data.order_id))}
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
        <Popover
          placement="bottomRight"
          trigger="click"
          arrowPointAtCenter
          content={
            <div className={Styles.tableFloat}>
              <Input.TextArea
                style={{ margin: '10px auto' }}
                rows={3}
                value={data.transhRemark}
                onChange={e => dispatch(change('dataSource', [
                  ...dataSource.slice(0, index),
                  assign({}, data, { transhRemark: e.target.value }),
                  ...dataSource.slice(index + 1),
                ]))}
              />
              <Button
                style={{ margin: '10px' }}
                type="primary"
                onClick={() => {
                  if (data.transhRemark.trim().length === 0) {
                    return message.warning(__('common.order_operation9'));
                  }
                  return dispatch(logisticsRemarkSave(data.order_id, data.transhRemark));
                }}
              >
                {__('common.order_operation7')}
              </Button>
            </div>
          }
        >
          <Button onClick={() => dispatch(logisticsRemark(data.order_id))}>{__('common.order_operation5')}</Button>
        </Popover>
      </div>
    </div>
  </div>
);

SingleRow.propTypes = {
  data: PropTypes.shape(),
  index: PropTypes.number,
  dispatch: PropTypes.func,
  record: PropTypes.number,
  fetchOperation: PropTypes.arrayOf(PropTypes.shape()),
  dataSource: PropTypes.arrayOf(PropTypes.shape()),
  operationVisible: PropTypes.bool,
  fetchRemark: PropTypes.arrayOf(PropTypes.shape()),
  fetchLogisticsRemark: PropTypes.string,
  logisticsVisible: PropTypes.bool,
  remark: PropTypes.string,
};
export default SingleRow;
