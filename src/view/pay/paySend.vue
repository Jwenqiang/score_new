<template>
	<div class="paySend">
		<div class="payForm">
			<ul>
				<li>
					<label>付款人类型</label>
					<span>
						<nut-radiogroup v-model="userType" class="my-radio">
						  <nut-radio label="1">客户</nut-radio>
						  <nut-radio label="2">业主</nut-radio>
						</nut-radiogroup>
					</span>
				</li>
				<li>
					<label>付款人姓名</label>
					<span>
						<nut-textinput 
						    v-model="userName"
						    placeholder="请填写付款人姓名"
								maxlength="10"
						    :clearBtn="false"
						    :disabled="false"
						/>
					</span>
				</li>
				<li>
					<label>付款人手机号</label>
					<span>
						<nut-textinput 
						    v-model="mobile"
								type="number"
						    placeholder="请填写付款人手机号"
								maxlength="11"
						    :clearBtn="false"
						    :disabled="false"
						/>
					</span>
				</li>
				<li>
					<label>付款备注</label>
					<span style="width: 5.5rem;">
						<nut-textinput 
						    v-model="msg"
						    placeholder="请填写:xx小区xx单元xx号_房屋租赁合同"
								maxlength="30"
						    :clearBtn="false"
						    :disabled="false"
						/>
					</span>
				</li>
				<li>
					<label>付款金额（元）</label>
					<span>
						<nut-textinput 
						    v-model="money"
						    placeholder="请填写付款人应付的佣金金额"
						    :clearBtn="false"
						    :disabled="false"
						/>
					</span>
				</li>
			</ul>
		</div>
		<div class="payTip">
			<p>注意：</p>
			<p>1、客户/业主手机号须为有效手机号，将作为登录中原找房
			App的手机号；</p>
			<p>2、客户/业主姓名需与租房合同的姓名保持一致；</p>
			<p>3、付款备注请填写合同名称，方便客户/业主在支付时核实信息；</p>
			<p>4、佣金金额以客户/业主实际需要支付的金额为准。</p>
		</div>
		<div class="sendBtn">
			<button @click="sendInfo">保存</button>
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
		name:"paySend",
		data(){
			return{
				header_token:{"token": uToken()},
				userType:'1',
				userName:"",
				mobile:"",
				money:"",
				msg:""
			}
		},
		created() {
			if(this.$route.query.id){
				this.getList();
			}
		},
		beforeDestroy() {
		},
		watch:{
		},
		methods:{
			getList(){
				this.loading=this.$toast.loading('',{
				    cover: false
				});
				return new Promise((resolve)=>{
						this.$axios({
							method:"post",
							url:"/RentHouse/GetOrderInfo",
							headers:this.header_token,
							data:{
								Id:this.$route.query.id
							}
						})
						.then(res=>{
							console.log(res);
							this.loading.hide();
							resolve(res);
							if(res.data.code==0){
								this.userType=res.data.data.CustomerType.toString(),
								this.userName=res.data.data.CustomerName,
								this.mobile=res.data.data.CustomerMobile,
								this.money=res.data.data.TotalFee,
								this.msg=res.data.data.OrderName
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
			sendInfo(){
				if(this.userName==""){
					this.$toast.text('请填写付款人姓名');
					return;
				}else if(this.mobile==""){
					this.$toast.text('请填写付款人手机号');
					return;
				}else if(!(/^1[3456789]\d{9}$/.test(this.mobile))){
					this.$toast.text('您填写的手机号有误');
					return;
				}else if(this.msg==""){
					this.$toast.text('请填写付款备注');
					return;
				}else if(this.money==""){
					this.$toast.text('请填写付款金额');
					return;
				}
				this.loading=this.$toast.loading('',{
				    cover: false
				});
				return new Promise((resolve)=>{
						this.$axios({
							method:"post",
							url:this.$route.query.id?"/RentHouse/UpdateRentHouse":"/RentHouse/AddRentHouse",
							headers:this.header_token,
							data:{
								"Id":this.$route.query.id||"",
								"CustomerType": Number(this.userType),
								"CustomerName": this.userName,
								"CustomerMobile": this.mobile,
								"TotalFee": this.money,
								"OrderName":this.msg
							}
						})
						.then(res=>{
							console.log(res);
							this.loading.hide();
							resolve(res);
							if(res.data.code==0){
								this.$toast.success('保存成功！');
								setTimeout(()=>{
									window.history.go(-1);
								},1000)
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
		}
	}
</script>

<style lang="less" scoped>
	@color:#F42C1D;
	@border:1px solid #E5E5E5;
	.paySend{
		background-color: #F7F7F7;
		min-height: 100vh;
		padding: 0.2rem 0 0.4rem;
		.payForm{
			padding: 0 0.32rem;
			background-color: #fff;
			li{
				display: flex;
				width: 100%;
				padding: 0.18rem 0;
				justify-content: space-between;
				align-items: center;
				height: 1rem;
				border-bottom: @border;
				font-size: 0.3rem;
				color: #333;
				&:last-child{
					border: 0;
				}
				span{
					max-width: 5.6rem;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}
			}
		}
		.payTip{
			padding:0.32rem;
			color: #B6B6B6;
			font-size: 0.26rem;
			p{
				margin-bottom: 0.18rem;
			}
		}
		.sendBtn{
			margin-top: 1.8rem;
			padding: 0 0.6rem;
			button{
				width: 100%;
				height: 1rem;
				background-color: @color;
				text-align: center;
				line-height: 1rem;
				color: #fff;
				font-size: 0.32rem;
				border-radius: 0.08rem;
			}
		}
	}
</style>
<style>
	.paySend .nut-textinput input{
		border: 0;
		text-align: right;
		padding-right: 0 !important;
	}
	.paySend .nut-radio{
		line-height: 0.4rem;
		margin-left: 0.5rem;
		margin-right: 0;
	}
</style>
