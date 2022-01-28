<template>
	<div class="custom">
		<div class="hbTab">
			<a>
				<label :class="cType==1?'on':''" @click="changeTag(1)">抢商机</label>
				<label :class="cType==2?'on':''" @click="changeTag(2)">我的商机</label>
			</a>
		</div>
		<div class="customC">
			<!-- 抢客户 -->
			<template v-if="cType==1">
				<template v-if="cList && cList.length">
					<div class="ccList" v-for="item in cList">
						<div class="ccTop">
							<label><img src="../assets/img/c-call.png" v-if="item.IsMobile==0"/><img src="../assets/img/c-phone.png" v-if="item.IsMobile==1"/>商机：{{item.CallerNumberDisplay}}</label>
							<span>{{item.ChannelType}}</span>
						</div>
						<div class="ccPrice">
							<div v-if="item.EstateRegion2&&item.EstateRegion2!='--'">
								<h4><template v-if="item.EstateRegion1&&item.Type==2">{{item.EstateRegion1}}-</template>{{item.EstateRegion2}}</h4>
								<p>区域</p>
							</div>
							<span v-if="item.HuXing&&item.EstateRegion2&&item.EstateRegion2!='--'"></span>
							<div v-if="item.HuXing">
								<h4>{{item.HuXing}}</h4>
								<p>户型</p>
							</div>
							<span v-if="item.MuDi"></span>
							<div v-if="item.MuDi">
								<h4>{{item.MuDi}}</h4>
								<p>购房目的</p>
							</div>
						</div>
						<div class="pli" v-if="item.EstateName&&item.EstateName!='--'">
							<label>楼盘名称：</label>
							<span><template v-if="item.EstateName=='定制找房'">{{item.SubSourceName}}</template><template v-else><a :href="item.LinkUrl" v-if="item.LinkUrl">{{item.EstateName}}</a><template v-else>{{item.EstateName}}</template></template></span>
						</div>
						<div class="pli" v-if="item.BuildingNo">
							<label>楼栋房号：</label>
							<span>{{item.BuildingNo}}</span>
						</div>
						<div class="pli" v-if="item.YuSuanJiaGe">
							<label>预算范围：</label>
							<span>{{item.YuSuanJiaGe}}</span>
						</div>
						<div class="pli" v-if="item.SalePrice>0">
							<label>委托售价：</label>
							<span>{{item.SalePrice}}万</span>
						</div>
						<div class="pli" v-if="item.RentPrice>0">
							<label>委托租价：</label>
							<span>{{item.RentPrice}}元/月</span>
						</div>
						<div class="pli" v-if="item.SourceName">
							<label>商机来源：</label>
							<span>{{item.SourceName}}<template v-if="item.SubSourceName">-{{item.SubSourceName}}</template></span>
						</div>
						<div class="pli" v-if="item.CalledMsg&&item.ChannelType!='经纪人'&&item.Type!=2">
							<label>呼叫信息：</label>
							<span>{{item.CalledMsg}}</span>
						</div>
						<div class="pli" v-if="item.CreateTime">
							<label>分发时间：</label>
							<span>{{item.CreateTime}}</span>
						</div>
						<div class="ccBtom">
							<label><strong>{{item.BuyYuanBaoRealNum}}</strong>元宝<a>原价:{{item.BuyYuanBaoNum}}元宝</a></label>
							<button @click="buy(item)">兑换商机</button>
						</div>
					</div>
					<p class="noList" v-if="count>pSize">正在加载</p>
					<p class="noList" v-else-if="count<=pSize&&loadOver"><span></span>&nbsp;我是有底线的&nbsp;<span></span></p>
				</template>
				<div v-else-if="cList.length==0&&ready" class="empty-shang-ji-wrap">
					<img class="empty-shang-ji" src="@/assets/img/empty-shang-ji-public.png" />
					<p>您来晚了，暂无商机信息</p>
				</div>
			</template>
			<!-- 我的客户 -->
			<template v-if="cType==2">
				<template v-if="myList && myList.length">
					<a :href="'tel:'+call" ref="cphone" style="display: none;" @click="setSc"></a>
<!-- 					<div class="c2Tip" @click="readImg" v-if="read==false">
						<div class="tBj"></div>
						<div class="tMsg"></div>
					</div> -->
					<div class="ccList ccMy" v-for="item in myList" :key="item.Id" :class="item.IsRelease==1?'overAll':''">
