import React from 'react';
import { Table } from 'antd';
import { connect } from 'react-redux';
import { change, init, changePage } from './action';
import Head from './head';
import Page from '../../lib/pagination';

class UserComments extends React.Component {
  constructor(props) {
    super(props);
    const { dispatch } = props;
    dispatch(init());
  }

  render() {
    const {
      dataSource,
      page_number,
      page_size,
      current,
      total,
        dispatch,
    } = this.props;
    const columns = [
      {
        title: '订单号',
        dataIndex: 'order_id',
        key: 'order_id',
      },
      {
        title: '站点',
        dataIndex: 'site_from',
      },
      {
        title: '支付时间',
        dataIndex: 'pay_time',
      },
      {
        title: '国家',
        dataIndex: 'shipping_country_id',
      },
      {
        title: '留言',
        dataIndex: 'user_mark',
      },
      {
        title: '处理状态',
        dataIndex: 'handle_status',
      },
      {
        title: '处理结果',
        dataIndex: 'handle_result',
      },
      {
        title: '处理人',
        dataIndex: 'handler',
      },
      {
        title: '操作',

      },
    ];
    const rowSelection = {
      type: 'checkbox',
    };

    return (
      <div>
        <Head {...this.props} />
        <div style={{ margin: 20 }}>
          <Table
            pagination={false}
            rowSelection={rowSelection}
            dataSource={dataSource}
            columns={columns}
          />
          <Page
            total={total}
            onChange={(page, pageSize) => {
              dispatch(changePage(page, pageSize, this.props));
            }}
            onShowSizeChange={(page, pageSize) => {
              console.log(page);
              console.log(pageSize);
              dispatch(changePage(page, pageSize, this.props));
            }}
            current={current}
            pageSize={page_size}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => state['user-comments'];

export default connect(mapStateToProps)(UserComments);
