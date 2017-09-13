import React from 'react';
import PropTypes from 'prop-types';
import assign from 'object-assign';
import { Radio, Input, Checkbox } from 'antd';
import { subchange, activation } from './action';
import style from './style.css';

const lan = {
  refund_number: '退款编号',
  refund_type: '退款类型',
  refund_reason: '退款原因',
  refund_status: '退款状态',
  dismiss_the_cause: '驳回原因',
  refund_path: '退款路径',
};

const State = ({ dataSource, submitValue, dispatch, active }) => {
  const {
    refundBillId,
    refundReason,
    refundTypeName,
    status,
    rejectReason,
    refundRecordInfo: { refundPathName },
  } = dataSource.refundBillInfo;
  return (
    <div>
      <div style={{ marginTop: '10px' }}>
        <span style={{ display: 'inline-block', width: '200px' }}>{lan.refund_number}:{refundBillId}</span>
        <span style={{ marginLeft: '300px' }}>{lan.refund_status}:{status}</span>
      </div>
      <div style={{ marginTop: '10px' }}>
        <span style={{ display: 'inline-block', width: '200px' }}>{lan.refund_type}:{refundTypeName}</span>
        <span style={{ marginLeft: '300px' }}>{lan.dismiss_the_cause}:{rejectReason}</span>
      </div>
      <div style={{ marginTop: '10px' }}>
        <span style={{ display: 'inline-block', width: '200px' }}>{lan.refund_reason}:{refundReason}</span>
        <span style={{ marginLeft: '300px' }}>{lan.refund_path}:{refundPathName}</span>
      </div>
    </div>
  );
};


export default State;