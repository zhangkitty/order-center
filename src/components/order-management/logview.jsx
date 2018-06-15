import React from 'react';
import { DatePicker, Table } from 'antd';
import moment from 'moment';
import { changeDate } from './action';

const lan = {
  编号: '编号',
  平台名称: '平台名称',
  操作: '操作',
  日志下载: '日志下载',
  日志类型: '日志类型',
};

const table = {
  0: 'exportNotifyAliSellerShipmentLog',
  1: 'exportSyncAliOrderLog',
};

const Om = (props) => {
  const { logDataSource, dispatch } = props;
  return (<div style={{ padding: '25px' }}>
    <Table
      rowKey={'id'}
      dataSource={logDataSource}
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
          title: lan.日志类型,
          dataIndex: 'logType',
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
                href={`${location.origin}/index_new.php/Order/AliOrder/${table[index]}?date=${rec.date}`}
                target="_blank"
                style={{ marginLeft: '25px' }}
              >{lan.日志下载}</a>


            </div>
            ),
        },
      ]}
    />
  </div>);
};

export default Om;
