import React from 'react';
import PropTypes from 'prop-types';
import { Table, Checkbox, Button, Input, Popover, message, Popconfirm, Spin } from 'antd';
import { Link } from 'react-router';
import assign from 'object-assign';

import {
  change, remarkShow, openModal, searchHistory,
  logisticsRemark, logisticsRemarkSave, operationGoods,
  openModalCgs, cancelRisk, cancelTroubleTag, markTag, delChange, commit,
  getOrderRewardPointInfo,
} from './action';

import Styles from './style.css';

// 订单状态
// '1' => '已付款',
//  '2' => '已审核',
//  '3' => '进行中'
// '4' => '部分发货',
//  '5' => '全部发货',
//  '6' => '已签收',
//  '7' => '已完成',
//  '8' =>'已拒收',
//  '9' => '已报损',
//  '10' => '待自提',
//  '11' => '派件异常',
//  '12' => '派件中',
//  '13' => '已经退款',
//  '14' => '已取消',

// 语言包
const lan = {
  积分补偿: __('common.Integral_compensation'),
  换货: '换货',
  没有选择换货商品: '没有选择换货商品',
};

// 订单状态的标记
const colors = {
  1: { bg: '#5AE0ED', border: 'none' },
  2: { bg: '#0A8FE5', border: 'none' },
  3: { bg: 'rgba(10, 143, 229, 0.2)', border: '2px solid #0A8FE5' },
  4: { bg: 'rgba(140,0,255,0.20)', border: '2px solid #8C00FF' },
  5: { bg: '#8C00FF', border: 'none' },
  6: { bg: '#D5DF19', border: 'none' },
  7: { bg: '#2F4031', border: 'none' },
  8: { bg: '#FA4405', border: 'none' },
  9: { bg: '#FF9D00', border: 'none' },
  10: { bg: '#00712A', border: 'none' },
  11: { bg: '#B10016', border: 'none' },
  12: { bg: 'rgba(20,186,9,0.20)', border: '2px solid #14BA09' },
  13: { bg: '#FF2D8A', border: 'none' },
  14: { bg: '#AD8B8B', border: 'none' },
};
const colorCirle = (circle = {}) => (
  <span
    style={{
      width: '10px',
      height: '10px',
      borderRadius: '50%',
      display: 'inline-block',
      marginRight: '5px',
      backgroundColor: circle.bg || '#ccc',
      border: `${circle.border}` || 'none',
    }}
  />
);

