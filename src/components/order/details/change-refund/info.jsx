import React from 'react';
import PropTypes from 'prop-types';
import { Radio, Tag } from 'antd';
import { subchange } from './action';
import style from './style.css';

const Reason = ({ dataSource, refundInfo }) => (
  <div className={style.reason}>
    <div className={style.info_left} >
      退款编号：{ refundInfo.refundBillId }<br />
      退款状态：{ refundInfo.status }<br />
      退款原因：{ refundInfo.refundReason }<br />
    </div>
    <div className={style.info_left} >
      退款类型：{ refundInfo.refundTypeName }<br />
      {
        refundInfo.statusCode == 4 ?
          <span>驳回原因：{ refundInfo.rejecteason }</span>
        : null
      }
    </div>
  </div>
);
Reason.propTypes = {
  dataSource: PropTypes.shape(),
  refundInfo: PropTypes.shape(),
};
export default Reason;

