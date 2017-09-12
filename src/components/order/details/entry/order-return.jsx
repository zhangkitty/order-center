import React from 'react';
import PropTypes from 'prop-types';
import assign from 'object-assign';
import { Table, Card, Button, Modal, Input, Radio, Upload, Popover, message } from 'antd';
import { commit, uploadTrackAction, uploadTrackShow, genRl } from './action';

const RG = Radio.Group;
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
  xiazai: '查看退货单',
  sahngchuan: '上传退货物流号',
  rl: '生成RL',
  save: '保存',
  qudao: '物流渠道',
  yundanleixing: '运单类型',
  yundaonhao: '运单号',
  yundanpingzh: '运单凭证',
  upload: '上传',
};
const sty = {
  form: { display: 'flex', flexDirection: 'column' },
  div: { display: 'flex', marginTop: '20px' },
  span: { display: 'inline-block', width: '80px' },
  input: { width: '50%' },
};
const OrderReturn = (
  {
    dataSource: { orderReturn },
    uploadTrack,
    dispatch,
    orderId,
    billno,
  },
) => (
  <Card
    title={lan.jilu}
    style={{ maxWidth: '1200px' }}
  >
    <Table
      size="small"
      rowKey="return_order_id"
      pagination={false}
      dataSource={orderReturn}
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
              <a style={{ margin: '10px' }} href={rec.return_order_details} target="blank">{lan.chankan}</a>
              {
                rec.return_rl_download ?
                  <a href={rec.return_rl_download} target="blank" style={{ marginLeft: '10px' }}>{lan.xiazai}</a>
                  : null
              }
              {
                  rec.return_label_type === 'RAN' ?
                    <div>
                      <Button style={{ margin: '10px' }} onClick={() => dispatch(genRl(rec.return_order_id, orderId, billno))}>{lan.rl}</Button>
                      <Popover content={rec.return_ran_info}>
                        <Button style={{ margin: '10px' }}>{lan.chankan}RAN</Button>
                      </Popover>
                    </div>
                    : null
                }
              <Button onClick={() => dispatch(uploadTrackShow(orderId, rec.return_order_id))} style={{ margin: '10px' }}>
                {lan.sahngchuan}
              </Button>
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
    >
      <form style={sty.form}>
        <div style={sty.div}>
          <span style={sty.span}>{lan.qudao}</span>
          <Input
            style={sty.input}
            onChange={e => dispatch(commit('uploadTrack', assign({}, uploadTrack, { channel: e.target.value })))}
          />
        </div>
        <div style={sty.div}>
          <span style={sty.span}>{lan.yundanleixing}</span>
          <RG
            onChange={e => dispatch(commit('uploadTrack', assign({}, uploadTrack, { check_type: e.target.value })))}
          >
            <Radio value="1">{lan.yundaonhao}</Radio>
            <Radio value="2">{lan.yundanpingzh}</Radio>
          </RG>
        </div>
        {
          uploadTrack.check_type === '1' &&
          <div style={sty.div}>
            <span style={sty.span}>{lan.yundaonhao}</span>
            <Input onChange={e => dispatch(commit('uploadTrack',
              assign({}, uploadTrack, { check_value: e.target.value })))}
            />
          </div>
        }
        {
          uploadTrack.check_type === '2' &&
            <div style={sty.div}>
              <span style={sty.span}>{lan.yundanpingzh}</span>
              {uploadTrack.img && <img src={uploadTrack.img} alt="pic" />}
              <Upload
                action="/index_new.php/Order/OrderReturn/handleImg"
                name="logistics_certificate"
                data={{ type: 2, order_id: orderId }}
                onChange={({ file }) => {
                  if (file.status === 'done') {
                    message.success(`${file.name} file uploaded successfully`);
                    dispatch(commit('uploadTrack', assign({}, uploadTrack, { check_value: file.response.data })));
                    dispatch(commit('uploadTrack', assign({}, uploadTrack, { img: file.response.data })));
                  } else if (file.status === 'error') {
                    message.error(`${file.name} file upload failed.`);
                  }
                }}
              >
                <Button icon="upload">
                  {lan.upload}
                </Button>
              </Upload>
            </div>
        }
      </form>
    </Modal>

  </Card>
);

OrderReturn.propTypes = {
  dataSource: PropTypes.shape(),
  uploadTrack: PropTypes.shape(),
  dispatch: PropTypes.func,
  orderId: PropTypes.string,
};
export default OrderReturn;
