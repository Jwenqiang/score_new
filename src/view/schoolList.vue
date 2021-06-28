<template>
	<div class="house hbh schoolList">
		<div class="hSearch">
			<i class="mintui mintui-search"></i>
			<span class="iclear" v-if="content" @click="content=''"></span>
			<!--  @input="getTags()" -->
			<input type="text" placeholder="请输入学校名称或学校别名" v-model="content" @keyup.enter="getHouse()"/>
			<button @click="getHouse()">搜索</button>
<!-- 			<div class="searchResult" v-show="tagList">
				<ul>
					<li v-for="(item,index) in tagList" :key="index" @click="search(item.Tag)"><label>{{item.Tag}}</label><span>约{{item.SNum}}套</span></li>
				</ul>
			</div> -->
		</div>
		<div class="earnAll" @click="tagList=''">
			<div class="jjrSection">
				<div v-if="house.length>0" class="schoolList">
					<div class="clear jjrL" v-for="item in house" :key="item.SchoolId" @click="shareHouse(item.SchoolId,jjrNum)">
						<div class="jrl">
							<img :src="item.ImagePath" width="100%"/>
						</div>
						<div class="jrr">
							<h4 class="jrt">{{item.SchoolName}}</h4>
							<p style="color: #333;">{{item.SchoolShortName}}</p>
							<p class="newTag" v-if="item.Tags"><span v-if="item.Tags[0]">{{item.Tags[0]}}</span><label v-if="item.Tags[1]">{{item.Tags[1]}}</label><label v-if="item.Tags[2]">{{item.Tags[2]}}</label><label v-if="item.Tags[3]">{{item.Tags[3]}}</label></p>
							<!-- <p class="newAdr" style="border-bottom: 1px solid #ddd;padding-bottom: 0.1rem;">{{item.Address}} </p> -->
							<p class="newAdr" style="border-top: 1px solid #ddd;padding-top: 0.1rem;">{{item.GscopeName}} | 附近{{item.EstateNumber}}个小区 | {{item.SaleNumber}}套在售 </p>
							<p class="jrbtn hbhBtn">
								<mt-button type="primary" class="hbShare" style="float: right;" @click="shareHouse(item.SchoolId,jjrNum)">分享学校</mt-button>
								<!-- <mt-button type="primary" class="hbShare" @click="goHb('9')">分享海报</mt-button> -->
							</p>
						</div>
					</div>
					<p style="text-align: center;font-size: 0.24rem;color: #ccc;line-height: 1rem;" v-if="count>pSize">正在加载</p>
					<p class="noList" v-if="count<=pSize&&loadOver"><span></span>&nbsp;我是有底线的&nbsp;<span></span></p>
				</div>
				<div class="none" v-if="house.length==0&&ready">暂无学校信息~</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Vue from 'vue';
	import {
	  uToken,
	} from "@/global/token.js";
	import { Toast,Indicator } from 'mint-ui';
	import { Search } from 'mint-ui';
	import nToast from '@nutui/nutui/dist/packages/toast/toast.js';  // 加载构建后的JS
	import '@nutui/nutui/dist/packages/toast/toast.css';  //加载构建后的CSS
	nToast.install(Vue);
	import i from "@/assets/img/noYb.png";
	export default{
		name: 'schoolList',
		data(){
			return{
				jjrNum:"",
				ready:false,
				header_token:{"token": uToken()},
				house:"",
				houseNew:"",
				type:"",
				count:"",
				countNew:"",
				pSize:10,
				content:"",
				tagList:"",
				showTag:false,
				mr:i,
				hType:'S',
				lazyLoading:require('@/assets/img/loading.jpg'),
				scrollTop: 0, // 记录当前的滚动距离
				oldScrollTop:0,
				loadOver:false,
				load:false
			}
		},
		created() {
			document.title="分享学校";
			if(this.$route.query.tab){
				this.type=this.$route.query.tab
			}
			if(this.$route.query.jjr){
				this.jjrNum=this.$route.query.jjr
			}
			this.getHouse();
		},
		// 注意：只有当组件在 <keep-alive> 内被切换，才会有activated 和 deactivated 这两个钩子函数
		 activated() {//在vue对象存活的情况下，进入当前存在activated()函数的页面时，一进入页面就触发；可用于初始化页面数据等
		    // 全局绑定滚动事件，
		    window.addEventListener("scroll", this.scrollT);
			this.getHouse();
		  },
		  deactivated() {
		    // 组件消失，解绑scroll事件
		    window.removeEventListener("scroll", this.scrollT);
		  },
		filters:{
			fix(p){
				let price=Number(p).toFixed(0);
				return price;
			},
			changeImg(n){
				let v=n.split('.jpg')[0];
				return v+'_300x210_w.jpg';
			}
		},
		watch:{
			scrollTop(newValue, oldValue) {//滚动分页
			console.log(newValue)
				// setTimeout(()=>{
				// 	if(newValue == window.scrollY) 
						var height = document.getElementsByClassName('schoolList')[0].scrollHeight;
						let sTop = document.documentElement && document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop;//滚动的高度
						let clientHeight=window.screen.height;//屏幕的高度
						if(this.count>this.pSize){
							if(sTop>0){
								//+-5是为了保证一定的弹性，并非要刚好相等才出发，
								if(height-100<sTop+clientHeight&&this.load){
									  console.log('监听成功','到达底部')
										this.pSize=Number(this.pSize)+10;
								 }
							 }
						}else{
							setTimeout(()=>{
								this.loadOver=true
							},1000)
						}
				// },500)
			},
			pSize(){
				// this.search()
				if(this.pSize>10){
					if(!this.content){
						this.getHouse();
					}				
				}
				
			},
			content(){
				if(!this.content){
					this.getHouse();
				}
			},
			hType(n){
				this.pSize=10;
				if(n=="N"){
					this.house="";
					this.search();
				}else{
					if(!this.house){
						this.getHouse();
					}
				}
			}
		},
		mounted() {
		},
		methods:{
			scrollT(){
				this.scrollTop = window.scrollY;
			},
			setType(t){
				this.hType=t;
				this.tagList="";
				this.house="";
				this.content="";
			},
			shareHouse(id,num){
				this.$router.push({name:'school',query:{schoolId:id,empNo:num}})
			},
			goHb(type,id,pId){
				Toast("功能紧急开发中...");
				return false;
				if(type==1){
					this.$router.push({name:'hb',query:{id:1,adsNo:id,postId:pId}})
				}else{
					this.$router.push({name:'hb',query:{id:6,estExtId:id}})
				}
			},
			getTags(){
				if(this.content==""){
					return;
				}
				console.log(this.content)
				return new Promise((resolve)=>{
						this.$axios({
							method:"get",
							url:"/ZhongyuanHouseV2/GetEstateTags",
							headers:this.header_token,
							params:{
								tag:this.content,
								category:this.hType
							}
						})
						.then(res=>{
							console.log(res);
							if(res.data.code==0){
								this.tagList=res.data.data;
							}else{
								Toast(res.data.msg);
							}
							Indicator.close();
							resolve(res);
						})
						.catch(error=>{
							Indicator.close();
							Toast("网络错误，请稍后再试");
						})
				})
			},
			getHouse(){
				this.allLoaded=false
				this.load=false
				Indicator.open();
				return new Promise((resolve)=>{
						this.$axios({
							method:"get",
							url:"/ZhongyuanHouseV2/GetSchoolListRequest",
							headers:this.header_token,
							params:{
								pageIndex:1,
								pageSize:this.pSize,
								keyword:this.content
							}
						})
						.then(res=>{
							console.log(res);
							if(res.data.code==0){
								this.ready=true;
								this.count=res.data.data.Total;
								this.house=res.data.data.Result;
							}else{
								Toast(res.data.msg);
							}
							Indicator.close();
							resolve(res);
							this.load=true
						})
						.catch(error=>{
							Indicator.close();
							Toast("网络错误，请稍后再试");
						})
				})
			},
			search(n){
				if(n){
					this.content=n.split("　")[0];
				}
				this.tagList="";
				Indicator.open();
				if(this.hType=='S'){
					return new Promise((resolve)=>{
							this.$axios({
								method:"get",
								url:"/ZhongyuanHouseV2/GetRegionPostsRequest",
								headers:this.header_token,
								params:{
									keyword :this.content,
									pageSize:this.pSize
								}
							})
							.then(res=>{
								console.log(res);
								// 收起键盘
								document.activeElement.blur();
								resolve(res);
								if(res.data.code==0){
									this.showTag=false;
									this.house=res.data.data.List;
									this.count=res.data.data.Total;
									console.log(this.house);
								}else{
									Toast(res.data.message);
								}
								setTimeout(()=>{
									Indicator.close();
								},300)
							})
							.catch(error=>{
								Indicator.close();
								Toast("网络错误，请稍后再试");
							})
					})
				}
				else{
					return new Promise((resolve)=>{
							this.$axios({
								method:"get",
								url:"/ZhongyuanHouseV2/GetCcesRegionPostsRequest",
								headers:this.header_token,
								params:{
									keyword :this.content,
									pageSize:this.pSize
								}
							})
							.then(res=>{
								console.log(res);
								// 收起键盘
								document.activeElement.blur();
								resolve(res);
								if(res.data.code==0){
									this.showTag=false;
									this.houseNew=res.data.data.List;
									this.countNew=res.data.data.Total;
								}else{
									Toast(res.data.message);
								}
								setTimeout(()=>{
									Indicator.close();
								},300)
							})
							.catch(error=>{
								Indicator.close();
								Toast("网络错误，请稍后再试");
							})
					})
				}
			},
			noPush(){
				return false;
			}
		}
	}
