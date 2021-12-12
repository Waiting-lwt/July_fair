<template>
	<view class="container">
		<!-- 带有商品图片的大盒子 -->
		<view class="image-container">
			<view class="goods-image">
				<image :src="goodInfo.intro_image[0]" mode="aspectFill"></image>
			</view>
			<view class="goods-info">
				<view class="goods-info-left">
					<view class="goods-info-price">
						￥{{goodInfo.price}}
					</view>
					<text>购买量：{{goodInfo.inventory}}{{" "}}</text>
					<text>库存：{{goodInfo.inventory}}</text>
				</view>
				<view class="goods-info-iconfav">
					<image src="../../static/images/shoucang.png" mode=""></image>
					<text>发货地：{{goodInfo.city}}</text>
				</view>
			</view>
		</view>
		
		<view class="goods-name">
			<view class="tab-info">
				<text></text>
				<text>{{goodInfo.name}}</text>
			</view>
			<view class="works-tags">
				<view class="works-tags-item" v-for="item in goodInfo.goods_tags">
					<text>{{item}}</text>
				</view>
			</view>
			<view class="works-intro-p">
				<view>{{goodInfo.introduction}}</view>
			</view>
		</view>
		
		<view class="author-intro">
			<view class="tab-info">
				<text></text>
				<text>作者介绍</text>
			</view>
			<view class="author-intro-info">
				<view class="author-intro-img">
					<image :src="goodInfo.portrait" mode="aspectFill"></image>
				</view>
				<view class="author-intro-right">
					<text>{{goodInfo.user_name}}</text>
					<view class="works-tags">
						<view class="works-tags-item" v-for="item in goodInfo.user_tags">
							<text>{{item}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		
		<view class="bottom-block" @click="editNum()">
			购买
		</view>
		
		<!-- 编辑单价和数量 -->
		<view v-if="showEditNum==true">
			<view class="modal-mask" @tap="showEditNum=false;"></view>
			<view class="edit-num">
				<view class="edit-num-block">
					<text>购买数量</text>
					<input type="digit" v-model="buy_num" placeholder=""class="numInput-text"/>
					<text>个</text>
				</view>
				<view class="show-price-block">
					<text>邮费</text>
					<text class="show-price-num">{{goodInfo.postage||0}}</text>
					<text>元</text>
				</view>
				<view class="show-price-block">
					<text>单价</text>
					<text class="show-price-num">{{goodInfo.price}}</text>
					<text>元</text>
				</view>
				<view class="show-price-block">
					<text>总价</text>
					<text class="show-price-num">{{goodInfo.postage+goodInfo.price*buy_num}}</text>
					<text>元</text>
				</view>
			</view>
			<view class="bottom-block" style="z-index: 91;" @tap="confirmNum()">确认</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				goodInfo:{},
				goodId:1,
				showEditNum:false,
				buy_num:'',
			}
		},
		methods: {
			editNum(){
				// if(!window.sessionStorage.getItem('userId')){
				// 	uni.showModal({
				// 		content:"请前往登录",
				// 		showCancel:false,
				// 		success: (res) => {
				// 			uni.navigateTo({
				// 				url: "../../pages/my/my",
				// 			})
				// 		}
				// 	})
				// }
				this.showEditNum=true
			},
			async getGoodInfo() {
				const res = await this.$myRequest({
					url: '/goods/getGoodStatus?id=' + this.goodId
				})
				this.goodInfo = res.data.data[0]
				console.log(this.goodInfo)
			},
			confirmNum(){
				// 加密传递的对象数据
				if(!(this.buy_num>0&&this.buy_num<this.goodInfo.inventory)){
					uni.showModal({
						content:"购买数量填写不合法"
					})
					this.buy_num=""
					return
				}
				this.goodInfo.buy_num = this.buy_num
				this.goodInfo.totalPrice = this.goodInfo.postage +
				this.goodInfo.price*this.goodInfo.buy_num
				console.log(this.goodInfo)
				let item = encodeURIComponent(JSON.stringify(this.goodInfo))
				uni.navigateTo({
					url: "../../pages/goods-confirm-buy/goods-confirm-buy?goodInfo=" + item,
				})
			}
		},
		/**
		 * 生命周期函数--监听页面加载
		 */
		
		async onLoad(option) {
			let goodItem
			if(JSON.stringify(option) != "{}"){
				goodItem = JSON.parse(decodeURIComponent(option.goodItem));
				this.goodId = goodItem.id
				window.sessionStorage.setItem('goodId',this.goodId)
				console.log(goodItem)
			} else{
				this.goodInfo.goodId = window.sessionStorage.getItem('goodId')
			}
			await this.getGoodInfo()
			this.goodInfo.postage = goodItem.postage
			this.goodInfo.goodId = goodItem.id
			console.log(this.goodInfo)
		},
	}
</script>

<style>
@import url("./goods-detail.css");
</style>
