/**
 * 通过 Vue.use() 将请求方法挂到 Vue 原型链）
 */
import home from './home/index';

const install = (Vue) => {
  if (install.installed) {
    return;
  }
  install.installed = true;

  // 为 Vue 实例添加 $api 属性
  // 在组件中以 this.$api.home.getData(params) 的方式发起请求
  Object.defineProperties(Vue.prototype, {
    $api: {
      get() {
        return { home };
      },
    },
  });
};

export default {
  install,
};
