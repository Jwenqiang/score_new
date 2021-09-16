<template>
	<div class="morning">
		<div class="top">
			<div class="topT">
				<div class="label">
					<h4>60</h4>
					<p>累计早起</p>
				</div>
				<div class="label">
					<h4>25</h4>
					<p>连续早起</p>
				</div>
				<div class="label">
					<h4>10</h4>
					<p>最长连续</p>
				</div>
			</div>
			<div class="topBtom">
				<div class="tbTitle">
					<p class="topTip">连续早起奖励领取</p>
				</div>
				
				<div class="tbSign">
					<div class="tbLine">
						<div class="redLine"></div>
					</div>
					<div class="tbIcon">
						<label class="on">
							<img src="images/za-0.png" />
							<p><span></span></p> 
							<p>0天</p>
						</label>
						<label class="on">
							<img src="images/za-1.png"/>
							<p><span></span></p> 
							<p>5天</p>
						</label>
						<label class="on">
							<img src="images/za-2.png"/>
							<p><span></span></p> 
							<p>10天</p>
						</label>
						<label>
							<img src="images/za-3.png"/>
							<p><span></span></p> 
							<p>15天</p>
						</label>
						<label>
							<img src="images/za-3.png"/>
							<p><span></span></p> 
							<p>20天</p>
						</label>
						<label>
							<img src="images/za-3.png"/>
							<p><span></span></p> 
							<p>25天</p>
						</label>
						<label>
							<img src="images/za-3.png"/>
							<p><span></span></p> 
							<p>30天</p>
						</label>
					</div>
				</div>
			</div>
		</div>
		<div class="content">
			<div class="mBox">
				<div class="box-img">
					<img src="images/za-lh1.gif" style="margin-top: -0.3rem;width:3.6rem" v-show="dh"/>
					<img src="images/za-lh.png"  v-show="dh==false"/>
				</div>
				<div class="box-bl"></div>
				<div class="box-btn">
					<img src="images/za-btn.png" @click="setImg"/>
				</div>
			</div>
			<div class="box-tip">
				<p>抽海报说明：</p>
				<p>1、每天抽取分享时间为早上4:00-08:00</p>
				<p>2、每天首次分享得奖励</p>
			</div>
		</div>
		<nut-popup v-model="show" style="border-radius: 0.1rem;">
			<div class="bigHb" v-show="showHb">
				<p class="bigF">早安你好</p>
				<p class="bigS"><span></span> {{ inApp ? '点击图片分享' : '长按图片保存' }} <span></span></p>
				<div class="bigHc">
					<img src="https://sz.centanet.com/partner/jifen/My/ShowPosterTemplate?t=3e8709a5-041c-47e0-95de-252f256a8b13" width="100%" @click="share(bigImg)"/>
				</div>
				<label @click="show=false"></label>
			</div>
		</nut-popup>
	</div>
</template>

<script>
	import Vue from 'vue';
	// 京东框架2.X
	import nutUI from '@nutui/nutui/dist/nutui.min.js';  // 加载构建后的JS
	import '@nutui/nutui/dist/nutui.min.css';  //加载构建后的CSS
	nutUI.install(Vue);
	import {
	  uToken,
	} from "@/global/token.js";
	export default{
		name: 'morning',
		data(){
			return{
				header_token:{"token": uToken()},
				inApp:false,
				show:false,
				dh:false,
				showHb:false,
				bigImg:""
			}
		},
		computed: {

		},
		created() {

		},
		mounted(){
			if(navigator.userAgent.indexOf('aplus') > -1){
				this.inApp=true
			}
		},
		components: {

		},
		watch:{
			// '$route' (to, from) {
			//    if (to.name === 'home') {
			// 	  this.getSign();
			// 	  // this.getTip();
			//     }
			//  }

		},
		methods:{
			setImg(){
				this.dh=true;
				setTimeout(()=>{
					this.show=true;
					this.dh=false;
					setTimeout(()=>{
						this.showHb=true;
					},500)
				},1500)
			},
			setOld(){
				return new Promise((resolve)=>{
						this.$axios({
							method:"get",
							url:"",
							headers:this.header_token,
							params:{
								
							}
						})
						.then(res=>{
							console.log(res);
							resolve(res);
						})
						.catch(error=>{
							this.$toast.text("网络错误，请稍后再试");
						})
				})
			},
			// A+分享
			share() {
				console.log('分享')
				const img = this.bigImg
				this.openShare(img)
			},

			openShare(img) {
				// window.callback = this.callback
				window.location.href = "centaline:" + this.shareParams(img);
			},

			// A+分享回调
			callback(item) {
				this.testCall = " ";
				// window.callback = null
				if (item) {
					setTimeout(() => {
						this.getShareLog(item);
					}, 500)
				}
			},

			getShareLog(shareName) {
				return new Promise((resolve) => {
					this.$axios({
							method: "post",
							url: "/Poster/PostMyTemplateShareLog",
							headers: this.header_token,
							data: {
								Id: "",
								SharedDestination: shareName
							}
						})
						.then(res => {
							console.log(res);
							resolve(res);
							if (res.data.code == 0) {
								if (res.data.data.IsSuccess) {
								} else {
								}
							}
						})
						.catch(error => {
							this.$toast.text("网络错误，请稍后再试");
						})
				})
			},

			shareParams(i) {
				var json = this.dataJson(i);
				var jsonData = JSON.stringify({
					action: "share",
					data: json
				});
				return encodeURIComponent(jsonData);
			},

			dataJson(src) {
				return JSON.stringify({
					channel: ["saveImage", "wxImage", "wxMomentsImage"], //["wx","wxImage","wxMomentsImage","QQ"]
					img: src,
					title: "",
					description: "",
					link: location.href
				});
			},
		}
	}
