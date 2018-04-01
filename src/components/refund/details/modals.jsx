import React from 'react';
import PropTypes from 'prop-types';
import assign from 'object-assign';
import { Modal, Input, Button, message, Select } from 'antd';
import {
  commit,
  addRemark,
  rejectInfoAction,
  doRefund,
  refundTxnId,
  reverseRefundAction,
  reverseRefundSave,
  changeOrder,
  cancelTheRefundBillAction,
} from './action';
import styles from './style.css';

const star = (<span style={{ color: 'red' }}>*</span>);
const { TextArea } = Input;

const lan = {
  备注信息: __('common.content_name1'),
  新增备注: __('common.order_operation6'),
  备注: __('common.order_operation4'),
  确认: __('refund.details.submit'),
  取消: __('common.cancel'),
  50: __('refund.details.no_fifty'),
  200: __('refund.details.no_twohundernd'),
  退款驳回: __('common.refundBillStatus4'),
  驳回理由: __('refund.details.modals_rejec_reason'),
  '请填写驳回理由，必填': __('refund.details.modals_rejec_reason_tip'),
  确认退款: __('refund.details.modals_submit_refund'),
  退款金额: __('refund.details.base_refund_price'),
  退款路径: __('refund.details.base_refund_path'),
  交易凭证号: __('refund.details.modals_refund_protocal'),
  退款交易号: __('refund.details.modals_refund_protocal_number'),
  线下退款请填写此信息: __('refund.details.modals_tip_offline'),
  请填写退款交易凭证号: __('refund.details.modals_tip_need'),
  重新退款: __('refund.details.info_renfund_agian'),
  订单号: __('refund.details.order_number'),
  更改订单号: __('refund.details.change_order'),
  取消提现: __('refund.details.Cancel_withdrawal'),
  取消原因: __('refund.details.Reason_for_Cancellation'),
  取消原因不能为空: __('refund.details.Cancel_the_reason_can_not_be_empty'),
};
const TA = Input.TextArea;
const Option = Select.Option;
const Modals = ({
  remarkInfo,
  addRemarkInfo,
  rejectInfo,
  refundInfo,
  reverseRefund,
  refundBillId,
  changeOrderInfo,
  dispatch,
  cancelTheRefundBill,
  billno,
}) => (
  <div>
    {/* 备注信息 */}
    <Modal
      title={lan.备注信息}
      visible={remarkInfo.reamrkShow}
      footer={null}
      onCancel={() => dispatch(commit('remarkInfo', assign({}, remarkInfo, { reamrkShow: false })))}
    >
      {
        remarkInfo.remarkSource.length ?
          remarkInfo.remarkSource.map(v => (
            <div className={styles.modelCon} key={v.add_time}>
              <p>{v.add_time} {v.add_user}</p>
              <p>{v.remark}</p>
            </div>
        ))
          : '无信息'
      }
    </Modal>
    {/* 新增备注 */}
    <Modal
      title={lan.新增备注}
      visible={addRemarkInfo.reamrkShow}
      footer={null}
      onCancel={() => dispatch(commit('addRemarkInfo', assign({}, addRemarkInfo, { reamrkShow: false })))}
    >
      <form
        className={styles.addRemarkForm}
        onSubmit={(e) => {
          e.preventDefault();
          if (addRemarkInfo.remark.trim().length > 50) {
            return message.warning(lan[50]);
          }
          return dispatch(addRemark(refundBillId, addRemarkInfo));
        }}
      >
        <div className={styles.addRemarkArea}>
          <span className={styles.addRemarkSpan}>{lan.备注}{star}</span>
          <TA
            autosize={{ minRows: 4 }}
            required
            value={addRemarkInfo.remark}
            onChange={e => dispatch(commit('addRemarkInfo', assign({}, addRemarkInfo, { remark: e.target.value })))}
          />
        </div>
        <div className={styles.addRemarkBts}>
          <Button onClick={() => dispatch(commit('addRemarkInfo', assign({}, addRemarkInfo, { reamrkShow: false })))}>
            {lan.取消}
          </Button>
          <Button type={'primary'} htmlType={'submit'} loading={addRemarkInfo.load} >
            {lan.确认}
          </Button>
        </div>
      </form>
    </Modal>
    {/* 退款驳回 */}
    <Modal
      title={lan.退款驳回}
      visible={rejectInfo.reamrkShow}
      footer={null}
      onCancel={() => dispatch(commit('rejectInfo', assign({}, rejectInfo, { reamrkShow: false })))}
    >
      <form
        className={styles.addRemarkForm}
        onSubmit={(e) => {
          e.preventDefault();
          if (rejectInfo.reason.trim().length > 200) {
            return message.warning(lan[200]);
          }
          return dispatch(rejectInfoAction(refundBillId, rejectInfo));
        }}
      >
        <div className={styles.addRemarkArea}>
          <span className={styles.addRemarkSpan}>{lan.驳回理由}{star}</span>
          <TA
            autosize={{ minRows: 4 }}
            required
            placeholder={lan['请填写驳回理由，必填']}
            value={rejectInfo.reason}
            onChange={e => dispatch(commit('rejectInfo', assign({}, rejectInfo, { reason: e.target.value })))}
          />
        </div>
        <div className={styles.addRemarkBts}>
          <Button onClick={() => dispatch(commit('rejectInfo', assign({}, rejectInfo, { reamrkShow: false })))}>
            {lan.取消}
          </Button>
          <Button type={'primary'} htmlType={'submit'} loading={rejectInfo.load} >
            {lan.确认}
          </Button>
        </div>
      </form>
    </Modal>
    {/* 退款 */}
    <Modal
      title={lan.确认退款}
      visible={refundInfo.data.type <= 2}
      footer={null}
      onCancel={() => dispatch(commit('refundInfo', assign({}, refundInfo, { data: {} })))}
    >
      <form
        className={styles.addRemarkForm}
        onSubmit={(e) => {
          e.preventDefault();
          return dispatch(doRefund(refundInfo.data));
        }}
      >
        <div className={styles.addRemarkArea}>
          <span className={styles.addRemarkSpan}>{ lan.退款金额} : </span>
          <span>{refundInfo.data.price}</span>
        </div>
        <div>
          <span className={styles.addRemarkSpan}>{ lan.退款路径} : </span>
          <span>{refundInfo.data.refund_path_title}</span>
        </div>
        <div className={styles.addRemarkBts}>
          <Button onClick={() => dispatch(commit('refundInfo', assign({}, refundInfo, { data: {} })))}>
            {lan.取消}
          </Button>
          <Button type={'primary'} htmlType={'submit'} loading={refundInfo.saveLoad} >
            {lan.确认}
          </Button>
        </div>
      </form>
    </Modal>
    {/* 确认退款 */}
    <Modal
      title={lan.确认退款}
      visible={refundInfo.data.type === 3}
      footer={null}
      onCancel={() => dispatch(commit('refundInfo', assign({}, refundInfo, { data: {} })))}
    >
      <form
        className={styles.addRemarkForm}
        onSubmit={(e) => {
          e.preventDefault();
          return dispatch(doRefund(refundInfo.data));
        }}
      >
        <div className={styles.addRemarkArea}>
          <span className={styles.addRemarkSpan}>{ lan.退款金额} : </span>
          <span>{refundInfo.data.price}</span>
        </div>
        <div>
          <span className={styles.addRemarkSpan}>{ lan.退款路径} : </span>
          <span>{refundInfo.data.refund_path_title}</span>
        </div>
        <div>
          <span className={styles.addRemarkSpan}>{ lan.交易凭证号} : </span>
          <span>{refundInfo.data.order_txn_id}</span>
        </div>
        <div>
          <span className={styles.addRemarkSpan}>{ lan.退款交易号} : </span>
          <Input
            style={{ width: '50%' }}
            value={refundInfo.data.refund_txn_id}
            placeholder={lan.线下退款请填写此信息}
            onChange={e => dispatch(refundTxnId(e.target.value))}
          />
        </div>
        <div className={styles.addRemarkBts}>
          <Button onClick={() => dispatch(commit('refundInfo', assign({}, refundInfo, { data: {} })))}>
            {lan.取消}
          </Button>
          <Button type={'primary'} htmlType={'submit'} loading={refundInfo.saveLoad} >
            {lan.确认}
          </Button>
        </div>
      </form>
    </Modal>
    {/* 确认退款 */}
    <Modal
      title={lan.确认退款}
      visible={refundInfo.data.type === 4}
      footer={null}
      onCancel={() => dispatch(commit('refundInfo', assign({}, refundInfo, { data: {} })))}
    >
      <form
        className={styles.addRemarkForm}
        onSubmit={(e) => {
          e.preventDefault();
          return dispatch(doRefund(refundInfo.data));
        }}
      >
        <div className={styles.addRemarkArea}>
          <span className={styles.addRemarkSpan}>{lan.退款交易号}{star}</span>
          <TA
            autosize={{ minRows: 4 }}
            required
            value={refundInfo.data.refund_txn_id}
            placeholder={lan.请填写退款交易凭证号}
            onChange={e => dispatch(refundTxnId(e.target.value))}
          />
        </div>
        <div className={styles.addRemarkBts}>
          <Button onClick={() => dispatch(commit('refundInfo', assign({}, refundInfo, { data: {} })))}>
            {lan.取消}
          </Button>
          <Button type={'primary'} htmlType={'submit'} loading={refundInfo.saveLoad} >
            {lan.确认}
          </Button>
        </div>
      </form>
    </Modal>
    {/* 确认退款 */}
    <Modal
      title={lan.确认退款}
      visible={refundInfo.data.type === 5}
      footer={null}
      onCancel={() => dispatch(commit('refundInfo', assign({}, refundInfo, { data: {} })))}
    >
      <form
        className={styles.addRemarkForm}
        onSubmit={(e) => {
          e.preventDefault();
          return dispatch(doRefund(refundInfo.data));
        }}
      >
        <div className={styles.addRemarkArea}>
          <span className={styles.addRemarkSpan}>{ lan.退款金额} : </span>
          <span>{refundInfo.data.price}</span>
        </div>
        <div>
          <span className={styles.addRemarkSpan}>{ lan.退款路径} : </span>
          <span>{refundInfo.data.refund_path_title}</span>
        </div>
        <div className={styles.addRemarkBts}>
          <Button onClick={() => dispatch(commit('refundInfo', assign({}, refundInfo, { data: {} })))}>
            {lan.取消}
          </Button>
          <Button type={'primary'} htmlType={'submit'} loading={refundInfo.saveLoad} >
            {lan.确认}
          </Button>
        </div>
      </form>

    </Modal>
    {/* 重新退款 */}
    <Modal
      title={lan.重新退款}
      visible={reverseRefund.show}
      footer={null}
      onCancel={() => dispatch(commit('reverseRefund', assign({}, reverseRefund, { show: false })))}
    >
      <form
        className={styles.addRemarkForm}
        onSubmit={(e) => {
          e.preventDefault();
          return dispatch(reverseRefundSave(reverseRefund.data, refundBillId));
        }}
      >
        <div className={styles.addRemarkArea}>
          <span className={styles.addRemarkSpan}>{lan.退款路径}{star}</span>
          <Select
            required
            className={styles.colSpace}
            value={reverseRefund.data.refund_method}
            onChange={e => dispatch(reverseRefundAction('refund_method', e))}
            placeholder={__('common.choose')}
          >
            <Option key={__('common.refund_details1')} >{__('common.refund_details1')}</Option>
            <Option key={__('common.refund_details2')} >{__('common.refund_details2')}</Option>
            <Option key={__('common.refund_details3')} >{__('common.refund_details3')}</Option>
            <Option key={__('common.refund_details4')} >{__('common.refund_details4')}</Option>
            <Option key={__('common.refund_details5')} >{__('common.refund_details5')}</Option>
            <Option key={__('common.refund_details6')} >{__('common.refund_details6')}</Option>
            <Option key={__('common.refund_details7')} >{__('common.refund_details7')}</Option>
            {/* 注释 其他 */}
            {/*
            <Option key={__('common.refund_details8')} >{__('common.refund_details8')}</Option>
            */}
          </Select>
          {/*
          <Input
          required
          value={reverseRefund.data.refund_method}
          onChange={e => dispatch(reverseRefundAction('refund_method', e.target.value))}
          />
          */}
        </div>
        <div className={styles.addRemarkArea} style={{ marginTop: '10px' }}>
          <span className={styles.addRemarkSpan}>{lan.退款交易号}{star}</span>
          <Input
            required
            value={reverseRefund.data.refund_txn_id}
            onChange={e => dispatch(reverseRefundAction('refund_txn_id', e.target.value))}
          />
        </div>
        <div className={styles.addRemarkBts}>
          <Button onClick={() => dispatch(commit('reverseRefund', assign({}, reverseRefund, { show: false })))}>
            {lan.取消}
          </Button>
          <Button type={'primary'} htmlType={'submit'} loading={reverseRefund.saveLoad} >
            {lan.确认}
          </Button>
        </div>
      </form>
    </Modal>
    {/* 更改订单号 */}
    <Modal
      title={lan.更改订单号}
      visible={changeOrderInfo.show}
      footer={null}
      onCancel={() => dispatch(commit('changeOrderInfo', assign({}, changeOrderInfo, { show: false })))}
    >
      <form
        className={styles.addRemarkForm}
        onSubmit={(e) => {
          e.preventDefault();
          if (changeOrderInfo.billno.trim().length < 1) {
            return message.warning(__('refund.details.submitTitle'));
          }
          return dispatch(changeOrder(changeOrderInfo.billno, +changeOrderInfo.refund_record_id, refundBillId));
        }}
      >
        <div className={styles.addRemarkArea}>
          <span className={styles.addRemarkSpan}>{lan.订单号}</span>
          <Input
            style={{ width: '60%' }}
            value={changeOrderInfo.billno}
            onChange={e => dispatch(commit('changeOrderInfo', assign({}, changeOrderInfo, { billno: e.target.value })))}
          />
        </div>
        <div className={styles.addRemarkBts}>
          <Button onClick={() => dispatch(commit('changeOrderInfo', assign({}, changeOrderInfo, { show: false })))}>
            {lan.取消}
          </Button>
          <Button type={'primary'} htmlType={'submit'} loading={addRemarkInfo.load} >
            {lan.确认}
          </Button>
        </div>
      </form>
    </Modal>
    {/* 取消提现 */}
    <Modal
      title={lan.取消提现}
      visible={cancelTheRefundBill.show}
      onCancel={() => dispatch(commit('cancelTheRefundBill', assign({}, cancelTheRefundBill, { show: false })))}
      footer={null}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(commit('cancelTheRefundBill', assign({}, cancelTheRefundBill, { load: true })));
          if (cancelTheRefundBill.reasonRecord.trim().length < 1) {
            dispatch(commit('cancelTheRefundBill', assign({}, cancelTheRefundBill, { load: false })));
            return message.warning(lan.取消原因不能为空);
          }
          return dispatch(cancelTheRefundBillAction(refundBillId, cancelTheRefundBill.reasonRecord));
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div style={{ width: 60 }}>{lan.取消原因}</div>
          {star}
          <div style={{ paddingLeft: 20, width: 400 }}>
            <TextArea
              value={cancelTheRefundBill.reasonRecord}
              onChange={e => dispatch(commit('cancelTheRefundBill', assign({}, cancelTheRefundBill, { reasonRecord: e.target.value })))}
            />
          </div>
        </div>
        <div className={styles.addRemarkBts}>
          <Button onClick={() => dispatch(commit('cancelTheRefundBill', assign({}, cancelTheRefundBill, { show: false })))}>
            {lan.取消}
          </Button>
          <Button type={'primary'} htmlType={'submit'} loading={cancelTheRefundBill.load} >
            {lan.确认}
          </Button>
        </div>
      </form>
    </Modal>
  </div>
);
Modals.propTypes = {
  remarkInfo: PropTypes.shape(),
  addRemarkInfo: PropTypes.shape(),
  rejectInfo: PropTypes.shape(),
  refundInfo: PropTypes.shape(),
  reverseRefund: PropTypes.shape(),
  changeOrderInfo: PropTypes.shape(),
  dispatch: PropTypes.func,
  refundBillId: PropTypes.string,
};
export default Modals;
