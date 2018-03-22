import React from 'react';
import { Table } from 'antd';

const lan = {
  申请退货商品信息: __('returns.details.申请退货商品信息'),
  退货ＱＣ状态: __('returns.details.退货ＱＣ状态'),
  商品图片: __('returns.details.商品图片'),
  商品名称: __('returns.details.商品名称'),
  尺码: __('returns.details.尺码'),
  商品SKU: __('returns.details.商品SKU'),
  退货原因: __('returns.details.退货原因'),
};


const Goods = ({ returnsInfoData: { returnOrderGoods } }) => (
  <div>
    <h3 style={{ margin: '20px 0' }}>{lan.申请退货商品信息}</h3>
    <Table
      size="small"
      pagination={false}
      dataSource={returnOrderGoods}
      rowKey={'orderGoodsId'}
      //  bordered
      columns={[
        {
          title: lan.退货ＱＣ状态,
          dataIndex: 'qcState',
          width: 150,
          render: text => (text === '未退回或未QC' || text === '次品') ? <span style={{ color: 'red' }}>{text}</span> : <span>{text}</span>,
        },
        {
          title: lan.商品图片,
          dataIndex: 'goodsImage',
          width: 150,
          render: (img, rec) => (
            <div>
              <img src={img} alt="" width={100} />
            </div>
            ),
        },
        {
          title: lan.商品名称,
          dataIndex: 'goodsName',
          width: 150,
        },
        {
          title: lan.商品SKU,
          dataIndex: 'goodsSn',
          width: 150,
        },
        {
          title: lan.尺码,
          dataIndex: 'size',
          width: 50,
        },
        {
          title: lan.退货原因,
          dataIndex: 'returnReason',
          width: 150,
          render: (data, rec) => (
            <span dangerouslySetInnerHTML={{ __html: data }} />
          ),
        },
      ]}
    />
  </div>
  );
export default Goods;
