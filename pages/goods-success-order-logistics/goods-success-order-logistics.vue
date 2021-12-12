<template>
	<view class="container">
		<view class="good-block">
			<view class="good-image-block" v-if="order.intro_image">
				<image :src="order.intro_image[0]" mode="aspectFill"></image>
			</view>
			<view class="good-info-block">
				<view class="seller-info-block">
					<image :src="order.portrait" mode="aspectFill"></image>
					<text>{{order.sellerName}}</text>
				</view>
				<view class="good-info-name">
					{{order.goodsName}}
				</view>
			</view>
		</view>
		
		<view class="logitics-block">
			<view class="logitcs-item1">
				<text>物流状态 ：</text>
				<text>快递单号 ：</text>
				<text>发货日期 ：</text>
			</view>
			<view class="logitcs-item2">
				<text>{{order.waybill}}</text>
				<text>快递单号</text>
				<text>发货日期</text>
			</view>
			<view class="logitcs-item3">
				<text></text>
				<text @click="pasteLogistics()">复制</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				order:{}
			}
		},
		onLoad(option) {
			if(option===null){
				
			}
			else{
				option.orderId = 6
				this.getLogistic(option.orderId)
			}
		},
		
		methods: {
			async getLogistic(order_id){
				let res = await this.$myRequest({
					url: "/order/getlogisticsDetails",
					method: 'GET',
					data:{
						orderId: order_id
					},
				})
				this.order = res.data.data
				console.log(this.order)
			},
			pasteLogistics(){
				
			}
		}
	}
</script>

<style lang="less">
.container{
	width: 600rpx;
	margin: 50rpx auto 0 auto;
	
	.good-block{
		height: 250rpx;
		border-bottom: 1rpx solid #000000;
		
		.good-image-block{
			float: left;
			width: 200rpx;
			height: 200rpx;
			border: 1rpx solid #000000;
			box-sizing: border-box;
			image{
				width: 100%;
				height: 100%;
			}
		}
		
		.good-info-block{
			box-sizing: border-box;
			float: left;
			width: 400rpx;
			height: 100%;
			padding: 10rpx 0 0 30rpx;
			.seller-info-block{
				image{
					width: 50rpx;
					height: 50rpx;
					border-radius: 50rpx;
					border: 1rpx solid #000000;
				}
				
				text{
					font-size: 24rpx;
					padding-left: 10rpx;
					vertical-align: 50%;
				}
			}
			.good-info-name{
				font-size: 32rpx;
				line-height: 35rpx;
				height: 105rpx;
				overflow: hidden;
				text-overflow: ellipsis;
			}
		}
	}
	.logitics-block{
		padding: 30rpx 0 20rpx 0 ;
		
		.logitcs-item1{
			float: left;
			width: 160rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			
			text{
				height: 70rpx;
				line-height: 70rpx;
				font-size: 30rpx;
			}
		}
		.logitcs-item2{
			float: left;
			width: 390rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			
			text{
				height: 70rpx;
				line-height: 70rpx;
				font-size: 30rpx;
			}
		}
		
		.logitcs-item3{
			float: left;
			width: 50rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			
			text{
				height: 70rpx;
				line-height: 70rpx;
				font-size: 24rpx;
			}
		}
	}
	.logitics-check-block{
		
	}
}
</style>
