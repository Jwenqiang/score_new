<template>
	<div class="yb record">
		<div class="ybTop">
			<div class="ybNum">
				<p>元宝余额</p>
				<img src="../assets/img/icon-syb.png" />
				<span>{{ybNum}}</span>
			</div>
			<div class="ybTab">
				<div :class="[isHover=='0'?'hover':'','ybC','rdC']" @click="changeTab('0')">
					<p>全部</p>
				</div>
				<div :class="[isHover=='1'?'hover':'','ybC']" @click="changeTab('1')">
					<p>首页</p>
				</div>
				<div :class="[isHover=='3'?'hover':'','ybC']" @click="changeTab('3')">
					<p>区域</p>
				</div>
				<div :class="[isHover=='5'?'hover':'','ybC']" @click="changeTab('5')">
					<p>学校</p>
				</div>
				<div :class="[isHover=='4'?'hover':'','ybC']" @click="changeTab('4')">
					<p>小区</p>
				</div>
				<div :class="[isHover=='2'?'hover':'','ybC']" @click="changeTab('2')">
					<p>经纪人</p>
				</div>
			</div>
			<div class="yb-tj">
				<label :class="select==1?'on':''" @click="select=1">当天</label>
				<label :class="select==2?'on':''" @click="select=2">近3天</label>
				<label :class="select==3?'on':''" @click="select=3">近7天</label>
				<label :class="select==0?'on':''" @click="showTj">更多</label>
			</div>
		</div>
			<div>
				<div class="ybAll" v-if="ybList.length>0">
					<div class="oneDay" v-for="item in ybList">
						<div style="padding: 0 0.3rem;">
							<div class="clear allT">
								<label class="atDate">
									{{item.GroupDate}}
								</label>
<!-- 								<span>
									收入：{{item.ShouRu}}元宝 &nbsp;&nbsp;&nbsp; 支出：{{item.ZhiChu}}元宝
								</span> -->
							</div>
							<div class="clear ybList" v-for="itemC in item.DetailList">
								<div class="clear ybl">
<!-- 									<img src="../assets/img/icon-sy.png" class="ybImg" v-if="itemC.AdType=='1'"/>
									<img src="../assets/img/icon-jjr.png" class="ybImg" v-else-if="itemC.AdType=='2'"/>
									<img src="../assets/img/icon-qy.png" class="ybImg" v-else-if="itemC.AdType=='3'"/>
									<img src="../assets/img/icon-xq.png" class="ybImg" v-else-if="itemC.AdType=='4'"/> -->
									<div style="float: left;width: 5.8rem;">
										<h5>
											<label v-if="itemC.CompeteFlagLabel=='未开标'">{{itemC.CompeteFlagLabel}}</label><label class="wzb" v-else-if="itemC.CompeteFlagLabel=='未中标'">{{itemC.CompeteFlagLabel}}</label><label class="yzb" v-else-if="itemC.CompeteFlagLabel=='已中标'">{{itemC.CompeteFlagLabel}}</label> 
											<span>{{itemC.PropName}}</span> 
										</h5>
										<h6>{{itemC.AdPlaceName}}·{{itemC.AdPosition}}·{{itemC.AdName}}</h6>
										<p style="margin-bottom: 0.1rem;">竞拍时间：{{itemC.CompleteTime}}</p>
										<p>展示时间：{{itemC.ShowTime}}</p>
									</div>
								</div>
								<div class="ybr">
									<strong style="color: #5084DD;">-{{itemC.BuyYuanBao}}</strong>
									<img src="../assets/img/icon-syb.png" class="ic"/>
									<p style="font-size: 0.24rem;" v-if="itemC.CompeteFlagLabel=='未中标'">(元宝已退回)</p>
								</div>
							</div>
						</div>
						<div class="lineA"></div>
					</div>
					<p style="font-size: 0.24rem;color: #ccc;line-height: 1rem;text-align: center;" @click="pSize+=10" v-if="count>pSize">—— 点击查看更多 ——</p>
				</div>
				<div class="noYb" v-else>暂无竞拍记录，快去抢拍吧~</div>
			</div>
