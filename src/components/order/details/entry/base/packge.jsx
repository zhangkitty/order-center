/**
 * Create by xvliuzhu on 2017/9/15
 * 订单详情 - packge
 * 未形成包裹，包裹，退货商品，退款商品 都是循环的
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import {
  Card, Table, Button, Modal, Spin, Checkbox, Popover, Radio, message, Input,
} from 'antd';
import assign from 'object-assign';
import style from '../style.css';
import {
  backGoodsDates, commit, operateReturn, partSend, preSendAction, examine,
  openModal, operationGoods,
  remarkShow, remarkSave,
  createQs, confirmReceived,
} from '../action';
import { change } from '../../../list/action';

const BG = Button.Group;
const RG = Radio.Group;
const lan = {
  noPackge: __('order.entry.goods_no_packge'),
  packge: __('order.entry.packge'),
  refundGoods: __('order.entry.return_goods'),
  refund: __('order.entry.refund_goods'),
  yipinkong: __('order.entry.quality_control_done'),
  pinkong: __('order.entry.quality_control'),
  shenhe: __('order.entry.examine_done'),
  huihuo: __('order.entry.back_goods_date'),
  goodsStatus: __('order.entry.goods_status'),
  img: __('order.entry.image'),
  sku: __('order.entry.sku'),
  code: __('order.entry.code'),
  sale: __('order.entry.sale_price'),
  discount: __('order.entry.discount_price'),
  qudao: __('order.entry.send_goods_channel'),
  huohao: __('order.entry.send_goods_number'),
  tuibuo: __('order.entry.goods_rejected'),
  youxianfahuo: __('order.entry.goods_send_first'),
  quxiaoyouxianfahuo: __('order.entry.goods_send_first_cancel'),
  bufenfa: __('order.entry.part_send'),
  shenhedingdan: __('order.entry.examine_order'),
  save: __('order.entry.confirm'),
  cancel: __('order.entry.cancel'),
  guangzhou: __('order.entry.Guangzhou'),
  xibu: __('order.entry.west'),
  fankui: __('order.entry.fankui'),
  fankuishow: __('order.entry.fankuishow'),
  chaifen: __('order.entry.chaifen'),
  yuanbaoguo: __('order.entry.yuanbaoguo'),
  querenshouhuo: __('order.entry.querenshouhuo'),
  运单号: '运单号',
  保存: '保存',
  必须勾选整个订单的全部商品: '必须勾选整个订单的全部商品',
  prepared_goods: __('order.entry.prepared_goods'),
  shipping_warehouse: __('order.entry.shipping_warehouse'),
  goods_name_id: __('order.entry.goods_name_id'),
  goods_name: __('order.entry.goods_name'),
  goods_id: __('order.entry.goods_id'),
};
const disableArr = [5, 7, 75, 82, 20, 74];

const warehouseStyle = { marginLeft: '10px' };

// 商品状态
//  '1' => '已付款',
//  '5' => '需要退款',
//  '7' => '已经退款'
//  '11' => '已审核',
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
//  '74' => '删除换货',
//  '75' => 'COD客服取消',
//  '76' => 'COD派件异常',
//  '77' => 'COD已拒收',
//  '82' => 'COD用户取消',
//  '84' => '有货',
//  '90' => 'COD派件中',
//  '91' => 'COD已报损',
//  '94' => 'COD客户自提',
//  '126' => '已申请退货'
//  '127' => '退货'

// 品控显示
const pingkongShow = {
  5: '需要退款',
  7: '已经退款',
  16: '发货',
  52: '发货中',
  57: '海外发货',
  54: 'COD已签收',
  126: '已申请退货',
  127: '退货',
};
// 不能选择商品的条件（商品状态=需要退款、已经退款、 COD客服取消、COD客户取消， 换货，删除换货）
const checkboxChecked = {
  5: true, // 需要退款
  20: true, // 换货
  7: true, // 已经退款
  74: true, // 删除换货
  75: true, // COD客服取消
  82: true, // COD用户取消"
};
//  商品状态前的标记
const colors = {
  1: { bg: '#5AE0ED', border: 'none' },
  5: { bg: 'rgba(255,45,138,0.20)', border: '2px solid #FF2D8A' },
  7: { bg: '#FF2D8A', border: 'none' },
  11: { bg: '#0A8FE5', border: 'none' },
  12: { bg: '#ccc', border: '2px solid #CCCCCC' },
  13: { bg: 'rgba(224,16,208,0.20)', border: '2px solid #E010D0' },
  16: { bg: '#8C00FF', border: 'none' },
  20: { bg: '#9F4E72', border: 'none' },
  23: { bg: 'rgba(22,0,131,0.50)', border: 'none' },
  28: { bg: '#ccc', border: '2px solid #E010D0' },
  49: { bg: 'rgba(140,0,255,0.30)', border: 'none' },
  52: { bg: 'rgba(140,0,255,0.20)', border: '2px solid #8C00FF' },
  54: { bg: '#ccc', border: 'none' },
  57: { bg: '#F8E71C', border: '2px solid #8C00FF' },
  74: { bg: 'rgba(159,78,114,1)', border: 'none' },
  75: { bg: '#AD8B8B', border: 'none' },
  76: { bg: '#ccc', border: 'none' },
  77: { bg: '#ccc', border: 'none' },
  82: { bg: '#ccc', border: 'none' },
  84: { bg: 'rgba(177,0,22,0.20)', border: '2px solid #B10016' },
  85: { bg: 'rgba(177,0,22,0.20)', border: '2px solid #B10016' },
  86: { bg: 'rgba(177,0,22,0.20)', border: '2px solid #B10016' },
  87: { bg: 'rgba(177,0,22,0.20)', border: '2px solid #B10016' },
  90: { bg: 'rgba(248,231,28,1)', border: 'rgba(140,0,255,1)' },
  91: { bg: '#ccc', border: 'none' },
  94: { bg: '#ccc', border: 'none' },
  126: { bg: '#ccc', border: 'none' },
  127: { bg: '#F8E71C' },
  130: { bg: 'rgba(177,0,22,0.20)', border: '2px solid #B10016' },
};

// 显示换货标记
const replaceGoods = (source, d) => {
  const obj = {
    0: '',
    1: __('common.change1'),
    2: `(${d}${__('common.change2')})`,
    3: `(${__('common.del_goods')})`,
  };
  return obj[source];
};
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

//  改变状态,如果有非报损或者拒收,对应的不需要全选
function changeObj(list, obj) {
  const obj1 = assign({}, obj);
  for (let [i, len] = [0, list.length]; i < len; i += 1) {
    if (disableArr.indexOf(list[i].status_code) > -1) continue;
    if (list[i].status_code !== 77 && list[i].status_code !== 91) {
      obj1.isAll = false;
      break;
    }
    obj1.len += 1;
    if (!obj1.isAll) return obj1;
  }
  return obj1;
}
//  获取是否需要全选
function getAllObj(goodInfo) {
  const {
    not_packaged_goods_list,
    package_list,
    returned_goods_list,
    refund_goods_list,
  } = goodInfo;
  let obj = {
    isAll: true,
    len: 0,
  };
  if (not_packaged_goods_list.length > 0) {
    obj = changeObj(not_packaged_goods_list, obj);
    if (!obj.isAll) return obj;
  }
  if (package_list.length > 0) {
    for (let [i, len] = [0, package_list.length]; i < len; i += 1) {
      obj = changeObj(package_list[i].package_goods_list, obj);
      if (!obj.isAll) return obj;
    }
  }
  if (returned_goods_list.length > 0) {
    obj = changeObj(returned_goods_list, obj);
    if (!obj.isAll) return obj;
  }
  if (refund_goods_list.length > 0) {
    obj = changeObj(refund_goods_list, obj);
    if (!obj.isAll) return obj;
  }
  if (obj.len === 0) obj.isAll = false;
  return obj;
}

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
const btnStyle = { 'margin-left': '20px' };
const Packge = ({
  dataSource: { base: { order_goods_info, button_list, order_info } },
  orderId,
  dispatch,
  backReturnDate,
  billno,
  chooseGoods,
  warehouseShow,
  warehouse,
  partSendBtn,
  preSend,
  activeKey,
  fetchRemark,
  fetchOperation,
  visible, remarkModal, loadUpdata,
  trackTroubleLoad, trackTroubleTypes, trackTroubleForm,
}) => {
  const {
    not_packaged_goods_list,
    package_list,
    returned_goods_list,
    refund_goods_list,
    new_not_packaged_goods_list,
  } = order_goods_info;
  const {
    show_refund_button,
    show_priority_shipped_button,
    show_cancel_priority_shipped_button,
    show_part_shipped_button,
    show_review_order_button,
    show_confirm_received_button,
  } = button_list;
  const { basic_info: { status_code } } = order_info;
  const { basic_info } = order_info;
  // 判断 商品状态 是否显示（循环）
  const col = show =>
    [
      show
        ? null
        : {
          title: lan.goodsStatus,
          dataIndex: 'status',
          render: (d, rec) => (
            <div>
              {colorCirle(colors[rec.status_code])}
              <span>{d}</span>
              {rec.storage_type && <span style={{ marginLeft: '8px' }}> ({rec.storage_type})</span> }{/* 退货入库类型， 退货商品/退款商品 才有这个值 */}
              {pingkongShow[rec.status_code] ? (
                <Link
                  to={
                      rec.is_assessed
                        ? '/order/details/goods-control/edit/' // 已品控
                        : '/order/details/goods-control/list/' // 品控
                    }
                  query={{
                    data: JSON.stringify(
                        assign({}, rec, {
                          order_id: orderId,
                          billno,
                        }),
                      ),
                  }}
                  style={{ marginLeft: '10px' }}
                >
                  {rec.is_assessed ? lan.yipinkong : lan.pinkong}
                </Link>
                ) : null}
              { // 原发货包裹号
                rec.package_number && <span style={{ marginLeft: '10px' }}>{`${lan.yuanbaoguo}`}: <span style={{ fontWeight: 'bold', fontSize: '14px' }}>{rec.package_number}</span></span>
              }
              {/*  回货日期 按钮 */}
              {Number(rec.status_code) === 11 && (
              <Button
                style={{ marginLeft: '10px' }}
                onClick={() =>
                      dispatch(
                        backGoodsDates({
                          order_goods_id: Number(rec.id),
                          goods_sn: rec.sku,
                          goods_attr: rec.attr,
                          order_id: orderId,
                        }),
                      )}
              >
                {lan.huihuo}
              </Button>
                )}
            </div>
            ),
        },
      {
        title: lan.img,
        dataIndex: 'pic',
        render: (d, rec) => (
          <span className={style.packeFlex}>
            <Checkbox
              disabled={disableArr.indexOf(rec.status_code) > -1}
              checked={chooseGoods.indexOf(rec.id) > -1}
              onChange={(e) => {
                const value = e.target.checked;
                if (value) {
                  return dispatch(
                    commit('chooseGoods', [...chooseGoods, rec.id]),
                  );
                }
                return dispatch(
                  commit('chooseGoods', chooseGoods.filter(v => v !== rec.id)),
                );
              }}
            />
            <span style={{ width: '50px', display: 'inline-block' }}>
              {rec.serial_number}
            </span>
            <img
              alt="pic"
              src={d}
              width="65px"
              height="65px"
              style={{ margin: '0 10px' }}
            />
            <div className={style.buttonBorderBg}>
              {show && pingkongShow[rec.status_code] ? (
                <Link
                  to={
                    rec.is_assessed
                      ? '/order/details/goods-control/edit/' // 已品控
                      : '/order/details/goods-control/list/' // 品控
                  }
                  query={{
                    data: JSON.stringify(
                      assign({}, rec, {
                        order_id: orderId,
                        billno,
                      }),
                    ),
                  }}
                >
                  {rec.is_assessed ? lan.yipinkong : lan.pinkong}
                </Link>
              ) : null}

              {/* 操作查询 */}
              <Popover
                placement="bottomRight"
                trigger="click"
                arrowPointAtCenter
                content={
                  <Table
                    className={style.operatingTable}
                    rowKey={fetchOperation.id}
                    dataSource={fetchOperation}
                    columns={columns} size="small"
                    pagination={false}
                  />
                }
              >
                <span
                  onClick={() => dispatch(operationGoods(rec.id))}
                  role="button" tabIndex={0}
                >
                  {__('common.operation')}
                </span>
              </Popover>

              {/* 换货 */}
              <span style={{ color: '#ff0000' }}>
                {
                  replaceGoods(rec.is_replace, rec.replace_goods_sort) // res.goods_status
                }
              </span>
            </div>
          </span>
        ),
      },
      {
        title: lan.goods_name_id,
        dataIndex: 'goods',
        render: (d, res) => (
          <div>
            <div>{`${lan.goods_name}: ${res.goods_name}`}</div>
            <div>{`${lan.goods_id}: ${res.id}`}</div>
          </div>
        ),
      },
      {
        title: lan.sku,
        dataIndex: 'sku',
        render: (d, rec) => (
          <span>
            {d}
            {!!rec.is_split && <span style={{ color: 'red', marginLeft: '10px' }}>{lan.chaifen}</span>}
          </span>
        ),
      },
      {
        title: lan.code,
        dataIndex: 'attr',
      },
      {
        title: __('order.entry.price'),
        dataIndex: 'mkc_retail_usd_price',
        render: (d, res) => (
          +res.is_show_mck === 0 ?
            null
            : <div>
              <div>${d}</div>
              <div style={{ color: '#f00' }}>({res.currency_code}{res.mkc_pay_price})</div>
            </div>
        ),
      },
      {
        title: `${lan.sale}`,
        dataIndex: 'sale_price',
        render: (d, res) => (
          <div>
            <div>{d.amount_with_symbol}</div>
            <div style={{ color: '#f00' }}>({res.currency_code}{res.currency_price})</div>
          </div>
        ),
      },
      {
        title: `${lan.discount}`,
        dataIndex: 'discount_price',
        render: (d, res) => (
          <div>
            <div>{d.amount_with_symbol}</div>
            <div style={{ color: '#f00' }}>({res.currency_code}{res.currency_avg_price})</div>
          </div>
        ),
      },
    ].filter(res => res);
  return (
    <div>
      {/* 按钮 */}
      <div style={{ margin: '0 20px 20px' }}>
        {!show_refund_button &&
        !show_part_shipped_button &&
        !show_priority_shipped_button &&
        !show_cancel_priority_shipped_button &&
        !show_review_order_button ? null : (
          <BG>
            {!!show_refund_button && ( // 退货按钮
              <Button
                onClick={() => {
                  if (chooseGoods.length) {
                    return dispatch(
                      operateReturn(orderId, chooseGoods.join(',')),
                    );
                  }
                  return message.warning(__('common.sagaTitle24'));
                }}
              >
                {lan.tuibuo}
              </Button>
            )}
            {!!show_part_shipped_button && ( // 部分发货按钮
              <Popover
                placement="topLeft"
                content={
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (warehouse < 1) {
                        return message.waring(lan.needWarehouse);
                      }
                      return dispatch(partSend(orderId, warehouse));
                    }}
                  >
                    <RG
                      onChange={e =>
                        dispatch(commit('warehouse', Number(e.target.value)))}
                    >
                      <Radio value={1}>{lan.guangzhou}</Radio>
                      <Radio value={10}>{lan.xibu}</Radio>
                      <Radio value={20}>{__('common.nansha')}</Radio>
                      <Radio value={8}>{__('common.america')}</Radio>
                      <Radio value={9}>{__('common.europe')}</Radio>
                    </RG>
                    <Button htmlType="submit" type="primary">
                      {lan.save}
                    </Button>
                    <Button
                      onClick={() => dispatch(commit('warehouseShow', false))}
                    >
                      {lan.cancel}
                    </Button>
                  </form>
                }
                title={lan.upEmail}
                trigger="click"
                visible={warehouseShow}
                onVisibleChange={d => dispatch(commit('warehouseShow', d))}
              >
                <Button disabled={partSendBtn}>{lan.bufenfa}</Button>
              </Popover>
            )}
            {/* {!!show_priority_shipped_button && ( // 优先发货按钮 */}
            {/* <Button */}
            {/* onClick={() => { */}
            {/* dispatch(commit('preSend', preSend)); // 0 */}
            {/* dispatch( */}
            {/* preSendAction(Number(orderId), preSend, billno, activeKey), */}
            {/* ); // preSend */}
            {/* }} */}
            {/* > */}
            {/* {lan.youxianfahuo} */}
            {/* </Button> */}
            {/* )} */}
            {!!show_cancel_priority_shipped_button && ( // 取消优先发货按钮
            <Button
              onClick={() => {
                dispatch(commit('preSend', +!preSend)); // 1
                dispatch(
             preSendAction(Number(orderId), 1, billno, activeKey),
             ); // preSend
              }}
            >
              {lan.quxiaoyouxianfahuo}
            </Button>
             )}
            {!!show_review_order_button && ( // 审核订单按钮
              <Button onClick={() => dispatch(examine(orderId))}>
                {lan.shenhedingdan}
              </Button>
            )}
          </BG>
        )}
        {/* 退款/取消  */}
        {status_code && status_code <= 9 ? (
          <Button
            onClick={() => {
              if (!chooseGoods.length) { return message.warning(__('common.sagaTitle24')); }
              if ((status_code === 8 || status_code === 9)) {
                const allObj = getAllObj(order_goods_info);
                if (allObj.isAll && allObj.len !== chooseGoods.length) {
                  return message.warning(lan.必须勾选整个订单的全部商品);
                }
              }
              return window.open(
                `${location.origin}${location.pathname}#/order/goodsRefund/${orderId}/${chooseGoods.join(
                  ',',
                )}`,
              );
            }}
            style={btnStyle}
          >
            {__('common.order_operation2')}
          </Button>
        ) : null}
        {/* 确认收货 */}
        {
          !!show_confirm_received_button && (
            <Button
              style={btnStyle}
              onClick={() => dispatch(confirmReceived(package_list[0].delivery_number, Number(orderId), billno, activeKey))}
            >
              {lan.querenshouhuo}
            </Button>
         )
        }
        {/*  备注 */}
        <Popover
          placement="bottom"
          trigger="click"
          arrowPointAtCenter
          content={
            <div className={style.tableFloat}>
              <Table
                dataSource={fetchRemark}
                columns={columnsRemark}
                size="small"
                pagination={false}
                style={{ width: '500px', maxHeight: '400px', overflow: 'auto' }}
              />
              <div style={{ margin: '30px 50px 15px' }}>
                <div>
                  <div style={{ textAlign: 'left' }} />
                  <Input.TextArea
                    style={{ margin: '10px auto' }}
                    rows={3}
                    value={remarkModal.remark}
                    onChange={e => dispatch(commit('remarkModal', assign({}, remarkModal, { remark: e.target.value })))}
                  />
                </div>
                <Button
                  key="submit"
                  type="primary"
                  onClick={() => {
                    if (remarkModal.remark.trim().length === 0) {
                      return message.warning(__('common.order_operation9'));
                    }
                    return dispatch(remarkSave(orderId, remarkModal.remark));
                  }}
                  style={btnStyle}
                >
                  {lan.保存}
                </Button>
              </div>
            </div>
          }
        >
          {
            +basic_info.have_remark === 1 ?
              <Button
                style={btnStyle}
                className={style.haveRemark}
                onClick={() => dispatch(remarkShow(orderId))}
              >{__('common.order_operation4')}</Button>
             :
              <Button style={btnStyle} onClick={() => dispatch(remarkShow(orderId))}>{__('common.order_operation4')}</Button>
          }
        </Popover>

      </div>

      {/* 未形成包裹 */}
      {not_packaged_goods_list.length > 0 && (
        <Card
          title={
            <div className={style.center}>
              <span
                style={{ marginRight: 10 }}
              >
                {lan.noPackge}
              </span>
              <Button
                className={style.orderSelect}
                size="small"
                onClick={() => {
                  const temp = [];
                  const arr = not_packaged_goods_list.map((f) => {
                    const index = chooseGoods.findIndex(d => d === f.id);
                    if (index > -1) {
                      temp.push(chooseGoods[index]);
                      chooseGoods = [
                        ...chooseGoods.slice(0, index),
                        ...chooseGoods.slice(index + 1),
                      ];
                    }
                    return f;
                  }).filter(v => !checkboxChecked[v.status_code]).map(v => v.id);
                  if (arr.length === temp.length) {
                    return dispatch(commit('chooseGoods', chooseGoods));
                  }
                  return dispatch(
                    commit('chooseGoods', [
                      ...new Set(chooseGoods.concat(arr)),
                    ]),
                  );
                }}
              >
                {__('common.allChoose')}
              </Button>
            </div>
          }
          className={style.cardBottom}
        >
          <Table
            size="small"
            pagination={false}
            dataSource={not_packaged_goods_list}
            columns={col()}
          />
        </Card>
      )}
      {/* 已备货 */}
      {new_not_packaged_goods_list.length > 0 &&
      new_not_packaged_goods_list.map(v => (
        <Card
          title={
            <div className={style.center}>
              <span
                style={{ marginRight: 10 }}
              >
                {`${lan.prepared_goods}`}
              </span>
              <Button
                className={style.orderSelect}
                size="small"
                onClick={() => {
                  const temp = [];
                  const arr = v.good_list.map((f) => {
                    const index = chooseGoods.findIndex(d => d === f.id);
                    if (index > -1) {
                      temp.push(chooseGoods[index]);
                      chooseGoods = [...chooseGoods.slice(0, index),
                        ...chooseGoods.slice(index + 1),
                      ];
                    }
                    return f;
                  }).filter(d => !checkboxChecked[d.status_code]).map(d => d.id);
                  if (arr.length === temp.length) {
                    return dispatch(commit('chooseGoods', chooseGoods));
                  }
                  return dispatch(
                    commit('chooseGoods', [
                      ...new Set(chooseGoods.concat(arr)),
                    ]),
                  );
                }}
              >{__('common.allChoose')}
              </Button>
            </div>
          }
          key={v.inventory_lock}
          className={style.cardBottom}
        >
          <div className={style.packgeContent}>
            <div className={style.packgeL}>
              <div>
                {colorCirle(colors[13])}
                <span>{__('common.stocking')}:</span>
                <span style={warehouseStyle}>{v.inventory_name}</span>
              </div>
            </div>
            <Table
              style={{ width: '100%' }}
              size="small"
              pagination={false}
              dataSource={v.good_list}
              rowKey={'id'}
              columns={col('show')}
            />
          </div>
        </Card>
      ))}
      {/* 包裹 */}
      {package_list.length > 0 &&
        package_list.map((v, index) => (
          <Card
            title={
              <div className={style.center}>
                <span
                  style={{ marginRight: 10 }}
                >
                  {`${lan.packge}`}
                  <span style={{ color: 'red' }}>
                   ({ index + 1 }/{package_list.length })
                  </span>
                :{v.package_number}
                </span>

                <span style={{ color: 'red', marginRight: '10px' }}>
                  ({v.package_goods_list.length}件)
                </span>
                {/* 全选按钮 */}
                <Button
                  className={style.orderSelect}
                  size="small"
                  onClick={() => {
                    const temp = [];
                    const arr = v.package_goods_list.map((f) => {
                      const index = chooseGoods.findIndex(d => d === f.id);
                      if (index > -1) {
                        temp.push(chooseGoods[index]);
                        chooseGoods = [
                          ...chooseGoods.slice(0, index),
                          ...chooseGoods.slice(index + 1),
                        ];
                      }
                      return f;
                    }).filter(d => !checkboxChecked[d.status_code]).map(d => d.id);
                    if (arr.length === temp.length) {
                      return dispatch(commit('chooseGoods', chooseGoods));
                    }
                    return dispatch(
                      commit('chooseGoods', [
                        ...new Set(chooseGoods.concat(arr)),
                      ]),
                    );
                  }}
                >
                  {__('common.allChoose')}
                </Button>
                {/* 物流问题反馈 等于1 显示 */}
                {
                  !!v.show_troubles_publish_button &&
                  <Button
                    className={style.btnSpace}
                    size="small"
                    onClick={() => {
                      if (trackTroubleTypes.length) {
                        dispatch(commit('trackTroubleForm', { reference_number: v.package_number }));
                        return dispatch(commit('trackTroubleShow', true));
                      }
                      return dispatch(createQs(v.package_number));
                    }}
                    loading={trackTroubleLoad}
                  >
                    {lan.fankui}
                  </Button>
                }

                {/* 查看物流问题  等于1 显示 */}
                {
                  !!v.show_troubles_list_link &&
                  <Link to={`/trackTroubles/list/${v.package_number}`}>
                    {lan.fankuishow}
                  </Link>
                }
              </div>
            }
            key={v.package_number}
            className={style.cardBottom}
          >
            <div className={style.packgeContent}>
              <div className={style.packgeL}>
                <div>
                  {colorCirle(colors[v.package_goods_list[0].status_code])}
                  <span>{v.package_status}</span>
                </div>
                {
                  v.delivery_time && <div>
                    <span className={style.packgeWidth}>{__('order.entry.delivery_time')}: </span>
                    <span>{v.delivery_time}</span>
                  </div>
                }
                <div>
                  <span className={style.packgeWidth}>{lan.qudao}: </span>
                  <span>{v.delivery_channel}</span>
                </div>
                <div>
                  <span className={style.packgeWidth}>{lan.huohao}: </span>
                  <span><Link to={`/order/details/track-details/${v.delivery_number}?p=${v.package_number}`} target="_blank">{v.delivery_number}</Link></span>
                </div>
                <div>
                  <span className={style.packgeWidth}>{lan.shipping_warehouse}: </span>
                  <span>{v.inventory_name}</span>
                </div>
              </div>
              <Table
                style={{ width: '100%' }}
                size="small"
                pagination={false}
                dataSource={v.package_goods_list}
                rowKey={'id'}
                columns={col('show')}
              />
            </div>
          </Card>
        ))}

      {/* 退货商品 */}
      {returned_goods_list.length > 0 && (
        <Card
          title={
            <div className={style.center}>
              <span style={{ marginRight: 10 }}>{lan.refundGoods}</span>
              <Button
                size="small"
                onClick={() => {
                  const temp = [];
                  const arr = returned_goods_list.map((f) => {
                    const index = chooseGoods.findIndex(d => d === f.id);
                    if (index > -1) {
                      temp.push(chooseGoods[index]);
                      chooseGoods = [
                        ...chooseGoods.slice(0, index),
                        ...chooseGoods.slice(index + 1),
                      ];
                    }
                    return f;
                  }).filter(v => !checkboxChecked[v.status_code]).map(v => v.id);
                  if (arr.length === temp.length) {
                    return dispatch(commit('chooseGoods', chooseGoods));
                  }
                  return dispatch(
                    commit('chooseGoods', [...new Set(chooseGoods.concat(arr))]),
                  );
                }}
              >
                {__('common.allChoose')}
              </Button>
            </div>
          }
          className={style.cardBottom}
        >
          <Table
            size="small"
            pagination={false}
            dataSource={returned_goods_list}
            columns={col()}
          />
        </Card>
      )}

      {/* 退款商品 */}
      {refund_goods_list.length > 0 && (
        <Card title={lan.refund} className={style.cardBottom}>
          <Table
            size="small"
            pagination={false}
            dataSource={refund_goods_list}
            columns={col()}
          />
        </Card>
      )}
      {/* Modal  */}
      <Modal
        visible={backReturnDate.show}
        onCancel={() =>
          dispatch(
            commit(
              'backReturnDate',
              assign({}, backReturnDate, { show: false }),
            ),
          )}
        onOk={() =>
          dispatch(
            commit(
              'backReturnDate',
              assign({}, backReturnDate, { show: false }),
            ),
          )}
      >
        {backReturnDate.ready ? (
          <Spin />
        ) : (
          <div>
            {backReturnDate.return_status < 2 ? (
              <div>
                <div>
                  <span>{backReturnDate.return_status_name}</span>
                </div>
                <div>
                  <span>{backReturnDate.shelve_name}</span>
                  <span>{backReturnDate.shelve_number}</span>
                </div>
              </div>
            ) : (
              <div>
                <div>
                  <span>{backReturnDate.return_status_name}</span>
                </div>
                <div>
                  <span>{backReturnDate.return_date_name}</span>
                  <span>{backReturnDate.return_date}</span>
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>
      {/* 备注提交 */}
      <Modal
        zIndex={1100}
        visible={visible}
        onCancel={() => dispatch(commit('visible', false))}
        footer={null}
      >
        <div style={{ margin: '30px 50px 15px' }}>
          <div>{__('common.order_operation6')}
            <Input.TextArea
              style={{ margin: '10px auto' }}
              rows={3}
              value={remarkModal.remark}
              onChange={e => dispatch(commit('remarkModal', assign({}, remarkModal, { remark: e.target.value })))}
            />
          </div>
          <Button
            key="submit"
            type="primary"
            loading={loadUpdata}
            onClick={() => {
              if (remarkModal.remark.trim().length === 0) {
                return message.warning(__('common.order_operation9'));
              }
              return dispatch(remarkSave(remarkModal.order_id, remarkModal.remark));
            }}
            style={{ marginRight: '20px' }}
          >
            {__('common.order_operation7')}
          </Button>
          <Button key="back" onClick={() => dispatch(commit('visible', false))}>
            {__('common.order_operation8')}
          </Button>
        </div>
      </Modal>
    </div>
  );
};
Packge.propTypes = {
  dataSource: PropTypes.shape(),
  warehouseShow: PropTypes.bool,
  partSendBtn: PropTypes.bool,
  orderId: PropTypes.string,
  dispatch: PropTypes.func,
  backReturnDate: PropTypes.shape(),
  billno: PropTypes.string,
  activeKey: PropTypes.string,
  warehouse: PropTypes.number,
  preSend: PropTypes.number,
  chooseGoods: PropTypes.arrayOf(PropTypes.string),
  fetchOperation: PropTypes.arrayOf(PropTypes.shape()),
  fetchRemark: PropTypes.arrayOf(PropTypes.shape()),
  visible: PropTypes.bool,
  remarkModal: PropTypes.shape(),
  loadUpdata: PropTypes.bool,
  trackTroubleLoad: PropTypes.bool,
  trackTroubleTypes: PropTypes.arrayOf(PropTypes.shape()),
  trackTroubleForm: PropTypes.shape(),
};
export default Packge;