const replaceGoods = (source, d) => {
  const obj = {
    0: '',
    1: __('common.change1'),
    2: `(${d}${__('common.change2')})`,
    3: `(${__('common.del_goods')})`,
  };
  return obj[source];
};
const showRisk = (a, b) => {
  if (Number(a) === 3) {
    return b ? b.map(v => (<p>{v}</p>)) : <Spin />;
  }
  return null;
};
// 显示换货入口（商品状态）
const changshow = {
  1: true,  // 已付款
  11: true, // 已审核
  13: true, // 备货中
  84: true, // 有货B区
  85: true, // 有货C东区
  86: true, // 有货C西区
  87: true, // 有货D区
  28: true, // 无货审核
  12: true, // 无货
  23: true,  // 等待出仓
  49: true, // 等待发货
  52: true, // 发货中(add)
  16: true, // 发货
  7: true, // 已经退款
  20: true, // 换货(被换)
  126: true, // 已申请退货
  127: true, // 已退货
  130: true, // 有货南沙仓
};
// 不能选择商品的条件（商品状态=需要退款、已经退款、 COD客服取消、COD客户取消， 换货，删除换货）
const checkboxChecked = {
  1: true, // 已付款
  11: true, // 已审核
  13: true, // 备货中
  84: true, // 有货B区
  85: true, // 有货C东区
  86: true, // 有货C西区
  87: true, // 有货D区
  130: true, // 有货南沙仓
  28: true, // 无货审核
  12: true, // 无货
  23: true, // 等待出仓
  49: true, // 等待发货
  16: true, // 发货
  127: true, // 已经退款
  20: true, // 被换
  54: true, // COD已签收
  91: true, // COD已报损
};
// 操作查询
const columns = [{
  title: __('common.operationCheck'),
  dataIndex: 'user_name',
  width: '80px',
}, {
  title: __('common.operationCheck1'),
  dataIndex: 'add_time',
  width: '150px',
}, {
  title: __('common.operationCheck2'),
  dataIndex: 'status',
}];
// 备注
const columnsRemark = [{
  title: __('common.operationCheck'),
  dataIndex: 'user_name',
  width: '80px',
}, {
  title: __('common.operationCheck1'),
  dataIndex: 'add_time',
  width: '150px',
}, {
  title: __('common.order_operation4'),
  dataIndex: 'remark',
}];
// 标记订单名
const orderTagName = {
  0: __('common.orderTrouble'),
  1: __('common.orderTrouble1'),
  2: __('common.orderTrouble2'),
  3: __('common.orderTrouble3'),
  4: __('common.orderTrouble4'),
  5: __('common.orderTrouble5'),
};
// 商品对应的退款单状态名称
const refundBillStatus = {
  0: __('common.refundBillStatus'),
  1: __('common.refundBillStatus1'),
  2: __('common.refundBillStatus2'),
  3: __('common.refundBillStatus3'),
  4: __('common.refundBillStatus4'),
  5: __('common.refundBillStatus5'),
};
const SingleRow = (props) => {
  const { data, index, dispatch, fetchRemark,
    record, fetchOperation, operationVisible,
    logisticsVisible, remark, fetchLogisticsRemark, dataSource,
    batchChooseOrder, batchChooseGoods, cancelRiskDesc,
    queryString3, selectAllStateStatus, BulkReturnInfo,
  } = props;
  const { siteFrom, memberId } = queryString3;
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
          {/*  全选 */}
          <Button
            className={Styles.orderSelect}
            size="small"
            onClick={() => {
              const bulkarr = data.order_goods.filter(v => checkboxChecked[v.goods_status]);
              let arr = data.order_goods
                              .filter(v => checkboxChecked[v.goods_status])
                              .map(v => v.order_goods_id);
              if (arr.length) {
                if (batchChooseGoods.length === arr.length) {
                  arr = [];
                }
              }
              dispatch(change('batchChooseGoods', arr));
              if (bulkarr.length > 0) {
                dispatch(change('BulkReturnInfo', bulkarr));
              } else {
                dispatch(change('BulkReturnInfo', bulkarr));
              }
            }}
          >{__('common.allChoose')}</Button>

          <span>{__('common.Qty')} { data.goods_quantity }</span>
          <span>
            {data.email}
            {/*  history */}
            (
            <a
              role="button" tabIndex={0}
              onClick={() => dispatch(searchHistory(assign({}, queryString3, {
                pageNumber: 1,
                siteFrom: data.site_from,
                memberId: data.member_id,
              })))
              }
            >{data.buy_cnt}</a>)
          </span>
          <span>{ data.member_level }</span> <span>{data.pay_time}</span>
          <span> {data.site_from}</span> <span>{data.country_name}</span>
        </div>
        <div className={Styles.orderTitleR}>
          { // 红人订单
            Number(data.order_type) === 3 ? <Button className={Styles.ButtonBg}>{__('common.order_type')}</Button> : null
          }
          <span> {data.payment_method}</span>
          <span>{__('common.total')} {data.usd_price} </span>
          <span> {data.currency_price}</span>
        </div>
      </div>

      {/* order goods */}
      <div className={Styles.orderTable}>
        <Table
          rowKey="order_goods_id"
          rowSelection={{
            type: 'checkbox',
            selectedRowKeys: batchChooseGoods,
            getCheckboxProps: rec => ({
              disabled: checkboxChecked[rec.goods_status] === undefined || rec.is_replace === '2',
            }),
            onChange: (selectedRowKeys, selectedRows) => {
              dispatch(change('BulkReturnInfo', selectedRows));
              dispatch(change('batchChooseGoods', selectedRowKeys));
            },
          }}
          pagination={false}
          showHeader={false}
          dataSource={data.order_goods}
          columns={[{
            title: '订单商品编号',
            dataIndex: 'order_goods_sort',
            width: '50px',
          }, {
            title: '商品图片',
            dataIndex: 'order_goods_img',
            width: '80px',
            render: d => (<img src={d} width="60px" height="60px" alt="goods images" />),
          }, {
            title: '商品属性',
            dataIndex: 'goods_sn',
            render: (d, res) => (
              <div>
                <p>{res.goods_name}</p>
                <a href={res.goods_url} target="_blank"> {d}</a>
                <span style={{ color: '#ff0000', marginLeft: '10px' }}>
                  {
                    replaceGoods(res.is_replace, res.replace_goods_sort) // res.goods_status
                  }
                </span>
                <p>{__('order.name.goods_id')}: {res.goods_id}</p>
                <p> {res.goods_attr}</p>
              </div>
            ),
          }, {
            title: '价格',
            dataIndex: 'price',
            width: '10%',
            render: (d, res) => (<div style={{ textAlign: 'center' }}> ${d} <p style={{ color: '#f00' }}>(${res.coupon_price})</p></div>),
          }, {
            title: '退款单状态',
            dataIndex: 'refund_bill_status',
            width: '12%',
            render: (d, res) => (
              <div style={{ textAlign: 'center' }}>
                { // 非COD订单，显示商品对应的退款单状态名称
                  data.payment_method !== 'cod' ?
                    refundBillStatus[d]
                    : null
                }
                { // COD订单，商品状态＝“COD客服取消”，显示“客服取消”，且显示取消原因；
                  Number(res.goods_status) === 75 ?
                    <p>
                      {__('common.customerCancel')}<br />
                      {
                        res.cancel_reason === '' ?
                          null
                          : <span>({res.cancel_reason})</span>
                      }
                    </p>
                    : null
                }
                { // COD订单，商品状态＝“COD客户取消”，则此处显示“客户取消”，且显示取消原因；
                  Number(res.goods_status) === 82 ?
                    <p>
                      {__('common.customerCancel1')}<br />
                      {
                        res.cancel_reason === '' ?
                          null
                          : <span>({res.cancel_reason})</span>
                      }
                    </p>
                    : null
                }
              </div>
            ),
          }, {
            title: '操作',
            width: '18%',
            render: rec => (
              <div className={Styles.buttonBorderBg} key={rec.order_goods_id}>
                {/* 操作查询 */}
                <Popover
                  placement="bottomRight"
                  trigger="click"
                  arrowPointAtCenter
                  content={
                    <Table
                      className={Styles.operatingTable}
                      rowKey={fetchOperation.id}
                      dataSource={fetchOperation}
                      columns={columns} size="small"
                      pagination={false}
                    />
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
                {
                  changshow[rec.goods_status] && Number(rec.is_replace) !== 2 ?
                    <span
                      onClick={() => {
                        dispatch(openModalCgs(rec.order_goods_id, data.order_id, data.site_from));
                      }
                      }
                      role="button" tabIndex={0}
                    >
                      {__('common.change_goods')}
                    </span>
                    : null
                }
                {/*  删除换货--  */}
                {/* 若商品为“换来的货”，且商品状态=已付款、已审核、备货中、延期、有货、无货审核、无货、等待出仓、等待发货 时，显示入口 */}
                {
                  Number(rec.is_replace) === 2 ?
                    <Popconfirm
                      title={__('common.submitTitle2')}
                      onConfirm={() => dispatch(delChange(data.order_id,
                        rec.order_goods_id,
                        rec.replace_goods_sort))}
                    >
                      <span>{__('common.del_goods1')}</span>
                    </Popconfirm>
                    : null
                }
              </div>
            ),
          }]}
        />
      </div>
      <div className={Styles.orderOperateBg}>

        <div className={Styles.orderOperate}>
          { data.goods_quantity > 1 ?
            <div style={{ height: '30px' }} />
            : null
          }
          {/* 订单状态，拒收原因 */}
          <p>
            {colorCirle(colors[data.order_status])}
            {data.order_status_title}
            {
              data.refuse_reason && (data.order_status == 8 || data.order_status == 11) ?
                <span className={Styles.refuseReason}>( {data.refuse_reason} )</span>
                : null
            }
            {/*
             <Icon type="message" style={{ color: 'rgb(255,35,0)' }}
            */}
          </p>
          {/*  查看 */}
          <Link
            to={`/order/details/entry/${data.order_id}/${data.billno}`}
            target="_blank"
          >{__('common.order_operation')}
          </Link>
          {/*  订单标记 */}
          {
            Number(data.is_trouble) > 0 ?
              <Popconfirm
                title={
                  <div className={Styles.fontColor}>
                    <p>{__('common.TroubleCancel')}</p>
                    {
                      showRisk(data.is_trouble, data.cancelRiskDesc)
                    }
                  </div>
                }
                onConfirm={() => { // 取消订单标记
                  if (Number(data.is_trouble) > 0) {
                    dispatch(cancelTroubleTag(0, data.order_id)); // data.is_trouble,取消传0
                  }
                }}
                okText={__('common.submitName2')}
                cancelText={__('common.submitName3')}
              >
                <Button  // 取消风控订单
                  className={Styles.haveRemark}
                  onClick={() =>
                    (Number(data.is_trouble) === 3 && dispatch(cancelRisk(data.order_id)))}
                >{orderTagName[data.is_trouble]}</Button>
              </Popconfirm>
              :
              <Button // 订单标记弹窗
                onClick={() => dispatch(markTag(data.order_id))}
              >{orderTagName[data.is_trouble]}</Button>
          }
          {/*  退款/取消 */}
          {/* {
            (data.payment_method === 'cod' && Number(data.order_status) === 5)
            ||
            data.order_status > 7
              ?
              null
              : <Button
                onClick={() => {
                  const result = data.order_goods.map(v => v.order_goods_id);
                  const arr = batchGoods.split(',');
                  const res = arr.filter(v => !!result.filter(d => d === v).length);
                  if (res.length < 1) {
                    return message.warning(__('common.sagaTitle24'));
                  }
                  // return hashHistory.push(`/order/goodsRefund/${data.order_id}/${batchGoods}`);
                  return window.open(`${location.origin}${location.pathname}#/order/goodsRefund/${data.order_id}/${res.join(',')}`);
                }}
              >{__('common.order_operation2')}</Button>
          } */}

          {/*  差价退款 */}
          <Link to={`/order/diffRefund/${data.order_id}/2`} target="_blank">{__('common.order_operation3')}</Link>

          {/*  备注 */}
          <Popover
            placement="bottomRight"
            trigger="click"
            arrowPointAtCenter
            content={
              <div className={Styles.tableFloat}>
                <Table
                  dataSource={fetchRemark}
                  columns={columnsRemark} size="small"
                  pagination={false}
                  style={{ width: '600px', maxHeight: '400px', overflow: 'auto' }}
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
              Number(data.have_remark) === 1 ?
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
              <div className={Styles.tableFloat2}>
                <Input.TextArea
                  style={{ margin: '10px auto' }}
                  rows={5}
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
              Number(data.have_remark_admin) === 1 ?
                <Button
                  className={Styles.haveRemark}
                  onClick={() => dispatch(logisticsRemark(data.order_id))}
                >{__('common.order_operation5')}</Button>
                :
                <Button onClick={() => dispatch(logisticsRemark(data.order_id))}>{__('common.order_operation5')}</Button>
            }
          </Popover>
          {/* 积分补偿 */}
          {data.reward_point === 1 ?
            <Button
              onClick={
                (e) => {
                  dispatch(getOrderRewardPointInfo(data.order_id));
                }

              }
            >{lan.积分补偿}</Button> :
              null
          }
          {/* 批量换货 */}
          <Button
            onClick={
                () => {
                  if (BulkReturnInfo.length > 0) {
                    dispatch(change('ExchangeShow', true));
                  } else {
                    return message.info(lan.没有选择换货商品);
                  }
                }
              }
          >
            {lan.换货}
          </Button>


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
  queryString3: PropTypes.shape(),   // 历史
};
export default SingleRow;