<!-- 			<div v-if="isHover=='2'">
				<div class="ybAll" v-if="ybList.length>0">
					<div class="clear ybList" v-for="item in ybList">
						<div class="ybl">
							<h5>{{item.ChangeReason}}</h5>
							<p>{{item.CreateTime}}</p>
						</div>
						<div class="ybr">
							<strong>{{item.AddYuanBao}}</strong>
							<img src="../assets/img/iyb.png" class="ic"/>
						</div>
					</div>
					<p style="font-size: 0.24rem;color: #ccc;line-height: 1rem;text-align: center;" @click="pSize+=10" v-if="count>pSize">—— 点击查看更多 ——</p>
				</div>
				<div class="noYb" v-else>元宝可兑换超值权益哦，快去看看吧~</div>
			</div>	 -->
					
					<div class="showModel modelMsg" v-if="show">
					  <div class="bj" @click="show=false"></div>
					  <div class="showMsg">
						<p class="clear">
							<label>开始日期：</label>
							<span @click="openPicker1">
								{{startTime}}
							</span>
						</p>
						<p class="clear">
							<label>截止日期：</label>
							<span @click="openPicker2">
								{{endTime}}
							</span>
						</p>
						<div class="searchYb">
							<button @click="getYb()">确定</button>
						</div>
					  </div>
					</div>
					<mt-datetime-picker
					ref="picker1"
					  type="date"
					  year-format="{value} 年"
					  month-format="{value} 月"
					  date-format="{value} 日" 
					  :start-date='start'
					  :end-date='end'
					  @confirm="handleConfirm1">
					</mt-datetime-picker>
					<mt-datetime-picker
					ref="picker2"
					  type="date"
					  year-format="{value} 年"
					  month-format="{value} 月"
					  date-format="{value} 日" 
					  :start-date='start'
					  :end-date='end'
					  @confirm="handleConfirm2">
					</mt-datetime-picker>
	</div>
</template>

