<template>
	<div class="schoolAll" v-if="ready">
		<div class="jjrSection newHouse">
			<template v-if="soonHouse.length>0">
				<div class="clear jjrL" v-for="(item,index) in soonHouse">
					<div class="jrl">
						<a :href="'https://sz.centanet.com/ershoufang/'+item.AdsNo+'.html'">
						<img :src="item.FullImagePath" width="100%"/>
						</a>
					</div>
					<div class="jrr">
						<a :href="'https://sz.centanet.com/ershoufang/'+item.AdsNo+'.html'">
						<h4 class="jrt">{{item.Title}}</h4>
						<p>{{item.RoomCount}}室{{item.HallCount}}厅丨{{item.Garea}}平丨{{item.GscopeName}}丨{{item.EstateName}}</p>
						<p class="newTag" v-if="item.UnitTags"><span v-if="item.UnitTags[0]">{{item.UnitTags[0]}}</span><label v-if="item.UnitTags[1]">{{item.UnitTags[1]}}</label><label v-if="item.UnitTags[2]">{{item.UnitTags[2]}}</label><label v-if="item.UnitTags[3]">{{item.UnitTags[3]}}</label></p>
						</a>
						<p>参考总价：<strong>{{item.GuidingSalePrice/10000 | fix}}</strong></p>
						<a class="btnZx" :href="'tel:'+item.CallResult.BigCode+','+item.CallResult.ExtCode" @click="setSc('我要咨询',item.AdsNo,item.Title,`(${index+1},1)`)">我要咨询</a>
					</div>
				</div>
				<p style="text-align: center;font-size: 0.24rem;color: #ccc;line-height: 1rem;" @click="pSize+=10" v-if="count>pSize">———— 点击查看更多 ————</p>
				<p class="noList" v-else><span></span>&nbsp;我是有底线的&nbsp;<span></span></p>
			</template>
		</div>
		</div>
	</div>
</template>

<script>
	import { Toast,Indicator } from 'mint-ui';
	import {
	  uToken,
	} from "@/global/token.js";
	import {
	  $get,$post
	} from "@/global/api.js";
	export default{
		name: 'schoolAll',
		data(){
			return{
				header_token:{"token": uToken()},
				inApp:false,
				ready:false,
				schoolId:"",//19
				soonHouse:"",
				pSize:10,
				count:""
			}
		},
		created() {
			if(this.$route.query.schoolId){
				this.schoolId=this.$route.query.schoolId;
				window.document.title=this.$route.query.schoolName;
			}
			this.getSchool();
		},
		mounted(){
			
		},
		watch:{
			pSize(){
				// this.search()
				if(this.pSize>10){
					if(!this.content){
						this.getSchool();
					}				
				}
				
			},
		},
		filters:{
			fix(p){
				let price=Number(p).toFixed(0);
				if(price>0){
					return price+'万';
				}else{
					return '暂无';
				}
				
			},
		},
		methods:{
			// 神策电话埋点
			setSc(name,id,houseName,p){
				this.$sensors.track('sc_click_call', {
					sc_business_type:"second_hand_house",
					sc_button_name:name,
					sc_click_page:"附近房源_房源列表",
					sc_house_id:id,
					sc_house_name:houseName,
					sc_click_area:"学校详情页_附近房源_房源列表",
					sc_button_position:p
				});
			},
			getSchool(){
				Indicator.open();
				let data1={
				  "distance":50000,
				  "pageCount": this.pSize,
				  "pageIndex": 1,
				  "schoolId": this.schoolId
				}
				// 获取附近房源
				$post("/ZhongyuanHouseV2/GetSchoolPostsRequest",data1).then((res)=>{
						console.log(res);
					if(res.data.code==0){
						this.ready=true;
						this.soonHouse=res.data.data.Result;
						this.count=res.data.data.Total;
					}
					setTimeout(()=>{
						Indicator.close();
					},500)
				})
				.catch((err)=>{
					Indicator.close();
					this.$toast.text('网络错误，请稍后再试')	
				})
			},
			getSchoolBanner(){
				let data={
					schoolId:this.schoolId
				};
				$get("/ZhongyuanHouseV2/GetSchoolImageListRequest",data).then((res)=>{
						console.log(res);
					if(res.data.code==0){
						this.ready=true
						this.imgArr=res.data.data.Result
					}	
				})
				.catch((err)=>{
					this.$toast.text('网络错误，请稍后再试')	
				})
			},


		}
	}
</script>

<style scoped>
	.schoolAll{ background: #fff;padding-bottom: 1.6rem;padding: 0.4rem 0.3rem 0.6rem;}
		.noList{color: #ccc;font-size: 0.26rem;text-align: center;margin-top: 0.8rem;}
		.noList span{display: inline-block;height: 1px;width: 2rem;background-color: #eee;position: relative;top: -3px;}
		.jjrL{padding: 0;background-color: #fff;margin-bottom: 0.3rem;border-radius: 0.1rem;position: relative;padding-bottom: 0.3rem;border-bottom: 1px solid #eee;}
		.jjrL:last-child{margin-bottom: 0;}
		.jrl{width: 2.4rem;float: left;margin-right: 0.2rem;height: 1.8rem;overflow: hidden;position: relative;}
		.jrl img{width: 100%;}
		.nStatus{padding: 2px 0.1rem;color: #fff;background-color: #F3240A;position: absolute;left: 0;top: 0;font-size: 0.24rem;}
		.jrr{float: left;width: 4.3rem;}
		.jrr h4{
			    font-weight: bolder;
			    color: #203140;
			    font-size: 0.3rem;
				margin-bottom: 0.1rem;
				
				overflow:hidden;
				text-overflow:ellipsis;
				white-space: normal;
				display:-webkit-box; 
				-webkit-box-orient:vertical;
				-webkit-line-clamp:2;
				position: relative;
		}
		.jrr p{
			color: #666;
			font-size: 0.24rem;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}
		.jrr p strong{color: #FF2D19;font-size: 0.36rem;}
		.newHouse button.hbShare{margin-top: 0.2rem;}
		.jrr p.newTag{font-size: 0.2rem;margin-top: 0.1rem;margin-bottom: 0.2rem;}
		.jrr span,.jrr label{padding: 2px 0.1rem;background-color: #ededed;color: #999;margin-left: 0.06rem;border-radius: 0.1rem;}
		.jrr span{margin-left: 0;color: #fff;background-color: #FF2D19;}
		.newHouse .jrr h4{line-height: 1.4;}
		.newHouse .hbhBtn{text-align: right;}
		.jrr h4 strong{display: inline-block;width: 2.3rem;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}
		.jrr h4 i{font-style: normal;font-weight: 500;color: #f53218;position: absolute;right: 0;top: 0.04rem;font-size: 0.28rem;}
		.btnZx{width: 1.48rem;height: 0.48rem;display: block;border: 1px solid #F73342;font-size: 0.24rem;color: #FF2D19;position: absolute;bottom: 0.3rem;right: 0;text-align: center;line-height: 0.46rem;background: url(../assets/static/icon-call.png) 0.08rem center no-repeat;background-size: 0.25rem;padding-left: 0.3rem;border-radius: 3px;}
</style>
