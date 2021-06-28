<template>
	<div class="good">
		<div class="flSection">
			<div class="flL">
				<div class="flli flli1" @click="$router.push({name:'goods',params:{id:'1'}})">
					<h4>获得好房推荐 >></h4>
					<p>每套房源的首次发布者获得奖励</p>
				</div>
				<div class="flli flli2" @click="$router.push({name:'goods',params:{id:'2'}})">
					<h4>400进线接听 >></h4>
					<p>月月都有奖励</p>
				</div>
				<div class="flli flli3" @click="$router.push({name:'goods',params:{id:'3'}})">
					<h4>微聊进线应答 >></h4>
					<p>应答率越高奖励越多</p>
				</div>
				<div class="flli flli4" @click="$router.push({name:'goods',params:{id:'4'}})">
					<h4>新房点评被置顶 >></h4>
					<p>优秀点评被置顶得元宝</p>
				</div>
				<div class="flli flli5" @click="$router.push({name:'goods',params:{id:'5'}})">
					<h4>网络英雄活动 >></h4>
					<p>重金奖励网络达人</p>
				</div>
				<div class="flli flli6" @click="$router.push({name:'goods',params:{id:'6'}})">
					<h4>App推广达人活动 >></h4>
					<p>推广达人还能获得元宝奖励</p>
				</div>		
				<div class="flli flli7" @click="$router.push({name:'goods',params:{id:'7'}})">
					<h4>推荐APP下载有礼 >></h4>
					<p>1个下载奖励100元宝</p>
				</div>	
				<div class="flli flli8" @click="toastTip">
					<h4>经纪人学习考试 >></h4>
					<p>考试成绩越高奖励越多</p>
				</div>	
			</div>
		</div>
		
		<div class="sModel mMsg"  v-if="isNew">
		  <div class="bj" @click="isNew=false"></div>
		  <div class="sMsg" v-if="yes">
			<label class="mClose" @click="isNew=false"></label>
			<span style="width: 3.9rem;height: 1rem;position: absolute;display: block;bottom: 0.32rem;left: 1.8rem;" @click="setOld"></span>
		  </div>
		  <div class="bMsg" @click="isNew=false" v-else>
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
		name: 'good',
		data(){
			return{
				header_token:{"token": uToken()},
				isSign:1,
				yes:true,
				isNew:false
			}
		},
		components: {
		},
		mounted(){
		},

		methods:{
			setOld(){
				Indicator.open();
				return new Promise((resolve)=>{
						this.$axios({
							method:"get",
							url:"/My/GetNewPersonGift",
							headers:this.header_token,
							params:{
								pageCode:"XRJML_FLZX"
							}
						})
						.then(res=>{
							console.log(res);
							resolve(res);
							if(res.data.code==0){
								if(res.data.data.IsSuccess==true){
									this.yes=false
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
			getTip(){
				return new Promise((resolve)=>{
						this.$axios({
							method:"get",
							url:"/My/IsShowGetNewPersonGiftBox?v="+Math.random()*10,
							headers:this.header_token,
							params:{
								pageCode:"XRJML_FLZX"
							}
						})
						.then(res=>{
							console.log(res);
							resolve(res);
							if(res.data.code==0){
								this.isNew=res.data.data
							}else{
								Toast(res.data.msg);
							}
						})
						.catch(error=>{
							Toast("网络错误，请稍后再试");
						})
				})
			},
			toastTip(){
				Toast('功能待开放~');
			},
		}
	}
</script>

<style>
	.good .flSection{background-color: #fff;padding: 0.5rem 0.3rem;margin-bottom: 0.3rem;}
	.good .flL{width: 100%;/* height: 2.6rem; */display: flex;justify-content: space-between;flex-wrap:wrap}
	.good .flli{width: 3.1rem;padding-top: 2.3rem;margin-bottom: 0.66rem;}
	.good .flli1{background: url(../assets/img/fl1.png) center top no-repeat;background-size: 100%;}
	.good .flli2{background: url(../assets/img/fl2.png) center top no-repeat;background-size: 100%;}
	.good .flli3{background: url(../assets/img/fl3.png) center top no-repeat;background-size: 100%;}
	.good .flli4{background: url(../assets/img/fl4.png) center top no-repeat;background-size: 100%;}
	.good .flli5{background: url(../assets/img/fl5.png) center top no-repeat;background-size: 100%;}
	.good .flli6{background: url(../assets/img/fl6.png) center top no-repeat;background-size: 100%;}
	.good .flli7{background: url(../assets/img/fl8.png) center top no-repeat;background-size: 100%;}
	.good .flli8{background: url(../assets/img/fl7.png) center top no-repeat;background-size: 100%;}
	.good .flli h5{font-size: 0.28rem;}
	.good .flli p{font-size: 0.22rem;color: #999;}
	
	.sModel{
	  position: fixed;
	  width: 100%;
	  height: 100%;
	  z-index: 90;
	}
	.bj{position: fixed;background: #000;opacity: 0.5;width: 100%;height: 100%;left: 0;top: 0;z-index: 91;}
	.sMsg{
		font-size: 16px; position: fixed;left: 50%;top: 50%;margin: -4.5rem 0 0 -3.75rem; width: 7.5rem;height: 7.2rem; background: url(../assets/img/a.png) center no-repeat;background-size: 7.5rem; z-index: 92;padding: 0.8rem 0.7rem;border-radius: 8px;
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
	 	0%{transform: scale(0.4);}
	 	100%{transform: scale(1);}
	 }
	.mClose{position: absolute;right: 1.4rem;top: 1rem;cursor: pointer;width: 0.8rem;height: 0.8rem;display: block;background: url(../assets/img/nClose.png) center no-repeat;background-size: 0.27rem;}
</style>
