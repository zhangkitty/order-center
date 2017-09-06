import * as TYPES from './types';
export const commit = (key, value) => ({
  type: TYPES.COMMIT,
  key,
  value,
});