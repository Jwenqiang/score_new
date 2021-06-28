<template>
	<div class="house houseList week" style="padding-bottom: 0.2rem;" :class="showModel?'ohide':''">
		<div class="hBan">
			<label class="weekRules" @click="showRules=true"></label>
		</div>
		<div class="houseT">
			<form action="" v-on:submit.prevent="noPush"><mt-search placeholder="请输入中原编码查找房源" @keyup.enter.native="search" v-model="adsNo"></mt-search></form>
		</div>
		<mt-loadmore :top-method="loadTop" ref="loadmore">
		<div class="earnAll">
			<div class="jjrSection">
				<div v-if="house.length>0">
					<div class="clear jjrL" v-for="(item,index) in house" :key="item.ZyHouseOutputDto.AdsNo">
						<div class="jrl">
							<img :src="item.ZyHouseOutputDto.FullImagePath" width="100%" @click="shareHouse(item.ZyHouseOutputDto.AdsNo,jjrNum)"/>
						</div>
						<div class="jrr">
							<div>
								<h4 class="jrt" @click="shareHouse(item.ZyHouseOutputDto.AdsNo,jjrNum)">{{item.ZyHouseOutputDto.Title}}</h4>
								<p @click="shareHouse(item.ZyHouseOutputDto.AdsNo,jjrNum)">{{item.ZyHouseOutputDto.EstateName}}·{{item.ZyHouseOutputDto.RoomCount}}室{{item.ZyHouseOutputDto.HallCount}}厅·{{item.ZyHouseOutputDto.Garea}}㎡</p>
								<p class="jrbtn">
									<mt-button type="primary" @click="payC(item.ZyHouseOutputDto,'0',item.IsSelf)" v-if="item.IsAuctionBtnClick">竞拍</mt-button>
									<mt-button type="primary" style="border-color: #999;color: #999;" v-else>竞拍</mt-button>
									<mt-button type="primary" @click="payC(item.ZyHouseOutputDto,'1',item.IsSelf)" v-if="item.IsPreAuctionBtnClick&&item.IsSelf">收藏</mt-button>
									<mt-button type="primary" style="border-color: #999;color: #999;" v-else>收藏</mt-button>
									<template v-if="canWeek">
										<mt-button type="primary" class="animateWeek" @click="payC(item.ZyHouseOutputDto,'0',item.IsSelf,true)" v-if="item.IsAuctionBtnClick&&item.IsSelf&&index==0"></mt-button>
										<mt-button type="primary" @click="payC(item.ZyHouseOutputDto,'0',item.IsSelf,true)" v-else-if="item.IsAuctionBtnClick&&item.IsSelf&&index>0">包周</mt-button>
									</template>
									<mt-button type="primary" style="background: #999;color: #fff;border: 1px solid #999;" @click="weekTip" v-else>包周</mt-button>
								</p>
							</div>
						</div>
					</div>
					<p class="noList" @click="pSize+=10" v-if="count>pSize">正在加载</p>
					<p class="noList" v-else-if="count<=pSize&&loadOver"><span></span>&nbsp;我是有底线的&nbsp;<span></span></p>
				</div>
				<div class="none" v-else-if="house.length==0&&ready">您尚未发布房源广告，请先在A+发布房源广告~</div>
			</div>
		</div>
		</mt-loadmore>
		<!-- 竞拍模块 -->
		<div class="aModel modelMsg" :class="showModel?'animationMsg':''">
		  <div class="bj" @click="closeModul"></div>
		  <!-- 竞拍房源 -->
		  <div class="aMsg" v-if="houseType=='h'">
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
					<li :class="type==1?'on':''" @click="getBan('1')" v-if="!hasWeek">首页广告位</li>
					<li :class="type==3?'on':''" @click="getBan('3')" v-if="!hasWeek">区域广告位</li>
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
					<label class="max" v-if="maxNum>0&&!hasWeek">封顶价为{{maxNum}}元宝</label>
					<label class="max" v-else-if="hasWeek">封顶价上不封顶</label>
				</span>
				<div class="btnR" style="float: right;">
					<span><i @click="minus">-</i><strong>{{mainNum}}</strong><i @click="add">+</i></span>
					<mt-button class="maxBtn" style="font-size: 12px;" @click="mainNum=maxNum" v-if="maxNum>0&&!hasWeek">出最高价</mt-button> 
				</div>
			</div>
			<div class="bTip">
				<p v-if="currentNum>0">当前广告位已有<span>{{currentNum}}</span>人出价，最高价为<span>{{nowNum}}</span>元宝。</p>
				<p v-else>当前广告位暂无经纪人出价，赶快出价吧~</p>
				<p>出价越高成功竞拍的机会越大，竞拍不成功所耗元宝将退回账户</p>
			</div>
		  </div>
		  <!-- 竞拍学校 -->
		  <div class="aMsg" style="height: 7.2rem;" v-else>
		    <label class="modelClose" @click="closeModul"></label>
		    <div class="clear" style="padding-bottom: 0.2rem;border-bottom: 1px solid #ededed;">
		    	<div class="jrl" style="height: 1.5rem;">
		    		<img :src="sSchool.ImagePath" width="100%"/>
		    	</div>
		    	<div class="jrr">
		    		<h4 class="jrt">{{sSchool.SchoolName}}</h4>
		    		<p style="margin-top: 0.2rem;">{{sSchool.SchoolShortName}}</p>
		  			<p style="margin: 0.2rem 0 0;color: #333;">{{sSchool.Address}}</p>
		    	</div>
		    </div>
		  			<div class="sData" v-if="pType=='0'">
		  				<p>广告位显示日期：<span>{{showDate}}</span></p>
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
			  <template v-if="!hasWeek">
				  <template v-if="isWeek">
					  <div class="showBtn" style="background: #b5b3b3;">该广告位已参与包周</div>
				  </template>
				  <template v-else>
					  <div class="showBtn" style="background: #b5b3b3;" v-if="isMax">立即竞拍</div>
					  <div class="showBtn" @click="showC" v-else>立即竞拍</div>
				  </template>
			  </template>
			  <template v-else>
				  <div class="showBtn" @click="showC">超值包周 立即竞拍</div>
			  </template>
		  </template>
		  <div class="showBtn" @click="setCar" v-else-if="pType=='1'">加入收藏夹</div>
		</div>
		<!--  -->
		<div class="fixedRight">
			<label @click="$router.push({name:'cars'})">
				收藏夹
			</label>
			<label @click="$router.push({name:'houseListSchool'})">
				竞拍学校
			</label>
		</div>
		 <div class="showModel modelMsg" v-if="showCode">
		   <div class="bj"></div>
		   <div class="showMsg">
		     <label class="modelClose" @click="showCode=false"></label>
		 	<h3>请输入验证码</h3>
		 	<p class="inCode clear"><input type="text" placeholder="请输入图片中验证码" v-model="pCode"/><span @click="getImgCode"><img :src="codeSrc"/></span></p>
			<p class="codeTip">提示：图片有效期一分钟,点击图片会更新</p>
		 	<mt-button type="primary" class="houseBtn" @click="payNum">确定</mt-button>
		   </div>
		 </div>
		 <div class="showMD" :class="showRules?'animationRule':''">
			 <div class="bj"></div>
			 <div class="showMD_msg">
				 <label class="close" @click="showRules=false"></label>
			 </div>
		 </div>
		 <!-- <foot tab2='1'></foot> -->
