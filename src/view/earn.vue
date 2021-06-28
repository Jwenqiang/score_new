<template>
	<div class="earn">
		<div class="wTop">
			<img src="../assets/img/eBan1.png" width="100%"/>
			<div class="wTab">
				<div :class="[ggw==1?'on':'','wt']" @click="getGgw">
					<p>房源广告位</p>
					<span></span>
				</div>
				<div :class="[ggw==2?'on':'','wt']" @click="getJjr">
					<p>经纪人广告位</p>
					<span></span>
				</div>
			</div>			
		</div>
		
	<mt-loadmore :top-method="loadTop"ref="loadmore">
		<div class="earnAll">
			<div class="newDay" v-if="ggw==1">
				<div class="ndL ndGg" v-for="(item,index) in house" :key="item.AdPositionId">
					<div class="clear ndList">
						<div class="ndLeft clear">
							<label v-if="index==0"><img src="../assets/img/no1.png"/></label>
							<label v-else-if="index==1"><img src="../assets/img/no2.png"/></label>
							<label v-else-if="index==2"><img src="../assets/img/no3.png"/></label>
							<label v-else><img src="../assets/img/no4.png" style="width: 0.32rem;"/></label>
							<span>{{item.AdName}}</span>
							<div class="ndRight">
								<mt-button type="primary" @click="$router.push({'name':'house',query:{'id':item.AdPositionId,'time':endTime,'maxNum':item.MaxYuanBao,'title':item.AdName}})" v-if="item.CompeteFlag==1">去竞拍 ></mt-button>
								<mt-button type="primary" @click="$router.push({'name':'house',query:{'id':item.AdPositionId,'time':endTime,'maxNum':item.MaxYuanBao,'title':item.AdName}})" v-else-if="item.CompeteFlag==2">已出价</mt-button>
								<mt-button type="primary" class="over" v-else-if="item.CompeteFlag==3">已拍卖</mt-button>
								<mt-button type="primary" class="over" v-else-if="item.CompeteFlag==0">10点开拍</mt-button>
							</div>
						</div>
						<div class="ndBtom">
							<div class="ndbL">
								<p class="ndbNum"><img src="../assets/img/icon-syb.png" />{{item.MinYuanBao}}</p>
								<p><span>起拍价格</span></p>
							</div>
							<span class="line-r"></span>
							<div class="ndbL">
								<p class="ndbNum"><img src="../assets/img/icon-syb.png" />{{item.MaxYuanBao}}</p>
								<p><span>封顶价格</span></p>
							</div>
						</div>
					</div>
				</div>
				
