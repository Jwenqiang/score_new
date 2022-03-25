<template>
	<div class="custom">
		<div class="hbTab">
			<a>
				<label :class="cType==1?'on':''" @click="changeTag(1)">抢商机<span></span></label>
				<label :class="cType==2?'on':''" @click="changeTag(2)">我的商机<span></span></label>
			</a>
		</div>
		<div class="cmTab" v-if="cType==2">
			<label :class="tabOn=='yx'?'on':''" @click="setTab('yx')">意向度<span v-if="yxText"><i> ：</i>{{yxText}}</span><img src="images/custom/my-down.png" class="cmDown"/><img src="images/custom/my-up.png" class="cmUp"/></label>
			<label :class="tabOn=='dh'?'on':''" @click="setTab('dh')">打电话<span v-if="dhText"><i> ：</i>{{dhText}}</span><img src="images/custom/my-down.png" class="cmDown"/><img src="images/custom/my-up.png" class="cmUp"/></label>
			<label :class="tabOn=='fk'?'on':''" @click="setTab('fk')">写反馈<span v-if="fkText"><i> ：</i>{{fkText}}</span><img src="images/custom/my-down.png" class="cmDown"/><img src="images/custom/my-up.png" class="cmUp"/></label>
		</div>
		<div class="tabShow" v-if="tabOn&&cType==2">
			<div class="tabBj" @click="tabOn=''"></div>
			<div class="t-yx" v-if="tabOn=='yx'">
				<label :class="tabYx=='0'?'on':''" @click="selectMy('tabYx','0','不限')">不限</label>
				<label :class="tabYx=='1'?'on':''" @click="selectMy('tabYx','1','高意向')">高意向</label>
				<label :class="tabYx=='2'?'on':''" @click="selectMy('tabYx','2','中意向')">中意向</label>
				<label :class="tabYx=='3'?'on':''" @click="selectMy('tabYx','3','低意向')">低意向</label>
			</div>
			<div class="t-yx" v-if="tabOn=='dh'">
				<label :class="tabDh=='0'?'on':''" @click="selectMy('tabDh','0','不限')">不限</label>
				<label :class="tabDh=='1'?'on':''" @click="selectMy('tabDh','1','已拨打')">已拨打</label>
				<label :class="tabDh=='2'?'on':''" @click="selectMy('tabDh','2','未拨打')">未拨打</label>
			</div>
			<div class="t-yx" v-if="tabOn=='fk'">
				<label :class="tabFk=='0'?'on':''" @click="selectMy('tabFk','0','不限')">不限</label>
				<label :class="tabFk=='1'?'on':''" @click="selectMy('tabFk','1','反馈1次')">反馈1次</label>
				<label :class="tabFk=='2'?'on':''" @click="selectMy('tabFk','2','反馈>=2次')">反馈>=2次</label>
				<label :class="tabFk=='3'?'on':''" @click="selectMy('tabFk','3','未反馈')">未反馈</label>
			</div>
		</div>
		<div class="customC">
			<mt-loadmore :top-method="loadTop" ref="loadmore">
			<!-- 抢客户 -->
			<template v-if="cType==1">
				<template v-if="cList && cList.length">
					<div class="ccList" v-for="(item,index) in cList" :class="showUp==index?'hoverBox':''">
						<div class="ccBox" @click="toggle(index)">
							<div class="ccTop">
								<label>
									<template v-if="showUp==index">
										<img src="images/custom/t-man1.png" v-if="item.Gender==0"/><img src="images/custom/t-man1.png" v-else-if="item.Gender==1"/><img src="images/custom/t-woman1.png" v-else-if="item.Gender==2"/><img src="images/custom/t-none1.png" v-else/>
									</template>
									<template v-else>
										<img src="images/custom/t-man.png" v-if="item.Gender==0"/><img src="images/custom/t-man.png" v-else-if="item.Gender==1"/><img src="images/custom/t-woman.png" v-else-if="item.Gender==2"/><img src="images/custom/t-none.png" v-else/>
									</template>
									
									<div class="ccUser">
										<h4>{{item.UserTitle || item.CallerNumberDisplay}}</h4>
										<p>{{item.CreateTime | agoTime}}</p>
									</div>
								</label>
								<span class="more"></span>
							</div>
							<div class="pli p-es" v-if="item.fav_ershou_estatename1">
								<label>二手偏好：</label>
								<div class="plBox">
									<span><i>1</i>{{item.fav_ershou_estatename1}}</span>
									<span v-if="item.fav_ershou_estatename2"><i>2</i>{{item.fav_ershou_estatename2}}</span>
									<span v-if="item.fav_ershou_estatename3"><i>3</i>{{item.fav_ershou_estatename3}}</span>
								</div>
							</div>
							<div class="pli p-xf" v-if="item.fav_xinfang_estatename1">
								<label>新房偏好：</label>
								<div class="plBox">
									<span><i>1</i>{{item.fav_xinfang_estatename1}}</span>
									<span v-if="item.fav_xinfang_estatename2"><i>2</i>{{item.fav_xinfang_estatename2}}</span>
									<span v-if="item.fav_xinfang_estatename3"><i>3</i>{{item.fav_xinfang_estatename3}}</span>
								</div>
							</div>
							<div class="pli p-jg" v-if="item.ershouPrice1">
								<label>价格偏好：</label>
								<div class="plBox">
									<span><i>1</i>{{item.ershouPrice1}}</span>
									<span v-if="item.ershouPrice2"><i>2</i>{{item.ershouPrice2}}</span>
								</div>
							</div>
							<!-- 老的数据展示 -->
							<div class="pli p-qy" v-if="item.EstateRegion2&&item.EstateRegion2!='--'">
								<label>意向区域：</label>
								<span><template v-if="item.EstateRegion1&&item.Type==2">{{item.EstateRegion1}}-</template>{{item.EstateRegion2}}</span>
							</div>
							<div class="pli p-hx" v-if="item.HuXing">
								<label>偏好户型：</label>
								<span>{{item.HuXing}}</span>
							</div>
							<div class="pli p-fy" v-if="item.EstateName&&item.EstateName!='--'">
								<label>楼盘名称：</label>
								<span><template v-if="item.EstateName=='定制找房'">{{item.SubSourceName}}</template><template v-else><a :href="item.LinkUrl" v-if="item.LinkUrl">{{item.EstateName}}</a><template v-else>{{item.EstateName}}</template></template></span>
							</div>
							<div class="pli p-fh" v-if="item.BuildingNo">
								<label>楼栋房号：</label>
								<span>{{item.BuildingNo}}</span>
							</div>
							<div class="pli p-jg" v-if="item.YuSuanJiaGe">
								<label>预算范围：</label>
								<span>{{item.YuSuanJiaGe}}</span>
							</div>
							<div class="pli p-wt" v-if="item.SalePrice>0">
								<label>委托售价：</label>
								<span>{{item.SalePrice}}万</span>
							</div>
							<div class="pli p-wt" v-if="item.RentPrice>0">
								<label>委托租价：</label>
								<span>{{item.RentPrice}}元/月</span>
							</div>
							<div class="pli p-ly" v-if="item.SourceName">
								<label>商机来源：</label>
								<span>{{item.SourceName}}<template v-if="item.SubSourceName">-{{item.SubSourceName}}</template></span>
							</div>
