<template>
	<view class="container">
		<!-- 顶部一条 -->
		<view class="top">
			<!-- <navigator open-type="navigateBack" class="goBack">
				<image src="../../static/images/left.png" mode="aspectFill"></image>
			</navigator>
			<text>订单详情</text>
			<text></text> -->
		</view>
		<!-- 商品大图片 -->
		<view class="img-container" v-if="order.intro_image">
            <image :src="order.intro_image[0]" mode="aspectFill"></image>
		</view>
		<!-- 图片下面的信息大盒子 -->
		<view class="goodsInfo-container">
			<view class="infoContainer">
				<text>{{order.goodsName}}</text>
				<view class="info-price">
					<view>￥{{order.unitPrice}}</view>
					<view>× {{order.num}}</view>
					<view>共￥{{order.total_price}}</view>
				</view>
				<text>
					卖家：{{order.sellerName}}
					<view class="info-refund">
						申请退款
					</view>
				</text>
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
					<text class="addressInfo-text1">{{order.orders_id}}</text>
					<text class="addressInfo-text1">{{this.$formatDate(order.time)}}</text>
				</view>
				<view class="addressInfo-block3">
					<text class="addressInfo-text3" @click="pasteAddr()">复制</text>
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
                order: {},
				item:{}
			}
		},

		onLoad(option) {
			if(option===null){
				
			}
			else{
				option.orderId = 6
				this.getOrder(option.orderId)
			}
		},

		methods: {
			async getOrder(order_id){
				let res = await this.$myRequest({
					url: "/order/getOrderDetails",
					method: 'GET',
					data:{
						orderId: order_id
					},
				})
				this.order = res.data.data
				console.log(this.order)
			},
			pasteAddr(){
				
			}
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
			// height: 52rpx;
			height: 30rpx;
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
			image {
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
			height: 772rpx;
			background-color: #DADADA;

			.infoContainer {
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				height: 234rpx;
				margin: 20rpx 52rpx 20rpx 52rpx;

				>text {
					&:nth-child(1) {
						font-size: 32rpx;
						line-height: 40rpx;
						height: 80rpx;
					}

					&:nth-child(3) {
						font-size: 20rpx;
						line-height: 40rpx;
					}
				}

				.info-price {
					color: #676767;
					font-size: 20rpx;
					
					view {
						display: block;
						float: right;
						clear: right;
					}
					
				}
				
				.info-refund{
					float: right;
					border: 1rpx solid #000000;
					height: 40rpx;
					padding: 2rpx 20rpx 2rpx 20rpx;
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

				.addressInfo-block1 {
					display: block;
					position: absolute;
				}

				.addressInfo-block2 {
					display: block;
					position: absolute;
					padding-left: 80rpx;
				}
				
				.addressInfo-block3 {
					display: block;
					position: absolute;
					font-size: 24rpx;
					padding-left: 480rpx;
				}

				.addressInfo-text1,
				.addressInfo-text2,
				.addressInfo-text3,
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
