import React from 'react';
import PropTypes from 'prop-types';
import { Table, Checkbox, Button, Input, Icon, Popover, message, Popconfirm, Spin } from 'antd';
import { Link, hashHistory } from 'react-router';
import assign from 'object-assign';
import {
  change, commit, remarkShow, openModal,
  logisticsRemark, logisticsRemarkSave, operationGoods,
  openModalCgs, cancelRisk, cancelTroubleTag, markTag, delChange,
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
const showRisk = (a, b) => {
  if (Number(a) === 3) {
    return b ? b.map(v => (<p>{v}</p>)) : <Spin />;
  }
  return null;
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
// TODO: 加语言包
const orderTagName = {
  0: '正常',
  1: '是问题订单',
  2: '作废订单',
  3: '风控订单',
  4: '特殊订单',
  5: '紧急订单',
};
const SingleRow = (props) => {
  const { data, index, dispatch, fetchRemark,
    record, fetchOperation, operationVisible,
    logisticsVisible, remark, fetchLogisticsRemark, dataSource,
    batchChooseOrder, batchChooseGoods, cancelRiskDesc,
  } = props;
  const batchGoods = batchChooseGoods.join(',');
  return (
    <div className={Styles.orderList}>
      <div className={Styles.orderTitle}>
        <div className={Styles.orderTitleL} >
          <Checkbox
            checked={!!batchChooseOrder.find(v => v === data.order_id)}
            onChange={(e) => {
              const value = e.target.checked;
              if (value) {
                dispatch(change('batchChooseOrder', [...batchChooseOrder, data.order_id]));
              } else {
                dispatch(change('batchChooseOrder', batchChooseOrder.filter(v => v !== data.order_id)));
              }
            }}
          >{ data.billno }</Checkbox>
          <span>{__('common.Qty')} { data.goods_quantity }</span>
          <span>{data.email}({data.buy_cnt})</span>
          <span>{ data.member_level }</span> <span>{data.pay_time}</span>
          <span> {data.site_from}</span> <span>{data.country_name}</span>
        </div>
        <div className={Styles.orderTitleR}>
          {
            data.order_type === 3 ? <Button className={Styles.ButtonBg}>{__('common.order_type')}</Button> : null
          }
          <span> {data.payment_method}</span>
          <span>{__('common.table')} {data.usd_price} </span>
          <span> {data.currency_price}</span>
        </div>
      </div>
      <div className={Styles.orderTable}>
        <Table
          rowKey="order_goods_id"
          rowSelection={{
            type: 'checkbox',
            onChange: t => dispatch(change('batchChooseGoods', t)),
            //   onChange: t => console.log(t),
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
                  <div className={Styles.buttonBorderBg} key={rec.order_goods_id}>
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
                      <span
                        onClick={() => dispatch(operationGoods(rec.order_goods_id))}
                        role="button" tabIndex={0}
                      >
                        {__('common.operation')}
                      </span>
                    </Popover>

                    {/* 换货 */}
                    <span
                      onClick={() => {
                        dispatch(openModalCgs(rec.order_goods_id, data.order_id, data.site_from))
                      }
                      }
                      role="button" tabIndex={0}
                    >
                      {__('common.change_goods')}
                    </span>

                    {/*  删除换货 */}

                        <Popconfirm
                          onConfirm={() => dispatch(delChange(data.order_id, rec.goods_id))} //rec.order_goods_id
                        >
                          <a>{__('common.del_goods')}</a>
                        </Popconfirm>


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
          {/*  订单标记 */}
          {
            data.is_trouble > 0 ?
              <Popconfirm
                title={
                  <div>
                    <p>是否取消标记</p>
                    {
                      showRisk(data.is_trouble, data.cancelRiskDesc)
                    }
                  </div>
                }
                onConfirm={() => {
                  if (Number(data.is_trouble) > 0) {
                    dispatch(cancelTroubleTag(data.is_trouble, data.order_id));
                  }
                }}
              >
                <Button
                  onClick={() =>
                    (Number(data.is_trouble) === 3 && dispatch(cancelRisk(data.order_id)))}
                >{orderTagName[data.is_trouble]}</Button>
              </Popconfirm>
              :
              <Button
                onClick={() => dispatch(markTag(data.order_id))}
              >{orderTagName[data.is_trouble]}</Button>
          }
          {/*  退款/取消 */}
          {
            (data.payment_method === 'cod' && data.order_status === 5)
            ||
            data.order_status > 7
              ?
              null
              : <Link to={`/order/goodsRefund/${data.order_id}/${batchGoods}`}>{__('common.order_operation2')}</Link>
          }

          {/*  差价退款 */}
          <Link to={`/order/diffRefund/${data.order_id}`}>{__('common.order_operation3')}</Link>

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
            {
              data.have_remark === 1 ?
                <Button
                  className={Styles.haveRemark}
                  onClick={() => dispatch(remarkShow(data.order_id))}
                >{__('common.order_operation4')}</Button>
                :
                <Button onClick={() => dispatch(remarkShow(data.order_id))}>{__('common.order_operation4')}</Button>
            }
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
            {
              data.have_remark_admin === 1 ?
                <Button
                  className={Styles.haveRemark}
                  onClick={() => dispatch(logisticsRemark(data.order_id))}
                >{__('common.order_operation5')}</Button>
                :
                <Button onClick={() => dispatch(logisticsRemark(data.order_id))}>{__('common.order_operation5')}</Button>
            }
          </Popover>
        </div>
      </div>
    </div>
  );
};


SingleRow.propTypes = {
  data: PropTypes.shape(),
  index: PropTypes.number,
  dispatch: PropTypes.func,
  record: PropTypes.number,
  fetchOperation: PropTypes.arrayOf(PropTypes.shape()),
  cancelRiskDesc: PropTypes.arrayOf(PropTypes.string),
  batchChooseOrder: PropTypes.arrayOf(PropTypes.number),
  batchChooseGoods: PropTypes.arrayOf(PropTypes.string),
  dataSource: PropTypes.arrayOf(PropTypes.shape()),
  operationVisible: PropTypes.bool,
  fetchRemark: PropTypes.arrayOf(PropTypes.shape()),
  fetchLogisticsRemark: PropTypes.string,
  logisticsVisible: PropTypes.bool,
  remark: PropTypes.string,

};
export default SingleRow;