<!-- 							<div class="pli" v-if="item.CalledMsg&&item.ChannelType!='经纪人'&&item.Type!=2">
								<label>呼叫信息：</label>
								<span>{{item.CalledMsg}}</span>
							</div> -->
							<!--  -->
							
						</div>	
						<div class="pli p-old" v-if="item.LastVisit">
							<label>最新访问：<a :href="item.LastVisitUrl" v-if="item.LastVisitUrl">{{item.LastVisit}}</a><template v-else>{{item.LastVisit}}</template></label>
							<span></span>
						</div>
						<div class="ccBtom">
							<button @click="buy(item)">{{item.BuyYuanBaoRealNum}}丨立即兑换</button>
						</div>
					</div>
					<p class="noList" v-if="count>pSize">正在加载</p>
					<p class="noList" v-else-if="count<=pSize&&loadOver"><span></span>&nbsp;我是有底线的&nbsp;<span></span></p>
				</template>
				<div v-else-if="cList.length==0&&ready" class="empty-shang-ji-wrap">
					<img class="empty-shang-ji" src="@/assets/img/empty-shang-ji-public.png" />
					<p>您来晚了，暂无商机信息</p>
				</div>
			</template>
			</mt-loadmore>
			<!-- 我的客户 -->
			<mt-loadmore :top-method="loadTop" ref="loadmore">
			<template v-if="cType==2">
				<template>
					<a :href="'tel:'+call" ref="cphone" style="display: none;" @click="setSc"></a>
						<!--  -->
						<div class="ccList hoverBox" :class="item.IsRelease==1?'old':''" v-for="(item,index) in myList" :key="index">
							<div class="ccBox">
								<div class="ccTop">
									<label>
										<template v-if="item.IsRelease==1">
											<img src="images/custom/t-man2.png" v-if="item.Gender==0"/><img src="images/custom/t-man2.png" v-else-if="item.Gender==1"/><img src="images/custom/t-woman2.png" v-else-if="item.Gender==2"/><img src="images/custom/t-none2.png" v-else/>
										</template>
										<template v-else>
											<img src="images/custom/t-man1.png" v-if="item.Gender==0"/><img src="images/custom/t-man1.png" v-else-if="item.Gender==1"/><img src="images/custom/t-woman1.png" v-else-if="item.Gender==2"/><img src="images/custom/t-none1.png" v-else/>
										</template>
										<div class="ccUser">
											<h4>{{item.UserTitle || item.CallerNumberDisplay}}<i class="cc-edit" @click="setChange(item.Id)" v-if="item.IsRelease!=1"></i></h4>
											<p>{{item.CreateTime | agoTime}}</p>
										</div>
									</label>
									<span class="ccRecord" @click="getRecord(item.Id,item.Type)" v-if="item.IsRelease!=1">跟进记录</span>
								</div>
								<div class="pli p-es" v-if="item.fav_ershou_estatename1">
									<label>二手偏好：</label>
									<div class="plBox">
										<span><i>1</i>{{item.fav_ershou_estatename1}}</span>
										<span v-if="item.fav_ershou_estatename2"><i>2</i>{{item.fav_ershou_estatename2}}</span>
										<span v-if="item.fav_ershou_estatename3"><i>3</i>{{item.fav_ershou_estatename3}}</span>
									</div>
								</div>
								<div class="pli p-xf" v-if="item.fav_xinfang_estatename1">
									<label>新房偏好：</label>
									<div class="plBox">
										<span><i>1</i>{{item.fav_xinfang_estatename1}}</span>
										<span v-if="item.fav_xinfang_estatename2"><i>2</i>{{item.fav_xinfang_estatename2}}</span>
										<span v-if="item.fav_xinfang_estatename3"><i>3</i>{{item.fav_xinfang_estatename3}}</span>
									</div>
								</div>
								<div class="pli p-jg" v-if="item.ershouPrice1">
									<label>价格偏好：</label>
									<div class="plBox">
										<span><i>1</i>{{item.ershouPrice1}}</span>
										<span v-if="item.ershouPrice2"><i>2</i>{{item.ershouPrice2}}</span>
									</div>
								</div>
								<!-- 老的数据展示 -->
								<div class="pli p-qy" v-if="item.EstateRegion2&&item.EstateRegion2!='--'">
									<label>意向区域：</label>
									<span><template v-if="item.EstateRegion1&&item.Type==2">{{item.EstateRegion1}}-</template>{{item.EstateRegion2}}</span>
								</div>
								<div class="pli p-hx" v-if="item.HuXing">
									<label>偏好户型：</label>
									<span>{{item.HuXing}}</span>
								</div>
								<div class="pli p-fy" v-if="item.EstateName&&item.EstateName!='--'">
									<label>楼盘名称：</label>
									<span><template v-if="item.EstateName=='定制找房'">{{item.SubSourceName}}</template><template v-else><a :href="item.LinkUrl" v-if="item.LinkUrl">{{item.EstateName}}</a><template v-else>{{item.EstateName}}</template></template></span>
								</div>
								<div class="pli p-fh" v-if="item.BuildingNo">
									<label>楼栋房号：</label>
									<span>{{item.BuildingNo}}</span>
								</div>
								<div class="pli p-jg" v-if="item.YuSuanJiaGe">
									<label>预算范围：</label>
									<span>{{item.YuSuanJiaGe}}</span>
								</div>
								<div class="pli p-wt" v-if="item.SalePrice>0">
									<label>委托售价：</label>
									<span>{{item.SalePrice}}万</span>
								</div>
								<div class="pli p-wt" v-if="item.RentPrice>0">
									<label>委托租价：</label>
									<span>{{item.RentPrice}}元/月</span>
								</div>
								<div class="pli p-ly" v-if="item.SourceName">
									<label>商机来源：</label>
									<span>{{item.SourceName}}<template v-if="item.SubSourceName">-{{item.SubSourceName}}</template></span>
								</div>
							</div>	
							<div class="pli p-old" v-if="item.LastVisit">
								<label>最新访问：<a :href="item.LastVisitUrl" v-if="item.LastVisitUrl">{{item.LastVisit}}</a><template v-else>{{item.LastVisit}}</template></label>
								<span></span>
							</div>
							<div class="ccBM">
								<button class="cb-hx" v-if="item.CompeteType==2" @click="goHX(item.Id,item.Type,item.UserTitle)">画像</button>
								<button class="cb-hx" style="background-color: #ccc;" @click="hxTip" v-else>画像</button>
								<button class="cb-fk" @click="change(item.Id,item.Type)">反馈</button>
								<button class="cb-dh" @click="getMobile(item.Id,item.Type)" v-if="item.IsMobile==1||item.Type==4">电话</button>
								<button class="cb-dh" v-else><a :href="'tel:'+item.CallerNumberDisplay" @click="setSc">电话</a></button>
							</div>
							<div class="cr-record">
								<p><label v-if="item.LastCusLevelName">{{item.LastCusLevelName}}</label><label v-if="item.LastCusTitleName">{{item.LastCusTitleName}}</label><span v-if="item.LastReviewTime">最近反馈：{{item.LastReviewTime}}</span></p>
							</div>
						</div>
						<!--  -->
					<p class="noList" v-if="countMy>pSizeMy">正在加载</p>
					<p class="noList" v-else-if="countMy<=pSizeMy&&loadOver&&myList"><span></span>&nbsp;我是有底线的&nbsp;<span></span></p>
				</template>
				<div v-if="myList.length==0&&myReady" class="empty-shang-ji-wrap">
					<img class="empty-shang-ji" src="@/assets/img/empty-shang-ji-self.png" />
					<p>您尚未兑换商机信息</p>
				</div>
			</template>
			</mt-loadmore>
		</div>
		<nut-popup style="border-radius: 0.12rem;" closeable v-model="showRecord">
			<div class="myIntr" style="min-height: 6.58rem;">
				<div class="ccRecord" style="padding-top: 0.3rem;">
					<h4 style="margin-bottom: 0.2rem;">记录</h4>
					<div class="ccrTag"><label :class="jl==1?'on':''" @click="jl=1">拨打记录<!-- <i></i> --></label><label :class="jl==2?'on':''" @click="jl=2">商机反馈<!-- <i></i> --></label></div>
					<!--  v-if="record.length==0" -->
					<div class="ccMr">
