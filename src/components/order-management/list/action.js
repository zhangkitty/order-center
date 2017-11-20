import * as TYPES from './types';

export const commit = (key, val) => ({
  type: TYPES.COMMIT,
  key,
  val,
});

export const exportLog = (date, index, data) => ({
  type: TYPES.LOG,
  date,
  index,
  data,
});

export const changeDate = (date, index) => ({
  type: TYPES.CHNAGE_DATE,
  date,
  index,
});
