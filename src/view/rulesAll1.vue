<template>
	<div :class="$style.rules">
		<div :class="$style.ruleC">
			<img src="../assets/img/zjAll0601.jpg" width="100%"/>
<!-- 			<div :class="$style.section">
				<div :class="$style.title">二手房违规明细</div>
				<table cellspacing="0">
					<tr :class="$style.trh">
						<th>工号</th>
						<th>姓名</th>
						<th :class="$style.th3">天王区</th>
						<th :class="$style.th4">门店</th>
						<th :class="$style.th5">违规内容</th>
						<th :class="$style.th6">封号<br />时间</th>
					</tr>
					<tbody>
						<tr>
							<td>101245</td>
							<td>陈东升</td>
							<td>住宅西区</td>
							<td :class="$style.td4">福田香蜜湖店</td>
							<td :class="$style.td5">房源标题带号码</td>
							<td>6.2-7.1</td>
						</tr>
						<tr>
							<td>101245</td>
							<td>陈东升</td>
							<td>住宅西区</td>
							<td :class="$style.td4">福田香蜜湖店</td>
							<td :class="$style.td5">房源标题带号码</td>
							<td>6.2-7.1</td>
						</tr>
					</tbody>
				</table>
				<div :class="$style.title">新房违规明细</div>
								<table cellspacing="0">
									<tr :class="$style.trh">
										<th>工号</th>
										<th>姓名</th>
										<th :class="$style.th3">天王区</th>
										<th :class="$style.th4">门店</th>
										<th :class="$style.th5">违规内容</th>
										<th :class="$style.th6">封号<br />时间</th>
									</tr>
									<tbody>
										<tr>
											<td>101245</td>
											<td>陈东升</td>
											<td>住宅西区</td>
											<td :class="$style.td4">福田香蜜湖店</td>
											<td :class="$style.td5">房源标题带号码</td>
											<td>6.2-7.1</td>
										</tr>
										<tr>
											<td>101245</td>
											<td>陈东升</td>
											<td>住宅西区</td>
											<td :class="$style.td4">福田香蜜湖店</td>
											<td :class="$style.td5">房源标题带号码</td>
											<td>6.2-7.1</td>
										</tr>
									</tbody>
								</table>
			</div> -->
		</div>
	</div>		
</template>

<script>
	var shareLink = window.location.href;
	var shareObj = { //微信链接分享
		title: "六月第1周中原找房质检违规名单",
		desc: '每周二不见不散',
		link: shareLink,
		imgUrl: "https://sz.centanet.com/partner/house/shareImg/share-zj.png",
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
			}
		},
		created() {
			document.title='六月第1周中原找房质检违规名单';
			this.wxShare();
		},
		mounted(){
			//window.callback=this.callback;//暴露给public页
			if(navigator.userAgent.indexOf('aplus') > -1){
				this.inApp=true
			}
		},
		filters:{
			change(v){
				return v.replace(/data-src/,'src');;
			}
		},
		components: {
			
		},
		methods:{
			// A+分享回调
			callback(item){

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
							this.content=res.data.data.contents.replace(/data-src/g,'src').replace(/=png/g,'=jpg').replace(/<br/g,'<div');
							shareObj.title=res.data.data.title;
							shareObj.desc=res.data.data.summary;
							this.wxShare();
						}else{
							Toast(res.data.msg);
						}
					})
					.catch(error=>{
						Indicator.close();
						Toast("网络错误，请稍后再试q");
					})
				})
			},

		}
	}	
</script>

<style lang="less" module>
.rules{min-height: 100vh;position: relative;background-color: #E64E4E;}
// .ruleC{padding: 0.7rem 0.1rem;}
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
		.trh{border-radius: 0.1rem;}
		th{width: 16%;color: #fff;background-color: #EC7171;}
		.th4{
			width: 18%;
		}
		.th5{
			width: 20%;
		}
		.th6{
			width: 18%;
		}
		td{font-size: 0.2rem;color: #fff;padding:0.2rem 2px;}
		.td4,.td5{text-align: left;}
	}
}
</style>
