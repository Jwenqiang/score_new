<template>
	<div class="house" :class="showModel?'ohide':''">
		<div style="background-color: #fff;" class="hBan">
			<div class="houseT"><form action="" v-on:submit.prevent="noPush"><mt-search placeholder="请输入中原编码查找房源" @keyup.enter.native="search" v-model="adsNo"></mt-search></form></div> 
			<div class="goT" @click="$router.push({name:'days',params:{id:'29'}})"></div>
			<label class="hander"></label>
		</div>
		<mt-loadmore :top-method="loadTop" ref="loadmore">
		<div class="earnAll">
			<div class="jjrSection">
				<div v-if="house!=''&&house!=null">
					<div class="clear jjrL" v-for="item in house">
						<div class="jrl">
							<img v-lazy="item.ZyHouseOutputDto.FullImagePath" width="100%"/>
						</div>
						<div class="jrr">
							<h4 class="jrt">{{item.ZyHouseOutputDto.Title}}</h4>
							<p>{{item.ZyHouseOutputDto.EstateName}}·{{item.ZyHouseOutputDto.RoomCount}}室{{item.ZyHouseOutputDto.HallCount}}厅·{{item.ZyHouseOutputDto.Garea}}㎡</p>
							<p class="jrbtn" style="overflow: visible;">
								<label class="bBy"><img src="../assets/img/icon-by.png" class="by"/></label>
								<mt-button type="primary" @click="payC(item.ZyHouseOutputDto,'0')" v-if="item.IsAuctionBtnClick">竞拍<img src="../assets/img/icon-dr.png"/></mt-button>
								<mt-button type="primary" style="background: #b3b1b1;" v-else>竞拍<img src="../assets/img/icon-dr.png"/></mt-button>
								<mt-button type="primary" @click="payC(item.ZyHouseOutputDto,'1')">收藏<img src="../assets/img/icon-dr.png"/></mt-button>
								<mt-button type="primary" @click="payC1(item.ZyHouseOutputDto)">包月<img src="../assets/img/icon-dr.png"/></mt-button>
								
							</p>
						</div>
					</div>
					<p style="text-align: center;font-size: 0.24rem;color: #ccc;line-height: 1rem;" @click="pSize+=10" v-if="count>pSize">———— 点击查看更多 ————</p>
				</div>
				<div class="none" style="color: #fff;" v-else>您尚未发布房源广告，请先在A+发布房源广告~</div>
			</div>
		</div>
		</mt-loadmore>
		<div class="aModel modelMsg" :class="showModel?'animationMsg':''">
		  <div class="bj" @click="closeModul"></div>
		  <!-- 包月特定 -->
		  <template v-if="mPay">
			  <div class="aMsg">
				<label class="modelClose" @click="closeModul"></label>
				<div class="clear" style="padding-bottom: 0.2rem;border-bottom: 1px solid #ededed;">
					<div class="jrl" style="height: 1.5rem;">
						<img :src="sHouse.FullImagePath" width="100%"/>
					</div>
					<div class="jrr">
						<h4 class="jrt">{{sHouse.Title}}</h4>
						<p style="margin-top: 0.2rem;">{{sHouse.EstateName}}·{{sHouse.RoomCount}}室{{sHouse.HallCount}}厅·{{sHouse.Garea}}㎡</p>
						<p style="margin: 0.2rem 0 0;color: #333;">{{sHouse.SalePrice | price}}万</p>
					</div>
				</div>
				<div class="sData">
					<p>广告位显示日期：<span style="color: #f42f15;font-weight: bold;">2021-01-01至2021-01-31</span></p>
				</div>
				<div class="ggList">
					<h3>广告位类型</h3>
					<ul>
						<li :class="type1==4?'on':''" @click="getBan1('4')">小区广告位</li>
						<li :class="type1==2?'on':''" @click="getBan1('2')">经纪人广告位</li>
					</ul>
				</div>
				<div class="ggList">
					<h3>广告位位置：{{sName}}</h3>
					<ul class="childList">
						<li :class="on==index?'on':''" v-for="(item,index) in ggwList" :key="item.id" @click="getChild1(item,index)">{{item.AdName}}</li>
					</ul>
				</div>
				<div class="payNum p clear">
					<span class="btnL">
						<label>出价(元宝)</label>
						<label class="max">100起拍 上不封顶</label>
					</span>
					<div class="btnR" style="float: right;">
						<span><i @click="minus1">-</i><strong>{{mainNum1}}</strong><i @click="add1">+</i></span>
					</div>
				</div>
				<div class="bTip">
					<p v-if="currentNum>0">当前广告位已有<span>{{currentNum}}</span>人出价，最高价为<span>{{nowNum1}}</span>元宝。</p>
					<p v-else>当前广告位暂无经纪人出价，赶快出价吧~</p>
					<p>出价越高成功竞拍的机会越大，竞拍不成功所耗元宝将退回账户</p>
				</div>
			  </div>
				<div class="showBtn" @click="showC">超值包月 立即竞拍</div>
		  </template>
		  <!-- 正常流程 -->
		  <template v-else>
			  <div class="aMsg">
			  				<label class="modelClose" @click="closeModul"></label>
			  				<div class="clear" style="padding-bottom: 0.2rem;border-bottom: 1px solid #ededed;">
			  					<div class="jrl" style="height: 1.5rem;">
			  						<img :src="sHouse.FullImagePath" width="100%"/>
			  					</div>
			  					<div class="jrr">
			  						<h4 class="jrt">{{sHouse.Title}}</h4>
			  						<p style="margin-top: 0.2rem;">{{sHouse.EstateName}}·{{sHouse.RoomCount}}室{{sHouse.HallCount}}厅·{{sHouse.Garea}}㎡</p>
			  						<p style="margin: 0.2rem 0 0;color: #333;">{{sHouse.SalePrice | price}}万</p>
			  					</div>
			  				</div>
			  				<div class="sData" v-if="pType=='0'">
			  					<p>广告位显示日期：<span>{{showDate}}</span></p>
			  				</div>
			  				<div class="ggList">
			  					<h3>广告位类型</h3>
			  					<ul>
			  						<li :class="type==1?'on':''" @click="getBan('1')">首页广告位</li>
			  						<li :class="type==3?'on':''" @click="getBan('3')">区域广告位</li>
			  						<li :class="type==4?'on':''" @click="getBan('4')">小区广告位</li>
			  						<li :class="type==2?'on':''" @click="getBan('2')">经纪人广告位</li>
			  					</ul>
			  				</div>
			  				<div class="ggList">
			  					<h3>广告位位置：{{sName}}</h3>
			  					<ul class="childList">
			  						<li :class="on==index?'on':''" v-for="(item,index) in ggwList" :key="item.id" @click="getChild(item,index)">{{item.AdName}}</li>
			  					</ul>
			  				</div>
			  				<div class="payNum p clear">
			  					<span class="btnL">
			  						<label>出价(元宝)</label>
			  						<label class="max" v-if="maxNum>0">封顶价为{{maxNum}}元宝</label>
			  					</span>
			  					<div class="btnR" style="float: right;">
			  						<span><i @click="minus">-</i><strong>{{mainNum}}</strong><i @click="add">+</i></span>
			  						<mt-button class="maxBtn" style="font-size: 12px;" @click="mainNum=maxNum" v-if="maxNum>0">出最高价</mt-button> 
			  					</div>
			  				</div>
			  				<div class="bTip">
			  					<p v-if="currentNum>0">当前广告位已有<span>{{currentNum}}</span>人出价，最高价为<span>{{nowNum}}</span>元宝。</p>
			  					<p v-else>当前广告位暂无经纪人出价，赶快出价吧~</p>
			  					<p>出价越高成功竞拍的机会越大，竞拍不成功所耗元宝将退回账户</p>
			  				</div>
			  </div>
			  <template v-if="pType=='0'">
			  				  <div class="showBtn" style="background: #b5b3b3;" v-if="isMax">立即竞拍</div>
			  				  <div class="showBtn" @click="showC" v-else>立即竞拍</div>
			  </template>
			  <div class="showBtn" @click="setCar" v-else-if="pType=='1'">加入收藏夹</div>
		  </template>
		</div>
		<!--  -->
		<div class="fixedRight">
			<label @click="$router.push({name:'cars'})">
				<img src="../assets/img/icon-car.png"/>
			</label>
			<label @click="$router.push({name:'record'})">
				<img src="../assets/img/icon-record.png"/>
			</label>
		</div>
		<!-- 包月活动 -->
		 <div class="showModel modelMsg" v-if="showBy">
		   <div class="bj"></div>
		   <div class="showMsg" style="padding: 0.5rem;">
		 	<h3>温馨提示</h3>
		 	<p class="inCode" style="text-align: left;line-height: 1.5;font-size: 0.28rem;">因房源发布30天到期自动下架，如确认竞拍包月广告位，请重新发布房源后参与竞拍。</p>
		 	<mt-button type="primary" class="houseBtn" style="width: 3.2rem;" @click="showBy=false">我知道了</mt-button>
		   </div>
		 </div>
		 <div class="showModel modelMsg" v-if="showCode">
		   <div class="bj"></div>
		   <div class="showMsg">
		     <label class="modelClose" @click="showCode=false"></label>
		 	<h3>请输入验证码</h3>
		 	<p class="inCode clear"><input type="text" placeholder="请输入图片中验证码" v-model="pCode"/><img :src="codeSrc" @click="getImgCode"/></p>
		 			<p class="codeTip">提示：图片有效期一分钟,点击图片会更新</p>
		 	<mt-button type="primary" class="houseBtn" @click="payNum">确定</mt-button>
		   </div>
		 </div>
		 <foot tab3='1'></foot>
	</div>
