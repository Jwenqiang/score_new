<template>
	<div class="prize" v-if="ready">
		<div class="banner">
			<img src="model/prizeBanner.png" width="100%"/>
		</div>
		<template v-if="list.length>0">
			<div class="list" v-for="item in list" :key="item.Id">
				<label>
					<img src="model/p-mbjb.png" width="100%" v-if="item.PrizeId==1"/>
					<img src="model/p-bz.png" width="100%" v-else-if="item.PrizeId==2"/>
					<img src="model/p-cj.png" width="100%" v-else-if="item.PrizeId==3"/>
					<img src="model/p-dz.png" width="100%" v-else-if="item.PrizeId==4"/>
					<img src="model/p-zjh.png" width="100%" v-else-if="item.PrizeId==5"/>
					<img src="model/p-bjb.png" width="100%" v-else-if="item.PrizeId==6"/>
					<img src="model/p-fspw.png" width="100%" v-else-if="item.PrizeId==7"/>
					<img src="model/p-fs.png" width="100%" v-else-if="item.PrizeId==8"/>
					<img src="model/p-jwpw.png" width="100%" v-else-if="item.PrizeId==9"/>
					<img src="model/p-cdb.png" width="100%" v-else-if="item.PrizeId==10"/>
					<img src="model/p-20.png" width="100%" v-else-if="item.PrizeId==11"/>
					<img src="model/p-50.png" width="100%" v-else-if="item.PrizeId==12"/>
				</label>
				<div>
					<h4>{{item.PrizeName}}</h4>
					<p>领奖时间：{{item.ReceiveTime}}</p>
				</div>
			</div>
			<p class="tip">奖品请以实物为准，图片仅供参考，将会在一周左右邮寄至门店，请注意查收。</p>
		</template>
		<div class="none" v-else>
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
				header_token:{"token": uToken()},
				list:"",
				ready:false
			}
		},
		created() {
			document.title="我的奖品";
			Indicator.open();
			this.getPrize();
		},
		mounted(){

		},
		methods:{
			getPrize(){
				return new Promise((resolve)=>{
						this.$axios({
							method:"post",
							url:"/Activity/MyPrize",
							headers:this.header_token,
						})
						.then(res=>{
							resolve(res);
							console.log(res);
							if(res.data.code==0){
								this.list=res.data.data;
							}
							setTimeout(()=>{
								Indicator.close();
							},500)
							this.ready=true;
						})
						.catch(error=>{
							Indicator.close();
							Toast("网络错误，请稍后再试");
						})
				})
			},
		}
	}
</script>

<style scoped>
	.prize{padding: 0.25rem 0.3rem 0.8rem;background: #f5f5f5;min-height: 100vh;}
	.banner img{display: block;}
	.banner{margin-bottom: 0.28rem;}
	.list{border-radius: 0.08rem;margin-bottom: 0.28rem;width: 100%;height: 2.14rem;box-shadow: 0px 2px 6px 2px rgba(0, 0, 0, 0.06);background: #fff;display: flex;padding: 0.28rem;justify-content: space-between;align-items: center;}
	.list label{width: 2rem;}
	.list > div{width: 4.1rem;}
	.list h4{font-size: 0.36rem;color: #333;margin-bottom: 0.1rem;}
	.list p{font-size: 0.26rem;color: #999}
	.none{width: 100%;height: 8rem;background: url(../../public/model/prizeNone.png) center no-repeat;background-size: 6rem;}
	.tip{font-size: 0.26rem;color: #ccc;padding-left: 0.4rem;background: url(../../public/model/icon-tip.png) left 2px no-repeat;background-size: 0.3rem;width: 6.5rem;margin: 0.2rem auto;}
</style>
