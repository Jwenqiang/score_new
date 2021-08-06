<template>
	<div class="my">
		<div class="clear myTop">
			<div class="mtSet" @click="$router.push({name:'set',query:{'userName':userInfo.EmpCnName,'emNum':userInfo.EmpNo}})">
			</div>
			<div class="mtL">
				<label>
					<img :src="tx" onerror="this.src='https://sz.centanet.com/partner/house/userImg/tx_none.png'"/>
				</label>
				<span v-if="userInfo.JiFenGrade<4">
					<img src="@/assets/img/grad1.png"/>
				</span>
				<span v-else-if="userInfo.JiFenGrade<7">
					<img src="@/assets/img/grad2.png"/>
				</span>
				<span v-else-if="userInfo.JiFenGrade<10">
					<img src="@/assets/img/grad3.png"/>
				</span>
				<span v-else-if="userInfo.JiFenGrade<13">
					<img src="@/assets/img/grad4.png"/>
				</span>
				<span v-else-if="userInfo.JiFenGrade<16">
					<img src="@/assets/img/grad5.png"/>
				</span>
				<span v-else-if="userInfo.JiFenGrade>15">
					<img src="@/assets/img/grad6.png"/>
				</span>
			</div>
			<div class="mtR">
				<h3>
					<label>{{userInfo.EmpCnName}}<span>{{userInfo.EstateName}}</span></label>
				</h3>
				<p class="msecond" @click="show=true"><template v-if="userInfo.SignMessage"><label>{{userInfo.SignMessage}}</label></template><template v-else><label>暂无个人简介，点击增加</label></template> <span></span></p>
				<p class="msecond" v-if="userInfo.EstateAddress">{{userInfo.EstateAddress}}</p>
<!-- 				<div class="lineM"><span :style="'width:'+ lineW +'%;'"></span></div>
				<p class="lineTip" @click="$router.push({name:'czc'})"><span v-if="userInfo.JiFenEnable==150000">成长值150000，已升至最高级 <img src="../assets/img/m-right.png" width="6px"/></span><span v-else>成长值 {{userInfo.JiFenEnable}} 距离下一等级还差{{userInfo.NextLevelDistance}} <img src="../assets/img/m-right.png" width="6px"/></span></p> --> 
			</div>
			
			<div class="myYb">
				<div class="mybT" @click="$router.push({name:'yb'})">
					<p>元宝余额</p>
					<span>{{userInfo.YuanBaoEnable}}</span> 
				</div>
				<span class="line-l"></span>
				<div class="mybT" @click="$router.push({name:'czc'})">
					<p>成长值</p>
					<span>{{userInfo.JiFenEnable}}</span> 
				</div>
			</div>
		</div>
		<div class="myC">
			<div class="nineTop">
				<p>用户中心</p>
				<div class="nineC">
					<label @click="$router.push({name:'record'})">竞拍记录</label>
					<label @click="$router.push({name:'cars'})">收藏夹</label>
					<label @click="$router.push({name:'message'})">消息中心</label>
				</div>
			</div>
			<div class="nineTop">
				<p>分享中心</p>
				<div class="nineC ninesC">
					<label @click="$router.push({name:'hb',query:{id:'0'}})">名片海报</label>
					<label @click="$router.push({name:'hbHouse',query:{jjr:jjrNum}})">房源海报</label>
					<label @click="$router.push({name:'hb',query:{id:'2'}})">招聘海报<!-- <span v-if="showZp"></span> --><!-- <i>new</i> --></label>
					<label @click="$router.push({name:'hb',query:{id:'3'}})">节日海报<!-- <span v-if="showJr"></span> --><!-- <i>new</i> --></label>
					<label @click="$router.push({name:'hb',query:{id:'4'}})">正能量海报</label>
					<label @click="$router.push({name:'hb',query:{id:'5'}})">App下载海报</label>
					<label @click="$router.push({name:'hb',query:{id:'7'}})">成交战报</label>
					<label @click="$router.push({name:'hbZx',query:{jjr:jjrNum}})">分享资讯</label>
					<label @click="$router.push({name:'schoolList',query:{jjr:jjrNum}})">分享学校</label>
					<label @click="$router.push({name:'hbHouseNew',query:{jjr:jjrNum}})">新盘入市</label>
				</div>
			</div>
			<nut-popup v-model="show">
				<div class="myIntr">
					<div class="miTop">添加个人简介</div>
					<div class="miContent">
						<div><textarea maxlength="25" placeholder="最多25个字" v-model="myMsg"></textarea></div>
						<div class="miBtn">
							<label @click="show=false">取消</label>
							<label @click="setMsg">确定</label>
						</div>
					</div>
				</div>
			</nut-popup>
