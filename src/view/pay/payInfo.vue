<template>
	<div class="payList">
		<div class="payBox">
			<div class="content">
				<!-- 经纪人 -->
				<div class="list" v-if="ready">
					<div class="title">
						<strong>{{list.OrderName}}</strong>
					</div>
					<p><label>订单编号：</label><span>{{list.OrderNo}}</span></p>
					<p><label>订单状态：</label><span>{{list.PayStatus | status}}</span></p>
					<p v-if="list.Remark"><label>拒绝理由：</label><span>{{list.Remark}}</span></p>
					<p><label>{{list.CustomerType | cType}}姓名：</label><span>{{list.CustomerName}}</span></p>
					<p><label>{{list.CustomerType | cType}}手机号：</label><span>{{list.CustomerMobile}}</span></p>
					<p><label>金额：</label><span>{{list.TotalFee}}元</span></p>
					<p v-if="list.FeeType==1"><label>费用类别：</label><span>佣金</span></p>
					<p v-if="list.Payee"><label>收款方：</label><span>中原地产代理（深圳）有限公司</span></p>
					<p v-if="list.PayType>0"><label>支付方式：</label><span v-if="list.PayType==1">微信支付</span><span v-else-if="list.PayType==2">支付宝支付</span></p>
					<p v-if="list.PayTime"><label>支付时间：</label><span>{{list.PayTime}}</span></p>
				</div>
				<!-- 店董 -->
<!-- 				<div class="list">
					<div class="title">
						<strong>华业玫瑰郡1栋B单元1805</strong>
					</div>
					<p><label>订单编号：</label><span>SZZF009090</span></p>
					<p><label>客户姓名：</label><span>孙大好</span></p>
					<p><label>客户手机号：</label><span>18679978179</span></p>
					<p><label>金额：</label><span>1500元</span></p>
					<p><label>费用类别：</label><span>佣金</span></p>
					<p><label>收款方：</label><span>中原地产代理（深圳）有限公司</span></p>
					<p><label>支付方式：</label><span>微信支付</span></p>
					<p><label>支付时间：</label><span>2021-08-10 15:21:23</span></p>
				</div> -->
			</div>
		</div>

	</div>
</template>

<script>
	import Vue from 'vue';
	import {
	  uToken,
	} from "@/global/token.js";
	// 京东框架2.X
	import nutUI from '@nutui/nutui/dist/nutui.min.js';  // 加载构建后的JS
	import '@nutui/nutui/dist/nutui.min.css';  //加载构建后的CSS
	nutUI.install(Vue);
	export default{
		name:"payInfo",
		data(){
			return{
				header_token:{"token": uToken()},
				scrollTop:0,
				ready:false,
				isMannger:false,
				listIdx:0,
				showPay:false,
				judge:false,
				reject:false,
				rejectText:"",
				list:"",
				listId:"",
			}
		},
		created() {
			this.loading=this.$toast.loading('',{
			    cover: false
			});
			// 全局绑定滚动事件，
			window.addEventListener("scroll", this.scrollT);
			this.getList();
		},
		filters:{
			status(v){
				let infoStatus="";
				if(v==1){
					infoStatus="待提交"
				}else if(v==2){
					infoStatus="待审核"
				}else if(v==3){
					infoStatus="待支付"
				}else if(v==4){
					infoStatus="已支付"
				}else if(v==5){
					infoStatus="被拒绝"
				}else if(v==99){
					infoStatus="已撤销"
				}
				return infoStatus;
			},
			cType(v){
				if(v==1){
					v='客户'
				}else{
					v='业主'
				}
				return v;
			}
		},
		beforeDestroy() {
			// 组件消失，解绑scroll事件
			window.removeEventListener("scroll", this.scrollT);
		},
		watch:{
			// scrollTop(newValue, oldValue) {//滚动分页
			// 	var height = document.getElementsByClassName('earnAll')[0].scrollHeight;
			// 	let sTop = document.documentElement && document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop;//滚动的高度
			// 	let clientHeight=window.screen.height;//屏幕的高度
			// 	if(this.count>this.pSize){
			// 		if(sTop>0){
			// 			if(height-100<sTop+clientHeight&&this.load){
			// 				  // console.log('监听成功','到达底部')
			// 				if(this.pSize<this.count){
			// 					this.pSize=Number(this.pSize)+10; 
			// 				}
			// 				setTimeout(()=>{
			// 					this.loadOver=true
			// 				},1000)
			// 			 }
			// 		 }
			// 	}else{
			// 		setTimeout(()=>{
			// 			this.loadOver=true
			// 		},1000)
			// 	}
			// },
		},
		methods:{
			getList(){
				return new Promise((resolve)=>{
						this.$axios({
							method:"post",
							url:"/RentHouse/GetOrderInfo",
							headers:this.header_token,
							data:{
								Id:this.$route.params.id
							}
						})
						.then(res=>{
							console.log(res);
							this.loading.hide();
							resolve(res);
							this.ready=true;
							if(res.data.code==0){
								this.list=res.data.data;
							}else{
								this.$toast.text(res.data.msg);
							}
						})
						.catch(error=>{
							this.loading.hide();
							this.$toast.text("网络错误，请稍后再试");
						})
				})
			},
			scrollT(){
				this.scrollTop = window.scrollY;
			},
			// 回到顶部
			goTop(){
				window.scrollTo({
					top:0,
					behavior:"smooth"
				});
			},
		}
	}
