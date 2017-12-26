import React, { PropTypes } from 'react';
import { Table, Button, Popconfirm } from 'antd';
import { remarkShow, followTrouble, handledModal, uploadShow, commit } from './action';

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
        width: 100,
      },
      {
        title: lan.b,
        dataIndex: 'order_id',
        width: 100,
      },
      {
        title: lan.c,
        dataIndex: 'reference_number',
        width: 100,
      },
      {
        title: lan.d,
        dataIndex: 'shipping_method_real',
        width: 100,
      },
      {
        title: lan.e,
        dataIndex: 'shipping_no',
        width: 100,
      },
      {
        title: lan.f,
        dataIndex: 'trouble_type_description',
        width: 100,
      },
      {
        title: lan.g,
        dataIndex: 'trouble_description',
        width: 100,
      },
      {
        title: lan.h,
        dataIndex: 'delivery_time',
        width: 100,
      },
      {
        title: lan.i,
        dataIndex: 'site_from',
        width: 100,
      },
      {
        title: lan.j,
        dataIndex: 'shipping_country_name',
        width: 100,
      },
      {
        title: lan.k,
        dataIndex: 'add_admin_user_name',
        width: 100,
      },
      {
        title: lan.l,
        dataIndex: 'level',
        width: 50,
      },
      {
        title: lan.m,
        dataIndex: 'handle_status_description',
        width: 100,
      },
      {
        title: lan.n,
        dataIndex: 'handle_admin_user_name',
        width: 100,
      },
      {
        title: lan.o,
        dataIndex: 'handle_result_description',
        width: 100,
      },
      {
        title: lan.p,
        dataIndex: 'attachments',
        width: 100,
        render: d => d && d.map(v => (
          <img
            alt={'pic'} src={v} key={v} width={30} style={{ margin: '0 5px', cursor: 'pointer' }}
            onClick={() => {
              dispatch(commit('previewVisible', true));
              dispatch(commit('previewImage', v));
            }}
          />
        )),
      },
      {
        title: lan.q,
        width: 100,
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
              +rec.handle_status === 1 && (rec.attachments || []).length < 2 &&
              <Button
                onClick={() => dispatch(uploadShow(rec.id, rec.attachments || []))}
              >
                {lan.upload}
              </Button>
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
