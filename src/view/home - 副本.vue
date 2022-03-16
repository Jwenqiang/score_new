<template>
	<div class="home">
		<div class="top">
			<div class="swiper-warp">
<!-- 				<mt-swipe :auto="4000">
					<mt-swipe-item><a @click="$router.push({'name':'vcj'})"><img src="@/assets/static/banner-cj.png"/></a></mt-swipe-item>
					<mt-swipe-item><a @click="goFive"><img src="@/assets/img/banner0402.png"/></a></mt-swipe-item>
					<mt-swipe-item><a href="https://mp.weixin.qq.com/s/EO_Ne0RFct3ptAHoUlfOVg"><img src="@/assets/img/banner0406.png"/></a></mt-swipe-item>
					<mt-swipe-item><a @click="$router.push({name:'days',params:{id:'27'}})"><img src="@/assets/img/banner0222.jpg?v=1"/></a></mt-swipe-item>
					<mt-swipe-item><a @click="$router.push({name:'days',params:{id:'24'}})"><img src="@/assets/img/banner0413.jpg"/></a></mt-swipe-item>
					<mt-swipe-item><a @click="$router.push({name:'days',params:{id:'25'}})"><img src="@/assets/img/banner020501.jpg"/></a></mt-swipe-item>
				</mt-swipe> -->
				<nut-swiper
				    direction="horizontal"
				    :loop="true"
				    :canDragging="false"
				    :paginationVisible="true"
					:autoPlay="4000"
					 @slideChangeEnd="handleChange"
				>
<!-- 				<div  class="nut-swiper-slide gray" >
				    <a href="https://mp.weixin.qq.com/s/txNyuegIAJ6Y9o5CEgxaQg" @click="goPage('','','https://mp.weixin.qq.com/s/txNyuegIAJ6Y9o5CEgxaQg','2')"><img src="images/banner0117.png"/></a>
				</div> -->
				<div  class="nut-swiper-slide gray_1" >
					<a @click="goPage('days','24','days/24','2')"><img src="images/banner0106.jpg?v=1"/></a>
				</div>
<!-- 				<div  class="nut-swiper-slide gray" >
				    <a @click="goPage('days','321','days/321','1')"><img src="../assets/img/banner1025.jpg"/></a>
				</div>
				<div  class="nut-swiper-slide gray" >
				    <a href="https://mp.weixin.qq.com/s/ZlJu9YzmXmhT8q-I-fMgBg" @click="goPage('','','https://mp.weixin.qq.com/s/ZlJu9YzmXmhT8q-I-fMgBg','2')"><img src="images/banner1130.jpg"/></a>
				</div> -->
<!-- 				<div  class="nut-swiper-slide gray" >
				    <a href="https://mp.weixin.qq.com/s/6T75RV6uPknG4UCNK9pyHg" @click="goPage('','','https://mp.weixin.qq.com/s/6T75RV6uPknG4UCNK9pyHg','4')"><img src="images/banner1018.jpg"/></a>
				</div> -->
				<div  class="nut-swiper-slide gray_1" >
				    <a @click="goPage('rules','','rules','3')"><img src="../assets/img/banner_zj.jpg"/></a>
				</div>
<!-- 				<div  class="nut-swiper-slide gray" >
				    <a href="https://mp.weixin.qq.com/s/oIL_NKl1OF7qJHoloGYiXg" @click="goPage('','','网络王','6')"><img src="images/banner0917.jpg"/></a>
				</div> -->
					<div  class="nut-swiper-slide gray" >
					    <a @click="goPage('houseList','','houseList','4')"><img src="@/assets/static/banner-bz.png"/></a>
					</div>
				    <div  class="nut-swiper-slide gray" >
				        <a @click="goPage('days','30','days/30','5')"><img src="@/assets/static/banner0531.png"/></a>
				    </div>
				    <div  class="nut-swiper-slide gray_1" >
				        <a @click="goPage('days','27','days/27','6')"><img src="@/assets/img/banner0222.jpg?v=1"/></a>
				    </div>
				</nut-swiper>
			</div>
		</div>
		<div class="hTag">
			<div class="htL" @click="goIcon('houseList','竞拍房源Icon','(1,1)')">
				<p><img src="../assets/img/h-fy.png"/></p>
				<p>竞拍房源</p>
			</div>
			<div class="htL" @click="goIcon('houseListSchool','竞拍学校Icon','(1,2)')">
				<p><img src="../assets/img/h-xx.png"/></p>
				<p>竞拍学校</p>
			</div>
			<div class="htL" @click="goIcon('shareCenter','分享中心Icon','(1,3)')">
				<p><img src="../assets/img/h-hb.png"/></p>
				<p>分享中心</p>
			</div>
			<div class="htL" @click="goIcon('record','竞拍记录Icon','(1,4)')">
				<p><img src="../assets/img/h-jl.png"/></p>
				<p>竞拍记录</p>
			</div>
		</div>
		<div class="hBox">
