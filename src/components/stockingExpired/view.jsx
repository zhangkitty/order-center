import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import assign from 'object-assign';
import { Table, Pagination } from 'antd';
import Head from './head';
import { getOverStockList, getOverStockSearchConditions, change } from './action';


const lan = {
  order: __('stockExpired.order'),
  site: __('stockExpired.site'),
  verifyDate: __('stockExpired.verify_date'),
  overDate: __('stockExpired.overdue_date'),
  size: __('stockExpired.size'),
  orderAmount: __('stockExpired.orderAmount'),
  guangzhou: __('stockExpired.gzInventory'),
  meidong: __('stockExpired.esInventory'),
  meixi: __('stockExpired.wsInventory'),
  wait: __('stockExpired.waitLaunched'),
  return: __('stockExpired.returnDate'),
  nsStock: __('stockExpired.nsInventory'),
  blStock: __('stockExpired.euInventory'),
};
const style = {
  marginTop: '15px',
  display: 'flex',
  justifyContent: 'flex-end',
};

class StockingExpired extends React.Component {
  componentWillMount() {
    const { dispatch } = this.props;

    dispatch(getOverStockSearchConditions());
  }

  render() {
    const columns = [{
      title: lan.order,
      dataIndex: 'billno',
      key: 'billno',
    }, {
      title: lan.site,
      dataIndex: 'siteFrom',
      key: 'siteFrom',
    }, {
      title: lan.verifyDate,
      dataIndex: 'checkDate',
      key: 'checkDate',
    }, {
      title: lan.overDate,
      dataIndex: 'overDate',
      key: 'overDate',
    }, {
      title: 'SKU',
      dataIndex: 'goodsSn',
      key: 'goodsSn',
    }, {
      title: lan.size,
      dataIndex: 'goodsSize',
      key: 'goodsSize',
    }, {
      title: lan.orderAmount,
      dataIndex: 'total',
      key: 'total',
    }, {
      title: lan.guangzhou,
      dataIndex: 'gzStock',
      key: 'gzStock',
    }, {
      title: lan.meidong,
      dataIndex: 'ueStock',
      key: 'ueStock',
    }, {
      title: lan.meixi,
      dataIndex: 'uwStock',
      key: 'uwStock',
    }, {
      title: lan.nsStock,
      dataIndex: 'nsStock',
      key: 'nsStock',
    }, {
      title: lan.blStock,
      dataIndex: 'blStock',
      key: 'blStock',
    }, {
      title: lan.wait,
      dataIndex: 'toBeShelved',
      key: 'toBeShelved',
    }, {
      title: lan.return,
      dataIndex: 'returnTime',
      key: 'returnTime',
    }];
    const { TableData, total, dispatch, pageNumber, tableLoading } = this.props;
    return (
      <div>
        <Head {...this.props} />
        <Table style={{ margin: '10px 20px' }} bordered columns={columns} dataSource={TableData} pagination={false} loading={tableLoading} />
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

StockingExpired.propTypes = {
  TableData: PropTypes.object,
  total: PropTypes.number,
  dispatch: PropTypes.func,
  pageNumber: PropTypes.number,
  tableLoading: PropTypes.bool,
};

const mapStateToProps = state => state.stockingExpired;
export default connect(mapStateToProps)(StockingExpired);
