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
				<li>
					<!-- @input="getCompay()" -->
					<label>入账分行</label>
					<span style="width: 4rem;">
						<nut-textinput 
						    v-model="company"
						    placeholder="请输入并选择相应入账分行"
						    :clearBtn="false"
								@input="getCompay()"
						/>
					</span>
				</li>
			</ul>
			<div class="companyList" v-show="showSelect">
				<div class="b-mask"></div>
				<ul>
					<template v-if="comList.length>0">
						<li v-for="item in comList" :key="item.MchId" @click="setCv(item.MchId,item.MchName)">{{item.MchName}}</li>
					</template>
					<li style="height:1.2rem;color: #999;line-height: 0.8rem;font-size: 0.24rem;" v-else>暂无匹配分行数据，请换关键词试试</li>
					
				</ul>
			</div>
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
<!-- 		<nut-picker
		  :is-visible="showSelect"
		  :list-data="comList"
		  title="请选择入账的分行名称"
		  @close="closeSwitch('showSelect')"
		  @confirm="confirm"
			v-if="comList"
		></nut-picker> -->
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
	var lastInput = null;
	export default{
		name:"paySend",
		data(){
			return{
				header_token:{"token": uToken()},
				userType:'1',
				userName:"",
				mobile:"",
				money:"",
				msg:"",
				comList:[],
				company:"",
				companyId:"",
				showSelect:false,

			}
		},
		created() {
			if(this.$route.query.id){
				this.getList();
			}
			// this.getCompay();
		},
		beforeDestroy() {
		},
		methods:{
		 // openSwitch(param) {
			// 	this[`${param}`] = true;
			// },
			// closeSwitch(param) {
			// 	this[`${param}`] = false;
			// },
			// confirm(chooseData) {
			// 	this.company = `${chooseData[0].value}`;
			// 	this.companyId = `${chooseData[0].label}`;
			// },
			setCv(id,val){
				this.company=val;
				this.companyId=id;
				this.showSelect=false;
			},
			getCompay(){
				clearTimeout(lastInput);
				lastInput=setTimeout(()=>{
					return new Promise((resolve)=>{
							this.$axios({
								method:"post",
								url:"/RentHouse/GetPayMchConfig",
								headers:this.header_token,
								data:{
									name:this.company
								}
							})
							.then(res=>{
								console.log(res);
								resolve(res);
								if(res.data.code==0){
									if(res.data.data&&res.data.data.length>0){
										// let arr =	a.map((v)=>{
										// 	let obj={};
										// 	obj.label=v.MchId;
										// 	obj.value=v.MchName;
										// 	return obj;
										// })
										// this.comList=[arr];
										this.comList=res.data.data;
									}else{
										this.comList=[];
									}
									this.showSelect=true;
								}else{
									this.$toast.text(res.data.msg);
								}
							})
							.catch(error=>{
								this.$toast.text("服务器繁忙，请稍后再试");
							})
					})
				},500)
			},
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
								this.msg=res.data.data.OrderName,
								this.company=res.data.data.Payee;
								this.companyId=res.data.data.MchId;
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
				}else if(this.money<=0){
					this.$toast.text('请输入大于0的金额');
					return;
				}else if(this.companyId==""){
					this.$toast.text('请输入并选择相应入账分行');
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
								"OrderName":this.msg,
								"MchId":this.companyId
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
			position: relative;
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
				position: relative;
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
			.companyList{
				position: absolute;
				top: 6rem;
				height: 6rem;
				height: calc(100vh - 6rem);
				left: 0;
				width: 100%;
				border-top: 1px solid #eee;
				.b-mask{
					position: absolute;
					width: 100%;
					height: 100%;
					background-color: #000;
					opacity: 0.6;
					left: 0;
					top: 0;
				}
				ul{
					position: absolute;
					left: 0;
					top: 0;
					width: 100%;
					max-height: 4.4rem;
					overflow-y: auto;
					background-color: #FDFDFD;
					padding: 0 0.32rem;
					li{
						display: block;
						height: 0.8rem;
						border-bottom: 1px solid #eee;
						color: #666;
						text-align: center;
						font-size: 0.26rem;
					}
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
			margin-top: 1.4rem;
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
		/deep/.nut-textinput-disabled{
			input{
				background: none;
				color: #333;
			}
		}
		/deep/.nut-textinput{
			input{
				border: 0;
				text-align: right;
				padding-right: 0 !important;
				font-size: 0.28rem;
			}
		} 
		/deep/.nut-radio{
			line-height: 0.4rem;
			margin-left: 0.5rem;
			margin-right: 0;
		}
		
	}
</style>

