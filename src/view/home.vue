<template>
	<div class="home">
		<div class="top">
			<div class="swiper-warp">
<!-- 				<mt-swipe :auto="4000">
					<mt-swipe-item><a @click="$router.push({'name':'vcj'})"><img src="@/assets/static/banner-cj.png"/></a></mt-swipe-item>
					<mt-swipe-item><a @click="goFive"><img src="@/assets/img/banner0402.png"/></a></mt-swipe-item>
					<mt-swipe-item><a href="https://mp.weixin.qq.com/s/EO_Ne0RFct3ptAHoUlfOVg"><img src="@/assets/img/banner0406.png"/></a></mt-swipe-item>
					<mt-swipe-item><a @click="$router.push({name:'days',params:{id:'27'}})"><img src="@/assets/img/banner0222.jpg?v=1"/></a></mt-swipe-item>
					<mt-swipe-item><a @click="$router.push({name:'days',params:{id:'24'}})"><img src="@/assets/img/banner0413.jpg"/></a></mt-swipe-item>
					<mt-swipe-item><a @click="$router.push({name:'days',params:{id:'25'}})"><img src="@/assets/img/banner020501.jpg"/></a></mt-swipe-item>
				</mt-swipe> -->
				<nut-swiper
				    direction="horizontal"
				    :loop="true"
				    :canDragging="false"
				    :paginationVisible="true"
					:autoPlay="4000"
					 @slideChangeEnd="handleChange"
				>
					<div  class="nut-swiper-slide gray" >
					    <a @click="$router.push({name:'shareCenter'})"><img src="img/banner0623.png?v=1"/></a>
					</div>
					<div  class="nut-swiper-slide gray" >
					    <a @click="$router.push({name:'houseList'})"><img src="@/assets/static/banner-bz.png"/></a>
					</div>
					<div  class="nut-swiper-slide gray_1" >
					    <a @click="$router.push({name:'rules',query:{id:'20210622'}})"><img src="img/bzj0622.jpg"/></a>
					</div>
					<div  class="nut-swiper-slide gray_1" >
						<a @click="$router.push({name:'days',params:{id:'24'}})"><img src="@/assets/static/banner0607.jpg"/></a>
					</div>
				    <div  class="nut-swiper-slide gray" >
				        <a @click="goCj"><img src="@/assets/static/banner-cj.jpg"/></a>
				    </div>
					<div  class="nut-swiper-slide gray" >
					    <a href="https://mp.weixin.qq.com/s/Dt-7kBAkbuFQxx6Vuyq9LQ"><img src="@/assets/img/banner0609.jpg"/></a>
					</div>
				    <div  class="nut-swiper-slide gray" >
				        <a @click="$router.push({name:'days',params:{id:'31'}})"><img src="@/assets/static/banner0531.png"/></a>
				    </div>
				    <div  class="nut-swiper-slide gray_1" >
				        <a @click="$router.push({name:'days',params:{id:'27'}})"><img src="@/assets/img/banner0222.jpg?v=1"/></a>
				    </div>
<!-- 					<div  class="nut-swiper-slide gray_1" >
					    <a @click="$router.push({name:'days',params:{id:'24'}})"><img src="@/assets/img/banner0508.jpg"/></a>
					</div> -->
