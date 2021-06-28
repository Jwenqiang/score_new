<template>
	<div class="house hbZx">
		<div class="earnAll" @click="tagList=''">
			<div class="jjrSection newHouse">
				<div v-if="house.length>0">
					<div class="clear jjrL" v-for="(item,index) in house">
						<div class="jrl" v-if="item.ThumbUrl" @click="shareHouse(item.Id,jjrNum)">
							<img :src="item.ThumbUrl" width="100%"/>
						</div>
						<div class="jrr" :class="{'jjrs':!item.ThumbUrl}">
							<div @click="shareHouse(item.Id,jjrNum)">
							<h4 class="jrt"><strong>{{item.Title}}</strong></h4>
							<p v-html="item.Summary" class="summary"></p>
							<p style="font-size: 0.24rem;color: #999;margin-top: 0.1rem;">{{item.CreateDateString}}</p>
							</div>
							<p class="jrbtn hbhBtn">
								<mt-button type="primary" class="hbShare" @click="shareHouse(item.Id,jjrNum)">分享资讯</mt-button>
								<mt-button type="primary" class="hbShare" @click="goHb('8',item.Id,jjrNum)">分享海报</mt-button>
							</p>
						</div>
					</div>
					<p class="noList" @click="pSize+=10" v-if="count>pSize">正在加载</p>
					<p class="noList" v-else-if="count<=pSize&&loadOver"><span></span>&nbsp;我是有底线的&nbsp;<span></span></p>
				</div>
				<div class="none" v-if="house.length==0&&ready">暂无资讯~</div>
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
	import nutUI from '@nutui/nutui/dist/nutui.min.js';  // 加载构建后的JS
	import '@nutui/nutui/dist/nutui.min.css';  //加载构建后的CSS
	nutUI.install(Vue);
	import i from "@/assets/img/noYb.png";
	import {
	  $get,$post
	} from "@/global/api.js";
	export default{
		name: 'hbZx',
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
				hType:'N',
				lazyLoading:require('@/assets/img/loading.jpg'),
				loadOver:false,
				load:false,
				scrollTop:0
			}
		},
		created() {
			document.title="资讯分享"
			if(this.$route.query.tab){
				this.type=this.$route.query.tab
			}
			if(this.$route.query.jjr){
				this.jjrNum=this.$route.query.jjr
			}
			this.getHouse();
			// 全局绑定滚动事件，
			window.addEventListener("scroll", this.scrollT);
		},
		beforeDestroy() {
			// 组件消失，解绑scroll事件
			window.removeEventListener("scroll", this.scrollT);
		},
		filters:{
			fix(n){
				let p=Number(n).toFixed(0);
				return p+"元/㎡";
			},
			changeImg(n){
				let v=n.split('.jpg')[0];
				return v+'_300x210_w.jpg';
			}
		},
		computed: {
		},
		watch:{
			scrollTop(newValue, oldValue) {//滚动分页
				var height = document.getElementsByClassName('earnAll')[0].scrollHeight;
				let sTop = document.documentElement && document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop;//滚动的高度
				let clientHeight=window.screen.height;//屏幕的高度
				if(this.count>this.pSize){
					if(sTop>0){
						if(height-100<sTop+clientHeight&&this.load){
							  // console.log('监听成功','到达底部')
							if(this.pSize<this.count){
								this.pSize=Number(this.pSize)+10; 
							}
							setTimeout(()=>{
								this.loadOver=true
							},1000)
						 }
					 }
				}else{
					setTimeout(()=>{
						this.loadOver=true
					},1000)
				}
			},
			pSize(){
				if(this.pSize>10){
					this.getHouse();					
				}
				
			},
			content(){
				if(!this.content){
					this.tagList="";
					if(this.hType=='S'){
						this.getHouse();
					}else{
						this.search();
					}
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
				this.$router.push({name:'zxInfo',params:{id:id,empNo:num}})
			},
			goHb(type,id,empNo){
				this.$router.push({name:'hb',query:{id:8,zxId:id,empNo:empNo}})
			},
			getHouse(){
				this.allLoaded=false
				this.load=false;
				Indicator.open();
				return new Promise((resolve)=>{
						this.$axios({
							method:"get",
							url:"/Articles/GetList",
							headers:this.header_token,
							params:{
								pageIndex:1,
								pageSize:this.pSize
							}
						})
						.then(res=>{
							console.log(res);
							if(res.data.code==0){
								this.ready=true;
								this.count=res.data.data.RecordCount;
								this.house=res.data.data.DataList;
								var house=this.house;
								house.forEach((item,idx)=>{
									if(item.ThumbUrl&&item.ThumbUrl.indexOf("http")>-1){
										$get("/My/GetBase64FromUrl",{url:item.ThumbUrl},{"token": uToken()})
										.then(res=>{
											this.house[idx].ThumbUrl="data:image/png;base64,"+res.data.data;
											if(idx==this.house.length-1){
												this.house=this.house;
											}
										})
									}
								})
							}else{
								Toast(res.data.msg);
								if(res.data.code==500){
									// 重新登陆
									this.$store.dispatch('logout');
									setTimeout(()=>{
										this.$router.replace({name:"login"});
									},500)
								}
							}
							Indicator.close();
							resolve(res);
							this.load=true;
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
	.hbZx{background-color: #F5F5F5;min-height: 100vh;padding-bottom: 0;}
	.hbZx .earnAll{padding: 0.2rem 0.34rem 0.2rem;min-height: 100vh;}
	.hbZx .earnAll .jjrSection{margin: 0.3rem 0;}
	.jjrL{padding: 0.3rem 0.2rem;background-color: #fff;margin-bottom: 0.3rem;box-shadow: 0px 2px 6px 2px rgba(0, 0, 0, 0.06);border-radius: 0.1rem;}
	.hbZx .jrl{width: 100%;height: 2.4rem;max-height: 2.4rem;overflow: hidden;position: relative;margin-bottom: 0.2rem;}
	.nStatus{padding: 2px 0.1rem;color: #fff;background-color: #F3240A;position: absolute;left: 0;top: 0;font-size: 0.24rem;}
	.hbZx .jrr{width: 100%;}
	.jjrs{width: 100%;}
	.jrr h4{
		    font-weight: bolder;
		    color: #203140;
		    font-size: 0.3rem;
			margin-bottom: 0.1rem;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			position: relative;
	}
	.jrr p{
		color: #666;
		font-size: 0.24rem;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.jrbtn{text-align: left;}
	.jrbtn button{
		padding: 0;
		text-align: center;
		margin-top: 0.4rem;
		margin-right: 0.8rem;
		width:1.2rem;
		height:0.52rem;
		line-height: 0.52rem;
		background: linear-gradient(134deg, #FB6F52 0%, #F3240A 100%);
		border-radius:0.4rem;
		font-size: 0.28rem;
		border: 0;
	}
	.jrbtn button:last-child{margin-right: 0;background: linear-gradient(133deg, #7BACEE 0%, #6089D9 100%);}
	.jrbtn button img{width: 0.26rem;vertical-align: -2px;margin-left: 3px;}
	.hbZx .jjrSection{margin-top: 0;}
	.none{width: 100%;height: 6.4rem;margin: 0.8rem auto 0;padding-top: 4.3rem;text-align: center;font-size: 0.28rem;color: #666; background: url(../assets/img/none.png) center top no-repeat;background-size: 4rem;}
	.hbZx .none{margin-top: 0;padding-top: 6.6rem;background: url(../assets/img/none.png) center 2rem no-repeat;background-size: 4rem;}
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
	.jrr p.newTag{font-size: 0.2rem;margin-top: 0.1rem;}
	.jrr span,.jrr label{padding: 2px 0.1rem;background-color: #ededed;color: #999;margin-left: 0.06rem;border-radius: 0.1rem;}
	.jrr span{margin-left: 0;color: #fff;background-color: #50bcec;}
	.newHouse .jrr h4{line-height: 1;}
	.newHouse .hbhBtn{text-align: right;}
	.jrr h4 strong{display: inline-block;width: 100%;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}
	.jrr h4 i{font-style: normal;font-weight: 500;color: #f53218;position: absolute;right: 0;top: 0.04rem;font-size: 0.28rem;}
	.jrr p.summary{
		overflow:hidden;
		text-overflow:ellipsis;
		display:-webkit-box; 
		-webkit-box-orient:vertical;
		-webkit-line-clamp:2; 
	}
	.noList{color: #ccc;font-size: 0.26rem;text-align: center;margin-top: 0.8rem;}
	.noList span{display: inline-block;height: 1px;width: 2rem;background-color: #eee;position: relative;top: -3px;}
</style>
