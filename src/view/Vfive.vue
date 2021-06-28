<template>
	<div class="fiveV">
		<div class="fvTop">
			<img src="../assets/static/banFive.png" width="100%"/>
		</div>
		<div class="fvC">
			<div class="fvM">
				<div class="fvB">
					<div class="fv1">
						<div class="fvt1">
							<div class="fvtTitle"></div>
							<p class="fvTip">经纪人分享以下内容至朋友圈，即可获取下图对应元宝奖励</p>
							<div class="fvList fvl1">
								<div class="fvlTop"></div>
								<ul>
									<li>App下载海报<button @click="$router.push({name:'hb',query:{id:'5'}})">分享</button></li>
									<li>房源海报<button @click="$router.push({name:'hbHouse',query:{jjr:jjrNum}})">分享</button></li>
									<li @click="$router.push({name:'hbHouse',query:{jjr:jjrNum}})">房源<button>分享</button></li>
								</ul>
							</div>
							<div class="fvList fvl2">
								<div class="fvlTop fvlTop2"></div>
								<ul>
									<li>招聘海报<button @click="$router.push({name:'hb',query:{id:'2'}})">分享</button></li>
									<li>名片海报<button @click="$router.push({name:'hb',query:{id:'0'}})">分享</button></li>
									<li>节日海报<button @click="$router.push({name:'hb',query:{id:'3'}})">分享</button></li>
									<li>正能量海报<button @click="$router.push({name:'hb',query:{id:'4'}})">分享</button></li>
								</ul>
							</div>
							<p class="fvTip">活动期间最高奖励1000元宝/人，活动仅限入职经纪人参与</p>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="fvC fvC2">
			<div class="fvM">
				<div class="fvB">
					<div class="fv1">
						<div class="fvt1">
							<div class="fvtTitle"></div>
							<div class="fvtC2">
								<img src="../assets/static/f2L.png" />
								<img src="../assets/static/f2R.png" />
							</div>
							<button class="gUser" @click="$router.replace({name:'custom'})">抢商机</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { Toast,Indicator } from 'mint-ui';
	import {
	  uToken,
	} from "@/global/token.js";
	export default{
		name: 'vfive',
		data(){
			return{
				header_token:{"token": uToken()},
				jjrNum:""
			}
		},
		watch:{
			'$route' (to, from) {
			   if (to.name === 'vfive') {
				  this.getUser();
			    }
			 }
		},
		mounted() {
			document.title="5.0上线双重礼";
			this.getUser();
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
								this.jjrNum=res.data.data.EmpNo;
							}else{
								Toast(res.data.msg);
								if(res.data.code==500){
									localStorage.removeItem("userInfo");
									this.$router.push({name:"login"});
								}
							}
							setTimeout(()=>{
								Indicator.close();
							},300)
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

<style scoped>
	.fiveV{background-color: #F51D2B;min-height: 100vh;}
	.fvTop{height: 5.8rem;}
	.fvC{padding: 0.3rem;position: relative;margin-top: 0.4rem;}
	.fvC2{margin-top: 0;}
	.fvM{background-color: #EEF3F8;padding: 0.15rem 0.12rem;border-radius: 0.2rem;margin-bottom: 0.4rem;}
	.fvB{background-color: #fff;padding: 0.2rem;border-radius: 0.2rem;}
	.fvtTitle{height: 0.9rem;width: 100%;background: url(../assets/static/f1.png) center no-repeat;background-size: 7.22rem;position: absolute;left: 0;top: -0.3rem;}
	.fvC2 .fvtTitle{background: url(../assets/static/f2.png) center no-repeat;background-size: 6.41rem;}
	.fvTip{font-size: 0.24rem;color: #1A60E1;margin: 0.15rem 0;}
	.fvList{padding: 0.4rem 0.4rem 0.1rem;background-color: #316CDA;border-radius: 0.1rem;margin-bottom: 0.3rem;}
	.fvlTop{width: 100%;height: 0.5rem;background: url(../assets/static/fvl1.png) center no-repeat;background-size: 4.49rem;}
	.fvlTop2{background: url(../assets/static/fvl2.png) center no-repeat;background-size: 4.49rem;}
	.fvList li{display: block;padding: 0.3rem 0;height: 1.14rem;line-height: 0.54rem;border-bottom: 0.5px solid #ededed;font-size: 0.3rem;font-weight: 500;padding-left: 0.8rem;color: #fff;}
	.fvList li button{width: 1.5rem;height: 0.54rem;background: linear-gradient(181deg, #F9FDFF, #FFF495);font-size: 0.38rem;color: #1A60E1;font-weight: 600;border-radius: 0.3rem;float: right;}
	.fvl1 li:nth-of-type(1){background: url(../assets/static/f-xz.png) left center no-repeat;background-size: 0.54rem;}
	.fvl1 li:nth-of-type(2){background: url(../assets/static/f-fy.png) left center no-repeat;background-size: 0.54rem;}
	.fvl1 li:nth-of-type(3){background: url(../assets/static/f-fy1.png) left center no-repeat;background-size: 0.54rem;border-bottom: 0;}
	
	.fvl2 li:nth-of-type(1){background: url(../assets/static/f-zp.png) left center no-repeat;background-size: 0.54rem;}
	.fvl2 li:nth-of-type(2){background: url(../assets/static/f-mp.png) left center no-repeat;background-size: 0.54rem;}
	.fvl2 li:nth-of-type(3){background: url(../assets/static/f-jr.png) left center no-repeat;background-size: 0.54rem;}
	.fvl2 li:nth-of-type(4){background: url(../assets/static/f-znl.png) left center no-repeat;background-size: 0.54rem;border-bottom: 0;}
	.fvtC2{display: flex;justify-content: space-between;margin-top: 0.35rem;}
	.fvtC2 img{width: 3rem;height: 2.53rem;}
	.gUser{margin: 0.5rem auto 0.3rem;display: block;width: 5.45rem;height: 0.8rem;background: linear-gradient(0deg, #CC2720, #FF5B54);font-size: 0.38rem;color: #fff;font-weight: 600;border-radius: 0.4rem;line-height: 0.78rem;}
</style>