<!-- 						<div class="i-yhc" v-if="item.IsRelease==1">
							<label></label>
							<p class="yhc">该商机兑换后超半小时未进行电话反馈，已放入商机池进行重新分配</p>
						</div> -->
						<i class="cTag" v-if="item.IsNew"></i>
						<div class="ccTop">
							<template v-if="item.IsRelease!=1">
								<span style="background: #FF0000;" @click="change(item.MobileCompeteId)" v-if="item.CusLevel=='高意向'">{{item.CusLevel}}</span>
								<span style="background: #ff584c;" @click="change(item.MobileCompeteId)" v-else-if="item.CusLevel=='中意向'">{{item.CusLevel}}</span>
								<span style="background: #ccc;" @click="change(item.MobileCompeteId)" v-else-if="item.CusLevel=='低质量'">{{item.CusLevel}}</span>
								<span v-else>待反馈</span>
							</template>
							<label>商机：{{item.CallerNumberDisplay}}</label>
							<span class="cHouseTag">{{item.ChannelType}}</span>
						</div>
						<div class="ccPrice">
							<div v-if="item.EstateRegion2&&item.EstateRegion2!='--'">
								<h4>{{item.EstateRegion2}}</h4>
								<p>区域</p>
							</div>
							<span v-if="item.HuXing&&item.EstateRegion2&&item.EstateRegion2!='--'"></span>
							<div v-if="item.HuXing">
								<h4>{{item.HuXing}}</h4>
								<p>户型</p>
							</div>
							<span v-if="item.MuDi"></span>
							<div v-if="item.MuDi">
								<h4>{{item.MuDi}}</h4>
								<p>购房目的</p>
							</div>
						</div>
						<div class="pli" v-if="item.EstateName&&item.EstateName!='--'">
							<label>楼盘名称：</label>
							<span><template v-if="item.EstateName=='定制找房'">{{item.SubSourceName}}</template><template v-else><a :href="item.LinkUrl" v-if="item.LinkUrl">{{item.EstateName}}</a><template v-else>{{item.EstateName}}</template></template></span>
						</div>
						<div class="pli" v-if="item.BuildingNo">
							<label>楼栋房号：</label>
							<span>{{item.BuildingNo}}</span>
						</div>
						<div class="pli" v-if="item.YuSuanJiaGe">
							<label>预算范围：</label>
							<span>{{item.YuSuanJiaGe}}</span>
						</div>
						<div class="pli" v-if="item.SalePrice>0">
							<label>委托售价：</label>
							<span>{{item.SalePrice}}万</span>
						</div>
						<div class="pli" v-if="item.RentPrice>0">
							<label>委托租价：</label>
							<span>{{item.RentPrice}}元/月</span>
						</div>
						<div class="pli" v-if="item.SourceName">
							<label>商机来源：</label>
							<span>{{item.SourceName}}<template v-if="item.SubSourceName">-{{item.SubSourceName}}</template> </span>
						</div>
						<div class="pli" v-if="item.CalledMsg&&item.ChannelType!='经纪人'&&item.Type!=2">
							<label>呼叫信息：</label>
							<span>{{item.CalledMsg}}</span>
						</div>
						<div class="pli" v-if="item.CreateTime">
							<label>分发时间：</label>
							<span>{{item.CreateTime}}</span>
						</div>
						<div class="ccBtn" v-if="item.IsRelease!=1">
							<button class="callCommt" @click="change(item.MobileCompeteId,item.Type)">商机反馈</button>
							<button @click="getMobile(item.Id)" v-if="item.IsMobile==1">拨打电话</button>
							<button v-else><a :href="'tel:'+item.CallerNumberDisplay" @click="setSc">拨打电话</a></button>
						</div>
						<div class="ccBtn" style="color: #666;" @click="getRecord(item.Id)" v-if="item.IsRelease!=1">
							查看拨打和反馈记录
						</div>
						<div class="ccBtn" style="color: #999;" v-else>
							半小时未拨通或1小时未反馈，已重新分配
						</div>
					</div>
					<p class="noList" v-if="countMy>pSizeMy">正在加载</p>
					<p class="noList" v-else-if="countMy<=pSizeMy&&loadOver"><span></span>&nbsp;我是有底线的&nbsp;<span></span></p>
				</template>
				<div v-else-if="myList.length==0&&myReady" class="empty-shang-ji-wrap">
					<img class="empty-shang-ji" src="@/assets/img/empty-shang-ji-self.png" />
					<p>您尚未兑换商机信息</p>
				</div>
			</template>
		</div>
		<nut-popup style="border-radius: 0.12rem;" closeable v-model="showRecord">
			<div class="myIntr" style="min-height: 6.58rem;">
				<div class="ccRecord" style="padding-top: 0.3rem;">
					<h4 style="margin-bottom: 0.2rem;">记录</h4>
					<div class="ccrTag"><label :class="jl==1?'on':''" @click="jl=1">拨打记录<!-- <i></i> --></label><label :class="jl==2?'on':''" @click="jl=2">商机反馈<!-- <i></i> --></label></div>
					<!--  v-if="record.length==0" -->
					<div class="ccMr">
<!-- 						<div class="ccrInfo" v-for="item in record">
							{{item.CreateTime}}  拨打客户电话
						</div> -->
						<template v-if="jl==1">
							<template v-if="record.length>0">
							<div class="ccrInfo ccrInfoS" style="text-align: center;" v-for="item in record" :key="item.Id">
								<span>{{item.CreateTime}}</span>  <span>拨打客户电话</span> <span v-if="item.Result=='ANSWERED'" style="color: #00CC66;">已接听</span><span style="color: #F42C1D;" v-else>未接听</span>
							</div>
							</template>
							<div class="infoNone" v-else>
								暂无拨打电话记录
							</div>
						</template>
						<template v-else>
							<template v-if="recordCommt.length>0">
							<div class="ccrInfo" v-for="item in recordCommt" :key="item.Id">
								<span>{{item.CreateTime}}</span>  <span><i>{{item.CusLevelName}}</i>{{item.TitleName}}</span>
							</div>
							</template>
							<div class="infoNone" style="text-align: center;" v-else>
								暂无反馈记录
							</div>
						</template>
					</div>
