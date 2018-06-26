// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import './common/common.css';
import Cube from 'cube-ui';
Vue.use(Cube)

import cookie from './utils/cookie.js'
Vue.use(cookie);

import getHost from './utils/getHost.js'
Vue.use(getHost);

import getToast from './utils/Toast.js'
Vue.use(getToast);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
