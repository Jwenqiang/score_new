<template>
	<div>
		<!--  v-show="showBtn" -->
		<label class="export-btn" @click="showUrl" v-if="showBtn"></label>
		<div class="dayLogMsg" id="screenshotsSection" v-if="ready">
			<div class="top">
				<span v-if="info&&info.DailyDate">{{info.DailyDate | change}} </span>
				<div style="height: 0.2rem;"></div>
				<span v-if="info"><template v-if="info.Area5">{{info.Area3}}-{{info.Area4}}-{{info.Area5}}</template><template v-else-if="info.Area4">{{info.Area2}}-{{info.Area3}}-{{info.Area4}}</template><template v-else-if="info.Area3">{{info.Area2}}-{{info.Area3}}</template><template v-else-if="info.Area2">{{info.Area2}}</template></span>
			</div>
			<!-- <label class="export-btn" @click="showUrl" v-show="!show"></label> -->
			<div class="content" v-if="ready">
				<template v-if="info">
				<div class="list">
					<div class="h4">
						<span></span> · 经纪人数据 · <span></span>
					</div>
					<div class="lMsg">
						<p><label>经纪人<span>{{info.EmpCount}}</span>人：</label><span>入职{{info.UnRunEmpCount}}人，PPSZ员工{{info.RunEmpCount}}人</span></p>
						<p><label>质检封禁人数：</label><span>{{info.BanEmpCount}}人</span></p>
						<p><label>人均放盘量：</label><span>{{info.RealityEmpAvgPushCount||'0'}}个</span></p>
						<p><label>实际放盘一盘一出量：</label><span>{{info.RealityPushCount||'0'}}个</span></p>
					</div>
				</div>
				<div class="list">
					<div class="h4">
						<span></span> · 店董操作数据 · <span></span>
					</div>
					<div class="lMsg">
						<p><label>好房推荐率：</label><span>{{info.RecommendCount||0}}</span></p>
						<p><label>网络查看次数：</label><span>{{info.LoginInCount||0}}次</span></p>
					</div>
				</div>
				<div class="list">
					<div class="h4">
						<span></span> · App推广数据 · <span></span>
					</div>
					<div class="lMsg">
						<p><label>新用户数：</label><span>{{info.NewUserCount}}个</span></p>
						<p><label>本月累计新用户总数：</label><span>{{info.NewUserAllCount}}个</span></p>
					</div>
				</div>
				<div class="list">
					<div class="h4">
						<span></span> · 成长系统数据 · <span></span>
					</div>
					<div class="lMsg">
						<p class="half"><strong><label>首页广告位：</label><span>{{info.CompeteHomeCount}}个</span></strong><strong><label>区域广告位：</label><span>{{info.CompeteAreaCount}}个</span></strong> </p>
						<p class="half"><strong><label>学校广告位：</label><span>{{info.CompeteSchoolCount}}个</span></strong><strong><label>商机抢拍：</label><span>{{info.CompeteBusinessCount}}个</span></strong> </p>
						<p class="half"><strong><label>小区广告位（包日）：</label><span>{{info.CompeteHouseCount}}个</span></strong><strong><label>签到人数：</label><span>{{info.EmpQDCount}}人</span></strong> </p>
						<p><label>小区广告位（包周）：</label><span>{{info.CompeteHouseCountWeek}}个</span></p>
						<p><label>经纪人广告位（包日）：</label><span>{{info.CompeteEmpCount}}个</span></p>
						<p><label>经纪人广告位（包周）：</label><span>{{info.CompeteEmpCountWeek}}个</span></p>
						<p><label>元宝总赚取：</label><span>{{info.EarnYuanBaoALL}}个</span></p>
						<p><label>元宝总消耗：</label><span>{{info.ConsumeAll}}个</span></p>
						<p><label>元宝总余额：</label><span>{{info.YuanBaoEnable}}个</span></p>
					</div>
				</div>
				<div class="jjrLine">
					<p><label>活跃经纪人：</label><span>{{all.ActiveEmpRation}}</span></p>
					<div id="jjr"></div>
				</div>
				<div class="list">
					<div class="h4">
						<span></span> · 进线及服务数据 · <span></span>
					</div>
					<h4 style="padding-top: 0.4rem;">400进线服务</h4>
					<div class="lMsg" id="callMsg">
					</div>
				</div>
				<div class="jjrLine jjrThree" style="padding-top: 0;">
					<h4>微聊进线服务</h4>
					<p><label>留电数：</label>{{all.GetPhoneCount}}个</p>
					<p><label>本月累计留电数：</label>{{all.GetPhoneAllCount}}个</p>
					<div id="three"></div>
				</div>
				</template>
				<div class="dlNone" v-else>
				</div>
			</div>
			
			<!-- 隐藏该链接 -->
