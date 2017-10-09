/**
 * Create by liufeng on 2017/9/7
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import assign from 'object-assign';
import { Radio, Tag, Spin, Input, Button, message, Popover, Icon, Upload, Checkbox } from 'antd';
import { connect } from 'react-redux';
import {
  init, commit, change, initFeedback, initFeedbackType, submitData, initData,
  changeSelectOptions,
} from './action';

import Styles from './style.css';

const RadioGroup = Radio.Group;
const TextArea = Input.TextArea;
const CheckboxGroup = Checkbox.Group;
const star = (<span style={{ color: 'red' }}>*</span>);

const content = (
  <p>
    {__('order.goods-control.channel_title')} <br />
    {__('order.goods-control.channel_title1')}<br />
    {__('order.goods-control.channel_title2')}<br />
    { __('order.goods-control.channel_title3')}<br />
    {__('order.goods-control.channel_title4')}<br />
    {__('order.goods-control.channel_title5')}<br />
    {__('order.goods-control.channel_title6')}<br />
    {__('order.goods-control.channel_title7')}<br />
    {__('order.goods-control.channel_title8')}<br />
  </p>
);


const checkImage = (file) => {
  if (file.size && file.size >= 3 * 1024 * 1024) {
    message.error(__('order.goods-control.submitTitle'), 5);
    return false;
  }
  if (file.type && (file.type !== 'image/jpeg' && file.type !== 'image/png')) {
    message.error(__('order.goods-control.submitTitle1'), 5);
    return false;
  }
  return true;
};

class goodsControlEdit extends Component {
  constructor(props) {
    super(props);
    const { dispatch } = props;
    dispatch(init()); // 清空数据
    const query = JSON.parse(props.location.query.data);
    dispatch(change('queryVal', query));
    dispatch(initFeedback());
    dispatch(initFeedbackType());
    setTimeout(dispatch(initData(query.order_id, query.id)), 30000);
   // dispatch(initData(query.order_id, query.id));
  }

  render() {
    const {
      dispatch, fetchFeedback, fetchFeedbackType, queryString, queryVal, load, loadInit, submitLoad,
    } = this.props;
    const {
      order_id, billno, goods_id, goods_sn, serial_number, attr,
      feedback_type, feedback_reason, feedback_thumb, remark,
    } = queryString;
    return (
      <Spin spinning={loadInit}>
      <div className={Styles.content}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!feedback_reason || !feedback_type) {
              return message.warning(__('order.goodsRefund.missing_something'));
            } else if (feedback_reason.length < 1) {
              return message.warning(__('order.goodsRefund.missing_something'));
            }
            return dispatch(submitData(assign({},
              queryString, {
                order_id: queryVal.order_id,
                billno: queryVal.billno,
                goods_id: queryVal.id,
                goods_sn: queryVal.sku,
                feedback_reason: feedback_reason.children,
              })));
          }}
        >
          <h2>{__('order.goods-control.order_number')}: {queryVal.billno}</h2>
          <div className={Styles.reasonImg}>
            <span className={Styles.descWidth}>{__('order.goods-control.control_goods')}</span>
            <div style={{ display: 'flex' }}>
              <div className={Styles.reasonImg} style={{ margin: '0 15px' }}>
                <span style={{ margin: '0 10px' }}>{queryVal.serial_number}</span>
                <img src={queryVal.pic} width="80px" height="80px" alt="goods images" />
                <div className={Styles.goods_attr}>
                  {queryVal.sku} <br />
                  {queryVal.attr}
                </div>
              </div>
            </div>
          </div>
          <div className={Styles.reason}>
            <span className={Styles.descWidth}>
              <Popover placement="bottomLeft" content={content}>
                <Icon type="question-circle" />
              </Popover>
              &nbsp;&nbsp;{star}{__('order.goods-control.control_channel')}
            </span>
            <RadioGroup
              value={Number(feedback_type)}
              onChange={e => dispatch(commit('feedback_type', Number(e.target.value)))}
            >
              {
                fetchFeedback.map(item => (
                  <Radio value={Number(item.id)} key={Number(item.id)}>{item.name}</Radio>
                ))
              }
            </RadioGroup>
          </div>

          <div className={Styles.reason}>
            <span className={Styles.descWidth}>{star}{__('order.goods-control.control_type')}</span>
            <div className={Styles.reasonitemBg}>
              {
                fetchFeedbackType.map(({ name, children }) => (
                  <div key={name} className={Styles.reasonitem}>
                    <Tag color="#919191" style={{ textAlign: 'center', marginBottom: '10px' }}>
                      {name}
                    </Tag>
                    <CheckboxGroup
                      options={children.map(item => ({ label: item.name, value: item.id }))}
                      value={feedback_reason.name === name ? feedback_reason.children : []}
                      onChange={value => dispatch(changeSelectOptions(value, name))}
                    />
                  </div>
                ))
              }
            </div>
          </div>
          <div className={Styles.reason}>
            <span className={Styles.descWidth}>
              {__('order.goods-control.control_img')}
            </span>
            <div>
              {
                feedback_thumb.length < 1 ?
                  null
                  :
                  feedback_thumb.map(v => (
                    <div className={Styles.uploaderImgBg}>
                      <Button
                        className={Styles.delete}
                        onClick={() =>
                          dispatch(commit('feedback_thumb', feedback_thumb.filter(x => x !== v)))
                        }
                      >X</Button>
                      <img src={v} alt="model" className={Styles.uploaderImg} />
                    </div>
                  ))
              }
              {
                feedback_thumb.length < 2 ?
                  <Upload
                    className={Styles.uploader}
                    name="files[]"
                    action="/index_new.php/Order/OrderReturn/handleImg"
                    showUploadList={false}
                    data={{ goods_id: queryVal.id, type: 1 }}
                    beforeUpload={file => checkImage(file)}
                    onChange={(info) => {
                      if (info.file.status === 'done') {
                        if (info.file.response.code !== 0) {
                          message.error(info.file.response.msg, 10);
                        } else {
                          message.success(`${info.file.name} ${__('order.goods-control.submitTitle2')}`, 10);
                          dispatch(commit('feedback_thumb', [...feedback_thumb, info.file.response.data[0]]));
                        }
                      } else if (info.file.status === 'error') {
                        message.error(`${info.file.name} ${__('order.goods-control.submitTitle3')}`, 10);
                      }
                    }}
                  >
                    <Icon type="plus" className={Styles.uploaderTrigger} />
                  </Upload>
                  : null
              }
              <Tag color="#919191" style={{ textAlign: 'center', marginBottom: '10px' }}>
                {__('order.goods-control.control_title')}
              </Tag>
            </div>

          </div>
          <div className={Styles.mark}>
            <span className={Styles.descWidth}>{__('order.goodsRefund.mark')}</span>
            <TextArea
              // placeholder="备注信息"
              autosize={{ minRows: 2, maxRows: 6 }}
              style={{ width: '65%' }}
              value={remark}
              onChange={e => dispatch(commit('remark', e.target.value))}
            />
          </div>
          {/*
           <Button style={{ margin: '15px 80px 80px 0', left: '20%' }}>取消</Button>
          */}
          <Button
            style={{ margin: '15px 80px 80px 0', left: '20%' }}
            type="primary" htmlType="submit"
            loading={submitLoad}
          >{__('order.goods-control.submitName3')}</Button>
        </form>
      </div>
      </Spin>
    );
  }
}

goodsControlEdit.propTypes = {
  dispatch: PropTypes.func,
  fetchFeedback: PropTypes.arrayOf(PropTypes.shape()),
  fetchFeedbackType: PropTypes.arrayOf(PropTypes.shape()),
  queryString: PropTypes.shape(),
  location: PropTypes.shape(),
  queryVal: PropTypes.shape(),
  load: PropTypes.bool,
  loadInit: PropTypes.bool,
  submitLoad: PropTypes.bool,
};

const mapStateToProps = state => state['order/details/goods-control/edit'];
export default connect(mapStateToProps)(goodsControlEdit);