<!-- 				<div class="ndL ndGg" v-for="item in house" :key="item.AdPositionId">
					<div class="clear ndList">
						<div class="ndLeft">
							<h5>{{item.AdName}}</h5>
							<p>{{item.MinYuanBao}}元宝起拍·{{item.MaxYuanBao}}元宝封顶</p>
						</div>
						<div class="ndRight">
							<mt-button type="primary" @click="$router.push({'name':'house',query:{'id':item.AdPositionId,'time':endTime,'maxNum':item.MaxYuanBao,'title':item.AdName}})" v-if="item.CompeteFlag==1">竞拍</mt-button>
							<mt-button type="primary" @click="$router.push({'name':'house',query:{'id':item.AdPositionId,'time':endTime,'maxNum':item.MaxYuanBao,'title':item.AdName}})" v-else-if="item.CompeteFlag==2">已出价</mt-button>
							<mt-button type="primary" class="over" v-else-if="item.CompeteFlag==3">已拍卖</mt-button>
						</div>
					</div>
				</div> -->
			</div>
			<div class="jjrSection" v-if="ggw==2">
				<div v-if="jjrHouse.length>0">
					<div class="clear jjrL" v-for="item in jjrHouse" :key="item.PropId">
						<div class="jrl">
							<img :src="item.FullImagePath" width="100%"/>
						</div>
						<div class="jrr">
							<h4 class="jrt">{{item.Title}}</h4>
							<p>{{item.EstateName}}·{{item.RoomCount}}室{{item.HallCount}}厅</p>
							<p class="jrbtn">
								<mt-button type="primary" @click="payC(item.AdsNo,item.EstateName,item.PropId,item.MaxYuanBao,item.PropName,item.PropUrl)" v-if="item.CompeteFlag=='1'">竞拍</mt-button>
								<mt-button type="primary" style="background-color: #5084DD;" @click="payC(item.AdsNo,item.EstateName,item.PropId,item.MaxYuanBao,item.PropName,item.PropUrl)" v-else-if="item.CompeteFlag=='2'">已出价</mt-button>
								<mt-button type="primary" disabled v-else-if="item.CompeteFlag=='3'">已中标</mt-button>
								<mt-button type="primary" disabled v-else-if="item.CompeteFlag=='0'">10点开拍</mt-button>
							</p>
						</div>
					</div>
					<p style="text-align: center;font-size: 0.24rem;color: #ccc;line-height: 1rem;" @click="pSize+=10" v-if="count>pSize">———— 点击查看更多 ————</p>
				</div>
				<div class="none" v-else-if="jjrHouse.length<1&&ready">
					您暂未发布房源广告,请先发布房源广告吧~
					<p><mt-button type="primary" @click="$router.push({name:'new'})">如何发布房源广告</mt-button></p>
				</div>			
			</div>
		</div>
	</mt-loadmore>
		<foot tab3='1'></foot>
		<div class="showModel modelMsg" v-if="showModel">
		  <div class="bj" @click="closeModul"></div>
		  <div class="showMsg">
		    <label class="modelClose" @click="closeModul"></label>
		    <div class="moudelT">
				竞拍经纪人广告位
			</div>
			<p><label>展示时间：</label><span>{{endTimeJjr}}</span></p>
			<p><label>房源名称：</label><span>{{houseName}}</span></p>
			<p><label>消耗元宝：</label><span><i @click="minus">-</i><strong>{{mainNum}}</strong><i @click="add">+</i></span><mt-button type="primary" class="maxBtn" @click="mainNum=maxNum">出最高价</mt-button> </p>
			<div class="mTip" v-if="nowNum==0&&myNum==0">
				当前广告位无人竞拍，可出最低价参与竞拍，出价越高成功竞拍的机会也越大。竞拍不成功所消耗元宝将退回账户。
			</div>
			<div class="mTip" v-else>
				当前广告位最高出价<span>{{nowNum}}元宝</span>，您上次出价<span>{{myNum}}元宝</span>，每次竞拍需加价5元宝，出价越高越容易中标。竞拍不成功，所消耗元宝将退回账户。
			</div>
			<div class="mBtn">
				<mt-button type="primary" @click="closeModul">取消</mt-button>
				<mt-button type="primary" @click="payNum">确定</mt-button>
			</div>
		  </div>
		</div>
		
		
		<div class="sModel mMsg"  v-if="isNew&&ggw==1">
		  <div class="bj" @click="isNew=false"></div>
		  <div class="sMsg" v-if="yes">
			<label class="mClose" @click="isNew=false"></label>
			<span style="width: 3.9rem;height: 1rem;position: absolute;display: block;bottom: 0.32rem;left: 1.8rem;" @click="setOld('XRJML_FYGGW')"></span>
		  </div>
		  <div class="bMsg" @click="isNew=false" v-else>
		  </div>
		</div>
		<div class="sModel mMsg"  v-if="isNew&&ggw==2">
		  <div class="bj" @click="isNew=false"></div>
		  <div class="sMsg jMsg" v-if="yes">
			<label class="mClose" @click="isNew=false"></label>
			<span style="width: 3.9rem;height: 1rem;position: absolute;display: block;bottom: 0.32rem;left: 1.8rem;" @click="setOld('XRJML_JJRGGW')"></span>
		  </div>
		  <div class="bMsg cMsg" @click="isNew=false" v-else>
		  </div>
		</div>
	</div>
