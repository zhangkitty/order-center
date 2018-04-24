import React from 'react';
import { Button } from 'antd';
import { Link } from 'react-router';
import { clickRefundedButton, clickAlreadyDoneButton } from './action';

import styles from './style.css';

const lan = {
  退货单基本信息: __('returns.details.ReturnsBasicInformation'),
  退货单号: __('returns.details.ReturnOrderNumber'),
  客户邮箱: __('returns.details.CustomerMailbox'),
  退款状态: __('returns.details.RefundStatus'),
  是否问题件: __('returns.details.IsTheProblem'),
  运单类型: __('returns.details.WaybillType'),
  收货人国家: __('returns.details.ReceiverCountry'),
  包裹状态: __('returns.details.ParcelStatus'),
  物流渠道: __('returns.details.LogisticsChannels'),
  是否付费: __('returns.details.WhetherToPay'),
  退货申请时间: __('returns.details.ReturnTheApplicationTime'),
  运费险: __('returns.details.ShippingInsurance'),
  退货单状态: __('returns.details.ReturnOrderStatus'),
  回寄物流单号: __('returns.details.ReturnLogisticsNumber'),
  RL扣除费用: __('returns.details.RL扣除费用'),
  订单号: __('returns.details.订单号'),
  新增备注: __('returns.details.新增备注'),
  未退款: __('returns.details.未退款'),
  已退款: __('returns.details.已退款'),
  去退款: __('returns.details.去退款'),
  已办结: __('returns.details.已办结'),
  退款路径: __('returns.details.退款路径'),
  退货单类型: '退货单类型',
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
      { name: lan.退款路径, key: 'refundPath' },
    ],
    middle: [
      { name: lan.订单号, key: 'orderNo' },
      { name: lan.收货人国家, key: 'receiverCountry' },
      { name: lan.包裹状态, key: 'shippingStatus' },
      { name: lan.物流渠道, key: 'shippingType' },
      { name: lan.是否付费, key: 'freeReturn' },
      { name: lan.退货单类型, key: 'orderType' },
    ],
    right: [
      { name: lan.退货申请时间, key: 'createTime' },
      { name: lan.运费险, key: 'insurance' },
      { name: lan.退货单状态, key: 'state' },
      { name: lan.回寄物流单号, key: 'trackingNo' },
      { name: lan.RL扣除费用, key: 'shippingFee' },
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
                {
                  key === 'refundPath' ? <span style={{ color: 'red' }} className={styles.spanWidthL}>{name}:</span>
                    : <span className={styles.spanWidthL}>{name}:</span>
                }
                {(function (key) {
                  if (key === 'refundStatus') {
                    if (returnsInfoData[key] === 0) { // old href={`${location.origin}${returnsInfoData.refundUrl}`}
                      return <span>{lan.未退款} <Link target="_blank" to={`order/details/entry/${returnsInfoData.orderId}/${returnsInfoData.orderNo}`}>{lan.去退款}</Link></span>;
                    }
                    return <span>{lan.已退款}</span>;
                  }
                  if (key === 'refundPath') {
                    return <span style={{ color: 'red' }}>{returnsInfoData[key].toString()}</span>;
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
                  {
                    v.key === 'freeReturn' ?
                      <span style={{ color: 'red' }} className={styles.spanWidthL}>{v.name}:</span> :
                      <span className={styles.spanWidthL}>{v.name}:</span>
                  }
                  {
                    (function (key) {
                      if (key === 'orderNo') {
                        return <Link target="_blank" to={`/order/details/entry/${returnsInfoData.orderId}/${returnsInfoData.orderNo}`}>{returnsInfoData[key]}</Link>;
                      }
                      if (key === 'freeReturn') {
                        return <span style={{ color: 'red' }}>{returnsInfoData[key]}</span>;
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
                  {
                    v.key === 'shippingFee' ?
                      <span style={{ color: 'red' }} className={styles.spanWidthL}>{v.name}:</span> :
                      <span className={styles.spanWidthL}>{v.name}:</span>
                  }
                  <span>
                    {
                      (function (key) {
                        if (key === 'trackingNo') {
                          return <a href={tracking_no_url} target="_blank">{returnsInfoData[key]}</a>;
                        }
                        if (key === 'shippingFee') {
                          return <span style={{ color: 'red' }}>{returnsInfoData[key]}</span>;
                        }
                        return <span>{returnsInfoData[key]}</span>;
                      }(v.key))
                    }
                  </span>
                </div>
              ))
            }
          </div>
          <div className={styles.baseSpace}>
            {
              returnsInfoData.returnOrderGoods.map(v => (
                <div>{v.goodsSort} : {v.exchangeRemark}</div>
              ))
            }
            {console.log(returnsInfoData.returnOrderGoods, 'returnsInfoData.returnOrderGoods')}
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
          {
            !!(returnsInfoData.returnLabelType === 'RL' && (
                returnsInfoData.shippingType === 'bpost' ||
                returnsInfoData.shippingType === 'usps' ||
                returnsInfoData.shippingType === 'dhl-germany'
            )) &&
            <Button style={{ marginLeft: 20 }}>
              <a href={`${returnsInfoData.returnLabel}`}>查看RL附件</a>
            </Button>
          }
        </div>
      </div>
    </div>
  );
};

export default Base;
