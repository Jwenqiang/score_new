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
						<div class="pli" v-if="item.YuSuanJiaGe">
							<label>预算范围：</label>
							<span>{{item.YuSuanJiaGe}}</span>
						</div>
						<div class="pli" v-if="item.SourceName">
							<label>商机来源：</label>
							<span>{{item.SourceName}}</span>
						</div>
						<div class="pli" v-if="item.CalledMsg&&item.ChannelType!='经纪人'">
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
					<p class="noList" @click="pSize+=10" v-if="count>pSize">正在加载</p>
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
					<a :href="'tel:'+call" ref="cphone" style="display: none;"></a>
<!-- 					<div class="c2Tip" @click="readImg" v-if="read==false">
						<div class="tBj"></div>
						<div class="tMsg"></div>
					</div> -->
					<div class="ccList ccMy" v-for="item in myList">
						<div class="i-yhc" v-if="item.IsRelease==1">
							<label></label>
							<p class="yhc">该商机兑换后超半小时未进行电话跟进，已放入商机池进行重新分配</p>
						</div>
						<i class="cTag" v-if="item.IsNew"></i>
						<div class="ccTop">
							<template v-if="item.IsRelease!=1">
								<span style="background: #FF0000;" @click="change(item.MobileCompeteId)" v-if="item.CusLevel=='高意向'">{{item.CusLevel}}</span>
								<span style="background: #ff584c;" @click="change(item.MobileCompeteId)" v-else-if="item.CusLevel=='中意向'">{{item.CusLevel}}</span>
								<span style="background: #ccc;" @click="change(item.MobileCompeteId)" v-else-if="item.CusLevel=='低质量'">{{item.CusLevel}}</span>
								<span v-else>待跟进</span>
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
						<div class="pli" v-if="item.YuSuanJiaGe">
							<label>预算范围：</label>
							<span>{{item.YuSuanJiaGe}}</span>
						</div>
						<div class="pli" v-if="item.SourceName">
							<label>商机来源：</label>
							<span>{{item.SourceName}}</span>
						</div>
						<div class="pli" v-if="item.CalledMsg&&item.ChannelType!='经纪人'">
							<label>呼叫信息：</label>
							<span>{{item.CalledMsg}}</span>
						</div>
						<div class="pli" v-if="item.CreateTime">
							<label>分发时间：</label>
							<span>{{item.CreateTime}}</span>
						</div>
						<div class="ccBtn" v-if="item.IsRelease!=1">
							<button class="callCommt" @click="change(item.MobileCompeteId)">商机跟进</button>
							<button @click="getMobile(item.Id)" v-if="item.IsMobile==1">拨打电话</button>
							<button v-else><a :href="'tel:'+item.CallerNumberDisplay">拨打电话</a></button>
						</div>
						<div class="ccBtn" style="color: #666;" @click="getRecord(item.Id)">
							查看拨打和跟进记录
						</div>
					</div>
					<p class="noList" @click="pSizeMy+=10" v-if="countMy>pSizeMy">正在加载</p>
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
				<div class="ccRecord">
					<h4>记录</h4>
					<div class="ccrTag"><label :class="jl==1?'on':''" @click="jl=1">拨打记录<i></i></label><label :class="jl==2?'on':''" @click="jl=2">商机跟进<i></i></label></div>
					<!--  v-if="record.length==0" -->
					<div class="ccMr">
