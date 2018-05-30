import React from 'react';
import { Table, Button, Popover, Select, Input, Popconfirm } from 'antd';
import { connect } from 'react-redux';
import { change,
  init,
  changePage,
  getRemarks,
  saveRemark,
  getTransRemark,
  saveTransRemark,
  operateMarkStatus,
  tag,
} from './action';
import Head from './head';
import OrderMark from './order-mark';
import Page from '../../lib/pagination';
import ProcessedModal from './process-modal';

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
      processedShow,
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
        render: (text, record) => {
          const temp = {
            1: '待处理',
            2: '跟进中',
            3: '已处理',
          };
          return temp[+text];
        },
      },
      {
        title: '处理结果',
        dataIndex: 'handle_result',
        render: (text) => {
          const temp = {
            1: '已完成',
            2: '未实现',
          };
          return temp[+text];
        },
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
            {
              (+record.handle_status < 2) && <Popover
                content={
                  <div>
                    <Button
                      style={{ marginLeft: 90 }}
                      size="small"
                      onClick={() => dispatch(operateMarkStatus(this.props))}
                    >{lan.确认}</Button>
                  </div>
                  }
                trigger="click"
                title="确认跟进改单号吗？"
              >
                <Button
                  size="small"
                  onClick={() => {
                    dispatch(change('myhandle_result', 2));
                    dispatch(change('id', text.id));
                  }}
                >{lan.跟进中}</Button>
              </Popover>
            }
            {
              (+record.handle_status < 3) && <Button
                size="small"
                onClick={
                    () => {
                      dispatch(change('myhandle_result', 3));
                      dispatch(change('id', text.id));
                      dispatch(change('processedShow', true));
                    }
                  }
              >{lan.已处理}</Button>
            }
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
            {
              +record.is_trouble === 0 &&
              <Button
                size="small"
                onClick={() => {
                  dispatch(change('markTagShow', true));
                  dispatch(change('order_id', record.order_id));
                  dispatch(change('markTag', ''));
                  // dispatch(change('troubleTag', 2));
                }}
              >
                订单标记
              </Button>
            }
            {
              +record.is_trouble !== 0 &&
              <Popconfirm
                trigger="click"
                cancelText="保留标记"
                okText="取消标记"
                title="是否取消标记"
                onConfirm={() => dispatch(tag(this.props, 2))}
              >
                <Button
                  size="small"
                  onClick={() => dispatch(change('order_id', record.order_id))}

                >
                  {
                    (function (res) {
                      const table = {
                        0: '订单标记',
                        1: '问题订单',
                        2: '作废订单',
                        3: '风控订单',
                        4: '特殊订单',
                        5: '紧急订单',
                        6: '支付平台投诉订单',
                      };
                      return table[+res.is_trouble];
                    }(record))
                  }
                </Button>
              </Popconfirm>
            }


          </div>
          ),
      },
    ];
    const rowSelection = {
      type: 'checkbox',
      onChange: (selectedRowKeys, selectedRows) => {
        dispatch(change('selectedRowKeys', selectedRowKeys));
        dispatch(change('selectedRows', selectedRows));
      },
    };

    return (
      <div>
        <ProcessedModal {...this.props} />
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
