import React from 'react';
import PropTypes from 'prop-types';
import { Table, Checkbox } from 'antd';
import assign from 'object-assign';
import { commit } from './action';

import Styles from './style.css';

const SingleRow = ({ data, index }) => {
  return (
    <div className={Styles.orderList}>
      <div className={Styles.orderTitle}>
        <Checkbox >{ data.billno }</Checkbox> Qty: { data.goods_quantity }
      </div>
      <div className={Styles.orderTable}>
        <Table
          rowKey="c"
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
      <div className={Styles.orderOperate}>
        进行中
      </div>
    </div>
  );
};

SingleRow.proptypes = {
  data: PropTypes.arrayOf(PropTypes.shape()),
  index: PropTypes.number,
};
export default SingleRow;
