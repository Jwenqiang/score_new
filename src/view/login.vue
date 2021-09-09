<template>
	<div class="loginForm all">
		<div class="logo"></div>
<!-- 		<img src="../assets/img/login-p.png" width="100%" height="100%" class="imgbj plus"/>
		<img src="../assets/img/login-x.png" width="100%" height="100%" class="imgbj x"/> -->
		<div class="loginBox">
			<!-- <video muted="" loop="" autoplay="autoplay" class="video"><source src="../assets/sz.mp4" type="video/mp4"></video> -->
			<!-- <div class="logoT"></div> -->
			<div class="form">
				<div class="f-input">
					<div class="fiList">
						<mt-field v-model="username" placeholder="请输入您的工号"></mt-field>
						<label><img src="../assets/img/icon-user.png" style="width: 0.32rem;"/> </label>
					</div>
					<div class="fiList">
						<mt-field type="password" v-model="pwd" placeholder="请输入您A+账号的密码" @keydown.enter.native="ulogin"></mt-field>
						<label><img src="../assets/img/icon-psd.png" style="width: 0.32rem;"/> </label>
					</div>
					
				</div>
				<mt-button :disabled="processing" type="primary" class="sub topSub" @click="ulogin">{{btnLoginText}}</mt-button>
			</div>
		</div>
	</div>
</template>

<script>
	import {mapState, mapMutations, mapActions, mapGetters} from 'vuex'
	import { Toast,Indicator } from 'mint-ui';
	export default{
		name: 'login',
		data(){
			return{
				username:"",
				pwd:"",
				processing:false,
			}
		},
		created() {
			document.title="登录";
		},
		computed: {
			btnLoginText() {
			  return this.processing ? "正在处理,请稍候..." : "登录";
			},
			...mapState(['hasLogin','userInfo'])//判断是否已经登录
		},
		methods:{
			...mapActions(['isLogin','login']),//vuex里面的Action方法名  可以用this.xx直接调用
			// 通过action登录
			ulogin(){
				// 神策新增自定义事件
				this.$sensors.track('click_registration_login', {
					type:"登录",
					registration_login_way:"A+"
				});
				if(this.username==""){
					Toast("请输入您的工号");
					return;
				}else if(this.pwd==""){
					Toast("请输入您的密码");
					return;
				}
				this.processing=true;
				var userMsg={
					 "UserName": this.username,
					  "UserPwd": this.pwd
				}
				return new Promise((resolve)=>{
						this.$axios({
							method:"post",
							url:"/Auth/Login",
							data:userMsg
						})
						.then(res=>{
							resolve(res);
							if(res.data.code==0){
								if(res.data.data.Token==''){
									Toast(res.data.data.Remark);
									// 神策新增自定义事件
									this.$sensors.track('registration_login_result', {
										type:"登录",
										registration_login_way:"A+",
										is_success:false,
										failure_reason:res.data.data.Remark
									});
								}else{//登录成功
									var storage={
										token:res.data.data.Token,
										date:res.data.data.ExpireTime
									}
									this.login(storage);//等价于this.$store.dispatch('login',storage);
									if(sessionStorage.getItem('toName')){
										const urlName=sessionStorage.getItem('toName');
										setTimeout(()=>{
											window.location.href=urlName;
											sessionStorage.removeItem('toName');
										},100)
									}else{
										setTimeout(()=>{
											this.$router.push({name:'home'})
										},100)
									}
									
									// 神策新增自定义事件
									this.$sensors.track('login_result', {
										type:"登录",
										registration_login_way:"A+",
										is_success:true,
										failure_reason:""
									});
									this.$sensors.login(res.data.data.Token);
								}
							}else{
								Toast(res.data.message);
							}
							this.processing=false;
						})
						.catch(error=>{
							this.processing=false;
							Toast("网络错误，请稍后再试");
						})
				})
				// var user={name:'test',pwd:"123456"}
				// this.$store.dispatch('login',user);
			}
		}
	}
</script>

<style>
	@import '~@/assets/css/main.css';
	.logo{height: 0.7rem;width: 100%;background: url(../assets/img/logo.png) center no-repeat;background-size: 2.44rem;position: absolute;bottom:40px;}
	.loginForm img.imgbj{
		position: absolute;left: 0;top: 0;z-index: 0;
/* 			animation: dh 5s infinite ease;
			animation-direction: alternate; */
	}
	.loginForm{
		position: relative;
		height: 100%;
		height: 100vh;
		width: 7.5rem;
		overflow: hidden;
		background: #679bda url(../assets/img/login-p.png) top center no-repeat;
		background-size: 7.5rem;
	}
	.loginBox{z-index: 3;position: relative;height: 100%;}
	.loginForm .mint-cell,.loginForm .f-input input{background: none;color: #333;height: 0.8rem;}
	.loginForm .mint-field-clear{opacity: 0.8;}
	button.sub{width: 5.52rem;border-radius: 0.46rem;}
	@keyframes dh{
	0% {
	    transform: scale(1);
	}
	100% {
	    transform: scale(1.12);
	}
	}
	.loginForm .fiList{position: relative;background: url(../assets/img/input-bj.png) center no-repeat;background-size: 100%;}
	.loginForm .fiList label{position: absolute;right: 0.4rem;top: 0.2rem;}
/* 	video{
		height: 100%;
		 position: absolute;
		 left: 0;
		 top: 0;
	} */
	@media screen and (min-device-height : 812px){
		.loginForm{
			background: #679bda url(../assets/img/login-x.png) top center no-repeat;
			background-size: 7.5rem;
		}
		.loginForm .form{margin-top: 200px;}
	}
</style>
