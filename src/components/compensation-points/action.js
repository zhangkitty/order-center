
import * as types from './types';

export const changeValue = (key, value) => ({ type: types.changeValue, key, value });

export const pointRewardConfig = () => ({ type: types.pointRewardConfig });

export const pointRewardList = (props, page, pageSize) => ({ type: types.pointRewardList, props, page, pageSize });