</script>

<style lang="less" scoped>
.morning{
	padding: 0.3rem;
	background-color: #F5F5F5;
	min-height: 100vh;
	.top{
		background-color: #fff;
		padding: 0.3rem 0;
		border-radius: 0.1rem;
		box-shadow: 0px 2px 6px 2px rgba(0, 0, 0, 0.06);
		.topT{
			display: flex;
			padding-bottom: 0.4rem;
			.label{
				width: 33.3%;
				text-align: center;
				&:nth-of-type(2){
					border-left: 1px solid #ededed;
					border-right: 1px solid #ededed;
				}
				h4{
					font-size: 0.36rem;
				}
				p{
					font-size: 0.28rem;
					color: #666;
					margin-top: 0.15rem;
				}
			}
		}
		.topBtom{
			.tbTitle{
				padding: 0 0.3rem 0;
			}
			.topTip{
				font-size: 0.28rem;
				color: #666;
				border-top: 1px solid #ededed;
				padding: 0.3rem 0;
			}
			.tbSign{
				position: relative;
				.tbLine{
					width: 86%;
					height: 2px;
					background-color: #999;
					position: absolute;
					bottom: 0.54rem;
					left: 0.4rem;
					.redLine{
						background-color: #FA4D32;
						height: 100%;
						width: 40%;
					}
				}
			}
			.tbIcon{
				display: flex;
				label{
					flex: 1;
					display: inline-block;
					position: relative;
					text-align: center;
					img{
						width: 0.6rem;
					}
					p{
						color: #999;
					}
					span{
						display: inline-block;
						width: 0.2rem;
						height: 0.2rem;
						background-color: #999;
						border-radius: 50%;
						
					}
				}
				label.on{
					span{
						background-color: #FA4D32;
					}
				}
			}
		}
	}
	.content{
		.mBox{
			margin-top: 0.6rem;
			background: #fff url(../../public/images/za-box.png) center no-repeat;
			background-size: 100%;
			height: 7.9rem;
			padding: 0.3rem 0;
			border-radius: 0.1rem;
			box-shadow: 0px 2px 6px 2px rgba(0, 0, 0, 0.06);
			position: relative;
			.box-img{
				text-align: center;
				margin-top:1.2rem;
				img{
					width:2.21rem;
				}
				
			}
			.box-bl{
				height: 2.95rem;
				width: 100%;
				background: url(../../public/images/za-bl.png) center no-repeat;
				background-size: 5.08rem;
				position: absolute;
				top: 1.4rem;
				left: 0;
			}
			.box-btn{
				text-align: center;
				position: absolute;
				bottom: 0.9rem;
				left: 0;
				width: 100%;
				img{
					width: 2.21rem;
					&:active{
						transform: translateY(3px);
					}
				}
			}
		}
		.box-tip{
			margin-top: 0.4rem;
			color: #999;
			font-size: 0.24rem;
			p{
				margin-bottom: 0.2rem;
				&:first-child{
					font-size: 0.28rem;
				}
			}
		}
	}
	.bigHb {
		width: 6rem;
		min-height: 11.2rem;
		position: relative;
		background: #fff url(../assets/img/pNone.png) center no-repeat;
		background-size: 4rem;
		padding: 0.3rem;
		overflow: hidden;
		animation: big ease 0.3s forwards;
	}
	.bigHb label {
		width: 0.6rem;
		height: 0.6rem;
		background: url(../assets/img/r-close.png) right top no-repeat;
		background-size: 0.4rem;
		position: absolute;
		right: 0.2rem;
		top: 0.2rem;
	}
	
	.bigF {
		font-size: 0.32rem;
		font-weight: 600;
		text-align: center;
		margin-bottom: 0.1rem;
	}

	.bigS {
		font-size: 0.26rem;
		font-weight: 400;
		text-align: center;
		color: #666;
		margin-bottom: 0.2rem;
		span{
			height: 1px;
			background-color: #999;
			width: 1.2rem;
			display: inline-block;
			position: relative;
			top: -0.08rem;
			margin: 0 3px;
		}
	}

	.bigHc {
		overflow-y: auto;
		height: 9.61rem;
	}
	.popup-box{
		background: none;
	}
	/* 全面屏 */
	@media screen and (min-device-height : 812px) {
		.bigHb {
			width: 6.7rem;
			min-height: 12rem;
		}
		.bigHc{
			height: 10rem;
		}
	}
}
	@keyframes big{
		from{transform: scale(0);}
		to{transform: scale(1);}
	}
</style>
<style>

</style>
