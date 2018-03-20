import React from 'react';
import { Input, Button, Select, DatePicker } from 'antd';

import { change, getOverStockList } from './action';


const Option = Select.Option;
const { RangePicker } = DatePicker;
const Head = (props) => {
  const lan = {
    站点: '站点',
    订单号: '订单号',
    超过审核天数: '超过审核天数',
    审核时间: '审核时间',
    搜索: '搜索',
  };
  const { InitInfo: { site } } = props;
  const { InitInfo: { overStockDate } } = props;
  const { chooseSite, chooseDays, dispatch } = props;

  return (<div style={{ marginLeft: 40, marginTop: 20, marginBottom: 20 }}>
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <div style={{ flexBasis: 50, padding: '5px 10px', textAlign: 'right' }}>{lan.站点}:</div>
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
      <div style={{ flexBasis: 100, padding: '5px 10px 5px 0', textAlign: 'right' }}>{lan.超过审核天数}:</div>
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
      <div style={{ flexBasis: 50, padding: '5px 10px 5px 0', textAlign: 'right' }}>{lan.订单号}:</div>
      <Input
        style={{ flexBasis: 150, display: 'block' }}
        onChange={e => dispatch(change('billno', e.target.value))}
      />
      <div style={{ flexBasis: 100, padding: '5px 10px 5px 0', textAlign: 'right' }}>{lan.审核时间}:</div>
      <RangePicker
        onChange={data => dispatch(change('dataRange', data))}
      />
      <Button
        style={{ marginLeft: '10px' }}
        onClick={() => dispatch(getOverStockList(props))}
      >{lan.搜索}</Button>
    </div>
  </div>);
};

export default Head;