</script>

<style lang="less" scoped>
	@color:#F42C1D;
	@border:1px solid #E5E5E5;
	.payBox{
		min-height: 100vh;
		padding: 0.2rem 0.3rem 0.5rem;
		background: #F7F7F7;
		.payChild{
			padding: 0.33rem 0.3rem 0.5rem;
			.topBar{
				display: flex;
				margin-bottom: 0.33rem;
				justify-content: space-between;
				label{
					text-align: center;
					height: 0.54rem;
					display: inline-block;
					background-color: #fff;
					line-height: 0.54rem;
					border-radius: 0.27rem;
					color: #333;
					width: 1.28rem;
					&:first-child{
						width: 1rem;
					}
					&.on{
						background-color: #F7E7E5;
						color: @color;
						border: 1px solid #EF5151;
						line-height: 0.5rem;
					}
				}
			}
		}
		.goTop{
			width: 0.9rem;
			height: 0.9rem;
			border-radius: 50%;
			background: #fff url("~@/assets/img/t-top.png") center 23% no-repeat;
			background-size: 0.3rem;
			padding-top: 0.45rem;
			text-align: center;
			font-size: 0.24rem;
			position: fixed;
			right: 0;
			bottom: 20%;
			box-shadow: 0px 0px 10px 1px rgba(221, 221, 221, 0.5);
			z-index: 9;
		}
		.top{
			width: 100%;
			height: 1.05rem;
			color:#EB2011;
			font-size: 0.32rem;
			line-height: 1.05rem;
			padding-left: 0.24rem;
			background: url("/images/pay/payBj.png") center no-repeat;
			background-size: 100%;
			border-radius: 0.08rem;
			margin-bottom: 0.3rem;
			padding-left: 1rem;
			position: relative;
			label{
				width: 1.32rem;
				height: 0.48rem;
				border-radius: 0.24rem;
				background: linear-gradient(270deg, #F9DACF 0%, #FFF2E0 100%);
				box-shadow: 0px 0px 5px 1px #E99F9A;
				display: block;
				position: absolute;
				right: 0.36rem;
				top: 0.3rem;
				text-align: center;
				line-height: 0.44rem;
				font-size: 0.24rem;
			}
		}
		.content{
			.list{
				font-size: 0.28rem;
				color: #333;
				padding: 0 0.26rem 0.37rem;
				position: relative;
				background-color: #fff;
				margin-bottom: 0.28rem;
				border-radius: 0.12rem;
				.title{
					height: 1.1rem;
					line-height: 1.1rem;
					display: flex;
					border-bottom: @border;
					margin-bottom: 0.2rem;
					strong{
						font-size: 0.36rem;
						flex: 1;
					}
					a{
						flex: 1;
						font-size: 0.28rem;
						color: #65ACFF;
						text-align: right;
						padding-left: 0.4rem;
						background: url("~@/assets/img/t-question.png") 62% 53% no-repeat;
						background-size: 0.28rem;
					}
				}
				&:last-child{
					border: 0;
				}
				i.status{
					font-style: normal;
					font-size: 0.3rem;
					color: #EF5151;
					position: absolute;
					right: 0.26rem;
					top: 1.38rem;
				}
				p{
					padding: 0.1rem 0;
					font-size: 0.28rem;
					display: flex;
					align-items: baseline;
					justify-content: space-between;
					span{
						line-height: 0.4rem;
						font-weight: 500;
					}
				}
				label{
					color: #999;
					line-height: 0.4rem;
					white-space: nowrap;
				}
				.btn {
					margin-top: 0.2rem;
					padding-top: 0.3rem;
					border-top: @border;
					text-align: right;
					button{
						background: none;
						border-radius: 0.34rem;
						height: 0.66rem;
						line-height: 0.62rem;
						padding: 0 0.3rem;
						margin-left: 0.4rem;
						border: 1px solid #F97F7F;
						font-size: 0.3rem;
						color: @color;
						&:first-child{
							margin-left: 0;
						}
						&.send{
							color: @color;
							border-color: #FEA099;
						}
					}
				}
			}
		}
		.dnone{
			background: url(/images/pay/dd-none.png) center no-repeat;
			background-size: 6.4rem;
			text-align: center;
			height: 8rem;
			padding-top: 6rem;
			color: #BAB7B7;
		}
		.jnone{
			background: url(/images/pay/jjr-none.png) center no-repeat;
			background-size: 6.4rem;
			text-align: center;
			height: 8rem;
			padding-top: 6rem;
			color: #BAB7B7;
		}
		
	}
	.payMan{
		padding: 0;
		.nut-noticebar{
			position: relative;
			a{
				color: #F42C1D;
			}
		}
		.pRight{
			position: absolute;
			display: block;
			width: 0.15rem;
			height: 0.28rem;
			background: url(/images/pay/p-right.png) center no-repeat;
			background-size: 100%;
			right: -2.8rem;
			top: 0.1rem;
		}
	}
</style>
