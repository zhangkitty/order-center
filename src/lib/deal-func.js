/**
 * Created by liufeng on 2017/12/16.
 */
import pdsS from 'pds-serv-fe';

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

export function flattenObject(arr, result = []) {
  arr.forEach((item) => {
    if (Object.keys(item.children).length) {
      result.push(item);
      flattenArray(item.children, result);
    } else {
      result.push(item);
    }
  });
  return result;
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

export const printed = (str, isInfo = false, isUrl = 0, otherStr = '', isPrintData = false, landscape = '') => {
  let newPrint;
  if (isInfo) {
    newPrint = window.open('');
    newPrint.document.write(str);
    newPrint.document.close();
  } else {
    if (isUrl) {
      newPrint = window.open(str);
      newPrint.addEventListener('load', () => newPrint.print());
      return true;
    }
    if (!isPrintData) {
      newPrint = window.open('');
      newPrint.document.write('<script>window.onload = () => window.print()</script>');
      if (otherStr) { newPrint.document.write(otherStr); }
      newPrint.document.write(str);
      newPrint.document.close();
    } else {
      pdsS('http://pdf.dotfashion.cn?landscape=' + landscape, str);
    }
  }
  return true;
};

export const printToData = (info) => {
  printed(info, false, 0, '', true, '');
};
export const printToDataLandscape = (info) => {
  printed(info, false, 0, '', true, true);
};