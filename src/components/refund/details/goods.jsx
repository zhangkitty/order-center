import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import styles from './style.css';

// TODO: lan
const lan = {
  需要退款的商品信息: '需要退款的商品信息',
  编号: '编号',
  退款商品: '退款商品',
  销售价: '销售价',
  购买价: '购买价',
};

const Goods = ({ dataSource: { refund_goods } }) => (
  <div>
    <h3 style={{ margin: '20px 0' }}>{lan.需要退款的商品信息}</h3>
    <Table
      size="small"
      pagination={false}
      dataSource={refund_goods}
      rowKey={'goods_sort'}
      bordered
      columns={[
        {
          title: lan.编号,
          dataIndex: 'goods_sort',
          width: 50,
        },
        {
          title: lan.退款商品,
          dataIndex: 'goods_thumb',
          width: 150,
          render: (img, rec) => (
            <div className={styles.goodsImg}>
              <div>
                <img src={'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2628255248,1582396004&fm=27&gp=0.jpg'} alt="pic" width={100} />
              </div>
              <div className={styles.goodsImgDesc}>
                <p>{rec.goods_name}</p>
                <p>{rec.goods_sn}</p>
                <p>{rec.goods_attr}</p>
              </div>
            </div>
          ),
        },
        {
          title: lan.销售价,
          dataIndex: 'selling_price',
          width: 100,
          render: d => (
            !!d &&
            <span>
              {d.price_usd.amount_with_symbol} {d.price_with_exchange_rate.amount_with_symbol}
            </span>
          ),
        },
        {
          title: lan.购买价,
          dataIndex: 'purchase_price',
          width: 100,
          render: d => (
            !!d &&
            <span>
              {d.price_usd.amount_with_symbol},
              {d.price_with_exchange_rate.amount_with_symbol}
            </span>
          ),
        },
      ]}

    />
  </div>
);
Goods.propTypes = {
  dataSource: PropTypes.shape(),
};
export default Goods;
