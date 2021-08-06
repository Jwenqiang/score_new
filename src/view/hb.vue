<template>
	<div class="hb" :class="hbList.length>0?'hbY':''">
		<div class="hbTab">
			<a>
				<label :class="hbType==1?'on':''" @click="getHbList()">我的海报</label>
				<label :class="hbType==2?'on':''" @click="getShopList()">海报商城
					<!-- <span v-if="(showZp&&hbId==2)||(showJr&&hbId==3)"></span> -->
				</label>
			</a>
		</div>
		<div class="hbList">
			<!-- 我的 -->
			<div class="myHb" v-if="hbType==1">
				<ul class="clist" v-if="hbList.length>0">
					<template v-if="hbId==7">
						<li v-for="(item,index) in hbList" :key="item.MyTemplateId"
							@click="setCj(item.MyTemplateId,item.TemplateName,item.EmpNo,item.EmpCnName)">
							<template v-if="item.Status>0">
								<div class="hbImg">
									<img v-lazy="item" width="100%" />
								</div>
								<!-- 					<p>{{item.TemplateName}}</p>
					<button>生成专属海报</button> -->
							</template>
							<div class="overJr" v-else>
								<div class="op5"></div>
								<div class="hbImg">
									<img v-lazy="item" width="100%" />
									<span class="oldHb">已过期</span>
								</div>
								<!-- 					<p>{{item.TemplateName}}</p>
					<button class="overOld">生成专属海报</button> -->
							</div>
						</li>
					</template>
					<!-- 房源海报自定义图片 -->
					<template v-else-if="hbId==1||hbId==6">
						<li v-for="(item,index) in hbList" :key="item.MyTemplateId">
							<template v-if="item.Status>0">
								<div @click="bigHb(item.MyTemplateId,item.TemplateName) " v-if="item.TemplateId==75">
									<div class="hbImg">
										<img v-lazy="item" width="100%" />
									</div>
									<!-- 						<p>{{item.TemplateName}}</p>
						<button>生成专属海报</button> -->
								</div>
								<div @click="goBigHb(item.MyTemplateId,item.TemplateName,item.TemplateId)" v-else>
									<div class="hbImg">
										<img v-lazy="item" width="100%" />
									</div>
									<!-- 						<p>{{item.TemplateName}}</p>
						<button>生成专属海报</button> -->
								</div>
							</template>
							<div class="overJr" v-else>
								<div class="op5"></div>
								<div class="hbImg">
									<img v-lazy="item" width="100%" />
									<span class="oldHb">已过期</span>
								</div>
								<!-- 					<p>{{item.TemplateName}}</p>
					<button class="overOld">生成专属海报</button> -->
							</div>
						</li>
					</template>
					<template v-else>
						<li v-for="(item,index) in hbList" :key="item.MyTemplateId">
							<div @click="bigHb(item.MyTemplateId,item.TemplateName)" v-if="item.Status>0">
								<div class="hbImg">
									<img v-lazy="item" width="100%" />
								</div>
								<!-- 					<p>{{item.TemplateName}}</p>
					<button>生成专属海报</button> -->
							</div>
							<div class="overJr" v-else>
								<div class="op5"></div>
								<div class="hbImg">
									<img v-lazy="item" width="100%" />
									<span class="oldHb">已过期</span>
								</div>
								<!-- 					<p>{{item.TemplateName}}</p>
					<button class="overOld">生成专属海报</button> -->
							</div>
						</li>
					</template>
				</ul>
				<div class="hbNone" v-else-if="hbList.length==0&&ready">
					<p>免费领专属海报模板</p>
					<div class="clear nhb" ref="nHb" v-if="newHb.Name">
						<label>
							<img :src="newHb.DisplaySmallImagePath" width="100%" />
						</label>
						<div class="nhbR">
							<h5>最新{{hbName}}上线</h5>
							<p>{{newHb.Name}}设计风格</p>
						</div>
						<button @click="getShopList()">立即领取</button>
						<span class="nhbClose" @click="$refs.nHb.remove()"></span>
					</div>
				</div>
			</div>
			<!-- 商城 -->
			<div class="hbShop" v-if="hbType==2">
				<ul class="clist" v-if="shopList.length>0">
					<li v-for="item in shopList" :key="item.DisplaySmallImagePath">
						<div style="position: relative;">
							<div class="hbImg" style="border-radius: 0.06rem 0.06rem 0 0;">
								<img v-lazy="item" width="100%" preview="0" :preview-text="item.Name" />
							</div>
							<i class="hbTip">{{item.AllBuyCount}}人购买</i>
							<!-- <p>{{item.Name}}</p> -->
							<p class="sp" style="bottom: 0;">
								<span>{{item.Price}}<i>元宝</i></span><a>{{item.OriginalPrice}}<i>元宝</i></a></p>
						</div>
						<div>
							<button @click="buy(item)" v-if="item.IsBuy==false">我要兑换</button>
							<button class="hasBuy" v-else>我已购买</button>
						</div>
					</li>
				</ul>
				<div class="hbNone" v-else-if="shopList.length==0&&readyShop">
					商城暂无海报可供购买~
				</div>
			</div>

		</div>