<!-- 			<button @click="setModule(2)" style="border: 1px solid #000;margin: 20px auto;display: block;padding: 5px 20px;">测试弹框2</button>
			<button @click="setModule(4)" style="border: 1px solid #000;margin: 20px auto;display: block;padding: 5px 20px;">测试弹框4</button>
			<button @click="setModule(3)" style="border: 1px solid #000;margin: 20px auto;display: block;padding: 5px 20px;">测试弹框3</button>
			<button @click="setModule(1)" style="border: 1px solid #000;margin: 20px auto;display: block;padding: 5px 20px;">测试弹框1</button> -->
			<div class="clear h-tip" @click="$router.push({'name':'message'})">
				<label>消息<i v-if="msg.totalUnRead>0&&msg.totalUnRead<100">{{msg.totalUnRead}}</i><i v-else-if="msg.totalUnRead>99">99+</i></label>
				<span v-if="msg.firstUnReadTitle">{{msg.firstUnReadTitle}}</span>
				<span v-else>暂时没有新的消息哦~</span>
			</div>
			<div class="ltitle">
				<span></span>
				赚元宝
			</div>
			<div class="sign">
				<div class="clear signT">
					<div class="stL">
						<template v-if="signText&&isSign>0">
							<h4>已签到{{isSign}}天</h4>
							<p>{{signText}}</p>
						</template>
						<template v-else-if="signText&&isSign==0">
							<h4>您还没有签到哦</h4>
							<p>连续签到有惊喜元宝奖励</p>
						</template>
					</div>
					<div class="stR">
						<template v-if="signText">
							<mt-button type="primary" @click="setSign" v-if="nowSign==false">签到</mt-button>
							<mt-button type="primary" style="opacity: 0.7;" v-else>已签到</mt-button>
						</template>
						<template v-else>
							<mt-button type="primary" style="opacity: 0.7;">签到</mt-button>
						</template>
					</div>
				</div>
				<div class="signM">
					<nut-scroller :scrollTo="signNum" @scrollToCbk="signScrol">
					<div slot="list" class="nut-hor-list-item">
						<img src="../assets/static/qd1.png" v-if="isSign<1"/>
						<img src="../assets/static/qd1-1.png" v-else/>
						<p>第1天</p>
					</div>
					<div slot="list" class="nut-hor-list-item">
						<img src="../assets/static/qd2.png" v-if="isSign<2"/>
						<img src="../assets/static/qd2-1.png" v-else/>
						<p>第2天</p>
					</div>
					<div slot="list" class="nut-hor-list-item">
						<img src="../assets/static/qd3.png" v-if="isSign<3"/>
						<img src="../assets/static/qd3-1.png" v-else/>
						<p>第3天</p>
					</div>
					<div slot="list" class="nut-hor-list-item">
						<img src="../assets/static/qd4.png" v-if="isSign<4"/>
						<img src="../assets/static/qd4-1.png" v-else/>
						<p>第4天</p>
					</div>
					<div slot="list" class="nut-hor-list-item">
						<img src="../assets/static/qd5.png" v-if="isSign<5"/>
						<img src="../assets/static/qd5-1.png" v-else/>
						<p>连签奖</p>
					</div>
					<div slot="list" class="nut-hor-list-item">
						<img src="../assets/static/qd6.png" v-if="isSign<6"/>
						<img src="../assets/static/qd6-1.png" v-else/>
						<p>第6天</p>
					</div>
					<div slot="list" class="nut-hor-list-item">
						<img src="../assets/static/qd7.png" v-if="isSign<7"/>
						<img src="../assets/static/qd7-1.png" v-else/>
						<p>第7天</p>
					</div>
					<div slot="list" class="nut-hor-list-item">
						<img src="../assets/static/qd8.png" v-if="isSign<8"/>
						<img src="../assets/static/qd8-1.png" v-else/>
						<p>第8天</p>
					</div>
					<div slot="list" class="nut-hor-list-item">
						<img src="../assets/static/qd9.png" v-if="isSign<9"/>
						<img src="../assets/static/qd9-1.png" v-else/>
						<p>第9天</p>
					</div>
					<div slot="list" class="nut-hor-list-item">
						<img src="../assets/static/qd10.png" v-if="isSign<10"/>
						<img src="../assets/static/qd10-1.png" v-else/>
						<p>连签奖</p>
					</div>
					<div slot="list" class="nut-hor-list-item">
						<img src="../assets/static/qd11.png" v-if="isSign<11"/>
						<img src="../assets/static/qd11-1.png" v-else/>
						<p>第11天</p>
					</div>
					<div slot="list" class="nut-hor-list-item">
						<img src="../assets/static/qd12.png" v-if="isSign<12"/>
						<img src="../assets/static/qd12-1.png" v-else/>
						<p>第12天</p>
					</div>
					<div slot="list" class="nut-hor-list-item">
						<img src="../assets/static/qd13.png" v-if="isSign<13"/>
						<img src="../assets/static/qd13-1.png" v-else/>
						<p>第13天</p>
					</div>
					<div slot="list" class="nut-hor-list-item">
						<img src="../assets/static/qd14.png" v-if="isSign<14"/>
						<img src="../assets/static/qd14-1.png" v-else/>
						<p>第14天</p>
					</div>
					<div slot="list" class="nut-hor-list-item">
						<img src="../assets/static/qd15.png" v-if="isSign<15"/>
						<img src="../assets/static/qd15-1.png" v-else/>
						<p>连签奖</p>
					</div>
					<div slot="list" class="nut-hor-list-item">
					</div>
					</nut-scroller>
				</div>
			</div>
			
