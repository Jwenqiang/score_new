<template>
	<div class="new">
		<div class="newList">
			<img src="../assets/img/sl1.png" class="nlT"/>
			<div class="newM">
				<h4>上传头像<span>+10</span></h4>
				<p>成功上传经纪人头像</p>
			</div>
			<mt-button type="primary" class="nlBtn nlBtns" v-if="task1.NewTaskStatus==1" @click="getScore(task1.SecondQuDaoCode)">领取奖励</mt-button>
			<mt-button type="primary" disabled class="nlBtn" v-else-if="task1.NewTaskStatus==2">领取成功</mt-button>
			<mt-button type="primary" class="nlBtn" @click="$router.push({name:'news',params:{id:'1'}})" v-else>如何完成</mt-button>
		</div>
		<div class="newList">
			<img src="../assets/img/sl2.png" class="nlT"/>
			<div class="newM">
				<h4>填写店铺资料<span>+10</span></h4>
				<p>及时完善经纪人店铺资料</p>
			</div>
			<mt-button type="primary" class="nlBtn nlBtns" v-if="task2.NewTaskStatus==1" @click="getScore(task2.SecondQuDaoCode)">领取奖励</mt-button>
			<mt-button type="primary" disabled class="nlBtn" v-else-if="task2.NewTaskStatus==2">领取成功</mt-button>
			<mt-button type="primary" class="nlBtn" @click="$router.push({name:'news',params:{id:'2'}})" v-else>如何完成</mt-button>
		</div>
		<div class="newList">
			<img src="../assets/img/sl3.png" class="nlT"/>
			<div class="newM">
				<h4>发布第一套租房房源<span>+20</span></h4>
				<p>成功发布第一套租房房源</p>
			</div>
			<mt-button type="primary" class="nlBtn nlBtns" v-if="task3.NewTaskStatus==1" @click="getScore(task3.SecondQuDaoCode)">领取奖励</mt-button>
			<mt-button type="primary" disabled class="nlBtn" v-else-if="task3.NewTaskStatus==2">领取成功</mt-button>
			<mt-button type="primary" class="nlBtn" @click="$router.push({name:'news',params:{id:'3'}})" v-else>如何完成</mt-button>
		</div>
		<div class="newList">
			<img src="../assets/img/sl3-1.png" class="nlT"/>
			<div class="newM">
				<h4>发布第一套二手房源<span>+30</span></h4>
				<p>成功发布第一套二手房房源</p>
			</div>
			<mt-button type="primary" class="nlBtn nlBtns" v-if="task4.NewTaskStatus==1" @click="getScore(task4.SecondQuDaoCode)">领取奖励</mt-button>
			<mt-button type="primary" disabled class="nlBtn" v-else-if="task4.NewTaskStatus==2">领取成功</mt-button>
			<mt-button type="primary" class="nlBtn" @click="$router.push({name:'news',params:{id:'4'}})" v-else>如何完成</mt-button>
		</div>
		<div class="newList">
			<img src="../assets/img/sl3-2.png" class="nlT"/>
			<div class="newM">
				<h4>第一套热门成交小区房源<span>+30</span></h4>
				<p>成功发布第一套热门成交小区房源</p>
			</div>
			<mt-button type="primary" class="nlBtn nlBtns" v-if="task5.NewTaskStatus==1" @click="getScore(task5.SecondQuDaoCode)">领取奖励</mt-button>
			<mt-button type="primary" disabled class="nlBtn" v-else-if="task5.NewTaskStatus==2">领取成功</mt-button>
			<mt-button type="primary" class="nlBtn" @click="$router.push({name:'news',params:{id:'5'}})" v-else>如何完成</mt-button>
		</div>
