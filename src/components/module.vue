<template>
	<div>
				<!-- 信封 -->
				<div class="hkBody" :class="showOn==1?'hk':''">
					<div class="hkG"></div>
						<div class="hkB"></div>
						<div class="hkMain">
						</div>
						<nut-luckycard
										content="1000万" 
										:coverImg="coverImage"
										backgroundColor="#FF3848"
										height="92"
										width="204"
										ratio="0.4"
										@open="changeNum"
										style="color: #FFEB8B !important;font-weight: bold !important;16px"></nut-luckycard>
				</div>
				<!-- 红包 -->
				<div class="hkBody" :class="showOn==2?'hk':''">
					<div class="hkG"></div>
						<div class="hkHb"></div>
						<div class="hkHbM">
						</div>
						<div class="hkHbBtn" @click="changeNum"></div>
				</div>
				<!-- 砸金蛋 -->
				<div class="hkBody" :class="showOn==3?'hk':''">
					<section class="stage" @click="zaEgg">
						<div class="jdJg" v-show="eggAll"></div>
						<img src="model/jdBj.png" />
						<!--金蛋-->
						<div class="goldenEgg Egg1">
								<img src="model/egg.png" alt="" id="egg1" v-show="eggAll" :class="za?'zd':''">
								<div class="eggLf" :class="za?'lf':''" v-show="eggAll"></div>
								<div v-show="eggAll==false">
									<img src="model/egg2.png" alt="" id="egg2">
									<img src="model/jdLh.png" alt="" id="boom1" :class="eggAll==false?'show':''">
									<div class="jdG"></div>
								</div>
								<img src="model/cz.png" id="czi1" class="czi main_jb2" :class="za?'za':''"/>
						</div>
						<div class="jdYb"></div>
						<!--锤子-->
						<!-- <div class="hit" id="J_Hit"><img src="images/1.png" /></div> -->
					</section>
				</div>				
	</div>			
</template>

<script>
	import {
	  getToken,
	} from "@/global/token.js";
	export default{
		name: 'module',
		props: {
		  showOn: {
		    type: Number,
		    default: '-1'
		  },
		},
		data() {
			return{
				coverImage:require("../../public/model/xfImg.png"),
				addCar:false,
				eggAll:true,
				za:false
			}
		},
		methods:{
			zaEgg(){
				this.za=true;
				setTimeout(()=>{
					this.eggAll=false
					this.changeNum();
				},500)//3500
			},
			// addMy(){
			// 	if(this.showOn==1){
			// 		setTimeout(()=>{
			// 			this.addCar=true;
			// 			setTimeout(()=>{
			// 				this.showOn=-1;
			// 				this.addCar=false;
			// 			},500)
			// 		},1000)
			// 	}else{
			// 		this.addCar=true;
			// 		setTimeout(()=>{
			// 			this.showOn=-1;
			// 			this.addCar=false;
			// 		},500)
			// 	}
			// },
			changeNum(){
				this.$emit('changeNum',this.showOn)
			}
		}
	}
</script>