<!-- 					<div  class="nut-swiper-slide gray_1" >
					    <a @click="$router.push({name:'days',params:{id:'25'}})"><img src="@/assets/img/banner020501.jpg"/></a>
					</div> -->
				</nut-swiper>
			</div>
		</div>
		<div class="hTag">
			<div class="htL" @click="$router.push({'name':'houseList'})">
				<p><img src="../assets/img/h-fy.png"/></p>
				<p>竞拍房源</p>
			</div>
			<div class="htL" @click="$router.push({'name':'houseListSchool'})">
				<p><img src="../assets/img/h-xx.png"/></p>
				<p>竞拍学校</p>
			</div>
			<div class="htL" @click="$router.push({name:'shareCenter'})">
				<p><img src="../assets/img/h-hb1.png"/></p>
				<p>分享中心</p>
			</div>
			<div class="htL" @click="$router.push({'name':'record'})">
				<p><img src="../assets/img/h-jl.png"/></p>
				<p>竞拍记录</p>
			</div>
		</div>
		<div class="hBox">
			<div class="clear h-tip" @click="$router.push({'name':'message'})">
				<label>消息<i v-if="msg.totalUnRead>0&&msg.totalUnRead<100">{{msg.totalUnRead}}</i><i v-else-if="msg.totalUnRead>99">99+</i></label>
				<span v-if="msg.firstUnReadTitle">{{msg.firstUnReadTitle}}</span>
				<span v-else>暂时没有新的消息哦~</span>
			</div>
			<div class="ltitle">
				<span></span>
				赚元宝
			</div>
			<div class="sign">
				<div class="clear signT">
					<div class="stL">
						<p>{{signText}}</p>
					</div>
					<div class="stR">
						<mt-button type="primary" @click="setSign" v-if="nowSign==false">签到</mt-button>
						<mt-button type="primary" style="opacity: 0.6;" v-else>已签到</mt-button>
					</div>
				</div>
				<div class="signM">
					<div class="smIcon">
						<img src="../assets/img/qd1.png" v-if="isSign<1"/>
						<img src="../assets/img/qd1-1.png" v-else/>
						<p>1天</p>
					</div>
					<div class="smIcon">
						<img src="../assets/img/qd2.png" v-if="isSign<2"/>
						<img src="../assets/img/qd2-1.png" v-else/>
						<p>2天</p>
					</div>
					<div class="smIcon">
						<img src="../assets/img/qd3.png" v-if="isSign<3"/>
						<img src="../assets/img/qd3-1.png" v-else/>
						<p>3天</p>
					</div>
					<div class="smIcon">
						<img src="../assets/img/qd4.png" v-if="isSign<4"/>
						<img src="../assets/img/qd4-1.png" v-else/>
						<p>4天</p>
					</div>
					<div class="smIcon">
						<img src="../assets/img/qd5.png" v-if="isSign<5"/>
						<img src="../assets/img/qd5-1.png" v-else/>
						<p>5天</p>
					</div>
					<div class="smIcon">
						<img src="../assets/img/qd6.png" v-if="isSign<6"/>
						<img src="../assets/img/qd6-1.png" v-else/>
						<p>6天</p>
					</div>
					<div class="smIcon">
						<img src="../assets/img/qd7.png" v-if="isSign<7"/>
						<img src="../assets/img/qd7-1.png" v-else/>
						<p>7天</p>
					</div>
				</div>
			</div>
<!-- 			<div class="newMore" @click="$router.push({'name':'way',params:{'tab':4}})">
				<img src="../assets/img/icon-new.png"/>新手大礼包
			</div> -->
			<div class="newP clear">
				<div class="newP1" @click="$router.push({'name':'way',params:{'tab':3}})"></div>
				<div class="clear newD">
					<div class="newP2" @click="$router.push({'name':'way',params:{'tab':4}})"></div>
					<div class="newP3" @click="$router.push({'name':'way',params:{'tab':2}})"></div>
				</div>
			</div>
			<div class="ltitle">
				<span></span>
				广告位
			</div>
			<div class="newDay">
				<div class="nd1" @click="$router.push({'name':'houseList',params:{'tab':1}})"></div>
				<div class="nd2" @click="$router.push({'name':'houseList',params:{'tab':3}})"></div>
				<div class="nd3" @click="$router.push({'name':'houseList',params:{'tab':4}})"></div>
				<div class="nd4" @click="$router.push({'name':'houseList',params:{'tab':2}})"></div>
			</div>

		</div>
		<foot tab1='1'></foot>
		<div class="showModel modelMsg" v-if="isShowTip==true">
		  <div class="bj"></div>
		  <div class="showMsg">
		    <label class="modelClose" @click="isShowTip=false"></label>
			<p class="homeTip">很遗憾，昨天签到中断了。快去签到领元宝吧，第<span>7天</span>签到可领<span>20元宝</span></p>
			<mt-button type="primary" class="hmBtn" @click="setSign()">立即签到</mt-button>
		  </div>
		</div>

		<div class="sModel mMsg"  v-if="isNew">
		  <div class="bj" @click="isNew=false"></div>
		  <div class="sMsg tipMsg" v-if="yes">
			  <h5>{{tipList.SecondQuDaoName}}奖励已到账</h5>
			  <p class="smallTip">（可在我的-元宝明细中查看）</p>
			  <p class="pNum"><strong>{{tipList.AddYuanBao}}</strong> 元宝</p>
			  <button class="tipBtn" @click="setOld">我知道了</button>
		  </div>
		  <div class="bMsg" @click="isNew=false" v-else>
		  </div>
		</div>
