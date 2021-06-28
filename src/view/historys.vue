<template>
	<div>
		<div class="imgMsg" v-if="id==1">
			<img src="../assets/img/history1.png" width="100%"/>
		</div>
		<div class="imgMsg" v-else-if="id==2">
			<img src="../assets/img/history2.png" width="100%"/>
		</div>
		<div class="imgMsg" v-else-if="id==3">
			<img src="../assets/img/historys3.png" width="100%"/>
		</div>	
	</div>
</template>

<script>
	import { Toast,Indicator } from 'mint-ui';
	export default{
		name: 'historys',
		data(){
			return{
				id:""
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
		},		
	}
</script>

<style>
	.imgMsg{padding: 0.5rem 0.2rem 0.7rem;}
</style>
