<template>
	<div class="house">
		<div style="background-color: #fff;">
			<div class="houseT"><form action="" v-on:submit.prevent="noPush"><mt-search placeholder="请输入中原编码" @keyup.enter.native="search" v-model="adsNo"></mt-search></form></div> 
			<div class="earnTop">
				<div :class="[ggw=='0'?'on':'','etTab']" @click="my">
					<p>我的房源</p>
					<span></span>
				</div>
				<div :class="[ggw=='1'?'on':'','etTab']" @click="gs">
					<p>公司房源</p>
					<span></span>
				</div>			
			</div>
		</div>
		<mt-loadmore :top-method="loadTop" ref="loadmore">
		<div class="earnAll">
			<div class="jjrSection">
				<div v-if="house!=''&&house!=null">
					<div class="clear jjrL" v-for="item in house">
						<div class="jrl">
							<img :src="item.SmallImg" width="100%"/>
						</div>
						<div class="jrr">
							<h4 class="jrt">{{item.Title}}</h4>
							<p>{{item.EstateName}}·{{item.RoomCount}}室{{item.HallCount}}厅</p>
							<p class="jrbtn"><mt-button type="primary" @click="payC(item.AdsNo,item.EstateName,item.PropId,item.PropName,item.PropUrl,item.AdsNo)">确定</mt-button></p>
						</div>
					</div>
					<p style="text-align: center;font-size: 0.24rem;color: #ccc;line-height: 1rem;" @click="pSize+=10" v-if="count>pSize">———— 点击查看更多 ————</p>
				</div>
				<div class="none" v-else>您尚未发布房源广告，请先在A+发布房源广告~</div>
			</div>
		</div>
		</mt-loadmore>
		<div class="showModel modelMsg" v-if="showModel">
		  <div class="bj" @click="closeModul"></div>
		  <div class="showMsg">
		    <label class="modelClose" @click="closeModul"></label>
		    <div class="moudelT">
				竞拍{{$route.query.title}}
			</div>
			<p><label>展示时间：</label><span>{{$route.query.time}}</span></p>
			<p><label>房源名称：</label><span>{{houseName}}</span></p>
			<p><label>消耗元宝：</label><span><i @click="minus">-</i><strong>{{mainNum}}</strong><i @click="add">+</i></span><mt-button type="primary" class="maxBtn" style="font-size: 12px;" @click="mainNum=maxNum">出最高价</mt-button> </p>
			<div class="mTip" v-if="nowNum==0">
				当前广告位无人竞拍，可出最低价参与竞拍，出价越高成功竞拍的机会也越大。竞拍不成功所消耗元宝将退回账户。
			</div>
			<div class="mTip" v-else>
				当前最高出价<span>{{nowNum}}元宝</span>，每次竞拍加价5元宝，出价越高成功竞拍的机会越大。竞拍不成功，所消耗元宝将退回账户。
			</div>
			<div class="mBtn">
				<mt-button type="primary" @click="closeModul">取消</mt-button>
				<mt-button type="primary" @click="payNum">确定</mt-button>
			</div>
		  </div>
		</div>
	</div>
</template>

