<template>
	<div :class="$style.rules">
		<div :class="$style.ruleC">
			<div :class="$style.top"></div>
			<a :class="$style.rShare" href="https://sz.centanet.com/partner/house/zjRules/"></a>
			<label :class="$style.wShare" v-if="inApp" @click="share"></label>
			<div :class="$style.content">
				<div :class="$style.sectionOne">
					<div :class="$style.title">{{info.WeekTxt}}</div>
					<ul>
						<li><span>1</span>一共有<i>{{info.AllCount}}人</i>网络管理账号被封</li>
						<li><span>2</span>二手房：<i>{{info.ErShouCount}}人</i>  新房：<i>{{info.YiShouCount}}人</i> </li>
						<li><span>3</span>最长禁发天数：<i>{{info.MaxDay}}天</i> </li>
						<li><span>4</span>环比{{info.AllCountHuanBi>0?'上升':'下降'}}：<i>{{info.AllCountHuanBi | changeNum}}人</i> </li>
					</ul>
				</div>
				<div :class="$style.sectionOne" v-if="ershouList">
					<div :class="$style.title">二手房违规明细</div>
					<table cellspacing="0" border="1">
						<tr>
							<th>天王区</th>
							<th>违规人数</th>
							<th :class="$style.th3">违规原因</th>
							<th :class="$style.th4">处理结果</th>
						</tr>
						<tr v-for="item in ershouList" :key="item.TianWangQu">
							<td>{{item.TianWangQu}}</td>
							<td>{{item.RenShu}}人</td>
							<td :class="$style.td3">{{item.WeiGuiYuanYin}}</td>
							<td>{{item.ChuLiJieGuo}}</td>
						</tr>
					</table>
				</div>
				<div :class="$style.sectionOne" v-if="yishouList">
					<div :class="$style.title">新房违规明细</div>
					<table cellspacing="0" border="1">
						<tr>
							<th>天王区</th>
							<th>违规人数</th>
							<th :class="$style.th3">违规原因</th>
							<th :class="$style.th4">处理结果</th>
						</tr>
						<tr v-for="item in yishouList" :key="item.TianWangQu">
							<td>{{item.TianWangQu}}</td>
							<td>{{item.RenShu}}人</td>
							<td :class="$style.td3">{{item.WeiGuiYuanYin}}</td>
							<td>{{item.ChuLiJieGuo}}</td>
						</tr>
					</table>
				</div>
			</div>
			<div :class="$style.bootom">
				<p>中原找房</p>
				<p>{{info.WeekDate}}</p>
			</div>
			<div :class="$style.rFoot">
				<a :class="$style.button" @click="goAll">查看全部名单</a>
			</div>
		</div>
	</div>		
</template>

