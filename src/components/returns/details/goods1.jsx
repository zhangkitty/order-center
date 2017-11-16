import React from 'react';
import { Table } from 'antd';

const lan = {
  申请退货商品信息: '申请退货商品信息',
  退货ＱＣ状态: '退货ＱＣ状态',
  商品图片: '商品图片',
  商品名称: '商品名称',
  尺码: '尺码',
  商品SKU: '商品SKU',
  退货原因: '退货原因',
};


const Goods = ({ returnsInfoData: { returnOrderGoods } }) => (
  <div>
    <h3 style={{ margin: '20px 0' }}>{lan.申请退货商品信息}</h3>
    <Table
      size="small"
      pagination={false}
      dataSource={returnOrderGoods}
      rowKey={'goodsId'}
      //  bordered
      columns={[
        {
          title: lan.退货ＱＣ状态,
          dataIndex: 'qcState',
          width: 150,
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
        },
      ]}
    />
  </div>
  );
export default Goods;
