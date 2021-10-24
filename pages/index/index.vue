<template>
	<view class="container">
		<!-- 顶部模块 -->
		<view class="top">
			<view class="serch" @click="goSearch">
				<image src="../../static/images/组330@2x.png" mode="aspectFit"></image>
			</view>
			<view class="paimaifabu" @click="toGoodsRelease()">
				<image src="../../static/images/组610@2x.png" mode="aspectFit"></image>
			</view>
		</view>
		<!-- 轮播图 -->
		<!-- indicator-dots -->
		<swiper circular indicator-dots autoplay interval="3000" indicator-color="#ccc"
			indicator-active-color="#39a9ff">
			<swiper-item v-for="item in swipers" :key="item.id">
				<image :src="item.introImage" mode="aspectFill"></image>
			</swiper-item>
		</swiper>

		<!-- 轮播图的点，原代码 -->
		<!-- <view class="swiper-dots">
			<view class="dot" :class="index===swiperCurrent ? 'active' : ''" v-for="(item,index) in introImage"
				:key="index"></view>
		</view> -->




		<!-- 商品池 -->
		<!-- 商品池导航 -->
		<view class="paimai-nav">
			<!-- 导航左边 -->
			<view class="paimai-nav-left">
			</view>
			<text>商品池</text>
			<text class="paimai-nav-null"></text>
			<!-- 导航右边，排序分类 -->
			<view class="paimai-nav-jh"  @click="getgoodslist_jh();btn_bg11()" :class="{ bg1: btn_bg1 }" ><text>精华</text></view>
			<view class="paimai-nav-px" @click="getgoodslist_hot();btn_bg22()" :class="{ bg2: btn_bg2 }"><text>热门</text></view>
			<view class="paimai-nav-fl" @click="getgoodslist_new();btn_bg33()" :class="{ bg3: btn_bg3 }"><text>最新</text></view>
			<!-- 两个下拉菜单 -->

		</view>
		<!-- 拍卖商品列表 -->
		<!-- @click='onclick(index)' -->
		<view class="paimai-list">
			<view class="goodslist" v-for="(item,index) in goods" :key="item.id" @click="goToDetail(index)" @longpress="remove_mask(index)" @touchmove="closeMask()" :class="{'goodsmask_hidden': maskIndex === index }" >
				<image :src="item.introImage" mode=""></image>
				<!-- 遮罩层 -->
				<view class="goodsmask" >
					<view class="fv">
						<!-- <image src="../../static/images/收藏.png" mode="aspectFill"></image> -->
					</view>
					<view class="maskcontainer">
					<text>《{{ item.name.substring(0,5) }}》</text>
					<view class="keyword">
<<<<<<< HEAD
                        <view>莫兰蒂</view>   	
		                <view>故事</view> 
=======
                         <view>{{ item.tags[0] }}</view>   	
		                 <view>{{ item.tags[1] }}</view>
						 <view>{{ item.tags[2] }}</view>
>>>>>>> yedn
					</view>
					</view>
				</view>
			</view>
		</view>
		<view class="footer">... ...已经到底啦... ...</view>

	</view>
</template>

<script>
	//import goodsmask from '../../components/goodsmask/goodsmask.vue'
	export default {
		// components: {
		// 	goodsmask
		// },
		data() {
			return {
				swipers: [],
				goods: [],
				// swiperCurrent: 0   轮播图的点
				mask: false,
				px: false,
				fl: false,
				btn_bg1: false,
				btn_bg2: false,
				btn_bg3: false,
				maskIndex: -1,
				// isactive: -1
				url: '/goods/random?type=0&pageNum=0&pageSize=10'
			}
		},

		onLoad() {
			this.getSwipers()
			this.getgoodslist()
		},
		
		methods: {
			//获取轮播图资源
			async getSwipers() {
				const res = await this.$myRequest({
					url: '/goods/random?type=0&pageNum=1&pageSize=4'
				})
				this.swipers = res.data.data
			},
            btn_bg11() {
            	this.btn_bg1 = true,
				this.btn_bg2 = false,
				this.btn_bg3 = false
            },
			btn_bg22() {
				this.btn_bg1 = false,
				this.btn_bg2 = true,
				this.btn_bg3 = false
			},
			btn_bg33() {
				this.btn_bg1 = false,
				this.btn_bg2 = false,
				this.btn_bg3 = true
			},
			// 轮播图指示点
			/*changeSwiper(e) {
				this.swiperCurrent = e.detail.current;
			},*/
<<<<<<< HEAD
			
			toGoodsRelease(){
				uni.navigateTo({
					url: "../../pages/goods-release/goods-release?userid=" + this.userid
				})
=======
			// 点击商品去商品详情页
		    goToDetail(index){
				console.log(this.goods[index])
			    
>>>>>>> yedn
			},


			//商品列表
			// 获取精华列表
			async getgoodslist_jh() {
				const res = await this.$myRequest({

					url: '/goods/essence?type=0&pageNum=0&pageSize=100'
				})
				console.log(res)
				this.goods = res.data.data
			},
			//获取随机商品列表
			async getgoodslist() {
				const res = await this.$myRequest({

					url: '/goods/random?type=0&pageNum=0&pageSize=100'
				})
				console.log(res)
				this.goods = res.data.data
			},
			// 按照热度,商品列表  url: /goods/heat?type=xxx&pageNum=xxx&pageSize=xxx
			async getgoodslist_hot() {
				const res = await this.$myRequest({
					url: '/goods/heat?type=0&pageNum=0&pageSize=100'
				})
				console.log(res)
				this.goods = res.data.data
			},
			//按时间获取  url: /goods/new?type=xxx&pageNum=xxx&pageSize=xxx
			async getgoodslist_new() {
				const res = await this.$myRequest({
					url: '/goods/new?type=0&pageNum=0&pageSize=100'
				})
				console.log(res)
				this.goods = res.data.data
			},
			// // 按照价格获取
			// async getgoodslist3() {
			// 	const res = await this.$myRequest({
			// 		url: '/goods/random?type=0&way=0&pageNum=0&pageSize=10'
			// 	})
			// 	console.log(res)
			// 	this.goods = res.data.data
			// },
			// // 按照库存获取
			// async getgoodslist4() {
			// 	const res = await this.$myRequest({
			// 		url: '/goods/inventory?pageNum=0&pageSize=10'
			// 	})
			// 	console.log(res)
			// 	this.goods = res.data.data
			// },



			// 跳转到搜索页面
			goSearch() {
				uni.navigateTo({
					url: "../search/search"
				})
			},
			// 点击显示遮罩层
			remove_mask(index) {
				this.maskIndex = index
			},
			// 滑动关闭遮罩层
			closeMask() {
				this.maskIndex = -1
			}

			// 获取用户历史标签列表,传userid url : /search/tags/history

		}
	}
</script>

<style lang="less">
	@import "index.less";
	@import "goodsListStyle";
	.goodsmask_hidden {
		.goodsmask {
			display: block !important
		}
	}
</style>
