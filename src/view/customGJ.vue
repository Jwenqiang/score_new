<template>
	<div>
		用户画像
	</div>
</template>

<script>
import Vue from 'vue';
import { Toast,Indicator } from 'mint-ui';
import {
	uToken,
} from "@/global/token.js";
import nutUI from '@nutui/nutui/dist/nutui.min.js';  // 加载构建后的JS
import '@nutui/nutui/dist/nutui.min.css';  //加载构建后的CSS
nutUI.install(Vue);
export default{
	name:"customHX",
	data(){
		return{
			header_token:{"token": uToken()},
		}
	},
	
}
</script>

<style lang="less" scoped>
	
</style>
