
import React from 'react';
import { Modal } from 'antd';

import { change } from './action';

const exchangeshowModal = (props) => {
  const { dispatch, ExchangeShow } = props;
  console.log(1111);
  return (
    <Modal
      visible={ExchangeShow}
      onCancel={dispatch(change('ExchangeShow', false))}
    >
      111111
    </Modal>
  );
};
export default exchangeshowModal;
