<template>
	<view>
		<!-- 带有商品图片的大盒子 -->
		<view class="image-container">
			<view class="goods-image">
				<image :src="goodInfo.intro_image[0]" mode="aspectFill"></image>
			</view>
			<view class="goods-info">
				<view class="goods-info-name">
					<text>{{goodInfo.name}}</text>
				</view>
				<view class="goods-info-sellerName">
					<text>买家：{{goodInfo.user_name}}</text>
				</view>
				<view class="goods-info-num">
					<text>购买量：{{goodInfo.buy_num}}</text>
				</view>
				<text class="goods-info-price">邮费￥{{goodInfo.postage}}</text>
				<text class="goods-info-price">单价￥{{goodInfo.price}}</text>
				<text class="goods-info-price">总价￥{{goodInfo.totalPrice}}</text>
			</view>
		</view>
		
		<view class="myAddress">
			<text class="defaultAddress-text">收货地址</text>
			<view class="addressInfo">
				<view class="addressInfo-block">
					<view class="addressInfo-block1">
						<text class="addressInfo-text">姓名</text>
						<text class="addressInfo-text">电话</text>
						<text class="addressInfo-text">地址</text>
					</view>
					
					<view class="addressInfo-block2">
						<text class="addressInfo-text">{{address.tname||"name"}}</text>
						<text class="addressInfo-text">{{address.phone||"phone"}}</text>
						<text class="addressInfo-text">{{address.location||"address"}}</text>
					</view>
					
				</view>
				<view class="addressAdd">
					<text @tap="editAddr()">选择地址</text>
				</view>
			</view>
		</view>
		<view class="bottom-block" @click="postOrder">
			提交订单
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				goodInfo: {},
				address: {
					tname: "",
					phone: "",
					location: ""
				}
			}
		},
		methods: {
			editAddr(){
				uni.navigateTo({
					url: "../orders-select-address/orders-select-address"
				})
			},
			//获取用户地址
			async getAddress(){
				let res = await this.$myRequest({
					url: "/address/getByUserId",
					data:{
						userId: window.sessionStorage.getItem('userId')
					},
				})
				this.address=res.data.data[0]
				console.log(this.address)
			},
			async commitOrder(){
				//提交订单
			},
			async postOrder(){
				let self = this
				uni.showModal({
					content: "向"+this.goodInfo.user_name+"支付\n￥"+this.goodInfo.totalPrice,
					success: async function(res){
						if(res.confirm) {
							await self.commitOrder()
							console.log('comfirm') //点击确定之后执行的代码
							// 提交订单
							uni.showModal({
								content: "购买成功"
							})
						} else {  
							console.log('cancel') //点击取消之后执行的代码
						}
					}
				})
			},
		},
		onLoad(option) {
			console.log(this.address.tname)
			if(JSON.stringify(option) != "{}"){
				this.goodInfo = JSON.parse(decodeURIComponent(option.goodInfo));
				console.log(this.goodInfo)
				this.goodInfo.totalPrice = this.goodInfo.buy_num*this.goodInfo.price+this.goodInfo.postage
			} else{  //记得删掉！
				this.goodInfo = {
					buy_num:2,
					postage:0,
					goodId:1,
					heat:12,
					city:"广东省广州市",
					intro_image:["http://120.24.48.171:8081/goodsImage/5.jpg"],
					user_name:"haha",
					inventory:0,
					portrait:"http://120.24.48.171:8081/userImage/a.jpg",
					start_time:1627023422,
					user_tags:["最新的","草间弥生","服装"],
					user_id:1,
					price:100.00,
					name:"中式小沙弥摆件禅意小和尚书房茶室装饰艺术品客厅隔断柜家居摆设",
					goods_tags:["最新的","草间弥生","服装"],"id":1,"introduction":"走进布面油画的空间里，感受当下社会文化意识与人文思想中的丰富维度。",
				}
			}
			this.getAddress()
			console.log(this.goodInfo)
		}
	}
</script>

<style>
@import url("./goods-confirm-buy.css");
</style>