</script>

<style scoped>
	img[lazy="loading"]{
	}
	.hbh{background-color: #F5F5F5;min-height: 100vh;padding-bottom: 0;}
	.hbh .earnAll{padding: 1.2rem 0.34rem 0.4rem;min-height: 100vh;}
	.hbh .earnAll .jjrSection{margin: 0.3rem 0;}
	.jjrL{padding: 0.3rem 0.2rem;background-color: #fff;margin-bottom: 0.3rem;box-shadow: 0px 2px 6px 2px rgba(0, 0, 0, 0.06);border-radius: 0.1rem;}
	.jrl{width: 2.4rem;float: left;margin-right: 0.2rem;height: 1.8rem;overflow: hidden;position: relative;}
	.nStatus{padding: 2px 0.1rem;color: #fff;background-color: #F3240A;position: absolute;left: 0;top: 0;font-size: 0.24rem;}
	.jrr{float: left;width: 3.82rem;}
	.jrr h4.jrt{
		    font-weight: bolder;
		    color: #203140;
		    font-size: 0.3rem;
			margin-bottom: 0.1rem;
			white-space: normal;
			overflow: hidden;
			text-overflow: ellipsis;
			position: relative;
			line-height: 1.2;
	}
	.jrr p{
		color: #666;
		font-size: 0.24rem;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		line-height: 1;
	}
	.jrbtn{text-align: left;}
	.jrbtn button{
		padding: 0;
		text-align: center;
		margin-top: 0.4rem;
		margin-right: 0.8rem;
		width:1.2rem;
		height:0.6rem;
		line-height: 0.56rem;
		background: linear-gradient(134deg, #FB6F52 0%, #F3240A 100%);
		border-radius:0.4rem;
		font-size: 0.28rem;
		border: 0;
	}
	.jrbtn button:last-child{margin-right: 0;background: linear-gradient(133deg, #7BACEE 0%, #6089D9 100%);}
	.jrbtn button img{width: 0.26rem;vertical-align: -2px;margin-left: 3px;}
	.hbh .jjrSection{margin-top: 0;}
	.none{width: 100%;height: 6.4rem;margin: 0.8rem auto 0;padding-top: 4.3rem;text-align: center;font-size: 0.28rem;color: #666; background: url(../assets/img/none.png) center top no-repeat;background-size: 4rem;}
	.hbh .none{margin-top: 0;padding-top: 6.6rem;background: url(../assets/img/none.png) center 2rem no-repeat;background-size: 4rem;}
	.hbhBtn label{margin: 0 0.2rem;}
	.hbhBtn button.hbShare{margin: 0.2rem 0.4rem 2px 0;width: 1.6rem;background: none;border: 1px solid #1562E7;color: #1562E7;}
	.hbhBtn button.hbShare:last-child{margin-right: 0;background: none;color: #F93C32;border: 1px solid #F93C32;}
	.hSearch{background-color: #fff;padding: 0.16rem 0 0.16rem 0.2rem;position: fixed;top: 0;left: 0;z-index: 7;}
	.hSearch .mintui-search{position: absolute;width: 0.3rem;top: 0.36rem;left: 0.35rem;color: #999;font-size: 0.36rem;}
	.hSearch input{width: 6.2rem;height: 0.76rem;border: 1px solid #ddd;padding-left: 0.56rem;padding-right: 0.6rem;line-height: 0.7rem;font-size: 0.28rem;border-radius: 0.06rem;}
	.hSearch button{width: 1.1rem;height: 0.76rem;text-align: center;font-size: 0.32rem;}
	.hSearch .iclear{width: 0.3rem;height: 0.3rem;position: absolute;right: 1.4rem;top: 0.4rem;display: inline-block;background: #999 url(../assets/img/nClose.png) center no-repeat;background-size: 0.14rem;border-radius: 50%;}
	.searchResult{width: 100%;top: 1rem;left: 0;position: absolute;padding: 0.2rem;background-color: #fff;z-index: 7;max-height: 10rem;overflow-y: auto;}	
	.searchResult li{display: flex;padding: 0.3rem 0.2rem;justify-content: space-between;border-bottom: 1px solid #ededed;}
	.searchResult li label{font-weight: 550;color: #333;width: 74%;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;}
	.searchResult li span:last-child{color: #666;width: 26%;text-align: right;}
	.searchResult li span i{font-style: normal;color: #F3240A;}
	
	.hbTab{text-align: center;padding: 0.4rem 0 0;font-size: 0.32rem;color: #333;position: fixed;bottom: 0;left: 0;width: 100%;z-index: 7;}
	.hbTab a{display: inline-block;background-color: #fff;box-shadow: 0 0 2px #ccc;}
	.hbTab label{display: inline-block;width: 3.65rem;height: 1rem;margin: 0 0.2rem 0 0;line-height: 1rem;color: #333;font-weight: 600;}
	.hbTab label:last-child{margin: 0;}
	.hbTab label.on{background: linear-gradient(134deg, #FB6F52 0%, #F3240A 100%);color: #fff;}
	.newHouse button.hbShare{margin-top: 0.2rem;}
	.jrr span{margin-left: 0;color: #fff;background-color: #50bcec;}
	.jrr h4 strong{display: inline-block;width: 2.3rem;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}
	.jrr h4 i{font-style: normal;font-weight: 500;color: #f53218;position: absolute;right: 0;top: 0.04rem;font-size: 0.28rem;}
	
	.newHouse button.hbShare{margin-top: 0.2rem;}
	.jrr p.newTag{font-size: 0.2rem;margin-top: 0.1rem;}
	.newAdr{margin-top: 0.1rem;}
	.jrr span,.jrr label{padding: 2px 0.1rem;display: inline-block;background-color: #ededed;color: #999;margin-left: 0.06rem;border-radius: 3px;}
	.newHouse .hbhBtn{text-align: right;}
	.noList{color: #ccc;font-size: 0.26rem;text-align: center;margin-top: 0.8rem;}
	.noList span{display: inline-block;height: 1px;width: 2rem;background-color: #eee;position: relative;top: -3px;}
	
	.schoolList{height: auto;}
	.schoolList .jrl{width: 2.2rem;height: 1.6rem;}
	.schoolList .jrl img{height: 100%;width: auto;}
	.schoolList .jrr{width: 4.02rem;}
	.schoolList .jrr h4{white-space: normal;}
	
</style>
