<template>
	<div class="user">
		<div class="top">
			<img src="../assets/img/banSearch.jpg" width="100%" />
		</div>
		<div class="sContent">
			<div class="rmTitle">添加客户信息</div>
			<div class="scInput">
				<input type="text" placeholder="请输入客户姓名" v-model="uName"/>
			</div>
			<div class="scInput">
				<input type="tel" placeholder="请输入客户手机号码" v-model="uPhone"/>
			</div>
			<div class="scInput" @click="openQuestionType">
				<input type="text" readonly placeholder="请选择礼品类型" v-model="questionType" id="catory"/>
			</div>
			<div class="iStatus">
				<a @click="addMsg" class="button">确定添加</a>
			</div>
			<div class="title" style="margin-bottom: 0.2rem;font-size: 0.42rem;" v-if="list.length>0">您已成功添加{{list.length}}位客户</div>
			<div class="block" :class="showMore?'houseHalf':''" v-if="list.length>0">
				<div class="zList clear" v-for="item in list">
					<p class="clear">
						<label>{{item.UserName}}&nbsp;{{item.UserMobile}}</label>
						<span>{{item.UserDiscountName}}</span>
					</p>
					<p class="clear" style="color: #999;font-size: 0.24rem;margin-top: 0.2rem;"><label>添加时间：{{item.CreateTimeDisplay}}</label></p>
				</div>
			</div>
			<div class="readMore" @click="lookMore" style="text-align: center;width: 100%;height: 1rem; padding-top: 0.2rem;background: #fff;" v-if="list.length>5">
				<img src="../assets/img/down.png" width="14px" v-if="showMore==false"/>
				<img src="../assets/img/up.png" width="14px" v-else/>
			</div>
			<div class="fTip">
				<div class="rmTitle">注意事项</div>
				<p>1.输入客户姓名、手机号码和客户所选礼品类型，点击“确认添加”按钮，即可帮客户申领礼品；</p>
				<p>2.点击“确认添加”按钮后，如弹窗提示“提交成功”则说明客户具备领取资格并已成功为客户提交领取申请；如弹窗提示“提交失败”则说明客户不具备领取资格，无法申领礼品；</p>
				<p>3.提交后信息不可更改，请确保填写信息准确无误；</p>
				<p>4.礼品代金券将在提交申请后7个工作日内已短信形式发送至客户手机上。</p>
			</div>
			<mt-popup v-model="popupVisible" popup-transition="popup-fade" closeOnClickModal="true" position="bottom">
				<mt-picker :slots="popupSlots" @change="onValuesChange"  showToolbar>
				  <div class="picker-toolbar-title">
					<div class="usi-btn-cancel" @click="popupVisible = !popupVisible">取消</div>
					<div class="">请选择礼品类型</div>
					<div class="usi-btn-sure" @click="popupOk()">确定</div>
				  </div>
				</mt-picker>
			</mt-popup>
		</div>
		<div class="show" :class="showSuc?'showM':''" v-if="showSuc">
			<div class="bj" @click="showSuc=false"></div>
			<div class="showMsgs zgSuc" @click="showSuc=false">
				
			</div>
		</div>
	</div>
</template>

<script>
	import { Toast,Indicator } from 'mint-ui';
	import {
	  uToken,
	} from "@/global/token.js";
	export default{
		name: 'user',
		data(){
			return{
				header_token:{"token": uToken()},
				id:"",
				uPhone:"",
				uName:"",
				friendsNum:0,
				showMore:false,
				present:"",
				questionType:'',//当前问题类型
				  questionTypeVal:'',//当前问题类型-改变后的
				  popupVisible:false,//问题类型弹框
				  popupSlots:[//问题类型弹框数据
					{
					  values:[
						'星巴克30元代金券一张','奈雪30元代金券一张','百果园30元代金券一张'
					  ]
					}
				  ],
				  showSuc:false,
				  list:""
			}
		},
		mounted(){
			Indicator.open();
			this.id=this.$route.params.id
			setTimeout(()=>{
				this.getList();
				Indicator.close();
			},500)
		},
		methods:{
			getList(){
				Indicator.open();
				return new Promise((resolve)=>{
						this.$axios({
							method:"get",
							url:"/Activity/GetUserGiftByEmpNo",
							headers:this.header_token,
							params:{
								pageIndex:1,
								pageSize:100
							} 
						})
						.then(res=>{
							console.log(res);
							resolve(res);
							if(res.data.code==0){
								this.list=res.data.data.DataList
							}else{
								Toast(res.data.msg);
							}
							Indicator.close();
						})
						.catch(error=>{
							Indicator.close();
							Toast("网络错误，请稍后再试");
						})
				})
			},
			addMsg(){
				Indicator.open();
				return new Promise((resolve)=>{
						this.$axios({
							method:"post",
							url:"/Activity/CreateUserGift",
							headers:this.header_token,
							data:{
								Name:this.uName,
								UserPhone:this.uPhone,
								UserDiscountName:this.questionType
							} 
						})
						.then(res=>{
							console.log(res);
							resolve(res);
							if(res.data.IsSuccess){
								this.showSuc=true;
								this.getList();
							}else{
								Toast(res.data.Msg);
							}
							Indicator.close();
						})
						.catch(error=>{
							Indicator.close();
							Toast("网络错误，请稍后再试");
						})
				})
			},
			openQuestionType(){
			      this.popupVisible = true;
			    },
			    // 问题类型弹框点击确认
			    popupOk(){
			      this.questionType = this.questionTypeVal;
			      this.popupVisible = false;
			    },
			    //问题类型的弹框picker值发生改变
			    onValuesChange(picker, values){
			      this.questionTypeVal = values[0];
			    },
			lookMore(){
				this.showMore=!this.showMore;
			},
		}
	}
