import React from 'react';
import PropTypes from 'prop-types';
import assign from 'object-assign';
import { Modal, Input, Button, message } from 'antd';
import { commit, addRemark, rejectInfoAction, doRefund, refundTxnId, reverseRefundAction, reverseRefundSave } from './action';
import styles from './style.css';

// TODO: lan
const lan = {
  备注信息: '备注信息',
  新增备注: '新增备注',
  备注: '备注',
  确认: '确认',
  取消: '取消',
  50: '不可超过50个字符',
  200: '不可超过200个字符',
  退款驳回: '退款驳回',
  驳回理由: '驳回理由',
  '请填写驳回理由，必填': '请填写驳回理由，必填',
  确认退款: '确认退款',
  退款金额: '退款金额',
  退款路径: '退款路径',
  交易凭证号: '交易凭证号',
  退款交易号: '退款交易号',
  线下退款请填写此信息: '线下退款请填写此信息',
  请填写退款交易凭证号: '请填写退款交易凭证号',
  重新退款: '重新退款',
};
const TA = Input.TextArea;
const Modals = ({
                  remarkInfo,
                  addRemarkInfo,
                  rejectInfo,
                  refundInfo,
                  reverseRefund,
                  refundBillId,
    dispatch,
}) => (
  <div>
    <Modal
      title={lan.备注信息}
      visible={remarkInfo.reamrkShow}
      footer={null}
      onCancel={() => dispatch(commit('remarkInfo', assign({}, remarkInfo, { reamrkShow: false })))}
    >
      {
        remarkInfo.remarkSource.length ?
          remarkInfo.remarkSource.map(v => (
            <div style={{ margin: '10px 20px' }} key={v.add_time}>
              <p>{v.add_time} {v.add_user}</p>
              <p>{v.remark}</p>
            </div>
        ))
          : '无信息'
      }
    </Modal>
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
          <span className={styles.addRemarkSpan}>{lan.备注}</span>
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
          <span className={styles.addRemarkSpan}>{lan.驳回理由}</span>
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
          <Button type={'primary'} htmlType={'submit'} loading={refundInfo.load} >
            {lan.确认}
          </Button>
        </div>
      </form>
    </Modal>
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
          <Button type={'primary'} htmlType={'submit'} loading={refundInfo.load} >
            {lan.确认}
          </Button>
        </div>
      </form>
    </Modal>
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
          <span className={styles.addRemarkSpan}>{lan.退款交易号}</span>
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
          <Button type={'primary'} htmlType={'submit'} loading={addRemarkInfo.load} >
            {lan.确认}
          </Button>
        </div>
      </form>
    </Modal>
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
          return dispatch(reverseRefundSave(reverseRefund.data));
        }}
      >
        <div className={styles.addRemarkArea}>
          <span className={styles.addRemarkSpan}>{lan.退款路径}</span>
          <Input
            required
            value={reverseRefund.data.refund_method}
            onChange={e => dispatch(reverseRefundAction('refund_method', e.target.value))}
          />
        </div>
        <div className={styles.addRemarkArea} style={{ marginTop: '10px' }}>
          <span className={styles.addRemarkSpan}>{lan.退款交易号}</span>
          <Input
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
  </div>
);
Modals.propTypes = {
  remarkInfo: PropTypes.shape(),
  addRemarkInfo: PropTypes.shape(),
  rejectInfo: PropTypes.shape(),
  refundInfo: PropTypes.shape(),
  reverseRefund: PropTypes.shape(),
  dispatch: PropTypes.func,
  refundBillId: PropTypes.string,
};
export default Modals;