<style scoped>
/* 回馈活动弹框 */
.popup-box{background: none;}
.hkShow{z-index: 99;}
.hkBody{width: 7.5rem;height: 7.5rem;position: fixed;left: 50%;top: -100%;margin-top: -4rem;z-index: 11;margin-left: -3.75rem;}
.hkG{width: 100%;height: 100%;background: url(../../public/model/xfg.png) center no-repeat;background-size: 100%;}
/* x信封 */
.hkMain{position: absolute;top:0.8rem;left: 50%;width:279px;height:288px;padding: 96px 33px 50px;background: url(../../public/model/xf.png) center no-repeat;background-size: 100%;margin-left: -140px;}
.hkB{width: 7.1rem;height: 7.1rem;background: url(../../public/model/xfb.png) center no-repeat;background-size: 100%;position: absolute;top: -14px;left:0.2rem;}
.nut-luckycard{z-index: 9;position: absolute;
		top: 143px;
    left: 50%;
		margin-left: -104px;
}
	.nut-content{color: #FFEB8B !important;font-weight: bold !important;}

.hkbj{width: 100%;height: 100vh;background-color: #000;opacity: 0.5;position: fixed;left: 0;top: 0;}
.hk{opacity: 1;top: 50%;}
.hk .hkMain,.hk .nut-luckycard{animation: flipInX 2s  ease-in 1 alternate;}/* /big 0.3s ease-in 1 forwards, */
.hk .hkG,.hk .hkB{ opacity: 0;animation: fadeInBig 0.5s 1s ease-in 1 forwards;}
.hk .hkB{z-index: 8;}
.hk .hkG{animation: fadeInBig 3s 0.3s ease 1 forwards,rotateR 10s  0.1s linear infinite;}
@keyframes big{
	0%{transform: scale(0);}
	80%{transform: scale(1.01);}
	100%{transform: scale(1);}
}
@keyframes fadeInBig{
	0%{transform: scale(0);}
	10%{transform: scale(0.5);opacity: 0.5;}
	20%{transform: scale(1.1);opacity: 1;}
	60%{transform: scale(0.8);opacity: 1;}
	100%{transform: scale(1);opacity: 1;}
}
@keyframes rotateR{
	from{transform: rotate(0);}
	to{transform: rotate(360deg);}
}
@keyframes swing {
	20% {
		-webkit-transform: rotate(5deg);
		transform: rotate(5deg)
	}

	40% {
		-webkit-transform: rotate(-5deg);
		transform: rotate(-5deg)
	}

	60% {
		-webkit-transform: rotate(5deg);
		transform: rotate(5deg)
	}

	80% {
		-webkit-transform: rotate(-5deg);
		transform: rotate(-5deg)
	}

	to {
		-webkit-transform: rotate(0deg);
		transform: rotate(0deg)
	}
}
/* 红包 */
.hkHb{
	width: 7.1rem;height: 8rem;background: url(../../public/model/hbB.png) center no-repeat;background-size: 100%;position: absolute;
	top: 15px;
	Z-INDEX: 8;
	left: 0.2rem;
}
.hkHbM{
	position: absolute;top:60px;left: 1.5rem;width: 4.7rem;height:6rem;padding: 96px 33px 50px;background: url(../../public/model/hb.png) center no-repeat;background-size: 100%;
}
.hkHbBtn{
	position: absolute;bottom:-0.4rem;left: 2.5rem;width: 2.5rem;height:2.3rem;background: url(../../public/model/hbBtn.png) center no-repeat;background-size: 2.5rem;
}
.hk .hkHbM{animation: slideInDown 0.3s ease-in 1 forwards,pulse 2s 0.5s ease-in infinite alternate;}
.hk .hkHbBtn{opacity: 0;animation: fadeIn 0.5s 0.5s linear 1 forwards;z-index: 9;}
.hk .hkHb{opacity: 0;animation: fadeInBig 0.5s 0.2s ease-in 1 forwards;}
/*  */
.animationCar .hk{
	animation: over 0.5s ease-in-out 1 forwards;
}
@keyframes over{
	from{transform: translate(0,0);}
	to{transform: translate(300px,500px) scale(0);}
}
/* 砸金蛋 */
	.stage {
	    width: 100%;
			height: 7.5rem;
	    -webkit-perspective: 800;
	    -webkit-perspective-origin: 50% 200px;
	    /* position: relative; */
	}
	.stage > img {
	    width: 6.72rem;
	    height: 3.8rem;
	    pointer-events: none;
			position: absolute;
			bottom: 0;
			left: 0.4rem;
	}
	img {
	    border: medium none;
	    vertical-align: middle;
			width:100%;
	}
	.Egg1 {
	    /* animation: animX 6s cubic-bezier(0.36, 0, 0.64, 1) -3s infinite alternate, animY 6s cubic-bezier(0.36, 0, 0.64, 1) 0s infinite alternate, scale 12s cubic-bezier(0.36, 0, 0.64, 1) 0s infinite alternate; */
	}

	#egg1{
		    position: absolute;
		    left: 0;
		    bottom: 0;
	}
	.stage .hit {
	    display: none;
	    position: absolute;
	    z-index: 300;
	    left: 50%;
	    top: 50%;
	    margin-left: 0;
	    margin-top: -80px;
	    pointer-events: none;
	}
	#boom1, #boom2, #boom3 {
	    position: absolute;
	    width: 100%;
	    bottom: 1.4rem;
	    left: -0.3rem;
			z-index: 12;
	    /* display: none; */
	}
	.goldenEgg {
	    width: 2.4rem;
	    /* height: 2.4rem; */
	    position: absolute;
	    transform-style: preserve-3d;
			left: 2rem;
			bottom: 2.4rem;
	}
	.goldenEgg .czi {
	    position: absolute;
	    left: 2rem;
	    bottom: 2.6rem;
	    /* display: none; */
	}
	.hk .stage{animation: fadeIn 0.5s linear 1 forwards;}
/* 添加z砸蛋动画样式 */
.main_jb2{
    animation-name:wobble;
    -webkit-animation-name:wobble;
    -o-animation-name:wobble;
    -ms-animation-name:wobble;
    -moz-animation-name:wobble;
    animation-duration:1s;
    -webkit-animation-duration:1s;
    animation-timing-function: linear;
     -webkit-animation-timing-function: linear;
     -o-animation-timing-function: linear;-ms-animation-timing-function: linear;
     -moz-animation-timing-function: linear;animation-delay: 0;
     -webkit-animation-delay: 0;-o-animation-delay: 0;-ms-animation-delay: 0;
     -moz-animation-delay: 0;animation-iteration-count: infinite; -webkit-animation-iteration-count: infinite;-o-animation-iteration-count: infinite;-ms-animation-iteration-count: infinite; -moz-animation-iteration-count: infinite;}

