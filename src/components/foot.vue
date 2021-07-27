<template>
	<div class="foot">
		<div :class="[tab1=='0'?'':'on','footBar']" @click="goIdx">
			<p v-if="tab1==1"><img src="../assets/img/foot1-1.png"/></p>
			<p v-else><img src="../assets/img/foot1.png"/></p>
			<p>首页</p>
		</div>
		<div :class="[tab5=='0'?'':'on','footBar']" @click="goUser">
			<p v-if="tab5==1"><img src="../assets/img/foot5-1.png"/></p>
			<p v-else><img src="../assets/img/foot5.png"/></p>
			<p>商机</p>
		</div>
		<div :class="[tab2=='0'?'':'on','footBar']" @click="goEarn">
			<p><label><img src="../assets/img/foot-sc.png"/></label></p>
		</div>
		<div :class="[tab3=='0'?'':'on','footBar']" @click="goWay">
			<p v-if="tab3==1"><img src="../assets/img/foot3-1.png"/></p>
			<p v-else><img src="../assets/img/foot3.png"/></p>
			<p>赚取</p>
		</div>
		<div :class="[tab4=='0'?'':'on','footBar']" @click="goMy">
			<p v-if="tab4==1"><img src="../assets/img/foot4-1.png"/></p>
			<p v-else><img src="../assets/img/foot4.png"/></p>
			<p>我的</p>
		</div>
	</div>
</template>

<script>
	import {
	  getToken,
	} from "@/global/token.js";
	export default{
		name: 'foot',
		props: {
		  tab1: {
		    type: String,
		    default: '0'
		  },
		  tab2: {
		    type: String,
		    default: '0'
		  },
		  tab3: {
		    type: String,
		    default: '0'
		  },
		  tab4: {
		    type: String,
		    default: '0'
		  },
		  tab5: {
		    type: String,
		    default: '0'
		  },
		  tab6: {
		    type: String,
		    default: '0'
		  }
		},
		methods:{
			goIdx(){
				this.$router.replace({name:'home'})
			},
			goWay(){
				this.$router.replace({name:'way'})
			},
			goEarn(){
				this.$router.replace({name:'cars'})
			},
			goMy(){
				this.$router.replace({name:'my'})
			},
			goUser(){
				this.$router.replace({name:'custom'})
			},
		}
	}
</script>

<style scoped>
	.foot{width: 100%;margin: 0 auto; height: 1rem;position: fixed;bottom: 0;left: 0;z-index: 9;background-color: #fff;display: flex;box-shadow: 0 -2px 6px #f5f5f5;}
	.footBar{flex: 1;text-align: center;}
	.footBar img{width: 0.56rem;margin-top: 0.08rem;}
	.footBar p{font-size: 0.2rem;line-height: 1;}
	.footBar p label{display: inline-block;padding: 0.45rem 0.4rem 0.4rem;background: url(../assets/img/foot-tbj.png) center top no-repeat;background-size: 1.6rem;border-radius: 50%;position: relative;top: -0.5rem;}
	.footBar p label img{width: 0.8rem;margin-top: 0.1rem;}
	.on{color: #F4472D;}
</style>
