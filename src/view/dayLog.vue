<template>
	<div class="dayLog">
		<template v-if=""></template>
		<div class="dayList" :class="item.show?'all':'aa'" v-for="(item,idx) in listArr" :key="item.DailyDate">
			<div @click="showChild(item)">
				<h4>【{{item.DailyDate}}】管理日报<!-- <label>09:29</label> --></h4>
				<p class="dayMsg">早晨！网络管理日报已生成，点击查看哦</p>
			</div>
			<div class="sday" v-if="item.show">
				<div class="listBox">
					<!-- 店董 -->
					<template v-if="item.DeptRank==5">
					<div class="dayChild dayChildDpt" @click="$router.push({name:'dayLogMsg',params:{date:item.DailyDate,id:citem.DeptId}})" v-for="(citem,cindex) in item.EmpDeptments" :key="cindex">
						<label>{{citem.DeptName}}</label>
					</div>
					</template>
					<!--  -->
					<template v-else>
					<div class="dayChild" @click="$router.push({name:'dayLogPath',params:{date:item.DailyDate,id:citem.DeptId,path:item.DeptRank}})" v-for="(citem,cindex) in item.EmpDeptments" :key="cindex">
						<label>{{citem.DeptName}}</label>
					</div>
					</template>
				</div>
				<div class="sUp" @click="item.show=false"> —— 收起 —— </div>
			</div>
		</div>
		<p class="noList" v-if="count>pSize">正在加载</p>
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
		name: 'dayLog',
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
			}
		},
		watch:{
			scrollTop(newValue, oldValue) {//滚动分页
				var height = document.getElementsByClassName('dayLog')[0].scrollHeight;
				let sTop = document.documentElement && document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop;//滚动的高度
				let clientHeight=window.screen.height;//屏幕的高度
				console.log(newValue)
				if(this.count>this.pSize){
					if(sTop>0){
						if(height-100<sTop+clientHeight&&this.load){
							  console.log('监听成功','到达底部')
							if(this.pSize<this.count){
								this.pSize=Number(this.pSize)+10; 
							}
							setTimeout(()=>{
								this.loadOver=true
							},1000)
						 }
					 }
				}else{
					setTimeout(()=>{
						this.loadOver=true
					},1000)
				}
			},
			pSize(){
				if(this.pSize<31){
					this.getData()
				}
			},
		},
		mounted(){
			document.title="管理日报";
			// 全局绑定滚动事件，
			window.addEventListener("scroll", this.scrollT);
			this.getData();
		},
		beforeDestroy() {
			// 组件消失，解绑scroll事件
			window.removeEventListener("scroll", this.scrollT);
		},
		components: {
		},
		methods:{
			scrollT(){
				this.scrollTop = window.scrollY;
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
						url:"/ManagerDaily/GetEmpDailyList",
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
								this.listArr=res.data.data.EmpDailys;
								this.count=res.data.data.EmpDailyCount;
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
			.dayChildDpt{
				background: url(../assets/img/icon-log.png) right center no-repeat;
				background-size: 0.4rem;
			}
			.sUp{text-align: center;color: #999;border-top: 1px solid #eee;padding: 0.3rem 0;}
			.listBox{
				max-height: 4.1rem;
				overflow: auto;
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
