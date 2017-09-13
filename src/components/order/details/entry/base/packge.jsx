import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { Card, Table, Button, Modal, Spin, Checkbox, Popover, Radio, message } from 'antd';
import assign from 'object-assign';
import style from '../style.css';
import { backGoodsDates, commit, operateReturn, partSend, preSendAction, examine } from '../action';

// TODO: lan
const BG = Button.Group;
const RG = Radio.Group;
const lan = {
  noPackge: '未形成包裹商品',
  packge: '包裹',
  refundGoods: '退货商品',
  refund: '退款商品',
  yipinkong: '已品控',
  pinkong: '品控',
  shenhe: ' 已审核',
  huihuo: ' 回货日期',
  goodsStatus: '商品状态',
  img: '图片',
  code: '型号',
  sale: '销售价',
  discount: '折后价',
  qudao: '发货渠道',
  huohao: '发货号',
  tuibuo: '退货',
  youxianfahuo: '优先发货',
  quxiaoyouxianfahuo: '取消优先发货',
  bufenfa: '部分发',
  shenhedingdan: '审核订单',
  save: '确定',
  cancel: '取消',
  guangzhou: '广州',
  xibu: '西部',
};
const cardStyle = { marginBottom: '20px', maxWidth: '1200px' };
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
  5: { bg: 'rgba(255,45,138,0.2)', border: 'rgba(255,45,138,1)' },
  7: { bg: 'rgba(255,45,138,1)', border: 'none' },
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
      backgroundColor: circle.bg,
      border: `2px solid ${circle.border}`,
    }}
  />
);
const Packge = (
  {
    dataSource: { base: { order_goods_info, button_list } },
    orderId,
    dispatch,
    backReturnDate,
    billno,
    chooseGoods,
    warehouseShow,
    warehouse,
    partSendBtn,
    preSend,
  },
  ) => {
  const {
    not_packaged_goods_list, package_list, returned_goods_list, refund_goods_list,
  } = order_goods_info;
  const {
    show_refund_button, show_priority_shipped_button,
    show_part_shipped_button, show_review_order_button,
  } = button_list;
  const col = show => ([
    show ?
      null :
    {
      title: lan.goodsStatus,
      dataIndex: 'status',
      render: (d, rec) => (
        <div >
          {
            colorCirle(colors[rec.status_code])
          }
          <span>{d}</span>
          <Link
            to={
              rec.is_assessed ?
                '/order/details/goods-control/edit/'
                :
                '/order/details/goods-control/list/'
            }
            query={{ data: JSON.stringify(assign({}, rec, {
              order_id: orderId, billno,
            })) }}
            style={{ marginLeft: '10px' }}
          >
            { rec.is_assessed ? lan.yipinkong : lan.pinkong}
          </Link>
          {
              Number(rec.status_code) === 11 &&
              <Button
                style={{ marginLeft: '10px' }}
                onClick={() => dispatch(backGoodsDates({
                  order_goods_id: Number(rec.id),
                  goods_sn: rec.sku,
                  goods_attr: rec.attr,
                  order_id: orderId,
                }))}
              >
                {lan.huihuo}
              </Button>
            }
        </div>
        ),
    },
    {
      title: lan.img,
      dataIndex: 'pic',
      render: (d, rec) => (
        <span style={{ display: 'flex', alignItems: 'center' }}>
          <Checkbox
            onChange={(e) => {
              const value = e.target.checked;
              if (value) {
                return dispatch(commit('chooseGoods', [...chooseGoods, rec.id]));
              }
              return dispatch(commit('chooseGoods', chooseGoods.filter(v => v !== rec.id)));
            }}
          />
          <span>{rec.serial_number}</span>
          <img alt="pic" src={d} width="50px" height="50px" style={{ margin: '0 10px' }} />
          {
            show &&
            <Link
              to="/order/details/goods-control/"
              query={{ data: JSON.stringify(assign({}, rec, {
                order_id: orderId, billno,
              })) }}
            >
              { rec.is_assessed ? lan.yipinkong : lan.pinkong}
            </Link>
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
      render: d => (<span>{d.amount_with_symbol}</span>),
    },
    {
      title: `${lan.discount}($)`,
      dataIndex: 'discount_price',
      render: d => (<span>{d.amount_with_symbol}</span>),
    },
  ].filter(res => res));
  return (
    <div>
      <div style={{ margin: '20px 20px' }}>
        <BG>
          {
            !!show_refund_button &&
            <Button onClick={() => dispatch(operateReturn(orderId, chooseGoods.join(',')))}>
              {lan.tuibuo}
            </Button>
          }
          {
            !!show_part_shipped_button &&
            <Popover
              content={
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (warehouse < 1) {
                      return message.waring(lan.needWarehouse);
                    }
                    return dispatch(partSend([Number(orderId)], warehouse));
                  }}
                >
                  <RG onChange={e => dispatch(commit('warehouse', Number(e.target.value)))}>
                    <Radio value={1}>{lan.guangzhou}</Radio>
                    <Radio value={10}>{lan.xibu}</Radio>
                  </RG>
                  <Button htmlType="submit" type="primary">{lan.save}</Button>
                  <Button onClick={() => dispatch(commit('warehouseShow', false))}>{lan.cancel}</Button>
                </form>
              }
              title={lan.upEmail}
              trigger="click"
              visible={warehouseShow}
              onVisibleChange={d => dispatch(commit('warehouseShow', d))}
            >
              <Button disabled={partSendBtn}>{lan.bufenfa}</Button>
            </Popover>
          }
          {
            !!show_priority_shipped_button &&
            <Button
              onClick={() => dispatch(preSendAction(Number(orderId), preSend))}
            >
              {preSend ? lan.quxiaoyouxianfahuo : lan.youxianfahuo}
            </Button>
          }
          {
            !!show_review_order_button &&
            <Button onClick={() => dispatch(examine(orderId))}>{lan.shenhedingdan}</Button>
          }
        </BG>
      </div>
      <Card title={lan.noPackge} style={cardStyle}>
        <Table
          size="small"
          pagination={false}
          dataSource={not_packaged_goods_list}
          columns={col()}
        />
      </Card>
      {
        package_list.map(v => (
          <Card title={`${lan.packge}:${v.package_number}`} key={v.package_number} style={cardStyle}>
            <div style={{ float: 'left', width: '20%' }}>
              <div>
                {
                  colorCirle(colors[v.package_goods_list[0].status_code])
                }
                <span>{v.package_status}</span>
              </div>
              <div>
                <span className={style.spanWidth}>{lan.qudao}: </span>
                <span>{v.delivery_channel}</span>
              </div>
              <div>
                <span className={style.spanWidth}>{lan.huohao}: </span>
                <span>{v.delivery_number}</span>
              </div>
            </div>
            <Table
              size="small"
              pagination={false}
              dataSource={v.package_goods_list}
              rowKey={'id'}
              columns={col('show')}
            />
          </Card>
        ))
      }
      <Card title={lan.refundGoods} style={cardStyle}>
        <Table
          size="small"
          pagination={false}
          dataSource={returned_goods_list}
          columns={col()}
        />
      </Card>
      <Card title={lan.refund} style={cardStyle}>
        <Table
          size="small"
          pagination={false}
          dataSource={refund_goods_list}
          columns={col()}
        />
      </Card>
      <Modal
        visible={backReturnDate.show}
        onCancel={() => dispatch(commit('backReturnDate', assign({}, backReturnDate, { show: false })))}
        onOk={() => dispatch(commit('backReturnDate', assign({}, backReturnDate, { show: false })))}
      >
        {
          backReturnDate.ready ?
            <Spin /> :
            <div>
              {
                backReturnDate.return_status < 2 ?
                  <div>
                    <div>
                      <span>{backReturnDate.return_status_name}</span>
                    </div>
                    <div>
                      <span>{backReturnDate.shelve_name}</span>
                      <span>{backReturnDate.shelve_number}</span>
                    </div>
                  </div>
                  :
                  <div>
                    <div>
                      <span>{backReturnDate.return_status_name}</span>
                    </div>
                    <div>
                      <span>{backReturnDate.return_date_name}</span>
                      <span>{backReturnDate.return_date}</span>
                    </div>
                  </div>
              }
            </div>
        }
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
  warehouse: PropTypes.number,
  preSend: PropTypes.number,
  chooseGoods: PropTypes.arrayOf(PropTypes.string),
};
export default Packge;
