<template>
	<div class="way">
		<div class="wTop">
			<img src="../assets/img/eBan.png" width="100%"/>
			<div class="wTab">
				<div class="wt" :class="[select==2?'on':'','wt']" @click="select=2">
					<p>每日任务</p>
					<span></span>
				</div>
				<div class="wt" :class="[select==3?'on':'','wt']" @click="select=3">
					<p>福利任务</p>
					<span></span>
				</div>
				<div class="wt" :class="[select==4?'on':'','wt']" @click="select=4">
					<p>新手任务</p>
					<span></span>
				</div>
			</div>
		</div>
		<div class="wContent">
			<div class="tabC" v-if="select==2">
				<div class="clear newList">
					<img src="../assets/img/mrQ.png" class="nlT"/>
					<div class="newM">
						<h4>签到<span style="width: 1.5rem;">最高+35</span></h4>
						<label>每日1次</label>
					</div>
					<mt-button type="primary" class="nlBtn" @click="setSign" v-if="nowSign==false">签到</mt-button>
					<mt-button type="primary" class="nlBtn" style="opacity: 0.6;"  v-else>已签到</mt-button>
				</div>
				<div class="clear newList">
					<img src="../assets/img/task-wx.png" class="nlT"/>
					<div class="newM">
						<h4>转发【深圳中原】文章<span>+20</span> </h4>
						<label>每日1次</label><label>每月x6次</label>
					</div>
					<mt-button type="primary" class="nlBtn" @click="$router.push({name:'days',params:{id:'33'}})">如何完成</mt-button>
				</div>
