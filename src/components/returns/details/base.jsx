import React from 'react';
import styles from './style.css';
import { Button } from 'antd';
import { Link } from 'react-router';
import { clickRefundedButton, clickAlreadyDoneButton } from './action';

const lan = {
  退货单基本信息: '退货单基本信息',
  退货单号: '退货单号',
  客户邮箱: '客户邮箱',
  退款状态: '退款状态',
  是否问题件: '是否问题件',
  运单类型: '运单类型',
  收货人国家: '收货人国家',
  包裹状态: '包裹状态',
  物流渠道: '物流渠道',
  是否付费: '是否付费',
  退货申请时间: '退货申请时间',
  运费险: '运费险',
  退货单状态: '退货单状态',
  回寄物流单号: '回寄物流单号',
  RL扣除费用: 'RL扣除费用',
  订单号: '订单号',
  新增备注: '新增备注',
  未退款: '未退款',
  已退款: '已退款',
  去退款: '去退款',
  已办结: '已办结',
};
const Base = ({
                dispatch, returnsInfoData, remarkInfo, params, tracking_no_url, buttonIsDone, buttonIsRefund,
}) => {
  const info = {
    left: [
      { name: lan.退货单号, key: 'returnOrderId' },
      { name: lan.客户邮箱, key: 'email' },
      { name: lan.退款状态, key: 'refundStatus' },
      { name: lan.是否问题件, key: 'troubleStatus' },
      { name: lan.运单类型, key: 'returnLabelType' },
    ],
    middle: [
      { name: lan.订单号, key: 'orderNo' },
      { name: lan.收货人国家, key: 'receiverCountry' },
      { name: lan.包裹状态, key: 'shippingStatus' },
      { name: lan.物流渠道, key: 'shippingType' },
      { name: lan.是否付费, key: 'freeReturn' },
    ],
    right: [
      { name: lan.退货申请时间, key: 'createTime' },
      { name: lan.运费险, key: 'insurance' },
      { name: lan.退货单状态, key: 'state' },
      { name: lan.回寄物流单号, key: 'trackingNo' },
      { name: lan.RL扣除费用, key: '' },
    ],
  };


  return (
    <div>
      <h3 style={{ margin: '20px 0' }}>{lan.退货单基本信息}</h3>
      <div className={styles.alertBg}>
        <div className={styles.baseBorder}>
          <div className={styles.baseSpace}>
            {info.left.map(({ name, key }) => (
              <div key={key}>
                <span className={styles.spanWidthL}>{name}:</span>
                {(function (key) {
                  if (key === 'refundStatus') {
                    if (returnsInfoData[key] === 0) { // oms to={`order/details/entry/${returnsInfoData.orderId}/${returnsInfoData.orderNo}`}
                      return <span>{lan.未退款} <Link target="_blank" to={`${returnsInfoData.refundrl}`}>{lan.去退款}</Link></span>;
                    }
                    return <span>{lan.已退款}</span>;
                  }
                  return <span>{returnsInfoData[key].toString()}</span>;
                }(key))}
              </div>
            ))}
          </div>
          <div className={styles.baseSpace}>
            {
              info.middle.map(v => (
                <div>
                  <span className={styles.spanWidthL}>
                    {v.name}:
                  </span>
                  {
                    (function (key) {
                      if (key === 'orderNo') {
                        return <Link target="_blank" to={`order/list/${returnsInfoData.orderNo}`}>{returnsInfoData[key]}</Link>;
                      }
                      return <span>{returnsInfoData[key]}</span>;
                    }(v.key))
                  }
                </div>
              ))
            }
          </div>
          <div className={styles.baseSpace}>
            {
              info.right.map(v => (
                <div>
                  <span className={styles.spanWidthL}>
                    {v.name}:
                  </span>
                  <span>

                    {
                      (function (key) {
                        if (key === 'trackingNo') {
                          return <a href={tracking_no_url} target="_blank">{returnsInfoData[key]}</a>;
                        }
                        return <span>{returnsInfoData[key]}</span>;
                      }(v.key))
                    }
                  </span>
                </div>
              ))
            }

          </div>
          <div>
            {/* <Button icon="plus" onClick={()=>dispatch( */}
            {/* commit("addRemarkInfo",assign({},addRemarkInfo,{ */}
            {/* reamrkShow: true, remark: '' */}
            {/* })) */}
            {/* )}> */}
            {/* {lan.新增备注}</Button> */}
            {/* <Button */}
            {/* icon="eye" style={{ marginTop: '30px' }} */}
            {/* loading={remarkInfo.load} */}
            {/* onClick={() => dispatch(remarkInfoShow(refundBillId, remarkInfo))} */}
            {/* >{language.查看备注信息}</Button> */}
          </div>
        </div>
        <div style={{ paddingLeft: 400, paddingTop: 20 }}>
          {
            buttonIsDone && <Button
              type="primary"
              onClick={() => dispatch(clickAlreadyDoneButton(params.id))}
            >
              {lan.已办结}
            </Button>
          }

          {
            buttonIsRefund && <Button
              type="primary"
              onClick={() => dispatch(clickRefundedButton(params.id))}
            >
              {lan.已退款}
            </Button>
          }
        </div>
      </div>

    </div>
  );
};

export default Base;
