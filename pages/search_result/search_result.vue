<template>
	<view>
		<view class="top-search-input">
			<view class="btn-goback" @click="goBackToSearch()">
				<image src="../../static/images/left.png" mode="aspectFill"></image>
			</view>
			<view class="input-box"><input type="text" value="" /></view>
			<view class="fdj">
				<image src="../../static/images/fdj.png" mode=""></image>
			</view>
		</view>
		<!-- 大导航栏 -->
		<view class="search-Tabs">
			<view class="search-Tab1" @click="url_type = 0; changeBigNavClass1()"
				:class="{ search_Tabs_border1 : Istrue_url_type1 }"><text>商品</text></view>
			<view class="search-Tab2" @click="url_type = 1; changeBigNavClass2()"
				:class="{ search_Tabs_border2 : Istrue_url_type2 }"><text>拍卖</text></view>
			<view class="search-Tab3" @click="url_type = 2; changeBigNavClass3()"
				:class="{ search_Tabs_border3 : Istrue_url_type3 }"><text>用户</text></view>
		</view>
		<!-- 下拉筛选菜单 的 导航条 -->
		<view class="filter">
			<view class="" @click="dropdownList1()"><text>综合</text></view>
			<view class="" @click="dropdownList2()"><text>分类</text></view>
			<view class="" @click="dropdownList3()"><text>筛选</text></view>
		</view>
		<!-- 下拉筛选菜单的 下拉列表，分为三个block，用v-show切换 -->
		<block v-if="dropdownList===1">
			<view class="father_xiangdui">
				<view class="dropdownList-zh">
					<view><text>随便看看</text></view>
					<view><text>最热</text></view>
					<view><text>最新</text></view>
					<view><text>价格升序</text></view>
					<view><text>价格降序</text></view>
					<view><text>库存升序</text></view>
					<view><text>库存降序</text></view>
				</view>
			</view>
		</block>
		<block v-if="dropdownList===2">
			<view class="father_xiangdui">
				<view class="dropdownList-fl">
					<view><text>服装</text></view>
					<view><text>历史</text></view>
					<view><text>建筑</text></view>
					<view><text>摄影</text></view>
					<view><text>服装</text></view>
					<view><text>历史</text></view>
					<view><text>建筑</text></view>
					<view><text>摄影</text></view>
				</view>
			</view>
		</block>
		<block v-if="dropdownList===3">
			<view class="father_xiangdui">
				<view class="dropdownList-sx">

				</view>
			</view>
		</block>


		<!-- 把主页的商品列表搬过来 -->
		<view class="container">
			<view class="paimai-list">
				<!-- 商品列表 -->
				<view class="goodslist" v-for="(item,index) in goods" :key="item.id" @click="mask_on(1)">
					<image :src="item.introImage" mode=""></image>
					<!-- 遮罩层 -->
					<view class="goodsmask" v-show="mask">
						<!-- 收藏按钮 -->
						<view class="fv">
							<!-- <image src="../../static/images/收藏.png" mode="aspectFill"></image> -->
						</view>
						<view class="maskcontainer">
							<text>《七夕礼物》</text>
							<view class="keyword">
								<view>莫兰蒂</view>
								<view>故事</view>
							</view>
						</view>

					</view>



				</view>
			</view>
			<view class="footer">... ...已经到底啦... ...</view>
		</view>


		<!-- <HM-filterDropdown :filterData="filterData" :defaultSelected ="filterDropdownValue" @confirm="confirm"></HM-filterDropdown> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dropdownList: 0, //下拉筛选列表切换
				url_type: 0, //三个大导航栏修改url的type参数，商品0 拍卖品1，用户2
				goods: [], //商品列表
				keyword: '', //所搜索的关键字
				Istrue_url_type1: true, //切换大导航三个按钮的下边框样式
				Istrue_url_type2: false,
				Istrue_url_type3: false
			}
		},
		onLoad(e) {
			this.keyword = e.keyword
			this.getgoodslist()
			//this.keyword = e.text
			console.log(e)
		},
		methods: {
			// 返回搜索页面
			goBackToSearch() {
				uni.navigateBack({

				})
			},
			// 点击切换大导航三个按钮
			changeBigNavClass1() {
				this.url_type = 0,
					this.Istrue_url_type1 = true,
					this.Istrue_url_type2 = false,
					this.Istrue_url_type3 = false
			},
			changeBigNavClass2() {
				this.url_type = 1,
					this.Istrue_url_type1 = false,
					this.Istrue_url_type2 = true,
					this.Istrue_url_type3 = false
			},
			changeBigNavClass3() {
				this.url_type = 2,
					this.Istrue_url_type1 = false,
					this.Istrue_url_type2 = false,
					this.Istrue_url_type3 = true
			},
			// 获取随机商品列表
			async getgoodslist() {
				const res = await this.$myRequest({
					url: '/search/discover/key?key=' + this.keyword + '&type=' + this.url_type +
						'&pageNum=0&pageSize=100'
				})
				console.log(res)
				this.goods = res.data.data
			},
			// 商品列表遮罩层开关
			mask_on(val) {
				val == 1 ? this.mask = true : this.mask = false
			},
			// 下拉列表弹出与关闭
			dropdownList1() {
				if (this.dropdownList !== 1) {
					this.dropdownList = 1
				} else if (this.dropdownList == 1) {
					this.dropdownList = 0
				}
			},
			dropdownList2() {
				if (this.dropdownList !== 2) {
					this.dropdownList = 2
				} else if (this.dropdownList == 2) {
					this.dropdownList = 0
				}
			},
			dropdownList3() {
				if (this.dropdownList !== 3) {
					this.dropdownList = 3
				} else if (this.dropdownList == 3) {
					this.dropdownList = 0
				}
			},
		}
	}
