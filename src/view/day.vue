<template>
	<div class="new">
		<div class="newList">
			<img src="../assets/img/mr1.png" class="nlT"/>
			<div class="newM">
				<h4>录入客源<span>+10</span></h4>
				<p>成功录入客源</p>
			</div>
			<mt-button type="primary" class="nlBtn" @click="$router.push({name:'days',params:{id:'1'}})">如何完成</mt-button>
		</div>
		<div class="newList">
			<img src="../assets/img/mr2.png" class="nlT"/>
			<div class="newM">
				<h4>带客户看房<span>+10</span></h4>
				<p>成功带客户看房</p>
			</div>
			<mt-button type="primary" class="nlBtn" @click="$router.push({name:'days',params:{id:'2'}})">如何完成</mt-button>
		</div>
<!-- 		<div class="newList">
			<img src="../assets/img/mr3.png" class="nlT"/>
			<div class="newM">
				<h4>收录房源钥匙<span>+10</span></h4>
				<p>每日数量不限，多收多得</p>
			</div>
			<mt-button type="primary" class="nlBtn" @click="$router.push({name:'days',params:{id:'3'}})">如何完成</mt-button>
		</div> -->
		<div class="newList">
			<img src="../assets/img/mr4.png" class="nlT"/>
			<div class="newM">
				<h4>开盘<span>+10</span></h4>
				<p>每天最多可得3次开盘奖励</p>
			</div>
			<mt-button type="primary" class="nlBtn" @click="$router.push({name:'days',params:{id:'4'}})">如何完成</mt-button>
		</div>
		<div class="newList">
			<img src="../assets/img/mr5.png" class="nlT"/>
			<div class="newM">
				<h4>发布新房点评<span>+5</span></h4>
				<p>成功发布新房点评</p>
			</div>
			<mt-button type="primary" class="nlBtn" @click="$router.push({name:'days',params:{id:'5'}})">如何完成</mt-button>
		</div>	
		<div class="newList">
			<img src="../assets/img/mr6.png" class="nlT"/>
			<div class="newM">
				<h4>完成房源图片实勘拍摄<span>+15</span></h4>
				<p>房源图片复审通过</p>
			</div>
			<mt-button type="primary" class="nlBtn" @click="$router.push({name:'days',params:{id:'6'}})">如何完成</mt-button>
		</div>	
		<div class="newList">
			<img src="../assets/img/mr7.png" class="nlT"/>
			<div class="newM">
				<h4>完成房源VR拍摄<span>+30</span></h4>
				<p>房源VR复审通过</p>
			</div>
			<mt-button type="primary" class="nlBtn" @click="$router.push({name:'days',params:{id:'7'}})">如何完成</mt-button>
		</div>	
		<div class="newList">
			<img src="../assets/img/mr8.png" class="nlT"/>
			<div class="newM">
				<h4>房源委托<span>+20</span></h4>
				<p>上传委托并审核通过</p>
			</div>
			<mt-button type="primary" class="nlBtn" @click="$router.push({name:'days',params:{id:'8'}})">如何完成</mt-button>
		</div>	
		<div class="newList">
			<img src="../assets/img/mr9.png" class="nlT"/>
			<div class="newM">
				<h4>房源独家委托<span style="width: 1rem;">+100</span></h4>
				<p>上传委托并审核通过</p>
			</div>
			<mt-button type="primary" class="nlBtn" @click="$router.push({name:'days',params:{id:'9'}})">如何完成</mt-button>
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
	import { Search } from 'mint-ui';
	import {
	  uToken,
	} from "@/global/token.js";
	export default{
		name: 'day',
		data(){
			return{
				header_token:{"token": uToken()},
				ggw:"1",
				mainNum:10,
				nowNum:10,
				showModel:false,
				yes:true,
				isNew:false
			}
		},
		components:{
			Search
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
								pageCode:"XRJML_MRSL"
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
								pageCode:"XRJML_MRSL"
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
			minus(){
				if(this.mainNum<=10){
					Toast("10个不能再少了哦~");
				}else{
					this.mainNum -=5;
				}
			},			
			add(){
				if(this.mainNum>=100){
					Toast("您已出到最大值！");
				}else{
					this.mainNum +=5;
				}
			},
		}
	}
</script>

<style>
	.new{padding: 0.3rem;}
	.nlT{width: 0.8rem;float: left;}
	.newList{padding: 0.4rem 0;}
	.newM{width: 4.2rem;float: left;margin-left: 0.2rem;}
	.newM h4{font-size: 0.28rem;color: #333;margin-bottom: 0.1rem;}
	.newM h4 span{font-weight: 400;font-size: 0.24rem; display: inline-block;width: 0.86rem;height: 0.32rem;padding-left: 0.34rem;background: #F16058 url(../assets/img/icon-syb.png) 0.1rem center no-repeat;background-size: 0.25rem;border-radius: 0.2rem;margin-left: 0.1rem;color: #fff;}
	.newM p{font-size: 0.24rem;color: #999;}
	.nlBtn{
		margin-top: 0.12rem;
		width:1.7rem;
		height:0.6rem;
		background:linear-gradient(180deg,rgba(253,147,115,1) 0%,rgba(253,76,60,1) 100%);
		border-radius:0.08rem;
		font-size: 0.26rem;
		padding: 0;
	}
	
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
