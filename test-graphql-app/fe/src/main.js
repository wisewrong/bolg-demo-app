import Vue from 'vue';
import App from './App.vue';
import $api from './api';
import vuetify from './plugins/vuetify';

Vue.use($api);

Vue.config.productionTip = false;

new Vue({
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
