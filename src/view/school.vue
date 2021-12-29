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
					<mt-swipe-item v-for="(item,index) in imgArr" :key="index"><img :src="item.ImagePath" preview="1"/></mt-swipe-item>
				</template>
			</mt-swipe>
			<label class="idxTag" v-if="imgArr.length>0">{{aIdx}}/{{imgArr.length}}</label>
			<div class="clear tagLx" v-if="imgArrHx.length>0">
				<label :class="aIdx<=imgArrDy.length?'on':''" @click="changeIdx(0)">单元图</label>
				<label :class="aIdx>imgArrDy.length?'on':''" @click="changeIdx(imgArrDy.length)">户型图</label>
			</div>
		</div>
		<div class="top1">
			<div class="topTag"><label class="mTag" v-if="house.SchoolFeature">{{house.SchoolFeature}}</label><label v-if="house.SchoolGrade">{{house.SchoolGrade}}</label> <label v-if="house.SchoolProperty">{{house.SchoolProperty}}</label><template v-if="house.Tags"><label v-if="house.Tags[0]">{{house.Tags[0]}}</label><label v-if="house.Tags[1]">{{house.Tags[1]}}</label></template></div>
			<h3>{{house.SchoolName}}</h3>
			<p style="font-size: 0.26rem;color: #999;margin-top: 5px;">别名：{{house.SchoolShortName}}</p>
			<div class="topPrice">
				<div>
					<h4>{{house.EstateNumber}}个</h4>
					<p>附近小区</p>
				</div>
				<span></span>
				<div @click="goSchoolAll">
					<h4>{{house.SaleNumber}}套</h4>
					<p>在售房源</p>
				</div>
				<span></span>
				<div>
					<h4>{{house.GuidingTotalPrice/10000 | fix}}起</h4>
					<p>房源参考总价</p>
				</div>
			</div>
			<div class="ckj">
				<h4>招生信息</h4>
				<p><label>招生简章：</label><a @click="showZs=true">{{zsxx.Guide}}<img src="../assets/static/h-right.png" /></a> </p>
				<p><label>入学积分：</label>{{zsxx.GuideYear}}年  <template v-if="zsxx.Integral>0">{{zsxx.Integral}}分</template><template v-else>暂无数据</template></p>
				<p><label>学校地址：</label>{{house.Address}}</p>
				<a :href="'tel:'+user.Mobile" class="callMore">咨询附近房源</a>
			</div>
		</div>
		<div class="top2">
			<div class="tTitle">
				<label>附近房源</label>
				<span v-if="soonNum>0" @click="goSchoolAll">查看全部{{soonNum}}套房源</span>
			</div>
			<div class="jjrSection newHouse">
				<template v-if="soonHouse.length>0">
					<div class="clear jjrL" v-for="(item,index) in soonHouse" v-if="index<5">
						<div class="jrl">
							<a :href="'https://sz.centanet.com/ershoufang/'+item.AdsNo+'.html'">
								<img :src="item.FullImagePath" width="100%"/>
							</a>
	<!-- 						<label class="nStatus" v-if="item.Status=='售罄'" style="background: #ccc;">{{item.Status}}</label>
							<label class="nStatus" v-else>{{item.Status}}</label> -->
						</div>
						<div class="jrr">
							<a :href="'https://sz.centanet.com/ershoufang/'+item.AdsNo+'.html'">
							<h4 class="jrt">{{item.Title}}</h4>
							<p>{{item.RoomCount}}室{{item.HallCount}}厅丨{{item.Garea}}平丨{{item.GscopeName}}丨{{item.EstateName}}</p>
							<p class="newTag" v-if="item.UnitTags"><span v-if="item.UnitTags[0]">{{item.UnitTags[0]}}</span><label v-if="item.UnitTags[1]">{{item.UnitTags[1]}}</label><label v-if="item.UnitTags[2]">{{item.UnitTags[2]}}</label><label v-if="item.UnitTags[3]">{{item.UnitTags[3]}}</label></p>
							</a>
							<p>参考总价：<strong>{{item.GuidingSalePrice/10000 | fix}}</strong></p>
							<a :href="'tel:'+item.CallResult.BigCode+','+item.CallResult.ExtCode" class="btnZx" @click="setSc('我要咨询',item.AdsNo,item.Title,`(${index+1},1)`)">我要咨询</a>
						</div>
					</div>
				</template>
				<div v-else>暂无信息</div>
			</div>
			<a :href="'tel:'+user.Mobile" class="callMore" @click="setSc('咨询更多房源')">咨询更多房源</a>
		</div>
		<div class="top3">
			<h5 style="margin-bottom: 0.4rem;">学校信息</h5>
			<div class="t3content">
				<div :class="all==-1?'showThrid':''">
					<template v-for="item in house.Description" v-if="item.value">
					<div class="t3T"><label>{{item.name}}</label></div>
					<p>{{item.value || '暂无信息'}}</p>
					</template>
				</div>
				<p class="showAll" @click="toggle('0')">
					<template v-if="all=='0'">收起<img src="../assets/static/icon-up.png"/></template>	
					<template v-else>展开<img src="../assets/static/icon-down.png"/></template>	
				</p>
