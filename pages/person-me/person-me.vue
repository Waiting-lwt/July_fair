<template>
	<!-- pages/person-main/person-main.wxml -->
	<view class="person-main">
		<!-- 个人信息头部 -->
		<view class="person-top">
			<view class="user-message">
				
				<view class="user-identity-block">
					<template v-if="userMine.type==0||userMine.type==1">
						<text class="user-identity" v-if="userMine.type==0">学生</text>
						<text class="user-identity" v-if="userMine.type==1">商家</text>
						<text class="iconfont" style="margin-top: 5rpx;">
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
						<path id="路径_414" data-name="路径 414" d="M8,0A8,8,0,1,1,0,8,8,8,0,0,1,8,0Z" fill="#006ad7"/>
						<path id="路径_412" data-name="路径 412" d="M4846.01-317.921l3.543,3,5.531-5.531" transform="translate(-4842.621 325.614)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
						</svg></text>
					</template>
					<template v-if="userMine.type==2||userMine.type==3">
						<text class="check-bar"></text>
						<text class="check-text" v-if="userMine.type==2">审核未通过</text>
						<text class="check-text" v-if="userMine.type==3">未审核</text>
					</template>
				</view>
				
			</view>
			<view class="user">
				<view class="user-image">
					<image class="user-image" :src="userMine.portrait" mode="aspectFit" lazy-load="false" @error @load>
					</image>
				</view>
				<view class="user-info1">
					<text class="user-name">{{userMine.name}}</text>
				</view>
				<view class="user-info2">
					<!-- <text class="user-value">优信度</text> -->
					<text class="user-value" style="float: left;">关注 {{userMine.follows}}</text>
					<text class="user-value" style="float: right;">粉丝 {{userMine.fans}}</text>
				</view>
				<view class="user-tags">
					<view class="tag-item" v-for="(item,index) in userMine.tags" :key="index">
						<text class="tag-text">{{item}}</text>
					</view>
				</view>
			</view>
		</view>

		<!-- person-body -->
		<view class="person-body-box">
			<view class="function-body">

				<Tabs @returnIndex="changeIndex" :title="functionTitle"></Tabs>

				<!-- 商品 or 拍卖品 -->
				<view class="title">
					<view class="title-sort" @tap="showSpringBox=(showSpringBox+1)%2;">
						<text class="springText">分类</text>
						<text v-if="showSpringBox==false" class="springBoxDown">
							<svg xmlns="http://www.w3.org/2000/svg" width="10" height="6" viewBox="0 0 10 6">
								<path id="多边形_0" data-name="多边形 0" d="M5,0l5,6H0Z" transform="translate(10 6) rotate(180)" fill="#4F73A5"/>
							</svg>
						</text>
						<text v-else class="springBoxUp">
							<svg xmlns="http://www.w3.org/2000/svg" width="10" height="6" viewBox="0 0 10 6">
							  <path id="多边形_1" data-name="多边形 1" d="M5,0l5,6H0Z" fill="#4f73a5"/>
							</svg>
						</text>
					</view>
					<!-- 弹窗 -->
					<view class="modal-mask" @tap="showSpringBox=(showSpringBox+1)%2;" v-if="showSpringBox==true"></view>
					<view class="arrivalNavigation" v-if="showSpringBox">
						<view class="sideNavigation">
							<view class="navigatorStyle" @tap="sortGoods()">
								<text>商品</text>
							</view>
							<view class="liBottomBorder"></view>
							<view class="navigatorStyle" @tap="sortAuctions()">
								<text>拍卖品</text>
							</view>
						</view>
					</view>
				</view>
				
				<!-- 收藏 -->
				<view class="wander-box" v-if="functionIndex==0">
					<template v-for="item,index in showCollections">
						<view class="exhibits-around-body">
							<image :src="item.introImage[0]"></image>
						</view>
					</template>
				</view>
				
				<!-- 作品 -->
				<view class="wander-box" v-if="functionIndex==1">
					<template v-for="item,index in showProductions">
						<view class="exhibits-around-body">
							<image :src="item.introImage[0]"></image>
						</view>
					</template>
				</view>
				
				<view class="person-bottom">......已经到底啦......</view>
			</view>
		</view>

	</view>
</template>

