<template>
	<div class="dayLog">
		<template v-if=""></template>
		<div class="dayList">
			<div @click="goMsg">
				<p class="dayMsg">{{dptName}}管理日报</p>
			</div>
			<div class="sday">
				<div class="listBox">
					<template v-if="dPath==5">
					<div class="dayChild dayChildDpt" @click="$router.push({name:'dayLogMsg',params:{date:$route.params.date,id:item.DeptId}})"  v-for="(item,idx) in listArr" :key="item.DeptName">
						<label>{{item.DeptName}}</label>
					</div>
					</template>
					<template v-else>
					<div class="dayChild" @click="goPath(item.DeptId)"  v-for="(item,idx) in listArr" :key="item.DeptName">
						<label>{{item.DeptName}}</label>
					</div>
					</template>
				</div>
			</div>
		</div>
		<p class="noList" @click="pSize+=10" v-if="count>pSize">正在加载</p>
		<p class="noList" v-else-if="count<=pSize&&loadOver"><span></span>&nbsp;我是有底线的&nbsp;<span></span></p>
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
		name: 'dayLogPath',
		data(){
			return{
				header_token:{"token": uToken()},
				showAll:false,
				listArr:[],
				pSize:10,
				count:0,
				loadOver:false,
				load:false,
				scrollTop:0,
				dPath:"",
				dptName:""
			}
		},
		watch:{
			'$route' (to, from){
				this.getData();
			}
		},
		mounted(){
			document.title=`${this.$route.params.date}日报`;
			this.getData();
		},

		components: {
		},
		methods:{
			goMsg(){
				this.$router.push({name:'dayLogMsg',params:{date:this.$route.params.date,id:this.$route.params.id}})
			},
			goPath(DeptId){
				this.$router.push({name:'dayLogPath',params:{date:this.$route.params.date,id:DeptId,path:this.dPath}});
			},
			showChild(v){
				this.$set(v,'show',true);
			},
			getData(){
				Indicator.open();
				this.load=false;
				return new Promise((resolve)=>{
					this.$axios({
						method:"get",
						url:"/ManagerDaily/GetEmpDeptments",
						headers:this.header_token,
						params:{
							deptId:this.$route.params.id,  
							dailyDate:this.$route.params.date 
						}
					})
					.then(res=>{
						this.ready=true;
						console.log(res);
						Indicator.close();
						
						if(res.data.code==0){
								this.dptName=res.data.data.DeptName;
								this.dPath=res.data.data.DeptRank;
								this.listArr=res.data.data.EmpDeptments;
						}else{
							Toast(res.data.msg);
						}
						this.load=true;
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
			padding: 0 0.3rem;
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
				color: #333;
				font-size: 0.34rem;
				background: url(../assets/img/icon-log.png) right center no-repeat;
				background-size: 0.44rem;
				padding: 0.5rem 0;
			}
			.dayChild{
				color: #666;
				line-height: 1.1rem;
				font-size: 0.3rem;
				background: url(../assets/img/log-right.png) right center no-repeat;
				background-size: 0.12rem;
				border-top: 1px solid #eee;
			}
			.dayChildDpt{
				background: url(../assets/img/icon-log.png) right center no-repeat;
				background-size: 0.4rem;
			}
			.sUp{text-align: center;color: #999;border-top: 1px solid #eee;padding: 0.3rem 0;}
			.listBox{
			}
		}
		.noList{
			color: #ccc;font-size: 0.26rem;text-align: center;margin-top: 0.8rem;
			span{display: inline-block;height: 1px;width: 2rem;background-color: #eee;position: relative;top: -3px;}
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