<!-- 				<div class="clear newList">
					<img src="../assets/img/mr9.png" class="nlT"/>
					<div class="newM nDay">
						<h4>签订业主独家委托<span>最高+200</span></h4>
						<label>不限次数</label>
					</div>
					<mt-button type="primary" class="nlBtn" @click="$router.push({name:'days',params:{id:'9'}})">如何完成</mt-button>
				</div>
				<div class="clear newList">
					<img src="../assets/img/mr8.png" class="nlT"/>
					<div class="newM nDay">
						<h4>签订业主委托<span>最高+150</span></h4>
						<label>不限次数</label>
					</div>
					<mt-button type="primary" class="nlBtn" @click="$router.push({name:'days',params:{id:'8'}})">如何完成</mt-button>
				</div> -->
				<div class="clear newList">
					<img src="../assets/img/mr7.png" class="nlT"/>
					<div class="newM nDay">
						<h4>成功约拍房源VR实勘<span>最高+100</span></h4>
						<label>不限次数</label>
					</div>
					<mt-button type="primary" class="nlBtn" @click="$router.push({name:'days',params:{id:'7'}})">如何完成</mt-button>
				</div>
				<div class="clear newList">
					<img src="../assets/img/mr5.png" class="nlT"/>
					<div class="newM nDay">
						<h4>成功发布新房点评<span>+5</span></h4>
						<label>每日1次</label>
					</div>
					<mt-button type="primary" class="nlBtn" @click="$router.push({name:'days',params:{id:'5'}})">如何完成</mt-button>
				</div>
				<div class="clear newList">
					<img src="../assets/img/mr4.png" class="nlT"/>
					<div class="newM nDay">
						<h4>开盘<span>+10</span></h4>
						<label>每日x3次</label><label>每月x15次</label>
					</div>
					<mt-button type="primary" class="nlBtn" @click="$router.push({name:'days',params:{id:'4'}})">如何完成</mt-button>
				</div>
				<div class="clear newList">
					<img src="../assets/img/mr6.png" class="nlT"/>
					<div class="newM nDay">
						<h4>成功约拍房源图片实勘<span>+15</span></h4>
						<label>不限次数</label>
					</div>
					<mt-button type="primary" class="nlBtn" @click="$router.push({name:'days',params:{id:'6'}})">如何完成</mt-button>
				</div>
				<div class="clear newList">
					<img src="../assets/img/mr1.png" class="nlT"/>
					<div class="newM nDay">
						<h4>成功录入新客源<span>+10</span></h4>
						<label>每日x3次</label><label>每月x15次</label>
					</div>
					<mt-button type="primary" class="nlBtn" @click="$router.push({name:'days',params:{id:'1'}})">如何完成</mt-button>
				</div>
				<div class="clear newList">
					<img src="../assets/img/mr2.png" class="nlT"/>
					<div class="newM nDay">
						<h4>成功带客户看房<span>+10</span></h4>
						<label>每日x3次</label><label>每月x15次</label>
					</div>
					<mt-button type="primary" class="nlBtn" @click="$router.push({name:'days',params:{id:'2'}})">如何完成</mt-button>
				</div>
				<!-- 		<div class="newList">
							<img src="../assets/img/mr3.png" class="nlT"/>
							<div class="newM">
								<h4>收录房源钥匙<span>+10</span></h4>
								<p>每日数量不限，多收多得</p>
							</div>
							<mt-button type="primary" class="nlBtn" @click="$router.push({name:'days',params:{id:'3'}})">如何完成</mt-button>
						</div> -->
			</div>
			
			<div class="tabC tabFl" v-else-if="select==3">
				<div class="clear newList">
					<img src="../assets/img/fl-xx.png" class="nlT"/>
					<div class="newM">
						<h4>经纪人学习考试</h4>
						<p>完成培训课程学习</p>
						<label>月任务</label>
					</div>
					<mt-button type="primary" class="nlBtn" @click="$router.push({name:'goods',params:{id:'8'}})">如何完成</mt-button>
				</div>
				<div class="clear newList" @click="$router.push({name:'goods',params:{id:'7'}})">
					<img src="../assets/img/tj-xz.png" class="nlT"/>
					<div class="newM">
						<h4>推荐App下载<span>+100</span></h4>
						<p>推荐客户下载中原找房App</p>
						<label>月任务</label>
					</div>
					<mt-button type="primary" class="nlBtn" @click="$router.push({name:'days',params:{id:'1'}})">如何完成</mt-button>
				</div>
				<div class="clear newList">
					<img src="../assets/img/fl-jt.png" class="nlT"/>
					<div class="newM">
						<h4>400接听小能手<span>+50</span></h4>
						<p>进线接听率≥90%获得元宝奖励</p>
						<label>月任务</label>
					</div>
					<mt-button type="primary" class="nlBtn" @click="$router.push({name:'goods',params:{id:'2'}})">如何完成</mt-button>
				</div>
				<div class="clear newList">
					<img src="../assets/img/fl-wl.png" class="nlT"/>
					<div class="newM">
						<h4>微聊应答小能手<span>+50</span></h4>
						<p>2分钟应答率≥80%获得元宝奖励</p>
						<label>月任务</label>
					</div>
					<mt-button type="primary" class="nlBtn" @click="$router.push({name:'goods',params:{id:'3'}})">如何完成</mt-button>
				</div>
				<div class="clear newList" @click="$router.push({name:'historys',params:{id:'3'}})">
					<img src="../assets/img/fl-cj.png" class="nlT"/>
					<div class="newM">
						<h4>开单成交<span style="width: 1.5rem;margin-right: 0;">最高+600</span></h4>
						<p>租房二手房成交都可获得</p>
						<label>月x5次</label>
					</div>
					<mt-button type="primary" class="nlBtn" @click="$router.push({name:'days',params:{id:'1'}})">如何完成</mt-button>
				</div>
