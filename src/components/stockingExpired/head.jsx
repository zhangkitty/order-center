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
};

const Option = Select.Option;
const { RangePicker } = DatePicker;
const Head = (props) => {
  const { InitInfo: { site } } = props;
  const { InitInfo: { overStockDate } } = props;
  const { chooseSite, chooseDays, dispatch } = props;

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
        {
          site.map(v => (
            <Option value={v.name} key={v.id}>{v.name}:</Option>
          ))
        }
      </Select>
      <div style={{ flexBasis: 150, padding: '5px 10px 5px 0', textAlign: 'right' }}>{lan.overDate}:</div>
      <Select
        style={{ flexBasis: 100 }}
        value={chooseDays}
        onChange={value => dispatch(change('chooseDays', value))}
      >
        {
          overStockDate.map(v => (
            <Option key={v.id} value={v.name}>{v.name}</Option>
          ))
        }
      </Select>
      <div style={{ marginLeft: 30, padding: '5px 10px 5px 0', textAlign: 'right' }}>SKU:</div>
      <Input
        style={{ flexBasis: 100 }}
        onChange={e => dispatch(change('SKU', e.target.value))}
      />
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
      <Button
        style={{ marginLeft: '10px' }}
        onClick={() => dispatch(getOverStockList(props))}
      >{lan.search}</Button>
    </div>
  </div>);
};

export default Head;
