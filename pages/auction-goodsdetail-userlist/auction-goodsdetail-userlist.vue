<template>
	<view class="container">
	<view class="top">
		<navigator open-type="navigateBack" class="goBack">
			<image src="../../static/images/left.png" mode="aspectFill"></image>
		</navigator>
		<text>作品详情</text>
		<view class="icon-report">
			<image src="../../static/images/举报.png" mode="aspectFill"></image>
		</view>
	</view>
	<view class="container-main">
		<view class="championPortrait">
			<image src="../../static/images/31d8396e51d368cf1e68a1ba6bb8623.png" mode="aspectFit"></image>
			<view class="image-icon">
				<image src="../../static/images/第一.png" mode="aspectFill"></image>
			</view>
		</view>
		<text class="userName">pp</text>
		<text class="time">剩余时间 : 23h 18m</text>
		<view class="userOffer">
			<text>78币</text>
		</view>
		<view class="userList">
			<view class="userOfferInfo">
				<text>2</text>
				<view class="userProtrait">
					<!-- <image src="../../static/images/NoPath%20-%20副本%20(4).png" mode="aspectFill"></image> -->
				</view>
				<text>伊尔萨</text>
				<view class="null"></view>
				<text>77&nbsp;&nbsp;&nbsp;币</text>
			</view>
			<view class="userOfferInfo">
				<text>2</text>
				<view class="userProtrait">
					<!-- <image src="../../static/images/NoPath%20-%20副本%20(4).png" mode="aspectFill"></image> -->
				</view>
				<text>伊尔萨</text>
				<view class="null"></view>
				<text>77&nbsp;&nbsp;&nbsp;币</text>
			</view>
		</view>
	</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style lang="less">
	.container {
	.top {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 152rpx;
		width: 100%;
		width: 666rpx;
		margin-left: 42rpx;

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

	.container-main {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		width: 564rpx;
		//height: 1000rpx;
		margin: 100rpx 93rpx 0;
		//background-color: #b6cfd6;
		.championPortrait {
			position: relative;
			height: 183rpx;
			width: 188rpx;
			border-radius: 24rpx;
		    background-color: #00FFF9;
			
			image{
				height: 183rpx;
				width: 188rpx;
			}
			.image-icon {
				position: absolute;
				width: 50rpx;
				height: 60rpx;
				top:146rpx;
				right: 68rpx;
				image {
					width: 100%;
					height: 100%;
				}
				
			}
		}
		.userName {
			margin-top:30rpx;
			font-size: 44rpx;
		}
		.time {
			margin: 22rpx 0;
			font-size: 16rpx;
		}
		.userOffer {
			display:flex;
			justify-content: center;
			align-items: center;
			width: 302rpx;
			height: 88rpx;
			border-radius: 20rpx;
			background-color: #B4B4B4;
			box-shadow: 4rpx 5rpx 7rpx rgba(0, 0, 0, 0.3);
			margin-bottom: 105rpx;
			text {
				font-size: 44rpx;
				color: #FFFFFF;
			}
		}
		.userList {
			width: 100%;
			.userOfferInfo {
				display: flex;
				justify-content: flex-start;
				align-items: center;
				width: 100%;
				margin-bottom: 50rpx;
				.userProtrait {
					width: 92rpx;
					height: 88rpx;
					margin-right: 28rpx;
					image {
						width: 100%;
						height: 100%;
					}
				}
				.null {
					flex:1;
				}
				text {
					&:nth-child(1){
						font-size: 30rpx;
						margin-right: 30rpx;
					}
					&:nth-child(2){
						font-size: 36rpx;
					}
					&:nth-child(3){
						font-size: 30rpx;
					}
				}
			}
		}
	}
	}
</style>
