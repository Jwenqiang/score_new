<template>
	<div class="program">
		<div class="pnew" v-if="id==1">
			<div class="clear newTitle">
				<label>新手试炼</label>
			</div>
			<div class="card">
				<div class="pList" @click="$router.push({name:'news',params:{id:'1'}})">
					如何上传头像并领取元宝？
				</div>
				<div class="pList" @click="$router.push({name:'news',params:{id:'2'}})">
					如何完善个人店铺资料并领取元宝？
				</div>
				<div class="pList" @click="$router.push({name:'news',params:{id:'3'}})">
					如何发布第一套租房房房源并领取元宝？  
				</div>
				<div class="pList" @click="$router.push({name:'news',params:{id:'4'}})">
					如何发布第一套二手房源并领取元宝？  
				</div>
				<div class="pList" @click="$router.push({name:'news',params:{id:'5'}})">
					如何发布第一套热门成交小区房源？ 
				</div>
				<div class="pList" @click="$router.push({name:'news',params:{id:'7'}})">
					如何发布第一套独家委托房源？  
				</div>
				<div class="pList" @click="$router.push({name:'news',params:{id:'8'}})">
					如何发布第一套门店主打小区房源？   
				</div>			
			</div>
		</div>
		<div class="pday" v-else-if="id==2">
			<div class="clear newTitle">
				<label>每日试炼</label>
			</div>
			<div class="card">
				<div class="pList" @click="$router.push({name:'days',params:{id:'1'}})">
					如何录入客源并领取元宝？
				</div>
				<div class="pList" @click="$router.push({name:'days',params:{id:'2'}})">
					如何录入客户带看并领取元宝？
				</div>
<!-- 				<div class="pList" @click="$router.push({name:'days',params:{id:'3'}})">
					如何收录房源钥匙并领取元宝？  
				</div> -->
				<div class="pList" @click="$router.push({name:'days',params:{id:'4'}})">
					如何完成开盘并领取元宝？  
				</div>
				<div class="pList" @click="$router.push({name:'days',params:{id:'5'}})">
					如何发布新房点评并领取元宝？   
				</div>
				<div class="pList" @click="$router.push({name:'days',params:{id:'6'}})">
					如何完成房源图片实勘拍摄？  
				</div>
				<div class="pList" @click="$router.push({name:'days',params:{id:'7'}})">
					如何完成拍摄房源VR实勘并领取元宝？   
				</div>	
				<div class="pList" @click="$router.push({name:'days',params:{id:'8'}})">
					如何完成房源委托并领取元宝？   
				</div>	
				<div class="pList" @click="$router.push({name:'days',params:{id:'9'}})">
					如何完成房源独家委托并领取元宝？   
				</div>				
			</div>
		</div>
		<div class="pgood" v-else-if="id==3">
			<div class="clear newTitle">
				<label>福利任务</label>
			</div>
			<div class="card">
				<div class="pList" @click="$router.push({name:'goods',params:{id:'1'}})">
					房源被推荐为“中原好房”如何领取元宝？
				</div>
				<div class="pList" @click="$router.push({name:'goods',params:{id:'2'}})">
					如何获得400进线接听月奖励？
				</div>
				<div class="pList" @click="$router.push({name:'goods',params:{id:'3'}})">
					如何获得微聊进线应答月奖励？  
				</div>
				<div class="pList" @click="$router.push({name:'goods',params:{id:'4'}})">
					新房点评怎样才能被置顶并获得元宝？    
				</div>
				<div class="pList" @click="$router.push({name:'goods',params:{id:'5'}})">
					如何成为月度网络英雄并获得元宝？   
				</div>
<!-- 				<div class="pList" @click="$router.push({name:'goods',params:{id:'6'}})">
					如何成为月度推广达人并获得元宝？  
				</div> -->
				<div class="pList" @click="$router.push({name:'goods',params:{id:'7'}})">
					如何推广中原找房APP并获得元宝？  
				</div>
				<div class="pList" @click="$router.push({name:'goods',params:{id:'8'}})">
					如何通过经纪人学习考试赚取元宝？  
				</div>
			</div>
		</div>	
		<div class="phistory" v-else-if="id==4">
			<div class="clear newTitle">
				<label>历史数据</label>
			</div>
			<div class="card">
				<div class="pList" @click="$router.push({name:'historys',params:{id:'1'}})">
					入职中原的年限如何换算成元宝？
				</div>
				<div class="pList" @click="$router.push({name:'historys',params:{id:'2'}})">
					在中原的历史成交数据如何换算成元宝？
				</div>
				<div class="pList" @click="$router.push({name:'historys',params:{id:'3'}})">
					新成交的二手房/租房如何领取元宝？  
				</div>			
			</div>
		</div>				