<!-- 		<div class="newList">
			<img src="../assets/img/sl4.png" class="nlT"/>
			<div class="newM">
				<h4>房源第一次被设为中原好房<span>+50</span></h4>
				<p>发布的房源第一次被设为中原好房</p>
			</div>
			<mt-button type="primary" class="nlBtn nlBtns" v-if="task6.NewTaskStatus==1" @click="getScore(task6.SecondQuDaoCode)">领取奖励</mt-button>
			<mt-button type="primary" disabled class="nlBtn" v-else-if="task6.NewTaskStatus==2">领取成功</mt-button>
			<mt-button type="primary" class="nlBtn" @click="$router.push({name:'news',params:{id:'6'}})" v-else>如何完成</mt-button>
		</div> -->
		<div class="newList">
			<img src="../assets/img/sl5.png" class="nlT"/>
			<div class="newM">
				<h4>发布第一套独家委托房源<span>+30</span></h4>
				<p>成功发布第一套独家委托房源</p>
			</div>
			<mt-button type="primary" class="nlBtn nlBtns" v-if="task7.NewTaskStatus==1" @click="getScore(task7.SecondQuDaoCode)">领取奖励</mt-button>
			<mt-button type="primary" disabled class="nlBtn" v-else-if="task7.NewTaskStatus==2">领取成功</mt-button>
			<mt-button type="primary" class="nlBtn" @click="$router.push({name:'news',params:{id:'7'}})" v-else>如何完成</mt-button>
		</div>	
		<div class="newList">
			<img src="../assets/img/sl6.png" class="nlT"/>
			<div class="newM">
				<h4>发布门店主打小区房源<span>+30</span></h4>
				<p>成功发布第一套门店主打小区房源</p>
			</div>
			<mt-button type="primary" class="nlBtn nlBtns" v-if="task8.NewTaskStatus==1" @click="getScore(task8.SecondQuDaoCode)">领取奖励</mt-button>
			<mt-button type="primary" disabled class="nlBtn" v-else-if="task8.NewTaskStatus==2">领取成功</mt-button>
			<mt-button type="primary" class="nlBtn" @click="$router.push({name:'news',params:{id:'8'}})" v-else>如何完成</mt-button>
		</div>			
	</div>
</template>

<script>
	import { Toast,Indicator } from 'mint-ui';
	import { Search } from 'mint-ui';
	import {
	  uToken,
	} from "@/global/token.js";
	export default{
		name: 'new',
		data(){
			return{
				ggw:"1",
				mainNum:10,
				nowNum:10,
				showModel:false,
				header_token:{"token": uToken()},
				newList:"",
				task1:"",
				task2:"",
				task3:"",
				task4:"",
				task5:"",
				task6:"",
				task7:"",
				task8:""
			}
		},
		mounted() {
			this.getTask()
		},
		components:{
			Search
		},
		methods:{
			minus(){
				if(this.mainNum<=10){
					Toast("10个不能再少了哦~");
				}else{
					this.mainNum -=5;
				}
			},			
			add(){
				if(this.mainNum>=100){
					Toast("您已出到最大值！");
				}else{
					this.mainNum +=5;
				}
			},
			getTask(){
				return new Promise((resolve)=>{
						this.$axios({
							method:"get",
							url:"/Task/GetNewTaskList?v="+Math.random()*10,
							headers:this.header_token,
						})
						.then(res=>{
							console.log(res);
							resolve(res);
							if(res.data.code==0){
								this.newList=res.data.data
								if(res.data.data.length>0){
									this.task1=res.data.data[0]
									this.task2=res.data.data[1]
									this.task3=res.data.data[2]
									this.task4=res.data.data[3]
									this.task5=res.data.data[4]
									this.task6=res.data.data[5]
									this.task7=res.data.data[6]
									this.task8=res.data.data[7]
								}
							}else{
								Toast(res.data.message);
							}
						})
						.catch(error=>{
							Toast("网络错误，请稍后再试");
						})
				})
			},
			getScore(code){
				return new Promise((resolve)=>{
						this.$axios({
							method:"post",
							url:"/Task/FinishNewTask",
							headers:this.header_token,
							data:{
								SecondQuDaoCode:code
							}
						})
						.then(res=>{
							console.log(res);
							resolve(res);
							if(res.data.code==0){
									Toast("领取成功~");
									setTimeout(()=>{
										this.getTask();
									},50)
									
							}else{
								Toast(res.data.message);
							}
						})
						.catch(error=>{
							Toast("网络错误，请稍后再试");
						})
				})
			}
		}
	}
</script>

<style>
	.new{padding: 0.3rem;}
	.nlT{width: 0.8rem;float: left;}
	.newList{padding: 0.4rem 0;}
	.newM{width: 4.4rem;float: left;margin-left: 0.1rem;}
	.newM h4{font-size: 0.28rem;color: #333;margin-bottom: 0.1rem;}
	.newM h4 span{font-weight: 400;font-size: 0.24rem; display: inline-block;width: 0.86rem;height: 0.32rem;padding-left: 0.34rem;background: #F16058 url(../assets/img/icon-syb.png) 0.1rem center no-repeat;background-size: 0.25rem;border-radius: 0.2rem;margin-left: 0.1rem;color: #fff;}
	.newM p{font-size: 0.24rem;color: #999;}
	.nlBtn{
		margin-top: 0.12rem;
		width:1.6rem;
		height:0.6rem;
		background:linear-gradient(180deg,rgba(253,147,115,1) 0%,rgba(253,76,60,1) 100%);
		border-radius:0.08rem;
		font-size: 0.26rem;
		padding: 0;
	}
	.nlBtns{
		background:linear-gradient(180deg,#F5C71D 0%,#FFB40D 100%);
	}
	button.nlBtn[disabled]{background: #D0CDCD;}
</style>