<script>
	import {
	  uToken,
	} from "@/global/token.js";
	import { Toast,Indicator } from 'mint-ui';
	import { Search } from 'mint-ui';
	export default{
		name: 'house',
		data(){
			return{
				header_token:{"token": uToken()},
				ggw:"0",
				mainNum:10,
				nowNum:10,
				showModel:false,
				pSize:10,
				count:"",
				house:"",
				houseNum:"",
				houseName:"",
				adsNo:"",
				isSearch:false,
				allLoaded:false,
				maxNum:100,
				propId:"",
				pName:"",
				pUrl:'',
				isNew:false
			}
		},
		mounted(){
			this.maxNum=this.$route.query.maxNum;
			this.getHouse();
			// this.getNum();
		},
		components:{
			Search
		},
		watch:{
			// ggw(){
			// 	if(isSearch==false){
			// 		this.pSize=10;
			// 		this.getHouse()
			// 	}
			// },
			// mainNum(){
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
				this.getHouse()
			},
			'$route' (to, from) {
			   if (to.name === 'house') {
				   this.mainNum=10
				   this.nowNum=10
				   this.pSize=10
				   this.showModel=false;
					this.getHouse()
					this.getNum()
			    }
			 }
		},
		methods:{
			loadTop(){
				this.pSize=10;
				this.getHouse()
			},
			loadBottom(){
				this.pSize+=10
			},
			my(){
				this.ggw=0;
				this.pSize=10;
				this.getHouse();
			},
			gs(){
				this.ggw=1;
				this.pSize=10;
				this.getHouse();
			},
			minus(){
				if(this.mainNum<=10){
					Toast("10个不能再少了哦~");
				}else if(this.mainNum<=Number(this.nowNum)+5){
					if(this.mainNum<this.maxNum){
						Toast("当前广告位出价不能少于"+this.nowNum);
						this.mainNum=Number(this.nowNum)+5;
					}else{
						Toast("此房源被拍走了，试试其他的房源吧");
						this.mainNum=Number(this.maxNum);
					}
				}
				else{
					this.mainNum -=5;
				}
			},			
			add(){
				if(Number(this.mainNum)>=Number(this.maxNum)){
					Toast("您已出到最大值！");
					this.mainNum=this.maxNum;
				}else{
					this.mainNum +=5;
				}
			},
			payC(num,name,id,pN,pU,adsNo){
				Indicator.open(
					{
					  spinnerType: 'double-bounce'
					}
				);
				this.getNum(id);
				return new Promise((resolve)=>{
						this.$axios({
							method:"get",
							url:"ZhongyuanHouse/JudgeNewPropProtectionPeriod",
							headers:this.header_token,
							params:{
								propid:id,
								adsno:adsNo
							}
						})
						.then(res=>{
							Indicator.close();
							console.log(res);
							if(res.data.code==0){
								if(res.data.data==0){
									this.showModel=true;
									this.houseNum=num;
									this.houseName=name;
									this.propId=id;
									this.pName=pN;
									this.pUrl=pU;
								}else{
									Toast("新盘保护期内,无法参与竞拍");
								}
							}else{
								Toast(res.data.msg);
							}
							resolve(res);
						})
						.catch(error=>{
							Indicator.close();
							Toast("网络错误，请稍后再试");
						})
				})
				
			},
			closeModul(){
				this.showModel=false;
			},
			getHouse(){
				this.allLoaded=false
				Indicator.open();
				return new Promise((resolve)=>{
						this.$axios({
							method:"get",
							url:"/ZhongyuanHouse/GetStaffPostEstates",
							headers:this.header_token,
							params:{
								estateType :this.ggw,
								pageSize:this.pSize
							}
						})
						.then(res=>{
							console.log(res);
							if(res.data.code==0){
								this.count=res.data.result.Total
								this.house=res.data.result.Result
								if(this.count<this.pSize){
									this.allLoaded=true;
								}
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
			getNum(id){
				return new Promise((resolve)=>{
						this.$axios({
							method:"get",
							url:"/AdPosition/GetAdPositionCurrentOfferYuanBao",
							headers:this.header_token,
							params:{
								adPositionId :this.$route.query.id,
								propId:id,
								v:Math.random()*10
							}
						})
						.then(res=>{
							console.log(res);
							if(res.data.code==0){
								this.nowNum=res.data.data
								if(res.data.data>0){
									if(Number(res.data.data)<Number(this.maxNum)){
										this.mainNum=Number(res.data.data)+5
									}else{
										this.mainNum=Number(res.data.data)
									}
								}else{
										this.mainNum=10
								}
							}else{
								Toast(res.data.msg);
							}
							resolve(res);
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
							url:"/AdPosition/Auction",
							headers:this.header_token,
							data:{
								AdPositionId :this.$route.query.id,
								CurrentYuanBaoNum: this.mainNum,
								ShowObjectValue: this.houseNum,
								PropId:this.propId,
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
									setTimeout(()=>{
										window.history.go(-1);
									},500)
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
			search(){
				Indicator.open();
				return new Promise((resolve)=>{
						this.$axios({
							method:"get",
							url:"/ZhongyuanHouse/GetEstateAdByAdsNo",
							headers:this.header_token,
							params:{
								adsNo :this.adsNo
							}
						})
						.then(res=>{
							console.log(res);
							// 收起键盘
							document.activeElement.blur();
							resolve(res);
							if(res.data.code==0){
								this.house=res.data.result
								this.count=1;
								this.ggw=res.data.estateType
							}else{
								Toast(res.data.message);
							}
							Indicator.close();
						})
						.catch(error=>{
							Indicator.close();
							Toast("网络错误，请稍后再试");
						})
				})
			},
			noPush(){
				return false;
			}
		}
	}
</script>

<style>
	.house{background-color: #F5F5F5;min-height: 100vh;}
	.earnAll{padding: 0 0.34rem;}
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
		width:1.6rem;
		height:0.5rem;
		background:#F4472D;
		border-radius:0.4rem;
		font-size: 0.28rem;
	}
/* 	.earnAll .jjrSection{background-color: #fff;padding: 0.3rem 0.2rem;}
	.jjrL{padding: 0.3rem 0;border-bottom: 1px solid #ededed;}
	.jjrL:last-child{border: 0;}
	.jrl{width: 2.4rem;float: left;margin-right: 0.2rem;}
	.jrr{float: left;width: 3.82rem;}
	.jrr h4{
		    font-weight: bolder;
		    color: #203140;
		    font-size: 0.28rem;
			  display: -webkit-box;
			  -webkit-box-orient: vertical;
			  -webkit-line-clamp: 2;
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
	} */
	.earnTop{height: 1rem;display: flex;border-bottom: 1px solid #ededed;}
	.etTab{flex: 1;text-align: center;}
	.etTab p{margin-top: 0.28rem;font-size: 0.32rem;font-weight: 500;}
	.etTab span{display: inline-block;width: 2rem;height: 2px;margin: 0.2rem auto 0;}
	.on p{color: #FD4F3F;}
	.on span{background-color: #FD4F3F;}
	.over{opacity: 0.5;}
	.showModel{
	  position: fixed;
	  width: 100%;
	  height: 100%;
	  z-index: 90;
	}
	.bj{position: fixed;background: #000;opacity: 0.5;width: 100%;height: 100%;left: 0;top: 0;z-index: 91;}
	.showMsg{font-size: 16px; position: fixed;left: 50%;top: 50%;transform: translate(-50%,-50%);width: 90%;height: 7.2rem; background: #fff;z-index: 92;padding: 0.8rem 0.6rem;border-radius: 8px;}
	.modelClose{position: absolute;right: 0rem;top: 0rem;cursor: pointer;width: 0.8rem;height: 0.8rem;display: block;background: url(../assets/img/close.png) center no-repeat;background-size: 0.27rem;}
	.moudelT{font-size: 0.34rem;font-weight: bold;text-align: center;margin-bottom: 0.6rem;}
	.moudelT img{width: 0.5rem;margin-right: 0.1rem;vertical-align: middle;}
	.showMsg p{margin-bottom: 0.3rem;}
	.showMsg p > label{font-size: 0.32rem;font-weight: bold;}
	.showMsg p span{font-size: 0.28rem;color: #666;}
	.showMsg p i{font-style: normal;display: inline-block;width: 0.6rem;height: 0.6rem;border: 1px solid #333;border-radius: 50%;text-align: center;line-height: 0.5rem;font-size: 0.4rem;}
	.showMsg p strong{font-size: 0.36rem;margin: 0 0.3rem;font-weight: 500;color: #F45048;}
	.showMsg p strong input{ background-color: #f5f5f5; width: 0.68rem;height: 0.6rem;border: 1px solid #ddd;text-align: center;color: #F22C40; background-color: #f5f5f5;}
	.mTip{padding-left: 0.6rem;background: url(../assets/img/icon-tip.png) left 0.06rem no-repeat;background-size: 0.4rem;font-size: 0.24rem;color: #999;line-height: 1.6;}
	.mTip span{color: #F45048;}
	.mBtn{margin-top: 0.5rem;text-align: center;}
	.mBtn button{width: 2rem;margin-right: 0.8rem;font-size: 0.32rem;color: #fff;background-color:#D0CDCD;}
	.mBtn button:last-child{margin: 0;background-color:#F45048;}
	.houseT .mint-searchbar-inner .mintui-search{position: relative;top: 1px !important;font-size: 16px !important;margin-right: 4px;}
	.house .mint-search{height: 1rem;}
	.house .mint-searchbar{background: none;}
	.house .mint-searchbar-inner{border: 1px solid #ddd;height: 0.76rem;}
	.none{width: 100%;height: 6.4rem;margin: 0.8rem auto 0;padding-top: 4.3rem;text-align: center;font-size: 0.28rem;color: #666; background: url(../assets/img/none.png) center top no-repeat;background-size: 4rem;}
	.mint-searchbar-core{font-size: 0.28rem;}
	button.maxBtn{width: 1.3rem;padding: 0;height: 0.62rem;font-size: 0.24rem;margin-left: 0.2rem;border-radius: 0.42rem;}
	.btnTip{font-size: 0.22rem;color: #fd5e4a;text-align: left;margin-top: 0.2rem;font-weight: lighter;}
</style>