<!-- 			<div class="newMore" @click="$router.push({'name':'way',params:{'tab':4}})">
				<img src="../assets/img/icon-new.png"/>新手大礼包
			</div> -->
			<div class="newP clear">
				<div class="newP1" @click="goTask('way','3','way','1','福利任务banner')"></div>
				<div class="clear newD">
					<div class="newP2" @click="goTask('way','4','way','2','新手任务banner')"></div>
					<div class="newP3" @click="goTask('way','2','way','3','每日任务banner')"></div>
				</div>
			</div>
			<div class="ltitle">
				<span></span>
				广告位
			</div>
			<div class="newDay">
				<div class="nd1" @click="$router.push({'name':'houseList',params:{'tab':1}})"></div>
				<div class="nd2" @click="$router.push({'name':'houseList',params:{'tab':3}})"></div>
				<div class="nd3" @click="$router.push({'name':'houseList',params:{'tab':4}})"></div>
				<div class="nd4" @click="$router.push({'name':'houseList',params:{'tab':2}})"></div>
			</div>

		</div>
		<foot tab1='1'></foot>
		<div class="showModel modelMsg" v-if="isShowTip==true">
		  <div class="bj"></div>
		  <div class="showMsg">
		    <label class="modelClose" @click="isShowTip=false"></label>
			<p class="homeTip">很遗憾，昨天签到中断了。快去签到领元宝吧，第<span>5天</span>即可拿连签奖哦！</p>
			<mt-button type="primary" class="hmBtn" @click="setSign()">立即签到</mt-button>
		  </div>
		</div>

		<div class="sModel mMsg"  v-if="isNew">
		  <div class="bj" @click="isNew=false"></div>
		  <div class="sMsg tipMsg" v-if="yes">
			  <h5>{{tipList.SecondQuDaoName}}奖励已到账</h5>
			  <p class="smallTip">（可在我的-元宝明细中查看）</p>
			  <p class="pNum"><strong>{{tipList.AddYuanBao}}</strong> 元宝</p>
			  <button class="tipBtn" @click="setOld">我知道了</button>
		  </div>
		  <div class="bMsg" @click="isNew=false" v-else>
		  </div>
		</div>
<!-- 		<div class="sModel mMsg" v-if="readMsg && isApp">
		  <div class="bj" @click="readMsg=false"></div>
		  <div class="bRead" @click="setCook()">
		  </div>
		</div> -->
		<!-- 签到成功 -->
		<div class="sModel mMsg" v-show="signed">
		  <div class="bj" @click="signed=false"></div>
		  <!-- <label class="sclose" @click="signed=false"></label> -->
		  <div class="bRead">
				<h3>{{sucText}}</h3>
				<p>+{{sucYb}}元宝</p>
				<button @click="signed=false">我知道啦</button>
		  </div>
		</div>
		<!-- 图片弹窗 -->
		<div class="sModel mMsg" v-show="getIder">
		  <div class="bj" @click="getIder=false"></div>
			<label class="sclose" @click="getIder=false"></label>
		  <div class="bRead iderBj" @click="setLocal">
				<a @click="$router.push({name:'hb',query:{'id':3}})" style="width: 100%;height: 100%;display: block;"></a>
		  </div>
		</div>
<!-- 		<div class="fixR" @click="$router.push({name:'houseList'})">
			<img src="../assets/static/icon-week.png"/>
		</div> -->
<!-- 		<div class="fixR1" @click="$router.push({name:'vcj'})" v-if="inApp==false">
			<img src="../assets/static/icon-rcj.png"/>
		</div> -->
		<!-- 回馈活动弹窗 :class="addCar?'animationCar':''"-->
<!-- 			<div class="hkShow">
				<div class="hkbj" v-if="moduleNum>-1" @click="moduleNum=-1"></div>
				<Module :showOn="moduleNum" :prizeName="prizeName" @changeNum="changeModule"></Module>
			</div> -->
			<!-- 领取成功弹窗 -->
<!-- 			<div class="hkShow" :class="addCar?'animationCar':''">
				<div class="hkbj" v-if="addCarr" @click="addCar=false"></div>
				<div class="giveMsg" @click="$router.push({'name':'myPrize'})">
				</div>
			</div> -->
	</div>
</template>

