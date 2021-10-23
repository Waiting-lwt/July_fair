<template>
	<view class="areo-main">
		
		<view class="modal-mask" v-if="hasLogin==false"></view>
		<view class="tipRegistrate" v-if="hasLogin==false">
			<view class="tipDetail">
				<text class="tipRegistrate-text" style="padding-left: 50rpx;">
					注册认证后即可解锁完整功能</text>
			</view>
			<view class="toRegistrate" @tap="toLogin()">
				<text class="tipRegistrate-text">注册认证</text>
			</view>
		</view>
		
		<!-- 个人信息头部 -->
		<view class="areo-top">
			<view class="user0">
				<view class="platform" @tap="showSpringBox=(showSpringBox+1)%2">
					<svg xmlns="http://www.w3.org/2000/svg" width="19.487" height="11.572" viewBox="0 0 19.487 11.572">
					  <line id="直线_36" data-name="直线 36" x2="17.987" transform="translate(0.75 0.75)" fill="none" stroke="#707070" stroke-linecap="round" stroke-width="1.5"/>
					  <line id="直线_37" data-name="直线 37" x2="17.987" transform="translate(0.75 5.786)" fill="none" stroke="#707070" stroke-linecap="round" stroke-width="1.5"/>
					  <line id="直线_38" data-name="直线 38" x2="17.987" transform="translate(0.75 10.822)" fill="none" stroke="#707070" stroke-linecap="round" stroke-width="1.5"/>
					</svg>
				</view>
				
				<view class="modal-mask" @tap="showSpringBox=(showSpringBox+1)%2;" v-if="showSpringBox==true"></view>
				<view class="arrivalNavigation" v-if="showSpringBox">
					<view class="sideNavigation">
						<navigator class="navigatorStyle" url="../../pages/index/index">
							<text>平台规则</text>
						</navigator>
						<view class="liBottomBorder"></view>
						<navigator class="navigatorStyle" url="../../pages/index/index">
							<text>联系平台</text>
						</navigator>
					</view>
				</view>
					
					
				<view class="address">
					<svg xmlns="http://www.w3.org/2000/svg" width="16.016" height="14.949" viewBox="0 0 16.016 14.949">
					  <path id="收获地址管理" d="M95.255,98.731H92.964a.572.572,0,0,1-.572-.572v0a.572.572,0,0,1,.573-.574h1.719V95.861a.573.573,0,1,1,1.145,0v2.3a.572.572,0,0,1-.573.574Zm6.27,1.633a2.348,2.348,0,0,0-2.279,1.814H97.029A2.365,2.365,0,1,0,97,103.329h2.263a2.344,2.344,0,1,0,2.257-2.966Zm-6.775,3.555a1.205,1.205,0,1,1,1.2-1.207A1.2,1.2,0,0,1,94.75,103.919Zm6.775,0a1.2,1.2,0,1,1,1.179-1.2,1.2,1.2,0,0,1-1.179,1.2Zm2.9-13.795H96.111a1.431,1.431,0,0,0-1.429,1.432v1.66L91.2,94.966a.573.573,0,0,0-.187.155,2.228,2.228,0,0,0-.888,1.888v5.777a.572.572,0,0,0,.573.574h0a.572.572,0,0,0,.572-.572V97.009a1.23,1.23,0,0,1,.483-1.04l3.76-1.889a.511.511,0,0,0,.065-.052.779.779,0,0,0,.1-.074.555.555,0,0,0,.062-.089.476.476,0,0,0,.052-.1.552.552,0,0,0,.025-.12.715.715,0,0,0,.016-.08V91.553a.285.285,0,0,1,.283-.284h8.312a.58.58,0,0,1,.573.583v10.9a.573.573,0,1,0,1.146,0v-10.9a1.729,1.729,0,0,0-1.718-1.731Z" transform="translate(-90.125 -90.121)" fill="#f8f8f8"/>
					</svg>
					<text style="margin-left: 10rpx;" @tap="toAddress()">收货地址</text>
				</view>
				
			</view>
			<view class="user1">
				
				<view @tap="toMyself()">
					<image class="user-image" :src="userMine.portrait" mode="aspectFit" lazy-load="false" @error
						@load></image>
				</view>
				<view class="user-info">
					<text class="user-name">{{userMine.name}}</text>
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
					
					<text class="user-follow">
						<text class="followed">
							<text class="follow-title">关注</text>
							<text class="num">{{userMine.follows}}</text>
						</text>
						<text class="followed">
							<text class="follow-title">粉丝</text>
							<text class="num">{{userMine.fans}}</text>
						</text>
					</text>
				</view>
			</view>
			<view class="user2">
				<view class="user-tags">
					<view class="tag-background" v-for="(item,index) in userMine.tags" :key="index">
						<view class="tag-item">
							<text class="tag-text">{{item}}</text>
						</view>
					</view>
					<view class="discounts">
						<text style="margin-right: 10rpx;" @tap="toDiscounts">优惠中心</text>
						<svg xmlns="http://www.w3.org/2000/svg" width="7.107" height="11.881" viewBox="0 0 7.107 11.881">
						  <g id="组_374" data-name="组 374" transform="translate(-24 -77.358)">
						    <path id="arrow-right-copy-copy-copy" d="M306.954,167.176l-.889.845,5.292,5.113-5.336,5.07.882.852,6.226-5.916Z" transform="translate(-282.02 -89.818)" fill="#fff"/>
						  </g>
						</svg>
					</view>
				</view>
			</view>
		</view> -->
		
		<!-- areo-body -->
		<view class="areo-body-box">
			<view class="areo-body">
				<view class="title">
					<view class="title-bar"></view>
					<text class="title-name">我的买卖</text>
				</view>
				<view class="collection-block">
					<view class="collection-item" @tap="toOrder(0)">
						<text class="category">市集</text>
						<text class="iconfont" style="float: right;">
						<svg xmlns="http://www.w3.org/2000/svg" width="7.107" height="11.881" viewBox="0 0 7.107 11.881">
						  <g id="组_374" data-name="组 374" transform="translate(-24 -77.358)">
						    <path id="arrow-right-copy-copy-copy" d="M306.954,167.176l-.889.845,5.292,5.113-5.336,5.07.882.852,6.226-5.916Z" transform="translate(-282.02 -89.818)" fill="#21277B"/>
						  </g>
						</svg></text>
						<text class="collection-count">共{{ordergoodsNum}}个</text>
					</view>
					<view class="collection-item" @tap="toOrder(1)">
						<text class="category">拍卖</text>
						<text class="iconfont" style="float: right;">
						<svg xmlns="http://www.w3.org/2000/svg" width="7.107" height="11.881" viewBox="0 0 7.107 11.881">
						  <g id="组_374" data-name="组 374" transform="translate(-24 -77.358)">
						    <path id="arrow-right-copy-copy-copy" d="M306.954,167.176l-.889.845,5.292,5.113-5.336,5.07.882.852,6.226-5.916Z" transform="translate(-282.02 -89.818)" fill="#21277B"/>
						  </g>
						</svg></text>
						<text class="collection-count">共{{orderauctionsNum}}个</text>
					</view>
				</view>
				<view class="title">
					<view class="title-bar"></view>
					<text class="title-name">我的收藏</text>
				</view>
				<view class="collection-block">
					<view class="collection-item" @tap="toCollection(0)">
						<text class="category">商品</text>
						<text class="iconfont" style="float: right;">
						<svg xmlns="http://www.w3.org/2000/svg" width="7.107" height="11.881" viewBox="0 0 7.107 11.881">
						  <g id="组_374" data-name="组 374" transform="translate(-24 -77.358)">
						    <path id="arrow-right-copy-copy-copy" d="M306.954,167.176l-.889.845,5.292,5.113-5.336,5.07.882.852,6.226-5.916Z" transform="translate(-282.02 -89.818)" fill="#21277B"/>
						  </g>
						</svg></text>
						<text class="collection-count">共{{collgoodsNum}}个</text>
					</view>
					<view class="collection-item" @tap="toCollection(1)">
						<text class="category">拍卖品</text>
						<text class="iconfont" style="float: right;">
						<svg xmlns="http://www.w3.org/2000/svg" width="7.107" height="11.881" viewBox="0 0 7.107 11.881">
						  <g id="组_374" data-name="组 374" transform="translate(-24 -77.358)">
						    <path id="arrow-right-copy-copy-copy" d="M306.954,167.176l-.889.845,5.292,5.113-5.336,5.07.882.852,6.226-5.916Z" transform="translate(-282.02 -89.818)" fill="#21277B"/>
						  </g>
						</svg></text>
						<text class="collection-count">共{{collauctionsNum}}个</text>
					</view>
				</view>
				<view class="title">
					<view class="title-bar"></view>
					<text class="title-name">历史踪迹</text>
					<text class="more-history" @tap="toMoreHistory">查看更多</text>
				</view>
				<view class="history-block">
					<view class="history-item" v-for="(item,index) in userHistoryLate" :key="index"
						@tap="toClassify(item.id,item.type)">
						<view class="pic-box">
							<image class="pic" :src="item.introImage[0]" lazy-load="true" mode="aspectFill"></image>
						</view>
					</view>
				</view>
			</view>
			<view class="areo-bottom">......已经到底啦......</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// app:getApp(),
				userid:getApp().globalData.userid,
				// userid:1,
				//是否已经注册
				hasLogin:false,
				//表示的是缓存里面的数据
				userInfo: {},
				//表示 的是用户我的页表里面的数据
				userMine: {
					tags:['','','']
				},
				showSpringBox:false,
				showdetail:false,
				test: {},
				//记录用户的历史踪迹
				userHistory: [],
				//9张
				userHistoryLate: [],
				//订单数量
				orderNum: 0,
				ordergoodsNum: 0,
				orderauctionsNum: 0,
				//收藏品的数量
				exhibitionsNum: 0,
				collgoodsNum: 0,
				collauctionsNum: 0,
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
			toLogin(){
				console.log("tologin")
				this.hasLogin=true
			},
			isLogin(){
				if(uni.getStorageSync('user')){
					return;
				}else{
					uni.navigateTo({
						url:"../login/login"
					})
				}
			},
			//获取用户信息
			async getUserInfo() {
				//if (!uni.getStorageSync('user')) {
					const res = await this.$myRequest({
						url: "/user/baseInformation?id="+this.userid,
					})
					this.userMine = res.data.data
				//}
			},
			//获取历史记录
			async getHistory() {
				let res = await this.$myRequest({
					url: "/goods/history?userId=" + this.userid,
				})
				this.userHistory = [...this.userHistory, ...res.data.data]
				this.userHistoryLate = this.userHistory.slice(0,9)
			},
			//获取买卖订单的数量
			async getOrder() {
				//showType 普通商品：0，拍卖品：1
				let showType = 0
				let res = await this.$myRequest({
					url: "/goods/nums/user",
					data:{
						id:this.userid,
						type:showType,
					}
				})
				this.ordergoodsNum = res.data.data;
				showType++;
				res = await this.$myRequest({
					url: "/goods/nums/user",
					data:{
						id:this.userid,
						type:showType,
					}
				})
				this.orderauctionsNum = res.data.data;
			},
			//获取收藏各部分的总数
			async getCollection() {
				//showType 普通商品：0，拍卖品：1
				let showType = 0
				let res = await this.$myRequest({
					url: "/goods/nums/collect",
					data:{
						userId:this.userid,
						type:showType,
					}
				})
				this.collgoodsNum = res.data.data;
				showType++;
				res = await this.$myRequest({
					url: "/goods/nums/collect",
					data:{
						userId:this.userid,
						type:showType,
					}
				})
				this.collauctionsNum = res.data.data;
			},
			//前往订单页面
			toOrder(type) {
				//type 市集：0，拍卖：1
				uni.navigateTo({
					url: "../../pages/my-orders/my-orders?type=" + type + "&userid=" + this.userid
				})
			},
			//前往收藏页面
			toCollection(type) {
				uni.navigateTo({
					url: "../../pages/my-collections/my-collections?type=" + type + "&userid=" + this.userid
				})
			},
			//个人(me)页面
			toMyself() {
				// 加密传递的对象数据
				let item = encodeURIComponent(JSON.stringify(this.userMine))
				uni.navigateTo({
					url: "../../pages/person-me/person-me" + "?userMine=" + item,
				})
			},
			//根据type跳转到相对应的页
			toClassify(id, type) {
				
			},
			//收货地址
			toAddress(){
				// 加密传递的对象数据
				let item = encodeURIComponent(JSON.stringify(this.userMine))
				uni.navigateTo({
					url: "../../pages/my-address/my-address" + "?userid=" + this.userid,
				})
			},
			//查看更多历史踪迹
			toMoreHistory(){
				// 加密传递的对象数据
				let item = encodeURIComponent(JSON.stringify(this.userMine))
				uni.navigateTo({
					url: "../../pages/my-morehistory/my-morehistory" + "?userid=" + this.userid,
				})
			},
		},
		/**
		 * 生命周期函数--监听页面加载
		 */
		
		onLoad() {
			this.getUserInfo();
			this.getOrder();
			this.getCollection();
			this.getHistory();
		},
		/**
		 * 生命周期函数--监听页面初次渲染完成
		 */
		onReady: function() {
			
		},
		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow: function() {
			
		},
		/**
		 * 生命周期函数--监听页面隐藏
		 */
		onHide: function() {},
		/**
		 * 生命周期函数--监听页面卸载
		 */
		onUnload: function() {
		},
		/**
		 * 页面相关事件处理函数--监听用户下拉动作
		 */
		onPullDownRefresh: function() {},
		/**
		 * 页面上拉触底事件的处理函数
		 */
		onReachBottom: function() {},
		/**
		 * 用户点击右上角分享
		 */
		onShareAppMessage: function() {},
	};
</script>
<style>
	@import "./my.css";
</style>
