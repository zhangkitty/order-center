import React from 'react';
import { connect } from 'react-redux';
import assign from 'object-assign';
import { Table, Pagination } from 'antd';
import Head from './head';
import { getOverStockList, getOverStockSearchConditions, change } from './action';


const lan = {
  订单号: '订单号',
  站点: '站点',
  已审核时间: '已审核时间',
  超过审核天数: '超过审核天数',
  尺码: '尺码',
  订单金额: '订单金额',
  广州库存: '广州库存',
  美东库存: '美东库存',
  美西库存: '美西库存',
  待上架数量: '待上架数量',
  回货日期: '回货日期',
};
const style = {
  marginTop: '15px',
  display: 'flex',
  justifyContent: 'flex-end',
};

class stockingExpired extends React.Component {


  componentWillMount() {
    const { dispatch } = this.props;

    dispatch(getOverStockSearchConditions());
  }

  render() {
    const columns = [{
      title: lan.订单号,
      dataIndex: 'billno',
      key: 'billno',
    }, {
      title: lan.站点,
      dataIndex: 'siteFrom',
      key: 'siteFrom',
    }, {
      title: lan.已审核时间,
      dataIndex: 'checkDate',
      key: 'checkDate',
    }, {
      title: lan.超过审核天数,
      dataIndex: 'overDate',
      key: 'overDate',
    }, {
      title: 'SKU',
      dataIndex: 'goodsSn',
      key: 'goodsSn',
    }, {
      title: lan.尺码,
      dataIndex: 'goodsSize',
      key: 'goodsSize',
    }, {
      title: lan.订单金额,
      dataIndex: 'total',
      key: 'total',
    }, {
      title: lan.广州库存,
      dataIndex: 'gzStock',
      key: 'gzStock',
    }, {
      title: lan.美东库存,
      dataIndex: 'ueStock',
      key: 'ueStock',
    }, {
      title: lan.美西库存,
      dataIndex: 'uwStock',
      key: 'uwStock',
    }, {
      title: lan.待上架数量,
      dataIndex: 'toBeShelved',
      key: 'toBeShelved',
    }, {
      title: lan.回货日期,
      dataIndex: 'returnTime',
      key: 'returnTime',
    }];
    const { TableData, total, dispatch, pageNumber } = this.props;
    return (
      <div>
        <Head {...this.props} />
        <Table columns={columns} dataSource={TableData} pagination={false} />
        <Pagination
          style={style}
          showSizeChanger
          showQuickJumper
          current={pageNumber}
          onChange={(page) => {
            dispatch(change('pageNumber', page));
            dispatch(getOverStockList(assign({}, this.props, {
              pageNumber: page,
            })));
          }}
          total={total}
          showTotal={records => `${records} ${__('common.content_name2')}`}
          onShowSizeChange={(current, size) => {
            console.log(current);
            console.log(size);
            dispatch(change('pageSize', size));
            dispatch(getOverStockList(assign({}, this.props, {
              pageSize: size,
            })));
          }}
        />
      </div>
    );
  }
}

const mapStateToProps = state => state.stockingExpired;
export default connect(mapStateToProps)(stockingExpired);
