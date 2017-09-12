/**
 * Create by liufeng on 2017/9/7
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import assign from 'object-assign';
import { Radio, Tag, Spin, Input, Button, message, Popover, Icon, Upload, Checkbox } from 'antd';
import { connect } from 'react-redux';
import {
  commit, change, initFeedback, initFeedbackType, submitData, initData,
  changeSelectOptions,
} from './action';

import Styles from './style.css';

const RadioGroup = Radio.Group;
const TextArea = Input.TextArea;
const CheckboxGroup = Checkbox.Group;
const star = (<span style={{ color: 'red' }}>*</span>);

const content = (
  <p>渠道说明：<br />
    TKS反馈：客户通过提交Tickets向客服反馈的问题 <br />
    支付平台：客户在PayPal WP平台反馈的问题 <br />
    公关平台：客户在国外第三方评价平台(如：trustpilot)反馈的问题 <br />
    产品评论：客户直接在网站上产品页的产品评论 <br />
    仓库质检：仓库质检人员在退货入仓时检查反馈的问题 <br />
    平台反馈：亚马逊、速卖通等平台上订单，用户反馈的问题 <br />
    退货中心：客户主动申请退货后，自动生成的品控问题 <br />
    红人营销：作为红人营销推广的商品，收到的反馈问题</p>
);

const checkImage = (file) => {
  if (file.size && file.size >= 3 * 1024 * 1024) {
    message.error('上传图片尺寸上限3M', 5);
    return false;
  }
  if (file.type && (file.type !== 'image/jpeg' && file.type !== 'image/png')) {
    message.error('请上传正确的图片格式123', 5);
    return false;
  }
  return true;
};

class goodsControlEdit extends Component {
  constructor(props) {
    super(props);
    const { dispatch } = props;
    const query = JSON.parse(props.location.query.data);
   // console.log(query, 'query-edit');
    dispatch(change('queryVal', query));
    dispatch(initFeedback());
    dispatch(initFeedbackType());
    dispatch(initData(query.order_id, query.id));
  }

  render() {
    const {
      dispatch, fetchFeedback, fetchFeedbackType, queryString, queryVal,
    } = this.props;
    const {
      order_id, billno, goods_id, goods_sn, serial_number, attr,
      feedback_type, feedback_reason, feedback_thumb, remark,
    } = queryString;
    return (
      <div className={Styles.content}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!feedback_reason || !feedback_type) {
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
          <h2> 订单号: {queryVal.billno}</h2>
          <div className={Styles.reasonImg}>
            <span className={Styles.descWidth}>提交品控商品</span>
            <div style={{ display: 'flex' }}>
              <div className={Styles.reasonImg} style={{ margin: '0 15px' }}>
                <span style={{ margin: '0 10px' }}>{queryVal.serial_number}</span>
                <img src={queryVal.pic} width="80px" height="80px" alt="goods images" />

                <div>
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
              &nbsp;&nbsp;{star}反馈渠道
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
            <span className={Styles.descWidth}>{star}品控类型</span>
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
          <div className={Styles.reason}>
            <span className={Styles.descWidth}>
              图片(上限两张)
            </span>
            <div>
              <Upload
                className={Styles.uploader}
                name="files[]"
                action="/index_new.php/Order/AfterSaleAccident/saveQcImg?&language=zh"
                showUploadList={false}
                data={{ goods_id: 123 }}
                beforeUpload={file => checkImage(file)}
                onChange={(info) => {
                  if (info.file.status === 'done') {
                    if (info.file.response.code !== '0') {
                      message.error(info.file.response.msg, 10);
                    } else {
                      message.success(`${info.file.name} 上传成功。`, 10);
                      dispatch(commit('imgUrl', info.file.response.info.data[0].path));
                    }
                  } else if (info.file.status === 'error') {
                    message.error(`${info.file.name} 上传失败。`, 10);
                  }
                }}
              >
                {
                  feedback_thumb ?
                    <img src={feedback_thumb} alt="model" className={Styles.uploaderImg} />
                    :
                    <Icon type="plus" className={Styles.uploaderTrigger} />
                }
              </Upload>
              <Upload
                className={Styles.uploader}
                name="files[]"
                action="/index_new.php/Order/AfterSaleAccident/saveQcImg?&language=zh"
                showUploadList={false}
                data={{ goods_id: 123 }}
                beforeUpload={file => checkImage(file)}
                onChange={(info) => {
                  if (info.file.status === 'done') {
                    if (info.file.response.code !== '0') {
                      message.error(info.file.response.msg, 10);
                    } else {
                      message.success(`${info.file.name} 上传成功。`, 10);
                      dispatch(commit('imgUrl', info.file.response.info.data[0].path));
                    }
                  } else if (info.file.status === 'error') {
                    message.error(`${info.file.name} 上传失败。`, 10);
                  }
                }}
              >
                {
                  feedback_thumb ?
                    <img src={feedback_thumb} alt="model" className={Styles.uploaderImg} />
                    :
                    <Icon type="plus" className={Styles.uploaderTrigger} />
                }
              </Upload>
            </div>

          </div>
          <div className={Styles.mark}>
            <span className={Styles.descWidth}>{__('order.goodsRefund.mark')}：</span>
            <TextArea
              placeholder="备注信息" autosize={{ minRows: 2, maxRows: 6 }} style={{ width: '65%' }}
              value={remark}
              onChange={e => dispatch(commit('remark', e.target.value))}
            />
          </div>
          <Button style={{ margin: '15px 80px 80px 0', left: '20%' }}>取消</Button>
          <Button
            style={{ margin: '15px 80px 80px 0', left: '20%' }}
            type="primary" htmlType="submit"
          //  loading={submitLoad}
          >提交</Button>
        </form>
      </div>
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
};

const mapStateToProps = state => state['order/details/goods-control/edit'];
export default connect(mapStateToProps)(goodsControlEdit);
