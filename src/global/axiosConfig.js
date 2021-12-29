import axios from 'axios'
// import { uToken } from './token.js'
// import Base from './Global'
import { Toast } from 'mint-ui';
const instance =axios.create({
	baseURL : process.env.VUE_APP_URL,//.env.development开发环境  .env.production生产环境就是build后的  .env.test测试环境
	timeout:20000
})
instance.interceptors.request.use(//请求axios时拦截操作
	config => {
		// config.headers.token =uToken(); 配置全局token
		return config;
	},
	error => {
		// console.log("请求错误："+error);
		return Promise.reject(error);
	}
)
instance.interceptors.response.use(
	response => {
		const res = response.data;
		// console.log("code值"+res.code)
		if(res.code==0){
			// console.log("成功返回")
			return response;
		}else{
			if(res.code==500){//判断身份信息过期码
				// localStorage.clear();
				// var oldUrl=window.location.href;
				// sessionStorage.setItem('toName',oldUrl);
				// Toast("您的登录信息已过期");
				// setTimeout(()=>{
				// 	location.reload();
				// },1000)
				return response;
			}
			// console.log("成功错误")
			return response;
			
		}
	},
	error =>{
		console.log("失败错误："+error);
		return Promise.reject(error);
	}
)

export default instance;