<!-- 			<a
				id="exportImgLink"
				class="export-img-link"
				:download="exportName + '.png'"
				style="display: none;"
			>
				<img id="exportImg" class="export-img" alt="cavas图" />
			</a> -->
			
			<div id="html" style="display: none;"></div>
			<nut-popup :style="{ width: '90%' }" v-model="show">
				<div class="popBox">
					<p v-if="inApp">点击图片分享</p>
					<p v-else>长按图片保存</p>
					<div style="height: 93%;overflow-y: auto;">
					<img :src="appImg" alt="管理日报长图" width="100%" style="display: block;" @click="share"/>
					</div>
				</div>
				
				<button class="closeImg" @click="show=false"></button>
			</nut-popup>
		</div>		
	</div>
</template>

<script>
	import html2canvas from 'html2canvas'
	import * as echarts from 'echarts';
	import Vue from 'vue';
	// 京东框架2.X
	import nutUI from '@nutui/nutui/dist/nutui.min.js';  // 加载构建后的JS
	import '@nutui/nutui/dist/nutui.min.css';  //加载构建后的CSS
	nutUI.install(Vue);
	import Module from '@/components/module.vue'
	import { Toast,Indicator } from 'mint-ui';
	import {
	  uToken,
	} from "@/global/token.js";
	export default{
		name: 'dayLogMsg',
		data(){
			return{
				header_token:{"token": uToken()},
				showAll:false,
				info:"",
				all:"",
				ready:false,
				arr:[{id:'000',val:'111'},{id:'111',val:"222"}],
				exportName:"管理日报图片",
				htmlUrl:"",
				show:false,
				test:"测试2",
				appImg:"",
				loading:"",
				inApp:false,
				showBtn:false
			}
		},
		watch:{
		},
		filters:{
			change(v){
				if(v){
					return v.split(" ")[0];
				}
			}
		},
		mounted(){
			if(navigator.userAgent.indexOf('aplus') > -1){
				this.inApp=true
			}else{
				
			}
			document.title="管理日报";
			window.callback = this.callback;
			this.getData();
		},
		components: {
		},
		methods:{
			getDoLog() {
				return new Promise((resolve) => {
					this.$axios({
							method: "post",
							url: "/ManagerDaily/SetPosterGenerateLog",
							headers: this.header_token,
							data: {
								empDailyId:this.info.Id,
								source:"web"
							}
						})
						.then(res => {
							console.log(res);
							resolve(res);
							if (res.data.code == 0) {
			
							}
						})
						.catch(error => {
							// this.$toast.text("网络错误，请稍后再试");
						})
				})
			},
			getShareLog(id) {
				return new Promise((resolve) => {
					this.$axios({
							method: "post",
							url: "/Poster/PostMyTemplateShareLog",
							headers: this.header_token,
							data: {
								Id:0,
								EmpDailyId: this.info.Id,
							}
						})
						.then(res => {
							console.log(res);
							resolve(res);
							if (res.data.code == 0) {

							}
						})
						.catch(error => {
							// this.$toast.text("网络错误，请稍后再试");
						})
				})
			},
			showUrl(){
				this.getDoLog();
				// html转图片
				this.exportData();
				if(!this.htmlUrl){
				}else{
					// setTimeout(()=>{
					// 	Indicator.close();
					// 	this.show=true;
					// },800)
				}

			},
			uploadImg(){
					return new Promise((resolve)=>{
						this.$axios({
							method:"post",
							url:"/Common/UploadImageBase64",
							data:{
								"base64Img":this.htmlUrl.split(',')[1]
							}
						})
						.then(res=>{
							console.log(res);
							if(res.data.code==0){
								this.appImg=res.data.url;
								// localStorage.setItem(this.$route.params.date+this.$route.params.id,res.data.url);
								this.showBtn=true;
								setTimeout(()=>{
									Indicator.close();
									this.show=true;
								},500)
							}
						})
						.catch(error=>{
							Indicator.close();
							Toast("网络错误，请稍后再试");
						})
					})
			},
			// html转图片
			exportData() {
				var u = navigator.userAgent;
				var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器 
				var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
				// Indicator.open({
				// 	spinnerType: 'triple-bounce'
				// });
				Indicator.open({
					spinnerType: 'triple-bounce'
				});
			  html2canvas(document.querySelector('#screenshotsSection'), {
			    scale: 3, //放大一倍，使图像清晰一点
			  }).then((canvas) => {
					// Indicator.close();
					// this.show=true;
			    // const exportImgEle = document.querySelector('#exportImg');
			    // const exportImgLinkEle = document.querySelector('#exportImgLink');
			    // exportImgEle.src = canvas.toDataURL('image/png');
			    // exportImgLinkEle.href = canvas.toDataURL('image/png');
					this.htmlUrl=canvas.toDataURL('image/png');
					// this.htmlUrl=this.htmlUrl.replace(/(\r\n)|(\n)|(\r)/g,'');
					// if(!this.inApp){
					// 	// this.showBtn=true;
					// 	setTimeout(()=>{
					// 		Indicator.close();
					// 		this.show=true;
					// 		// 写入日志
					// 		this.getShareLog();
					// 	},500)
					// }else{
					// 	let str=(this.$route.params.date+this.$route.params.id).toString();
					// 	this.uploadImg();
					// }
					
					this.uploadImg();
					
			    // exportImgLinkEle.click();  // 执行 <a> 元素的下载
			  });
			},
			writePic(){
				// 基于准备好的dom，初始化echarts实例
				var myChart = echarts.init(document.getElementById('jjr'));
				// 绘制图表
				var option;
				
				option = {
				    // tooltip: {
				    //     trigger: 'axis',
				    //     axisPointer: {
				    //         type: 'cross',
				    //         crossStyle: {
				    //             color: '#999'
				    //         }
				    //     },
								// formatter: function (params) {
								// 		var relVal = params[0].name
								// 		for (var i = 0, l = params.length; i < l; i++) {
								// 			relVal += '<br/>' + params[i].marker + params[i].seriesName + ' : ' + params[i].value+"%"
								// 		}
								// 		return relVal
								// }
				    // },
				    // toolbox: {
				    //     feature: {
				    //         dataView: {show: true, readOnly: false},
				    //         magicType: {show: true, type: ['line', 'bar']},
				    //         restore: {show: true},
				    //         saveAsImage: {show: true}
				    //     }
				    // },
				    legend: {
				        data: ['活跃百分比'],
								icon:"circle",
								bottom:"5%",
								selectedMode:false
				    },
				    xAxis: [
				        {
				            type: 'category',
				            data: this.all.Dailys,
				            axisPointer: {
				                type: 'line'
				            },
										axisLabel:{
											fontSize:11
										}
				        }
				    ],
				    yAxis: [
				        {
				            type: 'value',
				            // min: 0,
				            max: 100,
				            // interval: 10,
				            axisLabel: {
				                formatter: '{value}%',
												fontSize:10
				            },
				        }
				    ],
				    series: [
				        {
				            name: '活跃百分比',
				            type: 'line',
				            yAxisIndex: 0,
										label: {
											formatter:'{c}%',
												show: true,
												position: 'top',
												color:"#333"
										},
										color:"#FF3C3C",
				            data: this.all.ActiveEmpRatios
				        }
				    ]
				};
				option && myChart.setOption(option);
						// myChart.dispatchAction({
						//     type: 'showTip',
						//     seriesIndex: 0,
						//     dataIndex: 6
						// });
				    // myChart.dispatchAction({
				    //     type: 'highlight',
				    //     seriesIndex: 0,
				    //     dataIndex: 6
				    // });
			},
			writeTwo(){
				// 基于准备好的dom，初始化echarts实例
				var myChart = echarts.init(document.getElementById('callMsg'));
				// 绘制图表
				var option;
				
				option = {
				    // tooltip: {
				    //     trigger: 'axis',
				    //     axisPointer: {
				    //         type: 'cross',
				    //         crossStyle: {
				    //             color: '#999'
				    //         }
				    //     },
								// formatter: function (params) {
								// 		var relVal = params[0].name
								// 		for (var i = 0, l = params.length; i < l; i++) {
								// 				if(i==1){
								// 					 relVal += '<br/>' + params[i].marker + params[i].seriesName + ' : ' + params[i].value+"%"
								// 				}else{
								// 					relVal += '<br/>' + params[i].marker + params[i].seriesName + ' : ' + params[i].value
								// 				}
								// 		}
								// 		return relVal
								// }
				    // },
				    // toolbox: {
				    //     feature: {
				    //         dataView: {show: true, readOnly: false},
				    //         magicType: {show: true, type: ['line', 'bar']},
				    //         restore: {show: true},
				    //         saveAsImage: {show: true}
				    //     }
				    // },
				    legend: {
				        data: ['400进线', '应答率'],
								bottom:"5%",
								icon:"circle",
								selectedMode:false
				    },
				    xAxis: [
				        {
				            type: 'category',
				            data: this.all.Dailys,
				            axisPointer: {
				                type: 'shadow',
												shadowStyle:{
													 shadowColor:"#ff0000"
												}
				            },
										axisLabel:{
											fontSize:11
										}
				        }
				    ],
				    yAxis: [
				        {
				            type: 'value',
				            // name: '400进线量',
				            // min: 0,
				            max: function (value) {
				            	if(value.max>250){
				            		return value.max
				            	}else if(value.max>200){
				            		return 250
				            	}else if(value.max>150){
				            		return 200
				            	}else if(value.max>100){
				            		return 150
				            	}else if(value.max>50){
				            		return 100
				            	}else if(value.max>25){
				            		return 50
				            	}else if(value.max>10){
				            		return 25
				            	}else if(value.max<5){
				            		return 5;
				            	}else{
												return 10;
											}
				            },
				            // interval: 1,
				            axisLabel: {
				                formatter: '{value}'
												
				            }
				        },
				        {
				            type: 'value',
				            // name: '应答率',
				            // min: 0,
				            max: 100,
				            // interval: 5,
				            axisLabel: {
				                formatter: '{value}%',
												fontSize:10
				            }
				        }
				    ],
				    series: [
				        {
				            name: '400进线',
				            type: 'bar',
										color:"#76C4FA",
										itemStyle:{
											normal:{
												// color:function(params){
												// 	var colorList=["#76C4FA","#76C4FA","#76C4FA","#76C4FA","#76C4FA","#76C4FA","#00a0fb"];
												// 	return colorList[params.dataIndex]
												// },
												label: {
														show: true,
														position: 'inside',
														color:"#fff"
												},
											}
										},
										labelLine: {
											show: false
										},
				            data: this.all.WebWorkCounts
				        },
				        {
				            name: '应答率',
				            type: 'line',
										color:"#FF3C3C",
										label: {
											formatter:'{c}%',
												show: true,
												position: 'top',
												color:"#333"
										},
				            yAxisIndex: 1,
				            data: this.all.WebWorkAnswerRatios
				        }
				    ]
				};
				option && myChart.setOption(option);
			},
			writeThree(){
				// 基于准备好的dom，初始化echarts实例
				var myChart = echarts.init(document.getElementById('three'));
				// 绘制图表
				var option;
				
				option = {
				    // tooltip: {
				    //     trigger: 'axis',
				    //     axisPointer: {
				    //         type: 'cross',
								// 		snap:true,
				    //         crossStyle: {
				    //             color: '#999'
				    //         },
								// 		// label: {
								// 		// 		formatter:'{value}%',
								// 		//     show: true,
								// 		// },
				    //     },
								// formatter: function (params) {
								// 							var relVal = params[0].name
								// 							for (var i = 0, l = params.length; i < l; i++) {
								// 									if(i==1){
								// 										 relVal += '<br/>' + params[i].marker + params[i].seriesName + ' : ' + params[i].value+"%"
								// 									}else{
								// 										relVal += '<br/>' + params[i].marker + params[i].seriesName + ' : ' + params[i].value
								// 									}
								// 							}
								// 							return relVal
								// 					}
								// // formatter:'{b0}<br />微聊进线: {c0}<br />一分钟应答率: {c1}%',
				    // },
				    // toolbox: {
				    //     feature: {
				    //         dataView: {show: true, readOnly: false},
				    //         magicType: {show: true, type: ['line', 'bar']},
				    //         restore: {show: true},
				    //         saveAsImage: {show: true}
				    //     }
				    // },
				    legend: {
				        data: ['微聊进线', '一分钟应答率'],
								bottom:"5%",
								icon:"circle",
								selectedMode:false
				    },
				    xAxis: [
				        {
				            type: 'category',
				            data: this.all.Dailys,
				            axisPointer: {
				                type: 'shadow'
				            },
										axisLabel:{
											fontSize:11
										}
				        }
				    ],
				    yAxis: [
				        {
				            type: 'value',
				            // name: '微聊进线',
				            // min: 0,
				            max: function (value) {
				            	if(value.max>250){
				            		return value.max
				            	}else if(value.max>200){
				            		return 250
				            	}else if(value.max>150){
				            		return 200
				            	}else if(value.max>100){
												return 150
											}else if(value.max>50){
				            		return 100;
				            	}else if(value.max>25){
				            		return 50;
				            	}else if(value.max>10){
				            		return 25;
				            	}else if(value.max<5){
				            		return 5;
				            	}else{
				            		return 10;
				            	}
				            },
				            // interval: 2,
				            axisLabel: {
				                formatter: '{value}'
				            }
				        },
				        {
				            type: 'value',
				            // name: '一分钟应答率',
				            // min: 0,
				            max: 100,
				            // interval: 5,
										splitNumber:5,
				            axisLabel: {
				                formatter: '{value}%',
												fontSize:10
				            }
				        }
				    ],
				    series: [
				        {
				            name: '微聊进线',
				            type: 'bar',
										itemStyle:{
											normal:{
												// color:function(params){
												// 	var colorList=["#7689FA","#7689FA","#7689FA","#7689FA","#7689FA","#7689FA","#4a64f9"];
												// 	return colorList[params.dataIndex]
												// },
												color:"#7689FA",
												label: {
														show: true,
														position: 'inside',
														color:"#fff"
												},
											}
										},
				            data: this.all.ChatWorkCounts,
										labelLine: {
											show: false
										}
				        },
				        {
				            name: '一分钟应答率',
				            type: 'line',
										label: {
											formatter:'{c}%',
										    show: true,
										    position: 'top',
												color:"#333"
										},
										color:"#FF3C3C",
				            yAxisIndex: 1,
										labelLine: {
											show: false
										},
				            data:this.all.ChatWorkAnswerRatios
				        },
				      //   {
				      //       name: '两分钟应答率',
				      //       type: 'line',
										// color:"#1EC3D2",
				      //       yAxisIndex: 1,
				      //       data: [68,74,93,82,109,75,34]
				      //   }
				    ]
				};
				
				option && myChart.setOption(option);
				setTimeout(()=>{
					this.showBtn=true;
				},500)
			},
			getData(){
				Indicator.open();
				return new Promise((resolve)=>{
					this.$axios({
						method:"get",
						url:"/ManagerDaily/GetEmpDailyData",
						headers:this.header_token,
						params:{
							deptId:this.$route.params.id,
							dailyDate:this.$route.params.date
						}
					})
					.then(res=>{
						console.log(res);
						if(res.data.code==0){
							if(res.data.data){
								this.info=res.data.data.EmpDailyManagement;
								this.all=res.data.data;
								setTimeout(()=>{
									this.writePic();
									this.writeTwo();
									this.writeThree();
								},100)
							}
						}else{
							Toast(res.data.msg);
						}
						this.ready=true;
						Indicator.close();
					})
					.catch(error=>{
						Indicator.close();
						Toast("网络错误，请稍后再试");
					})
				})
			},
			
			
			// A+分享
			share() {
				if(!this.inApp){
					return false;
				}
				if(!this.appImg){
					this.loading = this.$toast.loading("图片处理中",{});
					setTimeout(()=>{
						this.loading.hide();
						this.share();
					},2000)
				}else{
					const img = this.appImg;
					this.openShare(img)
				}
			},
			
			openShare(img) {
				// window.callback = this.callback
				window.location.href = "centaline:" + this.shareParams(img);
			},
			// A+分享回调
			callback(item) {
				if(item){
					// 写入日志
					this.getShareLog();
					this.show=false;
				}
				// window.callback = null
			},
			// A+分享
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
			            channel:["saveImage", "wxImage", "wxMomentsImage"],//["wx","wxImage","wxMomentsImage","QQ"]
			            img:src,
			            title:this.exportName,
			            description:"",
			            link:location.href
			        });
			},
			
		}
	}	
