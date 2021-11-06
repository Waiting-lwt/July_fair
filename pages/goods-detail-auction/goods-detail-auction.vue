<template>
	<view class="container">
		<view class="top">
			<!-- 顶部一条 -->
			<navigator open-type="navigateBack" class="goBack">
				<image src="../../static/images/left.png" mode="aspectFill"></image>
			</navigator>
			<text>作品详情</text>
			<view class="icon-report">
				<image src="../../static/images/举报.png" mode="aspectFill"></image>
			</view>
		</view>
		<!-- 带有商品图片的大盒子 -->
		<view class="image-container">
			<view class="goods-image">
				<image :src="obji.introImage" mode="aspectFill"></image>
			</view>
			<view class="goods-info">
				<view class="goods-info-left">
					<view class="goods-info-price">
						￥{{obji.price}}
					</view>
					<text>购买量：230</text>
					<text>库存：34</text>
				</view>
				<view class="goods-info-iconfav">
					<image src="../../static/images/shoucang.png" mode=""></image>
				</view>
			</view>
		</view>
		<view class="tab-paimai-info">
			<!-- 蓝色导航条 -->
			<text></text>
			<text>拍卖信息</text>
			<text>剩余时间：23h35m</text>
		</view>

		<!-- 拍卖用户榜单 -->
		<view class="items-paimai">
			<view class="items-paimai-list">
				<!-- 左边的榜单部分 -->
				<view class="goodsList-items">
					<view class="goodsList-items-text">
						<text>NO.1</text>
						<text>NO.2</text>
						<text>NO.3</text>
					</view>
					<view class="goodsList-items-v-for">
						<view class="image"></view>
						<view class="image"></view>
						<view class="image"></view>
					</view>
				</view>
				<view class="goodsList-part">
					<text>参与人数：23</text>
					<view class="image-part" @click="goUserList()">
						<text></text>
						<text></text>
						<text></text>
					</view>
				</view>
			</view>
			<view class="btn-paimai" @click="open">
				<!-- 右边的拍卖大按钮 -->
				<view class="btn-paimai-image">
					<image src="../../static/images/拍卖.png" mode="aspectFill"></image>
				</view>
			</view>
		</view>
		
		
		<!-- 底部出价弹出框 请出价-->
		<uni-popup ref="popup" type="bottom" class="pop-bottom">
			<view class="pop-bottom-container">
				<text>竞拍价</text>
				<text>当 前 最 高 7 0 币</text>
				<input type="text" value="" placeholder="请输入您的出价" />
				<text>注：只能输入比目前最高价更高的价格哦~</text>
				<view class="pop-offerPrice-btn" @click="open1">
					<text>出价</text>
				</view>
			</view>
		</uni-popup>
		
		
		<!-- popup-确定出价？ -->
		<uni-popup ref="popup1" type="dialog" class="confirmPrice-container">
			<view class="confirmPrice">
				<text>确定出价？</text>
				<view class="confirmPrice-btn">
					<view class="confirm-btn" @click="close1">
						<text>取消</text>
					</view>
					<view class="confirm-btn" @click="open2">
						<text>确定</text>
					</view>
				</view>
			</view>
		</uni-popup>
		
		<!-- popup-出价成功 -->
		<uni-popup ref="popup2" type="dialog" class="confirmPrice-container">
			<view class="confirmPrice">
				<text>出价成功</text>
				<view class="confirmPrice-btn">
					<view class="confirm-btn" @click="close2">
						<text>取消</text>
					</view>
					<view class="confirm-btn" @click="open3">
						<text>确定</text>
					</view>
				</view>
			</view>
		</uni-popup>
		<!-- popup-是否重新出价？ -->
		<uni-popup ref="popup3" type="dialog" class="confirmPrice-container">
			<view class="confirmPrice">
				<text>您已出价，是否重新出价？</text>
				<view class="confirmPrice-btn">
					<view class="confirm-btn" @click="close3">
						<text>取消</text>
					</view>
					<view class="confirm-btn" @click="open">
						<text>确定</text>
					</view>
				</view>
			</view>
		</uni-popup>
		
		
		
		<view class="tab-paimai-info">
			<text></text>
			<text>作品名字</text>
		</view>
		<view class="works-tags">
			<view class="works-tags-item" v-for="item in obji.tags">
				<text>{{item}}</text>
			</view>
		</view>
		<view class="works-intro-p">
			<view>{{obji.introduction}}</view>
		</view>




		<view class="author-intro">
			<view class="tab-paimai-info">
				<text></text>
				<text>作者介绍</text>
			</view>
			<view class="author-intro-info">
				<view class="author-intro-img">
					<image :src="userInfo.data.data.portrait" mode="aspectFill"></image>
				</view>
				<view class="author-intro-right">
					<text>{{userInfo.data.data.name}}</text>
					<view class="works-tags">
						<view class="works-tags-item" v-for="item in userInfo.data.data.tags">
							<text>{{item}}</text>
						</view>
						<!-- <view class="works-tags-item">
							<text>中国古代</text>
						</view> -->
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				goodsInfoId: '',
				goodsInfoIds: '',
				obji: '',
				auctionId: '',
				auctionInfo: '',
				imageurl: '',
				userId: '',
				userInfo: ''

			}
		},

		onLoad(option) {
			this.obji = JSON.parse(option.objo) // 还原为对象
			console.log(this.obji)
			this.auctionId = this.obji.id
			this.getAuctionInfo()
			this.userId = this.obji.userId
			console.log('用户id' + this.userId)
			this.getUserInfo()
		},


		methods: {
			async getAuctionInfo() {
				const res = await this.$myRequest({

					url: '/goods/getAuctionStatus?id=' + this.auctionId
				})
				this.auctionInfo = res
				console.log(res)
			},
			open() {
				// 通过组件定义的ref调用uni-popup方法 ,如果传入参数 ，type 属性将失效 ，仅支持 ['top','left','bottom','right','center']
				this.$refs.popup.open('bottom')
				this.$refs.popup3.close()
			},
			open1() {
				this.$refs.popup.close()
				this.$refs.popup1.open('center')
			},
			open2() {
				this.$refs.popup1.close()
				this.$refs.popup2.open('center')
			},
			open3() {
				this.$refs.popup2.close()
				this.$refs.popup3.open('center')
			},
			close1() {
			    this.$refs.popup1.close()
			},
			close2() {
			    this.$refs.popup2.close()
			},
			close3(){
				this.$refs.popup3.close()
			},
			goUserList() {
				uni.navigateTo({
					url: '../auction-goodsdetail-userlist/auction-goodsdetail-userlist'
				})
			},
			async getUserInfo() {
				const res = await this.$myRequest({
					url: '/user/baseInformation?id=' + this.userId
				})
				this.userInfo = res
				console.log(res)
			},

		}
	}
