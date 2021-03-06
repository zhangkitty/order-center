import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Table, Button, Pagination, Popconfirm } from 'antd';
import { init, changePage, changePageSize, deleteItem, addOrEdit, addOrEditVisible } from './action';
import MyModal from './MyModal';

const lan = {
  序号: '序号',
  专员名称: '专员名称',
  分配国家: '分配国家',
  操作: '操作',
  编辑: '编辑',
  删除: '删除',
  添加物流客服: '添加物流客服',
  是否确认要删除: '是否确认要删除',
  提交类型: '提交类型',
  问题类型: '问题类型',
  生效时间: '生效时间',
  支付方式: '支付方式',
  站点: '站点',
};

const style = {
  marginTop: '15px',
  display: 'flex',
  justifyContent: 'flex-end',
};

class CustomerService extends Component {
  constructor(props) {
    super(props);
    const { dispatch, pageNumber, pageSize } = props;
    dispatch(init(pageNumber, pageSize));
    dispatch(addOrEdit());
  }

  render() {
    const { dataSource, dispatch, total } = this.props;
    const columns = [{
      title: lan.序号,
      dataIndex: 'user_id',
      key: 'user_id',
      width: 200,
    }, {
      title: lan.专员名称,
      dataIndex: 'user_name',
      key: 'user_name',
      width: 200,
    }, {
      title: lan.分配国家,
      dataIndex: 'country',
      key: 'country',
      width: 200,
    }, {
      title: lan.提交类型,
      dataIndex: 'post_cate_name',
      key: 'post_cate_name',
      width: 200,
    }, {
      title: lan.问题类型,
      dataIndex: 'trouble_type_name',
      key: 'trouble_type_name',
      width: 200,
    }, {
      title: lan.支付方式,
      dataIndex: 'pay_method',
      key: 'pay_method',
      width: 200,
    }, {
      title: lan.站点,
      dataIndex: 'site_from',
      key: 'site_from',
      width: 200,
    }, {
      title: lan.生效时间,
      dataIndex: 'effect_time',
      key: 'effect_time',
      width: 200,
    }, {
      title: lan.操作,
      dataIndex: 'type',
      key: 'type',
      width: 200,
      render: (text, record) =>
        (<span>
          <Button
            style={{ marginRight: 10 }}
            onClick={() => dispatch(addOrEditVisible(record))}
          >
            {lan.编辑}
          </Button>
          <Popconfirm
            title={lan.是否确认要删除}
            onConfirm={() => dispatch(deleteItem(record))}
          >
            <Button
              style={{ marignRight: 10 }}
            >
              {lan.删除}
            </Button>
          </Popconfirm>

        </span>),
    }];
    return (
      <div style={{ margin: 20 }}>
        <MyModal {...this.props} />
        <div
          style={{ display: 'flex',
            flexDirection: 'row-reverse',
            marginBottom: 10,
          }}
        >
          <Button
            onClick={() => dispatch(addOrEditVisible())}
          >
            <a>{lan.添加物流客服}</a>
          </Button>
        </div>
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={false}
          size="small"
        />
        <Pagination
          style={style}
          total={total}
          showSizeChanger
          showQuickJumper
          showTotal={records => `${records} ${__('common.content_name2')}`}
          onChange={
            (page, pageSize) => dispatch(changePage(page, pageSize))
          }

          onShowSizeChange={
            (current, size) => dispatch(changePageSize(current, size))
          }
        />

      </div>);
  }
}


CustomerService.propTypes = {
  dispatch: PropTypes.func,
  pageNumber: PropTypes.number,
  pageSize: PropTypes.number,
  total: PropTypes.number,
  dataSource: PropTypes.arrayOf(PropTypes.object),
};


const mapStateToProps = state => state['customer-service'];
export default connect(mapStateToProps)(CustomerService);
