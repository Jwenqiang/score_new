<template>
	<div class="cjV">
		<div class="test"></div>
		<div class="fcj">
			<img src="../assets/static/cj.jpg" width="100%"/>
			<label class="i-hd" @click="showCj=true"></label>
			<div class="cShare">
				<a class="cbutton" @click="$router.push({name:'hb',query:{id:'7'}})"></a>
				<span class="cpoint"></span>
			</div>
		</div>
		<nut-popup style="border-radius: 0.12rem;" v-model="showCj">
			<div class="cjShow">
				<div class="cjsT"></div>
				<div class="cjsC">
					<div class="cjsMsg">
						<div style="overflow: auto;height: 100%;">
							<p style="text-indent: 0.42rem;">活动期间通过移动A+成长系统完成成交海报分享，经核实成交渠道为中原找房，并完成已上数，即可获得500元宝和精美礼品1份。</p>
							<p>活动时间：2021.05.06-2021.07.31。</p>
							<p>活动对象：深圳中原全体置业顾问。</p>
							<p style="margin-bottom: 0.2rem;">参与方式：移动A+成长系统—分享成交海报—上传分享至朋友圈截图—人工核实—分享且成交上数次周发放元宝和奖品。</p>
							<p>获奖资格：</p>
							<p>①活动期间通过移动A+成长系统完成成交海报分享，经核实成交渠道为中原找房，并完成已上数。</p>
							<p>②成交业务类型范围：通过中原找房完成的新房买卖，二手房买卖、租赁，商铺买卖、租赁，写字楼买卖、租赁均可。</p>
							<p>③上数时间范围：在成功分享成交海报当日的前后各30日，完成上数状态为已上数即可。</p>
							<p>④获奖人为成功分享的成交海报上的成交人。成交海报上的成交人与实际成交人需一致，即通过中原找房完成的新房买卖，置业顾问在该笔成交中单数占比最高且≥0.4单方被判定为实际成交人；二手房买卖、租赁，商铺买卖、租赁，写字楼买卖、租赁仅成交人被判定为实际成交人。</p>
							<p>⑤每1个真实成交仅获奖1次，即仅支持最多发放1次奖品和元宝。</p>
							<p>⑥每个置业顾问每个月获奖上限≤2次，即每个置业顾问每个月最多发放2次奖品和元宝。</p>
							<p style="margin-bottom: 0.2rem;">⑦分享渠道：仅通过移动A+成长系统，分享在朋友圈方可获奖。</p>
							<p>奖品发放：</p>
							<p>①已上数先于成交海报分享的，奖品于分享海报后次周工作日寄出；已上数晚于成交海报分享的，奖品于已上数后次周工作日寄出。</p>
							<p>②奖品统一寄送至成功分享的成交海报上的成交人，寄出当日所在的门店地址。如寄出到收货期间，置业顾问发生门店变动，例如升职、降职、平调至其他门店、离职等情况，置业顾问需在奖品寄出前提前联系网络督导，如未及时联系，导致没有收到奖品的，奖品不补发。</p>
							<p style="margin-bottom: 0.2rem;">③奖品仅限深圳市，外地门店均不安排奖品配送。</p>
							<p>元宝发放：</p>
							<p>①已上数先于成交海报分享的，元宝于分享海报后次周工作日发放；已上数晚于成交海报分享的，元宝于已上数后次周工作日发放。</p>
							<p>②元宝统一发放至成功分享的成交海报上的成交人本人的成长系统账户。</p>
							<p>③元宝仅限有成长系统账户的置业顾问，没有成长系统账户的置业顾问均不发放。</p>
							<p>未尽事宜可详询活动主办方中原地产代理（深圳）有限公司。</p>
						</div>
					</div>
				</div>
				<div class="cjsB">
					<a class="cjsBtn" @click="showCj=false"></a>
				</div>
			</div>
		</nut-popup>	
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
		name: 'vcj',
		data(){
			return{
				header_token:{"token": uToken()},
				jjrNum:"",
				showCj:false
			}
		},
		watch:{
			// '$route' (to, from) {
			//    if (to.name === 'vcj') {
			// 	  this.getUser();
			//     }
			//  }
		},
		created() {
			Indicator.open();
		},
		mounted() {
			setTimeout(()=>{
				Indicator.close();
			},500)
			// this.getUser();
		},
		methods:{
			getUser(){
				Indicator.open();
				return new Promise((resolve)=>{
						this.$axios({
							method:"get",
							url:"/My/GetUserInfoV2?v="+Math.random()*10,
							headers:this.header_token
						})
						.then(res=>{
							console.log(res);
							resolve(res);
							if(res.data.code==0){
								this.jjrNum=res.data.data.EmpNo;
							}else{
								Toast(res.data.msg);
								if(res.data.code==500){
									localStorage.removeItem("userInfo");
									this.$router.push({name:"login"});
								}
							}
							setTimeout(()=>{
								Indicator.close();
							},300)
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

<style lang="less" scoped>
	.cjV{
		background-color: #5274d5;
		min-height: 100vh;
		width: 100%;
		.fcj{
			position: relative;
			img{
				display: block;
			}
			label.i-hd{
				position: absolute;
				top: 0;
				right: 0.2rem;
				display: block;
				width: 1.56rem;
				height: 0.88rem;
				background: url(../assets/static/icon-hd.png) center no-repeat;
				background-size: 100%;
			}
			.cShare{
				position: absolute;
				width: 100%;
				height: 1rem;
				left: 0;
				top: 7.4rem;
				.cbutton{
					display: block;width: 3.77rem;height: 0.89rem;background: url(../assets/static/cbtn.png) center no-repeat;background-size: 100%;
					position: absolute;left: 1.86rem;top: 0;
				}	
				.cpoint{
					background: url(../assets/static/ipoint.png) center no-repeat;background-size: 100%;display: block;width: 1.13rem;height: 1.14rem;
					position: absolute;
					left: 4.8rem;
					top: 0.2rem;
					animation: big 1s ease-in infinite forwards;
				}
				@keyframes big{
				  0%{transform: scale(0.9);}
				  100%{transform: scale(1);}
				}
				
			}
		}
		.popup-box{
			background: none;
		}
		.cjShow{
			width: 6.6rem;
			height: 9rem;
			.cjsT{
				height: 1.27rem;
				background: url(../assets/static/htop.png) center no-repeat;
				background-size: 100%;
			}
			.cjsC{
				height: 6rem;
				padding: 0 0.3rem;
				margin: -0.16rem 0 -0.14rem;
				.cjsMsg{
					background: #fff;
					height: 100%;
					padding: 0.2rem 0.3rem 0.3rem;
					color: #666;
					overflow: auto;
					font-size: 0.28rem;
					line-height: 1.5;
				}
			}
			.cjsB{
				height: 1.74rem;
				background: url(../assets/static/hbtom.png) center no-repeat;
				background-size: 100%;
				padding-top: 0.4rem;
				.cjsBtn{
					display: block;
					width: 3.77rem;
					height: 0.89rem;
					background: url(../assets/static/hbtn.png) center no-repeat;
					background-size: 100%;
					margin: 0 auto;
				}
			}
		}
	}
</style>
