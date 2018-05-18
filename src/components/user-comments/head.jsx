import React from 'react';
import { Input, Select, DatePicker, Button } from 'antd';
import styles from './style.css';
import { search, change } from './action';


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
};

const head = (props) => {
  const { dispatch, billno, handler } = props;
  const { RangePicker } = DatePicker;
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
            <Select className={styles.select} />
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
            <Select className={styles.select} />
          </div>
        </div>

        <div className={styles.one}>
          <div className={styles.prefix}>{lan.站点}</div>
          <div >
            <Select className={styles.select} />
          </div>

        </div>

        <div className={styles.one}>
          <div className={styles.prefix}>{lan.处理结果}</div>
          <div >
            <Select className={styles.select} />
          </div>
        </div>
      </section>
      <section className={styles.three}>
        <Button className={styles.button}>{lan.批量已处理}</Button>
        <Button className={styles.button}>{lan.批量跟进中}</Button>
        <Button className={styles.button}>{lan.批量导出}</Button>
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
