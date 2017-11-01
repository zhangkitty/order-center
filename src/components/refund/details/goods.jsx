import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import styles from './style.css';

const lan = {
  需要退款的商品信息: __('refund.details.goods_need_refund'),
  编号: __('refund.details.goods_code'),
  退款商品: __('refund.details.goods_refund'),
  销售价: __('refund.details.goods_sale'),
  折后价: __('refund.details.goods_buy'),
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
                <img src={img} alt="pic" width={100} />
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
              {d.price_usd.amount_with_symbol}, {d.price_with_exchange_rate.amount_with_symbol}
            </span>
          ),
        },
        {
          title: lan.折后价,
          dataIndex: 'purchase_price',
          width: 100,
          render: d => (
            !!d &&
            <span>
              {d.price_usd.amount_with_symbol}, {d.price_with_exchange_rate.amount_with_symbol}
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
