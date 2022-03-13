<template>
	<div class="payList" v-show="ready">
		<template v-if="active">
		<!-- 店董 -->
		<div class="payBox payMan" v-if="isManger">
			<nut-noticebar
			      left-icon="images/pay/p-tip.png"
						background="#F5E5E5"
			    v-if="judgeNum>0" @click="getList(2)">
				<a>您有{{judgeNum}}条租房佣金支付待审核<label class="pRight"></label></a>
			</nut-noticebar>
			<div class="payChild">
				<div class="topBar">
					<label :class="listIdx==0?'on':''" @click="getList(0)">全部</label>
					<label :class="listIdx==2?'on':''" @click="getList(2)">待审核</label>
					<label :class="listIdx==3?'on':''" @click="getList(3)">未支付</label>
					<label :class="listIdx==4?'on':''" @click="getList(4)">已支付</label>
					<label :class="listIdx==5?'on':''" @click="getList(5)">被拒绝</label>
				</div>
				<div class="content">
					<template v-if="list.length>0">
					<div class="list" v-for="item in list" :key="item.Id">
						<div class="title">
							<strong>{{item.OrderName}}</strong>
						</div>
						<i class="status">{{item.PayStatus | status}}</i>
						<p><label>订单时间:</label><span>{{item.UpdateTime}}</span></p>
						<p><label>订单编号:</label><span>{{item.OrderNo}}</span></p>
						<p><label>付款角色:</label><span>{{item.CustomerType | cType}}</span></p>
						<p><label>{{item.CustomerType | cType}}姓名:</label><span>{{item.CustomerName}}</span></p>
						<p><label>{{item.CustomerType | cType}}手机号:</label><span>{{item.CustomerMobile}}</span></p>
						<p><label>付款金额:</label><span>{{item.TotalFee}}元</span></p>
						<p><label>入账分行:</label><span>{{item.Payee}}</span></p>
						<p v-if="item.EmpCnName"><label>经纪人姓名:</label><span>{{item.EmpCnName}}</span></p>
						<p v-if="item.CnPath"><label>经纪人门店:</label><span>{{item.CnPath}}</span></p>
						<p v-if="item.PayTime"><label>支付时间:</label><span>{{item.PayTime}}</span></p>
						<div class="btn" v-if="item.PayStatus==2">
							<button @click="judgeStatus(item.Id,3)">审核通过</button>
							<button @click="judgeStatus(item.Id,5)">拒绝通过</button>
							<button @click="goInfo(item.Id)">查看详情</button>
						</div>
						<div class="btn" v-else>
							<button @click="goInfo(item.Id)">查看详情</button>
						</div>
					</div>
					</template>
					<div class="dnone" v-else>
						暂时没有该租房佣金线上支付单
					</div>
					
				</div>
			</div>
		</div>
		<!-- 经纪人 -->
		<div class="payBox" v-else>
			<div class="top" @click="goSend" v-if="ready">
				发起租房佣金支付
				<label>点击发起</label>
			</div>
			<div class="content">
				<template v-if="list.length>0">
					<div class="list" v-for="item in list" :key="item.Id">
						<div class="title">
							<strong>{{item.OrderName}}</strong>
						</div>
						<i class="status">{{item.PayStatus | status}}</i>
						<p><label>订单时间:</label><span>{{item.UpdateTime}}</span></p>
						<p><label>订单编号:</label><span>{{item.OrderNo}}</span></p>
						<p><label>付款角色:</label><span>{{item.CustomerType | cType}}</span></p>
						<p><label>{{item.CustomerType | cType}}姓名:</label><span>{{item.CustomerName}}</span></p>
						<p><label>{{item.CustomerType | cType}}手机号:</label><span>{{item.CustomerMobile}}</span></p>
						<p><label>付款金额:</label><span>{{item.TotalFee}}元</span></p>
						<p><label>入账分行:</label><span>{{item.Payee}}</span></p>
						<p v-if="item.ReviewCnName"><label>审核人:</label><span>{{item.ReviewCnName}}</span></p>
						<p v-if="item.PayTime"><label>支付时间:</label><span>{{item.PayTime}}</span></p>
							<div class="btn" v-if="item.PayStatus==1">
								<button @click="goInfo(item.Id)">查看详情</button>
								<button @click="changeSend(item.Id)">修改</button>
								<button @click="send(item.Id,2)">提交审核</button>
							</div>
							<div class="btn" v-else-if="item.PayStatus==2">
								<button @click="goInfo(item.Id)">查看详情</button>
								<button @click="send(item.Id,99)">撤销</button>
							</div>
							<div class="btn" v-else-if="item.PayStatus==5||item.PayStatus==99">
								<button @click="goInfo(item.Id)">查看详情</button>
								<button @click="changeSend(item.Id)">修改</button>
							</div>
							<div class="btn" v-else>
								<button @click="goInfo(item.Id)">查看详情</button>
							</div>
					</div>
				</template>
				<div class="jnone" v-else-if="ready">
					暂无线上租房佣金支付，<span style="color: #65ACFF;" @click="$router.push({name:'paySend'})">去创建</span>
				</div>
			</div>
		</div>
		<div class="goTop" @click="reload()">
			刷新
		</div>
		</template>
		<div class="anone" v-else>
			非常抱歉，您暂无该应用权限
		</div>
		
		<!-- 提示框 撤销 -->
		<nut-popup class="payTip" style="border-radius: 0.12rem;" v-model="showPay">
			<div class="myIntr" style="min-height: 4.3rem;height: 4.3rem;width: 6.2rem;">
				<div class="payTitle">
				</div>
				<div class="miTop">确定撤销订单吗？</div>
				<div class="miContent">
					<div class="miBtn mibPay">
						<label @click="showPay=false">取消</label>
						<label @click="changeStatus()">确定</label>
					</div>
				</div>
			</div>
		</nut-popup>
		<!-- 提示框 审核 -->
		<nut-popup class="payTip" style="border-radius: 0.12rem;" v-model="judge">
			<div class="myIntr" style="min-height: 4.3rem;height: 4.3rem;width: 6.2rem;">
				<div class="payTitle payTitle1">
				</div>
				<div class="miTop">确定审核通过吗？</div>
				<div class="miContent">
					<div class="miBtn mibPay">
						<label @click="judge=false">取消</label>
						<label @click="changeStatus()">确定</label>
					</div>
				</div>
			</div>
		</nut-popup>
		<!-- 提示框 拒绝 -->
		<nut-popup class="payTip" style="border-radius: 0.12rem;" v-model="reject">
			<div class="myIntr" style="min-height: 5.4rem;height: 5.4rem;width: 6.2rem;">
				<div class="payTitle">
				</div>
				<div class="miTop miText">拒绝理由</div>
				<div class="miContent">
					<div class="micM" style="display: block;">
						<nut-textbox :place-text="'请填写拒绝理由，30字以内'" v-model="rejectText" :txt-area-h="70" :max-num="30" text-bg-color="#F8F8F8"> </nut-textbox>
					</div>
					<div class="miBtn mibPay">
						<label @click="reject=false">取消</label>
						<label @click="changeStatus()">确定</label>
					</div>
				</div>
			</div>
		</nut-popup>
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
		name:"payList",
		data(){
			return{
				header_token:{"token": uToken()},
				publicPath: process.env.BASE_URL,
				iconImg:`${process.env.BASE_URL}images/pay/p-tip.png`,
				scrollTop:0,
				isManger:false,
				listIdx:0,
				showPay:false,
				judge:false,
				reject:false,
				rejectText:"",
				list:"",
				ready:false,
				listId:"",
				listStatus:"",
				judgeNum:0,
				active:false
			}
		},
		created() {
			this.loading=this.$toast.loading('加载中...',{ 
			    cover: false
			});
			// 获取token
			if(this.$route.query.token){
				var t=JSON.stringify({token:this.$route.query.token});
				localStorage.setItem("userInfo",t);
			}
			this.getList();
			// 全局绑定滚动事件，
			window.addEventListener("scroll", this.scrollT);
		},
		beforeDestroy() {
			// 组件消失，解绑scroll事件
			window.removeEventListener("scroll", this.scrollT);
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
			reload(){
				this.loading=this.$toast.loading('',{
				    cover: false
				});
				this.getList();
			},
			getList(idx){
				if(idx==undefined){
					idx=0;
				}
				if(!this.header_token.token){
					this.header_token={'token':this.$route.query.token}
				}
				this.listIdx=idx;
				return new Promise((resolve)=>{
						this.$axios({
							method:"post",
							url:"/RentHouse/GetRentHouseList",
							headers:this.header_token,
							data:{
								PayStatus:this.listIdx>0?this.listIdx:''
							}
						})
						.then(res=>{
							console.log(res);
							this.loading.hide();
							resolve(res);
							if(res.data.code==0){
								this.judgeNum=res.data.data.ReviewCount;
								this.isManger=res.data.data.isReview;
								this.list=res.data.data.list;
								this.active=res.data.data.isOpen
							}else{
								this.$toast.text(res.data.msg);
							}
							this.ready=true;
						})
						.catch(error=>{
							this.ready=true;
							this.loading.hide();
							this.$toast.text("网络错误，请稍后再试");
						})
				})
			},
			judgeStatus(id,status){
				this.listId=id;
				this.listStatus=status;
				if(status==3){
					this.judge=true;
				}else if(status==5){
					this.reject=true;
				}
			},
			changeSend(id){
				this.$router.push({name:'paySend',query:{id:id}})
			},
			send(id,status){
				this.listId=id;
				this.listStatus=status;
				if(status==99){
					this.showPay=true;
				}else if(status==2){
					this.changeStatus();
				}
			},
			changeStatus(){
				if(this.listStatus==5){
					if(this.rejectText==""){
						this.$toast.text("请填写拒绝理由");
						return;
					}
				}
				this.loading=this.$toast.loading('',{
				    cover: false
				});
				return new Promise((resolve)=>{
						this.$axios({
							method:"post",
							url:"/RentHouse/ChangePayStatus",
							headers:this.header_token,
							data:{
								"Id":this.listId,
								"PayStatus":this.listStatus,  //需要改变后成为的状态值 1: 待提交审核 2：已提交待店董或管理层审核 3：已审核待支付 4:已支付 5:已拒绝 99：已撤销
								"Remark":this.rejectText
							}
						})
						.then(res=>{
							console.log(res);
							this.loading.hide();
							resolve(res);
							if(res.data.code==0){
								this.$toast.success('操作成功！');
								this.getList();
								this.showPay=false;
								this.judge=false;
								this.reject=false;
								this.rejectText="";
							}else{
								this.$toast.text(res.data.msg);
							}
							this.ready=true;
						})
						.catch(error=>{
							this.ready=true;
							this.loading.hide();
							this.$toast.text("网络错误，请稍后再试");
						})
				})
			},
			goSend(){
				this.$router.push({name:'paySend',query:{'isMannger':this.isMannger?'1':'0'}})
			},
			goInfo(lid){
				this.$router.push({name:'payInfo',params:{id:lid}})
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
	.goTop{
		width: 0.9rem;
		height: 0.9rem;
		border-radius: 50%;
		background: #fff url("../images/reload.png") center 20% no-repeat;
		background-size: 0.26rem;
		padding-top: 0.48rem;
		text-align: center;
		font-size: 0.22rem;
		position: fixed;
		right: 0;
		bottom: 20%;
		box-shadow: 0px 0px 10px 1px rgba(221, 221, 221, 0.5);
		z-index: 9;
	}
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
		.top{
			width: 100%;
			height: 1.05rem;
			color:#EB2011;
			font-size: 0.32rem;
			line-height: 1.05rem;
			padding-left: 0.24rem;
			background: url("../images/pay/payBj.png") center no-repeat;
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
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
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
					padding: 0.12rem 0;
					font-size: 0.28rem;
					display: flex;
					width: 100%;
					color: #999;
					span{
						flex: 1;
						width: 4.7rem;
						text-align: left;
						word-break: break-all;
						word-wrap: break-word;
						color: #333;
					}
					label{
						color: #999;
						width: 1.68rem;
					}
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
			background: url(../images/pay/dd-none.png) center no-repeat;
			background-size: 6.4rem;
			text-align: center;
			height: 8rem;
			padding-top: 6rem;
			color: #BAB7B7;
		}
		.jnone{
			background: url(../images/pay/jjr-none.png) center no-repeat;
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
			background: url(../images/pay/p-right.png) center no-repeat;
			background-size: 100%;
			right: -2.8rem;
			top: 0.1rem;
		}
	}
	.anone{
		background: url(../images/pay/dd-none.png) center no-repeat;
		background-size: 6.4rem;
		text-align: center;
		height: 8rem;
		padding-top: 6rem;
		color: #BAB7B7;
	}
	.payTip{overflow: visible;border-radius: 0.2rem;}
	.payTitle{height: 1.52rem;width: 100%;background: url(../images/pay/mtBj.png) center no-repeat;background-size: 1.52rem;position: relative;top: -0.7rem;}
	.payTitle1{background: url(../images/pay/mtBj1.png) center no-repeat;background-size: 1.52rem;}
	.myIntr{width: 6.9rem;min-height: 6rem;background-color: #fff;border-radius: 0.2rem;}
	.myIntr h4{text-align: center;font-size: 0.36rem;color: #333;border: 0;font-weight: 550;}
	.miTop{height: 1.3rem;line-height: 1.3rem;text-align: center;font-size: 0.4rem;font-weight: 600;color: #fff;margin-top: -0.8rem;color: #333;font-size: 0.4rem;}
	.miContent{padding: 0 0.3rem 0.3rem;}
	.miContent textarea{width: 100%;height: 2rem;background-color: #eee;border: 1px solid #ddd;padding: 0.2rem;}
	.miBtn{margin-top: 0.6rem;text-align: center;margin-bottom: 0.4rem;}
	.miBtn label{display: inline-block;width: 3.7rem;height: 0.94rem;border-radius: 0.12rem;margin: 0 0.2rem;line-height: 0.9rem;font-size: 0.36rem;color: #666;border: 1px solid #666;}
	.miBtn label:last-child{background: #F42C1D;color: #fff;border: 0;}
	.mibPay{margin-top: 0.4rem;}
	.mibPay label{width: 2.4rem;}
	.micM{font-size: 0.36rem;line-height: 1.6;text-align: center;height: 1.8rem;}
	.miText{
		text-align: left;
		font-size: 0.3rem;
		color: #333;
		padding-left: 0.3rem;
		height: 0.8rem;
		line-height: 0.8rem;
	}
</style>
<style>
	.nut-textbox .txt-area textarea{
		padding: 0.1rem;
		color: #333;
		font-size: 0.26rem;
		font-weight: 500;
	}
</style>
