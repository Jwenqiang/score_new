<template>
	<div class="hh ershou" v-if="ready">
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
			<mt-swipe ref="swipe" :auto="0" :showIndicators="false" @change="handleChange" :defaultIndex="currentIdx">
				<template>
					<mt-swipe-item v-for="(item,index) in imgArr" :key="index"><img :src="item.ImagePath" preview="1" :preview-text="item.ImageTitle"/></mt-swipe-item>
				</template>
			</mt-swipe>
			<label class="idxTag" v-if="imgArr.length>0">{{aIdx}}/{{imgArr.length}}</label>
			<div class="clear tagLxa" v-if="imgArrHx.length>0">
				<label :class="aIdx<=imgArrDy.length?'on':''" @click="changeIdx(0)">室内图</label>
				<label :class="aIdx>imgArrDy.length?'on':''" @click="changeIdx(imgArrDy.length)">户型图</label>
			</div>
			<div class="vr" @click="goVR" v-if="house.IsEnableVR">
				<img src="../assets/static/vr.gif"/>
			</div>
		</div>
		<div class="top1">
			<div class="topTag"><label :class="house.KeyWords.indexOf('中原好房')>-1?'mTag':''" v-if="house.KeyWords.split(',')[0]">{{house.KeyWords.split(',')[0]}}</label><label v-if="house.KeyWords.split(',')[1]">{{house.KeyWords.split(',')[1]}}</label><label v-if="house.KeyWords.split(',')[2]">{{house.KeyWords.split(',')[2]}}</label><label v-if="house.KeyWords.split(',')[3]">{{house.KeyWords.split(',')[3]}}</label></div>
			<h3>{{house.Title}}</h3>
			<div class="topPrice">
				<div>
					<h4>{{house.RoomCount}}室{{house.HallCount}}厅{{house.ToiletCount}}卫</h4>
					<p>户型</p>
				</div>
				<span></span>
				<div>
					<h4>{{house.Garea}}㎡</h4>
					<p>建筑面积</p>
				</div>
			</div>
			<div class="ckj">
				<template v-if="house.GuidingSalePrice>0">
					<p>本套房源参考总价：<span>{{house.GuidingSalePrice/10000 | fix}}万元</span></p>
					<p>本小区政府参考单价：<span>{{house.GuidingPrice | fix}}元/㎡</span><a href="http://zjj.sz.gov.cn/attachment/0/749/749839/8545777.pdf" target="_blank">查看详情<img src="../assets/static/h-right.png" /></a href="http://zjj.sz.gov.cn/attachment/0/749/749839/8545777.pdf"></p>
				</template>
				<template v-else>
					<p style="text-align: center;margin: 0.2rem 0;">本套房源暂无政府参考价<a href="http://zjj.sz.gov.cn/attachment/0/749/749839/8545777.pdf" target="_blank">查看详情<img src="../assets/static/h-right.png" /></a href="http://zjj.sz.gov.cn/attachment/0/749/749839/8545777.pdf"></p>
				</template>
			</div>
		</div>
		<div class="top2">
			<div class="topm">
				<p>中原编码：<span>{{house.AdsNo}}</span></p>
			</div>
			<div class="top2C">
				<div class="top2L">
					<p>楼层：<span v-if="house.FloorDisplay>0">{{house.FloorDisplay}}/共{{house.FloorTotal}}层</span><span v-else>暂无数据</span></p>
					<p>朝向：<span v-if="house.Direction">{{house.Direction}}</span><span v-else>暂无数据</span></p>
					<p>梯户：<span v-if="house.StairsHouseHold">{{house.StairsHouseHold}}</span><span v-else>暂无数据</span></p>
					<p>年代：<span v-if="house.OpDate">{{house.OpDate | changeDate}}</span><span v-else>暂无数据</span></p>
					<p>小区：<span v-if="house.EstateName">{{house.EstateName}}</span><span v-else>暂无数据</span></p>
				</div>
				<div class="top2R">
					<p>类型：<span v-if="house.PropertyType">{{house.PropertyType}}</span><span v-else>暂无数据</span></p>
					<p>装修：<span v-if="house.Fitment">{{house.Fitment}}</span><span v-else>暂无数据</span></p>
					<p>挂牌：<span v-if="house.TrustDate">{{house.TrustDate | changeTime}}</span><span v-else>暂无数据</span></p>
					<p>产权：<span v-if="house.PropertyRight>0">{{house.PropertyRight}}</span><span v-else>暂无数据</span></p>
				</div>
			</div>
			<div class="ctip"><a :href="'tel:'+user.Mobile">该房源附近中小学情况<span>免费咨询</span></a></div>
		</div>
		<div class="top3">
			<h5>房源介绍</h5>
			<div class="t3Tag">
				<label :class="tag==1?'on':''" @click="tag=1">房源特色</label>
				<label :class="tag==2?'on':''" @click="tag=2">小区概况</label>
				<label :class="tag==3?'on':''" @click="tag=3">周边配套</label>
				<label :class="tag==4?'on':''" @click="tag=4" v-if="yz.length>0">业主用心说</label>
			</div>
			<div class="t3content">
				<template v-if="tag==1&&hTs">
					<p v-html="hTs"></p>
				</template>
				<template v-if="tag==2&&xqgk">
					<p v-if="tag==2" v-html="xqgk"></p>
				</template>
				<template v-if="tag==3&&zbpt">
					<p v-if="tag==3" v-html="zbpt"></p>
				</template>
				<p v-if="tag==4&&yz.length>0">{{yz[0].CoverContent}}</p>
			</div>
			<a :href="'tel:'+user.Mobile" class="callMore">咨询更多房源优势</a>
		</div>
		<div class="top4">
			<h5>房源动态</h5>
			<div class="t4Tag">
				<div class="t4Label">
					<p><strong>{{dkNum.SevenSee}}次</strong></p>
					<p>近7天带看</p>
				</div>
				<div class="t4Label">
					<p><strong>{{dkNum.ThirtySee}}次</strong></p>
					<p>近30天带看</p>
				</div>
				<div class="t4Label">
					<p><strong>{{gzNum}}人</strong></p>
					<p>关注人数</p>
				</div>
			</div>
			<a :href="'tel:'+user.Mobile" class="callMore">咨询最新房源动态</a>
		</div>
		<div class="top5">
			<h5>{{house.EstateName}}<a :href="'https://m.sz.centanet.com/xiaoqu/xq-'+house.EstateCode">小区详情</a></h5>
			<div class="t5C">
				<div class="t5L">
					<p>在售房源：<span v-if="xq.SaleNumber>0">{{xq.SaleNumber}}套</span><span v-else>未知</span></p>
					<p>租金回报：<span v-if="xq.MinRentPrice>0">{{xq.MinRentPrice}}-{{xq.MaxRentPrice}}元/月</span><span v-else>未知</span></p>
				</div>
				<div class="t5R" v-if="xq.FullImagePath">
					<img :src="xq.FullImagePath" width="100%"/>
				</div>
			</div>
			<a :href="'tel:'+user.Mobile" class="callMore">联系小区专家</a>
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
	import { Toast,Indicator } from 'mint-ui';
	import {
	  uToken,
	} from "@/global/token.js";
	export default{
		name: 'hh',
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
				imgArr:[],
				imgArrDy:[],
				imgArrHx:[],
				imgHxIdx:"",
				aIdx:1,
				currentIdx:0,
				tag:1,
				shareText:"",
				dkNum:"",
				gzNum:"",
				xq:"",
				yz:"",
				user:"",
				isIOS:false,
				isAd:false,
				hasYb:false,
				shareNum:0,
				callV:"-"
			}
		},
		beforeRouteLeave:(to,from,next)=>{
			document.title="置业英雄成长系统";
			next();
		},
		created() {
			this.isIOS=isiOS;
			this.isAD=isAndroid;
			console.log(isiOS)
			if(navigator.userAgent.indexOf('aplus') > -1){
				this.inApp=true
			}
			if(this.$route.query.adsNo){
				this.houseId=this.$route.query.adsNo;
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
		watch:{

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
			changeImgBan(n){
				let v=n.split('.jpg')[0];
				return v+'_750x500_w.jpg';
			}
		},
		methods:{
			goVR(){
				let link="https://esf.centanet.com/tools/vr/?adsno="+this.$route.query.adsNo+"&cityen=sz&posttype=s&type=out"
				location.href=link;
			},
			// A+分享回调
			callback(item){
				this.callV="-回调："+item;
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
								adsNo:this.houseId,
								SharedDestination:shareName
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
			changeIdx(idx){
				this.currentIdx=idx;
				this.$refs.swipe.swipeItemCreated();//swipeItemCreated方法是swipe组件内部的方法，可以使组件重渲染
			},
			handleChange(n){
				this.currentIdx=0;
				this.aIdx=n+1;
				console.log(this.aIdx)
			},
			getInfo(){
				this.$axios({
					method:"get",
					url:"/Poster/GetEmpCall",
					params:{
						empNo:this.empNo,
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
					console.log(res);
					let arr=res.data.Result;
					for(var v of arr){
						if(v.ImageDescription=="户型图"){
							this.imgArrHx.push(v);
						}else{
							this.imgArrDy.push(v);
						}
					}
					this.imgHxIdx=this.imgArrDy.length+1;
					this.imgArr=this.imgArrDy.concat(this.imgArrHx);
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
							method:"post",
							url:"/ZhongyuanHouseV2/GetEstateByAdsNoV2",
							data:{
								adsNo:this.houseId,
								myTemplateId :this.hbId,
								empNo:this.empNo
							}
						})
						.then(res=>{
							
							if(res.data.code==0){
								// 微信分享
								document.title=res.data.data.Title;
								shareObj.title="【好房推荐】"+res.data.data.Title;
								if(res.data.data.RoomCount>0&&res.data.data.Garea>0&&res.data.data.HallCount>0){
									shareObj.desc=res.data.data.EstateName+"丨"+res.data.data.RoomCount+"室"+res.data.data.HallCount+"厅丨"+res.data.data.Garea+"㎡";
								}else if(res.data.data.RoomCount>0&&res.data.data.Garea>0){
									shareObj.desc=res.data.data.EstateName+"丨"+res.data.data.RoomCount+"室丨"+res.data.data.Garea+"㎡";
								}else if(res.data.data.EstateName&&res.data.data.Garea>0){
									shareObj.desc=res.data.data.EstateName+"丨"+res.data.data.Garea+"㎡";
								}else{
									shareObj.desc="用中原找房，安心选好房"
								}
								shareObj.imgUrl=res.data.data.FullImagePath;
								this.setShare();//微信分享

								this.getBanner(res.data.data.PostId);
								this.getYz(res.data.data.PropId);
								this.getDk(res.data.data.PropId);
								this.getGz(res.data.data.PostId);
								this.getXq(res.data.data.EstateCode);
								this.house=res.data.data;
								this.houseName=res.data.data.Title;
								this.banner=res.data.data.FullImagePath;
								if(res.data.data.PlainDescription){
									this.hTs=res.data.data.PlainDescription.replace(/\\n/g,'<div></div>').split('Ď')[0];
									this.xqgk=res.data.data.PlainDescription.replace(/\\n/g,'<div></div>').split('Ď')[1];
									this.zbpt=res.data.data.PlainDescription.replace(/\\n/g,'<div></div>').split('Ď')[2];
								}
								this.ready=true;
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
			    return JSON.stringify({
			            channel:["wx","wxMoments"],//["wx","wxImage","wxMomentsImage","QQ"]
			            img:src,
			            title:"【好房推荐】"+this.houseName,
			            description:shareObj.desc,
			            link:location.href
			        });
			},

		}
	}
</script>

<style>
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
	.ershou .topPrice{display: flex;justify-content: space-between; align-items: center;}
	.ershou .topPrice div{width: 49%;text-align: center;}
	.ershou .topPrice div p{font-size: 0.24rem;color: #999;}
	.ershou .topPrice span{width: 1px;height: 0.6rem;background-color: #ccc;}
	.ershou .topPrice h4{color: #FF2D19;font-size: 0.38rem;font-weight: 550;margin-bottom: 0.1rem;}
	.ckj{padding: 0.2rem;border: 1px solid #ccc;margin-top: 0.3rem;font-size: 0.24rem;color: #333;}
	.ckj span{font-size: 0.28rem;color: #FF2D19;}
	.ckj p:first-child{margin-bottom: 0.1rem;}
	.ckj a{margin-left: 0.2rem;font-size: 0.24rem;color: #5084DD;}
	.ckj a img{width: 0.12rem;margin-left: 0.1rem;vertical-align: -1px;}
	.ershou .top2{padding: 0.3rem;background-color: #fff;margin-bottom: 0.2rem;}
	.topm{margin-bottom: 0.2rem;color: #999;}
	.ershou .top2C{display: flex;justify-content: space-between;}
	.ershou .top2L{width: 65%;color: #999;}
	.ershou .top2R{width: 35%;color: #999;}
	.ershou .topm span,.ershou .top2L span,.ershou .top2R span{color: #333;}
	.ershou .top2 p{margin-bottom: 0.2rem;}
	.ershou .top2 div p:last-child{margin-bottom: 0;}
	.ershou .top3,.top4,.top5{padding: 0.3rem;background-color: #fff;margin-bottom: 0.26rem;}
	.ershou .top3 h5,.top4 h5,.top5 h5{font-size: 0.3rem;font-weight: 500;margin-bottom: 0.26rem;color: #333;}
	.ershou .top3 p{font-size: 0.28rem;color: #333;line-height: 1.5;}
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
		.tagLxa{width: 2.3rem;height: 0.4rem;background-color: #fff;text-align: center;line-height: 0.4rem;position: absolute;bottom: 0.2rem;left: 2.6rem;border-radius: 0.25rem;overflow: hidden;}
		.tagLxa label{display: block;width: 50%;height: 100%;float: left;font-size: 0.25rem;border-radius: 0.25rem;}
		.tagLxa label.on{background-color: #ff340f;color: #fff;}
		.vr{width: 1rem;height: 1rem;display: block;text-align: center;line-height: 1rem;background-color: #000;opacity: 0.5;position: absolute;left: 3.25rem;top: 1.8rem;border-radius: 50%;}
		.top .vr img{width: 0.8rem;margin: 0.1rem auto;/* animation:rotateIn 3s linear infinite; */}
/* 		@keyframes rotateIn {
			  from {
				transform-origin: center;
				transform: rotate(0);
			  }

			  to {
				transform-origin: center;
				transform: rotate(360deg);
			  }
		} */
</style>