</script>

<style>
	.user{ background: #D42727;}
	.rmC{padding: 0 0.25rem;text-align: center;color: #fff;}
	.rmTitle{text-align: center;color: #fff;background: url(~@/assets/img/mtBj.png) center no-repeat;background-size: 3.61rem;height: 0.97rem;line-height: 0.9rem;font-size: 0.36rem;margin-bottom: 0.36rem;}
	.fMobile{margin-bottom: 0.76rem;}
	.rmAddr{padding: 0.3rem;background-color: #C82626;box-shadow: 0 0 5px #931D1D;border-radius: 0.1rem;text-align: left;}
	.rmAddr p{line-height: 1.8;}
	.fAddr{margin-bottom: 1.07rem;}
	.fTip{padding: 0 0.1rem;margin-top: 0.6rem;}
	.fTip p{text-align: left;color: #F8D0D0;font-size: 0.22rem;margin-bottom: 0.2rem;}
	.ohide{height: 100vh;overflow: hidden;}
	.sContent{padding: 0.3rem;}
	.scInput{text-align: center;}
	.scInput input{font-size: 0.28rem;margin-bottom: 0.4rem;width: 5.7rem;height: 0.8rem;line-height: 0.8rem;border-radius: 0.4rem;color: #000;background-color: #FCE9D8;padding-left: 0.4rem;border: 1px solid #C82626;box-shadow: 0 -1px 5px #901B1B;}
	input::-webkit-input-placeholder { /* WebKit browsers */
		color: #666; 
	} 
	.iStatus {
	    text-align: center;
	    margin-top: 0.2rem;
	    margin-bottom: 0.52rem;
	}
	.iStatus a.button{
		background: url(~@/assets/img/btnBj.png) center no-repeat;
		background-size: 100%;
		line-height: 0.95rem;
		color: #fff;
		font-size: 0.46rem;
		display: inline-block;
		text-align: center;
		width: 5.86rem;
		height: 1.14rem;
		border: 0;
	}
	.title {
	    width: 6.94rem;
	    height: 1.1rem;
	    line-height: 1.24rem;
	    text-align: center;
	    font-size: 0.5rem;
	    margin: 0 auto;
	    color: #fff;
	    background: url(~@/assets/img/titleBj.png) center no-repeat;
	    background-size: 100%;
	}
	.block {
	    background-color: #fdf7f1;
	    font-family: "微软雅黑";
	    padding: 0.2rem;
	    transition: all 0.5s ease-out;
	    max-height: 5.8rem;
	    overflow-y: hidden;
		border-radius: 0.1rem;
	}
	.zList {
	    padding: 0.18rem;
	    color: #333;
	    border-bottom: 1px solid #ddd;
	}
	.block .zList:last-child {
	    border: 0;
	}
	.houseHalf{max-height: 100%;overflow: hidden;}
	.zList label {
	    float: left;
	}
	.zList span {
	    float: right;
	}
	
	.mint-popup{
		width: 100%;
	}
	/**问题类型弹框样式 */
	.picker-toolbar-title {
	  display: flex;
	  flex-direction: row;
	  justify-content: space-around;
	  align-items: center;
	  background-color: #eee;
	  height: 44px;
	  line-height: 44px;
	  font-size: 16px;
	  .usi-btn-cancel,.usi-btn-sure{
	      color:#26a2ff;
	      font-size: 16px;
	  }
	}
	#catory{
		background: #FCE9D8 url(~@/assets/img/down.png) 90% center no-repeat;background-size: 0.2rem;
	}
	.showMsgs{position: absolute;left: 50%;top: 40%;transform: translate(-50%,-50%);height: 8.4rem;padding: 5.2rem 0.3rem 0;text-align: center;}
	.show{position: fixed;left: 0;top: 0;width: 100%;height: 100%;z-index: 996;opacity: 0;}
	.show .bj{background-color: #000;opacity: 0.75;width: 100%;height: 100%;z-index: 997;}
	.showM{opacity: 1;}
	.zgSuc{width: 5.01rem;height: 6.79rem;background: url(../assets/img/m-tj.png) center no-repeat;background-size: 100%;top: 46%;padding-top: 2.8rem; }
</style>
