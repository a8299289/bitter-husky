import Vue from 'vue'
import App from './App'
import store from './vuex/index'
import '@/common/common'

import API from './utils/api.js'
import Request from './utils/request.js'
import publicFn from './common/util.js'
const http = new Request();


Vue.config.productionTip = false
Vue.prototype.$api = API;
Vue.prototype.$http = http;
Vue.prototype.$publicFn= publicFn

App.mpType = 'app'

const app = new Vue({
	...App,
	store
})
app.$mount()
export default app
