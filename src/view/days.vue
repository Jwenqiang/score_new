<template>
	<div>
		<div class="imgMsg" v-if="id==1">
			<img src="../assets/img/day1.png?v=1" width="100%"/>
		</div>
		<div class="imgMsg" v-else-if="id==2">
			<img src="../assets/img/day2.png" width="100%"/>
		</div>
		<div class="imgMsg" v-else-if="id==3">
			<img src="../assets/img/day3.png" width="100%"/>
		</div>
		<div class="imgMsg" v-else-if="id==4">
			<img src="../assets/img/day4.png" width="100%"/>
		</div>
		<div class="imgMsg" v-else-if="id==5">
			<img src="../assets/img/day5.png" width="100%"/>
		</div>
		<div class="imgMsg" v-else-if="id==6">
			<img src="../assets/img/day6.png" width="100%"/>
		</div>
		<div class="imgMsg" v-else-if="id==7">
			<img src="../assets/img/day7.png" width="100%"/>
		</div>
		<div class="imgMsg" v-else-if="id==8">
			<img src="../assets/img/day8.png" width="100%"/>
		</div>
		<div class="imgMsg" v-else-if="id==9">
			<img src="../assets/img/day9.png" width="100%"/>
		</div>	
		<div class="imgMsg" v-else-if="id==0">
			<img src="../assets/img/dayS.png" width="100%"/>
		</div>	
		<div class="imgMsg" v-else-if="id==11">
			<img src="../assets/img/day11.png" width="100%"/>
		</div>	
		<div class="imgMsg" v-else-if="id==12">
			<img src="../assets/img/day12.png" width="100%"/>
		</div>	
		<div class="imgMsg" v-else-if="id==13">
			<img src="../assets/img/day13.png" width="100%"/>
		</div>
		<div class="imgMsg" :class="id>14?'imgMsg1':''" v-else-if="id==15">
			<img src="../assets/img/day15.jpg" width="100%"/>
		</div>
		<div class="imgMsg" :class="id>14?'imgMsg1':''" v-else-if="id==16">
			<img src="../assets/img/day16.jpg" width="100%"/>
		</div>
		<div class="imgMsg" :class="id>14?'imgMsg1':''" v-else-if="id==17">
			<img src="../assets/img/day1116.png" width="100%"/>
		</div>
<!-- 		<div class="imgMsg" :class="id>14?'imgMsg1':''" v-else-if="id==18">
			<img src="../assets/img/day1202.jpg" width="100%"/>
		</div> -->
		<div class="imgMsg" :class="id>14?'imgMsg1':''" v-else-if="id==29">
			<img src="../assets/img/day28.png" width="100%"/>
		</div>
		<div class="imgMsg" :class="id>14?'imgMsg1':''" v-else-if="id==30">
			<img src="../assets/img/day31.png" width="100%"/>
		</div>
		<div class="imgMsg" :class="id>14?'imgMsg1':''" v-else-if="id==21">
			<img src="../assets/img/day-d11.jpg?v=1" width="100%"/>
		</div>
		<div class="imgMsg" :class="id>14?'imgMsg1':''" v-else-if="id==22">
			<img src="../assets/img/day-21.png" width="100%"/>
		</div>
		<div class="imgMsg" :class="id>14?'imgMsg1':''" v-else-if="id==23">
			<img src="../assets/img/days1-1.jpg" width="100%"/>
		</div>
		<div class="imgMsg" :class="id>14?'imgMsg1':''" v-else-if="id==27">
			<img src="../assets/img/days27.png" width="100%"/>
		</div>
		<div class="imgMsg" :class="id>14?'imgMsg1':''" v-else-if="$route.params.id==24" @click="$router.replace({name:'days',params:{id:'26'}})">
			<img src="../assets/img/days24.jpg?v=6" width="100%"/>
		</div>
		<div class="imgMsg" :class="id>14?'imgMsg2':''" v-else-if="$route.params.id==26">
			<img src="../assets/img/days26.png?v=6" width="100%"/>
		</div>
		<div class="imgMsg" :class="id>14?'imgMsg1':''" v-else-if="id==25">
			<img src="../assets/img/days25.jpg" width="100%"/>
		</div>
		<div class="imgMsg" :class="id>14?'imgMsg1':''" v-else-if="id==28">
			<img src="../assets/img/days-cj.jpg" width="100%"/>
		</div>
		<div class="imgMsg" :class="id>14?'imgMsg1':''" v-else-if="id==31">
			<img src="../assets/static/day30.jpg" width="100%"/>
		</div>
	</div>
</template>

<script>
	import { Toast,Indicator } from 'mint-ui';
	import {
	  uToken,
	} from "@/global/token.js";
	export default{
		name: 'days',
		data(){
			return{
				id:"",
				header_token:{"token": uToken()}
			}
		},
		created() {
			document.title="帮助中心";
		},
		mounted(){
			Indicator.open();
			this.id=this.$route.params.id
			setTimeout(()=>{
				Indicator.close();
			},500)
			this.setLog();
		},
		methods:{
			setLog(){
				return new Promise((resolve)=>{
						this.$axios({
							method:"post",
							url:"/Task/FinishDayTaskAsync",
							headers:this.header_token,
							data:{
								ViewTarget:"ViewTaskMeiRi",
								ViewValue:""
							}
						})
						.then(res=>{
							resolve(res);
						})
				})
			},
		}
	}
</script>

<style>
	.imgMsg{padding: 0.5rem 0.2rem 0.7rem;}
	.imgMsg1{padding: 0;}
	.imgMsg2{background-color: #09136d;}
</style>
