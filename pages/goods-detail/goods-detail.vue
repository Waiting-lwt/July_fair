<template>
	<view>
		
		<view class="bottom-block" @click="showEditNum=true">
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
					<text class="show-price-num">{{goodItem.postage}}</text>
					<text>元</text>
				</view>
				<view class="show-price-block">
					<text>单价</text>
					<text class="show-price-num">{{goodItem.price}}</text>
					<text>元</text>
				</view>
				<view class="show-price-block">
					<text>总价</text>
					<text class="show-price-num">{{goodItem.postage+goodItem.postage*buy_num}}</text>
					<text>元</text>
				</view>
			</view>
			<view class="bottom-block" style="z-index: 91;" @tap="confirmPrice()">确认</view>
		</view>
<!-- 		city
		collect
		endTime
		heat
		id
		introImage
		introduction
		inventory
		name
		postage
		price
		startTime
		support
		tags
		type
		userId -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				goodItem:{},
				showEditNum:false,
				buy_num:1,
			}
		},
		methods: {
			
		},
		/**
		 * 生命周期函数--监听页面加载
		 */
		
		onLoad(option) {
			// decodeURIComponent 解密传过来的对象字符串
			if(JSON.stringify(option) != "{}"){
				this.goodItem = JSON.parse(decodeURIComponent(option.goodItem));
			}
			console.log(this.goodItem)
		},
	}
</script>

<style>
@import url("./goods-detail.css");
</style>