<!-- 		<div class="sModel mMsg" v-if="readMsg && isApp">
		  <div class="bj" @click="readMsg=false"></div>
		  <div class="bRead" @click="setCook()">
		  </div>
		</div> -->
		<div class="sModel mMsg" v-if="readMsg">
		  <div class="bj" @click="readMsg=false"></div>
		  <!-- <label class="sclose" @click="readMsg=false"></label> -->
		  <div class="bRead" @click="setCook()">
		  </div>
		</div>
<!-- 		<div class="fixR" @click="$router.push({name:'houseList'})">
			<img src="../assets/static/icon-week.png"/>
		</div> -->
		<div class="fixR1" @click="$router.push({name:'vcj'})" v-if="inApp">
			<img src="../assets/static/icon-rcj.png"/>
		</div>
	</div>
</template>

<script>
	import Vue from 'vue';
	import NoticeBar from '@nutui/nutui/dist/packages/noticebar/noticebar.js';  // 加载构建后的JS
	import Swiper from '@nutui/nutui/dist/packages/swiper/swiper.js';  // 加载构建后的JS
	import '@nutui/nutui/dist/packages/noticebar/noticebar.css';  //加载构建后的CSS
	import '@nutui/nutui/dist/packages/swiper/swiper.css';  //加载构建后的CSS
	NoticeBar.install(Vue);
	Swiper.install(Vue);
	import Foot from '@/components/foot.vue'
	import { Toast,Indicator } from 'mint-ui';
	import {mapState, mapMutations, mapActions, mapGetters} from 'vuex'
	import {
	  uToken,
	} from "@/global/token.js";
	export default{
		name: 'home',
		data(){
			return{
				header_token:{"token": uToken()},
				signList:"",
				signText:"",
				isSign:0,
				nowSign:false,
				isShowTip:false,
				isApp:false,
				jjrHouse:"",
				yes:true,
				isNew:false,
				tipList:"",
				tipId:"",
				shareCode:"",
				readMsg: true,
				msg:"",
				inApp:false
				// showNew:false
			}
		},
		computed: {
			...mapState(['hasLogin','userInfo']),//判断是否已经登录
		},
		created() {
			if(localStorage.getItem("readHome")){
				this.readMsg=false;
			}
		},
		mounted(){
			if(navigator.userAgent.indexOf('aplus') > -1){
				this.inApp=true
				this.isApp=true
			}
			document.title="首页";
			var u = navigator.userAgent
			if(u.indexOf('aplus') < 0){
				this.getSign()
			}else{
				this.isApp=true;
				this.inApp=true;
				if(this.$route.query.token){
					var t=JSON.stringify({token:this.$route.query.token});
					localStorage.setItem("userInfo",t);
					this.getSign(this.$route.query.token)
				}else{
					this.getSign()
				}
			}
			// this.getJjr();
			this.getTip();
			this.getMsg();
			 // setTimeout(()=>{
				//  this.getShareCode();
			 // },500)
		},
		components: {
		  Foot
		},
		watch:{
			'$route' (to, from) {
			   if (to.name === 'home') {
				  this.getSign();
				  // this.getTip();
			    }
			 }

		},
		methods:{
			goCj(){
				if(this.inApp){
					this.$router.push({'name':'vcj'})
				}else{
					this.$router.push({'name':'days',params:{id:'28'}})
				}
			},
			handleChange(n){
			},
			goFive(){
				if(this.inApp){
					this.$router.push({name:'vfive'})
				}
			},
			getMsg(){
				return new Promise((resolve)=>{
						this.$axios({
							method:"get",
							url:"/Message/IndexIcon?v="+Math.random()*10,
							headers:this.header_token,
						})
						.then(res=>{
							console.log(res);
							resolve(res);
							if(res.data.code==0){
								this.msg=res.data.data
							}else{
								Toast(res.data.msg);
							}
						})
						.catch(error=>{
							Toast("网络错误，请稍后再试");
						})
				})
			},
			setCook(){
        // 标记每个用户只弹一次
        // 当前未区分用户，标记已读后，登录其他用户会不再显示
				this.readMsg=false;
				localStorage.setItem("readHome", 'true')
				this.$router.push({'name':'shareCenter'})
			},
			// getCook(){
			// 	var nowDay=new Date().getDate();
			// 	if(localStorage.getItem("read")){
			// 		if(nowDay>localStorage.getItem("read")){
			// 			this.readMsg=true
			// 		}else{
			// 			this.readMsg=false
			// 		}
			// 	}
			// },
			setOld(){
				Indicator.open();
				return new Promise((resolve)=>{
						this.$axios({
							method:"get",
							url:"/My/UpdateMessageStatus",
							headers:this.header_token,
							params:{
								messageId:this.tipId
							}
						})
						.then(res=>{
							console.log(res);
							resolve(res);
							if(res.data.code==0){
								if(res.data.data.IsSuccess==true){
									this.isNew=false
								}else{
									Toast(res.data.data.Reamark);
								}
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
			toastTip(){
				Toast('功能待开放~');
			},
			getTip(){
				return new Promise((resolve)=>{
						this.$axios({
							method:"get",
							url:"/My/GetJiFenMessageList?v="+Math.random()*10,
							headers:this.header_token,
						})
						.then(res=>{
							console.log(res);
							resolve(res);
							if(res.data.code==0){
								if(res.data.data.length>0){
									this.isNew=true
									this.tipList=res.data.data[0]
									this.tipId=res.data.data[0].Id
								}

							}else{
								Toast(res.data.msg);
							}
						})
						.catch(error=>{
							Toast("网络错误，请稍后再试");
						})
				})
			},
			getSign(t){
				if(this.isApp&&t){
					this.header_token={"token": t}
				}
				return new Promise((resolve)=>{
						this.$axios({
							method:"get",
							url:"/My/GetSignList?v="+Math.random()*10,
							headers:this.header_token
						})
						.then(res=>{
							console.log(res);
							resolve(res);
							if(res.data.code==0){
								this.signText=res.data.data.DayText
								this.signList=res.data.data.ListSign
								this.isSign=res.data.data.DayIndex
								this.nowSign=res.data.data.IsTodaySigned,
								this.isShowTip=res.data.data.IsShowTips
							}else{
								Toast(res.data.msg);
								if(res.data.code==500){
									// 重新登陆
									this.$store.dispatch('logout');
									setTimeout(()=>{
										this.$router.push({name:"login"});
									},500)
								}
							}
						})
						.catch(error=>{
							Indicator.close();
							Toast("网络错误，请稍后再试");
						})
				})
			},
			setSign(){
				this.isShowTip=false;
				return new Promise((resolve)=>{
						this.$axios({
							method:"post",
							url:"/My/Sign",
							headers:this.header_token
						})
						.then(res=>{
							console.log(res);
							resolve(res);
							if(res.data.code==0){
								if(res.data.data.IsSuccess){
									Toast('签到成功~');
									this.getSign();
								}else{
									Toast(res.data.data.Reamark);
								}
							}else{
								Toast(res.data.msg);
							}
						})
						.catch(error=>{
							Toast("网络错误，请稍后再试");
						})
				})
			},
			// getJjr(){
			// 	Indicator.open();
			// 	return new Promise((resolve)=>{
			// 			this.$axios({
			// 				method:"get",
			// 				url:"/ZhongyuanHouse/GetStaffPostEstatesForDetail?v="+Math.random()*10,
			// 				headers:this.header_token,
			// 				params:{
			// 					pageSize:2
			// 				}
			// 			})
			// 			.then(res=>{
			// 				console.log(res);
			// 				if(res.data.code==0){
			// 					this.jjrHouse=res.data.result.list.Result
			// 				}else{
			// 					Toast(res.data.msg);
			// 				}
			// 				Indicator.close();
			// 				resolve(res);
			// 			})
			// 			.catch(error=>{
			// 				Indicator.close();
			// 				Toast("网络错误，请稍后再试");
			// 			})
			// 	})
			// }
		}
	}
</script>

<style scoped>
	.top .mint-cell-wrapper{border: 1px solid #A3866C;}
	.top .swiper-warp{
		width: 100%;
		height: 7.5rem;
	}
	.top .nut-swiper{height: 3rem;}
	.top .nut-swiper a{display: block;width: 100%;height: 3rem;}
	.nut-swiper .nut-swiper-pagination .swiper-pagination-bullet.active{
		background: #fff;
	}
/* 	.top .mint-swipe-indicators{
		bottom: 0.2rem;
		left: 86%;
		width: 1.5rem;
		text-align: right;
	}
	.top .mint-swipe-indicator{
		background: #fff;
		opacity: 0.6;
		width: 0.2rem;
		height: 0.04rem;
		border-radius: 0.04rem;
	}
	.top .mint-swipe-indicator.is-active{
		background: #fff;
		opacity: 1;
	} */
	.home{/* padding: 0.2rem 0.34rem 1.2rem; */padding-bottom: 1rem;background-color: #F5f5f5;}
	.top{height: 3rem;}
	.top img{height: 100%;display: block;width: 100%;}
	.top .swiper-warp{height: 100%;}
	.hTag{width: 100%;background-color: #fff;margin: 0 0 0.3rem;display: flex;padding: 0.3rem 0;}
	.htL{flex: 1;text-align: center;color: #333;font-size: 0.26rem;position: relative;}
	.htL img{width: 0.9rem;display: inline-block;}
	.htL p:first-child{margin-bottom: 0.1rem;}
	.hBox{padding: 0 0.3rem;}
	.ltitle{width: 100%;height: 0.8rem;line-height: 0.8rem;font-size: 0.32rem;font-weight: 500;}
	.ltitle span{display: block;width: 4px;height: 0.3rem;float: left;background-color: #F4472D;margin-right: 0.2rem;margin-top: 0.25rem;}
	.sign {padding: 0.3rem 0.2rem;background-color: #fff;margin-bottom: 0.3rem;margin-top: 0.1rem;border-radius: 0.1rem;box-shadow: 0px 2px 6px 2px rgba(0, 0, 0, 0.06);}
	.signT{margin-bottom: 0.2rem;height: 0.8rem;}
	.stL{width: 70%;float: left;height: 0.8rem;line-height: 0.8rem;}
	.stL h4{font-size: 0.3rem;margin-bottom: 0.1rem;}
	.stR{width: 30%;float: left;text-align: right;padding-top: 0.1rem;}
	.stR button{
		width:1.6rem;
		height:0.6rem;
		background:#F4472D;
		border-radius:0.4rem;
		font-size: 0.3rem;
	}
	.signM{display: flex;width: 100%;}
	.smIcon{flex: 1;text-align: center;color: #999;font-size: 0.24rem;}
	.smIcon img{height: 0.56rem;}
	.newMore{width: 100%;height: 0.8rem; line-height: 0.8rem;border-radius: 0.4rem;padding: 0 0.4rem;background: #fff url(../assets/img/n-right.png) 96% center no-repeat;background-size: 0.36rem;margin-bottom: 0.3rem;}
	.newMore img{width: 0.5rem;margin-right: 0.2rem;vertical-align: -6px;}
	.newP{margin-bottom: 0.3rem;}
	.newTitle{width: 100%;height: 0.6rem;line-height: 0.6rem;margin-bottom: 0.2rem;}
	.newTitle label{float: left;color: #333;font-size: 0.32rem;font-weight: 500;}
	.newTitle span{float: right;width: 4rem;text-align: right; display: block;height: 100%;line-height: 0.6rem;font-size: 0.24rem;color: #999;padding-right: 0.3rem;background: url(~@/assets/img/icon-right.png) right center no-repeat;background-size: 0.12rem;}
	.newP1{width: 3.35rem;height: 3.05rem;background: url(../assets/img/newp1.png) center no-repeat;background-size: 100%;float: left;}
	.newD{width: 3.35rem;height: 1.45rem;float: right;}
	.newD div{width: 3.35rem;height: 1.45rem;margin-bottom: 0.15rem;}
	.newD .newP2{margin-right: 0.18rem;background: url(../assets/img/newp2.png)  center no-repeat;background-size: 100%;}
	.newD .newP3{background: url(../assets/img/newp3.png)  center no-repeat;background-size: 100%;}
	.newDay{/* padding: 0.3rem 0.2rem;background: #fff; */margin-bottom: 0.3rem;}
	.ndL{padding: 0.12rem 0 0.2rem 1.2rem;height: 1.6rem;}
	.ndL1{background: url(../assets/img/ndl1.png) left center no-repeat;background-size: 0.8rem;}
	.ndL2{background: url(../assets/img/ndl2.png) left center no-repeat;background-size: 0.8rem;}
	.ndL3{background: url(../assets/img/ndl3.png) left center no-repeat;background-size: 0.8rem;}
	.ndL4{background: url(../assets/img/ndl4.png) left center no-repeat;background-size: 0.8rem;}
	.ndList{border-bottom: 1px solid #ededed;padding: 0.2rem 0 0.2rem;}
	.ndLeft{float: left;}
	.ndLeft h5{margin-bottom: 0.1rem;font-size: 0.34rem;}
	.ndLeft p{color: #FE5B48;}
	.ndRight{float: right;width: 2rem;text-align: right;}
	.ndRight button{
		margin-top: 0.12rem;
		width:1.6rem;
		height:0.6rem;
		background:linear-gradient(180deg,rgba(253,147,115,1) 0%,rgba(253,76,60,1) 100%);
		border-radius:0.08rem;
		font-size: 0.26rem;
		padding: 0;
	}
	.nd1{width: 100%;height: 2.16rem;background: url(../assets/img/nd1.png) center no-repeat; background-size: 100%;margin-top: 0.2rem;}
	.nd2{width: 100%;height: 2.16rem;background: url(../assets/img/nd2.png) center no-repeat;background-size: 100%;margin-top: 0.2rem;}
	.nd3{width: 100%;height: 2.16rem;background: url(../assets/img/nd3.png) center no-repeat;background-size: 100%;margin-top: 0.2rem;}
	.nd4{width: 100%;height: 2.16rem;background: url(../assets/img/nd4.png) center no-repeat;background-size: 100%;margin-top: 0.2rem;}
	.flSection{background-color: #fff;padding: 0.3rem 0.2rem 0.4rem;margin-bottom: 0.3rem;}
	.flL{width: 100%;height: 2.6rem;display: flex;justify-content: space-between;}
	.flli{width: 2rem;padding-top: 2rem;}
	.flli1{background: url(../assets/img/flli1.png) center top no-repeat;background-size: 100%;}
	.flli2{background: url(../assets/img/flli2.png) center top no-repeat;background-size: 100%;}
	.flli3{background: url(../assets/img/flli3.png) center top no-repeat;background-size: 100%;}
	.flli h5{font-size: 0.28rem;}
	.flli p{font-size: 0.22rem;color: #999;}
	.ndGg{background: url(../assets/img/gg.png) left center no-repeat;background-size: 0.8rem;}
	.jjrSection{background-color: #fff;padding: 0.3rem 0.2rem;}
	.jjrL{padding: 0.3rem 0;border-bottom: 1px solid #ededed;}
	.jjrL:last-child{border: 0;}
	.jrl{width: 2.4rem;float: left;margin-right: 0.2rem;}
	.jrr{float: left;width: 3.82rem;}
	.jrr h4{
		    font-weight: bolder;
		    color: #203140;
		    font-size: 0.3rem;
		    -webkit-line-clamp: 2;
		    text-overflow: ellipsis;
		    display: -webkit-box;
		    -webkit-box-orient: vertical;
		    overflow: hidden;
			margin-bottom: 0.1rem;
	}
	.jrr p{font-size: 0.26rem;}
	.jrbtn{text-align: right;}
	.jrbtn button{
		margin-top: 0.12rem;
		width:1.6rem;
		height:0.6rem;
		background:linear-gradient(180deg,rgba(253,147,115,1) 0%,rgba(253,76,60,1) 100%);
		border-radius:0.08rem;
		font-size: 0.28rem;
	}
	.showModel{
	  position: fixed;
	  width: 100%;
	  height: 100%;
	  z-index: 90;
	}
	.bj{position: fixed;background: #000;opacity: 0.5;width: 100%;height: 100%;left: 0;top: 0;z-index: 91;}
	.home .showMsg{font-size: 16px; position: fixed;left: 50%;top: 50%;transform: translate(-50%,-50%);width: 90%;height: 4.2rem; background: #fff;z-index: 92;padding: 0.8rem 0.7rem;border-radius: 8px;}
	.modelClose{position: absolute;right: 0rem;top: 0rem;cursor: pointer;width: 0.8rem;height: 0.8rem;display: block;background: url(../assets/img/close.png) center no-repeat;background-size: 0.27rem;}
	.moudelT{font-size: 0.34rem;font-weight: bold;text-align: center;margin-bottom: 0.6rem;}
	.moudelT img{width: 0.5rem;margin-right: 0.1rem;vertical-align: middle;}
	.showMsg p{margin-bottom: 0.3rem;}
	.showMsg p label{font-size: 0.32rem;font-weight: bold;}
	.showMsg p span{font-size: 0.28rem;color: #666;}
	.showMsg p i{font-style: normal;display: inline-block;width: 0.6rem;height: 0.6rem;border: 1px solid #333;border-radius: 50%;text-align: center;line-height: 0.5rem;font-size: 0.4rem;}
	.showMsg p strong{font-size: 0.36rem;margin: 0 0.3rem;font-weight: 500;color: #F45048;}
	.homeTip{color: #333;font-size: 0.32rem;line-height: 1.6;}
	p.homeTip span{color: #F45048;font-size: 0.34rem;}
	.hmBtn{width: 3rem;height: 0.8rem;margin: 0.6rem auto 0;display: block;background-color: #F45048;border-radius: 0.4rem;}

	.sModel{
/* 	  position: fixed;
	  width: 100%;
	  height: 100%;
	  z-index: 90; */
	  position: relative;
	}
	.bj{position: fixed;background: #000;opacity: 0.5;width: 100%;height: 100%;left: 0;top: 0;z-index: 91;}
	.sMsg{
		font-size: 16px; position: fixed;left: 50%;top: 50%;margin: -4.5rem 0 0 -3.75rem; width: 7.5rem;height: 7.2rem; background: url(../assets/img/tipBj.png) center no-repeat;background-size: 5rem; z-index: 92;padding: 0.8rem 0.7rem;border-radius: 8px;
		transition: all 0.5s ease-in;
		animation: dh 0.8s 1;
	 }
	 .bMsg{
		 font-size: 16px; position: fixed;left: 50%;top: 50%;margin: -4.5rem 0 0 -3.75rem; width: 7.5rem;height: 7.2rem; background: url(../assets/img/b.png) center no-repeat;background-size: 5.4rem; z-index: 92;;
		animation: bh 0.5s 1 forwards;
	 }
	 @keyframes dh{
	 	0%{transform: scale(0);}
	 	60%{transform: scale(1.1);}
		100%{transform: scale(1);}
	 }
	 @keyframes bh{
	 	0%{transform: translateX(-600px);}
	 	100%{transform: translateX(0);}
	 }
/* 	 .bRead{
		 font-size: 16px; position: fixed;left: 50%;top: 50%;margin: -4.5rem 0 0 -3.75rem; width: 7.5rem;height: 7.2rem; background: url(../assets/img/fiveTc.png) center bottom no-repeat;background-size: 5.72rem; z-index: 92;;
		 animation: bh 0.5s 1 forwards;
	 } */
	 .bRead{
	 		 font-size: 16px; position: fixed;left: 0;top: 50%;margin: -4.8rem 0 0 0; width: 7.5rem;height: 9.5rem; background: url(../../public/img/showShare.png?v=2) center bottom no-repeat;background-size: 7.5rem; z-index: 92;;
	 		 animation: bh 0.5s 1 forwards;
	 }
	.mClose{position: absolute;right: 1.4rem;top: 1rem;cursor: pointer;width: 0.8rem;height: 0.8rem;display: block;background: url(../assets/img/nClose.png) center no-repeat;background-size: 0.27rem;}
.tipMsg{text-align: center;padding-top: 3.5rem;padding-right: 0.4rem;}
.tipMsg h5{font-size: 0.3rem;color: #fff;}
.smallTip{font-size: 0.22rem;margin-top: 0.05rem; margin-bottom: 0.1rem;color: #fff;}
.pNum{font-size: 0.3rem;color: #fff;margin-bottom: 0.2rem;}
.pNum strong{font-size: 0.7rem;}
.tipBtn{width: 2.5rem;height: 0.7rem;background-color: #fff;border-radius: 0.4rem;color: #F80000;font-size: 0.32rem;}
.fixR{position: fixed;top: 63%;right: 0;}
.fixR1{position: fixed;top: 76%;right: 0;}
.fixR img,.fixR1 img{width: 1.2rem;}
.h-tip{width: 100%;height: 0.6rem; line-height: 0.6rem;border-radius: 0.4rem;padding: 0.15rem 0.4rem;background: #fff url(../assets/img/n-right.png) 96% center no-repeat;background-size: 0.3rem;margin-bottom: 0.2rem;
box-shadow: 0px 2px 6px 2px rgba(0, 0, 0, 0.06);}
.h-tip label{display: inline-block;float: left;height: 0.3rem;line-height: 0.3rem;position: relative;}
.h-tip label i{
	font-style: normal;font-size: 0.2rem;font-weight: 300;border-radius: 3px;background-color: #FF0000;color: #fff;position: absolute;top: -0.1rem;right: -0.24rem;
	display: block;
	    max-width: 0.36rem;
			padding: 0 0.08rem;
	    height: 0.24rem;
	    text-align: center;
	    line-height: 0.24rem;
	}
.h-tip span{display: inline-block;width: 5rem;color: #999;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;border-left: 1px solid #999;height: 0.3rem;line-height: 0.3rem;margin-left: 0.3rem;padding-left: 0.2rem;float: left;font-size: 0.26rem;}
.sclose{display: block;width: 0.64rem;height: 0.64rem;position: fixed;bottom: 22%;left: 3.4rem;background: url(../assets/img/nClose.png) center no-repeat;background-size: 60%;z-index: 96;border: 1px solid #fff;border-radius: 50%;animation: bh 0.5s 1 forwards;}
.hsTip{font-size: 0.24rem;color: #F4472D;font-style: normal;position: absolute;right: 5px;top: -0.15rem;font-weight: bold;}
</style>
