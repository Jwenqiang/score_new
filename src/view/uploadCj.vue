<template>
	<div class="ucj">
		<div class="upTop">
			<div class="clear fUpload">
				<label><i>*</i> 上传分享朋友圈截图</label>
			</div>
			<div class="upImg">
				<ul class="clear">
					<li class="upLi">
						<input type="file" accept="image/*" multiple @change="upLoad"/>
					</li>
					<li v-for="(item,index) in picList" v-if="index<3"><img :src="item" width="100%" preview="0"/></li>
				</ul>
			</div>
		</div>
		<div class="upBtn">
			<label class="upyes" v-if="picList.length>0" @click="setImg"></label>
			<label class="upnone" v-else></label>
		</div>
		<div class="upTip">
			<!-- <h5>上传说明</h5> -->
			<p>注意：仅分享在朋友圈可获奖，需上传分享在朋友圈的截图。</p>
		</div>
		<div class="shareRecord" v-if="logList.length>0">
			<p class="srTitle"><span></span>分享记录<span></span></p>
			<ul>
				<li>
					<label>分享时间</label>
					<label>成交人</label>
					<label>成交时间</label>
					<label>成交小区</label>
					<label>成交物业</label>
				</li>
				<ul>
					<li v-for="(item,index) in logList" :key="index">
						<label>{{item.ShareDate}}</label>
						<label>{{item.EmpCnName}}</label>
						<label>{{item.EstateCode}}</label>
						<label>{{item.EstateName}}</label>
						<label>{{item.Title}}</label>
					</li>
				</ul>
			</ul>
		</div>
		<div class="shareRecord" v-if="imgList.length>0">
			<p class="srTitle"><span></span>上传截图记录<span></span></p>
			<div class="clear srImg">
				<label v-for="(item,index) in imgList" :key="index" v-if="item.ImagePath"><img :src="item.ImagePath" width="100%" preview="1" :preview-text="item.CreateDate+'上传'"/></label>
			</div>
		</div>
	</div>
</template>

