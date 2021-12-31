export const domParser = (template) => {
  return new window.DOMParser().parseFromString(
    template,
    'text/html'
  ).body.firstChild
}

/**
 * 根据 value 值从对象数组中找到对应的对象
 * @param {*} value
 * @param {*} dropdown 对象数组
 * @param {*} valueKey value 值在对象中的 key
 */
export const getOptionByValue = (value, dropdown, valueKey = 'value') => {
  if (!Array.isArray(dropdown) || !value) {
    return;
  }
  for (const obj of dropdown) {
    if (`${obj[valueKey]}` === `${value}`) {
      return obj;
    }
  }
};
