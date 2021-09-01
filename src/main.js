import Vue from 'vue'
import router from './router/router.js'
import axios from 'axios'
import Vuex from 'vuex'
import Mint from 'mint-ui'

//引入全局样式
import 'mint-ui/lib/style.css'
import global_ from './global/Global.vue'
import store from './vuex/store'
// 懒加载
import VueLazyload from 'vue-lazyload'


Vue.use(VueLazyload, {
	 preLoad: 4,
     loading: require('./assets/img/loading.jpg'),//加载中图片，一定要有，不然会一直重复加载占位图
     error: require('./assets/img/loading.jpg'),  //加载失败图片
	 attempt: 10
});
// 预览大图插件
import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'
let options = {
  fullscreenEl: false
};
Vue.use(preview, options)
Vue.use(preview)

import App from './App.vue'
Vue.prototype.GLOBAL = global_;//便于全局变量访问
axios.defaults.baseURL=global_.BASE_URL;
// axios.defaults.baseURL = process.env.VUE_APP_URL;
axios.defaults.timeout = 20000;
Vue.config.productionTip = false
Vue.use(Mint)
Vue.prototype.$axios=axios

Vue.prototype.$bus = new Vue();
new Vue({
	store,
	router,
  render: h => h(App),
}).$mount('#app')
