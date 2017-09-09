import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { Card, Table, Button, Modal, Spin, Checkbox, Popover, Radio, message } from 'antd';
import assign from 'object-assign';
import style from '../style.css';
import { backGoodsDates, commit, operateReturn, partSend } from '../action';

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
const cardStyle = { marginBottom: '20px' };
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
        <div>
          <span>圆圈</span>
          <span>{d}</span>
          <Link
            to="/order/details/goods-control/"
            query={{ data: JSON.stringify(assign({}, rec, {
              order_id: orderId, billno,
            })) }}
          >
            { rec.is_assessed ? lan.yipinkong : lan.pinkong}
          </Link>
          {
              Number(rec.status_code) === 11 &&
              <Button
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
        <span>
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
            <Button>{lan.youxianfahuo}</Button>
          }
          {
            !!show_review_order_button &&
            <Button>{lan.shenhedingdan}</Button>
          }
        </BG>
      </div>
      <Card title={lan.noPackge} style={cardStyle}>
        <Table
          size="small"
          pagination={false}
          dataSource={not_packaged_goods_list}
          columns={col(orderId, dispatch, billno)}
        />
      </Card>
      {
        package_list.map(v => (
          <Card title={`${lan.packge}:${v.package_number}`} key={v.package_number} style={cardStyle}>
            <div style={{ float: 'left', width: '20%' }}>
              <div>
                <span className={style.spanWidth}>圆圈</span>
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
              columns={col(orderId, dispatch, billno, 'show')}
            />
          </Card>
        ))
      }
      <Card title={lan.refundGoods} style={cardStyle}>
        <Table
          size="small"
          pagination={false}
          dataSource={returned_goods_list}
          columns={col(orderId, dispatch, billno)}
        />
      </Card>
      <Card title={lan.refund} style={cardStyle}>
        <Table
          size="small"
          pagination={false}
          dataSource={refund_goods_list}
          columns={col(orderId, dispatch, billno)}
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
  chooseGoods: PropTypes.arrayOf(PropTypes.string),
};
export default Packge;
