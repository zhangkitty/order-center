import React from 'react';
import PropTypes from 'prop-types';
import { Table, Checkbox, Button, Input, Icon, Popover, message, Popconfirm, Spin } from 'antd';
import { Link, hashHistory } from 'react-router';
import assign from 'object-assign';
import {
  change, commit, remarkShow, openModal, searchHistory,
  logisticsRemark, logisticsRemarkSave, operationGoods,
  openModalCgs, cancelRisk, cancelTroubleTag, markTag, delChange,
} from './action';

import Styles from './style.css';

// 订单状态
// '1' => '已付款',
//  '5' => '需要退款',
//  '7' => '已经退款'
// '11' => '已审核',
//  '12' => '无货',
//  '13' => '备货中',
//  '16' => '发货',
//  '20' =>'换货',
//  '23' => '等待出仓',
//  '28' => '无货审核',
//  '49' => '等待发货',
//  '52' => '发货中',
//  '54' => 'COD已签收',
//  '57' => '海外发货',（无对应翻译）
// '74' => '删除换货',
//  '75' => 'COD客服取消',
//  '76' => 'COD派件异常',
//  '77' => 'COD已拒收',
//  '82' => 'COD用户取消',
//  '84' => '有货',
//  '90' => 'COD派件中',
//  '91' => 'COD已报损',
//  '94' => 'COD客户自提',
//  '95' => '已申请退货'
// '96' => '退货'

const colors = {
  1: { bg: '#5AE0ED', border: 'none' },
  2: { bg: '#0A8FE5', border: 'none' },
  3: { bg: '#ffffff', border: '#0A8FE5' },
  4: { bg: '#ffffff', border: '#8C00FF' },
  5: { bg: 'rgba(255,45,138,0.2)', border: 'rgba(255,45,138,1)' },
  6: { bg: '#FFD5DF19', border: 'none' },
  7: { bg: 'rgba(255,45,138,1)', border: 'none' },
  8: { bg: '#FA4405', border: 'none' },
  9: { bg: '#FF9D00', border: 'none' },
  10: { bg: '#00712A', border: 'none' },
  11: { bg: 'rgba(10,143,229,1)', border: 'none' },
  12: { bg: 'none', border: 'rgba(204,204,204,1)' },
  13: { bg: 'none', border: 'rgba(224,16,208,1)' },
  16: { bg: 'rgba(140,0,255,1)', border: 'none' },
  20: { bg: 'rgba(159,78,114,1)', border: 'none' },
  23: { bg: 'rgba(22,0,131,0.5)', border: 'none' },
  28: { bg: 'none', border: '#E010D0' },
  49: { bg: 'rgba(140,0,255,0.3)', border: 'none' },
  52: { bg: 'rgba(140,0,255,0.2)', border: 'rgba(140,0,255,1)' },
  54: { bg: 'black', border: 'none' }, // no ui
  57: { bg: 'rgba(248,231,28,1)', border: 'rgba(140,0,255,1)' },
  74: { bg: 'black', border: 'none' }, // no ui
  75: { bg: 'rgba(248,231,28,1)', border: 'none' },
  76: { bg: 'black', border: 'none' }, // no ui
  77: { bg: 'black', border: 'none' }, // no ui
  82: { bg: 'black', border: 'none' }, // no ui
  84: { bg: 'rgba(173,139,139,1)', border: 'none' },
  90: { bg: 'rgba(177,0,22,0.2)', border: 'rgba(177,0,22,1)' },
  91: { bg: 'black', border: 'none' }, // no ui
  94: { bg: 'black', border: 'none' }, // no ui
  95: { bg: 'black', border: 'none' }, // no ui
  96: { bg: 'black', border: 'none' }, // no ui
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
      border: `2px solid ${circle.border}` || 'none',
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
  1: true,
  11: true,
  13: true,
  12: true,
  23: true,
  16: true,
  20: true,
  28: true,
  49: true,
  84: true,
  96: true,
};
// 不能选择商品的条件
const checkboxChecked = {
  5: true,
  7: true,
  75: true,
  94: true,
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
    queryString3,
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
            onClick={() =>
              dispatch(change('batchChooseGoods', data.order_goods.filter(v => !checkboxChecked[v.goods_status]).map(v => v.order_goods_id)))
            }
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
          <span>{__('common.total')}{data.usd_price} </span>
          <span> {data.currency_price}</span>
        </div>
      </div>
      <div className={Styles.orderTable}>
        <Table
          rowKey="order_goods_id"
          rowSelection={{
            type: 'checkbox',
            selectedRowKeys: batchChooseGoods,
            getCheckboxProps: rec => ({
              disabled: !!checkboxChecked[rec.goods_status],
            }),
            onChange: t =>
              dispatch(change('batchChooseGoods', t)),
          }}
          pagination={false}
          showHeader={false}
          dataSource={data.order_goods}
          columns={[{
            title: '订单商品编号',
            dataIndex: 'order_goods_sort',
            width: '80px',
          }, {
            title: '商品图片',
            dataIndex: 'order_goods_img',
            width: '100px',
            render: d => (<img src={d} width="50px" height="50px" alt="goods images" />),
          }, {
            title: '商品属性',
            dataIndex: 'goods_sn',
            render: (d, res) => (
              <div>
                <a href={res.goods_url} target="_blank"> {d}</a>
                <span style={{ color: '#ff0000', marginLeft: '10px' }}>
                  {
                    replaceGoods(res.is_replace, res.replace_goods_sort) // res.goods_status
                  }
                </span>
                <p> {res.goods_attr}</p>
              </div>
            ),
          }, {
            title: '价格',
            dataIndex: 'price',
            width: '15%',
            render: (d, res) => (<div style={{ textAlign: 'center' }}> ${d} <p style={{ color: '#f00' }}>(${res.coupon_price})</p></div>),
          }, {
            title: '退款单状态',
            dataIndex: 'refund_bill_status',
            width: '15%',
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
            width: '15%',
            render: rec => (
              <div className={Styles.buttonBorderBg} key={rec.order_goods_id}>
                {/* 操作查询 */}
                <Popover
                  placement="bottomRight"
                  trigger="click"
                  arrowPointAtCenter
                  content={
                    <Table
                      rowKey={fetchOperation.id}
                      dataSource={fetchOperation}
                      columns={columns} size="small"
                      pagination={false}
                      style={{ width: '400px', maxHeight: '300px', overflow: 'auto' }}
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
                      <span>{__('common.del_goods')}</span>
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
          <p>
            {colorCirle(colors[data.order_status])}
            {data.order_status_title}
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
                  <div>
                    <p>{__('common.TroubleCancel')}</p>
                    {
                      showRisk(data.is_trouble, data.cancelRiskDesc)
                    }
                  </div>
                }
                onConfirm={() => {
                  if (Number(data.is_trouble) > 0) {
                    dispatch(cancelTroubleTag(0, data.order_id)); // data.is_trouble,取消传0
                  }
                }}
                okText={__('common.submitName2')}
                cancelText={__('common.submitName3')}
              >
                <Button
                  className={Styles.haveRemark}
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
              : <Button
                onClick={() => {
                  if (!batchGoods || batchGoods.length < 1) {
                    return message.warning(__('common.sagaTitle24'));
                  }
                  // return hashHistory.push(`/order/goodsRefund/${data.order_id}/${batchGoods}`);
                  return window.open(`${location.origin}${location.pathname}#/order/goodsRefund/${data.order_id}/${batchGoods}`);
                }}
              >{__('common.order_operation2')}</Button>
          }

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
  queryString3: PropTypes.shape(),   // 历史
};
export default SingleRow;
