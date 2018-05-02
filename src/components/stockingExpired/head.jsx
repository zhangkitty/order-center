import React from 'react';
import { Input, Button, Select, DatePicker } from 'antd';
import moment from 'moment';

import { change, getOverStockList } from './action';

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
  search: __('stockExpired.search'),
  订单类型: '订单类型',
  商品状态: '商品状态',
  是否COD: '是否COD',
};

const Option = Select.Option;
const { RangePicker } = DatePicker;
const Head = (props) => {
  const { InitInfo: { site } } = props;
  const { InitInfo: { overStockDate } } = props;
  const { chooseSite, chooseDays, dispatch, orderType, commodityStatus, isCod } = props;

  return (<div style={{ marginLeft: 40, marginTop: 20, marginBottom: 20 }}>
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <div style={{ flexBasis: 70, padding: '5px 10px', textAlign: 'right' }}>{lan.site}:</div>
      <Select
        style={{ flexBasis: 150 }}
        value={chooseSite}
        onChange={(value) => {
          dispatch(change('chooseSite', value));
        }
        }
      >
        <Option value="__ALL__">不限</Option>
        {
          site.map(v => (
            <Option value={v.id}>{v.name}:</Option>
          ))
        }
      </Select>
      <div style={{ flexBasis: 150, padding: '5px 10px 5px 0', textAlign: 'right' }}>{lan.overDate}:</div>
      <Select
        style={{ flexBasis: 100 }}
        value={chooseDays}
        onChange={value => dispatch(change('chooseDays', value))}
      >
        <Option value="__ALL__">不限</Option>
        {
          overStockDate.map(v => (
            <Option value={v.name}>{v.name}</Option>
          ))
        }
      </Select>
      <div style={{ marginLeft: 30, padding: '5px 10px 5px 0', textAlign: 'right' }}>SKU:</div>
      <Input
        style={{ flexBasis: 100 }}
        onChange={e => dispatch(change('SKU', e.target.value))}
      />

      <div style={{ marginLeft: 30, padding: '5px 10px 5px 0', textAlign: 'right' }}>{lan.订单类型}:</div>
      <Select
        style={{ flexBasis: 100 }}
        value={orderType}
        onChange={value => dispatch(change('orderType', value))}
      >
        <Option key={1}>
          2
        </Option>
      </Select>
      <div style={{ marginLeft: 30, padding: '5px 10px 5px 0', textAlign: 'right' }}>{lan.商品状态}:</div>
      <Select
        style={{ flexBasis: 100 }}
        value={commodityStatus}
        onChange={value => dispatch(change('commodityStatus', value))}
      >
        <Option key={1}>
          1
        </Option>
        <Option key={2}>
          2
        </Option>
      </Select>
    </div>

    <div style={{ display: 'flex', flexDirection: 'row', marginTop: 10 }}>
      <div style={{ flexBasis: 70, padding: '5px 10px 5px 0', textAlign: 'right' }}>{lan.order}:</div>
      <Input
        style={{ flexBasis: 150, display: 'block' }}
        onChange={e => dispatch(change('billno', e.target.value))}
      />
      <div style={{ flexBasis: 150, padding: '5px 10px 5px 0', textAlign: 'right' }}>{lan.verifyDate}:</div>
      <RangePicker
        defaultValue={[moment().subtract(29, 'days'), moment()]}
        onChange={data => dispatch(change('dataRange', data))}
      />
      <div style={{ marginLeft: 30, padding: '5px 10px 5px 0', textAlign: 'right' }}>{lan.是否COD}:</div>
      <Select
        style={{ flexBasis: 100 }}
        value={isCod}
        onChange={value => dispatch('isCod', value)}
      >
        <Option value={1}>是</Option>
        <Option value={1}>是</Option>
      </Select>
      <Button
        style={{ marginLeft: '10px' }}
        onClick={() => dispatch(getOverStockList(props))}
      >{lan.search}</Button>
    </div>
  </div>);
};

export default Head;
