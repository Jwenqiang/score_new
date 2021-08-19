<template>
	<div class="dayLogMsg">
		<div class="top">
			<span>2021年8月10日  桂芳园店A</span>
		</div>
		<div class="content">
			<div class="list">
				<div class="h4">
					—— · 经纪人数据 · ——
				</div>
				<div class="lMsg">
					<p><label>经纪人10人：</label><span>入职6人，PPSZ员工4人</span></p>
					<p><label>质检封禁人数：</label><span>2人</span></p>
					<p><label>人均放盘量：</label><span>45</span></p>
					<p><label>人均放盘量：</label><span>45</span></p>
					<p><label>实际放盘一盘一出量：</label><span>45</span></p>
				</div>
			</div>
			<div class="list">
				<div class="h4">
					—— · 店董操作数据 · ——
				</div>
				<div class="lMsg">
					<p><label>好房推荐率：</label><span>80%</span></p>
					<p><label>网络查看次数：</label><span>2人</span></p>
				</div>
			</div>
			<div class="list">
				<div class="h4">
					—— · App推广数据 · ——
				</div>
				<div class="lMsg">
					<p><label>新用户数：</label><span>10个</span></p>
					<p><label>本月累计新用户总数：</label><span>211人</span></p>
				</div>
			</div>
			<div class="list">
				<div class="h4">
					—— · 成长系统数据 · ——
				</div>
				<div class="lMsg">
					<p class="half"><strong><label>首页广告位：</label><span>10个</span></strong><strong><label>区域广告位：</label><span>10个</span></strong> </p>
					<p class="half"><strong><label>学校广告位：</label><span>10个</span></strong><strong><label>商机抢拍：</label><span>10个</span></strong> </p>
					<p><label>本月累计新用户总数：</label><span>211人</span></p>
				</div>
			</div>
			<div class="jjrLine">
				<p><label>活跃经纪人：</label><span>80%</span></p>
				<div id="jjr"></div>
			</div>
			<div class="list">
				<div class="h4">
					—— · 进线及服务数据 · ——
				</div>
				<h4 style="padding-top: 0.4rem;">400进线服务</h4>
				<div class="lMsg" id="callMsg">
				</div>
			</div>
			<div class="jjrLine jjrThree" style="padding-top: 0;">
				<h4>微聊进线服务</h4>
				<p><label>留电数：</label>80</p>
				<p><label>本月累计留电数：</label>480</p>
				<div id="three"></div>
			</div>
		</div>
		
	</div>		
</template>