<!-- 				<div class="clear newList">
					<img src="../assets/img/fl-xz.png" class="nlT"/>
					<div class="newM">
						<h4>App推广达人活动<span>+888</span></h4>
						<p>推广达人获得元宝奖励</p>
						<label>月任务</label>
					</div>
					<mt-button type="primary" class="nlBtn" @click="$router.push({name:'goods',params:{id:'6'}})">如何完成</mt-button>
				</div> -->
				<div class="clear newList">
					<img src="../assets/img/fl-yx.png" class="nlT"/>
					<div class="newM">
						<h4>网络英雄活动<span>+1000</span></h4>
						<p>成交达人获得元宝奖励</p>
						<label>月任务</label>
					</div>
					<mt-button type="primary" class="nlBtn" @click="$router.push({name:'goods',params:{id:'5'}})">如何完成</mt-button>
				</div>
				
				<div class="clear newList" @click="$router.push({name:'goods',params:{id:'1'}})">
					<img src="../assets/img/tj-tj.png" class="nlT"/>
					<div class="newM">
						<h4>获得中原好房推荐<span>+50</span></h4>
						<p>房源被推荐为中原好房</p>
						<label>每日x1次</label><label>每月x3次</label>
					</div>
					<mt-button type="primary" class="nlBtn" @click="$router.push({name:'days',params:{id:'1'}})">如何完成</mt-button>
				</div>
				<div class="clear newList" @click="$router.push({name:'goods',params:{id:'4'}})">
					<img src="../assets/img/tj-zd.png" class="nlT"/>
					<div class="newM">
						<h4>优质新房点评<span>+15</span></h4>
						<p>新房点评被评优置顶</p>
						<label>不限次数</label>
					</div>
					<mt-button type="primary" class="nlBtn" @click="$router.push({name:'days',params:{id:'1'}})">如何完成</mt-button>
				</div>
			</div>
			
			<div class="tabC" v-else-if="select==4">
				<div class="clear newList">
					<img src="../assets/img/task-wx.png" class="nlT"/>
					<div class="newM">
						<h4>关注公众号</h4>
						<p><span>+30</span></p>
					</div>
					<mt-button type="primary" class="nlBtn" @click="$router.push({name:'days',params:{id:'32'}})">如何完成</mt-button>
				</div>
				<div class="clear newList">
					<img src="../assets/img/sl1.png" class="nlT"/>
					<div class="newM">
						<h4>上传头像</h4>
						<p><span>+10</span></p>
					</div>
					<mt-button type="primary" class="nlBtn nlBtns" v-if="task1.NewTaskStatus==1" @click="getScore(task1.SecondQuDaoCode)">领取奖励</mt-button>
					<mt-button type="primary" disabled class="nlBtn" v-else-if="task1.NewTaskStatus==2">领取成功</mt-button>
					<mt-button type="primary" class="nlBtn" @click="$router.push({name:'news',params:{id:'1'}})" v-else>如何完成</mt-button>
				</div>
				<div class="clear newList">
					<img src="../assets/img/sl2.png" class="nlT"/>
					<div class="newM">
						<h4>填写店铺资料</h4>
						<p><span>+10</span></p>
					</div>
					<mt-button type="primary" class="nlBtn nlBtns" v-if="task2.NewTaskStatus==1" @click="getScore(task2.SecondQuDaoCode)">领取奖励</mt-button>
					<mt-button type="primary" disabled class="nlBtn" v-else-if="task2.NewTaskStatus==2">领取成功</mt-button>
					<mt-button type="primary" class="nlBtn" @click="$router.push({name:'news',params:{id:'2'}})" v-else>如何完成</mt-button>
				</div>
				<div class="clear newList">
					<img src="../assets/img/sl3.png" class="nlT"/>
					<div class="newM">
						<h4>发布第一套租房房源</h4>
						<p><span>+20</span></p>
					</div>
					<mt-button type="primary" class="nlBtn nlBtns" v-if="task3.NewTaskStatus==1" @click="getScore(task3.SecondQuDaoCode)">领取奖励</mt-button>
					<mt-button type="primary" disabled class="nlBtn" v-else-if="task3.NewTaskStatus==2">领取成功</mt-button>
					<mt-button type="primary" class="nlBtn" @click="$router.push({name:'news',params:{id:'3'}})" v-else>如何完成</mt-button>
				</div>
				<div class="clear newList">
					<img src="../assets/img/sl4.png" class="nlT"/>
					<div class="newM">
						<h4>发布第一套二手房源</h4>
						<p><span>+30</span></p>
					</div>
					<mt-button type="primary" class="nlBtn nlBtns" v-if="task4.NewTaskStatus==1" @click="getScore(task4.SecondQuDaoCode)">领取奖励</mt-button>
					<mt-button type="primary" disabled class="nlBtn" v-else-if="task4.NewTaskStatus==2">领取成功</mt-button>
					<mt-button type="primary" class="nlBtn" @click="$router.push({name:'news',params:{id:'4'}})" v-else>如何完成</mt-button>
				</div>
				<div class="clear newList">
					<img src="../assets/img/sl8.png" class="nlT"/>
					<div class="newM">
						<h4>首次发布门店主打小区房源</h4>
						<p><span>+30</span></p>
					</div>
					<mt-button type="primary" class="nlBtn nlBtns" v-if="task8.NewTaskStatus==1" @click="getScore(task8.SecondQuDaoCode)">领取奖励</mt-button>
					<mt-button type="primary" disabled class="nlBtn" v-else-if="task8.NewTaskStatus==2">领取成功</mt-button>
					<mt-button type="primary" class="nlBtn" @click="$router.push({name:'news',params:{id:'8'}})" v-else>如何完成</mt-button>
				</div>	
				<div class="clear newList">
					<img src="../assets/img/sl5.png" class="nlT"/>
					<div class="newM">
						<h4>首次发布热门成交小区房源</h4>
						<p><span>+30</span></p>
					</div>
					<mt-button type="primary" class="nlBtn nlBtns" v-if="task5.NewTaskStatus==1" @click="getScore(task5.SecondQuDaoCode)">领取奖励</mt-button>
					<mt-button type="primary" disabled class="nlBtn" v-else-if="task5.NewTaskStatus==2">领取成功</mt-button>
					<mt-button type="primary" class="nlBtn" @click="$router.push({name:'news',params:{id:'5'}})" v-else>如何完成</mt-button>
				</div>
		<!-- 		<div class="newList">
					<img src="../assets/img/sl6.png" class="nlT"/>
					<div class="newM">
						<h4>房源第一次被设为中原好房<span>+50</span></h4>
						<p>发布的房源第一次被设为中原好房</p>
					</div>
					<mt-button type="primary" class="nlBtn nlBtns" v-if="task6.NewTaskStatus==1" @click="getScore(task6.SecondQuDaoCode)">领取奖励</mt-button>
					<mt-button type="primary" disabled class="nlBtn" v-else-if="task6.NewTaskStatus==2">领取成功</mt-button>
					<mt-button type="primary" class="nlBtn" @click="$router.push({name:'news',params:{id:'6'}})" v-else>如何完成</mt-button>
				</div> -->
				<div class="clear newList">
					<img src="../assets/img/sl7.png" class="nlT"/>
					<div class="newM">
						<h4>发布第一套独家委托房源</h4>
						<p><span>+30</span></p>
					</div>
					<mt-button type="primary" class="nlBtn nlBtns" v-if="task7.NewTaskStatus==1" @click="getScore(task7.SecondQuDaoCode)">领取奖励</mt-button>
					<mt-button type="primary" disabled class="nlBtn" v-else-if="task7.NewTaskStatus==2">领取成功</mt-button>
					<mt-button type="primary" class="nlBtn" @click="$router.push({name:'news',params:{id:'7'}})" v-else>如何完成</mt-button>
				</div>	
			</div>
			
		</div>
		<foot tab3='1'></foot>
		
		<!-- 回馈活动弹窗-->
			<div class="hkShow">
				<div class="hkbj" v-if="moduleNum>-1" @click="moduleNum=-1"></div>
				<Module :showOn="moduleNum" :prizeName="prizeName" @changeNum="changeModule"></Module>
			</div>
			<!-- 领取成功弹窗 -->
			<div class="hkShow" :class="addCar?'animationCar':''">
				<div class="hkbj" v-if="addCar" @click="addCar=false"></div>
				<div class="giveMsg" @click="$router.push({'name':'myPrize'})">
				</div>
			</div>
		
	</div>
