import React from 'react';

const lan = {

  need_a_refund_amount:'需要退款金额'
}

const Price = ({dataSource,submitValue,dispatch})=>{
  return(
    <div>
      <div>{lan.need_a_refund_amount}</div>
    </div>
  )
}

export default Price