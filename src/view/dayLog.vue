<template>
	<div class="dayLog">
		<div class="dayList" :class="item.show?'all':'aa'" v-for="item in listArr">
			<div @click="item.show=true">
				<h4>2021年08月11日管理日报<label>09:29</label></h4>
				<p class="dayMsg">早晨1网络管理日报已生成，点击查看哦</p>
			</div>
			<div class="sday" v-if="item.show">
				<div class="dayChild" @click="$router.push({name:'dayLogMsg',query:{id:1}})">
					<label>星海名城店</label>
				</div>
				<div class="dayChild">
					<label>前海公馆店</label>
				</div>
				<div class="dayChild">
					<label>国贸前进店</label>
				</div>
				<div class="sUp" @click="item.show=false"> —— 收起 —— </div>
			</div>
		</div>
<!-- 		<div class="dayList" :class="showAll?'all':'aa'">
			<div @click="showAll=true">
				<h4>2021年08月11日管理日报<label>09:29</label></h4>
				<p class="dayMsg">早晨1网络管理日报已生成，点击查看哦</p>
			</div>
			<div class="sday" v-if="showAll">
				<div class="dayChild">
					<label>星海名城店</label>
				</div>
				<div class="dayChild">
					<label>前海公馆店</label>
				</div>
				<div class="dayChild">
					<label>国贸前进店</label>
				</div>
				<div class="sUp" @click="showAll=false"> —— 收起 —— </div>
			</div>
		</div> -->
		
		
	</div>		
</template>

<script>
	import Vue from 'vue';
	// 京东框架2.X
	import nutUI from '@nutui/nutui/dist/nutui.min.js';  // 加载构建后的JS
	import '@nutui/nutui/dist/nutui.min.css';  //加载构建后的CSS
	nutUI.install(Vue);
	import Module from '@/components/module.vue'
	import { Toast,Indicator } from 'mint-ui';
	import {
	  uToken,
	} from "@/global/token.js";
	export default{
		name: 'dayLog',
		data(){
			return{
				header_token:{"token": uToken()},
				showAll:false,
				listArr:[{id:1,val:'ssss',show:false},{id:2,val:'aaa',show:false}]
			}
		},
		watch:{
		},
		mounted(){
			document.title="管理日报";
			this.getData();
		},
		components: {
		},
		methods:{
			getData(){
				Indicator.open();
				return new Promise((resolve)=>{
					this.$axios({
						method:"get",
						url:"/Message/GetList",
						headers:this.header_token,
						params:{
							PageSize:this.pSize,
						}
					})
					.then(res=>{
						this.ready=true;
						console.log(res);
						Indicator.close();
						if(res.data.code==0){
							this.msg=res.data.data.DataList;
							this.count=res.data.data.RecordCount;
						}else{
							Toast(res.data.msg);
						}
					})
					.catch(error=>{
						this.ready=true;
						Indicator.close();
						Toast("网络错误，请稍后再试");
					})
				})
			},
		}
	}	
</script>

<style scoped="scoped" lang="less">
	.dayLog{
		padding: 0.3rem 0.3rem 0.6rem;
		background-color: #F5F5F5;
		min-height: 100vh;
		.dayList{
			padding: 0.36rem 0.3rem 0;
			background: #fff;
			position: relative;
			box-shadow: 0px 2px 6px 2px rgba(0, 0, 0, 0.06);
			border-radius: 0.1rem;
			// height: 1.8rem;
			overflow: hidden;
			margin-bottom: 0.3rem;
			h4{
				font-size: 0.32rem;
				font-weight: 500;
				margin-bottom: 0.17rem;
				position: relative;
				label{
					position: absolute;
					right: 0;
					top: 0;
					font-size: 0.24rem;
					color: #999;
				}
			}
			.dayMsg{
				color: #999;
				font-size: 0.28rem;
				background: url(../assets/img/log-right.png) right center no-repeat;
				background-size: 0.12rem;
				margin-bottom: 0.3rem;
			}
			.dayChild{
				color: #666;
				line-height: 0.9rem;
				font-size: 0.3rem;
				background: url(../assets/img/log-right.png) right center no-repeat;
				background-size: 0.12rem;
				border-top: 1px solid #eee;
			}
			.sUp{text-align: center;color: #999;border-top: 1px solid #eee;padding: 0.3rem 0;}
		}
		.all{
			height: auto;
			transition: all 0.5s linear;
			.dayMsg{
				background: none;
			}
		}
	}
</style>