</template>

<script>
	import Vue from 'vue';

	// 京东框架2.X
	import nutUI from '@nutui/nutui/dist/nutui.min.js';  // 加载构建后的JS
	import '@nutui/nutui/dist/nutui.min.css';  //加载构建后的CSS
	nutUI.install(Vue);
	import Module from '@/components/module.vue'
	
	
	import { Toast,Indicator } from 'mint-ui';
	import {
	  uToken,
	} from "@/global/token.js";
	import Foot from '@/components/foot.vue'
	export default{
		name: 'way',
		data(){
			return{
				userInfo:"",
				select:2,
				header_token:{"token": uToken()},
				newList:"",
				task1:"",
				task2:"",
				task3:"",
				task4:"",
				task5:"",
				task6:"",
				task7:"",
				task8:"",
				nowSign:false,
				
				addCar:false,
				moduleNum:-1,
				prize:"",
				prizeName:"45元礼包",
				runNum:Math.random(),
				prizeId:""
			}
		},
		mounted(){
			document.title="赚取";
			this.getTask();
			this.getSign();
			if(this.$route.params.tab){
				this.select=this.$route.params.tab;
			}
			if(this.runNum<0.3){
				this.getPrize()
			}
		},
		components: {
		  Foot,
			Module
		},
		methods:{
			// 经纪人回馈活动中奖查询
			getPrize(){
				return new Promise((resolve)=>{
						this.$axios({
							method:"get",
							url:"/Activity/ShowPrize?v="+Math.random()*10,
							headers:this.header_token,
						})
						.then(res=>{
							console.log(res);
							resolve(res);
							if(res.data.code==0&&res.data.data.code==0){
								this.prize=res.data.data.data;
								this.prizeId=res.data.data.data.Id;
								if(res.data.data.data.Type==2){
									this.prizeName=res.data.data.data.PrizeName;
								}
								this.setModule(res.data.data.data.Type);
							}
						})
						.catch(error=>{
							this.$toast.text("网络错误，请稍后再试");
						})
				})
			},
			givePrize(){
				return new Promise((resolve)=>{
						this.$axios({
							method:"post",
							url:"/Activity/ReceivePrize",
							headers:this.header_token,
							data:{
								id:this.prizeId
							}
						})
						.then(res=>{
							console.log(res);
							if(res.data.data.code==0){
								resolve(res);
							}else{
								this.$toast.text(res.data.data.msg);
								// 新增未成功关闭弹窗
								this.moduleNum=-1;
							}
						})
						.catch(error=>{
							this.$toast.text("网络错误，请稍后再试");
							// 新增未成功关闭弹窗
							this.moduleNum=-1;
						})
				})
			},
			setModule(n){
				this.moduleNum=n
			},
			async changeModule(n){
				await this.givePrize();
				if(n==2){
					setTimeout(()=>{
						this.moduleNum=-1;
						this.addCar=true;
					},1200)
				}else if(n==3){
					setTimeout(()=>{
						this.moduleNum=-1;
						this.addCar=true;
					},500)
				}else{
					this.moduleNum=-1;
					this.addCar=true;
				}
				
			},
			
			getSign(){
				return new Promise((resolve)=>{
						this.$axios({
							method:"get",
							url:"/My/GetSignList?v="+Math.random()*10,
							headers:this.header_token
						})
						.then(res=>{
							console.log(res);
							resolve(res);
							if(res.data.code==0){
								this.nowSign=res.data.data.IsTodaySigned
							}else{
								Toast(res.data.msg);
								if(res.data.code==500){
									localStorage.removeItem("userInfo");
									this.$router.push({name:"login"});
								}
							}
						})
						.catch(error=>{
							Indicator.close();
							Toast("网络错误，请稍后再试");
						})
				})
			},
			setSign(){
				return new Promise((resolve)=>{
						this.$axios({
							method:"post",
							url:"/My/Sign",
							headers:this.header_token
						})
						.then(res=>{
							console.log(res);
							resolve(res);
							if(res.data.code==0){
								if(res.data.data.IsSuccess){
									Toast('签到成功~');
									this.getSign();
								}else{
									Toast(res.data.data.Reamark);
								}
							}else{
								Toast(res.data.msg);
							}
						})
						.catch(error=>{
							Toast("网络错误，请稍后再试");
						})
				})
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
								Toast(res.data.msg);
								if(res.data.code==500){
									localStorage.removeItem("userInfo");
									this.$router.push({name:"login"});
								}
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
								Toast(res.data.msg);
							}
						})
						.catch(error=>{
							Toast("网络错误，请稍后再试");
						})
				})
			},
			toastTip(){
				Toast('功能待开放~');
			},
		}
	}