<script>
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
				showAll:false
			}
		},
		watch:{
		},
		mounted(){
			document.title="管理日报";
			this.getData();
			this.writePic();
			this.writeTwo();
			this.writeThree();
		},
		components: {
		},
		methods:{
			writePic(){
				// 基于准备好的dom，初始化echarts实例
				var myChart = echarts.init(document.getElementById('jjr'));
				// 绘制图表
				var option;
				
				option = {
				    tooltip: {
				        trigger: 'axis',
				        axisPointer: {
				            type: 'cross',
				            crossStyle: {
				                color: '#999'
				            }
				        }
				    },
				    // toolbox: {
				    //     feature: {
				    //         dataView: {show: true, readOnly: false},
				    //         magicType: {show: true, type: ['line', 'bar']},
				    //         restore: {show: true},
				    //         saveAsImage: {show: true}
				    //     }
				    // },
				    legend: {
				        data: ['活跃人数']
				    },
				    xAxis: [
				        {
				            type: 'category',
				            data: ['8.11', '8.12', '8.13', '8.14', '8.15', '8.16', '8.17'],
				            axisPointer: {
				                type: 'line'
				            }
				        }
				    ],
				    yAxis: [
				        {
				            type: 'value',
				            // min: 0,
				            // max: 50,
				            // interval: 10,
				            axisLabel: {
				                formatter: '{value}%'
				            }
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
												position: 'top'
										},
										color:"#FF3C3C",
				            data: [10,28,38,46,23,19,55]
				        }
				    ]
				};
				option && myChart.setOption(option);
			},
			writeTwo(){
				// 基于准备好的dom，初始化echarts实例
				var myChart = echarts.init(document.getElementById('callMsg'));
				// 绘制图表
				var option;
				
				option = {
				    tooltip: {
				        trigger: 'axis',
				        axisPointer: {
				            type: 'cross',
				            crossStyle: {
				                color: '#999'
				            }
				        }
				    },
				    // toolbox: {
				    //     feature: {
				    //         dataView: {show: true, readOnly: false},
				    //         magicType: {show: true, type: ['line', 'bar']},
				    //         restore: {show: true},
				    //         saveAsImage: {show: true}
				    //     }
				    // },
				    legend: {
				        data: ['400进线', '一分钟应答率'],
								bottom:"5%"
				    },
				    xAxis: [
				        {
				            type: 'category',
				            data: ['8.11', '8.12', '8.13', '8.14', '8.15', '8.16', '8.17'],
				            axisPointer: {
				                type: 'shadow'
				            }
				        }
				    ],
				    yAxis: [
				        {
				            type: 'value',
				            // name: '水量',
				            // min: 0,
				            // max: 250,
				            // interval: 50,
				            axisLabel: {
				                formatter: '{value}'
				            }
				        },
				        {
				            type: 'value',
				            // name: '温度',
				            // min: 0,
				            // max: 25,
				            // interval: 5,
				            axisLabel: {
				                formatter: '{value}%'
				            }
				        }
				    ],
				    series: [
				        {
				            name: '400进线',
				            type: 'bar',
										color:"#76C4FA",
										label: {
												show: true,
												position: 'inside',
												color:"#fff"
										},
				            data: [20,30,35,41,50,25,12]
				        },
				        {
				            name: '一分钟应答率',
				            type: 'line',
										color:"#FF3C3C",
										            label: {
																	formatter:'{c}%',
										                show: true,
										                position: 'top'
										            },
				            yAxisIndex: 1,
				            data: [58,64,83,72,99,65,24]
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
				    tooltip: {
				        trigger: 'axis',
				        axisPointer: {
				            type: 'cross',
				            crossStyle: {
				                color: '#999'
				            },
										// label: {
										// 		formatter:'{value}%',
										//     show: true,
										// },
				        }
				    },
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
								bottom:"5%"
				    },
				    xAxis: [
				        {
				            type: 'category',
				            data: ['8.11', '8.12', '8.13', '8.14', '8.15', '8.16', '8.17'],
				            axisPointer: {
				                type: 'shadow'
				            }
				        }
				    ],
				    yAxis: [
				        {
				            type: 'value',
				            // name: '水量',
				            // min: 0,
				            // max: 250,
				            // interval: 50,
				            axisLabel: {
				                formatter: '{value}'
				            }
				        },
				        {
				            type: 'value',
				            // name: '温度',
				            // min: 0,
				            // max: 25,
				            // interval: 5,
				            axisLabel: {
				                formatter: '{value}%'
				            }
				        }
				    ],
				    series: [
				        {
				            name: '微聊进线',
				            type: 'bar',
										label: {
												show: true,
												position: 'inside',
												color:"#fff"
										},
										color:"#7689FA",
				            data: [20,30,35,41,50,25,12]
				        },
				        {
				            name: '一分钟应答率',
				            type: 'line',
										label: {
											formatter:'{c}%',
										    show: true,
										    position: 'top'
										},
										color:"#FF3C3C",
				            yAxisIndex: 1,
				            data: [58,64,83,72,99,65,24]
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
			},
			getData(){
				Indicator.open();
				return new Promise((resolve)=>{
					this.$axios({
						method:"get",
						url:"/Message/GetList",
						headers:this.header_token,
						params:{
							PageSize:this.pSize,
						}
					})
					.then(res=>{
						this.ready=true;
						console.log(res);
						Indicator.close();
						if(res.data.code==0){
							this.msg=res.data.data.DataList;
							this.count=res.data.data.RecordCount;
						}else{
							Toast(res.data.msg);
						}
					})
					.catch(error=>{
						this.ready=true;
						Indicator.close();
						Toast("网络错误，请稍后再试");
					})
				})
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
			padding-top: 5rem;
			text-align: center;
			span{
				padding: 0 0.4rem;
				border: 1px solid #FF6A4E;
				border-radius: 0.24rem;
				background-color: #fff;
				opacity: 0.9;
				line-height: 0.47rem;
				font-size: 0.3rem;
				color: #382E2A;
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
						}
					}
				}
			}
			.jjrLine{
				padding: 0.3rem 0.3rem 0;
				min-height: 6rem;
				background-color: #fff;
				border-radius: 0 0 0.2rem 0.2rem;
				margin-bottom: 0.3rem;
				p{
					margin-bottom: 0.2rem;
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
				padding: 0 0.2rem;
			}
			#three{
				padding: 0;
			}
			h4{
				background-color: #fff;
				text-align: center;
				padding-top: 0.3rem;
			}
		}
	}
</style>
