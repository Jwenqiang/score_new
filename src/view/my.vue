<template>
	<div class="my">
		<div class="clear myTop">
			<div class="mtSet" @click="$router.push({name:'set'})">
			</div>
			<div class="mtL">
				<label>
					<img :src="tx" onerror="this.src='https://sz.centanet.com/partner/house/userImg/tx_none.png'"/>
				</label>
				<span v-if="grade=='未评级'">
					<img src="images/svg/grad0.svg"/>
				</span>
				<span v-else-if="grade=='新秀'">
					<img src="images/svg/grad1.svg"/>
				</span>
				<span v-else-if="grade=='少侠'">
					<img src="images/svg/grad2.svg"/>
				</span>
				<span v-else-if="grade=='大侠'">
					<img src="images/svg/grad3.svg"/>
				</span>
				<span v-else-if="grade=='掌门'">
					<img src="images/svg/grad4.svg"/>
				</span>
				<span v-else-if="grade=='宗师'">
					<img src="images/svg/grad5.svg"/>
				</span>
				<span v-else-if="grade=='盟主'">
					<img src="images/svg/grad6.svg"/>
				</span>
			</div>
			<div class="mtR">
				<h3>
					<label>{{userInfo.EmpCnName}}<span>{{userInfo.EstateName}}</span></label>
				</h3>
				<p class="msecond" @click="show=true"><template v-if="userInfo.SignMessage"><label>{{userInfo.SignMessage}}</label></template><template v-else><label>暂无个人简介，点击增加</label></template> <span></span></p>
				<p class="msecond" v-if="userInfo.EstateAddress">{{userInfo.EstateAddress}}</p>
<!-- 				<div class="lineM"><span :style="'width:'+ lineW +'%;'"></span></div>
				<p class="lineTip" @click="$router.push({name:'czc'})"><span v-if="userInfo.JiFenEnable==150000">成长值150000，已升至最高级 <img src="../assets/img/m-right.png" width="6px"/></span><span v-else>成长值 {{userInfo.JiFenEnable}} 距离下一等级还差{{userInfo.NextLevelDistance}} <img src="../assets/img/m-right.png" width="6px"/></span></p> --> 
			</div>
			
			<div class="myYb">
				<div class="mybT" @click="$router.push({name:'yb'})">
					<p>元宝余额：<span>{{userInfo.YuanBaoEnable}}</span> </p>
				</div>
<!-- 				<span class="line-l"></span>
				<div class="mybT" @click="$router.push({name:'czc'})">
					<p>成长值</p>
					<span>{{userInfo.JiFenEnable}}</span>
				</div> -->
			</div>
		</div>
		<div class="myC">
			<div class="nineTop">
				<p>用户中心</p>
				<div class="nineC">
					<label @click="goIcon('record','竞拍记录','','','','(1,1)')">竞拍记录</label>
					<!-- <label @click="$router.push({name:'cars'})">收藏夹</label> -->
					<label @click="goFail">纠错有奖</label>
					<label @click="goIcon('message','消息中心','','','','(1,3)')">消息中心</label>
					<label @click="goDay">管理日报</label>
				</div>
			</div>
			<div class="nineTop">
				<p>分享中心</p>
				<div class="ninesC">
					<label @click="goIcon('hb','委卖海报','12','','','(2,0)')">委卖海报</label>
					<label @click="goIcon('hb','名片海报','0','','','(2,1)')">名片海报</label>
					 <!-- @click="$router.push({name:'hbHouse',query:{jjr:jjrNum,cityName:cityName}})" -->
					<label @click="goIcon('hbHouse','房源海报',jjrNum,'jjr',cityName,'(2,2)')">房源海报</label>
					<label @click="goIcon('hb','招聘海报','2','','','(2,3)')">招聘海报<!-- <span v-if="showZp"></span> --><!-- <i>new</i> --></label>
					<label @click="goIcon('hb','节日海报','3','','','(2,4)')">节日海报<!-- <span v-if="showJr"></span> --><!-- <i>new</i> --></label>
					<label @click="goIcon('hb','正能量海报','4','','','(3,1)')">正能量海报</label>
					<label @click="goIcon('hb','App下载海报','5','','','(3,2)')">App下载海报</label>
					<label @click="goIcon('hb','成交战报','7','','','(3,3)')">成交战报</label>
					<label @click="goIcon('hbZx','分享资讯',jjrNum,'jjr','','(3,4)')">分享资讯</label>
					<label @click="goIcon('schoolList','分享学校',jjrNum,'jjr','','(4,1)')">分享学校</label>
					<label @click="goIcon('hbHouseNew','新盘入市',jjrNum,'jjr','','(4,2)')">新盘入市</label>
					<label @click="goIcon('morning','早安分享','','','','(4,3)')">早安分享</label>
					<label @click="goIcon('hb','小贴士','11','','','(4,4)')">小贴士</label>
				</div>
			</div>
			<nut-popup v-model="show">
				<div class="myIntr">
					<div class="miTop">添加个人简介</div>
					<div class="miContent">
						<div><textarea maxlength="25" placeholder="最多25个字" v-model="myMsg"></textarea></div>
						<div class="miBtn">
							<label @click="show=false">取消</label>
							<label @click="setMsg">确定</label>
						</div>
					</div>
				</div>
			</nut-popup>
