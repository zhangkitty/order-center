import React, { PropTypes } from 'react';
import { Table, Button, Popconfirm } from 'antd';
import { remarkShow, followTrouble, handledModal, uploadShow } from './action';

// TODO： lan
const lan = {
  a: '提交日期',
  b: '订单号',
  c: '包裹号',
  d: '发货渠道',
  e: '物流单号',
  f: '问题类型',
  g: '问题描述',
  h: '发货日期',
  i: '站点',
  j: '收货国家',
  k: '提交人',
  l: '会员等级',
  m: '处理状态',
  n: '处理人',
  o: '处理结果',
  p: '图片',
  q: '操作',
  beizhu: '备注',
  yichuli: '已处理',
  genjinzhong: '跟进中',
  upload: '上传附件',
  genjinDesc: '确认认领该物流问题?',
  cancel: '取消',
  save: '确认',
};
const Bg = Button.Group;
const TableView = ({ dataSource, load, dispatch, filter }) => (
  <Table
    dataSource={dataSource}
    pagination={false}
    loading={load}
    rowKey={'id'}
    columns={[
      {
        title: lan.a,
        dataIndex: 'add_time',
      },
      {
        title: lan.b,
        dataIndex: 'order_id',
      },
      {
        title: lan.c,
        dataIndex: 'reference_number',
      },
      {
        title: lan.d,
        dataIndex: 'shipping_method_real',
      },
      {
        title: lan.e,
        dataIndex: 'shipping_no',
      },
      {
        title: lan.f,
        dataIndex: 'trouble_type_description',
      },
      {
        title: lan.g,
        dataIndex: 'trouble_description',
      },
      {
        title: lan.h,
        dataIndex: 'delivery_time',
      },
      {
        title: lan.i,
        dataIndex: 'site_from',
      },
      {
        title: lan.j,
        dataIndex: 'shipping_country_name',
      },
      {
        title: lan.k,
        dataIndex: 'add_admin_user_name',
      },
      {
        title: lan.l,
        dataIndex: 'level',
      },
      {
        title: lan.m,
        dataIndex: 'handle_status_description',
      },
      {
        title: lan.n,
        dataIndex: 'handle_admin_user_name',
      },
      {
        title: lan.o,
        dataIndex: 'handle_result_description',
      },
      {
        title: lan.p,
        dataIndex: 'image', // TODO
      },
      {
        title: lan.q,
        render: rec => (
          <Bg>
            <Button
              onClick={() => dispatch(remarkShow(rec.id))}
            >
              {lan.beizhu}
            </Button>
            {
              +rec.handle_status === 2 &&
              <Button onClick={() => dispatch(handledModal(rec.id))}>{lan.yichuli}</Button>
            }
            {
              +rec.handle_status === 1 &&
              <Popconfirm
                onConfirm={() => dispatch(followTrouble(rec.id, filter))}
                placement="top" title={lan.genjinDesc} okText={lan.save} cancelText={lan.cancel}
              >
                <Button >{lan.genjinzhong}</Button>
              </Popconfirm>
            }
            {
              +rec.handle_status === 1 &&
              <Button onClick={() => dispatch(uploadShow(rec.id))}>{lan.upload}</Button>
            }
          </Bg>
        ),
      },
    ]}
  />
);
TableView.propTypes = {
  dataSource: PropTypes.arrayOf(PropTypes.shape()),
  load: PropTypes.bool,
  dispatch: PropTypes.func,
  filter: PropTypes.shape(),
};
export default TableView;