<!-- 			<div class="myList myList2" @click="$router.push({name:'way'})">
				<div class="clear mlAll">
					<label class="myliL">赚元宝</label>
					<label class="myliR">赚元宝，从这里开始</label>
				</div>
			</div>
			<div class="myList myList" @click="$router.push({name:'record'})">
				<div class="clear mlAll">
					<label class="myliL">竞拍记录</label>
					<label class="myliR">拍广告位 ，提升进线</label>
				</div>
			</div>
			<div class="myList myList9" @click="$router.push({name:'cars'})">
				<div class="clear mlAll">
					<label class="myliL">收藏夹</label>
					<label class="myliR">房源快捷竞拍入口</label>
				</div>
			</div>
			<div class="myList myList10" @click="$router.push({name:'message'})">
				<div class="clear mlAll">
					<label class="myliL">消息中心</label>
					<label class="myliR">通知提醒早知道</label>
				</div>
			</div>
			<div class="myList myList3" @click="$router.push({name:'program'})">
				<div class="clear mlAll">
					<label class="myliL">帮助中心</label>
					<label class="myliR">玩转元宝秘籍</label>
				</div>
			</div>
			<div class="myList myList4" @click="$router.push({name:'fail',query:{'userName':userInfo.CnName,'emNum':userInfo.EmpNo}})">
				<div class="clear mlAll">
					<label class="myliL">我要纠错</label>
					<label class="myliR">纠错有奖</label>
				</div>
			</div>	
			<div class="myList myList5">
				<div class="clear mlAll">
					<label class="myliL">充值中心</label>
					<label class="myliR">功能开发中，敬请期待</label>
				</div>
			</div>
			<div class="myList myList6">
				<div class="clear mlAll">
					<label class="myliL">转赠元宝</label>
					<label class="myliR">功能开发中，敬请期待</label>
				</div>
			</div>
			<div class="myList myList7">
				<div class="clear mlAll">
					<label class="myliL">商城</label>
					<label class="myliR">功能开发中，敬请期待</label>
				</div>
			</div>
			<div class="myList myList8" v-if="inApp==false" @click="$router.push({name:'set'})">
				<div class="clear mlAll">
					<label class="myliL">设置</label>
					<label class="myliR"></label>
				</div>
			</div> -->
<!-- 			<div class="logOut" @click="logOut">
				退出登录
			</div> -->
<!-- 			<div class="logOut" v-if="hasTest">
				<a href="https://sz.centanet.com/partner/house/test/aplus/">成长系统新功能测试</a>
			</div> -->
		</div>
		<foot tab4='1'></foot>	
	</div>
</template>