<!-- 						<div class="ccrInfo" v-for="item in record">
							{{item.CreateTime}}  拨打客户电话
						</div> -->
						<template v-if="jl==1">
							<template v-if="record.length>0">
							<div class="ccrInfo ccrInfoS" style="text-align: center;" v-for="item in record" :key="item.Id">
								<span>{{item.CreateTime}}</span>  <span>拨打客户电话</span> <span v-if="item.Result=='ANSWERED'" style="color: #00CC66;">已接听</span><span style="color: #F42C1D;" v-else>未接听</span>
							</div>
							</template>
							<div class="infoNone" v-else>
								暂无拨打电话记录
							</div>
						</template>
						<template v-else>
							<template v-if="recordCommt.length>0">
							<div class="ccrInfo" v-for="item in recordCommt" :key="item.Id">
								<span>{{item.CreateTime}}</span>  <span><i>{{item.CusLevelName}}</i>{{item.TitleName}}</span>
							</div>
							</template>
							<div class="infoNone" style="text-align: center;" v-else>
								暂无反馈记录
							</div>
						</template>
					</div>
<!-- 					<div class="ccMr" v-else>
						<div class="ccrInfo">
							暂无拨打电话记录
						</div>
					</div> -->
	<!-- 				<div class="ccrImg" @click="up=!up">
						<img src="../assets/img/cc-up.png" v-if="up"/>
						<img src="../assets/img/cc-down.png" v-else/>
					</div> -->
				</div>
			</div>
		</nut-popup>
		<nut-popup class="payTip" style="border-radius: 0.12rem;" v-model="showPay">
			<div class="myIntr" style="min-height: 5.3rem;height: 5.3rem;width: 6.2rem;">
<!-- 				<div class="payTitle">
				</div> -->
				<div class="miTop">兑换商机</div>
				<div class="miContent">
					<div class="micM" style="display: block;">当前商机价格为<span style="color: #DDB950;">{{buyInfo.BuyYuanBaoRealNum}}</span>元宝<br />是否兑换？</div>
					<div class="miBtn mibPay">
						<label @click="showPay=false">取消</label>
						<label @click="buyCustom()">确定</label>
					</div>
				</div>
			</div>
		</nut-popup>
		<nut-popup style="border-radius: 0.12rem;" closeable v-model="showMd">
			<div class="myIntr">
				<div class="miContent">
					<h4>商机反馈</h4>
					<div class="micM mdM">
						<label :class="md==item.CusLevelId?'on':''" @click="md=item.CusLevelId" v-for="item in intention" :key="item.CusLevelId">{{item.CusLevelName}}<!-- <i></i> --></label>
<!-- 						<label :class="md==1?'on':''" @click="md=1">强意向<i></i></label>
						<label :class="md==2?'on':''" @click="md=2">中意向<i></i></label>
						<label :class="md==3?'on':''" @click="md=3">低意向<i></i></label>
						<label :class="md==4?'on':''" @click="md=4">待反馈<i></i></label> -->
					</div>
					<div class="micMsg">
						<div v-for="item in intention" :key="item.CusLevelName">
							<label :class="cItem.TitleId==cmd?'on':''" @click="cmd=cItem.TitleId" v-for="cItem in item.Titles" v-if="md==item.CusLevelId">{{cItem.TitleName}}</label>
<!-- 							<label :class="uTag.id==1?'on':''" @click="setCommt(1,'近期有购房需求')">近期有购房需求</label>
							<label :class="uTag.id==2?'on':''" @click="setCommt(2,'成功线下约见')">成功线下约见</label>
							<label :class="uTag.id==3?'on':''" @click="setCommt(3,'同意添加微信好友沟通')">同意添加微信好友沟通</label> -->
						</div>