</script>

<style lang="less">
	.container {
		width: 666rpx;
		margin-left: 42rpx;

		.top {
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 152rpx;
			width: 100%;

			.goBack {
				height: 29rpx;
				width: 24rpx;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.icon-report {
				width: 35rpx;
				height: 40rpx;

				image {
					width: 100%;
					height: 100%;
				}
			}
		}

		// 上半页面商品图片的大盒子
		.image-container {
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			align-items: center;
			height: 596rpx;
			background-color: #E8E8E8;
			margin-bottom: 67rpx;

			.goods-image {
				width: 578rpx;
				height: 385rpx;
				background-color: #D5D5D5;

				image {
					height: 100%;
					width: 100%;
				}
			}

			.goods-info {
				display: flex;
				justify-content: space-between;
				align-items: center;
				width: 100%;

				.goods-info-left {
					height: 64rpx;
					margin-left: 44rpx;

					text {
						font-size: 16rpx;
						margin-right: 20rpx;
						color: #8D8D8D;
					}
				}

				.goods-info-iconfav {
					width: 50rpx;
					height: 50rpx;
					margin-right: 44rpx;

					image {
						width: 100%;
						height: 100%;
					}
				}
			}
		}

		// 三个蓝色标题的样式
		.tab-paimai-info {
			display: flex;
			justify-content: flex-start;
			align-items: center;

			text {

				&:first-child {
					width: 10rpx;
					height: 24rpx;
					background-color: #21277B;
					border-radius: 4rpx;
					margin-right: 17rpx;
				}

				&:nth-child(2) {
					font-size: 28rpx;
					color: #4F73A5;
					font-weight: 700;
					margin-right: 25rpx;
				}

				&:nth-child(3) {
					font-size: 12rpx;
					color: #C47213;
				}
			}

		}

		// 模块一：拍卖信息
		.items-paimai {
			display: flex;
			justify-content: space-between;
			height: 142rpx;
			margin: 20rpx 0 36rpx 0;

			.items-paimai-list {
				display: flex;
				height: 100%;
				width: 488rpx;
				background-color: #E8E8E8;

				.goodsList-items {
					display: flex;
					flex-direction: column;
					justify-content: space-around;
					height: 100%;
					width: 340rpx;

					.goodsList-items-text {
						display: flex;
						justify-content: space-around;

						text {
							font-size: 18rpx;
							color: #707070;

							&:first-child {
								color: #FFA448;
							}
						}

					}

					.goodsList-items-v-for {
						display: flex;
						justify-content: space-around;

						.image {
							width: 70rpx;
							height: 70rpx;
						}
					}
				}

				.goodsList-part {
					height: 100%;
					flex: 1;
					display: flex;
					justify-content: space-around;
					flex-direction: column;
					align-items: center;

					text {
						font-size: 12rpx;
						color: #707070;
					}

					.image-part {
						display: flex;
						justify-content: center;
						align-items: center;
						height: 76rpx;
						width: 76rpx;
						border-radius: 24rpx;
						background-color: #dddddd;
						box-shadow: 4rpx 5rpx 7rpx rgba(0, 0, 0, 0.3);

						text {
							height: 8rpx;
							width: 8rpx;
							margin: 0 2rpx;
							border-radius: 50%;
							background-color: #707070;
						}
					}
				}
			}

			.btn-paimai {
				width: 142rpx;
				height: 142rpx;
				background-color: #C2C2C2;

				.btn-paimai-image {
					width: 62rpx;
					height: 62rpx;
					margin: 40rpx 0 0 40rpx;

					image {
						height: 100%;
						width: 100%;
					}
				}
			}
		}

		// 模块二：作品名字.标签
		.works-tags {
			display: flex;
			justify-content: flex-start;
			margin: 20rpx 0;

			.works-tags-item {
				display: flex;
				justify-content: center;
				align-items: center;
				height: 38rpx;
				background-color: #B5B5B5;
				border-radius: 16rpx;
				margin-right: 20rpx;

				text {
					font-size: 20rpx;
					padding: 10rpx 30rpx;
					color: #2a2a2a;

				}

			}
		}

		.works-intro-p {
			//display: flex;
			width: 100%;
			background-color: #e8e8e8;
			margin-bottom: 20rpx;

			view {
				text-indent: 2em;
				font-size: 24rpx;
				line-height: 44rpx;
				padding: 16rpx 27rpx;
			}
		}

		// 模块三:作者介绍
		.author-intro {
			margin: 0 0 40rpx 14rpx;

			.author-intro-info {
				display: flex;
				justify-content: flex-start;
				margin-top: 20rpx;

				.author-intro-img {
					height: 108rpx;
					width: 108rpx;
					background-color: #cccccc;
					margin-right: 20rpx;

					image {
						height: 100%;
						width: 100%;
					}
				}

				.author-intro-right {
					display: flex;
					flex-direction: column;
					justify-content: space-around;

					>text {
						font-size: 32rpx;
					}
				}
			}
		}

		.pop-bottom {
			.pop-bottom-container {
				display: flex;
                flex-direction: column;				
				justify-content: space-around;
				align-items: center;
				height: 726rpx;
				width: 100%;
				background-color: #FFFFFF;
				border-radius: 50rpx 50rpx 0 0;
				border: 1rpx solid #707070;
				>text {
					&:nth-of-type(1) {
						font-size: 40rpx;
						border-width: 700;
						margin-top: 20rpx;
					}
					&:nth-of-type(2) {
						font-size: 30rpx;
					}
					&:nth-of-type(3) {
						font-size: 18rpx;
						color: #A9ADC5;
					}
				}
				input {
					width: 80%;
					margin: 180rpx 0;
				}
				.pop-offerPrice-btn {
					display: flex;
					justify-content: center;
					align-items: center;
					height: 106rpx;
					width: 634rpx;
					border-radius: 30rpx;
					background-color: #006AD7;
					margin-bottom: 24rpx;
					text {
						font-size: 38rpx;
						color: #ffffff;
					}
				}
			}
		}
		.confirmPrice {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: space-around;
			width: 600rpx;
			height: 342rpx;
			background-color: #ffffff;
			border-radius: 34rpx;
			box-sizing: border-box;
			>text {
				font-size: 36rpx;
				padding: 40rpx 0 0 10rpx;
			}
			.confirmPrice-btn {
				display: flex;
				justify-content: space-between;
				width: 468rpx;
				padding-bottom: 40rpx;
				.confirm-btn {
					display: flex;
					justify-content: center;
					align-items: center;
					width: 162rpx;
					height: 62rpx;
					background-color: #006AD7;
					border-radius: 20rpx;
					>text {
						color: #ffffff;
						font-size: 20rpx;
					}
				}
			}
		}
	}
</style>
