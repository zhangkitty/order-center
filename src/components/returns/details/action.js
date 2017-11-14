import * as TYPES from './types';


export const getOrderReturnDetail=(id)=>({
  type:TYPES.GETORDERRETURNDETAIL,
    id,
})

export const getOrderReturnDetailSuccess=(data)=>({
  type:TYPES.GETORDERRETURNDETAILSUCCESS,
    data,
})
