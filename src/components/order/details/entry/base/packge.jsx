import React  from 'react';
import { Card, Table } from 'antd';

// TODO: lan
const lan = {
  noPackge: '未形成包裹商品',
  packge: '包裹',
  refundGoods: '退货商品',
  refund: '退款商品',
  goodsStatus: '商品状态',
  img: '图片',
  code: '型号',
  sale: '销售价',
  discount: '折后价',
  qudao: '发货渠道',
  huohao: '发货号',
};
const col = () => ([
  {
    title: lan.goodsStatus,
    dataIndex: 'status',
    render: d => (
      <div>
        <span>圆圈</span>
        <span>{d}</span>
      </div>
    )
  },
  {
    title: lan.img,
    dataIndex: 'pic',
  },
  {
    title: lan.sku,
    dataIndex: 'sku',
  },
  {
    title: lan.code,
    dataIndex: 'attr',
    render: (d, rec) => (
      <div>
        <span>{rec.serial_number}</span>
        <img alt="pic" src={d} width="50px" height="50px" />
      </div>
    )
  },
  {
    title: `${lan.sale}($)`,
    dataIndex: 'sale_price',
    render: (d) => (<span>{d.amount_with_symbol}</span>),
  },
  {
    title: `${lan.discount}($)`,
    dataIndex: discount_price,
    render: (d) => (<span>{d.amount_with_symbol}</span>),
  }
]);
export default ({ order_info: { order_goods_info } }) => {
  const { not_packaged_goods_list, package_list } = order_goods_info;
  return (
    <div>
      <Card title={lan.noPackge}>
        <Table
          dataSource={not_packaged_goods_list}
          columns={col()}
        />
      </Card>
      {
        package_list.map(v => (
          <Card title={`${lan.packge}:${v.package_number}`} key={v.package_number}>
            <div>
              <div>
                <span>圆圈</span>
                <span>{v.package_status}</span>
              </div>
              <div>
                <span>{lan.qudao}</span>
                <span>{v.delivery_channel}</span>
              </div>
              <div>
                <span>{lan.huohao}</span>
                <span>{v.delivery_number}</span>
              </div>
            </div>
            <Table
              dataSource={not_packaged_goods_list}
              columns={col()}
            />
          </Card>
        ))
      }
      <Card title={lan.refundGoods}>
        <Table
          dataSource={not_packaged_goods_list}
          columns={col()}
        />
      </Card>
      <Card title={lan.refund}>
        <Table
          dataSource={not_packaged_goods_list}
          columns={col()}
        />
      </Card>
    </div>
  );
}