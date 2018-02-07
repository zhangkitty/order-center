import * as TYPES from './types';

export const initManualSyncMallOrder = () => ({
  type: TYPES.INITMANUALSYNCMALLORDER,
});

export const change = (key, value) => ({
  type: TYPES.CHANGE,
  key,
  value,
});

export const submit = value => ({
  type: TYPES.SUBMIT,
  value,
});