<script>
	import Vue from 'vue';
	import { Toast,Indicator } from 'mint-ui';
	import {
	  uToken,
	} from "@/global/token.js";
	import Foot from '@/components/foot.vue';
	import Popup from '@nutui/nutui/dist/packages/popup/popup.js';  // 加载构建后的JS
	import '@nutui/nutui/dist/packages/popup/popup.css';  //加载构建后的CSS
	Popup.install(Vue);
	export default{
		name: 'my',
		// beforeRouteEnter(to,from,next){
		//     console.log(from)
		// 	if(from.name=='earn'){
		// 		next()
		// 	}else{
		// 		next({
		// 			name: 'home' 
		// 		});
		// 	}
		//     // next((vm)=>{ //参数vm就是当前组件的实例。
		//     //     console.log(vm)
		//     // })
		// },
		data(){
			return{
				header_token:{"token": uToken()},
				ccz:'20',
				chas:"480",
				userInfo:"",
				lineW:"0",
				tx:"",
				inApp:false,
				show:false,
				myMsg:"",
				jjrNum:"",
				hasTest:false,
				empArr:[],
				showZp:true,
				showJr:true
			}
		},
		created(){
			this.vip();
			document.title="我的";
			var u = navigator.userAgent;
			if(u.indexOf('aplus') >-1){
				this.inApp=true;
			}
			this.getUser()
			if(localStorage.getItem('readZp')){
				this.showZp=false;
			}
			if(localStorage.getItem('readJr')){
				this.showJr=false;
			}
		},
		components: {
		  Foot
		},
		computed: {
			
		},
		watch:{
			'$route' (to, from) {
			   if (to.name === 'my') {
				   this.getUser()
			    }
			 }
		},
		methods:{
			vip(){
				var arrVip=this.empArr;
				// arrVip.push('103524');
				arrVip.push('55558');
				arrVip.push('135355');
				arrVip.push('59440');
				arrVip.push('76183');
				arrVip.push('112261');
				arrVip.push('121728');
				arrVip.push('133233');
				arrVip.push('120561');
				arrVip.push('121331');
				arrVip.push('121325');
				arrVip.push('114053');
				arrVip.push('115577');
				arrVip.push('125193');
				arrVip.push('135755');
				arrVip.push('103138');
				arrVip.push('135847');
				arrVip.push('136858');
				arrVip.push('132277');
				arrVip.push('121774');
				arrVip.push('69020');
				arrVip.push('121585');
				arrVip.push('68056');
				arrVip.push('37074');
				arrVip.push('136538');
				arrVip.push('136001');
				arrVip.push('134194');
				arrVip.push('119141');
				arrVip.push('90425');
				arrVip.push('133232');
				arrVip.push('121775');
				arrVip.push('63119');
				arrVip.push('130096');
				arrVip.push('107302');
				arrVip.push('103524');
				arrVip.push('131617');
				arrVip.push('132268');
				arrVip.push('129159');
				arrVip.push('133234');
				arrVip.push('121488');
				arrVip.push('118320');
				arrVip.push('136722');
				arrVip.push('107977');
				arrVip.push('104257');
				arrVip.push('115486');
				arrVip.push('84840');
			},
			getUser(){
				Indicator.open();
				return new Promise((resolve,err)=>{
						this.$axios({
							method:"get",
							url:"/My/GetUserInfoV2?v="+Math.random()*10,
							headers:this.header_token
						})
						.then(res=>{
							resolve(res);
							console.log(res);
							if(res.data.code==0){
								this.userInfo=res.data.data;
								this.jjrNum=res.data.data.EmpNo;
								if(res.data.data.SignMessage){
									this.myMsg=res.data.data.SignMessage;
								}
								// 白名单测试
								if(this.empArr.toString().indexOf(res.data.data.EmpNo)>-1){
									this.hasTest=true;
								}
								
								// this.lineW=res.data.data.JiFenEnable/(res.data.data.JiFenEnable+res.data.data.NextLevelDistance)*100
								this.tx="https://pic.centanet.com/shenzhen/pic/agent/"+res.data.data.EmpNo+".jpg"
							}else{
								Toast(res.data.msg);
								if(res.data.code==500){
									localStorage.removeItem("userInfo");
									var oldUrl=window.location.href;
									sessionStorage.setItem('toName',oldUrl);
									this.$router.push({name:"login"});
								}
							}
							Indicator.close();
						})
						.catch(error=>{
							Indicator.close();
							Toast("网络错误，请稍后再试");
						})
				})
			},
			setMsg(){
				return new Promise((resolve)=>{
						this.$axios({
							method:"post",
							url:"/My/PostMySign",
							headers: {
								"token":uToken()
							 },	
							data:{
								message:this.myMsg
							}
						})
						.then(res=>{
							console.log(res);
							resolve(res);
							if(res.data.code==0){
								this.show=false;
								this.getUser();
								Toast("保存成功");
							}else{
								Toast(res.data.msg);
							}
							Indicator.close();
						})
						.catch(error=>{
							Indicator.close();
							Toast("网络错误，请稍后再试");
						})
				})
			},
			logOut(){
				this.$store.dispatch("logout");
				document.title='登录'
				this.$router.push({name:"login"})
			}
		}
	}
</script>

