import React from 'react';
import { Table, Button, Popover, Select, Input } from 'antd';
import { connect } from 'react-redux';
import { change,
  init,
  changePage,
  getRemarks,
  saveRemark,
  getTransRemark,
  saveTransRemark,
} from './action';
import Head from './head';
import OrderMark from './order-mark';
import Page from '../../lib/pagination';

const lan = {
  跟进中: '跟进中',
  已处理: '已处理',
  备注: '备注',
  物流备注: '物流备注',
  订单标记: '订单标记',
  取消: '取消',
  确认: '确认',
  保存: '保存',
};
const orderTagName = {
  0: __('common.orderTrouble'),
  1: __('common.orderTrouble1'),
  2: __('common.orderTrouble2'),
  3: __('common.orderTrouble3'),
  4: __('common.orderTrouble4'),
  5: __('common.orderTrouble5'),
  6: lan.支付平台投诉订单,
};
class UserComments extends React.Component {
  constructor(props) {
    super(props);
    const { dispatch } = props;
    dispatch(init());
  }

  render() {
    const Option = Select.Option;
    const {
      dataSource,
      page_number,
      page_size,
      current,
      total,
      fetchRemark,
      remarkValue,
      transRemark,
        dispatch,
    } = this.props;
    const columnsRemark = [
      {
        title: __('common.operationCheck'),
        dataIndex: 'user_name',
        width: '80px',
      },
      {
        title: __('common.operationCheck1'),
        dataIndex: 'add_time',
        width: '150px',
      },
      {
        title: __('common.order_operation4'),
        dataIndex: 'remark',
      },
    ];
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
        width: '300px',
        render: (text, record, index) => (
          <div style={{ width: 300 }}>
            <Popover
              content={
                <div>
                  <Button
                    style={{ marginLeft: 90 }}
                    size="small"
                    onClick={
                        () => console.log(1)
                      }
                  >{lan.确认}</Button>
                </div>
                }
              trigger="click"
              title="确认跟进改单号吗？"
            >
              <Button size="small">{lan.跟进中}</Button>
            </Popover>
            <Popover
              content={
                <div>
                  <div>请选择处理结果:</div>
                  <Select>
                    <Option value={1}>1</Option>
                    <Option value={2}>2</Option>
                  </Select>
                  <div>
                    <Button
                      size="small"
                      onClick={() => console.log(3)}
                    >{lan.确认}</Button>
                  </div>

                </div>
                  }
            >
              <Button size="small">{lan.已处理}</Button>
            </Popover>
            <Popover
              placement="bottom"
              trigger="click"
              arrowPointAtCenter
              content={
                <div>
                  <Table
                    dataSource={fetchRemark}
                    columns={columnsRemark}
                    pagination={false}
                    style={{ width: '500px', maxHeight: '400px', overflow: 'auto' }}
                  />
                  <div style={{ margin: '30px 50px 15px' }}>
                    <div>
                      <div style={{ textAlign: 'left' }}>
                        {__('common.order_operation6')}
                      </div>
                      <Input.TextArea
                        style={{ margin: '10px auto' }}
                        rows={3}
                        value={remarkValue}
                        onChange={e => dispatch(change('remarkValue', e.target.value))}
                      />
                      <Button
                        onClick={
                            () => dispatch(saveRemark(record.order_id, this.props))
                          }
                      >
                        {lan.保存}
                      </Button>
                    </div>
                  </div>
                </div>
                }
            >
              <Button
                onClick={() => dispatch(getRemarks(record.order_id))}
                size="small"
              >
                {lan.备注}
              </Button>
            </Popover>


            <Popover
              placement="bottomRight"
              trigger="click"
              arrowPointAtCenter
              content={
                <div>
                  <Input.TextArea
                    style={{ margin: '10px auto' }}
                    rows={5}
                    value={transRemark}
                    onChange={e => dispatch(change('transRemark', e.target.value))}
                  />
                  <Button
                    style={{ margin: '10px' }}
                    onClick={
                          () => dispatch(saveTransRemark(record.order_id, this.props))
                        }
                  >
                    {lan.保存}
                  </Button>
                </div>
                  }
            >
              <Button
                onClick={() => dispatch(getTransRemark(record.order_id))}
                size="small"
              >
                {lan.物流备注}
              </Button>
            </Popover>
            <Button
              size="small"
              onClick={() => console.log(3)}
            >
              路上风景三房
            </Button>
          </div>
          ),
      },
    ];
    const rowSelection = {
      type: 'checkbox',
    };

    return (
      <div>
        <Head {...this.props} />
        <OrderMark {...this.props} />
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
              dispatch(change('page_size', pageSize));
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
