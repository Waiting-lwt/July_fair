<template>
	<view class="function-body">
		<Tabs @returnIndex="changeFunIndex" :title="functionTitle" :functionIndex="functionIndex"></Tabs>
		
		
		<!-- 商品 -->
		<view v-show="functionIndex==0">
		<!-- 排序 -->
		<view class="title">
			<view class="title-sort" @tap="showSpringBox=(showSpringBox+1)%2;">
				<text class="springText">排序</text>
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
			<view class="modal-mask" @tap="showSpringBox=(showSpringBox+1)%2;" v-show="showSpringBox==true"></view>
			<view class="arrivalNavigation" v-show="showSpringBox">
				<view class="sideNavigation">
					<view class="navigatorStyle" @tap="sort11()">
						<text>{{sortTitle1[0]}}</text>
						<text class="springBoxUpDown">
							<svg xmlns="http://www.w3.org/2000/svg" width="10" height="25" viewBox="0 0 10 25">
								<path :class="{triangle_active:sortIndex1[0]==1}" data-name="多边形 2" d="M5,0l5,6H0Z" transform="translate(0,8)" fill="#4F73A5"/>
								<path :class="{triangle_active:sortIndex1[0]==2}" data-name="多边形 3" d="M5,0l5,6H0Z" transform="translate(10,25) rotate(180)" fill="#4F73A5"/>
							</svg>
						</text>
					</view>
					<view class="liBottomBorder"></view>
					<view class="navigatorStyle" @tap="sort12()">
						<text>{{sortTitle1[1]}}</text>
						<text class="springBoxUpDown">
							<svg xmlns="http://www.w3.org/2000/svg" width="10" height="25" viewBox="0 0 10 25">
								<path :class="{triangle_active:sortIndex1[1]==1}" data-name="多边形 4" d="M5,0l5,6H0Z" transform="translate(0,8)" fill="#4f73a5"/>
								<path :class="{triangle_active:sortIndex1[1]==2}" data-name="多边形 5" d="M5,0l5,6H0Z" transform="translate(10,25) rotate(180)" fill="#4F73A5"/>
							</svg>
						</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 商品详情 -->
		<view class="content" v-show="functionIndex==0">
			<view class="goods-item" v-for="(item,index1) in goods" :key="index1" @tap="toClassify(item.id)">
			    <view class="item-img">
					<image class="item-pic" mode="scaleToFill" :src="item.introImage[0]"></image>
					
				</view>
			    <view class="item-block">
			        <view class="item-detail">
			            <text class="item-title">{{item.name}}</text>
			            <text class="item-date">库存 {{item.inventory}}</text>
			            <text class="item-payment">价格 ￥{{item.price}}</text>
			        </view>
					<view class="item-tags" v-for="(item_tags,index) in item.tags" :key="index">
						<text>{{item_tags}}</text>
					</view>
			    </view>
				
			</view>
		</view>
		
		</view>
		
		
		<!-- 拍卖品 -->
		<view v-show="functionIndex==1">
		
		<view class="title">
			
			<!-- 排序 -->
			<view class="title-sort" @tap="showSpringBox=(showSpringBox+1)%2;">
				<text class="springText">排序</text>
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
			<view class="modal-mask" @tap="showSpringBox=(showSpringBox+1)%2;" v-show="showSpringBox==true"></view>
			<view class="arrivalNavigation" v-show="showSpringBox">
				<view class="sideNavigation">
					<view class="navigatorStyle" @tap="sort21()">
						<text>{{sortTitle2[0]}}</text>
						<text class="springBoxUpDown">
							<svg xmlns="http://www.w3.org/2000/svg" width="10" height="25" viewBox="0 0 10 25">
								<path :class="{triangle_active:sortIndex2[0]==1}" data-name="多边形 2" d="M5,0l5,6H0Z" transform="translate(0,8)" fill="#4F73A5"/>
								<path :class="{triangle_active:sortIndex2[0]==2}" data-name="多边形 3" d="M5,0l5,6H0Z" transform="translate(10,25) rotate(180)" fill="#4F73A5"/>
							</svg>
						</text>
					</view>
					<view class="liBottomBorder"></view>
					<view class="navigatorStyle" @tap="sort22()">
						<text>{{sortTitle2[1]}}</text>
						<text class="springBoxUpDown">
							<svg xmlns="http://www.w3.org/2000/svg" width="10" height="25" viewBox="0 0 10 25">
								<path :class="{triangle_active:sortIndex2[1]==1}" data-name="多边形 4" d="M5,0l5,6H0Z" transform="translate(0,8)" fill="#4f73a5"/>
								<path :class="{triangle_active:sortIndex2[1]==2}" data-name="多边形 5" d="M5,0l5,6H0Z" transform="translate(10,25) rotate(180)" fill="#4F73A5"/>
							</svg>
						</text>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 拍卖品 -->
		<view class="content">
			<view class="goods-item" v-for="(item,index1) in auctions" :key="index1" @tap="toClassify(item.id)">
			    <view class="item-img">
					<image class="item-pic" mode="scaleToFill" :src="item.intro_image[0]"></image>
					
				</view>
			    <view class="item-block">
			        <view class="item-detail">
			            <text class="item-title">{{item.name}}</text>
			            <text class="item-date">预计剩余时间 {{item.remainingTimeF}}</text>
			            <text class="item-payment">当前最高价格 ￥{{item.maxBid}}</text>
			        </view>
					<view class="item-tags" v-for="(item_tags,index) in item.tags" :key="index">
						<text>{{item_tags}}</text>
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
				functionTitle:["商品","拍卖品"],
				functionIndex:0,
				userid:1,
				showSpringBox:false,
				
				showItems:[],
				count:4,
				
				//商品
				page1:0,
				goods:[], // 未进行排序的good
				goods0:[], // 进行排序的good
				sortTitle1:["价格","库存"],
				sortIndex1:[0,0],//无序0 升序1 降序2,
				
				//拍卖品
				page2:0,
				auctions:[], // 未进行排序的auction
				auctions0:[], // 进行排序的auction
				sortTitle2:["价格","剩余时间"],
				sortIndex2:[0,0],//无序0 升序1 降序2,
				
			}
		},
		methods: {
			//切换tab选项卡的标题
			changeFunIndex(index){
				this.functionIndex=index
				console.log(index)
				if(this.functionIndex==0) this.showItems=this.goods
				else this.showItems=this.auctions
				console.log(this.showItems)
			},
			//根据functionIndex判断跳转页面
			toClassify(id){
				
			},
			//商品
			async getGoods(){
				let res = await this.$myRequest({
					url: "/goods/collect",
					data:{
						id:2, //test
						type:0, //0:普通商品，1:拍卖品
						pageNum:this.page1,
						pageSize:this.count,
					},
				})
				
				console.log(res)
				if(res.data.data.length){
					this.page1++;
					this.goods=[...this.goods,...res.data.data];
					this.goods0=[...this.goods0,...res.data.data];
				}
				
				if(this.functionIndex==0) this.showItems=this.goods
				else this.showItems=this.auctions
				console.log(this.goods)
								
				console.log("success")
					
			},
			
			//拍卖品
			async getAuctions(attr=''){
				let res = await this.$myRequest({
					url: "/goods/getCollectionAuctions",
					data:{
						id:2, //test
						attribute:attr, // maxBid or restTime
						pageNum:this.page2,
						pageSize:this.count,
					},
				})
				console.log(res)
				if(res.data.data.length){
					this.page2++;
					for(let i=0;i<res.data.data.length;i++){
						let sub=res.data.data[i].end_time - res.data.data[i].start_time
						res.data.data[i]['remainingTime']=sub
						res.data.data[i]['remainingTimeF']=this.$formatTime(sub)
					}
					this.auctions=[...this.auctions,...res.data.data];
				}
				
				console.log(this.auctions)
			},
			
			sort11(){//商品-价格
				// this.sortIndex1[0]=(this.sortIndex1[0]+1)%3;
				// this.sortIndex1[1]=0;
				this.$set(this.sortIndex1,0,(this.sortIndex1[0]+1)%3)
				this.$set(this.sortIndex1,1,0)
			},
			sort12(){//商品-库存
				// this.sortIndex1[1]=(this.sortIndex1[1]+1)%3;
				// this.sortIndex1[0]=0;
				this.$set(this.sortIndex1,1,(this.sortIndex1[1]+1)%3)
				this.$set(this.sortIndex1,0,0)
			},
			
			sort21(){//拍卖品-价格
				// this.sortIndex2[0]=(this.sortIndex2[0]+1)%3;
				// this.sortIndex2[1]=0;
				this.$set(this.sortIndex2,0,(this.sortIndex2[0]+1)%3)
				this.$set(this.sortIndex2,1,0)
			},
			sort22(){//拍卖品-剩余时间
				// this.sortIndex2[1]=(this.sortIndex2[1]+1)%3;
				// this.sortIndex2[0]=0;
				this.$set(this.sortIndex2,1,(this.sortIndex2[1]+1)%3)
				this.$set(this.sortIndex2,0,0)
			},
			
		},
		
		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(option) {
			if(option.type){
				this.functionIndex = Number(option.type)
				this.userid = Number(option.userid)
			}
			this.getGoods()
			this.getAuctions()
		},
		/**
		 * 生命周期函数--监听页面初次渲染完成
		 */
		onReady: function() {},
		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow: function() {},
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
		onReachBottom: function() {
			if(this.functionIndex==0){
				this.getGoods()
			}
			else if(this.functionIndex==1){
				this.getAuctions()
			}
		},
		/**
		 * 用户点击右上角分享
		 */
		onShareAppMessage: function() {},
	}
	
</script>

<style>
	@import url("./my-collections.css");
</style>
