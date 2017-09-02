import React from 'react';
import PropTypes from 'prop-types';
import style from './style.css';

const RefundGoods = ({ dataSource: { orderGoods } }) => (
  <div className={style.refundsgoods}>
    <span className={style.descWidth}>{__('order.goodsRefund.need_cancel_goods')}</span>
    <div style={{ display: 'flex' }}>
      {
        orderGoods.map(({ goodsSn, goodsThumb }) => (
          <div key={goodsSn} className={style.refundsgoods} style={{ margin: '15px' }}>
            <span style={{ margin: '0 10px' }}>{goodsSn}</span>
            <img src={goodsThumb} alt="exa" width="80px" height="80px" />
          </div>
        ))
      }
    </div>
  </div>
);
RefundGoods.propTypes = {
  dataSource: PropTypes.shape(),
};
export default RefundGoods;
