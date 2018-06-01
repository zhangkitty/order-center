
import * as types from './types';

export const changeValue = (key, value) => ({ type: types.changeValue, key, value });

export const pointRewardConfig = () => ({ type: types.pointRewardConfig });

export const pointRewardList = (props, page, pageSize) => ({ type: types.pointRewardList, props, page, pageSize });

export const addPointRewardHandle = props => ({ type: types.addPointRewardHandle, props });

export const editPointRewardHandle = props => ({ type: types.editPointRewardHandle, props });

export const copyPointRewardHandle = props => ({ type: types.copyPointRewardHandle, props });

export const delPointReward = props => ({ type: types.delPointReward, props });