<!-- 			<div class="myList myList2" @click="$router.push({name:'way'})">
				<div class="clear mlAll">
					<label class="myliL">赚元宝</label>
					<label class="myliR">赚元宝，从这里开始</label>
				</div>
			</div>
			<div class="myList myList" @click="$router.push({name:'record'})">
				<div class="clear mlAll">
					<label class="myliL">竞拍记录</label>
					<label class="myliR">拍广告位 ，提升进线</label>
				</div>
			</div>
			<div class="myList myList9" @click="$router.push({name:'cars'})">
				<div class="clear mlAll">
					<label class="myliL">收藏夹</label>
					<label class="myliR">房源快捷竞拍入口</label>
				</div>
			</div>
			<div class="myList myList10" @click="$router.push({name:'message'})">
				<div class="clear mlAll">
					<label class="myliL">消息中心</label>
					<label class="myliR">通知提醒早知道</label>
				</div>
			</div>
			<div class="myList myList3" @click="$router.push({name:'program'})">
				<div class="clear mlAll">
					<label class="myliL">帮助中心</label>
					<label class="myliR">玩转元宝秘籍</label>
				</div>
			</div>
			<div class="myList myList4" @click="$router.push({name:'fail',query:{'userName':userInfo.CnName,'emNum':userInfo.EmpNo}})">
				<div class="clear mlAll">
					<label class="myliL">我要纠错</label>
					<label class="myliR">纠错有奖</label>
				</div>
			</div>	
			<div class="myList myList5">
				<div class="clear mlAll">
					<label class="myliL">充值中心</label>
					<label class="myliR">功能开发中，敬请期待</label>
				</div>
			</div>
			<div class="myList myList6">
				<div class="clear mlAll">
					<label class="myliL">转赠元宝</label>
					<label class="myliR">功能开发中，敬请期待</label>
				</div>
			</div>
			<div class="myList myList7">
				<div class="clear mlAll">
					<label class="myliL">商城</label>
					<label class="myliR">功能开发中，敬请期待</label>
				</div>
			</div>
			<div class="myList myList8" v-if="inApp==false" @click="$router.push({name:'set'})">
				<div class="clear mlAll">
					<label class="myliL">设置</label>
					<label class="myliR"></label>
				</div>
			</div> -->