<!-- 				<div class="t3T"><label>师资力量</label></div>
				<p>学校以立人教育为核心价值理念，着力于学生德智体美劳全面和谐发展，培养能力，关注过程，激励进步，多元评价，营造学习乐园、幸福家园、成长田园。学校打造特色教育品牌，加强内涵发展实力，提高教育总体质量，迈入了龙岗区教育总体实力第一方阵.</p>
				<div class="t3T"><label>硬件设施</label></div>
				<p>学校以立人教育为核心价值理念，着力于学生德智体美劳全面和谐发展，培养能力，关注过程，激励进步</p>
				<div class="t3T"><label>所获奖项</label></div>
				<p>学校以立人教育为核心价值理念，着力于学生德智体美劳全面和谐发展，培养能力，关注过程，激励进步</p> -->
				<div class="t3Tip">
					<h5 style="margin-bottom: 0.2rem;">温馨提示</h5>
					<p>招生区域划定、入学要求等信息须以政府教育主管部门及学校最新政策为准，中原找房及本网站不对此作出任何承诺，购买房屋时，请谨慎核查。学校位置周边相关房源基于地理位置，位置信息均来源于高德地图，仅供参考。</p>
				</div>
			</div>
		</div>
		<div class="clear hhFoot">
			<label><img :src="'https://pic.centanet.com/shenzhen/pic/agent/'+user.EmpNo+'.jpg'"  onerror="this.src='https://sz.centanet.com/partner/house/userImg/tx_none.png'" width="100%"/></label>
			<label>
				<span>{{user.EmpCnName}}</span>
				<span>{{user.PositionName}}</span>
			</label>
			<div class="appBtn" v-if="inApp">
				<a :href="'tel:'+user.Mobile" @click="setSc('电话咨询')">电话咨询</a>
				<a @click="share()">分享</a>
			</div>
			<a :href="'tel:'+user.Mobile" @click="setSc('电话咨询')" v-else>电话咨询<p>隐藏号码</p></a>
			
		</div>
		<!-- 弹窗 -->
		<div class="sModel mMsg" v-if="hasYb&&inApp">
		  <div class="bj" @click="hasYb=false"></div>
		  <div class="bRead" @click="$router.push({name:'yb'})">
			  <p><strong>{{shareNum}}</strong>元宝</p>
		  </div>
		</div>
		<!-- 招生简章弹窗 -->
		<div class="sModel mMsg" v-if="showZs">
		  <div class="bj" @click="showZs=false"></div>
		  <div class="zsMsg">
			  <label class="zsClose" @click="showZs=false"></label>
			  <div class="zsAll" v-html="zsxx.Description" v-if="zsxx.Description"></div>
			  <div class="zsAll" style="text-align: center;" v-else>暂无招生信息</div>
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
	import axios from 'axios'
	import { Toast,Indicator } from 'mint-ui';
	import {
	  uToken,
	} from "@/global/token.js";
	import {
	  $get,$post
	} from "@/global/api.js";
	export default{
		name: 'school',
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
				callV:"-",
				all:-1,
				schoolId:"",//1606
				zsxx:"",
				soonHouse:"",
				showZs:false,
				appShareText:"",
				soonNum:0
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
			if(this.$route.query.schoolId){
				this.schoolId=this.$route.query.schoolId;
			}
			this.getSchoolBanner();
			this.getSchool();
		},
		mounted(){
			window.callback=this.callback;//暴露给public页
		},
		watch:{

		},
		filters:{
			fix(p){
				let price=Number(p).toFixed(0);
				if(price>0){
					return price+'万';
				}else{
					return '暂无';
				}
				
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
			}
		},
		methods:{
			// 神策电话埋点
			setSc(name,id,houseName,p){
				if(name=="我要咨询"){
					this.$sensors.track('sc_click_call', {
						sc_business_type:"second_hand_house",
						sc_button_name:name,
						sc_click_page:"房源海报_学校详情页",
						sc_house_id:id,
						sc_house_name:houseName,
						sc_click_area:"学校详情页_附近房源区域",
						sc_button_position:p
					});
					return;
				}
				this.$sensors.track('sc_click_call', {
					sc_business_type:"school",
					sc_button_name:name,
					sc_click_page:"房源海报_学校详情页",
					sc_house_id:this.schoolId,
					sc_house_name:document.title,
					sc_click_area:"底部区域",
					sc_button_position:""
				});
			},
			toggle(idx){
				console.log(this.all)
				if(this.all=='-1'){
					this.all=idx;
				}else{
					this.all='-1'
				}
				
			},
			// A+分享回调
			// callback(item){
			// 	this.callV="-回调："+item;
			// 	if(item){
			// 		setTimeout(()=>{
			// 		  this.getShareLog(item);
			// 		}, 500)
			// 	}
			// },
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
								schoolId:this.schoolId,
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
			},
			goSchoolAll(){
				if(this.soonNum>0){
					this.$router.push({name:"schoolAll",query:{'schoolId':this.schoolId,'schoolName':this.house.SchoolName}})
				}
			},
			getSchool(){
				Indicator.open();
				let data={
						schoolId:this.schoolId
					};
				// 获取详情
				$get("/ZhongyuanHouseV2/GetSchoolRequest",data).then((res)=>{
						console.log(res);
					if(res.data.code==0){
						this.ready=true
						this.house=res.data.data.Result
						this.getInfo();
						// 微信分享
						document.title=res.data.data.Result.SchoolName;
						shareObj.title=res.data.data.Result.SchoolName;
						if(res.data.data.Result.SchoolGrade&&res.data.data.Result.SchoolProperty&&res.data.data.Result.Tags){
							shareObj.desc=res.data.data.Result.SchoolGrade+"/"+res.data.data.Result.SchoolProperty+"/"+res.data.data.Result.Tags[0]+'/附近'+this.house.EstateNumber+'个小区/'+this.house.SaleNumber+'套在售房源';
						}else if(res.data.data.Result.SchoolGrade&&res.data.data.Result.SchoolProperty){
							shareObj.desc=res.data.data.Result.SchoolGrade+"/"+res.data.data.Result.SchoolProperty+'/附近'+this.house.EstateNumber+'个小区/'+this.house.SaleNumber+'套在售房源';
						}else if(res.data.data.Result.SchoolGrade&&res.data.data.Result.Tags){
							shareObj.desc=res.data.data.Result.SchoolGrade+"/"+res.data.data.Result.Tags[0]+'/附近'+this.house.EstateNumber+'个小区/'+this.house.SaleNumber+'套在售房源';
						}else if(res.data.data.Result.SchoolProperty&&res.data.data.Result.Tags){
							shareObj.desc=res.data.data.Result.SchoolProperty+"/"+res.data.data.Result.Tags[0]+'/附近'+this.house.EstateNumber+'个小区/'+this.house.SaleNumber+'套在售房源';
						}else{
							shareObj.desc='附近'+this.house.EstateNumber+'个小区/'+this.house.SaleNumber+'套在售房源';
						}
						this.setShare(res.data.data.Result.EstateNumber,res.data.data.Result.SaleNumber);//微信分享
						setTimeout(()=>{
							Indicator.close();
						},1000)
					}	
				})
				.catch((err)=>{
					Toast('网络错误，请稍后再试')	
				})
				// 获取招生信息
				$get("/ZhongyuanHouseV2/GetSchoolAdmissionsRequest",data).then((res)=>{
						console.log(res);
					if(res.data.code==0){
						this.zsxx=res.data.data.Result;
					}	
				})
				.catch((err)=>{
					Toast('网络错误，请稍后再试')	
				})
				let data1={
				  "distance":50000,
				  "schoolId": this.schoolId,
				  pageCount:5,
				  pageIndex:1
				}
				// 获取附近房源
				$post("/ZhongyuanHouseV2/GetSchoolPostsRequest",data1).then((res)=>{
					if(res.data.code==0){
						this.soonHouse=res.data.data.Result;
						this.soonNum=res.data.data.Total;
					}	
				})
				.catch((err)=>{
					Toast('网络错误，请稍后再试')	
				})
			},
			getSchoolBanner(){
				let data={
					schoolId:this.schoolId
				};
				$get("/ZhongyuanHouseV2/GetSchoolImageListRequest",data).then((res)=>{
						console.log(res);
					if(res.data.code==0){
						this.ready=true
						if(res.data.data.Result.length>0){
							this.imgArr=res.data.data.Result
							shareObj.imgUrl=this.imgArr[0].ImagePath;
							console.log(shareObj.imgUrl)
						}
					}	
				})
				.catch((err)=>{
					Toast('网络错误，请稍后再试')	
				})
			},
			getInfo(){
				this.$axios({
					method:"get",
					url:"/Poster/GetEmpCall",
					params:{
						empNo:this.$route.query.empNo,
						p:1,
						// 神策渠道埋点
						PlatformType:"chengzhangxitong",
						BusinessType:"school",
						SourceId:this.house.SchoolId,
						SourceName:this.house.SchoolName,
						HousingEstateCode:"",
						HousingEstateName:"",
						Sem:"",
						Hmpl:"",
						FirstQudao:"",
						SecondQudao:""
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
			getBanner(id){
				axios({
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

			// 微信分享
			setShare(xq,zs){//
					axios({
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
								// 好友
								wx.updateAppMessageShareData({ 
								    title: shareObj.title,
								    desc: shareObj.desc,
								    link: shareObj.link,
								    imgUrl: shareObj.imgUrl,
								    success: function () {
								      // 设置成功
								    }
								  });
								  //朋友圈
								wx.updateTimelineShareData({ 
								    title: shareObj.title+'/附近'+xq+'个小区/'+zs+'套在售房源',
								    desc: shareObj.desc,
								    link: shareObj.link,
								    imgUrl: shareObj.imgUrl,
								    success: function () {
								      // 设置成功
								    }
								  });
						        //分享好友
						        // wx.onMenuShareAppMessage({
						        //     title: shareObj.title,
						        //     desc: shareObj.desc,
						        //     link: shareObj.link,
						        //     imgUrl: shareObj.imgUrl,
						        //     trigger: function (res) {
						        //        // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
						        //        // alert('用户点击发送给朋友');
						        //     },
						        //     success: function (res) {
						        //         // alert("success");
						        //     },
						        //     cancel: function (res) {
						        //     },
						        //     fail: function (res) {
						        //         // alert(JSON.stringify(res));
						        //     }
						        // });
						        // //分享朋友圈
						        // wx.onMenuShareTimeline({
						        //     title: shareObj.title+'/附近'+this.house.EstateNumber+'个小区/'+this.house.SaleNumber+'套在售房源',
						        //     desc: shareObj.desc,
						        //     link: shareObj.link,
						        //     imgUrl: shareObj.imgUrl,
						        //     success: function (res) {;
						        //     },
						        //     cancel: function (res) {
						        //     },
						        //     fail: function (res) {
						        //         // alert(JSON.stringify(res));
						        //     }
						        // });
						    });
						    wx.error(function (res) {});
						}
					})
			},
			// A+分享回调
			callback(item){
				if(item){
					if (item === 'wxMoments') {
						this.appShareText=shareObj.title+'/附近'+this.house.EstateNumber+'个小区/'+this.house.SaleNumber+'套在售房源';
					}else{
						this.appShareText=shareObj.title;
					}
					setTimeout(()=>{
					  this.getShareLog(item);
					}, 500)
				}
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
				if(this.appShareText==""){
					this.appShareText=shareObj.title;
				}
			    return JSON.stringify({
			            channel:["wx","wxMoments"],//["wx","wxImage","wxMomentsImage","QQ"]
			            img:shareObj.imgUrl,
			            title:this.appShareText,
			            description:shareObj.desc,
			            link:location.href
			        });
			},

		}
	}
</script>

<style scoped>
	.hh{ background: #F3F6F8;padding-bottom: 1.6rem;}
	.hh .top{margin-top: 1.2rem;position: relative;overflow: hidden;}
	.hh .top img{display: block;height: 100%;min-width: 100%;}
	.idxTag{padding: 2px 0.2rem;background-color: #000;opacity: 0.6;border-radius: 0.3rem;position: absolute;right: 0.2rem;bottom: 0.2rem;color: #fff;font-size: 0.2rem;}
	.top,.swiper-warp{height: 5rem;width: 100%;}
	.top1{padding: 0.3rem;background-color: #fff;margin-bottom: 0.2rem;}
	.topTag{margin-bottom: 0.2rem;}
	.topTag label{padding: 2px 0.12rem;background-color: #F3F6F8;font-size: 0.22rem;margin-right: 0.1rem;color: #324E85;}
	.topTag label.mTag{background: #FF2D19;color: #fff;}
	.top1 h3{font-size: 0.38rem;margin-bottom: 0rem;font-weight: 550;color: #333;}
	.ershou .topPrice{display: flex;justify-content: space-between; align-items: center;padding: 0.26rem 0;border: 1px solid #e6e6e6;border-left: 0;border-right: 0;margin-top: 0.3rem;}
	.ershou .topPrice div{width: 49%;text-align: center;}
	.ershou .topPrice div p{font-size: 0.24rem;color: #999;}
	.ershou .topPrice span{width: 1px;height: 0.6rem;background-color: #ccc;}
	.ershou .topPrice h4{color: #FF2D19;font-size: 0.38rem;font-weight: 550;margin-bottom: 0.1rem;}
	.ckj{padding: 0;border: 0;margin-top: 0.3rem;font-size: 0.28rem;color: #333;}
	.ckj h4{font-size: 0.32rem;font-weight: 600;}
	.ckj span{font-size: 0.28rem;color: #FF2D19;}
	.ckj p{margin-top: 0.2rem;}
	.ckj p label{color: #999;}
	.ckj a{font-size: 0.28rem;color: #5084DD;}
	.ckj a img{width: 0.12rem;margin-left: 0.1rem;vertical-align: 0px;}
	.ershou .top2{padding: 0.3rem;background-color: #fff;margin-bottom: 0.2rem;}
	.topm{margin-bottom: 0.2rem;color: #999;}
	.ershou .top2C{display: flex;justify-content: space-between;}
	.ershou .top2L{width: 65%;color: #999;}
	.ershou .top2R{width: 35%;color: #999;}
	.ershou .topm span,.ershou .top2L span,.ershou .top2R span{color: #333;}
	.ershou .top2 p{margin-bottom: 0.12rem;}
	.ershou .top2 div p:last-child{margin-bottom: 0;}
	.ershou .top3,.top4,.top5{padding: 0.3rem;background-color: #fff;margin-bottom: 0.26rem;}
	.ershou .top3 h5,.top4 h5,.top5 h5{font-size: 0.32rem;font-weight: 550;margin-bottom: 0.26rem;color: #333;}
	.ershou .top3 p{font-size: 0.28rem;color: #333;line-height: 1.5;}
	.hhFoot{z-index: 8;background-color: #fff;height: 1.6rem;width: 100%;padding: 0.2rem 0.3rem;text-align: center;position: fixed;left: 0;bottom: 0;box-shadow: 0 -2px 3px #efe9e9;}
	.hhFoot label{width: 1.2rem;height: 1.2rem;display: inline-block;float: left;margin-right: 0.2rem;}
	.hhFoot label:first-child{border-radius: 50%;overflow: hidden;border: 1px solid #e8e6e6;}
	.hhFoot label:nth-of-type(2){width: 1.8rem;}
	.hhFoot label span{display: block;width: 100%;text-align: left;}
	.hhFoot span:first-child{float: left;font-size: 0.32rem;font-weight: 600;margin: 0.18rem 0 0.15rem;display: block;line-height: 1;}
	.hhFoot span:last-child{font-size: 0.24rem;font-weight: 400;display: block;color: #666;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;}
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
		.tagLx{width: 2.3rem;height: 0.4rem;background-color: #fff;text-align: center;line-height: 0.4rem;position: absolute;bottom: 0.2rem;left: 2.6rem;border-radius: 0.25rem;overflow: hidden;}
		.tagLx label{display: block;width: 50%;float: left;font-size: 0.25rem;border-radius: 0.25rem;}
		.tagLx label.on{background-color: #ff340f;color: #fff;}
		
		.tTitle{display: flex;justify-content: space-between;margin-bottom: 0.4rem;}
		.tTitle label{font-size: 0.32rem;}
		.tTitle span{font-size: 0.26rem;color: #999;}
		
		
		.jjrL{padding: 0;background-color: #fff;margin-bottom: 0.3rem;border-radius: 0.1rem;position: relative;padding-bottom: 0.3rem;border-bottom: 1px solid #eee;}
		.jjrL:last-child{margin-bottom: 0;}
		.jrl{width: 2.4rem;float: left;margin-right: 0.2rem;height: 1.8rem;overflow: hidden;position: relative;}
		.nStatus{padding: 2px 0.1rem;color: #fff;background-color: #F3240A;position: absolute;left: 0;top: 0;font-size: 0.24rem;}
		.jrr{float: left;width: 4.3rem;}
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
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}
		.jrr p strong{color: #FF2D19;font-size: 0.36rem;}
		.newHouse button.hbShare{margin-top: 0.2rem;}
		.jrr p.newTag{font-size: 0.2rem;margin-top: 0.1rem;margin-bottom: 0.1rem;}
		.jrr span,.jrr label{padding: 2px 0.1rem;background-color: #ededed;color: #999;margin-left: 0.06rem;border-radius: 0.1rem;}
		.jrr span{margin-left: 0;color: #fff;background-color: #FF2D19;}
		.newHouse .jrr h4{line-height: 1.2;}
		.newHouse .hbhBtn{text-align: right;}
		.jrr h4 strong{display: inline-block;width: 2.3rem;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}
		.jrr h4 i{font-style: normal;font-weight: 500;color: #f53218;position: absolute;right: 0;top: 0.04rem;font-size: 0.28rem;}
		.btnZx{width: 1.48rem;height: 0.48rem;display: block;border: 1px solid #F73342;font-size: 0.24rem;color: #FF2D19;position: absolute;bottom: 0.2rem;right: 0;text-align: center;line-height: 0.46rem;background: url(../assets/static/icon-call.png) 0.08rem center no-repeat;background-size: 0.25rem;padding-left: 0.3rem;border-radius: 3px;}
		.t3T{margin-bottom: 0.2rem;width: 100%;}
		.t3T label{display: block; width: 1.76rem;height: 0.54rem; line-height: 0.5rem;text-align: center;padding: 0;border: 1px solid #999;border-radius: 0.3rem;color: #999;}
		.t3content{margin-top: 0.3rem;}
		.t3content p{margin-bottom: 0.4rem;font-size: 0.24rem !important;color: #333;line-height: 1.5;}
		.t3Tip{padding: 0.18rem;background-color: #F3F6F8;font-size: 0.21rem;}
		.t3Tip h5{font-size: 0.24rem !important;color: #999 !important;}
		.t3Tip p{margin-bottom: 0.2rem;color: #999 !important;}
		.showThrid{
			overflow:hidden;
			text-overflow:ellipsis;
			display:-webkit-box; 
			-webkit-box-orient:vertical;
			-webkit-line-clamp:3; 
			max-height: 1.46rem;
		}
		.showAll{color: #5084DD !important;text-align: right;margin-top: -0.3rem;margin-top: 0.2rem;}
		.showAll img{width: 0.28rem;vertical-align: 2px;margin-left: 0.1rem;}
		
		.zsMsg{width: 6.4rem;height: 10rem;box-shadow: -2px -2px 40px #adabab inset;background-color: #fff;position: fixed;top: 50%;left: 50%;margin: -5rem 0 0 -3.2rem;z-index: 92;border-radius: 0.12rem;padding: 0.6rem 0.3rem;}
		.zsMsg p{line-height: 1.6;}
		.zsAll{width: 100%;height: 100%;overflow-y: auto;}
		.zsAll p{font-size: 0.28rem;color: #999 !important;}
		.zsClose{width: 0.8rem;height: 0.8rem;position: absolute;right: 0;top: 0;background: url(../assets/img/close.png) center no-repeat;background-size: 0.32rem;}
</style>
