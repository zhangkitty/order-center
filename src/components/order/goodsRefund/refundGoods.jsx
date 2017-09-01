import React from 'react';
import style from './style.css';

const imgData = [{
  name: 'A',
  addr: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1504857639&di=4ac09a40e15c345dc83a5b107033da47&imgtype=jpg&er=1&src=http%3A%2F%2Ffile.popoho.com%2F2016-07-22%2Fa648063b73893b4b2940e124b97b3238.jpg',
}, {
  name: 'B',
  addr: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1504262923012&di=f3c95d2a7501e709d30d349356461fe2&imgtype=0&src=http%3A%2F%2Fk2.jsqq.net%2Fuploads%2Fallimg%2F1702%2F10_170208140118_3.jpg',
}];
const RefundGoods = () => (
  <div className={style.refundsgoods}>
    <span className={style.descWidth}>{__('order.goodsRefund.cancel_goods')}</span>
    <div style={{ display: 'flex' }}>
      {
        imgData.map(v => (
          <div key={v.name} className={style.refundsgoods} style={{ margin: '15px' }}>
            <span style={{ width: '50px' }}>{v.name}</span>
            <img src={v.addr} alt="exa" width="80px" height="80px" />
          </div>
        ))
      }
    </div>
  </div>
);

export default RefundGoods;
