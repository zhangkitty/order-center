/**
 * Create by xvliuzhu on 2017/9/15
 * 订单详情 - packge
 * 未形成包裹，包裹，退货商品，退款商品 都是循环的
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import {
  Card,
  Table,
  Button,
  Modal,
  Spin,
  Checkbox,
  Popover,
  Radio,
  message,
  Input,
} from 'antd';
import assign from 'object-assign';
import style from '../style.css';
import {
  backGoodsDates, commit, operateReturn, partSend, preSendAction, examine,
  openModal, openModalCgs,
  remarkShow, remarkSave,
} from '../action';

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
};

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
  90: { bg: 'rgba(248,231,28,1)', border: 'rgba(140,0,255,1)' },
  91: { bg: '#ccc', border: 'none' },
  94: { bg: '#ccc', border: 'none' },
  126: { bg: '#ccc', border: 'none' },
  127: { bg: '#ccc', border: 'none' },
};

// 显示换货入口（商品状态）
const changshow = {
  1: true,  // 已付款
  11: true, // 已审核
  13: true, // 备货中
  84: true, // 有货
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
  visible, remarkModal, loadUpdata,
}) => {
  const {
    not_packaged_goods_list,
    package_list,
    returned_goods_list,
    refund_goods_list,
  } = order_goods_info;
  const {
    show_refund_button,
    show_priority_shipped_button,
    show_cancel_priority_shipped_button,
    show_part_shipped_button,
    show_review_order_button,
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
              disabled={[5, 7, 75, 82, 20, 74].indexOf(rec.status_code) > -1}
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
              width="50px"
              height="50px"
              style={{ margin: '0 10px' }}
            />
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

            {/* 换货 */}
            { // changshow[rec.goods_status] && Number(rec.is_replace) !== 2 ?
              changshow[rec.goods_status] ?
                <span
                  onClick={() => {
                    dispatch(openModalCgs(rec.order_goods_id, orderId, basic_info.site_from));
                  }
                  }
                  role="button" tabIndex={0}
                >
                  {__('common.change_goods')}
                </span>
                : null
            }
          </span>
        ),
      },
      {
        title: lan.sku,
        dataIndex: 'sku',
      },
      {
        title: lan.code,
        dataIndex: 'attr',
      },
      {
        title: `${lan.sale}($)`,
        dataIndex: 'sale_price',
        render: d => <span>{d.amount_with_symbol}</span>,
      },
      {
        title: `${lan.discount}($)`,
        dataIndex: 'discount_price',
        render: d => <span>{d.amount_with_symbol}</span>,
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
            {!!show_priority_shipped_button && ( // 优先发货按钮
              <Button
                onClick={() => {
                  dispatch(commit('preSend', preSend)); // 0
                  dispatch(
                    preSendAction(Number(orderId), preSend, billno, activeKey),
                  ); // preSend
                }}
              >
                {lan.youxianfahuo}
              </Button>
            )}
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
        {status_code && status_code <= 7 ? (
          <Button
            onClick={() => {
              if (!chooseGoods.length) { return message.warning(__('common.sagaTitle24')); }
              return window.open(
                `${location.origin}${location.pathname}#/order/goodsRefund/${orderId}/${chooseGoods.join(
                  ',',
                )}`,
              );
            }}
            style={{ marginLeft: 20 }}
          >
            {__('common.order_operation2')}
          </Button>
        ) : null}

        {/*  备注 */}
        <Popover
          placement="bottom"
          trigger="click"
          arrowPointAtCenter
          content={
            <div className={style.tableFloat}>
              <Table
                dataSource={fetchRemark}
                columns={columnsRemark} size="small"
                pagination={false}
                style={{ width: '500px', maxHeight: '400px', overflow: 'auto' }}
              />
              <Button // 新增备注
                style={{ margin: '10px' }}
                type="primary"
                onClick={() => dispatch(openModal(orderId))}
              >
                {__('common.order_operation6')}
              </Button>
            </div>
          }
        >
          {
            +basic_info.have_remark === 1 ?
              <Button
                className={style.haveRemark}
                onClick={() => dispatch(remarkShow(orderId))}
              >{__('common.order_operation4')}</Button>
             :
              <Button onClick={() => dispatch(remarkShow(orderId))}>{__('common.order_operation4')}</Button>
          }
        </Popover>

      </div>

      {/* 未形成包裹 */}
      {not_packaged_goods_list.length > 0 && (
        <Card title={lan.noPackge} className={style.cardBottom}>
          <Table
            size="small"
            pagination={false}
            dataSource={not_packaged_goods_list}
            columns={col()}
          />
        </Card>
      )}

      {/* 包裹 */}
      {package_list.length > 0 &&
        package_list.map(v => (
          <Card
            title={
              <div className={style.center}>
                <span
                  style={{ marginRight: 10 }}
                >{`${lan.packge}:${v.package_number}`}</span>
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
                      return f.id;
                    });
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
            key={v.package_number}
            className={style.cardBottom}
          >
            <div className={style.packgeContent}>
              <div className={style.packgeL}>
                <div>
                  {colorCirle(colors[v.package_goods_list[0].status_code])}
                  <span>{v.package_status}</span>
                </div>
                <div>
                  <span className={style.packgeWidth}>{lan.qudao}: </span>
                  <span>{v.delivery_channel}</span>
                </div>
                <div>
                  <span className={style.packgeWidth}>{lan.huohao}: </span>
                  <span>{v.delivery_number}</span>
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
                    return f.id;
                  });
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
  fetchRemark: PropTypes.arrayOf(PropTypes.shape()),
  visible: PropTypes.bool,
  remarkModal: PropTypes.shape(),
  loadUpdata: PropTypes.bool,
};
export default Packge;
