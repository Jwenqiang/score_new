<template>
	<div class="message">
		<div class="massage-hd">
			<section v-for="item in msg" :key="item.Id">
				<a @click="goMsg(item.Id,item.MsgTypes,item.SkipHyperLink)">
					<p class="massage-time"><label>{{item.CreateDate}}</label></p>
					<div class="massage-info">
						<i class="read" style="background-color: #ccc;" v-if="item.IsRead">已读</i>
						<i class="read" v-else>未读</i>
						<p class="massage-tip tip1" v-if="item.MsgTypes==1">封禁通知</p>
						<p class="massage-tip tip2" v-else-if="item.MsgTypes==2">解禁通知</p>
						<p class="massage-tip tip3" v-else-if="item.MsgTypes==3">课程通知</p>
						<p class="massage-tip tip4" v-else-if="item.MsgTypes==4">系统通知</p>
						<p class="massage-tip tip5" v-else-if="item.MsgTypes==5">竞拍通知</p>
						<p class="massage-tip tip6" v-else-if="item.MsgTypes==6">福利元宝</p>
						<h5>{{item.Title}}</h5>
						<div class="massage-info-msg">
							<p v-if="item.ListImageUrl"><img :src="item.ListImageUrl" width="100%"/></p>
							<p><span>{{item.Summary}}</span></p>
						</div>
						<p class="massage-b" style="color: #999;" v-if="item.IsRead">查看详情</p>
						<p class="massage-b" v-else>查看详情</p>
					</div>
				</a>
			</section>
			<p style="text-align: center;font-size: 0.24rem;color: #ccc;line-height: 1rem;" @click="pSize+=10" v-if="count>pSize">———— 点击查看更多 ————</p>
			<p style="text-align: center;color: #ddd;font-size: 0.26rem;position: absolute;bottom: 0;left: 0;width: 100%;line-height: 0.8rem;" v-else-if="count<=pSize&&count>0">—————————&nbsp;&nbsp;&nbsp;到底了&nbsp;&nbsp;&nbsp;—————————</p>	
			<!--没有记录时显示-->
			<div class="massage-no" v-if="count==0&&ready">
				<p></p>
				<p>暂时没有消息记录哦~</p>
			</div>			
		</div>
	</div>		
</template>

<script>
	import { Toast,Indicator } from 'mint-ui';
	import {
	  uToken,
	} from "@/global/token.js";
	export default{
		name: 'message',
		data(){
			return{
				header_token:{"token": uToken()},
				ready:false,
				msg:"",
				msgTitle:"",
				pSize:10,
				count:0
			}
		},
		watch:{
			pSize(){
				this.getData()
			}
		},
		mounted(){
			document.title="消息中心";
			this.getData();
		},
		components: {
			
		},
		methods:{
			getData(){
				Indicator.open();
				return new Promise((resolve)=>{
					this.$axios({
						method:"get",
						url:"/Message/GetList",
						headers:this.header_token,
						params:{
							PageSize:this.pSize,
						}
					})
					.then(res=>{
						this.ready=true;
						console.log(res);
						Indicator.close();
						if(res.data.code==0){
							this.msg=res.data.data.DataList;
							this.count=res.data.data.RecordCount;
						}else{
							Toast(res.data.msg);
						}
					})
					.catch(error=>{
						this.ready=true;
						Indicator.close();
						Toast("网络错误，请稍后再试");
					})
				})
			},
			goMsg(id,type,link){
				if(type==1||type==2||type==3||type==4){
					if(link){
						this.readMsg(id);
						window.location.href=link;
					}else{
						this.$router.push({name:"messageInfo",params:{'id':id}});
					}
				}else if(type==5){
					this.readMsg(id);
					this.$router.push({name:"record"});
				}else if(type==6){
					this.readMsg(id);
					this.$router.push({name:"yb",params:{t:1}});
				}
				
			},
			readMsg(id){
				return new Promise((resolve)=>{
					this.$axios({
						method:"get",
						url:"/Message/Get",
						headers:this.header_token,
						params:{
							messageId:id
						}
					})
					.then(res=>{
						console.log(res);
						Indicator.close();
						if(res.data.code==0){
							
						}else{
							Toast(res.data.msg);
						}
					})
					.catch(error=>{
						Indicator.close();
						Toast("网络错误，请稍后再试");
					})
				})
			}
		}
	}	
