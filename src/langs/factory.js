/**
 * Created by fed on 2017/8/28.
 */
module.exports = function (cwd) {
  const glob = require('glob').sync;
  const path = require('path');

  const files = glob('**/*.js', {
    cwd,
  }).map(item => item)
    .filter(item => item !== 'index.js')
    .map(item => item.replace(/\.js$/, '').replace(/\/index$/, ''));

  const langs = files.reduce((acc, cur) => {
    const current = require(path.join(cwd, cur)) || {};
    const arr = cur.split('/');
    Object.keys(current).forEach((key) => {
      acc[[...arr, key].join('.')] = current[key];
    });
    return acc;
  }, {});
  return langs;
};
