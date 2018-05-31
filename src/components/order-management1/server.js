import fetch from '../../lib/fetch';

const list = {
  export: '/AliOrder/exportNotifyAliSellerShipmentLog',
};

export const exportLogSer = date => (
  fetch(`${list.export}?date=${date}`, {
    method: 'get',
  })
);
