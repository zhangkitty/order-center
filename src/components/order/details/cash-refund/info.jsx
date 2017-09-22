import React from 'react';
import PropTypes from 'prop-types';
import style from './style.css';

const Reason = ({ dataSource, refundInfo }) => (
  <div className={style.reason}>
    <div className={style.info_left} >
      <span className={style.infoList}>
        <span className={style.infoListName}>退款编号:</span> { refundInfo.refundBillId }
      </span>
      <span className={style.infoList}>
        <span className={style.infoListName}>退款状态:</span> { refundInfo.status }
      </span>
      <span className={style.infoList}>
        <span className={style.infoListName}>退款原因:</span> { refundInfo.refundReason }
      </span>
    </div>
    <div className={style.info_left} >
      <span className={style.infoList}>
        <span className={style.infoListName}>退款类型:</span> { refundInfo.refundTypeName }
      </span>
      {
        refundInfo.statusCode == 4 ?
          <span className={style.infoList}>
            <span className={style.infoListName}>驳回原因:</span> { refundInfo.rejecteason }
          </span>
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
