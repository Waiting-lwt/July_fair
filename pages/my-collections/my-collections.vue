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
			<view class="goods-item" v-for="(item,index1) in showGoods" :key="index1" @tap="toClassify(item.id)">
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
			<view class="goods-item" v-for="(item,index1) in showAuctions" :key="index1" @tap="toClassify(item.id)">
			    <view class="item-img">
					<image class="item-pic" mode="scaleToFill" :src="item.intro_image[0]"></image>
					
				</view>
			    <view class="item-block">
			        <view class="item-detail">
			            <text class="item-title">{{item.name}}</text>
			            <text class="item-date">{{item.restTimeF}}</text>
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
				
				// showItems:[],
				count:4,
				
				//商品
				showGoods:[],
				goods:{items:[],page:0}, // 未进行排序的good
				goodsPriceUp:{items:[],page:0}, // 进行排序的good
				goodsPriceDown:{items:[],page:0}, // 进行排序的good
				goodsInventUp:{items:[],page:0}, // 进行排序的good
				goodsInventDown:{items:[],page:0}, // 进行排序的good
				sortTitle1:["价格","库存"],
				sortIndex1:[0,0],//无序0 升序1 降序2,
				
				//拍卖品
				showAuctions:[],
				auctions:{items:[],page:0}, // 未进行排序的good
				auctionsMaxBidUp:{items:[],page:0}, // 进行排序的good
				auctionsMaxBidDown:{items:[],page:0}, // 进行排序的good
				auctionsRestTimeUp:{items:[],page:0}, // 进行排序的good
				auctionsRestTimeDown:{items:[],page:0}, // 进行排序的good
				sortTitle2:["价格","剩余时间"],
				sortIndex2:[0,0],//无序0 升序1 降序2,
				
			}
		},
		methods: {
			//切换tab选项卡的标题
			changeFunIndex(index){
				this.functionIndex=index
				console.log(index)
			},
			//跳转商品/拍卖品页面
			toClassify(id){
				
			},
			//获取商品
			async getGoods(attribute="",way=-1,result=this.goods){
				let res = await this.$myRequest({
					url: "/goods/getCollectionCommons",
					data:{
						id:2, //test
						attribute:attribute, // price or inventory
						way:way, //0:升序,1：降序
						pageNum:result.page,
						pageSize:this.count,
					},
				})
				
				if(res.data.data.length){
					result.page++;
					result.items=[...result.items,...res.data.data];
					this.showGoods =result.items
				}
			},
			
			//拍卖品
			async getAuctions(attribute="",way=-1,result=this.auctions){
				let res = await this.$myRequest({
					url: "/goods/getCollectionAuctions",
					data:{
						id:2, //test
						attribute:attribute, // maxBid or restTime
						way:way, //0:升序,1：降序
						pageNum:result.page,
						pageSize:this.count,
					},
				})
				if(res.data.data.length){
					result.page++;
					for(let i=0;i<res.data.data.length;i++){
						let sub=res.data.data[i].end_time - res.data.data[i].start_time
						if(res.data.data[i]['restTime'] < 0)
							res.data.data[i]['restTimeF']="已结束 "+(-res.data.data[i]['restTime'])+" 天"
						else
							res.data.data[i]['restTimeF']="剩余时间 "+res.data.data[i]['restTime']+" 天"
					}
					result.items=[...result.items,...res.data.data];
					this.showAuctions =result.items
				}
				console.log(result)
			},
			
			sort11(){//商品-价格 price
				// this.sortIndex1[0]=(this.sortIndex1[0]+1)%3;
				// this.sortIndex1[1]=0;
				this.$set(this.sortIndex1,0,(this.sortIndex1[0]+1)%3)
				this.$set(this.sortIndex1,1,0)
				if(this.sortIndex1[0]==1){//升序
					if(this.goodsPriceUp.page==0){
						this.getGoods("price",0,this.goodsPriceUp)
					}
					else this.showGoods = this.goodsPriceUp.items
				}
				else if(this.sortIndex1[0]==2){//降序
					if(this.goodsPriceDown.page==0){
						this.getGoods("price",1,this.goodsPriceDown)
					}
					else this.showGoods = this.goodsPriceDown.items
				}
				else{ //无序
					this.showGoods=this.goods.items
				}
			},
			sort12(){//商品-库存 inventory
				// this.sortIndex1[1]=(this.sortIndex1[1]+1)%3;
				// this.sortIndex1[0]=0;
				this.$set(this.sortIndex1,1,(this.sortIndex1[1]+1)%3)
				this.$set(this.sortIndex1,0,0)
				if(this.sortIndex1[1]==1){//升序
					if(this.goodsInventUp.page==0){
						this.getGoods("inventory",0,this.goodsInventUp)
					}
					else this.showGoods = this.goodsInventUp.items
				}
				else if(this.sortIndex1[1]==2){//降序
					if(this.goodsInventDown.page==0){
						this.getGoods("inventory",1,this.goodsInventDown)
					}
					else this.showGoods = this.goodsInventDown.items
				}
				else{ //无序
					this.showGoods=this.goods.items
				}
			},
			
			sort21(){//拍卖品-当前最高价 maxBid
				// this.sortIndex2[0]=(this.sortIndex2[0]+1)%3;
				// this.sortIndex2[1]=0;
				this.$set(this.sortIndex2,0,(this.sortIndex2[0]+1)%3)
				this.$set(this.sortIndex2,1,0)
				if(this.sortIndex2[0]==1){//升序
					if(this.auctionsMaxBidUp.page==0){
						this.getAuctions("maxBid",0,this.auctionsMaxBidUp)
					}
					else this.showAuctions = this.auctionsMaxBidUp.items
				}
				else if(this.sortIndex2[0]==2){//降序
					if(this.auctionsMaxBidDown.page==0){
						this.getAuctions("maxBid",1,this.auctionsMaxBidDown)
					}
					else this.showAuctions = this.auctionsMaxBidDown.items
				}
				else{ //无序
					this.showAuctions=this.auctions.items
				}
			},
			sort22(){//拍卖品-剩余时间 restTime
				// this.sortIndex2[1]=(this.sortIndex2[1]+1)%3;
				// this.sortIndex2[0]=0;
				this.$set(this.sortIndex2,1,(this.sortIndex2[1]+1)%3)
				this.$set(this.sortIndex2,0,0)
				if(this.sortIndex2[1]==1){//升序
					if(this.auctionsRestTimeUp.page==0){
						this.getAuctions("restTime",0,this.auctionsRestTimeUp)
					}
					else this.showAuctions = this.auctionsRestTimeUp.items
				}
				else if(this.sortIndex2[1]==2){//降序
					if(this.auctionsRestTimeDown.page==0){
						this.getAuctions("restTime",1,this.auctionsRestTimeDown)
					}
					else this.showAuctions = this.auctionsRestTimeDown.items
				}
				else{ //无序
					this.showAuctions=this.auctions.items
				}
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
				if(this.sortIndex1[0]!=0)//price
					if(this.sortIndex1[0]==1) this.getGoods("price",0,this.goodsPriceUp)
					if(this.sortIndex1[0]==2) this.getGoods("price",1,this.goodsPriceDown)
				else if(this.sortIndex1[1]!=0)//inventory
					if(this.sortIndex1[1]==1) this.getGoods("inventory",0,this.goodsInventUp)
					if(this.sortIndex1[1]==2) this.getGoods("inventory",1,this.goodsInventDown)
				else
					this.getGoods()
			}
			else if(this.functionIndex==1){
				if(this.sortIndex2[0]!=0)//maxBid
					if(this.sortIndex2[0]==1) this.getAuctions("maxBid",0,this.auctionsMaxBidUp)
					if(this.sortIndex2[0]==2) this.getAuctions("maxBid",1,this.auctionsMaxBidDown)
				else if(this.sortIndex2[1]!=0)//restTime
					if(this.sortIndex2[1]==1) this.getAuctions("restTime",0,this.auctionsRestTimeUp)
					if(this.sortIndex2[1]==2) this.getAuctions("restTime",1,this.auctionsRestTimeDown)
				else
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
