import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import { Table, DatePicker } from 'antd';
import { changeDate } from './action';

const lan = {
  编号: __('refund.details.goods_code'),
  平台名称: __('order-management.list.platform_name'),
  操作: __('common.operationCheck2'),
  日志下载: __('order-management.list.download_logs'),
};
const Om = ({ dataSource, dispatch }) => (
  <div style={{ padding: '25px' }}>
    <Table
      rowKey={'id'}
      dataSource={dataSource}
      columns={[
        {
          title: lan.编号,
          dataIndex: 'id',
        },
        {
          title: lan.平台名称,
          dataIndex: 'name',
        },
        {
          title: lan.操作,
          render: (_, rec, index) => (
            <div>
              <DatePicker
                value={moment(rec.date, 'YYYYMMDD')}
                allowClear={false}
                disabledDate={current => (
                  current &&
                  current.valueOf() <= moment(Date.now()).subtract(7, 'days').valueOf()) ||
                  (current.valueOf() > moment(Date.now()).valueOf())
                }
                onChange={d => dispatch(changeDate(d.format('YYYYMMDD'), index))}
              />
              <a
                href={`${location.origin}/index_new.php/Order/AliOrder/exportNotifyAliSellerShipmentLog?date=${rec.date}`}
                target="_blank"
                style={{ marginLeft: '25px' }}
              >{lan.日志下载}</a>
            </div>
          ),
        },
      ]}
    />
  </div>
);


Om.propTypes = {
  dispatch: PropTypes.func,
  dataSource: PropTypes.arrayOf(PropTypes.shape()),
};

export default Om;
