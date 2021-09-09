<template>
	<div :class="$style.rules">
		<div :class="$style.ruleC">
			<div :class="$style.section">
				<template v-if="ershouList">
				<div :class="$style.title">二手房违规明细</div>
				<table cellspacing="0">
					<tr :class="$style.trh">
						<th :class="$style.th1">工号</th>
						<th>姓名</th>
						<th :class="$style.th3">天王区</th>
						<th :class="$style.th4">组别</th>
						<th :class="$style.th5">违规内容</th>
						<th :class="$style.th6">封号时间</th>
					</tr>
					<tbody style="border-bottom: 1px solid #fff;">
						<tr v-for="item in ershouList" :key="item.EmpNo">
							<td :class="$style.td1" v-text="item.EmpNo"></td>
							<td>{{item.EmpCnName}}</td>
							<td>{{item.TianWangQu}}</td>
							<td :class="$style.td4">{{item.Dept}}</td>
							<td :class="$style.td5">{{item.ForbiddenContent}}</td>
							<td>{{item.WeekDate | changeTime}}-{{item.OpenTime | changeTime}}</td>
						</tr>
					</tbody>
				</table>
				</template>
				<template v-if="yishouList">
				<div :class="$style.title">新房违规明细</div>					<table cellspacing="0">
						<tr :class="$style.trh">
							<th :class="$style.th1">工号</th>
							<th>姓名</th>
							<th :class="$style.th3">天王区</th>
							<th :class="$style.th4">组别</th>
							<th :class="$style.th5">违规内容</th>
							<th :class="$style.th6">封号时间</th>
						</tr>
						<tbody>
							<tr v-for="item in yishouList" :key="item.EmpNo">
								<td :class="$style.td1">{{item.EmpNo}}</td>
								<td>{{item.EmpCnName}}</td>
								<td>{{item.TianWangQu}}</td>
								<td :class="$style.td4">{{item.Dept}}</td>
								<td :class="$style.td5">{{item.ForbiddenContent}}</td>
								<td>{{item.WeekDate | changeTime}}-{{item.OpenTime | changeTime}}</td>
							</tr>
						</tbody>
					</table>
				</template>
			</div>
		</div>
	</div>		
</template>

<script>
	var shareLink = window.location.href;
	var shareObj = { //微信链接分享
		title: "中原找房质检违规名单",
		desc: '每周二不见不散',
		link: shareLink,
		imgUrl: "https://sz.centanet.com/partner/house/shareImg/share-zj.jpg",
	};
	import { Toast,Indicator } from 'mint-ui';
	import {
	  uToken,
	} from "@/global/token.js";
	export default{
		name: 'rulesAll',
		data(){
			return{
				header_token:{"token": uToken()},
				msg:"",
				gl:"",
				content:"",
				user:"",
				inApp:false,
				yishouList:"",
				ershouList:""
			}
		},
		created() {
			this.getData();
		},
		mounted(){
			//window.callback=this.callback;//暴露给public页
			if(navigator.userAgent.indexOf('aplus') > -1){
				this.inApp=true
			}
		},
		filters:{
			changeTime(v){
				return v.split('T')[0].split('-')[1]+'.'+v.split('T')[0].split('-')[2]
			}
		},
		components: {
			
		},
		methods:{
			// A+分享回调
			callback(item){

			},
			getData(){
				Indicator.open();
				return new Promise((resolve)=>{
						this.$axios({
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
								if(res.data.data.YiShouList){
									this.yishouList=res.data.data.YiShouList
								}
								if(res.data.data.ErShouList){
									this.ershouList=res.data.data.ErShouList
								}
								document.title=`${res.data.data.HuiZong.WeekTxt}中原找房质检违规名单`;
								shareObj.title=`${res.data.data.HuiZong.WeekTxt}中原找房质检违规名单`;
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
			getShareLog(){
				return new Promise((resolve)=>{
						this.$axios({
							method:"post",
							url:"/Poster/PostMyTemplateShareLog",
							headers: {
								"token":uToken()
							 },
							data:{
								Id:0,
								ArticlesId:this.$route.params.id
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
					this.$axios({
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

		}
	}	
</script>

<style lang="less" module>
.rules{min-height: 100vh;position: relative;background-color: #e9f0ff;}
.ruleC{padding: 0.7rem 0;}
.section{
	.title{
		width: 7.5rem;
		height: 0.72rem;
		background: url(../assets/img/zjTbj.png) center no-repeat;
		background-size: 2.99rem;
		text-align: center;
		line-height: 0.6rem;
		color: #fff;
		font-size: 0.36rem;
		font-weight: bold;
		margin-bottom: 0.4rem;
	}
	table{
		border-collapse:collapse;
		text-align: center;
		margin-bottom: 0.4rem;
		tr{
			display: flex;
		&:nth-of-type(odd){
			background-color: #e9f0ff;
		}
		&:nth-of-type(even){
			background-color: #fff4eb;
		}
		}
		.trh{border-radius: 0.1rem;}
		th{color: #fff;background-color: #ff6485;flex: 1;line-height: 0.76rem;}

		.th5{
			flex: 1.2;
		}

		td{font-size: 0.2rem;color: #333;padding:0.2rem 2px;flex: 1;overflow: hidden;word-wrap:break-word;}
		.td4,.td5{text-align: left;}
		.td5{flex: 1.2;}
	}
}
</style>
