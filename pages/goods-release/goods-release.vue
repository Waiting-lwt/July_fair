<template>
	<view class="main">
		<input type="text" v-model="goodsName" placeholder="请输入商品名称" class="goods-name" />
		<textarea type="text" v-model="goodsDescription" placeholder="请输入商品详细描述" class="goods-description" 
		maxlength="10" @input="descripInput()"/>
		<view class="length-limit">{{descripTatVal}}/{{maxTextArea}}</view>

		<scroll-view class="goods-pics" scroll-x="true" @scroll>
		    <view class="pic-block" v-for="(item,index) in goodsPics" :key="index"
			 @tap="toShowPic()">
		    </view>
			
		    <view class="pic-block" @tap="toAddPic()">
				<text class="text-addpic">+</text>
		    </view>
		</scroll-view>
		
		<view class="goods-detailInfo">
			<view class="detailInfo-block">
				<image class="detailInfo-icon"></image>
				<text class="detailInfo-text">编辑单价和数量</text>
			</view>
			<view class="detailInfo-block">
				<image class="detailInfo-icon"></image>
				<text class="detailInfo-text">添加标签</text>
			</view>
			<view class="detailInfo-block">
				<image class="detailInfo-icon"></image>
				<text class="detailInfo-text">选择发货物城市</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				goodsName:"",
				goodsDescription:"",
				descripTatVal: 0,
				maxTextArea:600,
				goodsPics:[],
			}
		},
		methods: {
			descripInput(){
				this.descripTatVal = this.goodsDescription.length;
				console.log(this.goodsDescription.length)
				if(this.descripTatVal == this.maxTextArea){
					uni.showToast({
						icon: 'none',
						title: '最多只能输入'+this.maxTextArea+'个字',
					});
				}
			},
			async toAddPic(){
				console.log("uploading pics");
				var self = this;
				let res1 = await this.$chooseImage({})
				console.log(res1.tempFilePaths)
				let res2 = await this.$uploadFile({
					url: "/goods/uploadImage",
					tempFilePaths: res1.tempFilePaths
				})
				var obj = JSON.parse(res2.data);
				console.log(res2)
			},
		}
	}
</script>

<style>
	@import url("./goods-release.css");
</style>
