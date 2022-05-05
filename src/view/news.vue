<template>
	<div>
		<div class="imgMsg" v-if="id==1">
			<img src="images/xs/xs-2.png" width="100%"/>
		</div>
		<div class="imgMsg" v-else-if="id==2">
			<img src="images/xs/xs-3.png" width="100%"/>
		</div>
		<div class="imgMsg" v-else-if="id==3">
			<img src="images/xs/xs-4.png" width="100%"/>
		</div>
		<div class="imgMsg" v-else-if="id==4">
			<img src="images/xs/xs-5.png" width="100%"/>
		</div>
		<div class="imgMsg" v-else-if="id==5">
			<img src="images/xs/xs-6.png" width="100%"/>
		</div>
<!-- 		<div class="imgMsg" v-else-if="id==6">
			<img src="../assets/img/new6.png" width="100%"/>
		</div> -->
		<div class="imgMsg" v-else-if="id==7">
			<img src="images/xs/xs-7.png" width="100%"/>
		</div>
		<div class="imgMsg" v-else-if="id==8">
			<img src="images/xs/xs-8.png" width="100%"/>
		</div>
		<div class="imgMsg" v-else-if="id==9">
			<img src="images/xs/xs-7.png" width="100%"/>
		</div>
	</div>
</template>

<script>
	import { Toast,Indicator } from 'mint-ui';
	import {
	  uToken,
	} from "@/global/token.js";
	export default{
		name: 'news',
		data(){
			return{
				id:"",
				header_token:{"token": uToken()}
			}
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
								ViewTarget:"ViewTaskXinShou",
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
</style>
