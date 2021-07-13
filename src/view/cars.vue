<template>
	<div class="car">
		<nut-noticebar
			:leftIcon="imgSrc"
		     text="竞拍前请确认房源是否有效，一旦成功扣费概不退还。成功竞拍的房源将于第二天在中原找房进行展示。"
		    ></nut-noticebar>
		<mt-loadmore :top-method="loadTop" ref="loadmore">
			<div class="carts">
					<div v-if="car.length>0">
					  <div class="clear newList" :class="item.AdPositionCompetePre.Status=='2'?'old':''" v-for="item in car">
							  <mt-cell-swipe
									:right="[
										  {
											  content: '删除',
											  handler: () => deleteSection(item.AdPositionCompetePre.Id)
										  }
									  ]"
								   >
										<img src="../assets/img/older1.png" class="nlT" style="width: 1rem;" v-if="item.AdPositionCompetePre.Status=='2'"/>
										<template v-else>
											<img src="../assets/img/car-sy.png" class="nlT" v-if="item.AdPositionCompetePre.AdType=='1'"/>
											<img src="../assets/img/car-jjr.png" class="nlT" v-else-if="item.AdPositionCompetePre.AdType=='2'"/>
											<img src="../assets/img/car-qy.png" class="nlT" v-else-if="item.AdPositionCompetePre.AdType=='3'"/>
											<img src="../assets/img/car-xq.png" class="nlT" v-else-if="item.AdPositionCompetePre.AdType=='4'"/>
											<img src="../assets/img/car-xx.png" class="nlT" v-else-if="item.AdPositionCompetePre.AdType=='5'"/>
										</template>
										<div class="newM">
											<h4 v-if="item.AdPositionCompetePre.AdType=='1'">首页{{item.AdPositionCompetePre.AdName}}</h4>
											<h4 v-else-if="item.AdPositionCompetePre.AdType=='2'">经纪人{{item.AdPositionCompetePre.AdName}}</h4>
											<h4 v-else-if="item.AdPositionCompetePre.AdType=='3'">区域{{item.AdPositionCompetePre.AdName}}</h4>
											<h4 v-else-if="item.AdPositionCompetePre.AdType=='4'">小区{{item.AdPositionCompetePre.AdName}}</h4>
											<h4 v-else-if="item.AdPositionCompetePre.AdType=='5'">学校广告位</h4>
											<!-- <p>展示时间：{{item.AdPositionCompetePre.BeginShowTime}}</p> -->
											<p>{{item.AdPositionCompetePre.EstateName}}</p>
											<template v-if="item.AdPositionCompetePre.AdType<5">
											<p>{{item.AdPositionCompetePre.RoomCount}}室{{item.AdPositionCompetePre.HallCount}}厅·{{item.AdPositionCompetePre.Garea}}㎡</p>
											</template>
											<template v-else>
												<p style="font-size: 0.22rem;">{{item.AdPositionCompetePre.AdName}} | 附近{{item.AdPositionCompetePre.RoomCount}}个小区 | {{item.AdPositionCompetePre.HallCount}}套在售 </p>
											</template>
										</div>
											<mt-button type="primary" class="nlBtn" @click="showC(item.AdPositionCompetePre.Id,item.AdPositionCompetePre)" v-if="item.IsAuctionBtnClick">竞拍</mt-button>
											<mt-button type="primary"style="border-color: #b3b1b1;color: #b3b1b1;" class="nlBtn" v-else>竞拍</mt-button>
											<label class="carNum">{{item.AdPositionCompetePre.BuyYuanBao}}元宝</label>
							</mt-cell-swipe>
					  </div>
				     <p class="noList" style="color: #ccc;" @click="pSize+=10" v-if="count>pSize"><span></span>&nbsp;点击查看更多&nbsp;<span></span></p>
					<p class="noList" v-if="count<=pSize&&loadOver"><span></span>&nbsp;我是有底线的&nbsp;<span></span></p>
					</div>
					<div class="none" v-else-if="car.length<1&&load">
						<p>您尚未添加广告位，赶紧添加吧~</p>
						<mt-button type="primary" class="go" @click="$router.push({name:'houseList'})">去收藏<img src="../assets/img/icon-dr.png"/></mt-button>
					</div>
			</div>
		</mt-loadmore>	 
				<div class="showModel modelMsg" v-if="suc">
				  <div class="bj"></div>
				  <div class="showMsg">
				    <label class="modelClose" @click="suc=false"></label>
					<h3>提交成功</h3>
					<p>竞拍结果将于明天8点前揭晓！</p>
					<mt-button type="primary" class="carBtn" @click="$router.push({name:'record'})">查看竞拍记录</mt-button>
				  </div>
				</div>
				
				<div class="showModel codeMsg" v-if="showCode">
				  <div class="bj"></div>
				  <div class="showMsg">
				    <label class="modelClose" @click="showCode=false"></label>
					<h3>请输入验证码</h3>
					<p class="inCode clear"><input type="text" placeholder="请输入图片中验证码" v-model="pCode"/><span @click="getImgCode()"><img :src="codeSrc"/></span></p>
							<p class="codeTip">提示：图片有效期一分钟,点击图片会更新</p>
					<mt-button type="primary" class="houseBtn" @click="payNum">确定</mt-button>
				  </div>
				</div>
				<div class="carRight">
					<label @click="$router.push({name:'houseList'})">
						竞拍房源
					</label>
					<label @click="$router.push({name:'houseListSchool'})">
						竞拍学校
					</label>
				</div>
				<foot tab2='1'></foot>
	</div>
