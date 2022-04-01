<template>
	<div class="chxBox" v-show="ready" id="customHX">
		<div class="chx-top">
			<img src="images/custom/t-man.png" v-if="user.Gender==0"/><img src="images/custom/t-man.png" v-else-if="user.Gender==1"/><img src="images/custom/t-woman.png" v-else-if="user.Gender==2"/><img src="images/custom/t-none.png" v-else/>
			<div class="ccUser">
				<h4>{{user.UserTitle}}</h4>
				<p v-if="user.LastCusLevelName"><label v-if="user.Age>0">{{user.Age}}岁</label><label v-if="user.LastCusLevelName">{{user.LastCusLevelName}}</label><label v-if="user.LastCusTitleName">{{user.LastCusTitleName}}</label> </p>
				<p v-else><label>暂未跟进</label></p>
			</div>
		</div>
		<div class="chx-second">
			<div class="chxs" v-if="user.LastVisit">
				<label>最新足迹：</label>
				<p>
					<span><a v-if="user.LastVisitUrl" style="color: #333;">{{user.LastVisit}}</a> <template v-else>{{user.LastVisit}}</template></span>
					<i>{{user.LastVisitTime}}</i>
				</p>
			</div>
			<div class="chxs">
				<label>推荐回访：</label>
				<p v-if="user.VisitWeek&&user.VisitWeek.length>0||user.VisitTime&&user.VisitTime.length>0">
					<template v-if="user.VisitWeek&&user.VisitWeek.length>0">{{user.VisitWeek.join('/')}}，</template><template v-if="user.VisitTime&&user.VisitTime.length>0">{{user.VisitTime.join('/')}}</template>
				</p>
				<p v-else>暂无推荐</p>
			</div>
		</div>
		<div class="chx-content">
			<div class="chxc-tab">
				<label :class="ccType==1?'on':''" @click="changeTag(1)">详情<span></span></label>
				<label :class="ccType==2?'on':''" @click="changeTag(2)">足迹<span></span></label>
			</div>
			<!-- 画像 -->
			<template v-if="ccType==1">
				<div class="chxc-list">
					<p class="title">营销推荐</p>
					<div class="pli p-qy" v-if="user.FavSubArea&&user.FavSubArea.length>0">
						<label>推荐区域：</label>
						<div class="plBox">
							<span v-if="user.FavSubArea[0]"><i>1</i>{{user.FavSubArea[0]}}</span>
							<span v-if="user.FavSubArea[1]"><i>2</i>{{user.FavSubArea[1]}}</span>
							<span v-if="user.FavSubArea[2]"><i>3</i>{{user.FavSubArea[2]}}</span>
						</div>
					</div>
					<div class="pli p-fy" v-if="user.FavBusiness&&user.FavBusiness.length>0">
						<label>推荐房源：</label>
						<div class="plBox">
							<span v-if="user.FavBusiness[0]"><i>1</i>{{user.FavBusiness[0]}}</span>
							<span v-if="user.FavBusiness[1]"><i>2</i>{{user.FavBusiness[1]}}</span>
						</div>
					</div>
					<div class="pli p-es" v-if="user.FavErShouEstatename&&user.FavErShouEstatename.length>0">
						<label>推荐二手：</label>
						<div class="plBox">
							<span v-if="user.FavErShouEstatename[0]"><i>1</i>{{user.FavErShouEstatename[0]}}</span>
							<span v-if="user.FavErShouEstatename[1]"><i>2</i>{{user.FavErShouEstatename[1]}}</span>
							<span v-if="user.FavErShouEstatename[2]"><i>3</i>{{user.FavErShouEstatename[2]}}</span>
						</div>
					</div>
					<div class="pli p-xf" v-if="user.FavXinfangEstatename&&user.FavXinfangEstatename.length>0">
						<label>推荐新房：</label>
						<div class="plBox">
							<span v-if="user.FavXinfangEstatename[0]"><i>1</i>{{user.FavXinfangEstatename[0]}}</span>
							<span v-if="user.FavXinfangEstatename[1]"><i>2</i>{{user.FavXinfangEstatename[1]}}</span>
							<span v-if="user.FavXinfangEstatename[2]"><i>3</i>{{user.FavXinfangEstatename[2]}}</span>
						</div>
					</div>
					<div class="pli p-jg" v-if="user.ErshouPrice&&user.ErshouPrice.length>0">
						<label>推荐价格：</label>
						<div class="plBox">
							<span v-if="user.ErshouPrice[0]"><i>1</i>{{user.ErshouPrice[0]}}</span>
							<span v-if="user.ErshouPrice[1]"><i>2</i>{{user.ErshouPrice[1]}}</span>
						</div>
					</div>
