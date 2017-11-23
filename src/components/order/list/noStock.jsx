/**
 * Create by liufeng on 2017/8/30
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, Table, Popover, Checkbox, Radio } from 'antd';
import {
  change,
  noStockApply,
  noStock,
  returnAlreadyAudit,
  changeAllSource,
  getNoGoodsList,
  changeNoGoodsList,
  underCarriage
} from './action';
import styles from './style.css';
const RadioGroup = Radio.Group;

const tipContent = (
  <div>
    {__('common.noGoods_name19')}
    <br />
    {__('common.noGoods_name20')}
    <br />
    {__('common.noGoods_name21')}
  </div>
);

const columns = [
  {
    title: __('common.noGoods_name1'),
    dataIndex: 'canku'
  },
  {
    title: __('common.noGoods_name2'),
    dataIndex: 'stock',
    render: text =>
      text
        ? (Object.keys(text).length > 1
            ? Object.keys(text).reduce(
                (sum, v) =>
                  Array.isArray(sum)
                    ? sum.concat([`${v}:${text[v]}`])
                    : [`${sum}:${text[sum]}`, `${v}:${text[v]}`]
              )
            : Object.keys(text).map(v => `${v}:${text[v]}`)
          ).join(', ')
        : 0
  },
  {
    title: (
      <div>
        {__('common.noGoods_name3')}
        <Popover content={tipContent}>
          <div
            className={styles.showTip}
            style={{
              borderRadius: 50,
              backgroundColor: '#ccc',
              display: 'inline-block',
              width: 15,
              height: 15,
              textAlign: 'center',
              lineHeight: '15px',
              position: 'relative'
            }}
          >
            ?
          </div>
        </Popover>
      </div>
    ),
    dataIndex: 'occupy',
    render: (text, record) => {
      return record.stock ? text : '-';
    }
  }
];

const options = [
  { label: __('common.noGoods_name4'), value: '1' },
  { label: __('common.noGoods_name5'), value: '2' }
];

let _batchChooseGoods;

class TabsHeader extends Component {
  state = {
    selectAllStateStatus: false
  };
  render() {
    const {
      showShelfNoGoods,
      batchChooseGoods,
      dispatch,
      stockList: data,
      dataSource_noGoods,
      showBatchNoGoods,
      down
    } = this.props;
    const dataSource = [
      {
        key: '1',
        canku: __('common.noGoods_name6'),
        stock: data.stock.back,
        occupy: data.occupy.back
      },
      {
        key: '2',
        canku: __('common.noGoods_name7'),
        stock: data.stock.b,
        occupy: data.occupy.b
      },
      {
        key: '3',
        canku: __('common.noGoods_name8'),
        stock: data.stock['c-east'],
        occupy: data.occupy['c-east']
      },
      {
        key: '4',
        canku: __('common.noGoods_name9'),
        stock: data.stock['c-west'],
        occupy: data.occupy['c-west']
      },
      {
        key: '5',
        canku: __('common.noGoods_name10'),
        stock: data.stock.d,
        occupy: data.occupy.d
      }
    ];
    const columns_noGoods = [
      {
        className:styles.verticalAlign,
        title: (
          <Checkbox
            onChange={e => {
              dispatch(changeAllSource('1', e.target.checked));
            }}
          >
            {__('common.noGoods_name11')}
          </Checkbox>
        ),
        dataIndex: '1',
        render: text => {
          return Object.entries(text).map(([i, v]) => (
            <div>
              <Checkbox
                checked={v.checked}
                onChange={e => {
                  dispatch(changeNoGoodsList('1', i, e.target.checked));
                }}
              >
                {v.value}
              </Checkbox>
            </div>
          ));
        }
      },
      {
        className:styles.verticalAlign,
        title: (
          <Checkbox
            onChange={e => {
              dispatch(changeAllSource('2', e.target.checked));
            }}
          >
            {__('common.noGoods_name12')}
          </Checkbox>
        ),
        dataIndex: '2',
        render: text => {
          return Object.entries(text).map(([i, v]) => (
            <div>
              <Checkbox
                checked={v.checked}
                onChange={e => {
                  dispatch(changeNoGoodsList('2', i, e.target.checked));
                }}
              >
                {v.value}
              </Checkbox>
            </div>
          ));
        }
      },
      {
        className:styles.verticalAlign,
        title: (
          <Checkbox
            onChange={e => {
              dispatch(changeAllSource('3', e.target.checked));
            }}
          >
            {__('common.noGoods_name13')}
          </Checkbox>
        ),
        dataIndex: '3',
        render: text => {
          return Object.entries(text).map(([i, v]) => (
            <div>
              <Checkbox
                checked={v.checked}
                onChange={e => {
                  dispatch(changeNoGoodsList('3', i, e.target.checked));
                }}
              >
                {v.value}
              </Checkbox>
            </div>
          ));
        }
      }
    ];

    return (
      <div style={{ marginTop: 20 }}>
        {/* 全部商品 */}
        <Button onClick={this.selectAllGoods} style={{ marginRight: 10 }}>
          {' '}
          {__('common.order_operation11')}
        </Button>
        {/* 批量无货审核 */}
        <Button
          onClick={() => {
            dispatch(noStockApply(batchChooseGoods));
          }}
          style={{ marginRight: 10 }}
        >
          {' '}
          {__('common.order_operation12')}
        </Button>
        {/* 批量无货 */}
        <Button
          onClick={() => {
            //if (_batchChooseGoods !== batchChooseGoods) {
            dispatch(noStock(batchChooseGoods));
            //  _batchChooseGoods = batchChooseGoods;
            //} else {
            //  dispatch(change('showBatchNoGoods', true));
            //}
          }}
        >
          {' '}
          {__('common.order_operation13')}
        </Button>
        {/* 弹窗 */}
        <Modal
          title={
            showShelfNoGoods
              ? __('common.noGoods_name14')
              : __('common.noGoods_name15')
          }
          visible={showBatchNoGoods}
          onCancel={this.handleCancel}
          footer={null}
        >
          {/* 无货下架 */}
          {showShelfNoGoods ? (
            <div>
              <div style={{ marginTo: 10, marginBottom: 10 }}>
                <RadioGroup
                  options={options}
                  onChange={e => {
                    dispatch(change('down', e.target.value));
                  }}
                  value={down}
                />
              </div>
              <div>{__('common.noGoods_name16')}</div>
              <Table
                dataSource={dataSource_noGoods}
                columns={columns_noGoods}
                pagination={false}
              />
              <div style={{ marginTop: 20, textAlign: 'center' }}>
                <Button
                  onClick={() => {
                    dispatch(change('showShelfNoGoods', false));
                    dispatch(change('down', ''));
                    dispatch(changeAllSource(['1','2','3'], false));
                  }}
                  style={{ marginRight: 10 }}
                >
                  {__('common.cancel')}
                </Button>
                <Button onClick={this.submit}>{__('common.submit')}</Button>
              </div>
            </div>
          ) : null}
          {/* 库存清单 */}
          {!showShelfNoGoods ? (
            <div>
              <div style={{ overflow: 'hidden', marginBottom: 10 }}>
                <span style={{ float: 'left' }}>sku:{data.sku}</span>
                <span style={{ float: 'right' }}>
                  {data.size ? data.size.replace(/\<br \/\>/, ' ') : null}
                </span>
              </div>
              <Table
                dataSource={dataSource}
                columns={columns}
                pagination={false}
              />
              <div style={{ marginTop: 20, textAlign: 'center' }}>
                <Button onClick={this.handleCancel} style={{ marginRight: 10 }}>
                  {__('common.cancel')}
                </Button>
                <Button
                  style={{ marginRight: 10 }}
                  onClick={() => {
                    dispatch(change('showShelfNoGoods', true));
                    if (!dataSource_noGoods.length) dispatch(getNoGoodsList());
                  }}
                >
                  {__('common.noGoods_name17')}
                </Button>
                <Button
                  onClick={() => {
                    dispatch(returnAlreadyAudit(batchChooseGoods));
                  }}
                >
                  {__('common.noGoods_name18')}
                </Button>
              </div>
            </div>
          ):null}
        </Modal>
      </div>
    );
  }
  selectAllGoods = () => {
    const { dispatch, dataSource } = this.props;
    const { selectAllStateStatus } = this.state;
    let arr;
    if (!selectAllStateStatus) {
      let checkboxChecked = {
        5: 1, // 需要退款
        20: 1, // 换货
        7: 1, // 已经退款
        74: 1, // 删除换货
        75: 1, // COD客服取消
        82: 1 // COD用户取消"
      };
      arr = dataSource
        .map(v => v.order_goods)
        .reduce((all, v) => all.concat(v))
        .filter(v => !checkboxChecked[v.goods_status])
        .map(v => v.order_goods_id);
    } else {
      arr = [];
    }
    dispatch(change('batchChooseGoods', arr));
    this.setState({ selectAllStateStatus: !selectAllStateStatus });
  };
  handleCancel = () => {
    const {dispatch} = this.props;
    dispatch(change('showShelfNoGoods', false));
    dispatch(change('showBatchNoGoods', false));
    dispatch(change('down', ''));
    dispatch(changeAllSource(['1','2','3'], false));
  };
  submit = () => {
    const {
      dispatch,
      stockList: { sku, size },
      dataSource_noGoods,
      batchChooseGoods,
      down
    } = this.props;
    let site = [];
    if (dataSource_noGoods.length) {
      let data = dataSource_noGoods[0];
      for (let v in data) {
        for (let i in data[v]) {
          if (data[v][i].checked) {
            site.push(data[v][i].value);
          }
        }
      }
    }
    let param = {
      sku,
      size,
      site: site.length ? site.join(',') : '',
      down: down,
      order_goods_id: batchChooseGoods.length ? batchChooseGoods.join(',') : ''
    };
    dispatch(underCarriage(param));
  };
}
TabsHeader.propTypes = {
  dispatch: PropTypes.func,
  dataSource: PropTypes.arrayOf(PropTypes.shape()),
  batchChooseGoods: PropTypes.arrayOf(PropTypes.shape()) // 商品状态 - 高
};
export default TabsHeader;
