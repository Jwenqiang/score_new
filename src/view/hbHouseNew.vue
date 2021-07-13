<template>
	<div class="house hbh">
		<div class="hSearch">
			<i class="mintui mintui-search"></i>
			<span class="iclear" v-if="content" @click="content=''"></span>
			<input type="text" placeholder="请输入楼盘名" v-model="content" @keyup.enter="search(content)"/>
			<button @click="search(content)">搜索</button>
		</div>
		<div class="earnAll" style="padding-bottom: 0.4rem;">
				<div v-if="houseNew.length>0" style="margin: 0.3rem 0;">
					<div class="clear jjrL" v-for="(item,index) in houseNew" :key="item.Id" style="padding-bottom: 0.2rem;">
						<div class="newHouseL">
							<div @click="shareHouse(item.Id,jjrNum)" style="padding-bottom: 0.1rem;">
							<h4 class="jrt"><strong>{{item.NewEstateName}}</strong><i v-if="item.CityName">{{item.CityName}}</i></h4>
							<p>批准日期：<span>{{item.ApproveDate | change}}</span></p>
							<p>推送产品：<span>{{item.HouseCount}}{{item.HouseArea}}&nbsp;&nbsp;&nbsp;&nbsp;{{item.NewEstateType}}</span></p>
							</div>
							<p class="jrbtn hbhBtn">
								<span>参考均价：<strong>{{item.AreaPrice}}</strong></span>
								<mt-button type="primary" class="hbShare" @click="goHb('9',item.Id)">分享海报</mt-button>
							</p>
						</div>
					</div>
					<p style="text-align: center;font-size: 0.24rem;color: #ccc;line-height: 1rem;" v-if="countNew>pSize">正在加载</p>
					<p class="noList" v-else-if="countNew<=pSize&&load"><span></span>&nbsp;我是有底线的&nbsp;<span></span></p>
				</div>
				<div class="none" v-if="houseNew.length==0&&ready">暂无新盘搜索结果~</div>
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
		name: 'hbHouseNew',
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
				pIdx:1,
				pSize:10,
				content:"",
				tagList:"",
				showTag:false,
				mr:i,
				hType:'N',
				loadImg:require('@/assets/img/loading.jpg'),
				loadOver:false,
				scrollTop: 0,
				load:false
			}
		},
		created() {
			document.title="新盘入市";
			if(this.$route.query.tab){
				this.type=this.$route.query.tab
			}
			if(this.$route.query.jjr){
				this.jjrNum=this.$route.query.jjr
			}
			  window.addEventListener("scroll", this.scrollT);
				this.search()
		},
		beforeDestroy() {
			// 组件消失，解绑scroll事件
			window.removeEventListener("scroll", this.scrollT);
		},
		// 注意：只有当组件在 <keep-alive> 内被切换，才会有activated 和 deactivated 这两个钩子函数
		 // activated() {//在vue对象存活的情况下，进入当前存在activated()函数的页面时，一进入页面就触发；可用于初始化页面数据等
		 //    // 全局绑定滚动事件，
		 //    window.addEventListener("scroll", this.scrollT);
			// this.search()
		 //  },
		 //  deactivated() {
		 //    // 组件消失，解绑scroll事件
		 //    window.removeEventListener("scroll", this.scrollT);
		 //  },
		filters:{
			fix(n){
				let p=Number(n).toFixed(0);
				return p+"元/㎡";
			},
			change(v){
				return v.split(" ")[0];
			}
		},
		watch:{
			scrollTop(newValue, oldValue) {//滚动分页
				var height = document.getElementsByClassName('earnAll')[0].scrollHeight;
				let sTop = document.documentElement && document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop;//滚动的高度
				let clientHeight=window.screen.height;//屏幕的高度
				if(this.count>this.pSize||this.countNew>this.pSize){
					//+-5是为了保证一定的弹性，并非要刚好相等才出发，
					if(sTop>0){
						if(height-100<sTop+clientHeight&&this.load){
						  if(this.pSize<this.countNew){
							this.pSize=Number(this.pSize)+10; 
						  }
						 }
					 }
				}else{
					setTimeout(()=>{
						this.loadOver=true
					},1000)
				}
			},
			pSize(){
				// this.search()
				if(this.pSize>10){
					this.search()
				}
				
			},
			content(){
				this.pSize=10;
				if(!this.content){
					this.search();
				}
			},
		},
		mounted() {
		},
		methods:{
			scrollT(){
				this.scrollTop = window.scrollY;
			},
			goHb(type,id,pId){
				this.$router.push({name:'hb',query:{id:9,estExtId:id}})
			},

			search(n){
				this.load=false;
				if(n){
					this.content=n.split("　")[0];
				}
				this.tagList="";
				Indicator.open();
					return new Promise((resolve)=>{
							this.$axios({
								method:"get",
								url:"Poster/GetNewEstateList",
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
									this.houseNew=res.data.data.DataList;
									this.countNew=res.data.data.RecordCount;
									var list=res.data.data.DataList;
									this.ready=true;
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
								setTimeout(()=>{
									Indicator.close();
								},300)
								this.load=true;
							})
							.catch(error=>{
								Indicator.close();
								Toast("网络错误，请稍后再试");
							})
					})
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
	.hbh .earnAll{padding: 1.2rem 0.34rem 1rem;min-height: 100vh;}
	.hbh .earnAll .jjrSection{margin: 0.3rem 0;}
	.jjrL{padding: 0.3rem 0.2rem;background-color: #fff;margin-bottom: 0.3rem;box-shadow: 0px 2px 6px 2px rgba(0, 0, 0, 0.06);border-radius: 0.1rem;}
	.jrl{width: 2.4rem;float: left;margin-right: 0.2rem;height: 1.8rem;overflow: hidden;position: relative;}
	.nStatus{padding: 2px 0.1rem;color: #fff;background-color: #F3240A;position: absolute;left: 0;top: 0;font-size: 0.24rem;}
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
	.hbhBtn button.hbShare{margin: 0.2rem 0.4rem 0 0;width: 1.6rem;background: none;border: 1px solid #1562E7;color: #1562E7;}
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
	
	.hbh .hbTab{text-align: center;padding: 0.4rem 0 0;font-size: 0.32rem;color: #333;position: fixed;bottom: 0;left: 0;width: 100%;z-index: 7;}
	.hbh .hbTab a{display: inline-block;background-color: #fff;box-shadow: 0 0 2px #ccc;}
	.hbh .hbTab label{display: inline-block;width: 3.65rem;height: 1rem;margin: 0 0.2rem 0 0;line-height: 1rem;color: #333;font-weight: 600;}
	.hbh .hbTab label:last-child{margin: 0;}
	.hbh .hbTab label.on{background: linear-gradient(134deg, #FB6F52 0%, #F3240A 100%);color: #fff;}
	.newHouseL{float: left;width: 100%;}
	.newHouseL h4{
		    font-weight: bolder;
		    color: #203140;
		    font-size: 0.34rem;
			margin-bottom: 0.1rem;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			position: relative;
	}
	.newHouseL p{
		color: #999;
		font-size: 0.28rem;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		margin-bottom: 0.1rem;
	}
	.newHouseL p span{color: #333;position: relative;top: 2px;}
	.newHouse button.hbShare{margin-top: 0.2rem;margin-bottom: 2px;}
	.newHouse .hbhBtn{text-align: right;}
	.newHouseL h4 strong{display: inline-block;width: 4.5rem;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;height: 0.6rem;}
	.newHouseL h4 i{font-style: normal;font-weight: 500;position: absolute;right: 0;top: 0.04rem;font-size: 0.28rem;background-color: #F3F6F8;color: #999;font-size: 0.26rem;padding: 3px 0.2rem;border-radius: 0.2rem;}
	.newHouseL .jrbtn{border-top: 1px solid #eee;color: #999;padding-top: 0.3rem;}
	.newHouseL .jrbtn span{color: #999;}
	.newHouseL .jrbtn strong{color: #F53A1F;font-size: 0.34rem;}
	.newHouseL .jrbtn button.hbShare{float: right;margin-top: 0;}
	.noList{color: #ccc;font-size: 0.26rem;text-align: center;margin-top: 0.8rem;}
	.noList span{display: inline-block;height: 1px;width: 2rem;background-color: #eee;position: relative;top: -3px;}
	
</style>