<!-- 		<div class="showModel modelMsg" v-if="showModel">
		  <div class="bj" @click="showModel=false"></div>
		  <div class="showMsg">
		    <label class="modelClose" @click="showModel=false"></label>
			<p class="anwser">问题的答案问题的答案问题的答案问题的答案问题的答案问题的答案问题的答案问题的答案</p>
			
		  </div>
		</div> -->
	</div>
</template>

<script>
	import { Toast,Indicator } from 'mint-ui';
	export default{
		name: 'programList',
		data(){
			return{
				showModel:false,
				id:""
			}
		},
		created() {
			document.title="帮助中心列表";
		},
		components: {
		},
		mounted(){
			Indicator.open();
			this.id=this.$route.params.id
			setTimeout(()=>{
				Indicator.close();
			},500)
		},	
		methods:{
			
		}
	}
</script>

<style>
	.program{padding: 0.42rem 0.3rem;}
	.newTitle{width: 100%;height: 0.6rem;line-height: 0.6rem;margin-bottom: 0.2rem;}
	.program .newTitle label{float: left;color: #333;font-size: 0.34rem;font-weight: 500;}
	.newTitle span{float: right;width: 4rem;text-align: right; display: block;height: 100%;line-height: 0.6rem;font-size: 0.24rem;color: #999;padding-right: 0.3rem;background: url(~@/assets/img/icon-right.png) right center no-repeat;background-size: 0.12rem;}
	.card{margin: 0.2rem 0;padding: 0 0.2rem;box-shadow:0px 0px 18px 1px rgba(229,227,227,0.5);margin-bottom: 0.4rem;}
	.pList{padding: 0.4rem 0;border-bottom: 1px solid #ededed;background: url(~@/assets/img/icon-right.png) right center no-repeat;background-size: 0.12rem;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;padding-right: 0.3rem;}
	.pList:last-child{border:0}
	.pBlock{display: flex;flex-wrap: wrap;justify-content: space-between;margin-top: 0.4rem;box-shadow:0px 0px 18px 1px rgba(229,227,227,0.5);padding: 0.4rem 0;}
	.pBlock div{width: 33.3%;padding-top: 0.54rem;text-align: center;margin: 0.2rem 0;color: #666;}
	.pbl1{background: url(../assets/img/iconp1.png) center top no-repeat;background-size: 0.48rem;}
	.pbl2{background: url(../assets/img/iconp2.png) center top no-repeat;background-size: 0.48rem;}
	.pbl3{background: url(../assets/img/iconp3.png) center top no-repeat;background-size: 0.48rem;}
	.pbl4{background: url(../assets/img/iconp4.png) center top no-repeat;background-size: 0.48rem;}
	.pbl5{background: url(../assets/img/iconp5.png) center top no-repeat;background-size: 0.48rem;}
	.pbl6{background: url(../assets/img/iconp6.png) center top no-repeat;background-size: 0.48rem;}
	.showModel{
	  position: fixed;
	  width: 100%;
	  height: 100%;
	  z-index: 90;
	}
	.bj{position: fixed;background: #000;opacity: 0.5;width: 100%;height: 100%;left: 0;top: 0;z-index: 91;}
	.showMsg{font-size: 16px; position: fixed;left: 50%;top: 50%;transform: translate(-50%,-50%);width: 90%;height: 7.2rem; background: #fff;z-index: 92;padding: 0.8rem 0.7rem;border-radius: 8px;}
	.modelClose{position: absolute;right: 0rem;top: 0rem;cursor: pointer;width: 0.8rem;height: 0.8rem;display: block;background: url(../assets/img/close.png) center no-repeat;background-size: 0.27rem;}
	.moudelT{font-size: 0.34rem;font-weight: bold;text-align: center;margin-bottom: 0.6rem;}
	.moudelT img{width: 0.5rem;margin-right: 0.1rem;vertical-align: middle;}
	.showMsg p{margin-bottom: 0.3rem;}
	.showMsg p label{font-size: 0.32rem;font-weight: bold;}
	.showMsg p span{font-size: 0.28rem;color: #666;}
	.showMsg p i{font-style: normal;display: inline-block;width: 0.6rem;height: 0.6rem;border: 1px solid #333;border-radius: 50%;text-align: center;line-height: 0.5rem;font-size: 0.4rem;}
	.showMsg p strong{font-size: 0.36rem;margin: 0 0.3rem;font-weight: 500;color: #F45048;}
	.anwser{font-size: 0.26rem;line-height: 2;}
</style>
