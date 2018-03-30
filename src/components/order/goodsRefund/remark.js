import { Input, Button } from 'antd';
import React from 'react';
import PropTypes from 'prop-types';
import { reset, change, submit } from './action';
import style from './style.css';


const TextArea = Input.TextArea;

const Remark = (props) => {
  const { remark, dispatch, submitLoad, refundPaths } = props;
  return (<div>
    <div className={style.mark}>
      <span className={style.descWidth}>{__('order.goodsRefund.mark')}：</span>
      <TextArea
        placeholder={__('common.content_name1')}
        autosize={{ minRows: 2, maxRows: 6 }}
        style={{ width: '60%' }}
        value={remark}
        onChange={e => dispatch(change('remark', e.target.value))}
      />
    </div>
    <Button
      style={{ margin: '15px 80px 80px 0', left: '20%' }}
      onClick={() => dispatch(change('remark', ''))}
    >
      {__('common.cancel')}
    </Button>
    <Button
      style={{ margin: '15px 80px 80px 0', left: '20%' }}
      type="primary"
      // htmlType="submit"
      disabled={submitLoad}
      onClick={(e) => {
        dispatch(submit(props));
      }}
    >{__('common.submit')}</Button>
  </div>);
};


Remark.propTypes = {
  dispatch: PropTypes.func,
  remark: PropTypes.string,
  submitLoad: PropTypes.bool,

};

export default Remark;