</script>

<style scoped="scoped" lang="less">
	.dayLogMsg{
		background-color: #C8CBFF;
		min-height: 100vh;
		.top{
			width: 100%;
			height: 6.45rem;
			background: url(../assets/img/dl-banner.png) center no-repeat;
			background-size: 100%;
			text-align: center;
			padding: 5rem 0.2rem 0;
			span{
				padding: 0 0.4rem;
				border: 1px solid #FF6A4E;
				border-radius: 0.24rem;
				background-color: #fff;
				opacity: 0.9;
				line-height: 0.38rem;
				font-size: 0.3rem;
				height: 0.42rem;
				color: #382E2A;
				display: inline-block;
				max-width: 100%;
				white-space: nowrap;
				text-overflow: ellipsis;
				overflow: hidden;
			}
		}
		.content{
			padding: 0.3rem;
			background: url(../assets/img/dl-ban1.png) center top no-repeat;
			background-size: 100%;
			.list{
				background-color: #FFC051;
				border-radius: 0.2rem;
				overflow: hidden;
				margin-bottom: 0.3rem;
				.h4{
					text-align: center;
					padding: 0.26rem 0;
					color: #fff;
					font-size: 0.32rem;
					line-height: 1;
					span{
						display: inline-block;
						height: 1px;
						width: 0.7rem;
						position: relative;
						top: -0.09rem;
						background-color: #fff;
					}
				}
				.lMsg{
					p{
						padding-left: 0.3rem;
						line-height: 0.68rem;
						background: #fff;
						font-size: 0.26rem;
						color: #666;
						&:nth-of-type(even){
							background-color: #ECF4FA;
						}
						span{
							color: #333;
							font-weight: 550;
						}
					}
					.half{
						display: flex;
						strong{
							flex: 1;
							font-weight: 500;
							&:first-child{
								flex: 1.4;
							}
						}
					}
				}
			}
			.jjrLine{
				padding: 0.3rem 0.1rem 0;
				min-height: 6rem;
				background-color: #fff;
				border-radius: 0 0 0.2rem 0.2rem;
				margin-bottom: 0.3rem;
				p{
					// margin-bottom: 0.2rem;
					padding-left: 0.2rem;
					label{
						color: #666;
					}
					span{
						color: #333;
					}
				}
				#jjr{
					height: 6rem;
				}
			}
			.jjrThree{
				p{
					margin-top: 0.2rem;
					margin-bottom: 0;
					label{
						color: #666;
					}
					span{
						color: #333;
					}
				}
			}
			#callMsg,#three{
				height: 6rem;
				background-color: #fff;
			}
			#three{
				padding: 0;
			}
			h4{
				background-color: #fff;
				text-align: center;
				padding-top: 0.3rem;
			}
			.dlNone{
				height: 6rem;
				padding-top: 1rem;
				width: 100%;
				background: #fff url(../assets/img/dlNone.png) center no-repeat;
				background-size: 5.5rem;
				border-radius: 0.1rem;
			}
		}
		.export-btn{
			display: block;
			width: 1.02rem;
			height: 1.71rem;
			margin: 0 auto;
			background: url(../assets/img/day-share.png) center no-repeat;
			background-size: 100%;
			position: fixed;
			right: 0;
			top: 6rem;
			z-index: 999;
		}
		.popup-box{
			background: none;
			padding-top: 0.6rem;
		}
		.popup-center{
			height: 100vh;
			overflow-y: auto;
		}
		.closeImg{
			width: 0.6rem;
			height: 0.6rem;
			background:url(../assets/img/d-close.png) center no-repeat;
			background-size: 0.6rem;
			color: #fff;
			font-size: 0.28rem;
			border-radius: 0.12rem;
			position: fixed;
			bottom: 0.8rem;
			left: 3.1rem;
			z-index: 9991;
		}
		.popBox{
			background-color: #fff;
			padding: 0.25rem;
			height: 86%;
			overflow-y: auto;
			border-radius: 0.06rem;
			p{
				text-align: center;
				font-size: 0.32rem;
				margin-bottom: 0.25rem;
				color: #666;
			}
		}
	}
	.export-btn{
		display: block;
		width: 1.02rem;
		height: 1.71rem;
		margin: 0 auto;
		background: url(../assets/img/day-share.png) center no-repeat;
		background-size: 100%;
		position: fixed;
		right: 0;
		top: 6rem;
		z-index: 999;
	}
</style>