.show{
	animation: down 2s ease-in 1 forwards;
	z-index: 11;
}
/* @keyframes eggBig{
	0%{transform: scale(0);}
	50%{opacity: 1;}
	to{transform: scale(1.5);}
} */
@keyframes down{
	0%{transform: scale(1);}
	to{transform: translate3d( 0,-50px,320px) scale(1.2);opacity: 0;}
}
  @keyframes wobble{
    0% {
    transform:translate(0px,0) rotate(0);
    }
    25% {
   transform:rotate(-20deg) translate(-20px,0);
   /* transform:rotate(-30deg); */
    }
    50% {
        /* transform:translate(0,0); */
				/* transform:rotate(-45deg); */
    }
    75% {
        transform:rotate(30deg) translate(10px,0);
				/* transform:rotate(30deg); */
    }
    100% {
        /* transform:translate(-20px,0) rotate(0); */
				transform:translate(0,0) rotate(0);
				/* transform:rotate(45deg); */
    }
   }


	 @keyframes scale {
	 
	    0% {
	      transform: scale(0.7)
	    }
	    50% {
	      transform: scale(1)
	    }
	    100% {
	      transform: scale(0.7)
	   }
	 }
	 @keyframes animX{
	    0% {left: 8%;}
	  100% {left: 60%;}
	}
	@keyframes animY{
	    0% {bottom: 15.48%;z-index: 1;}
	  100% {bottom: 9.52%;z-index: 100;}
	}
.jdYb{width: 2.73rem;height: 2.02rem;background: url(../../public/model/jdYb.png) center no-repeat;background-size: 2.73rem;
	position: absolute;
	bottom: 1.4rem;
	left: 2.4rem;
}
.jdG{
	animation: fadeIn 1s linear infinite alternate;
	width: 3.26rem;height: 3.14rem;background: url(../../public/model/jdG.png) center no-repeat;background-size: 2.73rem;position: absolute;bottom: 1rem;left: -0.8rem;
}
.jdJg{width: 5.44rem;height: 5.46rem;background: url(../../public/model/jdJg.png) center no-repeat;background-size: 5.44rem;
	position: absolute;
	left: 0.5rem;
	bottom: 1rem;
	animation: fadeIn 1s linear infinite alternate;
}
/* 锤子砸的动画 */
.goldenEgg .za{
	transition: all 0.5s ease-in;
	/* transform: translate(-20px,0) rotate(-20deg); */
	animation: zaEgg 0.5s ease-in 1 forwards;/* //fadeOut 0.5s 0.5s linear 1 forwards */
	left: 2rem;
	bottom: 2rem;
}
@keyframes zaEgg{
	from{transform: translate(0,0) rotate(30deg);}
	to{transform: translate(-23px,0) rotate(-26deg);}
}
.eggLf{opacity: 0;width: 2.27rem;height: 1.85rem;position: absolute;bottom: 1.2rem;left:-0.1rem;background: url(../../public/model/jdLw.png) center no-repeat;background-size: 0.5rem;}
/* 裂痕动画 */
.lf{
	/* animation: bigAbig 1s 0.5s linear 1 forwards,bigAbig1 1s 1.5s linear 1 forwards,bigAbig2 1s 2.5s linear 1 forwards; */
	/* animation: allbig 3s 0.5s ease-in 1 forwards; */
}
@keyframes allbig{
	0%{transform: scale(1);opacity: 1;}
	100%{transform: scale(4);opacity: 1;}
}
@keyframes bigAbig{
	0%{transform: scale(1);opacity: 1;}
	60%{transform: scale(1.5);opacity: 1;}
	70%{transform: scale(1.5);opacity: 1;}
	100%{transform: scale(1.5);opacity: 1;}
}
@keyframes bigAbig1{
	0%{transform: scale(1.5);opacity: 1;}
	60%{transform: scale(2.5);opacity: 1;}
	70%{transform: scale(2.5);opacity: 1;}
	100%{transform: scale(2.5);opacity: 1;}
}
@keyframes bigAbig2{
	0%{transform: scale(2.5);opacity: 1;}
	60%{transform: scale(4);opacity: 1;}
	70%{transform: scale(4);opacity: 1;}
	100%{transform: scale(4);opacity: 1;}
}
/* .zd{animation: lR 1s 0.5s linear infinite;}
@keyframes lR{
	0%{transform: rotate(0);}
	10%,30%,50%,70%{transform: rotate(-10deg);}
	20%,40%,60%,80%{transform: rotate(10deg);}
	to{transform: rotate(0);}
} */
</style>
