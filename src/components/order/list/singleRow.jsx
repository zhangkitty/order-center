import React from 'react';
import PropTypes from 'prop-types';
import { Table, Checkbox } from 'antd';
import assign from 'object-assign';
import { commit } from './action';

import Styles from './style.css';

const SingleRow = ({ data, index, dispatch, dataSource }) => {
  return (
    <div className={Styles.orderList}>
      <div>
        <Checkbox >{ data.billno }</Checkbox> Qty: { data.goods_quantity }
      </div>
      <div>
        <Table
          rowKey="c"
          bordered
          rowSelection={{
            type: 'checkbox',
            onChange: t => console.log(t),
          }}
          pagination={false}
          showHeader={false}
          dataSource={data.goods}
          columns={
          [{
            title: '仓库',
            dataIndex: 'c',
          }, {
            title: '货料分类',
            dataIndex: 'd',
          }]
          }
        />
      </div>
      <div>
        进行中
      </div>
    </div>
  );
}

SingleRow.proptypes = {
  data: PropTypes.arrayOf(PropTypes.shape()),
  index: PropTypes.number,
};
export default SingleRow;