<script>
	import {
	  uToken,
	} from "@/global/token.js";
	import { Toast,Indicator } from 'mint-ui';
	export default{
		name: 'uploadCj',
		data(){
			return{
				picList:[],
				logList:"",
				imgList:""
			}
		},
		mounted() {
			Indicator.open();
			this.getLog();
			this.getShareImg();
		},
		components: {
		},
		methods:{
			getLog(){
				this.$axios({
					method:"get",
					url:"/Poster/GetContractShareLogs",
					headers: {
						"token":uToken()
					 },				
					params:{
						pageSize:100
					}
				})	
				.then(res=>{
					console.log(res);
					if(res.data.code==0){
						this.logList=res.data.data.DataList;
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
			getShareImg(){
				this.$axios({
					method:"get",
					url:"/Poster/ContractShareList",
					headers: {
						"token":uToken()
					 }
				})	
				.then(res=>{
					console.log(res);
					if(res.data.code==0){
						this.imgList=res.data.data;
					}else{
						Toast(res.data.msg);
					}
					this.$previewRefresh();
				})
				.catch(error=>{
					Toast("网络错误，请稍后再试");
				})
			},
			setImg(){
				Indicator.open({
				  spinnerType: 'triple-bounce'
				});
				this.$axios({
					method:"post",
					url:"/Poster/SaveContractShare",
					headers: {
						"token":uToken(),
						'Content-Type': 'application/json'
					 },
					data:{
						ImagePath:this.picList
					}
				})	
				.then(res=>{
					console.log(res);
					if(res.data.code==0){
						if(res.data.data.IsSuccess){
							Toast("上传成功");
							this.picList=[];
							this.getShareImg();
						}else{
							Toast(res.data.data.Reamark);
						}
					}else{
						Toast(res.data.msg);
					}
					this.$previewRefresh();
					Indicator.close();
				})
				.catch(error=>{
					Indicator.close();
					Toast("网络错误，请稍后再试");
				})
			},
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
						Toast("一次最多只能上传三张图片");
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
						this.picList=res.data.data.ImgUrls;
						this.$previewRefresh();
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
		}
	}
</script>

<style>
	.ucj{padding: 0.4rem 0.2rem 1rem;background-color: #F2F2F2;min-height: 100vh;}
	.upTop{padding: 0.2rem;background-color: #fff;}
	.errorTag{font-size: 0.32rem;margin-bottom: 0.4rem;}
	.errorTag p{margin-bottom: 0.4rem;}
	.errorTag label{padding: 3px 15px;border: 1px solid #ccc;margin-right: 0.6rem;border-radius: 3px;font-size: 0.28rem;color: #666;}
	.errorTag label.s{background: #F45048;color: #fff;border-color: #F45048;}
	.failInput input{width: 100%;height: 0.8rem;padding-left: 0.1rem;border: 1px solid #ddd;border-radius: 2px;outline: medium;margin-bottom: 0.3rem;}
	.failInput textarea{padding: 0.3rem 0.2rem;border: 1px solid #ddd;width: 100%;height: 3rem;outline: medium;resize: none;}
	.ucj .newTitle{width: 100%;height: 0.6rem;line-height: 0.6rem;margin-bottom: 0.2rem;}
	.ucj .newTitle label,.ucj .fiIn label{float: left;color: #333;font-size: 0.32rem;font-weight: 500;}
	.ucj i{font-style: normal;color: #F55A53;font-size: 0.4rem;font-weight: bold;position: relative;top: 5px;}
	.ucj .newTitle span,.ucj .fiIn span{float: right;width: 3rem;text-align: right; display: block;height: 100%;line-height: 0.6rem;font-size: 0.28rem;color: #F45048;padding-right: 0.3rem;background: url(~@/assets/img/icon-right.png) right center no-repeat;background-size: 0.12rem;}
	.fUpload{margin: 0 0 0.4rem;font-size: 0.32rem;}
	.fUpload label{float: left;}
	.fUpload span{float: right;font-size: 0.3rem;color: #999;position: relative;top: 3px;}
	.upImg{margin-bottom: 0.4rem;}
	.ucj .upImg li{display: inline-block;width: 1.54rem;height: 1.34rem;margin-right: 0.1rem;background-color: #ddd;float: left;overflow: hidden;}
	.upImg li:last-child{margin: 0;}
	.upImg li input{opacity: 0;height: 100%;}
	.upImg li.upLi{background: url(../assets/img/upBj.png) center no-repeat;background-size: 100%;width: 1.76rem;height: 1.34rem;}
	.fiIn input{width: 100%;border: 0;outline: medium;text-align: right;font-size: 0.28rem;}
	.fiIn input[disabled]{background: none;}
	.fiIn{padding: 0.3rem 0;border-bottom: 1px solid #ededed;height: 1.24rem;}
	.fBtn{width: 6rem;height: 1rem;background-color: #F45048;display: block;margin: 1rem auto 0.6rem;}
	.upBtn{margin-top: 0.4rem;}
	.upBtn label.upyes{display: block;width: 3.77rem;height: 0.89rem;background: url(../assets/static/upyes.png) center no-repeat;background-size: 100%;margin: 0 auto;}
	.upBtn label.upnone{display: block;width: 3.77rem;height: 0.89rem;background: url(../assets/static/upnone.png) center no-repeat;background-size: 100%;margin: 0 auto;}
	.upTip{margin-top: 0.4rem;}
	.upTip h5{font-size: 0.32rem;color: #333;font-weight: 500;margin-bottom: 0.2rem;}
	.upTip p{font-size: 0.24rem;color: #999;margin-bottom: 0.1rem;}
	.shareRecord{margin-top: 0.6rem;background-color: #fff;padding-top: 0.1rem;box-shadow: 0px 4px 0.12rem 0px rgba(162, 162, 162, 0.4);border-radius: 2px;}
	.shareRecord li{display: flex;line-height: 0.6rem;font-size: 0.22rem;color: #666;background-color: #fff;}
	.shareRecord li label{flex: 1;text-align: center;}
	.shareRecord > ul{max-height: 5rem;overflow-y: auto;}
	.shareRecord > ul > li{font-size: 0.26rem;color: #333;background-color: #FFF7F7;margin-top: 0.1rem;}
	.shareRecord ul > ul li:nth-of-type(even){background-color: #ECF8FF;}
	.srTitle{line-height: 0.8rem;text-align: center;font-size: 0.32rem;}
	.srTitle span{display: inline-block;height: 1px;width: 2rem;background-color: #ddd;margin: 0 0.2rem;position: relative;top: -0.1rem;}
	.srImg{width: 100%;padding: 0.2rem;}
	.srImg label{display: inline-block;width: 0.98rem;height: 1.6rem;overflow: hidden;margin: 0.06rem;float: left;}
</style>