<style>
	.my{background-color: #F5F5F5;padding-bottom: 2rem;min-height: 100vh;}
	.myTop{position: relative;height: 3.2rem;width: 100%;background: url(../assets/img/myBj.png) center bottom no-repeat;background-size: 100%;padding: 0.6rem 0.3rem 0.4rem;}
	.mtSet{width: 0.8rem;height: 0.8rem;background: url(../assets/img/m-set.png) right top no-repeat;background-size: 0.42rem;position: absolute;right: 0.3rem;top: 0.4rem;}
	.myYb{position: absolute;width: 6.9rem;height: 1.5rem; padding: 0.16rem;background-color: #fff;bottom: -0.9rem;left: 0.3rem;text-align: center;box-shadow: 0px 2px 6px 2px rgba(0, 0, 0, 0.06);border-radius: 0.1rem;}
	.mybT .iconY{width: 0.44rem;margin-right: 0.1rem;vertical-align: middle;}
	.myYb p{font-size: 0.3rem;color: #999;margin: 0.06rem 0;}
	.mybT{font-size: 0.46rem;color: #F93C32;width: 2.8rem;padding-bottom: 0.1rem;display: inline-block;}
	.mybT label{font-size: 0.24rem;color: #999;margin-left: 0.1rem;}
	.mybT span{font-size: 0.46rem;font-weight: 500;}
	.mtL{width: 1.3rem;height: 1.3rem;border: 2px solid #fff;position: relative;border-radius: 50%;float: left;}
	.mtL label{width: 100%;height: 100%;display: block;overflow: hidden;border-radius: 50%;}
	.mtL img{width: 100%;}
	.mtR{width: 5.4rem;margin-left: 0.2rem;float: left;}
	.mtR h3{color: #fff;font-size: 0.4rem;margin-bottom: 0.08rem;font-weight: 550;}
	.mtR h3 span{font-weight: 350;font-size: 0.26rem;margin-left: 0.1rem;padding: 0 0.15rem;background: url(../assets/img/line-bj.png) left top repeat-x;background-size: 100%;border-radius: 0.3rem;overflow: hidden;}
	.mtL span img{width: 0.44rem;position: absolute;right: 0;bottom: -0.2rem;}
	.mtR .msecond{color: #fff;margin-bottom: 0.06rem;font-size: 0.24rem;line-height: 0.3rem;}
	.mtR .msecond label{display: inline-block;max-width: 5rem;min-width: 2.6rem;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;float: left;}
	.mtR .msecond span{display: inline-block;width: 0.12rem;height: 0.28rem;background: url(../assets/img/m-right.png) center no-repeat;background-size: 100%;margin-left: 0.2rem;}
	.lineM{width: 3.4rem;height: 3px;background-color: #fff;border-radius: 10px;overflow: hidden;margin: 0.2rem auto 0;}
	.lineM span{display: block;height: 100%;background-color: #FFE349;}
	.lineTip{font-size: 0.2rem;color: #fff;margin-top: 4px;}
	.line-l{width: 1px;height: 0.8rem;background-color: #ddd;display: inline-block;}
	.myC{margin-top: 1.2rem;}
	.myLi,.myList{margin: 0.2rem 0;height: 1rem;padding-left: 1rem;padding-right: 0.3rem; background: #fff url(../assets/img/m-icon1.png) 0.3rem center no-repeat;background-size: 0.47rem;line-height: 1rem;}
	.myList{margin: 0;}
	.myList2{background: #fff url(../assets/img/m-icon2.png) 0.3rem center no-repeat;background-size: 0.47rem;}
	.myList3{background: #fff url(../assets/img/m-icon3.png) 0.3rem center no-repeat;background-size: 0.47rem;}
	.myList4{background: #fff url(../assets/img/m-icon4.png) 0.3rem center no-repeat;background-size: 0.47rem;margin-bottom: 0.2rem;}
	.myList5{background: #fff url(../assets/img/m-icon5.png) 0.3rem center no-repeat;background-size: 0.47rem;}
	.myList6{background: #fff url(../assets/img/m-icon6.png) 0.3rem center no-repeat;background-size: 0.47rem;}
	.myList7{background: #fff url(../assets/img/m-icon7.png) 0.3rem center no-repeat;background-size: 0.47rem;}
	.myList8{background: #fff url(../assets/img/m-icon8.png) 0.3rem center no-repeat;background-size: 0.47rem;}
	.myList9{background: #fff url(../assets/img/m-icon-sc.png) 0.3rem center no-repeat;background-size: 0.47rem;}
	.myList10{background: #fff url(../assets/img/icon-xx.png) 0.3rem center no-repeat;background-size: 0.47rem;}
	.mlAll{border-bottom: 1px solid #ededed;height: 0.98rem;}
	.myList4 .mlAll,.myList8 .mlAll{border: 0;}
	.myliL {display: block;height: 1rem;line-height: 0.8rem;width: 2rem;float: left;font-weight: 500;}
	.myList .myliL{line-height: 1rem;}
	.myliL span{color: #FFC323;font-size: 0.46rem;margin-left: 0.2rem;font-weight: bold;position: relative;top: 0.04rem;}
	.myliR{width: 3.6rem;padding-right: 0.3rem;display: block;height: 1rem;line-height: 1rem;color: #999;font-size: 0.24rem;text-align: right;background: url(../assets/img/icon-right.png) right center no-repeat;background-size: 0.12rem;float: right;}
	.logOut{width: 100%;height: 1rem;line-height: 1rem;text-align: center;background-color: #fff;margin-top: 0.2rem;font-size: 0.32rem;color: #F45048;}
	.logOut a{color: #F45048;display: block;width: 100%;font-weight: 550;}
	.nineTop{background-color: #fff;margin-bottom: 0.2rem;}
	.nineTop p{line-height: 0.6rem;padding-left: 0.3rem;font-size: 0.26rem;color: #999;border-bottom: 1px solid #eee;}
	.nineC{display: flex;flex-wrap: wrap;}
	.nineC label{height: 2.1rem;width: 2.5rem;text-align: center;padding-top: 1.2rem;font-size: 0.3rem;color: #666;position: relative;}
	.nineC label span{width: 0.12rem;height: 0.12rem;display: block;background-color: #FF0000;position: absolute;top: 1.3rem;right: 0.45rem;border-radius: 50%;}
	.nineC label i{position: absolute;top: 0.2rem;right: 0.35rem;color: #FF0000;font-size: 0.24rem;font-style: normal;font-weight: bold;}
	.nineC label:first-child{background: url(../assets/img/nine-jp.png) center 0.4rem no-repeat;background-size: 0.65rem;}
	.nineC label:nth-of-type(2){background: url(../assets/img/nine-sc.png) center 0.4rem no-repeat;background-size: 0.65rem;border: 1px solid #eee;border-top: 0;border-bottom: 0;}
	.nineC label:nth-of-type(3){background: url(../assets/img/nine-xx.png) center 0.4rem no-repeat;background-size: 0.65rem;}
	.ninesC label:first-child{background: url(../assets/img/hb-mp.png) center 0.4rem no-repeat;background-size: 0.65rem;}
	.ninesC label:nth-of-type(2){background: url(../assets/img/hb-fy.png) center 0.4rem no-repeat;background-size: 0.65rem;border: 1px solid #eee;border-top: 0;border-bottom: 0;}
	.ninesC label:nth-of-type(3){background: url(../assets/img/hb-zp.png) center 0.4rem no-repeat;background-size: 0.65rem;}
	.ninesC label:nth-of-type(4){background: url(../assets/img/hb-jr.png) center 0.4rem no-repeat;background-size: 0.65rem;border-top: 1px solid #eee;}
	.ninesC label:nth-of-type(5){background: url(../assets/img/hb-lz.png) center 0.4rem no-repeat;background-size: 0.65rem;border: 1px solid #eee;border-bottom: 0;}
	.ninesC label:nth-of-type(6){background: url(../assets/img/hb-app.png) center 0.4rem no-repeat;background-size: 0.44rem;border-top: 1px solid #eee;}
	.ninesC label:nth-of-type(7){background: url(../assets/img/hb-cj.png) center 0.4rem no-repeat;background-size: 0.54rem;border-top: 1px solid #eee;border-bottom: 1px solid #eee;}
	.ninesC label:nth-of-type(8){background: url(../assets/img/hb-zx.png) center 0.4rem no-repeat;background-size: 0.64rem;border: 1px solid #eee;/* border-bottom: 0; */}
	.ninesC label:nth-of-type(9){background: url(../assets/img/hb-xx.png) center 0.4rem no-repeat;background-size: 0.64rem;border-top: 1px solid #eee;border-bottom: 1px solid #eee;}
	.ninesC label:nth-of-type(10){background: url(../assets/img/hb-xp.png) center 0.4rem no-repeat;background-size: 0.64rem;border-right: 1px solid #eee;width: 2.51rem;}
	.myIntr{width: 6.2rem;height: 5.6rem;background-color: #fff;}
	.miTop{height: 1.3rem;background: linear-gradient(134deg, #FB6F52 0%, #F3240A 100%);line-height: 1.3rem;text-align: center;font-size: 0.4rem;font-weight: 600;color: #fff;}
	.miContent{padding: 0.3rem;}
	.miContent textarea{width: 100%;height: 2rem;background-color: #eee;border: 1px solid #ddd;padding: 0.2rem;}
	.miBtn{margin-top: 0.6rem;text-align: center;}
	.miBtn label{display: inline-block;width: 2.4rem;height: 0.8rem;border-radius: 0.4rem;margin: 0 0.2rem;background-color: #ccc;line-height: 0.8rem;font-size: 0.36rem;color: #fff;}
	.miBtn label:last-child{background: linear-gradient(134deg, #FB6F52 0%, #F3240A 100%);}
</style>
