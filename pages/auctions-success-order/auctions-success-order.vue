<template>
	<view class="container">
		<view class="top">
			<!-- 顶部一条 -->
			<navigator open-type="navigateBack" class="goBack">
				<image src="../../static/images/left.png" mode="aspectFill"></image>
			</navigator>
			<text>订单详情</text>
			<text></text>
		</view>
		<!-- 商品大图片 -->
		<view class="img-container">
               <image :src="objo2.intro_image" mode="aspectFill"></image>
		</view>
		<!-- 图片下面的信息大盒子 -->
		<view class="goodsInfo-container">
			<view class="infoContainer">
				<text>{{ objo2.name.substring(0,8) }}</text>
				<text>卖家：{{ objo2.seller_name }}</text>
				<view class="info-price">
					<text>我的出价：72</text>
					<text>邮费：6</text>
					<text>共计：78</text>
					<text></text>
				</view>
			</view>
		</view>
		<!-- 订单地址 -->
		<view class="addressInfo">
			<view class="addressInfo-block">
				<view class="addressInfo-block1">
					<text class="addressInfo-text">姓名</text>
					<text class="addressInfo-text">电话</text>
					<text class="addressInfo-text">地址</text>
				</view>
				<view class="addressInfo-block2">
					<text class="addressInfo-text">{{item.tname||"name"}}</text>
					<text class="addressInfo-text">{{item.phone||"phone"}}</text>
					<text class="addressInfo-text">{{item.location||"address"}}</text>
				</view>
			</view>

		</view>
		<!-- 订单号 -->
		<view class="addressInfo1">
			<view class="addressInfo-block">
				<view class="addressInfo-block1">
					<text class="addressInfo-text">订单号</text>
					<text class="addressInfo-text">下单时间</text>
				</view>
				<view class="addressInfo-block2">
					<text class="addressInfo-text1">{{item.tname||"num"}}</text>
					<text class="addressInfo-text1">{{item.phone||"time"}}</text>
				</view>
			</view>

		</view>
		<!-- 底部三个按钮 -->
		<view class="bottom3Btn">
			<view class="bt1Btn">
				<text>修改地址</text>
			</view>
			<view class="bt1Btn">
				<text>查看物流</text>
			</view>
			<view class="bt2Btn">
				<text>确认收货</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
                objo2:'',
			}
		},

		onLoad(Option) {
			
			console.log(this.objo2)
			this.objo2 = JSON.parse(Option.objo2)
			

		},

		methods: {

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

			>text {
				color: #707070; //#000205;
			}

			.goBack {
				height: 29rpx;
				width: 24rpx;

				image {
					width: 100%;
					height: 100%;
				}
			}


		}

		.img-container {
			position: absolute;
			margin-left: 54rpx;
			width: 544rpx;
			height: 624rpx;
			background-color: #A0A0A0;
			>image {
				width: 100%;
				height: 100%;
			}
		}

		.goodsInfo-container {
			display: flex;
			flex-direction: column;
			justify-content: flex-end;
			margin-top: 124rpx;
			width: 652rpx;
			height: 712rpx;
			background-color: #DADADA;

			.infoContainer {
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				height: 144rpx;
				margin: 20rpx 0 52rpx 52rpx;

				>text {
					&:nth-child(1) {
						font-size: 32rpx;
					}

					&:nth-child(2) {
						font-size: 20rpx;
					}
				}

				.info-price {
					display: flex;
					justify-content: space-between;
					color: #8E8E8E;
					font-size: 20rpx;
				}
			}
		}

		//地址信息样式-wt
		.addressInfo,
		.addressInfo1 {
			width: 652rpx;
			height: 200rpx;
			margin: 50rpx 0;
			background-color: #DADADA;

			//border: 1rpx solid #0d3254;
			//border-radius: 20rpx;
			//box-shadow: 0rpx 4rpx 8rpx #738eae, -4rpx 0 8rpx #738eae, 4rpx 0 8rpx #738eae;
			.addressInfo-block {
				width: 90%;
				margin: 0 auto;
				padding-top: 15rpx;

				/* padding-bottom: 5rpx; */
				//border-bottom: 1rpx solid #0d3254;
				.addressInfo-block1 {
					display: block;
					position: absolute;
				}

				.addressInfo-block2 {
					display: block;
					padding-left: 80rpx;
				}

				.addressInfo-text1,
				.addressInfo-text2,
				.addressInfo-text {
					display: block;
					font-size: 24rpx;
					line-height: 32rpx;
					padding: 15rpx 10rpx 15rpx 20rpx;
					white-space: pre-wrap;

				}

				.addressInfo-text1 {
					padding-left: 50rpx;
				}

			}

		}

		.addressInfo1 {
			height: 140rpx;
		}

		input {
			min-height: 24rpx;
		}

		// 底部三个按钮
		.bottom3Btn {
			display: flex;
			justify-content: space-between;
			height: 73rpx;
			font-size: 28rpx;
			color: #4F73A5;
			margin-bottom: 50rpx;

			.bt1Btn,
			.bt2Btn {
				display: flex;
				justify-content: center;
				align-items: center;
				width: 25%;
				background-color: #ffffff;
				border-radius: 14rpx;
				box-shadow: 0rpx 4rpx 8rpx #738eae, -4rpx 0 8rpx #738eae, 4rpx 0 8rpx #738eae;
			}

			.bt2Btn {
				width: 38%;
				color: #FFFFFF;
				background-color: #008dd8;
			}
		}
	}
</style>