</template>

<script>
	import Vue from 'vue'
	import {
	  uToken,
	} from "@/global/token.js";
	import Foot from '@/components/foot.vue'
	import { Toast,Indicator } from 'mint-ui';
	import { Loadmore } from 'mint-ui';
	Vue.component(Loadmore.name, Loadmore);
	export default{
		name: 'earn',
		data(){
			return{
				header_token:{"token": uToken()},
				ggw:"1",
				mainNum:50,
				nowNum:0,
				myNum:0,
				showModel:false,
				house:[],
				endTime:"",
				endTimeJjr:"",
				jjrHouse:[],
				pSize:10,
				count:"",
				houseNum:"",
				houseName:"",
				propId:"",
				allLoaded:false,
				maxNum:100,
				pName:"",
				pUrl:'',
				yes:true,
				isNew:false,
				ready:false
			}
		},
		components: {
		  Foot
		},
		watch:{
			// ggw(){
			// 	if(this.ggw==1){
			// 		this.getGgw();
			// 	}else{
			// 		this.getJjr();
			// 	}
			// },
			// mainNum(){
			// 	console.log(this.mainNum>this.maxNum);
			// 	if(Number(this.mainNum)>Number(this.maxNum)){
			// 		Toast("该广告位封顶价为"+this.maxNum);
			// 		return this.mainNum=this.maxNum;
			// 	}
			// 	else if(Number(this.mainNum)<=Number(this.nowNum)){
			// 		Toast("当前广告位出价不能少于"+this.nowNum);
			// 		return this.mainNum=Number(this.nowNum)+5;
			// 	}
			// },
			pSize(){
				this.getJjr()
			},
			'$route' (to, from) {
				console.log(to.name)
			   if (to.name === 'earn') {
				 if(this.$route.params.tab!=undefined){
					this.ggw=this.$route.params.tab
					if(this.$route.params.tab=='1'){
						this.getGgw()
					}else{
						this.getJjr();
					}
				 }else{
					 this.getGgw()
				 }
			    }
			 }
		},
		mounted(){
			if(this.$route.params.tab!=undefined){
				this.ggw=this.$route.params.tab
			}
			if(this.$route.params.tab==undefined||this.$route.params.tab=='1'){
				this.getGgw();
			}else{
				this.getJjr();
			}
		},
		methods:{
			setOld(code){
				Indicator.open();
				return new Promise((resolve)=>{
						this.$axios({
							method:"get",
							url:"/My/GetNewPersonGift",
							headers:this.header_token,
							params:{
								pageCode:code
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
			getTip(code){//新人礼
				this.yes=true;
				return new Promise((resolve)=>{
						this.$axios({
							method:"get",
							url:"/My/IsShowGetNewPersonGiftBox?v="+Math.random()*10,
							headers:this.header_token,
							params:{
								pageCode:code
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
			loadTop(){
				this.pSize=10;
				if(this.ggw=='1'){
					this.getGgw()
				}else if(this.ggw=='2'){
					this.getJjr();
				}
				
			},
			loadBottom(){
				console.log('上啦完成');
				if(this.ggw=='2'){
					this.allLoaded=false;
					this.pSize+=10
				}else{
					this.allLoaded=true;
					this.$refs.loadmore.onBottomLoaded();
				}
			},
			minus(){
				if(this.mainNum<=50){
					Toast("50个不能再少了哦~");
				}
				else if(this.mainNum<=Number(this.myNum)+5){
					if(this.mainNum<this.maxNum){
						Toast("当前广告位出价不能少于"+this.myNum);
						this.mainNum=Number(this.myNum)+5;
					}else{
						Toast("此广告位您已出最高价~");
						this.mainNum=Number(this.maxNum);
					}
				}
				else{
					this.mainNum -=5;
				}
			},			
			add(){
				if(Number(this.mainNum)>=Number(this.maxNum)){
					Toast("您已出到最大值~");
					this.mainNum=this.maxNum;
				}else{
					this.mainNum +=5;
				}
			},
			closeModul(){
				this.showModel=false;
			},
			payC(num,name,id,max,pN,pU){
				this.showModel=true;
				this.houseNum=num;
				this.houseName=name;
				this.maxNum=max;
				this.propId=id;
				this.pName=pN;
				this.pUrl=pU;
				this.getNum(id);
			},
			getGgw(){
				this.ggw=1;
				Indicator.open();
				return new Promise((resolve)=>{
						this.$axios({
							method:"get",
							url:"/AdPosition/GetErShouFangAdPositionCompeteList?v="+Math.random()*10,
							headers:this.header_token
						})
						.then(res=>{
							console.log(res);
							if(res.data.code==0){
								this.$nextTick(()=>{
									this.house=res.data.result.list
								})
								this.endTime=res.data.result.timeLabel
							}else{
								Toast(res.data.message);
							}
							Indicator.close();
							resolve(res);
							this.$refs.loadmore.onTopLoaded();
						})
						.catch(error=>{
							Indicator.close();
							Toast("网络错误，请稍后再试");
						})
				})
			},
			getJjr(){
				this.ggw=2;
				this.allLoaded=false;
				Indicator.open();
				return new Promise((resolve)=>{
						this.$axios({
							method:"get",
							url:"/ZhongyuanHouse/GetStaffPostEstatesForDetail?v="+Math.random()*10,
							headers:this.header_token,
							params:{
								pageSize:this.pSize
							}
						})
						.then(res=>{
							console.log(res);
							if(res.data.code==0){
								this.endTimeJjr=res.data.result.timeLabel
								this.count=res.data.result.list.Total
								this.jjrHouse=res.data.result.list.Result
							}else{
								Toast(res.data.msg);
							}
							this.ready=true;
							Indicator.close();
							resolve(res);
							this.$refs.loadmore.onTopLoaded();
						})
						.catch(error=>{
							Indicator.close();
							Toast("网络错误，请稍后再试");
						})
				})
			},
			getNum(id){
				return new Promise((resolve)=>{
						this.$axios({
							method:"get",
							url:"/AdPosition/GetAgentAdPositionCurrentOfferYuanBao",
							headers:this.header_token,
							params:{
								propId :id,
								v:Math.random()*10
							}
						})
						.then(res=>{
							console.log(res);
							resolve(res);
							if(res.data.code==0){
								this.nowNum=res.data.data.OtherMax
								this.myNum=res.data.data.MyMax
								if(res.data.data.OtherMax<res.data.data.MyMax){
									this.nowNum=res.data.data.MyMax
								}
								if(res.data.data.MyMax<this.maxNum){
									if(res.data.data.MyMax==0){
										this.mainNum=50
									}else{
										this.mainNum=Number(res.data.data.MyMax)+5;
									}
								}else{
									this.mainNum=this.maxNum;
								}
								// if(res.data.data>0){
								// 	if(res.data.data<this.maxNum){
								// 		this.mainNum=Number(res.data.data)+5
								// 	}else{
								// 		this.mainNum=Number(res.data.data)
								// 	}
								// }else{
								// 	this.mainNum=10
								// }
							}else{
								Toast(res.data.msg);
							}
						})
						.catch(error=>{
							Toast("网络错误，请稍后再试");
						})
				})
			},
			payNum(){
				return new Promise((resolve)=>{
						this.$axios({
							method:"post",
							url:"/AdPosition/AgentAuction",
							headers:this.header_token,
							data:{
								PropId :this.propId,
								CurrentYuanBaoNum: this.mainNum,
								PropName:this.pName,
								PropUrl:this.pUrl,
								EstateName:this.houseName
							}
						})
						.then(res=>{
							console.log(res);
							resolve(res);
							if(res.data.code==0){
								if(res.data.data.IsSuccess){
									Toast("出价成功~");
									this.showModel=false;
									this.getJjr();
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
			}
		}
	}
</script>

<style scoped>
	.earn{padding-bottom: 1.2rem;background-color: #F5F5F5;}
	.earnAll{padding: 0.5rem 0.34rem 0;min-height: 8rem;}
	.earnAll .newDay{margin: 0.3rem 0;/* background: #fff; */}
	.ndL{padding: 0.2rem;height: 2.1rem;margin-bottom: 0.4rem;background: #fff;box-shadow: 0px 2px 6px 2px rgba(0, 0, 0, 0.06);border-radius: 0.1rem;}
	.ndL1{background: url(../assets/img/ndl1.png) left center no-repeat;background-size: 0.8rem;}
	.ndL2{background: url(../assets/img/ndl2.png) left center no-repeat;background-size: 0.8rem;}
	.ndL3{background: url(../assets/img/ndl3.png) left center no-repeat;background-size: 0.8rem;}
	.ndL4{background: url(../assets/img/ndl4.png) left center no-repeat;background-size: 0.8rem;}
	/* .ndList{border-bottom: 1px solid #ededed;padding: 0.2rem 0 0.2rem;} */
	.ndLeft{margin-bottom: 0.1rem;width: 100%;}
	.ndLeft label img{width: 0.54rem;vertical-align: -3px;margin-right: 0.1rem;}
	.ndLeft span{margin-bottom: 0.1rem;font-size: 0.34rem;}
	.ndLeft p{color: #FE5B48;}
	.ndRight{float: right;width: 1.8rem;text-align: right;}
	.ndRight button{
		width:1.7rem;
		height:0.5rem;
		line-height: 0.5rem;
		background:#F4472D;
		border-radius:0.4rem;
		font-size: 0.28rem;
		margin-top: 0.1rem;
	}
	.ndbL{width: 48%;float: left;text-align: center;font-size: 0.24rem;color: #999;}
	.ndbNum{color: #F4472D;font-size: 0.48rem;font-weight: 500;}
	.ndbNum img{width: 0.4rem;margin-right: 0.1rem;}
	.line-r{display: block;width: 2px;height: 0.6rem;background-color: #ccc;float: left;margin-top: 0.2rem;}
	.flSection{background-color: #fff;padding: 0.3rem 0.2rem;margin-bottom: 0.3rem;}
	.flL{width: 100%;height: 2.6rem;display: flex;justify-content: space-between;}
	.flli{width: 1.9rem;}
	.flli1{background: url(../assets/img/fl1.png) center top no-repeat;background-size: 100%;}
	.flli2{background: url(../assets/img/fl2.png) center top no-repeat;background-size: 100%;}
	.flli3{background: url(../assets/img/fl3.png) center top no-repeat;background-size: 100%;}
	/* .ndGg{background: url(../assets/img/gg.png) left center no-repeat;background-size: 0.8rem;} */
	.earnAll .jjrSection{margin: 0.3rem 0;}
	.jjrL{padding: 0.3rem 0.2rem;background-color: #fff;margin-bottom: 0.3rem;box-shadow: 0px 2px 6px 2px rgba(0, 0, 0, 0.06);border-radius: 0.1rem;}
	.jrl{width: 2.4rem;float: left;margin-right: 0.2rem;}
	.jrr{float: left;width: 3.82rem;}
	.jrr h4{
		    font-weight: bolder;
		    color: #203140;
		    font-size: 0.3rem;
			margin-bottom: 0.1rem;
			
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;

			}
	.jrr p{
		color: #666;
		font-size: 0.26rem;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.jrbtn{text-align: right;}
	.jrbtn button{
		margin-top: 0.4rem;
		width:1.7rem;
		height:0.5rem;
		background:#F4472D;
		border-radius:0.4rem;
		font-size: 0.28rem;
	}
	.over{opacity: 0.5;}
	.showModel{
	  position: fixed;
	  width: 100%;
	  height: 100%;
	  z-index: 90;
	}
	.bj{position: fixed;background: #000;opacity: 0.5;width: 100%;height: 100%;left: 0;top: 0;z-index: 91;}
	.showMsg{font-size: 16px; position: fixed;left: 50%;top: 50%;transform: translate(-50%,-50%);width: 90%;height: 7.6rem; background: #fff;z-index: 92;padding: 0.8rem 0.6rem;border-radius: 8px;}
	.modelClose{position: absolute;right: 0rem;top: 0rem;cursor: pointer;width: 0.8rem;height: 0.8rem;display: block;background: url(../assets/img/close.png) center no-repeat;background-size: 0.27rem;}
	.moudelT{font-size: 0.34rem;font-weight: bold;text-align: center;margin-bottom: 0.6rem;}
	.moudelT img{width: 0.5rem;margin-right: 0.1rem;vertical-align: middle;}
	.showMsg p{margin-bottom: 0.3rem;}
	.showMsg p > label{font-size: 0.32rem;font-weight: bold;}
	.showMsg p span{font-size: 0.28rem;color: #666;}
	.showMsg p i{font-style: normal;display: inline-block;width: 0.6rem;height: 0.6rem;border: 1px solid #333;border-radius: 50%;text-align: center;line-height: 0.5rem;font-size: 0.4rem;}
	.showMsg p strong{font-size: 0.36rem;margin: 0 0.3rem;font-weight: 500;color: #F45048;}
	.showMsg p strong input{width: 0.68rem;height: 0.6rem;border: 1px solid #ddd;text-align: center;color: #F22C40; background-color: #f5f5f5;}
	.mTip{padding-left: 0.6rem;background: url(../assets/img/icon-tip.png) left 0.06rem no-repeat;background-size: 0.4rem;font-size: 0.24rem;color: #999;line-height: 1.6;}
	.mTip span{color: #F45048;}
	.mBtn{margin-top: 0.5rem;text-align: center;}
	.mBtn button{width: 2rem;margin-right: 0.8rem;font-size: 0.32rem;color: #fff;background-color:#D0CDCD;}
	.mBtn button:last-child{margin: 0;background-color:#F45048;}
	.none{
		width: 100%;
		height: 6.4rem;
		margin: 0.4rem auto 0;
		padding-top: 4rem;
		text-align: center;
		font-size: 0.28rem;
		color: #666;
		background: url(../assets/img/none.png) center top no-repeat;
		background-size: 3.6rem;
	}
	.none p button{height: 0.6rem;font-size: 0.24rem;margin-top: 0.4rem;background-color: #f4472d;;}
	button.maxBtn{width: 1.3rem;padding: 0;height: 0.62rem;font-size: 0.24rem;margin-left: 0.2rem;border-radius: 0.42rem;}
	
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
	

	.wTop{position: relative;height: 3.84rem;}
	.wTab{z-index: 9;display: flex;justify-content: space-between;height: 1.2rem;width: 100%;background-color: #fff;border-top-left-radius: 0.4rem;border-top-right-radius: 0.4rem;position: absolute;bottom: -0.4rem;left: 0;padding-top: 0.4rem;font-size: 0.32rem;}
	.wt{flex: 1;text-align: center;}
	.wt p{line-height: 1;}
	.wTab .on{font-size: 0.36rem;color: #F4472D;position: relative;top: -3px;}
	.wTab .on span{display: inline-block;width: 1.42rem;height: 0.13rem;background: url(../assets/img/w-line.png) center no-repeat;background-size: 100%;position: relative;top: -5px;}
	
</style>