<!-- 		<div class="fixR" @click="$router.push({name:'uploadCj'})" v-if="$route.query.id=='7'">
			<img src="../assets/static/icon-cj.png" />
		</div> -->
		<!-- 海报图片选取 -->
		<nut-popup v-model="showImg" style="border-radius: 0.1rem;" class="selectImg">
			<div class="selectC">
				<label class="close" @click="showImg=false"></label>
				<div class="clear tagLx">
					<span :class="newCurrentPage<=imgArrDy.length?'on':''" @click="changeIdx(0)"
						v-if="$route.query.id==1&&imgArrDy.length>0">室内图({{imgArrDy.length}})</span>
					<span :class="newCurrentPage<=imgArrDy.length?'on':''" @click="changeIdx(0)"
						v-else-if="$route.query.id==6&&imgArrDy.length>0">效果图({{imgArrDy.length}})</span>
					<span v-if="imgArrHx.length>0" :class="newCurrentPage>imgArrDy.length?'on':''"
						@click="changeIdx(imgArrDy.length)">户型图({{imgArrHx.length}})</span>
				</div>
				<template v-if="showTag">
					<div class="diyAll">
						<div class="diyTag" v-if="hbId==1">
							<span v-for="item in tagList" :key="item.id"
								@click="bigHb(esTmpId,esTmpName,item.val)">{{item.val}}</span>
						</div>
						<div class="diyTag" v-else>
							<span v-for="item in tagListNew" :key="item.id"
								@click="bigHb(esTmpId,esTmpName,item.val)">{{item.val}}</span>
						</div>
						<p>点击对应的标签按钮生成海报</p>
					</div>
				</template>
				<div class="sImg" v-if="imgArr.length>0">
					<nut-swiper ref="swipe" direction="horizontal" :loop="true" :canDragging="false"
						:swiperData="imgArr" :newCurrentPage="newCurrentPage" :lazyLoad="true"
						@slideChangeEnd="handleChange">
						<div class="nut-swiper-slide" v-for="(item,index) in imgArr" :key="index">
							<template v-if="item.ImagePath&&$route.query.id==1">
								<img :data-src="item.ImagePath" style="max-width:100%;" class="nut-img-lazyload" />
							</template>
							<template v-else-if="$route.query.id==6&&item.DefaultImage">
								<img :data-src="item.DefaultImage" style="max-width:100%;" class="nut-img-lazyload" />
							</template>
						</div>
					</nut-swiper>
					<div class="nBtn" style="text-align: center;">
						<span @click="sub"></span>
						<span @click="add"></span>
					</div>
				</div>
				<button class="setBtn" @click="bigHb(esTmpId,esTmpName)" v-if="!showTag">生成专属海报</button>
			</div>
		</nut-popup>
		<!-- 选择标签 -->
		<!-- 	<nut-popup style="border-radius: 0.12rem;" v-model="showTag">
		<div class="myIntr" style="height: 4.6rem;">
			<div class="miContent">
				<h4>请选择海报标签</h4>
				<div class="micM mdM"><label :class="md==1?'on':''" @click="md=1">满五唯一</label><label :class="md==2?'on':''" @click="md=2">带精装修</label><label :class="md==3?'on':''" @click="md=3">近地铁口</label><label :class="md==4?'on':''" @click="md=4">交通便利</label></div>
				<div class="miBtn">
					<label @click="">确定</label>
				</div>
			</div>
		</div>
	</nut-popup> -->

		<nut-popup v-model="show" style="border-radius: 0.1rem;">
			<div class="bigHb">
				<p class="bigF">{{ bigName }}</p>
				<p class="bigS">{{ inApp ? '点击图片分享' : '长按图片保存' }}{{testCall}}</p>
				<div class="bigHc">
					<template v-if="bigImg">
						<img :src="bigImg + '&fmt=jpg'" width="100%" :key="bigImg" @click="share(bigImg)"
							v-if="inApp" />
						<img :src="bigImg + '&fmt=jpg'" width="100%" :key="bigImg" v-else />
					</template>
				</div>
				<label @click="show=false"></label>
			</div>
		</nut-popup>
		<nut-popup style="border-radius: 0.12rem;" v-model="showPay">
			<div class="myIntr">
				<div class="miTop">兑换支付</div>
				<div class="miContent">
					<div class="micM">{{buyInfo.Name}}模板价格为{{buyInfo.Price}}元宝，是否兑换？</div>
					<div class="miBtn">
						<label @click="showPay=false">取消</label>
						<label @click="buyHb">确定</label>
					</div>
				</div>
			</div>
		</nut-popup>
		<!-- 成交战报填写信息 -->
		<nut-popup style="border-radius: 0.12rem;" v-model="showCj">
			<div class="myIntr myCj">
				<div class="miTop">请填写战报信息</div>
				<div class="miContent">
					<div class="cjM">
						<p class="cjInput">
							<input type="text" placeholder="成交人姓名" v-model="cjName" @input="getEmp()" />
						<ul v-show="cjList.length>0">
							<li v-for="item in cjList" :key="item.EmpNo" @click="selectName(item.EmpCnName,item.EmpNo)">
								{{item.EmpCnName}}({{item.EmpNo}}) {{item.DeptName}}</li>
						</ul>
						</p>
						<p class="cjInput"><input type="text" readonly placeholder="成交时间" @click="isVisible1=true"
								v-model="cjTime" /></p>
						<p class="cjInput"><input type="text" placeholder="成交小区" v-model="cjXq" /></p>
						<p class="cjInput"><input type="text" placeholder="成交物业" readonly @click="isVisible=true"
								v-model="cjWy" /></p>
					</div>
					<div class="miBtn">
						<label @click="showCj=false">取消</label>
						<label @click="bigHb">确定</label>
					</div>
				</div>
			</div>
		</nut-popup>
		<!-- 分享成交海报提示 -->
		<nut-popup style="background: none;" v-model="sucCj">
			<div class="sucHb">
				<div class="upB" @click="$router.push({name:'uploadCj'})"></div>
				<label class="close" @click="sucCj=false"></label>
			</div>
		</nut-popup>
		<!-- 时间 -->
		<nut-datepicker :is-visible="isVisible1" title="请选择日期" type="date" :defaultValue="nowTime"
			startDate="2021-01-01" :endDate="nowTime" @close="isVisible1=false" @choose="setChooseValue1">
		</nut-datepicker>
		<nut-picker :is-visible="isVisible" :list-data="listData" :default-value-data="defaultValueData"
			@close="closeSwitch('isVisible')" @confirm="confirm"></nut-picker>
		<!-- 分享获得元宝弹窗 -->
		<div class="sModel mMsg" v-if="hasYb&&inApp">
			<div class="bj" @click="hasYb=false"></div>
			<div class="bRead" @click="$router.push({name:'yb'})">
				<p><strong>{{shareNum}}</strong>元宝</p>
			</div>
		</div>
		<!-- 分享获得1000元宝提示 -->
		<nut-popup style="border-radius: 0.12rem;" v-model="over">
			<div class="overHb"
				style="width: 5.6rem;height: 3.4rem;padding: 0.8rem 0.3rem 0;text-align: center;color: #000;">
				<p>您已获得{{overNum}}元宝，已达活动奖励上限!</p>
				<button @click="over=false"
					style="width: 2.8rem;height: 0.7rem;margin: 0.8rem auto 0;background: linear-gradient(0deg, #CC2720, #FF5B54);border-radius: 0.35rem;color: #fff;font-weight: 550;">我知道了</button>
			</div>
		</nut-popup>
		<!--  -->
		<nut-popup style="border-radius: 0.12rem;" v-model="shareError">
			<div class="overHb"
				style="width: 5.6rem;height: 3.4rem;padding: 0.8rem 0.3rem 0;text-align: center;color: #000;">
				<p style="font-size: 0.32rem;">活动太火爆了，请稍后再试！</p>
				<button @click="shareError=false"
					style="width: 2.8rem;height: 0.7rem;margin: 0.8rem auto 0;background: linear-gradient(0deg, #CC2720, #FF5B54);border-radius: 0.35rem;color: #fff;font-weight: 550;">我知道了</button>
			</div>
		</nut-popup>
	</div>
