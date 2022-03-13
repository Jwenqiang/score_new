<template>
	<div class="house hbh">
		<div class="hbTab">
			<a>
			<label :class="hType=='S'?'on':''" @click="setType('S')">二手房</label>
			<label :class="hType=='N'?'on':''" @click="setType('N')">新房</label>
			</a>
		</div>
		<div class="hSearch">
			<div v-if="hType=='S'">
				<i class="mintui mintui-search"></i>
				<span class="iclear" v-if="content" @click="content=''"></span>
				<input type="text" placeholder="请输入中原编码或小区名称" v-model="content" @keyup.enter="search(content)" @input="getTags()"/>
				<button @click="search(content)">搜索</button>
			</div>
			<div class="otherCity" v-else>
				<span class="hblAddr" @click="showCity=true">{{cityName}}</span>
				<i class="mintui mintui-search"></i>
				<input type="text" class="newInput" placeholder="请输入楼盘名/地址/地铁站" v-model="content" @keyup.enter="search(content)" @input="getTags()"/>
				<button @click="search(content)">搜索</button>
			</div>
			<div class="searchResult" v-show="tagList">
				<ul>
					<li v-for="(item,index) in tagList" :key="index" @click="search(item.Tag)"><label>{{item.Tag}}</label><span v-if="hType=='S'">约{{item.SNum}}套</span><span v-else><i>{{item.AvgPrice}}</i></span></li>
				</ul>
			</div>
		</div>
		<div class="earnAll" @click="tagList=''">
			<div class="jjrSection" v-if="hType=='S'">
				<div v-if="house.length>0">
					<div class="clear jjrL" v-for="(item,index) in house" :key="item.ZyHouseOutputDto.AdsNo">
						<div class="jrl" @click="shareHouse(item.ZyHouseOutputDto.AdsNo,item.ZyHouseOutputDto.StaffNo)">
							<img v-lazy="item.ZyHouseOutputDto" width="100%"/>
						</div>
						<div class="jrr">
							<div @click="shareHouse(item.ZyHouseOutputDto.AdsNo,item.ZyHouseOutputDto.StaffNo)">
							<h4 class="jrt">{{item.ZyHouseOutputDto.Title}}</h4>
							<p>{{item.ZyHouseOutputDto.EstateName}}·{{item.ZyHouseOutputDto.RoomCount}}室{{item.ZyHouseOutputDto.HallCount}}厅·{{item.ZyHouseOutputDto.Garea}}㎡</p>
							</div>
							<p class="jrbtn hbhBtn">
								<mt-button type="primary" class="hbShare" @click="shareHouse(item.ZyHouseOutputDto.AdsNo,item.ZyHouseOutputDto.StaffNo)">分享房源</mt-button>
								<mt-button type="primary" class="hbShare" @click="goHb('1',item.ZyHouseOutputDto.AdsNo,item.ZyHouseOutputDto.PostId)">分享海报</mt-button>
							</p>
						</div>
					</div>
					<p style="text-align: center;font-size: 0.24rem;color: #ccc;line-height: 1rem;" v-if="count>pSize">正在加载</p>
					<p class="noList" v-if="count<=pSize&&loadOver"><span></span>&nbsp;我是有底线的&nbsp;<span></span></p>
				</div>
				<div class="none" v-if="house.length==0&&ready">暂无二手房房源信息~</div>
			</div>
			<div class="jjrSection newHouse" v-else>
				<div v-if="houseNew.length>0">
					<div class="clear jjrL" v-for="(item,index) in houseNew" :key="item.EstExtId">
						<div class="jrl" @click="shareHouse(item.EstExtId,jjrNum)">
							<img v-lazy="item" width="100%"/>
							<label class="nStatus" v-if="item.Status=='售罄'" style="background: #ccc;">{{item.Status}}</label>
							<label class="nStatus" v-else>{{item.Status}}</label>
						</div>
						<div class="jrr">
							<div @click="shareHouse(item.EstExtId,jjrNum)">
							<h4 class="jrt"><strong>{{item.AdName}}</strong><i class="avgPrice" v-if="item.NewAvgPrice>0">{{item.NewAvgPrice | fix}}</i><i v-else>售价待定</i></h4>
							<p>{{item.District.GScopeCnName}}<template v-if="item.GScope.GScopeCnName">·{{item.GScope.GScopeCnName}}</template><template v-if="item.MinArea>0">丨{{item.MinArea}}-{{item.MaxArea}}㎡</template></p>
							<p class="newTag"><span>{{item.EstType}}</span><label v-if="item.Features.split('、')[0]">{{item.Features.split('、')[0]}}</label><label v-if="item.Features.split('、')[1]">{{item.Features.split('、')[1]}}</label><label v-if="item.Features.split('、')[2]">{{item.Features.split('、')[2]}}</label> </p>
							</div>
							<p class="jrbtn hbhBtn">
								<mt-button type="primary" class="hbShare" @click="shareHouse(item.EstExtId,jjrNum)">分享房源</mt-button>
								<mt-button type="primary" class="hbShare" @click="goHb('6',item.EstExtId)">分享海报</mt-button>
							</p>
						</div>
					</div>
					<p style="text-align: center;font-size: 0.24rem;color: #ccc;line-height: 1rem;" v-if="countNew>pSize&&pSize<30">正在加载</p>
					<p class="noList" v-if="pSize==30&&loadOver"><span></span>&nbsp;我是有底线的&nbsp;<span></span></p>
				</div>
				<div class="none" v-if="houseNew.length==0&&ready">暂无新房搜索结果~</div>
			</div>
		</div>
		
		<nut-picker
		  :is-visible="showCity"
		  :list-data="cityData"
		  @close="showCity=false"
		  @confirm="choseCity"
		></nut-picker>
		
	</div>
