<template>
	<view class="wander">
		<view class="wander-top">
			<!-- 搜索框模块 -->
			<view class="search" >
				<text class="iconfont icon-fangdajing" @click='toSearch'></text>
				<!-- 按照设计图来看，搜索点击之后没有动态样式 -->
				<input type="text" placeholder-class="Search" placeholder="Discover" 
				@focus="changeInputClass" @blur="removeInputClass" @click='toSearch' disabled="true">
				<view class="location">
					<text class="iconfont icon-dingwei"></text>
					<text>广州</text>
				</view>
			</view>
			<!-- ------------------------------------------------ -->
			
			<!-- 轮播图模块 -->
			<view class="container">
				<swiper :circular="true" :autoplay="true" :interval="3000" :duration="1000" class="swiper" 
				:current="swiperCurrent" @change="changeSwiper">
					<swiper-item v-for="item in swiperImg" @click="toLiving">
						<view class="swiper-item">
							<image :src="item" mode="aspectFill"></image>
						</view>
					</swiper-item>
				</swiper>
				<view class="swiper-dots">
					<view class="dot" :class="index===swiperCurrent ? 'active' : ''"
					v-for="(item,index) in swiperImg" :key="index"></view>
				</view>
			</view>
			<!-- ------------------------------------------------------- -->
		</view>
		<view class="wander-body">
			
			<view class="wander-box">
				<!-- 复用living组件 -->
				<view class="exhibits-around-top">
					<text class="block"></text>
					<text class="exhibits-around-title" >礼 物 专 区</text>
				</view>
				<view class="exhibits-around-body1"></view>
			</view>
			
			<view class="wander-box">
				<!-- 复用living组件 -->
				<view class="exhibits-around-top">
					<text class="block"></text>
					<text class="exhibits-around-title" >商 品 池</text>
				</view>
				<template v-for="item,index in 9">
					<view class="exhibits-around-body2"></view>
				</template>
			</view>
			<loading :showLoading="showLoading"></loading>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isInputActive:false,//判断输入框是否focus
				swiperImg: [
					'',					
					'',
					'',
					''
				],
				exhibitions:[],
				swiperCurrent:0,
				functionTitle:["展览","沙龙","live专区"],
				functionIndex:0,
				showLoading:true,
				//用户的位置信息，用于获取周围的展
				userLongitude:0,
				userLatitude:0,
				//周围展的信息
				nearyExhibitions:[],
			};
		},
		methods: {
			changeInputClass(){
				this.isInputActive=true;
			},
			removeInputClass(){
				this.isInputActive=false;
			},
			changeSwiper(e) {
				this.swiperCurrent = e.detail.current;
			},
			toSearch(){
				uni.switchTab({
					url:'../wander-discover/wander-discover'
				})
			},
			//切换tab选项卡的标题
			changeIndex(index){
				this.functionIndex=index;
			},
			toMore(){
				uni.navigateTo({
					url:"../more/more",
					animationType:"fade-in",
					animationDuration:1000
				})
			},
			//轮播图的点击跳转
			toLiving(id){
				uni.navigateTo({
					url:"../living/living?id="+id,
				})
			},
			toClassify(id){
				if(this.functionIndex===0){
					uni.navigateTo({
						url:"../living/living?id="+id,
					})
				}else if(this.functionIndex===1){
					uni.navigateTo({
						url:"../artSalon/artSalon?id="+id
					})
				}else{
					uni.navigateTo({
						url:"../course-template/course-template?id="+id
					})
				}
			},
			toSalon(id){
				uni.navigateTo({
					url:"../artSalon/artSalon?id="+id
				})
			},
			toCourse(id){
				uni.navigateTo({
					url:"../course-template/course-template?id="+id
				})
			},
			//根据用户位置获取周围的展
			async getNearbyExhi(){
				const res = await this.$myRequest({
					url:"/nearby-exhibitions/"+this.userLongitude+'/'+this.userLatitude
				})
				this.nearyExhibitions = res.data.data.list;
			},
			getUserLocation(){
				let userInfo = uni.getStorageSync("user")
				this.userLongitude = userInfo.longitude
				this.userLatitude = userInfo.latitude
			},
		},
		onShow(){
			if(uni.getStorageSync('user')){
				this.getUserLocation()
				this.getNearbyExhi()
			}
		},
		onLoad() {
			//获取缓存里的用户地理位置
			this.getUserLocation();
			if(uni.getStorageSync('user')){
				this.getNearbyExhi()
			}
			this.showLoading = false;
		},
		onUnload() {
			this.showLoading = true;
		},
		
	}
</script>

<style lang = "less">
	@import "./wander.less";
</style>