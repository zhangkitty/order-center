/**
 * Create by liufeng on 2017/9/3
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Popover, Button, Table } from 'antd';

import {
  change, operationGoods,
} from './action';

import Styles from './style.css';

const columns = [{
  title: '操作人',
  dataIndex: 'user_name',
  width: '80px',
}, {
  title: '时间',
  dataIndex: 'add_time',
  width: '150px',
}, {
  title: '状态',
  dataIndex: 'status',
}];

const PopoverView = ({
  dispatch, record, fetchOperation, operationVisible,
}) => (
  <div>
    <Popover
      placement="bottomRight"
      arrowPointAtCenter
      visible={operationVisible}
      onVisibleChange={visible => dispatch(change('operationVisible', !visible))}
      content={
        <div className={Styles.tableFloat}>
          <Table
            rowKey={fetchOperation.id}
            dataSource={fetchOperation}
            columns={columns} size="small"
            pagination={false}
            style={{ width: '350px', maxHeight: '300px', overflow: 'auto' }}
          />
          <Button
            style={{ margin: '10px' }}
            type="primary"
            onClick={() => dispatch(change('operationVisible', false))}
          >
            {__('common.order_operation8')}
          </Button>
        </div>
      }
    >
      <Button onClick={() => {
        console.log('click');
        dispatch(operationGoods(record));
      }}>{__('common.operation')}</Button>

    </Popover>
  </div>
);

PopoverView.propTypes = {
  dispatch: PropTypes.func,
  record: PropTypes.number,
  fetchOperation: PropTypes.arrayOf(PropTypes.shape()),
  operationVisible: PropTypes.bool,
};

export default PopoverView;