<!-- 						<div class="ccrInfo" v-for="item in record">
							{{item.CreateTime}}  拨打客户电话
						</div> -->
						<template v-if="jl==1">
							<template v-if="record.length>0">
							<div class="ccrInfo" style="text-align: center;" v-for="item in record" :key="item.Id">
								<span>{{item.CreateTime}}</span>  <span>拨打客户电话</span>
							</div>
							</template>
							<div class="infoNone" v-else>
								暂无拨打电话记录
							</div>
						</template>
						<template v-else>
							<template v-if="recordCommt.length>0">
							<div class="ccrInfo" v-for="item in recordCommt" :key="item.Id">
								<span>{{item.CreateTime}}</span>  <span>【{{item.CusLevelName}}】{{item.TitleName}}</span>
							</div>
							</template>
							<div class="infoNone" style="text-align: center;" v-else>
								暂无跟进记录
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
		<nut-popup style="border-radius: 0.12rem;" v-model="showPay">
			<div class="myIntr" style="height: 5.6rem;width: 6.2rem;">
				<div class="miTop">兑换商机</div>
				<div class="miContent">
					<div class="micM" style="display: block;">当前商机价格为<span style="color: #FF2D19;">{{buyInfo.BuyYuanBaoRealNum}}</span>元宝，是否兑换？</div>
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
					<h4>商机跟进</h4>
					<div class="micM mdM">
						<label :class="md==item.CusLevelId?'on':''" @click="md=item.CusLevelId" v-for="item in intention" :key="item.CusLevelId">{{item.CusLevelName}}<i></i></label>
<!-- 						<label :class="md==1?'on':''" @click="md=1">强意向<i></i></label>
						<label :class="md==2?'on':''" @click="md=2">中意向<i></i></label>
						<label :class="md==3?'on':''" @click="md=3">低意向<i></i></label>
						<label :class="md==4?'on':''" @click="md=4">待跟进<i></i></label> -->
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
							<label :class="uTag.id==9?'on':''" @click="setCommt(9,'有事在忙/没时间/无人接听，待跟进')">有事在忙/没时间/无人接听，待跟进</label>
						</template> -->
					</div>
					<div class="miBtn">
						<label @click="commitC()">提交</label>
					</div>
				</div>
			</div>
		</nut-popup>
		<foot tab5='1'></foot>
	</div>
</template>