<script>
	import Vue from 'vue'
	import { Toast,Indicator } from 'mint-ui';
	import {
	  uToken,
	} from "@/global/token.js";
	import { DatetimePicker } from 'mint-ui';
	Vue.component(DatetimePicker.name, DatetimePicker);
	export default{
		name: 'record',
		data(){
			return{
				header_token:{"token": uToken()},
				isHover:'0',
				isSuo:true,
				ybList:"",
				pSize:10,
				count:"",
				ybNum:"0",
				select:1,
				show:false,
				taskList:[
					{code:'',val:'全部'},
					{code:'XSRW',val:'新手任务'},
					{code:'MRRW',val:'每日任务'},
					{code:'FLRW',val:'福利任务'},
					{code:'DHZWRW1',val:'二手房广告位'},
					{code:'DHZWRW2',val:'经纪人广告位'},
					{code:'RGDR',val:'人工导入'},
					{code:'QD',val:'签到'},
					{code:'FWNX',val:'服务年限'},
					{code:'LSCJ',val:'历史成交'},
					{code:'NEWCJ',val:'新规成交'}
				],
				startTime:"",
				startNum:"",
				endNum:"",
				endTime:"",
				start:new Date('2020/01/01'),
				end:new Date(),
				taskVal:""
			}
		},
		mounted(){
			document.title="竞拍记录";
			this.getNowDate();
			this.getDay(0);//当天时间
			this.getYb();
			this.setLog();
		},
		components: {
			
		},
		watch:{
			pSize(){
				this.getYb();
			},
			select(newV,oldV){
				if(newV>0){
					if(newV==1){
						this.getDay(0)
						this.getYb();
					}else if(newV==2){
						this.getDay(-2)//前两天
						this.getYb();
					}else if(newV==3){
						this.getDay(-6)//前6天
						this.getYb();
					}
				}
			}
		},
		methods:{
			setLog(){
				return new Promise((resolve)=>{
						this.$axios({
							method:"post",
							url:"/Task/FinishDayTaskAsync",
							headers:this.header_token,
							data:{
								ViewTarget:"CompeteRecord",
								 ViewValue:""
							}
						})
						.then(res=>{
							resolve(res);
						})
				})
			},
			getNowDate(){//获取当前时间
				var value=new Date();
				var year = value.getFullYear(); 
				var month = value.getMonth() + 1;
				var date = value.getDate();
				if(month.toString().length == 1){
					month ='0'+month
				}
				if(date.toString().length == 1){
					date ='0'+date
				}
				this.endTime = year +"-"+month+ "-"+date; 
				this.endNum=new Date().getTime()
			},
			getDay(day){
			    var today = new Date();
			    var targetday_milliseconds=today.getTime() + 1000*60*60*24*day;
			    today.setTime(targetday_milliseconds); //注意，这行是关键代码
			    var tYear = today.getFullYear();
			    var tMonth = today.getMonth();
			    var tDate = today.getDate();
			    tMonth =this.doHandleMonth(tMonth + 1);
			    tDate = this.doHandleMonth(tDate);
				this.startTime=tYear+"-"+tMonth+"-"+tDate;
				this.startNum=new Date(this.startTime)
			    return tYear+"-"+tMonth+"-"+tDate;
			},
			doHandleMonth(month){
			    var m = month;
			    if(month.toString().length == 1){
			     m = "0" + month;
			    }
			    return m;
			},
			openPicker1() {
			        this.$refs.picker1.open();
			      },
			openPicker2() {
			        this.$refs.picker2.open();
			      },	
			handleConfirm1(value){
				this.startNum=value.getTime();
				if(this.endNum<this.startNum){
					Toast("开始时间不能大于截止时间")
					return;
				}
				var year = value.getFullYear(); 
				var month = value.getMonth() + 1;
				var date = value.getDate();
				if(month.toString().length == 1){
				 month = "0" + month;
				}
				if(date.toString().length == 1){
				 date = "0" + date;
				}
				this.startTime = year +"-"+month+ "-"+date 
			},	
			handleConfirm2(value){
				this.endNum=value.getTime();
				if(this.endNum<this.startNum){
					Toast("截止时间不能少于开始时间")
					return;
				}
				var year = value.getFullYear(); // 年月日都需要在 data中定义
				var month = value.getMonth() + 1;
				var date = value.getDate();
				if(month.toString().length == 1){
				 month = "0" + month;
				}
				if(date.toString().length == 1){
				 date = "0" + date;
				}
				this.endTime = year +"-"+month+ "-"+date 
			},	
			changeTab(n){
				this.isHover=n;
				this.pSize=10;
				this.getYb();
			},
			getYb(t){
				Indicator.open();
				this.ybList='';
				this.show=false;
				return new Promise((resolve)=>{
						this.$axios({
							method:"get",
							url:"/My/GetAdPositionCompeteGroupDetails",
							headers:this.header_token,
							params:{
								adType:this.isHover,
								pageSize:this.pSize,
								startTime:this.startTime,
								endTime:this.endTime,
								v:Math.random()*10
							}
						})
						.then(res=>{
							console.log(res);
							resolve(res);
							if(res.data.code==0){
								this.ybNum=res.data.data.YuanBaoEnable
								this.count=res.data.data.GroupList.RecordCount
								this.ybList=res.data.data.GroupList.DataList
							}else{
								Toast(res.data.message);
							}
							Indicator.close();
						})
						.catch(error=>{
							Indicator.close();
							Toast("网络错误，请稍后再试");
						})
				})
			},
			showTj(){
				this.select=0;
				this.show=true;
			},
			search(){
				this.show=false;
			}
		}
	}
</script>

