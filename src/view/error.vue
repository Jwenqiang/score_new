<template>
	<div class="error" v-if="$route.query.msg">
		{{$route.query.msg}}
	</div>
	<div class="error" v-else>
		账号发生异常，请退出A+系统重新登录
	</div>
</template>

<script>
	export default{
		name: 'error',
		data(){
			return{
				
			}
		}
	}
</script>

<style>
	.error{height: 100vh;width: 100%;background: url(../assets/img/error.png) center 4rem no-repeat;background-size: 4.07rem;padding-top: 7.6rem;text-align: center;color: #999;}
</style>
