/**
 * Created by liufeng on 2017/10/11.
 */
/**
 * 自定义向下取多少位小数
 * example floor(123.32434, -2) => 123.32 向下取2位小数
 * @param  {Number}  value  The number.
 * @param  {Integer}  exp    The exponent (the 10 logarithm of the adjustment base).
 * @returns  {Number}      The adjusted value.
 */
export default (value, exp) => {
  // If the exp is undefined or zero...
  if (typeof exp === 'undefined' || +exp === 0) {
    return Math.floor(value);
  }
  value = +value;
  exp = +exp;
  // If the value is not a number or the exp is not an integer...
  if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
    return NaN;
  }
  // Shift
  value = value.toString().split('e');
  value = Math.floor(+(`${value[0]}e${value[1] ? (+value[1] - exp) : -exp}`));
  // Shift back
  value = value.toString().split('e');
  return +(`${value[0]}e${value[1] ? (+value[1] + exp) : exp}`);
};
