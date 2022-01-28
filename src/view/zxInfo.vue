<template>
	<div class="messageInfo zx" style="padding-bottom: 1.7rem;" v-if="msg">
		<div class="mC">
			<h5 class="mF">{{msg.title}}</h5>
			<!-- <p class="mcSecond">{{msg.summary}}</p> -->
			<p class="mc-tip">来源：{{msg.wechat_mp}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{msg.CreateDateString}}</p>
			<div class="mhContent" v-html="content">
			</div>
			<div class="readGzh">
				<a class="button" :href="msg.url">阅读原文</a>
			</div>
			<div class="footTip" :class="shou?'fixFoot':''">
<!-- 				<label></label>
				<span>房屋买卖找我，专业更放心</span> -->
			</div>
		</div>
		<div class="clear hhFoot">
			<label><img :src="'https://pic.centanet.com/shenzhen/pic/agent/'+user.EmpNo+'.jpg'"  onerror="this.src='https://sz.centanet.com/partner/house/userImg/tx_none.png'" width="100%"/></label>
			<label>
				<span>{{user.EmpCnName}}</span>
				<span>{{user.PositionName}}</span>
			</label>
			<div class="appBtn" v-if="inApp">
				<a :href="'tel:'+user.Mobile" @click="setSc">电话咨询</a>
				<a @click="share()">分享</a>
			</div>
			<a :href="'tel:'+user.Mobile" @click="setSc" v-else>电话咨询<p>隐藏号码</p></a>
		</div>
	</div>		
</template>

