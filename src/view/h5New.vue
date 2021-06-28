<template>
	<div class="hh" v-show="ready">
		<div class="clear fTop">
			<a :href="isIOS?'https://datayi.cn/rBW5y70':'https://datayi.cn/r3jQdWK'">
				<label></label>
				<div class="ftMid">
					<h3>打开中原找房APP</h3>
					<p>订阅房源动态，在线咨询经纪人！</p>
				</div>
				<button>立即打开</button>
			</a>
		</div>
		<div class="top">
			<mt-swipe :auto="0" :showIndicators="false" @change="handleChange">
				<template>
					<mt-swipe-item v-for="(item,index) in imgArr" :key="index"><img :src="item.FullImagePath | changeImgBan" preview="1"/></mt-swipe-item>
				</template>
			</mt-swipe>
			<label class="idxTag" v-if="imgArr.length>0">{{aIdx}}/{{imgArr.length}}</label>
		</div>
		<div class="top1">
			<div class="topTag" v-if="house.EstType"><label class="mTag" v-if="house.EstType">{{house.EstType}}</label><label v-if="house.Features.split('、')[0]">{{house.Features.split('、')[0]}}</label><label v-if="house.Features.split('、')[1]">{{house.Features.split('、')[1]}}</label><label v-if="house.Features.split('、')[2]">{{house.Features.split('、')[2]}}</label><label v-if="house.Features.split('、')[3]">{{house.Features.split('、')[3]}}</label></div>
			<h3>{{house.AdName}}<span style="font-weight: 400;font-size: 0.32rem;" v-if="house.KeepRecordName">（{{house.KeepRecordName}}）</span><i style="background-color: #ddd;" v-else>{{house.ExtStatus}}</i><label style="background-color: #ddd;" v-if="house.ExtStatus=='售罄'">{{house.ExtStatus}}</label><label v-else>{{house.ExtStatus}}</label></h3>
			<div class="topPrice">
				<div class="topPl">
					<p>均价 <strong v-if="house.AveragePrice>0">{{house.AveragePrice}}元/平</strong><strong v-else>待定</strong></p>
					<p>户型 <span>{{house.RoomsName || '待定'}}</span></p>
					<p>开盘 <span>{{house.NewOpDate || '待定'}}</span></p>
				</div>
				<div class="topPr">
					<p>总价 <strong v-if="house.MinTotalPrice>0">{{house.MinTotalPrice}}万起</strong><strong v-else>待定</strong> </p>
					<p>建面 <span v-if="house.MinArea>0">{{house.MinArea | fix}}-{{house.MaxArea | fix}}㎡</span><span v-else>待定</span></p>
					<p>装修情况 <span>{{house.Fitment || '待定'}}</span> </p>
				</div>
			</div>
			<template v-if="show==2">
			<div class="topPrice">
				<div class="topPl">
					<p>交房时间 <span>{{house.NewLiveDate || '待定'}}</span></p>
					<p>产权年限 <span v-if="house.PropertyRight>0">{{house.PropertyRight}}年</span><span v-else>待定</span></p>
					<p>规划户数 <span>{{house.BaseNewProp.PlanUnit || '待定'}}</span></p>
					<p>占地面积 <span v-if="house.BaseNewProp.PlanArea>0">{{house.BaseNewProp.PlanArea}}㎡</span><span v-else>待定</span> </p>
					<p>物业费 <span v-if="house.MgtPrice>0">{{house.MgtPrice}}元/平/月</span><span v-else>待定</span> </p>
				</div>
				<div class="topPr">
					<p>建筑类型 <span>{{house.BuildingTypes || '待定'}}</span></p>
					<p>绿化率 <span v-if="house.BaseNewProp.GreenRatio>0">{{house.BaseNewProp.GreenRatio}}%</span><span v-else>待定</span> </p>
					<p>容积率 <span v-if="house.FloorRatio>0">{{house.FloorRatio}}</span><span v-else>待定</span> </p>
					<p>规划车位 <span>{{house.BaseNewProp.Park || '待定'}}</span> </p>
					<p>建筑面积 <span v-if="house.BaseNewProp.BuildArea>0">{{house.BaseNewProp.BuildArea}}㎡</span><span v-else>待定</span> </p>
				</div>
			</div>
			<div class="moreMsg">
				<p>开发商 <span>{{house.BaseNewProp.Developer|| '待定'}}</span></p>
				<p>物业公司 <span>{{house.BaseNewProp.MgtCompany|| '待定'}}</span></p>