<!-- 			<div class="logOut" @click="logOut">
				退出登录
			</div> -->
			<div class="logOut" v-if="userInfo.EstateName=='网络运营部'">
				<a href="https://sz.centanet.com/partner/house/test/aplus/">成长系统新功能测试</a>
				<a href="https://sz.centanet.com/partner/house/aplus/#/payList" style="margin-bottom: 0.4rem;">租房订单测试</a>
			</div>
		</div>
		<foot tab4='1'></foot>	
	</div>
</template>

<script>
	import Vue from 'vue';
	import { Toast,Indicator } from 'mint-ui';
	import {
	  uToken,
	} from "@/global/token.js";
	import Foot from '@/components/foot.vue';
	import Popup from '@nutui/nutui/dist/packages/popup/popup.js';  // 加载构建后的JS
	import '@nutui/nutui/dist/packages/popup/popup.css';  //加载构建后的CSS
	Popup.install(Vue);
	export default{
		name: 'my',
		// beforeRouteEnter(to,from,next){
		//     console.log(from)
		// 	if(from.name=='earn'){
		// 		next()
		// 	}else{
		// 		next({
		// 			name: 'home' 
		// 		});
		// 	}
		//     // next((vm)=>{ //参数vm就是当前组件的实例。
		//     //     console.log(vm)
		//     // })
		// },
		data(){
			return{
				header_token:{"token": uToken()},
				ccz:'20',
				chas:"480",
				userInfo:"",
				lineW:"0",
				tx:"",
				inApp:false,
				show:false,
				myMsg:"",
				jjrNum:"",
				hasTest:false,
				empArr:[],
				showZp:true,
				showJr:true,
				cityName:"",
				grade:""
			}
		},
		created(){
			this.vip();
			document.title="我的";
			var u = navigator.userAgent;
			if(u.indexOf('aplus') >-1){
				this.inApp=true;
			}
			this.getUser();
			this.getModel();
			if(localStorage.getItem('readZp')){
				this.showZp=false;
			}
			if(localStorage.getItem('readJr')){
				this.showJr=false;
			}
		},
		mounted() {
			//this.drawText();//加水印
		},
		beforeDestroy() {
		},
		components: {
		  Foot
		},
		computed: {
			
		},
		watch:{
			'$route' (to, from) {
			   if (to.name === 'my') {
				   this.getUser()
			    }
			 }
		},
		methods:{
			// 画水印背景
				textBecomeImg(text,fontsize,fontcolor){
					var canvas = document.createElement('canvas');
					var $buHeight = 0;
					if(fontsize <= 32){ $buHeight = 99; }
					else if(fontsize > 32 && fontsize <= 60 ){ $buHeight = 2;}
					else if(fontsize > 60 && fontsize <= 80 ){ $buHeight = 4;}
					else if(fontsize > 80 && fontsize <= 100 ){ $buHeight = 6;}
					else if(fontsize > 100 ){ $buHeight = 10;}
					canvas.height=fontsize + $buHeight ;
					canvas.padding=30;
					var context = canvas.getContext('2d');
					context.clearRect(0, 0, canvas.width*2, canvas.height);
					context.textAlign = "center";
			                canvas.width = 200;
			                canvas.height = 100;
			                context.fillStyle = fontcolor;
			                context.font=fontsize+"px Arial";
			                context.textBaseline = 'middle'; 
			                context.fillText(text,0,fontsize/2);
			                var canvasWidth = canvas.width/99;
			                canvasWidth = context.measureText(text).width;//text字整句文本的宽度
					var dataUrl = canvas.toDataURL('image/png');
					return dataUrl;
			},
			// 画水印信息
			drawText(){
				// +new Date().toLocaleDateString()
				var text = '103524蒋文强';
				console.log(text);
				var shuiyinDiv = document.createElement('div');
				var style = shuiyinDiv.style;
				style.position = 'fixed';
				style.left = '-50%';
				style.top = '-60%';
				style.width = '200%';
				style.height = '200%';
				style.opacity = '0.1';
				style.background = "url("+this.textBecomeImg(text,16,"#666")+")";
				style.zIndex = 9999999991;
				style.transform = "rotate(-30deg)";
				style.pointerEvents = "none";//很重要  不然点击不了挡住的其他模块
				document.body.appendChild(shuiyinDiv);
			},
			getModel(){
				return new Promise((resolve,err)=>{
						this.$axios({
							method:"get",
							url:"/My/GetEmpModel",
							headers:this.header_token
						})
						.then(res=>{
							resolve(res);
							console.log(res);
							if(res.data.code==0){
								this.grade=res.data.data.ChengHu;
							}
						})
						.catch(error=>{
							Indicator.close();
							Toast("网络错误，请稍后再试");
						})
				})
			},
			goFail(){
				this.$sensors.track('sc_click_icon', {
					sc_business_type:'other',
					sc_current_page:"我的",
					sc_icon_name:"纠错有奖",
					sc_icon_position:'(1,2)'
				});
				this.$router.push({name:'fail',query:{'userName':this.userInfo.EmpCnName,'emNum':this.userInfo.EmpNo}})
			},
			// icon跳转 神策
			goIcon(r,n,num,jjr,cName,position){
				if(jjr){
					if(cName){
						this.$router.push({'name':r,query:{jjr:num,cityName:cName}});
					}else{
						this.$router.push({'name':r,query:{jjr:num}});
					}
				}
				else if(num){
					this.$router.push({'name':r,query:{id:num}});
				}else{
					this.$router.push({'name':r});
				}
				this.$sensors.track('sc_click_icon', {
					sc_business_type:'other',
					sc_current_page:"我的",
					sc_icon_name:n+"icon",
					sc_icon_position:position
				});
			},
			vip(){
				var arrVip=this.empArr;
				arrVip.push('121728');
				arrVip.push('63119');
				arrVip.push('119141');
				arrVip.push('103524');
				arrVip.push('139016');
				arrVip.push('137476');
			},
			goDay(){
				this.$sensors.track('sc_click_icon', {
					sc_business_type:'other',
					sc_current_page:"我的",
					sc_icon_name:"管理日报icon",
					sc_icon_position:'(1,4)'
				});
				// 0830  6896  0710  0034  2963
				let isManger=this.userInfo.RoleName=='总经理'||this.userInfo.RoleName=='大战区合伙人'||this.userInfo.RoleName=='小战区合伙人'||this.userInfo.RoleName=='店董'||this.userInfo.EstateName=='网络运营部'||this.userInfo.EmpNo=="0830"||this.userInfo.EmpNo=="6896"||this.userInfo.EmpNo=="0710"||this.userInfo.EmpNo=="0034"||this.userInfo.EmpNo=="2963"
				if(isManger){
					this.$router.push({name:'dayLog'});
				}else{
					Toast("您没有该权限哦~");
				}
			},
			getUser(){
				Indicator.open();
				return new Promise((resolve,err)=>{
					this.$axios({
							method:"get",
							url:"/My/GetUserInfoV2?v="+Math.random()*10,
							headers:this.header_token
						})
						.then(res=>{
							// resolve(res);
							console.log(res);
							if(res.data.code==0){
								this.userInfo=res.data.data;
								this.cityName=res.data.data.CityName;
								this.jjrNum=res.data.data.EmpNo;
								localStorage.setItem("user",JSON.stringify(res.data.data));
								if(res.data.data.SignMessage){
									this.myMsg=res.data.data.SignMessage;
								}
								// 白名单测试
								if(this.empArr.toString().indexOf(res.data.data.EmpNo)>-1){
									this.hasTest=true;
								}
								
								// this.lineW=res.data.data.JiFenEnable/(res.data.data.JiFenEnable+res.data.data.NextLevelDistance)*100
								this.tx="https://pic.centanet.com/shenzhen/pic/agent/"+res.data.data.EmpNo+".jpg"
							}else{
								Toast(res.data.msg);
								if(res.data.code==500){
									localStorage.removeItem("userInfo");
									var oldUrl=window.location.href;
									sessionStorage.setItem('toName',oldUrl);
									this.$router.push({name:"login"});
								}
							}
							Indicator.close();
						})
						.catch(error=>{
							Indicator.close();
							Toast("网络错误，请稍后再试");
						})
				})
			},
			setMsg(){
				return new Promise((resolve)=>{
						this.$axios({
							method:"post",
							url:"/My/PostMySign",
							headers: {
								"token":uToken()
							 },	
							data:{
								message:this.myMsg
							}
						})
						.then(res=>{
							console.log(res);
							resolve(res);
							if(res.data.code==0){
								this.show=false;
								this.getUser();
								Toast("保存成功");
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
			logOut(){
				this.$store.dispatch("logout");
				document.title='登录'
				this.$router.push({name:"login"})
			}
		}
	}
</script>

<style scoped>
	.my{background-color: #F5F5F5;padding-bottom: 2rem;min-height: 100vh;}
	.myTop{position: relative;height: 3.2rem;width: 100%;background: url(../assets/img/myBj.png) center bottom no-repeat;background-size: 100%;padding: 0.6rem 0.3rem 0.4rem;}
	.mtSet{width: 0.8rem;height: 0.8rem;background: url(../assets/img/m-set.png) right top no-repeat;background-size: 0.42rem;position: absolute;right: 0.3rem;top: 0.4rem;}
	.myYb{position: absolute;width: 6.9rem;height: 1rem; padding: 0.16rem;background-color: #fff;bottom: -0.5rem;left: 0.3rem;text-align: center;box-shadow: 0px 2px 6px 2px rgba(0, 0, 0, 0.06);border-radius: 0.1rem;}
	.mybT .iconY{width: 0.44rem;margin-right: 0.1rem;vertical-align: middle;}
	.myYb p{font-size: 0.3rem;color: #999;margin: 0;}
	.mybT{font-size: 0.46rem;color: #F93C32;width: 100%;padding-bottom: 0.1rem;display: inline-block;}
	.mybT label{font-size: 0.24rem;color: #999;margin-left: 0.1rem;}
	.mybT span{font-size: 0.52rem;font-weight: 520;color: #F93C32;}
	.mtL{width: 1.3rem;height: 1.3rem;border: 2px solid #fff;position: relative;border-radius: 50%;float: left;}
	.mtL label{width: 100%;height: 100%;display: block;overflow: hidden;border-radius: 50%;}
	.mtL img{width: 100%;}
	.mtR{width: 5.4rem;margin-left: 0.2rem;float: left;}
	.mtR h3{color: #fff;font-size: 0.4rem;margin-bottom: 0.08rem;font-weight: 550;}
	.mtR h3 span{font-weight: 350;font-size: 0.26rem;margin-left: 0.1rem;padding: 0 0.15rem;background: url(../assets/img/line-bj.png) left top repeat-x;background-size: 100%;border-radius: 0.3rem;overflow: hidden;}
	.mtL span img{width: 1.22rem;position: absolute;right: 0.04;bottom: -0.2rem;}
	.mtR .msecond{color: #fff;margin-bottom: 0.06rem;font-size: 0.24rem;line-height: 0.3rem;}
	.mtR .msecond label{display: inline-block;max-width: 5rem;min-width: 2.6rem;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;float: left;}
	.mtR .msecond span{display: inline-block;width: 0.12rem;height: 0.28rem;background: url(../assets/img/m-right.png) center no-repeat;background-size: 100%;margin-left: 0.2rem;}
	.lineM{width: 3.4rem;height: 3px;background-color: #fff;border-radius: 10px;overflow: hidden;margin: 0.2rem auto 0;}
	.lineM span{display: block;height: 100%;background-color: #FFE349;}
	.lineTip{font-size: 0.2rem;color: #fff;margin-top: 4px;}
	.line-l{width: 1px;height: 0.8rem;background-color: #ddd;display: inline-block;}
	.myC{margin-top: 0.8rem;}
	.myLi,.myList{margin: 0.2rem 0;height: 1rem;padding-left: 1rem;padding-right: 0.3rem; background: #fff url(../assets/img/m-icon1.png) 0.3rem center no-repeat;background-size: 0.47rem;line-height: 1rem;}
	.myList{margin: 0;}
	.myList2{background: #fff url(../assets/img/m-icon2.png) 0.3rem center no-repeat;background-size: 0.47rem;}
	.myList3{background: #fff url(../assets/img/m-icon3.png) 0.3rem center no-repeat;background-size: 0.47rem;}
	.myList4{background: #fff url(../assets/img/m-icon4.png) 0.3rem center no-repeat;background-size: 0.47rem;margin-bottom: 0.2rem;}
	.myList5{background: #fff url(../assets/img/m-icon5.png) 0.3rem center no-repeat;background-size: 0.47rem;}
	.myList6{background: #fff url(../assets/img/m-icon6.png) 0.3rem center no-repeat;background-size: 0.47rem;}
	.myList7{background: #fff url(../assets/img/m-icon7.png) 0.3rem center no-repeat;background-size: 0.47rem;}
	.myList8{background: #fff url(../assets/img/m-icon8.png) 0.3rem center no-repeat;background-size: 0.47rem;}
	.myList9{background: #fff url(../assets/img/m-icon-sc.png) 0.3rem center no-repeat;background-size: 0.47rem;}
	.myList10{background: #fff url(../assets/img/icon-xx.png) 0.3rem center no-repeat;background-size: 0.47rem;}
	.mlAll{border-bottom: 1px solid #ededed;height: 0.98rem;}
	.myList4 .mlAll,.myList8 .mlAll{border: 0;}
	.myliL {display: block;height: 1rem;line-height: 0.8rem;width: 2rem;float: left;font-weight: 500;}
	.myList .myliL{line-height: 1rem;}
	.myliL span{color: #FFC323;font-size: 0.46rem;margin-left: 0.2rem;font-weight: bold;position: relative;top: 0.04rem;}
	.myliR{width: 3.6rem;padding-right: 0.3rem;display: block;height: 1rem;line-height: 1rem;color: #999;font-size: 0.24rem;text-align: right;background: url(../assets/img/icon-right.png) right center no-repeat;background-size: 0.12rem;float: right;}
	.logOut{}
	.logOut a{width: 100%;height: 1rem;line-height: 1rem;text-align: center;background-color: #fff;margin-top: 0.2rem;font-size: 0.32rem;color: #F45048;display: block;font-weight: 550;}
	.nineTop{background-color: #fff;margin-bottom: 0.2rem;}
	.nineTop p{line-height: 0.6rem;padding-left: 0.3rem;font-size: 0.26rem;color: #333;border-bottom: 1px solid #eee;}
	.nineC,.ninesC{display: flex;flex-wrap: wrap;}
	.nineC label,.ninesC label{height: 1.88rem;width: 25%;text-align: center;padding-top: 1.1rem;font-size: 0.26rem;color: #666;position: relative;}
	.nineC label span,.ninesC label span{width: 0.12rem;height: 0.12rem;display: block;background-color: #FF0000;position: absolute;top: 1.3rem;right: 0.45rem;border-radius: 50%;}
	.nineC label i,.ninesC label i{position: absolute;top: 0.2rem;right: 0.35rem;color: #FF0000;font-size: 0.24rem;font-style: normal;font-weight: bold;}
	.nineC label:first-child{background: url(../assets/img/nine-jp.png) center 0.4rem no-repeat;background-size: 0.48rem;}
	/* .nineC label:nth-of-type(2){background: url(../assets/img/nine-sc.png) center 0.4rem no-repeat;background-size: 0.48rem;border: 1px solid #eee;border-top: 0;border-bottom: 0;} */
	.nineC label:nth-of-type(2){background: url(../assets/img/h-jc.png) center 0.4rem no-repeat;background-size: 0.52rem;border: 1px solid #eee;border-top: 0;border-bottom: 0;}
	.nineC label:nth-of-type(3){background: url(../assets/img/nine-xx.png) center 0.4rem no-repeat;background-size: 0.48rem;border-right: 1px solid #eee;}
	.nineC label:nth-of-type(4){background: url(../assets/img/nine-rb.png) center 0.4rem no-repeat;background-size: 0.48rem;}
	.ninesC label{border:  1px solid #eee;border-top: 0;border-left: 0;}
	
	.ninesC label:nth-of-type(1){background: url(../../public/images/m-icon-wm.png) center 0.4rem no-repeat;background-size: 0.56rem;}
	.ninesC label:nth-of-type(2){background: url(../assets/img/hb-mp.png) center 0.4rem no-repeat;background-size: 0.48rem;}
	.ninesC label:nth-of-type(3){background: url(../assets/img/hb-fy.png) center 0.4rem no-repeat;background-size: 0.48rem;}
	.ninesC label:nth-of-type(4){background: url(../assets/img/hb-zp.png) center 0.4rem no-repeat;background-size: 0.48rem;}
	.ninesC label:nth-of-type(5){background: url(../assets/img/hb-jr.png) center 0.4rem no-repeat;background-size: 0.48rem;}
	.ninesC label:nth-of-type(6){background: url(../assets/img/hb-lz.png) center 0.4rem no-repeat;background-size: 0.48rem;}
	.ninesC label:nth-of-type(7){background: url(../assets/img/hb-app.png) center 0.4rem no-repeat;background-size: 0.34rem;}
	.ninesC label:nth-of-type(8){background: url(../assets/img/hb-cj.png) center 0.4rem no-repeat;background-size: 0.44rem;}
	.ninesC label:nth-of-type(9){background: url(../assets/img/hb-zx.png) center 0.4rem no-repeat;background-size: 0.48rem;}
	.ninesC label:nth-of-type(10){background: url(../assets/img/hb-xx.png) center 0.4rem no-repeat;background-size: 0.48rem;}
	.ninesC label:nth-of-type(11){background: url(../assets/img/hb-xp.png) center 0.4rem no-repeat;background-size: 0.48rem;}
	.ninesC label:nth-of-type(12){background: url(../../public/images/hb-za.png) center 0.4rem no-repeat;background-size: 0.56rem;}
	.ninesC label:nth-of-type(13){background: url(../assets/img/m-icon-ts.png) center 0.4rem no-repeat;background-size: 0.36rem;border-bottom: 0;}
	
	
	.ninesC label:nth-of-type(4n){border-right: 0;}
	.myIntr{width: 6.2rem;height: 5.4rem;background-color: #fff;border-radius: 0.2rem;}
	.miTop{height: 1.3rem;background: linear-gradient(134deg, #FB6F52 0%, #F3240A 100%);line-height: 1.3rem;text-align: center;font-size: 0.4rem;font-weight: 600;color: #fff;}
	.miContent{padding: 0.3rem;}
	.miContent textarea{width: 100%;height: 2rem;background-color: #eee;border: 1px solid #ddd;padding: 0.2rem;}
	.miBtn{margin-top: 0.6rem;text-align: center;}
	.miBtn label{display: inline-block;width: 2.4rem;height: 0.8rem;border-radius: 0.4rem;margin: 0 0.2rem;background-color: #ccc;line-height: 0.8rem;font-size: 0.36rem;color: #fff;}
	.miBtn label:last-child{background: linear-gradient(134deg, #FB6F52 0%, #F3240A 100%);}
</style>
