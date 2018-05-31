/**
 * Create by liufeng on 2017/9/15
 * 分页
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Pagination } from 'antd';

const style = {
  marginTop: '15px',
  display: 'flex',
  justifyContent: 'flex-end',
};

const pageSizes = ['10', '20', '30', '40', '100', '200', '400'];

const Page = ({
  total, onChange, onShowSizeChange, current, pageSize,
}) => (
  <Pagination
    total={total}
    style={style}
    pageSizeOptions={pageSizes}
    pageSize={pageSize}
    current={current || 1}
    showSizeChanger showQuickJumper
    onChange={onChange}
    showTotal={records => `共 ${records} 条记录`}
    // defaultPageSize={10}
    onShowSizeChange={(cur, size) => onShowSizeChange(cur, size)}
  />
);

Page.propTypes = {
  total: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  onShowSizeChange: PropTypes.func.isRequired,
  current: PropTypes.number,
  pageSize: PropTypes.number,
};

export default Page;
