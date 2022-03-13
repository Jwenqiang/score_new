<template>
	<div class="shareCenter">
		<div class="shareC">
				<div class="scBaner">
				</div>
				<div class="scBody">
					<div class="nineC ninesC">
						<label @click="goIcon('hb','委卖海报','12','','(1,0)')">委卖海报</label>
						<label @click="goIcon('hb','名片海报','0','','(1,1)')">名片海报</label>
						<label @click="goIcon('hbHouse','房源海报',jjrNum,'jjr','(1,2)')">房源海报</label>
						<label @click="goIcon('hb','招聘海报','2','','(1,3)')">招聘海报<!-- <span v-if="showZp"></span> --><!-- <i>new</i> --></label>
						<label @click="goIcon('hb','节日海报','3','','(2,1)')">节日海报<!-- <span v-if="showJr"></span> --><!-- <i>new</i> --></label>
						<label @click="goIcon('hb','正能量海报','4','','(2,2)')">正能量海报</label>
						<label @click="goIcon('hb','App下载海报','5','','(2,3)')">App下载海报</label>
						<label @click="goIcon('hb','成交战报','7','','(3,1)')">成交战报</label>
						<label @click="goIcon('hbZx','分享资讯',jjrNum,'jjr','(3,2)')">分享资讯</label>
						<label @click="goIcon('schoolList','分享学校',jjrNum,'jjr','(3,3)')">分享学校</label>
						<label @click="goIcon('hbHouseNew','新盘入市',jjrNum,'jjr','(4,1)')">新盘入市</label>
						<label @click="goIcon('morning','早安分享','','','(4,2)')">早安分享</label>
						<label @click="goIcon('hb','小贴士','11','','(4,3)')">小贴士</label>
					</div>
					<p class="scTip">温馨提示：【节日海报】当日当天更新</p>
				</div>
		</div>
		<!-- 回馈活动弹窗-->
			<div class="hkShow">
				<div class="hkbj" v-if="moduleNum>-1" @click="moduleNum=-1"></div>
				<Module :showOn="moduleNum" :prizeName="prizeName" @changeNum="changeModule"></Module>
			</div>
			<!-- 领取成功弹窗 -->
			<div class="hkShow" :class="addCar?'animationCar':''">
				<div class="hkbj" v-if="addCar" @click="addCar=false"></div>
				<div class="giveMsg" @click="$router.push({'name':'myPrize'})">
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
	// 京东框架2.X
	import nutUI from '@nutui/nutui/dist/nutui.min.js';  // 加载构建后的JS
	import '@nutui/nutui/dist/nutui.min.css';  //加载构建后的CSS
	nutUI.install(Vue);
	import Module from '@/components/module.vue'
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
				showJr:true,
				
				addCar:false,
				moduleNum:-1,
				prize:"",
				prizeName:"45元礼包",
				runNum:Math.random(),
				prizeId:""
			}
		},
		created(){
			this.getUser();
			document.title="分享中心";
			var u = navigator.userAgent;
			if(u.indexOf('aplus') >-1){
				this.inApp=true;
			}
			if(this.runNum<0.3){
				this.getPrize()
			}
		},
		components: {
		  Foot,
			Module
		},
		methods:{
			// icon跳转 神策
			goIcon(r,n,num,jjr,position){
				if(jjr){
					this.$router.push({'name':r,query:{jjr:num}});
				}
				else if(num){
					this.$router.push({'name':r,query:{id:num}});
				}else{
					this.$router.push({'name':r});
				}
				this.$sensors.track('sc_click_icon', {
					sc_business_type:'other',
					sc_current_page:"首页_分享中心页",
					sc_icon_name:n+"icon",
					sc_icon_position:position
				});
			},
			// 经纪人回馈活动中奖查询
			getPrize(){
				return new Promise((resolve)=>{
						this.$axios({
							method:"get",
							url:"/Activity/ShowPrize?v="+Math.random()*10,
							headers:this.header_token,
						})
						.then(res=>{
							console.log(res);
							resolve(res);
							if(res.data.code==0&&res.data.data.code==0){
								this.prize=res.data.data.data;
								this.prizeId=res.data.data.data.Id;
								if(res.data.data.data.Type==2){
									this.prizeName=res.data.data.data.PrizeName;
								}
								this.setModule(res.data.data.data.Type);
							}
						})
						.catch(error=>{
							this.$toast.text("网络错误，请稍后再试");
						})
				})
			},
			givePrize(){
				return new Promise((resolve)=>{
						this.$axios({
							method:"post",
							url:"/Activity/ReceivePrize",
							headers:this.header_token,
							data:{
								id:this.prizeId
							}
						})
						.then(res=>{
							console.log(res);
							if(res.data.data.code==0){
								resolve(res);
							}else{
								this.$toast.text(res.data.data.msg);
								// 新增未成功关闭弹窗
								this.moduleNum=-1;
							}
						})
						.catch(error=>{
							this.$toast.text("网络错误，请稍后再试");
							// 新增未成功关闭弹窗
							this.moduleNum=-1;
						})
				})
			},
			setModule(n){
				this.moduleNum=n
			},
			async changeModule(n){
				await this.givePrize();
				if(n==2){
					setTimeout(()=>{
						this.moduleNum=-1;
						this.addCar=true;
					},1200)
				}else if(n==3){
					setTimeout(()=>{
						this.moduleNum=-1;
						this.addCar=true;
					},500)
				}else{
					this.moduleNum=-1;
					this.addCar=true;
				}
				
			},
			// async changeModule(n){
			// 	await this.givePrize();
			// 	if(n==2){
			// 		setTimeout(()=>{
			// 			this.addCar=true;
			// 			setTimeout(()=>{
			// 				this.$toast.text("领取成功 请到'我的奖品'查看");
			// 				setTimeout(()=>{
			// 					this.moduleNum=-1;
			// 					this.addCar=false;
			// 				},500)
			// 			},500)
			// 		},1000)
			// 	}else if(n==3){
			// 		setTimeout(()=>{
			// 			this.addCar=true;
			// 			setTimeout(()=>{
			// 				this.$toast.text("领取成功 请到'我的奖品'查看");
			// 				setTimeout(()=>{
								
			// 					this.moduleNum=-1;
			// 					this.addCar=false;
			// 				},500)
			// 			},500)
			// 		},500)
			// 	}else{
			// 		this.addCar=true;
			// 		setTimeout(()=>{
			// 			this.$toast.text("领取成功 请到'我的奖品'查看");
			// 			setTimeout(()=>{
							
			// 				this.moduleNum=-1;
			// 				this.addCar=false;
			// 			},500)
			// 		},500)
			// 	}
				
			// },
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

<style scoped>
	.shareCenter{background: linear-gradient(360deg, #DEF0FF 0%, #A1D4F8 100%);min-height: 100vh;}
	.scBaner{width: 100%;height: 3.2rem;background: url(../../public/img/scBan.png) center no-repeat;background-size: 7.5rem;}
	.scBody{padding: 0.3rem;}
	.scBody .nineC{display: flex;flex-wrap: wrap;box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.1);background: #fff;border-radius: 0.08rem;}
	.scBody .nineC label{height: 2rem;width: 33.3%;text-align: center;padding-top: 1.2rem;font-size: 0.3rem;color: #666;position: relative;border: 1px solid #eee;border-top: 0;border-left: 0;}
	.nineC label span{width: 0.12rem;height: 0.12rem;display: block;background-color: #FF0000;position: absolute;top: 1.3rem;right: 0.45rem;border-radius: 50%;}
	.nineC label i{position: absolute;top: 0.2rem;right: 0.35rem;color: #FF0000;font-size: 0.24rem;font-style: normal;font-weight: bold;}
	.nineC label:first-child{background: url(../assets/img/nine-jp.png) center 0.4rem no-repeat;background-size: 0.65rem;}
	.nineC label:nth-of-type(2){background: url(../assets/img/nine-sc.png) center 0.4rem no-repeat;background-size: 0.65rem;}
	.nineC label:nth-of-type(3){background: url(../assets/img/nine-xx.png) center 0.4rem no-repeat;background-size: 0.65rem;}
	
	.ninesC label{border-right: 1px solid #eee;}
	.ninesC label:nth-of-type(1){background: url(../../public/images/m-icon-wm.png) center 0.4rem no-repeat;background-size: 0.65rem;}
	.ninesC label:nth-of-type(2){background: url(../assets/img/hb-mp.png) center 0.4rem no-repeat;background-size: 0.65rem;}
	.ninesC label:nth-of-type(3){background: url(../assets/img/hb-fy.png) center 0.4rem no-repeat;background-size: 0.65rem;}
	.ninesC label:nth-of-type(4){background: url(../assets/img/hb-zp.png) center 0.4rem no-repeat;background-size: 0.65rem;}
	.ninesC label:nth-of-type(5){background: url(../assets/img/hb-jr.png) center 0.4rem no-repeat;background-size: 0.65rem;}
	.ninesC label:nth-of-type(6){background: url(../assets/img/hb-lz.png) center 0.4rem no-repeat;background-size: 0.65rem;}
	.ninesC label:nth-of-type(7){background: url(../assets/img/hb-app.png) center 0.4rem no-repeat;background-size: 0.44rem;}
	.ninesC label:nth-of-type(8){background: url(../assets/img/hb-cj.png) center 0.4rem no-repeat;background-size: 0.54rem;}
	.ninesC label:nth-of-type(9){background: url(../assets/img/hb-zx.png) center 0.4rem no-repeat;background-size: 0.64rem;}
	.ninesC label:nth-of-type(10){background: url(../assets/img/hb-xx.png) center 0.4rem no-repeat;background-size: 0.64rem;}
	.scBody .ninesC label:nth-of-type(11){background: url(../assets/img/hb-xp.png) center 0.4rem no-repeat;background-size: 0.64rem;}
	.ninesC label:nth-of-type(12){background: url(../../public/images/hb-za.png) center 0.4rem no-repeat;background-size: 0.64rem;}
	.ninesC label:nth-of-type(13){background: url(~@/assets/img/m-icon-ts.png) center 0.4rem no-repeat;background-size: 0.42rem;border-bottom: 0;}
	.ninesC label:nth-of-type(3n){border-right: 0;}
	.myIntr{width: 6.2rem;height: 5.6rem;background-color: #fff;}
	.miTop{height: 1.3rem;background: linear-gradient(134deg, #FB6F52 0%, #F3240A 100%);line-height: 1.3rem;text-align: center;font-size: 0.4rem;font-weight: 600;color: #fff;}
	.miContent{padding: 0.3rem;}
	.miContent textarea{width: 100%;height: 2rem;background-color: #eee;border: 1px solid #ddd;padding: 0.2rem;}
	.miBtn{margin-top: 0.6rem;text-align: center;}
	.miBtn label{display: inline-block;width: 2.4rem;height: 0.8rem;border-radius: 0.4rem;margin: 0 0.2rem;background-color: #ccc;line-height: 0.8rem;font-size: 0.36rem;color: #fff;}
	.miBtn label:last-child{background: linear-gradient(134deg, #FB6F52 0%, #F3240A 100%);}
	
	.scTip{font-size: 0.24rem;color: #999;margin-top: 0.3rem;padding-left: 0.1rem;}
</style>
