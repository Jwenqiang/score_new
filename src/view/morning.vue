<template>
	<div class="morning">
		<div class="top">
			<div class="topT">
				<div class="label">
					<h4>{{info.AllSignDays}}</h4>
					<p>累计早起</p>
				</div>
				<div class="label">
					<h4>{{info.ContinueSignDays}}</h4>
					<p>连续早起</p>
				</div>
				<div class="label">
					<h4>{{info.MaxSignDays}}</h4>
					<p>最长连续</p>
				</div>
			</div>
			<div class="topBtom">
				<div class="tbTitle">
					<p class="topTip">连续早起奖励领取</p>
				</div>
				
				<div class="tbSign">
					<div class="tbLine">
						<div class="redLine" :style="`width: ${info.CompletionRate};`"></div>
					</div>
					<div class="tbIcon">
						<label :class="(item.Status<3||item.Days==0)?'on':''" v-for="item in arr" :key="item.Days">
							<img src="images/za-0.png" v-if="item.Days==0"/>
							<img src="images/za-1.png" v-else-if="item.Status==1"/>
							<img src="images/za-2.png" v-else-if="item.Status==2" @click="getYb(item.Date,item.YuanBao)"/>
							<img src="images/za-3.png" v-else-if="item.Status==3"/>
							<p><span></span></p> 
							<p>{{item.Days}}天</p>
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
				<p>1、早安海报分享时间为早上4点-8点。</p>
				<p>2、每天首次分享才得奖励。</p>
			</div>
		</div>
		<nut-popup v-model="show" style="border-radius: 0.1rem;">
			<div class="bigHb" v-show="showHb">
				<p class="bigF">{{title}}</p>
				<p class="bigS"><span></span> {{ inApp ? '点击图片分享' : '长按图片保存' }} <span></span></p>
				<div class="bigHc">
					<img :src="bigImg + '&fmt=jpg'" width="100%" @click="share(bigImg)"/>
				</div>
				<label @click="show=false"></label>
			</div>
		</nut-popup>
		<nut-popup v-model="showSuc">
			<div class="success">
				<p>恭喜您获得{{yb}}元宝</p>
				<label @click="showSuc=false"></label>
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
				bigImg:"",
				arr:[
					{
						type:1,
						date:0,	
					},
					{
						type:1,
						date:5,	
					},
					{
						type:1,
						date:10,	
					},
					{
						type:2,
						date:15,	
					},
					{
						type:3,
						date:20,	
					},
					{
						type:3,
						date:25,	
					},
					{
						type:3,
						date:30,	
					},
				],
				showSuc:false,
				info:"",
				yb:"",
				title:"早安你好",
				test:"--"
			}
		},
		computed: {

		},
		created() {
			document.title="早安分享";
			window.callback = this.callback;
		},
		mounted(){
			if(navigator.userAgent.indexOf('aplus') > -1){
				this.inApp=true
			}
			this.getInfo();
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
			// 领取元宝
			getYb(date,yb){
				return new Promise((resolve)=>{
						this.$axios({
							method:"get",
							url:"/MorningShare/ReceiveYB",
							headers:this.header_token,
							params:{
								date:date
							}
						})
						.then(res=>{
							console.log(res);
							if(res.data.code==0){
								this.yb=yb;
								this.showSuc=true;
								this.info=res.data.data;
								this.arr=res.data.data.Progress;
							}
							resolve(res);
						})
						.catch(error=>{
							this.$toast.text("网络错误，请稍后再试");
						})
				})
				
			},
			setImg(){
				var time=new Date().getHours();
				console.log(time);
				if(time<4||time>7){
					this.$toast.text("早安海报分享4点-8点开放");
					return false;
				}
				this.dh=true;
				this.getHb();
				setTimeout(()=>{
					this.show=true;
					this.dh=false;
					setTimeout(()=>{
						this.showHb=true;
					},500)
				},1500)
			},
			getInfo(){
				this.loading = this.$toast.loading("",{
				    cover: false
				});
				return new Promise((resolve)=>{
						this.$axios({
							method:"get",
							url:"/MorningShare/GetShareInfo",
							headers:this.header_token,
						})
						.then(res=>{
							console.log(res);
							if(res.data.code==0){
								this.info=res.data.data;
								this.arr=res.data.data.Progress;
							}
							resolve(res);
							setTimeout(()=>{
								this.loading.hide();
							},500)
							
						})
						.catch(error=>{
							setTimeout(()=>{
								this.loading.hide();
							},500)
							this.$toast.text("网络错误，请稍后再试");
						})
				})
			},
			getHb(){
				return new Promise((resolve)=>{
						this.$axios({
							method:"get",
							url:"/MorningShare/RandomPoster",
							headers:this.header_token,
						})
						.then(res=>{
							console.log(res.data);
							if(res.data.code==0){
								this.bigImg=res.data.data.ShareImageUrl;
							}else{
								this.$toast.text("图片加载失败，请稍后重试");
							}
							
							resolve(res);
						})
						.catch(error=>{
							this.$toast.text("网络错误，请稍后再试");
						})
				})
			},
			// A+分享
			share() {
				const img = this.bigImg
				if(this.inApp){
					this.openShare(img)
				}
				// this.setShare()
			},

			openShare(img) {
				// window.callback = this.callback
				window.location.href = "centaline:" + this.shareParams(img);
			},

			// A+分享回调
			callback(item) {
				setTimeout(() => {
					this.title="早安 你好"
					this.setShare();
				}, 500)
				// window.callback = null
				// if (item=="wxImage"||item=="wxMomentsImage") {
				// 	setTimeout(() => {
				// 		this.title="早安 你好"
				// 		this.setShare();
				// 	}, 500)
				// }
			},

			setShare() {
				return new Promise((resolve) => {
					this.$axios({
							method: "get",
							url: "/MorningShare/Sign",
							headers: this.header_token,
						})
						.then(res => {
							console.log(res);
							resolve(res);
							if (res.data.code == 0) {
								this.info=res.data.data;
								this.arr=res.data.data.Progress;
								this.$toast.text("分享成功");
							}else{
								this.$toast.text("早安海报分享4点-8点开放");
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
					channel: ["wxImage", "wxMomentsImage"], //["wx","wxImage","wxMomentsImage","QQ"]
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
						width: 0;
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
						min-height: 0.6rem;
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
					&:hover,&:active{
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
		min-height: 11rem;
		position: relative;
		background: #fff url(../assets/img/pNone.png) center no-repeat;
		background-size: 4rem;
		padding: 0.3rem;
		overflow: hidden;
		animation: big ease 0.3s forwards;
		label {
			width: 0.6rem;
			height: 0.6rem;
			background: url(../../public/images/close.png) right top no-repeat;
			background-size: 0.46rem;
			position: absolute;
			right: 0.2rem;
			top: 0.2rem;
		}
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
	.success{
		width: 6rem;
		height: 6rem;
		background: url(../../public/images/za-suc.png) center top no-repeat;
		background-size: 5.34rem;
		text-align: center;
		padding-top: 5rem;
		font-size: 0.36rem;
		color: #fff;
		animation: big ease 0.3s forwards;
		label {
			width: 0.6rem;
			height: 0.6rem;
			background: url(../../public/images/close.png) right top no-repeat;
			background-size: 0.48rem;
			position: absolute;
			right: 0;
			top: 0;
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
