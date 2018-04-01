/**
 * Created by zhanyaqi on 2016/12/30.
 */

export function isaNumberInRange(str, min, max, decimalDigits = 2) {
  if (/[^(\d\-.)]+/.test(str)) return false; // 只允许 . - 数字
  if (/\.[^.]*\./.test(str)) return false; // 不允许出现多个 .
  if (/([^\d]+|^)\./.test(str)) return false; // 不允许小数点的前面没有数字
  if (/(\S-|-$)/.test(str)) return false; // 只允许-出现在开头,有且最多只允许出现一次
  const reg = new RegExp(`\\.($|\\d{${decimalDigits + 1},}$)`); // 小数点后面只允许一位或者两位，且不能以小数点结尾
  if (reg.test(str)) return false;
  const num = parseFloat(str);
  if (num > max || num <= min) return false;
  return true;
}

export function isaPositiveNumber(str) {
  return isaNumberInRange(str, 0, Infinity, Infinity);
}

export function isaPositiveNumberOrZero(str, min, max, decimalDigits = 2) {
  if (/[^(\d\-.)]+/.test(str)) return false; // 只允许 . - 数字
  if (/\.[^.]*\./.test(str)) return false; // 不允许出现多个 .
  if (/([^\d]+|^)\./.test(str)) return false; // 不允许小数点的前面没有数字
  if (/(\S-|-$)/.test(str)) return false; // 只允许-出现在开头,有且最多只允许出现一次
  const reg = new RegExp(`\\.($|\\d{${decimalDigits + 1},}$)`); // 小数点后面只允许一位或者两位，且不能以小数点结尾
  if (reg.test(str)) return false;
  const num = parseFloat(str);
  if (num > max || num < min) return false;
  return true;
}

export function lengthNumber(str) {
  return str && isaNumberInRange(str, -Infinity, Infinity) && (str.length <= 10);
}

export function isInt(str, min, max) {
  if (/^(\d*)$/g.test(str)) {
    if (parseInt(str, 10) > max || parseInt(str, 10) < min) return false;
    return true;
  }
  return false;
}
