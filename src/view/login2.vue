<template>
	<div class="loginForm all">
		<img src="../assets/img/login_bj.png" width="100%" height="100%" class="imgbj"/>
		<div class="loginBox">
			<div class="logoT"></div>
			<div class="form">
				<div class="f-input">
					<div class="fiList">
						<label><img src="../assets/img/l-u.png" style="width: 0.36rem;"/> </label>
						<mt-field v-model="username" placeholder="请输入您的工号"></mt-field>
					</div>
					<div class="fiList">
						<label><img src="../assets/img/l-p.png" style="width: 0.36rem;"/> </label>
						<mt-field type="password" v-model="pwd" placeholder="请输入您A+账号的密码" @keydown.enter.native="ulogin"></mt-field>
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
				console.log(window.event.keyCode);
				console.log(this.login)
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
							console.log(res);
							resolve(res);
							if(res.data.code==0){
								if(res.data.data.Token==''){
									Toast(res.data.data.Remark);
								}else{//登录成功
									var storage={
										token:res.data.data.Token,
										date:res.data.data.ExpireTime
									}
									this.login(storage);//等价于this.$store.dispatch('login',storage);
									setTimeout(()=>{
										this.$router.push({name:'home'})
									},100)
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
	input{
	    caret-color:#666;
	}
	img.imgbj{
		position: absolute;left: 0;top: 0;z-index: 0;
			animation: dh 5s infinite ease;
			animation-direction: alternate;
	}
	.loginForm{
		position: relative;
		height: 100%;
		height: 100vh;
		width: 7.5rem;
		overflow: hidden;
	}
	.loginBox{z-index: 3;position: relative;height: 100%;}
	.mint-cell,.f-input input{background: none;color: #333;}
	.mint-field-clear{color: #eee;opacity: 0.8;}
	button.sub{width: 5.52rem;border-radius: 0.46rem;}
	@keyframes dh{
	0% {
	    transform: scale(1);
	}
	100% {
	    transform: scale(1.12);
	}
	}
	.fiList{position: relative;}
	.fiList label{position: absolute;left: 0.2rem;top: 0.23rem;}
</style>