</script>

<style>
	/*********活动提醒页**********/
	.message{background-color: #f5f5f5;min-height: 100vh;}
	.massage-hd {
		min-height: 100vh;
		padding: 0.4rem;
		position: relative;
	}
	.massage-hd section{margin-bottom: 0.5rem;}
	.massage-time {
		text-align: center;
		line-height: 0.8rem;
		font-size: 0.24rem;
		margin-bottom: 0.1rem;
	}
	.massage-time label{
		padding: 0.06rem 0.6rem;
		background-color: #E6E6E6;
		color: #999;
		border-radius: 2px;
	}
	.massage-info {
		background: #fff;
		padding: 0.2rem 0.2rem 0;
		position: relative;
		border-radius: 0.12rem;
		box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.1);
	}
	
	.massage-info h5 {
		font-size: 0.32rem;
		margin-bottom: 0.2rem;
		font-weight: 500;
		color: #333;
	}
	
	.massage-info .massage-tip {
		line-height: 0.6rem;
		margin-bottom: 0.1rem;
		padding-left: 0.8rem;
		font-size: 0.28rem;
		color: #999;
	}
	
	.massage-info-msg {
		padding: 0 0 0.2rem;
		border-bottom: 1px solid #f5f5f7;
	}
	.massage-info-msg p{/* white-space: nowrap;overflow: hidden;text-overflow: ellipsis; */margin-bottom: 0.2rem;max-height: 2.6rem;overflow: hidden;}
	.massage-info-msg p:last-child{margin: 0;}
	.massage-info-msg .xt-p{
		height: 0.96rem;overflow: hidden;-webkit-line-clamp: 2;text-overflow: ellipsis;display: -webkit-box;-webkit-box-orient: vertical;
	}
	
	.massage-info-msg span {
		color: #999;
		font-size: 0.26rem;
	}
	
	.massage-b {
		line-height: 0.8rem;
		color: #5084DD;
		background: url(../assets/img/icon-dright.png) right center no-repeat;
		background-size: 0.32rem;
		font-size: 0.26rem;
	}
	
	.massage-b i {
		float: right;
		line-height: 0.8rem;
	}
	
	.massage-no {
		margin-top: 1rem;
		background: url(../assets/img/no-ewm.png) center top no-repeat;
		background-size: 4rem;
		text-align: center;
		padding-top: 4rem;
		color: #999;
	}
	
	.massage-no p {
		margin-bottom: 0.8rem;
	}
	
	.mhding .massage-tip {
		color: #203140;
		font-size: 0.32rem;
	}
	
	.mhding .massage-info-msg {
		border-top: 0;
	}
	
	.mhding .massage-info-msg p {
		line-height: 0.6rem;
	}
	
	#mtime strong {
		background: #000;
		color: #fff;
		line-height: 0.8rem;
		font-size: 0.32rem;
		font-weight: 400;
		font-family: Arial;
		padding: 0 0.1rem;
		margin-right: 0.1rem;
		border-radius: 2px;
		box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
	}
	.tip1{
		background: url(../assets/img/icon-tip1.png) left center no-repeat;
		background-size: 0.6rem;
	}
	.tip2{
		background: url(../assets/img/icon-tip2.png) left center no-repeat;
		background-size: 0.6rem;
	}
	.tip3{
		background: url(../assets/img/icon-tip3.png) left center no-repeat;
		background-size: 0.6rem;
	}
	.tip4{
		background: url(../assets/img/icon-tip4.png) left center no-repeat;
		background-size: 0.6rem;
	}
	.tip5{
		background: url(../assets/img/icon-tip5.png) left center no-repeat;
		background-size: 0.6rem;
	}
	.tip6{
		background: url(../assets/img/icon-tip6.png) left center no-repeat;
		background-size: 0.6rem;
	}
	.read{font-style: normal;padding: 2px 8px;background-color: #F7B500;position: absolute;right: 0;top: 0;font-size: 0.24rem;color: #fff;border-top-right-radius: 0.12rem;border-bottom-left-radius: 0.12rem;}
</style>
