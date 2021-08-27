import Vue from 'vue'
import Router from 'vue-router'
// import store from '../vuex/store'  用store管理状态
import {
  getToken,
} from "@/global/token.js";
Vue.use(Router)
const LOGIN_PAGE_NAME = "login";
var router = new Router({
	mode:"hash",
	routes:[
		{path:'/',redirect:'/Home'},
		{
			path:'/Home',
			name:"home",
			component:() =>import ('@/view/home'),
			meta:{
				title:'首页',
				keepAlive:false
			}			
		},
		{
			path:'/Login',
			name:"login",
			component:() =>import ('@/view/login'),
			meta:{
				title:'登录',
				keepAlive:false
			}			
		},
		{
			path:'/My',
			name:"my",
			component:() =>import ('@/view/my'),
			meta:{
				title:'个人中心',
				keepAlive:false
			}			
		},
		{
			path:'/Way',
			name:"way",
			component:() =>import ('@/view/way'),
			meta:{
				title:'赚取',
				keepAlive:false
			}			
		},
		// {
		// 	path:'/Earn',
		// 	name:"earn",
		// 	component:() =>import ('@/view/earn'),
		// 	meta:{
		// 		title:'兑换中心',
		// 		keepAlive:false
		// 	}			
		// },
		{
			path:'/House',
			name:"house",
			component:() =>import ('@/view/house'),
			meta:{
				title:'选择房源',
				keepAlive:false
			}			
		},
		{
			path:'/New',
			name:"new",
			component:() =>import ('@/view/new'),
			meta:{
				title:'新手试炼',
				keepAlive:false
			}			
		},
		{
			path:'/News/:id',
			name:"news",
			component:() =>import ('@/view/news'),
			meta:{
				title:'帮助中心',
				keepAlive:false
			}			
		},
		{
			path:'/Day',
			name:'day',
			component:() =>import ('@/view/day'),
			meta:{
				title:'每日试炼',
				keepAlive:false
			}	
		},
		{
			path:'/Days/:id',
			name:'days',
			component:() =>import ('@/view/days'),
			meta:{
				title:'帮助中心',
				keepAlive:false
			}	
		},
		{
			path:'/Yb',
			name:"yb",
			component:() =>import ('@/view/yb'),
			meta:{
				title:'我的元宝',
				keepAlive:false
			}			
		},
		{
			path:'/Record',
			name:"record",
			component:() =>import ('@/view/record'),
			meta:{
				title:'竞拍记录',
				keepAlive:false
			}			
		},
		{
			path:'/Good',
			name:"good",
			component:() =>import ('@/view/good'),
			meta:{
				title:'福利中心',
				keepAlive:false
			}			
		},
		{
			path:'/Goods/:id',
			name:'goods',
			component:() =>import ('@/view/goods'),
			meta:{
				title:'帮助中心',
				keepAlive:false
			}	
		},
		{
			path:'/Historys/:id',
			name:'historys',
			component:() =>import ('@/view/historys'),
			meta:{
				title:'帮助中心',
				keepAlive:false
			}	
		},
		{
			path:'/Program',
			name:"program",
			component:() =>import ('@/view/program'),
			meta:{
				title:'帮助中心',
				keepAlive:true
			}			
		},
		{
			path:'/ProgramList/:id',
			name:"programList",
			component:() =>import ('@/view/programList'),
			meta:{
				title:'帮助中心列表',
				keepAlive:false
			}			
		},
		{
			path:'/Czc',
			name:"czc",
			component:() =>import ('@/view/czc'),
			meta:{
				title:'成长值',
				keepAlive:false
			}			
		},
		{
			path:'/Fail',
			name:"fail",
			component:() =>import ('@/view/fail'),
			meta:{
				title:'我要纠错',
				keepAlive:false
			}			
		},
		{
			path:'/set',
			name:"set",
			component:() =>import ('@/view/set'),
			meta:{
				title:'设置',
				keepAlive:false
			}			
		},
		{
			path:'/houseList',
			name:"houseList",
			component:() =>import ('@/view/houseList'),
			meta:{
				title:'竞拍房源',
				keepAlive:false
			}			
		},
		{
			path:'/houseListWeek',
			name:"houseListWeek",
			component:() =>import ('@/view/houseListWeek'),
			meta:{
				title:'竞拍房源包周',
				keepAlive:false
			}			
		},
		{
			path:'/houseListSchool',
			name:"houseListSchool",
			component:() =>import ('@/view/houseListSchool'),
			meta:{
				title:'竞拍学校',
				keepAlive:false
			}			
		},
		{
			path:'/cars',
			name:"cars",
			component:() =>import ('@/view/cars'),
			meta:{
				title:'收藏夹',
				keepAlive:false
			}			
		},
		{
			path:'/message',
			name:"message",
			component:() =>import ('@/view/message'),
			meta:{
				title:'消息中心',
				keepAlive:false
			}			
		},
		{
			path:'/messageInfo/:id',
			name:"messageInfo",
			component:() =>import ('@/view/messageInfo'),
			meta:{
				title:'消息中心',
				keepAlive:false
			}			
		},
		{
			path:'/hbHouse',
			name:"hbHouse",
			component:() =>import ('@/view/hbHouse'),
			meta:{
				title:'房源分享',
				keepAlive:true
			}			
		},
		{
			path:'/hbHouseNew',
			name:"hbHouseNew",
			component:() =>import ('@/view/hbHouseNew'),
			meta:{
				title:'新盘入市',
				keepAlive:false
			}			
		},
		{
			path:'/hbZx',
			name:"hbZx",
			component:() =>import ('@/view/hbZx'),
			meta:{
				title:'资讯分享',
				keepAlive:false
			}			
		},
		{
			path:'/zxInfo/:id/:empNo',
			name:"zxInfo",
			component:() =>import ('@/view/zxInfo'),
			meta:{
				title:'资讯详情',
				keepAlive:false
			}			
		},
		{
			path:'/hb',
			name:"hb",
			component:() =>import ('@/view/hb'),
			meta:{
				title:'海报列表',
				keepAlive:false
			}			
		},
		{
			path:'/H5',
			name:"hh",
			component:() =>import ('@/view/h5'),
			meta:{
				title:'房源详情',
				keepAlive:false
			}			
		},
		{
			path:'/H5New',
			name:"h5New",
			component:() =>import ('@/view/h5New'),
			meta:{
				title:'房源详情',
				keepAlive:false
			}			
		},
		{
			path:'/School',
			name:"school",
			component:() =>import ('@/view/school'),
			meta:{
				title:'房源详情',
				keepAlive:false
			}			
		},
		{
			path:'/SchoolAll',
			name:"schoolAll",
			component:() =>import ('@/view/schoolAll'),
			meta:{
				title:'全部房源',
				keepAlive:false
			}			
		},
		{
			path:'/SchoolList',
			name:"schoolList",
			component:() =>import ('@/view/schoolList'),
			meta:{
				title:'分享学校',
				keepAlive:true
			}			
		},
		{
			path:'/Vfive',
			name:"vfive",
			component:() =>import ('@/view/Vfive'),
			meta:{
				title:'5.0上线双重礼',
				keepAlive:true
			}			
		},
		{
			path:'/Vcj',
			name:"vcj",
			component:() =>import ('@/view/Vcj'),
			meta:{
				title:'一键分享  赢豪礼',
				keepAlive:true
			}			
		},
		{
			path:'/uploadCj',
			name:"uploadCj",
			component:() =>import ('@/view/uploadCj'),
			meta:{
				title:'上传朋友圈截图',
				keepAlive:false
			}			
		},
		{
			path:'/Call',
			name:"call",
			component:() =>import ('@/view/call'),
			meta:{
				title:'拨打电话',
				keepAlive:false
			}			
		},
		{
			path:'/callM',
			name:"callM",
			component:() =>import ('@/view/callM'),
			meta:{
				title:'拨打电话',
				keepAlive:false
			}			
		},
		{
			path:'/custom',
			name:"custom",
			component:() =>import ('@/view/custom'),
			meta:{
				title:'商机',
				keepAlive:false
			}			
		},
		{
			path:'/rules',
			name:"rules",
			component:() =>import ('@/view/rules'),
			meta:{
				title:'中原找房质检公告',
				keepAlive:false
			}			
		},
		{
			path:'/rulesAll',
			name:"rulesAll",
			component:() =>import ('@/view/rulesAll'),
			meta:{
				title:'中原找房质检违规名单',
				keepAlive:true
			}			
		},
		{
			path:'/shareCenter',
			name:"shareCenter",
			component:() =>import ('@/view/shareCenter'),
			meta:{
				title:'分享中心',
				keepAlive:false
			}			
		},
		{
			path:'/myPrize',
			name:"myPrize",
			component:() =>import ('@/view/myPrize'),
			meta:{
				title:'我的奖品',
				keepAlive:false
			}			
		},
		{
			path:'/dayLog',
			name:"dayLog",
			component:() =>import ('@/view/dayLog'),
			meta:{
				title:'管理日报',
				keepAlive:false
			}			
		},		{
			path:'/dayLogMsg/:date/:id',
			name:"dayLogMsg",
			component:() =>import ('@/view/dayLogMsg'),
			meta:{
				title:'管理日报',
				keepAlive:false
			}			
		},			
		// {
		// 	path:'/User',
		// 	name:"user",
		// 	component:() =>import ('@/view/user'),
		// 	meta:{
		// 		title:'双11客户礼品查询页',
		// 		keepAlive:false
		// 	}			
		// },
		{
			path:'/Error',
			name:"error",
			component:() =>import ('@/view/error'),
			meta:{
				title:'账号异常',
				keepAlive:true
			}			
		}
	]
})
var u = navigator.userAgent
if(u.indexOf('aplus') < 0){
	router.beforeEach((to, from, next) => {
		// console.log(store.state.userInfo)
		var token = getToken();
		var nowDate=new Date().getTime();
		var endTime=new Date(getToken().date).getTime();
		if(to.meta.title){
			document.title=to.meta.title
		}
		if(to.name == 'error'){
			 next(); // 跳转
		}else if(to.name == 'days'||to.name == 'hh'||to.name == 'h5New'||to.name == 'school'||to.name == 'schoolAll'||to.name == 'call'||to.name == 'callM'||to.name == 'zxInfo'||to.name == 'rules'||to.name == 'rulesAll'){
			 next(); // 跳转
		}else if (!token && to.name !== LOGIN_PAGE_NAME) {
		  // 未登录且要跳转的页面不是登录页  并且不是查看头像审核页
		  var oldUrl=window.location.href;
		  sessionStorage.setItem('toName',oldUrl);
		  next({
			name: LOGIN_PAGE_NAME // 跳转到登录页
		  });
		}else if (!token && to.name === LOGIN_PAGE_NAME) {
		  // 未登陆且要跳转的页面是登录页
		  next(); // 跳转
		}else if (token && nowDate>endTime) {
			localStorage.removeItem("userInfo");//防止在这里循环
			var oldUrl=window.location.href;
			sessionStorage.setItem('toName',oldUrl);
		  // 已登录且要跳转的页面是登录页
		  next({
			name: LOGIN_PAGE_NAME // 跳转到登录页
		  });
		} else if (token && to.name === LOGIN_PAGE_NAME) {
		  // 已登录且要跳转的页面是登录页
		  next({
			name: 'home' // 跳转到homeName页
		  });
		}
		else {
			// if(to.meta.title){
			// 	document.title=to.meta.title
			// }
		  next();
		}
	})
}
router.afterEach((to, from)=>{
	//每次切换页面的时候，让页面滚动到最顶部
	window.scroll(0, 0);
})
export default router

// 防止重复点击跳转路由报错
// const originalPush = Router.prototype.push
//    Router.prototype.push = function push(location) {
//    return originalPush.call(this, location).catch(err => err)
// }