/**
 * Created by liufeng on 2016/08/29.
 */
import assign from 'object-assign';

export const ZERO = Symbol('zero');

// const excludeArgumentValue = new Set([null, 0, '0', undefined, '']);
const excludeArgumentValue2 = new Set([null, undefined, '']);
const SymbolToValueMap = {
  [ZERO]: 0,
};

function getRawValue(val) {
  if (Object.prototype.hasOwnProperty.call(SymbolToValueMap, val)) {
    return SymbolToValueMap[val];
  }
  return val;
}

export const parseQuery = (keys, paramObject) => (
  keys
    .filter(key => !excludeArgumentValue2.has(paramObject[key]))
    .map(key => ({ [key]: getRawValue(paramObject[key]) }))
    .reduce((pre, cur) => assign(pre, cur), {})
);

export default (keys, paramObject) => (
  keys
    .filter(key => !excludeArgumentValue2.has(paramObject[key]))
    .map(key => `${key}=${getRawValue(paramObject[key])}`)
    .join('&')
);
