<template>
	<div class="program">
		<div class="clear newTitle">
			<label>热门问题</label>
			<!-- <span>查看更多</span> -->
		</div>
		<div class="card">
			<div class="pList" @click="$router.push({name:'days',params:{id:'11'}})">
				【新手指引】经纪人如何快速玩赚元宝系统？
			</div>
			<div class="pList" @click="$router.push({name:'days',params:{id:'12'}})">
				【兑换广告位】如何兑换广告位提升进线？ 
			</div>
			<div class="pList" @click="$router.push({name:'news',params:{id:'1'}})">
				【新手试炼】 如何上传头像并领取元宝？  
			</div>
			<div class="pList" @click="$router.push({name:'days',params:{id:'1'}})">
				【每日试炼】如何录入客源并领取元宝？  
			</div>
			<div class="pList" @click="$router.push({name:'goods',params:{id:'1'}})">
				【福利中心】房源被推荐为“中原好房”如何…  
			</div>
			<div class="pList" @click="$router.push({name:'historys',params:{id:'1'}})">
				【更多奖励】 入职中原的年限如何换算成元宝？  
			</div>
		</div>
		<div class="clear newTitle">
			<label>问题分类</label>
		</div>
		<div class="pBlock">
			<div class="pbl1" @click="$router.push({name:'days',params:{id:'12'}})">
				兑广告位
			</div>
			<div class="pbl2" @click="$router.push({name:'days',params:{id:'0'}})">
				每日签到
			</div>
			<div class="pbl3" @click="$router.push({name:'programList',params:{id:'1'}})">
				新手试炼
			</div>
			<div class="pbl4" @click="$router.push({name:'programList',params:{id:'2'}})">
				每日试炼
			</div>
			<div class="pbl5" @click="$router.push({name:'programList',params:{id:'3'}})">
				福利中心
			</div>
			<div class="pbl6" @click="$router.push({name:'programList',params:{id:'4'}})">
				更多奖励
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
	export default{
		name: 'program',
		data(){
			return{
				showModel:false
			}
		},
		components: {
		},
		created() {
			document.title="帮助中心";
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
/* 	.showModel{
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
	.anwser{font-size: 0.26rem;line-height: 2;} */
</style>