<!-- 						<template v-if="md==2">
							<label :class="uTag.id==4?'on':''" @click="setCommt(4,'无购房资格/资金不足')">无购房资格/资金不足</label>
							<label :class="uTag.id==5?'on':''" @click="setCommt(5,'了解市场、观望等待')">了解市场、观望等待</label>
						</template>
						<template v-if="md==3">
							<label :class="uTag.id==6?'on':''" @click="setCommt(6,'同行/同事')">同行/同事</label>
							<label :class="uTag.id==7?'on':''" @click="setCommt(7,'三次以上拨打秒挂或无人接听')">三次以上拨打秒挂或无人接听</label>
							<label :class="uTag.id==8?'on':''" @click="setCommt(8,'号码有误、关机、无法接通、欠费、不愿意被打扰')">号码有误、关机、无法接通、欠费、不愿意被打扰</label>
						</template>
						<template v-if="md==4">
							<label :class="uTag.id==9?'on':''" @click="setCommt(9,'有事在忙/没时间/无人接听，待反馈')">有事在忙/没时间/无人接听，待反馈</label>
						</template> -->
					</div>
					<div class="miBtn">
						<label @click="commitC()">提交</label>
					</div>
				</div>
			</div>
		</nut-popup>
		<foot tab5='1'></foot>
		
		<div class="showModel" v-if="tip">
		  <div class="bj"></div>
		  <div class="showMsg">
		    <label class="modelClose" @click="tip=false"></label>
			<h3>温馨提示</h3>
			<p>竞拍商机后请及时填写反馈内容，1小时未反馈，自动拉黑1天；累计≥3次未反馈，拉黑7天。(ps:拉黑后无法接收商机哦)</p>
			<!-- <p style="margin-top: 0.1rem;"><span style="color: #999;font-size: 0.24rem;"> </span></p> -->
			<mt-button type="primary" class="carBtn" @click="tip=false">我知道了</mt-button>
		  </div>
		</div>
		
		<div class="showModel" v-if="isBlack">
		  <div class="bj"></div>
		  <div class="showMsg" style="height: 3.8rem;width: 6.1rem;">
		    <label class="modelClose" @click="isBlack=false"></label>
			<h3>温馨提示</h3>
			<p>{{blackText}}</p>
			<mt-button type="primary" class="carBtn" @click="isBlack=false">我知道了</mt-button>
		  </div>
		</div>
		<!-- 备注 -->
		<div class="showModel" v-if="edit">
		  <div class="bj"></div>
		  <div class="showMsg" style="height: 4rem;width: 6.1rem;">
		    <label class="modelClose" @click="edit=false"></label>
			<h3>商机备注</h3>
			<p class="edName"><input type="text" placeholder="请输入您对用户的备注（12个字以内）" maxlength="12" v-model="editName"/></p>
			<mt-button type="primary" class="carBtn" @click="changeName">确定</mt-button>
		  </div>
		</div>
		
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
	import { Toast,Indicator } from 'mint-ui';
	import {
	  uToken,
	} from "@/global/token.js";
	import Foot from '@/components/foot.vue';
	import Module from '@/components/module.vue'
	import nutUI from '@nutui/nutui/dist/nutui.min.js';  // 加载构建后的JS
	import '@nutui/nutui/dist/nutui.min.css';  //加载构建后的CSS
	nutUI.install(Vue);
	
	require('dayjs/locale/zh-cn');
	var dayjs = require('dayjs');
	var relativeTime = require('dayjs/plugin/relativeTime')
	dayjs.locale('zh-cn');//配置语言成中文
	dayjs.extend(relativeTime)
	export default{
		name: 'custom',
		data(){
			return{
				header_token:{"token": uToken()},
				tip:false,
				inApp:false,
				cType:1,
				show:false,
				cList:"",
				myList:[],
				showPay:false,
				pSize:10,
				count:0,
				pSizeMy:10,
				countMy:0,
				loadOver:false,
				load:false,
				scrollTop:0,
				type:'my',
				cId:"",
				buyInfo:"",
				bigImg:"",
				bigName:"",
				cName:"",
				up:false,
				showMd:false,
				md:1,
				cmd:0,
				call:"",
				record:"",
				recordCommt:"",
				showRecord:false,
				read:false,
				ready:false,
				myReady:false,
				jl:1,
				intention:"",
				
				addCar:false,
				moduleNum:-1,
				prize:"",
				prizeName:"45元礼包",
				runNum:Math.random(),
				prizeId:"",
				typeNum:1,
				isBlack:false,
				blackText:"您的账号被封禁15天，请及时对商机进行反馈",
				showUp:0,
				tabOn:"",
				tabSon:"",
				edit:false,
				tabYx:"0",
				tabDh:"0",
				tabFk:"0",
				editName:"",
				changeId:"",
				yxText:"",
				dhText:"",
				fkText:"",
				allLoaded:false,
				tes:1
			}
		},
		components: {
		  Foot,
			Module
		},
		created(){
			// 全局绑定滚动事件，
			// window.addEventListener("scroll", this.scrollT);
			// document.title="商机";
			// if(navigator.userAgent.indexOf('aplus') > -1){
			// 	this.inApp=true
			// }
			// this.getcList();
			// if(localStorage.getItem('readImg')){
			// 	this.read=true;
			// }
			// setTimeout(()=>{
			// 	this.getCommt();
			// },500)
			// // if(this.runNum<0.35){
			// // 	this.getPrize()
			// // }
			// this.getBlack();
		},
		// 注意：只有当组件在 <keep-alive> 内被切换，才会有activated 和 deactivated 这两个钩子函数
		 activated() {//在vue对象存活的情况下，进入当前存在activated()函数的页面时，一进入页面就触发；可用于初始化页面数据等
		   this.header_token={"token": uToken()};
			// 全局绑定滚动事件，
			window.addEventListener("scroll", this.scrollT);
			document.title="商机";
			if(navigator.userAgent.indexOf('aplus') > -1){
				this.inApp=true
			}
			if(localStorage.getItem('readImg')){
				this.read=true;
			}
			setTimeout(()=>{
				this.getCommt();
			},500)
			if(this.cType==1){
				this.pSize=10;
				this.getcList();
			}else{
				this.pSizeMy=10;
				this.getMyList();
			}
			this.getBlack();
		  },
		  deactivated() {
		    // 组件消失，解绑scroll事件
		    window.removeEventListener("scroll", this.scrollT);
		  },
		beforeDestroy() {
			// 组件消失，解绑scroll事件
			// window.removeEventListener("scroll", this.scrollT);
		},
		filters:{
			agoTime(time){
				const t=dayjs(time).fromNow();
				return t;
			},
		},
		watch:{
			md(){
				this.cmd=0
			},
			cType(){
				this.load=false;
				if(this.cType==1){
					this.pSize=10;
					this.getcList();
				}else{
					this.pSizeMy=10;
					this.getMyList();
				}
			},
			pSize(){
				if(this.pSize>10){
					this.getcList();
				}
			},
			pSizeMy(){
				if(this.pSizeMy>10){
					this.getMyList();
				}
			},
			scrollTop(newValue, oldValue) {//滚动分页
				var height = document.getElementsByClassName('custom')[0].scrollHeight;
				let sTop = document.documentElement && document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop;//滚动的高度
				let clientHeight=window.screen.height;//屏幕的高度

				setTimeout(()=>{
					if(newValue == window.scrollY){//延时执行后当newValue等于window.scrollY，代表滚动结束
						// 滚动列表取消选中状态
						// if(sTop>0){
						// 	this.showUp=-1;
						// }else{
						// 	this.showUp=0;
						// }
					}
				},200)
				if(this.count>this.pSize){
					if(sTop>0){
						if(height-100<sTop+clientHeight&&this.load){
							  // console.log('监听成功','到达底部')
							  if(this.cType==1){
									if(this.pSize<this.count){
										this.pSize=Number(this.pSize)+10; 
									}
									setTimeout(()=>{
										this.loadOver=true
									},1000)								  
							  }else{
								  if(this.pSizeMy<this.countMy){
								  	this.pSizeMy=Number(this.pSizeMy)+10; 
								  }
								  setTimeout(()=>{
								  	this.loadOver=true
								  },1000)	
							  }
						 }
					 }
				}else if(this.countMy>this.pSizeMy){
					if(sTop>0){
						if(height-100<sTop+clientHeight&&this.load){
							  if(this.cType==2){
								  if(this.pSizeMy<this.countMy){
								  	this.pSizeMy=Number(this.pSizeMy)+10; 
								  }
								  setTimeout(()=>{
								  	this.loadOver=true
								  },1000)							  
							  }
					 }
					}
				}else{
					setTimeout(()=>{
						this.loadOver=true
					},1000)
				}
			}
		},
		methods:{
			hxTip(){
				this.$toast.text("该商机暂无画像");
			},
			loadTop(){
				if(this.cType==1){
					this.pSize=10;
					this.getcList();
				}else{
					this.pSizeMy=10;
					this.getMyList();
				}
			},
			toggle(index){
				if(this.showUp==index){
					this.showUp=-1;
				}else{
					this.showUp=index;
				}
			},
			goHX(id,type,name){
				this.$router.push({name:"customHX",query:{id:id,type:type,name:name}});
			},
			setTab(n){
				if(this.tabOn==n){
					this.tabOn='';
				}else{
					this.tabOn=n;
				}
			},
			setChange(id){
				this.changeId=id;
				this.edit=true;
			},
			// 修改备注
			changeName(){
				if(this.editName==""){
					this.$toast.text("备注不能为空");
					return;
				}
				return new Promise((resolve)=>{
						this.$axios({
							method:"post",
							url:"/MobileCompete/UserRemark",
							headers:this.header_token,
							data:{
								"detailId": this.changeId,
								"userRemark":this.editName
							}
						})
						.then(res=>{
							console.log(res);
							if(res.data.code==0){
								this.edit=false;
								this.getMyList();
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
			// 我的商机条件查询
			selectMy(name,val,text){
				switch (name){
					case 'tabYx':
						this.tabYx=val;
						this.yxText=text;
						this.getMyList();
						break;
					case 'tabDh':
						this.tabDh=val;
						this.dhText=text;
						this.getMyList();
						break;
					case 'tabFk':
						this.tabFk=val;
						this.fkText=text;
						this.getMyList();
						break;		
				}
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
			// 
			getBlack(){
				return new Promise((resolve)=>{
						this.$axios({
							method:"get",
							url:"/MobileCompete/IsClosed",
							headers:this.header_token,
						})
						.then(res=>{
							console.log(res);
							resolve(res);
							if(res.data.code==0){
								if(res.data.data.IsBlack==1){
									this.isBlack=true;
									this.blackText=res.data.data.Reason
								}
							}else{
								throw new Error("获取经纪人是否拉黑接口code报错");
							}
						})
						.catch(error=>{
							console.log(error.message);//注意  throw new Error需要用error.message输出
						})
				})
			},
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
			
			getCommt(type){
				if(type==undefined){
					type=1;
				}
				return new Promise((resolve)=>{
						this.$axios({
							method:"get",
							url:"/mobilecompete/custleveltitle",
							headers:this.header_token,
							params:{
								type:type
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
								detailId:this.cId,
								cusLevelId:this.md,
								titleId:this.cmd,
								type:this.typeNum
							}
						})
						.then(res=>{
							console.log(res);
							if(res.data.code==0){
								this.$toast.success("评价成功");
								this.showMd=false;
								this.md=1;
								this.cmd=0;
								this.getMyList();
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
			changeTag(n){
				this.cType=n;
				// if(n==2){
				// 	this.tip=true;
				// }
				window.scroll(0, 0);
			},
			scrollT(){
				this.scrollTop = window.scrollY;
			},
			readImg(){
				this.read=true;
				localStorage.setItem('readImg','true');
			},
			getcList(){
				Indicator.open();
				this.load=false;
				// this.allLoaded=false;
				return new Promise((resolve)=>{
						this.$axios({
							method:"get",
							url:"/MobileCompete/GetNoticeListV2",
							headers:this.header_token,
							params:{
								pageIndex:1,
								pageSize:this.pSize
							}
						})
						.then(res=>{
							console.log(res);
							if(res.data.code==0){
								const mList=res.data.data.mobileCompetes;
								const uList=res.data.data.userCompetes;
								this.cList=uList.concat(mList);
								this.count=res.data.data.totalCount;
								this.load=true;
								// this.allLoaded=true;
							}else{
								this.$toast.text(res.data.msg);
							}
							Indicator.close();
							resolve(res);
							this.ready=true;
							this.$refs.loadmore.onTopLoaded();
						})
						.catch(error=>{
							Indicator.close();
							this.$toast.text("网络错误，请稍后再试");
						})
				})
			},
			getMyList(){
				this.tabOn=false;
				this.load=false;
				// this.allLoaded=false;
				Indicator.open();
				return new Promise((resolve)=>{
						this.$axios({
							method:"get",
							url:"/MobileCompete/GetMyListV2",
							headers:this.header_token,
							params:{
								CusLevel:this.tabYx,
								isCalled:this.tabDh,
								isReview:this.tabFk,
								pageIndex:1,
								pageSize:this.pSizeMy,
							}
						})
						.then(res=>{
							console.log(res);
							if(res.data.code==0){
								const uList=res.data.data.userCompeteDetails;
								const mList=res.data.data.mobileCompeteDetails;
								this.myList=uList.concat(mList);
								this.countMy=res.data.data.totalCount;
								this.load=true;
							}else{
								this.$toast.text(res.data.msg);
							}
							Indicator.close();
							resolve(res);
							this.myReady=true;
							this.$refs.loadmore.onTopLoaded();
						})
						.catch(error=>{
							Indicator.close();
							this.$toast.text("网络错误，请稍后再试");
						})
				})
			},
			getMobile(id,type){
				return new Promise((resolve)=>{
						this.$axios({
							method:"get",
							url:"/MobileCompete/GetXiaoHaoNewV2",
							headers:this.header_token,
							params:{
								"detailId": id,
								"type":type
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
			getRecord(id,type){
				Indicator.open({
				  spinnerType: 'triple-bounce'
				});
				return new Promise((resolve)=>{
						this.$axios({
							method:"get",
							url:"/mobilecompete/callAndReviewRecordsNewV2",
							headers:this.header_token,
							params:{
								"detailId": id,
								"type":type,
								"PageSize":100
							}
						})
						.then(res=>{
							console.log(res);
							if(res.data.code==0){
								this.record=res.data.data.callRecordsList;
								this.recordCommt=res.data.data.reviewRecordsList;
								console.log(this.record.length)
								this.showRecord=true;
							}else{
								this.$toast.text(res.data.msg);
							}
							resolve(res);
							Indicator.close();
						})
						.catch(error=>{
							Indicator.close();
							this.$toast.text("网络错误，请稍后再试");
						})
				})
			},
			buy(e){
				this.buyInfo=e;
				this.showPay=true;
			},
			buyCustom(){
				Indicator.open({
				  spinnerType: 'triple-bounce'
				});
				return new Promise((resolve)=>{
						this.$axios({
							method:"post",
							url:"/MobileCompete/AuctionV2",
							headers: {
								"token":uToken()
							 },
							data:{
								"competeType":this.buyInfo.CompeteType,
								"competeId": this.buyInfo.CompeteId,
								"buyYuanBaoNum": this.buyInfo.BuyYuanBaoRealNum
							}
						})
						.then(res=>{
							console.log(res);
							resolve(res);
							if(res.data.code==0){
								if(res.data.data.IsSuccess){
									this.showPay=false;
									this.$toast.success('兑换成功，请前往【我的商机】查看');
									this.getcList();
								}else{
									this.$toast.text(res.data.data.Reamark);
									this.getcList();
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
			change(id,type){
				this.showMd=true;
				this.cId=id;
				this.typeNum=type;
				this.getCommt(type);
			},
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
									this.getMyList();
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

		}
	}
</script>

<style scoped>
	.custom{background-color: #F5F5F5;min-height: 100vh;padding-top: 1rem; display: flex; flex-direction: column;}
	.customC { padding: .3rem 0.3rem 1.3rem; display: flex; flex-direction: column; flex: 1 }
	.ccList{background-color: #fff;box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.1);margin-bottom: 0.3rem;border-radius: 0.1rem;position: relative;overflow: hidden;}
	.ccTop{height: 1rem;/* margin-bottom: 0.3rem; */padding: 0.2rem 0;line-height: 0.6rem;}
	.ccTop label{font-size: 0.3rem;color: #333;float: left;}
	.ccTop label img{width: 0.6rem;float: left;margin-right: 0.1rem;display: block;}
	.ccTop .more{position: absolute;right: 0.3rem;top: 0.3rem;color: #666;width: 0.3rem;height: 0.3rem;display: block;background: url(../images/custom/c-down.png) center no-repeat;background-size: 100%;}
	.hoverBox .ccTop .more{background: url(../images/custom/c-up.png) center no-repeat;background-size: 100%;}
	.ccPrice{display: flex;justify-content: space-between;align-items: center;white-space: nowrap;text-align: center;padding: 0 0.2rem;margin-bottom: 0.4rem;margin-top: 0.3rem;}
	.ccPrice span{width: 1px;height: 0.6rem;background-color: #ddd;}
	.ccPrice div{flex: 1;}
	.ccPrice h4{font-size: 0.36rem;margin-bottom: 0.1rem;}
	.ccPrice p{color: #999;font-size: 0.24rem;}
	.pli{width: 100%;padding: 0.1rem 0;display: flex;justify-content: flex-start;font-size: 0.28rem;}
	.pli label{color: #333;}
	.pli span{max-width: 4.4rem;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;}
	.pli span a{color: #333;}
	.pli label a{color: #999;}
	.ccBtom{line-height: 1.24rem;text-align: right;padding-right: 0.3rem;}
	.ccBtom label{font-size: 0.28rem;padding-left: 0.4rem;background: url(../assets/img/cc-yb.png) left center no-repeat;background-size: 0.36rem;}
	.ccBtom label strong{font-size: 0.4rem;color: #FF2D19;}
	.ccBtom label a{margin-left: 0.2rem;font-size: 0.3rem;color: #999;text-decoration: line-through; }
	.ccBtom button{width: 2.63rem;height: 0.68rem;background: #DDB950 url(../images/custom/b-yb.png) 0.2rem center no-repeat;background-size: 0.3rem;color: #fff;font-size: 0.28rem;border-radius: 0.1rem;padding-left: 0.4rem;}
	.hbY{background-color: #fff;}
	.hbTab { text-align: center; padding: 0.15rem 0; font-size: 0.32rem; color: #333; position: fixed; top: 0; left: 0;width: 100%;z-index: 7; /* box-shadow: 0px 2px 6px 2px rgb(0 0 0 / 6%); */ background-color: #fff; }
	.hbTab a{display: inline-block;background-color: #fff;}
	.hbTab label{display: inline-block;width: 1.8rem;height: 0.7rem;margin: 0 0.2rem 0 0;line-height: 0.7rem;color: #333;position: relative;transition: all 0.5s linear; }
	.hbTab label:last-child{margin: 0;}
	.hbTab label.on{color: #5084DD;}
	.hbTab label.on span{display: inline-block;width: 1rem;height: 3px;background-color: #5084DD;position: absolute;bottom: -0.14rem;left: 0.4rem;border-radius:  3px 3px 0 0;}
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
	.ccMy .ccTop label{float: none;}
	.ccMy .ccTop span{margin: 0 0.2rem 0 0;background-color: #FA6400;}
	.ccMy .ccTop span i{font-style: normal;}
	.ccBtn{padding: 0.3rem 0;text-align: center;border-top: 1px solid #ddd;}
	.ccBtn button{width: 2.8rem;height: 0.8rem;background: #F42C1D;border-radius: 0.4rem;color: #fff;font-size: 0.32rem;}
	.ccBtn button a{color: #fff;width: 100%;display: inline-block;height: 100%;border-radius: 0.4rem;line-height: 0.78rem;}
	.ccBtn button:first-child{margin-right: 0.4rem;background: none;border: 1px solid #F42C1D;color: #F42C1D;}
	.ccRecord{padding-top: 0.4rem;text-align: center;color: #666;}
	.ccRecord p{font-size: 0.32rem;margin-bottom: 0.2rem;font-weight: 600;display: flex;justify-content:  center;align-items: center;}
	.ccRecord p i{display: inline-block;width: 1.8rem;height: 1px;background-color: #ddd;}
	.ccRecord p span{margin: 0 0.2rem;}
	.ccRecord .ccrInfo{margin-bottom: 0.24rem;display: flex;}
	.ccRecord h4{margin-bottom: 0.4rem;}
	.ccrImg{padding: 0.3rem 0 0;border-top: 1px solid #ddd;text-align: center;}
	.ccrImg img{width: 0.38rem;}
	.ccMr{max-height: 4.5rem;overflow: hidden;padding: 0.2rem;overflow-y: auto;text-align: left;margin-top: 0.2rem;background-color: #f5f5f5;}
	.ccrInfo{font-size: 0.26rem;}
	.ccrInfo span:first-child{flex: 1;text-align: center;}
	.ccrInfo span:last-child{flex: 1.2;line-height: 1.6;}
	.ccrInfoS span:last-child{flex: 0.6;}
	.ccrInfo span i{font-style: normal;font-size: 0.2rem;color: #F42C1D;padding: 1px 2px;border: 1px solid #F42C1D;border-radius: 2px;margin-right: 0.1rem;}
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
	.cTag{width: 1.2rem;height: 1.2rem;background: url(../assets/img/c-new.png) right top no-repeat;background-size: 100%;position: absolute;right: -0.25rem;top: -0.28rem;}
	.c2Tip{width: 100%;height: 100%;z-index: 6;}
	.tBj{width: 100%;height: 100%;z-index: 7;background-color: #000;opacity: 0.7;position: fixed;left: 0;top: 0;}
	.tMsg{width: 100%;height: 100%;z-index: 8;position: fixed;left: 0;top: 0;background: url(../assets/img/cstBj.png) 0.3rem 25% no-repeat;background-size: 5.39rem;}
	.noList{color: #ccc;font-size: 0.26rem;text-align: center;margin-top: 0.8rem;}
	.noList span{display: inline-block;height: 1px;width: 2rem;background-color: #eee;position: relative;top: -3px;}
	
	.ccMy .ccTop span.cHouseTag{
		position: absolute;
		right: 0;
		top: 0.38rem;
		display: inline-block;
		height: 0.4rem;
		line-height: 0.36rem;
		padding: 0 0.1rem;
		background: none;
		border: 1px solid #999;
		color: #999;
	}
	.infoNone{text-align: center;margin: 0.4rem 0;color: #999;}

	.i-yhc{width: 100%;height: 100%;display: block;position: absolute;left: 0;top: 0;color: #fff;}
	.i-yhc label{background: #000;position: absolute;left: 0;top: 0;opacity: 0.6;z-index: 3;display: block;width: 100%;height: 100%;border-radius: 0.1rem;}
	p.yhc{position: absolute;top: 50%;margin-top: -1rem;left: 0;z-index: 4;padding: 0.4rem;font-size: 0.36rem;line-height: 1.8;}
	/** 商机列表为空 */
	.empty-shang-ji-wrap { margin: auto; display: flex; flex-direction: column; color: #999; font-size: 0.28rem; text-align: center; }
	.empty-shang-ji { 
		display: block; margin-bottom: 0.49rem; width: 4.2rem;
		width: 4.2rem;
		margin: 2rem auto 0.4rem;
	}
	
	.overAll,.overAll label,.overAll a{color: #999 !important;}
	.overAll{background-color: #f5f5f5 !important;}
	.payTip{overflow: visible;border-radius: 0.2rem;}
	.payTitle{height: 1.52rem;width: 100%;background: url(../assets/img/icon-pay.png) center no-repeat;background-size: 1.52rem;position: relative;top: -0.7rem;}

	.showModel{
	  position: fixed;
	  width: 100%;
	  height: 100%;
	  z-index: 90;
	}
	.bj{position: fixed;background: #000;opacity: 0.5;width: 100%;height: 100%;left: 0;top: 0;z-index: 91;}
	.showMsg{text-align: left;font-size: 16px; position: fixed;left: 50%;top: 50%;transform: translate(-50%,-50%);width: 5.8rem;height: 4.8rem; background: #fff;z-index: 92;padding: 0.5rem 0.4rem;border-radius: 8px;}
		.showMsg h3{font-size: 0.32rem;font-weight: 550;text-align: center;color: #333;margin-bottom: 0.3rem;}
		.showMsg p{font-size: 0.3rem;color: #666;margin-top: 0.1rem;}
		.carBtn{width: 2.8rem;height: 0.8rem;margin: 0.5rem auto 0;display: block;line-height: 0.8rem;
	/* background: linear-gradient(134deg, #FB6F52 0%, #F3240A 100%); */background-color: #DDB950;border-radius: 3px;font-size: 0.32rem;}
		.modelClose{position: absolute;right: 0rem;top: 0rem;cursor: pointer;width: 0.8rem;height: 0.8rem;display: block;background: url(../assets/img/close.png) center no-repeat;background-size: 0.27rem;}
</style>
<style lang="less" scoped>
	@color:#fff;
	@bjColor:#5084DD;
	.ccBox{
		padding: 0.2rem;
	}
	.ccUser{
		float: left;
		h4,p{
			line-height: 1;
		}
		h4{
			font-weight: 500;
			font-size: 0.3rem;
			margin-bottom: 0.06rem;
			max-width: 4rem;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			position: relative;
			padding-right: 0.8rem;
		}
		p{
			font-size: 0.24rem;
		}
	}
	.p-old{
		transition: all 0.2s linear;
		height: 0;
		overflow: hidden;
		padding-left: 0.4rem;
		// background: url(../images/custom/l-zj.png) 0.38rem 0.15rem no-repeat;
		// background-size: 0.24rem;
		position: relative;
		label{
			color: #999;
			max-width: 6rem;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			font-size: 0.26rem;
		}
		span{
			display: block;
			width: 0.13rem;
			height: 0.24rem;
			background: url(../images/custom/l-right.png) center no-repeat;
			background-size: 0.13rem;
			position: absolute;
			right: 0.3rem;
			top: 0.18rem;
		}
	}
	.ccBtom{
		height: 0;
		transition: all 0.2s linear;
	}
	.hoverBox{
		.p-old{
			height: 0.6rem;
		}
		.ccBox{
			background: @bjColor;
			color: @color;
			.ccTop{
				label{
					color: @color;
				}
			}
		 .pli{
			 label{
					color: @color;
				}
				span{
					a{
						color: #fff;
					}
				}
		 }
			.p-jg{
				background: url(../images/custom/l-jg.png) 0.18rem 0.15rem no-repeat;
				background-size: 0.3rem;
			}
			.p-xf{
				background: url(../images/custom/l-xf.png) 0.18rem 0.15rem no-repeat;
				background-size: 0.3rem;
				span{
					margin-right: 0;
				}
			}
			.p-es{
				background: url(../images/custom/l-es.png) 0.18rem 0.15rem no-repeat;
				background-size: 0.3rem;
			} 
			.p-fy{
				background: url(../images/custom/l-fy.png) 0.18rem 0.15rem no-repeat;
				background-size: 0.3rem;
			}
			.p-hx{
				background: url(../images/custom/l-hx.png) 0.18rem 0.15rem no-repeat;
				background-size: 0.3rem;
			}
			.p-mj{
				background: url(../images/custom/l-mj.png) 0.18rem 0.15rem no-repeat;
				background-size: 0.3rem;
			}
			.p-qy{
				background: url(../images/custom/l-qy.png) 0.18rem 0.15rem no-repeat;
				background-size: 0.3rem;
			}
			.p-sj{
				background: url(../images/custom/l-sj.png) 0.18rem 0.15rem no-repeat;
				background-size: 0.3rem;
			}
			.p-wt{
				background: url(../images/custom/l-wt.png) 0.18rem 0.15rem no-repeat;
				background-size: 0.3rem;
			}
			.p-xx{
				background: url(../images/custom/l-xx.png) 0.18rem 0.15rem no-repeat;
				background-size: 0.3rem;
			}
			.p-ly{
				background: url(../images/custom/l-ly.png) 0.18rem 0.15rem no-repeat;
				background-size: 0.3rem;
			}
		}
		.ccBtom{
			height: 1.24rem;
		}
	}
	.old{
		.ccBox{
			background: #ccc url(../images/custom/c-yhs.png) 95% 20% no-repeat;
			background-size: 1rem;
		}
		.ccBM{
			button{
				background-color: #ccc !important;
				pointer-events: none;//按钮不能点击
			}
		}
	}
	.ccBox{
		.pli{
			padding-left: 0.7rem;
			i{
				font-style: normal;
				font-size: 0.24rem;
				color: @bjColor;
				display: inline-block;
				width: 0.28rem;
				height: 0.28rem;
				text-align: center;
				line-height: 0.22rem;
				background-color: @color;
				border-radius: 50%;
				margin-right: 0.1rem;
				border: 1px solid @bjColor;
			}
			.plBox{
				width: 4.3rem;
				span{
					display: block;
					max-width: 2.06rem;
					float: left;
					margin-right: 0.15rem;
					margin-bottom: 0.1rem;
					&:last-child{
						max-width: 4rem;
					}
					&:nth-of-type(2){
						margin-right: 0;
						max-width: 2.06rem;
					}
				}
			}
		} 
		.p-jg{
			background: url(../images/custom/l-jg1.png) 0.18rem 0.15rem no-repeat;
			background-size: 0.3rem;
		}
		.p-xf{
			background: url(../images/custom/l-xf1.png) 0.18rem 0.15rem no-repeat;
			background-size: 0.3rem;
			span{
				margin-right: 0;
			}
		}
		.p-es{
			background: url(../images/custom/l-es1.png) 0.18rem 0.15rem no-repeat;
			background-size: 0.3rem;
		}
		.p-fh{
			background: url(../images/custom/l-fh1.png) 0.18rem 0.15rem no-repeat;
			background-size: 0.3rem;
		}
		.p-fy{
			background: url(../images/custom/l-fy1.png) 0.18rem 0.15rem no-repeat;
			background-size: 0.3rem;
		}
		.p-hx{
			background: url(../images/custom/l-hx1.png) 0.18rem 0.15rem no-repeat;
			background-size: 0.3rem;
		}
		.p-mj{
			background: url(../images/custom/l-mj1.png) 0.18rem 0.15rem no-repeat;
			background-size: 0.3rem;
		}
		.p-qy{
			background: url(../images/custom/l-qy1.png) 0.18rem 0.15rem no-repeat;
			background-size: 0.3rem;
		}
		.p-sj{
			background: url(../images/custom/l-sj1.png) 0.18rem 0.15rem no-repeat;
			background-size: 0.3rem;
		}
		.p-wt{
			background: url(../images/custom/l-wt1.png) 0.18rem 0.15rem no-repeat;
			background-size: 0.3rem;
		}
		.p-xx{
			background: url(../images/custom/l-xx1.png) 0.18rem 0.15rem no-repeat;
			background-size: 0.3rem;
		}
		.p-ly{
			background: url(../images/custom/l-ly1.png) 0.18rem 0.15rem no-repeat;
			background-size: 0.3rem;
		}
	}
	.cmTab{
		padding: 0 0.3rem;
		width: 100%;
		display: flex;
		height: 0.8rem;
		line-height: 0.8rem;
		background-color: #fff;
		color: #333;
		border-top: 1px solid #EDEDED;
		position: sticky;
		top: 1rem;
		z-index: 9;
		label{
			flex: 1;
			text-align: center;
			&:nth-of-type(1){
				text-align: left;
			}
			&:nth-of-type(3){
				text-align: right;
			}
			span{
				color: #5084dd;
				font-size: 0.24rem;
				i{
					color: #999;
					font-style: normal;
				}
			}
			img{
				width: 0.21rem;
				vertical-align: middle;
				margin-left: 0.1rem;
			}
			.cmDown{
				display: inline;
			}
			.cmUp{
				display: none;
			}
		}
		.on{
			color: @bjColor;
			.cmUp{
				display: inline;
			}
			.cmDown{
				display: none;
			}
		}
	}
	// 我的商机
	.ccTop{
		position: relative;
		.cc-edit{
			display: block;
			width: 0.29rem;
			height: 0.28rem;
			background: url(../images/custom/cc-edit.png) center no-repeat;
			background-size: 0.29rem;
			position: absolute;
			right: 0.2rem;
			top: 0;
			z-index: 2;
		}
		.ccRecord{
			padding: 0;
			width: 1rem;
			height: 0.4rem;
			background-color: #fff;
			display: block;
			line-height: 0.4rem;
			text-align: center;
			font-size: 0.22rem;
			color: @bjColor;
			position: absolute;
			right: 0.3rem;
			top: 0.2rem;
			border-radius: 3px;
		}
	}
	.ccBM{
		height: 1.24rem;
		text-align: center;
		padding: 0.2rem 0.3rem;
		display: flex;
		// justify-content: space-between;
		justify-content: flex-end;
		button{
			width: 1.8rem;
			height: 0.68rem;
			line-height: 0.6rem;
			border-radius: 3px;
			color: #fff;
			background-color: #DDB950;
			margin-right: 0.6rem;
			&:nth-of-type(1){
				background: #DDB950 url(../images/custom/cc-user.png) 0.4rem center no-repeat;
				background-size: 0.25rem;
				padding-left: 0.3rem;
			}
			&:nth-of-type(2){
				background: #DDB950 url(../images/custom/cc-fk.png) 0.4rem center no-repeat;
				background-size: 0.32rem;
				padding-left: 0.42rem;
			}
			&:last-child{
				background: #DDB950 url(../images/custom/cc-phone.png) 0.4rem center no-repeat;
				background-size: 0.25rem;
				padding-left: 0.3rem;
				margin-right: 0;
			}
			a{
				color: #fff;
			}
		}
	}
	.cr-record{
		color: #999;
		font-size: 0.2rem;
		margin-bottom: 0.4rem;
		padding: 0 0.3rem;
		p::after{
			content: '';
			display: block;
			clear: both;
			overflow: hidden;
			visibility: hidden;
			height: 0;
		}
		label{
			padding: 1px 5px;
			background-color: #f5f5f5;
			border-radius: 2px;
			margin-right: 0.1rem;
			max-width: 5.2rem;
			display: inline-block;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			margin-bottom: 0.06rem;
			float: left;
		}
		span{
			display: inline-block;
			padding-left: 0.1rem;
		}
	}
	.tabShow{
		height: calc(100vh - 1.8rem);
		position: fixed;
		top: 1.8rem;
		left: 0;
		width: 100%;
		z-index: 3;
		.tabBj{
			width: 100%;
			height: 100%;
			background-color: #000;
			opacity: 0.5;
			z-index: 4;
			position: fixed;
			top: 0;
			left: 0;
		}
		.t-yx{
			position: relative;
			z-index: 5;
			background-color: #fff;
			padding: 0.3rem;
			width: 100%;
			label{
				display: inline-block;
				width: 1.5rem;
				height: 0.6rem;
				line-height: 0.6rem;
				text-align: center;
				background-color: #F3F6F8;
				color: #333333;
				font-size: 0.24rem;
				border-radius: 3px;
				margin-right: 0.3rem;
				&:last-child{
					margin-right: 0;
				}
				&.on{
					color: #fff;
					background-color: @bjColor;
				}
			}
		}
	}
	.edName{
		width: 100%;
		input{
			width: 100%;
			height: 0.88rem;
			background-color: #F5F5F5;
			color: #333;
			border: 0;
			text-align: center;
			font-size: 0.28rem;
		}
	}
</style>