<!-- 					<div class="ccMr" v-else>
						<div class="ccrInfo">
							暂无拨打电话记录
						</div>
					</div> -->
	<!-- 				<div class="ccrImg" @click="up=!up">
						<img src="../assets/img/cc-up.png" v-if="up"/>
						<img src="../assets/img/cc-down.png" v-else/>
					</div> -->
				</div>
			</div>
		</nut-popup>
		<nut-popup class="payTip" style="border-radius: 0.12rem;" v-model="showPay">
			<div class="myIntr" style="min-height: 5.3rem;height: 5.3rem;width: 6.2rem;">
				<div class="payTitle">
				</div>
				<div class="miTop">兑换商机</div>
				<div class="miContent">
					<div class="micM" style="display: block;">当前商机价格为<span style="color: #FF2D19;">{{buyInfo.BuyYuanBaoRealNum}}</span>元宝<br />是否兑换？</div>
					<div class="miBtn mibPay">
						<label @click="showPay=false">取消</label>
						<label @click="buyCustom()">确定</label>
					</div>
				</div>
			</div>
		</nut-popup>
		<nut-popup style="border-radius: 0.12rem;" closeable v-model="showMd">
			<div class="myIntr">
				<div class="miContent">
					<h4>商机反馈</h4>
					<div class="micM mdM">
						<label :class="md==item.CusLevelId?'on':''" @click="md=item.CusLevelId" v-for="item in intention" :key="item.CusLevelId">{{item.CusLevelName}}<!-- <i></i> --></label>
<!-- 						<label :class="md==1?'on':''" @click="md=1">强意向<i></i></label>
						<label :class="md==2?'on':''" @click="md=2">中意向<i></i></label>
						<label :class="md==3?'on':''" @click="md=3">低意向<i></i></label>
						<label :class="md==4?'on':''" @click="md=4">待反馈<i></i></label> -->
					</div>
					<div class="micMsg">
						<div v-for="item in intention" :key="item.CusLevelName">
							<label :class="cItem.TitleId==cmd?'on':''" @click="cmd=cItem.TitleId" v-for="cItem in item.Titles" v-if="md==item.CusLevelId">{{cItem.TitleName}}</label>
<!-- 							<label :class="uTag.id==1?'on':''" @click="setCommt(1,'近期有购房需求')">近期有购房需求</label>
							<label :class="uTag.id==2?'on':''" @click="setCommt(2,'成功线下约见')">成功线下约见</label>
							<label :class="uTag.id==3?'on':''" @click="setCommt(3,'同意添加微信好友沟通')">同意添加微信好友沟通</label> -->
						</div>
<!-- 						<template v-if="md==2">
							<label :class="uTag.id==4?'on':''" @click="setCommt(4,'无购房资格/资金不足')">无购房资格/资金不足</label>
							<label :class="uTag.id==5?'on':''" @click="setCommt(5,'了解市场、观望等待')">了解市场、观望等待</label>
						</template>
						<template v-if="md==3">
							<label :class="uTag.id==6?'on':''" @click="setCommt(6,'同行/同事')">同行/同事</label>
							<label :class="uTag.id==7?'on':''" @click="setCommt(7,'三次以上拨打秒挂或无人接听')">三次以上拨打秒挂或无人接听</label>
							<label :class="uTag.id==8?'on':''" @click="setCommt(8,'号码有误、关机、无法接通、欠费、不愿意被打扰')">号码有误、关机、无法接通、欠费、不愿意被打扰</label>
						</template>
						<template v-if="md==4">
							<label :class="uTag.id==9?'on':''" @click="setCommt(9,'有事在忙/没时间/无人接听，待反馈')">有事在忙/没时间/无人接听，待反馈</label>
						</template> -->
					</div>
					<div class="miBtn">
						<label @click="commitC()">提交</label>
					</div>
				</div>
			</div>
		</nut-popup>
		<foot tab5='1'></foot>
		
		<div class="showModel" v-if="tip">
		  <div class="bj"></div>
		  <div class="showMsg">
		    <label class="modelClose" @click="tip=false"></label>
			<h3>温馨提示</h3>
			<p>竞拍商机后请及时填写反馈内容，1小时未反馈，自动拉黑1天；累计≥3次未反馈，拉黑7天。(ps:拉黑后无法接收商机哦)</p>
			<!-- <p style="margin-top: 0.1rem;"><span style="color: #999;font-size: 0.24rem;"> </span></p> -->
			<mt-button type="primary" class="carBtn" @click="tip=false">我知道了</mt-button>
		  </div>
		</div>
		
		<div class="showModel" v-if="isBlack">
		  <div class="bj"></div>
		  <div class="showMsg" style="height: 3.8rem;width: 6.1rem;">
		    <label class="modelClose" @click="isBlack=false"></label>
			<h3>温馨提示</h3>
			<p>{{blackText}}</p>
			<mt-button type="primary" class="carBtn" @click="isBlack=false">我知道了</mt-button>
		  </div>
		</div>
		
		<!-- 回馈活动弹窗-->
			<div class="hkShow">
				<div class="hkbj" v-if="moduleNum>-1" @click="moduleNum=-1"></div>
				<Module :showOn="moduleNum" :prizeName="prizeName" @changeNum="changeModule"></Module>
			</div>
			<!-- 领取成功弹窗 -->
			<div class="hkShow" :class="addCar?'animationCar':''">
				<div class="hkbj" v-if="addCar" @click="addCar=false"></div>
				<div class="giveMsg" @click="$router.push({'name':'myPrize'})">
				</div>
			</div>
		
	</div>
