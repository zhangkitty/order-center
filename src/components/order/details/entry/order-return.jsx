import React from 'react';
import PropTypes from 'prop-types';
import assign from 'object-assign';
import { Table, Card, Button, Modal } from 'antd';
import { commit, uploadTrackAction, uploadTrackShow } from './action';

const BG = Button.Group;
const lan = {
  jilu: '退货记录',
  bianhao: '退货单号',
  leixing: '退货单类型',
  yundan: '运单类型',
  shijian: '申请时间',
  ren: '申请人',
  shangpin: '退货商品',
  lujin: '退货物流号',
  zhaungtai: '退款状态',
  pingzhenghao: '退货单状态',
  caozuo: '操作',
  chankan: '查看',
  xiazai: '下载退货单',
  sahngchuan: '上传退货物流号',
  rl: '生成RL',
  save: '保存',
};
const obj = {
  return_order_id: 1,
  return_order_type: '客户申请退单',
  return_label_type: 'RAN',
  return_apply_time: '2017-1-17 12:19:47 ',
  return_apply_name: '王玉 ',
  return_goods: 'A,C ',
  return_tracking_no: '12121312312 ',
  return_refund_status: '已经退款 ',
  return_order_status: '已申请 ',
  return_order_details: 'http://supplydevelop.dotfashion.cn/index_new.php/Home/OrderReturn/checkDetail/return_order_id/1089',
  return_order_download: 'https://img.shein.com/images/returnlabel/28e209b61a52482a0ae1cb9f5959c792.jpg',
};
const data = [
  obj,
  assign({}, obj, { return_order_id: 2 }),
];

const OrderReturn = (
  {
    dataSource: { orderReturn },
    uploadTrack,
    dispatch,
    orderId,
  },
) => (
  <Card
    title={lan.jilu}
  >
    <Table
      size="small"
      rowKey="return_order_id"
      pagination={false}
      dataSource={data}
      columns={[
        {
          title: lan.bianhao,
          dataIndex: 'return_order_id',
        },
        {
          title: lan.leixing,
          dataIndex: 'return_order_type',
        },
        {
          title: lan.yundan,
          dataIndex: 'return_label_type',
        },
        {
          title: lan.shijian,
          dataIndex: 'return_apply_time',
        },
        {
          title: lan.ren,
          dataIndex: 'return_apply_name',
        },
        {
          title: lan.shangpin,
          dataIndex: 'return_goods',
        },
        {
          title: lan.lujin,
          dataIndex: 'return_tracking_no',
        },
        {
          title: lan.zhaungtai,
          dataIndex: 'return_refund_status',
        },
        {
          title: lan.pingzhenghao,
          dataIndex: 'return_order_status',
        },
        {
          title: lan.caozuo,
          render: rec => (
            <div>
              <BG>
                <Button>{lan.chankan}</Button>
                {
                  rec.return_label_type === 'RAN' ?
                    <Button>{lan.rl}</Button>
                    : null
                }
                <Button onClick={() => dispatch(uploadTrackShow(orderId, rec.return_order_id))}>{lan.sahngchuan}</Button>
              </BG>
              {
                rec.return_order_download ?
                  <a href={rec.return_order_download} target="blank">{lan.xiazai}</a>
                  : null
              }
            </div>

          ),
        },
      ]}
    />
    <Modal
      onCancel={() => dispatch(commit('uploadTrack', assign({}, uploadTrack, { show: false })))}
      okText={lan.save}
      visible={uploadTrack.show}
      onOk={() => dispatch(uploadTrackAction(uploadTrack))}
    />

  </Card>
);

OrderReturn.propTypes = {
  dataSource: PropTypes.shape(),
  uploadTrack: PropTypes.shape(),
  dispatch: PropTypes.func,
  orderId: PropTypes.string,
};
export default OrderReturn;
