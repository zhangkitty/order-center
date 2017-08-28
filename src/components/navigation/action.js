/**
 * Created by mac on 2017/7/7.
 */
import CLOSE_ROUTE, { COMMIT } from './type';

export const commit = (key, value) => ({
  key,
  value,
  type: COMMIT,
});
export const closeRoute = (index, arr) => ({
  type: CLOSE_ROUTE,
  index,
  arr,
});