</template>

<script>
	import Vue from 'vue';
	import {
	  uToken,
	} from "@/global/token.js";
	import { Toast,Indicator } from 'mint-ui';
	import { Search } from 'mint-ui';
	// 京东框架2.X
	import nutUI from '@nutui/nutui/dist/nutui.js';  // 加载构建后的JS
	import '@nutui/nutui/dist/nutui.css';  //加载构建后的CSS
	nutUI.install(Vue);
	import i from "@/assets/img/noYb.png";
	export default{
		name: 'hbHouse',
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
				hType:'S',
				loadImg:require('@/assets/img/loading.jpg'),
				loadOver:false,
				scrollTop: 0,
				load:false,
				cityName:"深圳",
				cityen:'sz',
				showCity:false,
				cityData:[
        [
          {
            label: 'sz',
            value: '深圳',
          },
          {
            label: 'zs',
            value: '中山',
          },
          {
            label: 'zh',
            value: '珠海',
          },
          // {
          //   label: 'dg',
          //   value: '东莞',
          // }
        ],
      ]
			}
		},
		created() {
			document.title="房源分享";
			if(this.$route.query.tab){
				this.type=this.$route.query.tab
			}
			if(this.$route.query.jjr){
				this.jjrNum=this.$route.query.jjr
			}
			if(this.$route.query.cityName){
				this.cityName=this.$route.query.cityName
				if(this.$route.query.cityName!='深圳'){
					this.hType="N";
					if(this.$route.query.cityName=='中山'){
						this.cityen="zs";
					}else if(this.$route.query.cityName=='珠海'){
						this.cityen="zh";
					}
				}
			}
			// this.getHouse();
		},
		// 注意：只有当组件在 <keep-alive> 内被切换，才会有activated 和 deactivated 这两个钩子函数
		 activated() {//在vue对象存活的情况下，进入当前存在activated()函数的页面时，一进入页面就触发；可用于初始化页面数据等
		   this.header_token={"token": uToken()};
				// 全局绑定滚动事件，
		    window.addEventListener("scroll", this.scrollT);
				if(this.hType=='S'&&!this.content)
				this.getHouse();
		  },
		  deactivated() {
		    // 组件消失，解绑scroll事件
		    window.removeEventListener("scroll", this.scrollT);
		  },
		filters:{
			fix(n){
				let p=Number(n).toFixed(0);
				return p+"元/㎡";
			},
			changeImg(n){
				if(n.indexOf('.jpg')>-1){
					let v=n.split('.jpg')[0];
					return v+'_300x210_w.jpg';
				}else{
					let v=n.split('.png')[0];
					return v+'_300x210_w.png';
				}
			}
		},
		watch:{
			cityName(){
				this.search();
			},
			scrollTop(newValue, oldValue) {//滚动分页
			console.log(newValue)
				var height = document.getElementsByClassName('earnAll')[0].scrollHeight;
				let sTop = document.documentElement && document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop;//滚动的高度
				let clientHeight=window.screen.height;//屏幕的高度
				if(this.count>this.pSize||this.countNew>this.pSize){
					//+-5是为了保证一定的弹性，并非要刚好相等才出发，
					if(sTop>0){
						if(height-100<sTop+clientHeight&&this.load){
							  // console.log('监听成功','到达底部')
								  if(this.hType=='N'){
									  if(this.pSize<30&&this.countNew>30){
											this.pSize=Number(this.pSize)+10; 
									  }else{
										  setTimeout(()=>{
											this.loadOver=true
										  },1000)
									  }
								  }else{
									  if(this.pSize<this.count){
										this.pSize=Number(this.pSize)+10; 
									  }
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
					if(!this.content){
						if(this.hType=='S'){
							this.getHouse();
						}else{
							this.search();
						}
					}else{
						this.search()
					}					
				}
				
			},
			content(){
				this.pSize=10;
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
			closeCity(){
				
			},
			choseCity(n){
				console.log(n);
				this.cityName=n[0].value;
				this.cityen=n[0].label;
			},
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
				if(this.hType=='S'){
					this.$router.push({name:'hh',query:{adsNo:id,empNo:num}})
				}else{
					this.$router.push({name:'h5New',query:{extId:id,empNo:num,cityen:this.cityen}})
				}
			},
			goHb(type,id,pId){
				if(type==1){
					this.$router.push({name:'hb',query:{id:1,adsNo:id,postId:pId}})
				}else{
					this.$router.push({name:'hb',query:{id:6,estExtId:id,cityen:this.cityen}})
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
								category:this.hType,
								cityen:this.cityen
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
				this.load=false;
				Indicator.open();
				return new Promise((resolve)=>{
						this.$axios({
							method:"get",
							url:"/ZhongyuanHouseV2/GetMyEstatesV2",
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
								this.count=res.data.data.count;
								this.house=res.data.data.list;
								var list=res.data.data.list;
								if(list.length>0){
									for(let i in list){
										this.$set(list[i].ZyHouseOutputDto,'loading',this.loadImg)
										this.$set(list[i].ZyHouseOutputDto,'src',list[i].ZyHouseOutputDto.FullImagePath.split('.jpg')[0]+'_300x210_w.jpg')
									}
									this.house=list;
									console.log(this.house);
								}
							}else{
								Toast(res.data.msg);
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
				this.load=false;
				if(n){
					this.content=n.split("　")[0];
				}
				// 神策
				let id=this.content.length>17;
				this.$sensors.track('sc_click_search', {
					sc_business_type:this.hType=='N'?"new_house":"second_hand_house",
					sc_srh_word:this.content,
					sc_house_id:id?this.content:'',
					sc_srh_type:"手动搜索",
					sc_source_page:"我的_房源分享页"
				});
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
									var list=res.data.data.List;
									if(list.length>0){
										for(let i in list){
											this.$set(list[i].ZyHouseOutputDto,'loading',this.loadImg)
											this.$set(list[i].ZyHouseOutputDto,'src',list[i].ZyHouseOutputDto.FullImagePath.split('.jpg')[0]+'_300x210_w.jpg')
										}
										this.house=list;
									}
								}else{
									Toast(res.data.message);
								}
								setTimeout(()=>{
									Indicator.close();
								},300)
								this.load=true;
							})
							.catch(error=>{
								Indicator.close();
								Toast("网络错误，请稍后再试1");
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
									pageSize:this.pSize,
									cityen:this.cityen
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
									var list=res.data.data.List;
									if(list.length>0){
										for(let i in list){
											this.$set(list[i],'loading',this.loadImg)
											if(list[i].FullImagePath.indexOf('.png')>-1){
												this.$set(list[i],'src',list[i].FullImagePath.split('.png')[0]+'_300x210_w.jpg')
											}else{
												this.$set(list[i],'src',list[i].FullImagePath.split('.jpg')[0]+'_300x210_w.jpg')
											}
											
										}
										this.houseNew=list;
									}
								}else{
									Toast(res.data.message);
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
	.hbh .earnAll{padding: 1.2rem 0.34rem 1rem;min-height: 100vh;}
	.hbh .earnAll .jjrSection{margin: 0.3rem 0;}
	.jjrL{padding: 0.3rem 0.2rem;background-color: #fff;margin-bottom: 0.3rem;box-shadow: 0px 2px 6px 2px rgba(0, 0, 0, 0.06);border-radius: 0.1rem;}
	.jrl{width: 2.4rem;float: left;margin-right: 0.2rem;height: 1.8rem;overflow: hidden;position: relative;border-radius: 0.08rem;}
	.jrl img{min-height: 100%;}
	.nStatus{padding: 2px 0.1rem;color: #fff;background-color: #F3240A;position: absolute;left: 0;top: 0;font-size: 0.24rem;}
	.jrr{float: left;width: 3.82rem;}
	.jrr h4{
		    font-weight: bolder;
		    color: #203140;
		    font-size: 0.3rem;
			margin-bottom: 0.1rem;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 2;
			overflow: hidden;
			text-overflow: ellipsis;
			position: relative;
	}
	.jrr p{
		color: #666;
		font-size: 0.24rem;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.jrbtn{text-align: left;}
	.jrbtn button{
		padding: 0;
		text-align: center;
		margin-top: 0.2rem;
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
	
	.hbh .hbTab{text-align: center;padding: 0;font-size: 0.32rem;color: #333;position: fixed;bottom: 0;left: 0;width: 100%;z-index: 7;
			padding-bottom: constant(safe-area-inset-bottom);
			padding-bottom:env(safe-area-inset-bottom);
			background-color: #fff;
	}
	.hbh .hbTab a{display: inline-block;background-color: #fff;box-shadow: 0 0 2px #ccc;}
	.hbh .hbTab label{display: inline-block;width: 3.65rem;height: 1rem;margin: 0 0.2rem 0 0;line-height: 1rem;color: #333;font-weight: 600;}
	.hbh .hbTab label:last-child{margin: 0;}
	.hbh .hbTab label.on{background: linear-gradient(134deg, #FB6F52 0%, #F3240A 100%);color: #fff;}
	.newHouse button.hbShare{margin-top: 0.2rem;margin-bottom: 2px;}
	.jrr p.newTag{font-size: 0.2rem;margin-top: 0.1rem;}
	.jrr span,.jrr label{padding: 2px 0.1rem;background-color: #ededed;color: #999;margin-left: 0.06rem;border-radius: 0.1rem;}
	.jrr span{margin-left: 0;color: #fff;background-color: #50bcec;}
	.newHouse .jrr h4{line-height: 1;}
	.newHouse .hbhBtn{text-align: right;}
	.jrr h4 strong{display: inline-block;width: 2.3rem;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}
	.jrr h4 i{font-style: normal;font-weight: 500;color: #f53218;position: absolute;right: 0;top: 0.04rem;font-size: 0.28rem;}
	.noList{color: #ccc;font-size: 0.26rem;text-align: center;margin-top: 0.8rem;}
	.noList span{display: inline-block;height: 1px;width: 2rem;background-color: #eee;position: relative;top: -3px;}
	
	.hSearch .newInput{width: 5.3rem;}
	.hblAddr{width: 0.9rem;display: inline-block;background: url(../assets/img/s-down.png) 90% center no-repeat;background-size: 0.2rem;font-weight: 600;}
	.otherCity{width: inline-block;}
	.hSearch .otherCity .mintui-search{left: 1.24rem;}
</style>