</script>

<style scoped>
	.way{padding: 0 0 1.2rem;background-color: #F5f5f5;}
	.wTop{position: relative;height: 3.84rem;}
	.wTab{display: flex;justify-content: space-between;height: 1.2rem;width: 100%;background-color: #fff;border-top-left-radius: 0.4rem;border-top-right-radius: 0.4rem;position: absolute;bottom: -0.4rem;left: 0;padding-top: 0.4rem;font-size: 0.32rem;}
	.wt{flex: 1;text-align: center;}
	.wt p{line-height: 1;}
	.wTab .on{font-size: 0.36rem;color: #F4472D;position: relative;top: -3px;}
	.wTab .on span{display: inline-block;width: 1.42rem;height: 0.13rem;background: url(../assets/img/w-line.png) center no-repeat;background-size: 100%;position: relative;top: -5px;}
	
	.wContent{padding: 0.8rem 0.3rem;}
	.nlT{width: 0.8rem;float: left;margin-top: 0.1rem;}
	.newList{padding: 0.4rem 0.2rem;background-color: #fff;position: relative;box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.1);border-radius: 0.1rem;margin-bottom: 0.3rem;}
	.newM{width: 5.4rem;float: left;margin-left: 0.2rem;}
	.newM h4{font-size: 0.32rem;color: #333;margin-bottom: 0.16rem;font-weight: 500;line-height: 1;}
	.newM h4 span,.newM p span{position: relative;top: -2px;font-weight: 400;font-size: 0.24rem; display: inline-block;width: 0.86rem;height: 0.38rem;line-height: 0.38rem;padding-left: 0.42rem;background: url(../assets/img/icon-syb.png) left center no-repeat;background-size: 0.38rem;margin-left: 0.14rem;color: #F3260C;}
	.nDay h4{margin-bottom: 0.24rem;}
	.nDay h4 span{width: 2rem;}
	.tabFl h4 span{float: right;margin-right: 0.2rem;margin-top: 0.1rem;}
	.newM p span{margin-left: 0;top: 0;}
	.newM p{font-size: 0.24rem;color: #999;margin-bottom: 0.1rem;min-height: 0.2rem;}
	.newM label{background-color: #EEEEEE;padding: 2px 5px;font-size: 0.24rem;color: #666;border-radius: 2px;margin-right: 0.2rem;}
	.nlBtn{
		position: absolute;
		bottom: 0.4rem;
		right: 0.2rem;
		width:1.7rem;
		height:0.6rem;
		background:#F4472D;
		border-radius:0.4rem;
		font-size: 0.28rem;
		padding: 0;
	}
	
	.nlBtns{
		background:#FFBE00;
	}
	button.nlBtn[disabled]{background: #CCCCCC;}
</style>