<!-- 				<p>预售证号 <span></span></p>
				<p>发证时间 <span></span></p> -->
			</div>
			</template>
			<div class="ctip"><a :href="'tel:'+user.Mobile">该项目附近中小学情况<span>免费咨询</span></a></div>
			<div class="readMore" @click="showDetails">
				<label v-if="show==1"><i></i> 查看更多 <i></i></label>
				<label v-if="show==2"><i></i> 收起更多 <i></i></label>
				<!-- <p><i class="iconfont icon2xiangxia" v-if="show==1"></i><i class="iconfont icon2xiangshang" v-if="show==2"></i></p> -->
			</div>
<!-- 			<div class="ckj">
				<template v-if="house.GuidingSalePrice>0">
					<p>本套房源参考总价：<span>{{house.GuidingSalePrice/10000 | fix}}万元</span></p>
					<p>本小区政府参考单价：<span>{{house.GuidingPrice | fix}}元/㎡</span><a href="http://zjj.sz.gov.cn/attachment/0/749/749839/8545777.pdf" target="_blank">查看详情<img src="../assets/static/h-right.png" /></a href="http://zjj.sz.gov.cn/attachment/0/749/749839/8545777.pdf"></p>
				</template>
				<template v-else>
					<p style="text-align: center;margin: 0.2rem 0;">本套房源暂无政府参考价<a href="http://zjj.sz.gov.cn/attachment/0/749/749839/8545777.pdf" target="_blank">查看详情<img src="../assets/static/h-right.png" /></a href="http://zjj.sz.gov.cn/attachment/0/749/749839/8545777.pdf"></p>
				</template>
			</div> -->
		</div>
		<div class="top3" v-if="cp.PingCeCount>0">
			<h5>测评报告</h5>
			<div class="t3Cp">
				<a :href="'http://esf.centanet.com/tools/newprop/assess/?id='+house.InfoId+'&cityen=sz&type=evaluate'">
					<label><img src="../assets/img/bj-cp.png" width="100%"/></label>
					<p>中原地产-{{house.AdName}}专业测评</p>
					<p><span>已有<i>{{cp.PingCeCount}}</i>人查看<img src="../assets/img/icon-right.png"/></span></p>
				</a>
			</div>
			<!-- <a :href="'tel:'+user.Mobile" class="callMore">咨询更多房源优势</a> -->
		</div>
		<div class="top3" v-if="hx">
			<h5>户型图（{{hx.length}}）</h5>
			<div class="hxMain">
<!-- 				<mt-navbar v-model="selected" class="hNav">
				  <mt-tab-item id="1"><span>全部</span></mt-tab-item>
				  <mt-tab-item id="2"><span>A户型</span></mt-tab-item>
				  <mt-tab-item id="3"><span>B户型</span></mt-tab-item>
				  <mt-tab-item id="4"><span>C户型</span></mt-tab-item>
				</mt-navbar> -->

				<mt-tab-container v-model="selected">
				  <mt-tab-container-item id="1">
						<div class="swiper-container sHx">
							<div class="swiper-wrapper">
								<div class="swiper-slide" v-for="(item,index) in hx" :key="index">
									<div class="title">
											<div class="ihot-msg">
												<p><template v-if="item.RoomCnt>0">{{item.RoomCnt}}室</template><template v-if="item.HallCnt>0">{{item.HallCnt}}厅</template><template v-if="item.BalconyCnt>0">{{item.BalconyCnt}}阳台</template><template v-if="item.ToiletCnt>0">{{item.ToiletCnt}}卫</template> 建面{{item.Area | fix}}㎡</p>
											</div>
											<img :src="item.Imgs[0].FullImagePath | changeImg" preview="2" :preview-text="item.RoomCnt+'室'+item.HallCnt+'厅'+item.BalconyCnt+'阳'+'台'+item.ToiletCnt+'卫  建面'+item.Area+'㎡'"/>
									</div>
									<div class="hxTag" v-if="item.Tags">
										<label v-if="item.Tags.split(',')[0]">{{item.Tags.split(',')[0]}}</label>
										<label v-if="item.Tags.split(',')[1]">{{item.Tags.split(',')[1]}}</label>
										<label v-if="item.Tags.split(',')[2]">{{item.Tags.split(',')[2]}}</label>
										<label v-if="item.Tags.split(',')[3]">{{item.Tags.split(',')[3]}}</label>
									</div>
									<div class="hxBtom">
										<p v-if="item.TotalPrice>0">总价 {{item.TotalPrice/10000 | fix}}万/套 </p>
										<p v-else>总价 待定 </p>
										<p><a :href="'tel:'+user.Mobile">联系户型顾问</a></p>
									</div>
								</div>
							</div>
						</div>
				  </mt-tab-container-item>
				</mt-tab-container>
			</div>
		</div>
		<div class="top4" v-if="dt">
			<h5>楼盘动态</h5>
			<div class="t4Dt" v-if="dt.length>0">
				<ul>
					<li v-for="(item,index) in dt" :key="item.CreateTime" v-if="index<all">
						<a :href="item.DetailUrl">
						<p><label></label><i>{{item.CreateTime}}</i></p>
						<p class="dtM">{{item.InfoTitle}}</p>
						</a>
					</li>
				</ul>
				<div class="readMore dtMore" v-if="dt.length>3">
					<label v-if="all==3" @click="all=dt.length"><i></i> 展开全部动态 <i></i></label>
					<label v-if="all>3" @click="all=3"><i></i> 收起部分动态 <i></i></label>
				</div>
			</div>
			<div style="text-align: center;color: #999;font-size: 0.24rem;" v-else>暂无楼盘动态</div>
			<a :href="'tel:'+user.Mobile" class="callMore">咨询最新动态</a>
		</div>

		<div class="clear hhFoot">
			<label><img :src="'https://pic.centanet.com/shenzhen/pic/agent/'+user.EmpNo+'.jpg'"  onerror="this.src='https://sz.centanet.com/partner/house/userImg/tx_none.png'" width="100%"/></label>
			<label>
				<span>{{user.EmpCnName}}</span>
				<span>{{user.PositionName}}</span>
			</label>
			<div class="appBtn" v-if="inApp">
				<a :href="'tel:'+user.Mobile">电话咨询</a>
				<a @click="share(banner)">分享</a>
			</div>
			<a :href="'tel:'+user.Mobile" v-else>电话咨询<p>隐藏号码</p></a>
		</div>

		<!-- 弹窗 -->
		<div class="sModel mMsg" v-if="hasYb&&inApp">
		  <div class="bj" @click="hasYb=false"></div>
		  <div class="bRead" @click="$router.push({name:'yb'})">
			  <p><strong>{{shareNum}}</strong>元宝</p>
		  </div>
		</div>
	</div>