</template>

<script>
	import Vue from 'vue';
	import { Toast,Indicator } from 'mint-ui';
	import {
	  uToken,
	} from "@/global/token.js";
	import Foot from '@/components/foot.vue';
	import Module from '@/components/module.vue'
	import nutUI from '@nutui/nutui/dist/nutui.min.js';  // 加载构建后的JS
	import '@nutui/nutui/dist/nutui.min.css';  //加载构建后的CSS
	nutUI.install(Vue);
	export default{
		name: 'custom',
		data(){
			return{
				header_token:{"token": uToken()},
				tip:false,
				inApp:false,
				cType:1,
				show:false,
				cList:"",
				myList:"",
				showPay:false,
				pSize:10,
				count:0,
				pSizeMy:10,
				countMy:0,
				loadOver:false,
				load:false,
				scrollTop:0,
				type:'my',
				cId:"",
				buyInfo:"",
				bigImg:"",
				bigName:"",
				cName:"",
				up:false,
				showMd:false,
				md:1,
				cmd:0,
				call:"",
				record:"",
				recordCommt:"",
				showRecord:false,
				read:false,
				ready:false,
				myReady:false,
				jl:1,
				intention:"",
				
				addCar:false,
				moduleNum:-1,
				prize:"",
				prizeName:"45元礼包",
				runNum:Math.random(),
				prizeId:"",
				typeNum:1,
				isBlack:false,
				blackText:"您的账号被封禁15天，请及时对商机进行反馈"
			}
		},
		components: {
		  Foot,
			Module
		},
		created(){
			// 全局绑定滚动事件，
			window.addEventListener("scroll", this.scrollT);
			document.title="商机";
			if(navigator.userAgent.indexOf('aplus') > -1){
				this.inApp=true
			}
			this.getcList();
			if(localStorage.getItem('readImg')){
				this.read=true;
			}
			setTimeout(()=>{
				this.getCommt();
			},500)
			// if(this.runNum<0.35){
			// 	this.getPrize()
			// }
			this.getBlack();
		},
		beforeDestroy() {
			// 组件消失，解绑scroll事件
			window.removeEventListener("scroll", this.scrollT);
		},
		watch:{
			md(){
				this.cmd=0
			},
			cType(){
				this.load=false;
				if(this.cType==1){
					this.pSize=10;
					this.getcList();
				}else{
					this.pSizeMy=10;
					this.getMyList();
				}
			},
			pSize(){
				if(this.pSize>10){
					this.getcList();
				}
			},
			pSizeMy(){
				if(this.pSizeMy>10){
					this.getMyList();
				}
			},
			scrollTop(newValue, oldValue) {//滚动分页
				var height = document.getElementsByClassName('custom')[0].scrollHeight;
				let sTop = document.documentElement && document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop;//滚动的高度
				let clientHeight=window.screen.height;//屏幕的高度
				if(this.count>this.pSize){
					if(sTop>0){
						if(height-100<sTop+clientHeight&&this.load){
							  // console.log('监听成功','到达底部')
							  if(this.cType==1){
									if(this.pSize<this.count){
										this.pSize=Number(this.pSize)+10; 
									}
									setTimeout(()=>{
										this.loadOver=true
									},1000)								  
							  }else{
								  if(this.pSizeMy<this.countMy){
								  	this.pSizeMy=Number(this.pSizeMy)+10; 
								  }
								  setTimeout(()=>{
								  	this.loadOver=true
								  },1000)	
							  }
						 }
					 }
				}else if(this.countMy>this.pSizeMy){
					if(sTop>0){
						if(height-100<sTop+clientHeight&&this.load){
							  if(this.cType==2){
								  if(this.pSizeMy<this.countMy){
								  	this.pSizeMy=Number(this.pSizeMy)+10; 
								  }
								  setTimeout(()=>{
								  	this.loadOver=true
								  },1000)							  
							  }
					 }
					}
				}else{
					setTimeout(()=>{
						this.loadOver=true
					},1000)
				}
			}
		},
		methods:{
			// 神策电话埋点
			setSc(){
				this.$sensors.track('sc_click_call', {
					sc_business_type:"other",
					sc_button_name:"拨打电话按钮",
					sc_click_page:"商机_我的商机页",
					sc_house_id:"",
					sc_house_name:"",
					sc_click_area:"我的商机区域",
					sc_button_position:""
				});
			},
			// 
			getBlack(){
				return new Promise((resolve)=>{
						this.$axios({
							method:"get",
							url:"/MobileCompete/IsClosed",
							headers:this.header_token,
						})
						.then(res=>{
							console.log(res);
							resolve(res);
							if(res.data.code==0){
								if(res.data.data.IsBlack==1){
									this.isBlack=true;
									this.blackText=res.data.data.Reason
								}
							}else{
								throw new Error("获取经纪人是否拉黑接口code报错");
							}
						})
						.catch(error=>{
							console.log(error.message);//注意  throw new Error需要用error.message输出
						})
				})
			},
			// 经纪人回馈活动中奖查询
			getPrize(){
				return new Promise((resolve)=>{
						this.$axios({
							method:"get",
							url:"/Activity/ShowPrize?v="+Math.random()*10,
							headers:this.header_token,
						})
						.then(res=>{
							console.log(res);
							resolve(res);
							if(res.data.code==0&&res.data.data.code==0){
								this.prize=res.data.data.data;
								this.prizeId=res.data.data.data.Id;
								if(res.data.data.data.Type==2){
									this.prizeName=res.data.data.data.PrizeName;
								}
								this.setModule(res.data.data.data.Type);
							}
						})
						.catch(error=>{
							this.$toast.text("网络错误，请稍后再试");
						})
				})
			},
			givePrize(){
				return new Promise((resolve)=>{
						this.$axios({
							method:"post",
							url:"/Activity/ReceivePrize",
							headers:this.header_token,
							data:{
								id:this.prizeId
							}
						})
						.then(res=>{
							console.log(res);
							if(res.data.data.code==0){
								resolve(res);
							}else{
								this.$toast.text(res.data.data.msg);
								// 新增未成功关闭弹窗
								this.moduleNum=-1;
							}
						})
						.catch(error=>{
							this.$toast.text("网络错误，请稍后再试");
							// 新增未成功关闭弹窗
							this.moduleNum=-1;
						})
				})
			},
			setModule(n){
				this.moduleNum=n
			},
			async changeModule(n){
				await this.givePrize();
				if(n==2){
					setTimeout(()=>{
						this.moduleNum=-1;
						this.addCar=true;
					},1200)
				}else if(n==3){
					setTimeout(()=>{
						this.moduleNum=-1;
						this.addCar=true;
					},500)
				}else{
					this.moduleNum=-1;
					this.addCar=true;
				}
				
			},
			
			getCommt(type){
				if(type==undefined){
					type=1;
				}
				return new Promise((resolve)=>{
						this.$axios({
							method:"get",
							url:"/mobilecompete/custleveltitle",
							headers:this.header_token,
							params:{
								type:type
							}
						})
						.then(res=>{
							console.log(res);
							if(res.data.code==0){
								this.intention=res.data.data;
							}else{
								this.$toast.text(res.data.msg);
							}
							Indicator.close();
							resolve(res);
							this.ready=true;
						})
						.catch(error=>{
							Indicator.close();
							this.$toast.text("网络错误，请稍后再试");
						})
				})
			},
			commitC(){
				if(this.cmd<1){
					this.$toast.text("请选择反馈类型");
					return;
				}
				return new Promise((resolve)=>{
						this.$axios({
							method:"post",
							url:"/mobilecompete/mobilecompetereview",
							headers:this.header_token,
							data:{
								mobileCompeteId:this.cId,
								cusLevelId:this.md,
								titleId:this.cmd,
								type:this.typeNum
							}
						})
						.then(res=>{
							console.log(res);
							if(res.data.code==0){
								this.$toast.success("评价成功");
								this.showMd=false;
								this.md=1;
								this.cmd=0;
								this.getMyList();
							}else{
								this.$toast.text(res.data.msg);
							}
							Indicator.close();
							resolve(res);
							this.ready=true;
						})
						.catch(error=>{
							Indicator.close();
							this.$toast.text("网络错误，请稍后再试");
						})
				})
			},
			changeTag(n){
				this.cType=n;
				if(n==2){
					this.tip=true;
				}
				window.scroll(0, 0);
			},
			scrollT(){
				this.scrollTop = window.scrollY;
			},
			readImg(){
				this.read=true;
				localStorage.setItem('readImg','true');
			},
			getcList(){
				Indicator.open();
				this.load=false;
				return new Promise((resolve)=>{
						this.$axios({
							method:"get",
							url:"/MobileCompete/GetNoticeList",
							headers:this.header_token,
							params:{
								pageIndex:1,
								pageSize:this.pSize
							}
						})
						.then(res=>{
							console.log(res);
							if(res.data.code==0){
								this.cList=res.data.data.DataList;
								this.count=res.data.data.RecordCount;
								this.load=true;
							}else{
								this.$toast.text(res.data.msg);
							}
							Indicator.close();
							resolve(res);
							this.ready=true;
						})
						.catch(error=>{
							Indicator.close();
							this.$toast.text("网络错误，请稍后再试");
						})
				})
			},
			getMyList(){
				this.load=false;
				Indicator.open();
				return new Promise((resolve)=>{
						this.$axios({
							method:"get",
							url:"/MobileCompete/GetMyList",
							headers:this.header_token,
							params:{
								pageIndex:1,
								pageSize:this.pSizeMy
							}
						})
						.then(res=>{
							console.log(res);
							if(res.data.code==0){
								this.myList=res.data.data.DataList;
								this.countMy=res.data.data.RecordCount;
								this.load=true;
							}else{
								this.$toast.text(res.data.msg);
							}
							Indicator.close();
							resolve(res);
							this.myReady=true;
						})
						.catch(error=>{
							Indicator.close();
							this.$toast.text("网络错误，请稍后再试");
						})
				})
			},
			getMobile(id){
				return new Promise((resolve)=>{
						this.$axios({
							method:"get",
							url:"/MobileCompete/GetXiaoHaoNew",
							headers:this.header_token,
							params:{
								"detailId": id,
							}
						})
						.then(res=>{
							console.log(res);
							if(res.data.code==0){
								if(res.data.data.IsSuccess){
									this.call=res.data.data.Reamark;
									setTimeout(()=>{
										this.$refs.cphone.click();
									},100)
								}else{
									this.$toast.text(res.data.data.Reamark);
								}
							}else{
								this.$toast.text(res.data.msg);
							}
							resolve(res);
						})
						.catch(error=>{
							Indicator.close();
							this.$toast.text("网络错误，请稍后再试");
						})
				})
			},
			getRecord(id){
				Indicator.open({
				  spinnerType: 'triple-bounce'
				});
				return new Promise((resolve)=>{
						this.$axios({
							method:"get",
							url:"/mobilecompete/callAndReviewRecordsNew",
							headers:this.header_token,
							params:{
								"detailId": id,
								"PageSize":100
							}
						})
						.then(res=>{
							console.log(res);
							if(res.data.code==0){
								this.record=res.data.data.callRecordsList;
								this.recordCommt=res.data.data.reviewRecordsList;
								console.log(this.record.length)
								this.showRecord=true;
							}else{
								this.$toast.text(res.data.msg);
							}
							resolve(res);
							Indicator.close();
						})
						.catch(error=>{
							Indicator.close();
							this.$toast.text("网络错误，请稍后再试");
						})
				})
			},
			buy(e){
				this.buyInfo=e;
				this.showPay=true;
			},
			buyCustom(id){
				Indicator.open({
				  spinnerType: 'triple-bounce'
				});
				return new Promise((resolve)=>{
						this.$axios({
							method:"post",
							url:"/MobileCompete/Auction",
							headers: {
								"token":uToken()
							 },
							data:{
								"MobileCompeteId": this.buyInfo.MobileCompeteId,
								"BuyYuanBaoNum": this.buyInfo.BuyYuanBaoRealNum
							}
						})
						.then(res=>{
							console.log(res);
							resolve(res);
							if(res.data.code==0){
								if(res.data.data.IsSuccess){
									this.showPay=false;
									this.$toast.success('兑换成功，请前往【我的商机】查看');
									this.getcList();
								}else{
									this.$toast.text(res.data.data.Reamark);
									this.getcList();
								}
							}else{
								this.$toast.text(res.data.msg);
							}
							Indicator.close();
						})
						.catch(error=>{
							Indicator.close();
							this.$toast.text("网络错误，请稍后再试");
						})
				})
			},
			change(id,type){
				this.showMd=true;
				this.cId=id;
				this.typeNum=type;
				this.getCommt(type);
			},
			changeMd(id){
				return new Promise((resolve)=>{
						this.$axios({
							method:"post",
							url:"/MobileCompete/SetCustomerYiXiang",
							headers: {
								"token":uToken()
							 },
							data:{
								"MobileCompeteId": this.cId,
								 "YiXiang": this.md
							}
						})
						.then(res=>{
							console.log(res);
							resolve(res);
							if(res.data.code==0){
								if(res.data.data.IsSuccess){
									this.showMd=false;
									this.$toast.text(res.data.data.Reamark);
									this.getMyList();
								}else{
									this.$toast.text(res.data.data.Reamark);
								}
							}else{
								this.$toast.text(res.data.msg);
							}
							Indicator.close();
						})
						.catch(error=>{
							Indicator.close();
							this.$toast.text("网络错误，请稍后再试");
						})
				})
			},

		}
	}