<script>
	// pages/person-main/person-main.js
	let util = require("../../utils/util.js");
	export default {
		data() {
			return {
				functionTitle: ["收藏", "作品"],
				functionIndex: 0,
				userid: getApp().globalData.userid,
				//表示的是缓存里面的数据
				userInfo: {},
				//表示 的是用户我的页表里面的数据
				userMine: {},
				//用户收藏
				userCollections: {items:[],page:0},
				userCollectGoods: {items:[],page:0},
				userCollectAuctions: {items:[],page:0},
				showCollections: [],
				//用户作品
				userProductions: {items:[],page:0},
				userProductGoods: {items:[],page:0},
				userProductAuctions: {items:[],page:0},
				showProductions: [],
				showSpringBox:false,
				//加载一次获取的数量
				count: 8,
			};
		},
		components: {},
		props: {},
		computed: {
			myDate() {
				let date = new Date()
				return this.$formatDate(date)
			},
		},
		methods: {

			//切换tab选项卡的标题
			changeIndex(index) {
				this.functionIndex = index
				if(index==0){
					if(this.userCollections.page==0){
						this.getCollection(-1, this.userCollections)
					}
				}
				else{
					if(this.userProductions.page==0){
						this.getProduction(-1, this.userProductions)
					}
				}
			},

			//获取收藏
			async getCollection(type = -1, result = this.userCollections) {
				let res = await this.$myRequest({
					url: "/goods/collect",
					data:{
						// id:this.userid,
						id:2,
						type:type,
						pageNum:result.page,
						pageSize:this.count,
					}
				})
				console.log(res.data.data)
				if(res.data.data.length){
					result.page++;
					result.items = [...result.items, ...res.data.data]
					console.log(result.items)
				}
				else{
					console.log(result.page)
				}
				this.showCollections = result.items
			},
			
			//获取作品
			async getProduction(type = -1, result = this.userProductions) {
				let res = await this.$myRequest({
					url: "/goods/get",
					data:{
						id:this.userid,
						type:type,
						pageNum:result.page,
						pageSize:this.count,
					},
				})
				if(res.data.data.length){
					result.page++;
					result.items = [...result.items, ...res.data.data]
					console.log(result.items)
				}
				else{
					console.log(result.page)
				}
				this.showProductions = result.items
			},
			
			//分类
			sortGoods(){
				this.showSpringBox=false
				if(this.functionIndex==0){
					if(this.userCollectGoods.page==0){
						this.getCollection(0, this.userCollectGoods)
					}
				}
				else{
					if(this.userProductGoods.page==0){
						this.getProduction(0, this.userProductGoods)
					}
				}
			},
			sortAuctions(){
				this.showSpringBox=false
				if(this.functionIndex==0){
					if(this.userCollectAuctions.page==0){
						this.getCollection(1, this.userCollectAuctions)
					}
				}
				else{
					if(this.userProductAuctions.page==0){
						this.getProduction(1, this.userProductAuctions)
					}
				}
			},
		},
		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad(option) {
			// decodeURIComponent 解密传过来的对象字符串
			if(JSON.stringify(option) != "{}"){
				this.userMine = JSON.parse(decodeURIComponent(option.userMine));
			}
			if(this.userCollections.page==0){
				this.getCollection(-1, this.userCollections)
			}
			if(this.userProductions.page==0){
				this.getProduction(-1, this.userProductions)
			}
		},
		/**
		 * 生命周期函数--监听页面初次渲染完成
		 */
		onReady: function() {
			if (this.isDayTime) {
				wx.setNavigationBarColor({
					frontColor: '#ffffff',
					backgroundColor: '#b0d4f8',
					animation: {
						duration: 0,
						timingFunc: 'linear'
					},
					success: result => {},
					fail: () => {},
					complete: () => {}
				});
			} else {
				wx.setNavigationBarColor({
					frontColor: '#ffffff',
					backgroundColor: '#041746',
					animation: {
						duration: 0,
						timingFunc: 'linear'
					},
					success: result => {},
					fail: () => {},
					complete: () => {}
				});
			}
		},
		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow: function() {

			//this.getOrder()
		},
		/**
		 * 生命周期函数--监听页面隐藏
		 */
		onHide: function() {},
		/**
		 * 生命周期函数--监听页面卸载
		 */
		onUnload: function() {},
		/**
		 * 页面相关事件处理函数--监听用户下拉动作
		 */
		onPullDownRefresh: function() {},
		/**
		 * 页面上拉触底事件的处理函数
		 */
		onReachBottom: function() {
			if(this.functionIndex==0){
				this.getCollection(-1, this.userCollections)
			}
			else if(this.functionIndex==1){
				this.getProduction(-1, this.userProductions)
			}
		},
		/**
		 * 用户点击右上角分享
		 */
		onShareAppMessage: function() {},
	};
</script>
<style>
	/* pages/my-main/my-main.wxss */
	@import url("./person-me.css");
</style>