<style scoped>
.yb{min-height: 100vh;background-color: #f5f5f5;padding: 0.3rem 0;}
	.ybAll{
		padding: 0.2rem 0;
	}
	.ybTop{
		height: 4rem;width: 6.9rem;padding-top: 0.5rem; margin: 0 0.3rem 0.2rem 0.3rem; background:#fff url(../assets/img/mybBj.png) left top no-repeat; background-size: 6.9rem;text-align: center;
		box-shadow: 0px 2px 6px 2px rgba(0, 0, 0, 0.06);
		border-radius: 0.2rem;
	}
	.ybNum p{color: #999;font-size: 0.26rem;}
	.ybTop span{font-weight: 500;font-size: 0.8rem;color: #F4472D;}
	.ybNum{width: 100%;text-align: center;height: 1.7rem;}
	.ybNum img{width: 0.6rem;margin-right: 0.08rem;}
	.ybTab{margin-top: 0.1rem;font-size: 0.4rem;font-weight: 400;display: flex;color: #333;height: 0.6rem;margin-bottom: 0.3rem;overflow-x: auto;}
	.ybC{flex: 1;text-align: center;}
	.ybTab .hover p{color: #F4472D;font-weight: 600;}
	.ybTab .hover span{
		display: inline-block;
		width:0px;
		height:0px;
		border-width:0.16rem;
		border-style:solid;
		border-color: transparent transparent #fff transparent;
		position: relative;
		top: 5px;
	}
	.ybList{padding: 0.24rem 0;font-size: 0.28rem;border-bottom: 1px solid #ddd;position: relative;}
	.oneDay .ybList:last-child{border: 0;}
	.record .ybl{width: 100%;color: #333;text-align: left;font-weight: 500;}
	.ybl h5{font-size: 0.28rem;margin-bottom: 0.1rem;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;}
	.ybl h6{font-size: 0.26rem;margin-bottom: 0.1rem;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;color: #666;}
	.ybl h5 label{padding: 2px 7px;background-color: #ccc;color: #fff;margin-right: 0.2rem;font-weight: 400;font-size: 0.24rem;}
	.ybl h5 label.wzb{background-color: #F4472D;}
	.ybl h5 label.yzb{background-color: #5084DD;}
	.ybl p{font-size: 0.24rem;color: #999;}
	.record .ybr{width: 2rem;padding-top: 0.1rem;font-size: 0.34rem;color: #F45048;font-weight: bold;text-align: right;position: absolute;right: 0;top: 0.7rem;}
	.ybr img{width: 0.29rem;margin: 0 0 0 0.12rem;}
	.ybr img.isuo{width: 0.24rem;}
	.suo strong{color: #999;}
	.ybr strong i{font-style: normal;}
	.noYb{width: 100%;margin: 0.6rem auto;padding-top:3.2rem;text-align: center;color: #999; background: url(../assets/img/noYb.png) center no-repeat;background-size: 3.54rem;font-size: 0.26rem;font-weight: 400;}
	.yb-tj label{display: inline-block;width: 1.2rem;height: 0.5rem;line-height: 0.5rem;text-align: center;background-color: #F0F5FA;color: #666;font-size: 0.26rem;border-radius: 3px;margin-right: 0.5rem;}
	.yb-tj label:last-child{margin: 0;}
	.yb-tj label.on{background-color: #FDECEA;color: #F4472D;}
	
	.showModel{
	  position: fixed;
	  width: 100%;
	  height: 100%;
	  z-index: 90;
	}
	.bj{position: fixed;background: #000;opacity: 0.5;width: 100%;height: 100%;left: 0;top: 0;z-index: 91;}
	.yb .showMsg{font-size: 16px; position: fixed;left: 50%;top: 50%;transform: translate(-50%,-50%);width: 6rem;height: 6rem; background: #fff;z-index: 92;padding: 0.6rem 0.5rem;border-radius: 8px;}
	.record .showMsg{height: 5rem;}
	.yb .showMsg p{margin-bottom: 0.6rem;color: #666;}
	.yb .showMsg p select{height: 0.6rem;width: 3rem;border: 1px solid #ededed;padding-left: 0.2rem;font-size: 0.3rem;outline: medium;background-color: #fff;position: relative;top: -0.06rem;}
	.searchYb{text-align: center;margin-top: 1rem;}
	.searchYb button{
		width: 3rem;
		height: 0.8rem;
		font-size: 0.3rem;
		background-color: #F4472D;
		border-radius: 3px;
		color: #fff;
	}
	.yb .showMsg p label{float: left;}
	.yb .showMsg p span{display: inline-block;height: 0.6rem;line-height: 0.6rem;width: 3rem;border: 1px solid #ededed;padding-left: 0.2rem;font-size: 0.3rem;position: relative;top: -0.06rem;}
	.yb .showMsg p span strong{font-weight: 400;}
	.allT{margin-bottom: 0.2rem;}
	.allT label{color: #666;float: left;}
	.allT span{float: right;color: #333;}
	.oneDay{padding: 0.1rem 0 0.2rem;}
	.ybAll .oneDay:last-child .lineA{display: none;}
	.lineA{height: 0.2rem;background-color: #EDEDED;width: 100%;}
	.record .ybTab{font-size: 0.36rem;}
	.rdC{flex: 0.8;}
	img.ybImg{width: 0.8rem;float: left;margin-right: 0.2rem;position: relative;top: 0.2rem;}
</style>