</script>

<style scoped>
	.custom{background-color: #F5F5F5;min-height: 100vh;padding-top: 1.6rem; display: flex; flex-direction: column;}
	.customC { padding: .3rem 0.3rem 1.3rem; display: flex; flex-direction: column; flex: 1 }
	.ccList{background-color: #fff;padding: 0.3rem 0.2rem 0;box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.1);margin-bottom: 0.3rem;border-radius: 0.1rem;position: relative;}
	.ccTop{height: 0.6rem;line-height: 0.6rem;/* margin-bottom: 0.3rem; */}
	.ccTop label{font-size: 0.36rem;color: #333;float: left;}
	.ccTop label img{width: 0.6rem;float: left;margin-right: 0.2rem;}
	.ccTop span{font-size: 0.22rem;padding: 2px 0.1rem;margin-left: 0.2rem;background-color: #5084DD;border-radius: 0.05rem;color: #fff;}
	.ccPrice{display: flex;justify-content: space-between;align-items: center;white-space: nowrap;text-align: center;padding: 0 0.2rem;margin-bottom: 0.4rem;margin-top: 0.3rem;}
	.ccPrice span{width: 1px;height: 0.6rem;background-color: #ddd;}
	.ccPrice div{flex: 1;}
	.ccPrice h4{font-size: 0.36rem;margin-bottom: 0.1rem;}
	.ccPrice p{color: #999;font-size: 0.24rem;}
	.pli{width: 100%;line-height: 0.85rem;border-top: 1px solid #ddd;display: flex;justify-content: space-between;}
	.pli label{color: #999;}
	.pli span{max-width: 5rem;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;}
	.pli span a{color: #6089D9;}
	.ccBtom{display: flex;justify-content: space-between;align-items: center;line-height: 1.24rem;border-top: 1px solid #ddd;}
	.ccBtom label{font-size: 0.28rem;padding-left: 0.6rem;background: url(../assets/img/cc-yb.png) left center no-repeat;background-size: 0.36rem;}
	.ccBtom label strong{font-size: 0.4rem;color: #FF2D19;}
	.ccBtom label a{margin-left: 0.2rem;font-size: 0.3rem;color: #999;text-decoration: line-through; }
	.ccBtom button{width: 2rem;height: 0.65rem;background: linear-gradient(180deg, #7BACEE 0%, #6089D9 100%);color: #fff;font-size: 0.32rem;border-radius: 0.3rem;}
	.hbY{background-color: #fff;}
	.hbTab { text-align: center; padding: 0.4rem 0; font-size: 0.32rem; color: #333; position: fixed; top: 0; left: 0;width: 100%;z-index: 7; box-shadow: 0px 2px 6px 2px rgb(0 0 0 / 6%); background-color: #fff; }
	.hbTab a{display: inline-block;background-color: #fff;border-radius: 0.35rem;box-shadow: 0 0 2px #ccc;}
	.hbTab label{display: inline-block;width: 1.8rem;height: 0.7rem;margin: 0 0.2rem 0 0;line-height: 0.7rem;color: #333;}
	.hbTab label:last-child{margin: 0;}
	.hbTab label.on{background: linear-gradient(134deg, #FB6F52 0%, #F3240A 100%);color: #fff;border-radius: 0.35rem;}
	.myIntr{width: 6.9rem;min-height: 6rem;background-color: #fff;border-radius: 0.2rem;}
	.myIntr h4{text-align: center;font-size: 0.36rem;color: #333;border: 0;font-weight: 550;}
	.miTop{height: 1.3rem;line-height: 1.3rem;text-align: center;font-size: 0.4rem;font-weight: 600;color: #fff;margin-top: -1rem;color: #F42C1D;font-size: 0.4rem;}
	.miContent{padding: 0 0.3rem 0.3rem;}
	.miContent textarea{width: 100%;height: 2rem;background-color: #eee;border: 1px solid #ddd;padding: 0.2rem;}
	.miBtn{margin-top: 0.6rem;text-align: center;margin-bottom: 0.4rem;}
	.miBtn label{display: inline-block;width: 3.7rem;height: 0.94rem;border-radius: 0.12rem;margin: 0 0.2rem;line-height: 0.9rem;font-size: 0.36rem;color: #F42C1D;border: 1px solid #F42C1D;}
	.miBtn label:last-child{background: #F42C1D;color: #fff;}
	.mibPay{margin-top: 0.8rem;}
	.mibPay label{width: 2.4rem;}
	.micM{font-size: 0.36rem;line-height: 1.6;text-align: center;}
	.ccMy .ccTop label{float: none;}
	.ccMy .ccTop span{margin: 0 0.2rem 0 0;background-color: #FA6400;}
	.ccMy .ccTop span i{font-style: normal;}
	.ccBtn{padding: 0.3rem 0;text-align: center;border-top: 1px solid #ddd;}
	.ccBtn button{width: 2.8rem;height: 0.8rem;background: #F42C1D;border-radius: 0.4rem;color: #fff;font-size: 0.32rem;}
	.ccBtn button a{color: #fff;width: 100%;display: inline-block;height: 100%;border-radius: 0.4rem;line-height: 0.78rem;}
	.ccBtn button:first-child{margin-right: 0.4rem;background: none;border: 1px solid #F42C1D;color: #F42C1D;}
	.ccRecord{padding-top: 0.4rem;text-align: center;color: #666;}
	.ccRecord p{font-size: 0.32rem;margin-bottom: 0.2rem;font-weight: 600;display: flex;justify-content:  center;align-items: center;}
	.ccRecord p i{display: inline-block;width: 1.8rem;height: 1px;background-color: #ddd;}
	.ccRecord p span{margin: 0 0.2rem;}
	.ccRecord .ccrInfo{margin-bottom: 0.24rem;display: flex;}
	.ccRecord h4{margin-bottom: 0.4rem;}
	.ccrImg{padding: 0.3rem 0 0;border-top: 1px solid #ddd;text-align: center;}
	.ccrImg img{width: 0.38rem;}
	.ccMr{max-height: 4.5rem;overflow: hidden;padding: 0.2rem;overflow-y: auto;text-align: left;margin-top: 0.2rem;background-color: #f5f5f5;}
	.ccrInfo{font-size: 0.26rem;}
	.ccrInfo span:first-child{flex: 1;text-align: center;}
	.ccrInfo span:last-child{flex: 1.2;line-height: 1.6;}
	.ccrInfoS span:last-child{flex: 0.6;}
	.ccrInfo span i{font-style: normal;font-size: 0.2rem;color: #F42C1D;padding: 1px 2px;border: 1px solid #F42C1D;border-radius: 2px;margin-right: 0.1rem;}
	.miContent h4{font-size: 0.36rem;text-align: center;font-weight: 550;padding-top: 0.3rem;padding-bottom: 0.2rem;}
	.micM,.ccrTag{display: flex;justify-content: space-between;}
	.micM label,.ccrTag label{font-weight: 500;display: inline-block;position: relative;flex: 1;height: 0.6rem;line-height: 0.6rem;text-align: center;font-size: 0.3rem;border-radius: 0.05rem;color: #666;}
	/* .micM label:nth-last-of-type(2){margin: 0 0.3rem;} */
	.micM label.on,.ccrTag label.on{color: #F42C1D;}
	.micM label.on i,.ccrTag label.on i{display: inline-block;height: 2px;width:0.8rem;background-color: #F42C1D;position: absolute;bottom: 0;left: 0.38rem;}
	.ccrTag label.on i{left: 1.3rem;}
	.mdM{text-align: center;margin-bottom: 0.2rem;}
	.micMsg{padding-top: 0.2rem;min-height: 1.84rem;background-color: #f5f5f5;text-align: center;}
	.micMsg label{display: inline-block;padding: 0.15rem;font-size: 0.24rem;border-radius: 3px;margin-right: 0.3rem;margin-bottom: 0.3rem;background-color: #fff;color: #666;}
	.micMsg label:last-child{margin-right: 0;}
	.micMsg label.on{background-color: #FDE9EA;color: #F42C1D;}
	.cTag{width: 1.2rem;height: 1.2rem;background: url(../assets/img/c-new.png) right top no-repeat;background-size: 100%;position: absolute;right: -0.25rem;top: -0.28rem;}
	.c2Tip{width: 100%;height: 100%;z-index: 6;}
	.tBj{width: 100%;height: 100%;z-index: 7;background-color: #000;opacity: 0.7;position: fixed;left: 0;top: 0;}
	.tMsg{width: 100%;height: 100%;z-index: 8;position: fixed;left: 0;top: 0;background: url(../assets/img/cstBj.png) 0.3rem 25% no-repeat;background-size: 5.39rem;}
	.noList{color: #ccc;font-size: 0.26rem;text-align: center;margin-top: 0.8rem;}
	.noList span{display: inline-block;height: 1px;width: 2rem;background-color: #eee;position: relative;top: -3px;}
	
	.ccMy .ccTop span.cHouseTag{
		position: absolute;
		right: 0;
		top: 0.38rem;
		display: inline-block;
		height: 0.4rem;
		line-height: 0.36rem;
		padding: 0 0.1rem;
		background: none;
		border: 1px solid #999;
		color: #999;
	}
	.infoNone{text-align: center;margin: 0.4rem 0;color: #999;}

	.i-yhc{width: 100%;height: 100%;display: block;position: absolute;left: 0;top: 0;color: #fff;}
	.i-yhc label{background: #000;position: absolute;left: 0;top: 0;opacity: 0.6;z-index: 3;display: block;width: 100%;height: 100%;border-radius: 0.1rem;}
	p.yhc{position: absolute;top: 50%;margin-top: -1rem;left: 0;z-index: 4;padding: 0.4rem;font-size: 0.36rem;line-height: 1.8;}
	/** 商机列表为空 */
	.empty-shang-ji-wrap { margin: auto; display: flex; flex-direction: column; color: #999; font-size: 0.28rem; text-align: center; }
	.empty-shang-ji { display: block; margin-bottom: 0.49rem; width: 4.2rem; }
	
	.overAll,.overAll label,.overAll a{color: #999 !important;}
	.overAll{background-color: #f5f5f5 !important;}
	.payTip{overflow: visible;border-radius: 0.2rem;}
	.payTitle{height: 1.52rem;width: 100%;background: url(../assets/img/icon-pay.png) center no-repeat;background-size: 1.52rem;position: relative;top: -0.7rem;}

	.showModel{
	  position: fixed;
	  width: 100%;
	  height: 100%;
	  z-index: 90;
	}
	.bj{position: fixed;background: #000;opacity: 0.5;width: 100%;height: 100%;left: 0;top: 0;z-index: 91;}
	.showMsg{text-align: left;font-size: 16px; position: fixed;left: 50%;top: 50%;transform: translate(-50%,-50%);width: 5.8rem;height: 4.8rem; background: #fff;z-index: 92;padding: 0.5rem 0.4rem;border-radius: 8px;}
		.showMsg h3{font-size: 0.32rem;font-weight: 550;text-align: center;color: #333;margin-bottom: 0.3rem;}
		.showMsg p{font-size: 0.3rem;color: #666;margin-top: 0.1rem;}
		.carBtn{width: 2.8rem;height: 0.8rem;margin: 0.5rem auto 0;display: block;line-height: 0.8rem;
	background: linear-gradient(134deg, #FB6F52 0%, #F3240A 100%);border-radius: 3px;font-size: 0.32rem;}
		.modelClose{position: absolute;right: 0rem;top: 0rem;cursor: pointer;width: 0.8rem;height: 0.8rem;display: block;background: url(../assets/img/close.png) center no-repeat;background-size: 0.27rem;}
	
</style>
