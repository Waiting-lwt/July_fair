<template>
	<view class="container">
		<view class="top">
			<!-- 顶部一条 -->
			<navigator open-type="navigateBack" class="goBack">
				<image src="../../static/images/left.png" mode="aspectFill"></image>
			</navigator>
			<text>确认购买</text>
			<text></text>
		</view>
		<!-- 商品大图片 -->
		<view class="img-container">
			<image :src="obji.intro_image" mode="aspectFill"></image>
		</view>
		<!-- 图片下面的信息大盒子 -->
		<view class="goodsInfo-container">
			<view class="infoContainer">
				<text>{{ obji.name.substring(0,8) }}</text>
				<text>卖家：{{ obji.seller_name }}</text>
				<view class="info-price">
					<text>我的出价：72</text>
					<text>邮费：6</text>
					<text>共计：78</text>
					<text></text>
				</view>
			</view>
		</view>
		<!-- 蓝色导航条 -->
		<view class="tab-paimai-info">
			<!-- 蓝色导航条 -->
			<text></text>
			<text>收货地址</text>
		</view>
		<!-- wt:收货地址 -->
		<view class="addressInfo">
			<view class="addressInfo-block">
				<view class="addressInfo-block1">
					<text class="addressInfo-text">姓名</text>
					<text class="addressInfo-text">电话</text>
					<text class="addressInfo-text">地址</text>
				</view>
				
				
				<view class="addressInfo-block2" v-if="edit==0">
					<text class="addressInfo-text">{{item.tname||"name"}}</text>
					<text class="addressInfo-text">{{item.phone||"phone"}}</text>
					<text class="addressInfo-text">{{item.location||"address"}}</text>
				</view>
				
				<!-- 可编辑 or 添加新地址 -->
				<view >
				<view class="addressInfo-block2" v-if="edit==1">
					<input type="text" v-model="item.tname" placeholder="name" class="addressInput-text" maxlength="20"/>
					<input type="number" v-model="item.phone" placeholder="phone" class="addressInput-text" maxlength="11"/>
					<input type="text" v-model="item.location" placeholder="address" class="addressInput-text"
					@tap="selectAddress(index)"/>
				</view>
				</view>
			</view>
		
			<view class="addressAdd" >
				<text @tap="alterAddress(index)">重新编辑</text>
				<text @tap="goTochoiceAddress()">去选择</text>
			</view>
		</view>
		<!-- 两个按钮 -->
		<view class="btn-container">
			<view class="btn-1">
				<text @click="open">不想买了</text>
			</view>
			<view class="btn-2">
				<text @click="goSuccessOrder()" >提交订单</text>
			</view>
		</view>
		<text class="footer">退还已支付的金额，但扣除信用分数</text>
		<!-- 弹出框 -->
		<uni-popup ref="popup" type="dialog" class="confirmPrice-container">
			<view class="confirmPrice">
				<text>将扣除您的信用分数8分</text><br>
				<text>确认放弃？</text>
				
				<view class="confirmPrice-btn">
					<view class="confirm-btn" @click="close">
						<text>取消</text>
					</view>
					<view class="confirm-btn" @click="close">
						<text>确定</text>
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				edit: 0,
				index1: '',
				obji:'',
				objo2:'',
				objo:'',

			}
		},
		onLoad(Option) {
			console.log(Option.objo)
			this.objo = Option.objo
			this.obji = JSON.parse(Option.objo)
			
		},
		methods: {
			goSuccessOrder() {
				this.objo2 = JSON.stringify(this.obji)
				uni.navigateTo({
					url:'../auctions-success-order/auctions-success-order?objo2=' + this.objo2
				})
			},
			// 弹框-不想买了
			open() {
				
				this.$refs.popup.open('center')
			},
			close() {
				this.$refs.popup.close()
			},
			//去选择地址
			goTochoiceAddress() {
				uni.navigateTo({
					url:'../my-address/my-address'
				})
			},
			// wt:进入选择新地址页面
			//选择地址
			selectAddress(index){
				uni.navigateTo({
					url: "../../pages/my-selectaddress/my-selectaddress?index="+index,
				})
			},
			//wt:编辑地址
			alterAddress(index){
				this.edit = 1
				// this.alterAddressTag=true
				// this.editAddressCopy[0]=this.address[index].tname
				// this.editAddressCopy[1]=this.address[index].phone
				// this.editAddressCopy[2]=this.address[index].location
				// this.$set(this.address[index],"editable",1)
				// //虽然这样写好笨，但我也不知道为啥真的刷新不了555，跪求一位大佬改改
				// this.$forceUpdate()
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
			>text {
				color: #707070;//#000205;
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
		.tab-paimai-info {
			display: flex;
			justify-content: flex-start;
			align-items: center;
		    margin: 56rpx 0 8rpx 0;
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
		
				
			}
		
		}
		.btn-container {
			display: flex;
			justify-content: space-between;
			height: 78rpx;
			margin-top: 68rpx;
			.btn-1,
			.btn-2 {
				display: flex;
				justify-content: center;
				align-items: center;
				height: 78rpx;
				width: 260rpx;
				border-radius: 20rpx;
				background-color: #006AD7;
				text {
					color: #FFFFFF;
					font-size: 28rpx;
				}
			}
		}
		.footer {
			font-size: 16rpx;
			color: #8E8E8E;
			padding-bottom: 20rpx;
		}
		
	}
	//wt的收货地址的样式
	.addressInfo{
		width: 640rpx;
		height: 300rpx;
		margin-bottom: 50rpx;
		border: 1rpx solid #0d3254;
		border-radius: 20rpx;
	    box-shadow: 0rpx 4rpx 8rpx #738eae, -4rpx 0 8rpx #738eae, 4rpx 0 8rpx #738eae;
		.addressInfo-block{
			width: 90%;
			margin: 0 auto;
			padding-top: 15rpx;
			/* padding-bottom: 5rpx; */
			border-bottom: 1rpx solid #0d3254;
			.addressInfo-block1{
				display: block;
			    position: absolute;
			}
			.addressInfo-block2{
				display: block;
				padding-left: 80rpx;
			}
			.addressInfo-text{
				display: block;
				font-size: 24rpx;
				line-height: 32rpx;
				padding: 15rpx 10rpx 15rpx 20rpx;
				white-space: pre-wrap;
			}
			.addressInput-text{
				display: block;
				margin: 15rpx 10rpx 28rpx 20rpx;
				padding-left: 15rpx;
				border: 1rpx solid #cae3e8;
				background-color: #e1efff;
				border-radius: 10rpx;
				
				font-size: 24rpx;
				line-height: 30rpx;
				height: 30rpx;
			}
		}
		.addressAdd{
			display: flex;
			justify-content: space-around;
			position: relative;
			font-size: 24rpx;
			text-align: center;
			line-height: 80rpx;
		}
	}
	input{
		min-height:24rpx;
	}
	//复制之前的弹出框样式
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
			&:nth-child(1) {
				margin-bottom: -140rpx;
			}
			&:nth-child(2) {
				margin-top: -10rpx;
			}
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
</style>
