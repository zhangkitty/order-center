import React from 'react';
import { Input, Select, DatePicker, Button, Popconfirm } from 'antd';
import styles from './style.css';
import { search, change, operateMarkStatus, userMarkExport } from './action';


const lan = {
  订单号: '订单号',
  付款日期: '付款日期',
  处理人: '处理人',
  国家: '国家',
  处理结果: '处理结果',
  站点: '站点',
  处理状态: '处理状态',
  搜索: '搜索',
  批量导出: '批量导出',
  批量跟进中: '批量跟进中',
  批量已处理: '批量已处理',
  请选择: '请选择',
};

const head = (props) => {
  const {
    dispatch,
    billno,
    handler,
    handle_resultArr,
    handle_statusArr,
    handle_status,
    country_id,
    siteArr,
    countryArr,
    site_from,
    handle_result,
    selectedRows,
  } = props;
  const { RangePicker } = DatePicker;
  const Option = Select.Option;
  return (
    <div>
      <section className={styles.line}>
        <div className={styles.one}>
          <div className={styles.prefix}>{lan.订单号}</div>
          <div>
            <Input
              value={billno}
              onChange={
                  e => dispatch(change('billno', e.target.value))
              }
            />
          </div>
        </div>

        <div className={styles.one}>
          <div className={styles.prefix}>{lan.付款日期}</div>
          <div>
            <RangePicker
              className={styles.range}
              onChange={(data, dateString) => dispatch(change('data', dateString))}
            />
          </div>
        </div>

        <div className={styles.one}>
          <div className={styles.prefix}>{lan.处理状态}</div>
          <div >
            <Select
              allowClear
              className={styles.select}
              value={handle_status}
              onChange={value => dispatch(change('handle_status', value))}
            >
              {
                handle_statusArr.map((v, idx) => <Option value={idx}>{v}</Option>)
              }
            </Select>
          </div>
        </div>
      </section>
      <section className={styles.line}>
        <div className={styles.one}>
          <div className={styles.prefix}>{lan.处理人}</div>
          <div>
            <Input
              value={handler}
              onChange={e => dispatch(change('handler', e.target.value))}
            />
          </div>
        </div>
        <div className={styles.one}>
          <div className={styles.prefix}>{lan.国家}</div>
          <div >
            <Select
              allowClear
              placeholder={lan.请选择}
              className={styles.select}
              mode="multiple"
              value={country_id}
              onChange={value => dispatch(change('country_id', value))}
            >
              {
                countryArr.map(v =>
                  <Option value={v.country_id}>{v.country}</Option>,
                )
              }
            </Select>

          </div>
        </div>

        <div className={styles.one}>
          <div className={styles.prefix}>{lan.站点}</div>
          <div >
            <Select
              className={styles.select}
              placeholder={lan.请选择}
              mode="multiple"
              allowClear
              value={site_from}
              onChange={value => dispatch(change('site_from', value))}
            >
              {
                siteArr.map(v => <Option value={v.id}>{v.name}</Option>)
              }
            </Select>
          </div>

        </div>

        <div className={styles.one}>
          <div className={styles.prefix}>{lan.处理结果}</div>
          <div >
            <Select
              allowClear
              className={styles.select}
              value={handle_result}
              onChange={value => dispatch(change('handle_result', value))}
            >
              {
                handle_resultArr.map((v, idx) => <Option value={idx}>{v}</Option>)
              }
            </Select>
          </div>
        </div>
      </section>
      <section className={styles.three}>
        <Button
          className={styles.button}
          onClick={() => {
            dispatch(change('myhandle_result', 3));
            dispatch(change('id', selectedRows.map(v => v.id)));
            dispatch(change('processedShow', true));
          }}
        >{lan.批量已处理}</Button>
        <Popconfirm
          trigger="click"
          okText="确认"
          title="确认跟进这些订单号码"
          onConfirm={() => dispatch(operateMarkStatus(props))}
        >
          <Button
            className={styles.button}
            onClick={() => {
              dispatch(change('myhandle_result', 2));
              dispatch(change('id', selectedRows.map(v => v.id)));
            }}
          >{lan.批量跟进中}</Button>
        </Popconfirm>
        <Button
          onClick={() => dispatch(userMarkExport(props))}
          className={styles.button}
        >{lan.批量导出}</Button>
        <Button
          className={styles.button}
          onClick={() => dispatch(search(props))}
        >
          {lan.搜索}
        </Button>
      </section>
    </div>
  );
};

export default head;
