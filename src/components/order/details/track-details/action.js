import * as TYPES from './types';

export const getInitData = id => ({
  type: TYPES.GET_INIT_DATA,
  id,
});

export const putData = data => ({
  type: TYPES.PUT_DATA,
  data,
});