<script>
	var shareLink = window.location.href;
	var shareObj = { //微信链接分享
		title: "",
		desc: '',
		link: shareLink,
		imgUrl: "https://sz.centanet.com/partner/house/shareImg/logo.png",
	};
	import axios from 'axios'
	import { Toast,Indicator } from 'mint-ui';
	import {
	  uToken,
	} from "@/global/token.js";
	export default{
		name: 'zxInfo',
		data(){
			return{
				header_token:{"token": uToken()},
				msg:"",
				gl:"",
				content:"",
				user:"",
				inApp:false,
				oldScrollTop:0,
				scrollTop:0,
				shou:true
			}
		},
		mounted(){
			// 全局绑定滚动事件，
			window.addEventListener("scroll", this.scrollT);
			window.callback=this.callback;//暴露给public页
			if(navigator.userAgent.indexOf('aplus') > -1){
				this.inApp=true
			}
			this.getData();
			this.getInfo();
		},
		beforeDestroy() {
			window.removeEventListener("scroll", this.scrollT);
		},
		filters:{
			change(v){
				return v.replace(/data-src/,'src');;
			}
		},
		watch:{
			scrollTop(newValue, oldValue) {
				var height = document.getElementsByClassName('zx')[0].scrollHeight;
				let sTop = document.documentElement && document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop;//滚动的高度
				let clientHeight=window.screen.height;//屏幕的高度
				if(height-100<sTop+clientHeight){
					this.shou=false;
					return;
				}
				setTimeout(() => {
					if(newValue == window.scrollY) { //延时执行后当newValue等于window.scrollY，代表滚动结束
						console.log('滚动结束');
						this.oldScrollTop = newValue; //每次滚动结束后都要给oldScrollTop赋值
						this.shou=true;
					};
				}, 500); //必须使用延时器，否则每次newValue和window.scrollY都相等，无法判断，20ms刚好大于watch的侦听周期，故延时20ms
				if(this.oldScrollTop == oldValue) { //每次滚动开始时oldScrollTop与oldValue相等
					this.shou=false;
				}
				// if(sTop>0){
				// 	this.shou=false
				// }else{
				// 	this.shou=true;
				// }
			},
		},
		components: {
			
		},
		methods:{
			// 神策电话埋点
			setSc(){
				this.$sensors.track('sc_click_call', {
					sc_business_type:"information",
					sc_button_name:"电话咨询",
					sc_click_page:"我的_资讯分享页_资讯详情页",
					sc_house_id:"",
					sc_house_name:"",
					sc_click_area:"底部区域",
					sc_button_position:""
				});
			},
			// 神策电话埋点
			setScEnter(){
				this.$sensors.track('sc_information_read', {
					sc_click_entry:"分享资讯icon",
					sc_information_type:"",
					sc_information_title:this.msg.title,
					sc_information_author:this.msg.author,
					sc_post_time:this.msg.CreateDateString
				});
			},
			scrollT(){
				this.scrollTop = window.scrollY;
			},
			// A+分享回调
			callback(item){
				this.callV="-回调："+item;
				if(item){
					setTimeout(()=>{
					  this.getShareLog(item);
					}, 500)
				}
			},
			getShareLog(shareName){
				return new Promise((resolve)=>{
						this.$axios({
							method:"post",
							url:"/Poster/PostMyTemplateShareLog",
							headers: {
								"token":uToken()
							 },
							data:{
								Id:0,
								ArticlesId:this.$route.params.id,
								SharedDestination:shareName
							}
						})
						.then(res=>{
							this.callV="分享成功："+res.data.data.Reamark;
							resolve(res);
							if(res.data.code==0){
								if(res.data.data.IsSuccess){
									if(res.data.data.Reamark>0){
										this.hasYb=true;
										this.shareNum=res.data.data.Reamark;
									}
								}
							}
						})
						.catch(error=>{
							Toast("网络错误，请稍后再试");
						})
				})
			},
			// 微信分享
			wxShare(){//
					axios({
						method:"get",
						url: "https://m.sz.centanet.com/partner/weixin/qyweixinjssdkjsonp?url="+ encodeURIComponent(window.location.href.split('#')[0])
					})
					.then(res=>{
						console.log(res)
						let data=JSON.parse(res.data.replace('(','').replace(')',''));
						shareObj.link=window.location.href;
						if (data) {
						    wx.config({
						        debug: false,
						        appId: "wx2730a10487f9df56",
						        timestamp: data.Timestamp,
						        nonceStr: data.NonceStr,
						        signature: data.Signature,
						        jsApiList: ['onMenuShareAppMessage',  'onMenuShareTimeline', 'onMenuShareWechat']
						    });
						    wx.ready(function () {
						        //分享好友
						        wx.onMenuShareAppMessage({ 
						            title: shareObj.title,
						            desc: shareObj.desc,
						            link: shareObj.link,
						            imgUrl: shareObj.imgUrl,
						            success: function () {
						              // 设置成功
						            }
						          });
						        //分享朋友圈
						        wx.onMenuShareTimeline({
						           title: shareObj.title,
						           link: shareObj.link,
						           imgUrl: shareObj.imgUrl,
						           success: function () {
						             // 设置成功
						           }
						         });
										// 获取“微信”按钮点击状态及自定义分享
										wx.onMenuShareWechat({
										    title: shareObj.title,
										    desc: shareObj.desc,
										    link: shareObj.link,
										    imgUrl: shareObj.imgUrl,
										    success: function(s) {
										    	console.log('[ suc ]', s)
										    },
										    fail: (e) => {
										    	console.log('[ err ]', e)
										    }
										}) 
						    });
						    wx.error(function (res) {});
						}
					})
			},
			getInfo(){
				this.$axios({
					method:"get",
					url:"/Poster/GetEmpCall",
					params:{
						empNo:this.$route.params.empNo,
						p:1,
						// 神策渠道埋点
						PlatformType:"chengzhangxitong",
						BusinessType:"information",
						SourceId:"",
						SourceName:"",
						HousingEstateCode:"",
						HousingEstateName:"",
						Sem:"",
						Hmpl:"",
						FirstQudao:"",
						SecondQudao:""
					}
				})
				.then(res=>{
					if(res.data.code==0){
						this.user=res.data.data;
						console.log(this.user.Mobile)
					}else{
						Toast(res.data.msg);
					}
				})
			},
			getData(){
				console.log(this.$route.params.id)
				Indicator.open();
				return new Promise((resolve)=>{
					this.$axios({
						method:"get",
						url:"/Articles/Get/"+this.$route.params.id,
						headers:this.header_token
					})
					.then(res=>{
						console.log(res);
						Indicator.close();
						if(res.data.code==0){
							this.msg=res.data.data;
							document.title=res.data.data.title;
							this.content=res.data.data.contents.replace(/data-src/g,'src').replace(/=png/g,'=jpg').replace(/<br/g,'<div').replace(/!important/g,'');
							shareObj.title=res.data.data.title;
							shareObj.desc=res.data.data.summary;
							this.wxShare();
							this.setScEnter();
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
			// A+分享
			share(i){
			    var url = "centaline:" + this.shareParams(i);
			    window.location.href = url;
			},
			shareParams(i){
			    var json = this.dataJson(i);
			    var jsonData = JSON.stringify({
			        action:"share",
			        data:json
			    });
			    return encodeURIComponent(jsonData);
			},
			dataJson(src){
			    return JSON.stringify({
			            channel:["wx","wxMoments"],//["wx","wxImage","wxMomentsImage","QQ"]
			            img:shareObj.imgUrl,
			            title:shareObj.title,
			            description:shareObj.desc,
			            link:location.href
			        });
			},
		}
	}	
</script>

<style>
	/*********活动提醒页**********/
	.messageInfo{background-color: #f5f5f5;min-height: 100vh;padding: 0.5rem 0.3rem;}
	.messageInfo h5{font-size: 0.36rem;color: #333;font-weight: 600;}
	br {
	   display: block;height: 4px;width: 7.5rem;line-height: 4px;}
	.mF{padding-bottom: 0.3rem;border-bottom: 1px solid #e6e6e6;}
	.mc-tip{font-size: 0.24rem;color: #999;margin: 0.2rem 0;}
	.zx .mhContent{color: #666;font-size: 0.3rem;line-height: 1.6;}
	.zx .mhContent p{min-height: 1px;}
	.mhContent img{width: 100%;margin: 0.2rem 0;max-width: 100% !important;}
	.mhContent h3{font-size: 0.34rem;}
	.cLink p{margin-bottom: 0.2rem;}
	.cLink a{color: #03a9f4;}
	.glC{display: flex;flex-wrap: wrap;}
	.mhContent > .glT label{font-size: 0.28rem;color: #333;font-weight: 550;}
	.glC label{font-size: 0.26rem;display: block;width: 1rem;}
	.glC label:nth-of-type(2){width: 1.4rem;}
	.glC label:nth-of-type(3){width: 2rem;}
	.glC label:nth-of-type(4){width: 2.5rem;}
	.glD{font-size: 0.26rem;color: #f56f6f;margin-top: 0.1rem;text-align: right;}
	.gll{padding: 0.1rem 0 0.2rem;border-bottom: 1px solid #ddd;}
	/*  */
	.hhFoot{z-index: 8;background-color: #fff;height: 1.6rem;width: 100%;padding: 0.2rem 0.3rem;text-align: center;position: fixed;left: 0;bottom: 0;box-shadow: 0 -2px 3px #efe9e9;}
	.hhFoot label{width: 1.2rem;height: 1.2rem;display: inline-block;float: left;margin-right: 0.2rem;}
	.hhFoot label:first-child{border-radius: 50%;overflow: hidden;border: 1px solid #e8e6e6;}
	.hhFoot label:nth-of-type(2){width: 1.8rem;}
	.hhFoot label span{display: block;width: 100%;text-align: left;}
	.hhFoot span:first-child{float: left;font-size: 0.32rem;font-weight: 600;margin: 0.18rem 0 0.15rem;display: block;line-height: 1;}
	.hhFoot span:last-child{font-size: 0.24rem;font-weight: 400;display: block;color: #666;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;}
/* 	.hhFoot a{width: 2.1rem;height: 0.74rem;float: right;display: inline-block;;line-height:0.74rem;margin-top: 0.24rem;color: #fff;background: linear-gradient(180deg, #FB6F52 0%, #F3240A 100%);border-radius: 0.08rem;font-size: 0.32rem;}
	.hhFoot a:nth-of-type(2){width: 1.2rem;margin-right: 0.2rem;background: linear-gradient(180deg, #7BACEE 0%, #6089D9 100%);} */
	.hhFoot a{width: 3rem;height: 1rem;padding-top: 0.1rem;float: right;display: inline-block;margin-top: 0.1rem;color: #fff;background: linear-gradient(180deg, #FB6F52 0%, #F3240A 100%);border-radius: 0.08rem;font-size: 0.32rem;}
	.hhFoot a p{font-size: 0.24rem;}
	
	.hhFoot .appBtn a{padding-top: 0;width: 2.1rem;height: 0.74rem;float: right;display: inline-block;line-height:0.74rem;margin-top: 0.24rem;color: #fff;background: linear-gradient(180deg, #FB6F52 0%, #F3240A 100%);border-radius: 0.08rem;font-size: 0.32rem;}
	.hhFoot .appBtn a:nth-of-type(2){width: 1.2rem;margin-right: 0.2rem;background: linear-gradient(180deg, #7BACEE 0%, #6089D9 100%);}
	
	.readGzh{margin-top: 0.6rem;margin-bottom: 0.6rem;text-align: center;}
	.readGzh a.button{
		display: inline-block;
		    width: 5.2rem;
		    height: 0.7rem;
		    background: linear-gradient(0, #FC565A, #FF9662);
		    border-radius: 0.35rem;
		    line-height: 0.66rem;
		    color: #fff;
		    font-size: 0.32rem;
		    cursor: pointer;
	}
@keyframes bounce {
  from, 20%, 53%, 80%, to {
    -webkit-animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
    animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
    -webkit-transform: translate3d(0,0,0);
    transform: translate3d(0,0,0);
  }

  40%, 43% {
    -webkit-animation-timing-function: cubic-bezier(0.755, 0.050, 0.855, 0.060);
    animation-timing-function: cubic-bezier(0.755, 0.050, 0.855, 0.060);
    -webkit-transform: translate3d(0, -20px, 0);
    transform: translate3d(0, -20px, 0);
  }

  70% {
    -webkit-animation-timing-function: cubic-bezier(0.755, 0.050, 0.855, 0.060);
    animation-timing-function: cubic-bezier(0.755, 0.050, 0.855, 0.060);
    -webkit-transform: translate3d(0, -15px, 0);
    transform: translate3d(0, -15px, 0);
  }

  90% {
    -webkit-transform: translate3d(0,-4px,0);
    transform: translate3d(0,-4px,0);
  }
}
.footTip{width: 2.39rem;height: 1.26rem;background: url(../assets/static/tipZx.png) center no-repeat;background-size: 100%;transition: all ease-in 1s;font-weight: 600;text-align: center;animation: shake 15s linear infinite alternate;}
/* .footTip label{width: 0.4rem;height: 0.8rem; background: url(../assets/static/zx-down.png) center no-repeat;background-size: 0.5rem;display: inline-block;position: relative;top: 0.25rem;margin-right: 0.2rem;} */
.fixFoot{position: fixed;width: 2.39rem;height: 1.26rem;left: 0.26rem;bottom: 1.7rem;}

@keyframes pulse {
  from {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }

  50% {
    -webkit-transform: scale3d(1.03, 1.03, 1.03);
    transform: scale3d(1.03, 1.03, 1.03);
  }

  to {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }
}
@keyframes shake {
  from, to {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }

  10%, 30%, 50%, 70%, 90% {
    -webkit-transform: translate3d(-2px, 0, 0);
    transform: translate3d(-2px, 0, 0);
  }

  20%, 40%, 60%, 80% {
    -webkit-transform: translate3d(2px, 0, 0);
    transform: translate3d(2px, 0, 0);
  }
}
</style>
