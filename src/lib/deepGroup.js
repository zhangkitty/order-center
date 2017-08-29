/**
 * Created by liufeng on 2016/08/29.
 */
import assign from 'object-assign';

function trans(arr) {
  return arr.reduce((acc, cur) => assign(acc, {
    [cur.id]: cur,
  }), {});
}
export default (arr) => {
  const obj = trans(arr);
  arr.forEach((item) => {
    if (item.pid) {
      obj[item.pid].children = obj[item.pid].children || [];
      obj[item.pid].children.push(item);
    }
  });
  return Object.keys(obj).filter(key => !obj[key].pid).map(key => obj[key]);
};