<script>
	import Vue from 'vue';
	// import NoticeBar from '@nutui/nutui/dist/packages/noticebar/noticebar.js';  // 加载构建后的JS
	// import Swiper from '@nutui/nutui/dist/packages/swiper/swiper.js';  // 加载构建后的JS
	// import '@nutui/nutui/dist/packages/noticebar/noticebar.css';  //加载构建后的CSS
	// import '@nutui/nutui/dist/packages/swiper/swiper.css';  //加载构建后的CSS
	// NoticeBar.install(Vue);
	// Swiper.install(Vue);
	// 京东框架2.X
	import nutUI from '@nutui/nutui/dist/nutui.min.js';  // 加载构建后的JS
	import '@nutui/nutui/dist/nutui.min.css';  //加载构建后的CSS
	nutUI.install(Vue);
	import Foot from '@/components/foot.vue'
	import Module from '@/components/module.vue'
	import { Toast,Indicator } from 'mint-ui';
	import {mapState, mapMutations, mapActions, mapGetters} from 'vuex'
	import {
	  uToken,
	} from "@/global/token.js";
	export default{
		name: 'home',
		data(){
			return{
				publicPath: process.env.BASE_URL,
				header_token:{"token": uToken()},
				signList:"",
				signText:"",
				isSign:0,
				nowSign:false,
				isShowTip:false,
				isApp:false,
				jjrHouse:"",
				yes:true,
				isNew:false,
				tipList:"",
				tipId:"",
				shareCode:"",
				readMsg: true,
				msg:"",
				inApp:false,
				// showOn:-1,
				// coverImage:require("../../public/model/xfImg.png"),
				addCar:false,
				moduleNum:-1,
				prize:"",
				prizeName:"45元礼包",
				runNum:Math.random(),
				prizeId:"",
				signed:false,
				signNum:1,
				sucText:"",
				sucYb:"",
				disID:"没有值",
				getIder:false
				// showNew:false
			}
		},
		computed: {
			...mapState(['hasLogin','userInfo']),//判断是否已经登录
		},
		created() {
			if(new Date().getDate()==15&& new Date().getHours()>6){
				this.getIder=true
			}
			if(sessionStorage.getItem('model')){
				this.getIder=false
			}
			if(localStorage.getItem("readHome")){
				this.readMsg=false;
			}

			// this.$sensors.setProfile({email:'632795201@qq.com'}); 设置用户属性
		},           
		mounted(){
			var cook=this.getCookie("sensorsdata2015jssdkcross");
			cook=decodeURIComponent(cook);
			cook=JSON.parse(cook);
			console.log(cook.distinct_id);
			
			if(navigator.userAgent.indexOf('aplus') > -1){
				this.inApp=true
				this.isApp=true
			}
			document.title="首页";
			var u = navigator.userAgent
			if(u.indexOf('aplus') < 0){
				this.getSign()
			}else{
				this.isApp=true;
				this.inApp=true;
				if(this.$route.query.token){
					var t=JSON.stringify({token:this.$route.query.token});
					localStorage.setItem("userInfo",t);
					this.getSign(this.$route.query.token)
				}else{
					this.getSign()
				}
			}
			// this.getJjr();
			this.getTip();
			this.getMsg();
			 // setTimeout(()=>{
				//  this.getShareCode();
			 // },500)
			 // 中奖查询
			 // if(this.runNum<0.45){
				//  this.getPrize()
			 // }
			 
		},
		components: {
		  Foot,
			Module
		},
		watch:{
			'$route' (to, from) {
			   if (to.name === 'home') {
				  this.getSign();
				  // this.getTip();
			    }
			 }

		},
		methods:{
			setLocal(){
				sessionStorage.setItem('model',"true");
			},
			getCookie(key){
					var cookies=document.cookie;
					if(cookies.length>0){
							var start=cookies.indexOf(key+"=");
							if(start<0){
									return "";
							}
							var end =cookies.indexOf(";",start);
							if(end<0){
									end=cookies.length;
							}
							return cookies.substring(start+key.length+1,end);
					}
			},
			// icon跳转 神策
			goIcon(r,n,p){
				this.$router.push({'name':r});
				this.$sensors.track('sc_click_icon', {
					sc_business_type:'other',
					sc_current_page:"首页",
					sc_icon_name:n,
					sc_icon_position:p
				});
			},
			signScrol(n){
				this.signNum=n
			},
			// banner跳转
			goPage(name,id,title,idx){
				let url=""
				if(title.indexOf('http')>-1){
					url=title;
				}else{
					url="https://sz.centanet.com/partner/house/aplus/#/"+title;
				}
				let scJson={
					sc_business_type:"other",
					sc_current_page:"首页",
					sc_banner_name:"广告位banner",
					sc_banner_sort:`(1,${idx})`,
					sc_banner_jump_url:url,
				};
				this.$sensors.track('sc_click_banner', scJson);
				if(name){
					this.$router.push({'name':name,params:{'id':id}})
				}
			},
			// banner跳转
			goTask(name,id,title,idx,n){
				let	url="https://sz.centanet.com/partner/house/aplus/#/"+title;
				let scJson={
					sc_business_type:"other",
					sc_current_page:"首页",
					sc_banner_name:n,
					sc_banner_sort:`(1,${idx})`,
					sc_banner_jump_url:url,
				};
				this.$sensors.track('sc_click_banner', scJson);
				if(name){
					this.$router.push({'name':name,params:{'tab':id}})
				}
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
			handleChange(n){
			},
			goFive(){
				if(this.inApp){
					this.$router.push({name:'vfive'})
				}
			},
			getMsg(){
				return new Promise((resolve)=>{
						this.$axios({
							method:"get",
							url:"/Message/IndexIcon?v="+Math.random()*10,
							headers:this.header_token,
						})
						.then(res=>{
							console.log(res);
							resolve(res);
							if(res.data.code==0){
								this.msg=res.data.data
							}else{
								Toast(res.data.msg);
							}
						})
						.catch(error=>{
							Toast("网络错误，请稍后再试");
						})
				})
			},
			setCook(){
        // 标记每个用户只弹一次
        // 当前未区分用户，标记已读后，登录其他用户会不再显示
				this.readMsg=false;
				localStorage.setItem("readHome", 'true')
				this.$router.push({'name':'shareCenter'})
			},
			// getCook(){
			// 	var nowDay=new Date().getDate();
			// 	if(localStorage.getItem("read")){
			// 		if(nowDay>localStorage.getItem("read")){
			// 			this.readMsg=true
			// 		}else{
			// 			this.readMsg=false
			// 		}
			// 	}
			// },
			setOld(){
				Indicator.open();
				return new Promise((resolve)=>{
						this.$axios({
							method:"get",
							url:"/My/UpdateMessageStatus",
							headers:this.header_token,
							params:{
								messageId:this.tipId
							}
						})
						.then(res=>{
							console.log(res);
							resolve(res);
							if(res.data.code==0){
								if(res.data.data.IsSuccess==true){
									this.isNew=false
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
			toastTip(){
				Toast('功能待开放~');
			},
			getTip(){
				return new Promise((resolve)=>{
						this.$axios({
							method:"get",
							url:"/My/GetJiFenMessageList?v="+Math.random()*10,
							headers:this.header_token,
						})
						.then(res=>{
							console.log(res);
							resolve(res);
							if(res.data.code==0){
								if(res.data.data.length>0){
									this.isNew=true
									this.tipList=res.data.data[0]
									this.tipId=res.data.data[0].Id
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
			getSign(t){
				if(this.isApp&&t){
					this.header_token={"token": t}
				}
				return new Promise((resolve)=>{
						this.$axios({
							method:"get",
							url:"/My/GetSignList?v="+Math.random()*10,
							headers:this.header_token
						})
						.then(res=>{
							console.log(res);
							if(res.data.code==0){
								this.signText=res.data.data.DayText
								this.signList=res.data.data.ListSign
								this.isSign=res.data.data.DayIndex
								this.nowSign=res.data.data.IsTodaySigned,
								this.isShowTip=res.data.data.IsShowTips;
								// 滑动条
								if(res.data.data.DayIndex>5&&res.data.data.DayIndex<11){
									this.$nextTick(()=>{
										this.signScrol(-201)
									}) 
								}else if(res.data.data.DayIndex>10){
									this.$nextTick(()=>{
										this.signScrol(-409)
									}) 
								}else{
									this.$nextTick(()=>{
										this.signScrol(1)
									}) 
								}
								
							}else{
								Toast(res.data.msg);
								if(res.data.code==401){
									// 重新登陆
									this.$store.dispatch('logout');
									setTimeout(()=>{
										this.$router.push({name:"login"});
									},500)
								}
							}
							resolve(res);
						})
						// .catch(error=>{
						// 	Indicator.close();
						// 	Toast("网络错误，请稍后再试");
						// })
				})
			},
			setSign(){
				Indicator.open({
				  spinnerType: 'triple-bounce'
				});
				let rNum=Math.random();
				if(rNum<0.4){
						this.getPrize()
				}
				this.isShowTip=false;
				return new Promise((resolve)=>{
						this.$axios({
							method:"post",
							url:"/My/Sign",
							headers:this.header_token
						})
						.then(async (res)=>{
							console.log(res);
							resolve(res);
							if(res.data.code==0){
								if(res.data.data.IsSuccess){
									this.sucText=res.data.data.Reamark;
									this.sucYb=res.data.data.SuccessYuanBao;
									this.signed=true;
									await this.getSign();
									this.$sensors.track('sc_check_in', {
										sc_consecutive_check_in_days:this.isSign
									});
								}else{
									Toast("签到失败，请稍后重试");
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
			// getJjr(){
			// 	Indicator.open();
			// 	return new Promise((resolve)=>{
			// 			this.$axios({
			// 				method:"get",
			// 				url:"/ZhongyuanHouse/GetStaffPostEstatesForDetail?v="+Math.random()*10,
			// 				headers:this.header_token,
			// 				params:{
			// 					pageSize:2
			// 				}
			// 			})
			// 			.then(res=>{
			// 				console.log(res);
			// 				if(res.data.code==0){
			// 					this.jjrHouse=res.data.result.list.Result
			// 				}else{
			// 					Toast(res.data.msg);
			// 				}
			// 				Indicator.close();
			// 				resolve(res);
			// 			})
			// 			.catch(error=>{
			// 				Indicator.close();
			// 				Toast("网络错误，请稍后再试");
			// 			})
			// 	})
			// }
		}
	}
</script>

<style scoped>
	.top .mint-cell-wrapper{border: 1px solid #A3866C;}
	.top .swiper-warp{
		width: 100%;
		height: 7.5rem;
	}
	.top .nut-swiper{height: 3rem;}
	.top .nut-swiper a{display: block;width: 100%;height: 3rem;}
	.nut-swiper .nut-swiper-pagination .swiper-pagination-bullet.active{
		background: #fff;
	}
/* 	.top .mint-swipe-indicators{
		bottom: 0.2rem;
		left: 86%;
		width: 1.5rem;
		text-align: right;
	}
	.top .mint-swipe-indicator{
		background: #fff;
		opacity: 0.6;
		width: 0.2rem;
		height: 0.04rem;
		border-radius: 0.04rem;
	}
	.top .mint-swipe-indicator.is-active{
		background: #fff;
		opacity: 1;
	} */
	.home{/* padding: 0.2rem 0.34rem 1.2rem; */padding-bottom: 1rem;background-color: #F5f5f5;}
	.top{height: 3rem;}
	.top img{height: 100%;display: block;width: 100%;}
	.top .swiper-warp{height: 100%;}
	.hTag{width: 100%;background-color: #fff;margin: 0 0 0.3rem;display: flex;padding: 0.3rem 0;}
	.htL{flex: 1;text-align: center;color: #333;font-size: 0.26rem;position: relative;}
	.htL img{width: 0.9rem;display: inline-block;}
	.htL p:first-child{margin-bottom: 0.1rem;}
	.hBox{padding: 0 0.3rem;}
	.ltitle{width: 100%;height: 0.8rem;line-height: 0.8rem;font-size: 0.32rem;font-weight: 500;}
	.ltitle span{display: block;width: 4px;height: 0.3rem;float: left;background-color: #F4472D;margin-right: 0.2rem;margin-top: 0.25rem;}
	.sign {padding: 0.3rem 0.2rem;background-color: #fff;margin-bottom: 0.3rem;margin-top: 0.1rem;border-radius: 0.1rem;box-shadow: 0px 2px 6px 2px rgba(0, 0, 0, 0.06);}
	.signT{margin-bottom: 0.36rem;height: 0.8rem;}
	.stL{width: 70%;float: left;height: 0.8rem;line-height: 0.8rem;}
	.stL h4{margin-bottom: 0.2rem;line-height: 1;font-size: 0.36rem;font-weight: 550;color: #333;}
	.stL p{line-height: 1;color: #666;font-size: 0.28rem;}
	.stR{width: 30%;float: left;text-align: right;padding-top: 0.1rem;}
	.stR button{
		width:1.7rem;
		height:0.65rem;
		background: linear-gradient(134deg, #FB6F52 0%, #F3240A 100%);
		border-radius:0.4rem;
		font-size: 0.34rem;
		line-height: 0.63rem;
		padding-bottom: 0.3px;
	}
	.signM{display: block;width: 100%;white-space: nowrap;overflow: auto;}
	.smIcon{width: 0.65rem;text-align: center;color: #999;font-size: 0.24rem;display: inline-block;}
	.smIcon img{height: 0.56rem;width: 0.65rem;}
	.newMore{width: 100%;height: 0.8rem; line-height: 0.8rem;border-radius: 0.4rem;padding: 0 0.4rem;background: #fff url(../assets/img/n-right.png) 96% center no-repeat;background-size: 0.36rem;margin-bottom: 0.3rem;}
	.newMore img{width: 0.5rem;margin-right: 0.2rem;vertical-align: -6px;}
	.newP{margin-bottom: 0.3rem;}
	.newTitle{width: 100%;height: 0.6rem;line-height: 0.6rem;margin-bottom: 0.2rem;}
	.newTitle label{float: left;color: #333;font-size: 0.32rem;font-weight: 500;}
	.newTitle span{float: right;width: 4rem;text-align: right; display: block;height: 100%;line-height: 0.6rem;font-size: 0.24rem;color: #999;padding-right: 0.3rem;background: url(~@/assets/img/icon-right.png) right center no-repeat;background-size: 0.12rem;}
	.newP1{width: 3.35rem;height: 3.05rem;background: url(../assets/img/newp1.png) center no-repeat;background-size: 100%;float: left;}
	.newD{width: 3.35rem;height: 1.45rem;float: right;}
	.newD div{width: 3.35rem;height: 1.45rem;margin-bottom: 0.15rem;}
	.newD .newP2{margin-right: 0.18rem;background: url(../assets/img/newp2.png)  center no-repeat;background-size: 100%;}
	.newD .newP3{background: url(../assets/img/newp3.png)  center no-repeat;background-size: 100%;}
	.newDay{/* padding: 0.3rem 0.2rem;background: #fff; */margin-bottom: 0.3rem;}
	.ndL{padding: 0.12rem 0 0.2rem 1.2rem;height: 1.6rem;}
	.ndL1{background: url(../assets/img/ndl1.png) left center no-repeat;background-size: 0.8rem;}
	.ndL2{background: url(../assets/img/ndl2.png) left center no-repeat;background-size: 0.8rem;}
	.ndL3{background: url(../assets/img/ndl3.png) left center no-repeat;background-size: 0.8rem;}
	.ndL4{background: url(../assets/img/ndl4.png) left center no-repeat;background-size: 0.8rem;}
	.ndList{border-bottom: 1px solid #ededed;padding: 0.2rem 0 0.2rem;}
	.ndLeft{float: left;}
	.ndLeft h5{margin-bottom: 0.1rem;font-size: 0.34rem;}
	.ndLeft p{color: #FE5B48;}
	.ndRight{float: right;width: 2rem;text-align: right;}
	.ndRight button{
		margin-top: 0.12rem;
		width:1.6rem;
		height:0.6rem;
		background:linear-gradient(180deg,rgba(253,147,115,1) 0%,rgba(253,76,60,1) 100%);
		border-radius:0.08rem;
		font-size: 0.26rem;
		padding: 0;
	}
	.nd1{width: 100%;height: 2.16rem;background: url(../assets/img/nd1.png) center no-repeat; background-size: 100%;margin-top: 0.2rem;}
	.nd2{width: 100%;height: 2.16rem;background: url(../assets/img/nd2.png) center no-repeat;background-size: 100%;margin-top: 0.2rem;}
	.nd3{width: 100%;height: 2.16rem;background: url(../assets/img/nd3.png) center no-repeat;background-size: 100%;margin-top: 0.2rem;}
	.nd4{width: 100%;height: 2.16rem;background: url(../assets/img/nd4.png) center no-repeat;background-size: 100%;margin-top: 0.2rem;}
	.flSection{background-color: #fff;padding: 0.3rem 0.2rem 0.4rem;margin-bottom: 0.3rem;}
	.flL{width: 100%;height: 2.6rem;display: flex;justify-content: space-between;}
	.flli{width: 2rem;padding-top: 2rem;}
	.flli1{background: url(../assets/img/flli1.png) center top no-repeat;background-size: 100%;}
	.flli2{background: url(../assets/img/flli2.png) center top no-repeat;background-size: 100%;}
	.flli3{background: url(../assets/img/flli3.png) center top no-repeat;background-size: 100%;}
	.flli h5{font-size: 0.28rem;}
	.flli p{font-size: 0.22rem;color: #999;}
	.ndGg{background: url(../assets/img/gg.png) left center no-repeat;background-size: 0.8rem;}
	.jjrSection{background-color: #fff;padding: 0.3rem 0.2rem;}
	.jjrL{padding: 0.3rem 0;border-bottom: 1px solid #ededed;}
	.jjrL:last-child{border: 0;}
	.jrl{width: 2.4rem;float: left;margin-right: 0.2rem;}
	.jrr{float: left;width: 3.82rem;}
	.jrr h4{
		    font-weight: bolder;
		    color: #203140;
		    font-size: 0.3rem;
		    -webkit-line-clamp: 2;
		    text-overflow: ellipsis;
		    display: -webkit-box;
		    -webkit-box-orient: vertical;
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
	}
	.showModel{
	  position: fixed;
	  width: 100%;
	  height: 100%;
	  z-index: 90;
	}
	.bj{position: fixed;background: #000;opacity: 0.5;width: 100%;height: 100%;left: 0;top: 0;z-index: 91;}
	.home .showMsg{font-size: 16px; position: fixed;left: 50%;top: 50%;transform: translate(-50%,-50%);width: 90%;height: 4.2rem; background: #fff;z-index: 92;padding: 0.8rem 0.7rem;border-radius: 8px;}
	.modelClose{position: absolute;right: 0rem;top: 0rem;cursor: pointer;width: 0.8rem;height: 0.8rem;display: block;background: url(../assets/img/close.png) center no-repeat;background-size: 0.27rem;}
	.moudelT{font-size: 0.34rem;font-weight: bold;text-align: center;margin-bottom: 0.6rem;}
	.moudelT img{width: 0.5rem;margin-right: 0.1rem;vertical-align: middle;}
	.showMsg p{margin-bottom: 0.3rem;}
	.showMsg p label{font-size: 0.32rem;font-weight: bold;}
	.showMsg p span{font-size: 0.28rem;color: #666;}
	.showMsg p i{font-style: normal;display: inline-block;width: 0.6rem;height: 0.6rem;border: 1px solid #333;border-radius: 50%;text-align: center;line-height: 0.5rem;font-size: 0.4rem;}
	.showMsg p strong{font-size: 0.36rem;margin: 0 0.3rem;font-weight: 500;color: #F45048;}
	.homeTip{color: #333;font-size: 0.32rem;line-height: 1.6;}
	p.homeTip span{color: #F45048;font-size: 0.34rem;}
	.hmBtn{width: 3rem;height: 0.8rem;margin: 0.6rem auto 0;display: block;background-color: #F45048;border-radius: 0.4rem;}

	.sModel{
/* 	  position: fixed;
	  width: 100%;
	  height: 100%;
	  z-index: 90; */
	  position: relative;
	}
	.bj{position: fixed;background: #000;opacity: 0.5;width: 100%;height: 100%;left: 0;top: 0;z-index: 91;}
	.sMsg{
		font-size: 16px; position: fixed;left: 50%;top: 50%;margin: -4.5rem 0 0 -3.75rem; width: 7.5rem;height: 7.2rem; background: url(../assets/img/tipBj.png) center no-repeat;background-size: 5rem; z-index: 92;padding: 0.8rem 0.7rem;border-radius: 8px;
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
	 	0%{transform: translateY(-600px);}
	 	100%{transform: translateX(0);}
	 }
/* 	 .bRead{
		 font-size: 16px; position: fixed;left: 50%;top: 50%;margin: -4.5rem 0 0 -3.75rem; width: 7.5rem;height: 7.2rem; background: url(../assets/img/fiveTc.png) center bottom no-repeat;background-size: 5.72rem; z-index: 92;;
		 animation: bh 0.5s 1 forwards;
	 } */
/* 	 .bRead{
	 		 font-size: 16px; position: fixed;left: 0;top: 50%;margin: -4.8rem 0 0 0; width: 7.5rem;height: 9.5rem; background: url(../../public/img/showShare.png?v=2) center bottom no-repeat;background-size: 7.5rem; z-index: 92;;
	 		 animation: bh 0.5s 1 forwards;
	 } */
	 .bRead{
	 		 font-size: 16px; position: fixed;left: 0;top: 50%;margin: -4.8rem 0 0 0; width: 7.5rem;height: 7.5rem; background: url(../assets/img/signSuc.png) center bottom no-repeat;background-size: 6.64rem; z-index: 92;;
	 		 animation: bh 0.5s 1 forwards;
			 padding: 2.5rem 0 0.72rem;
			 text-align: center;
	 }
	 .bRead h3{
		 font-size: 0.6rem;
		 color: #F4601B;
		 font-weight: 500;
		 margin-bottom: 0.2rem;
	 }
	 .bRead p{
		 font-size: 0.48rem;
		 color: #F41B1B;
	 }
	 .bRead button{
		 width: 3.3rem;
		 height: 0.98rem;
		 background: url(../assets/img/signBtn.png) center no-repeat;background-size: 100%; 
		 margin-top: 1.6rem;
		 padding-bottom: 0.2rem;
		 font-size: 0.36rem;
		 color: #611207;
		 font-weight: 550;
	 }
.mClose{position: absolute;right: 1.4rem;top: 1rem;cursor: pointer;width: 0.8rem;height: 0.8rem;display: block;background: url(../assets/img/nClose.png) center no-repeat;background-size: 0.27rem;}
.tipMsg{text-align: center;padding-top: 3.5rem;padding-right: 0.4rem;}
.tipMsg h5{font-size: 0.3rem;color: #fff;}
.smallTip{font-size: 0.22rem;margin-top: 0.05rem; margin-bottom: 0.1rem;color: #fff;}
.pNum{font-size: 0.3rem;color: #fff;margin-bottom: 0.2rem;}
.pNum strong{font-size: 0.7rem;}
.tipBtn{width: 2.5rem;height: 0.7rem;background-color: #fff;border-radius: 0.4rem;color: #F80000;font-size: 0.32rem;}
.fixR{position: fixed;top: 63%;right: 0;}
.fixR1{position: fixed;top: 76%;right: 0;}
.fixR img,.fixR1 img{width: 1.2rem;}
.h-tip{width: 100%;height: 0.6rem; line-height: 0.6rem;border-radius: 0.4rem;padding: 0.15rem 0.4rem;background: #fff url(../assets/img/n-right.png) 96% center no-repeat;background-size: 0.3rem;margin-bottom: 0.2rem;
box-shadow: 0px 2px 6px 2px rgba(0, 0, 0, 0.06);}
.h-tip label{display: inline-block;float: left;height: 0.3rem;line-height: 0.3rem;position: relative;}
.h-tip label i{
	font-style: normal;font-size: 0.2rem;font-weight: 300;border-radius: 3px;background-color: #FF0000;color: #fff;position: absolute;top: -0.1rem;left: 0.56rem;
	display: block;
			min-width: 0.3rem;
			max-width: 0.5rem;
	    height: 0.24rem;
	    text-align: center;
	    line-height: 0.24rem;
	}
.h-tip span{display: inline-block;width: 5rem;color: #999;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;border-left: 1px solid #999;height: 0.3rem;line-height: 0.3rem;margin-left: 0.3rem;padding-left: 0.2rem;float: left;font-size: 0.26rem;}
.sclose{display: block;width: 0.64rem;height: 0.64rem;position: fixed;bottom: 18%;left: 3.4rem;background: url(../assets/img/nClose.png) center no-repeat;background-size: 60%;z-index: 96;border: 1px solid #fff;border-radius: 50%;animation: bh 0.5s 1 forwards;}
.hsTip{font-size: 0.24rem;color: #F4472D;font-style: normal;position: absolute;right: 5px;top: -0.15rem;font-weight: bold;}

/* 回馈活动弹框 */
.popup-box{background: none;}
/* .hkShow{z-index: 99;} */
.hkBody{width: 362px;height: 363.5px;position: fixed;left: 50%;top: -100%;margin-top: -180px;margin-left: -181px;}
.hkG{width: 100%;height: 100%;background: url(../../public/model/xfg.png) center no-repeat;background-size: 100%;}
/* x信封 */
.hkMain{position: absolute;top:30px;left: 63px;width: 236.5px;height:264px;padding: 96px 33px 50px;background: url(../../public/model/xf.png) center no-repeat;background-size: 100%;}
.hkB{width: 347.5px;height: 327px;background: url(../../public/model/xfb.png) center no-repeat;background-size: 100%;position: absolute;top: 55px;left:0;}
.nut-luckycard{z-index: 9;position: absolute;
		top: 126px;
    left: 96px;
}
	.nut-content{color: #FFEB8B !important;font-weight: bold !important;}

.hkbj{width: 100%;height: 100vh;background-color: #000;opacity: 0.5;position: fixed;left: 0;top: 0;z-index: 10;}
.hk{opacity: 1;top: 50%;}
.hk .hkMain,.hk .nut-luckycard{animation: big 0.3s ease-in 1 forwards,swing 2s 0.5s ease-in infinite alternate;}
.hk .hkG,.hk .hkB{ opacity: 0;animation: fadeInBig 0.5s 0.3s ease-in 1 forwards;}
.hk .hkB{z-index: 8;}
.hk .hkG{animation: fadeInBig 1.5s 0.3s ease-in 1 forwards,rotateR 10s  0.1s linear infinite;}
@keyframes big{
	0%{transform: scale(0);}
	80%{transform: scale(1.01);}
	100%{transform: scale(1);}
}
@keyframes fadeInBig{
	0%{transform: scale(0);}
	20%{transform: scale(1.05);opacity: 0.5;}
	70%{transform: scale(0.95);opacity: 1;}
	100%{transform: scale(1);opacity: 1;}
}
@keyframes rotateR{
	from{transform: rotate(0);}
	to{transform: rotate(360deg);}
}
@keyframes swing {
	20% {
		-webkit-transform: rotate(5deg);
		transform: rotate(5deg)
	}

	40% {
		-webkit-transform: rotate(-5deg);
		transform: rotate(-5deg)
	}

	60% {
		-webkit-transform: rotate(5deg);
		transform: rotate(5deg)
	}

	80% {
		-webkit-transform: rotate(-5deg);
		transform: rotate(-5deg)
	}

	to {
		-webkit-transform: rotate(0deg);
		transform: rotate(0deg)
	}
}
/* 红包 */
.hkHb{
	width: 318.5px;height: 326px;background: url(../../public/model/hbB.png) center no-repeat;background-size: 100%;position: absolute;
	top: 23px;
	Z-INDEX: 8;
	left: 19px;
}
.hkHbM{
	position: absolute;top:60px;left: 79px;width: 210px;height:247px;padding: 96px 33px 50px;background: url(../../public/model/hb.png) center no-repeat;background-size: 100%;
}
.hkHbBtn{
	position: absolute;bottom:10px;left: 104px;width: 153px;height:113px;background: url(../../public/model/hbBtn.png) center no-repeat;background-size: 130px;
}
.hk .hkHbM{animation: slideInDown 0.3s ease-in 1 forwards,swing 2s 0.5s ease-in infinite alternate;}
.hk .hkHbBtn{opacity: 0;animation: fadeIn 0.5s 0.5s linear 1 forwards;z-index: 9;}
.hk .hkHb{opacity: 0;animation: fadeInBig 0.5s 0.2s ease-in 1 forwards;}
/*  */
/* .animationCar .hk{
	animation: over 0.5s ease-in-out 1 forwards;
}
.animationCar .hkbj{display: none;}
@keyframes over{
	from{transform: scale(1);}
	to{transform: scale(0);right: -375px;bottom: -400px;}
} */
.nut-hor-list-item{
	width: 0.98rem;
	text-align: center;color: #666;font-size: 0.24rem;display: inline-block;
}
.nut-hor-list-item img{width: 0.65rem;height: 0.8rem;margin-bottom: 0.1rem;}
.iderBj{
	background: url(../images/315.png) center bottom no-repeat;
	background-size: 5.6rem;
	margin-top: -4.6rem;
	padding: 0.5rem 0 3em;
}
</style>

