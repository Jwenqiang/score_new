<template>
	<div class="shareCenter">
		<div class="shareC">
			<div class="nineTop">
				<div class="scBaner">
				</div>
				<div class="scBody">
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
					<p class="scTip">温馨提示：【节日海报】当日当天更新</p>
				</div>
			</div>
		</div>
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
		name: 'shareCenter',
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
			this.getUser();
			document.title="分享中心";
			var u = navigator.userAgent;
			if(u.indexOf('aplus') >-1){
				this.inApp=true;
			}
		},
		components: {
		  Foot
		},
		computed: {
			
		},
		methods:{
			getUser(){
				Indicator.open();
				return new Promise((resolve)=>{
						this.$axios({
							method:"get",
							url:"/My/GetUserInfoV2?v="+Math.random()*10,
							headers:this.header_token
						})
						.then(res=>{
							console.log(res);
							resolve(res);
							if(res.data.code==0){
								this.userInfo=res.data.data;
								this.jjrNum=res.data.data.EmpNo;
							}else{
								Toast(res.data.msg);
								if(res.data.code==500){
										// 重新登陆
										this.$store.dispatch('logout');
										setTimeout(()=>{
											this.$router.replace({name:"login"});
										},500)
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
		}
	}
</script>

<style>
	.shareCenter{background: linear-gradient(360deg, #DEF0FF 0%, #A1D4F8 100%);min-height: 100vh;}
	.nineTop{margin-bottom: 0.2rem;}
	.scBaner{width: 100%;height: 3.2rem;background: url(../../public/img/scBan.png) center no-repeat;background-size: 7.5rem;}
	.scBody{padding: 0.3rem;}
	.scBody .nineC{display: flex;flex-wrap: wrap;box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.1);background: #fff;border-radius: 0.08rem;}
	.scBody .nineC label{height: 2rem;width: 33.3%;text-align: center;padding-top: 1.2rem;font-size: 0.3rem;color: #666;position: relative;}
	.nineC label span{width: 0.12rem;height: 0.12rem;display: block;background-color: #FF0000;position: absolute;top: 1.3rem;right: 0.45rem;border-radius: 50%;}
	.nineC label i{position: absolute;top: 0.2rem;right: 0.35rem;color: #FF0000;font-size: 0.24rem;font-style: normal;font-weight: bold;}
	.nineC label:first-child{background: url(../assets/img/nine-jp.png) center 0.4rem no-repeat;background-size: 0.65rem;}
	.nineC label:nth-of-type(2){background: url(../assets/img/nine-sc.png) center 0.4rem no-repeat;background-size: 0.65rem;border: 1px solid #eee;border-bottom: 0;}
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
	.scBody .ninesC label:nth-of-type(10){background: url(../assets/img/hb-xp.png) center 0.4rem no-repeat;background-size: 0.64rem;border-right: 1px solid #eee;}
	.myIntr{width: 6.2rem;height: 5.6rem;background-color: #fff;}
	.miTop{height: 1.3rem;background: linear-gradient(134deg, #FB6F52 0%, #F3240A 100%);line-height: 1.3rem;text-align: center;font-size: 0.4rem;font-weight: 600;color: #fff;}
	.miContent{padding: 0.3rem;}
	.miContent textarea{width: 100%;height: 2rem;background-color: #eee;border: 1px solid #ddd;padding: 0.2rem;}
	.miBtn{margin-top: 0.6rem;text-align: center;}
	.miBtn label{display: inline-block;width: 2.4rem;height: 0.8rem;border-radius: 0.4rem;margin: 0 0.2rem;background-color: #ccc;line-height: 0.8rem;font-size: 0.36rem;color: #fff;}
	.miBtn label:last-child{background: linear-gradient(134deg, #FB6F52 0%, #F3240A 100%);}
	
	.scTip{font-size: 0.24rem;color: #999;margin-top: 0.3rem;padding-left: 0.1rem;}
</style>