<script>
	var shareLink = window.location.href;
	var shareObj = { //微信链接分享
		title: "中原找房质检公告",
		desc: '每周二不见不散',
		link: shareLink,
		imgUrl: "https://sz.centanet.com/partner/house/shareImg/share-zj.jpg"
	};
	import axios from 'axios'
	import { Toast,Indicator } from 'mint-ui';
	import {
	  uToken,
	} from "@/global/token.js";
	export default{
		name: 'rules',
		data(){
			return{
				header_token:{"token": uToken()},
				msg:"",
				gl:"",
				content:"",
				user:"",
				inApp:false,
				info:"",
				yishouList:"",
				ershouList:""
			}
		},
		created() {
			Indicator.open();
		},
		mounted(){
			//window.callback=this.callback;//暴露给public页
			if(navigator.userAgent.indexOf('aplus') > -1){
				this.inApp=true;
			}
			this.getData();
		},
		filters:{
			change(v){
				return v.replace(/data-src/,'src');;
			},
			changeNum(v){
				if(v<0){
					v=-v;
				}
				return v;
			}
		},
		components: {
			
		},
		methods:{
			// A+分享回调
			callback(item){

			},
			goAll(){
				this.$router.push({name:'rulesAll',query:{id:this.$route.query.id}});
			},
			getData(){
				return new Promise((resolve)=>{
						axios({
							method:"get",
							url:"https://sz.centanet.com/partner/huihansubmit/api/wangluozhijian/getlist",
							params:{
								weekDate:this.$route.query.id
							}
						})
						.then(res=>{
							console.log(res);
							if(res.data.isSuccess){
								this.info=res.data.data.HuiZong;
								if(res.data.data.TianWangQu.YiShouHuiZong){
									this.yishouList=res.data.data.TianWangQu.YiShouHuiZong
								}
								if(res.data.data.TianWangQu.ErShouHuiZong){
									this.ershouList=res.data.data.TianWangQu.ErShouHuiZong
								}
								document.title=`${this.info.WeekTxt}中原找房质检公告`;
								shareObj.title=`${this.info.WeekTxt}中原找房质检公告`;
								this.wxShare();
							}else{
								Toast(res.data.msg);
							}
							setTimeout(()=>{
								Indicator.close();
							},500)
						})
						.catch(error=>{
							setTimeout(()=>{
								Indicator.close();
							},500)
							Toast("网络错误，请稍后再试");
						})
				})
			},
			// 微信分享
			wxShare(){//
					axios({
						method:"get",
						url:"https://m.sz.centanet.com/partner/weixin/jssdkjsonp?url=" + encodeURIComponent(location.href)
					})
					.then(res=>{
						let data=JSON.parse(res.data.replace('(','').replace(')',''));
						if (data) {
						    wx.config({
						        debug: false,
						        appId: data.AppId,
						        timestamp: data.Timestamp,
						        nonceStr: data.NonceStr,
						        signature: data.Signature,
						        jsApiList: [
									'updateAppMessageShareData',
									'updateTimelineShareData'
						        ]
						    });
						    wx.ready(function () {
						        //分享好友
						        wx.updateAppMessageShareData({
						            title: shareObj.title,
						            desc: shareObj.desc,
						            link: shareObj.link,
						            imgUrl: shareObj.imgUrl,
						            success: function () {
						              // 设置成功
						            }
						          });
						        //分享朋友圈
						        wx.updateTimelineShareData({
						           title: shareObj.title,
						           desc: shareObj.desc,
						           link: shareObj.link,
						           imgUrl: shareObj.imgUrl,
						           success: function () {
						             // 设置成功
						           }
						         });
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
						p:1
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

<style lang="less" module>
	.rules{min-height: 100vh;position: relative;background-color: #8cb1ff;}
	.top{height: 7.1rem;width: 7.5rem;background: url(../assets/img/zjBanner.jpg) center no-repeat;background-size: 100%;}
	.content{
		padding: 0 0.3rem;
	}
	.sectionOne{
		background-color: #fff;padding: 0 0.2rem 0.4rem;
		border: 1px solid #000;
		margin-bottom: 0.6rem;
		.title{
			width: 2.99rem;
			height: 0.72rem;
			background: url(../assets/img/zjTbj.png) center no-repeat;
			background-size: 2.99rem;
			text-align: center;
			line-height: 0.6rem;
			color: #fff;
			font-size: 0.36rem;
			font-weight: bold;
			position: relative;
			left: -0.4rem;
			top: -0.3rem;
		}
		li{
			display: block;
			margin-bottom: 0.2rem;
			span{display: inline-block;width: 0.4rem;height: 0.4rem;margin-right: 0.2rem;line-height: 0.4rem;text-align: center;background-color: #E64E4E;color: #fff;border-radius: 50%;}
			i{font-style: normal;color: #EB3232;}
		}
		table{
			border: 1px solid #E64E4E;
			border-collapse:collapse;
			text-align: center;
			th{width: 0.34rem;font-weight: 600;color: #fff;background-color: #E64E4E;height: 1.07rem;width: 20%;}
			.th3{width: 32%;}
			.th4{width: 28%;}
			.td3{text-align: left;}
			td{padding: 0.15rem 0.1rem;font-size: 0.26rem;}
		}
		
	}
	.bootom{
		height: 3.1rem;background: url(../assets/img/zjBtm.png) center bottom no-repeat;background-size: 7.5rem;text-align: right;padding-right: 0.3rem;padding-top: 0.4rem;font-size: 0.34rem;color: #fff;
		p{margin-bottom: 0.12rem;}
	}
	.rFoot{position: absolute;bottom: 0.5rem;left: 0;text-align: center;width: 100%;}
	.button{
		display: inline-block;
		    width: 4rem;
		    height: 0.88rem;
		    background: #fec33d;
		    border-radius: 1rem;
		    line-height: 0.84rem;
		    color: #fff;
		    font-size: 0.36rem;
		    cursor: pointer;
			font-weight: 600;
		    /* animation: bounce 3s linear infinite alternate; */
	}
	.rShare{display: block;width: 2.48rem;height: 0.75rem;background: url(../assets/img/zj-rules.png) center no-repeat;background-size: 100%;position: absolute;right: 0.2rem;top: 0.5rem;}
	.wShare{display: block;width: 1.06rem;height: 1.87rem;background: url(../assets/img/wShare.png) center no-repeat;background-size: 100%;position: fixed;right: 3px;top: 55%;}
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
</style>
