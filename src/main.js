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

// 神策埋点SDK接入
var sensors = require('sa-sdk-javascript'); 
sensors.init({
  server_url: 'https://data.zhongyuanzhaofang.com/sa?project=default',
  is_track_single_page:true, // 单页面配置，默认开启，若页面中有锚点设计，需要将该配置删除，否则触发锚点会多触发 $pageview 事件
  use_client_time:true, 
  send_type:'beacon',
  heatmap: {
     //是否开启点击图，default 表示开启，自动采集 $WebClick 事件，可以设置 'not_collect' 表示关闭。
     clickmap:'default',
     //是否开启触达图，not_collect 表示关闭，不会自动采集 $WebStay 事件，可以设置 'default' 表示开启。
     scroll_notice_map:'not_collect'
  }
});
sensors.quick('autoTrack'); //用于采集 $pageview 事件。
// 注册公共属性
sensors.registerPage({
	product_name: "置业英雄成长系统",
	platform_type:"h5"
});
Vue.prototype.$sensors=sensors;

new Vue({
	store,
	router,
  render: h => h(App),
}).$mount('#app')
