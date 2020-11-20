import Vue from 'vue';
import App from '@/App';
import router from '@/router';
import ElementUI from 'element-ui';

import 'font-awesome/css/font-awesome.css';

import '@/styles/main.scss';
import '@/styles/element-variables.scss';
import jasStorage from './utils/jas-storage';
import jasHttp from './utils/jas-http';
// import * as jasDirectives from './assets/js/jas-directives';

Vue.config.productionTip = false;

Vue.use(ElementUI);
// Vue.use(jasDirectives);

Vue.prototype.$jasHttp = jasHttp;
Vue.prototype.$jasStorage = jasStorage;
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')