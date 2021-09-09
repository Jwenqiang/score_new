<template>
	<div>
		<div class="imgMsg" v-if="id==1">
			<img src="../assets/img/good1.png?v=1" width="100%"/>
		</div>
		<div class="imgMsg" v-else-if="id==2">
			<img src="../assets/img/good2.png" width="100%"/>
		</div>
		<div class="imgMsg" v-else-if="id==3">
			<img src="../assets/img/good3.png" width="100%"/>
		</div>
		<div class="imgMsg" v-else-if="id==4">
			<img src="../assets/img/good4.png?v=1" width="100%"/>
		</div>
		<div class="imgMsg" v-else-if="id==5">
			<img src="../assets/img/good5.png?v=1" width="100%"/>
		</div>
		<div class="imgMsg" v-else-if="id==6">
			<img src="../assets/img/good6.png?v=3" width="100%"/>
		</div>
		<div class="imgMsg" v-else-if="id==7">
			<img src="../assets/img/good7.png?v=4" width="100%"/>
		</div>
		<div class="imgMsg" v-else-if="id==8">
			<img src="../assets/img/good8.png" width="100%"/>
		</div>
<!-- 		<div class="imgMsg" v-else-if="id==8">
			<img src="../assets/img/good8.png" width="100%"/>
		</div>
		<div class="imgMsg" v-else-if="id==9">
			<img src="../assets/img/good9.png" width="100%"/>
		</div>	 -->	
	</div>
</template>

<script>
	import { Toast,Indicator } from 'mint-ui';
	import {
	  uToken,
	} from "@/global/token.js";
	export default{
		name: 'goods',
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
								ViewTarget:"ViewTaskFuLi",
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
