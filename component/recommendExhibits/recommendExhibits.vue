<template>
	<view class="recommend-exhibits">
		<view class="recommend-exhibits-body">
			<view class="recommend-exhibits-top">
				<text class="block"></text>
				<view class="title">
					<view v-for="(item,index) in titles" class="recommend-exhibits-title" 
					:class="{active:index===currentIndex}" @click="getIndex(index)" 
					:key='index' >{{item}}
					</view>
				</view>
			</view>
			<view class="recommend-exhibits-center">
				<view class="recommend-exhibits-items">
					<view class="recommend-exhibits-item">
						<view class="item-left">
							<image class="item-image" src="../../static/images/wander-exhibits1.jpg" mode="aspectFill"></image>
						</view>
						<view class="item-right">
							<view class="item-right-title">毕加索，麻胶版画展</view>
							<view class="item-right-des">毕加索麻胶版画展部分的展览</view>
							<view class="item-tabs">
								<view class="tab">浅蓝色</view>
								<view class="tab">莫兰迪</view>
								<view class="tab">橘色</view>
							</view>
						</view>
						<view class="location">
							<text class="iconfont icon-icon-test"></text>
							<text class="distance">1.5km</text>
						</view>
					</view>
					<view class="recommend-exhibits-item">
						<view class="item-left">
							<image class="item-image" src="../../static/images/wander-exhibits1.jpg" mode="aspectFill"></image>
						</view>
						<view class="item-right">
							<view class="item-right-title">毕加索，麻胶版画展</view>
							<view class="item-right-des">毕加索麻胶版画展部分的展览</view>
							<view class="item-tabs">
								<view class="tab">浅蓝色</view>
								<view class="tab">莫兰迪</view>
								<view class="tab">橘色</view>
							</view>
						</view>
						<view class="location">
							<text class="iconfont icon-icon-test"></text>
							<text class="distance">1.5km</text>
						</view>
					</view>
					<view class="recommend-exhibits-item">
						<view class="item-left">
							<image class="item-image" src="../../static/images/wander-exhibits1.jpg" mode="aspectFill"></image>
						</view>
						<view class="item-right">
							<view class="item-right-title">毕加索，麻胶版画展</view>
							<view class="item-right-des">毕加索麻胶版画展部分的展览</view>
							<view class="item-tabs">
								<view class="tab">浅蓝色</view>
								<view class="tab">莫兰迪</view>
								<view class="tab">橘色</view>
							</view>
						</view>
						<view class="location">
							<text class="iconfont icon-icon-test"></text>
							<text class="distance">1.5km</text>
						</view>
					</view>
					<view class="recommend-exhibits-item">
						<view class="item-left">
							<image class="item-image" src="../../static/images/wander-exhibits1.jpg" mode="aspectFill"></image>
						</view>
						<view class="item-right">
							<view class="item-right-title">毕加索，麻胶版画展</view>
							<view class="item-right-des">毕加索麻胶版画展部分的展览</view>
							<view class="item-tabs">
								<view class="tab">浅蓝色</view>
								<view class="tab">莫兰迪</view>
								<view class="tab">橘色</view>
							</view>
						</view>
						<view class="location">
							<text class="iconfont icon-icon-test"></text>
							<text class="distance">1.5km</text>
						</view>
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
				titles:["线下展览","线下沙龙","live专区"],
				currentIndex:0,
			}
		},
		methods: {
			getIndex(index){
				this.currentIndex=index;
			}
		}
	}
</script>

<style lang="less">
	@color:#1E6CB5;
	.recommend-exhibits{
		.recommend-exhibits-body{
			width: 700rpx;
			.recommend-exhibits-top{
				width: 100%;
				line-height: 40rpx;
				height: 40rpx;
				display: flex;
				justify-content: flex-start;
				.block{
					display: inline-block;
					width: 12rpx;
					height: 40rpx;
					background-color: #306FB6;
					border-radius: 4rpx;
					vertical-align: text-top;
				}
				.title{
					display: flex;
					justify-content: space-around;
					width: 600rpx;
					.recommend-exhibits-title{
						font-size: 26rpx;
						transition: all 0.2s ease;
						color: #B5B6B8;
						&:first-child{
							margin-left: -40rpx;
						}
					}
					.active{
						color: #1E6CB5;
					}
				}
			}
			.recommend-exhibits-center{
				margin-top: 120rpx;
				.recommend-exhibits-items{
					width: 100%;
					margin-bottom: 500rpx;//预留位置
					.recommend-exhibits-item{
						// 345x163
						margin-top: 80rpx;
						width: 100%;
						height: 326rpx;
						background-color: #D3DDE6;
						border-radius: 24rpx;
						display: flex;
						justify-content: space-around;
						position: relative;
						padding: 30rpx 0;
						box-sizing: border-box;
						.item-left{
							.item-image{
								// 115x170
								position: absolute;
								width: 260rpx;
								height: 332rpx;
								border-radius: 10rpx;
								bottom: 50rpx;
								left: 26rpx;
								box-shadow: 0 0 15rpx 0 #666;
							}
						}
						.item-right{
							margin-left: 200rpx;
							.item-right-title{
								font-size: 32rpx;
								color: @color;
								line-height: 60rpx;
							}
							.item-right-des{
								font-size: 20rpx;
								line-height: 60rpx;
								color: #888;
							}
							.item-tabs{
								margin-top: 30rpx;
								display: flex;
								justify-content: space-around;
								.tab{
									// 38x18（单个）
									// 左右间隔13	5
									width: 80rpx;
									height: 36rpx;
									margin-left: 22rpx;
									border-radius: 10rpx;
									font-size: 24rpx;
									border: 2rpx solid @color;
									text-align: center;
									color: #888;
								}
							}
						}
						.location{
							position: absolute;
							bottom: 30rpx;
							right: 50rpx;
							font-size: 24rpx;
							.iconfont{
								margin-left: 15rpx;
							}
						}
					}
										
				}
			}
		}
	}
</style>
