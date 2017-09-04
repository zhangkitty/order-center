/**
 * Created by liufeng on 2016/08/29.
 */
import { notification } from 'antd';
import assign from 'object-assign';

let fetch;
if (process.env.NODE_ENV === 'test') {
  fetch = global.fetch;
} else {
  fetch = window.fetch;
}

let messageShowed = false;

function showMessage(msg, fn = () => {}) {
  if (!messageShowed) {
    messageShowed = true;
    notification.open({
      message: '提醒',
      description: msg,
    });
    setTimeout(() => {
      messageShowed = false;
      fn();
    }, 3000);
  }
}

export default (url, args = {}, header) => {
  let newUrl;
  if (url.indexOf('?') > -1) {
    newUrl = `${url}&language=${process.env.LOCALE}`;
  } else {
    newUrl = `${url}?language=${process.env.LOCALE}`;
  }
  return fetch(`${process.env.BASE_URI}${newUrl}`, assign({
    credentials: 'include',
    headers: header || {
      'content-type': 'application/json',
    },
  }, args)).then((res) => {
    const { status } = res;
    if (res.redirected) { //  302
    //  location.href = res.url; // 跳转登录
    } else if (status === 403) {
      return showMessage('没有权限操作');
    } else if (status === 500) {
      showMessage('服务器响应出错,请尝试 刷新 重试,或者联系开发人员需求帮助  _(:3 」∠)_');
      throw new Error(status);
    } else if (status !== 200) {
      return showMessage('服务器响应出错,请尝试 刷新 重试,或者联系开发人员需求帮助  _(:3 」∠)_');
    }
    // const lagunage = res.headers.get('systemLagunage');
    // 流，下载
    if (res.headers.get('content-type') === 'application/vnd.ms-excel;charset=UTF-8') {
      return res.blob();
    }


    return res.json();
  });
};