<!-- 					<div class="pli p-hx">
						<label>户型偏好：</label>
						<span>3房2厅</span>
					</div>
					<div class="pli p-mj">
						<label>面积偏好：</label>
						<span>80-100平</span>
					</div> -->
					<div class="pli p-xx" v-if="user.FavSchool&&user.FavSchool.length>0">
						<label>学校偏好：</label>
						<div class="plBox">
							<span v-if="user.FavSchool[0]"><i>1</i>{{user.FavSchool[0]}}</span>
							<span v-if="user.FavSchool[1]"><i>2</i>{{user.FavSchool[1]}}</span>
							<span v-if="user.FavSchool[2]"><i>3</i>{{user.FavSchool[2]}}</span>
						</div>
					</div>
				</div>
				<div class="chx-bottom">
					<p v-if="user.PlatformType">来源渠道：{{user.PlatformType}}</p>
					<p v-if="user.Model">设备型号：{{user.Model}}</p>
					<p v-if="user.RegisterTime">注册时间：{{user.RegisterTime}}</p>
					<p v-if="user.LastStartTime">最近访问：{{user.LastStartTime}}</p>
				</div>
			</template>
			<!-- 轨迹 -->
			<template v-if="ccType==2">
				<div class="gj-tab">
					<label :class="gjType==1?'on':''" @click="getGj(1)">新房二手</label>
					<label :class="gjType==2?'on':''" @click="getGj(2)">租房</label>
					<label :class="gjType==3?'on':''" @click="getGj(3)">学校</label>
					<label :class="gjType==4?'on':''" @click="getGj(4)">写字楼</label>
					<label :class="gjType==5?'on':''" @click="getGj(5)">商铺</label>
				</div>
				<div class="gj-box">
					<template v-if="houseArray&&houseArray.length>0">
					<div class="gj-day" v-for="(item,index) in houseArray" :key="index">
						<p class="gj-time">{{item.Day.split(' ')[0]}}</p>
						<div class="gjd-content">
							<div class="list" v-for="sItem in (item.arrSon)">
								<i>{{sItem.Time.split(' ')[1]}}</i>
								<div class="gjd-title">
									<!-- 新房二手 -->
									<template v-if="gjType==1">
										<template v-if="sItem.EstateName">
											<a :href="hUrl+sItem.SourceId+'.html'" target="_blank"  v-if="sItem.BusinessType.indexOf('second')>-1">
												{{sItem.EventName}}
												<span>
												{{sItem.EstateName}}<template v-if="sItem.RoomCount>0">{{sItem.RoomCount}}室</template>
												<template v-if="sItem.HallCount>0">{{sItem.HallCount}}厅-</template><template v-if="sItem.Area>0">{{sItem.Area.toFixed(0)}}㎡-</template>
												<template v-if="sItem.SalePrice>0">{{sItem.SalePrice | price }}万</template><template v-if="sItem.GuidingSalePrice>0">，指导价{{sItem.GuidingSalePrice | price}}万</template><label v-if="sItem.EstateName">的房源</label><strong v-if="sItem.Count>1">{{sItem.Count}}次</strong>
												</span>
											</a>
											<a :href="'https://sz.centanet.com/xinfang/lp-'+sItem.SourceId" target="_blank" v-else>
												{{sItem.EventName}}
												<span>
												{{sItem.EstateName}}<template v-if="sItem.RoomCount>0">{{sItem.RoomCount}}室</template>
												<template v-if="sItem.HallCount>0">{{sItem.HallCount}}厅-</template><template v-if="sItem.Area>0">{{sItem.Area.toFixed(0)}}㎡-</template>
												<template v-if="sItem.GuidingSalePrice>0">{{sItem.GuidingSalePrice | price }}万</template><label v-if="sItem.EstateName">的房源</label><strong v-if="sItem.Count>1">{{sItem.Count}}次</strong>
												</span>
											</a>
										</template>
										<template v-else>
											<label>
												{{sItem.EventName}}
												<span>
												{{sItem.SourceId}}<template v-if="sItem.RoomCount>0">{{sItem.RoomCount}}室</template>
												<template v-if="sItem.HallCount>0">{{sItem.HallCount}}厅-</template><template v-if="sItem.Area>0">{{sItem.Area.toFixed(0)}}㎡-</template>
												<template v-if="sItem.GuidingSalePrice>0">{{sItem.GuidingSalePrice | price }}万</template><label v-if="sItem.EstateName">的房源</label><strong v-if="sItem.Count>1">{{sItem.Count}}次</strong>
												</span>
											</label>
										</template>
									</template>
									<!-- 非新房二手 -->
									<template v-else>
										<a :href="hUrl+sItem.SourceId+'.html'" target="_blank" v-if="sItem.EstateName">
											{{sItem.EventName}}
											<span>
											{{sItem.EstateName || sItem.SourceId}}<template v-if="sItem.RoomCount>0">{{sItem.RoomCount}}室</template>
											<template v-if="sItem.HallCount>0">{{sItem.HallCount}}厅-</template><template v-if="sItem.Area>0">{{sItem.Area.toFixed(0)}}㎡-</template>
											<template v-if="sItem.GuidingSalePrice>0">{{sItem.GuidingSalePrice | price }}万</template><label v-if="sItem.EstateName">的房源</label><strong v-if="sItem.Count>1">{{sItem.Count}}次</strong>
											</span>
										</a>
										<label v-else>
											{{sItem.EventName}}
											<span>
											{{sItem.SourceId}}<template v-if="sItem.RoomCount>0">{{sItem.RoomCount}}室</template>
											<template v-if="sItem.HallCount>0">{{sItem.HallCount}}厅-</template><template v-if="sItem.Area>0">{{sItem.Area.toFixed(0)}}㎡-</template>
											<template v-if="sItem.GuidingSalePrice>0">{{sItem.GuidingSalePrice | price }}万</template><label v-if="sItem.EstateName">的房源</label><strong v-if="sItem.Count>1">{{sItem.Count}}次</strong>
											</span>
										</label>
									</template>
								</div>
								<div class="gjd-img">
									<!-- 三张 -->
									<template v-if="sItem.ImgUrl1&&sItem.ImgUrl2&&sItem.ImgUrl3">
										<div class="gjd-l"><img :src="sItem.ImgUrl1 | changeImg"/></div>
										<div class="gjd-r">
											<p><img :src="sItem.ImgUrl2 | changeImg"/></p>
											<p><img :src="sItem.ImgUrl3 | changeImg"/></p>
										</div>
									</template>
									<!-- 两张 -->
									<template v-else-if="sItem.ImgUrl1&&sItem.ImgUrl2">
										<div class="gjd-l2"><img :src="sItem.ImgUrl1 | changeImg"/></div>
										<div class="gjd-r2">
											<img :src="sItem.ImgUrl2 | changeImg"/>
										</div>
									</template>
									<!-- 一张 -->
									<template v-else-if="sItem.ImgUrl1">
										<div class="gjd-l1"><img :src="sItem.ImgUrl1 | changeImg"/></div>
									</template>
									
								</div>
							</div>


						</div>
					</div>
					</template>
					<p class="noList" v-if="count>pIndex+1">正在加载</p>
					<p class="noList" v-else-if="count==pIndex+1&&loadOver&&houseArray.length>0"><span></span>&nbsp;我是有底线的&nbsp;<span></span></p>
					<!-- 一天 -->
					<div class="gjNone"  v-if="this.houseArray.length==0&&loadOver">
						<!-- <p>暂无历史轨迹</p> -->
					</div>

					
				</div>
				
			</template>
		</div>
		<div class="fBtn">
			<button @click="showMd=true">商机反馈</button>
			<button class="cb-dh" @click="getMobile()">拨打电话</button>
		</div>
		
		<nut-popup style="border-radius: 0.12rem;" closeable v-model="showMd">
			<div class="myIntr">
				<div class="miContent">
					<h4>商机反馈</h4>
					<div class="micM mdM">
						<label :class="md==item.CusLevelId?'on':''" @click="md=item.CusLevelId" v-for="item in intention" :key="item.CusLevelId">{{item.CusLevelName}}<!-- <i></i> --></label>
					</div>
					<div class="micMsg">
						<div v-for="item in intention" :key="item.CusLevelName">
							<label :class="cItem.TitleId==cmd?'on':''" @click="cmd=cItem.TitleId" v-for="cItem in item.Titles" v-if="md==item.CusLevelId">{{cItem.TitleName}}</label>
						</div>
					</div>
					<div class="miBtn">
						<label @click="commitC()">提交</label>
					</div>
				</div>
			</div>
		</nut-popup>
		<a :href="'tel:'+call" ref="cphone" style="display: none;" @click="setSc"></a>
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
			ccType:1,
			showMd:false,
			md:1,
			cmd:0,
			cId:"",
			typeNum:1,
			intention:"",
			call:"",
			gjType:1,
			ready:false,
			user:"",
			gj:"",
			gjInfo:"",
			houseInfo:"",
			empNo:"",
			empName:"",
			hUrl:"https://m.sz.centanet.com/ershoufang/",
			inApp:false,
			pageArray:"",
			
			count:-1,
			pIndex:0,
			loadOver:false,
			houseArray:[],
			scrollTop:0
		}
	},
	mounted() {
		if(navigator.userAgent.indexOf('aplus') > -1){
			this.inApp=true
		}
		// 全局绑定滚动事件，
		window.addEventListener("scroll", this.scrollT);
		this.getData();
		setTimeout(()=>{
			this.getCommt();
		},500)
		
	},
	beforeDestroy() {
		// 组件消失，解绑scroll事件
		window.removeEventListener("scroll", this.scrollT);
	},
	filters:{
		price(n){
			n=n/10000;
			return n.toFixed(0);
		},
		changeImg(n){
			if(n.indexOf("_w")>-1||n.indexOf("_c")>-1){
				return n;
			}
			let v=n.split('.jpg')[0];
			if(n.indexOf('.jpeg')>-1){
				v=n.split('.jpeg')[0];
				return v+'_300x210_w.jpeg';
			}else if(n.indexOf('.png')>-1){
				v=n.split('.png')[0];
				return v+'_300x210_w.png';
			}else if(n.indexOf('.JPG')>-1){
				v=n.split('.JPG')[0];
				return v+'_300x210_w.jpg';
			}else{
				return v+'_300x210_w.jpg';
			}
		},
	},
	watch:{
		gjType(n){
			console.log('轨迹',n);
			if(n==1){
				this.gjInfo=this.gj.House;
				this.hUrl="https://m.sz.centanet.com/ershoufang/";
			}else if(n==2){
				this.gjInfo=this.gj.RentHouse;
				this.hUrl='https://m.sz.centanet.com/zufang/';
			}else if(n==3){
				this.gjInfo=this.gj.School;
				this.hUrl='https://m.sz.centanet.com/school/';
			}else if(n==4){
				this.gjInfo=this.gj.OfficeBuild;
				this.hUrl='https://m.sz.centanet.com/xiezilou/loupan/';
			}else if(n==5){
				this.gjInfo=this.gj.Shop;
				this.hUrl='https://m.sz.centanet.com/gongshangpu/chushou/';
			}
		},
		gjInfo(n){
			this.houseArray=[];
			this.count=-1;
			this.pIndex=0;
			if(n&&n.length>0){
				const arr=n.map((val,index)=>{
					return {'BusinessType':val.BusinessType,'SourceId':val.SourceId,'Event':val.Event,'Time':val.Time,'Day':val.Day,'Count':val.Count}
				})
				this.pageArray=this.group(arr, 10);
				console.log(this.pageArray)
				this.count=this.pageArray.length;
				console.log('长度',this.count)
				// const arr1=arr.filter((val,index)=>{
				// 	return index<50;
				// })
				this.getHouseInfo(this.pageArray[0]);
				// console.log(arr)
			}
		},
		pIndex(){
			if(this.pIndex>0){
				this.getHouseInfo(this.pageArray[this.pIndex]);
			}
		},
		scrollTop(newValue, oldValue) {//滚动分页
			if(this.ccType==2)
			var height = document.getElementsByClassName('gj-box')[0].scrollHeight;
			let sTop = document.documentElement && document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop;//滚动的高度
			let clientHeight=window.screen.height;//屏幕的高度
			if(this.count>this.pIndex+1){
				if(sTop>0){
					if(height-50<sTop+clientHeight&&this.loadOver){
							if(this.pIndex<this.count){
								console.log(this.pIndex)
								this.pIndex=Number(this.pIndex)+1; 
							}
					 }
				 }
			}else{
				// setTimeout(()=>{
				// 	this.loadOver=true
				// },1000)
			}
		}
	},
	methods:{
		scrollT(){
			this.scrollTop = window.scrollY;
		},
		// 拆分数组
		group(array, subGroupLength) {
			let index = 0;
			let newArray = [];
			while(index < array.length) {
					newArray.push(array.slice(index, index += subGroupLength));
			}
			return newArray;
		  },
		// 画水印背景
			textBecomeImg(text,fontsize,fontcolor){
				var canvas = document.createElement('canvas');
				var $buHeight = 0;
				if(fontsize <= 32){ $buHeight = 99; }
				else if(fontsize > 32 && fontsize <= 60 ){ $buHeight = 2;}
				else if(fontsize > 60 && fontsize <= 80 ){ $buHeight = 4;}
				else if(fontsize > 80 && fontsize <= 100 ){ $buHeight = 6;}
				else if(fontsize > 100 ){ $buHeight = 10;}
				canvas.height=fontsize + $buHeight ;
				canvas.padding=30;
				var context = canvas.getContext('2d');
				context.clearRect(0, 0, canvas.width*2, canvas.height);
				context.textAlign = "center";
		                canvas.width = 200;
		                canvas.height = 100;
		                context.fillStyle = fontcolor;
		                context.font=fontsize+"px Arial";
		                context.textBaseline = 'middle'; 
		                context.fillText(text,0,fontsize/2);
		                var canvasWidth = canvas.width/99;
		                canvasWidth = context.measureText(text).width;//text字整句文本的宽度
				var dataUrl = canvas.toDataURL('image/png');
				return dataUrl;
		},
		// 画水印信息
		drawText(){
			// +new Date().toLocaleDateString()
			var text = `${this.empName}${this.empNo}`;
			console.log(text);
			var shuiyinDiv = document.createElement('div');
			shuiyinDiv.id="canvas";
			var style = shuiyinDiv.style;
			style.position = 'fixed';
			style.left = '-50%';
			style.top = '-60%';
			style.width = '200%';
			style.height = '200%';
			style.opacity = '0.15';
			style.background = "url("+this.textBecomeImg(text,16,"#666")+")";
			style.zIndex = 9999999991;
			style.transform = "rotate(-30deg)";
			style.pointerEvents = "none";//很重要  不然点击不了挡住的其他模块
			document.getElementById('customHX').appendChild(shuiyinDiv);
		},
		// 获取轨迹房源信息
		getHouseInfo(arr){
			this.loadOver=false;
			this.loading = this.$toast.loading('',{
			    cover: false
			});
			return new Promise((resolve)=>{
					this.$axios({
						method:"post",
						url:"/MobileCompete/GetTrailResources",
						headers:this.header_token,
						data:arr
					})
					.then(res=>{
						console.log(res);
						if(res.data.code==0){
							this.houseInfo=res.data.data;
							// 整理数组  把相同的Day整理出来为二维数组
							this.houseInfo=this.changeArr(this.houseInfo);
							this.houseArray=this.houseArray.concat(this.houseInfo);
							console.log('分页数组',this.houseArray)
							this.loadOver=true;
							setTimeout(()=>{
								this.loading.hide();
							},500)
							
						}else{
							this.loading.hide();
							this.$toast.text(res.data.msg);
						}
						resolve(res);
						this.ready=true;
						
					})
					.catch(error=>{
						this.loading.hide();
						this.$toast.text("网络错误，请稍后再试");
					})
			})
		},
		changeArr(arr){// 整理数组  把相同的Day整理出来为二维数组
			const obj = {}
			arr.forEach(item => {
			  const list = obj[item.Day] || []
			  list.push(item)
			  obj[item.Day] = list
			})
			console.log('数组整理后',obj)//结果{..,...}
			console.log('数组entries后',Object.entries(obj))//结果二维数组 [[..,...],[...,...]]
			return Object.entries(obj).map(([first, son]) => { //Day,val分别为数组对应的值
			  return {
			    Day : first,
			    arrSon : son
			  }
			})
		},
		// 获取画像数据
		getData(){
			this.loading = this.$toast.loading('',{
			    cover: false
			});
			return new Promise((resolve)=>{
					this.$axios({
						method:"get",
						url:"/MobileCompete/UserPortrait",
						headers:this.header_token,
						params:{
							detailId:this.$route.query.id,
							type:this.$route.query.type
						}
					})
					.then(res=>{
						console.log(res);
						if(res.data.code==0){
							this.user=res.data.data;
							if(this.empName!=res.data.data.EmpCnName){
								this.empName=res.data.data.EmpCnName;
								this.empNo=res.data.data.EmpNo;
								if(!this.inApp){
									// 清除水印加水印
									if(document.getElementById('canvas')){
										document.getElementById('custom').removeChild(document.getElementById('canvas'))
									}
									this.drawText();//加水印
								}
							}
							setTimeout(()=>{
								this.loading.hide();
							},500)
						}else{
							this.loading.hide();
							this.$toast.text(res.data.msg);
						}
						resolve(res);
						this.ready=true;
						
					})
					.catch(error=>{
						this.loading.hide();
						this.$toast.text("网络错误，请稍后再试");
					})
			})
		},
		// 获取轨迹数据
		getGjData(){
			this.loading = this.$toast.loading('',{
			    cover: false
			});
			return new Promise((resolve)=>{
					this.$axios({
						method:"get",
						url:"/MobileCompete/UserTrails",
						headers:this.header_token,
						params:{
							detailId:this.$route.query.id,
							type:this.$route.query.type
						}
					})
					.then(res=>{
						console.log(res);
						if(res.data.code==0){
							this.gj=res.data.data;
							if(this.gjType==1){
								this.gjInfo=this.gj.House;
							}
						}
						setTimeout(()=>{
							this.loading.hide();
						},500)
						resolve(res);
						this.ready=true;	
					})
					.catch(error=>{
						this.loading.hide();
						this.$toast.text("网络错误，请稍后再试");
					})
			})
		},
		// 神策电话埋点
		setSc(){
			this.$sensors.track('sc_click_call', {
				sc_business_type:"other",
				sc_button_name:"拨打电话按钮",
				sc_click_page:"商机_我的商机页",
				sc_house_id:"",
				sc_house_name:"",
				sc_click_area:"我的商机区域",
				sc_button_position:""
			});
		},
		changeTag(n){
			this.ccType=n;
			if(n==2){
				this.getGjData();
			}
		},
		getGj(n){
			this.gjType=n;
		},
		getCommt(){
			return new Promise((resolve)=>{
					this.$axios({
						method:"get",
						url:"/mobilecompete/custleveltitle",
						headers:this.header_token,
						params:{
							type:this.$route.query.type
						}
					})
					.then(res=>{
						console.log(res);
						if(res.data.code==0){
							this.intention=res.data.data;
						}else{
							this.$toast.text(res.data.msg);
						}
						Indicator.close();
						resolve(res);
						this.ready=true;
					})
					.catch(error=>{
						Indicator.close();
						this.$toast.text("网络错误，请稍后再试");
					})
			})
		},
		commitC(){
			if(this.cmd<1){
				this.$toast.text("请选择反馈类型");
				return;
			}
			return new Promise((resolve)=>{
					this.$axios({
						method:"post",
						url:"/mobilecompete/mobilecompetereviewV2",
						headers:this.header_token,
						data:{
							detailId:this.$route.query.id,
							cusLevelId:this.md,
							titleId:this.cmd,
							type:this.$route.query.type
						}
					})
					.then(res=>{
						console.log(res);
						if(res.data.code==0){
							this.$toast.success("评价成功");
							this.showMd=false;
							this.getData();
						}else{
							this.$toast.text(res.data.msg);
						}
						Indicator.close();
						resolve(res);
						this.ready=true;
					})
					.catch(error=>{
						Indicator.close();
						this.$toast.text("网络错误，请稍后再试");
					})
			})
		},
		// change(id,type){
		// 	this.showMd=true;
		// 	this.cId=id;
		// 	this.typeNum=type;
		// 	this.getCommt(type);
		// },
		changeMd(id){
			return new Promise((resolve)=>{
					this.$axios({
						method:"post",
						url:"/MobileCompete/SetCustomerYiXiang",
						headers: {
							"token":uToken()
						 },
						data:{
							"MobileCompeteId": this.cId,
							 "YiXiang": this.md
						}
					})
					.then(res=>{
						console.log(res);
						resolve(res);
						if(res.data.code==0){
							if(res.data.data.IsSuccess){
								this.showMd=false;
								this.$toast.text(res.data.data.Reamark);
							}else{
								this.$toast.text(res.data.data.Reamark);
							}
						}else{
							this.$toast.text(res.data.msg);
						}
						Indicator.close();
					})
					.catch(error=>{
						Indicator.close();
						this.$toast.text("网络错误，请稍后再试");
					})
			})
		},
		// 拨打电话
		getMobile(){
			return new Promise((resolve)=>{
					this.$axios({
						method:"get",
						url:"/MobileCompete/GetXiaoHaoNewV2",
						headers:this.header_token,
						params:{
							"detailId": this.$route.query.id,
							"type":this.$route.query.type
						}
					})
					.then(res=>{
						console.log(res);
						if(res.data.code==0){
							if(res.data.data.IsSuccess){
								this.call=res.data.data.Reamark;
								setTimeout(()=>{
									this.$refs.cphone.click();
								},100)
							}else{
								this.$toast.text(res.data.data.Reamark);
							}
						}else{
							this.$toast.text(res.data.msg);
						}
						resolve(res);
					})
					.catch(error=>{
						Indicator.close();
						this.$toast.text("网络错误，请稍后再试");
					})
			})
		},
	}
	
}
</script>
<style scoped>
	.myIntr{width: 6.9rem;min-height: 6rem;background-color: #fff;border-radius: 0.2rem;}
	.myIntr h4{text-align: center;font-size: 0.36rem;color: #333;border: 0;font-weight: 550;}
	.miTop{height: 1.3rem;line-height: 1.3rem;text-align: center;font-size: 0.4rem;font-weight: 600;color: #fff;margin-top: -1rem;color: #333;font-size: 0.32rem;margin: 0.1rem 0;}
	.miContent{padding: 0 0.3rem 0.3rem;}
	.miContent textarea{width: 100%;height: 2rem;background-color: #eee;border: 1px solid #ddd;padding: 0.2rem;}
	.miBtn{margin-top: 0.6rem;text-align: center;margin-bottom: 0.4rem;}
	.miBtn label{display: inline-block;width: 3.7rem;height: 0.94rem;border-radius: 0.12rem;margin: 0 0.2rem;line-height: 0.9rem;font-size: 0.36rem;color: #DDB950;border: 1px solid #DDB950;}
	.miBtn label:last-child{background: #DDB950;color: #fff;}
	.mibPay{margin-top: 0.8rem;}
	.mibPay label{width: 2.4rem;}
	.micM{font-size: 0.36rem;line-height: 1.6;text-align: center;}
	.miContent h4{font-size: 0.36rem;text-align: center;font-weight: 550;padding-top: 0.3rem;padding-bottom: 0.2rem;}
	.micM,.ccrTag{display: flex;justify-content: space-between;}
	.micM label,.ccrTag label{font-weight: 500;display: inline-block;position: relative;flex: 1;height: 0.6rem;line-height: 0.6rem;text-align: center;font-size: 0.3rem;border-radius: 0.05rem;color: #666;}
	/* .micM label:nth-last-of-type(2){margin: 0 0.3rem;} */
	.micM label.on,.ccrTag label.on{color: #F42C1D;}
	.micM label.on i,.ccrTag label.on i{display: inline-block;height: 2px;width:0.8rem;background-color: #F42C1D;position: absolute;bottom: 0;left: 0.38rem;}
	.ccrTag label.on i{left: 1.3rem;}
	.mdM{text-align: center;margin-bottom: 0.2rem;}
	.micMsg{padding-top: 0.2rem;min-height: 1.84rem;background-color: #f5f5f5;text-align: center;}
	.micMsg label{display: inline-block;padding: 0.15rem;font-size: 0.24rem;border-radius: 3px;margin-right: 0.3rem;margin-bottom: 0.3rem;background-color: #fff;color: #666;}
	.micMsg label:last-child{margin-right: 0;}
	.micMsg label.on{background-color: #FDE9EA;color: #F42C1D;}
	
	.noList{color: #ccc;font-size: 0.26rem;text-align: center;margin-top: 0.8rem;}
	.noList span{display: inline-block;height: 1px;width: 2rem;background-color: #eee;position: relative;top: -3px;}
</style>
<style lang="less" scoped>
	.chxBox{
		width: 100%;
		min-height: 100vh;
		padding-bottom: 1.6rem;
		background-color: #F5F5F5;
		.chx-top{
			padding: 0.2rem 0.3rem 0.26rem;
			img{
				width: 0.7rem;
				float: left;
				margin-right: 0.1rem;
				margin-top: 0.1rem;
				display: block;
			}
			.ccUser{
				float: left;
				h4{
						font-weight: 500;
						font-size: 0.3rem;
						margin-bottom: 0.06rem;
						width: 2rem;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
				}
				p{
					font-size: 0.2rem;
					label{
						padding: 2px 5px;
						background-color: #E8ECF3;
						border-radius: 3px;
						color: #5084DD;
						margin-right: 0.1rem;
						display: inline-block;
						max-width: 3.8rem;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
						&:nth-of-type(1){
							background-color: #F4DDDD;
							color: #F04F52;
						}
						&:last-child{
							margin-right: 0;
						}
					}
				}
			}
			&::after{
				content: '';
				display: block;
				clear: both;
				overflow: hidden;
				visibility: hidden;
				height: 0;
			}
		}
		.chx-second{
			padding: 0.1rem 0.3rem;
			background-color: #fff;
			color: #333;
			.chxs{
				display: flex;
				margin-bottom: 0.2rem;
				label{
					width: 1.46rem;
				}
				p{
					flex: 1;
					i{
						display: block;
						width: 100%;
						font-style: normal;
						font-size: 0.2rem;
						color: #666;
					}
				}
			}
		}
		.chx-content{
			padding: 0.1rem;
			.chxc-tab{
				text-align: center;
				padding: 0.15rem 0;
				font-size: 0.32rem;
				color: #333;
				width: 100%;
				label{
					display: inline-block;
					width: 1.8rem;
					height: 0.7rem;
					margin: 0 0.2rem 0 0;
					line-height: 0.7rem;
					color: #333;
					position: relative;
					transition: all 0.5s linear;
					&.on{
						color: #5084DD;
						font-weight: 600;
						span{
							display: inline-block;
							width: 0.6rem;
							height: 3px;
							background-color: #5084DD;
							position: absolute;
							bottom: -0.14rem;
							left: 0.6rem;
						}
					}
				}
			}
			.chxc-list{
				padding: 0.3rem;
				background-color: #5084DD;
				color: #fff;
				margin-top: 0.2rem;
				border-radius: 3px;
				overflow: hidden;
				.title{
					font-size: 0.32rem;
					margin-bottom: 0.2rem;
				}
				.pli{
					width: 100%;
					padding: 0.1rem 0;
					display: -ms-flexbox;
					display: flex;
					-ms-flex-pack: start;
					justify-content: flex-start;
					font-size: 0.28rem;
					padding-left: 0.48rem;
					.plBox{
						 width: 4.3rem;
						 span{
							 display: block;
							 // max-width: 2.15rem;
							 float: left;
							 margin-right: 0.15rem;
							 margin-bottom: 0.1rem;
								 // overflow: hidden;
								 // white-space: nowrap;
								 // text-overflow: ellipsis;
							 i{
								 font-style: normal;
								 font-size: 0.24rem;
								 color: #5084DD;
								 display: inline-block;
								 width: 0.28rem;
								 height: 0.28rem;
								 text-align: center;
								 line-height: 0.22rem;
								 background-color: #fff;
								 border-radius: 50%;
								 margin-right: 0.1rem;
								 border: 1px solid #5084DD;
							 }
						 }
					}
				}
				.p-es{
					background: url(../images/custom/l-es.png) 0 0.15rem no-repeat;
					background-size: 0.28rem;
				}
				.p-fy{
					background: url(../images/custom/l-fy.png) 0 0.15rem no-repeat;
					background-size: 0.28rem;
				}
				.p-qy{
					background: url(../images/custom/l-qy.png) 0 0.16rem no-repeat;
					background-size: 0.28rem;
				}
				.p-xf{
					background: url(../images/custom/l-xf.png) 0 0.1rem no-repeat;
					background-size: 0.28rem;
				}
				.p-jg{
					background: url(../images/custom/l-jg.png) 0 0.15rem no-repeat;
					background-size: 0.28rem;
				}
				.p-hx{
					background: url(../images/custom/l-hx.png) 0 0.14rem no-repeat;
					background-size: 0.28rem;
				}
				.p-mj{
					background: url(../images/custom/l-mj.png) 0 0.14rem no-repeat;
					background-size: 0.28rem;
				}
				.p-xx{
					background: url(../images/custom/l-xx.png) 0 0.15rem no-repeat;
					background-size: 0.28rem;
				}
			}
		}
		.chx-bottom{
			font-size: 0.22rem;
			color: #999;
			padding: 0.4rem;
			p{
				line-height: 1.6;
			}
		}
		.fBtn{
			width: 100%;
			height: 1.4rem;
			background-color: #fff;
			position: fixed;
			bottom: 0;
			left: 0;
			text-align: center;
			padding-top: 0.26rem;
			box-shadow: 0px -2px 6px 0px rgba(0, 0, 0, 0.1);
			button{
				height: 0.88rem;
				width: 3rem;
				background-color: #DDB950;
				color: #fff;
				font-size: 0.32rem;
				font-weight: 600;
				margin-right: 0.6rem;
				border-radius: 0.1rem;
				&:last-child{
					margin-right: 0;
					background-color: #5084DD;
				}
			}
		}
		// 轨迹
		.gj-box{
			padding: 0.2rem 0.3rem;
			.gjNone{
				height: 5rem;
				width: 100%;
				background: url(../images/custom/gj-none.png?v=1) center no-repeat;
				background-size: 3.4rem;
				padding-top: 4.2rem;
				text-align: center;
				font-size: 0.26rem;
				color: #999;
			}
		}
		.gj-tab{
			width: 100%;
			height: 0.8rem;
			background-color: #fff;
			display: flex;
			margin-top: 0.2rem;
			label{
				flex: 1;
				line-height: 0.8rem;
				text-align: center;
				&.on{
					color: #5084DD;
					font-weight: 600;
				}
			}
		}
		.gj-day{
			background-color: #fff;
			border-radius: 3px;
			overflow: hidden;
			margin-bottom: 0.2rem;
			.gj-time{
				height: 0.68rem;
				line-height: 0.68rem;
				border-bottom: 1px solid #ededed;
				padding-left: 0.2rem;
				background-color: #fff;
			}
			.gjd-content{
				padding: 0.16rem 0.25rem 0 0.5rem;
				.list{
					padding-left: 0.6rem;
					border-left: 1px solid #ededed;
					position: relative;
					i{
						background-color: #fff;
						font-size: 0.26rem;
						color: #666;
						font-style: normal;
						position: absolute;
						left: -0.34rem;
						top: 0;
					}
					.gjd-title{
						line-height: 1.4;
						margin-bottom: 0.2rem;
						label{
							color: #666;
							margin-left: 0.1rem;
						}
						a{
							span{
								color:#5084DD;
							}
						}
						span{
							color:#666;
							strong{
								color: red;
								margin-left: 0.1rem;
							}
						}
					}
					.gjd-img{
						width: 100%;
						display: flex;
						justify-content: space-between;
						margin-bottom: 0.2rem;
						.gjd-l{
							width: 3.25rem;
							height: 1.91rem;
						}
						.gjd-r{
							width: 2rem;
							height: 1.91rem;
							p{
								height: 0.92rem;
								margin-bottom: 0.1rem;
							}
						}
						.gjd-l1{
							width: 100%;
							height: 1.91rem;
						}
						.gjd-l2{
							width: 2.6rem;
							height: 1.91rem;
						}
						.gjd-r2{
							width: 2.6rem;
							height: 1.91rem;
						}
						img{
							width: 100%;
							height: 100%;
							object-fit: cover;
							object-position: center;
						}
					}
				}
			}
		}
	}
</style>
