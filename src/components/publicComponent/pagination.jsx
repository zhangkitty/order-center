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

const pageSizes = ['10', '20', '30', '40'];

const Page = ({ total, onChange, onShowSizeChange, current }) => (
  <Pagination
    total={total}
    style={style}
    pageSizeOptions={pageSizes}
    current={current || 1}
    showSizeChanger showQuickJumper
    onChange={onChange}
    showTotal={records => `${records} ${__('common.content_name2')}`}
    defaultPageSize={10}
    onShowSizeChange={(cur, size) => onShowSizeChange(cur, size)}
  />
);

Page.propTypes = {
  total: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  onShowSizeChange: PropTypes.func.isRequired,
  current: PropTypes.number,
};

export default Page;
