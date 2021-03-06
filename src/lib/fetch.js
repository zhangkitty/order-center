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


export default (url, args = {}, header) => {
  let newUrl;
  if (url.indexOf('?') > -1) {
    newUrl = `${url}&language=${process.env.LOCALE}`;
  } else {
    newUrl = `${url}?language=${process.env.LOCALE}`;
  }
  localStorage.setItem('language', process.env.LOCALE);
  return fetch(`${process.env.BASE_URI}${newUrl}`, assign({
    credentials: 'include',
    headers: header || {
      'content-type': 'application/json',
    },
  }, args)).then((res) => {  // header
    const { status } = res;
    if (status == 403) {
      notification.open({
        message: __('common.fetch_title1'),
      });
    } else if (status != 200) {
      notification.open({
        message: __('common.fetch_title2'),
      });
      throw new Error(status);
    }

    // 流，下载 application/vnd.ms-excel;charset=UTF-8
    if (res.headers.get('content-type') === 'application/download') {
      return res.blob();
    }
    return res.json();
  }).then((data) => {  // body
    const { error_code, msg } = data;
    if (error_code == 302) { //  302
     // message.error(msg, 10);
      notification.open({
        message: msg,
      });
      location.href = `${location.origin}/index_new.php`; // 跳转登录
    }
    // else if (error_code == 403) {
    //   showMessage('没有权限操作');
    // } else if (error_code == 500) {
    //   showMessage('服务器响应出错,请尝试 刷新 重试,或者联系开发人员需求帮助  _(:3 」∠)_');
    //   throw new Error(status);
    // }

    return data;
  });
};