</template>


<script>
	import Foot from '@/components/foot.vue'
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
				mainNum:50,
				nowNum:50,
				mainNum1:100,
				nowNum1:0,
				showModel:false,
				pSize:10,
				count:"",
				house:"",
				houseNum:"",
				houseName:"",
				adsNo:"",
				isSearch:false,
				allLoaded:false,
				maxNum:"",
				propId:"",
				pName:"",
				pUrl:'',
				isNew:false,
				sHouse:"",
				type:1,
				type1:4,
				houseId:"",
				areaName:"",
				pName:"",
				showDate:"",
				ggwList:"",
				childMsg:[],
				on:-1,
				pType:"",
				sName:"",
				currentNum:0,
				currentYb:"",
				adId:"",
				roomF:"",
				roomT:"",
				codeSrc:"",
				showCode:false,
				pCode:"",
				isMax:false,
				mPay:false,
				showBy:false
			}
		},
		mounted(){
			if(this.$route.params.tab){
				this.type=this.$route.params.tab
			}
			this.getHouse();
			this.getImgCode();
		},
		components:{
			Search,
			Foot
		},
		watch:{
			type(){
				this.on=-1;
				this.maxNum="";
				if(this.pType=='1'){
					this.mainNum=50;
				}
			},
			nowNum(){
				if(this.pType=='0'){
					if(this.nowNum==this.maxNum){
						this.mainNum=this.maxNum;
						this.isMax=true;
					}else{
						this.isMax=false;
						if(this.currentNum>0){
							this.mainNum=Number(this.nowNum)+5
						}else{
							this.mainNum=50
						}
					}
				}
			},
			showCode(){
				if(this.showCode==false){
					this.pCode=""
				}
			},
			showModel(){
				if(this.showModel==false){
					this.mainNum=50;
				}
			},
			pType(){
				if(this.pType=='0'){
					if(this.nowNum==this.maxNum){
						this.mainNum=this.maxNum
						this.isMax=true;
					}else{
						this.isMax=false;
						if(this.currentNum>0){
							this.mainNum=Number(this.nowNum)+5
						}else{
							this.mainNum=50
						}
					}
				}else{
					this.isMax=false;
				}
			},

			pSize(){
				this.getHouse()
			},
			// '$route' (to, from) {
			//    if (to.name === 'houseList') {
			// 	   this.mainNum=10
			//     }
			//  }
		},
		computed:{

		},
		filters:{
			price(msg){
				return msg/10000
			}
		},
		methods:{
			showC(){
				this.getImgCode();
				this.showCode=true;
			},
			getImgCode(){
				this.$axios({
					method:"get",
					url:"/My/GetVerifyCodeBase64",
					headers:this.header_token,
				})
				.then(res=>{
					console.log(res);
					this.codeSrc='data:image/gif;base64,'+res.data.data;
				})
			},
			getBan(n){
				Indicator.open({
				  spinnerType: 'triple-bounce'
				});
				this.type=n;
				if(this.type=='1'||this.type=='2'||this.type=='3'){
					this.pName="";
				}else{
					this.pName=this.areaName;
				}
				this.sName="";
				this.getGlist();
			},
			getBan1(n){
				Indicator.open({
				  spinnerType: 'triple-bounce'
				});
				this.type1=n;
				if(this.type1=='1'||this.type1=='2'||this.type1=='3'){
					this.pName="";
				}else{
					this.pName=this.areaName;
				}
				this.sName="";
				this.getGlist1();
			},
			getChild(v,idx){
				console.log(v)
				this.childMsg[0]=v;
				this.on=idx;
				this.$set(this.childMsg[0],'on',idx);
				this.maxNum=v.MaxYuanBao;
				this.adId=v.AdPositionId;
				var adplace="";
				if(this.type=="3"){
					adplace=this.sHouse.RegionId
				}else if(this.type=="4"){
					adplace=this.sHouse.EstateCode
				}
				return new Promise((resolve)=>{
						this.$axios({
							method:"get",
							url:"/AdPosition/GetCurrentAdData",
							headers:this.header_token,
							params:{
								"AdType": this.type,
							    "AdPositionId": v.AdPositionId,
								"PropId":this.sHouse.PropId,
								"AdPlace": adplace
							}
						})
						.then(res=>{
							console.log(res);
							if(res.data.code==0){
								this.currentNum=res.data.data.count;
								if(res.data.data.currentYuanBao>0){
									this.nowNum=res.data.data.currentYuanBao;
									// if(this.nowNum==this.maxNum){
									// 	this.mainNum=this.nowNum;
									// }else{
									// 	this.mainNum=this.nowNum+5;
									// }
								}else{
									this.nowNum=50;
									this.mainNum=50;
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
			loadTop(){
				this.pSize=10;
				this.getHouse()
			},
			loadBottom(){
				this.pSize+=10
			},
			minus(){
				if(this.mainNum<=50){
					Toast("50个不能再少了哦~");
				}else if((this.mainNum<=Number(this.nowNum)+5)&&this.pType=='0'){
					Toast("当前广告位出价不能少于"+this.nowNum);
				}else{
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
			minus1(){
				if(this.mainNum1<=100){
					Toast("100个不能再少了哦~");
				}else if((this.mainNum1<=Number(this.nowNum1)+50)){
					Toast("当前广告位出价不能少于"+this.nowNum1);
				}else{
					this.mainNum1 -=50;
				}
			},			
			add1(){
				this.mainNum1 +=50;
			},
			payC(house,t){
				this.mPay=false;//mPay=true表示是包月活动
				this.pType=t;
				this.showModel=true;
				this.sHouse=house;
				this.houseId=house.RegionId;
				this.areaName=house.EstateName;
				this.getGlist();
			},
			payC1(house){
				this.showBy=true;
				this.mPay=true;
				this.showModel=true;
				this.sHouse=house;
				this.houseId=house.RegionId;
				this.areaName=house.EstateName;
				if(this.type1=='1'||this.type1=='2'||this.type1=='3'){
					this.pName="";
				}else{
					this.pName=this.areaName;
				}
				this.getGlist1();
			},
			getGlist1(){
				return new Promise((resolve)=>{
						this.$axios({
							method:"post",
							url:"/AdPosition/GetAdPositionList",
							headers:this.header_token,
							data:{
								"AdType": this.type1,
							    "RegionId": this.houseId,
							    "RegionName":this.pName
							}
						})
						.then(res=>{
							console.log(res);
							if(res.data.code==0){
								this.showDate=res.data.data.BeginShowTimeDisplay;
								this.ggwList=res.data.data.AdPositionList;
								this.sName=res.data.data.RegionName;
								this.getChild1(this.ggwList[0],0)
							}else{
								Toast(res.data.msg);
							}
							// Indicator.close();
						})
						.catch(error=>{
							// Indicator.close();
							Toast("网络错误，请稍后再试");
						})
				})
			},
			getChild1(v,idx){
				console.log(v)
				this.childMsg[0]=v;
				this.on=idx;
				this.$set(this.childMsg[0],'on',idx);
				// this.maxNum=v.MaxYuanBao;
				this.adId=v.AdPositionId;
				var adplace="";
				if(this.type1=="3"){
					adplace=this.sHouse.RegionId
				}else if(this.type1=="4"){
					adplace=this.sHouse.EstateCode
				}
				return new Promise((resolve)=>{
						this.$axios({
							method:"get",
							url:"/AdPosition/GetCurrentAdDataMonth",
							headers:this.header_token,
							params:{
								"AdType": this.type1,
							    "AdPositionId": v.AdPositionId,
								"PropId":this.sHouse.PropId,
								"AdPlace": adplace
							}
						})
						.then(res=>{
							console.log(res);
							if(res.data.code==0){
								this.currentNum=res.data.data.count;
								if(res.data.data.currentYuanBao>0){
									this.nowNum1=res.data.data.currentYuanBao;
									this.mainNum1=this.nowNum1+50;
									// if(this.nowNum==this.maxNum){
									// 	this.mainNum=this.nowNum;
									// }else{
									// 	this.mainNum=this.nowNum+5;
									// }
								}else{
									this.nowNum1=0;
									this.mainNum1=100;
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
			getGlist(){
				return new Promise((resolve)=>{
						this.$axios({
							method:"post",
							url:"/AdPosition/GetAdPositionList",
							headers:this.header_token,
							data:{
								"AdType": this.type,
							    "RegionId": this.houseId,
							    "RegionName":this.pName
							}
						})
						.then(res=>{
							console.log(res);
							if(res.data.code==0){
								this.showDate=res.data.data.BeginShowTimeDisplay;
								this.ggwList=res.data.data.AdPositionList;
								this.sName=res.data.data.RegionName;
								this.getChild(this.ggwList[0],0)
							}else{
								Toast(res.data.msg);
							}
							// Indicator.close();
						})
						.catch(error=>{
							// Indicator.close();
							Toast("网络错误，请稍后再试");
						})
				})
			},
			setCar(){
				var adplace="";
				if(this.type=="4"){
					adplace=this.sHouse.EstateCode
				}else if(this.type=="3"){
					adplace=this.sHouse.RegionId
				}
				return new Promise((resolve)=>{
						this.$axios({
							method:"post",
							url:"/AdPosition/AddPreAuctionCar",
							headers:this.header_token,
							data:{
								  "AdName": this.childMsg[0].AdName,
								    "RoomCount": this.sHouse.RoomCount,
								    "HallCount": this.sHouse.HallCount,
								    "EstateCode": this.sHouse.EstateCode,
								    "Garea": this.sHouse.Garea,
								    "SalePrice": this.sHouse.SalePrice,
								    "AdType": this.type,
								    "AdPlace": adplace,
								    "AdPositionId": this.adId,
								    "CurrentYuanBaoNum": this.mainNum,
								    "PropId": this.sHouse.PropId,
								    "PropName": this.sHouse.Title,
								    "AdsNo": this.sHouse.AdsNo,
								    "PostId": this.sHouse.PostId,
								    "PropUrl": "",
								    "EstateName": this.sHouse.EstateName
							}
						})
						.then(res=>{
							console.log(res);
							if(res.data.code==0){
								Toast({
								  message: '添加成功',
								  // iconClass: 'icon icon-success',
								  // duration: 50000
								});
								this.showModel=false;
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
			closeModul(){
				this.showModel=false;
			},
			getHouse(){
				this.allLoaded=false
				Indicator.open();
				return new Promise((resolve)=>{
						this.$axios({
							method:"get",
							url:"/ZhongyuanHouseV2/GetMyEstates",
							headers:this.header_token,
							params:{
								pageIndex:1,
								pageSize:this.pSize
							}
						})
						.then(res=>{
							console.log(res);
							if(res.data.code==0){
								this.count=res.data.data.count
								this.house=res.data.data.list
								if(this.count<this.pSize){
									this.allLoaded=true;
								}
							}else{
								Toast(res.data.msg);
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
								if(res.data.data>=0){
									this.nowNum=res.data.data
								}
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
				console.log(this.mPay);
				if(this.mPay){//包月活动
					var adplace="";
					if(this.type1=="4"){
						adplace=this.sHouse.EstateCode
					}else if(this.type1=="3"){
						adplace=this.sHouse.RegionId
					}
					return new Promise((resolve)=>{
							this.$axios({
								method:"post",
								url:"/AdPosition/AuctionNewMonth",
								headers:this.header_token,
								data:{
									  "AdName": this.childMsg[0].AdName,
									    "RoomCount": this.sHouse.RoomCount,
									    "HallCount": this.sHouse.HallCount,
									    "EstateCode": this.sHouse.EstateCode,
									    "Garea": this.sHouse.Garea,
									    "SalePrice": this.sHouse.SalePrice,
									    "AdType": this.type1,
									    "AdPlace": adplace,
									    "AdPositionId": this.adId,
									    "CurrentYuanBaoNum": this.mainNum1,
									    "PropId": this.sHouse.PropId,
									    "PropName": this.sHouse.Title,
									    "AdsNo": this.sHouse.AdsNo,
									    "PostId": this.sHouse.PostId,
									    "PropUrl": "",
									    "EstateName": this.sHouse.EstateName,
										"VerifyCode":this.pCode
								}
							})
							.then(res=>{
								console.log(res);
								resolve(res);
								if(res.data.code==0){
									if(res.data.data.IsSuccess){
										this.showCode=false;
										Toast("出价成功,您将有机会竞得该位置~");
										this.getGlist1();
									}else{
										Toast(res.data.data.Reamark);
										this.getImgCode();
									}
									
								}else{
									Toast(res.data.msg);
								}
							})
							.catch(error=>{
								Toast("网络错误，请稍后再试");
							})
					})
				}else{//正常竞拍
					var adplace="";
					if(this.type=="4"){
						adplace=this.sHouse.EstateCode
					}else if(this.type=="3"){
						adplace=this.sHouse.RegionId
					}
					return new Promise((resolve)=>{
							this.$axios({
								method:"post",
								url:"/AdPosition/AuctionNew",
								headers:this.header_token,
								data:{
									  "AdName": this.childMsg[0].AdName,
									    "RoomCount": this.sHouse.RoomCount,
									    "HallCount": this.sHouse.HallCount,
									    "EstateCode": this.sHouse.EstateCode,
									    "Garea": this.sHouse.Garea,
									    "SalePrice": this.sHouse.SalePrice,
									    "AdType": this.type,
									    "AdPlace": adplace,
									    "AdPositionId": this.adId,
									    "CurrentYuanBaoNum": this.mainNum,
									    "PropId": this.sHouse.PropId,
									    "PropName": this.sHouse.Title,
									    "AdsNo": this.sHouse.AdsNo,
									    "PostId": this.sHouse.PostId,
									    "PropUrl": "",
									    "EstateName": this.sHouse.EstateName,
										"VerifyCode":this.pCode
								}
							})
							.then(res=>{
								console.log(res);
								resolve(res);
								if(res.data.code==0){
									if(res.data.data.IsSuccess){
										this.showCode=false;
										Toast("出价成功,您将有机会竞得该位置~");
									}else{
										Toast(res.data.data.Reamark);
										this.getImgCode();
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

			},
			search(){
				Indicator.open();
				return new Promise((resolve)=>{
						this.$axios({
							method:"get",
							url:"/ZhongyuanHouseV2/GetEstateByAdsNo",
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
								this.house=[res.data.data];
								this.count=1;
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
	.ohide{height: 100vh;overflow: hidden;}
	.house{background: #106764 url(../assets/img/byBj.png) center top no-repeat; background-size: 100%;min-height: 100vh;padding-bottom: 1.2rem;}
	.earnAll{padding: 0 0.34rem;}
	.earnAll .jjrSection{margin: 0.3rem 0;}
	.jjrL{padding: 0.3rem 0.2rem;background-color: #fff;margin-bottom: 0.3rem;box-shadow: 0px 2px 6px 2px rgba(0, 0, 0, 0.06);border-radius: 0.1rem;}
	.jrl{width: 2.4rem;float: left;margin-right: 0.2rem;max-height: 1.8rem;overflow: hidden;}
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
		position: relative;
	}
	.jrbtn{text-align: left;}
	.jrbtn button{
		padding: 0;
		text-align: center;
		margin-top: 0.4rem;
		margin-right: 0.1rem;
		width:1.2rem;
		height:0.52rem;
		line-height: 0.52rem;
		background: linear-gradient(134deg, #FB6F52 0%, #F3240A 100%);
		border-radius:0.4rem;
		font-size: 0.28rem;
		border: 0;
	}
	.jrbtn button:nth-of-type(2){background: linear-gradient(133deg, #7BACEE 0%, #6089D9 100%);}
	.jrbtn button:last-child{margin-right: 0;background: linear-gradient(135deg, #2FC8A2 0%, #048974 100%);position: relative;overflow: auto;}
	.jrbtn button img{width: 0.26rem;vertical-align: -2px;margin-left: 3px;}
	.earnTop{height: 1rem;display: flex;border-bottom: 1px solid #ededed;}
	.etTab{flex: 1;text-align: center;}
	.etTab p{margin-top: 0.28rem;font-size: 0.32rem;font-weight: 500;}
	.etTab span{display: inline-block;width: 2rem;height: 2px;margin: 0.2rem auto 0;}
	.on p{color: #FD4F3F;}
	.on span{background-color: #FD4F3F;}
	.over{opacity: 0.5;}
	.aModel{
/* 	  position: fixed;
	  width: 100%;
	  height: 100%; */
	  z-index: 90;
	  /* opacity: 0; */
	}
	.bj{position: fixed;background: #000;opacity: 0.5;width: 100%;height: 100%;left: 0;top: 0;z-index: 91;}
	.aMsg{font-size: 16px; position: fixed;left: 0;bottom: -14rem;width: 100%;height: 11.2rem; overflow-y: auto;background: #fff;z-index: 92;padding: 0.6rem 0.3rem 1.2rem;transition: all 0.5s ease-in-out;}
	.modelClose{position: absolute;right: 0rem;top: 0rem;cursor: pointer;width: 0.8rem;height: 0.8rem;display: block;background: url(../assets/img/close.png) center no-repeat;background-size: 0.27rem;}
	.moudelT{font-size: 0.34rem;font-weight: bold;text-align: center;margin-bottom: 0.6rem;}
	.moudelT img{width: 0.5rem;margin-right: 0.1rem;vertical-align: middle;}
	.aMsg .p{margin-bottom: 0.3rem;}
	.aMsg .btnL{width: 2rem;display: block;float: left;}
	.aMsg .p span label{font-size: 0.32rem;font-weight: bold;display: block;margin-bottom: 2px;}
	.aMsg .p span label.max{font-size: 0.24rem;font-weight: 400;color: #999;}
	.btnR span{font-size: 0.28rem;color: #666;float: left;}
	.btnR i{float: left;font-style: normal;display: inline-block;width: 0.6rem;height: 0.6rem;text-align: center;line-height: 0.6rem;font-size: 0.4rem;background-color: #eee;}
	.btnR strong{float: left;font-size: 0.36rem;margin: 0 0.1rem;font-weight: bold;color: #333;background-color: #eee;height: 0.6rem;width: 0.8rem;display: inline-block;line-height: 0.6rem;text-align: center;}
	.btnR strong input{ background-color: #f5f5f5; width: 0.68rem;height: 0.6rem;border: 1px solid #ddd;text-align: center;color: #F22C40; background-color: #f5f5f5;}
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
	button.maxBtn{width: 1.3rem;padding: 0;height: 0.62rem;font-size: 0.28rem;margin-left: 0.2rem;background-color: #EEEEEE;color: #333;}
	.btnTip{font-size: 0.22rem;color: #fd5e4a;text-align: left;margin-top: 0.2rem;font-weight: lighter;}
	.aModel .bj{display: none;}
	.animationMsg{opacity: 1;}
	.animationMsg .bj{display: block;}
	.animationMsg .aMsg{bottom: 0;}
	.sData{font-size: 0.3rem;color: #666;margin: 0.2rem 0 0;}
	.sData p span{color: #333;}
	.ggList{padding-bottom: 0.25rem;padding-top: 0.3rem;border-bottom: 1px solid #ededed;}
	.ggList h3{font-size: 0.3rem;margin-bottom: 0.2rem;}
	.ggList li{min-width: 1.5rem;text-align: center;display: inline-block;padding: 0.08rem 0.1rem;text-align: center;background-color: #eee;margin-right: 0.2rem;font-size: 0.26rem;color: #333;border-radius: 0.1rem;}
	.ggList li:last-child{margin: 0;}
	.ggList li.on{background-color: #FCE5E7;color: #E60012;border: 1px solid #E60012;}
	.childList{height: 1.75rem;overflow-y: auto;}
	.payNum{margin-top: 0.3rem;padding-bottom: 0.2rem;border-bottom: 1px solid #ededed;height: 1rem;}
	.bTip{font-size: 0.24rem;color: #999;}
	.bTip p{margin-bottom: 0.1rem;}
	.bTip p span{color: #E60012;}
	.showBtn{width: 100%;height: 1rem;line-height: 1rem;background: linear-gradient(134deg, #FB6F52 0%, #F3240A 100%);color: #fff;font-size: 0.32rem;text-align: center;position: fixed;bottom: 0;left: 0;z-index: 93;display: none;}
	.animationMsg .showBtn{display: block;}
	.childList li{margin-bottom: 0.2rem;}
	.childList li:nth-of-type(4n){margin-right: 0;}
	.fixedRight{position: fixed;right: 0;bottom: 10%;z-index: 81;}
	.fixedRight label{display: block;margin-bottom: 0.4rem;}
	.fixedRight label img{width: 1.18rem;}
	.house .showModel{
	  position: fixed;
/* 	  width: 100%;
	  height: 100%; */
	  z-index: 100;
	}
	.house .showModel .bj{position: fixed;background: #000;opacity: 0.5;width: 100%;height: 100%;left: 0;top: 0;z-index: 101;}
	.house .showModel .showMsg{text-align: center;font-size: 16px; position: fixed;left: 50%;top: 50%;transform: translate(-50%,-50%);width: 5.8rem;height: 4.5rem; background: #fff;z-index: 102;padding: 0.6rem 0.7rem;border-radius: 8px;}
		.house .showMsg h3{font-size: 0.32rem;font-weight: 500;}
		.house .showMsg p{font-size: 0.3rem;color: #666;margin-top: 0.3rem;}
		.houseBtn{width: 2.8rem;height: 0.8rem;margin: 0.5rem auto 0;display: block;
	background: linear-gradient(134deg, #FB6F52 0%, #F3240A 100%);border-radius: 3px;font-size: 0.32rem;}
		.modelClose{position: absolute;right: 0rem;top: 0rem;cursor: pointer;width: 0.8rem;height: 0.8rem;display: block;background: url(../assets/img/close.png) center no-repeat;background-size: 0.27rem;}
		.inCode input{height: 0.7rem;width: 2.5rem;border: 1px solid #ddd;float: left;padding-left: 0.1rem;font-size: 0.26rem;}
		.inCode img{width: 1.6rem;height: 0.7rem;float: right;}
		.showMsg p.codeTip{font-size: 0.22rem;color: #999;text-align: left;}
		.mint-indicator-wrapper{
			z-index: 99;
		}
		.mint-button::after{background: none;}
		.hBan{height: 3.91rem;width: 100%;background: url(../assets/img/byBan.jpg) center no-repeat;background-size: 100%;position: relative;}
		.mint-searchbar-cancel{
			color: #fff;
		}
		.bBy{
			display: block;
			position: absolute;
			top: 0.1rem;
			right: 0.2rem;
			width: 0.63rem;
			height: 0.38rem;
			animation: bounce 2s 0.5s ease infinite;
		}
		@keyframes bounce{
			0%, 20%, 53%, 80%, 100% {
			    -webkit-animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
			    animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
			    -webkit-transform: translate3d(0,0,0);
			    transform: translate3d(0,0,0);
			}
			40%, 43% {
			    -webkit-animation-timing-function: cubic-bezier(0.755, 0.050, 0.855, 0.060);
			    animation-timing-function: cubic-bezier(0.755, 0.050, 0.855, 0.060);
			    -webkit-transform: translate3d(0, -4px, 0);
			    transform: translate3d(0, -4px, 0);
			}
			70% {
			    -webkit-animation-timing-function: cubic-bezier(0.755, 0.050, 0.855, 0.060);
			    animation-timing-function: cubic-bezier(0.755, 0.050, 0.855, 0.060);
			    -webkit-transform: translate3d(0, -3px, 0);
			    transform: translate3d(0, -3px, 0);
			}
			90% {
			    -webkit-transform: translate3d(0,-2px,0);
			    transform: translate3d(0,-2px,0);
			}
		}
		img.by{
			width: 100%;
		}
		.hander{display: block;width: 0.48rem;height: 0.58rem;background: url(../assets/img/hander.png) center no-repeat;background-size: 100%;position: absolute;bottom: 0.1rem;right: 0.2rem;bottom: 0.2rem;right: 2.3rem;
			animation: big 0.5s ease infinite;
		}
		@keyframes big{
			0%{transform: scale(1);}
			100%{transform: scale(0.8);}
		}
		.goT{width: 100%;height: 2.9rem;}
</style>
