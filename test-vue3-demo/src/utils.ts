/* eslint guard-for-in: "off" */

/**
 * 返回一个 hash 值
 * @param {String | Number} len 长度
 * @return {String}
 */
export const getHash = (len: number) => {
  let length = len || 8;
  const arr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.split('');
  const al = arr.length;
  let chars = '';
  while (length--) {
    chars += arr[parseInt(`${Math.random() * al}`, 10)];
  }
  return chars;
};

/**
 * 简易版深拷贝
 * 会丢失函数与 undefined、symbol
 * @param {*} v
 */
export const copyByJson = (v: object | Array<any>) => JSON.parse(JSON.stringify(v));

/**
 * 时间格式化
 * @param {Date}   date 需要格式化的时间对象
 * @param {String} fmt  格式
 */
export const dateFormat = (date: Date, fmt = 'yyyy-MM-dd HH:mm:ss') => {
  const o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours() % 12 === 0 ? 12 : date.getHours() % 12, // 小时(小)
    'H+': date.getHours(), // 小时(大)
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds(), // 毫秒
  };
  const week = {
    0: '\u65e5',
    1: '\u4e00',
    2: '\u4e8c',
    3: '\u4e09',
    4: '\u56db',
    5: '\u4e94',
    6: '\u516d',
  };

  let fmtCopy = fmt;

  if (/(y+)/.test(fmtCopy)) {
    fmtCopy = fmtCopy.replace(RegExp.$1, (`${date.getFullYear()}`).substr(4 - RegExp.$1.length));
  }

  if (/(E+)/.test(fmtCopy)) {
    fmtCopy = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? '\u661f\u671f' : '\u5468') : '') + week[date.getDay()]);
  }

  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmtCopy)) {
      const val = o[k];
      fmtCopy = fmtCopy.replace(RegExp.$1, (RegExp.$1.length === 1) ? val : ((`00${val}`).substr((`${val}`).length)));
    }
  }

  return fmtCopy;
};