</template>

<script>
	import Vue from 'vue';
	import {
		Toast,
		Indicator
	} from 'mint-ui';
	import {
		uToken
	} from "@/global/token.js";
	import Foot from '@/components/foot.vue';
	import {
		DatetimePicker
	} from 'mint-ui';
	Vue.component(DatetimePicker.name, DatetimePicker);
	import nutUI from '@nutui/nutui/dist/nutui.min.js'; // 加载构建后的JS
	import '@nutui/nutui/dist/nutui.min.css'; //加载构建后的CSS

	nutUI.install(Vue);

	export default {
		name: 'hb',
		data() {
			return {
				header_token: {
					"token": uToken()
				},
				// loadImg:'https://sz.centanet.com/partner/house/shareImg/loading.jpg',
				loadImg: require("@/assets/static/hb_load.png"),
				ready: false,
				readyShop: false,
				inApp: false,
				hbType: 1,
				show: false,
				hbList: "",
				shopList: "",
				showPay: false,
				pSize: 50,
				type: 'my',
				hbId: 0,
				adsNo: "",
				estExtId: "",
				buyInfo: "",
				bigImg: "",
				bigName: "",
				hbName: "",
				newHb: "",
				bigMsg: "",
				shareText: "",
				hasYb: false,
				shareNum: 0,
				showCj: false,
				nowTime: "",
				startTime: "",
				showCjl: false,
				cjName: "",
				cjNo: "",
				cjList: "",
				cjTime: "",
				cjXq: "",
				cjWy: "",
				isVisible1: false,
				isVisible: false,
				listData: [
					[{
							label: 1,
							value: '二手售单',
						},
						{
							label: 2,
							value: '二手租单',
						},
						{
							label: 3,
							value: '一手单',
						},
						{
							label: 4,
							value: '商铺售单',
						},
						{
							label: 5,
							value: '商铺租单',
						},
						{
							label: 6,
							value: '写字楼售单',
						},
						{
							label: 7,
							value: '写字楼租单',
						},
					],
				],
				defaultValueData: null,
				infoId: "",
				infoName: "",
				sucCj: false,
				testCall: "",
				showImg: false,
				aIdx: 0,
				imgArr: [],
				imgArrDy: [],
				imgArrHx: [],
				newCurrentPage: 1,
				ershouImg: "",
				esTmpId: "",
				esTmpName: "",
				tempArr: "",
				imgReady: false,
				overNum: 0,
				over: false,
				shareError: false,
				zxId: "",
				empNo: "",
				showZp: true,
				showJr: true,
				md: 1,
				showTag: false,
				tagList: [{
						id: 1,
						val: "优质学府"
					},
					{
						id: 2,
						val: "业主急售"
					},
					{
						id: 3,
						val: "南北通透"
					},
					{
						id: 4,
						val: "红本在手"
					},
					{
						id: 5,
						val: "精美装修"
					},
					{
						id: 6,
						val: "低价笋盘"
					},
					{
						id: 7,
						val: "地铁好房"
					},
					{
						id: 8,
						val: "满五好房"
					},
				],
				tagListNew: [{
						id: 1,
						val: "优质学府"
					},
					{
						id: 2,
						val: "配套醇熟"
					},
					{
						id: 3,
						val: "地铁物业"
					},
					{
						id: 4,
						val: "精美装修"
					}
				]
			}
		},

		created() {
			if (navigator.userAgent.indexOf('aplus') > -1) {
				this.inApp = true
			}
			this.getNowDate();
			if (localStorage.getItem('readZp')) {
				this.showZp = false;
			}
			if (localStorage.getItem('readJr')) {
				this.showJr = false;
			}
		},

		mounted() {
			if (this.$route.query.id) {
				this.hbId = this.$route.query.id;
			}
			if (this.$route.query.zxId) {
				this.zxId = this.$route.query.zxId;
			}
			if (this.$route.query.empNo) {
				this.empNo = this.$route.query.empNo;
			}
			if (this.$route.query.adsNo) {
				this.adsNo = this.$route.query.adsNo;
			}
			if (this.$route.query.estExtId) {
				this.estExtId = this.$route.query.estExtId;
			}
			if (this.$route.query.id == 1) {
				this.getBanner();
			}
			if (this.$route.query.id == 6) {
				this.getHx(); //新房户型图
				this.getList(); //新房图
			}
			if (this.$route.query.type == 2) {
				this.hbType = 2;
				this.getShopList();
			} else {
				this.getHbList();
			}
			window.callback = this.callback;
		},

		watch: {
			'$route'(to, from) {
				console.log(from);
				console.log(to.name);
				if (to.name == 'hb') {
					this.hbId = this.$route.query.id;
					if (this.$route.query.adsNo) {
						this.adsNo = this.$route.query.adsNo;
					}
					if (this.$route.query.estExtId) {
						this.estExtId = this.$route.query.estExtId;
					}
					if (this.$route.query.zxId) {
						this.zxId = this.$route.query.zxId;
					}
					if (this.$route.query.empNo) {
						this.empNo = this.$route.query.empNo;
					}
				}
			},
			newCurrentPage() {
				if (this.$route.query.id == 1) {
					this.ershouImg = this.tempArr[this.newCurrentPage - 1].ImagePath;
				} else if (this.$route.query.id == 6) {
					this.ershouImg = this.tempArr[this.newCurrentPage - 1].DefaultImage;
				}
			},
			hbId() {
				if (this.hbId == '0') {
					this.hbName = "名片海报";
				} else if (this.hbId == '1') {
					this.hbName = "房源海报";
				} else if (this.hbId == '2') {
					this.hbName = "招聘海报";
				} else if (this.hbId == '3') {
					this.hbName = "节日海报";
				} else if (this.hbId == '4') {
					this.hbName = "正能量海报";
				} else if (this.hbId == '5') {
					this.hbName = "下载海报";
				} else if (this.hbId == '6') {
					this.hbName = "新房海报";
				} else if (this.hbId == '7') {
					this.hbName = "成交战报";
				} else if (this.hbId == '8') {
					this.hbName = "资讯海报";
				}
				document.title = this.hbName;
			}
		},

		methods: {
			goBigHb(MyTemplateId, TemplateName, TemplateId) {
				console.log(TemplateId)
				if (TemplateId == 110 || TemplateId == 111 || TemplateId == 118 || TemplateId == 114) {
					this.showTag = true;
				} else {
					this.showTag = false;
				}

				this.showImg = true;
				this.esTmpId = MyTemplateId;
				this.esTmpName = TemplateName;
				if (this.tempArr.length > 0 && this.imgArrDy.length > 0) {
					this.imgArr = this.tempArr;
				} else if (this.tempArr.length == 0) {
					this.getImg();
				}
			},
			getImg() {
				this.loading = this.$toast.loading('', {
					cover: false
				});
				setTimeout(() => {
					if (this.imgReady) {
						this.imgArr = this.tempArr;
						this.loading.hide();
						if (this.imgArr.length > 0) {} else {
							this.$toast.text("暂无可选择图片，请直接点击按钮生成");
						}

					} else {
						this.getImg();
					}
				}, 1000)
			},
			changeIdx(idx) {
				this.newCurrentPage = idx + 1;
			},
			handleChange(idx) {
				console.log(idx)
				this.newCurrentPage = idx;
			},
			add() {
				if (this.newCurrentPage >= this.imgArr.length) {
					this.newCurrentPage = 1;
				} else {
					this.newCurrentPage = this.newCurrentPage + 1;
				}
				console.log(this.newCurrentPage)
			},
			sub() {
				if (this.newCurrentPage == 1) {
					this.newCurrentPage = this.imgArr.length;
				} else {
					this.newCurrentPage = this.newCurrentPage - 1;
				}
				console.log(this.newCurrentPage)
			},
			// 二手房图片
			getBanner() {
				// this.loading = this.$toast.loading('',{
				//     cover: false
				// });
				this.imgArr = [];
				this.imgArrHx = [];
				this.imgArrDy = [];
				this.$axios({
						method: "get",
						url: "https://apisz.centanet.com/v6/java/json/reply/GetPostImagesRequest",
						params: {
							PostId: this.$route.query.postId,
							ImageWidth: '750',
							ImageHeight: '500',
							cityen: 'sz',
							platform: 'wap'
						},
					})
					.then(res => {
						console.log(res);
						if (res.data.Result && res.data.Result.length > 0) {
							let arr = res.data.Result;
							for (var v of arr) {
								if (v.ImageDescription == "户型图") {
									this.imgArrHx.push(v);
								} else {
									this.imgArrDy.push(v);
								}
							}
							this.imgHxIdx = this.imgArrDy.length + 1;
							this.tempArr = this.imgArrDy.concat(this.imgArrHx);
							this.ershouImg = this.tempArr[0].ImagePath;
						} else {

						}
						this.imgReady = true;
					})
					.catch(error => {
						this.imgReady = true;
						this.$toast.text("网络错误，请稍后再试");
					})
			},
			// 新房图片
			getList() {
				return new Promise((resolve) => {
					this.$axios({
							method: "get",
							url: "/ZhongyuanHouseV2/GetCcesNewPropExtInfoRequest",
							params: {
								estExtId: this.$route.query.estExtId,
								empNo: ""
							}
						})
						.then(res => {
							console.log(res);
							if (res.data.code == 0) {
								if (res.data.data.NewPropImgs && res.data.data.NewPropImgs.length > 0) {
									this.imgArrDy = res.data.data.NewPropImgs;
									this.tempArr = this.imgArrDy.concat(this.imgArrHx);
									this.ershouImg = this.tempArr[0].DefaultImage;
								}
							} else {
								Toast(res.data.msg);
							}
							this.imgReady = true;
							resolve(res);
						})
						.catch(error => {
							this.imgReady = true;
							Indicator.close();
							Toast("网络错误，请稍后再试");
						})
				})
			},
			getHx() {
				this.$axios({
						method: "get",
						url: "/ZhongyuanHouseV2/GetCcesHouseTypesRequest",
						params: {
							estExtId: this.$route.query.estExtId,
						},
					})
					.then(res => {
						console.log(res)
						if (res.data.data && res.data.data.length > 0) {
							for (var v of res.data.data) {
								this.imgArrHx.push(v.Imgs[0])
							}
						}
					})
			},

			getNowDate() { //获取当前时间
				var value = new Date();
				var year = value.getFullYear();
				var month = value.getMonth() + 1;
				var date = value.getDate();
				if (month.toString().length == 1) {
					month = '0' + month
				}
				if (date.toString().length == 1) {
					date = '0' + date
				}
				this.nowTime = year + "-" + month + "-" + date;
				this.startTime = year + "-" + (month - 1) + "-" + date;
			},
			setChooseValue1(param) {
				this.cjTime = param[3];
			},
			openSwitch(param) {
				this[`${param}`] = true;
			},

			closeSwitch(param) {
				this[`${param}`] = false;
			},

			confirm(chooseData) {
				this.cjWy = `${chooseData[0].value}`;
			},
			getEmp() {
				this.cjNo = "";
				if (this.cjName.length < 2) {
					return;
				}
				return new Promise((resolve) => {
					this.$axios({
							method: "get",
							url: "/My/GetEmpInfo",
							headers: this.header_token,
							params: {
								empName: this.cjName,
							}
						})
						.then(res => {
							console.log(res);
							if (res.data.code == 0) {
								this.cjList = res.data.data;
							}
							resolve(res);
						})
						.catch(error => {
							this.$toast.text("网络错误，请稍后再试");
						})
				})
			},
			selectName(n, no) {
				console.log(n);
				this.cjName = n;
				this.cjNo = no;
				this.cjList = "";
			},
			getNewHb() {
				return new Promise((resolve) => {
					this.$axios({
							method: "get",
							url: "/Poster/GetRecomandPosterTemplate",
							headers: this.header_token,
							params: {
								postType: this.hbId,
							}
						})
						.then(res => {
							console.log(res);
							if (res.data.code == 0) {
								this.newHb = res.data.data;
							} else {
								this.$toast.text(res.data.msg);
							}
							resolve(res);
						})
						.catch(error => {
							Indicator.close();
							this.$toast.text("网络错误，请稍后再试");
						})
				})
			},
			getHbList() {
				Indicator.open();
				this.hbType = 1;
				Indicator.open();
				return new Promise((resolve) => {
					this.$axios({
							method: "get",
							url: "/Poster/GetMyPosterTemplateList",
							headers: this.header_token,
							params: {
								postType: this.hbId,
								pageIndex: 1,
								pageSize: this.pSize
							}
						})
						.then(res => {
							console.log(res);
							if (res.data.code == 0) {
								this.ready = true;
								this.hbList = res.data.data.DataList;
								var list = res.data.data.DataList;
								if (list.length > 0) {
									for (let i in this.hbList) {
										this.$set(list[i], 'loading', this.loadImg)
										this.$set(list[i], 'src', list[i].TemplateDisplayImagePath)
									}
									this.hbList = list;
									console.log(this.hbList);
								}
								if (res.data.data.DataList.length == 0) {
									this.getNewHb();
								}
							} else {
								this.$toast.text(res.data.msg);
								if (res.data.code == 500) {
									// 重新登陆
									this.$store.dispatch('logout');
									setTimeout(() => {
										this.$router.replace({
											name: "login"
										});
									}, 500)
								}
							}
							setTimeout(() => {
								Indicator.close();
							}, 300)
							resolve(res);
						})
						.catch(error => {
							Indicator.close();
							this.$toast.text("网络错误，请稍后再试");
						})
				})
			},
			getShopList() {
				if (this.hbId == 2 && !localStorage.getItem('readZp')) {
					localStorage.setItem('readZp', true);
					this.showZp = false
				}
				if (this.hbId == 3 && !localStorage.getItem('readJr')) {
					localStorage.setItem('readJr', true)
					this.showJr = false
				}
				this.hbType = 2;
				Indicator.open();
				return new Promise((resolve) => {
					this.$axios({
							method: "get",
							url: "/Poster/GetSystemPosterTemplateList",
							headers: this.header_token,
							params: {
								postType: this.$route.query.id,
								pageIndex: 1,
								pageSize: this.pSize
							}
						})
						.then(res => {
							console.log(res);
							if (res.data.code == 0) {
								this.shopList = res.data.data.DataList;
								let list = res.data.data.DataList
								if (list.length > 0) {
									for (let i in list) {
										this.$set(list[i], 'loading', this.loadImg)
										this.$set(list[i], 'src', list[i].DisplayImagePath)
									}
									this.shopList = list;
								}
								this.readyShop = true;
							} else {
								this.$toast.text(res.data.msg);
								if (res.data.code == 500) {
									// 重新登陆
									this.$store.dispatch('logout');
									setTimeout(() => {
										this.$router.replace({
											name: "login"
										});
									}, 500)
								}
							}
							setTimeout(() => {
								Indicator.close();
							}, 300)
							resolve(res);
							this.$previewRefresh();
						})
						.catch(error => {
							Indicator.close();
							this.$toast.text("网络错误，请稍后再试");
						})
				})
			},
			buy(e) {
				this.buyInfo = e;
				this.showPay = true;
			},
			buyHb() {
				Indicator.open({
					spinnerType: 'triple-bounce'
				});
				return new Promise((resolve) => {
					this.$axios({
							method: "post",
							url: "/Poster/PostExchangeTemplate",
							headers: this.header_token,
							data: {
								templateId: this.buyInfo.TemplateId
							}
						})
						.then(res => {
							console.log(res);
							resolve(res);
							if (res.data.code == 0) {
								this.showPay = false;
								if (res.data.data.IsSuccess) {
									this.$toast.success('兑换成功');
									this.getShopList();
								} else {
									this.$toast.success(res.data.data.Reamark);
								}
							} else {
								this.$toast.text(res.data.msg);
							}
							Indicator.close();
						})
						.catch(error => {
							Indicator.close();
							this.$toast.text("网络错误，请稍后再试");
						})
				})
			},
			setCj(id, name, empNo, empName) {
				this.cjNo = empNo;
				this.cjName = empName;
				this.cjTime = "";
				this.cjXq = "";
				this.cjWy = "";
				this.showCj = true;
				this.infoId = id;
				this.infoName = name;
			},
			bigHb(id, name, tag) {
				console.log(tag);
				// this.shareText=shareAplus;
				if (this.$route.query.id == 7) {
					if (!this.cjName) {
						this.$toast.text("请输入并选择下拉框中的名字");
						return;
					} else if (!this.cjTime) {
						this.$toast.text("请选择成交时间");
						return;
					} else if (!this.cjXq) {
						this.$toast.text("请输入成交小区");
						return;
					} else if (!this.cjWy) {
						this.$toast.text("请选择成交物业");
						return;
					} else if (!this.cjNo) {
						this.$toast.text("姓名请从输入信息的下拉框中选择");
						return;
					}
					id = this.infoId;
					name = this.infoName;
				}
				this.loading = this.$toast.loading('', {
					cover: false
				});
				this.bigName = name;
				if (this.$route.query.id != 1 && this.$route.query.id != 6) {
					this.ershouImg = ""
				}
				return new Promise((resolve) => {
					this.$axios({
							method: "post",
							url: "/My/CreatePosterTemplate",
							headers: this.header_token,
							data: {
								MyTemplateId: id,
								adsNo: this.adsNo,
								estExtId: this.estExtId,
								empNo: this.cjNo || this.empNo,
								contractDate: this.cjTime,
								estName: this.cjXq,
								tradeType: this.cjWy,
								DisplayImagePath: this.ershouImg,
								articlesId: Number(this.zxId) || 0,
								FeatureName: tag
							}
						})
						.then(res => {
							console.log(res);
							if (res.data.code == 0) {
								this.showCj = false;
								this.showImg = false;
								this.bigMsg = res.data.data;
								this.bigImg = res.data.data.ShareImageUrl;
								this.show = true; // show popup
								// if(this.inApp&&this.bigImg){
								// 	setTimeout(()=>{
								// 		this.share();
								// 	},1000)
								// }
							} else {
								this.$toast.text(res.data.msg);
							}
							Indicator.close();
							setTimeout(() => {
								this.loading.hide();
							}, 2000)
							resolve(res);
						})
						.catch(error => {
							Indicator.close();
							this.loading.hide();
							this.$toast.text("网络错误，请稍后再试");
						})
				})
			},

			// A+分享
			share() {
				console.log('分享')
				const img = this.bigImg
				this.openShare(img)
			},

			openShare(img) {
				// window.callback = this.callback
				window.location.href = "centaline:" + this.shareParams(img);
			},

			// A+分享回调
			callback(item) {
				this.testCall = " ";
				// window.callback = null
				if (item) {
					setTimeout(() => {
						this.getShareLog(item);
					}, 500)
				}
			},

			getShareLog(shareName) {
				return new Promise((resolve) => {
					this.$axios({
							method: "post",
							url: "/Poster/PostMyTemplateShareLog",
							headers: this.header_token,
							data: {
								Id: this.bigMsg.Id,
								SharedDestination: shareName
							}
						})
						.then(res => {
							console.log(res);
							resolve(res);
							if (res.data.code == 0) {
								if (this.$route.query.id == '7') {
									this.sucCj = true;
								}
								if (res.data.data.IsSuccess) {
									if (res.data.data.Reamark > 0) {
										this.hasYb = true;
										this.shareNum = res.data.data.Reamark;
									}
								} else {
									if (this.$route.query.id != '7' && res.data.data.Reamark > 0) {
										// this.$toast.text("您已获得"+res.data.data.Reamark+"元宝，已达活动奖励上限");
										this.over = true;
										this.overNum = res.data.data.Reamark;
									} else {
										// this.shareError=true;
									}
								}
							}
						})
						.catch(error => {
							this.$toast.text("网络错误，请稍后再试");
						})
				})
			},

			shareParams(i) {
				var json = this.dataJson(i);
				var jsonData = JSON.stringify({
					action: "share",
					data: json
				});
				return encodeURIComponent(jsonData);
			},

			dataJson(src) {
				return JSON.stringify({
					channel: ["saveImage", "wxImage", "wxMomentsImage"], //["wx","wxImage","wxMomentsImage","QQ"]
					img: src,
					title: this.bigName,
					description: "",
					link: location.href
				});
			},
		}
	}
