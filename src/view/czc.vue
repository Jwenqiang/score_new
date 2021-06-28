<template>
	<div class="czc">
		<div class="ybTop">
			<div class="czcNum">
				<label>{{czcNum}}</label>
				<p>我的成长值</p>
			</div>
			<label class="rule" @click="$router.push({name:'days',params:{id:'13'}})">规则</label>
		</div>
		<div class="czcList">
			<div class="clear ybList" v-for="item in czcList" v-if="czcList.length>0">
				<div class="ybl">
					<h5>{{item.ChangeReason}}</h5>
					<p>{{item.CreateTime}}</p>
				</div>
				<div class="ybr">
					<strong><i v-if="isHover==1">+</i>{{item.AddJiFen}}</strong>
				</div>
			</div>
			<div class="noCzc" v-else>快去做任务获取成长值吧~~</div>
			<p style="font-size: 0.24rem;color: #ccc;line-height: 1rem;text-align: center;" @click="pSize+=10" v-if="count>pSize">—— 点击查看更多 ——</p>
		</div>
			<!-- 规则弹框 -->
<!-- 			<div class="show-af show-rule" style="position: fixed; top: 0px; left: 0px; width: 100%; height: 100%; z-index: 9990;"
			 v-if="showRule">
				<div class="bj" style="z-index: 9991; position: fixed;" @click="showRule=false"></div>
				<div class="af-suc" style="z-index: 9992; width: 84%; max-width: 600px; left: 50%; height: 8rem; top: 50%; transform: translate(-50%,-50%); border-radius: 4px; box-shadow: rgb(204, 204, 204) 0px 0px 2px; padding: 0.4rem 0.2rem; line-height: 1.4;">
					<div class="phone-msg" style="text-align: left;">
						<p style="margin: 0 0px 0.2rem; font-size: 24px;text-align: center;">成长值规则</p>
						<div style="font-size: 14px;color: #999;overflow-y: auto;height: 6.6rem;">
							<p></p>
						</div>
					</div>
					<label class="close" @click="showRule=false"></label>
				</div>
			</div> -->
	</div>
</template>

<script>
	import { Toast,Indicator } from 'mint-ui';
	import {
	  uToken,
	} from "@/global/token.js";
	export default{
		name: 'czc',
		data(){
			return{
				header_token:{"token": uToken()},
				isHover:'1',
				isSuo:true,
				czcList:"",
				pSize:10,
				count:"",
				czcNum:"0",
				showRule:false
			}
		},
		mounted(){
			document.title="成长值";
			this.getCzc();
		},
		components: {
			
		},
		watch:{
			isHover(){
				this.pSize=10;
				this.getCzc();
			},
			pSize(){
				this.getCzc();
			}
		},
		methods:{
			getCzc(){
				return new Promise((resolve)=>{
						this.$axios({
							method:"get",
							url:"/My/GetYuanBaoDetail",
							headers:this.header_token,
							params:{
								jiFenType:'1',
								changeType:'1',
								pageSize:this.pSize,
								v:Math.random()*10
							}
						})
						.then(res=>{
							console.log(res);
							resolve(res);
							if(res.data.code==0){
								this.czcNum=res.data.data.JiFenEnable
								this.count=res.data.data.DetailList.RecordCount
								this.czcList=res.data.data.DetailList.DataList
							}else{
								Toast(res.data.msg);
							}
						})
						.catch(error=>{
							Toast("网络错误，请稍后再试");
						})
				})
			},
		}
	}
</script>

<style scoped>
	.czc{background-color: #F5F5F5;min-height: 100vh;}
	.czcNum{color: #fff; text-align: left; height: 100%;text-align: center;}
	.czcNum label{font-size: 0.8rem;border-bottom: 1px solid #fff;font-weight: 500;}
	.czcNum p{font-size: 0.24rem;margin-top: 0.1rem;}
	.czcList{position: relative;top: -1.3rem;background-color: #fff;width: 7rem; height: 100%;margin: 0 auto;padding: 0.4rem 0.2rem;border-radius: 0.1rem;}
	.czc .ybTop{position: relative; height: 4rem;padding-top: 0.8rem;font-weight: bold;font-size: 0.7rem;color: #FCE3A1; margin-bottom: 0.2rem; width: 100%;background:url(../assets/img/myBj.png);background-size: 100%;overflow: hidden;}
	.ybNum{width: 100%;text-align: center;height: 1.01rem;background:url(../assets/img/ybBj.png) center no-repeat;background-size: 5.98rem;text-align: center;}
	.ybNum img{width: 0.47rem;margin-right: 0.04rem;}
	.ybTab{margin-top: 0.2rem;font-size: 0.4rem;font-weight: 400;display: flex;color: #fff;height: 1rem;}
	.ybC{flex: 1;text-align: center;}
	.ybTab .hover span{
		display: inline-block;
		width:0px;
		height:0px;
		border-width:0.16rem;
		border-style:solid;
		border-color: transparent transparent #fff transparent;
	}
	.czc .ybList{padding: 0.24rem 0.3rem;font-size: 0.28rem;border-bottom: 1px solid #ededed;}
	.czc .ybl{width: 4rem;float: left;color: #333;text-align: left;font-weight: 500;}
	.ybl h5{font-size: 0.28rem;margin-bottom: 0.1rem;}
	.ybl p{font-size: 0.24rem;color: #999;}
	.ybr{width: 2rem;float: right;padding-top: 0.1rem;font-size: 0.34rem;color: #F45048;font-weight: bold;text-align: right;}
	.ybr img{width: 0.29rem;margin: 0 0.12rem;}
	.ybr img.isuo{width: 0.24rem;}
	.suo strong{color: #999;}
	.ybr strong i{font-style: normal;}
	.noCzc{width: 100%;margin: 0.6rem auto 0.8rem;padding-top:3.2rem;text-align: center;color: #999; background: url(../assets/img/noCzc.png) center no-repeat;background-size: 3.54rem;font-size: 0.26rem;font-weight: 400;}
	.rule{
		width:1rem;
		height:0.5rem;
		background:rgba(255,255,255,0.2);
		border-top-left-radius:0.25rem;
		border-bottom-left-radius:0.25rem;
		opacity:0.7;
		border:1px solid rgba(255,255,255,1);
		position: absolute;
		right: 0;
		top: 1rem;
		font-size: 0.28rem;
		color: #fff;
		text-align: center;
		line-height: 0.48rem;
	}
	.show-af .bj {
	    left: 0;
	    top: 0;
	    height: 100%;
	    width: 100%;
	    background: #000;
	    opacity: 0.5;
	}
	.show-af .af-suc {
	    position: absolute;
	    top: 1.2rem;
	    left: 0;
	    width: 100%;
	    height: 8rem;
	    margin: auto;
	    z-index: 99;
	    text-align: center;
	    background: #fff;
	}
	.af-suc .close{display: block; width: 0.6rem; height: 0.6rem; position: absolute; right: 0.1rem; top: 0.1rem; background: url(../assets/img/close.png) center center / 0.36rem no-repeat;}
</style>
