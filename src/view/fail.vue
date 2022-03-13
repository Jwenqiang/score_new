<template>
	<div class="fail">
		<div class="errorTag">
			<p><i>*</i>请选择问题错误类型</p>
			<div>
				<label :class="sel=='中原找房'?'s':''" @click="sel='中原找房'">中原找房</label>
				<label :class="sel=='成长系统'?'s':''" @click="sel='成长系统'">成长系统</label>
			</div>
			<div style="font-size: 0.2rem;color: #999;margin-top: 0.4rem;">提示：A+相关的错误请在企业微信联系数据中心_郭佳涛进行反馈</div>
		</div>
		<div class="clear newTitle">
			<label><i>*</i> 请填写您发现的错误链接</label>
			<!-- <span>纠错有奖</span> -->
		</div>
		<div class="failInput">
			<input type="text" placeholder="请填写错误链接" v-model="errorLink"/>
			<textarea placeholder="请描述您发现的错误内容(必填)" v-model="errorContent"></textarea>
		</div>
		<div class="clear fUpload">
			<label><i>*</i> 上传反馈截图</label>
			<span v-if="picList.length<4">{{picList.length}}/3</span>
			<span v-else-if="picList.length>3">3/3</span>
		</div>
		<div class="upImg">
			<ul class="clear">
				<li class="upLi">
					<input type="file" accept="image/*" multiple @change="upLoad"/>
				</li>
				<li v-for="(item,index) in picList" v-if="index<3"><img :src="item" width="100%"/></li>
			</ul>
		</div>
		<div class="clear fiIn">
			<label><i>*</i> 联系人</label>
			<span style="background: none;padding: 0;"><input type="text" disabled placeholder="请输入联系人姓名" v-model="userName"/> </span>
		</div>
		<div class="clear fiIn">
			<label><i>*</i> 工号</label>
			<span style="background: none;padding: 0;"><input type="text" disabled placeholder="请输入工号" v-model="userNum"/> </span>
		</div>
		<mt-button type="primary" class="fBtn" @click="subError">立即提交</mt-button>
	</div>
</template>

<script>
	import {
	  uToken,
	} from "@/global/token.js";
	import { Toast,Indicator } from 'mint-ui';
	export default{
		name: 'fail',
		data(){
			return{
				userName:"",
				userNum:"",
				picList:[],
				sel:'',
				errorLink:"",
				errorContent:""
			}
		},
		mounted() {
			let user=JSON.parse(localStorage.getItem('user'));
			this.userName=user.EmpCnName;
			this.userNum=user.EmpNo;
		},
		components: {
		},
		methods:{
			upLoad(e){
				var _this=this;
				var fd = new FormData();
				var src,url = window.URL || window.webkitURL || window.mozURL, files=e.target.files;
				if(e.target.files[0].size>10485760){
					Toast("单张图片大小不能超过10M");
					return false;
				}else if(e.target.files.length>1&&e.target.files[1].size>10485760){
					Toast("单张图片大小不能超过10M");
					return false;
				}
				for (var i = 0, len = files.length; i < len; ++i){
					var file = files[i];
					if(i<3){
						fd.append("srcs",file);
					}else{
						Toast("最多只能上传三张图片");
						break;
					}
				}
				this.setMsg(fd);
			},
			setMsg(picData){
				Indicator.open("正在上传...");
				this.$axios({
					method:"post",
					url:"/My/AddPicture",
					headers: {
						"token":uToken(),
					  'Content-Type': 'multipart/form-data' //设置post文件的请求头
					 },				
					data:picData
				})	
				.then(res=>{
					console.log(res);
					if(res.data.code==0){
						if(this.picList.length<3){
							this.picList=this.picList.concat(res.data.data.ImgUrls)
						}else{
							Toast("最多只能传三张图片");
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
			},
			subError(){
				if(this.sel==''||this.errorLink==''||this.errorContent==''||this.picList.length==0){
					Toast("请填写所有必填项~");
					return;
				}
				Indicator.open("提交中...");
				this.$axios({
					method:"post",
					url:"/My/ReportError",
					headers: {
						"token":uToken()
					 },				
					data:{
						 "ErrorType": this.sel,
						  "ErrorLink": this.errorLink,
						  "ErrorContent": this.errorContent,
						  "ErrorImg": this.picList.toString()
					}
				})	
				.then(res=>{
					console.log(res);
					if(res.data.code==0){
						Toast("提交成功，我们将尽快跟进解决");
						this.sel="";
						this.errorLink="";
						this.errorContent="";
						this.picList=[];
					}else{
						Toast(res.data.msg);
					}
					Indicator.close();
				})
				.catch(error=>{
					Indicator.close();
					Toast("网络错误，请稍后再试");
				})
			}
		}
	}
</script>

<style>
	.fail{padding: 0.4rem 0.3rem;}
	.errorTag{font-size: 0.32rem;margin-bottom: 0.4rem;}
	.errorTag p{margin-bottom: 0.4rem;}
	.errorTag label{padding: 3px 15px;border: 1px solid #ccc;margin-right: 0.6rem;border-radius: 3px;font-size: 0.28rem;color: #666;}
	.errorTag label.s{background: #F45048;color: #fff;border-color: #F45048;}
	.failInput input{width: 100%;height: 0.8rem;padding-left: 0.1rem;border: 1px solid #ddd;border-radius: 2px;outline: medium;margin-bottom: 0.3rem;font-size: 0.28rem;}
	.failInput textarea{padding: 0.3rem 0.2rem;border: 1px solid #ddd;width: 100%;height: 3rem;outline: medium;resize: none;font-size: 0.28rem;}
	.fail .newTitle{width: 100%;height: 0.6rem;line-height: 0.6rem;margin-bottom: 0.2rem;}
	.fail .newTitle label,.fail .fiIn label{float: left;color: #333;font-size: 0.32rem;font-weight: 500;}
	.fail i{font-style: normal;color: #F55A53;font-size: 0.4rem;font-weight: bold;position: relative;top: 5px;}
	.fail .newTitle span,.fail .fiIn span{float: right;width: 3rem;text-align: right; display: block;height: 100%;line-height: 0.6rem;font-size: 0.28rem;color: #F45048;padding-right: 0.3rem;background: url(~@/assets/img/icon-right.png) right center no-repeat;background-size: 0.12rem;}
	.fUpload{margin: 0.4rem 0;font-size: 0.32rem;}
	.fUpload label{float: left;}
	.fUpload span{float: right;font-size: 0.3rem;color: #999;position: relative;top: 3px;}
	.upImg{margin-bottom: 0.4rem;}
	.upImg li{display: inline-block;width: 1.6rem;height: 1.34rem;margin-right: 0.1rem;background-color: #ddd;float: left;overflow: hidden;}
	.upImg li:last-child{margin: 0;}
	.upImg li input{opacity: 0;height: 100%;}
	.upImg li.upLi{background: url(../assets/img/upBj.png) center no-repeat;background-size: 100%;width: 1.76rem;height: 1.34rem;}
	.fiIn input{width: 100%;border: 0;outline: medium;text-align: right;font-size: 0.28rem;}
	.fiIn input[disabled]{background: none;}
	.fiIn{padding: 0.3rem 0;border-bottom: 1px solid #ededed;height: 1.24rem;}
	.fBtn{width: 6rem;height: 1rem;background-color: #F45048;display: block;margin: 1rem auto 0.6rem;}
</style>
