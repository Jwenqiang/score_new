<template>
	<div class="set">
		<div class="mySet">
			<div class="clear" style="border-bottom: 1px solid #ededed;" @click="$router.push({name:'program'})">
				<label class="myliL" style="color: #333333;font-size: 0.32rem;line-height: 1rem;">帮助中心</label>
				<label class="myliR">玩赚元宝秘籍</label>
			</div>
			<div class="clear" @click="$router.push({name:'fail',query:{'userName':$route.query.userName,'emNum':$route.query.emNum}})">
				<label class="myliL" style="color: #333333;font-size: 0.32rem;line-height: 1rem;">我要纠错</label>
				<label class="myliR">纠错有奖</label>
			</div>
		</div>
		<div class="mySet" style="margin-top: 0.2rem;">
			<div class="clear" style="border-bottom: 1px solid #ededed;">
				<label class="myliL" style="color: #333333;font-size: 0.32rem;line-height: 1rem;">充值中心</label>
				<label class="myliR">功能开发中，敬请期待</label>
			</div>
			<div class="clear" style="border-bottom: 1px solid #ededed;">
				<label class="myliL" style="color: #333333;font-size: 0.32rem;line-height: 1rem;">转赠元宝</label>
				<label class="myliR">功能开发中，敬请期待</label>
			</div>
			<div class="clear">
				<label class="myliL" style="color: #333333;font-size: 0.32rem;line-height: 1rem;">商城</label>
				<label class="myliR">功能开发中，敬请期待</label>
			</div>
			<div class="clear" @click="openDebug()" v-if="$_isBeta && $_isDebug">
				<label class="myliL" style="color: #333333;font-size: 0.32rem;line-height: 1rem;">DEBUG</label>
				<label class="myliR">{{ $_version }} {{ $_env }}</label>
			</div>
		</div>
		<div class="mySet" style="margin-top: 0.2rem;" v-if="inApp==false">
			<div class="clear">
				<label class="myliL" style="color: #333333;font-size: 0.32rem;line-height: 1rem;">退出</label>
				<label class="myliR" @click="isShowTip=true">更换账号</label>
			</div>
		</div>
		<div class="showModel modelMsg" v-if="isShowTip">
		  <div class="bj"></div>
		  <div class="showMsg">
			<p class="tipTitle">您是否要退出登录？</p>
			<div class="tipB">
				<button @click="logOut">残忍退出</button>
				<button @click="isShowTip=false">我再想想</button>
			</div>
		  </div>
		</div>
	</div>
</template>

<script>
	import { version } from '@/../package.json'

	export default{
		name: 'set',

		data(){
			return{
				isShowTip: false,
				inApp: false,
				userInfo: "",
			}
		},

		created(){
			document.title="设置";
			var u = navigator.userAgent;
			if(u.indexOf('aplus') >-1){
				this.inApp=true;
			}
		},

		methods:{
			logOut(){
				  this.$store.dispatch("logout");
				  document.title='登录'
				  this.$router.push({name:"login"})
			},

			openDebug() {
				import(/* webpackChunkName: "debug" */ 'vconsole').then(({ default: vConsole }) => {
					new vConsole()
				})
			}
		},

		beforeCreate() {
			this.$_version = version
			this.$_env = process.env.NODE_ENV
			this.$_isBeta = String(version).indexOf('0') === 0
			this.$_isDebug = process.env.NODE_ENV !== 'production'
		}
	}
</script>

<style>
	.set{background-color: #F5F5F5;height: 100vh;}
	.mySet{padding: 0 0.3rem; background: #fff;line-height: 1rem;}
	.myliL {display: block;height: 1rem;line-height: 0.8rem;width: 2rem;float: left;font-weight: 500;}
	.myList .myliL{line-height: 1rem;}
	.myliL span{color: #FFC323;font-size: 0.46rem;margin-left: 0.2rem;font-weight: bold;position: relative;top: 0.04rem;}
	.myliR{width: 3.6rem;padding-right: 0.3rem;display: block;height: 1rem;line-height: 1rem;color: #999;font-size: 0.24rem;text-align: right;background: url(../assets/img/icon-right.png) right center no-repeat;background-size: 0.12rem;float: right;}

	.showModel{
	  position: fixed;
	  width: 100%;
	  height: 100%;
	  z-index: 90;
	}
	.bj{position: fixed;background: #000;opacity: 0.5;width: 100%;height: 100%;left: 0;top: 0;z-index: 91;}
	.set .showMsg{font-size: 16px; position: fixed;left: 50%;top: 50%;transform: translate(-50%,-50%);width: 6rem;height: 3rem; background: #fff;z-index: 92;padding: 0.6rem 0.2rem;border-radius: 8px;}
	.tipTitle{text-align: center;}
	.tipB{text-align: center;margin-top: 0.6rem;}
	.tipB button{height: 0.6rem;width: 2rem;background-color: #ccc;margin-right: 0.6rem;color: #fff;border-radius: 0.4rem;font-size: 0.3rem;}
	.tipB button:last-child{margin: 0;background-color: #F93C32;}
</style>