<script>
	import Vue from 'vue';
	import { Toast,Indicator } from 'mint-ui';
	import {
	  uToken,
	} from "@/global/token.js";
	import Foot from '@/components/foot.vue';
	import nutUI from '@nutui/nutui/dist/nutui.min.js';  // 加载构建后的JS
	import '@nutui/nutui/dist/nutui.min.css';  //加载构建后的CSS
	nutUI.install(Vue);
	export default{
		name: 'custom',
		data(){
			return{
				header_token:{"token": uToken()},
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
				intention:""
			}
		},
		components: {
		  Foot
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
					this.getcList();
				}else{
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
				}else{
					setTimeout(()=>{
						this.loadOver=true
					},1000)
				}
			},
		},
		methods:{
			getCommt(){
				return new Promise((resolve)=>{
						this.$axios({
							method:"get",
							url:"/mobilecompete/custleveltitle",
							headers:this.header_token
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
					this.$toast.text("请选择跟进类型");
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
								titleId:this.cmd
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
			change(id){
				this.showMd=true;
				this.cId=id;
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
	.myIntr{width: 6.9rem;min-height: 6.12rem;background-color: #fff;}
	.myIntr h4{text-align: center;font-size: 0.36rem;color: #333;border: 0;font-weight: 550;}
	.miTop{height: 1.3rem;background: linear-gradient(134deg, #FB6F52 0%, #F3240A 100%);line-height: 1.3rem;text-align: center;font-size: 0.4rem;font-weight: 600;color: #fff;}
	.miContent{padding: 0.3rem;}
	.miContent textarea{width: 100%;height: 2rem;background-color: #eee;border: 1px solid #ddd;padding: 0.2rem;}
	.miBtn{margin-top: 0.6rem;text-align: center;}
	.miBtn label{display: inline-block;width: 3.7rem;height: 0.8rem;border-radius: 0.4rem;margin: 0 0.2rem;background-color: #ccc;line-height: 0.76rem;font-size: 0.36rem;color: #fff;}
	.miBtn label:last-child{background: linear-gradient(134deg, #FB6F52 0%, #F3240A 100%);}
	.mibPay{margin-top: 0.8rem;}
	.mibPay label{width: 2.4rem;}
	.micM{font-size: 0.36rem;margin: 0.6rem 0 0.4rem;line-height: 1.6;}
	.ccMy .ccTop label{float: none;}
	.ccMy .ccTop span{margin: 0 0.2rem 0 0;background-color: #FA6400;}
	.ccMy .ccTop span i{font-style: normal;}
	.ccBtn{padding: 0.3rem 0;text-align: center;border-top: 1px solid #ddd;}
	.ccBtn button{width: 3rem;height: 0.8rem;background: #EB2C30;border-radius: 0.4rem;color: #fff;font-size: 0.36rem;}
	.ccBtn button a{color: #fff;width: 100%;display: inline-block;height: 100%;border-radius: 0.4rem;line-height: 0.78rem;}
	.ccBtn button:first-child{margin-right: 0.4rem;background: none;border: 1px solid #EB2C30;color: #EB2C30;}
	.ccRecord{padding-top: 0.4rem;text-align: center;color: #666;}
	.ccRecord p{font-size: 0.32rem;margin-bottom: 0.2rem;font-weight: 600;display: flex;justify-content:  center;align-items: center;}
	.ccRecord p i{display: inline-block;width: 1.8rem;height: 1px;background-color: #ddd;}
	.ccRecord p span{margin: 0 0.2rem;}
	.ccRecord .ccrInfo{margin-bottom: 0.24rem;display: flex;}
	.ccRecord h4{margin-bottom: 0.4rem;}
	.ccrImg{padding: 0.3rem 0 0;border-top: 1px solid #ddd;text-align: center;}
	.ccrImg img{width: 0.38rem;}
	.ccMr{max-height: 4.5rem;overflow: hidden;padding: 0.2rem;overflow-y: auto;text-align: left;margin-top: 0.2rem;}
	.ccrInfo span:first-child{flex: 1;}
	.ccrInfo span:last-child{flex: 1.2;}
	.miContent h4{font-size: 0.36rem;text-align: center;font-weight: 550;padding-top: 0.2rem;}
	.micM,.ccrTag{display: flex;justify-content: space-between;}
	.micM label,.ccrTag label{font-weight: 500;display: inline-block;position: relative;flex: 1;height: 0.6rem;line-height: 0.6rem;text-align: center;font-size: 0.3rem;border-radius: 0.05rem;color: #666;}
	/* .micM label:nth-last-of-type(2){margin: 0 0.3rem;} */
	.micM label.on,.ccrTag label.on{color: #EB2C30;}
	.micM label.on i,.ccrTag label.on i{display: inline-block;height: 2px;width:0.8rem;background-color: #EB2C30;position: absolute;bottom: 0;left: 0.38rem;}
	.ccrTag label.on i{left: 1.3rem;}
	.mdM{text-align: center;}
	.micMsg{padding-top: 0.1rem;height: 1.84rem;}
	.micMsg label{display: inline-block;padding: 0.15rem;font-size: 0.24rem;border-radius: 3px;margin-right: 0.3rem;margin-bottom: 0.3rem;background-color: #F3F6F8;color: #666;}
	.micMsg label:last-child{margin-right: 0;}
	.micMsg label.on{background-color: #FDE9EA;color: #EB2C30;}
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
	.infoNone{text-align: center;margin-top: 0.4rem;color: #999;}

	.i-yhc{width: 100%;height: 100%;display: block;position: absolute;left: 0;top: 0;color: #fff;}
	.i-yhc label{background: #000;position: absolute;left: 0;top: 0;opacity: 0.6;z-index: 3;display: block;width: 100%;height: 100%;border-radius: 0.1rem;}
	p.yhc{position: absolute;top: 50%;margin-top: -1rem;left: 0;z-index: 4;padding: 0.4rem;font-size: 0.36rem;line-height: 1.8;}
	/** 商机列表为空 */
	.empty-shang-ji-wrap { margin: auto; display: flex; flex-direction: column; color: #999; font-size: 0.28rem; text-align: center; }
	.empty-shang-ji { display: block; margin-bottom: 0.49rem; width: 4.2rem; }
</style>
