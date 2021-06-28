<template>
	<div class="messageInfo">
		<div class="mC">
			<h5>{{msg.Title}}</h5>
			<p class="mc-tip">{{msg.CreateDate}}</p>
			<div class="mhContent" v-if="msg.SendTypeKeyword=='MANAGERRECEIVER'">
				<div class="cLink" style="margin-top: 0.2rem;">
					<p><a href="https://mp.weixin.qq.com/s/edU7IkRrshr68xjflV96-A">质检违规封禁制度</a></p>
				</div>
				<p class="glC glT"><label>姓名</label><label>工号</label><label>门店</label><label>封禁原因</label></p>
				<div class="gll" v-for="item in gl" :key="item.EmpCnName">
					<p class="glC">
						<label>{{item.EmpCnName}}</label><label>{{item.EmpNo}}</label><label>{{item.StoreName}}</label><label>{{item.Reason}}</label>
					</p>
					<p class="glD"><span>封禁时间：</span>{{item.Date}}</p>
				</div>
			</div>
			<div class="mhContent" v-html="msg.Content" v-else>
			</div>
			<div style="width: 100%;margin: 0.2rem 0;" v-if="msg.DetailImageUrl">
				<img :src="msg.DetailImageUrl" width="100%"/>
			</div>
			<div class="cLink" v-if="msg.HyperLinkList">
				<p v-for="item in msg.HyperLinkList"><a :href="item.Value">{{item.Key}}</a></p>
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
		name: 'messageInfo',
		data(){
			return{
				header_token:{"token": uToken()},
				msg:"",
				gl:""
			}
		},
		mounted(){
			document.title="消息详情";
			this.getData();
		},
		filters:{

		},
		components: {
			
		},
		methods:{
			getData(){
				console.log(this.$route.params.id)
				Indicator.open();
				return new Promise((resolve)=>{
					this.$axios({
						method:"get",
						url:"/Message/Get",
						headers:this.header_token,
						params:{
							messageId:this.$route.params.id
						}
					})
					.then(res=>{
						console.log(res);
						Indicator.close();
						if(res.data.code==0){
							this.msg=res.data.data;
							if(res.data.data.SendTypeKeyword=='MANAGERRECEIVER'){
								this.gl=JSON.parse(res.data.data.Content);
							}
						}else{
							Toast(res.data.msg);
						}
					})
					.catch(error=>{
						Indicator.close();
						Toast("网络错误，请稍后再试q");
					})
				})
			}
		}
	}	
</script>

<style>
	/*********活动提醒页**********/
	.messageInfo{background-color: #f5f5f5;min-height: 100vh;padding: 0.5rem 0.3rem;}
	.messageInfo h5{font-size: 0.36rem;color: #333;font-weight: 600;}
	.mc-tip{font-size: 0.24rem;color: #999;margin: 0.2rem 0;}
	.mhContent{color: #666;font-size: 0.3rem;line-height: 1.8;}
	.mhContent h3{font-size: 0.34rem;}
	.cLink p{margin-bottom: 0.2rem;}
	.cLink a{color: #03a9f4;}
	.glC{display: flex;flex-wrap: wrap;}
	.mhContent > .glT label{font-size: 0.28rem;color: #333;font-weight: 550;}
	.glC label{font-size: 0.26rem;display: block;width: 1rem;}
	.glC label:nth-of-type(2){width: 1.6rem;padding-right: 0.1rem;overflow-x: auto;}
	.glC label:nth-of-type(3){width: 2rem;}
	.glC label:nth-of-type(4){width: 2.3rem;}
	.glD{font-size: 0.26rem;color: #f56f6f;margin-top: 0.1rem;text-align: right;}
	.gll{padding: 0.1rem 0 0.2rem;border-bottom: 1px solid #ddd;}
</style>
