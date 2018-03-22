/**
 * Created by yeyangmei on 2017/7/4.
 */
import pdsS from 'pds-serv-fe';
import assign from 'object-assign';
import moment from 'moment';

export function makeActionCreator(type, ...argNames) {
  return function (...args) {
    const action = { type };
    argNames.forEach((arg, index) => {
      action[argNames[index]] = args[index];
    });
    return action;
  };
}

export function flattenArray(arr) {
  return arr.reduce((red, x) => {
    if (Array.isArray(x)) {
      return [...red, ...flattenArray(x)];
    }
    return [...red, x];
  }, []);
}

export function findSelectedKey(arr, path = [], current) {
  return arr.map((item) => {
    const currentPath = [...path, item.name];
    if (item.link === current) return currentPath;
    if (item.children && item.children.length) {
      return findSelectedKey(item.children, currentPath, current);
    }
    return null;
  }).filter(x => !!x);
}

export function chooseSize(value, type = 1) {
  const size = value.toLowerCase();
  if (size === '全部') {
    return '全部';
  }
  if (size === 'total') {
    if (type) {
      return '总数';
    }
    return 'total';
  }
  if (size === '总数') {
    return 'total';
  }
  if (size && size.indexOf('one') > -1) {
    if (size.indexOf('_') > -1) {
      return 'oneSize';
    }
    return 'ONE-SIZE';
  }
  if (size && size.indexOf('no') > -1) {
    if (type) {
      return '数量';
    }
    return 'noSize';
  }
  if (size && size.indexOf('w*l*h') > -1) {
    // if (type) {
    //   return size.replace('cm', 'c m');
    // }
    // return size.replace('c m', 'cm');
    return value;
  }
  if (type) {
    return size.toUpperCase();
  }
  return value;
}

export const printed = (str, isInfo = false, isUrl = 0, otherStr = '', isPrintData = false) => {
  let newPrint;
  if (isInfo) {
    newPrint = window.open('');
    newPrint.document.write(str);
    newPrint.document.close();
  } else {
    if (isUrl) {
      newPrint = window.open(str);
      return true;
    }
    if (!isPrintData) {
      newPrint = window.open('');
      newPrint.document.write('<script>window.onload = () => window.print()</script>');
      if (otherStr) { newPrint.document.write(otherStr); }
      newPrint.document.write(str);
      newPrint.document.close();
    } else {
      pdsS('http://pdf.dotfashion.cn', str);
    }
  }
  return true;
};

export const printedInfo = (info) => {
  printed(info, true);
};

export const printToData = (info) => {
  printed(info, false, 0, '', true);
};

export const printOtherToData = (info) => {
  printed(info, false, 0, '', false);
};

const chooseSort = (key) => {
  const value = key.toLowerCase();
  let sort = 0;
  const reg = /\d+(\.\d+)?/;
  if (value.indexOf('s') > -1) { sort = 0 - (value.length); }
  if (value.indexOf('m') > -1) { sort = 0; }
  if (value.indexOf('l') > -1) { sort = value.length; }
  if (value.indexOf('one') > -1) { sort = Infinity; }
  if (value === 'total') { sort = -Infinity; }
  if (value.match(reg)) { sort = value.match(reg)[0]; }
  return sort;
};
export const sortFun = (a, b) => {
  const A = chooseSort(a);
  const B = chooseSort(b);
  return A - B;
};

export const creatSearchObj = (search, isNumber = false, isTime = false) => {
  const searchArray = search.split(',');
  const searchObj = {};
  for (let i = 0; i < searchArray.length; i += 2) {
    if (isTime) {
      assign(searchObj, {
        [searchArray[i]]: moment(searchArray[i + 1]),
      });
    } else {
      assign(searchObj, {
        [searchArray[i]]:
          isNumber ? parseFloat(searchArray[i + 1]) || searchArray[i + 1] : searchArray[i + 1],
      });
    }
  }
  return searchObj;
};

export const creatHandleList = handle => (
  handle.map((item, index) => {
    const arr = item.replace(/\s+/g, ' ').split(' ');
    return assign({}, {
      id: index,
      name: arr[0],
      time: `${arr[1]} ${arr[2]}`,
      status: arr[3],
    });
  })
);


export function findAllChildrenKeys(self, id) {
  if (id) {
    if (!self.children) return [self.id];
    const children = self.children.map(x => findAllChildrenKeys(x, 'id'))
      .reduce((acc, cur) => [...acc, ...cur], []);
    return [self.id, ...children];
  }
  if (!self.children) return [self];
  const children = self.children.map(item => findAllChildrenKeys(item))
    .reduce((acc, cur) => [...acc, ...cur], []);
  return [self, ...children];
}

export function removeKeys(arr, keys) {
  if (typeof keys[0] === 'object') {
    return arr.filter(x => keys.map(item => item.id).indexOf(x.id) === -1);
  }
  return arr.filter(x => keys.indexOf(x) === -1);
}
