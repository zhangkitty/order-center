import React from 'react';
import PropTypes from 'prop-types';
import style from './style.css';

const Reason = ({ dataSource, refundInfo }) => (
  <div className={style.reason}>
    <div className={style.info_left} >
      <span className={style.infoList}>
        <span className={style.infoListName}>{__('common.change_refund1')}</span> { refundInfo.refundBillId }
      </span>
      <span className={style.infoList}>
        <span className={style.infoListName}>{__('common.change_refund2')}</span> { refundInfo.status }
      </span>
      <span className={style.infoList}>
        <span className={style.infoListName}>{__('common.change_refund3')}</span> { refundInfo.refundReason }
      </span>
    </div>
    <div className={style.info_left} >
      <span className={style.infoList}>
        <span className={style.infoListName}>{__('common.change_refund4')}</span> { refundInfo.refundTypeName }
      </span>
      {
        refundInfo.statusCode == 4 ?
          <span className={style.infoList}>
            <span className={style.infoListName}>{__('common.change_refund5')}</span> { refundInfo.rejectReason }
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