<!-- 		 <div class="hlFoot">
			 <div class="hlfl" :class="houseType=='h'?'active':''" @click="houseType='h'">
				 <img src="../assets/static/icon-house1.svg" v-if="houseType=='h'"/>
				 <img src="../assets/static/icon-house.svg" v-else/>
				 房源广告位
			 </div>
			 <div class="hlfr" :class="houseType=='s'?'active':''" @click="houseType='s'">
				 <img src="../assets/static/icon-school1.svg" v-if="houseType=='s'"/>
				 <img src="../assets/static/icon-school.svg" v-else/>
				 学校广告位
			 </div>
		 </div> -->
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
		name: 'houseList',
		data(){
			return{
				ready:false,
				header_token:{"token": uToken()},
				ggw:"0",
				mainNum:50,
				nowNum:0,
				showModel:false,
				pSize:10,
				schoolSize:10,
				count:"",
				schoolCount:"",
				house:"",
				houseSchool:"",
				houseNum:"",
				houseName:"",
				adsNo:"",
				isSearch:false,
				allLoaded:false,
				maxNum:0,//改动
				propId:"",
				pName:"",
				pUrl:'',
				isNew:false,
				sHouse:"",
				type:1,
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
				cItem:"",//临时记录当前位置的值
				cIdx:"",//临时记录当前位置的值
				houseType:"h",
				content:"",
				jjrNum:"",
				sSchool:"",
				loadOver:false,
				load:false,
				scrollTop:0,
				isSelf:true,
				empNo:"",
				isWeek:false,
				showRules:false,
				hasWeek:false,
				canWeek:false
			}
		},
		mounted(){
			document.title="竞拍房源";
			if(this.$route.params.tab){
				this.type=this.$route.params.tab
			}
			this.getBaoZhouStatus();
			this.getHouse();
			// this.getImgCode();
			this.getUser();
			// 全局绑定滚动事件，
			window.addEventListener("scroll", this.scrollT);
		},
		beforeDestroy() {
			// 组件消失，解绑scroll事件
			window.removeEventListener("scroll", this.scrollT);
		},
		components:{
			Search,
			Foot
		},
		watch:{
			scrollTop(newValue, oldValue) {//滚动分页
				var height = document.getElementsByClassName('earnAll')[0].scrollHeight;
				let sTop = document.documentElement && document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop;//滚动的高度
				let clientHeight=window.screen.height;//屏幕的高度
				if(this.count>this.pSize){
					if(sTop>0){
						if(height-100<sTop+clientHeight&&this.load){
							  // console.log('监听成功','到达底部')
							if(this.pSize<this.count){
								this.pSize=Number(this.pSize)+10; 
							}
							setTimeout(()=>{
								this.loadOver=true
							},1000)
						 }
					 }
				}else{
					setTimeout(()=>{
						this.loadOver=true
					},1000)
				}
			},
			houseType(){
				if(this.houseType=='h'){
					this.getHouse();
				}else{
					this.getSchool()
				}
			},
			type(){
				this.on=-1;
				this.maxNum=0;
				if(this.pType=='1'){
					this.mainNum=50;
				}
			},
			adsNo(){
				if(!this.adsNo){
					this.getHouse();
				}
			},
			nowNum(){
				if(this.hasWeek){
					if(this.pType=='0'){
						if(this.nowNum==this.maxNum){
							this.mainNum=this.maxNum;
							this.isMax=true;
						}else{
							this.isMax=false;
							if(this.nowNum>0){
								this.mainNum=Number(this.nowNum)+50
							}else{
								this.mainNum=100
							}
						}
					}
				}else{
					if(this.pType=='0'){
						if(this.nowNum==this.maxNum){
							this.mainNum=this.maxNum;
							this.isMax=true;
						}else{
							this.isMax=false;
							if(this.nowNum>0){
								this.mainNum=Number(this.nowNum)+5
							}else{
								this.mainNum=50
							}
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
					if(this.hasWeek){
						this.mainNum=100;
					}else{
						this.mainNum=50;
					}
				}
			},
			pType(){
				if(this.pType=='0'){
					if(this.nowNum==this.maxNum&&this.maxNum>0){//&&this.maxNum>0
						this.mainNum=this.maxNum
						this.isMax=true;
					}else{
						this.isMax=false;
						if(this.nowNum>0){
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
			schoolSize(){
				this.getSchool()
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
			weekTip(){
				Toast("每周四上午10点准时开抢");
			},
			scrollT(){
				this.scrollTop = window.scrollY;
			},
			minus(){
				if(this.hasWeek){
					if(this.mainNum<=100){
						Toast("100个不能再少了哦~");
					}else if((this.mainNum<=Number(this.nowNum)+50)&&this.pType=='0'){
						Toast("当前广告位出价不能少于"+this.nowNum);
					}else{
						this.mainNum -=50;
					}
				}else{
					if(this.mainNum<=50){
						Toast("50个不能再少了哦~");
					}else if((this.mainNum<=Number(this.nowNum)+5)&&this.pType=='0'){
						Toast("当前广告位出价不能少于"+this.nowNum);
					}else{
						this.mainNum -=5;
					}
				}
			},			
			add(){
				if(this.hasWeek){
					this.mainNum +=50;
				}else{
					if(Number(this.mainNum)>=Number(this.maxNum)){
						Toast("您已出到最大值！");
						this.mainNum=this.maxNum;
					}else{
						this.mainNum +=5;
					}
				}
			},
			getBaoZhouStatus(){
				return new Promise((resolve)=>{
						this.$axios({
							method:"get",
							url:"/AdPosition/GetCanBaoZhouStatus",
							headers:this.header_token
						})
						.then(res=>{
							console.log(res);
							resolve(res);
							this.canWeek=res.data.data;
						})
				})
			},
			getUser(){
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
								this.jjrNum=res.data.data.EmpNo;
							}else{
								Toast(res.data.msg);
								if(res.data.code==500){
									localStorage.removeItem("userInfo");
									this.$router.push({name:"login"});
								}
							}
						})
						.catch(error=>{
							Indicator.close();
							Toast("网络错误，请稍后再试");
						})
				})
			},
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
					this.codeSrc='data:image/jpg;base64,'+res.data.data.replace(/=+$/,'');
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
			getChild(v,idx){
				if(v!=undefined){
					this.childMsg[0]=v;
					this.maxNum=v.MaxYuanBao;
					this.adId=v.AdPositionId;
				}
				if(idx!=undefined){
					this.on=idx;
				}
				this.$set(this.childMsg[0],'on',idx);
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
							    "AdPositionId": this.adId,
								"PropId":this.sHouse.PropId,
								"AdPlace": adplace,
								"AdTimeType":this.hasWeek?'2':'1'
							}
						})
						.then(res=>{
							console.log(res);
							if(res.data.code==0){
								this.currentNum=res.data.data.count;
								this.isWeek=res.data.data.weekCoplete;
								if(res.data.data.currentYuanBao>0){
									this.nowNum=res.data.data.currentYuanBao;
									if(this.nowNum==this.maxNum){
										this.mainNum=this.maxNum;
									}else{
										if(this.hasWeek){
											this.mainNum=this.nowNum+50;
										}else{
											this.mainNum=this.nowNum+5;
										}
									}
								}else{
									this.nowNum=0;
									if(this.hasWeek){
										this.mainNum=100
									}else{
										this.mainNum=50;
									}
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
			payC(house,t,isMe,week){
				console.log(week)
				if(week){
					this.hasWeek=true;
					this.type=4;
					this.pName=house.EstateName;
				}else{
					this.hasWeek=false;
					this.type=1;
				}
				this.empNo=house.StaffNo;
				this.isSelf=isMe;
				this.pType=t;
				this.showModel=true;
				this.sHouse=house;
				this.houseId=house.RegionId;
				this.areaName=house.EstateName;
				this.getGlist();
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
							    "RegionName":this.pName,
								"AdTimeType":this.hasWeek?'2':'1'
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
				if(this.type==5){
					this.setCarSchool();
					return;
				}
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
				this.load=false;
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
								this.ready=true;
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
							this.load=true;
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
				var adplace="";
				var EstateName=this.sHouse.EstateName;
				if(this.type=="4"){
					adplace=this.sHouse.EstateCode
				}else if(this.type=="3"){
					adplace=this.sHouse.RegionId
				}
				return new Promise((resolve)=>{
						this.$axios({
							method:"post",
							url:this.isSelf?"/AdPosition/AuctionNew":'/AdPosition/AuctionNewTest',
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
								    "EstateName": EstateName,
									"VerifyCode":this.pCode,
									"empNo":this.empNo||'',
									"AdTimeType":this.hasWeek?'2':'1'
							}
						})
						.then(res=>{
							resolve(res);
							if(res.data.code==0){
								if(res.data.data.IsSuccess){
									this.showCode=false;
									Toast("出价成功,您将有机会竞得该位置~");
								}else{
									Toast(res.data.data.Reamark);
									this.getImgCode();
								}
								this.getChild();
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
								if(res.data.data.ZyHouseOutputDto){
									this.house=[res.data.data];
									this.count=1;
								}else{
									Toast("未找到该房源编码对应房源");
								}
								console.log(this.house)
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
			},
			shareHouse(id,num){
				if(this.houseType=='h'){
					this.$router.push({name:'hh',query:{adsNo:id,empNo:num}})
				}else{
					this.$router.push({name:'school',query:{schoolId:id,empNo:num}})
				}
			},
		}
	}
</script>

<style>
	.ohide{height: 100vh;overflow: hidden;}
	.house{background-color: #F5F5F5;min-height: 100vh;padding-bottom: 0;}
	.earnAll{padding: 0 0.34rem;}
	.earnAll .jjrSection{margin: 0.3rem 0;}
	.jjrL{padding: 0.3rem 0.2rem;background-color: #fff;margin-bottom: 0.3rem;box-shadow: 0px 2px 6px 2px rgba(0, 0, 0, 0.06);border-radius: 0.1rem;}
	.jrl{width: 2.4rem;float: left;margin-right: 0.2rem;max-height: 1.8rem;overflow: hidden;}
	.jrr{float: left;width: 3.82rem;}
	.schoolList .jrl{width: 2.2rem;height: 1.6rem;}
	.schoolList .jrl img{height: 100%;width: auto;}
	.schoolList .jrr{width: 4.02rem;}
	.schoolList .jrr h4{white-space: normal;}
	.jrr h4{
		    font-weight: bolder;
		    color: #203140;
		    font-size: 0.3rem;
			margin-bottom: 0.1rem;
			
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 2;
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
	.jrbtn{text-align: left;}
	.jrbtn button{
		padding: 0;
		text-align: center;
		margin-top: 0.2rem;
		margin-right: 0.3rem;
		margin-bottom: 2px;
		width:1rem;
		height:0.52rem;
		line-height: 0.48rem;
		background: none;
		border-radius:0.4rem;
		font-size: 0.28rem;
		border: 0;
		border: 1px solid #F53A1F;
		color: #F53A1F;
	}
	.jrbtn button:nth-of-type(2){color: #F5A01F;border-color: #F5A01F;}
	.jrbtn button:last-child{margin-right: 0;color: #1562E7;border-color: #1562E7;}
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
	.week .bj{position: fixed;background: #000;opacity: 0.5;width: 100%;height: 100%;left: 0;top: 0;z-index: 91;}
	.showMD .bj{display: none;}
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
	.houseT .mint-searchbar-inner .mintui-search{position: relative;top: 1px !important;font-size: 0.4rem !important;margin-right: 0.15rem;}
	.house .mint-search{height: 1rem;}
	.house .mint-searchbar{background: none !important;}
	.house .mint-searchbar-inner{border: 1px solid #ddd;height: 0.76rem;padding: 0.1rem 0.2rem;}
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
	.childList{height: 1.75rem;overflow-y: auto;padding-top: 1px;}
	.payNum{margin-top: 0.3rem;padding-bottom: 0.2rem;border-bottom: 1px solid #ededed;height: 1rem;}
	.bTip{font-size: 0.24rem;color: #999;}
	.bTip p{margin-bottom: 0.1rem;}
	.bTip p span{color: #E60012;}
	.showBtn{width: 100%;height: 1rem;line-height: 1rem;background: linear-gradient(134deg, #FB6F52 0%, #F3240A 100%);color: #fff;font-size: 0.32rem;text-align: center;position: fixed;bottom: -15rem;left: 0;z-index: 93;transition: all 0.5s ease-in-out;}
	.animationMsg .showBtn{bottom: 0;}
	.childList li{margin-bottom: 0.2rem;}
	.childList li:nth-of-type(4n){margin-right: 0;}
	.fixedRight{position: fixed;right: 0;bottom: 15%;z-index: 81;}
	.fixedRight label{display: block;margin-bottom: 0.4rem;width: 1rem;height: 1rem;padding: 0.3rem 0;font-weight: 550;text-align: center;border-radius: 50%;background-color: #F53A1F;color: #fff;}
	.fixedRight label:last-child{padding: 0.11rem 0.2rem;background-color: #F5A01F;}
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
		
		.hlFoot{width: 7.5rem;height: 1.28rem;position: fixed;left: 50%;margin-left: -3.75rem;bottom: 0;background-color: #fff;box-shadow: 0px -2px 10px 1px rgba(102, 102, 102, 0.5);display: flex;padding: 0.25rem 0;}
		.hlFoot div{flex: 1;text-align: center;font-size: 0.32rem;color: #666;font-weight: 600;line-height: 0.78rem;}
		.hlFoot div:first-child{border-right: 1px solid #ddd;}
		.hlFoot div img{vertical-align: -4px;width: 0.4rem;margin-right: 0.1rem;}
		.hlFoot div.active{color: #F53A1F;}
		
		.houseList .hbTab{text-align: center;padding: 0.4rem 0 0;font-size: 0.32rem;color: #333;position: fixed;bottom: 0;left: 0;width: 100%;z-index: 7;}
		.houseList .hbTab a{display: inline-block;background-color: #fff;box-shadow: 0 0 2px #ccc;}
		.houseList .hbTab label{display: inline-block;width: 3.65rem;height: 1rem;margin: 0 0.2rem 0 0;line-height: 1rem;color: #333;font-weight: 600;}
		.houseList .hbTab label:last-child{margin: 0;}
		.houseList .hbTab label.on{background: linear-gradient(134deg, #FB6F52 0%, #F3240A 100%);color: #fff;}
		.newHouse button.hbShare{margin-top: 0.2rem;}
		.jrr span{margin-left: 0;color: #fff;background-color: #50bcec;}
		.jrr h4 strong{display: inline-block;width: 2.3rem;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}
		.jrr h4 i{font-style: normal;font-weight: 500;color: #f53218;position: absolute;right: 0;top: 0.04rem;font-size: 0.28rem;}
		.aMsg .jrr h4{white-space: nowrap;display: block;}
		.hSearch{background-color: #fff;padding: 0.16rem 0 0.16rem 0.2rem;position: fixed;top: 0;left: 0;z-index: 7;}
		.hSearch .mintui-search{position: absolute;width: 0.3rem;top: 0.36rem;left: 0.35rem;color: #999;font-size: 0.36rem;}
		.hSearch input{width: 6.2rem;height: 0.76rem;border: 1px solid #ddd;padding-left: 0.56rem;padding-right: 0.6rem;line-height: 0.7rem;font-size: 0.28rem;border-radius: 0.06rem;}
		.hSearch button{width: 1.1rem;height: 0.76rem;text-align: center;font-size: 0.32rem;}
		.hSearch .iclear{width: 0.3rem;height: 0.3rem;position: absolute;right: 1.4rem;top: 0.4rem;display: inline-block;background: #999 url(../assets/img/nClose.png) center no-repeat;background-size: 0.14rem;border-radius: 50%;}
		.searchResult{width: 100%;top: 1rem;left: 0;position: absolute;padding: 0.2rem;background-color: #fff;z-index: 7;max-height: 10rem;overflow-y: auto;}	
		.searchResult li{display: flex;padding: 0.3rem 0.2rem;justify-content: space-between;border-bottom: 1px solid #ededed;}
		.searchResult li label{font-weight: 550;color: #333;width: 74%;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;}
		.searchResult li span:last-child{color: #666;width: 26%;text-align: right;}
		.searchResult li span i{font-style: normal;color: #F3240A;}
		.newHouse button.hbShare{margin-top: 0.2rem;}
		.jrr p.newTag{font-size: 0.24rem;margin-top: 0.1rem;}
		p.newAdr{margin-top: 0.1rem;font-size: 0.22rem;}
		.newTag span,.newTag label{padding: 2px 0.1rem;background-color: #ededed;color: #999;margin-left: 0.06rem;border-radius: 0.1rem;}
		.newHouse .hbhBtn{text-align: right;}
		.noList{color: #ccc;font-size: 0.26rem;text-align: center;margin-top: 0.8rem;}
		.noList span{display: inline-block;height: 1px;width: 2rem;background-color: #eee;position: relative;top: -3px;}

		.week .noList,.week .none {
			color: #ddd;
		}
		.week .noList span{background-color: #ddd;}
		.week .mint-searchbar-cancel{
			color: #fff !important;
		}
		.week .mint-indicator-wrapper{
			z-index: 99;
		}
		.week .jrr p{position: relative;}
		.week .mint-button::after{background: none;}
		.week .mint-searchbar-inner{border-radius: 0.12rem;}
		.week .mint-searchbar-inner .mintui-search{color: #666;}
		.week .jrbtn button{line-height: 1;margin-right: 0.24rem;}
		.week .jrbtn button:first-child{color: #6089D9;border-color: #6089D9;}
		.week .jrbtn button:last-child{margin-right: 0;color: #fff;background: linear-gradient(134deg, #FB6F52 0%, #F3240A 100%);border: 0;}
		.week .mint-searchbar{padding: 0.16rem 0.34rem;}
		.week .mint-loadmore-text{color: #f5f5f5;}
</style>
<style scoped>
	.week{background-color: #D13135;}
	.hBan{height: 4.58rem;width: 100%;background: url(../assets/static/weekT.png) center no-repeat;background-size: 100%;position: relative;}
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
		animation: big 1s ease infinite;
	}
	@keyframes big{
		0%{transform: scale(1);}
		100%{transform: scale(0.8);}
	}
	.goT{width: 100%;height: 2rem;}
	.weekRules{position: absolute;right: 0.2rem;top: 0;display: block;width: 0.58rem;height: 0.67rem;background: url(../assets/static/weekSm.png) center no-repeat;background-size: 0.58rem;}
	.showMD_msg{
		background: url(../assets/static/weekRules.png) center no-repeat;
		background-size: 100%;
		position: fixed;
		left: 0.45rem;
		top: -14rem;
		width: 6.6rem;
		height: 7.54rem;
		z-index: 92;
		padding: 0.6rem 0.3rem 1.2rem;
		transition: all 0.5s ease-in-out;
	}
	.animationRule .showMD_msg{
		top: 16%;
	}
	.animationRule .bj{display: block;}
	.close{position: absolute;bottom: -1.6rem;left: 3rem;background: url(../assets/static/rClose.png) center no-repeat;background-size: 0.54rem;display: block;width: 0.54rem;height: 1.59rem;}
	.weekTip{width: 6.56rem;height: 6.11rem;background: url(../assets/static/weekTip.png) center no-repeat;background-size: 100%;position: fixed;left: 0.45rem;top: 25%;transform: scale(0) translate3d(0,0,100px);opacity: 0;transition: all 0.5s ease;padding-top: 4.6rem;}
	.weekTip button{width: 3.88rem;height: 0.84rem;font-size: 0.32rem;margin: 0 auto;display: block;background: linear-gradient(180deg, #F4977E 0%, #F35840 100%);border-radius: 0.4rem;color: #fff;}
	.weekTip button:active{background: #F35840;}
	.showWeekTip{top: 25%;z-index: 99998;opacity: 1;transform: scale(1) translate3d(0,0,0);}
	
	.animateWeek{
		position: absolute;
		bottom: 0;
		right: 0.1rem;
		width: 1.5rem !important;
		height: 0.8rem !important;
		/* animation: rubberBand 1s 2s infinite; */
		background: url(../assets/static/bz.gif) center no-repeat !important;
		background-size: 100% !important;
	}
	@keyframes rubberBand {
	  0% {
	    -webkit-transform: scale3d(1, 1, 1);
	    transform: scale3d(1, 1, 1);
	    opacity: 1;
	  }
	
	  30% {
	    -webkit-transform: scale3d(1.25, 0.75, 1);
	    transform: scale3d(1.25, 0.75, 1);
	  }
	
	  40% {
	    -webkit-transform: scale3d(0.75, 1.25, 1);
	    transform: scale3d(0.75, 1.25, 1);
	  }
	
	  50% {
	    -webkit-transform: scale3d(1.15, 0.85, 1);
	    transform: scale3d(1.15, 0.85, 1);
	  }
	
	  65% {
	    -webkit-transform: scale3d(.95, 1.05, 1);
	    transform: scale3d(.95, 1.05, 1);
	  }
	
	  70% {
	    -webkit-transform: scale3d(1, 1, 1);
	    transform: scale3d(1, 1, 1);
	    opacity: 1;
	  }
	
	  100% {
	    -webkit-transform: scale3d(1, 1, 1);
	    transform: scale3d(1, 1, 1);
	    opacity: 1;
	  }
	}
</style>
