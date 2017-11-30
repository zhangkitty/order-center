export function jeneratesheet(arr) {
  let arrLength = arr.length + 1;
  let sheetResult = {};
  sheetResult['!ref'] = 'A1:M' + arrLength;
  sheetResult['A1'] = {v: 'ID'};
  sheetResult['B1'] = {v: '订单号'};
  sheetResult['C1'] = {v: '包裹号'};
  sheetResult['D1'] = {v: '渠道'};
  sheetResult['E1'] = {v: '失败原因'};
  sheetResult['F1'] = {v: '国家'};
  sheetResult['G1'] = {v: '提交人'};
  sheetResult['H1'] = {v: '提交时间'};
  sheetResult['I1'] = {v: '站点来源'};
  sheetResult['J1'] = {v: '处理人'};
  sheetResult['K1'] = {v: '处理时间'};
  sheetResult['L1'] = {v: '类型'};
  sheetResult['M1'] = {v: '状态'};
  let colNames = ['id', 'billno', 'package_no', 'ship_method', 'content', 'country_name', 'commit_user',
    'add_time', 'site_from', 'user_name', 'last_update_time', 'type', 'status',];
  arr.map((item, index) => {
    let count = index + 2;
    ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M'].map((k, index) => {
      let result = item[colNames[index]] ? item[colNames[index]] : '';
      sheetResult[k + count] = { v: result };
    });
  });
  return sheetResult;
}

export function s2ab(s) {
  let buf = new ArrayBuffer(s.length);
  let view = new Uint8Array(buf);
  for (let i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
  return buf;
}