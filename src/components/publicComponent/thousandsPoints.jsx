/**
 * Create by liufeng on 2017/9/15
 * 千分位
 */
import React from 'react';
import styles from './style.css';

const ThousandsPoints = (mo) => {
  const money = `${mo}`.split('');
  const negative = money[0] === '-';
  const ponitIndex = money.findIndex(v => v === '.') > -1 ? money.findIndex(v => v === '.') : money.length;
  const result = money.slice(negative ? 1 : 0, ponitIndex)
    .reverse()
    .map((v, i) => (
      i !== 0 && i % 3 === 0 ?
        <span className={styles.splitMoney} key={`split-${v}-${i}`}>{v}</span> : v
    ))
    .reverse()
    .concat(money.slice(ponitIndex));
//  console.log(mo, result);
  return (
    <span>
      {
        negative ?
          <span>-{result}</span> : result
      }
    </span>
  );
};

export default ThousandsPoints;