</template>

<script>
	import Foot from '@/components/foot.vue'
	import Vue from 'vue';
	import {
	  uToken,
	} from "@/global/token.js";
	import { Toast,Indicator } from 'mint-ui';
	import NoticeBar from '@nutui/nutui/dist/packages/noticebar/noticebar.js';  // 加载构建后的JS
	import '@nutui/nutui/dist/packages/noticebar/noticebar.css';  //加载构建后的CSS
	NoticeBar.install(Vue);
	export default{
		name: 'cars',
		data(){
			return{
				header_token:{"token": uToken()},
				imgSrc:require("../assets/img/icon-lb.png"),
				pSize:10,
				car:[],
				count:"",
				suc:false,
				showCode:false,
				codeSrc:"",
				pCode:"",
				listId:"",
				nowNum:0,
				loadOver:false,
				load:false,
				empNo:"",
				isWeek:false,
				num:Math.random(),
				allLoaded:false
			}
		},
		mounted(){
			document.title="收藏夹";
			Indicator.open();
			this.getCars();
			// this.getImgCode();
		},
		components:{
			Foot
		},
		watch:{
			pSize(){
				this.getCars()
			},
			showCode(){
				if(this.showCode==false){
					this.pCode=""
				}
			},
			mainNum(){
				console.log(this.mainNum>this.maxNum);
				if(Number(this.mainNum)>Number(this.maxNum)){
					Toast("该广告位封顶价为"+this.maxNum);
					return this.mainNum=this.maxNum;
				}
				else if(Number(this.mainNum)<=Number(this.nowNum)){
					Toast("当前广告位出价不能少于"+this.nowNum);
					return this.mainNum=Number(this.nowNum)+5;
				}
			},
		},
		methods: {
			loadTop(){
				this.pSize=10;
				this.getCars();
			},
			getDayOrWeek(v){
				console.log(this.header_token)
				return new Promise((resolve)=>{
						this.$axios({
							method:"get",
							url:"/AdPosition/GetCurrentAdData",
							headers:this.header_token,
							params:{
								"AdType": v.AdType,
							    "AdPositionId": v.AdPositionId,
								"PropId":v.PropId,
								"AdPlace": v.AdPlace
							}
						})
						.then(res=>{
							console.log(res);
							if(res.data.code==0){
								this.isWeek=res.data.data.weekCoplete;
								if(!this.isWeek){
									this.getImgCode();
									this.showCode=true;
								}else{
									Toast("该房源广告位已参与包周活动，请选择其他广告位");
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
			// getCurrentAdData(v){
			// 	return new Promise((resolve)=>{
			// 			this.$axios({
			// 				method:"get",
			// 				url:"/AdPosition/GetCurrentAdData",
			// 				headers:this.header_token,
			// 				params:{
			// 					"AdType": v.AdType,
			// 				    "AdPositionId": v.AdPositionId,
			// 					"PropId":v.PropId,
			// 					"AdPlace": v.AdPlace
			// 				}
			// 			})
			// 			.then(res=>{
			// 				console.log(res);
			// 				if(res.data.code==0){
			// 					this.nowNum=res.data.data.currentYuanBao;
			// 					console.log(v.BuyYuanBao)
			// 					console.log(res.data.data.currentYuanBao)
			// 					if(v.BuyYuanBao<=res.data.data.currentYuanBao){
			// 						Toast("出价少于目前的最高价哦");
			// 					}else{
			//						this.showCode=true;
			// 						this.getImgCode();
			// 					}
			// 				}else{
			// 					Toast(res.data.msg);
			// 				}
			// 				Indicator.close();
			// 			})
			// 			.catch(error=>{
			// 				Indicator.close();
			// 				Toast("网络错误，请稍后再试");
			// 			})
			// 	})
			// },
			showC(id,v){
				// Indicator.open({
				//   spinnerType: 'triple-bounce'
				// });
				// this.getCurrentAdData(v);
				this.pCode="";
				this.listId=id;
				this.getDayOrWeek(v);
				// this.getImgCode();
				// this.showCode=true;
			},
			getImgCode(){
				let n=Math.random();
				this.codeSrc="https://sz.centanet.com/partner/jifenverifycode/Home/GetVerifyCode?token="+uToken()+"&n="+n;
				// this.$axios({
				// 	method:"get",
				// 	// url:"/My/GetVerifyCodeBase64",
				// 	url:"https://sz.centanet.com/partner/jifenverifycode/Home/GetVerifyCode",
				// 	params:{
				// 		token:this.header_token
				// 	}
				// 	// headers:this.header_token,
				// })
				// .then(res=>{
				// 	console.log(res);
				// 	// this.codeSrc='data:image/jpg;base64,'+res.data.data.replace(/=+$/,'');
				// 	// this.codeSrc=res.data;
				// })
				// .catch(error=>{
				// 	Toast("图片获取失败");
				// })
			},
			payNum(){
			  return new Promise((resolve)=>{
					this.$axios({
						method:"get",
						url:"/AdPosition/AuctionNewPre",
						headers:this.header_token,
						params:{
							id:this.listId,
							verifyCode:this.pCode
						}
					})
					.then(res=>{
						console.log(res);
						if(res.data.code==0){
							if(res.data.data.IsSuccess){
								this.showCode=false;
								this.suc=true;
								// Toast("出价成功,您将有机会竞得该位置~");
							}else{
								Toast(res.data.data.Reamark);
								this.getImgCode();
							}
						}else{
							Toast(res.data.msg);
						}
					})
					.catch(error=>{
						Indicator.close();
						Toast("网络错误，请稍后再试");
					})
			  })
			},
		      deleteSection(id) {
				  console.log(id);
				return new Promise((resolve)=>{
						this.$axios({
							method:"get",
							url:"/AdPosition/DelAdPre",
							headers:this.header_token,
							params:{
								id:id
							}
						})
						.then(res=>{
							console.log(res);
							if(res.data.code==0){
								Toast("删除成功~");
								this.getCars();
							}else{
												
							}
						})
						.catch(error=>{
							Indicator.close();
							Toast("网络错误，请稍后再试");
						})
				})
		      },
			  getCars(){
				  this.load=false;
				  return new Promise((resolve)=>{
				  		this.$axios({
				  			method:"get",
				  			url:"/AdPosition/GetMyAdPreItems",
				  			headers:this.header_token,
				  			params:{
				  				pageIndex:1,
				  				pageSize:this.pSize
				  			}
				  		})
				  		.then(res=>{
				  			console.log(res);
				  			if(res.data.code==0){
								this.count=res.data.data.count;
								this.car=res.data.data.list;
								this.load=true;
								setTimeout(()=>{
									this.loadOver=true;
								},1000)
								
				  			}else{
									Toast(res.data.msg);
				  			}
								Indicator.close();
									setTimeout(()=>{
										this.$refs.loadmore.onTopLoaded();
									},500)
								})
				  		.catch(error=>{
								setTimeout(()=>{
									this.$refs.loadmore.onTopLoaded();
								},500)
				  			Indicator.close();
				  			Toast("网络错误，请稍后再试");
				  		})
				  })
			  }
		}
	}
</script>

<style>
	.car{background: #F5F5F5;min-height: 100vh;padding-bottom: 1.4rem;}
	.carts{padding: 0 0.32rem 0;min-height: calc(100vh - 2.4rem);}
	.nlT{width: 0.7rem;float: left;/* margin-top: 0.1rem; */}
	.car .newList{padding: 0;background-color: #fff;position: relative;box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.1);border-radius: 0.1rem;margin-bottom: 0.3rem;height: 1.78rem;}
	.car .old{background-color: #f5f5f5;}
	.newM{width: 5.4rem;float: left;margin-left: 0.3rem;}
	.newM h4{font-size: 0.32rem;color: #333;margin-bottom: 0.1rem;font-weight: 500;}
	.newM h4 span,.newM p span{position: relative;top: -2px;font-weight: 400;font-size: 0.24rem; display: inline-block;width: 0.86rem;height: 0.38rem;padding-left: 0.42rem;background: url(../assets/img/icon-syb.png) left center no-repeat;background-size: 0.38rem;margin-left: 0.14rem;color: #F3260C;}
	.tabFl h4 span{float: right;margin-right: 0.2rem;margin-top: 0.1rem;}
	.newM p span{margin-left: 0;top: 0;}
	.newM p{font-size: 0.24rem;color: #999;margin-bottom: 0.1rem;}
	.newM label{background-color: #EEEEEE;padding: 2px 5px;font-size: 0.24rem;color: #666;border-radius: 2px;}
	.carts .newM p{line-height: 1.2;width: 3.6rem;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;}
	.car .nlBtn{
		position: absolute;
		bottom: 0.3rem;
		right: 0.3rem;
		width:1.2rem;
		height:0.6rem;
		line-height: 0.56rem;
		background: none;
		border-radius:0.4rem;
		font-size: 0.28rem;
		padding: 0;
		color: #F53A1F;
		border: 1px solid #F53A1F;
	}
	.nlBtn img{width: 0.26rem;vertical-align: -2px;margin-left: 3px;}
	.nlBtns{
		background:#FFBE00;
	}
	.mint-cell-wrapper{padding: 0.3rem 0.4rem;}
	.mint-cell-swipe-button{line-height: 1.78rem;background: linear-gradient(134deg, #FB6F52 0%, #F3240A 100%);color: #fff;}
	.carNum{
		position: absolute;
		top: 0.3rem;
		right: 0.4rem;
		font-size: 0.3rem;
		color: #E60012;
		font-weight: bold;
	}
	.nut-noticebar{background: none !important;color: #999 !important;height: 1rem;}
	.none{width: 100%;height: 6.4rem;margin: 0.8rem auto 0;padding-top: 4.3rem;text-align: center;font-size: 0.28rem;color: #666; background: url(../assets/img/none.png) center top no-repeat;background-size: 4rem;}
	.go{
		width: 1.6rem;
		height: 0.6rem;
		line-height: 0.6rem;
		background: linear-gradient(134deg, #FB6F52 0%, #F3240A 100%);
		border-radius: 0.4rem;
		font-size: 0.28rem;
		padding: 0;
		margin-top: 0.4rem;
	}
	.go img{width: 0.26rem;vertical-align: -2px;margin-left: 3px;}
	.showModel{
	  position: fixed;
	  width: 100%;
	  height: 100%;
	  z-index: 90;
	}
	.bj{position: fixed;background: #000;opacity: 0.5;width: 100%;height: 100%;left: 0;top: 0;z-index: 91;}
	.car .showMsg{text-align: center;font-size: 16px; position: fixed;left: 50%;top: 50%;transform: translate(-50%,-50%);width: 5.8rem;height: 3.7rem; background: #fff;z-index: 92;padding: 0.6rem 0.7rem;border-radius: 8px;}
	.car .showMsg h3{font-size: 0.32rem;font-weight: 500;}
	.car .showMsg p{font-size: 0.3rem;color: #666;margin-top: 0.3rem;}
	.carBtn{width: 2.8rem;height: 0.8rem;margin: 0.5rem auto 0;display: block;
background: linear-gradient(134deg, #FB6F52 0%, #F3240A 100%);border-radius: 3px;font-size: 0.32rem;}
	.modelClose{position: absolute;right: 0rem;top: 0rem;cursor: pointer;width: 0.8rem;height: 0.8rem;display: block;background: url(../assets/img/close.png) center no-repeat;background-size: 0.27rem;}


	.codeMsg .bj{position: fixed;background: #000;opacity: 0.5;width: 100%;height: 100%;left: 0;top: 0;z-index: 101;}
	.codeMsg .showMsg{text-align: center;font-size: 16px; position: fixed;left: 50%;top: 50%;transform: translate(-50%,-50%);width: 5.8rem;height: 4.5rem; background: #fff;z-index: 102;padding: 0.6rem 0.7rem;border-radius: 8px;}
		.codeMsg .showMsg h3{font-size: 0.32rem;font-weight: 500;}
		.codeMsg .showMsg p{font-size: 0.3rem;color: #666;margin-top: 0.3rem;}
		.houseBtn{width: 2.8rem;height: 0.8rem;margin: 0.5rem auto 0;display: block;
	background: linear-gradient(134deg, #FB6F52 0%, #F3240A 100%);border-radius: 3px;font-size: 0.32rem;}
		.modelClose{position: absolute;right: 0rem;top: 0rem;cursor: pointer;width: 0.8rem;height: 0.8rem;display: block;background: url(../assets/img/close.png) center no-repeat;background-size: 0.27rem;}
		.inCode input{height: 0.7rem;width: 2.5rem;border: 1px solid #ddd;float: left;padding-left: 0.1rem;font-size: 0.26rem;}
		.inCode img{width: 1.6rem;height: 0.7rem;float: right;}
		.showMsg p.codeTip{font-size: 0.22rem;color: #999;text-align: left;}
		.old,.old .mint-cell{background-color: #f5f5f5;}
		.car .mint-cell{height: 100%;}
		.old .carNum{color: #999;}
		
		.carRight{position: fixed;right: 0;bottom: 15%;z-index: 81;}
		.carRight label{display: block;margin-bottom: 0.4rem;width: 1rem;height: 1rem;padding: 0.11rem 0.2rem;font-weight: 550;text-align: center;border-radius: 50%;background-color: #F53A1F;color: #fff;}
		.carRight label:last-child{background-color: #F5A01F;}
		
		.noList{color: #ccc;font-size: 0.26rem;text-align: center;margin-top: 0.8rem;}
		.noList span{display: inline-block;height: 1px;width: 2rem;background-color: #eee;position: relative;top: -3px;}
</style>