</script>

<style scoped>
	.hb {
		background-color: #E6E6E6;
		min-height: 100vh;
	}

	/* .hbY{background-color: #fff;} */
	.hbTab {
		text-align: center;
		padding: 0.4rem 0;
		font-size: 0.32rem;
		color: #333;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		z-index: 7;
		background-color: #fff;
		box-shadow: 0px 2px 6px 2px rgb(0 0 0 / 6%);
		background-color: #fff;
	}

	.hbTab a {
		display: inline-block;
		background-color: #fff;
		border-radius: 0.35rem;
		box-shadow: 0 0 2px #ccc;
	}

	.hbTab label {
		display: inline-block;
		width: 2.6rem;
		height: 0.7rem;
		margin: 0 0.2rem 0 0;
		line-height: 0.7rem;
		color: #333;
		position: relative;
	}

	.hbTab label:last-child {
		margin: 0;
	}

	.hbTab label.on {
		background: linear-gradient(134deg, #FB6F52 0%, #F3240A 100%);
		color: #fff;
		border-radius: 0.35rem;
	}

	.hbTab label span {
		width: 0.12rem;
		height: 0.12rem;
		display: block;
		background-color: #FF0000;
		position: absolute;
		top: 0.2rem;
		right: 0.45rem;
		border-radius: 50%;
	}

	.hbList {
		padding-top: 1.8rem;
	}

	.clist {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		padding: 0 0.3rem;
	}

	.clist li {
		width: 2.16rem;
		text-align: center;
		position: relative;
		margin-bottom: 0.3rem;
		box-shadow: 0 2px 3px #ccc;
		border-radius: 0.1rem;
		/* padding-bottom: 0.3rem; */
		background: #fff;
		overflow: hidden;
	}

	.clist li p {
		font-size: 0.32rem;
		color: #333;
		padding: 0 0.04rem;
		margin: 0.06rem 0 0.15rem;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		text-align: center;
		font-weight: 540;
	}

	.clist li p.sp {
		font-size: 0.24rem;
		color: #333;
		position: absolute;
		bottom: 0.6rem;
		left: 0;
		background-color: #000;
		opacity: 0.7;
		width: 100%;
		margin-bottom: 0;
		height: 0.8rem;
		padding-top: 0.12rem;
	}

	.clist li p span {
		color: #fff;
		font-size: 0.36rem;
		font-weight: 550;
		margin-right: 0.2rem;
	}

	.clist li p span i {
		font-style: normal;
		font-size: 0.24rem;
		font-weight: 400;
	}

	.clist li p a {
		text-decoration: line-through;
		color: #999;
		font-size: 0.28rem;
	}

	.clist li p a i {
		font-size: 0.2rem;
		font-style: normal;
	}

	.clist li button {
		width: 2.16rem;
		height: 0.6rem;
		line-height: 0.58rem;
		background: linear-gradient(180deg, #7BACEE 0%, #6089D9 100%);
		color: #fff;
	}

	/* .clist li button{margin-bottom: 0.3rem;} */
	.clist li button.hasBuy {
		background: #ccc;
	}

	.clist li button.overOld {
		background: #ccc;
		color: #fff;
	}

	.clist::after {
		content: "";
		width: 2.16rem;
		height: 0;
		display: block;
	}

	.bigHb {
		width: 6rem;
		min-height: 11.2rem;
		position: relative;
		background: #fff url(../assets/img/pNone.png) center no-repeat;
		background-size: 4rem;
		padding: 0.3rem;
		overflow: hidden;
	}

	/** 海报大图预取 */
	.poster-prefetch {
		position: absolute;
		width: 1px;
		height: 1px;
		left: -100%;
		top: -100%;
		opacity: 0;
	}

	/** 海报图片加载错误时处理 */
	.bigHbError {
		display: flex;
		flex-direction: column;
		background: none;
	}

	.bigHbError>.bigS,
	.bigHbError>.bigHc {
		display: none;
	}

	.bigHbError>.poster-error {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.bigHbError .poster-error-icon {
		color: ref;
		margin-bottom: .3rem;
	}

	.bigHbError .poster-error-text {
		color: #999;
		margin-bottom: 3rem;
	}

	.bigHb img {
		display: block;
		width: 100%;
	}

	.bigHb label {
		width: 0.6rem;
		height: 0.6rem;
		background: url(../assets/img/r-close.png) right top no-repeat;
		background-size: 0.4rem;
		position: absolute;
		right: 0.2rem;
		top: 0.2rem;
	}

	.hbNone {
		padding-top: 6rem;
		height: 100%;
		background: url(../assets/img/hb-none.png) center 1.6rem no-repeat;
		background-size: 4rem;
		text-align: center;
		font-size: 0.28rem;
		color: #666;
	}

	.nhb {
		height: 2rem;
		width: 100%;
		position: absolute;
		bottom: 1.4rem;
		left: 0;
		padding: 0.26rem 0.39rem;
		background-color: #fff;
	}

	.nhb label {
		width: 1.48rem;
		float: left;
		display: inline-block;
		height: 1.48rem;
		overflow: hidden;
	}

	.nhbR {
		width: 5.2rem;
		float: left;
		text-align: left;
		padding-left: 0.2rem;
	}

	.nhbR h5 {
		font-size: 0.32rem;
		font-weight: 400;
		color: #333;
	}

	.nhbR p {
		font-size: 0.28rem;
		font-weight: 400;
		color: #666;
		margin-top: 0.2rem;
		width: 2.9rem;
		overflow: hidden;
	}

	.nhb button {
		position: absolute;
		right: 0.28rem;
		bottom: 0.26rem;
		background: linear-gradient(134deg, #FB6F52 0%, #F3240A 100%);
		color: #fff;
		border-radius: 0.35rem;
		width: 2.2rem;
		height: 0.65rem;
	}

	.nhbClose {
		display: block;
		width: 0.6rem;
		height: 0.6rem;
		background: url(../assets/img/r-close.png) right top no-repeat;
		background-size: 0.44rem;
		right: 0.2rem;
		top: 0.2rem;
		position: absolute;
	}

	.hbTip {
		font-style: normal;
		font-size: 0.24rem;
		color: #fff;
		display: inline-block;
		padding: 0.05rem 0.2rem;
		background-color: #000;
		opacity: 0.66;
		position: absolute;
		top: 0;
		left: 0;
		border-radius: 0 0 0.06rem 0;
	}

	.myIntr {
		width: 6.2rem;
		height: 5.6rem;
		background-color: #fff;
	}

	.myCj {
		height: 8.2rem;
	}

	.miTop {
		height: 1.3rem;
		background: linear-gradient(134deg, #FB6F52 0%, #F3240A 100%);
		line-height: 1.3rem;
		text-align: center;
		font-size: 0.4rem;
		font-weight: 600;
		color: #fff;
	}

	.miContent {
		padding: 0.3rem;
	}

	.miContent textarea {
		width: 100%;
		height: 2rem;
		background-color: #eee;
		border: 1px solid #ddd;
		padding: 0.2rem;
	}

	.miBtn {
		margin-top: 0.6rem;
		text-align: center;
	}

	.miBtn label {
		display: inline-block;
		width: 2.4rem;
		height: 0.8rem;
		border-radius: 0.4rem;
		margin: 0 0.2rem;
		background-color: #ccc;
		line-height: 0.8rem;
		font-size: 0.36rem;
		color: #fff;
	}

	.miBtn label:last-child {
		background: linear-gradient(134deg, #FB6F52 0%, #F3240A 100%);
	}

	.micM {
		font-size: 0.36rem;
		margin: 0.6rem 0 0.4rem;
		line-height: 1.6;
	}

	.bigF {
		font-size: 0.32rem;
		font-weight: 500;
		text-align: center;
		margin-bottom: 0.1rem;
	}

	.bigS {
		font-size: 0.24rem;
		font-weight: 400;
		text-align: center;
		color: #999;
		margin-bottom: 0.15rem;
	}

	.bigHc {
		overflow-y: auto;
		height: 9.61rem;
	}

	.hbImg {
		width: 2.16rem;
		height: 4.68rem;
		overflow: hidden;
		border-radius: 0.06rem;
		position: relative;
	}

	.hbImg img {
		display: block;
		height: 100%;
	}

	.oldHb {
		position: absolute;
		padding: 2px 0.2rem;
		z-index: 4;
		background-color: #ccc;
		color: #fff;
		position: absolute;
		left: 0;
		top: 0;
		font-size: 0.24rem;
		border-bottom-right-radius: 0.3rem;
	}

	/* 全面屏 */
	@media screen and (min-device-height : 812px) {
		.bigHb {
			width: 6.7rem;
			min-height: 12rem;
		}
	}

	.sModel {
		position: fixed;
		width: 100%;
		height: 100%;
		z-index: 9997;
	}

	.bj {
		position: fixed;
		background: #000;
		opacity: 0.5;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
		z-index: 91;
	}

	.sMsg {
		font-size: 16px;
		position: fixed;
		left: 50%;
		top: 50%;
		margin: -4.5rem 0 0 -3.75rem;
		width: 7.5rem;
		height: 7.2rem;
		background: url(../assets/img/tipBj.png) center no-repeat;
		background-size: 5rem;
		z-index: 92;
		padding: 0.8rem 0.7rem;
		border-radius: 8px;
		transition: all 0.5s ease-in;
		animation: dh 0.8s 1;
	}

	.bMsg {
		font-size: 16px;
		position: fixed;
		left: 50%;
		top: 50%;
		margin: -4.5rem 0 0 -3.75rem;
		width: 7.5rem;
		height: 7.2rem;
		background: url(../assets/img/b.png) center no-repeat;
		background-size: 5.4rem;
		z-index: 92;
		;
		animation: bh 0.5s 1 forwards;
	}

	@keyframes dh {
		0% {
			transform: scale(0);
		}

		60% {
			transform: scale(1.1);
		}

		100% {
			transform: scale(1);
		}
	}

	@keyframes bh {
		0% {
			transform: scale(0.4);
		}

		100% {
			transform: scale(1);
		}
	}

	.hb .bRead {
		position: fixed;
		left: 50%;
		top: 50%;
		margin: -4.5rem 0 0 -3.75rem;
		width: 7.5rem;
		height: 7.2rem;
		background: url(../assets/static/fiveM.png) center bottom no-repeat;
		background-size: 4.63rem;
		z-index: 92;
		padding-top: 1.4rem;
		text-align: center;
		font-size: 0.45rem;
		font-weight: 600;
		color: #9D461C;
		animation: bh 0.5s 1 forwards;
	}

	.hb .bRead p {
		height: 1.74rem;
	}

	.hb .bRead strong {
		font-size: 1.33rem;
	}

	.mClose {
		position: absolute;
		right: 1.4rem;
		top: 1rem;
		cursor: pointer;
		width: 0.8rem;
		height: 0.8rem;
		display: block;
		background: url(../assets/img/nClose.png) center no-repeat;
		background-size: 0.27rem;
	}

	.cjM {
		padding-top: 0.1rem;
	}

	.cjInput input {
		width: 5.4rem;
		height: 0.8rem;
		background-color: #EDEDED;
		border-radius: 0.4rem;
		border: 0;
		padding-left: 0.4rem;
		font-size: 0.3rem;
	}

	.cjInput {
		text-align: center;
		margin-bottom: 0.3rem;
		position: relative;
	}

	.cjInput ul {
		width: 5.4rem;
		position: absolute;
		top: 0.8rem;
		left: 0.1rem;
		z-index: 3;
		padding: 0.2rem 0.2rem 0.2rem 0.3rem;
		background-color: #f5f5f5;
	}

	.cjInput ul li {
		display: block;
		margin-bottom: 0.2rem;
		line-height: 0.6rem;
		font-size: 0.24rem;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		text-align: left;
	}

	.fixR {
		position: fixed;
		top: 63%;
		right: 0;
		z-index: 9;
	}

	.fixR img {
		width: 1.2rem;
	}

	.sucHb {
		width: 6.4rem;
		height: 8.5rem;
		background: url(../assets/static/cjUp.png) center no-repeat;
		background-size: 100%;
		position: relative;
	}

	.upB {
		position: absolute;
		bottom: 0.6rem;
		left: 1.4rem;
		height: 1rem;
		width: 3.5rem;
	}

	.hb .popup-box {
		overflow-y: visible;
	}

	.sucHb .close {
		display: block;
		width: 0.69rem;
		height: 0.69rem;
		background: url(../assets/static/close.png) center no-repeat;
		background-size: 100%;
		position: absolute;
		bottom: -1rem;
		left: 2.85rem;
	}

	.selectImg .selectC {
		background: #000;
		padding-top: 0.6rem;
		height: 100vh;
		width: 7.5rem;
		position: relative;
	}

	.selectC label {
		width: 0.8rem;
		height: 0.8rem;
		background: url(../assets/img/nClose.png) center no-repeat;
		background-size: 0.3rem;
		position: absolute;
		right: 0;
		top: 0;
	}

	.sImg {
		position: absolute;
		top: 50%;
		left: 0;
		margin-top: -3.2rem;
		width: 7.5rem;
	}

	.hb .tagLx {
		width: 100%;
		background: none;
		text-align: center;
		padding-left: 0.3rem;
	}

	.hb .tagLx span {
		display: block;
		width: 2rem;
		height: 0.6rem;
		line-height: 0.6rem;
		float: left;
		font-size: 0.3rem;
		color: #fff;
	}

	.hb .tagLx span.on {
		background-color: #3b3b3b;
		border-radius: 0.3rem;
	}

	.hb .nut-swiper {
		height: 5rem;
	}

	.hb .nut-swiper .nut-swiper-slide {
		width: 7.5rem;
		height: 5rem;
	}

	.hb .nut-swiper img {
		width: 100%;
	}

	.siTip {
		color: #fff;
		text-align: center;
		margin-top: 0.2rem;
	}

	.hb .tagLx span.on strong {
		display: block;
		width: 0.6rem;
		height: 2px;
		background-color: #fff;
		margin: 0.2rem auto;
	}

	.nBtn {
		position: absolute;
		top: 2.2rem;
		left: 0;
		padding: 0 0.4rem;
		width: 100%;
		height: 0.64rem;
	}

	.nBtn span {
		display: block;
		width: 0.64rem;
		height: 0.64rem;
		background: url(../assets/static/icon-l.png) center no-repeat;
		background-size: 100%;
		position: absolute;
		top: 0;
	}

	.nBtn span:first-child {
		left: 0.4rem;
	}

	.nBtn span:last-child {
		right: 0.4rem;
		background: url(../assets/static/icon-r.png) center no-repeat;
		background-size: 100%;
	}

	.setBtn {
		width: 4rem;
		height: 0.8rem;
		background: linear-gradient(134deg, #FB6F52 0%, #F3240A 100%);
		color: #fff;
		display: block;
		border-radius: 0.12rem;
		font-size: 0.32rem;
		position: fixed;
		bottom: 1.4rem;
		left: 1.75rem;
	}

	.overJr {
		position: relative;
	}

	.op5 {
		width: 100%;
		height: 100%;
		background-color: #000;
		opacity: 0.3;
		position: absolute;
		left: 0;
		top: 0;
		z-index: 3;
	}

	.diyAll {
		position: absolute;
		bottom: 1rem;
		left: 0.15rem;
		width: 7.2rem;
		padding: 0.4rem 0.2rem;
		background-color: #1c1c1c;
		border-radius: 0.2rem;
	}

	.diyTag {
		color: #fff;
		display: flex;
		justify-content: space-between;
		border-radius: 0.12rem;
		flex-wrap: wrap;
	}

	.diyTag span {
		display: inline-block;
		width: 22.5%;
		text-align: center;
		padding: 0.15rem 0.1rem;
		border-radius: 0.3rem;
		margin-bottom: 0.4rem;
		/* border: 1px solid #F3240A;color: #add2e2; */
		background: #404040;
		color: #fff;
	}

	/* .diyTag span.on{background: linear-gradient(134deg, #FB6F52 0%, #F3240A 100%);color: #fff;} */
	.diyAll p {
		color: #989898;
		font-size: 0.28rem;
		background: url(../assets/img/i-tip.png) left center no-repeat;
		background-size: 0.28rem;
		height: 0.4rem;
		line-height: 0.4rem;
		width: 4.1rem;
		padding-left: 0.4rem;
		margin: 0 auto;
		text-align: center;
	}

	/* 选择标签 */
	/* 	.myIntr{width: 6.2rem;height: 5.6rem;background-color: #fff;border-radius: 0.1rem;}
	.myCj{height: 8.2rem;}
	.miTop{height: 1.3rem;background: linear-gradient(134deg, #FB6F52 0%, #F3240A 100%);line-height: 1.3rem;text-align: center;font-size: 0.4rem;font-weight: 600;color: #fff;}
	.miContent{padding: 0.3rem;}
	.miContent textarea{width: 100%;height: 2rem;background-color: #eee;border: 1px solid #ddd;padding: 0.2rem;}
	.miBtn{margin-top: 0.8rem;text-align: center;}
	.miBtn label{display: inline-block;width: 2.4rem;height: 0.8rem;border-radius: 0.4rem;margin: 0 0.2rem;background-color: #ccc;line-height: 0.8rem;font-size: 0.36rem;color: #fff;}
	.miBtn label:last-child{background: linear-gradient(134deg, #FB6F52 0%, #F3240A 100%);}
	.micM{font-size: 0.36rem;margin: 0.8rem 0 0.4rem;line-height: 1.6;}
	.miContent h4{font-size: 0.36rem;text-align: center;font-weight: 550;padding-top: 0.2rem;}
	.micM label{display: inline-block;width: 1.2rem;height: 0.6rem;line-height: 0.6rem;text-align: center;background-color: #F3F6F8;font-size: 0.24rem;border-radius: 0.05rem;}
	.micM label.on{background-color: #FF2D19;color: #fff;}
	.mdM{text-align: center;display: flex;justify-content: space-between;} */
</style>
