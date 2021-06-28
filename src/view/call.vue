<template>
	<div class="call">
		<div class="callC">
			<div class="callTx">
				<label>
					<img :src="'https://pic.centanet.com/shenzhen/pic/agent/'+user.EmpNo+'.jpg'" onerror="this.src='https://sz.centanet.com/partner/house/userImg/tx_none.png'"/>
				</label>
			</div>
			<h3>{{user.EmpCnName}}</h3>
			<div class="callLabel">
				<label>靠谱负责</label>
				<label>值得信赖</label>
				<label>沟通顺畅</label>
			</div>
			<div class="callBtn">
				<a :href="'tel:'+user.Mobile" ref="phone">电话咨询</a>
			</div>
			
		</div>
	</div>
</template>

<script>
	import { Toast,Indicator } from 'mint-ui';
	export default{
		name: 'call',
		data(){
			return{
				userNum:"",
				mobile:"",
				user:{EmpCnName:"",Mobile:""},
				ptype:""
			}
		},
		created() {
			if(this.$route.query.empNo){
				this.userNum=this.$route.query.empNo;
				this.ptype=this.$route.query.p;
				this.getInfo();
			}else if(this.$route.query.EmpCnName){
				this.user.EmpCnName=decodeURIComponent(this.$route.query.EmpCnName.toString())
				this.user.Mobile=this.$route.query.Mobile
				setTimeout(()=>{
					this.$refs.phone.click();
				},500)
			}
			document.title="中原找房-电话咨询";
		},
		mounted(){
			
		},
		filters:{

		},
		methods:{
			getInfo(){
				return new Promise((resolve)=>{
						this.$axios({
							method:"get",
							url:"/Poster/GetEmpCall",
							params:{
								empNo:this.userNum,
								p:this.ptype
							}
						})
						.then(res=>{
							console.log(res);
							if(res.data.code==0){
								this.user=res.data.data;
								console.log(this.user.Mobile)
								setTimeout(()=>{
									this.$refs.phone.click();
								},1000)
							}else{
								Toast(res.data.msg);
							}
							Indicator.close();
							resolve(res);
						})
						.catch(error=>{
							Indicator.close();
							Toast("网络错误，请稍后再试");
						})
				})
				setTimeout(()=>{
					Indicator.close()
				},500)
			},

		}
	}
</script>

<style>
.call{
	height: 100vh;
	width: 100%;
	background: url(../assets/img/callBj.png) left top no-repeat;
	background-size: 100%;
}
.callC{width: 4.8rem;height: 5.2rem;background-color: #fff;position: fixed;top: 50%;left: 50%;margin: -2.6rem 0 0 -2.4rem;text-align: center;box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.5);border-radius: 0.1rem;}
.callTx label{display: inline-block;width: 1.4rem;height: 1.4rem;overflow: hidden;border-radius: 50%;position: relative;top: -0.6rem;}
.callTx img{width: 1.4rem;}
.call h3{font-size: 0.48rem;margin-top: -0.5rem;margin-bottom: 0.4rem;}
.callLabel label{display: inline-block;width: 1.1rem;height: 0.4rem;line-height: 0.38rem;text-align: center;border: 1px solid #FF2D19;color: #FF2D19;font-size: 0.24rem;margin: 0 0.18rem;border-radius: 0.05rem;}
.callBtn{margin-top: 0.8rem;text-align: center;}
.callBtn a{display: inline-block;width: 3.9rem;height: 0.8rem;background: linear-gradient(134deg, #FB6F52 0%, #F3240A 100%);border-radius: 0.4rem;line-height: 0.8rem;color: #fff;font-size: 0.36rem;font-weight: 600;}
</style>