</template>

<script>
	var shareLink = window.location.href;
	var shareObj = { //微信链接分享
		title: "",
		desc: '',
		link: shareLink,
		imgUrl: "https://sz.centanet.com/partner/house/shareImg/logo.png",
	};
	import Swiper from 'swiper'
	import { Toast,Indicator } from 'mint-ui';
	import {
	  uToken,
	} from "@/global/token.js";
	export default{
		name: 'h5New',
		data(){
			return{
				header_token:{"token": uToken()},
				inApp:false,
				ready:false,
				houseId:"",
				hbId:0,
				mobile:"",
				house:"",
				empNo:"",
				houseName:"",
				banner:"",
				hTs:"",
				xqgk:"",
				zbpt:"",
				imgArr:"",
				aIdx:1,
				tag:1,
				shareText:"",
				dkNum:"",
				gzNum:"",
				xq:"",
				yz:"",
				user:"",
				isIOS:false,
				isAd:false,
				show:1,
				cp:"",
				selected:"1",
				hx:"",
				dt:"",
				all:3,
				hasYb:false,
				shareNum:0
			}
		},
		beforeRouteLeave:(to,from,next)=>{
			document.title="房源分享";
			next();
		},
		created() {
			this.isIOS=isiOS;
			this.isAD=isAndroid;
			console.log(isiOS)
			if(navigator.userAgent.indexOf('aplus') > -1){
				this.inApp=true
			}
			if(this.$route.query.extId){
				this.houseId=this.$route.query.extId;
			}
			if(this.$route.query.empNo){
				this.empNo=this.$route.query.empNo;
			}
			if(this.$route.query.myTemplateId){
				this.hbId=this.$route.query.myTemplateId;//二维码扫码获取
			}
			this.getList();
			this.getInfo();
		},
		mounted(){
			window.callback=this.callback;//暴露给public页
		},
		filters:{
			fix(p){
				let price=Number(p).toFixed(0);
				return price;
			},
			changeDate(t){
				var y=t*1000;
				return new Date(y).getFullYear();
			},
			changeTime(t){
				var y=t*1000;
				var m=Number(new Date(y).getMonth())+1;
				var d=Number(new Date(y).getDate());
				if(m<10){
					m='0'+m;
				}
				if(d<10){
					d='0'+d;
				}
				return new Date(y).getFullYear()+'-'+m+"-"+d;
			},
			changeImg(n){
				let v=n.split('.jpg')[0];
				return v+'_300x210_w.jpg';
			},
			changeImgBan(n){
				let v=n.split('.jpg')[0];
				return v+'_750x500_w.jpg';
			}
		},
		methods:{
			// A+分享回调
			callback(item){
				this.shareText="回调："+item;
				if(item){
					setTimeout(()=>{
					  this.getShareLog(item);
					}, 500)
				}
			},
			getShareLog(shareName){
				return new Promise((resolve)=>{
						this.$axios({
							method:"post",
							url:"/Poster/PostMyTemplateShareLog",
							headers: {
								"token":uToken()
							 },
							data:{
								Id:0,
								adsNo:"",
								estExtId:this.houseId,
								SharedDestination:shareName
							}
						})
						.then(res=>{
							console.log("分享得到的元宝:"+res.data.data.Reamark)
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
			showDetails(){
				var that=this;
				if(that.show==1){
					that.show=2
				}else{
					that.show=1
				}
			},
			handleChange(n){
				this.aIdx=n+1;
			},
			getInfo(){
				this.$axios({
					method:"get",
					url:"/Poster/GetEmpCall",
					params:{
						empNo:this.empNo,
						p:6
					}
				})
				.then(res=>{
					if(res.data.code==0){
						this.user=res.data.data;
					}else{
						Toast(res.data.msg);
					}
				})
			},
			getCpNum(){
				this.$axios({
					method:"get",
					url:"/ZhongyuanHouseV2/GetCcesSearchNewPropCountRequest",
					params:{
						estExtId:this.houseId,
					},
				})
				.then(res=>{
					console.log(res)
					this.cp=res.data.data;
				})
			},
			getDt(){
				this.$axios({
					method:"get",
					url:"/ZhongyuanHouseV2/GetCcesNewPropInfosRequest",
					params:{
						estExtId:this.houseId,
					},
				})
				.then(res=>{
					console.log(res)
					this.dt=res.data.data;
				})
			},
			getHx(){
				this.$axios({
					method:"get",
					url:"/ZhongyuanHouseV2/GetCcesHouseTypesRequest",
					params:{
						estExtId:this.houseId,
					},
				})
				.then(res=>{
					console.log(res)
					this.hx=res.data.data;
					this.$previewRefresh();
					this.$nextTick(()=>{
						this.initSwiper();
					})
				})
			},
			getBanner(id){
				this.$axios({
					method:"get",
					url:"https://apisz.centanet.com/v6/java/json/reply/GetPostImagesRequest",
					params:{
						PostId:id,
						ImageWidth:'750',
						ImageHeight:'500',
						cityen:'sz',
						platform:'wap'
					},
				})
				.then(res=>{
					console.log("-----------------------");
					console.log(res);
					this.imgArr=res.data.Result;
					this.$previewRefresh();
				})
			},
			getYz(id){
				this.$axios({
					method:"get",
					url:"/ZhongyuanHouseV2/GetOwnerCover",
					params:{
						PropId:id,
					},
				})
				.then(res=>{

					this.yz=res.data.data;
				})
			},
			getDk(id){
				this.$axios({
					method:"get",
					url:"/ZhongyuanHouseV2/GetTakeToSeeCount",
					params:{
						PropId:id,
					},
				})
				.then(res=>{

					this.dkNum=res.data.data;
				})
			},
			getGz(id){
				this.$axios({
					method:"get",
					url:"/ZhongyuanHouseV2/GetCollectInfoCount",
					params:{
						postId:id,
					},
				})
				.then(res=>{

					this.gzNum=res.data.data;
				})
			},
			getXq(id){
				this.$axios({
					method:"get",
					url:"/ZhongyuanHouseV2/GetEstate",
					params:{
						estateCode:id,
					},
				})
				.then(res=>{
					this.xq=res.data.data;
				})
			},
			getList(){
				Indicator.open();
				return new Promise((resolve)=>{
						this.$axios({
							method:"get",
							url:"/ZhongyuanHouseV2/GetCcesNewPropExtInfoRequest",
							params:{
								estExtId:this.houseId,
								empNo:this.empNo
							}
						})
						.then(res=>{
							console.log(res);
							if(res.data.code==0){
								// 微信分享
								document.title=res.data.data.AdName;
								shareObj.title="【好房推荐】"+res.data.data.AdName;
								if(res.data.data.MinTotalPrice>0&&res.data.data.AveragePrice>0&&res.data.data.MinArea>0){
									shareObj.desc="总价 "+res.data.data.MinTotalPrice+"万起丨均价 "+res.data.data.AveragePrice+"元/㎡丨面积 "+res.data.data.MinArea+"-"+res.data.data.MaxArea+"㎡";
								}else{
									shareObj.desc="用中原找房，安心选好房"
								}
								shareObj.imgUrl=res.data.data.FullImagePath;
								this.setShare();//微信分享

								this.ready=true;
								this.imgArr=res.data.data.NewPropImgs;
								this.house=res.data.data;
								this.getCpNum();
								this.getHx();
								this.getDt();
								// this.getBanner(res.data.data.PostId);
								// this.getYz(res.data.data.PropId);
								// this.getDk(res.data.data.PropId);
								// this.getGz(res.data.data.PostId);
								// this.getXq(res.data.data.EstateCode);

								this.houseName=res.data.data.AdName;
								this.banner=res.data.data.FullImagePath;
								// if(res.data.data.PlainDescription){
								// 	this.hTs=res.data.data.PlainDescription.replace(/\\n/g,'<div></div>').split('Ď')[0];
								// 	this.xqgk=res.data.data.PlainDescription.replace(/\\n/g,'<div></div>').split('Ď')[1];
								// 	this.zbpt=res.data.data.PlainDescription.replace(/\\n/g,'<div></div>').split('Ď')[2];
								// }
								// this.ready=true;
							}else{
								Toast(res.data.msg);
							}
							setTimeout(()=>{
								Indicator.close();
							},300)
							resolve(res);
						})
						.catch(error=>{
							Indicator.close();
							Toast("网络错误，请稍后再试");
						})
				})
				setTimeout(()=>{
					Indicator.close()
				},500)
			},
			// 微信分享
			setShare(){//
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
			//初始化swiper插件
			initSwiper(){
				var mySwiper = new Swiper (".sHx",{
					direction:'horizontal',
					loop:false,  //循环
					loopFillGroupWithBlank: true,
					//一屏1.8个
					slidesPerView: 1.65,
					//每个的距离
					spaceBetween: 12,
					freeMode: true,
					freeModeFluid: true,
					//是否有拖动惯性
					freeModeMomentum: true,
					observer:true,//修改swiper自己或子元素时，自动初始化swiper
				　　 observeParents:true,//修改swiper的父元素时，自动初始化swiper
				    pagination: {
				        el: '.swp1',
				    },
				})
			},
			// A+分享
			share(i){
			    var url = "centaline:" + this.shareParams(i);
			    window.location.href = url;
			},
			shareParams(i){
			    var json = this.dataJson(i);
			    var jsonData = JSON.stringify({
			        action:"share",
			        data:json
			    });
			    return encodeURIComponent(jsonData);
			},
			dataJson(src){
				const title = ['【好房推荐】' + this.houseName]
				const averagePrice = parseInt(this.house.AveragePrice)
				if(averagePrice) title.push(`均价${averagePrice}元/平`)
				return JSON.stringify({
					channel:["wx","wxMoments"], //["wx","wxImage","wxMomentsImage","QQ"]
					img:src,
					title: title.join('，'),
					description:shareObj.desc,
					link:location.href
				});
			},
		}
	}
</script>

<style scoped>
	@import "../../node_modules/swiper/css/swiper.min.css";
	  .swiper-container{
	    --swiper-theme-color: #fff;/* 设置Swiper风格 */
	    --swiper-navigation-color: #ACACAE;/* 单独设置按钮颜色 */
	    --swiper-navigation-size: 0.4rem;/* 设置按钮大小 */
	  }
	  .swiperBtn:focus {
	      outline: #fff auto 0 !important;
	  }
	  .swiperBtn:active,.swiperBtn:hover{
		  background: none !important;
		  border: 0 !important;
	  }
	.hh{ background: #F3F6F8;padding-bottom: 1.6rem;}
	.hh .top{margin-top: 1.2rem;position: relative;overflow: hidden;}
	.hh .top img{display: block;width: 100%;}
	.idxTag{padding: 2px 0.2rem;background-color: #000;opacity: 0.6;border-radius: 0.3rem;position: absolute;right: 0.2rem;bottom: 0.2rem;color: #fff;font-size: 0.2rem;}
	.top,.swiper-warp{height: 5rem;width: 100%;}
	.top1{padding: 0.3rem;background-color: #fff;margin-bottom: 0.2rem;}
	.topTag{margin-bottom: 0.2rem;}
	.topTag label{padding: 2px 0.12rem;background-color: #F3F6F8;font-size: 0.22rem;margin-right: 0.1rem;}
	.topTag label.mTag{background: #FF2D19;color: #fff;}
	.top1 h3{font-size: 0.38rem;margin-bottom: 0.3rem;font-weight: 550;color: #333;}
	.top1 h3 i{font-size: 0.2rem;font-style: normal;padding: 2px 0.1rem;background-color: #03a9f4;color: #fff;border-radius: 4px;margin-left: 0.2rem;}
	.top1 h3 label{font-size: 0.22rem;padding: 2px 0.1rem;background-color: #00BCD4;font-weight: 400;color: #fff;border-radius: 0.06rem;}
	.topPrice{display: flex;justify-content: space-between;}
	.topPrice .topPl{width: 60%;}
	.topPrice .topPr{width: 40%;}
	.topPrice div p,.moreMsg p{font-size: 0.28rem;color: #999;margin-bottom: 0.2rem;}
	.topPrice div p span,.moreMsg p span{color: #333;margin-left: 0.1rem;}
	.topPrice div p strong{color: #FF2D19;margin-left: 0.1rem;}
	.topPrice h4{color: #FF2D19;font-size: 0.38rem;font-weight: 550;margin-bottom: 0.1rem;}
	.ckj{padding: 0.2rem;border: 1px solid #ccc;margin-top: 0.3rem;font-size: 0.24rem;color: #333;}
	.ckj span{font-size: 0.28rem;color: #FF2D19;}
	.ckj p:first-child{margin-bottom: 0.1rem;}
	.ckj a{margin-left: 0.2rem;font-size: 0.24rem;color: #5084DD;}
	.ckj a img{width: 0.12rem;margin-left: 0.1rem;vertical-align: -1px;}
	.top2{padding: 0.3rem;background-color: #fff;margin-bottom: 0.2rem;}
	.topm{margin-bottom: 0.2rem;color: #999;}
	.top2C{display: flex;justify-content: space-between;}
	.top2L{width: 65%;color: #999;}
	.top2R{width: 35%;color: #999;}
	.topm span,.top2L span,.top2R span{color: #333;}
	.top2 p{margin-bottom: 0.2rem;}
	.top2 div p:last-child{margin-bottom: 0;}
	.top3,.top4,.top5{padding: 0.3rem;background-color: #fff;margin-bottom: 0.26rem;}
	.top3 h5,.top4 h5,.top5 h5{font-size: 0.3rem;font-weight: 500;margin-bottom: 0.26rem;color: #333;}
	.top3 p{font-size: 0.28rem;color: #333;line-height: 1.5;}
	.hhFoot{z-index: 8;background-color: #fff;height: 1.6rem;width: 100%;padding: 0.2rem 0.3rem;text-align: center;position: fixed;left: 0;bottom: 0;box-shadow: 0 -2px 3px #efe9e9;}
	.hhFoot label{width: 1.2rem;height: 1.2rem;display: inline-block;float: left;margin-right: 0.2rem;}
	.hhFoot label:first-child{border-radius: 50%;overflow: hidden;border: 1px solid #e8e6e6;}
	.hhFoot label:nth-of-type(2){width: 1.8rem;}
	.hhFoot label span{display: block;width: 100%;text-align: left;}
	.hhFoot span:first-child{float: left;font-size: 0.32rem;font-weight: 600;margin: 0.18rem 0 0.15rem;display: block;line-height: 1;}
	.hhFoot span:last-child{font-size: 0.24rem;font-weight: 400;display: block;color: #666;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;}
/* 	.hhFoot a{width: 2.1rem;height: 0.74rem;float: right;display: inline-block;;line-height:0.74rem;margin-top: 0.24rem;color: #fff;background: linear-gradient(180deg, #FB6F52 0%, #F3240A 100%);border-radius: 0.08rem;font-size: 0.32rem;}
	.hhFoot a:nth-of-type(2){width: 1.2rem;margin-right: 0.2rem;background: linear-gradient(180deg, #7BACEE 0%, #6089D9 100%);} */
	.hhFoot a{width: 3rem;height: 1rem;padding-top: 0.1rem;float: right;display: inline-block;margin-top: 0.1rem;color: #fff;background: linear-gradient(180deg, #FB6F52 0%, #F3240A 100%);border-radius: 0.08rem;font-size: 0.32rem;}
	.hhFoot a p{font-size: 0.24rem;}
	
	.hhFoot .appBtn a{padding-top: 0;width: 2.1rem;height: 0.74rem;float: right;display: inline-block;line-height:0.74rem;margin-top: 0.24rem;color: #fff;background: linear-gradient(180deg, #FB6F52 0%, #F3240A 100%);border-radius: 0.08rem;font-size: 0.32rem;}
	.hhFoot .appBtn a:nth-of-type(2){width: 1.2rem;margin-right: 0.2rem;background: linear-gradient(180deg, #7BACEE 0%, #6089D9 100%);}
	
	.t3content p div{height: 0.13rem;}
	.topm{width: 100%;}
	.ctip{padding: 0 0.4rem 0 0.2rem;background-color: #F3F6F8;color: #333;font-size: 0.26rem;margin-top: 0.3rem;line-height: 0.5rem;}
	.ctip a{color: #333;}
	.ctip span{width: 2rem;height: 100%;display: inline-block;padding-right: 0.5rem;float: right;color: #FF2D19;text-align: right;background: url(../assets/img/icon-dright.png) right center no-repeat;background-size: 0.3rem;}
	.t3Tag{color: #666;display: flex;justify-content: left;margin-bottom: 0.2rem;}
	.t3Tag label{width: 2rem;}
	.t3Tag label.on{color: #FF2D19;font-size: 0.3rem;}
	a.callMore{display: inline-block;height: 0.8rem;width: 100%;text-align: center;background-color: #fff3f5;color: #FF2D19;font-size: 0.3rem;line-height: 0.8rem;margin-top: 0.4rem;}
	.t4Tag{display: flex;justify-content: space-between;}
	.t4Label{font-size: 0.22rem;color: #999;}
	.t4Label:nth-of-type(2){padding: 0 0.8rem;border: 1px solid #ededed;border-top: 0;border-bottom: 0;}
	.t4Label strong{font-size: 0.36rem;color: #333;margin-bottom: 0.1rem;display: block;}
	.top5 h5 a{float: right;padding-right: 0.3rem;margin-top: 0.06rem;display: inline-block;height: 0.32rem;line-height: 0.32rem;font-size: 0.22rem;color: #999;background: url(../assets/img/icon-right.png) right center no-repeat;background-size: 0.1rem;}
	.t5C{display: flex;}
	.t5L{width: 70%;font-size: 0.26rem;color: #999;padding-top: 0.1rem;}
	.t5L p{margin-bottom: 0.2rem;}
	.t5L p span{color: #333;}
	.t5R{width: 30%;}
	.fTop{padding: 0.2rem 0.3rem;background-color: #fff;position: absolute;left: 0;top: 0;z-index: 4;width: 100%;}
	.fTop label{display: block;width: 0.8rem;height: 0.8rem;background: url(../assets/img/tLogo.png) center no-repeat;background-size: 100%;float: left;}
	.ftMid{width: 4.5rem;float: left;margin-left: 0.2rem;font-size: 0.24rem;}
	.ftMid h3{font-size: 0.32rem;font-weight: 500;color: #333;margin-bottom: 2px;line-height: 1.3;}
	.ftMid p{font-size: 0.24rem;color: #666;}
	.fTop button{width: 1.5rem;height: 0.52rem;line-height: 0.5rem;background-color: #ff340f;border-radius: 0.3rem;color: #fff;font-size: 0.28rem;position: absolute;right: 0.3rem;bottom: 0.34rem;}
	.readMore{
		text-align: center;
		color: #ccc;
		font-size: 0.26rem;
		font-weight: 500;
		margin-top: 0.3rem;
	}
	.readMore p{
		margin-top: 0.14rem;
	}
	.readMore label i{display: inline-block;width: 2.7rem;height: 1px;background-color: #eee;position: relative;top: -4px;}
	.readMore p i{
		font-size: 0.3rem;
		color: #eee;
	}
	.t3Cp{width: 100%;height: 1.2rem;background-color: #f1f0f0;color: #333;font-size: 0.24rem;position: relative;text-align: right;padding: 0.2rem;}
	.t3Cp label{display: block;width: 1.56rem;height: 1.28rem;position: absolute;left: 0;bottom: 0;}
	.t3Cp span{font-size: 0.2rem;color: #999;}
	.t3Cp span i{font-style: normal;color: #FF2D19;}
	.t3Cp p img{width: 0.1rem;margin-left: 0.1rem;}


	.hxMain .mint-tab-item-label{
		color: #333;
		font-size: 0.3rem;
	}
	/* .hNav .mint-tab-item:first-child{
		flex: 0.6;
	}
	.hNav .mint-tab-item:last-child{
		flex: 1.4;
	} */
	.mint-navbar{background: none !important;}
	.hxMain .is-selected .mint-tab-item-label,.hxMain .mint-navbar .mint-tab-item.is-selected{
		color: #EB6102;
		border: 0;
	}
	.hxMain .mint-navbar .mint-tab-item span{
		padding: 0.04rem 0.1rem;
		color:  #666;
		border: 1px solid #999;
		font-size: 0.28rem;
		border-radius: 2px;
		line-height: 1;
	}
	.hxMain .mint-navbar .mint-tab-item.is-selected span{
		background: #1C77C3;
		color: #fff;
		border-color: #1C77C3;
	}
	.hxMain .swiper-slide{
		width: 4rem;
		/* margin: 0 auto; */
		padding: 2px;
	}
	.hxMain .title{
		position: relative;
		border: 1px solid #eee;
		text-align: center;
		border-radius: 2px;
		margin-bottom: 0.16rem;
	}
	.title img{width: 100%;}
	.hxMain .title img{
		display: block;
		border-radius: 0.04rem;
		z-index: 3;
		width: 100%;
		height: 3rem;
		object-fit: cover;
	}
	.ihot-msg {
	    position: absolute;
	    left: 0;
	    top: 0;
	    z-index: 2;
		color: #fff;
		background:#0f66af;
		opacity: 0.6;
		padding: 0.04rem 0.3rem 0.04rem 0.2rem;
		font-size: 0.24rem;
		border-bottom-right-radius: 0.5rem;
	}
	.ihot-msg p{
		font-size: 0.26rem;
		display: inline;
		margin-right: 0.1rem;
		color: #fff;
	}
	.ihot-msg span{
		font-size: 0.24rem;
		line-height: 1.6;
	}
	.hxMain .mint-tab-container{
		overflow: inherit;
		margin-top: 0.2rem;
		margin-right: -0.2rem;
	}
	.hxTag{
		margin-top: 0.1rem;
	}
	.hxTag label{
		display: inline-block;
		padding: 0 0.04rem;
		line-height: 0.4rem;
		text-align: center;
		font-size: 0.22rem;
		border: 1px solid #999;
		color: #666;
		margin-right: 0.08rem;
	}
	.hxTag label:last-child{
		margin-right: 0;
	}

	.swiper-container{
	  position: relative;
	}
	.swBtn{
		position: absolute;
		bottom: 0.1rem;
		width: 100%;
		height: 30px;
	}
	.swBtn .swiperBtn:hover{border: 0;}
	.hxModel .swiper-button-prev::after,.hxModel .swiper-button-next::after{
		content: "";
	}
	.hxModel .swiper-button-prev{
		left: 2rem;
	}
	.hxModel .swiper-button-next{
		right: 2.1rem;
	}
	.hxBtom p{
		margin-top: 0.2rem;
		color: #FF2D19;
		font-weight: 500;
		font-size: 0.28rem;
	}
	.hxBtom a{margin-top: 0.2rem; display: block;width: 100%;height: 0.7rem;text-align: center;line-height: 0.7rem;color: #FF2D19;background-color: #fff3f5;border-radius: 0.1rem;}
	.t4Dt{padding-left: 0.1rem;}
	.t4Dt ul{border-left: 1px solid #1C50AC;}
	.t4Dt li{padding-left: 0.4rem;position: relative;margin-bottom: 0.2rem;}
	.t4Dt li p i{font-size: 0.24rem;color: #999;font-style: normal;position: relative;top: -0.1rem;margin-bottom: -0.1rem;}
	.t4Dt li p label{display: inline-block;width: 0.44rem;height: 0.44rem;background: url(../assets/img/icon-clock.png) center no-repeat;background-size: 100%;position: absolute;left: -0.22rem;top: -0.12rem;z-index: 3;}
	.t4Dt li .dtM{margin-bottom: 0.1rem;}
	.dtMore label i{width: 2.4rem;}

	.sModel{
		  position: fixed;
		  width: 100%;
		  height: 100%;
		  z-index: 90;
		}
		.bj{position: fixed;background: #000;opacity: 0.5;width: 100%;height: 100%;left: 0;top: 0;z-index: 91;}
		.sMsg{
			font-size: 16px; position: fixed;left: 50%;top: 50%;margin: -4.5rem 0 0 -3.75rem; width: 7.5rem;height: 7.2rem; background: url(../assets/img/tipBj.png) center no-repeat;background-size: 5rem; z-index: 92;padding: 0.8rem 0.7rem;border-radius: 8px;
			transition: all 0.5s ease-in;
			animation: dh 0.8s 1;
		 }
		 .bMsg{
			 font-size: 16px; position: fixed;left: 50%;top: 50%;margin: -4.5rem 0 0 -3.75rem; width: 7.5rem;height: 7.2rem; background: url(../assets/img/b.png) center no-repeat;background-size: 5.4rem; z-index: 92;;
			animation: bh 0.5s 1 forwards;
		 }
		 @keyframes dh{
		 	0%{transform: scale(0);}
		 	60%{transform: scale(1.1);}
			100%{transform: scale(1);}
		 }
		 @keyframes bh{
		 	0%{transform: scale(0.4);}
		 	100%{transform: scale(1);}
		 }
		.hh .bRead{
			 position: fixed;left: 50%;top: 50%;margin: -4.5rem 0 0 -3.75rem; width: 7.5rem;height: 7.2rem; background: url(../assets/static/fiveM.png) center bottom no-repeat;background-size:4.63rem; z-index: 92;padding-top: 1.4rem;text-align: center;font-size: 0.45rem;
			 font-weight: 600;
			 color: #9D461C;
			 animation: bh 0.5s 1 forwards;
		 }
		  .hh .bRead p{height: 1.74rem;}
		 .hh .bRead strong{font-size: 1.33rem;}
		.mClose{position: absolute;right: 1.4rem;top: 1rem;cursor: pointer;width: 0.8rem;height: 0.8rem;display: block;background: url(../assets/img/nClose.png) center no-repeat;background-size: 0.27rem;}

</style>