</script>

<style lang="less">
	@import "goodsListStyle";

	@font-face {
		font-family: 'iconfont';
		/* Project id 2713288 */
		src: url('//at.alicdn.com/t/font_2713288_f84s6tdr39f.woff2?t=1634124032588') format('woff2'),
			url('//at.alicdn.com/t/font_2713288_f84s6tdr39f.woff?t=1634124032588') format('woff'),
			url('//at.alicdn.com/t/font_2713288_f84s6tdr39f.ttf?t=1634124032588') format('truetype');
	}

	.top-search-input {
		display: flex;
		justify-content: space-between;
		margin-top: 20rpx;

		.btn-goback,
		.fdj {
			height: 50rpx;
			width: 50rpx;
			padding: 0 30rpx 0 30rpx;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.input-box {
			flex: 1;
			border-radius: 40rpx;
			border: 2rpx solid;
		}

	}

	.search-Tabs {
		display: flex;
		justify-content: space-between;
		width: 94%;
		height: 100rpx;
		margin: 24rpx 0 0 22.5rpx;

		//background-color: #C0C0C0;
		.search-Tab1,
		.search-Tab2,
		.search-Tab3 {
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			width: 30%;
			//background-color: #0069D6;
			border-radius: 30rpx;

		}

	}

	.search_Tabs_border1 {
		text {
			border-bottom: 8rpx solid #0080ff;
		}
	}

	.search_Tabs_border2 {
		text {
			border-bottom: 8rpx solid #0080ff;
		}
	}

	.search_Tabs_border3 {
		text {
			border-bottom: 8rpx solid #0080ff;
		}
	}

	//用属性选择器为啥不行？
	// view[class^="search_Tabs_border"] {
	// 	.search-Tab1,
	// 	.search-Tab2,
	// 	.search-Tab3 {
	// 		text {
	// 			border-bottom: 8rpx solid #0080ff;
	// 		}
	// 	}
	// }
	.filter {
		display: flex;
		justify-content: space-around;

		view {
			text {
				font-size: 26rpx;

				&:nth-child(1) {
					&::after {
						content: '\e619';
						font-family: 'iconfont';
					}

					// &:nth-child(2) {
					// 	&::after {
					// 	content:'\e619';
					// 	font-family: 'iconfont';
					// }
				}
			}
		}
	}

	.father_xiangdui {
		position: relative;

		.dropdownList-zh,
		.dropdownList-fl {
			border-radius: 0 0 30rpx 30rpx;
			margin: 8rpx 0 0 0;
			background-color: #f4f4f4;
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			z-index: 999;

			>view {
				display: flex;
				justify-content: flex-start;
				align-items: center;

				height: 70rpx;
				width: 96%;
				border-bottom: 1rpx solid #999999;

				text {
					font-size: 28rpx;
					padding-left: 70rpx;
				}
			}
		}

		.dropdownList-fl {
			>view {
				display: flex;
				justify-content: center;
				align-items: center;
				margin-left: 10rpx;

				text {
					transform: translateX(-46rpx);
				}
			}
		}
	}
</style>
